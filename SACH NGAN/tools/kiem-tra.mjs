// Kiểm tra Sách ngắn: node tools/kiem-tra.mjs   (chạy trong thư mục SACH NGAN hoặc bất kỳ đâu)
// - nạp data/*.js như trình duyệt (vm) → window.SN_SACH
// - mỗi đoạn đủ 4 trường zh / hv / dich / g
// - zh là chuỗi con của chính văn trong nguon/<slug>.txt (bỏ khoảng trắng, dấu câu, mã wikitext {{…}} và thẻ)
// - số âm tiết hv = số chữ Hán trong zh
// - nối mọi zh phải phủ ≥ 95% số chữ Hán của chính văn nguồn (không bỏ sót câu)
// - giao diện giả lập dựng được mục lục và trang sách, không có "undefined"
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const GOC = join(dirname(fileURLToPath(import.meta.url)), "..");
const NGUONG_PHU = 0.99;
const HAN = /[㐀-䶿一-鿿豈-﫿]/g, LA_HAN = /^[㐀-䶿一-鿿豈-﫿]$/;
const demHan = s => (s.match(HAN) || []).length;
// chuẩn hoá: bỏ khoảng trắng, dấu câu Hán và Latinh
const bo = s => s.replace(/[\s，。；：！？、「」『』《》“”‘’,.;:!?()（）·・﹐﹕…\-]/g, "");
// chính văn của một trang Wikisource: ưu tiên phần trong <poem>…</poem>; bỏ {{…}}, thẻ HTML, [[Category]], dòng # nguồn
function chinhVan(wikitext) {
  let t = wikitext.replace(/^#.*\n/, "");
  const poem = [...t.matchAll(/<poem>([\s\S]*?)<\/poem>/g)].map(m => m[1]);
  if (poem.length) t = poem.join("\n");
  t = t.replace(/\{\{[\s\S]*?\}\}/g, "").replace(/<[^>]+>/g, "").replace(/\[\[[^\]]*\]\]/g, "").replace(/^:+.*$/gm, "");
  return t;
}
const errs = [];

// 1. nạp data
const ctx = { window: {} }; vm.createContext(ctx);
for (const f of readdirSync(join(GOC, "data")).filter(f => f.endsWith(".js")).sort()) {
  try { vm.runInContext(readFileSync(join(GOC, "data", f), "utf8"), ctx, { filename: f }); }
  catch (e) { errs.push(`data/${f}: lỗi cú pháp – ${e.message}`); }
}
const SACH = (ctx.window.SN_SACH || []).filter(Boolean);
if (!SACH.length) errs.push("Không có cuốn nào trong SN_SACH");

// 2. kiểm từng cuốn
let tongDoan = 0, datDoan = 0;
for (const s of SACH) {
  const ten = s.ten || s.slug || "?";
  for (const k of ["slug", "ten", "tenHan", "tacGia", "gioiThieu", "nguon", "doan", "ketLuan"]) if (!s[k]) errs.push(`${ten}: thiếu trường ${k}`);
  const fNguon = join(GOC, "nguon", `${s.slug}.txt`);
  if (!existsSync(fNguon)) { errs.push(`${ten}: thiếu nguon/${s.slug}.txt`); continue; }
  const goc = bo(chinhVan(readFileSync(fNguon, "utf8")));
  const soHanGoc = demHan(goc);
  let noi = "";
  (s.doan || []).forEach((d, i) => {
    tongDoan++;
    const loi = [];
    for (const k of ["zh", "hv", "dich", "g"]) if (!d[k] || !String(d[k]).trim()) loi.push(`thiếu ${k}`);
    const z = bo(d.zh || "");
    if (z && !goc.includes(z)) loi.push(`chữ Hán không thấy trong nguồn: "${z.slice(0, 14)}…"`);
    const nHan = demHan(z), nAm = (d.hv || "").replace(/[,.;:?!]/g, " ").trim().split(/\s+/).filter(Boolean).length;
    if (nHan !== nAm) loi.push(`chữ Hán ${nHan} ≠ âm Hán Việt ${nAm}`);
    noi += z;
    if (loi.length) errs.push(`${ten} đoạn ${i + 1}: ${loi.join("; ")}`); else datDoan++;
  });
  // độ phủ: đếm số chữ Hán của nguồn đã được một đoạn nào đó phủ (theo vị trí, tránh đếm trùng)
  const phu = new Array(goc.length).fill(false);
  for (const d of s.doan || []) { const z = bo(d.zh || ""); let p = -1; while (z && (p = goc.indexOf(z, p + 1)) >= 0) for (let j = 0; j < z.length; j++) phu[p + j] = true; }
  let soPhu = 0; for (let j = 0; j < goc.length; j++) if (phu[j] && LA_HAN.test(goc[j])) soPhu++;
  const tyLe = soHanGoc ? soPhu / soHanGoc : 0;
  console.log(`${ten}: ${(s.doan || []).length} đoạn, ${demHan(noi)} chữ Hán, phủ ${soPhu}/${soHanGoc} chữ của chính văn (${(tyLe * 100).toFixed(1)}%)`);
  if (tyLe < NGUONG_PHU) errs.push(`${ten}: độ phủ ${(tyLe * 100).toFixed(1)}% < ${NGUONG_PHU * 100}%`);
}

// 3. giao diện giả lập
{
  const els = {};
  const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: true, dataset: {}, classList: { toggle() {}, contains() { return false; } }, scrollIntoView() {}, onclick: null, onchange: null });
  const gd = { localStorage: { _: {}, getItem(k) { return this._[k] ?? null; }, setItem(k, v) { this._[k] = String(v); }, removeItem(k) { delete this._[k]; } },
    document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [], title: "" }, console, scrollTo() {} };
  gd.window = gd; vm.createContext(gd);
  try {
    const html = readFileSync(join(GOC, "sach-ngan.html"), "utf8");
    for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(readFileSync(join(GOC, m[1]), "utf8"), gd, { filename: m[1] });
    const run = c => vm.runInContext(c, gd);
    const P = run("PAGES()");
    if (P.length !== SACH.length + 1) errs.push(`Giao diện: ${P.length} trang, mong đợi ${SACH.length + 1}`);
    for (const p of P) {
      run(`go(${JSON.stringify(p)})`);
      const h = els.book.innerHTML;
      if (!h || h.includes("undefined") || h.includes("[object Object]")) errs.push(`Giao diện: trang ${p} lỗi`);
      if (p === "toc") for (const s of SACH) if (!h.includes(s.ten) || !h.includes(s.tenHan)) errs.push(`Mục lục thiếu ${s.ten}`);
      else { const s = SACH.find(x => "s" + x.slug === p);
        if (s && (!h.includes(s.tenHan) || !h.includes(s.doan[s.doan.length - 1].zh) || !h.includes(s.ketLuan.slice(0, 30)) || !h.includes(s.nguon.url))) errs.push(`Trang ${p} thiếu tiêu đề Hán / đoạn cuối / kết luận / nguồn`); }
    }
    // tắt chữ Hán: không còn thẻ .zh trong trang sách
    els.showzh.checked = false; run(`go(${JSON.stringify(P[1])})`);
    if (els.book.innerHTML.includes('class="zh"')) errs.push("Nút ẩn chữ Hán không có tác dụng");
    els.showzh.checked = true;
    if (gd.localStorage.getItem("sn_page") !== P[1]) errs.push("Không nhớ trang đang đọc vào localStorage");
  } catch (e) { errs.push(`Giao diện: ${e.message}`); }
}

console.log(`Sách ngắn: đạt ${datDoan}/${tongDoan} đoạn (${SACH.length} cuốn)`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
