// Lá số Tử vi — giao diện. Dùng TuVi (tu-vi.js) và lõi chung. Không luận giải.
"use strict";
const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s) || []);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const DS_TAT = { "miếu":"M", "vượng":"V", "đắc địa":"Đ", "lợi ích":"L", "bình hòa":"B", "bất đắc địa":"BĐ", "hãm":"H" };
const HOA_LOP = { "Lộc":"L", "Quyền":"Q", "Khoa":"K", "Kỵ":"Ky" };
const SAT_TINH = new Set(["Kình Dương","Đà La","Hỏa Tinh","Linh Tinh","Địa Không","Địa Kiếp","Thiên Hình","Thiên Riêu","Kiếp Sát","Thiên Không","Thiên Thương","Thiên Sứ","Cô Thần","Quả Tú","Thiên Khốc","Thiên Hư","Phá Toái","Lưu Hà","Thiên La","Địa Võng","Đẩu Quân"]);
const CAT_TINH = new Set(["Tả Phụ","Hữu Bật","Văn Xương","Văn Khúc","Thiên Khôi","Thiên Việt","Lộc Tồn","Thiên Mã","Hồng Loan","Thiên Hỷ","Long Trì","Phượng Các","Tam Thai","Bát Tọa","Ân Quang","Thiên Quý","Thai Phụ","Phong Cáo","Thiên Quan","Thiên Phúc","Quốc Ấn","Đường Phù","Thiên Trù","Thiên Đức","Nguyệt Đức","Giải Thần","Thiên Giải","Địa Giải","Niên Giải","Thiên Tài","Thiên Thọ","Thiên Y","Đào Hoa","Hoa Cái"]);
// Thứ tự ô trong lưới 4×4: hàng trên Tỵ Ngọ Mùi Thân, cột phải Dậu Tuất, hàng dưới Hợi Tý Sửu Dần (phải → trái), cột trái Mão Thìn
const LUOI = [5, 6, 7, 8, 4, null, 9, 3, 10, 2, 1, 0, 11];
// 13 khung giờ theo địa chi; giá trị là giờ đại diện (0 = Tý sớm, 23 = Tý khuya) để lõi giữ nguyên quy tắc giờ Tý
const KHUNG_GIO = [[0, "Tý sớm (0h–1h)"], [1, "Sửu (1h–3h)"], [3, "Dần (3h–5h)"], [5, "Mão (5h–7h)"], [7, "Thìn (7h–9h)"], [9, "Tỵ (9h–11h)"], [11, "Ngọ (11h–13h)"], [13, "Mùi (13h–15h)"], [15, "Thân (15h–17h)"], [17, "Dậu (17h–19h)"], [19, "Tuất (19h–21h)"], [21, "Hợi (21h–23h)"], [23, "Tý khuya (23h–24h, tính sang ngày sau theo cấu hình)"]];
const quyKhungGio = h => { h = parseInt(h, 10); if (isNaN(h)) return 11; if (h >= 23) return 23; if (h < 1) return 0; return CanChi.chiGioTuGio(h) * 2 - 1; };
let laSoHienTai = null;

function docNhap() {
  const loai = $("#loaiLich").value, ngay = +$("#ngay").value, thang = +$("#thang").value, nam = +$("#nam").value, gio = +$("#gio").value;
  const nhap = { gioiTinh: $("#gioiTinh").value };
  if (loai === "am") nhap.am = { ngay, thang, nam, nhuan: $("#nhuan").checked, gio }; else nhap.duong = { ngay, thang, nam, gio };
  return nhap;
}
function luuNhap() { try { localStorage.setItem("tv_nhap", JSON.stringify({ loai: $("#loaiLich").value, ngay: $("#ngay").value, thang: $("#thang").value, nam: $("#nam").value, nhuan: $("#nhuan").checked, gio: $("#gio").value, gioiTinh: $("#gioiTinh").value, profile: $("#profile").value, namXem: $("#namXem").value })); } catch (e) {} }
function napNhap() {
  let v = null; try { v = JSON.parse(localStorage.getItem("tv_nhap") || "null"); } catch (e) {}
  const nay = new Date();
  $("#loaiLich").value = v?.loai || "duong"; $("#ngay").value = v?.ngay || nay.getDate(); $("#thang").value = v?.thang || nay.getMonth() + 1; $("#nam").value = v?.nam || 1990;
  $("#nhuan").checked = !!v?.nhuan; $("#gio").value = quyKhungGio(v?.gio ?? 11); $("#gioiTinh").value = v?.gioiTinh || "nam"; $("#profile").value = v?.profile || "viet"; $("#namXem").value = v?.namXem || nay.getFullYear();
  $("#lbNhuan").classList.toggle("hidden", $("#loaiLich").value !== "am");
}

const saoHtml = (s, dam) => `<span class="${dam ? "" : SAT_TINH.has(s.ten) ? "sat" : CAT_TINH.has(s.ten) ? "tot" : ""}">${esc(s.ten)}${s.doSang ? `<span class="ds">(${DS_TAT[s.doSang] || s.doSang})</span>` : ""}${s.hoa ? `<span class="hoa ${HOA_LOP[s.hoa]}">${s.hoa}</span>` : ""}</span>`;

function oCung(c, ls, ln) {
  const luuSao = ln ? Object.keys(ln.sao).filter(t => ln.sao[t] === c.chi) : [];
  const luuHoa = ln ? [...c.chinhTinh, ...c.phuTinh].filter(s => ln.tuHoa[s.ten]).map(s => `${s.ten} lưu ${ln.tuHoa[s.ten]}`) : [];
  const nhan = [c.laMenh ? "Mệnh" : "", c.laThan ? "Thân" : ""].filter(Boolean);
  const vaiTro = ln ? [ln.cungDaiHan === c.chi ? (ln.laDongHan ? "đồng hạn" : "đại hạn") : "", ln.cungTieuHan === c.chi ? "tiểu hạn" : "", ln.chi === c.chi ? "lưu Thái Tuế" : ""].filter(Boolean) : [];
  return `<div class="o ${c.laMenh ? "menh" : ""} ${c.laThan ? "than" : ""} ${vaiTro.length ? "lthai" : ""}" data-chi="${c.chi}">
   <div class="dau"><span><span class="cungten">${esc(c.ten)}</span>${nhan.length ? ` <span class="tag">${nhan.join(" · ")}</span>` : ""}</span><span class="canchi">${esc(c.canChi)}</span></div>
   <div class="chinh">${c.chinhTinh.length ? c.chinhTinh.map(s => saoHtml(s, true)).join(" · ") : "<span class='mute' style='font-weight:400'>vô chính diệu</span>"}</div>
   <div class="phu">${c.phuTinh.map(s => saoHtml(s)).join(" · ")}</div>
   <div class="vong">${esc(c.trangSinh)} · ${esc(c.bacSi)} · ${esc(c.thaiTue)}</div>
   <div class="han">ĐH <b>${c.daiHan[0]}–${c.daiHan[1]}</b> · TH ${c.tieuHan.slice(0, 5).join(", ")}…</div>
   ${ln ? `<div class="luu">${[...vaiTro.map(v => `<b>${v}</b>`), ...luuSao.map(esc), ...luuHoa.map(esc), ln.thaiTue[c.chi]].join(" · ")}</div>` : ""}
   ${c.tuan || c.triet ? `<div class="tt">${c.tuan ? "<span>TUẦN</span>" : ""}${c.triet ? "<span>TRIỆT</span>" : ""}</div>` : ""}
  </div>`;
}
function khoiGiua(ls, ln) {
  const d = ls.duong, tuHoa = Object.entries(ls.tuHoa).map(([s, h]) => `${s} hóa ${h}`).join(", ");
  return `<div class="giua"><h2>Bản mệnh</h2><div class="ct">
   <b>Sinh</b><span>${d[0]}/${d[1]}/${d[2]} dương${ls.gioTyCuoiNgay ? " (23h, đã tính sang ngày sau theo cấu hình)" : ""} · giờ <b>${ls.gio.ten}</b> · ${ls.gioiTinh === "nam" ? "nam" : "nữ"}</span>
   <b>Âm lịch</b><span>ngày ${ls.am.ngay} tháng ${ls.am.thang}${ls.am.nhuan ? " nhuận" : ""} năm ${ls.am.nam} · tháng an sao: ${ls.thangAn}</span>
   <b>Năm</b><span>${ls.nam.ten} (${ls.nam.napAm}) · <b>${ls.amDuong}</b>${ls.namAn !== ls.am.nam ? ` · năm an sao ${ls.namAn} (ranh giới ${ls.cauHinh.ranhGioiNam})` : ""}</span>
   <b>Mệnh</b><span>cung ${CHI[ls.menh]} · <b>${ls.cuc.ten}</b> (nạp âm cung Mệnh: ${ls.cuc.napAmMenh})</span>
   <b>Thân</b><span>cung ${CHI[ls.than]} (${ls.cung[ls.than].ten})</span>
   <b>Mệnh chủ</b><span>${ls.menhChu} · Thân chủ: ${ls.thanChu}</span>
   <b>Tứ Hóa</b><span>${tuHoa}</span>
   <b>Tuần, Triệt</b><span>Tuần tại ${ls.tuan.map(c => CHI[c]).join(" ")} · Triệt tại ${ls.triet.map(c => CHI[c]).join(" ")}</span>
   ${ln ? `<b>Lưu niên</b><span>năm ${ln.ten} (${ln.nam}) · tuổi ${ln.tuoi} · ${ln.laDongHan ? "đồng hạn" : "đại hạn"} tại ${CHI[ln.cungDaiHan] || "—"} · tiểu hạn tại ${CHI[ln.cungTieuHan]} · lưu Tứ Hóa: ${Object.entries(ln.tuHoa).map(([s, h]) => `${s} ${h}`).join(", ")}</span>` : ""}
   <b>Phái</b><span>${ls.profile}</span>
  </div><p class="mute" style="margin:6px 0 0">Độ sáng: M miếu, V vượng, Đ đắc địa, L lợi ích, B bình hòa, BĐ bất đắc địa, H hãm (bảng Toàn thư). ĐH đại hạn (tuổi), TH tiểu hạn (tuổi).</p></div>`;
}
function veLaSo(ls, ln) {
  let s = `<div class="card"><div class="laso">`;
  for (const chi of LUOI) s += chi === null ? khoiGiua(ls, ln) : oCung(ls.cung[chi], ls, ln);
  return s + `</div></div>`;
}
function lapLaSo() {
  try {
    TuVi.datProfile($("#profile").value);
    const nhap = docNhap(); laSoHienTai = TuVi.laSo(nhap);
    const Y = parseInt($("#namXem").value, 10), ln = Y ? TuVi.luuNien(laSoHienTai, Y) : null;
    $("#kq").innerHTML = veLaSo(laSoHienTai, ln); luuNhap();
    if (window.TuViLuan) { try { $("#luan").innerHTML = TuViLuan.luanLaSo(laSoHienTai, ln); } catch (e) { $("#luan").innerHTML = `<div class="card"><b>Chưa luận được:</b> ${esc(e.message)}</div>`; } }
  } catch (e) { $("#kq").innerHTML = `<div class="card"><b>Không lập được lá số:</b> ${esc(e.message)}</div>`; }
}

function trangCach() {
  const ch = TuVi.CAU_HINH;
  let s = `<div class="card"><h2>Cách an sao và nguồn</h2>
  <p>Nguyên văn 紫微斗數全書 quyển 2 tải về <code>TU VI/nguon/toan-thu-q2.txt</code> từ <a href="https://zh.wikisource.org/wiki/紫微斗數全書/卷二">Wikisource</a>; quyển 1, 3 và trang zh.wikipedia 紫微斗數 (bảng Tứ Hóa 全集/全書) cũng lưu trong <code>nguon/</code>.
  Nhãn: <b>[V]</b> đối chiếu được nguyên văn đã tải · <b>[I]</b> quy ước phổ biến (sách Việt, thư viện iztro) chưa có nguyên văn · <b>[U]</b> chưa rõ. Tool kiểm: <code>TU VI/tools/kiem-tra-tu-vi.mjs</code> đối chứng hàng loạt lá số với thư viện iztro (MIT) chạy trong Node, không nhúng vào trang.</p>
  <table class="tb"><tr><th>Bước</th><th>Quy tắc</th><th>Nguồn, nhãn</th></tr>${TuVi.CAC_BUOC.map(b => `<tr><td>${esc(b[0])}</td><td>${esc(b[1])}</td><td>${esc(b[2])}</td></tr>`).join("")}</table></div>
  <div class="card"><h2>Điểm các phái lệch nhau — cấu hình đang dùng: <b>${esc(ch.profile)}</b></h2>
  <table class="tb"><tr><th>Khóa</th><th>Đang dùng</th><th>viet</th><th>toan-thu</th><th>trung-chau</th><th>Ý nghĩa, nguồn</th></tr>
  ${Object.keys(TuVi.MO_TA_CAU_HINH).map(k => `<tr><td><code>${k}</code></td><td><b>${esc(ch[k])}</b></td><td>${esc(TuVi.PROFILE.viet[k])}</td><td>${esc(TuVi.PROFILE["toan-thu"][k])}</td><td>${esc(TuVi.PROFILE["trung-chau"][k])}</td><td>${esc(TuVi.MO_TA_CAU_HINH[k])}</td></tr>`).join("")}</table>
  <p class="mute">Lưu ý đã đo: bảng so sánh Tứ Hóa trên zh.wikipedia ghi Toàn thư can Canh là "陽武同陰", nhưng nguyên văn Toàn thư trên Wikisource (安禄权科忌四星变化诀) ghi "庚日武阴同为首" — tức Khoa Thái Âm, Kỵ Thiên Đồng, giống Toàn tập. Profile toan-thu theo nguyên văn; khác biệt Toàn thư/Toàn tập còn lại là can Nhâm (Khoa Thiên Phủ / Tả Phụ). Tử vi Việt dùng bảng nào là <b>[I]</b>, chưa đối chiếu sách giấy.</p>
  <p class="mute">Bảng Tử Vi theo cục in trong Toàn thư (bản chép Wikisource) có hai ô lệch với công thức: Mộc tam cục cung Dần ghi "初九" (đúng là 初五), Kim tứ cục cung Hợi thiếu "三十"; tool kiểm in ra từng ô. Mã dùng công thức tương đương; tool kiểm đo được 148/149 ô chép được khớp công thức (bản chép thiếu 1 ô trên 150).</p></div>
  <div class="card"><h2>Bảng độ sáng theo Toàn thư</h2><table class="tb"><tr><th>Cung</th>${["miếu","vượng","đắc địa","lợi ích","bình hòa","bất đắc địa","hãm"].map(m => `<th>${m}</th>`).join("")}</tr>
  ${CHI.map((c, chi) => `<tr><td><b>${c}</b></td>${["miếu","vượng","đắc địa","lợi ích","bình hòa","bất đắc địa","hãm"].map(m => `<td>${Object.keys(TuVi.DO_SANG).filter(t => TuVi.DO_SANG[t][chi] === m).join(", ")}</td>`).join("")}</tr>`).join("")}</table></div>`;
  $("#cachHtml").innerHTML = s;
}

function khoiTao() {
  $("#gio").innerHTML = KHUNG_GIO.map(([v, ten]) => `<option value="${v}">${ten}</option>`).join("");
  $("#profile").innerHTML = Object.keys(TuVi.PROFILE).map(p => `<option value="${p}">${p}</option>`).join("");
  napNhap();
  const ghiChu = () => { const p = TuVi.PROFILE[$("#profile").value]; $("#ghiChuCauHinh").innerHTML = `Cấu hình <b>${esc($("#profile").value)}</b>: Tứ Hóa Canh ${esc(p.tuHoaCanh)}, Nhâm ${esc(p.tuHoaNham)} · giờ Tý 23h ${p.gioTySangNgaySau ? "sang ngày sau" : "cùng ngày"} · năm theo ${esc(p.ranhGioiNam)} · tháng nhuận ${esc(p.thangNhuan)} · Hỏa Linh ${esc(p.hoaLinhChieu)} · Tràng sinh ${esc(p.trangSinhChieu)}. Chi tiết ở thẻ "Cách an sao và nguồn".`; };
  ghiChu();
  $("#loaiLich").onchange = () => $("#lbNhuan").classList.toggle("hidden", $("#loaiLich").value !== "am");
  $("#profile").onchange = ghiChu;
  $("#btnLap").onclick = lapLaSo; $("#btnIn").onclick = () => window.print();
  const anHan = () => { try { document.body.classList.toggle("anHan", !$("#hienHan").checked); localStorage.setItem("tv_hienHan", $("#hienHan").checked ? "1" : "0"); } catch (e) {} };
  try { if (localStorage.getItem("tv_hienHan") === "0") $("#hienHan").checked = false; } catch (e) {}
  $("#hienHan").onchange = anHan; anHan();
  $$("nav button").forEach(b => { b.onclick = () => { $$("nav button").forEach(x => x.classList.toggle("on", x === b)); ["laso", "cach"].forEach(id => $("#" + id).classList.toggle("hidden", id !== b.dataset.t)); if (b.dataset.t === "cach") trangCach(); }; });
  trangCach();
  ganLichAm();
  if (localStorage.getItem("tv_nhap")) lapLaSo();
}
// Bộ chọn ngày có lịch âm (chung/lich-chon.js) cho ba ô ngày tháng năm: chọn trên lưới → điền ngày dương,
// hoặc nếu đang chọn "lịch âm" thì đổi sang ngày âm (kèm cờ nhuận) rồi điền.
function ganLichAm() {
  if (!window.LichChon || !document.createElement) return;
  const an = document.createElement("input"); an.type = "date"; an.id = "ngayLich"; an.style.display = "none";
  const oNgay = $("#ngay"); oNgay.parentNode.insertAdjacentElement("afterend", an);
  LichChon.ganTatCa(); LichChon.gan(an);
  an.onchange = () => {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(an.value || ""); if (!m) return;
    const y = +m[1], mo = +m[2], d = +m[3];
    if ($("#loaiLich").value === "am") { const am = LichAm.solar2lunar(d, mo, y); $("#ngay").value = am.ngay; $("#thang").value = am.thang; $("#nam").value = am.nam; $("#nhuan").checked = !!am.nhuan; }
    else { $("#ngay").value = d; $("#thang").value = mo; $("#nam").value = y; }
    luuNhap();
  };
}
try { khoiTao(); } catch (e) { console.error(e); }
