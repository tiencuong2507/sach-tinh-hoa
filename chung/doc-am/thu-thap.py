"""Thu văn bản cần đọc của mọi trang trong phạm vi (chung/doc-am/pham-vi.json) — bước 1 của phần đọc thành tiếng.

Chạy (Python hệ thống, cần Chrome hoặc Edge):
    python chung/doc-am/thu-thap.py [--site <thư mục site>] [--chi <mẫu đường dẫn> ...]
Mặc định site = D:\\HỒ SƠ NGHIÊN CỨU PHẬT HOÀNG TRẦN NHÂN TÔNG\\07_WEBSITE_PUBLIC\\site.

Cách làm: dựng máy chủ cục bộ phục vụ thư mục site, tự chèn <script src="/sach-tinh-hoa/chung/doc-am.js"> vào trang trong phạm vi
(lấy doc-am.js mới nhất từ kho này, không cần sửa site trước), mở từng trang bằng Chrome chạy ngầm với ?doc-thu=1:
chính doc-am.js đi qua mọi trang con, lấy nội dung chính và tính mã — giống hệt lúc người đọc bấm nghe.
Ra: doc-am/van-ban.json (mã, đoạn chữ, trang nguồn). Bước 2: chung/doc-am/tao-giong.py. Bước 3: chung/doc-am/kiem-tra.py.
"""
import argparse, fnmatch, functools, http.server, json, os, re, shutil, subprocess, sys, tempfile, threading, time
from pathlib import Path

KHO = Path(__file__).resolve().parents[2]
SITE_MAC_DINH = Path(r"D:\HỒ SƠ NGHIÊN CỨU PHẬT HOÀNG TRẦN NHÂN TÔNG\07_WEBSITE_PUBLIC\site")
CHROME = [r"C:\Program Files\Google\Chrome\Application\chrome.exe", r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "google-chrome", "chromium"]
THE = '<script src="/sach-tinh-hoa/chung/doc-am.js" defer></script>'

def pham_vi(site, chi=None):
    pv = json.loads((KHO / "chung/doc-am/pham-vi.json").read_text(encoding="utf-8"))
    tat_ca = sorted(p.relative_to(site).as_posix() for p in site.rglob("*.html"))
    khop = lambda rel, mau: any(fnmatch.fnmatch(rel, m) for m in mau)
    ds = [r for r in tat_ca if khop(r, pv["gom"]) and not khop(r, pv["bo"])]
    return [r for r in ds if not chi or khop(r, chi)]

def may_chu(site, trang):
    class H(http.server.SimpleHTTPRequestHandler):
        def __init__(s, *a, **k): super().__init__(*a, directory=str(site), **k)
        def log_message(s, *a): pass
        def do_GET(s):
            p = s.path.split("?")[0]
            if p == "/sach-tinh-hoa/chung/doc-am.js":
                b = (KHO / "chung/doc-am.js").read_bytes(); return s._tra(b, "application/javascript; charset=utf-8")
            rel = p.lstrip("/"); rel = rel + "index.html" if rel.endswith("/") or rel == "" else rel
            # Sách Tinh Hoa: lấy JS/dữ liệu mới nhất từ kho nguồn (sẽ ghép lên site cùng đợt), HTML vẫn của site (giữ thanh điều hướng)
            if rel.startswith("sach-tinh-hoa/") and rel.endswith(".js"):
                k = KHO / rel[len("sach-tinh-hoa/"):]
                if k.is_file(): return s._tra(k.read_bytes(), "application/javascript; charset=utf-8")
            if rel in trang:
                h = (site / rel).read_text(encoding="utf-8")
                if "doc-am.js" not in h: h = h.replace("</body>", THE + "\n</body>", 1)
                return s._tra(h.encode("utf-8"), "text/html; charset=utf-8")
            return super().do_GET()
        def _tra(s, b, kieu):
            s.send_response(200); s.send_header("Content-Type", kieu); s.send_header("Content-Length", str(len(b))); s.send_header("Cache-Control", "no-store"); s.end_headers(); s.wfile.write(b)
    m = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
    threading.Thread(target=m.serve_forever, daemon=True).start()
    return m

def tim_chrome():
    for c in CHROME:
        if os.path.isfile(c) or shutil.which(c): return c
    sys.exit("Không thấy Chrome/Edge để thu văn bản.")

def thu_mot(chrome, url, ho_so):
    for lan in range(3):
        r = subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", f"--user-data-dir={ho_so}",
                            "--virtual-time-budget=180000", "--dump-dom", url], capture_output=True, timeout=600)
        dom = r.stdout.decode("utf-8", "replace")
        m = re.search(r'<pre id="doc-thu">(.*?)</pre>', dom, re.S)
        if m:
            import html
            return json.loads(html.unescape(m.group(1)))
        time.sleep(2)
    raise RuntimeError(f"Không thu được văn bản: {url} (trang không chạy doc-am.js hoặc lỗi JS)")

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--site", default=str(SITE_MAC_DINH)); ap.add_argument("--chi", nargs="*")
    a = ap.parse_args(); site = Path(a.site)
    trang = pham_vi(site, a.chi)
    if not trang: sys.exit("Không có trang nào trong phạm vi.")
    chrome = tim_chrome(); mc = may_chu(site, set(trang)); goc = f"http://127.0.0.1:{mc.server_address[1]}/"
    ho_so = tempfile.mkdtemp(prefix="doc-am-chrome-")
    ra_p = KHO / "doc-am/van-ban.json"; ra_p.parent.mkdir(exist_ok=True)
    cu = json.loads(ra_p.read_text(encoding="utf-8")) if ra_p.exists() and a.chi else {"trang": {}}
    try:
        for rel in trang:
            t0 = time.time(); kq = thu_mot(chrome, goc + rel + "?doc-thu=1", ho_so)
            cu["trang"][rel] = [{"view": x["view"], "ma": x["ma"], "chu": x["chu"], "van_ban": x["van_ban"]} for x in kq["muc"]]
            print(f"{rel}: {kq['so']} đoạn, {sum(x['chu'] for x in kq['muc'])} ký tự, {time.time() - t0:.1f}s", flush=True)
    finally:
        mc.shutdown(); shutil.rmtree(ho_so, ignore_errors=True)
    cu["thu_luc"] = time.strftime("%Y-%m-%dT%H:%M:%S%z"); cu["site"] = str(site)
    ra_p.write_text(json.dumps(cu, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    ma = {x["ma"] for v in cu["trang"].values() for x in v}
    print(f"Xong: {len(cu['trang'])} trang, {sum(len(v) for v in cu['trang'].values())} đoạn đọc, {len(ma)} mã khác nhau → {ra_p}")

if __name__ == "__main__":
    main()
