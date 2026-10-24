// Thời vận — các tầng thời gian lồng nhau của một thời điểm, chỉ phần TÍNH (nhãn [V]); phần luận ở chương N11.
// Nạp sau app.js, mai-hoa.js, data/hckt.js (dùng HEX, VI, HCKT, CuuCung, CanChi, LichAm, thongTinThoiGian, maiHoaSo, hexPage, esc, $).
// Tầng: Hội – Vận – Thế (Hoàng cực kinh thế, chu kỳ 10.800 / 360 / 30 năm) → Tam nguyên cửu vận (20 năm) và sao năm, sao tháng (cửu cung)
//       → quẻ tiêu tức của tháng tiết khí (12 quẻ, N5) → can chi, nạp âm năm tháng ngày → quẻ ngày giờ lập theo Mai Hoa thời gian.
"use strict";
const ThoiVan = (() => {
  // 12 quẻ tiêu tức theo chi tháng tiết khí (0 = Tý): Phục Lâm Thái Đại Tráng Quải Càn Cấu Độn Bĩ Quan Bác Khôn (cùng bảng với Hội trong hckt.js)
  const TIEU_TUC = [24, 19, 11, 34, 43, 1, 44, 33, 12, 20, 23, 2];
  const AM_DUONG = ["1 dương sinh", "2 dương", "3 dương (xuân về)", "4 dương", "5 dương", "6 dương (cực thịnh)", "1 âm sinh", "2 âm", "3 âm (thu sang)", "4 âm", "5 âm", "6 âm (cực hàn)"];
  function tang(dt) {
    const t = thongTinThoiGian(dt);                 // giờ Tý sau 23h đã sang ngày mới; am, chiGio, zNam, ccNam/ccThang/ccNgay/ccGio
    const d = dt.getHours() >= 23 ? new Date(dt.getTime() + 86400000) : dt;
    const D = d.getDate(), M = d.getMonth() + 1, Y = d.getFullYear();
    const chiThangTiet = LichAm.chiThangTiet(D, M, Y, 12);
    const namTiet = (M < 3 && chiThangTiet !== 2) ? Y - 1 : Y;      // năm theo Lập xuân cho cửu vận, sao năm
    const h = HCKT.info(namTiet), v = CuuCung.van(namTiet), saoNam = CuuCung.nienTinh(namTiet);
    const saoThang = CuuCung.nguyetTinh(CanChi.nam(namTiet) % 12, chiThangTiet);
    const queThang = TIEU_TUC[chiThangTiet];
    const q = maiHoaSo(t.zNam + 1, t.am.thang, t.am.ngay, t.chiGio + 1);
    const jd = LichAm.jdFromDate(D, M, Y), idxNgay = CanChi.ngay(jd), idxNam = CanChi.nam(t.am.nam);
    return { dt, D, M, Y, am: t.am, t, namTiet, chiThangTiet, h, v, saoNam, saoThang, queThang, amDuongThang: AM_DUONG[chiThangTiet], q,
      napAmNam: CanChi.napAm(idxNam), napAmNgay: CanChi.napAm(idxNgay) };
  }
  const tuong = n => { const x = VI[n]; return x ? `<b>${x.tk}</b> Lời quẻ: ${x.tu.dich} Tượng: ${x.tuong.dich}` : ""; };
  const tenQue = n => `${HEX[n].ch} ${n}. ${HEX[n].name}`;
  function hien(dt) {
    const r = tang(dt), h = r.h, v = r.v;
    const que = (n, nhan) => `<a href="#" onclick="go('q${n}');return false">${tenQue(n)}</a>${nhan ? ` <span class="mute">(${nhan})</span>` : ""}`;
    return `<div class="card"><h2>⏳ Thời vận của ${r.D}/${r.M}/${r.Y}, ${String(r.dt.getHours()).padStart(2,"0")}:${String(r.dt.getMinutes()).padStart(2,"0")}</h2>
     <p>Âm lịch: ngày ${r.am.ngay} tháng ${r.am.thang}${r.am.nhuan ? " nhuận" : ""} năm <b>${r.t.ccNam}</b> (${r.napAmNam}) · tháng ${r.t.ccThang} · ngày <b>${r.t.ccNgay}</b> (${r.napAmNgay}) · giờ ${r.t.ccGio} · tháng tiết khí: <b>${CHI[r.chiThangTiet]}</b></p>
     <table class="tb"><tr><th style="width:21%">Tầng</th><th style="width:27%">Đang ở đâu</th><th>Tượng để đọc (lấy từ chính lời quẻ đã có trong sách)</th></tr>
     <tr><td><b>Hội</b> (10.800 năm)</td><td>${h.tenHoi}, ${h.hoiTu} – ${h.hoiDen}<br>quẻ ${que(h.queHoi[0])}</td><td>${tuong(h.queHoi[0])}</td></tr>
     <tr><td><b>Vận</b> (360 năm)</td><td>${h.tenVan}, vận thứ ${h.vanTrongHoi}/30 của hội, ${h.vanTu} – ${h.vanDen}</td><td class="mute">Hoàng cực kinh thế không phối quẻ thống nhất cho cấp Vận, Thế (N9 mục 5); chỉ ghi vị trí.</td></tr>
     <tr><td><b>Thế</b> (30 năm)</td><td>${h.tenThe}, năm thứ ${h.namTrongThe}/30, ${h.theTu} – ${h.theDen}</td><td class="mute">Một đời người nằm gọn trong hai, ba Thế; năm thứ ${h.namTrongThe} là ${h.namTrongThe <= 10 ? "đầu" : h.namTrongThe <= 20 ? "giữa" : "cuối"} Thế.</td></tr>
     <tr><td><b>Vận 20 năm</b> (Tam nguyên cửu vận)</td><td>${v.nguyen} nguyên, vận ${v.van} (${v.tu}–${v.den}), quái ${v.que}; năm thứ ${r.namTiet - v.tu + 1}/20</td><td>${(() => { const m = /\((\d+)\)/.exec(v.que); return m ? tuong(+m[1]) : ""; })()}</td></tr>
     <tr><td><b>Năm</b> (sao năm)</td><td>${r.namTiet}: niên tinh <b>${r.saoNam} – ${SAO[r.saoNam]}</b> nhập trung cung</td><td class="mute">Sao năm dùng trong phong thủy phi tinh (thẻ Phong thủy); đọc cùng vận 20 năm: sao đương vận là ${v.van}, sao ${r.saoNam} ${r.saoNam === v.van ? "trùng vận: năm đương lệnh" : "khác vận"}.</td></tr>
     <tr><td><b>Tháng</b> (tiết khí)</td><td>tháng ${CHI[r.chiThangTiet]}: quẻ tiêu tức ${que(r.queThang, r.amDuongThang)}; sao tháng ${r.saoThang} – ${SAO[r.saoThang]}</td><td>${tuong(r.queThang)}</td></tr>
     <tr><td><b>Ngày giờ</b> (Mai Hoa thời gian)</td><td>quẻ ${que(r.q.chu)} → biến ${que(r.q.bien)}, hào ${r.q.dong} động; hỗ ${que(r.q.ho)}</td><td>${tuong(r.q.chu)}</td></tr></table>
     <div class="rule">📌 <b>Cách đọc</b>: tầng dài chi phối tầng ngắn. Hội và Vận cho biết khí hậu chung của thời đại (không đổi trong đời người); vận 20 năm và sao năm cho biết "mùa" của một thế hệ; quẻ tháng cho nhịp âm dương trong năm; quẻ ngày giờ chỉ là việc trong ngày. Đọc thẻ này như đọc bản đồ địa hình, không phải lời tiên tri. Phương pháp và bài luận: chương N11.</div>
     <p class="mute">Mọi con số ở đây là phép tính từ lịch (nhãn [V]); nghĩa của quẻ chỉ là tượng để suy ngẫm. Năm theo Lập xuân cho Hội Vận Thế, cửu vận, sao năm; năm âm lịch cho can chi.</p></div>`;
  }
  return { TIEU_TUC, tang, hien };
})();
$("#btnTV").onclick = () => { const v = $("#tvDT").value, m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(v || ""); $("#kqTV").innerHTML = ThoiVan.hien(m ? new Date(+m[1], +m[2]-1, +m[3], +m[4], +m[5]) : new Date()); };
$("#btnTVNay").onclick = () => { const n = new Date(), p = x => String(x).padStart(2, "0"); $("#tvDT").value = `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}`; $("#kqTV").innerHTML = ThoiVan.hien(n); };
