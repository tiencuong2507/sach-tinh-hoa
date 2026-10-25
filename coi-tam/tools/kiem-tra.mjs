// Kiểm tra loạt bài "Quán trọ": node tools/kiem-tra.mjs
// 1. Mọi trích dẫn (zh / viet / nom) phải là chuỗi con liên tục của một file trong nguon/ sau khi chuẩn hoá
//    (bỏ khoảng trắng, dấu câu Hán và Việt, mã wikitext, thẻ HTML, chú thích <ref>).
// 2. Số âm tiết Hán Việt (hv) bằng số chữ Hán (zh).
// 3. Mỗi bài có dan (150–250 chữ), ≥ 3 trích, suyNgam ≥ 400 chữ, nguon có url.
// 4. Giao diện giả lập dựng được mục lục và từng bài, không có "undefined".
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const loi = [];

// ---- Chuẩn hoá: bỏ wikitext, thẻ, khoảng trắng, dấu câu ----
const boWiki = s => {
  s = s.replace(/<ref[^>]*\/>/g, "").replace(/<ref[\s\S]*?<\/ref>/g, "");       // chú thích
  s = s.replace(/\{\{(?:khác|另|SK anchor)\|([^|{}]*)(?:\|[^{}]*)?\}\}/g, "$1");  // dị bản: lấy bản chính
  for (let i = 0; i < 5; i++) s = s.replace(/\{\{[^{}]*\}\}/g, "");               // bản mẫu còn lại (lồng tối đa 5 lớp)
  s = s.replace(/\{\|[\s\S]*?\n\|\}/g, m => m.replace(/^\s*[|!][-}]?.*$/gm, ""));  // khung bảng: bỏ dòng điều khiển, giữ nội dung
  s = s.replace(/-\{([^}]*)\}-/g, "$1").replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, "$1");
  s = s.replace(/<[^>]+>/g, "").replace(/'{2,}/g, "").replace(/&nbsp;/g, "");
  return s;
};
const boDau = s => s.normalize("NFC")
  .replace(/[\s\u3000]/g, "")
  .replace(/[，。；：！？、「」『』《》〈〉“”‘’"',.;:!?()（）\[\]·・﹐﹕…\-–—_*#=|~]/g, "")
  .replace(/㑹/g, "會").replace(/靑/g, "青").replace(/爲/g, "為").replace(/旣/g, "既").replace(/Ð/g, "Đ");
const chuanHoa = s => boDau(boWiki(s));

const NGUON_DIR = join(ROOT, "nguon");
const kho = readdirSync(NGUON_DIR).filter(f => f.endsWith(".txt"))
  .map(f => ({ f, t: chuanHoa(readFileSync(join(NGUON_DIR, f), "utf8").split("\n").slice(1).join("\n")) }));

// ---- Nạp data bằng vm (như trình duyệt) ----
const html = readFileSync(join(ROOT, "coi-tam.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const els = {};
const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: true, dataset: {}, onclick: null, onchange: null,
  classList: { toggle() {}, contains() { return false; } } });
const ctx = {
  localStorage: { _: {}, getItem(k) { return this._[k] ?? null; }, setItem(k, v) { this._[k] = String(v); }, removeItem(k) { delete this._[k]; } },
  document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [], body: mk("body") }, console, scrollTo() {} };
ctx.window = ctx; vm.createContext(ctx);
for (const s of scripts) vm.runInContext(readFileSync(join(ROOT, s), "utf8"), ctx, { filename: s });
const BAI = (ctx.CT_BAI || []).slice().sort((a, b) => a.so - b.so);
if (!BAI.length) { console.log("Không nạp được bài nào"); process.exit(1); }

// ---- Kiểm nội dung ----
const demChu = s => String(s || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
const demHan = s => (String(s).match(/\p{Script=Han}/gu) || []).length;
const demAm = s => String(s).replace(/[，。；：！？、“”‘’"',.;:!?()\-–—…]/g, " ").trim().split(/\s+/).filter(Boolean).length;
let tongTrich = 0, datTrich = 0;
for (const b of BAI) {
  const nh = `Bài ${b.so}`;
  if (!b.ten) loi.push(`${nh}: thiếu tên`);
  const nDan = demChu(b.dan);
  if (!b.dan || nDan < 150 || nDan > 250) loi.push(`${nh}: đoạn dẫn ${nDan} chữ (cần 150–250)`);
  if (!Array.isArray(b.trich) || b.trich.length < 3) loi.push(`${nh}: cần ≥ 3 trích dẫn`);
  const nSuy = demChu(b.suyNgam);
  if (nSuy < 400) loi.push(`${nh}: suy ngẫm ${nSuy} chữ (cần ≥ 400)`);
  if (nSuy > 600) loi.push(`${nh}: suy ngẫm ${nSuy} chữ (quá 600)`);
  if (!Array.isArray(b.nguon) || !b.nguon.length || b.nguon.some(n => !n.ten || !/^https?:\/\//.test(n.url))) loi.push(`${nh}: dòng nguồn thiếu tên/url`);
  for (const [j, t] of (b.trich || []).entries()) {
    const nt = `${nh} trích ${j + 1} (${t.nguon || "?"})`;
    tongTrich++;
    const vanBan = t.zh || t.viet || t.nom;
    if (!vanBan) { loi.push(`${nt}: thiếu nguyên văn`); continue; }
    if (!t.g) loi.push(`${nt}: thiếu lời bình`);
    const chuan = chuanHoa(vanBan);
    const thay = kho.filter(k => k.t.includes(chuan));
    if (!thay.length) loi.push(`${nt}: nguyên văn không có trong nguon/ — "${chuan.slice(0, 40)}…"`);
    else datTrich++;
    if (t.zh) {
      if (!t.hv) loi.push(`${nt}: thiếu âm Hán Việt`);
      else { const a = demHan(t.zh), c = demAm(t.hv); if (a !== c) loi.push(`${nt}: ${a} chữ Hán nhưng ${c} âm Hán Việt`); }
      if (!t.dich) loi.push(`${nt}: thiếu dịch nghĩa`);
    }
  }
}

// ---- Kiểm giao diện giả lập ----
const run = s => vm.runInContext(s, ctx);
const P = run("PAGES()");
run("go('toc')");
const toc = els.book.innerHTML;
if (toc.includes("undefined")) loi.push("Mục lục có 'undefined'");
if ((toc.match(/sắp có/g) || []).length !== 12 - BAI.length) loi.push("Mục lục: số bài '(sắp có)' không khớp");
for (const b of BAI) if (!toc.includes(`go('b${b.so}')`)) loi.push(`Mục lục thiếu liên kết bài ${b.so}`);
for (const p of P.filter(x => x !== "toc")) {
  run(`go('${p}')`);
  const h = els.book.innerHTML;
  const b = BAI.find(x => "b" + x.so === p);
  if (h.includes("undefined")) loi.push(`Bài ${b.so}: trang có 'undefined'`);
  for (const t of b.trich) if (!h.includes(t.g.slice(0, 30))) loi.push(`Bài ${b.so}: trang thiếu lời bình của "${t.nguon}"`);
  if (!h.includes("Suy ngẫm") || !h.includes("Nguồn nguyên văn")) loi.push(`Bài ${b.so}: trang thiếu phần suy ngẫm hoặc dòng nguồn`);
}
if (ctx.localStorage.getItem("ct_bai") !== P[P.length - 1]) loi.push("localStorage không nhớ bài đang đọc");

console.log(`Quán trọ: đạt ${datTrich}/${tongTrich} trích dẫn, ${BAI.length - new Set(loi.map(l => l.match(/^Bài (\d+)/)?.[1]).filter(Boolean)).size}/${BAI.length} bài`);
if (loi.length) { console.log("Lỗi:\n  " + loi.join("\n  ")); process.exit(1); }
console.log("OK");
