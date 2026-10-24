// Kiểm công cụ xem ngày: node tools/kiem-tra-xem-ngay.mjs (chạy trong thư mục XEM NGAY)
// Nạp lõi chung + xem-ngay.js như trình duyệt; đối chiếu mốc đã biết; dò các câu quy tắc trong nguyên văn Hiệp kỷ đã tải; dựng giao diện giả lập.
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
const els = {}, mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: false, dataset: {}, classList: { toggle() {}, contains() { return false; } }, onclick: null, onchange: null });
const ctx = { document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: () => [] }, console };
ctx.window = ctx; vm.createContext(ctx);
const html = readFileSync("xem-ngay.html", "utf8");
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(readFileSync(m[1], "utf8"), ctx, { filename: m[1] });
const { XemNgay, LichAm, CanChi, CHI } = ctx, errs = [], ok = (c, m) => { if (!c) errs.push(m); };
const run = s => vm.runInContext(s, ctx);
const N = (d, m, y, h = 12) => XemNgay.ngay(new Date(y, m - 1, d, h));

// 1. Mốc 1/1/2025 (hai trang lịch độc lập): ngày Canh Ngọ, sao Sâm, trực Phá theo tiết (tháng Tý), giờ hoàng đạo Tý Sửu Mão Ngọ Thân Dậu
{ const r = N(1, 1, 2025);
  ok(r.ngayCanChi === "Canh Ngọ", "1/1/2025 phải là Canh Ngọ, ra " + r.ngayCanChi);
  ok(r.sao && r.sao.ten === "Sâm" && r.sao.thu === "Thứ tư", "1/1/2025 sao Sâm thứ tư, ra " + JSON.stringify(r.sao));
  ok(r.truc === "Phá" && CHI[r.chiThangTiet] === "Tý", `1/1/2025 trực Phá tháng Tý, ra ${r.truc} tháng ${CHI[r.chiThangTiet]}`);
  ok(r.gioHD.filter(g => g.hoangDao).map(g => CHI[g.chi]).join() === "Tý,Sửu,Mão,Ngọ,Thân,Dậu", "giờ hoàng đạo ngày Ngọ sai: " + r.gioHD.filter(g => g.hoangDao).map(g => CHI[g.chi]).join());
  XemNgay.CAU_HINH.thangTheoTiet = false; const r2 = N(1, 1, 2025); ok(r2.truc === "Chấp", "theo tháng âm (Sửu) 1/1/2025 phải là Chấp, ra " + r2.truc); XemNgay.CAU_HINH.thangTheoTiet = true; }
// 2. Trực: ngày có chi trùng chi tháng là Kiến; thứ tự 12 trực; chu kỳ 28 sao đúng thứ trong tuần cho 60 ngày liên tiếp
ok(XemNgay.truc(2, 2) === "Kiến" && XemNgay.truc(3, 2) === "Trừ" && XemNgay.truc(1, 2) === "Bế" && XemNgay.truc(8, 2) === "Phá", "thứ tự trực");
{ const thu = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"]; let sai = 0;
  for (let i = 0; i < 60; i++) { const d = new Date(2026, 0, 1 + i), r = N(d.getDate(), d.getMonth() + 1, d.getFullYear()); if (r.sao.thu !== thu[d.getDay()]) sai++; }
  ok(sai === 0, `28 sao lệch thứ trong tuần ${sai}/60 ngày`); }
// 3. Thần hoàng đạo: tháng Dần ngày Tý Thanh Long, ngày Sửu Minh Đường, ngày Dần Thiên Hình; tháng Mão ngày Dần Thanh Long; mỗi tháng đúng 6 ngày chi hoàng đạo
ok(XemNgay.thanNgay(2, 0).ten === "Thanh Long" && XemNgay.thanNgay(2, 1).ten === "Minh Đường" && XemNgay.thanNgay(2, 2).ten === "Thiên Hình" && XemNgay.thanNgay(3, 2).ten === "Thanh Long" && XemNgay.thanNgay(0, 8).ten === "Thanh Long", "khởi Thanh Long");
for (let t = 0; t < 12; t++) ok([...Array(12).keys()].filter(c => XemNgay.thanNgay(t, c).hoangDao).length === 6, "tháng " + CHI[t] + " không đủ 6 chi hoàng đạo");
// 4. Tiểu lục nhâm: tháng 1 ngày 1 giờ Tý Đại An; tháng 1 ngày 1 giờ Sửu Lưu Liên; tháng 2 ngày 3 giờ Dần → (1+2+2)=5 Không Vong
ok(XemNgay.lucNham(1, 1, 0).ten === "Đại An" && XemNgay.lucNham(1, 1, 1).ten === "Lưu Liên" && XemNgay.lucNham(2, 3, 2).ten === "Không Vong", "tiểu lục nhâm");
// 5. Ngày kỵ theo âm lịch: 13 tháng Giêng Dương công; mùng 3 Tam nương; mùng 5 Nguyệt kỵ (Tết Bính Ngọ 17/2/2026 là mùng 1)
{ const r13 = N(1, 3, 2026), r3 = N(19, 2, 2026), r5 = N(21, 2, 2026);
  ok(r13.am.ngay === 13 && r13.ky.includes("Dương công kỵ nhật"), "13/1 âm phải là Dương công, ra " + r13.am.ngay + " " + r13.ky);
  ok(r3.am.ngay === 3 && r3.ky.includes("Tam nương"), "mùng 3 Tam nương"); ok(r5.am.ngay === 5 && r5.ky.includes("Nguyệt kỵ"), "mùng 5 Nguyệt kỵ"); }
// 6. Thiên đức, Nguyệt đức: tháng Dần ngày can Đinh; tháng Mão ngày chi Thân; Nguyệt đức tháng Dần can Bính, tháng Tý can Nhâm
ok(XemNgay.thienDuc(2, 3, 0) && !XemNgay.thienDuc(2, 2, 0) && XemNgay.thienDuc(3, 0, 8) && XemNgay.nguyetDuc(2, 2) && XemNgay.nguyetDuc(0, 8) && XemNgay.nguyetDuc(1, 6) && XemNgay.nguyetDuc(3, 0), "Thiên đức, Nguyệt đức");
// 7. Nguyệt phá: tháng Dần ngày Thân
{ const r = XemNgay.ngay(new Date(2026, 1, 20, 12)); ok(CHI[r.chiThangTiet] === "Dần", "20/2/2026 phải tháng Dần");
  let co = false; for (let d = 4; d <= 28; d++) { const x = XemNgay.ngay(new Date(2026, 1, d, 12)); if (x.idxNgay % 12 === 8) co = x.ky.includes("Nguyệt phá"); } ok(co, "ngày Thân tháng Dần phải là Nguyệt phá"); }
// 8. Giờ Tý sau 23h sang ngày mới; với tuổi: ngày Ngọ xung tuổi Tý (1984), thiên khắc địa xung Canh Ngọ với Giáp Tý? (Canh Kim khắc Giáp Mộc, Ngọ xung Tý) → có
{ const a = XemNgay.ngay(new Date(2025, 0, 1, 23, 30)), b = XemNgay.ngay(new Date(2025, 0, 2, 1, 0)); ok(a.ngayCanChi === b.ngayCanChi && a.ngayCanChi === "Tân Mùi", "23h30 ngày 1/1/2025 phải tính là ngày Tân Mùi, ra " + a.ngayCanChi);
  const t = XemNgay.ngay(new Date(2025, 0, 1, 12), 1984).tuoi; ok(t.xung && t.khacCan && t.tuoi === "Giáp Tý", "Canh Ngọ với tuổi Giáp Tý phải thiên khắc địa xung: " + JSON.stringify(t)); }
// 9. Câu quy tắc dẫn trong mã phải có trong nguyên văn Hiệp kỷ quyển 4 đã tải
{ const bo = s => s.replace(/\{\{[^}]*\}\}/g, "").replace(/[\s，。；：！？、○]/g, "");
  if (existsSync("nguon/hiep-ky-q04.txt")) { const q4 = bo(readFileSync("nguon/hiep-ky-q04.txt", "utf8"));
    for (const c of ["每月交節則疊兩值日其法從月建上起建", "建滿平收黑除危定執黄成開皆可用閉破不相當"]) ok(q4.includes(c), "không thấy trong Hiệp kỷ Q4: " + c); }
  else errs.push("thiếu nguon/hiep-ky-q04.txt (chạy node tools/tai-hiep-ky.mjs 4)"); }
// 10. Giao diện giả lập: trang ngày, bảng tháng, trang cách tính không có undefined/NaN; 400 ngày liên tiếp không lỗi
run("$('#dt').value='2026-02-17T09:30';$('#ns').value='1986';xem()"); ok(els.kq.innerHTML.includes("Bính Ngọ") && !/undefined|NaN/.test(els.kq.innerHTML), "trang ngày lỗi");
run("$('#tM').value='2';$('#tY').value='2026';$('#tNs').value='1990';bangThang()"); ok(els.kqThang.innerHTML.split("<tr").length === 30 && !/undefined|NaN/.test(els.kqThang.innerHTML), "bảng tháng 2/2026 phải 28 dòng");
ok(!/undefined|NaN/.test(els.cachHtml.innerHTML), "trang cách tính lỗi");
{ let loi = 0; for (let i = 0; i < 400; i++) { try { const r = XemNgay.ngay(new Date(2025, 0, 1 + i, 12), 1975); if (!r.truc || !r.than || !r.sao || r.diem !== r.diem) loi++; } catch (e) { loi++; } } ok(loi === 0, "400 ngày liên tiếp có " + loi + " ngày lỗi"); }

console.log(`Xem ngày: ${errs.length ? "LỖI " + errs.length : "đạt"} (10 nhóm kiểm, 400 ngày)`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
