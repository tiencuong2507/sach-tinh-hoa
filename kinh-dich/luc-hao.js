// Bói Lục hào (Nạp giáp, Hỏa châu lâm) – an quẻ và trình bày để luận.
// Nạp sau app.js và mai-hoa.js (dùng HEX, BY, TRI, CAN, CHI, HANH_CHI, toss, hexPage, esc, $, HANH_QUAI, SINH, KHAC, LichAm).
// Phép an quẻ đối chiếu với Tăng san bốc dịch (增刪卜易, Wikisource, lưu ở nguon/luc-hao):
//  - Nạp giáp: "乾金甲子外壬午，坤土乙未加癸丑，震木庚子庚午臨，巽木辛丑並辛未，坎水戊寅外戊申，離火己卯己酉尋，艮土丙辰外丙戌，兌金丁巳丁亥憑"
//  - Bát cung, thế ứng: "八純卦自初爻續變至五爻、返變四爻成遊魂卦、內卦再變八純成歸魂卦 … 八純卦世在六爻，歸魂卦世在三爻，其餘 … 世在變動之爻。應世隔二爻"
//  - Lục thân (chương 5): sinh ta là Phụ mẫu, ta sinh là Tử tôn, khắc ta là Quan quỷ, ta khắc là Thê tài, đồng hành là Huynh đệ; hào biến vẫn lấy hành cung của quẻ chủ
//  - Lục thần: "甲乙起青龍，丙丁起朱雀，戊日起勾陳，己日起螣蛇，庚辛起白虎，壬癸起元武"
"use strict";
const LucHao = (() => {
  // Nạp giáp: [can trong, can ngoài], [chi 3 hào trong], [chi 3 hào ngoài] – chỉ số chi 0=Tý … 11=Hợi
  const NG = {
    "111": {can:[0,8], trong:[0,2,4],  ngoai:[6,8,10]},   // Càn: Giáp/Nhâm · Tý Dần Thìn | Ngọ Thân Tuất
    "100": {can:[6,6], trong:[0,2,4],  ngoai:[6,8,10]},   // Chấn: Canh
    "010": {can:[4,4], trong:[2,4,6],  ngoai:[8,10,0]},   // Khảm: Mậu
    "001": {can:[2,2], trong:[4,6,8],  ngoai:[10,0,2]},   // Cấn: Bính
    "000": {can:[1,9], trong:[7,5,3],  ngoai:[1,11,9]},   // Khôn: Ất/Quý · Mùi Tỵ Mão | Sửu Hợi Dậu
    "011": {can:[7,7], trong:[1,11,9], ngoai:[7,5,3]},    // Tốn: Tân
    "101": {can:[5,5], trong:[3,1,11], ngoai:[9,7,5]},    // Ly: Kỷ
    "110": {can:[3,3], trong:[5,3,1],  ngoai:[11,9,7]}};  // Đoài: Đinh
  const THU = ["Thanh Long","Chu Tước","Câu Trần","Đằng Xà","Bạch Hổ","Huyền Vũ"];
  const THU_KHOI = [0,0,1,1,2,3,4,4,5,5];                  // theo can ngày: Giáp Ất → Thanh Long …
  const LOAI = ["Bát thuần","Nhất thế","Nhị thế","Tam thế","Tứ thế","Ngũ thế","Du hồn","Quy hồn"];
  const THE = [6,1,2,3,4,5,4,3];
  const lat = (s, idx) => s.split("").map((c,i) => idx.includes(i) ? (c==="1"?"0":"1") : c).join("");
  // Bảng bát cung: lines → {cung (bit quái), loai, the, ung}
  const CUNG = {};
  for (const p of ["111","010","001","100","011","101","000","110"]) {   // Càn Khảm Cấn Chấn Tốn Ly Khôn Đoài
    const q = [p + p]; for (let k = 0; k < 5; k++) q.push(lat(q[q.length-1], [k]));
    q.push(lat(q[5], [3])); q.push(p + q[6].slice(3));
    q.forEach((L, i) => { const the = THE[i]; CUNG[L] = {cung:p, loai:LOAI[i], thuTu:i, the, ung: the > 3 ? the - 3 : the + 3}; });
  }
  function lucThan(hanhCung, h) {
    if (h === hanhCung) return "Huynh đệ";
    if (SINH[hanhCung] === h) return "Tử tôn";
    if (KHAC[hanhCung] === h) return "Thê tài";
    if (KHAC[h] === hanhCung) return "Quan quỷ";
    return "Phụ mẫu";
  }
  // Nạp giáp + lục thân cho 6 hào (hành cung có thể lấy từ quẻ khác – dùng cho quẻ biến)
  function napGiap(lines, hanhCung) {
    const duoi = lines.slice(0,3), tren = lines.slice(3);
    return [0,1,2,3,4,5].map(i => { const t = i < 3 ? NG[duoi] : NG[tren], chi = (i < 3 ? t.trong : t.ngoai)[i % 3];
      const hanh = HANH_CHI[chi]; return {chi, can: t.can[i < 3 ? 0 : 1], hanh, than: lucThan(hanhCung, hanh), duong: lines[i] === "1"}; });
  }
  // An quẻ đầy đủ từ 6 số 6/7/8/9 (hào 1 → 6)
  function anQue(vals, ngayIdx, thangChi) {
    const lines = vals.map(v => v % 2 ? "1" : "0").join("");
    const bienL = vals.map(v => v===6 ? "1" : v===9 ? "0" : v % 2 ? "1" : "0").join("");
    const dong = vals.map((v,i) => v===6||v===9 ? i : -1).filter(i => i >= 0);
    const c = CUNG[lines], hanhCung = HANH_QUAI[c.cung];
    const hao = napGiap(lines, hanhCung), bien = dong.length ? napGiap(bienL, hanhCung) : null;
    // Phục thần: lục thân vắng mặt thì lấy ở quẻ bát thuần của cung, cùng vị trí
    const coMat = new Set(hao.map(h => h.than)), thuan = napGiap(c.cung + c.cung, hanhCung);
    const phuc = thuan.map((h,i) => coMat.has(h.than) ? null : Object.assign({viTri:i}, h));
    const canNgay = ngayIdx % 10, chiNgay = ngayIdx % 12;
    const khong = CanChi.tuanKhong(ngayIdx);
    const thu = [0,1,2,3,4,5].map(i => THU[(THU_KHOI[canNgay] + i) % 6]);
    return {vals, lines, bienL, dong, cung:c, hanhCung, hao, bien, phuc, thu, khong, canNgay, chiNgay, thangChi,
      chu: BY[lines], queBien: dong.length ? BY[bienL] : null};
  }
  const xung = (a,b) => (a - b + 12) % 12 === 6;
  const hop = (a,b) => (a + b) % 12 === 1;
  function vuongSuyThang(hanh, thangChi) {
    const m = HANH_CHI[thangChi];
    if (hanh === m) return "vượng"; if (SINH[m] === hanh) return "tướng"; if (SINH[hanh] === m) return "hưu";
    if (KHAC[hanh] === m) return "tù"; return "tử";
  }
  // Trạng thái một hào (chi, hành) theo nhật – nguyệt – tuần không
  function trangThai(h, q, dangDong) {
    const ds = [], vs = vuongSuyThang(h.hanh, q.thangChi), hn = HANH_CHI[q.chiNgay];
    ds.push(`tháng: ${vs}`);
    if (xung(h.chi, q.thangChi)) ds.push("<b>nguyệt phá</b>");
    if (hn === h.hanh) ds.push("ngày phù"); else if (SINH[hn] === h.hanh) ds.push("ngày sinh"); else if (KHAC[hn] === h.hanh) ds.push("ngày khắc");
    if (xung(h.chi, q.chiNgay)) ds.push(dangDong ? "ngày xung" : (vs==="vượng"||vs==="tướng" ? "ám động (ngày xung hào vượng)" : "nhật phá (ngày xung hào suy)"));
    if (hop(h.chi, q.chiNgay)) ds.push("hợp ngày");
    if (q.khong.includes(h.chi)) ds.push("<b>tuần không</b>");
    return {ds, vs};
  }
  return {NG, CUNG, THU, anQue, napGiap, trangThai, xung, hop, vuongSuyThang, lucThan};
})();

// ---- Giao diện ----
const DUNG_THAN = {
  the: {ten:"Bản thân, việc chung (lấy hào Thế)", than:null},
  tai: {ten:"Tiền bạc, buôn bán, vợ (nam hỏi)", than:"Thê tài"},
  quan: {ten:"Công danh, việc làm, chồng (nữ hỏi), kiện tụng", than:"Quan quỷ"},
  phu: {ten:"Nhà cửa, giấy tờ, học hành, cha mẹ", than:"Phụ mẫu"},
  tu: {ten:"Con cái, khỏi bệnh, bình an, thuốc men", than:"Tử tôn"},
  huynh: {ten:"Anh em, bạn bè, đồng nghiệp", than:"Huynh đệ"}};
const LH_HANH_THAN = (hanhCung, than) => ["Mộc","Hỏa","Thổ","Kim","Thủy"].find(h => LucHao.lucThan(hanhCung, h) === than);

function lhThoiDiem() {
  const v = $("#lhDT").value, m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(v || "");
  const dt = m ? new Date(+m[1], +m[2]-1, +m[3], +m[4], +m[5]) : new Date();
  let d = new Date(dt.getTime()); if (dt.getHours() >= 23) d = new Date(d.getTime() + 86400000);  // giờ Tý sau 23h sang ngày mới
  const jd = LichAm.jdFromDate(d.getDate(), d.getMonth()+1, d.getFullYear());
  const ngayIdx = CanChi.ngay(jd);
  const thangChi = LichAm.chiThangTiet(dt.getDate(), dt.getMonth()+1, dt.getFullYear(), dt.getHours(), dt.getMinutes());
  return {dt, ngayIdx, thangChi};
}
function kyHieu(v) { return v===9 ? "⚊ ○" : v===6 ? "⚋ ✕" : v===7 ? "⚊" : "⚋"; }
const tenHao = h => `${h.than} ${CAN[h.can]} ${CHI[h.chi]} (${h.hanh})`;

function phanTichDung(q, key) {
  const dt = DUNG_THAN[key], hc = q.hanhCung;
  let viTri = [], than = dt.than, laPhuc = false;
  if (!than) { viTri = [q.cung.the - 1]; than = q.hao[q.cung.the - 1].than; }
  else { viTri = q.hao.map((h,i) => h.than === than ? i : -1).filter(i => i >= 0);
    if (!viTri.length) { laPhuc = true; viTri = q.phuc.map((p,i) => p && p.than === than ? i : -1).filter(i => i >= 0); } }
  const hanhDung = LH_HANH_THAN(hc, than), nguyen = ["Mộc","Hỏa","Thổ","Kim","Thủy"].find(h => SINH[h] === hanhDung), ky = ["Mộc","Hỏa","Thổ","Kim","Thủy"].find(h => KHAC[h] === hanhDung);
  let diem = 0; const ly = [];
  for (const i of viTri) {
    const h = laPhuc ? q.phuc[i] : q.hao[i], dong = !laPhuc && q.dong.includes(i), t = LucHao.trangThai(h, q, dong);
    if (t.vs === "vượng" || t.vs === "tướng") diem += 1; else diem -= 1;
    if (t.ds.some(x => x.includes("ngày sinh") || x.includes("ngày phù"))) diem += 1;
    if (t.ds.some(x => x.includes("ngày khắc"))) diem -= 1;
    if (t.ds.some(x => x.includes("nguyệt phá"))) diem -= 2;
    if (t.ds.some(x => x.includes("tuần không"))) { diem -= 1; ly.push(`${CHI[h.chi]} gặp tuần không: việc chưa tới, đợi ra khỏi tuần không (ngày ${CHI[h.chi]} hoặc ngày xung nó).`); }
    if (dong) { const b = q.bien[i];
      if (SINH[b.hanh] === h.hanh) { diem += 1; ly.push(`Hào dụng động hóa ${CHI[b.chi]} ${b.hanh} sinh lại (hồi đầu sinh): tốt.`); }
      if (KHAC[b.hanh] === h.hanh) { diem -= 2; ly.push(`Hào dụng động hóa ${CHI[b.chi]} ${b.hanh} khắc lại (hồi đầu khắc): xấu.`); } }
    ly.unshift(`Dụng thần ${laPhuc ? "(phục, ẩn dưới hào " + (i+1) + ")" : "ở hào " + (i+1)}: ${tenHao(h)} – ${t.ds.join(", ")}${dong?" · đang động":""}.`);
  }
  for (const i of q.dong) { if (viTri.includes(i) && !laPhuc) continue; const h = q.hao[i];
    if (h.hanh === nguyen) { diem += 1; ly.push(`Hào ${i+1} ${tenHao(h)} động sinh dụng thần (nguyên thần động): được giúp.`); }
    if (h.hanh === ky) { diem -= 1; ly.push(`Hào ${i+1} ${tenHao(h)} động khắc dụng thần (kỵ thần động): bị cản.`); } }
  if (laPhuc) ly.push("Dụng thần không hiện trên quẻ, phải tìm phục thần: việc còn ẩn, khó thấy ngay.");
  const ket = diem >= 2 ? "Dụng thần có lực, xu hướng thuận." : diem <= -2 ? "Dụng thần suy hoặc bị khắc, xu hướng trở ngại." : "Lực dụng thần trung bình, cát hung tùy ứng kỳ và cách làm.";
  return `<h3>Dụng thần: ${than} <span class="mute">(${dt.ten})</span></h3>
   <p>Hành dụng thần: <b>${hanhDung}</b> · Nguyên thần (sinh dụng): ${nguyen} · Kỵ thần (khắc dụng): ${ky}</p>
   <ul>${ly.map(x => `<li>${x}</li>`).join("")}</ul>
   <p><span class="tag">Gợi ý</span> ${ket} <span class="mute">(chấm điểm thô theo vượng suy, nhật nguyệt, động biến – chỉ để tham khảo, không thay việc luận.)</span></p>`;
}

function hienLucHao(vals, hoi, key) {
  const t = lhThoiDiem(), q = LucHao.anQue(vals, t.ngayIdx, t.thangChi), H = HEX;
  let s = `<div class="card">${hoi?`<p><b>Hỏi:</b> ${esc(hoi)}</p>`:""}
   <p>Thời điểm: ${t.dt.toLocaleString("vi-VN")} · Nguyệt kiến (theo tiết khí): <b>tháng ${CHI[t.thangChi]}</b> · Nhật thần: <b>ngày ${CAN[t.ngayIdx%10]} ${CHI[t.ngayIdx%12]}</b> · Tuần không: <b>${q.khong.map(i=>CHI[i]).join(", ")}</b></p>
   <p>Quẻ chủ <b>${H[q.chu].ch} ${q.chu}. ${H[q.chu].name}</b> – cung ${TRI[q.cung.cung].n} (${q.hanhCung}), ${q.cung.loai}, Thế hào ${q.cung.the}, Ứng hào ${q.cung.ung}
   ${q.queBien?` → quẻ biến <b>${H[q.queBien].ch} ${q.queBien}. ${H[q.queBien].name}</b>`:" · không có hào động (quẻ tĩnh)"}</p>
   <table class="tb"><tr><th>Hào</th><th>Lục thần</th><th>Phục thần</th><th>Quẻ chủ</th><th></th><th>Thế/Ứng</th>${q.bien?"<th>Quẻ biến</th>":""}<th>Nhật – nguyệt – không</th></tr>`;
  for (let i = 5; i >= 0; i--) {
    const h = q.hao[i], p = q.phuc[i], dong = q.dong.includes(i), tt = LucHao.trangThai(h, q, dong);
    s += `<tr${dong?' style="background:#fff3ef"':""}><td>${i+1}</td><td>${q.thu[i]}</td><td>${p?`<span class="mute">${tenHao(p)}</span>`:""}</td>
     <td><b>${tenHao(h)}</b></td><td style="white-space:nowrap">${kyHieu(vals[i])}</td><td>${q.cung.the===i+1?"<b>Thế</b>":q.cung.ung===i+1?"Ứng":""}</td>
     ${q.bien?`<td>${dong?`<b>${tenHao(q.bien[i])}</b>`:`<span class="mute">${tenHao(q.bien[i])}</span>`}</td>`:""}<td>${tt.ds.join(", ")}</td></tr>`;
  }
  s += `</table><p class="mute">○ hào dương động (9) · ✕ hào âm động (6). Hào biến xếp lục thân theo hành cung của quẻ chủ (Tăng san bốc dịch, chương 5). Hào biến chỉ sinh khắc hào động của chính nó; nhật nguyệt sinh khắc được mọi hào (chương 15).</p>
   ${phanTichDung(q, key)}
   <div class="rule">📌 <b>Thứ tự luận:</b> (1) định dụng thần theo việc hỏi; (2) xét dụng thần vượng hay suy theo tháng, được ngày sinh hay bị khắc; (3) có bị tuần không, nguyệt phá không; (4) hào động nào sinh, hào nào khắc dụng thần; (5) dụng thần động thì hóa ra hào gì – hồi đầu sinh hay khắc; (6) xét Thế – Ứng (mình – đối phương). Đọc thêm chương N10.</div></div>`;
  return s + hexPage(q.chu, {mv:q.dong, label:"Quẻ chủ – lời kinh"}) + (q.queBien ? hexPage(q.queBien, {focus:["__"], label:"Quẻ biến"}) : "");
}
function lapLucHao(vals) { $("#kqLH").innerHTML = hienLucHao(vals, $("#lhHoi").value, $("#lhViec").value); }
$("#lhViec").innerHTML = Object.entries(DUNG_THAN).map(([k,v]) => `<option value="${k}">${v.ten}</option>`).join("");
$("#lhSel").innerHTML = [5,4,3,2,1,0].map(i => `<div>Hào ${i+1}: <select id="lh${i}"><option value="7">7 – thiếu dương ⚊</option><option value="8">8 – thiếu âm ⚋</option>
  <option value="9">9 – lão dương ○ (động)</option><option value="6">6 – lão âm ✕ (động)</option></select></div>`).join("");
{ const n = new Date(), p = x => String(x).padStart(2,"0");
  $("#lhDT").value = `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}`; }
$("#btnLHGieo").onclick = () => lapLucHao(Array.from({length:6}, toss));
$("#btnLHNhap").onclick = () => lapLucHao([0,1,2,3,4,5].map(i => +$("#lh"+i).value));
