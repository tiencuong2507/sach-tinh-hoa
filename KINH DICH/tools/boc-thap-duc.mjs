// Bóc nguyên văn Thuyết quái, Tự quái, Tạp quái (nguon/zh-truyen) và Văn ngôn (nguon/zh/01, 02) theo chương
// → nguon/thap-duc.json. Chia chương theo Wikisource; Văn ngôn Càn chia 4 tiết theo các dòng ngăn "*:" của Wikisource.
import { readFileSync, writeFileSync } from "node:fs";
const clean = s => s
  .replace(/\{\{gap\}\}/g, "")
  .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1")
  .replace(/\[\[(?:[^\]]*\/)?([^\]/]*)\]\]/g, "$1")
  .replace(/-\{(?:[A-Za-z]\|)?([^}]*)\}-/g, "$1")
  .replace(/\{\{[^}]*\}\}/g, "")
  .replace(/^[*#:]+/, "").replace(/'{2,}/g, "").replace(/\s+/g, "").trim();
function chuong(file, stop) {
  const lines = readFileSync(`nguon/zh-truyen/${file}.txt`, "utf8").split(/\r?\n/);
  const chs = []; let cur = null;
  for (const L of lines) {
    if (stop && L.includes(stop)) break;
    if (/^==.+==\s*$/.test(L)) { cur = []; chs.push(cur); continue; }
    if (!cur) continue;
    const t = clean(L); if (t) cur.push(t);
  }
  return chs.map(p => p.join(""));
}
function vanNgon(file) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  const chs = []; let cur = null, on = false;
  for (const L of lines) {
    if (/文言曰/.test(L)) { on = true; cur = []; chs.push(cur); continue; }
    if (!on) continue;
    if (/^\*:\s*$/.test(L.trim())) { cur = []; chs.push(cur); continue; }
    const t = clean(L); if (t) cur.push(t);
  }
  return chs.map(p => p.join(""));
}
const out = {
  thuyetQuai: chuong("說卦"),
  tuQuai: chuong("序卦"),
  tapQuai: chuong("雜卦", "校詁版"),
  vanNgon: [...vanNgon("nguon/zh/01.txt"), ...vanNgon("nguon/zh/02.txt")],
};
writeFileSync("nguon/thap-duc.json", JSON.stringify(out, null, 1), "utf8");
for (const k in out) console.log(k, out[k].length, "chương,", out[k].join("").length, "ký tự");
