// Tải một số quyển Hoàng cực kinh thế thư (bản Tứ khố toàn thư trên Wikisource, phạm vi công cộng) về nguon/hckt/
// để lấy mốc Nguyên–Hội–Vận–Thế đúng theo nguyên văn.
import { mkdirSync, writeFileSync } from "node:fs";
const BASE = "皇極經世書 (四庫全書本)/";
const QUYEN = ["卷01", "卷03上", "卷05上", "卷05下", "卷06中", "卷06下", "卷11", "卷13"];
mkdirSync("nguon/hckt", { recursive: true });
const titles = [BASE.slice(0, -1), ...QUYEN.map(q => BASE + q)].join("|");   // kèm trang chính (có Tứ khố đề yếu)
const url = "https://zh.wikisource.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&titles=" + encodeURIComponent(titles);
const res = await fetch(url, { headers: { "User-Agent": "KinhDichOffline/0.3 (personal study tool)" } });
const data = await res.json();
const ok = [], miss = [];
for (const p of data.query.pages) {
  const q = p.title.split("/").pop();
  if (p.missing || !p.revisions) { miss.push(q); continue; }
  writeFileSync(`nguon/hckt/${q}.txt`, `# ${p.title} — nguồn: https://zh.wikisource.org/wiki/${p.title}\n` + p.revisions[0].slots.main.content, "utf8");
  ok.push(q);
}
console.log("Đã tải:", ok.join(", "), "| Thiếu:", miss.join(", ") || "không");
