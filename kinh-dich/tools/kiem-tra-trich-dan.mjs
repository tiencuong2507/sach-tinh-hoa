// Soát trích dẫn chữ Hán trong các chương N9 (Hoàng cực kinh thế), N10 (Lục hào), N11 (thời cuộc), N12 (Dịch như cách nhìn hệ thống):
// mỗi đoạn <span class="zh">…</span> phải có trong nguyên văn đã tải (bỏ dấu câu, quy dị thể thường gặp).
import { readFileSync, readdirSync } from "node:fs";
// {{另|包|苞}} (chữ dị thể trong Wikisource) → lấy chữ đầu, cùng cách với tools/kiem-tra-cam-nang*.mjs
const bo = s => s.replace(/\{\{SK anchor\|([^}]*)\}\}/g, "$1").replace(/-\{([^}]*)\}-/g, "$1").replace(/\{\{另\|([^|}]*)\|[^}]*\}\}/g, "$1").replace(/\{\{[^}]*\}\}/g, "")
  .replace(/[\s，。；：！？、「」『』《》“”‘’,.;:!?()（）·・﹐﹕…\-]/g, "")
  .replace(/㑹/g, "會").replace(/靑/g, "青").replace(/爲/g, "為").replace(/旣/g, "既");
const kho = d => readdirSync(d).filter(f => f.endsWith(".txt")).map(f => bo(readFileSync(`${d}/${f}`, "utf8"))).join("|");
const cap = [["data/hckt.js", kho("nguon/hckt")], ["data/luc-hao-sach.js", kho("nguon/luc-hao")],
  ["data/nghien-cuu-n11.js", kho("nguon/zh") + "|" + kho("nguon/zh-truyen")],
  ["data/nghien-cuu-n12.js", kho("nguon/zh") + "|" + kho("nguon/zh-truyen")]];
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
