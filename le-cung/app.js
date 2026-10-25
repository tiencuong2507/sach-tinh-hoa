// Lễ cúng — giao diện. Dùng LC_LE (data/*.js) và lõi chung LichAm, CanChi.
// Trang: mục lục 3 nhóm · một lễ (đủ phần, điền bài khấn, sao chép, chọn ngày tốt) · lịch lễ năm nay · nguồn và giới hạn.
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const D = window.LC_LE, LE = D.le, pad = x => String(x).padStart(2, "0");
const THANG_AM = ["", "Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Một", "Chạp"];
let leDangXem = null;

// ---- Lịch âm ----
const amCua = d => LichAm.solar2lunar(d.getDate(), d.getMonth() + 1, d.getFullYear());
const tenNamAm = y => CanChi.ten(CanChi.nam(y));
const dmy = d => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
const congNgay = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const tenNgayAm = d => { const a = amCua(d); return `${a.ngay} tháng ${THANG_AM[a.thang]}${a.nhuan ? " nhuận" : ""} năm ${tenNamAm(a.nam)} (âm lịch), tức ${dmy(d)} dương lịch`; };
const docNgay = v => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v || ""); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const ghiNgay = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// Bảng âm lịch của một năm dương: khóa "ngày/tháng" (tháng nhuận thêm "n") → [Date]
const _bang = {};
function bangAm(nam) {
  if (_bang[nam]) return _bang[nam];
  const b = {};
  for (let d = new Date(nam, 0, 1); d.getFullYear() === nam; d = congNgay(d, 1)) { const a = amCua(d); (b[`${a.ngay}/${a.thang}${a.nhuan ? "n" : ""}`] ||= []).push(d); }
  return _bang[nam] = b;
}
const ngayAmTrongNam = (nam, ngay, thang) => bangAm(nam)[`${ngay}/${thang}`] || [];
// Tiết khí: ngày đầu tiên có kinh độ Mặt Trời (0h) vượt mốc; Thanh minh 15°, tìm trong tháng 3–4
function ngayTiet(nam, kinhDo) {
  for (let d = new Date(nam, 2, 1); d.getMonth() <= 4; d = congNgay(d, 1)) {
    const a = LichAm.kinhDoMatTroi(d.getDate(), d.getMonth() + 1, nam, 0, 0), b = LichAm.kinhDoMatTroi(d.getDate() + 1, d.getMonth() + 1, nam, 0, 0);
    if (a < kinhDo && b >= kinhDo) return d;
  }
  return null;
}
// Ngày giỗ năm thứ k sau khi mất (cùng ngày tháng âm; mất tháng nhuận thì giỗ tháng thường; tháng thiếu thì lùi 1 ngày)
function ngayGio(ngayMat, k) {
  const a = amCua(ngayMat), nam = a.nam + k;
  for (const ng of [a.ngay, a.ngay - 1]) for (const gy of [nam, nam + 1]) {
    const ds = ngayAmTrongNam(gy, ng, a.thang).filter(d => amCua(d).nam === nam);
    if (ds.length) return { ngay: ds[0], lui: ng !== a.ngay };
  }
  return null;
}
// Các ngày dương của một lễ quanh năm trong năm `nam`
function ngayLe(le, nam) {
  const t = le.thoiDiem;
  if (t.loai === "am") return ngayAmTrongNam(nam, t.ngay, t.thang);
  if (t.loai === "tiet") { const d = ngayTiet(nam, t.kinhDo); return d ? [d] : []; }
  return [];
}
function moTaThoiDiem(le) {
  const t = le.thoiDiem, g = t.ghi ? ` <span class="mute">— ${esc(t.ghi)}</span>` : "";
  if (t.loai === "am") return `Ngày ${t.ngay} tháng ${THANG_AM[t.thang]} âm lịch${g}`;
  if (t.loai === "tiet") return `Tiết ${esc(le.ten)} (kinh độ Mặt Trời ${t.kinhDo}°)${g}`;
  if (t.loai === "hang-thang") return `Mùng ${t.moc.join(" và ")} âm lịch hằng tháng${g}`;
  if (t.loai === "sau-sinh") return `Tính từ ngày sinh${g}`;
  if (t.loai === "sau-mat") return t.moc ? `Tính từ ngày mất${g}` : t.ngay ? `Ngày thứ ${t.ngay} sau khi mất${g}` : `Ngay sau khi mất${g}`;
  if (t.loai === "gio") return `Ngày mất âm lịch, hằng năm${g}`;
  return `Chọn ngày${g}`;
}

// ---- Trang mục lục ----
function trangMucLuc() {
  let s = `<div class="card"><p>Mỗi lễ có: thời điểm · ý nghĩa · tục lệ (nguyên văn Phan Kế Bính, 1915) · lễ vật · trình tự · bài khấn (bản soạn của kho, điền được tên, địa chỉ, ngày) · khung pháp lý · dị bản có nguồn.
  Lễ nào Phan Kế Bính không chép, kho ghi rõ và phần tự soạn mang nhãn <span class="tag i">[I]</span>.</p>
  <p class="mute">Lời Phan Kế Bính: <i>sự cúng cấp là để tỏ cái lòng thành kính, chứ không phải để mà phụng dưỡng tổ-tiên, thì dùng cách nào cho ngụ được cái lòng ấy cũng đủ</i>. Chu Tử gia lễ: <span class="zh">貧則稱家之有無</span> — nghèo thì tùy nhà có hay không.</p></div>`;
  for (const n of D.nhom) {
    const ds = LE.filter(l => l.nhom === n.ma);
    s += `<h3>${esc(n.ten)} <span class="mute">(${ds.length} lễ)</span></h3><p class="mute">${esc(n.mota)}</p><div class="grid">`;
    for (const l of ds) s += `<a class="le" href="#le/${l.ma}" onclick="go('le/${l.ma}');return false"><b>${esc(l.ten)}</b><br><span class="mute">${moTaThoiDiem(l).replace(/<span class="mute">.*<\/span>/, "")}</span>${l.tucLe.length && !l.ghiTucLe ? "" : ` <span class="tag i">[I]</span>`}</a>`;
    s += `</div>`;
  }
  $("#muc-luc").innerHTML = s;
}

// ---- Trang một lễ ----
const khoiTrich = t => `<blockquote>${esc(t.t)}<span class="m">— Phan Kế Bính, Việt Nam phong tục, mục ${esc(t.m)}</span></blockquote>`;
function trangLe(ma) {
  const l = LE.find(x => x.ma === ma); if (!l) { $("#le").innerHTML = `<div class="card">Không có lễ "${esc(ma)}".</div>`; return; }
  leDangXem = l;
  const nhom = D.nhom.find(n => n.ma === l.nhom), nam = new Date().getFullYear(), ds = ngayLe(l, nam);
  let s = `<div class="card"><p class="noprint"><a href="#muc-luc" onclick="go('muc-luc');return false">← Mục lục</a> · <span class="tag">${esc(nhom.ten)}</span></p>
   <h2>${esc(l.ten)}</h2>${l.tenKhac ? `<p class="mute">Tên khác: ${esc(l.tenKhac)}</p>` : ""}
   <p><b>Thời điểm:</b> ${moTaThoiDiem(l)}${ds.length ? `<br><b>Năm ${nam}:</b> ${ds.map(d => `<b>${dmy(d)}</b>`).join(", ")}` : ""}
   ${l.viec ? ` &nbsp; <a class="btn noprint" target="_blank" rel="noopener" href="../xem-ngay/xem-ngay.html?viec=${encodeURIComponent(l.viec)}">🗓 Chọn ngày tốt (xem ngày, việc: ${esc(tenViec(l.viec))})</a>` : ""}</p>
   <h3>Ý nghĩa</h3><p>${esc(l.yNghia)}</p>`;
  s += `<h3>Tục lệ xưa — Phan Kế Bính chép</h3>`;
  if (l.ghiTucLe) s += `<p><span class="tag i">[I]</span> ${esc(l.ghiTucLe)}</p>`;
  s += l.tucLe.length ? l.tucLe.map(khoiTrich).join("") : `<p><span class="tag i">[I]</span> Phan Kế Bính không chép lễ này.</p>`;
  s += `<h3>Lễ vật <span class="mute">(tùy nhà, tùy vùng; không bắt buộc đủ)</span></h3><ul>${l.leVat.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
  s += `<h3>Trình tự gọn</h3><ol>${l.trinhTu.map(x => `<li>${esc(x)}</li>`).join("")}</ol>`;
  if (l.nhom === "tang-gio") s += khoiTang(l);
  if (l.thoiDiem.loai === "sau-sinh") s += khoiSinh(l);
  s += `<h3>Bài khấn <span class="tag i">bản soạn của kho, không phải bản cổ</span></h3>
   <p class="mute">Soạn theo khung 6 phần của Chu Tử gia lễ quyển 5 (xem trang Nguồn): thời gian · người khấn · kính cáo · đối tượng · lý do và lễ vật · lời cầu. Tiếng Việt thường, đọc được thành tiếng. Anh chị sửa chữ cho hợp nhà mình.</p>
   <div class="row noprint">Tên người khấn <input id="f-ten" placeholder="vd Nguyễn Văn An" size="18">
   Họ <input id="f-ho" placeholder="vd Nguyễn" size="8">
   Địa chỉ <input id="f-dc" placeholder="số nhà, phường, tỉnh" size="26">
   Ngày làm lễ <input id="f-ngay" type="date">
   ${/\[người đã khuất\]/.test(l.vanKhan) ? `Người đã khuất <input id="f-nguoi" placeholder="vd cụ ông Nguyễn Văn Bình" size="22">` : ""}
   <button class="btn acc" onclick="dienKhan()">Điền thông tin</button> <button class="btn" onclick="saoChep()">📋 Sao chép</button></div>
   <div class="khan" id="khan-out">${esc(l.vanKhan)}</div>
   <p class="mute">Chỗ còn trong [ngoặc vuông] anh chị tự điền; chỗ có dấu / là chọn một trong hai.</p>`;
  s += `<h3>Khung pháp lý hiện hành</h3>`;
  s += l.phapLy.length ? `<div class="luat"><ul>${l.phapLy.map(p => { const v = D.vanBan[p.vb]; return `<li><b>${esc(v ? v.ten : p.vb)}</b>${v ? ` <span class="mute">(${esc(v.ve)})</span>` : ""}: ${esc(p.y)}</li>`; }).join("")}</ul><p class="mute">Số hiệu theo bản đồ kho; chưa dẫn số điều cụ thể.</p></div>` : `<p class="mute">Không có quy định riêng cho lễ này.</p>`;
  s += `<h3>Dị bản có nguồn</h3><ul>${l.diBan.map(b => `<li>${b.trich ? `<i>${esc(b.nd)}</i>` : esc(b.nd)} <span class="mute">— ${esc(b.nguon)}</span></li>`).join("")}</ul>`;
  s += `</div>`;
  $("#le").innerHTML = s;
  try { $("#f-ten").value = localStorage.getItem("lc_ten") || ""; $("#f-ho").value = localStorage.getItem("lc_ho") || ""; $("#f-dc").value = localStorage.getItem("lc_dc") || ""; } catch (e) {}
  if (ds.length) $("#f-ngay").value = ghiNgay(ds.find(d => d >= new Date(new Date().setHours(0, 0, 0, 0))) || ds[0]);
}
function tenViec(ma) { const B = { "te-le": "cúng tế, giỗ chạp", "cau-phuc": "cầu phúc, cầu an", "dong-tho": "động thổ", "nhap-trach": "về nhà mới", "an-tang": "an táng", "cai-tang": "cải táng", "cuoi-ga": "cưới gả", "dam-hoi": "dạm ngõ, ăn hỏi", "khai-truong": "khai trương", "an-than": "an vị thần, lập bàn thờ", "tiec-tung": "tiệc tùng, họp mặt" }; return B[ma] || ma; }

// Khối tính ngày cho lễ tang theo ngày mất
function khoiTang(l) {
  return `<h3>Tính ngày theo ngày mất</h3><div class="row noprint">Ngày mất (dương lịch) <input id="f-mat" type="date"> <button class="btn" onclick="tinhTang()">Tính</button></div>
   <div id="tang-out"><p class="mute">Nhập ngày mất để ra ngày lễ 3 ngày, tuần đầu, 49, 100 ngày, giỗ đầu, giỗ hết, giỗ thường. Kho ghi cả hai cách đếm vì không có nguồn quy định.</p></div>`;
}
function tinhTang() {
  const d = docNgay($("#f-mat").value); if (!d) { $("#tang-out").innerHTML = `<p class="mute">Chưa có ngày mất.</p>`; return; }
  const a = amCua(d), dong = (ten, n) => `<tr><td>${ten}</td><td>${dmy(congNgay(d, n - 1))} <span class="mute">(ngày mất là ngày 1)</span></td><td>${dmy(congNgay(d, n))} <span class="mute">(ngày mất + ${n})</span></td></tr>`;
  let s = `<p>Ngày mất: <b>${dmy(d)}</b>, tức ${tenNgayAm(d).replace(/, tức.*$/, "")}.</p><table class="tb"><tr><th>Lễ</th><th>Cách đếm 1</th><th>Cách đếm 2</th></tr>
   ${dong("Lễ ba ngày", 3)}${dong("Tuần đầu (7 ngày)", 7)}${dong("49 ngày (chung thất)", 49)}${dong("100 ngày (tốt khốc)", 100)}</table><table class="tb"><tr><th>Giỗ</th><th>Ngày dương</th></tr>`;
  for (const [ten, k] of [["Giỗ đầu (tiểu tường)", 1], ["Giỗ hết (đại tường)", 2], ["Giỗ thường năm thứ 3", 3], ["Giỗ thường năm thứ 4", 4], ["Giỗ thường năm thứ 5", 5]]) {
    const g = ngayGio(d, k); s += `<tr><td>${ten}</td><td>${g ? `<b>${dmy(g.ngay)}</b> (${a.ngay}/${a.thang} âm năm ${tenNamAm(a.nam + k)})${g.lui ? ' <span class="mute">tháng thiếu, lùi 1 ngày</span>' : ""}` : "không tính được"}</td></tr>`;
  }
  s += `</table><p class="mute">Cúng tiên thường vào chiều hôm trước ngày giỗ.${a.nhuan ? " Người mất trong tháng nhuận: kho lấy giỗ ở tháng thường cùng số, chưa có nguồn quy định." : ""}</p>`;
  $("#tang-out").innerHTML = s;
}
function khoiSinh(l) {
  return `<h3>Tính ngày theo ngày sinh</h3><div class="row noprint">Ngày sinh (dương lịch) <input id="f-sinh" type="date"> <button class="btn" onclick="tinhSinh()">Tính</button></div><div id="sinh-out"></div>`;
}
function tinhSinh() {
  const d = docNgay($("#f-sinh").value); if (!d) { $("#sinh-out").innerHTML = `<p class="mute">Chưa có ngày sinh.</p>`; return; }
  const a = amCua(d), g = ngayGio(d, 1), thangAm = ngayAmTrongNam(d.getFullYear(), a.ngay, a.thang === 12 ? 1 : a.thang + 1).concat(ngayAmTrongNam(d.getFullYear() + 1, a.ngay, a.thang === 12 ? 1 : a.thang + 1)).find(x => x > d);
  $("#sinh-out").innerHTML = `<table class="tb"><tr><th>Lễ</th><th>Theo dương lịch</th><th>Theo âm lịch</th></tr>
   <tr><td>Đầy tháng</td><td>${dmy(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()))}</td><td>${thangAm ? dmy(thangAm) : "—"} <span class="mute">(${a.ngay} tháng sau)</span></td></tr>
   <tr><td>Thôi nôi</td><td>${dmy(new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()))}</td><td>${g ? dmy(g.ngay) : "—"}</td></tr></table><p class="mute">Nhà theo dương hay theo âm đều được; tục "gái lùi hai, trai lùi một" chưa có nguồn, kho không áp dụng.</p>`;
}

// Điền bài khấn: [tên] [họ] [địa chỉ] [ngày] [năm mới] [người đã khuất]
function dienKhan() {
  const l = leDangXem; if (!l) return;
  const ten = $("#f-ten").value.trim(), ho = $("#f-ho").value.trim(), dc = $("#f-dc").value.trim(), ng = docNgay($("#f-ngay").value) || new Date();
  const nguoi = /\[người đã khuất\]/.test(l.vanKhan) ? $("#f-nguoi").value.trim() : "";
  try { localStorage.setItem("lc_ten", ten); localStorage.setItem("lc_ho", ho); localStorage.setItem("lc_dc", dc); } catch (e) {}
  let k = l.vanKhan.replace(/\[ngày\]/g, tenNgayAm(ng)).replace(/\[năm mới\]/g, tenNamAm(amCua(congNgay(ng, 1)).nam));
  if (ten) k = k.replace(/\[tên\]/g, ten); if (ho) k = k.replace(/\[họ\]/g, ho); if (dc) k = k.replace(/\[địa chỉ\]/g, dc); if (nguoi) k = k.replace(/\[người đã khuất\]/g, nguoi);
  $("#khan-out").innerHTML = esc(k);
}
function saoChep() {
  const t = $("#khan-out").innerText || $("#khan-out").textContent || "";
  if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(t).then(() => alert("Đã sao chép bài khấn.")).catch(() => alert("Không sao chép được, anh chị bôi đen rồi copy."));
}

// ---- Trang lịch lễ năm nay ----
function trangLich(nam) {
  const oNam = $("#f-nam");                      // chưa có ô nhập khi mở trang lần đầu
  nam = nam || (oNam && parseInt(oNam.value, 10)) || new Date().getFullYear();
  const nay = new Date(); nay.setHours(0, 0, 0, 0);
  const hang = [];
  for (const l of LE.filter(x => x.nhom === "quanh-nam")) {
    if (l.thoiDiem.loai === "hang-thang") {
      const m1 = []; for (let t = 1; t <= 12; t++) for (const d of ngayAmTrongNam(nam, 1, t)) m1.push(`1/${t}: ${d.getDate()}/${d.getMonth() + 1}`);
      hang.push({ l, d: null, am: "mùng 1 và 15 hằng tháng", duong: `Mùng 1 các tháng: ${m1.join(" · ")}` }); continue;
    }
    const ds = ngayLe(l, nam);
    if (!ds.length) hang.push({ l, d: null, am: moTaThoiDiem(l).replace(/<[^>]+>/g, ""), duong: "không rơi vào năm này" });
    for (const d of ds) hang.push({ l, d, am: l.thoiDiem.loai === "am" ? `${l.thoiDiem.ngay}/${l.thoiDiem.thang} năm ${tenNamAm(amCua(d).nam)}` : `tiết (${tenNgayAm(d).replace(/ \(âm lịch\).*$/, "")})`, duong: dmy(d) });
  }
  hang.sort((a, b) => (a.d ? a.d.getTime() : 9e15) - (b.d ? b.d.getTime() : 9e15));
  let s = `<div class="card"><div class="row noprint">Năm dương lịch <input id="f-nam" type="number" min="1900" max="2100" style="width:90px" value="${nam}"> <button class="btn" onclick="trangLich()">Lập bảng</button></div>
   <h2>Lịch lễ quanh năm, năm ${nam}</h2><table class="tb"><tr><th>Ngày dương</th><th>Ngày âm</th><th>Lễ</th><th>Ghi chú</th></tr>`;
  for (const h of hang) s += `<tr class="${h.d && h.d.getTime() === nay.getTime() ? "homnay" : ""}"><td>${h.duong}</td><td>${esc(h.am)}</td><td><a href="#le/${h.l.ma}" onclick="go('le/${h.l.ma}');return false">${esc(h.l.ten)}</a></td><td class="mute">${esc(h.l.thoiDiem.ghi || "")}</td></tr>`;
  s += `</table><p class="mute">Đổi ngày bằng lõi lịch âm dùng chung của kho (chung/lich.js, giờ Việt Nam). Lễ vòng đời và tang giỗ tính theo việc, theo ngày mất; xem trong từng lễ.</p></div>`;
  $("#lich").innerHTML = s;
}

// ---- Trang nguồn và giới hạn ----
function trangNguon() {
  let s = `<div class="card"><h2>Nguồn và giới hạn</h2><h3>Điều cần biết trước</h3><ul>${D.gioiHan.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
   <h3>Khung bài khấn 6 phần — Chu Tử gia lễ quyển 5</h3><p class="mute">Mẫu chúc văn tế tứ thời (sơ hiến). Chữ Hán giữ như bản Tứ khố trên Wikisource. Bài khấn của kho đi đúng thứ tự này.</p>
   <table class="tb"><tr><th>#</th><th>Phần</th><th>Nguyên văn</th><th>Nghĩa</th><th>Kho viết</th></tr>${D.khung.map(k => `<tr><td>${k.so}</td><td>${esc(k.ten)}</td><td class="zh">${esc(k.han)}</td><td>${esc(k.nghia)}</td><td class="mute">${esc(k.viet)}</td></tr>`).join("")}</table>
   <h3>Cùng quyển 5: các dịp khác chỉ đổi mấy chữ</h3><table class="tb"><tr><th>Dịp</th><th>Nguyên văn</th><th>Nghĩa</th></tr>${D.bienThe.map(b => `<tr><td>${esc(b.dip)}</td><td class="zh">${esc(b.han)}</td><td>${esc(b.nghia)}</td></tr>`).join("")}</table>
   <h3>Văn bản pháp lý được dẫn</h3><ul>${Object.values(D.vanBan).map(v => `<li><b>${esc(v.ten)}</b> — ${esc(v.ve)}</li>`).join("")}</ul>
   <h3>Nguồn nguyên văn</h3><ul>${D.nguon.map(n => `<li><a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.ten)}</a>${n.ghi ? ` <span class="mute">— ${esc(n.ghi)}</span>` : ""}</li>`).join("")}</ul>
   <h3>Thống kê</h3><p>${LE.length} lễ; ${LE.filter(l => l.tucLe.length && !l.ghiTucLe).length} lễ có trích Phan Kế Bính trực tiếp; ${LE.filter(l => l.ghiTucLe).length} lễ ông không chép hoặc chỉ chép gián tiếp (có nhãn [I]). Mọi trích dẫn được tool <code>tools/kiem-tra-le-cung.mjs</code> dò trong nguyên văn đã tải (<code>nguon/</code>).</p></div>`;
  $("#nguon").innerHTML = s;
}

// ---- Điều hướng ----
const TRANG = ["muc-luc", "le", "lich", "nguon"];
function go(id) {
  id = id || "muc-luc";
  const [trang, ma] = id.startsWith("le/") ? ["le", id.slice(3)] : [id, null];
  if (!TRANG.includes(trang)) return go("muc-luc");
  if (trang === "le") trangLe(ma); else if (trang === "lich") trangLich(); else if (trang === "nguon") trangNguon(); else trangMucLuc();
  for (const t of TRANG) $("#" + t).classList.toggle("hidden", t !== trang);
  document.querySelectorAll("nav button").forEach(b => b.classList.toggle("on", b.dataset.t === (trang === "le" ? "muc-luc" : trang)));
  if (typeof location !== "undefined" && location.hash !== "#" + id) { try { history.replaceState(null, "", "#" + id); } catch (e) { location.hash = id; } }
  if (typeof scrollTo === "function") scrollTo(0, 0);
}
document.querySelectorAll("nav button").forEach(b => b.onclick = () => go(b.dataset.t));
if (typeof window !== "undefined" && typeof window.addEventListener === "function") window.addEventListener("hashchange", () => go(location.hash.slice(1)));
go(typeof location !== "undefined" && location.hash ? location.hash.slice(1) : "muc-luc");
