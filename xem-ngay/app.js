// Xem ngày giờ — giao diện. Dùng XemNgay (xem-ngay.js) và lõi chung.
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const cls = x => x === "Tốt" || x === "tốt" ? "tot" : x === "Xấu" || x === "xấu" ? "xau" : "binh";
const gioKhoang = g => `${(g * 2 + 23) % 24}h–${(g * 2 + 1) % 24}h`;
const pad = x => String(x).padStart(2, "0");

function docDT() { const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec($("#dt").value || ""); return m ? new Date(+m[1], +m[2]-1, +m[3], +m[4], +m[5]) : new Date(); }
function datDT(d) { $("#dt").value = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; }

function trangNgay(r) {
  const thangGhiChu = r.chiThangTiet !== r.chiThangAm ? ` <span class="mute">(tháng tiết ${CHI[r.chiThangTiet]}, tháng âm ${CHI[r.chiThangAm]}; đang dùng tháng ${CHI[r.chiThangDung]})</span>` : "";
  let s = `<div class="card"><h2>${r.duong[0]}/${r.duong[1]}/${r.duong[2]} · ngày <b>${r.ngayCanChi}</b> <span class="${cls(r.xepLoai)}">${r.xepLoai}</span></h2>
   <p>Âm lịch: <b>ngày ${r.am.ngay} tháng ${r.am.thang}${r.am.nhuan?" nhuận":""} năm ${r.namAm}</b> · tháng ${r.thang}${thangGhiChu} · năm theo Lập xuân: ${r.namTiet}</p>
   <p>Nạp âm ngày: <b>${r.napAm}</b> · Tuần không: ${r.tuanKhong.join(", ")} · Trực: <b>${r.truc}</b> <span class="mute">(${r.trucLoai})</span> ·
   Thần ngày: <b>${r.than.ten}</b> <span class="${r.than.hoangDao?"tot":"xau"}">${r.than.hoangDao?"hoàng đạo":"hắc đạo"}</span>
   ${r.sao?` · Sao: <b>${r.sao.ten}</b> <span class="zh">${r.sao.han}</span> (${r.sao.hanh}, ${r.sao.thu}) <span class="${cls(r.sao.loai)}">${r.sao.loai}</span>`:""}</p>
   <p>${r.tot.length?`<span class="tag">Cát thần</span> ${r.tot.join(", ")} `:""}${r.ky.length?`<span class="tag">Ngày kỵ</span> <span class="xau">${r.ky.join(", ")}</span>`:"<span class='mute'>Không phạm Tam nương, Nguyệt kỵ, Dương công, Nguyệt phá.</span>"}</p>
   ${r.tuoi?`<p><span class="tag">Với tuổi ${r.tuoi.tuoi}</span> ${r.tuoi.dong.join(" · ")}</p>
   <p class="mute"><span class="tag">Năm ${r.namAm} với tuổi</span> tuổi mụ ${r.tuoi.nam.tuoiMu} · Kim lâu: ${r.tuoi.nam.kimLau?`<span class="xau">${r.tuoi.nam.kimLau}</span>`:"không"} · Hoang ốc: ${r.tuoi.nam.hoangOc?`<span class="${r.tuoi.nam.hoangOcXau?"xau":"tot"}">${r.tuoi.nam.hoangOc}</span>`:"—"} · Tam tai: ${r.tuoi.nam.tamTai?`<span class="xau">phạm</span>`:"không"} (các năm ${r.tuoi.nam.tamTaiNam}). Ba điều này tính theo năm, dùng cho làm nhà, cưới hỏi; quy ước dân gian Việt, các phái có khác.</p>`:""}
   <p class="mute">Điểm thô ${r.diem} (chỉ để xếp loại tham khảo, không thay việc cân nhắc theo việc cụ thể).</p></div>`;
  s += khoiThanSat(r);
  s += `<div class="card"><h3>Giờ trong ngày</h3><table class="tb"><tr><th>Giờ</th><th>Can chi</th><th>Thần</th><th>Tiểu lục nhâm</th></tr>`;
  r.gioHD.forEach((g, i) => { const ln = r.lucNham[i];
    s += `<tr class="${g.hoangDao?"hd":""}${r.gioHienTai===i?" homnay":""}"><td>${CHI[i]} (${gioKhoang(i)})</td><td>${r.canChiGio[i]}</td><td class="${g.hoangDao?"tot":"xau"}">${g.ten} – ${g.hoangDao?"hoàng đạo":"hắc đạo"}</td><td><span class="${cls(ln.loai)}">${ln.ten}</span> <span class="mute">${ln.y}</span></td></tr>`; });
  s += `</table><p class="mute">Giờ hoàng đạo: Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh. Tiểu lục nhâm đếm từ Đại An theo tháng âm, ngày âm, giờ (Ngọc hạp ký).</p></div>`;
  return s;
}
// Khối thần sát của ngày và xét theo việc đã chọn (chỉ hiện khi đã nạp data/than-sat.js)
const tenTS = ts => `${ts.ten}${ts.han ? ` <span class="zh">${ts.han}</span>` : ""}`;
function khoiThanSat(r) {
  if (!window.XN_THAN_SAT) return "";
  const co = XemNgay.thanSatNgay(r), cat = co.filter(t => t.loai === "cát"), hung = co.filter(t => t.loai === "hung");
  let s = `<div class="card"><h3>Thần sát trong ngày (theo Hiệp kỷ biện phương thư)</h3>
   <p><span class="tag">Cát thần</span> ${cat.length ? cat.map(tenTS).join(", ") : "<span class='mute'>không</span>"}</p>
   <p><span class="tag">Hung sát</span> ${hung.length ? hung.map(tenTS).join(", ") : "<span class='mute'>không</span>"}</p>`;
  const ma = $("#viec").value, x = ma ? XemNgay.xetViec(r, ma) : null;
  if (x) {
    s += `<h3>Việc: ${esc(x.viec.ten)} <span class="${x.ketLuan === "Nên" ? "tot" : x.ketLuan === "Không nên" ? "xau" : "binh"}">${x.ketLuan}</span></h3>
     <p>Thần sát <b>nên</b> việc này: ${x.nen.length ? x.nen.map(tenTS).join(", ") : "<span class='mute'>không có</span>"}<br>
     Thần sát <b>kỵ</b> việc này: ${x.ky.length ? x.ky.map(t => `<span class="xau">${tenTS(t)}</span>`).join(", ") : "<span class='mute'>không có</span>"}</p>
     ${x.hanChe.length ? `<p>Ngày có <b>${x.hanChe.map(tenTS).join(", ")}</b>: sách chỉ ghi nên vài việc (${x.hanChe.map(t => (t.nen || []).map(m => XN_THAN_SAT.viec.find(v => v.ma === m)?.ten || m).join(", ")).join("; ")}), việc này không nằm trong đó.</p>` : ""}
     ${[...x.nen, ...x.ky].map(t => { const q = Array.isArray(t.trichNghiKy) ? t.trichNghiKy.slice(0, 2).join(" ○ ") : t.trichNghiKy; return q ? `<p class="mute">${esc(t.ten)} (quyển ${t.nguon?.quyen ?? 10}): <span class="zh">${esc(q)}</span></p>` : ""; }).join("")}
     <p class="mute">Sách dặn: cát thần nhiều thì cát, hung thần nhiều thì hung; không vì một hung sát mà bỏ cả ngày, cũng không vì một cát thần mà bỏ qua điều kỵ nặng (Nguyệt phá, Nguyệt yếm với cưới hỏi, Thổ phủ với động thổ).</p>`;
  }
  return s + `</div>`;
}
function napViec() {
  if (!window.XN_THAN_SAT) return;
  const ops = XN_THAN_SAT.viec.map(v => `<option value="${v.ma}">${esc(v.ten)}</option>`).join("");
  $("#viec").innerHTML += ops; $("#tViec").innerHTML += ops;
  try { const v = localStorage.getItem("xn_viec"); if (v) { $("#viec").value = v; $("#tViec").value = v; } } catch (e) {}
}
function xem() { XemNgay.CAU_HINH.thangTheoTiet = !$("#theoAm").checked; const ns = parseInt($("#ns").value, 10) || null;
  try { localStorage.setItem("xn_viec", $("#viec").value); } catch (e) {}
  $("#kq").innerHTML = trangNgay(XemNgay.ngay(docDT(), ns)); }

function bangThang() {
  XemNgay.CAU_HINH.thangTheoTiet = !$("#theoAm").checked;
  const M = parseInt($("#tM").value, 10), Y = parseInt($("#tY").value, 10), ns = parseInt($("#tNs").value, 10) || null;
  const rows = XemNgay.thang(M, Y, ns), nay = new Date(), ma = window.XN_THAN_SAT ? $("#tViec").value : "";
  const tenViec = ma && XN_THAN_SAT.viec.find(v => v.ma === ma)?.ten;
  let s = `<div class="card"><h2>Tháng ${M}/${Y}${tenViec ? ` · việc: ${esc(tenViec)}` : ""}</h2><table class="tb"><tr><th>Dương</th><th>Âm</th><th>Ngày</th><th>Trực</th><th>Thần</th><th>Sao</th><th>Kỵ / cát</th>${ns?"<th>Với tuổi</th>":""}${ma?"<th>Theo việc</th>":""}<th>Xếp loại</th></tr>`;
  for (const r of rows) {
    const laNay = nay.getDate()===r.duong[0] && nay.getMonth()+1===M && nay.getFullYear()===Y, x = ma ? XemNgay.xetViec(r, ma) : null;
    s += `<tr class="${laNay?"homnay":""}"><td>${r.duong[0]}</td><td>${r.am.ngay}/${r.am.thang}${r.am.nhuan?"n":""}</td><td>${r.ngayCanChi}</td><td>${r.truc}</td>
      <td class="${r.than.hoangDao?"tot":"xau"}">${r.than.ten}</td><td>${r.sao?r.sao.ten:""}</td><td>${[...r.tot, ...r.ky.map(k=>`<span class="xau">${k}</span>`)].join(", ")}</td>
      ${ns?`<td>${r.tuoi.xung?`<span class="xau">${r.tuoi.khacCan?"thiên khắc địa xung":"xung tuổi"}</span>`:r.tuoi.dong.filter(x=>/hợp/.test(x)).join(", ")}</td>`:""}
      ${x?`<td class="${x.ketLuan==="Nên"?"tot":x.ketLuan==="Không nên"?"xau":"binh"}">${x.ketLuan}${x.ky.length?`<br><span class="mute">kỵ: ${x.ky.map(t=>t.ten).join(", ")}</span>`:""}</td>`:ma?"<td></td>":""}
      <td class="${cls(r.xepLoai)}">${r.xepLoai}</td></tr>`;
  }
  $("#kqThang").innerHTML = s + `</table>${ma?`<p class="mute">Cột "Theo việc" xét cát thần nên / hung sát kỵ việc đã chọn theo Hiệp kỷ quyển 10; "Nên" = có cát thần nên việc và không có hung sát kỵ.</p>`:""}</div>`;
}

function trangCach() {
  const v = "[V] đối chiếu được trong nguyên văn đã tải (XEM NGAY/nguon/)", i = "[I] quy ước phổ biến, chưa đối chiếu sách gốc";
  $("#cachHtml").innerHTML = `<div class="card"><h2>Cách tính và nguồn</h2>
  <table class="tb"><tr><th>Lớp</th><th>Quy tắc</th><th>Nguồn, nhãn</th></tr>
  <tr><td>Can chi ngày, giờ</td><td>Ngày từ ngày Julius (mốc 1/1/1900 Giáp Tuất); giờ theo ngũ thử độn; sau 23h sang ngày mới</td><td>Lõi chung, đã kiểm mốc</td></tr>
  <tr><td>Tháng</td><td>Mặc định tháng tiết khí (Lập xuân vào Dần…), đúng nghĩa "nguyệt kiến"; có thể bật tính theo tháng âm</td><td>Hiệp kỷ Q4: <span class="zh">每月交節則疊兩值日其法從月建上起建</span> ${v}</td></tr>
  <tr><td>Thập nhị trực</td><td>Ngày có chi trùng chi tháng là Kiến, tiến dần; tốt xấu theo ca quyết <span class="zh">建滿平收黑除危定執黄成開皆可用閉破不相當</span></td><td>Hiệp kỷ Q4 ${v}. Sách cũng dặn: cát thần nhiều thì cát, hung thần nhiều thì hung, không nên chấp một điều</td></tr>
  <tr><td>Thần hoàng đạo, hắc đạo; giờ hoàng đạo</td><td>Thanh Long khởi theo chi tháng: <span class="zh">寅申青龍起子卯酉起寅辰戌起辰巳亥起午子午起申丑未起戌</span>; giờ dùng chi ngày</td><td>Hiệp kỷ Q7 ${v}; kiểm chéo: ngày Tý, Ngọ ra giờ Tý Sửu Mão Ngọ Thân Dậu như lịch phổ thông</td></tr>
  <tr><td>Thần sát theo việc (${window.XN_THAN_SAT ? XN_THAN_SAT.thanSat.length : 0} thần sát, ${window.XN_THAN_SAT ? XN_THAN_SAT.viec.length : 0} việc)</td><td>Định nghĩa từng thần sát theo tháng tiết lấy từ quyển 3–8 (nghĩa lệ); việc nên, kỵ của từng thần sát lấy từ quyển 10 (nghi kỵ), từ vựng việc theo quyển 11 (dụng sự); mọi trích dẫn đều dò được trong nguyên văn đã tải (tool <code>kiem-tra-than-sat.mjs</code>)</td><td>Hiệp kỷ Q3–Q11 ${v}. Còn thiếu: Huyết kỵ (bản Wikisource trống), Hoang vu, Thiên cẩu (sách không nhất quán), nhóm theo tiết khí (Tứ ly, Tứ tuyệt, Khí vãng vong), Bách kỵ. Chỗ sách mơ hồ ghi trong trường ghi chú của từng thần sát</td></tr>
  <tr><td>Tiểu lục nhâm</td><td>Từ Đại An đếm tháng âm, rồi ngày âm, rồi giờ</td><td>Ngọc hạp ký, phần tạp chiêm ${i} về cách đếm</td></tr>
  <tr><td>Nhị thập bát tú</td><td>Chu kỳ 28 ngày; mốc 1/1/2025 là sao Sâm</td><td>Mốc lấy từ hai trang lịch Việt độc lập (baohatinh.vn, quantrimang.com) cùng ghi; nguồn thứ cấp ${i}. Cát hung từng sao tóm lược theo Ngọc hạp ký</td></tr>
  <tr><td>Tam nương, Nguyệt kỵ, Dương công kỵ nhật</td><td>Ngày âm 3 7 13 18 22 27; 5 14 23; 13/1 11/2 9/3 7/4 5/5 3/6 1 và 29/7 27/8 25/9 23/10 21/11 19/12</td><td>Dân gian Việt Nam ${i}. Hiệp kỷ Q36 <b>bác bỏ</b> Dương công kỵ nhật, Q6 có mục Nguyệt kỵ; phần mềm vẫn hiển thị để người xem tự cân nhắc</td></tr>
  <tr><td>Thiên đức, Nguyệt đức</td><td>Theo tháng tiết: Thiên đức <span class="zh">正丁二坤三壬四辛五乾六甲七癸八艮九丙十乙子巽丑庚</span>; Nguyệt đức Dần Ngọ Tuất Bính, Thân Tý Thìn Nhâm, Hợi Mão Mùi Giáp, Tỵ Dậu Sửu Canh</td><td>${i}, câu quyết này chưa dò thấy trong quyển 4, 6 đã tải</td></tr>
  <tr><td>Nguyệt phá</td><td>Chi ngày xung chi tháng</td><td>Định nghĩa chung, lõi chung</td></tr>
  <tr><td>Với tuổi</td><td>Lục xung, thiên khắc địa xung, lục hợp, tam hợp, lục hại giữa chi ngày và chi tuổi; sinh khắc nạp âm</td><td>Lõi chung</td></tr>
  <tr><td>Xếp loại</td><td>Điểm thô: thần hoàng đạo +2, hắc đạo −1; trực hoàng +1, dùng được 0, hắc −1, xấu −2; mỗi ngày kỵ −2; Thiên đức, Nguyệt đức +1; sao tốt +1, xấu −1. Tốt ≥ 3, Xấu ≤ −2</td><td>Quy ước của kho, chỉ để tham khảo</td></tr></table>
  <p class="mute">Chưa đưa vào vì chưa có nguồn đủ tin: Sát chủ, Thọ tử, Bành Tổ bách kỵ, Bất tương (cưới hỏi), Thiên tặc, Vãng vong. Đây là thuật số đời sau, kết quả để chiêm nghiệm, không thay quyết định của anh.</p></div>`;
}

function tab(id) { ["ngay","thang","cach"].forEach(x => $("#"+x).classList.toggle("hidden", x !== id)); document.querySelectorAll("nav button").forEach(b => b.classList.toggle("on", b.dataset.t === id)); }
document.querySelectorAll("nav button").forEach(b => b.onclick = () => tab(b.dataset.t));
$("#btnXem").onclick = xem; $("#btnNay").onclick = () => { datDT(new Date()); xem(); }; $("#theoAm").onchange = xem; $("#dt").onchange = xem; $("#viec").onchange = xem;
$("#btnThang").onclick = bangThang;
{ const n = new Date(); datDT(n); $("#tM").value = n.getMonth() + 1; $("#tY").value = n.getFullYear(); }
napViec(); trangCach(); xem();
