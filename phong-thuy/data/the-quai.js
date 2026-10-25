// Huyền không phi tinh — bảng THẾ QUÁI (替卦, "thay sao") cho 24 sơn, chỉ dùng khi nhà KIÊM HƯỚNG (số đo lệch khỏi tâm sơn quá ngưỡng CONFIG).
// Cách dùng (phong-thuy.js, huyenKhong): khi sao nhập trung cung cho sơn bàn / hướng bàn được quyết định bởi một sơn S,
// thì thay sao đó bằng số ở bang[S].sao (nếu bằng sao gốc thì không thay — "vô thế"); chiều bay vẫn theo âm dương của sơn S.
// Số sao: Tham Lang 1 · Cự Môn 2 · Lộc Tồn 3 · Văn Khúc 4 · Liêm Trinh 5 · Vũ Khúc 6 · Phá Quân 7 · Tả Phụ 8 · Hữu Bật 9 (cách gọi chín sao theo số, chung với Bát trạch) [I, tin cao].
// NHÃN NGUỒN:
//   [V] 12 sơn có trong Thanh nang áo ngữ (青囊奧語, truyền là của Dương Quân Tùng), nguyên văn đã tải: nguon/thanh-nang-ao-ngu.txt (Wikisource).
//       Bản Wikisource chép "位位是破星" (Phá tinh) — các bản lưu hành thường chép "位位是破軍" (Phá Quân); cùng một sao Thất Xích.
//   [I] 12 sơn còn lại theo "Thế quái ca" lưu truyền của phái Thẩm thị (Thẩm thị huyền không học chưa có bản công cộng mở để dò),
//       chép theo bản phổ biến, chưa đối chiếu sách giấy. Thế quái là bảng tra khác nhau giữa các phái — kết quả kiêm hướng chỉ để tham khảo.
// Kiểm: tools/kiem-tra-phong-thuy.mjs dò từng sơn nhãn V trong đúng nhóm của nguyên văn.
// Nạp trong trình duyệt: window.PT_THE_QUAI. Nạp bằng vm/node: đọc biến PT_THE_QUAI.
var PT_THE_QUAI = {
  phienBan: "1.0",
  ngayLap: "2026-10-25",
  caQuyet: [
    { ten: "Thanh nang áo ngữ (青囊奧語)", nhan: "V", tep: "nguon/thanh-nang-ao-ngu.txt",
      van: "坤壬乙, 巨門從頭出, 艮丙辛, 位位是破星, 巽辰亥, 儘是武曲位, 甲癸申, 貪狼一路行",
      amHanViet: "Khôn Nhâm Ất, Cự Môn tòng đầu xuất; Cấn Bính Tân, vị vị thị Phá tinh; Tốn Thìn Hợi, tận thị Vũ Khúc vị; Giáp Quý Thân, Tham Lang nhất lộ hành",
      nghia: "Khôn, Nhâm, Ất thay bằng Cự Môn (2); Cấn, Bính, Tân thay bằng Phá Quân (7); Tốn, Thìn, Hợi thay bằng Vũ Khúc (6); Giáp, Quý, Thân thay bằng Tham Lang (1)." },
    { ten: "Thế quái ca (phái Thẩm thị, lưu truyền)", nhan: "I", tep: null,
      van: "子癸並甲申, 貪狼一路行; 壬卯乙未坤, 五位為巨門; 乾亥辰巽巳, 連戌武曲名; 酉辛丑艮丙, 天星說破軍; 寅午庚丁上, 右弼四星臨",
      amHanViet: "Tý Quý tịnh Giáp Thân, Tham Lang nhất lộ hành; Nhâm Mão Ất Mùi Khôn, ngũ vị vi Cự Môn; Càn Hợi Thìn Tốn Tỵ, liên Tuất Vũ Khúc danh; Dậu Tân Sửu Cấn Bính, thiên tinh thuyết Phá Quân; Dần Ngọ Canh Đinh thượng, Hữu Bật tứ tinh lâm",
      nghia: "Bổ đủ 24 sơn: thêm Tý → 1; Mão, Mùi → 2; Càn, Tỵ, Tuất → 6; Dậu, Sửu → 7; Dần, Ngọ, Canh, Đinh → 9. Mười hai sơn trùng với Thanh nang áo ngữ thì khớp nhau." }
  ],
  tenSao: { 1: "Tham Lang", 2: "Cự Môn", 3: "Lộc Tồn", 4: "Văn Khúc", 5: "Liêm Trinh", 6: "Vũ Khúc", 7: "Phá Quân", 8: "Tả Phụ", 9: "Hữu Bật" },
  // sơn → { sao thay, nhãn nguồn }
  bang: {
    "Tý":   { sao: 1, nhan: "I" }, "Quý":  { sao: 1, nhan: "V" }, "Giáp": { sao: 1, nhan: "V" }, "Thân": { sao: 1, nhan: "V" },
    "Nhâm": { sao: 2, nhan: "V" }, "Mão":  { sao: 2, nhan: "I" }, "Ất":   { sao: 2, nhan: "V" }, "Mùi":  { sao: 2, nhan: "I" }, "Khôn": { sao: 2, nhan: "V" },
    "Càn":  { sao: 6, nhan: "I" }, "Hợi":  { sao: 6, nhan: "V" }, "Thìn": { sao: 6, nhan: "V" }, "Tốn":  { sao: 6, nhan: "V" }, "Tỵ":   { sao: 6, nhan: "I" }, "Tuất": { sao: 6, nhan: "I" },
    "Dậu":  { sao: 7, nhan: "I" }, "Tân":  { sao: 7, nhan: "V" }, "Sửu":  { sao: 7, nhan: "I" }, "Cấn":  { sao: 7, nhan: "V" }, "Bính": { sao: 7, nhan: "V" },
    "Dần":  { sao: 9, nhan: "I" }, "Ngọ":  { sao: 9, nhan: "I" }, "Canh": { sao: 9, nhan: "I" }, "Đinh": { sao: 9, nhan: "I" }
  }
};
if (typeof window !== "undefined") window.PT_THE_QUAI = PT_THE_QUAI;
