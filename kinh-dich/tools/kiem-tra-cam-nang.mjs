// Kiểm ba hướng cẩm nang: sáu giai đoạn (data/sau-giai-doan.js, trang gd), sổ chiêm nghiệm (Lịch sử gieo, localStorage kd_hist),
// Tự quái như đời một người (data/tu-quai-doi-nguoi.js, trang tq): node tools/kiem-tra-cam-nang.mjs
// Nạp như trình duyệt (vm theo <script src> của kinh-dich.html, cùng khuôn tools/kiem-tra-nguyen-tac.mjs).
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const MIN_HAO = 3, MIN_DAU_HIEU = 4, MIN_NEN = 3, MIN_KHONG_NEN = 3, MIN_CHU_TINH_HUONG = 40;
const TQ_MIN_CHU = 1500, TQ_MAX_CHU = 2500, MAX_CHU_CAU_TB = 20;

const els = {};
const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: true, dataset: {}, files: null,
  classList: { toggle() {}, contains() { return false; } }, scrollIntoView() {}, onclick: null, oninput: null, onchange: null });
const ctx = { localStorage: { _: {}, getItem(k) { return this._[k] ?? null; }, setItem(k, v) { this._[k] = String(v); }, removeItem(k) { delete this._[k]; } },
  document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [] }, crypto: webcrypto, console, scrollTo() {} };
ctx.window = ctx; vm.createContext(ctx);
const html = readFileSync("kinh-dich.html", "utf8");
for (const f of ["data/sau-giai-doan.js", "data/tu-quai-doi-nguoi.js"]) if (!html.includes(`<script src="${f}">`)) { console.log(`kinh-dich.html chưa nạp ${f}`); process.exit(1); }
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(readFileSync(m[1], "utf8"), ctx, { filename: m[1] });
const run = s => vm.runInContext(s, ctx);

const errs = [], E = s => errs.push(s);
const han = s => (String(s).match(/\p{Script=Han}/gu) || []);
const chuan = s => han(s).join("");
const amTiet = s => String(s).replace(/[，。；：、,.;:!?()“”"'？]/g, " ").trim().split(/\s+/).filter(Boolean);
const chu = s => String(s).replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
const la = s => /undefined|NaN|\[U\]|TODO/.test(String(s));
// Bỏ markup wikitext: [[link|chữ]] → chữ, -{乾}- → 乾, {{另|磐|盤}} (chữ biến thể) → chữ đầu, các mẫu {{…}} khác (ghi chú) bỏ hẳn
const boMarkup = s => s.replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1").replace(/\[\[[^\]]*\]\]/g, "").replace(/-\{|\}-/g, "").replace(/\{\{另\|([^|}]*)\|[^}]*\}\}/g, "$1").replace(/\{\{[^}]*\}\}/g, "");
const nguonQue = n => chuan(boMarkup(readFileSync(`nguon/zh/${String(n).padStart(2, "0")}.txt`, "utf8")));
const nguonHeTuHa = chuan(boMarkup(readFileSync("nguon/zh-truyen/繫辭下.txt", "utf8")));
const nguonTuQuai = chuan(boMarkup(readFileSync("nguon/zh-truyen/序卦.txt", "utf8")));
// Câu trung bình ≤ MAX_CHU_CAU_TB chữ: tách câu theo . ! ? ; và xuống dòng, bỏ thẻ HTML
function cauTB(txt) { const cs = String(txt).replace(/<[^>]+>/g, " ").split(/[.!?;…]+\s|[.!?;]$/).map(c => c.trim()).filter(c => chu(c) >= 2); return cs.length ? cs.reduce((a, c) => a + chu(c), 0) / cs.length : 0; }

// ===== Hướng 2: sáu giai đoạn =====
const GD = run("window.KD_SAU_GIAI_DOAN"), ZH = run("window.KD_ZH");
let vanGD = [GD && GD.moDau];
if (!GD || !Array.isArray(GD.gd) || GD.gd.length !== 6) E(`Sáu giai đoạn: có ${GD && GD.gd && GD.gd.length}/6`);
const TEN_GD = ["Sơ", "Nhị", "Tam", "Tứ", "Ngũ", "Thượng"];
(GD ? GD.gd : []).forEach((g, k) => {
  const t = `Giai đoạn ${k + 1} (${g.ten})`;
  if (g.i !== k || g.ten !== TEN_GD[k]) E(`${t}: i/ten sai (i=${g.i}, ten=${g.ten})`);
  for (const f of ["tenDoi", "y", "tinhHuong"]) if (typeof g[f] !== "string" || !g[f].trim()) E(`${t}: thiếu ${f}`);
  if (!g.goc || !g.goc.zh || !g.goc.hv || !g.goc.dich || !/^b\d$/.test(g.goc.trang || "")) E(`${t}: goc thiếu zh/hv/dich/trang`);
  else {
    if (!nguonHeTuHa.includes(chuan(g.goc.zh))) E(`${t}: câu gốc không dò được trong 繫辭下.txt: ${g.goc.zh}`);
    if (han(g.goc.zh).length !== amTiet(g.goc.hv).length) E(`${t}: hv gốc ${amTiet(g.goc.hv).length} âm tiết ≠ ${han(g.goc.zh).length} chữ Hán`);
    vanGD.push(g.goc.dich);
  }
  if (!Array.isArray(g.hao) || g.hao.length < MIN_HAO) E(`${t}: hào từ ${g.hao && g.hao.length} < ${MIN_HAO}`);
  for (const x of g.hao || []) {
    const u = `${t} hào ${x.n}/${x.h}`;
    if (!Number.isInteger(x.n) || x.n < 1 || x.n > 64 || x.h !== k) E(`${u}: n hoặc h sai (h phải = ${k})`);
    else {
      const goc = ZH[x.n] && ZH[x.n].hao && ZH[x.n].hao[x.h];
      if (!goc || !chuan(goc).startsWith(chuan(x.zh))) E(`${u}: zh không phải mở đầu hào từ trong nguyen-van.js\n   có: ${x.zh}\n   gốc: ${goc}`);
      if (!nguonQue(x.n).includes(chuan(x.zh))) E(`${u}: zh không dò được trong nguon/zh/${String(x.n).padStart(2, "0")}.txt`);
    }
    if (!x.dich || la(x.dich)) E(`${u}: dich rỗng/lạ`); else vanGD.push(x.dich);
  }
  if (!Array.isArray(g.dauHieu) || g.dauHieu.length < MIN_DAU_HIEU) E(`${t}: dấu hiệu ${g.dauHieu && g.dauHieu.length} < ${MIN_DAU_HIEU}`);
  if (!Array.isArray(g.nen) || g.nen.length < MIN_NEN) E(`${t}: nên ${g.nen && g.nen.length} < ${MIN_NEN}`);
  if (!Array.isArray(g.khongNen) || g.khongNen.length < MIN_KHONG_NEN) E(`${t}: không nên ${g.khongNen && g.khongNen.length} < ${MIN_KHONG_NEN}`);
  if (chu(g.tinhHuong) < MIN_CHU_TINH_HUONG) E(`${t}: tình huống ${chu(g.tinhHuong)} chữ < ${MIN_CHU_TINH_HUONG}`);
  for (const f of ["y", "tinhHuong", "tenDoi"]) if (la(g[f])) E(`${t}: ${f} có chữ lạ`);
  vanGD.push(g.y, g.tinhHuong, ...(g.dauHieu || []), ...(g.nen || []), ...(g.khongNen || []));
});
// Công cụ 6 câu hỏi: 6 câu, 6 tổ hợp cho 6 giai đoạn khác nhau, mọi 64 tổ hợp đều ra 0..5 không undefined
if (!GD || !Array.isArray(GD.cauHoi) || GD.cauHoi.length !== 6) E(`Câu hỏi: ${GD && GD.cauHoi && GD.cauHoi.length}/6`);
const TO_HOP = [[0,0,0,0,0,0], [1,1,0,0,0,0], [1,1,1,0,0,0], [1,1,0,1,0,0], [1,1,0,0,1,0], [1,1,0,0,1,1]];
const raGD = TO_HOP.map(th => GD.xacDinh(th.map(Boolean)).i);
if (new Set(raGD).size !== 6) E(`6 tổ hợp đầu vào ra ${raGD.join(",")} – phải đủ 6 giai đoạn khác nhau`);
for (let m = 0; m < 64; m++) { const r = GD.xacDinh([0,1,2,3,4,5].map(b => !!(m >> b & 1))); if (!Number.isInteger(r.i) || r.i < 0 || r.i > 5 || !r.lyDo || la(r.lyDo) || !Array.isArray(r.nguoc)) E(`xacDinh tổ hợp ${m.toString(2)} lỗi`); }
// Lặp lại cùng đầu vào phải ra cùng kết quả (không ngẫu nhiên)
for (let k = 0; k < 20; k++) if (GD.xacDinh([true,true,false,true,false,false]).i !== 3) E("xacDinh không ổn định");

// ===== Hướng 7: Tự quái như đời một người =====
const TQ = run("window.KD_TU_QUAI_DOI");
let soBuoc = 0, queSeq = [], vanTQ = [TQ && TQ.moDau, TQ && TQ.ket], dichTQ = [];
if (!TQ || !Array.isArray(TQ.phan) || TQ.phan.length !== 2) E("Tự quái: phải có 2 phần");
for (const p of (TQ ? TQ.phan : [])) { vanTQ.push(p.tieuDe);
  for (const d of p.doan || []) { vanTQ.push(d.tieuDe);
    for (const b of d.buoc || []) { soBuoc++;
      const t = `Tự quái bước quẻ ${(b.que || []).join(",")}`;
      if (!Array.isArray(b.que) || !b.que.length) E(`${t}: thiếu que`); else queSeq.push(...b.que);
      if (!b.zh || !nguonTuQuai.includes(chuan(b.zh))) E(`${t}: zh không dò được trong 序卦.txt: ${b.zh}`);
      if (!b.dich || la(b.dich)) E(`${t}: dich rỗng/lạ`); else dichTQ.push(b.dich);
      if (!b.ke || la(b.ke) || chu(b.ke) < 15) E(`${t}: ke rỗng/lạ/quá ngắn`); else vanTQ.push(b.ke);
      // tên quẻ trong zh phải đúng quẻ dẫn tới (quẻ cuối trong que), trừ hai bước mở đầu Càn Khôn và Hàm
      const ten = ZH[b.que[b.que.length - 1]].ten.replace(/^習/, "");
      if (!chuan(b.zh).includes(ten) && ![1, 31].includes(b.que[0])) E(`${t}: zh không chứa tên quẻ ${ten}`);
    } } }
if (queSeq.join(",") !== Array.from({ length: 64 }, (_, i) => i + 1).join(",")) E(`Tự quái: số quẻ không đúng thứ tự 1..64: ${queSeq.join(",")}`);
if (!TQ || !/chưa xong|Vị Tế/i.test(TQ.ket)) E("Tự quái: kết chưa nói ý Vị Tế / chưa xong");
const chuKe = vanTQ.reduce((a, s) => a + chu(s || ""), 0), chuDich = dichTQ.reduce((a, s) => a + chu(s), 0);
if (chuKe < TQ_MIN_CHU || chuKe > TQ_MAX_CHU) E(`Tự quái: phần kể ${chuKe} chữ, cần ${TQ_MIN_CHU}–${TQ_MAX_CHU}`);
const tbGD = cauTB(vanGD.filter(Boolean).join(" ")), tbTQ = cauTB(vanTQ.filter(Boolean).join(" "));
if (tbGD > MAX_CHU_CAU_TB) E(`Sáu giai đoạn: câu trung bình ${tbGD.toFixed(1)} chữ > ${MAX_CHU_CAU_TB}`);
if (tbTQ > MAX_CHU_CAU_TB) E(`Tự quái: câu trung bình ${tbTQ.toFixed(1)} chữ > ${MAX_CHU_CAU_TB}`);

// ===== Giao diện: PAGES, mục lục, trang gd và tq dựng được, link go('qN'), pager =====
const P = run("PAGES()");
const iNT = P.indexOf("nt"); if (P[iNT + 1] !== "gd" || P[iNT + 2] !== "tq") E(`PAGES: sau nt phải là gd, tq; có ${P.slice(iNT, iNT + 3).join(",")}`);
run("go('toc')"); for (const s of ["Sáu giai đoạn của mọi việc", "Tự quái như câu chuyện một đời", "go('gd')", "go('tq')"]) if (!els.book.innerHTML.includes(s)) E(`Mục lục thiếu ${s}`);
run("go('gd')"); let h = els.book.innerHTML;
if ((h.match(/class="hao gdk"/g) || []).length !== 6) E("Trang gd không dựng đủ 6 khối");
if (la(h)) E("Trang gd có undefined/NaN");
for (const s of ["二多譽", "三多凶", "其初難知", "潛龍勿用", "亢龍", "gdXem()", "gdQ5", "Cách dùng"]) if (!h.includes(s)) E(`Trang gd thiếu ${s}`);
for (const g of GD.gd) for (const x of g.hao) if (!h.includes(`go('q${x.n}')`)) E(`Trang gd thiếu link go('q${x.n}')`);
// bấm công cụ: chưa trả lời đủ → nhắc; 6 tổ hợp → 6 giai đoạn
run("gdXem()"); if (!els.gdKQ.innerHTML.includes("trả lời đủ")) E("gdXem chưa nhắc khi thiếu câu trả lời");
const raUI = TO_HOP.map(th => { th.forEach((v, i) => { mk("gdQ" + i).value = String(v); }); run("gdXem()"); const m = els.gdKQ.innerHTML.match(/hào (Sơ|Nhị|Tam|Tứ|Ngũ|Thượng)/); return m && m[1]; });
if (raUI.join(",") !== TEN_GD.join(",")) E(`Công cụ trên trang ra ${raUI.join(",")}, phải ${TEN_GD.join(",")}`);
if (la(els.gdKQ.innerHTML)) E("Kết quả công cụ có undefined");
run("go('tq')"); h = els.book.innerHTML;
if ((h.match(/class="hao tqb"/g) || []).length !== soBuoc) E(`Trang tq dựng ${(h.match(/class="hao tqb"/g) || []).length}/${soBuoc} bước`);
if (la(h)) E("Trang tq có undefined/NaN");
for (let n = 1; n <= 64; n++) if (!h.includes(`go('q${n}')`)) E(`Trang tq thiếu link go('q${n}')`);
for (const s of ["有天地", "終焉", "禮儀有所錯", "Kết"]) if (!h.includes(s)) E(`Trang tq thiếu ${s}`);
els.showzh.checked = false; run("go('tq')"); if (els.book.innerHTML.includes("終焉")) E("Tắt chữ Hán mà trang tq vẫn hiện chữ Hán");
run("go('gd')"); if (els.book.innerHTML.includes("潛龍勿用")) E("Tắt chữ Hán mà trang gd vẫn hiện chữ Hán"); els.showzh.checked = true;
for (const id of ["gd", "tq"]) { const k = P.indexOf(id); run(`go('${id}')`); h = els.book.innerHTML; if (!h.includes(`go('${P[k - 1]}')`) || !h.includes(`go('${P[k + 1]}')`)) E(`Pager trang ${id} thiếu nút trước/sau`); }
// trang Tự quái truyện cũ (tq0, tq1) vẫn đi đúng, không bị nhầm với "tq"
run("go('tq0')"); if (!els.book.innerHTML.includes("Tự quái truyện")) E("Trang tq0 (Tự quái truyện chương 1) bị nhầm");
// link "Gốc: Hệ từ hạ" của từng giai đoạn phải trỏ tới chương có đúng câu gốc
for (const g of GD.gd) { run(`go('${g.goc.trang}')`); if (!chuan(els.book.innerHTML).includes(chuan(g.goc.zh))) E(`Giai đoạn ${g.ten}: trang ${g.goc.trang} không chứa câu gốc`); }

// ===== Hướng 6: sổ chiêm nghiệm =====
ctx.localStorage._ = {};
// dữ liệu cũ (không có quyet/kq) vẫn hiện
ctx.localStorage.setItem("kd_hist", JSON.stringify([{ t: "01/01/2026, 08:00:00", hoi: "việc cũ", vals: [7, 8, 7, 8, 7, 8] }]));
run("hist()"); h = els.hist.innerHTML;
if (!h.includes("việc cũ") || la(h) || !h.includes("đã chấm <b>0/1</b>")) E("Lịch sử: mục cũ không hiện hoặc thống kê 0/1 sai");
ctx.localStorage._ = {};
// giả lập gieo 3 lần (có quyết), chấm 2 lần → thống kê 2/3
mk("hoi").value = "Có nên nhận dự án Quảng Ninh?"; mk("quyet").value = "Nhận một phần, không nhận cả gói"; run("$('#btnGieo').onclick()");
if (!els.kq.innerHTML.includes("Điều mình quyết") || la(els.kq.innerHTML)) E("Kết quả gieo không hiện điều mình quyết");
mk("hoi").value = "Đổi việc?"; mk("quyet").value = "Ở lại thêm 6 tháng"; run("$('#btnGieo').onclick()");
for (let i = 0; i < 6; i++) mk("h" + i).value = ["9", "8", "7", "6", "7", "8"][i]; mk("hoi2").value = "Mở tiệm thứ hai"; mk("quyet2").value = ""; run("$('#btnNhap').onclick()");
let H = run("histDoc()");
if (H.length !== 3 || H[0].hoi !== "Mở tiệm thứ hai" || H[0].quyet !== undefined || H[1].quyet !== "Ở lại thêm 6 tháng" || H[2].quyet !== "Nhận một phần, không nhận cả gói") E("Lưu gieo 3 lần sai: " + JSON.stringify(H));
if (!run("histCham(2,'dung','đã nhận một phần, xong đúng hạn')") || !run("histCham(1,'nua','')")) E("histCham trả false");
if (run("histCham(1,'xyz','')") !== false || run("histCham(9,'dung','')") !== false) E("histCham nhận mức sai hoặc mục không có");
let tk = run("histThongKe(histDoc())");
if (tk.m !== 3 || tk.n !== 2 || tk.dung !== 1 || tk.nua !== 1 || tk.sai !== 0) E("Thống kê sai: " + JSON.stringify(tk));
run("hist()"); h = els.hist.innerHTML;
if (!h.includes("đã chấm <b>2/3</b>") || !h.includes("đúng hướng <b>1</b>") || !h.includes("nửa đúng <b>1</b>") || !h.includes("sai hướng <b>0</b>") || la(h)) E("Khung thống kê trên trang sai");
if ((h.match(/<tr><td/g) || []).length !== 3 || !h.includes("Nhận một phần") || !h.includes("đã nhận một phần")) E("Bảng lịch sử thiếu dòng hoặc thiếu quyết/ghi chú");
// chấm qua form: mục 0 sai hướng
mk("kqMuc0").value = "sai"; mk("kqGhi0").value = "lỗ"; run("histChamTuForm(0)"); tk = run("histThongKe(histDoc())"); if (tk.n !== 3 || tk.sai !== 1) E("Chấm qua form sai");
run("histCham(0,'','')"); tk = run("histThongKe(histDoc())"); if (tk.n !== 2) E("Bỏ chấm không hoạt động");
run("histQuyet(0,'Đợi hết năm')"); if (run("histDoc()[0].quyet") !== "Đợi hết năm") E("histQuyet không lưu");
// replay mục đã chấm
run("replay(2)"); if (!els.hist.innerHTML.includes("Kết quả thực tế") || !els.hist.innerHTML.includes("Nhận một phần") || la(els.hist.innerHTML)) E("replay thiếu quyết/kết quả");
// xuất → xoá → nhập lại khớp
const truoc = JSON.stringify(run("histDoc()")), xuat = run("histXuat()");
const bo = JSON.parse(xuat); if (bo.kho !== "kinh-dich" || !Array.isArray(bo.muc) || bo.muc.length !== 3) E("Xuất JSON sai cấu trúc");
ctx.localStorage._ = {}; const r1 = run(`histNhap(${JSON.stringify(xuat)})`);
if (!r1.ok || r1.moi !== 3 || JSON.stringify(run("histDoc()")) !== truoc) E("Nhập lại không khớp bản xuất: " + JSON.stringify(r1));
const r2 = run(`histNhap(${JSON.stringify(xuat)})`); if (!r2.ok || r2.moi !== 0 || run("histDoc().length") !== 3) E("Nhập trùng lại tạo bản sao: " + JSON.stringify(r2));
// nhập mảng thô kiểu cũ, mục hỏng bị bỏ
const r3 = run(`histNhap(${JSON.stringify(JSON.stringify([{ t: "x", vals: [7, 7, 7, 7, 7, 7] }, { t: "y", vals: [1, 2] }, "rác"]))})`);
if (!r3.ok || r3.moi !== 1 || r3.bo !== 2) E("Nhập mảng thô/mục hỏng sai: " + JSON.stringify(r3));
if (run("histNhap('{bad')").ok || run("histNhap('{\"a\":1}')").ok) E("Nhập JSON hỏng mà báo ok");
// localStorage hỏng không làm sập
ctx.localStorage.setItem("kd_hist", "{hỏng"); run("hist()"); if (la(els.hist.innerHTML) || !els.hist.innerHTML.includes("Chưa có lần gieo")) E("localStorage hỏng làm trang lịch sử lỗi");
ctx.localStorage._ = {};
if (/fetch\(|XMLHttpRequest|navigator\.sendBeacon/.test(readFileSync("app.js", "utf8"))) E("app.js có lệnh gửi dữ liệu ra mạng");

console.log(`Đã kiểm: 6 giai đoạn (${GD.gd.reduce((a, g) => a + g.hao.length, 0)} hào từ dò nguồn, 6 câu gốc Hệ từ hạ, công cụ 6 câu hỏi 64 tổ hợp), Tự quái ${soBuoc} bước/${queSeq.length} quẻ (phần kể ${chuKe} chữ + dịch ${chuDich} chữ; câu TB kể ${tbTQ.toFixed(1)}, giai đoạn ${tbGD.toFixed(1)} chữ), sổ chiêm nghiệm (gieo 3, chấm 2, xuất/nhập). Lỗi: ${errs.length}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
