"""Tạo bản đọc bằng GIỌNG ANH (nhân bản do Codex dựng) cho các mã còn thiếu trong doc-am/van-ban.json — thay tao-giong-may.py từ cuốn sau Luận Ngữ.

Anh Cường chốt 29/10/2026: cuốn sau Luận Ngữ dùng giọng anh; các cuốn đã đăng giữ giọng máy C.
Quân Trung, Khóa Hư, Tuệ Trung (306 bài) Codex đã đăng 29/10 bằng bản GPU (-c29.mp3, qa/audio-completion-20261029) — đừng tạo lại; script này dùng cho cuốn/bài mới.
Bộ máy: VieNeu-TTS v3 Turbo, ONNX CPU, mẫu Mau_giong_anh.wav — script doc_bai.py của Codex (chạy offline, Python của Codex).
Chạy (Python hệ thống, có ffmpeg):  python chung/doc-am/tao-giong-anh.py --chi "sach-tinh-hoa/quan-trung-tu-menh-tap/*"
Mỗi mã: doc_bai.py → WAV 48 kHz → cân âm lượng như tao-giong-may (-18 LUFS, MP3 mono 24 kHz 48 kb/s) → doc-am/a/<mã>-a.mp3,
muc-luc.json ghi {"f": "a/<mã>-a.mp3", "s", "n", "giong": "vieneu-v3-owner-20261029", "ai_generated": true}. Mã đã có bản giọng anh thì bỏ qua. Chạy tuần tự (máy đọc đã dùng hết nhân CPU).
Mẫu giọng và mô hình là dữ liệu riêng: không commit, không đăng.
"""
import argparse, fnmatch, importlib.util, json, os, re, subprocess, sys, tempfile, time
from pathlib import Path

KHO = Path(__file__).resolve().parents[2]
DA = KHO / "doc-am"; (DA / "a").mkdir(parents=True, exist_ok=True)
NHAN = "vieneu-v3-owner-20261029"   # cùng nhãn Codex dùng khi đăng 306 bài 29/10: nút đọc công khai so đúng chuỗi này để ghi "Giọng đọc AI từ mẫu giọng của chủ dự án"
GIONG_DIR = Path(r"D:\HỒ SƠ NGHIÊN CỨU PHẬT HOÀNG TRẦN NHÂN TÔNG\08_AUDIO_XU_LY\Giong_anh_local_MUsX3c")
PY = Path(os.environ.get("CODEX_PY") or r"C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe")

# dùng chung lam_sach (phiên âm, "1–20" → "1 đến 20", "&") và chuan_hoa (loudnorm hai lượt) với giọng máy
spec = importlib.util.spec_from_file_location("tgm_chung", Path(__file__).with_name("tao-giong-may.py"))
tgm = importlib.util.module_from_spec(spec); spec.loader.exec_module(tgm)

def lam_sach(t):
    t = tgm.lam_sach(t)
    return re.sub(r"^0*(\d+)\.\s", r"Bài \1. ", t)   # "01. Thư xin hàng." → "Bài 1. Thư xin hàng." (giọng anh đọc dính số 01 vào câu đầu)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--chi", nargs="*"); a = ap.parse_args()
    vb = json.loads((DA / "van-ban.json").read_text(encoding="utf-8"))
    ml_p = DA / "muc-luc.json"
    viec, thay = [], set()
    ml = json.loads(ml_p.read_text(encoding="utf-8"))
    for rel, ds in vb["trang"].items():
        if a.chi and not any(fnmatch.fnmatch(rel, m) for m in a.chi): continue
        for x in ds:
            if x["ma"] in thay: continue
            thay.add(x["ma"]); cu = ml["am"].get(x["ma"])
            if cu and cu.get("giong") == NHAN and (DA / cu["f"]).is_file(): continue
            viec.append((rel, x))
    print(f"Cần tạo {len(viec)} bản đọc giọng anh ({sum(x['chu'] for _, x in viec)} ký tự).", flush=True)
    xong = loi = 0; t0 = time.time()
    for rel, x in viec:
        try:
            with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as td:
                td = Path(td); txt, wav = td / "bai.txt", td / "bai.wav"
                txt.write_text(lam_sach(x["van_ban"]), encoding="utf-8")
                r = subprocess.run([str(PY), str(GIONG_DIR / "doc_bai.py"), "--offline", "--text", str(txt), "--output", str(wav)], capture_output=True, text=True, encoding="utf-8", errors="replace")
                if r.returncode or not wav.is_file(): raise RuntimeError((r.stderr or r.stdout)[-400:])
                ra = DA / "a" / f"{x['ma']}-a.mp3"
                giay = tgm.chuan_hoa(wav, ra)
            toc = x["chu"] / max(giay, 0.1)
            if not 6 <= toc <= 25: ra.unlink(missing_ok=True); raise RuntimeError(f"tốc độ bất thường {toc:.1f} ký tự/giây")
        except Exception as e:
            loi += 1; print(f"LỖI {rel} [{x['view'] or '-'}]: {e}", flush=True); continue
        ml = json.loads(ml_p.read_text(encoding="utf-8"))   # đọc lại trước khi ghi: tiến trình khác có thể vừa ghi
        ml["am"][x["ma"]] = {"f": f"a/{x['ma']}-a.mp3", "s": round(giay, 1), "n": x["chu"], "giong": NHAN, "ai_generated": True}
        ml["phien_ban"] = time.strftime("%Y%m%d%H%M")
        ml_p.write_text(json.dumps(ml, ensure_ascii=False, indent=0, sort_keys=True) + "\n", encoding="utf-8")
        xong += 1
        print(f"[{xong}/{len(viec)}] {rel} [{x['view'] or '-'}] {x['chu']} ký tự → {giay / 60:.1f} phút ({time.time() - t0:.0f}s)", flush=True)
    print(f"Xong: {xong} bản, lỗi {loi}.", flush=True)

if __name__ == "__main__":
    main()
