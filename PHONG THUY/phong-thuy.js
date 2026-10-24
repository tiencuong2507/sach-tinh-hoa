// Phong thủy — lõi tính: Bát trạch (quái mệnh, tám du niên), Cửu cung phi tinh năm tháng (Huyền không cơ bản), La bàn 24 sơn.
// Nạp sau chung/lich.js, can-chi.js, ngu-hanh.js, cuu-cung.js. Không chép bảng của lõi chung: niên tinh, nguyệt tinh lấy từ CuuCung; hành quái từ HANH_QUAI.
// Nhãn nguồn: [V] đối chiếu được nguyên văn trong nguon/ · [I] quy ước phổ biến của phái, chưa đối chiếu sách gốc
// (Bát trạch minh kính, Dương trạch tam yếu chưa có bản công cộng mở được).
// Quy ước bit quái: chuỗi 3 bit TỪ DƯỚI LÊN (vị trí 0 = hào sơ, 1 = hào nhị, 2 = hào thượng), 1 = dương — cùng quy ước HANH_QUAI của chung/ngu-hanh.js.
"use strict";
const PhongThuy = (() => {
  // --- Cửu cung Lạc thư ↔ quái Hậu thiên ↔ hướng địa lý. Số 5 là trung cung.
  // [V] phần chú Thanh nang kinh (nguon/thanh-nang-kinh.txt): 一起正北，二居西南，三居正東，四居東南，五複居中，六居西北，七居正西，八居東北，九居正南 và 坎一，坤二，震三，巽四，中五，乾六，兌七，艮八，離九
  const CUNG = [null,
    { so: 1, quai: "Khảm", bit: "010", huong: "Bắc",      zh: "坎", kyHieu: "☵" },
    { so: 2, quai: "Khôn", bit: "000", huong: "Tây Nam",  zh: "坤", kyHieu: "☷" },
    { so: 3, quai: "Chấn", bit: "100", huong: "Đông",     zh: "震", kyHieu: "☳" },
    { so: 4, quai: "Tốn",  bit: "011", huong: "Đông Nam", zh: "巽", kyHieu: "☴" },
    { so: 5, quai: "Trung cung", bit: null, huong: "Giữa", zh: "中", kyHieu: "" },
    { so: 6, quai: "Càn",  bit: "111", huong: "Tây Bắc",  zh: "乾", kyHieu: "☰" },
    { so: 7, quai: "Đoài", bit: "110", huong: "Tây",      zh: "兌", kyHieu: "☱" },
    { so: 8, quai: "Cấn",  bit: "001", huong: "Đông Bắc", zh: "艮", kyHieu: "☶" },
    { so: 9, quai: "Ly",   bit: "101", huong: "Nam",      zh: "離", kyHieu: "☲" }];
  const cungTheoQuai = Object.fromEntries(CUNG.filter(c => c && c.bit).map(c => [c.quai, c]));
  const cungTheoBit = Object.fromEntries(CUNG.filter(c => c && c.bit).map(c => [c.bit, c]));
  const cungTheoHuong = Object.fromEntries(CUNG.filter(c => c && c.bit).map(c => [c.huong, c]));
  const HUONG8 = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"]; // theo chiều kim đồng hồ từ Bắc
  const hanhQuai = quai => HANH_QUAI[cungTheoQuai[quai].bit];
  const m9 = n => { const r = ((n % 9) + 9) % 9; return r === 0 ? 9 : r; };

  // --- Năm theo Lập xuân từ ngày dương lịch: tháng tiết Dần trở đi mới thuộc năm mới (cùng cách với XEM NGAY).
  function namTheoLapXuan(d, m, y, h = 12) {
    const chiThangTiet = LichAm.chiThangTiet(d, m, y, h);
    const truocLapXuan = m < 3 && chiThangTiet !== 2;
    return { nam: truocLapXuan ? y - 1 : y, chiThangTiet, truocLapXuan };
  }

  // ====================== 1. BÁT TRẠCH ======================
  const DONG_TU = ["Khảm", "Ly", "Chấn", "Tốn"], TAY_TU = ["Càn", "Khôn", "Cấn", "Đoài"];
  // Quái mệnh từ niên tinh năm sinh (CuuCung.nienTinh, năm theo Lập xuân): nam lấy niên tinh, nữ lấy 15 − niên tinh đưa về 1–9;
  // số 5 nam → Khôn (2), nữ → Cấn (8). [I, tin cao — mốc độc lập: nam 1984 Giáp Tý là Đoài mệnh, nữ 1984 là Cấn]
  function quaiMenh(namSinh, gioiTinh) {
    const nt = CuuCung.nienTinh(namSinh), nam = gioiTinh !== "nữ";
    let so = nam ? nt : m9(15 - nt);
    if (so === 5) so = nam ? 2 : 8;
    const c = CUNG[so];
    return { so, quai: c.quai, bit: c.bit, zh: c.zh, kyHieu: c.kyHieu, hanh: hanhQuai(c.quai), huongQuai: c.huong, nienTinh: nt,
      nhom: DONG_TU.includes(c.quai) ? "Đông tứ mệnh" : "Tây tứ mệnh" };
  }
  // Tám du niên bằng phép biến hào từ quái mệnh; bien = vị trí hào bị biến (0 dưới, 1 giữa, 2 trên).
  // [I — kết quả khớp bảng Bát trạch lưu truyền: Càn → Sinh khí Đoài, Thiên y Cấn, Diên niên Khôn, Tuyệt mệnh Ly, Ngũ quỷ Chấn, Lục sát Khảm, Họa hại Tốn]
  const DU_NIEN = [
    { ten: "Sinh khí",   bien: [2],       cat: true,  sao: "Tham Lang",  hanh: "Mộc",  y: "Tốt nhất: sinh lực, tài lộc, thăng tiến; hợp cửa chính, bàn làm việc." },
    { ten: "Thiên y",    bien: [0, 1],    cat: true,  sao: "Cự Môn",     hanh: "Thổ",  y: "Sức khỏe, quý nhân, hóa giải bệnh tật; hợp giường ngủ, hướng bếp." },
    { ten: "Diên niên",  bien: [0, 1, 2], cat: true,  sao: "Vũ Khúc",    hanh: "Kim",  y: "Hòa thuận, hôn nhân, bền lâu; hợp phòng ngủ vợ chồng, phòng khách." },
    { ten: "Phục vị",    bien: [],        cat: true,  sao: "Phụ Bật",    hanh: "Mộc",  y: "Bình ổn, nhỏ mà chắc; hợp bàn thờ, phòng ngủ, chỗ tĩnh." },
    { ten: "Họa hại",    bien: [0],       cat: false, sao: "Lộc Tồn",    hanh: "Thổ",  y: "Xấu nhẹ: thị phi vặt, hao tán; nên đặt bếp, kho, nhà vệ sinh để trấn." },
    { ten: "Lục sát",    bien: [0, 2],    cat: false, sao: "Văn Khúc",   hanh: "Thủy", y: "Xấu: tình cảm rối, kiện tụng, tai nạn nhỏ; đặt bếp, nhà vệ sinh." },
    { ten: "Ngũ quỷ",    bien: [1, 2],    cat: false, sao: "Liêm Trinh", hanh: "Hỏa",  y: "Rất xấu: thị phi, hỏa hoạn, mất mát; đặt bếp (tọa hung) để áp chế." },
    { ten: "Tuyệt mệnh", bien: [1],       cat: false, sao: "Phá Quân",   hanh: "Kim",  y: "Xấu nhất: tổn hại người, bệnh nặng; tránh làm cửa, giường, bàn; đặt bếp hoặc kho." }];
  const bienHao = (bit, viTri) => bit.split("").map((b, i) => viTri.includes(i) ? (b === "1" ? "0" : "1") : b).join("");
  function duNien(quai) {
    const bit = cungTheoQuai[quai].bit;
    return DU_NIEN.map(dn => { const c = cungTheoBit[bienHao(bit, dn.bien)]; return Object.assign({}, dn, { quai: c.quai, huong: c.huong, so: c.so, kyHieu: c.kyHieu }); });
  }
  const duNienTheoHuong = (quai, huong) => duNien(quai).find(d => d.huong === huong);
  const huongDoi = h => HUONG8[(HUONG8.indexOf(h) + 4) % 8];
  const lietKe = (quai, cat) => duNien(quai).filter(x => x.cat === cat).map(x => `${x.huong} (${x.ten})`).join(", ");

  // Đánh giá từng hạng mục theo nguyên tắc phổ biến [I]: nhà "tọa cát" (lưng nhà tựa hướng tốt), cửa hướng cát, bếp "tọa hung hướng cát",
  // giường (đầu giường) và bàn làm việc (lưng ghế) quay về hướng cát.
  // hangMuc: { nha: hướng nhà (mặt tiền nhìn ra), cua, bepHuong, bepViTri, giuong, ban } — giá trị là tên hướng trong HUONG8, bỏ trống thì không xét.
  function danhGia(quai, hangMuc) {
    const kq = [];
    const xet = (ten, huong, muonCat, giaiThich) => {
      if (!huong || !cungTheoHuong[huong]) return;
      const d = duNienTheoHuong(quai, huong), hop = d.cat === muonCat;
      const loiKhuyen = hop ? `Hợp: ${huong} là ${d.ten} (${d.cat ? "cát" : "hung"}). ${d.y}`
        : muonCat ? `Chưa hợp: ${huong} là ${d.ten} (hung). Hướng cát của mệnh này: ${lietKe(quai, true)}.`
        : `Chưa hợp: ${huong} là ${d.ten} (cát) — vị trí bếp nên ở cung hung để "tọa hung": ${lietKe(quai, false)}.`;
      kq.push({ ten, huong, duNien: d.ten, cat: d.cat, hop, giaiThich, loiKhuyen });
    };
    if (hangMuc.nha) {
      const toa = huongDoi(hangMuc.nha);
      xet("Nhà (tọa)", toa, true, `Nhà hướng ${hangMuc.nha} thì tọa ${toa}; Bát trạch xét "tọa cát" — lưng nhà tựa về hướng tốt.`);
      const dh = duNienTheoHuong(quai, hangMuc.nha);
      kq.push({ ten: "Nhà (hướng)", huong: hangMuc.nha, duNien: dh.ten, cat: dh.cat, hop: dh.cat,
        giaiThich: "Nhiều thầy Việt Nam lại xét theo hướng mặt tiền; ghi thêm để tự cân nhắc.",
        loiKhuyen: `Hướng ${hangMuc.nha} là ${dh.ten} (${dh.cat ? "cát" : "hung"}). ${dh.y}` });
    }
    xet("Cửa chính", hangMuc.cua, true, "Cửa đón khí: hướng cửa nhìn ra nên là hướng cát.");
    xet("Bếp – vị trí", hangMuc.bepViTri, false, "Bếp đặt ở cung hung của nhà để lửa áp chế sao xấu (tọa hung).");
    xet("Bếp – hướng", hangMuc.bepHuong, true, "Hướng bếp (quy ước phổ biến: hướng lưng người đứng nấu) nên quay về hướng cát (hướng cát).");
    xet("Giường ngủ", hangMuc.giuong, true, "Đầu giường quay về hướng cát.");
    xet("Bàn làm việc", hangMuc.ban, true, "Lưng ghế quay về hướng cát (tựa cát); một số sách xét hướng mặt nhìn tới — xem cột hướng đối trong bảng.");
    return kq;
  }
  function batTrach(ngaySinh, gioiTinh, hangMuc) {
    const d = ngaySinh[0], m = ngaySinh[1], y = ngaySinh[2], nam = namTheoLapXuan(d, m, y);
    const menh = quaiMenh(nam.nam, gioiTinh);
    return { ngaySinh, gioiTinh, namSinh: nam.nam, truocLapXuan: nam.truocLapXuan, namCanChi: CanChi.ten(CanChi.nam(nam.nam)), menh,
      bang: HUONG8.map(h => duNienTheoHuong(menh.quai, h)), danhGia: danhGia(menh.quai, hangMuc || {}) };
  }

  // ====================== 2. CỬU CUNG PHI TINH ======================
  // Bay thuận từ trung cung theo thứ tự Lạc thư 5→6→7→8→9→1→2→3→4: cung số n nhận sao m9(saoTrung + n − 5).
  // [I, tin cao — kiểm: 2024 Tam Bích nhập trung → Ngũ Hoàng ở Tây (7); 2026 Nhất Bạch nhập trung → Ngũ Hoàng ở Nam (9)]
  // Ý nghĩa 9 sao trong vận 9 (2024–2043): cách luận phổ biến của Huyền không phi tinh [I]
  const Y_SAO = [null,
    { ten: "Nhất Bạch", loai: "tốt",     y: "Sinh khí của vận 9: tài lộc, danh tiếng, học hành; nên đón dùng." },
    { ten: "Nhị Hắc",   loai: "xấu",     y: "Bệnh phù: ốm đau, nhất là phụ nữ, người già; tránh động thổ, kê giường tại cung này." },
    { ten: "Tam Bích",  loai: "xấu",     y: "Thị phi, kiện tụng, tranh cãi; giữ yên tĩnh." },
    { ten: "Tứ Lục",    loai: "tốt",     y: "Văn Xương: học hành, thi cử, văn chương, nhân duyên; hợp bàn học." },
    { ten: "Ngũ Hoàng", loai: "rất xấu", y: "Đại sát: tai họa, bệnh nặng, phá tài; không động thổ, đục đẽo, khoan cắt tại cung này; giữ tĩnh." },
    { ten: "Lục Bạch",  loai: "bình",    y: "Quan tinh: quyền uy, quý nhân; đã thoái khí nhưng còn dùng được cho công việc, chức vụ." },
    { ten: "Thất Xích", loai: "xấu",     y: "Phá tài, trộm cướp, miệng lưỡi; sao thoái khí của vận 9." },
    { ten: "Bát Bạch",  loai: "tốt",     y: "Thoái khí nhưng còn tốt: tài lộc, bất động sản; vẫn là cát tinh gần vận." },
    { ten: "Cửu Tử",    loai: "rất tốt", y: "Đương vận: hỷ sự, danh tiếng, tài lộc; đón dùng cho cửa, phòng khách." }];
  const LUOI = [[4, 9, 2], [3, 5, 7], [8, 1, 6]]; // Nam ở trên như sách: Tốn Ly Khôn / Chấn trung Đoài / Cấn Khảm Càn
  const phiTinh = saoTrung => CUNG.slice(1).map(c => ({ so: c.so, quai: c.quai, huong: c.huong, kyHieu: c.kyHieu, sao: m9(saoTrung + c.so - 5) }));
  function luoiPhiTinh(d, m, y) {
    const nam = namTheoLapXuan(d, m, y), nienTinh = CuuCung.nienTinh(nam.nam);
    const idxNam = CanChi.nam(nam.nam), chiNam = idxNam % 12, chiThang = nam.chiThangTiet;
    const nguyetTinh = CuuCung.nguyetTinh(chiNam, chiThang), van = CuuCung.van(nam.nam);
    const namBan = phiTinh(nienTinh), thangBan = phiTinh(nguyetTinh);
    const o = {}; for (const c of namBan) o[c.so] = Object.assign({}, c, { saoNam: c.sao, saoThang: thangBan.find(t => t.so === c.so).sao });
    const timCung = (ban, sao) => ban.find(c => c.sao === sao);
    return { nam: nam.nam, namCanChi: CanChi.ten(idxNam), chiThang, thangCanChi: CanChi.ten(CanChi.thang(idxNam % 10, chiThang)), van, nienTinh, nguyetTinh,
      luoi: LUOI.map(hang => hang.map(so => o[so])), oCung: o,
      nguHoangNam: timCung(namBan, 5), nhiHacNam: timCung(namBan, 2), nguHoangThang: timCung(thangBan, 5), nhiHacThang: timCung(thangBan, 2) };
  }

  // ====================== 3. LA BÀN 24 SƠN ======================
  // 24 sơn mỗi 15°, Tý ở tâm 0° (352,5°–7,5°), theo chiều kim đồng hồ. Tam nguyên long và âm dương theo quy ước Huyền không [I]:
  // Thiên nguyên: Tý Ngọ Mão Dậu (âm), Càn Khôn Cấn Tốn (dương); Địa nguyên: Nhâm Bính Giáp Canh (dương), Thìn Tuất Sửu Mùi (âm);
  // Nhân nguyên: Dần Thân Tỵ Hợi (dương), Quý Đinh Ất Tân (âm).
  const SON24 = ["Tý","Quý","Sửu","Cấn","Dần","Giáp","Mão","Ất","Thìn","Tốn","Tỵ","Bính","Ngọ","Đinh","Mùi","Khôn","Thân","Canh","Dậu","Tân","Tuất","Càn","Hợi","Nhâm"];
  const SON_ZH = "子癸丑艮寅甲卯乙辰巽巳丙午丁未坤申庚酉辛戌乾亥壬";
  const NGUYEN = { "Thiên nguyên long": ["Tý","Ngọ","Mão","Dậu","Càn","Khôn","Cấn","Tốn"], "Địa nguyên long": ["Nhâm","Bính","Giáp","Canh","Thìn","Tuất","Sửu","Mùi"], "Nhân nguyên long": ["Quý","Đinh","Ất","Tân","Dần","Thân","Tỵ","Hợi"] };
  const DUONG_SON = ["Càn","Khôn","Cấn","Tốn","Nhâm","Bính","Giáp","Canh","Dần","Thân","Tỵ","Hợi"];
  const chuanDo = deg => ((deg % 360) + 360) % 360;
  function son(deg) {
    const d = chuanDo(deg), i = Math.floor(((d + 7.5) % 360) / 15), ten = SON24[i];
    const tam = i * 15, tu = chuanDo(tam - 7.5), den = chuanDo(tam + 7.5);
    const q = HUONG8[Math.floor(((d + 22.5) % 360) / 45)];
    return { do: d, idx: i, ten, zh: SON_ZH[i], tu, den, tam, huong: q, quai: cungTheoHuong[q].quai,
      nguyen: Object.keys(NGUYEN).find(k => NGUYEN[k].includes(ten)), amDuong: DUONG_SON.includes(ten) ? "dương" : "âm" };
  }
  function laBan(deg) { return { huong: son(deg), toa: son(deg + 180) }; }

  return { CUNG, HUONG8, DU_NIEN, Y_SAO, SON24, NGUYEN, LUOI, DONG_TU, TAY_TU, hanhQuai, m9, namTheoLapXuan, quaiMenh, bienHao, duNien, duNienTheoHuong, huongDoi, danhGia, batTrach, phiTinh, luoiPhiTinh, son, laBan };
})();
if (typeof window !== "undefined") window.PhongThuy = PhongThuy;
