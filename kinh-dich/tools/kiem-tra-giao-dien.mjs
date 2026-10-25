// Kiểm tra giao diện trong môi trường giả lập trình duyệt: node tools/kiem-tra-giao-dien.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const els = {};
const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: true, dataset: {},
  classList: { toggle() {}, contains() { return false; } }, scrollIntoView() {}, onclick: null, oninput: null, onchange: null });
const ctx = { localStorage: { _: {}, getItem(k) { return this._[k] ?? null; }, setItem(k, v) { this._[k] = String(v); }, removeItem(k) { delete this._[k]; } },
  document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [] }, crypto: webcrypto, console, scrollTo() {} };
ctx.window = ctx; vm.createContext(ctx);
const html = readFileSync("kinh-dich.html", "utf8");
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(readFileSync(m[1], "utf8"), ctx, { filename: m[1] });

const errs = [];
const run = s => vm.runInContext(s, ctx);
const P = run("PAGES()");
for (const p of P) {
  run(`go('${p}')`);
  const h = els.book.innerHTML;
  if (h.includes("undefined") || h.includes("giải nghĩa quẻ này chưa có")) errs.push("Trang lỗi: " + p);
}
run("go('toc')");
const nStudy = P.filter(p => p[0] === "s").length;
if (!nStudy || !els.book.innerHTML.includes("Nghiên cứu")) errs.push("Mục lục thiếu phần Nghiên cứu");
const nHeTu = P.filter(p => p[0] === "a" || p[0] === "b").length;
if (nHeTu !== 21 || !els.book.innerHTML.includes("Hệ từ truyện")) errs.push(`Hệ từ: ${nHeTu}/21 trang hoặc mục lục thiếu`);
run("go('b3')"); if (!els.book.innerHTML.includes("動之微")) errs.push("Trang Hệ từ hạ 4 thiếu đoạn tri cơ");
run("go('toc')");
const nTD = P.filter(p => /^t[vtqp]\d+$/.test(p)).length; // trang Thập dực: t + mã thiên + số chương (không lẫn "toc", "tq")
for (const t of ["Văn ngôn truyện", "Thuyết quái truyện", "Tự quái truyện", "Tạp quái truyện"]) if (!els.book.innerHTML.includes(t)) errs.push("Mục lục thiếu " + t);
if (nTD !== 19) errs.push(`Thập dực: ${nTD}/19 trang`);
run("go('tt2')"); if (!els.book.innerHTML.includes("逆數")) errs.push("Trang Thuyết quái 3 thiếu câu nghịch số");
run("go('tq1')"); if (!els.book.innerHTML.includes("終焉")) errs.push("Trang Tự quái hạ thiếu câu kết");
run("go('tv4')"); if (!els.book.innerHTML.includes("積善之家")) errs.push("Trang Khôn Văn ngôn thiếu câu tích thiện");
for (let k = 0; k < 200; k++) { run(`$('#kq').innerHTML=result(Array.from({length:6},toss),'thu',false)`); if (els.kq.innerHTML.includes("undefined")) { errs.push("Lỗi gieo"); break; } }

// Đối chiếu tra năm với giá trị đã biết
const expect = [
  [1984, "Giáp Tý", "Hải Trung Kim", 7, 7], [2000, "Canh Thìn", "Bạch Lạp Kim", 7, 9], [2004, "Giáp Thân", "Tuyền Trung Thủy", 8, 5],
  [2022, "Nhâm Dần", "Kim Bạch Kim", 8, 5], [2024, "Giáp Thìn", "Phú Đăng Hỏa", 9, 3], [2025, "Ất Tỵ", "Phú Đăng Hỏa", 9, 2],
  [2026, "Bính Ngọ", "Thiên Hà Thủy", 9, 1], [2027, "Đinh Mùi", "Thiên Hà Thủy", 9, 9], [2044, "Giáp Tý", "Hải Trung Kim", 1, 1]];
for (const [y, cc, na, van, sao] of expect) {
  const r = run(`namInfo(${y})`);
  if (r.canChi !== cc || r.napAm !== na || r.van !== van || !r.sao.startsWith(sao + " ")) errs.push(`Năm ${y}: ra ${r.canChi}/${r.napAm}/vận ${r.van}/sao ${r.sao}`);
}
run("$('#namY').value='2026';$('#soNam').value='20';traNam()");
if (!els.kqNam.innerHTML.includes("Bính Ngọ") || els.kqNam.innerHTML.includes("undefined")) errs.push("Trang Tra năm lỗi");

// Mai Hoa: ví dụ "Quán mai chiêm" (觀梅占) – năm Thìn(5), tháng 12, ngày 17, giờ Thân(9) → Cách, hào 1 động, hỗ Cấu, biến Hàm
{ const q = run("maiHoaSo(5,12,17,9)");
  if (q.chu !== 49 || q.dong !== 1 || q.ho !== 44 || q.bien !== 31) errs.push(`Mai Hoa ví dụ Quán mai sai: chủ ${q.chu}, động ${q.dong}, hỗ ${q.ho}, biến ${q.bien}`);
  const t = run("thongTinThoiGian(new Date(2000,0,1,12))");
  if (t.ccNgay !== "Mậu Ngọ" || t.ccNam !== "Kỷ Mão") errs.push(`Can chi 1/1/2000 sai: ngày ${t.ccNgay}, năm ${t.ccNam}`);
  // 17/2/2026 9h30 = mùng 1 Tết Bính Ngọ, giờ Tỵ: 7+1+1=9→Càn; 9+6=15→Cấn; 15%6=3 → Thiên Sơn Độn (33), hào 3
  run("$('#mhDT').value='2026-02-17T09:30';lapMaiHoaNgay()");
  const h = els.kqMH.innerHTML;
  if (!h.includes("ngày 1 tháng 1") || !h.includes("Quẻ 33.") || !h.includes("Hào động: <b>3</b>") || h.includes("undefined")) errs.push("Mai Hoa theo ngày 17/2/2026 sai");
  run("$('#mhDT').value='2026-02-16T23:30';lapMaiHoaNgay()");
  if (!els.kqMH.innerHTML.includes("ngày 1 tháng 1")) errs.push("Giờ Tý sau 23h chưa chuyển sang ngày hôm sau");
  for (let a = 1; a <= 30; a++) { run(`$('#mhA').value='${a}';$('#mhB').value='${a*7+3}';lapMaiHoaSo()`);
    if (els.kqMH.innerHTML.includes("undefined")) { errs.push("Mai Hoa theo số lỗi với a=" + a); break; } }
}
// Hoàng cực kinh thế: đối chiếu 3 mốc trong nguyên văn (quyển 5 thượng, 6 trung) và năm 2026
{ const chk = (y, hoi, van, the, nam, nhan) => { const h = run(`HCKT.info(${y})`);
    if (!h || h.hoi !== hoi || h.van !== van || h.the !== the || h.namTrongThe !== nam) errs.push(`HCKT ${nhan}: ra hội ${h&&h.hoi}, vận ${h&&h.van}, thế ${h&&h.the}, năm ${h&&h.namTrongThe}`); };
  chk(-2356, 6, 180, 2156, 11, "Nghiêu Giáp Thìn 2357 TCN (經世之未2156)");
  chk(304, 7, 188, 2245, 1, "Tấn Huệ Đế 14 = 304 (經運之辛188, 經世之子2245)");
  chk(604, 7, 188, 2255, 1, "Tùy Văn Đế 24 = 604 (經世之戌2255)");
  chk(2026, 7, 192, 2302, 13, "năm 2026");
  run("go('s8')"); if (!els.book.innerHTML.includes("開物始月寅之中") || !els.book.innerHTML.includes("2217 TCN")) errs.push("Chương N9 thiếu nội dung");
  run("$('#namY').value='2026';$('#soNam').value='5';traNam()");
  if (!els.kqNam.innerHTML.includes("Hội Ngọ") || !els.kqNam.innerHTML.includes("Thế Dậu 2302")) errs.push("Tra năm chưa hiện Hoàng cực kinh thế");
}
// Chương N11 (thời cuộc) và thẻ Thời vận: mục lục có N11, trang s10 có sổ dự đoán 5 dòng; ThoiVan.hien dựng cho 3 thời điểm không undefined, đúng tầng đã biết
{ run("go('toc')"); if (!els.book.innerHTML.includes("N11. Luận thời cuộc")) errs.push("Mục lục thiếu chương N11");
  run("go('s10')"); const h = els.book.innerHTML;
  if (!h.includes("Sổ dự đoán") || (h.match(/<tr><td>\d<\/td>/g) || []).length !== 5 || !h.includes("知幾其神乎")) errs.push("Chương N11 thiếu sổ dự đoán 5 dòng hoặc trích dẫn");
  for (const [y, m, d, hoi, van, sao, que] of [[2026, 10, 24, 7, 9, 1, 23], [2027, 6, 1, 7, 9, 9, 1], [2044, 2, 10, 7, 1, 1, 11]]) {
    const r = run(`ThoiVan.tang(new Date(${y},${m - 1},${d},12))`);
    if (r.h.hoi !== hoi || r.v.van !== van || r.saoNam !== sao || r.queThang !== que) errs.push(`Thời vận ${d}/${m}/${y}: hội ${r.h.hoi} vận ${r.v.van} sao ${r.saoNam} quẻ tháng ${r.queThang}`);
    const html = run(`ThoiVan.hien(new Date(${y},${m - 1},${d},12))`); if (/undefined|NaN/.test(html) || !html.includes("Thời vận")) errs.push(`Thẻ Thời vận ${d}/${m}/${y} lỗi`); }
  run("$('#tvDT').value='2026-10-24T12:00';$('#btnTV').onclick()"); if (!els.kqTV.innerHTML.includes("Bính Ngọ")) errs.push("Nút Thời vận không dựng kết quả"); }
// Chương N10 (Lục hào): có trong mục lục, dựng được, bảng lục thân sinh từ KD_LUC_HAO_SACH, trích dẫn chương 3 và 12
{ run("go('toc')"); if (!els.book.innerHTML.includes("N10. Lục hào")) errs.push("Mục lục thiếu chương N10");
  run("go('s9')"); const h = els.book.innerHTML;
  if (!h.includes("須要先念渾天甲子") || !h.includes("明知故犯者") || !h.includes("<td><b>Kim</b></td><td>Kim</td><td>Thổ</td><td>Mộc</td><td>Hỏa</td><td>Thủy</td>")) errs.push("Chương N10 thiếu nội dung");
  const nZh = (h.match(/class="zh"/g) || []).length; if (nZh < 40) errs.push(`Chương N10 chỉ có ${nZh} trích dẫn`); }
// Lục hào: đối chiếu với Tăng san bốc dịch (nguon/luc-hao) – chương 5 (乾為天), 6 (cung Càn), 11 (復之震), 15 (坤之晉)
{ const L = s => errs.push("Lục hào: " + s);
  const nCung = run("Object.keys(LucHao.CUNG).length"); if (nCung !== 64) L(`bát cung có ${nCung}/64 quẻ`);
  const cungCan = run(`["111111","011111","001111","000111","000011","000001","000101","111101"].map(x=>BY[x]+'/'+LucHao.CUNG[x].the).join(' ')`);
  if (cungCan !== "1/6 44/1 33/2 12/3 20/4 23/5 35/4 14/3") L("cung Càn sai: " + cungCan);
  const bay = (vals, ngay=0, thang=3) => run(`(()=>{const q=LucHao.anQue(${JSON.stringify(vals)},${ngay},${thang});return {chu:q.hao.map(h=>h.than+CHI[h.chi]).join(','),bien:q.bien?q.bien.map(h=>h.than+CHI[h.chi]).join(','):'',the:q.cung.the,ung:q.cung.ung,phuc:q.phuc.map((p,i)=>p?(i+1)+p.than+CHI[p.chi]:'').join(''),thu:q.thu[0],khong:q.khong.map(i=>CHI[i]).join('')}})()`);
  let r = bay([7,7,7,7,7,7]);
  if (r.chu !== "Tử tônTý,Thê tàiDần,Phụ mẫuThìn,Quan quỷNgọ,Huynh đệThân,Phụ mẫuTuất" || r.the !== 6 || r.ung !== 3) L("乾為天 sai: " + r.chu + " thế " + r.the);
  r = bay([7,8,8,6,8,8]);
  if (r.chu !== "Thê tàiTý,Quan quỷDần,Huynh đệThìn,Huynh đệSửu,Thê tàiHợi,Tử tônDậu" || r.the !== 1 || r.ung !== 4) L("復 sai: " + r.chu);
  if (r.bien !== "Thê tàiTý,Quan quỷDần,Huynh đệThìn,Phụ mẫuNgọ,Tử tônThân,Huynh đệTuất") L("復之震 biến sai: " + r.bien);
  if (r.phuc !== "2Phụ mẫuTỵ") L("復 phục thần sai: " + r.phuc);
  r = bay([8,8,8,6,8,6]);
  if (r.chu !== "Huynh đệMùi,Phụ mẫuTỵ,Quan quỷMão,Huynh đệSửu,Thê tàiHợi,Tử tônDậu" || r.the !== 6 || r.ung !== 3) L("坤 sai: " + r.chu);
  if (r.bien !== "Huynh đệMùi,Phụ mẫuTỵ,Quan quỷMão,Tử tônDậu,Huynh đệMùi,Phụ mẫuTỵ") L("坤之晉 biến sai: " + r.bien);
  if (r.thu !== "Thanh Long" || r.khong !== "TuấtHợi") L(`ngày Giáp Tý: lục thần ${r.thu}, không ${r.khong}`);
  r = bay([7,7,7,7,7,7], 10); if (r.khong !== "ThânDậu") L("tuần không ngày Giáp Tuất sai: " + r.khong);
  r = bay([7,7,7,7,7,7], 5); if (r.thu !== "Đằng Xà") L("lục thần ngày Kỷ sai: " + r.thu);
  for (const [d, chi] of [["2026,2,1","Sửu"],["2026,2,17","Dần"],["2026,4,10","Thìn"],["2026,8,10","Thân"],["2025,12,25","Tý"]]) {
    const [y,m,dd] = d.split(","); const c = run(`CHI[LichAm.chiThangTiet(${dd},${m},${y})]`); if (c !== chi) L(`tháng tiết ${d} ra ${c}, phải ${chi}`); }
  run("$('#lhDT').value='2000-01-01T10:00'"); const t = run("lhThoiDiem()"); if (t.ngayIdx !== 54) L("ngày 1/1/2000 phải Mậu Ngọ (54), ra " + t.ngayIdx);
  for (const k of ["the","tai","quan","phu","tu","huynh"]) { run(`$('#lhViec').value='${k}';lapLucHao([7,8,8,6,8,8])`);
    if (!els.kqLH.innerHTML.includes("Dụng thần") || els.kqLH.innerHTML.includes("undefined")) { L("trang kết quả lỗi với việc " + k); break; } }
  for (let k = 0; k < 300; k++) { run("$('#lhViec').value='tai';lapLucHao(Array.from({length:6},toss))"); if (els.kqLH.innerHTML.includes("undefined") || els.kqLH.innerHTML.includes("NaN")) { L("gieo ngẫu nhiên lỗi"); break; } }
}
console.log(`Đã dựng ${P.length} trang (${nStudy} chương nghiên cứu), 200 lần gieo, ${expect.length} năm đối chiếu. Lỗi: ${errs.length}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
console.log("OK");
