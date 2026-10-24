// Bóc wikitext trong nguon/zh/NN.txt thành dữ liệu có cấu trúc: data/nguyen-van.js
// (chạy được offline bằng file://, không cần máy chủ).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const clean = s => s
  .replace(/\{\{\*\|[^}]*\}\}/g, "")
  .replace(/\{\{另\|([^|}]*)\|[^}]*\}\}/g, "$1")   // dị bản: giữ chữ chính
  .replace(/\{\{[^}]*\}\}/g, "")
  .replace(/-\{(?:[A-Za-z]\|)?([^}]*)\}-/g, "$1")
  .replace(/<[^>]+>/g, "")
  .replace(/'''/g, "")
  .replace(/^[*#:]+/, "")
  .trim();

const out = {};
for (let n = 1; n <= 64; n++) {
  const raw = readFileSync(`nguon/zh/${String(n).padStart(2, "0")}.txt`, "utf8").split(/\r?\n/);
  const src = raw[0].split("nguồn: ")[1];
  const e = { n, src, ten: "", quai: "", tu: "", hao: [], dung: "", thoan: "", daiTuong: "", tieuTuong: [] };
  let sec = "";
  for (const line of raw) {
    const L = line.trim();
    if (/Iching-hexagram/.test(L)) { e.quai = clean(L.replace(/\[\[[^\]]*\]\]/, "")); continue; }
    if (/易經：/.test(L)) { sec = "kinh"; continue; }
    if (/^\*'''彖曰/.test(L)) { sec = "thoan"; continue; }
    if (/^\*'''象曰/.test(L)) { sec = "tuong"; continue; }
    if (/^\*'''/.test(L)) { sec = "khac"; continue; }   // 文言 v.v. bỏ qua
    if (!L.startsWith("*")) continue;
    const t = clean(L);
    if (!t) continue;
    if (sec === "kinh" && /^\*\*\*/.test(L)) { e.tu += t; continue; }      // lời quẻ viết nhiều dòng
    if (sec === "tuong" && /^\*\*\*/.test(L)) { e.daiTuong += t; continue; }
    if (sec === "kinh") {
      if (/^\*\*[^*]/.test(L)) {
        const b = L.match(/'''(.*?)'''/); const name = b ? clean(b[1]) : "";
        if (t.startsWith(name + "：")) { e.ten = name; e.tu = t.slice(name.length + 1); }
        else { e.ten = name; e.tu = t; }   // kiểu "履虎尾…": tên quẻ nằm trong lời quẻ
      }
      else if (/^\*#/.test(L)) {
        if (/^用[九六]/.test(t)) e.dung = t; else e.hao.push(t);
      }
    } else if (sec === "thoan") {
      e.thoan += t;
    } else if (sec === "tuong") {
      if (/^\*\*/.test(L) && !e.daiTuong) e.daiTuong = t;
      else if (/^\*#/.test(L)) e.tieuTuong.push(t);
    }
  }
  out[n] = e;
}
mkdirSync("data", { recursive: true });
writeFileSync("data/nguyen-van.js",
  "// Nguyên văn Chu Dịch (kinh văn, Thoán, Tượng) — phạm vi công cộng, bóc từ Wikisource tiếng Trung.\n" +
  "window.KD_ZH = " + JSON.stringify(out, null, 1) + ";\n", "utf8");
writeFileSync("nguon/nguyen-van.json", JSON.stringify(out, null, 1), "utf8");
const bad = Object.values(out).filter(e => e.hao.length !== 6 || !e.tu || !e.daiTuong || !e.thoan || e.tieuTuong.length < 6);
console.log("Số quẻ:", Object.keys(out).length, "| Quẻ lỗi cấu trúc:", bad.map(e => `${e.n}(hao=${e.hao.length},tt=${e.tieuTuong.length})`).join(" ") || "không");
