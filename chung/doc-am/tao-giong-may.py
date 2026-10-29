"""Tạo bản đọc bằng GIỌNG MÁY cho mọi mã còn thiếu trong doc-am/van-ban.json — bước 2 của phần đọc thành tiếng (thay tao-giong.py).

Anh Cường chốt 26/10/2026: bỏ giọng nhân bản ("giọng clone dở lắm"), dùng giọng máy nam trầm — mẫu C:
    edge-tts vi-VN-NamMinhNeural, tốc độ -15%, cao độ -12Hz (dịch vụ đọc của Microsoft Edge, không chính thức [I]).
Chạy (Python hệ thống có edge-tts):  python chung/doc-am/tao-giong-may.py [--chi <mẫu trang> ...] [--song-song 5]
Sau khi tạo: cân âm lượng hai lượt loudnorm I=-18 TP=-1.5 LRA=9, MP3 mono 24 kHz 48 kb/s, tệp doc-am/a/<mã>-m.mp3
(đuôi -m để trình duyệt không lấy nhầm bản giọng nhân bản cũ cùng mã trong bộ nhớ đệm).
Ghi muc-luc.json sau mỗi bài: {"am": {mã: {"f": "a/<mã>-m.mp3", "s": giây, "n": ký tự, "giong": "may-C"}}}. Mã đã có bản giọng máy thì bỏ qua.
Đoạn dài cắt khúc ~2.500 ký tự (ranh giới đoạn/câu), tạo song song rồi nối (ffmpeg concat) trước khi cân âm lượng.
Dịch vụ thỉnh thoảng trả "No audio received" (dày hơn khi > 16 luồng): mỗi khúc thử lại tối đa 6 lần, nghỉ tăng dần. "&" đổi thành "và" (ký tự này làm dịch vụ từ chối).
"""
import argparse, asyncio, fnmatch, json, re, subprocess, sys, tempfile, time
from pathlib import Path
import edge_tts

KHO = Path(__file__).resolve().parents[2]
DA = KHO / "doc-am"; (DA / "a").mkdir(parents=True, exist_ok=True)
GIONG = {"voice": "vi-VN-NamMinhNeural", "rate": "-15%", "pitch": "-12Hz"}
NHAN = "may-C"

# Phiên âm chỉ dùng khi gửi dịch vụ đọc (mã băm vẫn tính trên chữ trang): tên Pāli có dấu gạch trên giọng Việt đọc sai.
PHAT_AM = {"Maghavā": "Ma-ga-va", "Dhanapāla": "Đa-na-pa-la", "sāla": "sa-la", "bīraṇa": "bi-ra-na"}

def lam_sach(t):
    for k, v in PHAT_AM.items(): t = t.replace(k, v)
    t = re.sub(r"(\d)\s*[–—-]\s*(\d)", r"\1 đến \2", t)   # "Đoạn 1–20" → "Đoạn 1 đến 20" (chỉ khi gửi dịch vụ đọc)
    return t.replace("&", " và ").replace("  ", " ")

def chuan_hoa(vao, ra):
    meas = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(vao), "-af", "loudnorm=I=-18:TP=-1.5:LRA=9:print_format=json", "-f", "null", "-"], capture_output=True, text=True, check=True)
    m = json.loads(re.search(r"\{[^{}]+\"input_i\"[^{}]+\}", meas.stderr, re.S).group())
    filt = ("loudnorm=I=-18:TP=-1.5:LRA=9:linear=true:" + f"measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}")
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(vao), "-af", filt, "-ar", "24000", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "48k", str(ra)], check=True)
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(ra)], capture_output=True, text=True)
    return float(r.stdout.strip())

KHUC = 2500   # đoạn dài cắt thành khúc ~2.500 ký tự theo ranh giới đoạn văn/câu: tạo song song, lỗi chỉ làm lại một khúc

def chia(t, n=KHUC):
    ra, cur = [], ""
    for dong in t.split("\n"):
        while len(dong) > n:   # đoạn văn quá dài: cắt ở dấu câu gần nhất
            k = max(dong.rfind(c, 0, n) for c in ".;!?") + 1 or n
            if cur: ra.append(cur); cur = ""
            ra.append(dong[:k]); dong = dong[k:].lstrip()
        if cur and len(cur) + len(dong) + 1 > n: ra.append(cur); cur = ""
        cur = (cur + "\n" + dong) if cur else dong
    if cur.strip(): ra.append(cur)
    return ra

async def mot_khuc(t, ra, sem_k):
    loi = None
    for lan in range(6):
        async with sem_k:
            try:
                await edge_tts.Communicate(t, GIONG["voice"], rate=GIONG["rate"], pitch=GIONG["pitch"]).save(str(ra))
                if ra.stat().st_size < 1000: raise RuntimeError("tệp quá nhỏ")
                return
            except Exception as e: loi = e
        await asyncio.sleep(4 * (lan + 1))
    raise RuntimeError(loi)

async def mot_bai(x, sem_k):
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as td:
        td = Path(td); khuc = chia(lam_sach(x["van_ban"]))
        tep = [td / f"k{i:03d}.mp3" for i in range(len(khuc))]
        kq = await asyncio.gather(*(mot_khuc(t, f, sem_k) for t, f in zip(khuc, tep)), return_exceptions=True)   # chờ mọi khúc xong rồi mới báo lỗi (Windows khóa tệp đang ghi)
        hong = [e for e in kq if isinstance(e, Exception)]
        if hong: raise RuntimeError(f"{len(hong)}/{len(khuc)} khúc hỏng: {hong[0]}")
        tho = td / "tho.mp3"
        if len(tep) == 1: tho = tep[0]
        else:
            (td / "ds.txt").write_text("".join(f"file '{f.as_posix()}'\n" for f in tep), encoding="utf-8")
            subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(td / "ds.txt"), "-c", "copy", str(tho)], check=True)
        ra = DA / "a" / f"{x['ma']}-m.mp3"
        giay = await asyncio.to_thread(chuan_hoa, tho, ra)
        toc = x["chu"] / max(giay, 0.1)
        if not 6 <= toc <= 25: ra.unlink(missing_ok=True); raise RuntimeError(f"tốc độ bất thường {toc:.1f} ký tự/giây")
        return giay

async def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--chi", nargs="*"); ap.add_argument("--song-song", type=int, default=5)
    a = ap.parse_args()
    vb = json.loads((DA / "van-ban.json").read_text(encoding="utf-8"))
    ml_p = DA / "muc-luc.json"
    ml = json.loads(ml_p.read_text(encoding="utf-8")) if ml_p.exists() else {"am": {}}
    viec, thay = [], set()
    for rel, ds in vb["trang"].items():
        if a.chi and not any(fnmatch.fnmatch(rel, m) for m in a.chi): continue
        for x in ds:
            if x["ma"] in thay: continue
            thay.add(x["ma"]); cu = ml["am"].get(x["ma"])
            if cu and cu.get("giong") == NHAN and (DA / cu["f"]).is_file(): continue
            viec.append((rel, x))
    print(f"Cần tạo {len(viec)} bản đọc giọng máy ({sum(x['chu'] for _, x in viec)} ký tự), {a.song_song} luồng.", flush=True)
    khoa = asyncio.Lock(); sem = asyncio.Semaphore(a.song_song); sem_k = asyncio.Semaphore(a.song_song); dem = {"xong": 0, "loi": 0}; t0 = time.time()
    async def chay(rel, x):
        async with sem:
            try: giay = await mot_bai(x, sem_k)
            except Exception as e:
                dem["loi"] += 1; print(f"LỖI {rel} [{x['view'] or '-'}]: {e}", flush=True); return
            async with khoa:
                # đọc lại tệp trên đĩa rồi gộp: một tiến trình khác (vd tạo audio Quán trọ, lượt chạy song song) có thể vừa ghi
                try: tren_dia = json.loads(ml_p.read_text(encoding="utf-8")).get("am", {})
                except Exception: tren_dia = {}
                for k, v in tren_dia.items():
                    if k not in ml["am"] or (v.get("giong") == NHAN and ml["am"][k].get("giong") != NHAN): ml["am"][k] = v
                ml["am"][x["ma"]] = {"f": f"a/{x['ma']}-m.mp3", "s": round(giay, 1), "n": x["chu"], "giong": NHAN}
                ml["phien_ban"] = time.strftime("%Y%m%d%H%M")
                ml["giong"] = "Giọng máy vi-VN-NamMinhNeural (edge-tts) · tốc độ -15% · cao độ -12Hz · MP3 mono 24 kHz 48 kb/s"
                ml_p.write_text(json.dumps(ml, ensure_ascii=False, indent=0, sort_keys=True) + "\n", encoding="utf-8")
                dem["xong"] += 1
                print(f"[{dem['xong']}/{len(viec)}] {rel} [{x['view'] or '-'}] {x['chu']} ký tự → {giay / 60:.1f} phút ({time.time() - t0:.0f}s)", flush=True)
    await asyncio.gather(*(chay(r, x) for r, x in viec))
    print(f"Xong: {dem['xong']} bản, lỗi {dem['loi']}.", flush=True)

if __name__ == "__main__":
    asyncio.run(main())
