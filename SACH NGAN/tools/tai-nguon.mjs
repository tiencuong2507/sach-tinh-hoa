// Tải wikitext một trang từ Wikisource tiếng Trung (phạm vi công cộng) bằng API, lưu vào nguon/<slug>.txt.
// Dùng: node tools/tai-nguon.mjs <tên trang Wikisource> <slug>   (chạy trong thư mục SACH NGAN)
// Ví dụ: node tools/tai-nguon.mjs 朱子家訓 chu-tu-gia-huan
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [tenTrang, slug] = process.argv.slice(2);
if (!tenTrang || !slug) { console.error("Dùng: node tools/tai-nguon.mjs <tên trang Wikisource> <slug>"); process.exit(2); }
const GOC = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(GOC, "nguon"), { recursive: true });

const api = "https://zh.wikisource.org/w/api.php";
const url = `${api}?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&titles=${encodeURIComponent(tenTrang)}`;
const res = await fetch(url, { headers: { "User-Agent": "SachTinhHoa/0.1 (personal study tool)" } });
if (!res.ok) { console.error("Lỗi HTTP", res.status); process.exit(1); }
const data = await res.json();
const p = (data.query?.pages || [])[0];
if (!p || p.missing || !p.revisions) { console.error("Không có trang:", tenTrang); process.exit(1); }
const chuyenHuong = (data.query.redirects || []).map(r => `${r.from} → ${r.to}`).join("; ");
const out = join(GOC, "nguon", `${slug}.txt`);
writeFileSync(out, `# ${p.title} — nguồn: https://zh.wikisource.org/wiki/${encodeURIComponent(p.title)}` +
  (chuyenHuong ? ` (chuyển hướng: ${chuyenHuong})` : "") + `\n` + p.revisions[0].slots.main.content, "utf8");
console.log(`Đã tải "${p.title}" → ${out}${chuyenHuong ? " (" + chuyenHuong + ")" : ""}`);
