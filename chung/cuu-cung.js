// Lõi dùng chung — Cửu cung: Tam nguyên cửu vận, niên tinh, nguyệt tinh.
// Quy ước (đã dùng trong Kinh Dịch, chương N6): năm tính từ Lập xuân; vận 20 năm; Thượng nguyên vận 1 bắt đầu 1864.
// Mốc đã kiểm: 1984 vận 7 sao 7; 2024 vận 9 sao 3; 2026 sao 1; 2044 vận 1 sao 1.
"use strict";
const SAO = ["","Nhất Bạch (Thủy)","Nhị Hắc (Thổ)","Tam Bích (Mộc)","Tứ Lục (Mộc)","Ngũ Hoàng (Thổ)","Lục Bạch (Kim)","Thất Xích (Kim)","Bát Bạch (Thổ)","Cửu Tử (Hỏa)"];
const VAN_QUE = ["","Khảm ☵ (29)","Khôn ☷ (2)","Chấn ☳ (51)","Tốn ☴ (57)","trung cung – không quái","Càn ☰ (1)","Đoài ☱ (58)","Cấn ☶ (52)","Ly ☲ (30)"];

const CuuCung = (() => {
  const GOC_VAN = 1864;             // Thượng nguyên, vận 1, năm Giáp Tý
  const m9 = n => { const r = ((n % 9) + 9) % 9; return r === 0 ? 9 : r; };
  // Vận 20 năm trong chu kỳ 180 năm
  function van(y) {
    const r = ((y - GOC_VAN) % 180 + 180) % 180, v = Math.floor(r / 20) + 1, tu = y - (r % 20);
    return { van: v, nguyen: ["Thượng","Trung","Hạ"][Math.floor((v - 1) / 3)], tu, den: tu + 19, que: VAN_QUE[v] };
  }
  // Niên tinh nhập trung cung: 1864 là Nhất Bạch, mỗi năm lùi một sao
  const nienTinh = y => m9(1 - (y - GOC_VAN));
  // Nguyệt tinh nhập trung cung theo chi năm và chi tháng tiết khí (2 = Dần): năm Tý Ngọ Mão Dậu tháng Dần là 8,
  // Thìn Tuất Sửu Mùi là 5, Dần Thân Tỵ Hợi là 2; mỗi tháng lùi một sao. [I] quy ước phổ biến, chưa đối chiếu sách gốc.
  function nguyetTinh(chiNam, chiThang) {
    const khoi = [8, 5, 2][chiNam % 3];
    return m9(khoi - ((chiThang - 2 + 12) % 12));
  }
  return { van, nienTinh, nguyetTinh };
})();
if (typeof window !== "undefined") Object.assign(window, { SAO, VAN_QUE, CuuCung });
