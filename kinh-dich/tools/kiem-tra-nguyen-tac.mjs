// Kiểm 64 nguyên tắc hành xử (data/nguyen-tac-64.js) và trang "nt": node tools/kiem-tra-nguyen-tac.mjs
// Nạp như trình duyệt (vm theo <script src> của kinh-dich.html, giống tools/kiem-tra-giao-dien.mjs).
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const NHOM = ["Tu thân", "Làm việc", "Ứng xử", "Gia đình", "Lãnh đạo", "Tiền của", "Thời thế"];
const MAX_CHU_NGUYEN_TAC = 16, MIN_CHU_TINH_HUONG = 40;

const els = {};
const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: true, dataset: {},
  classList: { toggle() {}, contains() { return false; } }, scrollIntoView() {}, onclick: null, oninput: null, onchange: null });
const ctx = { localStorage: { _: {}, getItem(k) { return this._[k] ?? null; }, setItem(k, v) { this._[k] = String(v); }, removeItem(k) { delete this._[k]; } },
  document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [] }, crypto: webcrypto, console, scrollTo() {} };
ctx.window = ctx; vm.createContext(ctx);
const html = readFileSync("kinh-dich.html", "utf8");
if (!html.includes('<script src="data/nguyen-tac-64.js">')) { console.log("kinh-dich.html chưa nạp data/nguyen-tac-64.js"); process.exit(1); }
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(readFileSync(m[1], "utf8"), ctx, { filename: m[1] });
const run = s => vm.runInContext(s, ctx);

const errs = [], E = s => errs.push(s);
const NT = run("window.KD_NGUYEN_TAC"), ZH = run("window.KD_ZH");
const han = s => (String(s).match(/\p{Script=Han}/gu) || []);           // chỉ chữ Hán, bỏ dấu câu
const chuan = s => han(s).join("");                                        // chuẩn hoá: bỏ dấu câu và khoảng trắng
const amTiet = s => String(s).replace(/[，。；：、,.;:!?()“”"']/g, " ").trim().split(/\s+/).filter(Boolean);
const chu = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const nguon = n => readFileSync(`nguon/zh/${String(n).padStart(2, "0")}.txt`, "utf8").replace(/-\{|\}-/g, ""); // bỏ -{乾}- của wikitext

if (!Array.isArray(NT) || NT.length !== 64) E(`Số mục: ${NT && NT.length}/64`);
const seenN = new Set(), seenTH = new Set(), seenNT = new Set(), demNhom = Object.fromEntries(NHOM.map(g => [g, 0]));
for (const x of NT || []) {
  const t = `Quẻ ${x.n}`;
  if (!Number.isInteger(x.n) || x.n < 1 || x.n > 64) E(`${t}: n không hợp lệ`);
  if (seenN.has(x.n)) E(`${t}: trùng n`); seenN.add(x.n);
  for (const k of ["zh", "hv", "dich", "nguyenTac", "giaiThich", "tinhHuong", "viecHomNay", "nhom"])
    if (typeof x[k] !== "string" || !x[k].trim()) E(`${t}: trường ${k} rỗng`);
  const dt = ZH[x.n] && ZH[x.n].daiTuong;
  if (!dt) E(`${t}: KD_ZH thiếu daiTuong`);
  else if (chuan(x.zh) !== chuan(dt)) E(`${t}: zh khác Đại tượng trong nguyen-van.js\n   có: ${x.zh}\n   cần: ${dt}`);
  const src = chuan(nguon(x.n));
  if (!src.includes(chuan(x.zh))) E(`${t}: zh không dò được trong nguon/zh/${String(x.n).padStart(2, "0")}.txt`);
  const nHan = han(x.zh).length, nAm = amTiet(x.hv).length;
  if (nHan !== nAm) E(`${t}: hv ${nAm} âm tiết ≠ ${nHan} chữ Hán`);
  if (chu(x.nguyenTac) > MAX_CHU_NGUYEN_TAC) E(`${t}: nguyenTac ${chu(x.nguyenTac)} chữ > ${MAX_CHU_NGUYEN_TAC}`);
  if (chu(x.tinhHuong) < MIN_CHU_TINH_HUONG) E(`${t}: tinhHuong ${chu(x.tinhHuong)} chữ < ${MIN_CHU_TINH_HUONG}`);
  if (!NHOM.includes(x.nhom)) E(`${t}: nhom "${x.nhom}" không thuộc 7 nhóm`); else demNhom[x.nhom]++;
  const k1 = String(x.tinhHuong).slice(0, 30); if (seenTH.has(k1)) E(`${t}: tình huống trùng mở đầu với mục khác`); seenTH.add(k1);
  const k2 = String(x.nguyenTac).toLowerCase(); if (seenNT.has(k2)) E(`${t}: nguyên tắc trùng mục khác`); seenNT.add(k2);
  for (const k of ["dich", "giaiThich", "tinhHuong", "viecHomNay"]) if (/undefined|NaN|\[U\]|TODO/.test(x[k])) E(`${t}: ${k} có chữ lạ`);
}
for (let n = 1; n <= 64; n++) if (!seenN.has(n)) E(`Thiếu quẻ ${n}`);

// Giao diện: trang nt trong PAGES, mục lục có mục, dựng được 64 khối, không undefined; lọc và tìm chạy được
const P = run("PAGES()");
if (!P.includes("nt")) E("PAGES() thiếu trang nt");
run("go('toc')"); if (!els.book.innerHTML.includes("64 nguyên tắc hành xử")) E("Mục lục thiếu mục 64 nguyên tắc");
run("go('nt')");
let h = els.book.innerHTML;
const nKhoi = (h.match(/class="hao ntk"/g) || []).length;
if (nKhoi !== 64) E(`Trang nt dựng ${nKhoi}/64 khối`);
if (/undefined|NaN/.test(h)) E("Trang nt có undefined/NaN");
if (!h.includes("Cách dùng") || !h.includes("Nguyên tắc tuần này")) E("Trang nt thiếu Cách dùng hoặc gợi ý tuần");
if (!h.includes("天行健") || !h.includes("君子以慎辨物居方")) E("Trang nt thiếu chữ Hán quẻ 1 hoặc 64");
for (const g of NHOM) if (!h.includes(`ntLoc('${g}')`)) E(`Thiếu nút lọc ${g}`);
run("ntLoc('Gia đình')"); const nGD = (els.ntList.innerHTML.match(/class="hao ntk"/g) || []).length;
if (nGD !== demNhom["Gia đình"]) E(`Lọc Gia đình ra ${nGD}, phải ${demNhom["Gia đình"]}`);
run("ntLoc('Gia đình')"); // bấm lại = bỏ lọc
run("ntTim('tự cường')"); if ((els.ntList.innerHTML.match(/class="hao ntk"/g) || []).length < 1 || !els.ntList.innerHTML.includes("1. Thuần Càn")) E("Tìm 'tự cường' không ra quẻ 1");
run("ntTim('64')"); if (!els.ntList.innerHTML.includes("64. ")) E("Tìm '64' không ra quẻ 64");
run("ntTim('')");
els.showzh.checked = false; run("go('nt')"); if (els.book.innerHTML.includes("天行健")) E("Tắt chữ Hán mà trang nt vẫn hiện chữ Hán"); els.showzh.checked = true;
// pager: trang trước/sau của nt
const k = P.indexOf("nt"); run("go('nt')"); h = els.book.innerHTML;
if (!h.includes(`go('${P[k - 1]}')`) || !h.includes(`go('${P[k + 1]}')`)) E("Pager trang nt thiếu nút trước/sau");

console.log(`Đã kiểm ${NT ? NT.length : 0} nguyên tắc (zh khớp nguyên văn + dò nguồn, âm tiết, độ dài, nhóm), trang nt ${nKhoi} khối. Theo nhóm: ${NHOM.map(g => `${g} ${demNhom[g]}`).join(" · ")}. Lỗi: ${errs.length}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
