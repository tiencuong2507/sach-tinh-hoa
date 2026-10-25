// Phong thủy — giao diện. Dùng PhongThuy (phong-thuy.js) và lõi chung. Đầu vào nhớ bằng localStorage (khóa pt_*).
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const cls = x => x === true || x === "tốt" || x === "rất tốt" ? "tot" : x === false || x === "xấu" || x === "rất xấu" ? "xau" : "binh";
const pad = x => String(x).padStart(2, "0");
const KHO = { doc(k, mac) { try { const v = localStorage.getItem(k); return v === null ? mac : JSON.parse(v); } catch (e) { return mac; } }, ghi(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const docNgay = (id, mac) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec($(id).value || ""); return m ? [+m[3], +m[2], +m[1]] : mac; };
const datNgay = (id, d) => { $(id).value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const NHAC = `<p class="rule">Bát trạch là <b>một phái</b> (lấy năm sinh làm mệnh quái); các phái khác như Huyền không, Hình thế không dùng năm sinh mà xét vận, tọa hướng, hình thế đất. Lời khuyên ở đây chỉ để tham khảo, không thay việc xem xét tại chỗ.</p>`;

// ---------- Bát trạch ----------
function napHuong() {
  document.querySelectorAll("select.huong").forEach(s => { s.innerHTML = `<option value="">— không xét —</option>` + PhongThuy.HUONG8.map(h => `<option>${h}</option>`).join(""); });
}
function docBatTrach() {
  return { ngay: $("#btNgay").value, gioi: $("#btGioi").value || "nam", nha: $("#btNha").value, cua: $("#btCua").value, bepViTri: $("#btBepVt").value, bepHuong: $("#btBepH").value, giuong: $("#btGiuong").value, ban: $("#btBan").value };
}
function xemBatTrach() {
  const v = docBatTrach(); KHO.ghi("pt_bt", v);
  const ns = docNgay("#btNgay", null);
  if (!ns) { $("#kqBatTrach").innerHTML = `<div class="card"><p class="mute">Nhập ngày sinh dương lịch rồi bấm Xem.</p>${NHAC}</div>`; return; }
  const r = PhongThuy.batTrach(ns, v.gioi, v), m = r.menh;
  let s = `<div class="card"><h2>Mệnh quái: <b>${m.quai}</b> <span class="zh">${m.zh} ${m.kyHieu}</span> · số ${m.so} · hành ${m.hanh} · <span class="tag">${m.nhom}</span></h2>
   <p>Sinh ${ns[0]}/${ns[1]}/${ns[2]}, ${v.gioi} → năm theo Lập xuân <b>${r.namSinh} ${r.namCanChi}</b>${r.truocLapXuan ? ` <span class="mute">(sinh trước Lập xuân nên lấy năm trước)</span>` : ""} · niên tinh ${m.nienTinh} ${SAO[m.nienTinh]}
   ${m.nienTinh === 5 ? ` <span class="mute">(số 5 không có quái: nam về Khôn, nữ về Cấn)</span>` : ""}</p>
   <p>Bốn hướng cát: <span class="tot">${r.bang.filter(x => x.cat).map(x => `${x.huong} (${x.ten})`).join(", ")}</span> · Bốn hướng hung: <span class="xau">${r.bang.filter(x => !x.cat).map(x => `${x.huong} (${x.ten})`).join(", ")}</span></p></div>`;
  if (r.danhGia.length) {
    s += `<div class="card"><h3>Đánh giá các hạng mục đã nhập</h3><table class="tb"><tr><th>Hạng mục</th><th>Hướng xét</th><th>Du niên</th><th>Kết luận</th><th>Giải thích</th></tr>`;
    for (const d of r.danhGia) s += `<tr><td>${d.ten}</td><td>${d.huong}</td><td class="${cls(d.cat)}">${d.duNien}</td><td class="${cls(d.hop)}">${d.hop ? "Hợp" : "Chưa hợp"}</td><td class="mute">${esc(d.giaiThich)}<br>${esc(d.loiKhuyen)}</td></tr>`;
    s += `</table></div>`;
  }
  s += `<div class="card"><h3>Tám hướng của mệnh ${m.quai}</h3><table class="tb"><tr><th>Hướng</th><th>Quái</th><th>Du niên</th><th>Cát hung</th><th>Sao, hành</th><th>Ý nghĩa, nên đặt gì</th></tr>`;
  for (const x of r.bang) s += `<tr><td><b>${x.huong}</b></td><td>${x.quai} <span class="zh">${x.kyHieu}</span></td><td class="${cls(x.cat)}">${x.ten}</td><td class="${cls(x.cat)}">${x.cat ? "Cát" : "Hung"}</td><td>${x.sao} (${x.hanh})</td><td class="mute">${x.y}</td></tr>`;
  s += `</table><p class="mute">Du niên tính bằng phép biến hào từ quái mệnh (Sinh khí biến hào trên, Thiên y biến hào dưới và giữa, Diên niên biến cả ba, Phục vị không biến; Họa hại hào dưới, Tuyệt mệnh hào giữa, Ngũ quỷ giữa và trên, Lục sát trên và dưới) [I].</p>${NHAC}</div>`;
  $("#kqBatTrach").innerHTML = s;
}

// ---------- Phi tinh ----------
function lapPhiTinh() {
  const ng = docNgay("#ptNgay", null) || (() => { const n = new Date(); return [n.getDate(), n.getMonth() + 1, n.getFullYear()]; })();
  KHO.ghi("pt_pt", $("#ptNgay").value);
  const L = PhongThuy.luoiPhiTinh(ng[0], ng[1], ng[2]), Y = PhongThuy.Y_SAO;
  let s = `<div class="card"><h2>Năm ${L.nam} ${L.namCanChi} · tháng ${L.thangCanChi} (tháng tiết ${CHI[L.chiThang]}) · vận ${L.van.van} (${L.van.tu}–${L.van.den})</h2>
   <p>Niên tinh nhập trung: <b>${SAO[L.nienTinh]}</b> · Nguyệt tinh nhập trung: <b>${SAO[L.nguyetTinh]}</b> · bay thuận 5→6→7→8→9→1→2→3→4 (trung, Tây Bắc, Tây, Đông Bắc, Nam, Bắc, Tây Nam, Đông, Đông Nam).</p>
   <div class="luoi">`;
  for (const hang of L.luoi) for (const o of hang) {
    const loaiLop = o.saoNam === 5 ? "sao5" : o.saoNam === 2 ? "sao2" : o.saoNam === 9 ? "sao9" : o.saoNam === 1 ? "sao1" : "";
    s += `<div class="o ${o.so === 5 ? "trung" : ""} ${loaiLop}"><div class="h">${o.so === 5 ? "Trung cung" : `${o.huong} · ${o.quai} ${o.kyHieu}`} <span class="mute">(${o.so})</span></div>
      <div class="s ${cls(Y[o.saoNam].loai)}">${o.saoNam}</div><div class="t">${Y[o.saoNam].ten}</div><div class="t mute">tháng: ${o.saoThang} ${Y[o.saoThang].ten}</div></div>`;
  }
  s += `</div><p class="mute">Số lớn: sao năm · dòng nhỏ: sao tháng. Mỗi ô ghi hướng địa lý thật (Nam ở trên như sách).</p>
   <p><span class="xau">Năm nay tránh động thổ, đục khoan</span> tại <b>${L.nguHoangNam.huong}</b> (Ngũ Hoàng) và hạn chế tại <b>${L.nhiHacNam.huong}</b> (Nhị Hắc bệnh phù).
   Tháng này Ngũ Hoàng ở <b>${L.nguHoangThang.huong}</b>, Nhị Hắc ở <b>${L.nhiHacThang.huong}</b>${L.nguHoangThang.so === L.nguHoangNam.so || L.nguHoangThang.so === L.nhiHacNam.so || L.nhiHacThang.so === L.nguHoangNam.so ? ` <span class="xau">— sao xấu năm và tháng chồng nhau, càng nên giữ yên</span>` : ""}.</p></div>`;
  s += `<div class="card"><h3>Ý nghĩa 9 sao trong vận 9 (2024–2043)</h3><table class="tb"><tr><th>Sao</th><th>Hành</th><th>Vận 9</th><th>Luận</th></tr>`;
  for (let i = 1; i <= 9; i++) s += `<tr><td><b>${i}</b> ${Y[i].ten}</td><td>${SAO[i].replace(/.*\((.*)\)/, "$1")}</td><td class="${cls(Y[i].loai)}">${Y[i].loai}</td><td class="mute">${Y[i].y}</td></tr>`;
  s += `</table><p class="rule">Đây là cách luận phổ biến của Huyền không phi tinh [I]: sao đương vận và sinh khí (9, 1) tốt, sao thoái khí (8, 6, 7) giảm dần, 5 và 2 là sát tinh của mọi vận. Thẻ này chỉ bay sao năm, sao tháng; sơn tinh, hướng tinh theo tọa hướng của một căn nhà xem thẻ <b>Huyền không nhà ở</b>.</p></div>`;
  $("#kqPhiTinh").innerHTML = s;
}

// ---------- La bàn ----------
function traLaBan() {
  let deg = parseFloat($("#lbDo").value); if (!isFinite(deg)) deg = 0;
  KHO.ghi("pt_lb", deg);
  const r = PhongThuy.laBan(deg), h = r.huong, t = r.toa;
  let s = `<div class="card"><div class="laban"><div class="kim">${h.do.toFixed(1)}°</div><div>
   <h2>Hướng: sơn <b>${h.ten}</b> <span class="zh">${h.zh}</span> (${h.tu}°–${h.den}°) · cung <b>${h.huong}</b> quái ${h.quai}</h2>
   <p>${h.nguyen} · sơn <b>${h.amDuong}</b> · Tọa đối: sơn <b>${t.ten}</b> <span class="zh">${t.zh}</span> (${t.tu}°–${t.den}°), cung ${t.huong} quái ${t.quai}, ${t.nguyen}, ${t.amDuong}.</p>
   <p class="mute">Ghi theo lối sách: <b>tọa ${t.ten} hướng ${h.ten}</b>${Math.min((h.do - h.tu + 360) % 360, (h.den - h.do + 360) % 360) < 1.5 ? ` · <span class="xau">số đo sát ranh giới sơn (dưới 1,5°) — nên đo lại và cân nhắc độ lệch từ</span>` : ""}.</p></div></div>
   <div class="son24">`;
  PhongThuy.SON24.forEach((ten, i) => { const tam = i * 15, nguyen = Object.keys(PhongThuy.NGUYEN).find(k => PhongThuy.NGUYEN[k].includes(ten)).split(" ")[0];
    s += `<div class="${i === h.idx ? "on" : ""} ${i === t.idx ? "toa" : ""}" title="${nguyen} nguyên">${ten}<br><span class="mute">${tam}°</span></div>`; });
  s += `</div><p class="mute">Ô đậm: sơn hướng · ô viền đứt: sơn tọa. Thiên nguyên long: Tý Ngọ Mão Dậu, Càn Khôn Cấn Tốn · Địa nguyên long: Nhâm Bính Giáp Canh, Thìn Tuất Sửu Mùi · Nhân nguyên long: Quý Đinh Ất Tân, Dần Thân Tỵ Hợi. Âm dương sơn theo quy ước Huyền không [I].</p></div>`;
  $("#kqLaBan").innerHTML = s;
}

// ---------- Huyền không nhà ở ----------
const HK_LOP = { "tốt": "tot", "xấu": "xau", "lẫn": "lan", "bình": "" };
function lapHuyenKhong() {
  let deg = parseFloat($("#hkDo").value); if (!isFinite(deg)) deg = 0;
  const nay = new Date(), ngayNay = [nay.getDate(), nay.getMonth() + 1, nay.getFullYear()];
  const nhap = docNgay("#hkNgayNhap", ngayNay), xet = docNgay("#hkNgayXet", ngayNay), kiem = $("#hkKiem").checked !== false;
  KHO.ghi("pt_hk", { deg, nhap: $("#hkNgayNhap").value, xet: $("#hkNgayXet").value, kiem });
  const namNhap = PhongThuy.namTheoLapXuan(nhap[0], nhap[1], nhap[2]).nam, namXet = PhongThuy.namTheoLapXuan(xet[0], xet[1], xet[2]).nam, van = CuuCung.van(namNhap);
  const k = PhongThuy.huyenKhong(deg, van, { kiem, namXet }), Y = PhongThuy.Y_SAO;
  const ten = c => `${c.huong} · ${c.quai} ${c.kyHieu}`;
  let s = `<div class="card"><h2>Tọa <b>${k.toa.ten}</b> hướng <b>${k.huong.ten}</b> <span class="zh">${k.toa.zh}山${k.huong.zh}向</span> · ${k.do.toFixed(1)}° (${k.huong.huong}) · vận <b>${k.van}</b> (${van.tu}–${van.den}, nhập trạch năm ${namNhap})</h2>
   <p>${k.huong.nguyen}, sơn hướng ${k.huong.amDuong}. Lệch tâm sơn ${Math.abs(k.kiem.lech)}°${k.kiem.co ? ` → <b>kiêm ${k.kiem.sonKiem}</b>${k.kiem.apDung ? " — đã dùng thế quái [I]" : " — đang tắt kiêm hướng, tính như chính hướng"}` : " → chính hướng (trong ±" + k.kiem.nguong + "°)"}.
   Cục: <b class="${cls(k.cuc.loai)}">${k.cuc.ten}</b> — ${k.cuc.y}</p>
   <p class="mute">Vận bàn: ${k.van} vào giữa, bay thuận. Hướng tinh: lấy ${k.huongBan.saoGoc} ở cung hướng vào giữa${k.huongBan.theQuai && k.huongBan.theQuai.thay ? `, thế quái ${k.huongBan.sonQuyetDinh} → ${k.huongBan.saoTrung} (${k.huongBan.theQuai.ten}) [${k.huongBan.theQuai.nhan}]` : ""}, sơn quyết định ${k.huongBan.sonQuyetDinh} (${k.huongBan.amDuong}) → bay ${k.huongBan.thuan ? "thuận" : "nghịch"}.
   Sơn tinh: lấy ${k.sonBan.saoGoc} ở cung tọa vào giữa${k.sonBan.theQuai && k.sonBan.theQuai.thay ? `, thế quái ${k.sonBan.sonQuyetDinh} → ${k.sonBan.saoTrung} (${k.sonBan.theQuai.ten}) [${k.sonBan.theQuai.nhan}]` : ""}, sơn quyết định ${k.sonBan.sonQuyetDinh} (${k.sonBan.amDuong}) → bay ${k.sonBan.thuan ? "thuận" : "nghịch"}.
   ${k.ngam.son || k.ngam.huong ? `<span class="xau">${[k.ngam.son && "sơn bàn " + k.ngam.son, k.ngam.huong && "hướng bàn " + k.ngam.huong].filter(Boolean).join(", ")}</span> (sao 5 vào giữa).` : ""}</p>
   <div class="luoi">`;
  for (const hang of k.luoi) for (const c of hang) {
    s += `<div class="o ${c.so === 5 ? "trung" : ""} ${HK_LOP[c.danhGia]} ${c.laHuong ? "hkhuong" : ""} ${c.laToa ? "hktoa" : ""}"><div class="h">${c.so === 5 ? "Trung cung" : ten(c)} <span class="mute">(${c.so})</span>${c.laHuong ? " <b>HƯỚNG</b>" : c.laToa ? " <b>TỌA</b>" : ""}</div>
      <div class="hk3"><span class="st ${cls(c.khiSon.muc >= 2 ? "tốt" : c.khiSon.muc <= -2 ? "xấu" : "bình")}" title="sơn tinh">${c.sonTinh}</span><span class="vt" title="vận tinh">${c.vanTinh}</span><span class="ht ${cls(c.khiHuong.muc >= 2 ? "tốt" : c.khiHuong.muc <= -2 ? "xấu" : "bình")}" title="hướng tinh">${c.huongTinh}</span></div>
      <div class="t mute">sơn ${c.khiSon.ten} · hướng ${c.khiHuong.ten}${c.toHop.length ? `<br><b class="${cls(c.toHop[0].loai)}">${c.toHop.map(t => t.ten).join(", ")}</b>` : ""}</div>
      ${c.saoNam ? `<div class="nam n${c.saoNam}">năm ${k.nam.namXet}: ${c.saoNam} ${Y[c.saoNam].ten}</div>` : ""}</div>`;
  }
  s += `</div><p class="chugiai mute"><span><b>Số trái</b> sơn tinh (người, sức khỏe)</span><span><b>Số giữa</b> vận tinh</span><span><b>Số phải</b> hướng tinh (tiền của)</span><span>Viền đỏ: cung hướng · viền xám: cung tọa</span><span>Xanh: tốt · đỏ: xấu · hai màu: vừa tốt vừa xấu</span></p></div>`;
  s += `<div class="card"><h3>Nói ngắn</h3><ul class="noingan">${k.noiNgan.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
  s += `<div class="card"><h3>Chi tiết từng cung</h3><table class="tb"><tr><th>Cung</th><th>Sơn – vận – hướng</th><th>Sơn tinh</th><th>Hướng tinh</th><th>Sao năm ${k.nam.namXet}</th><th>Nhận xét</th></tr>`;
  for (const c of [9, 4, 3, 8, 1, 6, 7, 2, 5].map(n => k.cung[n])) s += `<tr><td><b>${c.so === 5 ? "Trung cung" : c.huong}</b> ${c.so === 5 ? "" : c.quai + " " + c.kyHieu}${c.laHuong ? "<br><span class='tag'>hướng</span>" : c.laToa ? "<br><span class='tag'>tọa</span>" : ""}</td><td class="${cls(c.danhGia === "lẫn" ? "bình" : c.danhGia)}">${c.sonTinh} – ${c.vanTinh} – ${c.huongTinh}</td>
    <td>${c.sonTinh} ${Y[c.sonTinh].ten}: <span class="mute">${c.khiSon.y}</span></td><td>${c.huongTinh} ${Y[c.huongTinh].ten}: <span class="mute">${c.khiHuong.y}</span></td><td class="${c.saoNam === 5 || c.saoNam === 2 ? "xau" : ""}">${c.saoNam} ${Y[c.saoNam].ten}</td><td class="mute">${c.ghiChu.map(esc).join("<br>") || "—"}</td></tr>`;
  s += `</table><p class="rule">Toàn bộ quy tắc Huyền không ở đây là <b>quy ước phổ biến [I]</b> (Thẩm thị huyền không học chưa có bản công cộng để đối chiếu); ca quyết thế quái 12 sơn là [V] theo Thanh nang áo ngữ. Huyền không có nhiều phái, cùng một nhà có thể ra lưới khác nhau — kết quả để tham khảo, không thay việc xem xét tại chỗ; muốn chắc hãy xem thêm thẻ Cách tính và nguồn.</p></div>`;
  $("#kqHuyenKhong").innerHTML = s;
}

// ---------- Cách tính và nguồn ----------
function trangCach() {
  const v = "[V] đối chiếu được nguyên văn đã tải (PHONG THUY/nguon/)", i = "[I] quy ước phổ biến của phái, chưa đối chiếu sách gốc", u = "[U] chưa có nguồn mở";
  $("#cachHtml").innerHTML = `<div class="card"><h2>Cách tính và nguồn</h2>
  <table class="tb"><tr><th>Lớp</th><th>Quy tắc</th><th>Nguồn, nhãn</th></tr>
  <tr><td>Năm sinh, năm xét</td><td>Theo Lập xuân: tháng tiết Dần trở đi mới sang năm mới (LichAm.chiThangTiet)</td><td>Lõi chung, đã kiểm mốc (3/2/2026 còn Sửu, 4/2/2026 sang Dần)</td></tr>
  <tr><td>Cửu cung Lạc thư ↔ quái ↔ hướng</td><td>1 Khảm Bắc, 2 Khôn Tây Nam, 3 Chấn Đông, 4 Tốn Đông Nam, 5 trung, 6 Càn Tây Bắc, 7 Đoài Tây, 8 Cấn Đông Bắc, 9 Ly Nam</td><td>Thanh nang kinh, phần chú: <span class="zh">一起正北，二居西南，三居正東，四居東南，五複居中，六居西北，七居正西，八居東北，九居正南</span> và <span class="zh">坎一，坤二，震三，巽四，中五，乾六，兌七，艮八，離九</span> ${v}</td></tr>
  <tr><td>Quái mệnh Bát trạch</td><td>Nam = niên tinh năm sinh (CuuCung.nienTinh); nữ = 15 − niên tinh đưa về 1–9; số 5: nam Khôn, nữ Cấn. Đông tứ: Khảm Ly Chấn Tốn; Tây tứ: Càn Khôn Cấn Đoài</td><td>${i}. Mốc tin cậy đã kiểm: nam 1984 Giáp Tý Đoài, nữ 1984 Cấn; nam 1990 Khảm, nữ 1990 Cấn. Bát trạch minh kính, Dương trạch tam yếu ${u} (Wikisource không có)</td></tr>
  <tr><td>Tám du niên</td><td>Biến hào từ quái mệnh (bit từ dưới lên như HANH_QUAI): Sinh khí hào trên; Họa hại hào dưới; Tuyệt mệnh hào giữa; Thiên y dưới + giữa; Ngũ quỷ giữa + trên; Lục sát trên + dưới; Diên niên cả ba; Phục vị không biến</td><td>${i}; kết quả khớp bảng lưu truyền: Càn → Sinh khí Đoài, Thiên y Cấn, Diên niên Khôn, Tuyệt mệnh Ly, Ngũ quỷ Chấn, Lục sát Khảm, Họa hại Tốn; Khảm → Sinh khí Tốn, Thiên y Chấn, Diên niên Ly</td></tr>
  <tr><td>Ý nghĩa du niên, sao đi kèm</td><td>Sinh khí Tham Lang, Thiên y Cự Môn, Diên niên Vũ Khúc, Phục vị Phụ Bật tốt; Họa hại Lộc Tồn, Lục sát Văn Khúc, Ngũ quỷ Liêm Trinh, Tuyệt mệnh Phá Quân xấu</td><td>${i}</td></tr>
  <tr><td>Đánh giá hạng mục</td><td>Nhà xét tọa (tọa cát), ghi thêm hướng; cửa hướng cát; bếp tọa hung hướng cát (hướng bếp = lưng người nấu); đầu giường, lưng ghế về hướng cát</td><td>${i} — Dương trạch tam yếu (Môn, Chủ, Táo) ${u}; nhiều thầy Việt Nam xét nhà theo hướng mặt tiền, bảng ghi cả hai</td></tr>
  <tr><td>Niên tinh, nguyệt tinh</td><td>CuuCung.nienTinh (1864 Nhất Bạch, mỗi năm lùi một); CuuCung.nguyetTinh (năm Tý Ngọ Mão Dậu tháng Dần 8, Thìn Tuất Sửu Mùi 5, Dần Thân Tỵ Hợi 2, mỗi tháng lùi một)</td><td>Lõi chung; mốc 2024 Tam Bích, 2026 Nhất Bạch ${i} về nguyệt tinh</td></tr>
  <tr><td>Bay thuận</td><td>Sao nhập trung rồi theo thứ tự Lạc thư 5→6→7→8→9→1→2→3→4; cung số n nhận sao (trung + n − 5) đưa về 1–9</td><td>${i}, tin cao; kiểm: 2024 Ngũ Hoàng ở Tây, 2025 ở Đông Bắc, 2026 ở Nam, khớp lịch phong thủy phổ thông</td></tr>
  <tr><td>Ý nghĩa 9 sao vận 9</td><td>9 đương vận, 1 sinh khí, 8 thoái còn tốt, 2 bệnh phù, 5 đại sát, 3 thị phi, 7 phá tài, 4 văn xương, 6 quan tinh</td><td>${i} — Thẩm thị huyền không học ${u}</td></tr>
  <tr><td>24 sơn</td><td>Mỗi 15°, Tý ở tâm 0° (352,5°–7,5°), thuận kim đồng hồ: Tý Quý Sửu Cấn Dần Giáp Mão Ất Thìn Tốn Tỵ Bính Ngọ Đinh Mùi Khôn Thân Canh Dậu Tân Tuất Càn Hợi Nhâm; quái 45°; tọa = hướng + 180°</td><td>Quy ước la bàn chung của mọi phái, ${i} về cách chia</td></tr>
  <tr><td>Tam nguyên long, âm dương sơn</td><td>Thiên nguyên: Tý Ngọ Mão Dậu (âm), Càn Khôn Cấn Tốn (dương); Địa nguyên: Nhâm Bính Giáp Canh (dương), Thìn Tuất Sửu Mùi (âm); Nhân nguyên: Quý Đinh Ất Tân (âm), Dần Thân Tỵ Hợi (dương)</td><td>${i} (Huyền không), chưa có sách gốc mở</td></tr>
  <tr><td>Độ lệch từ</td><td>Việt Nam nhỏ, cỡ dưới 1° tùy vùng; đo xa kim loại</td><td>${i} — muốn chính xác tra mô hình từ trường thế giới (WMM) cho nơi đo</td></tr>
  <tr><th colspan="3">Huyền không phi tinh nhà ở (thẻ "Huyền không nhà ở")</th></tr>
  <tr><td>Vận nhập trạch</td><td>CuuCung.van của năm nhập trạch hoặc xây xong (năm theo Lập xuân); vận 8: 2004–2023, vận 9: 2024–2043</td><td>Lõi chung, mốc 1864 vận 1</td></tr>
  <tr><td>Vận bàn</td><td>Sao vận vào trung cung, bay thuận 5→6→7→8→9→1→2→3→4</td><td>${i}, tin cao</td></tr>
  <tr><td>Sơn tinh, hướng tinh</td><td>Lấy sao vận bàn ở cung tọa (sơn tinh) và cung hướng (hướng tinh) đưa vào trung cung. Chiều bay: xét cung Lạc thư của chính số ấy, lấy sơn cùng nguyên long với hướng nhà trong cung đó (hướng Ngọ Thiên nguyên, số 3 là Chấn → Mão); sơn dương bay thuận, âm bay nghịch. Số 5 không có cung riêng → lấy sơn cùng nguyên ngay trong cung tọa/hướng gốc</td><td>${i} — quy ước của phái Thẩm thị, Thẩm thị huyền không học ${u}. Mốc tự tính tay và kiểm bằng tool: vận 8 tọa Tý hướng Ngọ ra lưới quen thuộc (Nam 8–3–8, Bắc 9–4–7), vận 8 chỉ có sáu cặp vượng sơn vượng hướng (Càn–Tốn, Tốn–Càn, Hợi–Tỵ, Tỵ–Hợi, Sửu–Mùi, Mùi–Sửu), vận 1 và vận 9 không có cặp nào — khớp lời truyền "nhất cửu vận vô vượng sơn vượng hướng"</td></tr>
  <tr><td>Kiêm hướng, thế quái</td><td>Lệch tâm sơn quá ${PhongThuy.HK_CONFIG.nguongKiem}° (CONFIG) → thay sao vào trung cung bằng thế quái của sơn quyết định (Tham Lang 1, Cự Môn 2, Vũ Khúc 6, Phá Quân 7, Hữu Bật 9); chiều bay vẫn theo âm dương sơn ấy; thế quái bằng sao gốc thì không thay. Tắt được</td><td>12 sơn [V] Thanh nang áo ngữ (<span class="zh">坤壬乙巨門從頭出，艮丙辛位位是破星，巽辰亥儘是武曲位，甲癸申貪狼一路行</span>, <code>nguon/thanh-nang-ao-ngu.txt</code>; bản lưu hành chép 破軍); 12 sơn còn lại ${i} theo Thế quái ca phái Thẩm thị (<code>data/the-quai.js</code>). Ngưỡng 3° ${i}; thế quái khác nhau giữa các phái</td></tr>
  <tr><td>Bốn cục</td><td>Hướng tinh đương vận ở cung hướng + sơn tinh đương vận ở cung tọa → vượng sơn vượng hướng; đổi chỗ → thượng sơn hạ thủy; cả hai ở cung hướng → song tinh đáo hướng; cả hai ở cung tọa → song tinh đáo tọa. Hệ quả toán học: hướng bàn bay nghịch ⇔ vượng hướng, sơn bàn bay nghịch ⇔ vượng sơn</td><td>${i}; cách gọi tên và lời khuyên địa hình (trước thoáng sau cao…) là lời phổ biến</td></tr>
  <tr><td>Phản ngâm, phục ngâm</td><td>Sao 5 vào trung cung sơn bàn hoặc hướng bàn: bay thuận cả bàn trùng Lạc thư (phục ngâm), bay nghịch cả bàn cộng Lạc thư bằng 10 (phản ngâm)</td><td>${i}</td></tr>
  <tr><td>Khí của sao</td><td>Bằng vận: vượng; vận + 1: sinh; vận + 2: tiến; vận − 1: thoái; còn lại suy; 5 và 2 luôn là sát, bệnh</td><td>${i}</td></tr>
  <tr><td>Tổ hợp sơn – hướng</td><td>2–5 Nhị Ngũ, 2–3 Đấu ngưu, 3–7, 6–7 Giao kiếm, 7–9 Cửu Thất xấu; 1–4 Văn xương, 1–6, 6–8, 8–9 (vận 8, 9) tốt</td><td>${i} — lời luận phổ biến, chưa đối chiếu sách gốc</td></tr>
  <tr><td>Sao năm cộng vào</td><td>Niên tinh năm đang xét (Lập xuân) bay thuận, ghi vào từng cung; cung có 5 Ngũ Hoàng, 2 Nhị Hắc → không động thổ, sửa chữa năm đó; chồng với sao xấu của nhà càng phải giữ yên</td><td>Lõi chung; ${i} về lời luận. Chưa làm: Thái Tuế, Tam Sát theo chi năm</td></tr></table>
  <p class="rule"><b>Nhắc:</b> Huyền không có nhiều phái (Thẩm thị, Trung Châu, Đàm thị…), cùng một nhà có thể cho lưới khác nhau, nhất là khi kiêm hướng. Mọi lời luận ở đây là tham khảo, không thay quyết định của người xem.</p>
  <h3>Hai câu gốc về khí và thủy</h3>
  <p>Thanh nang kinh (<span class="zh">青囊經</span>, hạ quyển Hóa thành): <span class="zh">外氣行形，內氣止生，乘風則散，界水則止</span> — ngoại khí chạy theo hình, nội khí dừng mà sinh; gặp gió thì tán, gặp nước thì dừng. ${v}: <code>nguon/thanh-nang-kinh.txt</code>, nguồn https://zh.wikisource.org/wiki/青囊經</p>
  <p>Thanh nang kinh, trung quyển Hóa cơ: <span class="zh">形止氣蓄，萬物化生</span> — hình dừng thì khí tụ, muôn vật hóa sinh. ${v}</p>
  <p>Táng thư (<span class="zh">葬書</span>, Quách Phác): trang Wikisource https://zh.wikisource.org/wiki/葬書 chỉ có đề yếu Tứ khố và ảnh quét, chưa có chính văn dạng chữ; đề yếu dẫn câu <span class="zh">乘風則散，界水則止</span> và khen thuyết <span class="zh">乘生氣</span>. Nguyên văn Táng thư: ${u}; câu dẫn qua đề yếu: [V đề yếu] <code>nguon/tang-thu.txt</code></p>
  <p>Thanh nang áo ngữ (<span class="zh">青囊奧語</span>, truyền là của Dương Quân Tùng): bốn câu mở đầu là ca quyết thế quái 12 sơn. ${v}: <code>nguon/thanh-nang-ao-ngu.txt</code>, nguồn https://zh.wikisource.org/wiki/青囊奧語</p>
  <p class="mute">Chưa làm: Dương trạch tam yếu (Môn – Chủ – Táo theo cung của nhà), hình thế (long huyệt sa thủy), Thái Tuế, Tam Sát, thành môn quyết, linh thần chính thần. Mọi thuật số chỉ để chiêm nghiệm, không thay quyết định của người xem.</p></div>`;
}

// ---------- Khởi động ----------
const TABS = ["battrach", "phitinh", "laban", "huyenkhong", "cach"];
function tab(id) { TABS.forEach(x => $("#" + x).classList.toggle("hidden", x !== id)); document.querySelectorAll("nav button").forEach(b => b.classList.toggle("on", b.dataset.t === id)); KHO.ghi("pt_tab", id); }
document.querySelectorAll("nav button").forEach(b => b.onclick = () => tab(b.dataset.t));
napHuong();
{ const v = KHO.doc("pt_bt", null);
  if (v) { $("#btNgay").value = v.ngay || ""; $("#btGioi").value = v.gioi || "nam"; $("#btNha").value = v.nha || ""; $("#btCua").value = v.cua || ""; $("#btBepVt").value = v.bepViTri || ""; $("#btBepH").value = v.bepHuong || ""; $("#btGiuong").value = v.giuong || ""; $("#btBan").value = v.ban || ""; }
  const p = KHO.doc("pt_pt", ""); if (p) $("#ptNgay").value = p; else datNgay("#ptNgay", new Date());
  const d = KHO.doc("pt_lb", null); if (d !== null) { $("#lbDo").value = d; $("#lbTruot").value = d; }
  const h = KHO.doc("pt_hk", null); if (h) { $("#hkDo").value = h.deg; $("#hkNgayNhap").value = h.nhap || ""; $("#hkNgayXet").value = h.xet || ""; $("#hkKiem").checked = h.kiem !== false; }
  if (!$("#hkNgayNhap").value) datNgay("#hkNgayNhap", new Date()); if (!$("#hkNgayXet").value) datNgay("#hkNgayXet", new Date()); }
$("#btnBatTrach").onclick = xemBatTrach;
$("#btnPhiTinh").onclick = lapPhiTinh; $("#btnPtNay").onclick = () => { datNgay("#ptNgay", new Date()); lapPhiTinh(); };
$("#btnLaBan").onclick = traLaBan; $("#lbDo").onchange = () => { $("#lbTruot").value = $("#lbDo").value; traLaBan(); }; $("#lbTruot").oninput = () => { $("#lbDo").value = $("#lbTruot").value; traLaBan(); };
$("#btnHuyenKhong").onclick = lapHuyenKhong; $("#hkDo").onchange = lapHuyenKhong; $("#hkKiem").onchange = lapHuyenKhong;
trangCach(); xemBatTrach(); lapPhiTinh(); traLaBan(); lapHuyenKhong();
{ const t = KHO.doc("pt_tab", "battrach"); if (TABS.includes(t)) tab(t); }
