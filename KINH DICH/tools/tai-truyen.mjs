// Tải nguyên văn các thiên Truyện (Thập dực) ngoài 64 quẻ từ Wikisource tiếng Trung (phạm vi công cộng).
// Lưu wikitext gốc vào nguon/zh-truyen/<tên>.txt để trích dẫn và đối chiếu.
import { mkdirSync, writeFileSync } from "node:fs";

const PAGES = ["繫辭上", "繫辭下", "說卦", "序卦", "雜卦"];
mkdirSync("nguon/zh-truyen", { recursive: true });
const api = "https://zh.wikisource.org/w/api.php";
const titles = PAGES.map(n => "周易/" + n).join("|");
const url = `${api}?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&variant=zh-hant&titles=${encodeURIComponent(titles)}`;
const res = await fetch(url, { headers: { "User-Agent": "KinhDichOffline/0.3 (personal study tool)" } });
const data = await res.json();
const got = [];
for (const p of data.query.pages) {
  if (p.missing || !p.revisions) { console.log("Thiếu:", p.title); continue; }
  const name = p.title.split("/").pop();   // trang có thể chuyển hướng sang 周易/易傳/…
  writeFileSync(`nguon/zh-truyen/${name}.txt`,
    `# ${p.title} — nguồn: https://zh.wikisource.org/wiki/${p.title}\n` + p.revisions[0].slots.main.content, "utf8");
  got.push(name);
}
console.log("Đã tải:", got.join(", "));
