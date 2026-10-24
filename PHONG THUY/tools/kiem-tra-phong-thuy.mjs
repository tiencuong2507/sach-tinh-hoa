// Kiểm công cụ phong thủy: node tools/kiem-tra-phong-thuy.mjs (chạy trong thư mục PHONG THUY)
// Nạp lõi chung + phong-thuy.js + app.js đúng theo <script src> trong phong-thuy.html; đối chiếu mốc đã biết; dựng giao diện giả lập; red-team quy tắc biến hào. Lỗi → exit 1.
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
const errs = [], ok = (c, m) => { if (!c) errs.push(m); };
const html = readFileSync("phong-thuy.html", "utf8"), srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
ok(srcs.length === 6 && srcs[4] === "phong-thuy.js" && srcs[5] === "app.js", "phong-thuy.html phải nạp 4 file chung + phong-thuy.js + app.js, thấy: " + srcs.join(", "));

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

console.log(`Phong thủy: ${errs.length ? "LỖI " + errs.length : "đạt"} (10 nhóm kiểm: du niên Càn/Khảm + 8 mệnh, quái mệnh 1900–2100, Lập xuân, hạng mục, phi tinh 2024–2026, 24 sơn 3600 mốc, nguồn, giao diện, red-team)`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
