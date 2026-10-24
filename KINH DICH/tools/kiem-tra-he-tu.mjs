// Kiểm tra bản dịch Hệ từ: node tools/kiem-tra-he-tu.mjs
// - mỗi chương có tóm ý; mỗi đoạn có chữ Hán, âm Hán Việt, dịch nghĩa
// - ghép chữ Hán các đoạn của một chương phải TRÙNG KHÍT nguyên văn (bỏ qua dấu câu, khoảng trắng)
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";
const goc = JSON.parse(readFileSync("nguon/he-tu.json", "utf8"));
const ctx = { window: {} }; vm.createContext(ctx);
const errs = [];
for (const f of readdirSync("data").filter(f => /^he-tu-\d+\.js$/.test(f)).sort()) {
  try { vm.runInContext(readFileSync("data/" + f, "utf8"), ctx, { filename: f }); } catch (e) { errs.push(`${f}: lỗi cú pháp – ${e.message}`); }
}
const HT = ctx.window.KD_HETU || {};
const bo = s => s.replace(/[\s，。；：！？、「」『』《》“”‘’,.;:!?()（）·]/g, "");
let dat = 0, tong = 0, doan = 0;
for (const key of ["thuong", "ha"]) {
  goc[key].forEach((txt, i) => {
    tong++;
    const c = (HT[key] || [])[i], ten = `Hệ từ ${key === "thuong" ? "thượng" : "hạ"} chương ${i + 1}`;
    if (!c) { errs.push(`${ten}: chưa có`); return; }
    const miss = [];
    if (!c.tom || !c.tom.trim()) miss.push("tóm ý");
    (c.doan || []).forEach((d, j) => { doan++; if (!d.zh || !d.hv || !d.dich) miss.push(`đoạn ${j + 1} thiếu trường`); });
    const a = bo((c.doan || []).map(d => d.zh || "").join("")), b = bo(txt);
    if (a !== b) {
      let k = 0; while (k < a.length && a[k] === b[k]) k++;
      miss.push(`chữ Hán lệch từ vị trí ${k}: bản dịch "${a.slice(k, k + 12)}" ≠ gốc "${b.slice(k, k + 12)}"`);
    }
    if (miss.length) errs.push(`${ten}: ${miss.join("; ")}`); else dat++;
  });
}
console.log(`Hệ từ: đạt ${dat}/${tong} chương, ${doan} đoạn`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
