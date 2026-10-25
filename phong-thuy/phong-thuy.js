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

  // ====================== 4. HUYỀN KHÔNG PHI TINH CHO MỘT CĂN NHÀ ======================
  // Toàn bộ quy tắc mục này là QUY ƯỚC PHỔ BIẾN của Huyền không phi tinh (phái Thẩm thị) [I]: Thẩm thị huyền không học chưa có bản công cộng mở
  // để đối chiếu; chỉ ca quyết thế quái 12 sơn là [V] (Thanh nang áo ngữ, nguon/thanh-nang-ao-ngu.txt). Huyền không có nhiều phái — kết quả để tham khảo.
  // Cách lập (mỗi bước một dòng):
  //   1. Vận bàn: sao vận (CuuCung.van của năm nhập trạch) nhập trung cung, bay THUẬN.
  //   2. Hướng tinh: lấy sao vận bàn ở cung HƯỚNG đưa vào trung cung; sơn tinh: lấy sao vận bàn ở cung TỌA đưa vào trung cung.
  //   3. Chiều bay: xét cung Lạc thư của chính số đó (số 3 → cung Chấn), lấy sơn CÙNG NGUYÊN LONG với hướng nhà trong cung ấy
  //      (hướng Ngọ là Thiên nguyên → trong Chấn lấy Mão); sơn ấy dương → bay thuận, âm → bay nghịch. Số 5 không có cung riêng → lấy sơn cùng nguyên
  //      ngay trong cung hướng (hoặc cung tọa) gốc.
  //   4. Kiêm hướng: số đo lệch tâm sơn quá HK_CONFIG.nguongKiem (°) → thay sao nhập trung bằng THẾ QUÁI của sơn quyết định ở bước 3 (data/the-quai.js),
  //      chiều bay vẫn theo âm dương sơn ấy; thế quái bằng sao gốc thì không thay. Người dùng tắt được (tuyChon.kiem = false).
  // Hệ quả toán học của quy tắc (tự chứng minh, dùng làm mốc kiểm): hướng bàn bay nghịch ⇔ hướng tinh đương vận rơi đúng cung hướng;
  // sơn bàn bay nghịch ⇔ sơn tinh đương vận rơi đúng cung tọa. Nên chính hướng luôn ra đúng một trong bốn cục dưới đây.
  const HK_CONFIG = { nguongKiem: 3 }; // độ lệch khỏi tâm sơn (°) từ đó coi là kiêm hướng; trong ±3° coi là chính hướng [I, ngưỡng phổ biến]
  const theQuaiBang = () => (typeof PT_THE_QUAI !== "undefined" && PT_THE_QUAI) || (typeof window !== "undefined" && window.PT_THE_QUAI) || null;
  const nguyenCuaSon = ten => Object.keys(NGUYEN).find(k => NGUYEN[k].includes(ten));
  const cungCuaSon = ten => son(SON24.indexOf(ten) * 15).quai;                       // sơn nằm trong cung (quái) nào
  const sonCungNguyen = (soCung, nguyen) => SON24.find(t => cungCuaSon(t) === CUNG[soCung].quai && nguyenCuaSon(t) === nguyen); // mỗi cung đúng một sơn mỗi nguyên
  // Bay từ trung cung: cung số n nhận sao m9(trung ± (n − 5)); thuận cộng, nghịch trừ. Trả về {1..9: sao}.
  function phiTinhChieu(saoTrung, thuan) { const o = {}; for (let n = 1; n <= 9; n++) o[n] = m9(saoTrung + (thuan ? 1 : -1) * (n - 5)); return o; }
  // Khí của một sao so với vận: vượng (= vận), sinh (vận + 1), tiến (vận + 2), thoái (vận − 1), còn lại suy; 5 và 2 luôn là sát tinh trừ khi đương vận [I]
  function khiSao(sao, V) {
    if (sao === V) return { ten: "vượng", muc: 3, y: "sao đương vận — mạnh nhất, nên đón dùng" };
    if (sao === m9(V + 1)) return { ten: "sinh", muc: 2, y: "sao sắp lên vận — tốt, càng ngày càng mạnh" };
    if (sao === 5) return { ten: "sát", muc: -3, y: "sao xấu nhất — giữ yên, không động chạm, không kê giường" };
    if (sao === 2) return { ten: "bệnh", muc: -2, y: "sao bệnh — không kê giường người già, người ốm" };
    if (sao === m9(V + 2)) return { ten: "tiến", muc: 1, y: "sao còn xa vận — tốt vừa" };
    if (sao === m9(V - 1)) return { ten: "thoái", muc: -1, y: "sao vừa hết vận — yếu dần, dùng tạm" };
    return { ten: "suy", muc: -1, y: "sao hết vận lâu — yếu, không nên dựa vào" };
  }
  // Tổ hợp sơn tinh – hướng tinh trong một cung đáng lưu ý [I]; cap là cặp [sơn, hướng] (xét cả hai chiều); van: chỉ xét ở các vận này (bỏ trống = mọi vận)
  const HK_TO_HOP = [
    { cap: [2, 5], ten: "Nhị Ngũ", loai: "rất xấu", y: "Hai sao bệnh và tai họa gặp nhau: bệnh nặng, hao người hao của. Không kê giường, không mở cửa, không động thổ ở phía này." },
    { cap: [2, 3], ten: "Đấu ngưu sát", loai: "xấu", y: "Thổ gặp Mộc: cãi vã, kiện tụng, mẹ con bất hòa. Giữ phía này yên tĩnh, không đặt bàn ăn, phòng khách." },
    { cap: [3, 7], ten: "Tam Thất", loai: "xấu", y: "Mộc gặp Kim: trộm cướp, thương tích, miệng lưỡi. Cửa sổ, cửa phụ phía này nên chắc chắn." },
    { cap: [6, 7], ten: "Giao kiếm sát", loai: "xấu", y: "Hai Kim chạm nhau như hai lưỡi kiếm: tranh đấu, dao kéo, tai nạn. Không đặt bếp, không để vật sắc nhọn." },
    { cap: [7, 9], ten: "Cửu Thất", loai: "xấu", y: "Hỏa đốt Kim: dễ hỏa hoạn, bệnh về phổi, miệng lưỡi. Hạn chế bếp lớn, lò sưởi ở phía này." },
    { cap: [1, 4], ten: "Văn xương", loai: "tốt", y: "Thủy nuôi Mộc: học hành, thi cử, văn chương, nhân duyên. Hợp đặt bàn học, phòng đọc." },
    { cap: [1, 6], ten: "Nhất Lục", loai: "tốt", y: "Kim sinh Thủy: trí tuệ, công danh, quý nhân giúp. Hợp bàn làm việc, phòng khách." },
    { cap: [6, 8], ten: "Lục Bát", loai: "tốt", y: "Thổ sinh Kim: tiền của, chức vụ, nhà đất. Hợp để két, bàn thờ Thần Tài." },
    { cap: [8, 9], ten: "Bát Cửu", loai: "tốt", van: [8, 9], y: "Hỏa sinh Thổ, hai sao gần vận: hỷ sự, tài lộc, nhà đất. Hợp cửa chính, phòng khách." }];
  const HK_CUC = {
    vsvh: { ten: "Vượng sơn vượng hướng", loai: "rất tốt", y: "Hai sao đương vận ở đúng chỗ: sao hướng (tiền của) ở phía cửa, sao sơn (người, sức khỏe) ở lưng nhà. Cục tốt nhất. Phía trước cần thoáng, có đường hoặc nước; phía sau cần nhà cao, tường chắc." },
    tsht: { ten: "Thượng sơn hạ thủy", loai: "xấu", y: "Hai sao đương vận đổi chỗ: sao tiền của rơi về lưng nhà, sao người rơi ra cửa. Dễ hao tiền, người kém sức. Cách bù phổ biến: lưng nhà thoáng hoặc có nước, phía trước có nhà cao, cây lớn (địa hình ngược)." },
    stdh: { ten: "Song tinh đáo hướng", loai: "khá", y: "Cả hai sao đương vận cùng tụ ở phía cửa. Tiền của tốt, người (sức khỏe, con cái) kém hơn. Trước nhà nên có khoảng thoáng hoặc nước rồi mới tới nhà cao." },
    stdt: { ten: "Song tinh đáo tọa", loai: "khá", y: "Cả hai sao đương vận cùng tụ ở lưng nhà. Người bình an, tiền của khó tụ. Sau nhà nên có khoảng thoáng hoặc nước rồi mới tới nhà cao." },
    khac: { ten: "Cục lệch (do thế quái)", loai: "bình", y: "Vì kiêm hướng dùng thế quái, hai sao đương vận không rơi vào cặp tọa – hướng. Xem từng cung: sao hướng đương vận ở đâu thì tiền của mạnh ở đó, sao sơn đương vận ở đâu thì người mạnh ở đó." } };
  // Lập một bàn (sơn hoặc hướng): saoGoc = sao vận bàn ở cung gốc; cungGoc = cung tọa/hướng; nguyen = nguyên long của hướng nhà; dungTheQuai khi kiêm.
  function lapBanHK(saoGoc, cungGoc, nguyen, dungTheQuai) {
    const cungSon = saoGoc === 5 ? cungGoc : saoGoc, sonQD = sonCungNguyen(cungSon, nguyen), thuan = DUONG_SON.includes(sonQD);
    let saoTrung = saoGoc, theQuai = null;
    if (dungTheQuai) { const tq = theQuaiBang(), t = tq && tq.bang[sonQD];
      theQuai = t ? { son: sonQD, sao: t.sao, ten: tq.tenSao[t.sao], nhan: t.nhan, thay: t.sao !== saoGoc } : { son: sonQD, sao: saoGoc, ten: null, nhan: "U", thay: false };
      if (theQuai.thay) saoTrung = theQuai.sao; }
    return { saoGoc, saoTrung, cungSon: CUNG[cungSon].quai, sonQuyetDinh: sonQD, amDuong: thuan ? "dương" : "âm", thuan, theQuai, ban: phiTinhChieu(saoTrung, thuan),
      ngam: saoTrung === 5 ? (thuan ? "phục ngâm" : "phản ngâm") : null }; // 5 nhập trung: thuận → trùng Lạc thư (phục ngâm), nghịch → đối Lạc thư, cộng 10 (phản ngâm) [I]
  }
  // huyenKhong(deg, van, tuyChon): deg = độ hướng nhà (0–360, đứng trong nhà nhìn ra); van = số vận 1–9 hoặc kết quả CuuCung.van;
  // tuyChon: { kiem: true/false (mặc định true), nguongKiem: °, namXet: năm (Lập xuân) để cộng niên tinh }
  function huyenKhong(deg, van, tuyChon) {
    const tc = tuyChon || {}, V = typeof van === "object" && van ? van.van : +van;
    if (!(V >= 1 && V <= 9)) throw new Error("vận phải là số 1–9");
    const huong = son(deg), toa = son(deg + 180), nguong = tc.nguongKiem !== undefined ? +tc.nguongKiem : HK_CONFIG.nguongKiem;
    const lech = ((huong.do - huong.tam + 540) % 360) - 180;                              // lệch khỏi tâm sơn, (−7,5; 7,5], dương = lệch theo chiều kim đồng hồ
    const coKiem = Math.abs(lech) > nguong, sonKiem = coKiem ? SON24[(huong.idx + (lech > 0 ? 1 : 23)) % 24] : null;
    const apDungTheQuai = coKiem && tc.kiem !== false;
    const cungHuong = cungTheoQuai[huong.quai].so, cungToa = cungTheoQuai[toa.quai].so, vanBan = phiTinhChieu(V, true);
    const huongBan = lapBanHK(vanBan[cungHuong], cungHuong, huong.nguyen, apDungTheQuai), sonBan = lapBanHK(vanBan[cungToa], cungToa, toa.nguyen, apDungTheQuai);
    // Cục
    const hVuongTaiHuong = huongBan.ban[cungHuong] === V, sVuongTaiToa = sonBan.ban[cungToa] === V, sVuongTaiHuong = sonBan.ban[cungHuong] === V, hVuongTaiToa = huongBan.ban[cungToa] === V;
    const maCuc = hVuongTaiHuong && sVuongTaiToa ? "vsvh" : sVuongTaiHuong && hVuongTaiToa ? "tsht" : hVuongTaiHuong && sVuongTaiHuong ? "stdh" : hVuongTaiToa && sVuongTaiToa ? "stdt" : "khac";
    const timCung = (ban, sao) => +Object.keys(ban).find(n => ban[n] === sao);
    const viTri = { huongVuong: CUNG[timCung(huongBan.ban, V)], sonVuong: CUNG[timCung(sonBan.ban, V)], huongSinh: CUNG[timCung(huongBan.ban, m9(V + 1))], sonSinh: CUNG[timCung(sonBan.ban, m9(V + 1))] };
    // Niên tinh năm đang xét
    let nam = null;
    if (tc.namXet) { const nt = CuuCung.nienTinh(+tc.namXet), b = phiTinhChieu(nt, true);
      nam = { namXet: +tc.namXet, nienTinh: nt, ban: b, nguHoang: CUNG[timCung(b, 5)], nhiHac: CUNG[timCung(b, 2)], tamBich: CUNG[timCung(b, 3)] }; }
    // Chín cung
    const cung = {};
    for (let n = 1; n <= 9; n++) {
      const c = CUNG[n], s = sonBan.ban[n], h = huongBan.ban[n], ks = khiSao(s, V), kh = khiSao(h, V);
      const toHop = HK_TO_HOP.filter(t => (!t.van || t.van.includes(V)) && ((t.cap[0] === s && t.cap[1] === h) || (t.cap[0] === h && t.cap[1] === s)));
      const ghiChu = [];
      if (n === cungHuong) ghiChu.push("cung hướng (phía cửa chính)"); if (n === cungToa) ghiChu.push("cung tọa (lưng nhà)");
      if (h === V) ghiChu.push("hướng tinh đương vận: tiền của mạnh nhất ở đây"); if (s === V) ghiChu.push("sơn tinh đương vận: người, sức khỏe mạnh nhất ở đây");
      if (h === m9(V + 1)) ghiChu.push("hướng tinh sinh khí: tiền của sắp tới"); if (s === m9(V + 1)) ghiChu.push("sơn tinh sinh khí: tốt cho con cái, người trẻ");
      for (const t of toHop) ghiChu.push(`${t.ten} (${s}–${h}): ${t.y}`);
      const xau = [s, h].some(x => x === 5 || (x === 2 && V !== 2)) || toHop.some(t => t.loai !== "tốt"), tot = !xau && (ks.muc >= 2 || kh.muc >= 2 || toHop.some(t => t.loai === "tốt"));
      const lan = xau && (h === V || s === V); // vừa có sao đương vận vừa có sao xấu: dùng được một phần
      if (lan) ghiChu.push(h === V ? "sao hướng tốt nhưng sao sơn xấu: dùng làm cửa, lối đi, phòng khách; không kê giường, không để người già ở" : "sao sơn tốt nhưng sao hướng xấu: dùng làm phòng ngủ, giữ kín; không mở cửa lớn, không để két, bàn làm ăn ở đây");
      const saoNam = nam ? nam.ban[n] : null;
      if (saoNam === 5) ghiChu.push(`năm ${nam.namXet} có Ngũ Hoàng (sao xấu nhất trong năm) → không đào bới, sửa chữa, khoan đục ở phía này`);
      if (saoNam === 2) ghiChu.push(`năm ${nam.namXet} có Nhị Hắc (sao bệnh) → không kê giường người già, người ốm; hạn chế động chạm`);
      if (saoNam === 3) ghiChu.push(`năm ${nam.namXet} có Tam Bích (sao cãi vã) → giữ yên tĩnh, tránh tranh luận ở phía này`);
      if (saoNam !== null && (saoNam === 5 || saoNam === 2) && (s === 5 || h === 5 || s === 2 || h === 2)) ghiChu.push("sao xấu của nhà và của năm chồng lên nhau → càng phải giữ yên");
      cung[n] = { so: n, quai: c.quai, huong: c.huong, kyHieu: c.kyHieu, sonTinh: s, vanTinh: vanBan[n], huongTinh: h, saoNam, khiSon: ks, khiHuong: kh, toHop,
        laHuong: n === cungHuong, laToa: n === cungToa, danhGia: lan ? "lẫn" : xau ? "xấu" : tot ? "tốt" : "bình", ghiChu };
    }
    const kq = { do: huong.do, huong, toa, van: V, kiem: { lech: +lech.toFixed(1), nguong, co: coKiem, sonKiem, apDung: apDungTheQuai, tat: tc.kiem === false },
      vanBan, sonBan, huongBan, cuc: Object.assign({ ma: maCuc }, HK_CUC[maCuc]), ngam: { son: sonBan.ngam, huong: huongBan.ngam }, viTri, nam, cung,
      luoi: LUOI.map(hang => hang.map(n => cung[n])) };
    kq.noiNgan = noiNganHK(kq);
    return kq;
  }
  // "Nói ngắn": 5–8 gạch đầu dòng đời thường từ kết quả huyenKhong
  function noiNganHK(k) {
    const d = [], V = k.van, ph = c => c.so === 5 ? "giữa nhà (trung cung)" : `phía ${c.huong}`;
    d.push(`Nhà tọa ${k.toa.ten} hướng ${k.huong.ten} (cửa nhìn về ${k.huong.huong}), lập theo vận ${V}${k.kiem.apDung ? `, kiêm ${k.kiem.sonKiem} ${Math.abs(k.kiem.lech)}° nên dùng thế quái` : ""}: ${k.cuc.ten} — ${k.cuc.y.split(". ")[0]}.`);
    d.push(`Tiền của: ${ph(k.viTri.huongVuong)} có sao hướng đương vận (${V}) — hợp đặt cửa, phòng khách, bàn thờ Thần Tài, két hoặc tủ tiền; giữ thoáng, sáng. ${ph(k.viTri.huongSinh)} có sao sắp lên (${m9(V + 1)}), cũng tốt cho tiền của về sau.`);
    d.push(`Người, sức khỏe: ${ph(k.viTri.sonVuong)} có sao sơn đương vận (${V}) — hợp phòng ngủ chính, giường ngủ; cần kín, yên, có tường hoặc nhà cao che. ${ph(k.viTri.sonSinh)} có sao sơn sắp lên, hợp phòng ngủ con, người trẻ.`);
    const xau = Object.values(k.cung).filter(c => c.danhGia === "xấu");
    if (xau.length) d.push(`Nên tránh: ${xau.map(c => `${ph(c)} (sơn ${c.sonTinh} – hướng ${c.huongTinh}${c.toHop.length ? ", " + c.toHop.map(t => t.ten).join(", ") : ""})`).join("; ")} — chỗ này hợp đặt bếp, kho, nhà vệ sinh, cầu thang; không kê giường, không ngồi làm việc lâu.`);
    const lan = Object.values(k.cung).filter(c => c.danhGia === "lẫn");
    for (const c of lan) d.push(`${ph(c)[0].toUpperCase() + ph(c).slice(1)} vừa tốt vừa xấu (sơn ${c.sonTinh} – hướng ${c.huongTinh}): ${c.ghiChu.find(g => g.startsWith("sao hướng tốt") || g.startsWith("sao sơn tốt"))}.`);
    if (k.ngam.son || k.ngam.huong) d.push(`Lưu ý: ${[k.ngam.son && `sơn bàn ${k.ngam.son}`, k.ngam.huong && `hướng bàn ${k.ngam.huong}`].filter(Boolean).join(", ")} (sao 5 vào giữa, cả bàn trùng hoặc đối với Lạc thư gốc) — nhà dễ "ngâm" lại chuyện cũ; càng cần sắp xếp đúng chỗ tốt, tránh chỗ xấu.`);
    if (k.nam) d.push(`Năm ${k.nam.namXet}: Ngũ Hoàng (sao xấu nhất trong năm) ở ${ph(k.nam.nguHoang)}, Nhị Hắc (sao bệnh) ở ${ph(k.nam.nhiHac)} → năm nay không động thổ, đục khoan, sửa lớn ở hai phía này${k.cung[k.nam.nguHoang.so].laHuong ? "; Ngũ Hoàng đến đúng phía cửa chính, tránh sửa cửa, đổi cửa năm nay" : k.cung[k.nam.nguHoang.so].laToa ? "; Ngũ Hoàng đến đúng lưng nhà, không đụng tường hậu năm nay" : ""}.`);
    const tot = Object.values(k.cung).filter(c => c.toHop.some(t => t.loai === "tốt"));
    if (tot.length) d.push(`Chỗ hay: ${tot.map(c => `${ph(c)} có ${c.toHop.filter(t => t.loai === "tốt").map(t => t.ten).join(", ")}`).join("; ")} — ${tot[0].toHop.find(t => t.loai === "tốt").y.split(". ").slice(-1)[0]}`);
    if (k.kiem.co && !k.kiem.apDung) d.push(`Số đo lệch tâm sơn ${Math.abs(k.kiem.lech)}° (kiêm ${k.kiem.sonKiem}) nhưng đang tắt kiêm hướng — lưới tính như chính hướng.`);
    d.push("Huyền không có nhiều phái, quy tắc ở đây là quy ước phổ biến [I]; kết quả để tham khảo, không thay việc xem xét tại chỗ.");
    return d;
  }

  return { CUNG, HUONG8, DU_NIEN, Y_SAO, SON24, NGUYEN, LUOI, DONG_TU, TAY_TU, hanhQuai, m9, namTheoLapXuan, quaiMenh, bienHao, duNien, duNienTheoHuong, huongDoi, danhGia, batTrach, phiTinh, luoiPhiTinh, son, laBan,
    HK_CONFIG, HK_TO_HOP, HK_CUC, phiTinhChieu, khiSao, sonCungNguyen, lapBanHK, huyenKhong, noiNganHK };
})();
if (typeof window !== "undefined") window.PhongThuy = PhongThuy;
