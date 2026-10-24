// Luận giải lá số — biên soạn của kho Sách Tinh Hoa. Nạp sau tu-vi.js, data/luan-sao.js, data/cach-cuc.js.
// luanLaSo(ls, ln) → HTML: tổng quan, cách cục (kèm nguyên văn), 12 cung, hạn và lưu niên, cách đọc. Lời là cẩm nang, không phải lời phán.
"use strict";
const TuViLuan = (() => {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const SAT = ["Kình Dương", "Đà La", "Hỏa Tinh", "Linh Tinh", "Địa Không", "Địa Kiếp"], SAT_PHU = ["Thiên Hình", "Thiên Riêu", "Kiếp Sát", "Thiên Không", "Cô Thần", "Quả Tú", "Thiên Khốc", "Thiên Hư"];
  const CAT = ["Tả Phụ", "Hữu Bật", "Văn Xương", "Văn Khúc", "Thiên Khôi", "Thiên Việt", "Lộc Tồn", "Thiên Mã"];
  const SANG = ["miếu", "vượng", "đắc địa"];
  // Bộ hàm tiện ích cho điều kiện cách cục và luận cung
  function tienIch(ls) {
    const vi = t => (t && ls.sao[t] !== undefined) ? ls.sao[t] : -1;
    const tamPhuong = c => [c, (c + 4) % 12, (c + 8) % 12, (c + 6) % 12];
    const saoHoa = h => Object.keys(ls.tuHoa).find(t => ls.tuHoa[t] === h) || null;
    return { vi, tamPhuong, saoHoa,
      oMenh: t => vi(t) === ls.menh,
      oCung: (t, c) => vi(t) === c,
      trongTamPhuong: (t, c) => vi(t) >= 0 && tamPhuong(c).includes(vi(t)),
      giap: (c, a, b) => (vi(a) === (c + 11) % 12 && vi(b) === (c + 1) % 12) || (vi(b) === (c + 11) % 12 && vi(a) === (c + 1) % 12),
      soChinhTinh: c => ls.cung[c].chinhTinh.length,
      doSang: t => TuVi.doSang(t, vi(t)),
      sang: t => SANG.includes(TuVi.doSang(t, vi(t)) || "") };
  }
  const dsNgan = s => s.doSang ? ` (${s.doSang})` : "";
  const tenSao = s => `${esc(s.ten)}${dsNgan(s)}${s.hoa ? ` hóa ${s.hoa}` : ""}`;
  const khoiHan = (nv) => `<div class="nv"><span class="zh">${esc(nv.trich)}</span>${nv.amHV ? `<div class="am">${esc(nv.amHV)}</div>` : ""}<div class="dich">${esc(nv.dich)} <span class="mute">— ${esc(nv.nguon)}</span></div></div>`;

  function cachCuc(ls) {
    const H = tienIch(ls), ra = [];
    for (const c of TV_CACH_CUC.cach) { let ok = false; try { ok = !!c.dieuKien(ls, H); } catch (e) { ok = false; } if (ok) ra.push(c); }
    return ra;
  }
  // Luận một cung: sao × nhóm cung, sát tinh, Tuần Triệt
  function luanCung(ls, c) {
    const L = TV_LUAN.sao, nhom = (c.laMenh || c.laThan) ? "menhThan" : TV_LUAN.NHOM_CUNG[c.ten], cau = [];
    const chinh = c.chinhTinh, phu = c.phuTinh;
    if (chinh.length === 0) {
      const doi = ls.cung[(c.chi + 6) % 12];
      cau.push(`Cung không có chính tinh, mượn sao cung đối (${esc(doi.ten)}): ${doi.chinhTinh.length ? doi.chinhTinh.map(tenSao).join(", ") : "cũng trống"}; việc ở cung này tùy duyên, xem tam phương.`);
    }
    for (const s of chinh) { const d = L[s.ten]; if (!d) continue;
      const y = d.theoCung[nhom] || d.theoCung.chung; if (y) cau.push(`<b>${tenSao(s)}</b>: ${esc(y)}`);
      if (s.doSang) { const tot = SANG.includes(s.doSang); const ds = tot ? d.theoDoSang.tot : d.theoDoSang.xau; if (ds && (chinh.length === 1 || !tot)) cau.push(`<span class="mute">Độ sáng ${s.doSang}: ${esc(ds)}</span>`); }
      if (s.hoa) { const h = L["Hóa " + s.hoa]; if (h) cau.push(`<span class="mute">Hóa ${s.hoa}: ${esc(h.theoCung.chung)}</span>`); }
    }
    const phuCo = phu.filter(s => L[s.ten] && !["Tuần", "Triệt"].includes(s.ten));
    for (const s of phuCo) { const d = L[s.ten], y = d.theoCung[nhom] || d.theoCung.chung; if (y) cau.push(`${tenSao(s)}: ${esc(y)}`); }
    const sat = phu.filter(s => SAT_PHU.includes(s.ten)).map(s => s.ten), satChinh = phu.filter(s => SAT.includes(s.ten));
    if (satChinh.length >= 2) cau.push(`<span class="mute">Nhiều sát tinh cùng cung (${satChinh.map(s => s.ten).join(", ")}): sách dặn 'chư hung tại khẩn yếu chi hương tối nghi chế khắc' — cần cát tinh hoặc chính tinh miếu vượng để chế; việc ở cung này nên đi chậm.</span>`);
    if (sat.length) cau.push(`<span class="mute">Phụ tinh cần để ý: ${sat.join(", ")} — tăng phần lo nghĩ, cô độc hoặc hình thương nhẹ ở cung này [I].</span>`);
    if (c.tuan) cau.push(`<span class="mute">Cung bị Tuần: ${esc(L["Tuần"].theoCung.chung)}</span>`);
    if (c.triet) cau.push(`<span class="mute">Cung bị Triệt: ${esc(L["Triệt"].theoCung.chung)}</span>`);
    if (c.laThan && !c.laMenh) cau.push(`<span class="mute">Thân cư ${esc(c.ten)}: nửa đời sau nghiêng về việc của cung này.</span>`);
    return cau;
  }
  function luanLaSo(ls, ln) {
    const L = TV_LUAN.sao, H = tienIch(ls), M = ls.cung[ls.menh], T = ls.cung[ls.than];
    const hoaRoi = Object.entries(ls.tuHoa).map(([t, h]) => `${t} hóa ${h} ở cung ${ls.cung[ls.sao[t]].ten} (${CHI[ls.sao[t]]})`).join("; ");
    let s = `<div class="card luan"><h2>Luận giải (bản biên soạn của kho, để chiêm nghiệm)</h2>
     <p class="mute">Nghĩa sao lấy từ 紫微斗數全書 quyển 1, 3 (nguyên văn có trong <code>nguon/</code>, tool kiểm dò từng câu); lời diễn giải tiếng Việt là bản soạn của kho [I]. Không phái nào là chuẩn duy nhất; đây là chỉ dẫn, không phải lời phán.</p>
     <h3>1. Tổng quan</h3><ul>
     <li><b>${esc(ls.amDuong)}</b>, Mệnh tại ${CHI[ls.menh]} (${esc(M.canChi)}), <b>${esc(ls.cuc.ten)}</b>; Thân cư ${esc(T.ten)} (${CHI[ls.than]}). Mệnh chủ ${esc(ls.menhChu)}, Thân chủ ${esc(ls.thanChu)}.</li>
     <li>Chính tinh Mệnh: ${M.chinhTinh.length ? M.chinhTinh.map(tenSao).join(", ") : "<i>vô chính diệu</i>"}; chính tinh Thân: ${T.chinhTinh.length ? T.chinhTinh.map(tenSao).join(", ") : "<i>vô chính diệu</i>"}.</li>
     <li>Tứ Hóa năm ${esc(ls.nam.ten)}: ${esc(hoaRoi)}.</li>
     <li>Tuần tại ${ls.tuan.map(c => CHI[c] + " (" + ls.cung[c].ten + ")").join(", ")}; Triệt tại ${ls.triet.map(c => CHI[c] + " (" + ls.cung[c].ten + ")").join(", ")}.</li></ul>`;
    for (const sao of M.chinhTinh) { const d = L[sao.ten]; if (d) s += `<p><b>${esc(sao.ten)}</b> <span class="zh">${esc(d.han)}</span> thủ Mệnh — ${d.tomY.map(esc).join(" ")}</p>${d.nguyenVan.slice(0, 2).map(khoiHan).join("")}`; }
    // 2. cách cục
    const cc = cachCuc(ls);
    s += `<h3>2. Cách cục phát hiện được (${cc.length})</h3>`;
    if (!cc.length) s += `<p class="mute">Không khớp cách cục nào trong bộ ${TV_CACH_CUC.cach.length} cách đã soạn; lá số luận theo từng cung.</p>`;
    for (const c of cc) s += `<div class="cc ${c.loai}"><b>${esc(c.ten)}</b> <span class="zh">${esc(c.han)}</span> <span class="tag">${c.loai === "cát" ? "cát cách" : c.loai === "hung" ? "cần dè" : "hai mặt"}</span> <span class="tag">${esc(c.nhan)}</span>${c.ghiChu ? ` <span class="tag">${esc(c.ghiChu)}</span>` : ""}<p>${esc(c.luan)}</p>${c.nguyenVan.map(khoiHan).join("")}</div>`;
    // 3. 12 cung
    s += `<h3>3. Mười hai cung</h3>`;
    for (let k = 0; k < 12; k++) { const c = ls.cung[(ls.menh - k + 12) % 12]; s += `<div class="cungLuan"><b>${esc(c.ten)}</b> <span class="mute">${CHI[c.chi]} · ${esc(c.canChi)}${c.laThan ? " · Thân" : ""}</span><ul>${luanCung(ls, c).map(x => `<li>${x}</li>`).join("")}</ul></div>`; }
    // 4. hạn
    if (ln && !ls.cung[ln.cungDaiHan]) s += `<h3>4. Lưu niên ${ln.nam}</h3><p class="mute">Tuổi ${ln.tuoi} chưa vào hạn nào (năm xem trước năm sinh hoặc quá bảng hạn); chọn năm khác.</p>`;
    else if (ln) { const cd = ls.cung[ln.cungDaiHan], ct = ls.cung[ln.cungTieuHan], saoDH = [...cd.chinhTinh, ...cd.phuTinh.filter(x => CAT.includes(x.ten) || SAT.includes(x.ten))];
      const luuHoa = Object.entries(ln.tuHoa).map(([t, h]) => `${t} lưu ${h} (cung ${ls.cung[ls.sao[t]].ten})`).join("; ");
      const luuSat = ["L.Kình Dương", "L.Đà La"].map(t => `${t.slice(2)} tại ${ls.cung[ln.sao[t]].ten}`).join(", ");
      s += `<h3>4. Hạn hiện tại và lưu niên ${ln.nam} (${esc(ln.ten)}, tuổi ${ln.tuoi})</h3><ul>
       <li>${ln.laDongHan ? "Đồng hạn" : "Đại hạn"} tại cung <b>${esc(cd.ten)}</b> (${CHI[cd.chi]}${ln.laDongHan ? "" : `, tuổi ${cd.daiHan[0]}–${cd.daiHan[1]}`}): ${saoDH.length ? saoDH.map(tenSao).join(", ") : "không chính tinh, mượn cung đối"}${cd.tuan ? "; bị Tuần" : ""}${cd.triet ? "; bị Triệt" : ""}. ${cd.chinhTinh.length ? esc(L[cd.chinhTinh[0].ten]?.tomY[0] || "") : ""} Mười năm này việc của cung ${esc(cd.ten)} nổi lên; sách dặn 'hạn phùng cát diệu bình sinh hoạt động hòa hài' và 'mệnh thực vận kiên'.</li>
       <li>Tiểu hạn năm nay tại cung <b>${esc(ct.ten)}</b> (${CHI[ct.chi]}); lưu Thái Tuế tại ${esc(ls.cung[ln.chi].ten)}. Lưu Tứ Hóa: ${esc(luuHoa)}. Lưu ${esc(luuSat)}.</li>
       <li class="mute">Cách xem: năm nào lưu Hóa Lộc rơi vào cung đại hạn hoặc Mệnh thì việc cung ấy thuận; lưu Hóa Kỵ rơi vào đâu thì chỗ ấy cần 'xử sự chỉ cầu thất phân'. Lưu Kình Đà gặp Kình Đà gốc (dương đà điệp tịnh) thì sách dặn cẩn trọng thân thể, giấy tờ.</li></ul>`; }
    // 5. cách đọc
    s += `<h3>5. Cách đọc lá số này</h3><ol>
     <li><b>Tam phương tứ chính quan trọng hơn một cung.</b> Toàn thư: '三看迁移财帛官禄三方星辰刑冲克破' — mỗi cung phải xem cùng ba cung chiếu về nó.</li>
     <li><b>Miếu hãm quan trọng hơn tên sao.</b> Toàn thư: '要看得垣失垣，專論入廟失廟' — cùng một sao, sáng tối khác nhau một trời.</li>
     <li><b>Lá số là bản đồ xu hướng, không phải án.</b> Toàn thư: '心好命微亦主寿，心毒命固亦夭亡' — tâm tốt mệnh mỏng cũng thọ, tâm độc mệnh vững cũng tổn. Lá số để chiêm nghiệm; luận giải là việc của người học, không có một phái nào là chuẩn duy nhất.</li></ol></div>`;
    return s;
  }
  return { luanLaSo, cachCuc, tienIch, luanCung };
})();
if (typeof window !== "undefined") window.TuViLuan = TuViLuan;
