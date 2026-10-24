// Xem ngày giờ (trạch nhật) — lõi tính. Nạp sau chung/lich.js, can-chi.js, ngu-hanh.js, cuu-cung.js.
// Mỗi lớp là một hàm nhỏ, ghi rõ nguồn quy tắc và nhãn: [V] đối chiếu được nguyên văn trong nguon/ · [I] quy ước phổ biến chưa đối chiếu sách gốc.
// Tháng dùng cho trực, thần hoàng đạo, Thiên đức, Nguyệt đức, Nguyệt phá là THÁNG TIẾT KHÍ (nguyệt kiến) theo Hiệp kỷ biện phương thư;
// nhiều trang lịch Việt Nam lại tính theo tháng âm lịch nên cùng một ngày có thể ra trực khác (ví dụ 1/1/2025: theo tiết là Phá, theo tháng âm là Chấp).
"use strict";
const XemNgay = (() => {
  const CAU_HINH = {
    thangTheoTiet: true,                               // false = theo tháng âm lịch như một số lịch phổ thông
    moc28Tu: { ngay: [1, 1, 2025], tu: 20 },           // 1/1/2025 là sao Sâm 參 (hai trang lịch Việt độc lập cùng ghi; nguồn thứ cấp [I])
  };
  // --- Thập nhị trực. Hiệp kỷ Q4: 其法從月建上起建 — ngày có chi trùng chi tháng (tiết) là Kiến, rồi tiến dần. [V]
  const TRUC = ["Kiến","Trừ","Mãn","Bình","Định","Chấp","Phá","Nguy","Thành","Thu","Khai","Bế"];
  // Ca quyết lưu truyền: 建滿平收黑，除危定執黃，成開皆可用，閉破不相當 [I]
  const TRUC_TOT = {Trừ:"hoàng", Nguy:"hoàng", Định:"hoàng", Chấp:"hoàng", Thành:"dùng được", Khai:"dùng được", Kiến:"hắc", Mãn:"hắc", Bình:"hắc", Thu:"hắc", Bế:"xấu", Phá:"xấu"};
  const truc = (chiNgay, chiThang) => TRUC[mod(chiNgay - chiThang, 12)];
  // --- Mười hai thần hoàng đạo, hắc đạo. Thanh Long khởi theo chi tháng: Dần Thân → Tý, Mão Dậu → Dần, Thìn Tuất → Thìn, Tỵ Hợi → Ngọ, Tý Ngọ → Thân, Sửu Mùi → Tuất. [I]
  // Giờ hoàng đạo dùng cùng bảng, thay chi tháng bằng chi ngày. Kiểm: ngày Tý/Ngọ ra giờ Tý Sửu Mão Ngọ Thân Dậu, khớp lịch phổ thông.
  const THAN = [["Thanh Long",1],["Minh Đường",1],["Thiên Hình",0],["Chu Tước",0],["Kim Quỹ",1],["Thiên Đức",1],["Bạch Hổ",0],["Ngọc Đường",1],["Thiên Lao",0],["Huyền Vũ",0],["Tư Mệnh",1],["Câu Trần",0]];
  const khoiThanhLong = chiGoc => mod(chiGoc - 2, 6) * 2;
  const than = (chiGoc, chi) => { const [ten, hoang] = THAN[mod(chi - khoiThanhLong(chiGoc), 12)]; return { ten, hoangDao: !!hoang }; };
  const thanNgay = (chiThang, chiNgay) => than(chiThang, chiNgay);
  const gioHoangDao = chiNgay => [0,1,2,3,4,5,6,7,8,9,10,11].map(g => Object.assign({ chi: g }, than(chiNgay, g)));
  // --- Tiểu lục nhâm (Ngọc hạp ký, phần tạp chiêm [V có trong nguồn]): từ Đại An đếm tháng âm, rồi ngày âm, rồi giờ.
  const LUC_NHAM = [["Đại An","tốt","yên ổn, chậm mà chắc"],["Lưu Liên","xấu","dây dưa, chậm trễ"],["Tốc Hỷ","tốt","tin vui đến nhanh"],["Xích Khẩu","xấu","cãi vã, thị phi"],["Tiểu Cát","tốt","thuận lợi vừa phải"],["Không Vong","xấu","hư không, mất mát"]];
  const lucNham = (thangAm, ngayAm, chiGio) => { const [ten, loai, y] = LUC_NHAM[mod(thangAm - 1 + ngayAm - 1 + chiGio, 6)]; return { ten, loai, y }; };
  // --- Nhị thập bát tú: chu kỳ 28 ngày liên tục, ứng với tuần 7 ngày (Chủ nhật: Phòng, Hư, Mão, Tinh). Cát hung từng sao theo Ngọc hạp ký, phần lý luận [I, tóm lược].
  const TU28 = [
    ["Giác","角","Mộc","Thứ năm","tốt"],["Cang","亢","Kim","Thứ sáu","xấu"],["Đê","氐","Thổ","Thứ bảy","xấu"],["Phòng","房","Nhật","Chủ nhật","tốt"],["Tâm","心","Nguyệt","Thứ hai","xấu"],["Vĩ","尾","Hỏa","Thứ ba","tốt"],["Cơ","箕","Thủy","Thứ tư","tốt"],
    ["Đẩu","斗","Mộc","Thứ năm","tốt"],["Ngưu","牛","Kim","Thứ sáu","xấu"],["Nữ","女","Thổ","Thứ bảy","xấu"],["Hư","虛","Nhật","Chủ nhật","xấu"],["Nguy","危","Nguyệt","Thứ hai","xấu"],["Thất","室","Hỏa","Thứ ba","tốt"],["Bích","壁","Thủy","Thứ tư","tốt"],
    ["Khuê","奎","Mộc","Thứ năm","xấu"],["Lâu","婁","Kim","Thứ sáu","tốt"],["Vị","胃","Thổ","Thứ bảy","tốt"],["Mão","昴","Nhật","Chủ nhật","xấu"],["Tất","畢","Nguyệt","Thứ hai","tốt"],["Chủy","觜","Hỏa","Thứ ba","xấu"],["Sâm","參","Thủy","Thứ tư","xấu"],
    ["Tỉnh","井","Mộc","Thứ năm","tốt"],["Quỷ","鬼","Kim","Thứ sáu","xấu"],["Liễu","柳","Thổ","Thứ bảy","xấu"],["Tinh","星","Nhật","Chủ nhật","xấu"],["Trương","張","Nguyệt","Thứ hai","tốt"],["Dực","翼","Hỏa","Thứ ba","xấu"],["Chẩn","軫","Thủy","Thứ tư","tốt"]];
  function tu28(jd) {
    const m = CAU_HINH.moc28Tu; if (!m) return null;
    const jdMoc = LichAm.jdFromDate(...m.ngay), i = mod(jd - jdMoc + m.tu, 28), [ten, han, hanh, thu, loai] = TU28[i];
    return { ten, han, hanh, thu, loai };
  }
  // --- Các ngày kỵ theo âm lịch (dân gian Việt Nam; Hiệp kỷ Q36 không nhận Dương công, Q6 có mục Nguyệt kỵ) [I]
  const TAM_NUONG = [3, 7, 13, 18, 22, 27], NGUYET_KY = [5, 14, 23];
  const DUONG_CONG = {1:[13],2:[11],3:[9],4:[7],5:[5],6:[3],7:[1,29],8:[27],9:[25],10:[23],11:[21],12:[19]};
  // --- Thiên đức, Nguyệt đức theo tháng tiết. Hiệp kỷ Q4 Thiên đức: 正丁二坤宮，三壬四辛同，五乾六甲上，七癸八艮逢，九丙十居乙，子巽丑庚中 (Khôn = Thân, Càn = Hợi, Cấn = Dần, Tốn = Tỵ).
  // Nguyệt đức: 寅午戌月在丙，申子辰月在壬，亥卯未月在甲，巳酉丑月在庚. Nhãn [V] khi nguon/hiep-ky-q4.txt đã tải và tool kiểm dò thấy, nếu không là [I].
  const THIEN_DUC = {2:{can:3},3:{chi:8},4:{can:8},5:{can:7},6:{chi:11},7:{can:0},8:{can:9},9:{chi:2},10:{can:2},11:{can:1},0:{chi:5},1:{can:6}};
  const NGUYET_DUC = [8, 6, 2, 0]; // theo chiThang % 4: Tý Thìn Thân → Nhâm(8); Sửu Tỵ Dậu → Canh(6); Dần Ngọ Tuất → Bính(2); Mão Mùi Hợi → Giáp(0)
  const thienDuc = (chiThang, canNgay, chiNgay) => { const t = THIEN_DUC[chiThang]; return t.can !== undefined ? t.can === canNgay : t.chi === chiNgay; };
  const nguyetDuc = (chiThang, canNgay) => NGUYET_DUC[chiThang % 4] === canNgay;
  // --- Năm với tuổi gia chủ (quy ước Việt Nam, [I] nhiều phái lệch nhau; tuổi mụ = năm âm lịch đang xét − năm sinh + 1)
  // Kim lâu: tuổi mụ chia 9 dư 1, 3, 6, 8 (Kim lâu thân, thê, tử, lục súc) — kỵ cưới hỏi, làm nhà.
  // Hoang ốc: từ tuổi 10 khởi Nhất cát, mỗi hàng chục lùi một cung (20 Nhì nghi, 30 Tam địa sát…), hàng đơn vị đếm tiếp; xấu ở Tam địa sát, Ngũ thọ tử, Lục hoang ốc — kỵ làm nhà.
  // Tam tai: tuổi Thân Tý Thìn gặp năm Dần Mão Thìn; Dần Ngọ Tuất gặp Thân Dậu Tuất; Tỵ Dậu Sửu gặp Hợi Tý Sửu; Hợi Mão Mùi gặp Tỵ Ngọ Mùi.
  const HOANG_OC = ["Nhất cát", "Nhì nghi", "Tam địa sát", "Tứ tấn tài", "Ngũ thọ tử", "Lục hoang ốc"];
  const KIM_LAU = {1: "Kim lâu thân", 3: "Kim lâu thê", 6: "Kim lâu tử", 8: "Kim lâu lục súc"};
  function namVoiTuoi(namSinh, namAm) {
    const tuoiMu = namAm - namSinh + 1, kl = KIM_LAU[tuoiMu % 9] || null;
    const ho = tuoiMu >= 10 ? HOANG_OC[mod(Math.floor(tuoiMu / 10) - 1 + tuoiMu % 10, 6)] : null;
    const zT = CanChi.nam(namSinh) % 12, zNam = CanChi.nam(namAm) % 12;
    const tamTaiChi = [[2,3,4],[5,6,7],[8,9,10],[11,0,1]][[0,4,8].includes(zT) ? 0 : [3,7,11].includes(zT) ? 1 : [2,6,10].includes(zT) ? 2 : 3];
    return { tuoiMu, kimLau: kl, hoangOc: ho, hoangOcXau: !!ho && [2,4,5].includes(HOANG_OC.indexOf(ho)), tamTai: tamTaiChi.includes(zNam), tamTaiNam: tamTaiChi.map(i => CHI[i]).join(", ") };
  }
  // --- Quan hệ ngày với tuổi (năm sinh âm lịch)
  function voiTuoi(idxNgay, namSinh, namAm) {
    const t = CanChi.nam(namSinh), cN = idxNgay % 10, zN = idxNgay % 12, cT = t % 10, zT = t % 12, r = [];
    const xungChi = CanChi.xung(zN, zT), khacCan = KHAC[HANH_CAN[cN]] === HANH_CAN[cT] || KHAC[HANH_CAN[cT]] === HANH_CAN[cN];
    if (xungChi && khacCan) r.push("thiên khắc địa xung (xấu nặng)"); else if (xungChi) r.push("ngày xung tuổi");
    if (CanChi.hop(zN, zT)) r.push("lục hợp với tuổi"); if (CanChi.tamHop(zN, zT)) r.push("tam hợp với tuổi"); if (CanChi.hai(zN, zT)) r.push("lục hại với tuổi");
    const qh = NguHanh.quanHe(CanChi.hanhNapAm(t), CanChi.hanhNapAm(idxNgay));
    r.push(`nạp âm ngày ${CanChi.hanhNapAm(idxNgay)} ${qh === "sinh" ? "sinh" : qh === "khắc" ? "khắc" : qh === "được sinh" ? "được tuổi sinh (hao)" : qh === "bị khắc" ? "bị tuổi khắc" : "cùng hành với"} tuổi ${CanChi.hanhNapAm(t)}`);
    const nam = namAm ? namVoiTuoi(namSinh, namAm) : null;
    if (nam) { if (nam.kimLau) r.push(`năm nay tuổi ${nam.tuoiMu} phạm ${nam.kimLau}`); if (nam.hoangOcXau) r.push(`Hoang ốc: ${nam.hoangOc}`); if (nam.tamTai) r.push(`năm Tam tai (tuổi này tam tai các năm ${nam.tamTaiNam})`); }
    return { tuoi: CanChi.ten(t), xung: xungChi, khacCan, dong: r, nam };
  }
  // --- Tổng hợp một ngày. dt: Date giờ địa phương. Giờ Tý sau 23h sang ngày mới cho can chi ngày.
  function ngay(dt, namSinh) {
    let d = new Date(dt.getTime()); const gio = dt.getHours(), chiGio = CanChi.chiGioTuGio(gio);
    if (gio >= 23) d = new Date(d.getTime() + 86400000);
    const D = d.getDate(), M = d.getMonth() + 1, Y = d.getFullYear();
    const jd = LichAm.jdFromDate(D, M, Y), am = LichAm.solar2lunar(D, M, Y);
    const idxNgay = CanChi.ngay(jd), canNgay = idxNgay % 10, chiNgay = idxNgay % 12;
    const chiThangTiet = LichAm.chiThangTiet(D, M, Y, 12), chiThangAm = mod(am.thang + 1, 12);
    const chiThang = CAU_HINH.thangTheoTiet ? chiThangTiet : chiThangAm;
    // Năm can chi theo Lập xuân (tháng tiết Dần trở đi thuộc năm mới); năm âm lịch để hiển thị
    const namTiet = (M < 3 && chiThangTiet !== 2) ? Y - 1 : Y;
    const idxNam = CanChi.nam(namTiet), idxNamAm = CanChi.nam(am.nam);
    const idxThang = CanChi.thang(idxNam % 10, chiThangTiet);
    const tr = truc(chiNgay, chiThang), th = thanNgay(chiThang, chiNgay);
    const ky = [];
    if (TAM_NUONG.includes(am.ngay)) ky.push("Tam nương"); if (NGUYET_KY.includes(am.ngay)) ky.push("Nguyệt kỵ");
    if ((DUONG_CONG[am.thang] || []).includes(am.ngay)) ky.push("Dương công kỵ nhật");
    if (CanChi.xung(chiNgay, chiThang)) ky.push("Nguyệt phá");
    const tot = []; if (thienDuc(chiThang, canNgay, chiNgay)) tot.push("Thiên đức"); if (nguyetDuc(chiThang, canNgay)) tot.push("Nguyệt đức");
    // Chấm thô: thần hoàng đạo +2 / hắc đạo −1; trực hoàng +1, dùng được 0, hắc −1, xấu −2; mỗi ngày kỵ −2; Thiên đức, Nguyệt đức +1; sao tốt +1, xấu −1. Chỉ để xếp loại tham khảo.
    const sao = tu28(jd);
    let diem = (th.hoangDao ? 2 : -1) + ({hoàng:1,"dùng được":0,hắc:-1,xấu:-2})[TRUC_TOT[tr]] - 2 * ky.length + tot.length + (sao ? (sao.loai === "tốt" ? 1 : -1) : 0);
    const xepLoai = diem >= 3 ? "Tốt" : diem <= -2 ? "Xấu" : "Bình thường";
    return { duong: [D, M, Y], am, jd, gioHienTai: chiGio,
      namTiet: CanChi.ten(idxNam), namAm: CanChi.ten(idxNamAm), thang: CanChi.ten(idxThang), chiThangTiet, chiThangAm, chiThangDung: chiThang,
      idxNgay, ngayCanChi: CanChi.ten(idxNgay), napAm: CanChi.napAm(idxNgay), tuanKhong: CanChi.tuanKhong(idxNgay).map(i => CHI[i]),
      truc: tr, trucLoai: TRUC_TOT[tr], than: th, sao, ky, tot,
      gioHD: gioHoangDao(chiNgay), lucNham: [0,1,2,3,4,5,6,7,8,9,10,11].map(g => Object.assign({ chi: g }, lucNham(am.thang, am.ngay, g))),
      canChiGio: [0,1,2,3,4,5,6,7,8,9,10,11].map(g => CanChi.ten(CanChi.gio(canNgay, g))),
      tuoi: namSinh ? voiTuoi(idxNgay, namSinh, am.nam) : null, diem, xepLoai };
  }
  // --- Thần sát theo Hiệp kỷ (data/than-sat.js, window.XN_THAN_SAT) và xét theo việc.
  // Mỗi thần sát có dinhNghia máy tính được; ngày nào có thần sát nào thì gom lại, rồi với việc đã chọn: cát thần có "nên" việc ấy cộng, hung thần "kỵ" việc ấy trừ.
  // Nguyên tắc sách (quyển 10): không phải hễ gặp một hung sát là bỏ cả ngày, phải xem nặng nhẹ và cát thần nhiều hay hung thần nhiều.
  const DATA = () => (typeof window !== "undefined" && window.XN_THAN_SAT) || null;
  function coThanSat(ts, r) {
    const d = ts.dinhNghia, chiT = r.chiThangDung, canN = r.idxNgay % 10, chiN = r.idxNgay % 12;
    if (!d) return false;
    switch (d.kieu) {
      case "thang-chi": return (d.bang[chiT] || []).includes(chiN);
      case "thang-can": return (d.bang[chiT] || []).includes(canN);
      case "thang-can-hoac-chi": return (d.bangCan[chiT] || []).includes(canN) || (d.bangChi[chiT] || []).includes(chiN);
      case "thang-canchi": return (d.bang[chiT] || []).includes(r.idxNgay);
      case "truc": return r.truc === d.truc;
      case "hoang-dao": return r.than.ten === d.than;
      case "ngay-canchi": return d.ds.includes(r.idxNgay);
      case "ngay-can": return d.ds.includes(canN);
      case "ngay-chi": return d.ds.includes(chiN);
      case "am-lich": return d.ngay.includes(r.am.ngay) && (!d.thang || d.thang.includes(r.am.thang));
      default: return false;
    }
  }
  function thanSatNgay(r) { const D = DATA(); return D ? D.thanSat.filter(ts => coThanSat(ts, r)) : []; }
  function xetViec(r, maViec) {
    const D = DATA(); if (!D) return null;
    const v = D.viec.find(x => x.ma === maViec); if (!v) return null;
    const co = thanSatNgay(r);
    const kyCua = ts => ts.kyNhu ? ((D.thanSat.find(x => x.ma === ts.kyNhu) || {}).ky || []) : (ts.ky || []);   // "忌同劫煞": kỵ như thần sát khác
    const nen = co.filter(ts => (ts.nen || []).includes(maViec)), ky = co.filter(ts => kyCua(ts).includes(maViec));
    const hanChe = co.filter(ts => ts.chiChu && !(ts.nen || []).includes(maViec));   // ngày "止註": sách chỉ ghi nên vài việc, việc khác không ghi
    const catKhac = co.filter(ts => ts.loai === "cát" && !nen.includes(ts)), hungKhac = co.filter(ts => ts.loai === "hung" && !ky.includes(ts));
    let diem = nen.length * 2 - ky.length * 2 - hanChe.length + catKhac.length * 0.5 - hungKhac.length * 0.5;
    const ketLuan = ky.length === 0 && hanChe.length === 0 && nen.length >= 1 ? "Nên" : ky.length >= 2 || (ky.length === 1 && nen.length === 0) ? "Không nên" : nen.length > ky.length ? "Dùng được, có điều kỵ nhẹ" : "Bình thường";
    return { viec: v, nen, ky, hanChe, catKhac, hungKhac, diem, ketLuan };
  }
  // Bảng cả tháng dương lịch
  function thang(M, Y, namSinh) {
    const n = new Date(Y, M, 0).getDate(), rows = [];
    for (let D = 1; D <= n; D++) rows.push(ngay(new Date(Y, M - 1, D, 12), namSinh));
    return rows;
  }
  return { CAU_HINH, TRUC, TRUC_TOT, THAN, LUC_NHAM, TU28, HOANG_OC, truc, thanNgay, gioHoangDao, lucNham, tu28, thienDuc, nguyetDuc, namVoiTuoi, voiTuoi, coThanSat, thanSatNgay, xetViec, ngay, thang };
})();
if (typeof window !== "undefined") window.XemNgay = XemNgay;
