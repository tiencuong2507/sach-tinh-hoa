// Tải nguyên văn về nguon/ để dẫn nguồn quy tắc an sao (chạy trong thư mục TU VI: node tools/tai-nguon.mjs)
// 1) 紫微斗數全書 quyển 1–3 (Wikisource; trang mục lục chỉ có ba quyển con 卷一 卷二 卷三 — kiểm 24/10/2026, 卷四 báo missing)
// 2) zh.wikipedia 紫微斗数 (bảng so sánh Tứ Hóa 全集/全書, CC BY-SA, chỉ để đối chiếu)
// Nghỉ 6 giây giữa hai lần gọi; gộp nhiều trang trong một lần gọi API.
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("nguon", { recursive: true });
const UA = { "User-Agent": "SachTinhHoa/0.1 (personal study tool)" };
const api = (host, titles) => `https://${host}/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&converttitles=1&titles=${encodeURIComponent(titles)}`;
const ngay = new Date().toISOString().slice(0, 10);
{ const d = await (await fetch(api("zh.wikisource.org", ["卷一", "卷二", "卷三", "卷四"].map(q => "紫微斗數全書/" + q).join("|")), { headers: UA })).json();
  for (const p of d.query.pages) {
    if (p.missing || !p.revisions) { console.log("Thiếu:", p.title); continue; }
    const n = { "卷一": "q1", "卷二": "q2", "卷三": "q3", "卷四": "q4" }[p.title.split("/")[1]], c = p.revisions[0].slots.main.content;
    writeFileSync(`nguon/toan-thu-${n}.txt`, `# ${p.title} — nguồn: https://zh.wikisource.org/wiki/${p.title} — tải ${ngay} qua API Wikisource\n` + c, "utf8");
    console.log("Đã tải:", p.title, c.length, "ký tự");
  } }
await new Promise(r => setTimeout(r, 6000));
{ const d = await (await fetch(api("zh.wikipedia.org", "紫微斗数"), { headers: UA })).json();
  for (const p of d.query.pages) {
    if (p.missing || !p.revisions) { console.log("Thiếu:", p.title); continue; }
    const c = p.revisions[0].slots.main.content;
    writeFileSync("nguon/wikipedia-zh-tu-vi-dau-so.txt", `# ${p.title} — nguồn: https://zh.wikipedia.org/wiki/${p.title} — tải ${ngay} qua API Wikipedia (CC BY-SA 4.0, chỉ dùng đối chiếu)\n` + c, "utf8");
    console.log("Đã tải:", p.title, c.length, "ký tự");
  } }
