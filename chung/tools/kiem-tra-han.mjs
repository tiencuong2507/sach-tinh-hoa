// Kiểm lớp nghĩa chữ Hán: node chung/tools/kiem-tra-han.mjs (chạy từ thư mục gốc kho). Thất bại → exit 1.
// 1) Từ điển khớp phiên bản ghi trong han.js (tức là đã sinh lại sau lần sửa dữ liệu cuối).
// 2) Mốc đã biết: câu kinh văn, câu Sách ngắn, tên thần sát, việc, quẻ Phong thủy, âm từng chữ.
// 3) Độ phủ: mọi cụm chữ Hán trong dữ liệu từng chuyên mục phải tra ra âm (câu khớp, hoặc đủ âm từng chữ); báo tỷ lệ có nghĩa.
// 4) Mọi trang chuyên mục gắn ../chung/han.js đúng một lần; han.js loại ký hiệu quẻ U+4DC0–4DFF; tra cứu giả lập giống trình duyệt.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";
const MUC = ["kinh-dich", "sach-ngan", "coi-tam", "le-cung", "xem-ngay", "tu-vi", "phong-thuy"];
const errs = [], ok = (c, m) => { if (!c) errs.push(m); };
const chiHan = s => (s || "").replace(/[^\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, "");
const nap = f => { const c = {}; c.window = c; vm.createContext(c); vm.runInContext(readFileSync(f, "utf8"), c); return c; };

// 1) phiên bản
const h = createHash("sha256"); for (const f of ["am", ...MUC]) h.update(readFileSync(`chung/han/${f}.js`));
const hj = readFileSync("chung/han.js", "utf8");
ok(hj.includes(`const PHIEN_BAN = "${h.digest("hex").slice(0, 12)}"`), "han.js: PHIEN_BAN không khớp từ điển — chạy lại chung/tools/tao-tu-dien-han.mjs");
ok(/u3400-\\+u4dbf\\+u4e00-\\+u9fff/.test(hj) && !/u3400-\\+u9fff/.test(hj),"han.js: dải chữ Hán phải bỏ U+4DC0–4DFF (ký hiệu quẻ)");

const AM = nap("chung/han/am.js").HAN_AM;
const td = {}; for (const m of MUC) { const c = nap(`chung/han/${m}.js`).HAN_CAU; td[m] = { cau: c, bang: new Map(c.map(r => [r[0], r])) }; }
// tra cứu giống han.js
const amChu = k => { const c = [...k], biet = c.filter(x => AM[x]).length; return biet / c.length >= 0.7 ? c.map(x => (AM[x] || x).split("/")[0]).join(" ") : ""; };
const tra = (m, k) => {
  const x = td[m].bang.get(k); if (x) return { am: x[1], nghia: x[2], khop: "cau" };
  let tot = null; for (const c of td[m].cau) if (c[0].length > k.length && c[0].includes(k) && (c[2] || c[1]) && (!tot || c[0].length < tot[0].length)) tot = c;
  return { am: amChu(k), nghia: "", trong: tot, khop: tot ? "trong" : "chu" };
};

// 2) mốc đã biết
const moc = [
  ["kinh-dich", "初九：潛龍勿用。", r => r.am === "Sơ cửu: Tiềm long, vật dụng." && /Rồng/.test(r.nghia)],
  ["kinh-dich", "天行健，君子以自強不息。", r => /^Thiên hành kiện/.test(r.am) && /tự cường/.test(r.nghia)],
  ["kinh-dich", "一陰一陽之謂道", r => /một âm một dương/.test(r.nghia)],
  ["sach-ngan", "孫子曰：兵者，國之大事", r => r.khop === "trong" && /việc binh là việc lớn/.test(r.trong[2])],
  ["sach-ngan", "夫道、德、仁、義、禮，五者一體也。", r => /^Phù đạo, đức/.test(r.am) && /một thể/.test(r.nghia)],
  ["xem-ngay", "天德", r => r.am === "Thiên Đức" && /tốt/.test(r.nghia) && /Cúng tế/.test(r.nghia)],
  ["xem-ngay", "祭祀", r => /Cúng tế/.test(r.nghia)],
  ["phong-thuy", "坎", r => r.am === "Khảm" && /Bắc/.test(r.nghia)],
  ["tu-vi", "紫府同宮", r => r.am === "Tử Phủ đồng cung" && r.nghia.length > 10],
  ["le-cung", "敢昭告於", r => /kính cáo/i.test(r.nghia)],
];
for (const [m, z, f] of moc) { const r = tra(m, chiHan(z)); ok(f(r), `Mốc ${m} ${z}: ra ${JSON.stringify(r).slice(0, 160)}`); }
for (const [c, a] of [["潛", "tiềm"], ["龍", "long"], ["書", "thư"], ["禮", "lễ"], ["道", "đạo"], ["天", "thiên"]]) ok((AM[c] || "").split("/")[0] === a, `Âm ${c}: ra ${AM[c]} mong ${a}`);
// red-team giả lập: cụm có chữ lạ không có trong từ điển phải hiện lại chính chữ đó, không bịa âm
ok(amChu("天地人龘") === "thiên địa nhân 龘", "Chữ lạ (1/4, dưới 30%) phải hiện lại nguyên chữ, không bịa âm"); ok(amChu("龘龘天") === "", "Thiếu âm quá 30% phải bỏ dòng âm, không bịa");

// 3) độ phủ theo dữ liệu từng chuyên mục
// Sàn độ phủ âm theo dữ liệu hiện có của kho (25/10/2026). Chữ còn thiếu là chữ chỉ có trong nguyên văn Hán chưa phiên âm (Hiệp kỷ, Toàn thư giản thể…).
// Sàn chỉ được nâng, không hạ: hạ sàn nghĩa là từ điển kém đi.
const SAN = { "kinh-dich": 0.97, "sach-ngan": 0.99, "coi-tam": 0.84, "le-cung": 1, "xem-ngay": 0.78, "tu-vi": 0.84, "phong-thuy": 0.92 };
const bang = [];
for (const m of MUC) {
  const html = readFileSync(`${m}/${m}.html`, "utf8");
  ok((html.match(/<script src="\.\.\/chung\/han\.js"/g) || []).length === 1, `${m}.html phải gắn ../chung/han.js đúng một lần`);
  const srcs = [...html.matchAll(/<script src="([^"?]+)/g)].map(x => x[1]).filter(s => !s.startsWith("../"));
  const cum = new Set();
  for (const s of srcs) for (const x of readFileSync(`${m}/${s}`, "utf8").matchAll(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff](?:[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef·・]*[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])?/g)) cum.add(chiHan(x[0]));
  let coAm = 0, coNghia = 0, chuThieu = new Set();
  for (const k of cum) {
    const r = tra(m, k); const thieu = [...k].filter(c => !AM[c]);
    if (r.khop !== "chu" || thieu.length / [...k].length <= 0.1) coAm++; else thieu.forEach(c => chuThieu.add(c));
    if (r.nghia || r.trong) coNghia++;
  }
  const pAm = coAm / Math.max(1, cum.size), pNg = coNghia / Math.max(1, cum.size);
  bang.push(`${m}: ${cum.size} cụm, có âm ${(pAm * 100).toFixed(1)}%, có nghĩa ${(pNg * 100).toFixed(1)}%${chuThieu.size ? `, chữ chưa có âm: ${[...chuThieu].slice(0, 12).join("")}${chuThieu.size > 12 ? "…" : ""} (${chuThieu.size})` : ""}`);
  ok(pAm >= SAN[m], `${m}: chỉ ${(pAm * 100).toFixed(1)}% cụm có âm (sàn ${SAN[m] * 100}%)`);
}
console.log("Lớp nghĩa chữ Hán:\n  " + bang.join("\n  ") + `\n  Âm từng chữ: ${Object.keys(AM).length} chữ. Lỗi: ${errs.length}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
