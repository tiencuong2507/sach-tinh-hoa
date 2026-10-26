"""Tạo bản đọc cho mọi mã còn thiếu trong doc-am/van-ban.json — bước 2 của phần đọc thành tiếng.

Chạy bằng môi trường VieNeu (Python 3.11, cùng cấu hình giọng mẫu 1 anh Cường chốt cho Quán trọ):
    D:\\AI\\vixtts\\venv\\Scripts\\python.exe chung/doc-am/tao-giong.py [--chi <mẫu trang>] [--toi-da <số bài>]
Giọng: VieNeu v3 Turbo, tham chiếu reference-short-2.wav (mẫu 1), temperature 0.75, max_chars 240, batch 8 — như Quán trọ.
Khác Quán trọ (có chủ đích, vì tổng cộng ~20 giờ đọc): MP3 mono 24 kHz 48 kb/s thay cho 48 kHz 160 kb/s; loudnorm hai lượt I=-18 TP=-1.5 LRA=9 giữ nguyên.
Bài dài chia thành khúc ~1800 ký tự theo đoạn văn, nối bằng khoảng lặng 0,45 s. Chỉ tạo mã chưa có tệp; ghi muc-luc.json sau mỗi bài (dừng giữa chừng chạy lại sẽ tiếp).
Ra: doc-am/a/<mã>.mp3 và doc-am/muc-luc.json {"am": {mã: {"f": "a/<mã>.mp3", "s": giây, "n": ký tự}}}.
"""
import os, sys
from pathlib import Path
VIENEU = Path(r"D:\HỒ SƠ NGHIÊN CỨU PHẬT HOÀNG TRẦN NHÂN TÔNG\09_AUDIO_COI_TAM\2026-10-25-thu-giong")
sys.path.insert(0, str(VIENEU / "deps"))
os.environ["HF_HOME"] = str(VIENEU / "model-cache")
for k in ("HF_HUB_OFFLINE", "TRANSFORMERS_OFFLINE", "HF_HUB_DISABLE_TELEMETRY"): os.environ[k] = "1"
os.environ["PYTHONDONTWRITEBYTECODE"] = "1"; os.environ["VIENEU_FUSED_FRAME"] = "0"
import argparse, fnmatch, hashlib, json, random, re, subprocess, tempfile, time
import numpy as np, soundfile as sf, torch
torch.set_num_threads(8)

KHO = Path(__file__).resolve().parents[2]
DA = KHO / "doc-am"; THU_MUC_AM = DA / "a"; THU_MUC_AM.mkdir(parents=True, exist_ok=True)
KHUC, LANG = 1800, 0.45
PY_ASR = r"C:\Users\ADMIN\AppData\Local\Programs\Python\Python314\python.exe"   # Python hệ thống có faster-whisper (máy nghe lại)
BITRATE, TAN_SO = "48k", "24000"

def khuc(van_ban):
    ra, cur = [], ""
    for dong in van_ban.split("\n"):
        if cur and len(cur) + len(dong) + 1 > KHUC: ra.append(cur); cur = ""
        cur = (cur + "\n" + dong).strip()
    if cur: ra.append(cur)
    return ra

import difflib, unicodedata
def tu(s):   # chữ thường, bỏ dấu, số → giữ nguyên (máy nghe hay viết số); dùng để so khúc đọc với chữ gốc
    s = unicodedata.normalize("NFD", s.lower()).replace("đ", "d")
    return re.findall(r"[a-z0-9]+", "".join(c for c in s if not unicodedata.combining(c)))
def lap_gan(w, cua=25):   # các cặp từ lặp lại trong khoảng gần (dấu hiệu mô hình giọng nói lặp)
    ra = set()
    for i in range(len(w) - 1):
        for j in range(i + 2, min(i + cua, len(w) - 1)):
            if w[i] == w[j] and w[i + 1] == w[j + 1]: ra.add((w[i], w[i + 1]))
    return ra
def danh_gia(goc, nghe):
    """Trả (điểm lỗi, lý do). Lặp gần không có trong chữ gốc, thiếu nhiều chữ, hoặc thừa nhiều chữ → nghi."""
    S, A = tu(goc), tu(nghe)
    if not A: return 99, "không nghe được gì"
    sm = difflib.SequenceMatcher(None, S, A, autojunk=False)
    khop = sum(b.size for b in sm.get_matching_blocks()); phu = khop / max(1, len(S))
    them = sum(max(0, (j2 - j1) - (i2 - i1)) for op, i1, i2, j1, j2 in sm.get_opcodes() if op in ("insert", "replace"))
    def gan(x, y):   # giống nhau hoặc lệch một ký tự (máy nghe hay sai một âm: bàn → bảng)
        if x == y: return True
        if abs(len(x) - len(y)) > 1: return False
        if len(x) == len(y): return sum(a != b for a, b in zip(x, y)) == 1
        n_, d_ = (x, y) if len(x) < len(y) else (y, x)
        return any(d_[:q] + d_[q + 1:] == n_ for q in range(len(d_)))
    cap_goc = list(zip(S, S[1:]))
    lap = {g for g in lap_gan(A) if not (g[0].isdigit() or g[1].isdigit())
           and sum(gan(g[0], a) and gan(g[1], b) for a, b in cap_goc) < 2}   # chữ gốc tự có cặp này từ 2 lần thì không tính là lặp
    diem, ly = 0, []
    if lap: diem += 2 * len(lap); ly.append("lặp: " + ", ".join(" ".join(g) for g in sorted(lap)[:4]))
    if phu < 0.6: diem += 5; ly.append(f"thiếu chữ (khớp {phu:.0%})")
    if them > max(8, 0.12 * len(S)): diem += 3; ly.append(f"thừa {them} từ")
    return diem, "; ".join(ly)

def chuan_hoa(raw, mp3):
    meas = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(raw), "-af", "loudnorm=I=-18:TP=-1.5:LRA=9:print_format=json", "-f", "null", "-"], capture_output=True, text=True, check=True)
    m = json.loads(re.search(r"\{[^{}]+\"input_i\"[^{}]+\}", meas.stderr, re.S).group())
    filt = ("loudnorm=I=-18:TP=-1.5:LRA=9:linear=true:" + f"measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}")
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(raw), "-af", filt, "-ar", TAN_SO, "-ac", "1", "-c:a", "libmp3lame", "-b:a", BITRATE, str(mp3)], check=True)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--chi", nargs="*"); ap.add_argument("--toi-da", type=int, default=0)
    a = ap.parse_args()
    vb = json.loads((DA / "van-ban.json").read_text(encoding="utf-8"))
    ml_p = DA / "muc-luc.json"
    ml = json.loads(ml_p.read_text(encoding="utf-8")) if ml_p.exists() else {"am": {}}
    viec, thay = [], set()
    for rel, ds in vb["trang"].items():
        if a.chi and not any(fnmatch.fnmatch(rel, m) for m in a.chi): continue
        for x in ds:
            if x["ma"] in thay: continue
            thay.add(x["ma"])
            if x["ma"] in ml["am"] and (DA / ml["am"][x["ma"]]["f"]).is_file(): continue
            viec.append((rel, x))
    if a.toi_da: viec = viec[:a.toi_da]
    print(f"Cần tạo {len(viec)} bản đọc ({sum(x['chu'] for _, x in viec)} ký tự).", flush=True)
    if not viec: return
    from vieneu import Vieneu
    tts = Vieneu(mode="v3turbo", device="cuda", backend="pytorch", max_batch_size=8)
    tts.add_voice("Cuong-approved-sample-1", str(VIENEU / "reference-short-2.wav"), denoise=True, save=False)
    sr = tts.sample_rate; im = np.zeros(int(LANG * sr), dtype="float32")
    # máy nghe lại chạy thường trực (Python hệ thống + faster-whisper trên card đồ họa)
    asr = subprocess.Popen([PY_ASR, str(Path(__file__).with_name("asr-may.py"))], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True, encoding="utf-8",
                           env={k: v for k, v in os.environ.items() if k not in ("HF_HOME", "PYTHONPATH")})
    assert json.loads(asr.stdout.readline()).get("san_sang"), "máy nghe lại không khởi động được"
    def nghe(w):
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f: tam = f.name
        sf.write(tam, w, sr, subtype="PCM_16"); asr.stdin.write(json.dumps({"wav": tam}) + "\n"); asr.stdin.flush()
        r = json.loads(asr.stdout.readline()); os.unlink(tam); return r.get("chu", "")
    for i, (rel, x) in enumerate(viec, 1):
        t0 = time.time(); hg0 = int(x["ma"][:8], 16)
        song, kiem = [], {"khuc": 0, "lam_lai": 0, "con_nghi": []}
        for so_k, k in enumerate(khuc(x["van_ban"])):
            tot = None
            for lan in range(3):   # khúc bị nghi thì tạo lại với hạt giống khác, giữ lần ít lỗi nhất
                hg = hg0 + 7919 * so_k + 104729 * lan
                random.seed(hg); np.random.seed(hg % (2 ** 32)); torch.manual_seed(hg)
                w = np.asarray(tts.infer(k, voice="Cuong-approved-sample-1", temperature=0.75, max_chars=240, batch_size=8), dtype="float32")
                if len(w) == 0 or not np.isfinite(w).all(): continue
                diem, ly = danh_gia(k, nghe(w))
                if tot is None or diem < tot[0]: tot = (diem, ly, w)
                if diem == 0: break
                kiem["lam_lai"] += 1
            if tot is None: raise RuntimeError(f"Sóng âm hỏng ở {rel} [{x['view']}]")
            if tot[0]: kiem["con_nghi"].append({"khuc": so_k, "bat_dau_giay": round(sum(len(s) for s in song) / sr, 1), "ly_do": tot[1], "doan": k[:80]})
            kiem["khuc"] += 1; song += [tot[2], im]
        w = np.concatenate(song[:-1]); pk = float(np.abs(w).max())
        if pk > 0.97: w = w * (0.97 / pk)
        giay = len(w) / sr
        with tempfile.TemporaryDirectory() as td:
            raw = Path(td) / "raw.wav"; sf.write(str(raw), w, sr, subtype="PCM_16")
            mp3 = THU_MUC_AM / f"{x['ma']}.mp3"; chuan_hoa(raw, mp3)
        ml["am"][x["ma"]] = {"f": f"a/{x['ma']}.mp3", "s": round(giay, 1), "n": x["chu"], "kiem": kiem}
        ml["phien_ban"] = time.strftime("%Y%m%d%H%M"); ml["giong"] = "VieNeu v3 Turbo · mẫu 1 (reference-short-2.wav) · temperature 0.75 · MP3 mono 24 kHz 48 kb/s"
        ml_p.write_text(json.dumps(ml, ensure_ascii=False, indent=0, sort_keys=True) + "\n", encoding="utf-8")
        print(f"[{i}/{len(viec)}] {rel} [{x['view'] or '-'}] {x['chu']} ký tự → {giay / 60:.1f} phút, tạo {time.time() - t0:.0f}s, {mp3.stat().st_size // 1024} KB; "
              f"{kiem['khuc']} khúc, làm lại {kiem['lam_lai']}, còn nghi {len(kiem['con_nghi'])}", flush=True)
    asr.stdin.close(); asr.wait(timeout=60)
    print("Xong.", flush=True)

if __name__ == "__main__":
    main()
