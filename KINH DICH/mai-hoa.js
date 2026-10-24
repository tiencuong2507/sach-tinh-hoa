// Mai Hoa Dịch Số (梅花易數) – lập quẻ theo thời gian và theo số.
// Cần nạp sau lich-am.js và app.js (dùng HEX, BY, hexPage, esc, $, CAN, CHI).
// Phép tính theo phần "年月日時起例" của sách Mai Hoa Dịch Số (tương truyền của Thiệu Ung):
//   (số chi năm + tháng âm + ngày âm) chia 8 lấy dư → thượng quái;
//   (tổng trên + số chi giờ) chia 8 lấy dư → hạ quái; tổng đó chia 6 lấy dư → hào động (dư 0 tính 8 / 6).
"use strict";
const TIEN_THIEN = {1:"111",2:"110",3:"101",4:"100",5:"011",6:"010",7:"001",8:"000"}; // Càn1 Đoài2 Ly3 Chấn4 Tốn5 Khảm6 Cấn7 Khôn8
const HANH_QUAI = {"111":"Kim","110":"Kim","101":"Hỏa","100":"Mộc","011":"Mộc","010":"Thủy","001":"Thổ","000":"Thổ"};
const SINH = {Mộc:"Hỏa",Hỏa:"Thổ",Thổ:"Kim",Kim:"Thủy",Thủy:"Mộc"};
const KHAC = {Mộc:"Thổ",Thổ:"Thủy",Thủy:"Hỏa",Hỏa:"Kim",Kim:"Mộc"};
const mh_mod = (a,m) => ((a % m) + m) % m;
const du = (a,m) => mh_mod(a,m) || m;

function quanHe(the, x) {            // quan hệ của một quái (x) đối với quái Thể
  if (the === x) return {t:"Tỷ hòa", k:"cát", g:"cùng hành với Thể: thuận, có người đồng lòng"};
  if (SINH[x] === the) return {t:`${x} sinh ${the} – sinh Thể`, k:"cát", g:"được giúp, có lợi, việc dễ thành"};
  if (KHAC[the] === x) return {t:`${the} khắc ${x} – Thể khắc`, k:"cát", g:"mình chế ngự được việc, thành nhưng tốn sức"};
  if (SINH[the] === x) return {t:`${the} sinh ${x} – Thể sinh ra`, k:"hung nhẹ", g:"hao tổn, mình phải bỏ công sức, tiền của"};
  return {t:`${x} khắc ${the} – khắc Thể`, k:"hung", g:"bị cản trở, bất lợi, nên thận trọng"};
}
function vuongSuy(hanh, thang) {     // hành của Thể theo mùa (tháng âm lịch)
  const mua = thang<=3 ? "Mộc" : thang<=6 ? "Hỏa" : thang<=9 ? "Kim" : "Thủy";
  const tuQuy = thang % 3 === 0;
  if (hanh === mua || (hanh === "Thổ" && tuQuy)) return "vượng (đúng mùa)";
  if (SINH[mua] === hanh) return "tướng (được mùa sinh)";
  if (SINH[hanh] === mua) return "hưu (đang sinh cho mùa)";
  if (KHAC[hanh] === mua) return "tù (khắc mùa)";
  return "tử (bị mùa khắc)";
}

// Lập quẻ từ số thượng quái, hạ quái, hào động (1–6)
function maiHoaQue(trenN, duoiN, dong) {
  const tren = TIEN_THIEN[trenN], duoi = TIEN_THIEN[duoiN], lines = duoi + tren;
  const bienL = lines.slice(0,dong-1) + (lines[dong-1]==="1"?"0":"1") + lines.slice(dong);
  const hoL = lines.slice(1,4) + lines.slice(2,5);
  const dungDuoi = dong <= 3;          // hào động ở hạ quái thì hạ quái là Dụng
  const theQ = dungDuoi ? tren : duoi, dungQ = dungDuoi ? duoi : tren;
  const bienDung = dungDuoi ? bienL.slice(0,3) : bienL.slice(3);
  return {trenN, duoiN, dong, chu:BY[lines], bien:BY[bienL], ho:BY[hoL], lines,
    theQ, dungQ, hoTren:hoL.slice(3), hoDuoi:hoL.slice(0,3), bienDung, theTren:!dungDuoi};
}
// Lập quẻ theo số năm–tháng–ngày–giờ (đã quy về số)
function maiHoaSo(Y, M, D, H) {
  const s1 = Y + M + D, s2 = s1 + H;
  return Object.assign(maiHoaQue(du(s1,8), du(s2,8), du(s2,6)), {s1, s2});
}

function tenQuai(b) { const t = TRI[b]; return `${t.s} ${t.n} (${t.t}, ${HANH_QUAI[b]})`; }
function bangTheDung(q, thang) {
  const the = HANH_QUAI[q.theQ], rows = [
    ["Dụng – hiện trạng, đối tượng", q.dungQ], ["Hỗ " + (q.theTren?"hạ":"thượng") + " – diễn biến", q.theTren?q.hoDuoi:q.hoTren],
    ["Hỗ " + (q.theTren?"thượng":"hạ") + " – diễn biến", q.theTren?q.hoTren:q.hoDuoi], ["Biến – kết cục", q.bienDung]];
  let s = `<table class="tb"><tr><th>Vai trò</th><th>Quái</th><th>Quan hệ với Thể</th><th>Ý nghĩa</th></tr>
    <tr><td><b>Thể – bản thân, người hỏi</b></td><td>${tenQuai(q.theQ)}</td><td colspan="2">Hành ${the}${thang?` · theo tháng ${thang}: ${vuongSuy(the,thang)}`:""}</td></tr>`;
  let diem = 0;
  for (const [ten, b] of rows) { const r = quanHe(the, HANH_QUAI[b]); diem += r.k==="cát"?1:r.k==="hung"?-1:-0.5;
    s += `<tr><td>${ten}</td><td>${tenQuai(b)}</td><td>${r.t} <span class="tag">${r.k}</span></td><td>${r.g}</td></tr>`; }
  const ket = diem >= 2 ? "Phần lớn sinh/phù Thể: xu hướng thuận lợi." : diem <= -2 ? "Phần lớn khắc/tiết Thể: xu hướng trở ngại, nên chờ hoặc đổi cách làm."
    : "Cát hung đan xen: xem kỹ quái Biến (kết cục) và lời hào động.";
  return s + `</table><p><span class="tag">Tổng hợp</span> ${ket}</p>`;
}
function hienMaiHoa(q, dau, thang, hoi) {
  const h = HEX;
  return `<div class="card">${hoi?`<p><b>Hỏi:</b> ${esc(hoi)}</p>`:""}${dau}
   <p>Thượng quái: <b>${tenQuai(TIEN_THIEN[q.trenN])}</b> (số ${q.trenN}) · Hạ quái: <b>${tenQuai(TIEN_THIEN[q.duoiN])}</b> (số ${q.duoiN}) · Hào động: <b>${q.dong}</b></p>
   <p>Quẻ chủ <b>${h[q.chu].ch} ${q.chu}. ${h[q.chu].name}</b> → quẻ hỗ ${h[q.ho].ch} ${q.ho}. ${h[q.ho].short} → quẻ biến <b>${h[q.bien].ch} ${q.bien}. ${h[q.bien].name}</b></p>
   <h3>Thể – Dụng (ngũ hành sinh khắc)</h3>
   <p class="mute">Quái có hào động là <b>Dụng</b> (sự việc), quái còn lại là <b>Thể</b> (mình). Xét Dụng, hai quái hỗ và quái biến sinh hay khắc Thể.</p>
   ${bangTheDung(q, thang)}
   <div class="rule">📌 <b>Cách đọc:</b> Lời <b>hào ${q.dong}</b> của quẻ chủ là trọng tâm (tô đỏ bên dưới); quẻ hỗ cho thấy diễn biến giữa chừng, quẻ biến cho thấy kết cục. Phép Thể–Dụng là của Mai Hoa, không có trong kinh văn Chu Dịch.</div></div>`
   + hexPage(q.chu, {mv:[q.dong-1], focus:["h"+(q.dong-1)], label:"Quẻ chủ"})
   + hexPage(q.ho, {focus:["__"], label:"Quẻ hỗ"})
   + hexPage(q.bien, {focus:["tu"], label:"Quẻ biến"});
}

// ---- Lập theo ngày giờ ----
function thongTinThoiGian(dt) {        // dt: Date (giờ địa phương VN)
  let d = new Date(dt.getTime());
  const gio = dt.getHours(), chiGio = Math.floor((gio + 1) / 2) % 12;
  if (gio >= 23) d = new Date(d.getTime() + 86400000);   // giờ Tý từ 23h tính sang ngày hôm sau
  const am = LichAm.solar2lunar(d.getDate(), d.getMonth()+1, d.getFullYear());
  const jd = LichAm.jdFromDate(d.getDate(), d.getMonth()+1, d.getFullYear());
  const cNam = mh_mod(am.nam-4,10), zNam = mh_mod(am.nam-4,12), cNgay = mh_mod(jd+9,10), zNgay = mh_mod(jd+1,12);
  return {am, chiGio, zNam, sang: gio >= 23,
    ccNam:`${CAN[cNam]} ${CHI[zNam]}`, ccThang:`${CAN[mh_mod(cNam*2+1+am.thang,10)]} ${CHI[mh_mod(am.thang+1,12)]}`,
    ccNgay:`${CAN[cNgay]} ${CHI[zNgay]}`, ccGio:`${CAN[mh_mod(cNgay*2+chiGio,10)]} ${CHI[chiGio]}`};
}
function docThoiGian() {
  const v = $("#mhDT").value, m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(v || "");
  return m ? new Date(+m[1], +m[2]-1, +m[3], +m[4], +m[5]) : new Date();
}
function lapMaiHoaNgay() {
  const dt = docThoiGian(), t = thongTinThoiGian(dt);
  const Y = t.zNam + 1, M = t.am.thang, D = t.am.ngay, H = t.chiGio + 1, q = maiHoaSo(Y, M, D, H);
  const dau = `<p>Dương lịch: ${dt.toLocaleString("vi-VN")} → Âm lịch: <b>ngày ${D} tháng ${M}${t.am.nhuan?" (nhuận)":""} năm ${t.ccNam}</b>, giờ ${CHI[t.chiGio]}
   ${t.sang?'<br><span class="mute">Sau 23h là giờ Tý của ngày hôm sau nên lấy ngày âm hôm sau.</span>':""}</p>
   <p class="mute">Bát tự: năm ${t.ccNam} · tháng ${t.ccThang} · ngày ${t.ccNgay} · giờ ${t.ccGio}</p>
   <table class="tb"><tr><th>Năm (chi ${CHI[t.zNam]})</th><th>Tháng</th><th>Ngày</th><th>Giờ (${CHI[t.chiGio]})</th><th>Thượng quái</th><th>Hạ quái</th><th>Hào động</th></tr>
   <tr><td>${Y}</td><td>${M}</td><td>${D}</td><td>${H}</td><td>${Y}+${M}+${D} = ${q.s1}; ${q.s1} chia 8 dư ${q.s1%8} → ${q.trenN}</td>
   <td>${q.s1}+${H} = ${q.s2}; chia 8 dư ${q.s2%8} → ${q.duoiN}</td><td>${q.s2} chia 6 dư ${q.s2%6} → ${q.dong}</td></tr></table>`;
  $("#kqMH").innerHTML = hienMaiHoa(q, dau, M, $("#mhHoi").value);
}
// ---- Lập theo số (hai số do người hỏi nghĩ ra, đếm được…) ----
function lapMaiHoaSo() {
  const a = parseInt($("#mhA").value,10), b = parseInt($("#mhB").value,10);
  if (!(a > 0) || !(b > 0)) { $("#kqMH").innerHTML = `<div class="card">Hãy nhập hai số nguyên dương.</div>`; return; }
  const t = thongTinThoiGian(docThoiGian()), H = $("#mhGio").checked ? t.chiGio + 1 : 0;
  const q = maiHoaQue(du(a,8), du(b,8), du(a+b+H,6));
  const dau = `<p>Số trước <b>${a}</b> chia 8 dư ${a%8} → thượng quái ${q.trenN}; số sau <b>${b}</b> chia 8 dư ${b%8} → hạ quái ${q.duoiN};
    (${a} + ${b}${H?` + giờ ${CHI[t.chiGio]} ${H}`:""}) = ${a+b+H}, chia 6 dư ${(a+b+H)%6} → hào động ${q.dong}.</p>`;
  $("#kqMH").innerHTML = hienMaiHoa(q, dau, t.am.thang, $("#mhHoi").value);
}
{ const n = new Date(), p = x => String(x).padStart(2,"0");
  $("#mhDT").value = `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}`; }
$("#btnMHNgay").onclick = lapMaiHoaNgay;
$("#btnMHSo").onclick = lapMaiHoaSo;
$("#btnMHBayGio").onclick = () => { const n = new Date(), p = x => String(x).padStart(2,"0");
  $("#mhDT").value = `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}`; lapMaiHoaNgay(); };
