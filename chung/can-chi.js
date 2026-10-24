// Lõi dùng chung — Can chi, nạp âm, tuần không, xung hợp. Nạp sau chung/lich.js.
// Một luật tính viết ở một nơi: mọi cuốn sách và công cụ trong kho dùng file này, không chép bảng riêng.
// Quy ước chỉ số: can 0 = Giáp … 9 = Quý; chi 0 = Tý … 11 = Hợi; vòng 60 hoa giáp idx60 0 = Giáp Tý … 59 = Quý Hợi.
// Mốc đã kiểm (chung/tools/kiem-tra-chung.mjs): năm 1984 Giáp Tý; ngày 1/1/1900 (JD 2415021) Giáp Tuất; ngày 1/1/2000 Mậu Ngọ.
"use strict";
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const CAN_ZH = "甲乙丙丁戊己庚辛壬癸", CHI_ZH = "子丑寅卯辰巳午未申酉戌亥";
const HANH_CAN = ["Mộc","Mộc","Hỏa","Hỏa","Thổ","Thổ","Kim","Kim","Thủy","Thủy"];
const HANH_CHI = ["Thủy","Thổ","Mộc","Mộc","Thổ","Hỏa","Hỏa","Thổ","Kim","Kim","Thổ","Thủy"];
// Nạp âm 60 hoa giáp: mỗi cặp hai năm liền một hành (Giáp Tý Ất Sửu Hải Trung Kim …)
const NAP_AM = ["Hải Trung Kim","Lư Trung Hỏa","Đại Lâm Mộc","Lộ Bàng Thổ","Kiếm Phong Kim","Sơn Đầu Hỏa","Giản Hạ Thủy","Thành Đầu Thổ",
 "Bạch Lạp Kim","Dương Liễu Mộc","Tuyền Trung Thủy","Ốc Thượng Thổ","Tích Lịch Hỏa","Tùng Bách Mộc","Trường Lưu Thủy","Sa Trung Kim",
 "Sơn Hạ Hỏa","Bình Địa Mộc","Bích Thượng Thổ","Kim Bạch Kim","Phú Đăng Hỏa","Thiên Hà Thủy","Đại Trạch Thổ","Thoa Xuyến Kim",
 "Tang Đố Mộc","Đại Khê Thủy","Sa Trung Thổ","Thiên Thượng Hỏa","Thạch Lựu Mộc","Đại Hải Thủy"];
const mod = (a, m) => ((a % m) + m) % m;

const CanChi = (() => {
  const NAM_GIAP_TY = 4;            // năm dương lịch 4 (và 1984, 2044) là Giáp Tý
  const JD_GIAP_TUAT = 2415021;     // 1/1/1900 là ngày Giáp Tuất (idx60 = 10)
  const idx60 = (can, chi) => { for (let k = 0; k < 60; k++) if (k % 10 === can && k % 12 === chi) return k; return -1; };
  const ten = idx => `${CAN[idx % 10]} ${CHI[idx % 12]}`;
  const tenZh = idx => CAN_ZH[idx % 10] + CHI_ZH[idx % 12];
  // Năm: theo năm âm lịch (hoặc năm dương lịch khi người gọi đã tự xử lý ranh giới Lập xuân / Tết)
  const nam = y => mod(y - NAM_GIAP_TY, 60);
  // Ngày: từ ngày Julius (chung/lich.js jdFromDate). Giờ Tý sau 23h sang ngày mới là việc của người gọi.
  const ngay = jd => mod(jd - JD_GIAP_TUAT + 10, 60);
  // Tháng: ngũ hổ độn — năm Giáp, Kỷ khởi Bính Dần; chiThang 2 = Dần … 1 = Sửu
  const canThang = (canNam, chiThang) => mod(canNam * 2 + 2 + mod(chiThang - 2, 12), 10);
  const thang = (canNam, chiThang) => idx60(canThang(canNam, chiThang), chiThang);
  // Giờ: ngũ thử độn — ngày Giáp, Kỷ khởi Giáp Tý
  const canGio = (canNgay, chiGio) => mod(canNgay * 2 + chiGio, 10);
  const gio = (canNgay, chiGio) => idx60(canGio(canNgay, chiGio), chiGio);
  // Chi giờ từ giờ đồng hồ: 23h–0h59 Tý, 1h–2h59 Sửu …
  const chiGioTuGio = h => Math.floor((h + 1) / 2) % 12;
  // Tuần không: tuần Giáp Tý thiếu Tuất Hợi, Giáp Tuất thiếu Thân Dậu …
  const tuanKhong = idx => { const s = idx - idx % 10; return [mod(s + 10, 12), mod(s + 11, 12)]; };
  const napAm = idx => NAP_AM[Math.floor(idx / 2)];
  const hanhNapAm = idx => napAm(idx).split(" ").pop();
  // Quan hệ giữa hai chi
  const xung = (a, b) => mod(a - b, 12) === 6;                 // lục xung: Tý Ngọ, Sửu Mùi …
  const hop = (a, b) => mod(a + b, 12) === 1;                  // lục hợp: Tý Sửu, Dần Hợi, Mão Tuất, Thìn Dậu, Tỵ Thân, Ngọ Mùi
  const tamHop = (a, b) => [4, 8].includes(mod(a - b, 12));    // tam hợp: cách nhau 4 cung
  const hai = (a, b) => mod(a + b, 12) === 7;                  // lục hại: Tý Mùi, Sửu Ngọ, Dần Tỵ, Mão Thìn, Thân Hợi, Dậu Tuất
  return { idx60, ten, tenZh, nam, ngay, canThang, thang, canGio, gio, chiGioTuGio, tuanKhong, napAm, hanhNapAm, xung, hop, tamHop, hai };
})();
if (typeof window !== "undefined") Object.assign(window, { CAN, CHI, CAN_ZH, CHI_ZH, HANH_CAN, HANH_CHI, NAP_AM, mod, CanChi });
