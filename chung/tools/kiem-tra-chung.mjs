// Kiểm lõi dùng chung bằng mốc đã biết: node chung/tools/kiem-tra-chung.mjs (chạy từ thư mục gốc kho)
// Nạp 4 file chung/*.js như trình duyệt; mỗi mốc ghi nguồn ở chú thích. Thất bại → exit 1.
import { readFileSync } from "node:fs";
import vm from "node:vm";
const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["lich", "can-chi", "ngu-hanh", "cuu-cung"]) vm.runInContext(readFileSync(`chung/${f}.js`, "utf8"), ctx, { filename: f });
const { LichAm, CanChi, NguHanh, CuuCung, CAN, CHI } = ctx;
const errs = [], ok = (cond, msg) => { if (!cond) errs.push(msg); };
const jd = (d, m, y) => LichAm.jdFromDate(d, m, y);

// 1. Âm lịch: mùng 1 Tết và tháng nhuận đã công bố (lịch Việt Nam, múi giờ +7)
for (const [[d, m, y], exp] of [
  [[22, 1, 2023], [1, 1, 2023, 0]], [[10, 2, 2024], [1, 1, 2024, 0]], [[29, 1, 2025], [1, 1, 2025, 0]],
  [[17, 2, 2026], [1, 1, 2026, 0]], [[6, 2, 2027], [1, 1, 2027, 0]], [[16, 2, 2026], [29, 12, 2025, 0]],
  [[22, 3, 2023], [1, 2, 2023, 1]], [[25, 7, 2025], [1, 6, 2025, 1]], [[6, 10, 2025], [15, 8, 2025, 0]], [[5, 2, 2000], [1, 1, 2000, 0]]]) {
  const r = LichAm.solar2lunar(d, m, y), got = [r.ngay, r.thang, r.nam, r.nhuan];
  ok(got.join() === exp.join(), `Âm lịch ${d}/${m}/${y}: ra ${got.join("/")} mong ${exp.join("/")}`);
}
// 2. Ngày Julius khứ hồi và mốc: 1/1/2000 = JD 2451545
ok(jd(1, 1, 2000) === 2451545, "JD 1/1/2000 phải là 2451545");
for (const [d, m, y] of [[1, 1, 1900], [29, 2, 2024], [31, 12, 2199]]) ok(LichAm.jdToDate(jd(d, m, y)).join() === [d, m, y].join(), `JD khứ hồi ${d}/${m}/${y}`);
// 3. Can chi năm (năm 4, 1984, 2044 Giáp Tý; 2026 Bính Ngọ; 1975 Ất Mão)
for (const [y, t] of [[1984, "Giáp Tý"], [2044, "Giáp Tý"], [2026, "Bính Ngọ"], [1975, "Ất Mão"], [2000, "Canh Thìn"], [1945, "Ất Dậu"]]) ok(CanChi.ten(CanChi.nam(y)) === t, `Năm ${y} ra ${CanChi.ten(CanChi.nam(y))} mong ${t}`);
// 4. Can chi ngày: 1/1/1900 Giáp Tuất (mốc kinh điển của thuật toán Hồ Ngọc Đức), 1/1/2000 Mậu Ngọ, và hai ngày kề để kiểm bước nhảy
for (const [d, m, y, t] of [[1, 1, 1900, "Giáp Tuất"], [1, 1, 2000, "Mậu Ngọ"], [31, 12, 1999, "Đinh Tỵ"], [2, 1, 2000, "Kỷ Mùi"]]) ok(CanChi.ten(CanChi.ngay(jd(d, m, y))) === t, `Ngày ${d}/${m}/${y} ra ${CanChi.ten(CanChi.ngay(jd(d, m, y)))} mong ${t}`);
// 5. Ngũ hổ độn: năm Giáp tháng Dần là Bính Dần, tháng Tý là Bính Tý; năm Ất tháng Dần là Mậu Dần; năm Mậu tháng Dần là Giáp Dần
for (const [cn, ct, t] of [[0, 2, "Bính Dần"], [0, 0, "Bính Tý"], [0, 1, "Đinh Sửu"], [1, 2, "Mậu Dần"], [4, 2, "Giáp Dần"], [9, 2, "Giáp Dần"]]) ok(CanChi.ten(CanChi.thang(cn, ct)) === t, `Tháng can năm ${CAN[cn]} chi ${CHI[ct]} ra ${CanChi.ten(CanChi.thang(cn, ct))} mong ${t}`);
// 6. Ngũ thử độn: ngày Giáp giờ Tý Giáp Tý, ngày Ất giờ Tý Bính Tý, ngày Mậu giờ Ngọ Mậu Ngọ
for (const [cn, cg, t] of [[0, 0, "Giáp Tý"], [1, 0, "Bính Tý"], [4, 6, "Mậu Ngọ"], [9, 11, "Quý Hợi"]]) ok(CanChi.ten(CanChi.gio(cn, cg)) === t, `Giờ ngày ${CAN[cn]} chi ${CHI[cg]} ra ${CanChi.ten(CanChi.gio(cn, cg))} mong ${t}`);
// 7. Chi giờ theo đồng hồ: 23h, 0h Tý; 1h Sửu; 12h Ngọ; 22h Hợi
for (const [h, c] of [[23, 0], [0, 0], [1, 1], [2, 1], [3, 2], [12, 6], [22, 11]]) ok(CanChi.chiGioTuGio(h) === c, `${h}h phải là giờ ${CHI[c]}`);
// 8. Tuần không (Tăng san bốc dịch chương 26): Giáp Tý tuần Tuất Hợi; Giáp Tuất tuần Thân Dậu; Giáp Dần tuần Tý Sửu
for (const [idx, t] of [[0, "Tuất,Hợi"], [10, "Thân,Dậu"], [50, "Tý,Sửu"], [59, "Tý,Sửu"]]) ok(CanChi.tuanKhong(idx).map(i => CHI[i]).join() === t, `Tuần không idx ${idx} ra ${CanChi.tuanKhong(idx).map(i => CHI[i]).join()} mong ${t}`);
// 9. Nạp âm: 1984 Hải Trung Kim; 2026 Thiên Hà Thủy; 2024 Phú Đăng Hỏa; Quý Hợi Đại Hải Thủy
for (const [y, t] of [[1984, "Hải Trung Kim"], [2026, "Thiên Hà Thủy"], [2024, "Phú Đăng Hỏa"], [2043, "Đại Hải Thủy"]]) ok(CanChi.napAm(CanChi.nam(y)) === t, `Nạp âm ${y} ra ${CanChi.napAm(CanChi.nam(y))} mong ${t}`);
// 10. Xung hợp: Tý Ngọ xung, Tý Sửu hợp, Dần Hợi hợp, Thân Tý Thìn tam hợp, Tý Mùi hại
ok(CanChi.xung(0, 6) && !CanChi.xung(0, 5), "lục xung"); ok(CanChi.hop(0, 1) && CanChi.hop(2, 11) && !CanChi.hop(0, 2), "lục hợp");
ok(CanChi.tamHop(8, 0) && CanChi.tamHop(4, 0) && !CanChi.tamHop(0, 1), "tam hợp"); ok(CanChi.hai(0, 7) && CanChi.hai(1, 6), "lục hại");
// 11. Tiết khí: tháng Dần từ Lập xuân (3–5/2). 3/2/2026 12h còn tháng Sửu, 4/2/2026 12h đã sang Dần; 1/2 Sửu; 10/4 Thìn; 10/8 Thân; 25/12/2025 Tý
for (const [d, m, y, h, c] of [[3, 2, 2026, 12, 1], [4, 2, 2026, 12, 2], [1, 2, 2026, 12, 1], [10, 4, 2026, 12, 4], [10, 8, 2026, 12, 8], [25, 12, 2025, 12, 0], [21, 6, 2026, 12, 6]])
  ok(LichAm.chiThangTiet(d, m, y, h) === c, `Tháng tiết ${d}/${m}/${y} ${h}h ra ${CHI[LichAm.chiThangTiet(d, m, y, h)]} mong ${CHI[c]}`);
// 12. Ngũ hành
ok(NguHanh.quanHe("Mộc", "Thủy") === "sinh" && NguHanh.quanHe("Mộc", "Hỏa") === "được sinh" && NguHanh.quanHe("Mộc", "Kim") === "khắc" && NguHanh.quanHe("Mộc", "Thổ") === "bị khắc" && NguHanh.quanHe("Mộc", "Mộc") === "đồng", "quan hệ ngũ hành");
ok(NguHanh.vuongSuy("Mộc", "Mộc") === "vượng" && NguHanh.vuongSuy("Hỏa", "Mộc") === "tướng" && NguHanh.vuongSuy("Thủy", "Mộc") === "hưu" && NguHanh.vuongSuy("Kim", "Mộc") === "tù" && NguHanh.vuongSuy("Thổ", "Mộc") === "tử", "vượng suy");
ok(NguHanh.sinhBoi("Mộc") === "Thủy" && NguHanh.biKhacBoi("Mộc") === "Kim", "sinh bởi, bị khắc bởi");
// 13. Cửu cung: 1984 vận 7 sao 7; 2000 vận 7 sao 9; 2004 vận 8 sao 5; 2024 vận 9 sao 3; 2026 sao 1; 2044 vận 1 sao 1
for (const [y, v, s] of [[1984, 7, 7], [2000, 7, 9], [2004, 8, 5], [2024, 9, 3], [2026, 9, 1], [2027, 9, 9], [2044, 1, 1]]) ok(CuuCung.van(y).van === v && CuuCung.nienTinh(y) === s, `Năm ${y}: vận ${CuuCung.van(y).van} sao ${CuuCung.nienTinh(y)} mong vận ${v} sao ${s}`);
ok(CuuCung.van(2024).tu === 2024 && CuuCung.van(2024).den === 2043 && CuuCung.van(2024).nguyen === "Hạ", "vận 9: 2024–2043 Hạ nguyên");
// Nguyệt tinh: năm Tý tháng Dần 8, tháng Mão 7; năm Thìn tháng Dần 5; năm Dần tháng Dần 2, tháng Sửu (tháng cuối) 2-11 → 9+... = 9? kiểm công thức lùi 11 bước từ 2: 2-11 = -9 → 9
ok(CuuCung.nguyetTinh(0, 2) === 8 && CuuCung.nguyetTinh(0, 3) === 7 && CuuCung.nguyetTinh(4, 2) === 5 && CuuCung.nguyetTinh(2, 2) === 2 && CuuCung.nguyetTinh(2, 1) === 9, "nguyệt tinh");

console.log(`Lõi chung: ${errs.length ? "LỖI " + errs.length : "đạt"} (13 nhóm mốc)`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
