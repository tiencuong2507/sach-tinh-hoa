// Bóc nguyên văn Hệ từ thượng/hạ (nguon/zh-truyen/繫辭上.txt, 繫辭下.txt) thành từng chương → nguon/he-tu.json
import { readFileSync, writeFileSync } from "node:fs";
const clean = s => s
  .replace(/\{\{gap\}\}/g, "")
  .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1")          // [[周易/離|離]] → 離
  .replace(/\[\[(?:[^\]]*\/)?([^\]/]*)\]\]/g, "$1")      // [[周易/夬]] → 夬
  .replace(/-\{(?:[A-Za-z]\|)?([^}]*)\}-/g, "$1")
  .replace(/\{\{[^}]*\}\}/g, "")
  .replace(/^:+/, "").replace(/'{2,}/g, "").trim();
const out = {};
for (const [key, file] of [["thuong", "繫辭上"], ["ha", "繫辭下"]]) {
  const lines = readFileSync(`nguon/zh-truyen/${file}.txt`, "utf8").split(/\r?\n/);
  const chs = []; let cur = null;
  for (const L of lines) {
    if (/^==第.+章==/.test(L)) { cur = []; chs.push(cur); continue; }
    if (!cur) continue;
    const t = clean(L); if (t) cur.push(t);
  }
  out[key] = chs.map(p => p.join(""));
}
writeFileSync("nguon/he-tu.json", JSON.stringify(out, null, 1), "utf8");
console.log(`Hệ từ thượng: ${out.thuong.length} chương, ${out.thuong.join("").length} ký tự | Hệ từ hạ: ${out.ha.length} chương, ${out.ha.join("").length} ký tự`);
