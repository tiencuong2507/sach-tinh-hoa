// Soát trích dẫn chữ Hán trong các chương N9 (Hoàng cực kinh thế) và N10 (Lục hào):
// mỗi đoạn <span class="zh">…</span> phải có trong nguyên văn đã tải (bỏ dấu câu, quy dị thể thường gặp).
import { readFileSync, readdirSync } from "node:fs";
const bo = s => s.replace(/\{\{SK anchor\|([^}]*)\}\}/g, "$1").replace(/-\{([^}]*)\}-/g, "$1").replace(/\{\{[^}]*\}\}/g, "")
  .replace(/[\s，。；：！？、「」『』《》“”‘’,.;:!?()（）·・﹐﹕…\-]/g, "")
  .replace(/㑹/g, "會").replace(/靑/g, "青").replace(/爲/g, "為").replace(/旣/g, "既");
const kho = d => readdirSync(d).filter(f => f.endsWith(".txt")).map(f => bo(readFileSync(`${d}/${f}`, "utf8"))).join("|");
const cap = [["data/hckt.js", kho("nguon/hckt")], ["data/luc-hao-sach.js", kho("nguon/luc-hao")]];
let tong = 0; const thieu = [];
for (const [f, goc] of cap) {
  const txt = readFileSync(f, "utf8");
  for (const m of txt.matchAll(/<span class="zh">([^<]+)<\/span>/g)) {
    tong++; const parts = m[1].split("…").map(bo).filter(Boolean);
    if (!parts.every(p => goc.includes(p))) thieu.push(`${f}: ${m[1]}`);
  }
}
console.log(`Trích dẫn: ${tong - thieu.length}/${tong} đoạn tìm thấy trong nguyên văn`);
if (thieu.length) { console.log("Không thấy:\n" + thieu.join("\n")); process.exit(1); }
console.log("OK");
