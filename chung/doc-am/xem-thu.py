"""Xem thử phần đọc thành tiếng trên máy trước khi xuất bản: python chung/doc-am/xem-thu.py [--site …] [--cong 8736]
Phục vụ thư mục site như website thật, tự gắn nút nghe vào trang trong phạm vi, lấy doc-am.js và JS Sách Tinh Hoa mới nhất từ kho,
phục vụ /doc-am/ (muc-luc.json + a/*.mp3) từ thư mục doc-am của kho. Mở http://127.0.0.1:8736/ rồi vào một trang đọc bất kỳ.
"""
import argparse, http.server, importlib.util, sys
from pathlib import Path
spec = importlib.util.spec_from_file_location("thu_thap", Path(__file__).with_name("thu-thap.py")); tt = importlib.util.module_from_spec(spec); spec.loader.exec_module(tt)
KHO = tt.KHO

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--site", default=str(tt.SITE_MAC_DINH)); ap.add_argument("--cong", type=int, default=8736)
    a = ap.parse_args(); site = Path(a.site); trang = set(tt.pham_vi(site))
    class H(http.server.SimpleHTTPRequestHandler):
        def __init__(s, *x, **k): super().__init__(*x, directory=str(site), **k)
        def log_message(s, *x): pass
        def do_GET(s):
            p = s.path.split("?")[0]
            if p.startswith("/doc-am/"):
                f = KHO / p.lstrip("/")
                if f.is_file():
                    kieu = "audio/mpeg" if f.suffix == ".mp3" else "application/json; charset=utf-8"
                    return s._tra(f.read_bytes(), kieu)
            if p == "/sach-tinh-hoa/chung/doc-am.js": return s._tra((KHO / "chung/doc-am.js").read_bytes(), "application/javascript; charset=utf-8")
            rel = p.lstrip("/"); rel = rel + "index.html" if rel.endswith("/") or rel == "" else rel
            if rel.startswith("sach-tinh-hoa/") and rel.endswith(".js"):
                k = KHO / rel[len("sach-tinh-hoa/"):]
                if k.is_file(): return s._tra(k.read_bytes(), "application/javascript; charset=utf-8")
            if rel in trang:
                h = (site / rel).read_text(encoding="utf-8")
                if "doc-am.js" not in h: h = h.replace("</body>", tt.THE + "\n</body>", 1)
                return s._tra(h.encode("utf-8"), "text/html; charset=utf-8")
            return super().do_GET()
        def _tra(s, b, kieu):
            s.send_response(200); s.send_header("Content-Type", kieu); s.send_header("Content-Length", str(len(b))); s.send_header("Accept-Ranges", "none"); s.send_header("Cache-Control", "no-store"); s.end_headers(); s.wfile.write(b)
    print(f"Xem thử: http://127.0.0.1:{a.cong}/  ({len(trang)} trang có nút nghe)", flush=True)
    http.server.ThreadingHTTPServer(("127.0.0.1", a.cong), H).serve_forever()

if __name__ == "__main__":
    main()
