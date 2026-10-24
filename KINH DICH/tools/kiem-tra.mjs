// Kiểm tra dữ liệu sách: node tools/kiem-tra.mjs [từ quẻ] [đến quẻ]
// - nạp data/nguyen-van.js, data/dan-nhap.js, data/vi-*.js như trình duyệt
// - mỗi quẻ có đủ trường giải nghĩa, 6 hào, tên hào (Sơ cửu, Lục nhị…) khớp nguyên văn chữ Hán
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";

const from = +(process.argv[2] || 1), to = +(process.argv[3] || 64);
const ctx = { window: {} }; vm.createContext(ctx);
const files = ["data/nguyen-van.js", "data/dan-nhap.js",
  ...readdirSync("data").filter(f => /^vi-\d+\.js$/.test(f)).sort().map(f => "data/" + f)];
const errs = [];
for (const f of files) {
  try { vm.runInContext(readFileSync(f, "utf8"), ctx, { filename: f }); }
  catch (e) { errs.push(`${f}: lỗi cú pháp – ${e.message}`); }
}
const ZH = ctx.window.KD_ZH || {}, VI = ctx.window.KD_VI || {}, INTRO = ctx.window.KD_INTRO || [];
const POS = { "初": "Sơ", "二": "nhị", "三": "tam", "四": "tứ", "五": "ngũ", "上": "Thượng" };
const label = zh => {               // "初九：…" -> "Sơ cửu", "六二：…" -> "Lục nhị"
  const a = zh[0], b = zh[1];
  if (a === "初" || a === "上") return `${POS[a]} ${b === "九" ? "cửu" : "lục"}`;
  return `${a === "九" ? "Cửu" : "Lục"} ${POS[b]}`;
};
const ok = s => typeof s === "string" && s.trim().length > 0;
let done = 0;
for (let n = from; n <= to; n++) {
  const v = VI[n], z = ZH[n];
  if (!z) { errs.push(`Quẻ ${n}: thiếu nguyên văn`); continue; }
  if (!v) { errs.push(`Quẻ ${n}: chưa có giải nghĩa`); continue; }
  const miss = [];
  if (!ok(v.tk)) miss.push("tk");
  if (!v.tu || !ok(v.tu.hv) || !ok(v.tu.dich)) miss.push("tu");
  if (!ok(v.thoan)) miss.push("thoan");
  if (!v.tuong || !ok(v.tuong.hv) || !ok(v.tuong.dich)) miss.push("tuong");
  if (!ok(v.giai)) miss.push("giai");
  if (!ok(v.khuyen)) miss.push("khuyen");
  if (!Array.isArray(v.hao) || v.hao.length !== 6) miss.push("hao(6)");
  else v.hao.forEach((x, i) => {
    if (!x || !ok(x.hv) || !ok(x.dich) || !ok(x.giai)) miss.push(`hao${i + 1}`);
    else if (!x.hv.startsWith(label(z.hao[i]))) miss.push(`hao${i + 1}: "${x.hv.slice(0, 12)}" phải bắt đầu "${label(z.hao[i])}"`);
  });
  if ((n === 1 || n === 2) && (!v.dung || !ok(v.dung.hv) || !ok(v.dung.dich))) miss.push("dung");
  if (miss.length) errs.push(`Quẻ ${n}: ${miss.join(", ")}`); else done++;
}
console.log(`Dẫn nhập: ${INTRO.length} chương | Quẻ ${from}–${to}: đạt ${done}/${to - from + 1}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
