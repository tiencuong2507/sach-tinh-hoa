"""Sinh tệp ngày giờ "Lên kệ" và "Cập nhật" cho từng trang sách và trang lịch sử của hanhtrinhcoinguon.vn.

Anh Cường (29/10/2026): "Em để thêm ngày giờ Đưa sách lên kệ ở dưới mỗi cuốn nhé, và các chỗ khác cũng thế, để biết lịch sử".

Nguồn sự thật là biên bản phát hành trong 07_WEBSITE_PUBLIC/qa/releases (không dựa giờ sửa tệp):
  - Chỉ dùng đợt đã verify trên tên miền (có after-*.json). Giờ = verified_at của đợt (giờ Việt Nam).
  - "Lên kệ" = đợt đầu tiên trang xuất hiện với before_sha256 rỗng (đường dẫn mới).
    Trang đã có trên web trước khi có công cụ phát hành (trước 25/10/2026) → ghi "trước 25/10/2026",
    trừ khi ngày thật được điền trong chung/len-ke/ngay-cu.json (anh bổ sung).
  - "Cập nhật" = đợt gần nhất làm đổi NỘI DUNG: chữ hiển thị của trang (bỏ đầu trang, thanh điều hướng, chân trang,
    thẻ script/style) khác bản trước, hoặc tệp dữ liệu/JS/CSS riêng của cuốn sách (cùng thư mục) đổi.
    Đợt chỉ gắn thẻ nút đọc, đổi ?v=, thêm bộ đếm, đổi kiểu chữ toàn trang, thêm MP3 → không tính là cập nhật.
  - --dot-moi <danh sách tệp>: đợt đang chuẩn bị (chưa verify): so với bản đang chạy (published.json) và ghi giờ hiện tại.

Chạy:  python chung/len-ke/sinh-len-ke.py --web "<07_WEBSITE_PUBLIC>" [--dot-moi qa/handoffs/<đợt>.files.txt] [--ra <tệp json>]
Mặc định ghi <web>/site/sach-tinh-hoa/chung/len-ke.json (bản tích hợp site: chỉ chạy khi giữ khóa xuất bản).
"""
import argparse, datetime, fnmatch, hashlib, html.parser, json, re, zipfile
from pathlib import Path

KHO = Path(__file__).resolve().parents[2]
PHAM_VI = ["sach-tinh-hoa/*.html", "sach-tinh-hoa/*/*.html", "chuong-*/index.html", "lich-su-van-hoa/*.html",
           "lich-su-van-hoa/*/*.html", "lich-su-van-hoa/*/*/*.html"]
BO = ["sach-tinh-hoa/chung/*"]
TRUOC_CONG_CU = "2026-10-25"   # công cụ phát hành bắt đầu ghi biên bản từ đợt v10 ngày này


def trong_pham_vi(p):
    return any(fnmatch.fnmatch(p, m) for m in PHAM_VI) and not any(fnmatch.fnmatch(p, m) for m in BO)


class ChuHien(html.parser.HTMLParser):
    """Chữ người đọc nhìn thấy trong <body>, bỏ phần khung trang dùng chung."""
    BO_THE = {"script", "style", "noscript", "template", "header", "nav", "footer", "svg"}
    BO_LOP = {"collection-return", "reader-nav", "skip", "breadcrumb"}
    VO = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}

    def __init__(self):
        super().__init__(convert_charrefs=True); self.ngan = []; self.chu = []; self.trong_body = False

    def handle_starttag(self, tag, attrs):
        if tag == "body": self.trong_body = True
        if tag in self.VO: return
        lop = set((dict(attrs).get("class") or "").split())
        self.ngan.append(tag in self.BO_THE or bool(lop & self.BO_LOP) or dict(attrs).get("id") == "doc-am")

    def handle_endtag(self, tag):
        if tag in self.VO: return
        if self.ngan: self.ngan.pop()

    def handle_data(self, d):
        if self.trong_body and not any(self.ngan): self.chu.append(d)


def chu_hien(b):
    p = ChuHien(); p.feed(b.decode("utf-8", "replace")); return re.sub(r"\s+", " ", " ".join(p.chu)).strip()


def thu_muc_sach(p):
    """sach-tinh-hoa/<cuốn>/… → khóa cuốn sách (tệp riêng của cuốn tính vào cập nhật của mọi trang trong thư mục)."""
    a = p.split("/")
    return "/".join(a[:2]) if a[0] == "sach-tinh-hoa" and len(a) > 2 and a[1] != "chung" else None


def gio_verify(d):
    a = json.loads(sorted(d.glob("after-*.json"))[-1].read_text(encoding="utf-8"))
    v = a.get("verified_at") or a.get("time")   # biên bản verify ghi "time" (giây Unix)
    if isinstance(v, (int, float)): v = datetime.datetime.fromtimestamp(v).astimezone().isoformat()
    return v[:16] if v else None


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--web", required=True); ap.add_argument("--dot-moi"); ap.add_argument("--ra")
    a = ap.parse_args(); W = Path(a.web); SITE = W / "site"; R = W / "qa/releases"
    dot = []
    for d in R.iterdir():
        if d.is_dir() and (d / "manifest.json").exists() and list(d.glob("after-*.json")):
            mf = json.loads((d / "manifest.json").read_text(encoding="utf-8"))
            if mf.get("status") == "verified-live": dot.append((gio_verify(d), d.name, d, mf["files"]))
    dot.sort()
    # mọi bản byte đã biết theo SHA (bản trước/sau của các đợt) để so chữ hiển thị
    theo_sha = {}
    for _, _, d, files in dot:
        for z in ("update.zip", "rollback.zip"):
            if not (d / z).exists(): continue
            with zipfile.ZipFile(d / z) as zf:
                for n in zf.namelist():
                    if n.endswith(".html") and trong_pham_vi(n):
                        b = zf.read(n); theo_sha.setdefault(hashlib.sha256(b).hexdigest(), b)

    trang = {}   # đường dẫn html → {"len_ke": giờ|None, "truoc": bool, "cap_nhat": [giờ…]}

    def ghi_dot(gio, ten, files, ban_sau):
        sach_doi = set()
        for f in files:
            p, truoc, sau = f["path"], f.get("before_sha256"), f.get("sha256")
            if p.endswith(".html") and trong_pham_vi(p):
                t = trang.setdefault(p, {"len_ke": None, "truoc": False, "cap_nhat": []})
                if not truoc:
                    if not t["len_ke"] and not t["truoc"]: t["len_ke"] = gio
                    continue
                if not t["len_ke"] and not t["cap_nhat"]: t["truoc"] = True   # đã có trên web trước khi có biên bản
                b_truoc, b_sau = theo_sha.get(truoc), ban_sau(p, sau)
                if b_truoc is None or b_sau is None or chu_hien(b_truoc) != chu_hien(b_sau): t["cap_nhat"].append(gio)
            elif not p.endswith((".mp3", ".m4a", ".wav")):
                k = thu_muc_sach(p)
                if k: sach_doi.add(k)
        for k in sach_doi:   # tệp riêng của cuốn (JS dữ liệu, CSS, JSON) đổi → cập nhật mọi trang trong thư mục cuốn
            for p in list(trang) + [x.relative_to(SITE).as_posix() for x in (SITE / k).glob("*.html")]:
                if thu_muc_sach(p) == k and p.endswith(".html"):
                    t = trang.setdefault(p, {"len_ke": None, "truoc": True, "cap_nhat": []})
                    if t["len_ke"] != gio and gio not in t["cap_nhat"]: t["cap_nhat"].append(gio)

    for gio, ten, d, files in dot:
        def ban_sau(p, sha, d=d):
            with zipfile.ZipFile(d / "update.zip") as zf:
                return zf.read(p) if p in zf.namelist() else theo_sha.get(sha)
        ghi_dot(gio, ten, files, ban_sau)

    if a.dot_moi:   # đợt đang chuẩn bị: so bản site với bản đang chạy theo published.json
        pub = json.loads((R / "published.json").read_text(encoding="utf-8"))["files"]
        gio = datetime.datetime.now().astimezone().isoformat()[:16]
        ds = [l.strip() for l in (W / a.dot_moi).read_text(encoding="utf-8").splitlines() if l.strip()]
        files = [{"path": p, "before_sha256": pub.get(p), "sha256": hashlib.sha256((SITE / p).read_bytes()).hexdigest()}
                 for p in ds if (SITE / p).is_file() and hashlib.sha256((SITE / p).read_bytes()).hexdigest() != pub.get(p)]
        ghi_dot(gio, "dot-moi", files, lambda p, sha: (SITE / p).read_bytes())

    # trang trong phạm vi chưa từng có trong biên bản → đã lên kệ trước khi có công cụ
    for x in SITE.rglob("*.html"):
        p = x.relative_to(SITE).as_posix()
        if trong_pham_vi(p): trang.setdefault(p, {"len_ke": None, "truoc": True, "cap_nhat": []})

    cu = json.loads((KHO / "chung/len-ke/ngay-cu.json").read_text(encoding="utf-8")).get("trang", {})
    ra = {}
    for p, t in sorted(trang.items()):
        if not (SITE / p).is_file(): continue
        e = {}
        if t["len_ke"]: e["l"] = t["len_ke"]
        elif cu.get(p): e["l"] = cu[p]
        else: e["t"] = TRUOC_CONG_CU
        cn = [g for g in t["cap_nhat"] if g and g != e.get("l")]
        if cn: e["c"] = max(cn); e["n"] = len(cn)
        ra[p] = e
    out = Path(a.ra) if a.ra else SITE / "sach-tinh-hoa/chung/len-ke.json"
    out.write_text(json.dumps({"ghi_chu": "Ngày giờ lên kệ (l), lên kệ trước ngày (t), cập nhật nội dung gần nhất (c), số lần cập nhật (n). Giờ Việt Nam. Sinh bằng chung/len-ke/sinh-len-ke.py từ biên bản phát hành.",
                               "sinh_luc": datetime.datetime.now().astimezone().isoformat()[:16], "trang": ra}, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"{len(ra)} trang · lên kệ có giờ {sum('l' in e for e in ra.values())} · trước {TRUOC_CONG_CU} {sum('t' in e for e in ra.values())} · có cập nhật {sum('c' in e for e in ra.values())} → {out}")


if __name__ == "__main__":
    main()
