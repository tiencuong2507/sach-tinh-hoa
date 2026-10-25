// Kiểm ba hướng cẩm nang đợt 2: tra cứu theo tình huống (data/tinh-huong.js, trang th), quy trình quyết định sáu bước (data/quyet-dinh.js, trang qd),
// chương N12 Dịch như một cách nhìn hệ thống (data/nghien-cuu-n12.js): node tools/kiem-tra-cam-nang-2.mjs
// Nạp như trình duyệt (vm theo <script src> của kinh-dich.html, cùng khuôn tools/kiem-tra-cam-nang.mjs). Mọi ngưỡng đặt ở hằng số đầu file.
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const TH_MIN = 48, TH_MAX = 60, TH_NHOM = 8, TH_MIN_MOI_NHOM = 5, TH_MIN_NEN = 3, TH_MAX_NEN = 5, TH_MIN_TRANH = 1, TH_MAX_TRANH = 2, TH_MIN_CAU_VISAO = 2;
const QD_BUOC = ["thoi", "vi", "trung", "ung", "thua", "bien"], QD_KL = ["tien", "doi", "lui", "sua"];
const N12_MIN_CHU = 1500, N12_MAX_CHU = 2500, MAX_CHU_CAU_TB = 20;

const els = {};
const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: true, dataset: {}, files: null,
  classList: { toggle() {}, contains() { return false; } }, scrollIntoView() {}, onclick: null, oninput: null, onchange: null });
const ctx = { localStorage: { _: {}, getItem(k) { return this._[k] ?? null; }, setItem(k, v) { this._[k] = String(v); }, removeItem(k) { delete this._[k]; } },
  document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [] }, crypto: webcrypto, console, scrollTo() {} };
ctx.window = ctx; vm.createContext(ctx);
const html = readFileSync("kinh-dich.html", "utf8");
for (const f of ["data/tinh-huong.js", "data/quyet-dinh.js", "data/nghien-cuu-n12.js"]) if (!html.includes(`<script src="${f}">`)) { console.log(`kinh-dich.html chưa nạp ${f}`); process.exit(1); }
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(readFileSync(m[1], "utf8"), ctx, { filename: m[1] });
const run = s => vm.runInContext(s, ctx);

const errs = [], E = s => errs.push(s);
const han = s => (String(s).match(/\p{Script=Han}/gu) || []);
const chuan = s => han(s).join("");
const amTiet = s => String(s).replace(/[，。；：、,.;:!?()“”"'？]/g, " ").trim().split(/\s+/).filter(Boolean);
const chu = s => String(s).replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
const la = s => /undefined|NaN|\[object|TODO/.test(String(s));
const boMarkup = s => s.replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1").replace(/\[\[[^\]]*\]\]/g, "").replace(/-\{|\}-/g, "").replace(/\{\{另\|([^|}]*)\|[^}]*\}\}/g, "$1").replace(/\{\{[^}]*\}\}/g, "");
const nguonQue = n => chuan(boMarkup(readFileSync(`nguon/zh/${String(n).padStart(2, "0")}.txt`, "utf8")));
const nguonTruyen = Object.fromEntries(readdirSync("nguon/zh-truyen").filter(f => f.endsWith(".txt")).map(f => [f, chuan(boMarkup(readFileSync(`nguon/zh-truyen/${f}`, "utf8")))]));
const khoHan = Array.from({ length: 64 }, (_, i) => nguonQue(i + 1)).join("|") + "|" + Object.values(nguonTruyen).join("|");
function cauTB(txt) { const cs = String(txt).replace(/<[^>]+>/g, " ").split(/[.!?;…]+\s|[.!?;]$/).map(c => c.trim()).filter(c => chu(c) >= 2); return cs.length ? cs.reduce((a, c) => a + chu(c), 0) / cs.length : 0; }
const ZH = run("window.KD_ZH"), VI = run("window.KD_VI");

// ===== Hướng 3: tra cứu theo tình huống =====
const TH = run("window.KD_TINH_HUONG");
let vanTH = [TH && TH.moDau], demNhom = {};
if (!TH || !Array.isArray(TH.nhom) || TH.nhom.length !== TH_NHOM) E(`Tình huống: ${TH && TH.nhom && TH.nhom.length}/${TH_NHOM} nhóm`);
const TEN_NHOM = ["Khởi sự", "Chờ thời", "Hợp tác và quan hệ", "Tranh chấp và khó khăn", "Tiền bạc", "Gia đình", "Lãnh đạo và tổ chức", "Lui, kết thúc, mất mát"];
if (TH && TH.nhom.map(g => g.ten).join("|") !== TEN_NHOM.join("|")) E(`Tên 8 nhóm sai: ${TH.nhom.map(g => g.ten).join(" | ")}`);
const maNhom = new Set((TH ? TH.nhom : []).map(g => g.ma)), maTH = new Set();
if (!TH || !Array.isArray(TH.th) || TH.th.length < TH_MIN || TH.th.length > TH_MAX) E(`Tình huống: có ${TH && TH.th && TH.th.length}, cần ${TH_MIN}–${TH_MAX}`);
for (const x of (TH ? TH.th : [])) {
  const t = `Tình huống ${x.ma}`;
  if (!/^[a-z]{2}\d+$/.test(x.ma || "") || maTH.has(x.ma)) E(`${t}: mã sai hoặc trùng`); maTH.add(x.ma);
  if (!maNhom.has(x.nhom) || x.ma.slice(0, 2) !== x.nhom) E(`${t}: nhóm ${x.nhom} không có hoặc không khớp mã`); demNhom[x.nhom] = (demNhom[x.nhom] || 0) + 1;
  if (typeof x.ten !== "string" || chu(x.ten) < 3) E(`${t}: thiếu ten`);
  if (!Array.isArray(x.que) || x.que.length < 1 || x.que.length > 2) E(`${t}: que phải 1–2 quẻ`);
  for (const q of x.que || []) { if (!Number.isInteger(q.n) || q.n < 1 || q.n > 64) E(`${t}: que.n ${q.n} ngoài 1–64`); if (q.hao !== undefined && (!Number.isInteger(q.hao) || q.hao < 1 || q.hao > 6)) E(`${t}: que.hao ${q.hao} ngoài 1–6`); }
  if (typeof x.viSao !== "string" || x.viSao.split(/[.!?]\s|[.!?]$/).filter(c => chu(c) >= 2).length < TH_MIN_CAU_VISAO) E(`${t}: viSao chưa đủ ${TH_MIN_CAU_VISAO} câu`);
  const tr = x.trich || {};
  if (!Number.isInteger(tr.n) || !(x.que || []).some(q => q.n === tr.n)) E(`${t}: trich.n ${tr.n} không thuộc que`);
  else {
    const goc = tr.hao ? (ZH[tr.n].hao || [])[tr.hao - 1] : ZH[tr.n].tu;
    if (!tr.zh || !han(tr.zh).length) E(`${t}: trich.zh rỗng`);
    else {
      if (!goc || !chuan(goc).includes(chuan(tr.zh))) E(`${t}: trich.zh không nằm trong ${tr.hao ? "hào " + tr.hao : "lời quẻ"} ${tr.n} của nguyen-van.js\n   có: ${tr.zh}\n   gốc: ${goc}`);
      if (!nguonQue(tr.n).includes(chuan(tr.zh))) E(`${t}: trich.zh không dò được trong nguon/zh/${String(tr.n).padStart(2, "0")}.txt`);
      if (han(tr.zh).length !== amTiet(tr.hv || "").length) E(`${t}: hv ${amTiet(tr.hv || "").length} âm tiết ≠ ${han(tr.zh).length} chữ Hán: ${tr.hv}`);
      // âm Hán Việt phải khớp bản đã có của kho (data/vi-0N.js) cho cùng câu, để một chữ không đọc hai kiểu
      const hvKho = amTiet((tr.hao ? VI[tr.n].hao[tr.hao - 1].hv : VI[tr.n].tu.hv).replace(/^[^:]*:\s*/, "")).map(a => a.toLowerCase()).join(" ");
      if (!(" " + hvKho + " ").includes(" " + amTiet(tr.hv || "").map(a => a.toLowerCase()).join(" ") + " ")) E(`${t}: hv khác bản của kho\n   có: ${tr.hv}\n   kho: ${hvKho}`);
    }
    if (tr.hao !== undefined && (!Number.isInteger(tr.hao) || tr.hao < 1 || tr.hao > 6)) E(`${t}: trich.hao sai`);
    if (!tr.dich || la(tr.dich)) E(`${t}: trich.dich rỗng/lạ`); else vanTH.push(tr.dich);
  }
  const u = x.ungXu || {};
  if (!Array.isArray(u.nen) || u.nen.length < TH_MIN_NEN || u.nen.length > TH_MAX_NEN) E(`${t}: nên ${u.nen && u.nen.length}, cần ${TH_MIN_NEN}–${TH_MAX_NEN}`);
  if (!Array.isArray(u.tranh) || u.tranh.length < TH_MIN_TRANH || u.tranh.length > TH_MAX_TRANH) E(`${t}: tránh ${u.tranh && u.tranh.length}, cần ${TH_MIN_TRANH}–${TH_MAX_TRANH}`);
  if (!x.canhBao || !x.canhBao.y || !x.canhBao.ma) E(`${t}: thiếu canhBao`);
  for (const f of ["ten", "viSao"]) if (la(x[f])) E(`${t}: ${f} có chữ lạ`);
  vanTH.push(x.ten, x.viSao, ...(u.nen || []), ...(u.tranh || []), x.canhBao && x.canhBao.y);
}
for (const x of (TH ? TH.th : [])) if (x.canhBao && (!maTH.has(x.canhBao.ma) || x.canhBao.ma === x.ma)) E(`Tình huống ${x.ma}: canhBao trỏ tới mã không có hoặc chính nó: ${x.canhBao.ma}`);
for (const g of (TH ? TH.nhom : [])) if ((demNhom[g.ma] || 0) < TH_MIN_MOI_NHOM) E(`Nhóm ${g.ten}: ${demNhom[g.ma] || 0} tình huống < ${TH_MIN_MOI_NHOM}`);
const tbTH = cauTB(vanTH.filter(Boolean).join(" "));
if (tbTH > MAX_CHU_CAU_TB) E(`Tình huống: câu trung bình ${tbTH.toFixed(1)} chữ > ${MAX_CHU_CAU_TB}`);

// ===== Hướng 4: quy trình quyết định =====
const QD = run("window.KD_QUYET_DINH");
let vanQD = [QD && QD.moDau, QD && QD.luuY];
if (!QD || !Array.isArray(QD.buoc) || QD.buoc.map(b => b.ma).join(",") !== QD_BUOC.join(",")) E(`Quyết định: 6 bước phải là ${QD_BUOC.join(",")}; có ${QD && QD.buoc && QD.buoc.map(b => b.ma).join(",")}`);
for (const b of (QD ? QD.buoc : [])) {
  const t = `Bước ${b.ma}`;
  for (const f of ["ten", "doi", "hoi", "giai"]) if (typeof b[f] !== "string" || !b[f].trim() || la(b[f])) E(`${t}: thiếu ${f}`); else vanQD.push(b[f]);
  const h = b.hetu || {};
  if (!h.zh || !/^[ab]\d+$/.test(h.trang || "")) E(`${t}: hetu thiếu zh/trang`);
  else {
    const file = h.trang[0] === "a" ? "繫辭上.txt" : "繫辭下.txt";
    if (!nguonTruyen[file].includes(chuan(h.zh))) E(`${t}: câu Hệ từ không dò được trong ${file}: ${h.zh}`);
    if (han(h.zh).length !== amTiet(h.hv || "").length) E(`${t}: hv ${amTiet(h.hv || "").length} âm tiết ≠ ${han(h.zh).length} chữ Hán`);
    run(`go('${h.trang}')`); if (!chuan(els.book.innerHTML).includes(chuan(h.zh))) E(`${t}: trang ${h.trang} không chứa câu Hệ từ ${h.zh}`);
    if (!h.dich || la(h.dich)) E(`${t}: hetu.dich rỗng`); else vanQD.push(h.dich);
  }
  if (!Array.isArray(b.chon) || b.chon.length !== 3 || b.chon.map(c => c.v).sort().join("") !== "012") E(`${t}: phải có 3 lựa chọn với v = 0,1,2`);
  for (const c of b.chon || []) { if (!c.ten || !c.ghi || la(c.ten + c.ghi)) E(`${t}: lựa chọn thiếu ten/ghi`); vanQD.push(c.ten, c.ghi); }
}
for (const k of QD_KL) if (!QD || !QD.ketLuan[k] || !QD.ketLuan[k].ten || !QD.ketLuan[k].cau) E(`Kết luận ${k} thiếu`); else vanQD.push(QD.ketLuan[k].cau);
for (const r of (QD ? QD.anhXa : [])) { if (!QD_KL.includes(r.kl) || !Number.isInteger(r.que) || r.que < 1 || r.que > 64 || !r.vi) E(`anhXa lỗi: ${JSON.stringify(r)}`); vanQD.push(r.vi); }
// 729 tổ hợp: đều ra quẻ 1–64, kết luận hợp lệ, 3 việc, lý do; ổn định khi lặp; đếm dòng ánh xạ được dùng
const hit = new Map(), klDem = {}, queDem = new Set();
for (let m = 0; m < 729; m++) {
  const tl = {}; let x = m; for (const k of QD_BUOC) { tl[k] = x % 3; x = Math.floor(x / 3); }
  const r = QD.xacDinh(tl), r2 = QD.xacDinh(tl);
  if (!r || !QD_KL.includes(r.kl) || !Number.isInteger(r.que) || r.que < 1 || r.que > 64 || !Array.isArray(r.viec) || r.viec.length !== 3 || !r.lyDo || !r.viQue || la(JSON.stringify(r))) { E(`xacDinh tổ hợp ${JSON.stringify(tl)} lỗi: ${JSON.stringify(r)}`); continue; }
  if (JSON.stringify(r) !== JSON.stringify(r2)) E(`xacDinh không ổn định ở ${JSON.stringify(tl)}`);
  if (new Set(r.viec).size !== 3) E(`xacDinh ${JSON.stringify(tl)}: 3 việc có trùng`);
  klDem[r.kl] = (klDem[r.kl] || 0) + 1; queDem.add(r.que); hit.set(r.que + r.kl, (hit.get(r.que + r.kl) || 0) + 1);
}
for (const k of QD_KL) if (!klDem[k]) E(`Kết luận ${k} không bao giờ xảy ra trong 729 tổ hợp`);
for (const r of QD.anhXa) if (Object.keys(r.dk).length && !hit.get(r.que + r.kl)) E(`Dòng ánh xạ ${r.kl} → quẻ ${r.que} (${JSON.stringify(r.dk)}) không bao giờ được chọn`);
if (QD.xacDinh({ thoi: 3, vi: 1, trung: 1, ung: 1, thua: 1, bien: 1 }) !== null) E("xacDinh nhận giá trị ngoài 0–2");
// 6 tổ hợp tiêu biểu → 6 quẻ khác nhau và đủ 4 kết luận
const TIEU_BIEU = [
  [{ thoi: 1, vi: 1, trung: 1, ung: 1, thua: 1, bien: 1 }, "tien", 11], [{ thoi: 0, vi: 1, trung: 1, ung: 1, thua: 1, bien: 1 }, "doi", 5],
  [{ thoi: 2, vi: 1, trung: 1, ung: 1, thua: 1, bien: 0 }, "lui", 33], [{ thoi: 1, vi: 1, trung: 2, ung: 1, thua: 1, bien: 1 }, "sua", 25],
  [{ thoi: 1, vi: 1, trung: 1, ung: 2, thua: 0, bien: 0 }, "doi", 8], [{ thoi: 1, vi: 0, trung: 0, ung: 0, thua: 0, bien: 2 }, "doi", 52]];
const raTB = TIEU_BIEU.map(([tl, kl, que]) => { const r = QD.xacDinh(tl); if (r.kl !== kl || r.que !== que) E(`Tổ hợp tiêu biểu ${JSON.stringify(tl)} ra ${r.kl}/${r.que}, mong ${kl}/${que}`); return r; });
if (new Set(raTB.map(r => r.que)).size !== 6) E(`6 tổ hợp tiêu biểu ra ${raTB.map(r => r.que).join(",")} – phải 6 quẻ khác nhau`);
if (new Set(raTB.map(r => r.kl)).size !== 4) E(`6 tổ hợp tiêu biểu chỉ ra kết luận ${[...new Set(raTB.map(r => r.kl))].join(",")} – phải đủ 4`);
const tbQD = cauTB(vanQD.filter(Boolean).join(" "));
if (tbQD > MAX_CHU_CAU_TB) E(`Quyết định: câu trung bình ${tbQD.toFixed(1)} chữ > ${MAX_CHU_CAU_TB}`);

// ===== Hướng 5: chương N12 =====
const STUDY = run("window.KD_STUDY"), iN12 = STUDY.findIndex(c => /^N12\./.test(c.title));
let chuN12 = 0, zhN12 = 0, frN12 = 0;
if (iN12 < 0) E("KD_STUDY không có chương N12");
else {
  const c = STUDY[iN12], txt = c.html;
  chuN12 = chu(txt);
  if (chuN12 < N12_MIN_CHU || chuN12 > N12_MAX_CHU) E(`N12: ${chuN12} chữ, cần ${N12_MIN_CHU}–${N12_MAX_CHU}`);
  if (la(txt)) E("N12 có chữ lạ");
  for (const s of ["Leibniz", "1703", "Fohy", "tiêu tức", "[V]", "[I]", "codon", "Jung", "Wilhelm", "gán ghép"]) if (!txt.includes(s)) E(`N12 thiếu "${s}"`);
  for (const m of txt.matchAll(/<span class="zh">([^<]+)<\/span>/g)) { zhN12++; if (!khoHan.includes(chuan(m[1]))) E(`N12: câu Hán không dò được: ${m[1]}`); }
  if (zhN12 < 15) E(`N12 chỉ có ${zhN12} câu Hán`);
  const fr = readFileSync("nguon/leibniz-1703-fr.txt", "utf8").replace(/\s+/g, " ").replace(/[’]/g, "'");
  for (const m of txt.matchAll(/«\s*([^»]+?)\s*»/g)) { frN12++; if (!fr.includes(m[1].replace(/\s+/g, " ").replace(/[’]/g, "'"))) E(`N12: câu Pháp không dò được trong nguon/leibniz-1703-fr.txt: ${m[1]}`); }
  if (frN12 < 2) E(`N12 chỉ có ${frN12} câu Pháp trích Leibniz`);
  const tb = cauTB(txt); if (tb > MAX_CHU_CAU_TB) E(`N12: câu trung bình ${tb.toFixed(1)} chữ > ${MAX_CHU_CAU_TB}`);
  // nhãn [V] chỉ gắn cho câu có câu Hán/Pháp dò được hoặc nói về dữ liệu đã có trong kho; đếm để báo cáo
  const nV = (txt.match(/\[V/g) || []).length, nI = (txt.match(/\[I/g) || []).length; if (nV < 15 || nI < 8) E(`N12: nhãn [V] ${nV}, [I] ${nI} quá ít`);
}

// ===== Giao diện =====
const P = run("PAGES()");
const iTQ = P.indexOf("tq"); if (P[iTQ + 1] !== "th" || P[iTQ + 2] !== "qd") E(`PAGES: sau tq phải là th, qd; có ${P.slice(iTQ, iTQ + 3).join(",")}`);
run("go('toc')"); for (const s of ["Tra cứu theo tình huống", "Quyết định theo Dịch", "go('th')", "go('qd')", "N12."]) if (!els.book.innerHTML.includes(s)) E(`Mục lục thiếu ${s}`);
// trang th
run("go('th')"); let h = els.book.innerHTML;
if ((h.match(/class="hao thk"/g) || []).length !== TH.th.length) E(`Trang th dựng ${(h.match(/class="hao thk"/g) || []).length}/${TH.th.length} khối`);
if ((h.match(/<details class="thn"/g) || []).length !== TH_NHOM) E("Trang th không đủ 8 nhóm gập mở");
if (la(h)) E("Trang th có undefined/NaN");
for (const x of TH.th) {
  if (!h.includes(`id="th-${x.ma}"`) || !h.includes(`href="#th-${x.canhBao.ma}"`)) E(`Trang th thiếu khối/link cảnh báo ${x.ma}`);
  if (!h.includes(x.trich.zh)) E(`Trang th thiếu câu Hán ${x.ma}`);
  for (const q of x.que) { if (!h.includes(`go('q${q.n}')`)) E(`Trang th thiếu link go('q${q.n}')`); if (q.hao && !h.includes(`go('q${q.n}',{focus:['h${q.hao - 1}']})`)) E(`Trang th thiếu link hào ${q.hao} quẻ ${q.n}`); }
}
if (!h.includes("Đây là cách người xưa dùng Dịch làm sách tham mưu") || !h.includes("thTim(") || !h.includes("Cách dùng")) E("Trang th thiếu mở đầu/ô tìm/cách dùng");
// tìm nhanh không dấu
run("thTim('kien')"); h = els.thList.innerHTML; const nKien = (h.match(/class="hao thk"/g) || []).length;
if (!nKien || nKien >= TH.th.length || !h.includes('id="th-tc1"')) E(`Tìm "kien" ra ${nKien} khối, phải lọc được và có tc1`);
run("thTim('mat tien')"); if (!els.thList.innerHTML.includes('id="th-lk5"')) E('Tìm "mat tien" không ra lk5');
run("thTim('潛龍')"); if (!els.thList.innerHTML.includes('id="th-ks1"')) E("Tìm chữ Hán 潛龍 không ra ks1");
run("thTim('zzzzqq')"); if (!els.thList.innerHTML.includes("Không có tình huống")) E("Tìm không khớp không báo");
run("thTim('')"); if ((els.thList.innerHTML.match(/class="hao thk"/g) || []).length !== TH.th.length) E("Xóa ô tìm không hiện lại đủ");
// link hào mở quẻ đúng hào
run("go('q1',{focus:['h0']})"); h = els.book.innerHTML;
if ((h.match(/class="hao on"/g) || []).length !== 1 || !/class="hao on"><div class="t">Hào 1/.test(h)) E("go('q1',{focus:['h0']}) không tô đúng hào 1");
run("go('q1')"); if ((els.book.innerHTML.match(/class="hao on"/g) || []).length) E("go('q1') không có focus mà vẫn tô hào");
// trang qd
run("go('qd')"); h = els.book.innerHTML;
if ((h.match(/class="hao qdb"/g) || []).length !== 6 || (h.match(/<select id="qd_/g) || []).length !== 6) E("Trang qd không dựng đủ 6 bước / 6 ô chọn");
if (la(h)) E("Trang qd có undefined/NaN");
for (const b of QD.buoc) { if (!h.includes(b.hetu.zh) || !h.includes(`go('${b.hetu.trang}')`)) E(`Trang qd thiếu câu Hệ từ/link chương bước ${b.ma}`); }
for (const s of ["待時而動", "二多譽", "qdXem()", "Luật kết luận", "không phải bói"]) if (!h.includes(s)) E(`Trang qd thiếu ${s}`);
run("qdXem()"); if (!els.qdKQ.innerHTML.includes("trả lời đủ")) E("qdXem chưa nhắc khi thiếu câu trả lời");
const raUI = TIEU_BIEU.map(([tl]) => { for (const k of QD_BUOC) mk("qd_" + k).value = String(tl[k]); run("qdXem()"); const m = els.qdKQ.innerHTML.match(/go\('q(\d+)'\)/); return m && +m[1]; });
if (raUI.join(",") !== TIEU_BIEU.map(x => x[2]).join(",")) E(`Công cụ trên trang ra quẻ ${raUI.join(",")}, phải ${TIEU_BIEU.map(x => x[2]).join(",")}`);
if (la(els.qdKQ.innerHTML) || !els.qdKQ.innerHTML.includes("Kết luận") || !els.qdKQ.innerHTML.includes("Ba việc nên làm") || !els.qdKQ.innerHTML.includes("Lời quẻ") || !els.qdKQ.innerHTML.includes("Đại tượng")) E("Kết quả công cụ qd thiếu phần hoặc có undefined");
// tắt chữ Hán
els.showzh.checked = false; run("go('th')"); if (els.book.innerHTML.includes("潛龍勿用")) E("Tắt chữ Hán mà trang th vẫn hiện câu Hán");
run("go('qd')"); if (els.book.innerHTML.includes('<div class="zh">')) E("Tắt chữ Hán mà trang qd vẫn hiện khối chữ Hán"); els.showzh.checked = true;
// pager, trang N12, trang cũ
for (const id of ["th", "qd", "s" + iN12]) { const k = P.indexOf(id); run(`go('${id}')`); h = els.book.innerHTML; if (!h.includes(`go('${P[k - 1]}')`) || (P[k + 1] && !h.includes(`go('${P[k + 1]}')`))) E(`Pager trang ${id} thiếu nút trước/sau`); }
run(`go('s${iN12}')`); h = els.book.innerHTML; if (la(h) || !h.includes("Leibniz") || !h.includes("易有太極")) E("Trang N12 không dựng đúng");
run("go('tq0')"); if (!els.book.innerHTML.includes("Tự quái truyện")) E("Trang tq0 bị nhầm");
run("go('tq')"); if (!els.book.innerHTML.includes("Tự quái như câu chuyện một đời")) E("Trang tq bị nhầm");
if (/fetch\(|XMLHttpRequest|navigator\.sendBeacon/.test(readFileSync("app.js", "utf8"))) E("app.js có lệnh gửi dữ liệu ra mạng");

const theoNhom = (TH ? TH.nhom : []).map(g => `${g.ten} ${demNhom[g.ma] || 0}`).join(", ");
console.log(`Đã kiểm: ${TH ? TH.th.length : 0} tình huống (${theoNhom}; ${TH ? TH.th.length : 0} câu Hán dò nguồn; câu TB ${tbTH.toFixed(1)} chữ), quyết định 6 bước (6 câu Hệ từ dò nguồn, 729 tổ hợp: ${QD_KL.map(k => `${k} ${klDem[k] || 0}`).join(", ")}, ${queDem.size} quẻ khác nhau; câu TB ${tbQD.toFixed(1)}), N12 ${chuN12} chữ (${zhN12} câu Hán, ${frN12} câu Pháp dò nguồn). Lỗi: ${errs.length}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
