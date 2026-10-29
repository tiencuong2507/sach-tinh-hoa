"""Xuất tệp nhạc nền cho nút đọc (chung/doc-am.js) từ bản thu gốc anh Cường tự chơi (29/10/2026, nhạc cụ điện tử, thu bằng Audacity).

Bản thu gốc là dữ liệu riêng: để ở thư mục NHAC NEN của kho, không commit, không đăng web. Chỉ tệp đã xử lý doc-am/nhac/<tên>.mp3 được đăng.
Chạy:  python chung/doc-am/nhac-nen.py "NHAC NEN/Nhac nen.wav" [--ten nen-01]
Xử lý: cân hai kênh theo RMS; tìm điểm vòng A→B giống nhau nhất (sắc độ 12 cao độ + độ to) với A trong 6–30 s, B trong 30 s cuối;
cắt đoạn A → B + CHEO giây (đuôi dư để trình phát chồng mờ đuôi vòng trước lên đầu vòng sau, liền mạch với mọi định dạng nén);
lọc < 70 Hz, khoét 900 Hz -3 dB (chừa chỗ cho giọng), chuẩn hóa -18 LUFS / đỉnh thật -1.5 dBFS (bằng giọng đọc), MP3 stereo 44,1 kHz 128 kb/s.
In ra chu_ky (= B − A) và cheo để ghi vào hằng NHAC trong chung/doc-am.js.
"""
import argparse, json, re, subprocess, tempfile
from pathlib import Path
import numpy as np
from scipy.io import wavfile
from scipy.signal import stft

KHO = Path(__file__).resolve().parents[2]
CHEO = 3.0

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("goc"); ap.add_argument("--ten", default="nen-01"); a = ap.parse_args()
    sr, x = wavfile.read(a.goc)
    x = x.astype(np.float64) / (2 ** 31 if x.dtype == np.int32 else 2 ** 15 if x.dtype == np.int16 else 1)
    if x.ndim == 1: x = np.stack([x, x], 1)
    rms = np.sqrt((x ** 2).mean(0)); x = x * (rms.mean() / rms)
    m = x.mean(1); hop = int(sr * 0.1)
    f, tt, Z = stft(m, sr, nperseg=8192, noverlap=8192 - hop); P = np.abs(Z) ** 2
    k = (f > 80) & (f < 2000); pc = (np.round(12 * np.log2(f[k] / 261.63)) % 12).astype(int)
    C = np.stack([P[k][pc == i].sum(0) for i in range(12)]); C /= np.linalg.norm(C, axis=0) + 1e-12
    E = 10 * np.log10(P.sum(0) + 1e-12); dai = len(m) / sr
    ia = np.where((tt > 6) & (tt < 30))[0]; ib = np.where((tt > dai - 30) & (tt < dai - CHEO - 2))[0]
    best = max(((float(((C[:, a_:a_ + 1] * C[:, ib]).sum(0) - 0.05 * np.abs(E[ib] - E[a_])).max()), tt[a_],
                 tt[ib[int(np.argmax((C[:, a_:a_ + 1] * C[:, ib]).sum(0) - 0.05 * np.abs(E[ib] - E[a_])))]]) for a_ in ia))
    _, ta, tb = best
    doan = x[int(ta * sr):int((tb + CHEO) * sr)]
    ra = KHO / "doc-am/nhac" / f"{a.ten}.mp3"; ra.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        w = Path(td) / "v.wav"; wavfile.write(w, sr, (doan / (np.abs(doan).max() + 1e-9) * 0.8 * 32767).astype(np.int16))
        eq = "highpass=f=70,equalizer=f=900:t=q:w=0.6:g=-3"
        do = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(w), "-af", eq + ",loudnorm=I=-18:TP=-1.5:LRA=9:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
        mm = json.loads(re.search(r"\{[^{}]+\"input_i\"[^{}]+\}", do.stderr, re.S).group())
        af = eq + f",loudnorm=I=-18:TP=-1.5:LRA=9:linear=true:measured_I={mm['input_i']}:measured_TP={mm['input_tp']}:measured_LRA={mm['input_lra']}:measured_thresh={mm['input_thresh']}:offset={mm['target_offset']}"
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(w), "-af", af, "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "128k", str(ra)], check=True)
    print(json.dumps({"tep": f"nhac/{a.ten}.mp3", "chu_ky": round(tb - ta, 3), "cheo": CHEO, "diem_vong": [round(ta, 2), round(tb, 2)], "do_giong": round(best[0], 3)}, ensure_ascii=False))

if __name__ == "__main__":
    main()
