// Tải nguyên văn 64 quẻ Chu Dịch (公有领域) từ Wikisource tiếng Trung qua MediaWiki API.
// Lưu wikitext gốc vào nguon/zh/NN.txt để đối chiếu khi biên soạn.
import { mkdirSync, writeFileSync } from "node:fs";

const NAMES = ["乾","坤","屯","蒙","需","訟","師","比","小畜","履","泰","否","同人","大有","謙","豫",
"隨","蠱","臨","觀","噬嗑","賁","剝","復","无妄","大畜","頤","大過","坎","離","咸","恒","遯",
"大壯","晉","明夷","家人","睽","蹇","解","損","益","夬","姤","萃","升","困","井","革",
"鼎","震","艮","漸","歸妹","豐","旅","巽","兌","渙","節","中孚","小過","既濟","未濟"];

mkdirSync("nguon/zh", { recursive: true });
const api = "https://zh.wikisource.org/w/api.php";
const missing = [];
for (let start = 0; start < 64; start += 20) {
  const batch = NAMES.slice(start, start + 20);
  const titles = batch.map(n => "周易/" + n).join("|");
  const url = `${api}?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&variant=zh-hant&titles=${encodeURIComponent(titles)}`;
  const res = await fetch(url, { headers: { "User-Agent": "KinhDichOffline/0.2 (personal study tool)" } });
  const data = await res.json();
  const norm = Object.fromEntries((data.query.normalized || []).map(x => [x.to, x.from]));
  const redir = Object.fromEntries((data.query.redirects || []).map(x => [x.to, x.from]));
  for (const p of data.query.pages) {
    let t = p.title; if (redir[t]) t = redir[t]; if (norm[t]) t = norm[t];
    const name = t.replace("周易/", "");
    const idx = NAMES.indexOf(name);
    if (idx < 0 || p.missing || !p.revisions) { missing.push(p.title); continue; }
    const text = p.revisions[0].slots.main.content;
    writeFileSync(`nguon/zh/${String(idx + 1).padStart(2, "0")}.txt`, `# 周易/${name} — nguồn: https://zh.wikisource.org/wiki/周易/${name}\n` + text, "utf8");
  }
}
console.log("Thiếu:", missing.length ? missing.join(", ") : "không");
