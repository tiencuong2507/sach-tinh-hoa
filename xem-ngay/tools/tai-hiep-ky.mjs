// Tải các quyển Hiệp kỷ biện phương thư (欽定協紀辨方書, bản Tứ khố, Wikisource) về nguon/ để dẫn nguồn quy tắc xem ngày.
// node tools/tai-hiep-ky.mjs [số quyển ...]  (mặc định quyển 4, 6, 10, 36)
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("nguon", { recursive: true });
const q = process.argv.slice(2).length ? process.argv.slice(2) : ["4", "6", "10", "36"];
const titles = q.map(n => `欽定協紀辨方書 (四庫全書本)/卷${String(n).padStart(2,"0")}`).join("|");
const url = "https://zh.wikisource.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&variant=zh-hant&titles=" + encodeURIComponent(titles);
const data = await (await fetch(url, { headers: { "User-Agent": "SachTinhHoa/0.1 (personal study tool)" } })).json();
for (const p of data.query.pages) {
  if (p.missing || !p.revisions) { console.log("Thiếu:", p.title); continue; }
  const n = p.title.match(/卷(\d+)/)[1];
  writeFileSync(`nguon/hiep-ky-q${n}.txt`, `# ${p.title} — nguồn: https://zh.wikisource.org/wiki/${p.title}\n` + p.revisions[0].slots.main.content, "utf8");
  console.log("Đã tải:", p.title, p.revisions[0].slots.main.content.length, "ký tự");
}
