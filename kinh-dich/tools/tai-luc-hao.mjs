// Tải sách Tăng san bốc dịch (增刪卜易, Dã Hạc lão nhân, đời Thanh; phạm vi công cộng) từ Wikisource về nguon/luc-hao/
// để đối chiếu phép an quẻ Lục hào (bát cung, thế ứng, nạp giáp, lục thân) với các ví dụ trong sách.
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("nguon/luc-hao", { recursive: true });
const pages = ["增刪卜易", ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map(n => "增刪卜易/" + n)];
const ok = [], miss = [];
for (let i = 0; i < pages.length; i += 20) {
  const titles = pages.slice(i, i + 20).join("|");
  const url = "https://zh.wikisource.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&variant=zh-hant&titles=" + encodeURIComponent(titles);
  const data = await (await fetch(url, { headers: { "User-Agent": "KinhDichOffline/0.3 (personal study tool)" } })).json();
  for (const p of data.query.pages) {
    if (p.missing || !p.revisions) { miss.push(p.title); continue; }
    const f = p.title.replace("增刪卜易", "zsby").replace("/", "-");
    writeFileSync(`nguon/luc-hao/${f}.txt`, `# ${p.title} — nguồn: https://zh.wikisource.org/wiki/${p.title}\n` + p.revisions[0].slots.main.content, "utf8");
    ok.push(p.title);
  }
}
console.log("Đã tải:", ok.length, "trang | Thiếu:", miss.join(", ") || "không");
