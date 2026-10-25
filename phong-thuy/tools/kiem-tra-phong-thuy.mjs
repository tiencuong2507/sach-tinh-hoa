// Kiểm công cụ phong thủy: node tools/kiem-tra-phong-thuy.mjs (chạy trong thư mục PHONG THUY)
// Nạp lõi chung + phong-thuy.js + app.js đúng theo <script src> trong phong-thuy.html; đối chiếu mốc đã biết; dựng giao diện giả lập; red-team quy tắc biến hào. Lỗi → exit 1.
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
const errs = [], ok = (c, m) => { if (!c) errs.push(m); };
const html = readFileSync("phong-thuy.html", "utf8"), srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
ok(srcs.length === 8 && srcs[4] === "../chung/lich-chon.js" && srcs[5] === "data/the-quai.js" && srcs[6] === "phong-thuy.js" && srcs[7] === "app.js", "phong-thuy.html phải nạp 5 file chung (kể cả lich-chon.js) + data/the-quai.js + phong-thuy.js + app.js, thấy: " + srcs.join(", "));

function taoCtx() {
  const els = {}, mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: false, dataset: {}, classList: { toggle() {}, contains() { return false; } }, onclick: null, onchange: null, oninput: null });
  const kho = {};
  const ctx = { document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [] }, console,
    localStorage: { getItem: k => (k in kho ? kho[k] : null), setItem: (k, v) => { kho[k] = String(v); }, removeItem: k => { delete kho[k]; } } };
  ctx.window = ctx; vm.createContext(ctx); return { ctx, els, kho };
}
const { ctx, els, kho } = taoCtx();
for (const f of srcs) vm.runInContext(readFileSync(f, "utf8"), ctx, { filename: f });
const { PhongThuy: P, CuuCung, CHI } = ctx, run = s => vm.runInContext(s, ctx);
const bang = q => Object.fromEntries(P.duNien(q).map(d => [d.ten, d.quai]));

// 1. Bảng du niên mệnh Càn và Khảm (bảng Bát trạch lưu truyền)
{ const c = bang("Càn");
  for (const [dn, q] of [["Sinh khí", "Đoài"], ["Thiên y", "Cấn"], ["Diên niên", "Khôn"], ["Phục vị", "Càn"], ["Tuyệt mệnh", "Ly"], ["Ngũ quỷ", "Chấn"], ["Lục sát", "Khảm"], ["Họa hại", "Tốn"]]) ok(c[dn] === q, `Càn ${dn} phải là ${q}, ra ${c[dn]}`);
  const k = bang("Khảm");
  for (const [dn, q] of [["Sinh khí", "Tốn"], ["Thiên y", "Chấn"], ["Diên niên", "Ly"], ["Phục vị", "Khảm"]]) ok(k[dn] === q, `Khảm ${dn} phải là ${q}, ra ${k[dn]}`);
  ok(P.duNienTheoHuong("Càn", "Tây").ten === "Sinh khí" && P.duNienTheoHuong("Khảm", "Đông Nam").ten === "Sinh khí" && P.duNienTheoHuong("Càn", "Nam").ten === "Tuyệt mệnh", "tra du niên theo hướng");
  // Mỗi mệnh: 8 du niên ra 8 quái khác nhau, đúng 4 cát 4 hung; quái cát của Đông tứ mệnh đều thuộc Đông tứ (và Tây tương tự)
  for (const q of [...P.DONG_TU, ...P.TAY_TU]) { const ds = P.duNien(q), nhom = P.DONG_TU.includes(q) ? P.DONG_TU : P.TAY_TU;
    ok(new Set(ds.map(d => d.quai)).size === 8 && ds.filter(d => d.cat).length === 4, `mệnh ${q} không đủ 8 quái khác nhau / 4 cát`);
    ok(ds.filter(d => d.cat).every(d => nhom.includes(d.quai)), `mệnh ${q}: hướng cát phải cùng nhóm Đông/Tây`); } }
// 2. Quái mệnh theo năm sinh: mốc tin cậy nam 1984 Đoài, nữ 1984 Cấn; nam 1990 Khảm, nữ 1990 Cấn; công thức cho 2000: nam Ly (niên tinh 9), nữ Càn
for (const [y, g, q] of [[1984, "nam", "Đoài"], [1984, "nữ", "Cấn"], [1990, "nam", "Khảm"], [1990, "nữ", "Cấn"], [2000, "nam", "Ly"], [2000, "nữ", "Càn"]]) ok(P.quaiMenh(y, g).quai === q, `${g} ${y} phải là ${q}, ra ${P.quaiMenh(y, g).quai}`);
ok(P.quaiMenh(1984, "nam").nienTinh === CuuCung.nienTinh(1984), "quái mệnh phải lấy niên tinh từ lõi chung");
// Số 5: nam → Khôn, nữ → Cấn (nam niên tinh 5: 1986? kiểm theo công thức: tìm năm có niên tinh 5 và năm nữ ra 15−nt = 5 tức nt = 1)
{ const y5 = [...Array(30).keys()].map(i => 1980 + i).find(y => CuuCung.nienTinh(y) === 5), y1 = [...Array(30).keys()].map(i => 1980 + i).find(y => CuuCung.nienTinh(y) === 1);
  ok(P.quaiMenh(y5, "nam").quai === "Khôn" && P.quaiMenh(y1, "nữ").quai === "Cấn", `số 5: nam ${y5} phải Khôn, nữ ${y1} phải Cấn`); }
// 3. Mọi năm 1900–2100, hai giới: quái hợp lệ, số ≠ 5, nhóm đúng
{ let loi = 0; for (let y = 1900; y <= 2100; y++) for (const g of ["nam", "nữ"]) { const m = P.quaiMenh(y, g); if (!m.quai || m.so === 5 || ![...P.DONG_TU, ...P.TAY_TU].includes(m.quai) || !m.hanh) loi++; } ok(loi === 0, `${loi} năm/giới ra quái không hợp lệ`); }
// 4. Năm theo Lập xuân: 1/1/1984 → 1983; 5/2/1984 → 1984; 3/2/2026 → 2025; 4/2/2026 → 2026; 15/6/1986 → 1986
for (const [d, m, y, n] of [[1, 1, 1984, 1983], [5, 2, 1984, 1984], [3, 2, 2026, 2025], [4, 2, 2026, 2026], [15, 6, 1986, 1986], [31, 12, 2000, 2000]]) ok(P.namTheoLapXuan(d, m, y).nam === n, `${d}/${m}/${y} năm Lập xuân phải ${n}, ra ${P.namTheoLapXuan(d, m, y).nam}`);
ok(P.batTrach([20, 1, 1985], "nam").menh.quai === "Đoài" && P.batTrach([20, 1, 1985], "nam").truocLapXuan, "sinh 20/1/1985 (trước Lập xuân) phải tính năm 1984 → Đoài");
// 5. Đánh giá hạng mục: mệnh Khảm, nhà hướng Bắc (tọa Nam Diên niên) hợp; cửa Tây Nam (Tuyệt mệnh) không hợp; bếp vị trí Tây Nam hợp (tọa hung); bếp hướng Đông Nam hợp
{ const r = P.batTrach([1, 7, 1990], "nam", { nha: "Bắc", cua: "Tây Nam", bepViTri: "Tây Nam", bepHuong: "Đông Nam", giuong: "Đông", ban: "Tây" }), g = Object.fromEntries(r.danhGia.map(x => [x.ten, x]));
  ok(g["Nhà (tọa)"].huong === "Nam" && g["Nhà (tọa)"].hop && g["Nhà (tọa)"].duNien === "Diên niên", "nhà hướng Bắc tọa Nam Diên niên");
  ok(!g["Cửa chính"].hop && g["Bếp – vị trí"].hop && g["Bếp – hướng"].hop && g["Giường ngủ"].hop && !g["Bàn làm việc"].hop, "đánh giá hạng mục mệnh Khảm: " + JSON.stringify(r.danhGia.map(x => [x.ten, x.hop])));
  ok(r.danhGia.every(x => x.loiKhuyen && x.giaiThich && !/undefined/.test(x.loiKhuyen)), "lời khuyên thiếu"); }
// 6. Phi tinh: 2024 trung cung 3, Ngũ Hoàng Tây; 2025 trung 2, Ngũ Hoàng Đông Bắc; 2026 trung 1, Ngũ Hoàng Nam, Nhị Hắc Tây Bắc; mỗi lưới đủ 9 số khác nhau; thứ tự bay
for (const [y, tc, nh] of [[2024, 3, "Tây"], [2025, 2, "Đông Bắc"], [2026, 1, "Nam"]]) { const L = P.luoiPhiTinh(1, 6, y);
  ok(L.nienTinh === tc && L.oCung[5].saoNam === tc, `${y} trung cung phải ${tc}, ra ${L.nienTinh}`); ok(L.nguHoangNam.huong === nh, `${y} Ngũ Hoàng phải ở ${nh}, ra ${L.nguHoangNam.huong}`);
  ok(new Set(Object.values(L.oCung).map(o => o.saoNam)).size === 9 && new Set(Object.values(L.oCung).map(o => o.saoThang)).size === 9, `${y} lưới không đủ 9 số khác nhau`); }
{ const b = Object.fromEntries(P.phiTinh(5).map(c => [c.so, c.sao])); ok([1, 2, 3, 4, 5, 6, 7, 8, 9].every(n => b[n] === n), "Ngũ Hoàng nhập trung phải ra nguyên bàn Lạc thư");
  const b1 = Object.fromEntries(P.phiTinh(1).map(c => [c.so, c.sao])); ok(b1[6] === 2 && b1[7] === 3 && b1[8] === 4 && b1[9] === 5 && b1[1] === 6 && b1[2] === 7 && b1[3] === 8 && b1[4] === 9, "bay thuận 1 nhập trung: 6→2 7→3 8→4 9→5 1→6 2→7 3→8 4→9");
  ok(P.LUOI.flat().join() === "4,9,2,3,5,7,8,1,6", "lưới vẽ phải Tốn Ly Khôn / Chấn trung Đoài / Cấn Khảm Càn"); }
// Nguyệt tinh dùng lõi chung: 24/10/2026 tháng Tuất năm Ngọ → 9; 20/2/2026 tháng Dần năm Ngọ → 8
ok(P.luoiPhiTinh(24, 10, 2026).nguyetTinh === CuuCung.nguyetTinh(6, 10) && P.luoiPhiTinh(24, 10, 2026).nguyetTinh === 9 && P.luoiPhiTinh(20, 2, 2026).nguyetTinh === 8, "nguyệt tinh 2026");
// 7. 24 sơn: phủ kín 360° (bước 0,1°), 0° Tý, 90° Mão, 180° Ngọ, 270° Dậu, 7° Tý, 8° Quý, 352,4° Nhâm; quái 45°; tọa đối; tam nguyên long, âm dương; mỗi nguyên 8 sơn, 12 dương 12 âm
{ let loi = 0, dem = Array(24).fill(0); for (let d = 0; d < 3600; d++) { const s = P.son(d / 10); if (!s.ten || !s.nguyen || !s.amDuong || !s.quai || s.idx < 0 || s.idx > 23) loi++; else dem[s.idx]++; }
  ok(loi === 0 && dem.every(n => n === 150), `24 sơn không phủ kín đều 360° (lỗi ${loi}, đếm ${dem.join(",")})`);
  for (const [d, t] of [[0, "Tý"], [90, "Mão"], [180, "Ngọ"], [270, "Dậu"], [7, "Tý"], [8, "Quý"], [352.4, "Nhâm"], [352.5, "Tý"], [45, "Cấn"], [135, "Tốn"], [225, "Khôn"], [315, "Càn"], [360, "Tý"], [-5, "Tý"]]) ok(P.son(d).ten === t, `${d}° phải là ${t}, ra ${P.son(d).ten}`);
  for (const [d, q, h] of [[0, "Khảm", "Bắc"], [22.4, "Khảm", "Bắc"], [22.5, "Cấn", "Đông Bắc"], [90, "Chấn", "Đông"], [180, "Ly", "Nam"], [270, "Đoài", "Tây"], [315, "Càn", "Tây Bắc"], [337.4, "Càn", "Tây Bắc"], [337.5, "Khảm", "Bắc"]]) ok(P.son(d).quai === q && P.son(d).huong === h, `${d}° phải quái ${q} ${h}, ra ${P.son(d).quai} ${P.son(d).huong}`);
  ok(P.laBan(0).toa.ten === "Ngọ" && P.laBan(100).toa.ten === "Tân" && P.laBan(100).huong.ten === "Ất" && P.laBan(300).toa.ten === "Thìn" && P.laBan(300).huong.ten === "Tuất", "tọa hướng đối nhau");
  ok(P.son(0).nguyen === "Thiên nguyên long" && P.son(0).amDuong === "âm" && P.son(45).amDuong === "dương" && P.son(15).nguyen === "Nhân nguyên long" && P.son(345).nguyen === "Địa nguyên long" && P.son(345).amDuong === "dương" && P.son(30).amDuong === "âm" && P.son(60).amDuong === "dương", "tam nguyên long, âm dương sơn");
  const all = P.SON24.map(t => P.son(P.SON24.indexOf(t) * 15)); ok(Object.values(P.NGUYEN).every(a => a.length === 8) && all.filter(s => s.amDuong === "dương").length === 12 && new Set(P.SON24).size === 24, "mỗi nguyên 8 sơn, 12 dương 12 âm"); }
// 8. Câu dẫn phải có trong nguyên văn đã tải
{ const bo = s => s.replace(/[\s，。；：！？、]/g, "");
  if (existsSync("nguon/thanh-nang-kinh.txt")) { const t = bo(readFileSync("nguon/thanh-nang-kinh.txt", "utf8"));
    for (const c of ["外氣行形內氣止生乘風則散界水則止", "形止氣蓄萬物化生", "坎一坤二震三巽四中五乾六兌七艮八離九", "一起正北二居西南三居正東四居東南"]) ok(t.includes(c), "không thấy trong Thanh nang kinh: " + c); }
  else errs.push("thiếu nguon/thanh-nang-kinh.txt (chạy node tools/tai-nguon.mjs)");
  if (existsSync("nguon/tang-thu.txt")) { const t = bo(readFileSync("nguon/tang-thu.txt", "utf8")); ok(t.includes("乘風則散界水則止") && t.includes("乘生氣"), "đề yếu Táng thư phải dẫn 乘風則散，界水則止 và 乘生氣"); }
  else errs.push("thiếu nguon/tang-thu.txt (chạy node tools/tai-nguon.mjs)"); }
// 9. Giao diện giả lập: ba thẻ + trang cách tính không "undefined"/NaN; localStorage nhớ đầu vào
run("$('#btNgay').value='1984-06-15';$('#btGioi').value='nam';$('#btNha').value='Nam';$('#btCua').value='Tây';$('#btBepVt').value='Đông';$('#btBepH').value='Tây Bắc';$('#btGiuong').value='Tây Nam';$('#btBan').value='Đông Bắc';xemBatTrach()");
ok(els.kqBatTrach.innerHTML.includes("Đoài") && els.kqBatTrach.innerHTML.includes("Tây tứ mệnh") && els.kqBatTrach.innerHTML.split("<tr").length >= 16 && !/undefined|NaN/.test(els.kqBatTrach.innerHTML), "trang Bát trạch lỗi");
ok(JSON.parse(kho.pt_bt).nha === "Nam" && JSON.parse(kho.pt_bt).ngay === "1984-06-15", "localStorage phải nhớ đầu vào Bát trạch");
run("$('#btNgay').value='';xemBatTrach()"); ok(els.kqBatTrach.innerHTML.includes("Nhập ngày sinh") && !/undefined/.test(els.kqBatTrach.innerHTML), "thiếu ngày sinh phải nhắc nhập");
run("$('#ptNgay').value='2026-10-24';lapPhiTinh()"); ok(els.kqPhiTinh.innerHTML.includes("Nhất Bạch") && els.kqPhiTinh.innerHTML.includes("Bính Ngọ") && (els.kqPhiTinh.innerHTML.match(/class="o /g) || []).length === 9 && !/undefined|NaN/.test(els.kqPhiTinh.innerHTML), "trang phi tinh lỗi");
run("$('#ptNgay').value='2024-06-01';lapPhiTinh()"); ok(els.kqPhiTinh.innerHTML.includes("Tam Bích") && /tại <b>Tây<\/b> \(Ngũ Hoàng\)/.test(els.kqPhiTinh.innerHTML), "2024 phải nhắc Ngũ Hoàng ở Tây");
run("$('#lbDo').value='97';traLaBan()"); ok(els.kqLaBan.innerHTML.includes("Mão") && els.kqLaBan.innerHTML.includes("tọa Dậu hướng Mão") && !/undefined|NaN/.test(els.kqLaBan.innerHTML), "trang la bàn lỗi");
run("$('#lbDo').value='abc';traLaBan()"); ok(els.kqLaBan.innerHTML.includes("Tý") && !/undefined|NaN/.test(els.kqLaBan.innerHTML), "la bàn với số rác phải về 0°");
ok(els.cachHtml.innerHTML.includes("[V]") && els.cachHtml.innerHTML.includes("[I]") && !/undefined|NaN/.test(els.cachHtml.innerHTML), "trang cách tính lỗi");
// 10. Red-team: cố ý đổi quy tắc biến hào (Sinh khí ↔ Họa hại) trong một bản sao chạy riêng → bảng Càn phải SAI, chứng tỏ mốc kiểm bắt được lỗi; file gốc không đổi
{ const goc = readFileSync("phong-thuy.js", "utf8"), hong = goc.replace('{ ten: "Sinh khí",   bien: [2],', '{ ten: "Sinh khí",   bien: [0],');
  ok(hong !== goc, "red-team: không tìm thấy dòng quy tắc Sinh khí để đổi");
  const r = taoCtx(); for (const f of srcs.slice(0, 4)) vm.runInContext(readFileSync(f, "utf8"), r.ctx, { filename: f }); vm.runInContext(hong, r.ctx, { filename: "phong-thuy.hong.js" });
  const sk = r.ctx.PhongThuy.duNien("Càn").find(d => d.ten === "Sinh khí").quai;
  ok(sk !== "Đoài", "red-team: đổi quy tắc biến hào mà bảng Càn vẫn ra Đoài → mốc kiểm không bắt được lỗi");
  ok(readFileSync("phong-thuy.js", "utf8") === goc, "red-team: file gốc phải nguyên vẹn sau khi thử"); }

// 11. HUYỀN KHÔNG NHÀ Ở — mốc tự tính tay (ghi cách tính ngay đây), 24 hướng × 9 vận, thế quái theo ngưỡng, nguồn ca quyết, giao diện, red-team
// Ký hiệu: bay thuận → cung n nhận m9(trung + n − 5); bay nghịch → m9(trung − n + 5). Cung: 1 Khảm Bắc, 9 Ly Nam, 4 Tốn ĐN, 6 Càn TB, 2 Khôn TN, 8 Cấn ĐB, 3 Chấn Đ, 7 Đoài T.
// (a) Vận 8, tọa Tý hướng Ngọ (hướng 180°): vận bàn 8 thuận → cung n = m9(n + 3): Ly(9) = 3, Khảm(1) = 4.
//     Hướng tinh: 3 vào giữa; Ngọ là Thiên nguyên; số 3 là Chấn (Giáp Mão Ất), Thiên nguyên = Mão (âm) → NGHỊCH: cung n = m9(8 − n): Ly(9) = 8, Khảm(1) = 7.
//     Sơn tinh: 4 vào giữa; số 4 là Tốn (Thìn Tốn Tỵ), Thiên nguyên = Tốn (dương) → THUẬN: cung n = m9(n − 1): Khảm(1) = 9, Ly(9) = 8.
//     → Ly (hướng) có sơn 8 – vận 3 – hướng 8, Khảm (tọa) có 9 – 4 – 7: hai sao 8 cùng tụ ở cung hướng = SONG TINH ĐÁO HƯỚNG, KHÔNG phải vượng sơn vượng hướng
//     như đề bài nêu. Lưới đầy đủ (sơn–vận–hướng): ĐN 3-7-4 | N 8-3-8 | TN 1-5-6 / Đ 2-6-5 | giữa 4-8-3 | T 6-1-1 / ĐB 7-2-9 | B 9-4-7 — khớp lưới
//     "八運子山午向 雙星到向" lưu hành [I]. Theo cùng quy tắc, vượng sơn vượng hướng cần cả hai sơn quyết định đều âm; Tốn dương nên không thể.
// (b) Vận 8, tọa Ngọ hướng Tý (0°): đối xứng (a): hướng tinh 4 vào giữa thuận → Khảm 9, Ly 8; sơn tinh 3 nghịch → Ly 8, Khảm 7 → Ly (tọa) 8-3-8 = SONG TINH ĐÁO TỌA.
// (c) Vận 8, tọa Càn hướng Tốn (135°): vận tinh Tốn(4) = 7, Càn(6) = 9. Hướng: 7 là Đoài (Canh Dậu Tân), Thiên = Dậu âm → nghịch: Tốn(4) = m9(7 − 4 + 5) = 8 ✓.
//     Sơn: 9 là Ly (Bính Ngọ Đinh), Thiên = Ngọ âm → nghịch: Càn(6) = m9(9 − 6 + 5) = 8 ✓ → VƯỢNG SƠN VƯỢNG HƯỚNG. Vận 8 có đúng 6 cặp như vậy:
//     Càn–Tốn, Tốn–Càn, Hợi–Tỵ, Tỵ–Hợi, Sửu–Mùi, Mùi–Sửu [I: khớp bảng "八運旺山旺向" lưu hành].
// (d) Vận 8, tọa Sửu hướng Mùi (225° − 15° = 210°): vận tinh Khôn(2) = 5 → 5 vào giữa, lấy sơn Địa nguyên ngay trong cung Khôn = Mùi (âm) → nghịch: Khôn(2) = m9(5 − 2 + 5) = 8 ✓;
//     hướng bàn 5 nghịch = PHẢN NGÂM. Sơn: Cấn(8) = 2, 2 là Khôn, Địa = Mùi âm → nghịch: Cấn(8) = m9(2 − 8 + 5) = 8 ✓ → vượng sơn vượng hướng.
// (e) Vận 9, tọa Tý hướng Ngọ: vận bàn 9 thuận → cung n = m9(n + 4): Ly = 4, Khảm = 5. Hướng: 4 Tốn dương → thuận: m9(n − 1): Ly = 8, Khảm = 9.
//     Sơn: 5 vào giữa → sơn Thiên nguyên trong cung tọa Khảm = Tý (âm) → nghịch: m9(10 − n): Khảm = 9, Ly = 1; sơn bàn 5 nghịch = PHẢN NGÂM.
//     → Khảm (tọa) 9-5-9 = SONG TINH ĐÁO TỌA. Lưới: ĐN 6-8-3 | N 1-4-8 | TN 8-6-1 / Đ 7-7-2 | giữa 5-9-4 | T 3-2-6 / ĐB 2-3-7 | B 9-5-9 | TB 4-1-5.
//     Hệ quả quy tắc: vận 1 và vận 9 không có cặp vượng sơn vượng hướng nào (khớp lời truyền "nhất cửu vận vô vượng sơn vượng hướng" [I]).
// (f) Kiêm hướng: hướng 5° = Tý kiêm Quý 5° (> ngưỡng 3°), vận 8: hướng tinh gốc 4 (Khảm), sơn quyết định Tốn → thế quái Tốn = 6 Vũ Khúc [V áo ngữ 巽辰亥儘是武曲位], dương → 6 vào giữa bay thuận;
//     sơn tinh gốc 3 (Ly), sơn quyết định Mão → thế quái Mão = 2 Cự Môn [I Thẩm thị], âm → 2 vào giữa bay nghịch. Tắt kiêm → về (b). 2,9° → chính hướng.
{ const P9 = o => new Set(Object.values(o)).size === 9 && Object.values(o).every(x => x >= 1 && x <= 9);
  const luoi3 = k => k.luoi.map(h => h.map(c => `${c.sonTinh}${c.vanTinh}${c.huongTinh}`).join(" ")).join(" / ");
  const a = P.huyenKhong(180, 8, { namXet: 2026 });
  ok(a.huong.ten === "Ngọ" && a.toa.ten === "Tý" && !a.kiem.co, "(a) 180° phải là tọa Tý hướng Ngọ chính hướng");
  ok(a.vanBan[9] === 3 && a.vanBan[1] === 4 && a.vanBan[5] === 8, "(a) vận bàn 8: Ly 3, Khảm 4");
  ok(a.huongBan.saoTrung === 3 && a.huongBan.sonQuyetDinh === "Mão" && !a.huongBan.thuan && a.sonBan.saoTrung === 4 && a.sonBan.sonQuyetDinh === "Tốn" && a.sonBan.thuan, "(a) hướng tinh 3 Mão nghịch, sơn tinh 4 Tốn thuận: " + JSON.stringify([a.huongBan.sonQuyetDinh, a.huongBan.thuan, a.sonBan.sonQuyetDinh, a.sonBan.thuan]));
  ok(a.cung[9].huongTinh === 8 && a.cung[9].sonTinh === 8 && a.cung[1].sonTinh === 9 && a.cung[1].huongTinh === 7, "(a) Ly phải 8-3-8, Khảm 9-4-7, ra " + luoi3(a));
  ok(luoi3(a) === "374 838 156 / 265 483 611 / 729 947 592", "(a) lưới vận 8 Tý/Ngọ phải khớp tính tay, ra " + luoi3(a));
  ok(a.cuc.ma === "stdh", "(a) vận 8 tọa Tý hướng Ngọ theo quy tắc phải là song tinh đáo hướng, ra " + a.cuc.ten);
  ok(a.nam && a.nam.nienTinh === 1 && a.nam.nguHoang.so === 9 && a.cung[9].saoNam === 5 && a.cung[9].ghiChu.some(g => /Ngũ Hoàng/.test(g)) && a.cung[6].saoNam === 2, "(a) niên tinh 2026: Ngũ Hoàng Nam, Nhị Hắc Tây Bắc, ghi chú cung");
  ok(a.cung[3].toHop.some(t => t.ten === "Nhị Ngũ") && a.cung[6].toHop.some(t => t.ten === "Nhị Ngũ") && a.cung[2].toHop.some(t => t.ten === "Nhất Lục") && a.cung[1].toHop.some(t => t.ten === "Cửu Thất"), "(a) tổ hợp: Đông 2-5, Tây Bắc 5-2, Tây Nam 1-6, Bắc 9-7");
  ok(a.noiNgan.length >= 5 && a.noiNgan.length <= 9 && a.noiNgan.every(x => !/undefined|NaN|phía Giữa/.test(x)) && a.noiNgan.some(x => /Tiền của: phía Nam/.test(x)) && a.noiNgan.some(x => /Ngũ Hoàng.*phía Nam/.test(x)), "(a) Nói ngắn 5–9 dòng, có tiền của phía Nam, Ngũ Hoàng phía Nam: " + a.noiNgan.join(" | "));
  const b = P.huyenKhong(0, 8); ok(b.cuc.ma === "stdt" && b.cung[9].sonTinh === 8 && b.cung[9].huongTinh === 8 && b.cung[1].huongTinh === 9 && b.cung[1].sonTinh === 7, "(b) vận 8 tọa Ngọ hướng Tý: song tinh đáo tọa, Ly 8-3-8, Khảm 7-4-9, ra " + luoi3(b));
  const c = P.huyenKhong(135, 8); ok(c.cuc.ma === "vsvh" && c.cung[4].huongTinh === 8 && c.cung[6].sonTinh === 8 && c.huongBan.sonQuyetDinh === "Dậu" && c.sonBan.sonQuyetDinh === "Ngọ", "(c) vận 8 tọa Càn hướng Tốn phải vượng sơn vượng hướng, ra " + c.cuc.ten + " " + luoi3(c));
  const d = P.huyenKhong(210, 8); ok(d.huong.ten === "Mùi" && d.huongBan.saoGoc === 5 && d.huongBan.sonQuyetDinh === "Mùi" && !d.huongBan.thuan && d.ngam.huong === "phản ngâm" && d.cuc.ma === "vsvh" && d.cung[2].huongTinh === 8 && d.cung[8].sonTinh === 8, "(d) vận 8 Sửu/Mùi: 5 vào giữa theo Mùi âm nghịch, phản ngâm, vượng sơn vượng hướng, ra " + d.cuc.ten + " " + luoi3(d));
  const e = P.huyenKhong(180, 9, { namXet: 2026 }); ok(e.vanBan[9] === 4 && e.vanBan[1] === 5 && e.sonBan.saoTrung === 5 && e.sonBan.sonQuyetDinh === "Tý" && !e.sonBan.thuan && e.huongBan.thuan && e.ngam.son === "phản ngâm" && e.cuc.ma === "stdt", "(e) vận 9 Tý/Ngọ: sơn 5 Tý nghịch phản ngâm, hướng 4 thuận, song tinh đáo tọa, ra " + e.cuc.ten);
  ok(luoi3(e) === "683 148 861 / 772 594 326 / 237 959 415", "(e) lưới vận 9 Tý/Ngọ phải khớp tính tay, ra " + luoi3(e));
  console.log("  Lưới (sơn–vận–hướng, Nam ở trên) vận 8 Tý/Ngọ: " + luoi3(a) + " → " + a.cuc.ten + "\n  vận 8 Ngọ/Tý: " + luoi3(b) + " → " + b.cuc.ten + "\n  vận 9 Tý/Ngọ: " + luoi3(e) + " → " + e.cuc.ten + "\n  vận 8 Càn/Tốn: " + luoi3(c) + " → " + c.cuc.ten);
  // vận 8 đúng 6 cặp vượng sơn vượng hướng; vận 1, 9 không có; mỗi vận chính hướng luôn ra một trong bốn cục
  const vsvh = V => P.SON24.map((t, i) => P.huyenKhong(i * 15, V)).filter(k => k.cuc.ma === "vsvh").map(k => `${k.toa.ten}-${k.huong.ten}`).sort().join(",");
  ok(vsvh(8) === ["Càn-Tốn", "Tốn-Càn", "Hợi-Tỵ", "Tỵ-Hợi", "Sửu-Mùi", "Mùi-Sửu"].sort().join(","), "vận 8 phải có đúng 6 cặp vượng sơn vượng hướng Càn/Tốn, Hợi/Tỵ, Sửu/Mùi, ra " + vsvh(8));
  ok(vsvh(9) === "" && vsvh(1) === "", "vận 1 và 9 không được có vượng sơn vượng hướng, ra " + vsvh(9) + " / " + vsvh(1));
  // 24 hướng × 9 vận × (chính hướng, kiêm 5°, kiêm −5°): không ném lỗi, ba bàn đủ 9 số 1–9, cục hợp lệ, không undefined trong lời
  { let loi = 0, dem = { vsvh: 0, tsht: 0, stdh: 0, stdt: 0, khac: 0 };
    for (let V = 1; V <= 9; V++) for (let i = 0; i < 24; i++) for (const lech of [0, 5, -5]) { try { const k = P.huyenKhong(i * 15 + lech, V, { namXet: 2000 + V });
      if (!P9(k.vanBan) || !P9(k.sonBan.ban) || !P9(k.huongBan.ban) || !P9(k.nam.ban) || !k.cuc.ten || k.luoi.flat().length !== 9 || k.luoi.flat().some(c => !c.quai || !c.khiSon || !c.khiHuong || c.sonTinh < 1 || c.huongTinh > 9) || k.noiNgan.some(x => /undefined|NaN/.test(x))) loi++;
      if (lech === 0) { dem[k.cuc.ma]++; if (k.kiem.co || k.cuc.ma === "khac") loi++; } else if (!k.kiem.co || !k.kiem.apDung) loi++; } catch (er) { loi++; if (loi < 3) console.log("  lỗi", V, i * 15 + lech, er.message); } }
    ok(loi === 0, `24 hướng × 9 vận × 3 độ lệch: ${loi} trường hợp lỗi`); ok(dem.vsvh === 48 && dem.tsht === 48 && dem.stdh === 60 && dem.stdt === 60, "216 chính hướng: 48 vượng sơn vượng hướng, 48 thượng sơn hạ thủy, 60 + 60 song tinh (vận 5 chỉ có hai cục đầu, vận 1 và 9 chỉ có hai cục sau), ra " + JSON.stringify(dem)); }
  // (f) Kiêm hướng và ngưỡng CONFIG
  const f = P.huyenKhong(5, 8); ok(f.kiem.co && f.kiem.apDung && f.kiem.sonKiem === "Quý" && f.kiem.lech === 5 && f.huongBan.saoGoc === 4 && f.huongBan.saoTrung === 6 && f.huongBan.theQuai.son === "Tốn" && f.huongBan.theQuai.nhan === "V" && f.huongBan.thuan && f.sonBan.saoGoc === 3 && f.sonBan.saoTrung === 2 && f.sonBan.theQuai.son === "Mão" && !f.sonBan.thuan, "(f) Tý kiêm Quý 5° vận 8: hướng 4→6 Vũ Khúc thuận, sơn 3→2 Cự Môn nghịch, ra " + JSON.stringify([f.huongBan.saoTrung, f.sonBan.saoTrung, f.huongBan.theQuai, f.sonBan.theQuai]));
  ok(f.cung[1].huongTinh === 2 && f.cung[9].sonTinh === 7, "(f) sau thế quái: Khảm hướng tinh m9(6+1−5)=2, Ly sơn tinh m9(2−9+5)=7");
  const f2 = P.huyenKhong(5, 8, { kiem: false }); ok(f2.kiem.co && !f2.kiem.apDung && f2.kiem.tat && f2.huongBan.saoTrung === 4 && f2.sonBan.saoTrung === 3 && f2.cuc.ma === "stdt" && f2.noiNgan.some(x => /tắt kiêm/.test(x)), "(f) tắt kiêm phải về như (b)");
  const f3 = P.huyenKhong(2.9, 8), f4 = P.huyenKhong(3.1, 8), f5 = P.huyenKhong(355, 8); ok(!f3.kiem.co && f4.kiem.co && f5.kiem.co && f5.kiem.sonKiem === "Nhâm" && f5.kiem.lech === -5, "ngưỡng kiêm 3°: 2,9° chính hướng, 3,1° kiêm, 355° = Tý kiêm Nhâm −5°");
  ok(P.huyenKhong(3.1, 8, { nguongKiem: 4 }).kiem.co === false && P.HK_CONFIG.nguongKiem === 3, "ngưỡng kiêm lấy từ CONFIG và ghi đè được qua tuyChon");
  // thế quái trùng sao gốc thì không thay: vận 5 hướng Tý (180°+... hướng Tý = 0°): vận tinh Khảm = 1, sơn Tý thế quái 1 → không thay
  const g = P.huyenKhong(5, 5); ok(g.huongBan.saoGoc === 1 && g.huongBan.theQuai && g.huongBan.theQuai.sao === 1 && !g.huongBan.theQuai.thay && g.huongBan.saoTrung === 1, "thế quái bằng sao gốc (Tý → 1) thì không thay");
  // Bảng thế quái: đủ 24 sơn, số ∈ {1,2,6,7,9}, 12 sơn [V] dò được trong đúng nhóm của Thanh nang áo ngữ đã tải
  const TQ = ctx.PT_THE_QUAI; ok(TQ && Object.keys(TQ.bang).length === 24 && P.SON24.every(t => TQ.bang[t] && [1, 2, 6, 7, 9].includes(TQ.bang[t].sao)), "data/the-quai.js phải đủ 24 sơn, sao ∈ {1,2,6,7,9}");
  ok(Object.values(TQ.bang).filter(x => x.nhan === "V").length === 12, "đúng 12 sơn nhãn V");
  if (existsSync("nguon/thanh-nang-ao-ngu.txt")) { const t = readFileSync("nguon/thanh-nang-ao-ngu.txt", "utf8").replace(/[\s，,。；:：]/g, "");
    const nhom = { 2: /坤壬乙巨門/, 7: /艮丙辛位位是破/, 6: /巽辰亥儘是武曲/, 1: /甲癸申貪狼/ }, zhCua = ten => P.SON24.indexOf(ten) >= 0 ? "子癸丑艮寅甲卯乙辰巽巳丙午丁未坤申庚酉辛戌乾亥壬"[P.SON24.indexOf(ten)] : "?";
    for (const [sao, re] of Object.entries(nhom)) { const m = re.exec(t); ok(m, "Thanh nang áo ngữ thiếu câu " + re);
      if (m) { const chu = m[0].slice(0, 3); for (const ten of P.SON24.filter(x => TQ.bang[x].nhan === "V" && TQ.bang[x].sao === +sao)) ok(chu.includes(zhCua(ten)), `sơn ${ten} [V] sao ${sao} phải nằm trong "${chu}"`); } }
    ok(P.SON24.filter(x => TQ.bang[x].nhan === "V").every(ten => Object.values(nhom).some(re => re.exec(t) && re.exec(t)[0].slice(0, 3).includes(zhCua(ten)))), "mọi sơn [V] phải có mặt trong ca quyết"); }
  else errs.push("thiếu nguon/thanh-nang-ao-ngu.txt (tải từ https://zh.wikisource.org/wiki/青囊奧語 theo cách của tools/tai-nguon.mjs)");
  // Giao diện giả lập
  run("$('#hkDo').value='180';$('#hkNgayNhap').value='2010-06-01';$('#hkNgayXet').value='2026-06-01';$('#hkKiem').checked=true;lapHuyenKhong()");
  const H = els.kqHuyenKhong.innerHTML;
  ok(H.includes("Song tinh đáo hướng") && H.includes("Nói ngắn") && (H.match(/class="o /g) || []).length === 9 && H.includes("HƯỚNG") && H.includes("TỌA") && H.includes("năm 2026: 5") && !/undefined|NaN/.test(H), "trang Huyền không lỗi");
  ok(JSON.parse(kho.pt_hk).deg === 180 && JSON.parse(kho.pt_hk).nhap === "2010-06-01", "localStorage phải nhớ đầu vào Huyền không");
  run("$('#hkDo').value='5';$('#hkKiem').checked=true;lapHuyenKhong()"); ok(els.kqHuyenKhong.innerHTML.includes("kiêm Quý") && els.kqHuyenKhong.innerHTML.includes("thế quái Tốn → 6") && !/undefined|NaN/.test(els.kqHuyenKhong.innerHTML), "trang Huyền không kiêm hướng lỗi");
  run("$('#hkDo').value='5';$('#hkKiem').checked=false;lapHuyenKhong()"); ok(els.kqHuyenKhong.innerHTML.includes("đang tắt kiêm hướng") && els.kqHuyenKhong.innerHTML.includes("Song tinh đáo tọa"), "tắt kiêm trên giao diện");
  run("$('#hkDo').value='abc';$('#hkNgayNhap').value='';lapHuyenKhong()"); ok(els.kqHuyenKhong.innerHTML.includes("hướng <b>Tý</b>") && !/undefined|NaN/.test(els.kqHuyenKhong.innerHTML), "số rác về 0°, thiếu ngày nhập trạch lấy hôm nay");
  ok(els.cachHtml.innerHTML.includes("Huyền không phi tinh nhà ở") && els.cachHtml.innerHTML.includes("Thanh nang áo ngữ") && els.cachHtml.innerHTML.includes("nhiều phái"), "trang cách tính phải có phần Huyền không, nguồn áo ngữ, câu nhắc nhiều phái");
  // Red-team: đổi chiều bay (dương → nghịch) trong bản sao → lưới (a) phải khác và mốc bắt được; file gốc nguyên vẹn
  { const goc = readFileSync("phong-thuy.js", "utf8"), hong = goc.replace("sonQD = sonCungNguyen(cungSon, nguyen), thuan = DUONG_SON.includes(sonQD);", "sonQD = sonCungNguyen(cungSon, nguyen), thuan = !DUONG_SON.includes(sonQD);");
    ok(hong !== goc, "red-team HK: không tìm thấy dòng quy tắc chiều bay để đổi");
    const r = taoCtx(); for (const f of srcs.slice(0, 6)) vm.runInContext(readFileSync(f, "utf8"), r.ctx, { filename: f }); vm.runInContext(hong, r.ctx, { filename: "phong-thuy.hong.js" });
    const ra = r.ctx.PhongThuy.huyenKhong(180, 8);
    ok(!(ra.cung[9].huongTinh === 8 && ra.cung[9].sonTinh === 8) && ra.cuc.ma !== "stdh", "red-team HK: đổi chiều bay mà vận 8 Tý/Ngọ vẫn ra Ly 8-8 → mốc không bắt được lỗi");
    ok(readFileSync("phong-thuy.js", "utf8") === goc, "red-team HK: file gốc phải nguyên vẹn"); } }

console.log(`Phong thủy: ${errs.length ? "LỖI " + errs.length : "đạt"} (11 nhóm kiểm: du niên Càn/Khảm + 8 mệnh, quái mệnh 1900–2100, Lập xuân, hạng mục, phi tinh 2024–2026, 24 sơn 3600 mốc, nguồn, giao diện, red-team, Huyền không nhà ở: 6 mốc tính tay + 24×9×3 + thế quái + nguồn áo ngữ + giao diện + red-team chiều bay)`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
