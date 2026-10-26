"""Kiểm phần đọc thành tiếng — bước 3, cổng bắt buộc trước khi xuất bản (thất bại → exit 1).

    python chung/doc-am/kiem-tra.py [--site <thư mục site>] [--cho-thieu <mẫu trang> ...]

1. Mọi đoạn đọc trong doc-am/van-ban.json (thu bằng thu-thap.py từ bản site sắp xuất bản) có tệp doc-am/a/<mã>.mp3, giải mã được,
   thời lượng khớp muc-luc.json. Thiếu → liệt kê trang/trang con, exit 1 (trừ trang khớp --cho-thieu: cho phép tạm thiếu, nút hiện "đang cập nhật").
2. Văn bản thu còn mới: van-ban.json phải mới hơn mọi trang HTML trong phạm vi của site (sửa bài mà quên thu lại → exit 1).
3. Có --site: mọi trang trong phạm vi gắn đúng một thẻ <script src="/sach-tinh-hoa/chung/doc-am.js">; site/doc-am có đủ tệp và muc-luc.json.
4. Báo khúc còn bị máy nghe lại nghi (để người nghe kiểm), tệp mồ côi (mã cũ không còn dùng), tổng dung lượng.
"""
import argparse, fnmatch, hashlib, json, os, subprocess, sys
from pathlib import Path
KHO = Path(__file__).resolve().parents[2]; DA = KHO / "doc-am"
sys.path.insert(0, str(Path(__file__).parent))
import importlib.util
spec = importlib.util.spec_from_file_location("thu_thap", Path(__file__).with_name("thu-thap.py")); tt = importlib.util.module_from_spec(spec); spec.loader.exec_module(tt)

def thoi_luong(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(f)], capture_output=True, text=True)
    try: return float(r.stdout.strip())
    except ValueError: return -1

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--site"); ap.add_argument("--cho-thieu", nargs="*", default=[])
    ap.add_argument("--muc-luc", help="bản chụp muc-luc.json dùng cho đợt xuất bản (khi tao-giong.py vẫn đang ghi tệp gốc)")
    a = ap.parse_args(); loi, bao = [], []
    ml_p = Path(a.muc_luc) if a.muc_luc else DA / "muc-luc.json"
    vb = json.loads((DA / "van-ban.json").read_text(encoding="utf-8")); ml = json.loads(ml_p.read_text(encoding="utf-8")) if ml_p.exists() else {"am": {}}
    dung, thieu, nghi, tong_s = set(), [], [], 0.0
    for rel, ds in vb["trang"].items():
        for x in ds:
            dung.add(x["ma"]); m = ml["am"].get(x["ma"]); f = DA / m["f"] if m else None
            if not m or not f.is_file():
                (bao if any(fnmatch.fnmatch(rel, c) for c in a.cho_thieu) else thieu).append(f"{rel} [{x['view'] or '-'}] mã {x['ma']}")
                continue
            d = thoi_luong(f)
            if d < 0: loi.append(f"Không giải mã được: {f.name} ({rel})")
            elif abs(d - m["s"]) > 2: loi.append(f"Thời lượng lệch muc-luc: {f.name} {d:.1f}s ≠ {m['s']}s")
            tong_s += max(d, 0)
            for c in m.get("kiem", {}).get("con_nghi", []): nghi.append(f"{rel} [{x['view'] or '-'}] phút {c['bat_dau_giay'] / 60:.1f}: {c['ly_do']} — «{c['doan'][:50]}»")
    if thieu: loi.append(f"{len(thieu)} đoạn chưa có bản đọc khớp chữ hiện tại:\n  " + "\n  ".join(thieu[:40]))
    mo_coi = sorted(p.name for p in (DA / "a").glob("*.mp3") if p.stem not in dung)
    # văn bản thu còn mới so với site
    if a.site:
        site = Path(a.site); trang = tt.pham_vi(site)
        dau = vb.get("dau", {})   # trang đổi chữ/JS sau lần thu → văn bản thu đã cũ
        cu_ = [r for r in trang if r in vb["trang"] and dau.get(r) != tt.dau_trang(site, r, kho_de_len=False)]
        if cu_: loi.append(f"{len(cu_)} trang đã đổi sau lần thu văn bản — chạy lại thu-thap.py: " + ", ".join(cu_[:8]) + (" …" if len(cu_) > 8 else ""))
        thieu_trang = [r for r in trang if (site / r).read_text(encoding="utf-8").count('src="/sach-tinh-hoa/chung/doc-am.js') != 1]
        if thieu_trang: loi.append("Trang trong phạm vi chưa gắn (hoặc gắn trùng) doc-am.js: " + ", ".join(thieu_trang))
        thieu_vb = [r for r in trang if r not in vb["trang"]]
        if thieu_vb: loi.append("Trang trong phạm vi chưa được thu văn bản: " + ", ".join(thieu_vb))
        sd = site / "doc-am"
        if not (sd / "muc-luc.json").is_file(): loi.append("site/doc-am/muc-luc.json chưa có")
        else:
            msite = json.loads((sd / "muc-luc.json").read_text(encoding="utf-8"))["am"]
            for k in dung:
                if k in ml["am"] and (k not in msite or not (sd / msite[k]["f"]).is_file()): loi.append(f"site/doc-am thiếu {k}"); break
            if (sd / "doc-am.js").exists(): pass
    mb = sum(p.stat().st_size for p in (DA / "a").glob("*.mp3")) / 1048576
    print(f"Phần đọc: {len(vb['trang'])} trang, {len(dung)} đoạn đọc; có bản đọc {len(dung) - len(thieu) - len(bao)}, cho phép tạm thiếu {len(bao)}, thiếu {len(thieu)}; "
          f"{tong_s / 3600:.1f} giờ âm thanh, {mb:.0f} MB; khúc còn nghi {len(nghi)}; tệp mồ côi {len(mo_coi)}")
    if nghi: print("Khúc nên nghe lại:\n  " + "\n  ".join(nghi[:30]) + (f"\n  … và {len(nghi) - 30} khúc khác" if len(nghi) > 30 else ""))
    if mo_coi: print("Tệp mồ côi (mã cũ, có thể xóa sau khi xuất bản):", ", ".join(mo_coi[:10]) + (" …" if len(mo_coi) > 10 else ""))
    if loi: print("LỖI:\n" + "\n".join(loi)); sys.exit(1)
    print("OK")

if __name__ == "__main__":
    main()
