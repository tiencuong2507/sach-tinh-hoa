// Luận giải lá số — bản biên soạn của kho Sách Tinh Hoa, viết cho người chưa học tử vi. Nạp sau tu-vi.js, data/luan-sao.js, data/cach-cuc.js.
// luanLaSo(ls, ln) → HTML: Tóm tắt một phút (8 mục) · Mười hai cung (Nói ngắn + giải thích + <details> vì sao) · thế sao đặc biệt · giai đoạn đời · cách đọc · thuật ngữ.
// Luật văn: câu ngắn, nói việc cụ thể; chữ nghề chỉ xuất hiện trong <abbr title> hoặc trong <details>. Lời là chỉ dẫn, không phải lời phán.
"use strict";
const TuViLuan = (() => {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const SAT = ["Kình Dương", "Đà La", "Hỏa Tinh", "Linh Tinh", "Địa Không", "Địa Kiếp"], CAT = ["Tả Phụ", "Hữu Bật", "Văn Xương", "Văn Khúc", "Thiên Khôi", "Thiên Việt", "Lộc Tồn", "Thiên Mã"];
  const SANG = ["miếu", "vượng", "đắc địa"], CUNG_KY = ["Mệnh", "Tài bạch", "Quan lộc", "Phu thê", "Tật ách"];
  const L = () => TV_LUAN.sao, G = () => TV_LUAN.CHU_GIAI;
  const abbr = t => `<abbr title="${esc(G()[t] || "")}">${esc(t)}</abbr>`;
  const soChu = s => String(s).replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const ghepToiDa = (phan, max) => { let ra = ""; for (const p of phan) { if (!p) continue; const thu = ra ? ra + " " + p : p; if (soChu(thu) > max) break; ra = thu; } return ra; };
  const cumPhu = t => (L()[t] && L()[t].ngan) || TV_LUAN.CUM_PHU[t] || "";
  const sangDoi = ds => TV_LUAN.DO_SANG_DOI[ds] || "";
  const hoaCua = (ls, c) => [...c.chinhTinh, ...c.phuTinh].filter(x => x.hoa);
  const cauDau = t => (t || "").split(/(?<=[.!?])\s+/)[0] || "";
  // Bộ hàm tiện ích cho điều kiện cách cục
  function tienIch(ls) {
    const vi = t => (t && ls.sao[t] !== undefined) ? ls.sao[t] : -1;
    const tamPhuong = c => [c, (c + 4) % 12, (c + 8) % 12, (c + 6) % 12];
    const saoHoa = h => Object.keys(ls.tuHoa).find(t => ls.tuHoa[t] === h) || null;
    return { vi, tamPhuong, saoHoa, oMenh: t => vi(t) === ls.menh, oCung: (t, c) => vi(t) === c, trongTamPhuong: (t, c) => vi(t) >= 0 && tamPhuong(c).includes(vi(t)),
      giap: (c, a, b) => (vi(a) === (c + 11) % 12 && vi(b) === (c + 1) % 12) || (vi(b) === (c + 11) % 12 && vi(a) === (c + 1) % 12),
      soChinhTinh: c => ls.cung[c].chinhTinh.length, doSang: t => TuVi.doSang(t, vi(t)), sang: t => SANG.includes(TuVi.doSang(t, vi(t)) || "") };
  }
  function cachCuc(ls) { const H = tienIch(ls), ra = []; for (const c of TV_CACH_CUC.cach) { let ok = false; try { ok = !!c.dieuKien(ls, H); } catch (e) { ok = false; } if (ok) ra.push(c); } return ra; }
  // Sao "đại diện" của một cung: chính tinh đầu; cung trống thì mượn cung đối
  function saoDaiDien(ls, c) { if (c.chinhTinh.length) return { sao: c.chinhTinh[0], muon: false }; const d = ls.cung[(c.chi + 6) % 12]; return d.chinhTinh.length ? { sao: d.chinhTinh[0], muon: true, cungMuon: d } : { sao: null, muon: true, cungMuon: d }; }
  const nhomCua = c => (c.laMenh || c.laThan) ? "menhThan" : TV_LUAN.NHOM_CUNG[c.ten];
  // Một chi tiết thêm của cung để câu không giống nhau giữa hai lá số: hóa > Tuần/Triệt > sát > cát
  function chiTietThem(ls, c) {
    const h = hoaCua(ls, c)[0]; if (h) return `${h.ten} mang chữ ${h.hoa}`;
    if (c.triet) return "cung này bị Triệt, đi vòng mới tới"; if (c.tuan) return "cung này bị Tuần, đến chậm";
    const sat = c.phuTinh.find(x => SAT.includes(x.ten)); if (sat) return `có ${sat.ten}, ${cumPhu(sat.ten)}`;
    const cat = c.phuTinh.find(x => CAT.includes(x.ten)); if (cat) return `có ${cat.ten}, ${cumPhu(cat.ten)}`;
    return "";
  }
  // ---------- Tóm tắt một phút: 8 mục, mỗi mục ≤ 25 chữ, sinh từ dữ liệu
  function tomTat(ls, ln) {
    const M = ls.cung[ls.menh], d = L(), ra = [];
    const noiNgan = (c, nhom) => { const { sao, muon, cungMuon } = saoDaiDien(ls, c); if (!sao) return `Cung ${CHI[c.chi]} trống cả hai bên: tùy duyên, nhờ người mà thành.`; const ng = d[sao.ten].noiNgan[nhom].replace(/.?$/, "."); return muon ? `Cung ${CHI[c.chi]} trống, mượn ${sao.ten} bên ${cungMuon.ten}: ${ng}` : `${sao.ten} ở ${CHI[c.chi]}: ${ng}`; };
    const catTamPhuong = c => { const ra = []; for (const k of [c.chi, (c.chi + 4) % 12, (c.chi + 8) % 12, (c.chi + 6) % 12]) for (const x of ls.cung[k].phuTinh) if (CAT.includes(x.ten) && !ra.includes(x.ten)) ra.push(x.ten); return ra; };
    const kyCung = ls.cung[ls.sao[Object.keys(ls.tuHoa).find(t => ls.tuHoa[t] === "Kỵ")]];
    // 1 Con người
    { const s1 = M.chinhTinh[0], s2 = M.chinhTinh[1]; let tx;
      if (!s1) { const { sao } = saoDaiDien(ls, M); tx = sao ? `Mệnh tại ${CHI[ls.menh]} không có sao chính, mượn ${sao.ten}: ${d[sao.ten].nguoi}, nhưng tùy duyên hơn.` : `Mệnh tại ${CHI[ls.menh]} trống cả hai bên: tính tùy duyên, nhờ người.`; }
      else tx = ghepToiDa([`Mệnh tại ${CHI[ls.menh]} có ${s1.ten}${s2 ? " và " + s2.ten : ""}:`, `${d[s1.ten].nguoi}${s2 ? ";" : "."}`, s2 ? `${d[s2.ten].nguoi}.` : "", `Thân cư ${ls.cung[ls.than].ten}.`], 25);
      ra.push(["Con người", tx]); }
    // 2 Điểm mạnh
    { const s1 = M.chinhTinh[0] || saoDaiDien(ls, M).sao, catM = M.phuTinh.filter(x => CAT.includes(x.ten)).map(x => x.ten), cat = [...catM, ...catTamPhuong(M).filter(x => !catM.includes(x))].slice(0, 3);
      const CUC_NGAN = { "Thủy": "linh hoạt, dễ thích nghi", "Mộc": "ưa học, vươn lên", "Kim": "bền, kỷ luật", "Thổ": "chắc, chậm mà vững", "Hỏa": "nhanh, nhiệt tình" };
      const sang = s1 && s1.doSang ? (SANG.includes(s1.doSang) ? `${s1.ten} ở ${CHI[ls.menh]} là chỗ sáng.` : `${s1.ten} ở ${CHI[ls.menh]} là chỗ tối, phải rèn.`) : "";
      const cuc = `Nền ${ls.cuc.ten}: ${CUC_NGAN[ls.cuc.hanh]}.`;
      ra.push(["Điểm mạnh", ghepToiDa([s1 ? `${d[s1.ten].manh}.` : "Linh hoạt, dễ thích nghi.", sang, cuc, cat.length ? `Có ${cat.join(", ")} ${catM.length ? "ở Mệnh" : "chiếu về"} giúp sức.` : `Mệnh và ba cung chiếu về không có sao giúp, tự lực là chính.`], 25)]); }
    // 3 Điểm cần giữ mình
    { const s1 = M.chinhTinh[0] || saoDaiDien(ls, M).sao, sat = M.phuTinh.filter(x => SAT.includes(x.ten) || ["Thiên Hình", "Thiên Riêu", "Thiên Không", "Kiếp Sát"].includes(x.ten)).slice(0, 2);
      const satTx = sat.length ? `Mệnh có ${sat.map(x => x.ten).join(", ")}: ${(d[sat[0].ten] && d[sat[0].ten].giu) || cumPhu(sat[0].ten)}.` : `Mệnh không có sao va chạm; chỗ hay lo là ${TV_LUAN.VIEC_CUNG[kyCung.ten]} (cung ${kyCung.ten}).`;
      ra.push(["Điểm cần giữ mình", ghepToiDa([s1 ? `${d[s1.ten].giu}.` : "Dễ bị cuốn theo người khác.", satTx], 25)]); }
    // 4–7 Tiền, Việc, Gia đình, Sức khỏe
    for (const [nhan, tenCung, nhom] of [["Tiền bạc", "Tài bạch", "tai"], ["Công việc", "Quan lộc", "quan"], ["Gia đình, tình cảm", "Phu thê", "phuThe"], ["Sức khỏe", "Tật ách", "tat"]]) {
      const c = ls.cung.find(x => x.ten === tenCung), tx = noiNgan(c, nhom), them = chiTietThem(ls, c);
      ra.push([nhan, ghepToiDa([tx, them ? `${them.charAt(0).toUpperCase() + them.slice(1)}.` : "", `Ứng tuổi ${c.daiHan[0]}–${c.daiHan[1]}.`], 25)]); }
    // 8 Giai đoạn hiện tại
    { let tx = ln ? `Năm ${ln.nam} ứng tuổi ${ln.tuoi}, chưa vào chặng nào; chọn năm sau năm sinh.` : "Chưa chọn năm xem, chưa biết đang ở chặng nào.";
      if (ln && ls.cung[ln.cungDaiHan]) { const c = ls.cung[ln.cungDaiHan], { sao } = saoDaiDien(ls, c);
        const locC = ls.cung[ls.sao[Object.keys(ln.tuHoa).find(t => ln.tuHoa[t] === "Lộc")]];
        tx = ghepToiDa([ln.laDongHan ? `Tuổi ${ln.tuoi}, còn nhỏ, năm này ứng với cung ${c.ten} (${TV_LUAN.VIEC_CUNG[c.ten]});` : `Tuổi ${ln.tuoi}, chặng ${c.daiHan[0]}–${c.daiHan[1]} ở cung ${c.ten} (${TV_LUAN.VIEC_CUNG[c.ten]});`, `năm ${ln.nam} thuận ở ${TV_LUAN.VIEC_CUNG[locC.ten]}.`, sao ? `${sao.ten} dẫn chặng này.` : ""], 25); }
      ra.push(["Giai đoạn hiện tại", tx]); }
    return ra;
  }
  // ---------- Một cung
  function luanCung(ls, c) {
    const d = L(), nhom = nhomCua(c), ky = CUNG_KY.includes(c.ten) || c.laMenh, { sao, muon, cungMuon } = saoDaiDien(ls, c), cau = [];
    let noiNgan = sao ? d[sao.ten].noiNgan[nhom] : "Cung trống, cung đối cũng trống: việc ở đây tùy duyên, nhờ người mà thành.";
    if (sao && muon) noiNgan = ghepToiDa([`Cung trống, mượn ${sao.ten} bên cung ${cungMuon.ten}:`, noiNgan], 25);
    if (!c.chinhTinh.length) cau.push(sao ? `Cung này không có sao chính, nên mượn ${sao.ten} từ cung đối diện (${cungMuon.ten}). Việc ở đây tùy duyên, cần người giúp mới thành.` : "Cung này và cung đối diện đều không có sao chính. Việc ở đây tùy duyên, cần người giúp mới thành.");
    for (const s of c.chinhTinh.slice(0, ky ? 2 : 1)) { const ds = s.doSang; cau.push(`${s.ten} ở đây nằm ${sangDoi(ds)} (${abbr(ds)}). ${d[s.ten].theoCung[nhom]}`); }
    if (muon && sao) cau.push(cauDau(d[sao.ten].theoCung[nhom]));
    const phu = c.phuTinh.filter(x => !["Tuần", "Triệt"].includes(x.ten)), uuTien = [...phu.filter(x => SAT.includes(x.ten)), ...phu.filter(x => CAT.includes(x.ten)), ...phu.filter(x => !SAT.includes(x.ten) && !CAT.includes(x.ten) && TV_LUAN.CUM_PHU[x.ten])].slice(0, ky ? 2 : 0);
    if (uuTien.length) cau.push(`Có thêm ${uuTien.map(x => `${x.ten} (${cumPhu(x.ten)})`).join(", ")}.`);
    for (const h of hoaCua(ls, c).slice(0, ky ? 1 : 0)) cau.push(`${h.ten} mang chữ ${h.hoa} (${abbr("Hóa " + h.hoa)}): ${d["Hóa " + h.hoa].theoCung.chung.replace(/^Sao này năm sinh mang chữ [^:]+: /, "")}`);
    if (c.triet) cau.push(`Cung này bị ${abbr("Triệt")}: đường thẳng bị cắt, nên đi vòng, đi muộn.`); else if (c.tuan) cau.push(`Cung này bị ${abbr("Tuần")}: cái tốt đến chậm, cái xấu bớt.`);
    if (c.laThan && !c.laMenh) cau.push(`Thân ở đây: nửa đời sau nghiêng về ${TV_LUAN.VIEC_CUNG[c.ten]}.`);
    // Vì sao nói vậy
    let vs = `<ul><li>Sao chính: ${c.chinhTinh.length ? c.chinhTinh.map(s => `${esc(s.ten)} — ${esc(s.doSang || "")} (${esc(G()[s.doSang] || "")})${s.hoa ? ", hóa " + s.hoa : ""}`).join("; ") : "không có" + (sao ? `, mượn ${esc(sao.ten)} cung đối` : "")}</li>
      <li>Sao phụ: ${c.phuTinh.length ? c.phuTinh.map(s => esc(s.ten) + (s.doSang ? ` (${esc(s.doSang)})` : "") + (s.hoa ? ` hóa ${s.hoa}` : "")).join(", ") : "không"}</li>
      ${c.tuan ? `<li>Tuần: ${esc(G()["Tuần"])}</li>` : ""}${c.triet ? `<li>Triệt: ${esc(G()["Triệt"])}</li>` : ""}
      <li>Vòng sao: ${esc(c.trangSinh)} · ${esc(c.bacSi)} · ${esc(c.thaiTue)} · đại hạn tuổi ${c.daiHan[0]}–${c.daiHan[1]}</li></ul>`;
    for (const s of [...c.chinhTinh, ...c.phuTinh.filter(x => d[x.ten] && d[x.ten].nguyenVan)]) for (const nv of (d[s.ten].nguyenVan || []).slice(0, c.chinhTinh.includes(s) ? 2 : 1))
      vs += `<div class="nv"><span class="zh">${esc(nv.trich)}</span><div class="dich">${esc(nv.dich)} <span class="mute">— ${esc(nv.nguon)}</span></div></div>`;
    return { noiNgan, cau, viSao: vs };
  }
  // ---------- Toàn bộ
  function luanLaSo(ls, ln) {
    const d = L(), tt = tomTat(ls, ln);
    let s = `<div class="card luan"><div class="tomtat"><h2>Tóm tắt một phút</h2><ul>${tt.map(([n, t]) => `<li><b>${esc(n)}:</b> ${esc(t)}</li>`).join("")}</ul>
     <p class="mute">Lời luận là bản soạn của kho cho người chưa học tử vi; nghĩa sao lấy từ sách cổ (xem "Vì sao nói vậy" ở mỗi cung). Đây là chỉ dẫn xu hướng, không phải lời phán.</p></div>`;
    s += `<h3>Mười hai cung</h3>`;
    for (let k = 0; k < 12; k++) { const c = ls.cung[(ls.menh - k + 12) % 12], r = luanCung(ls, c);
      s += `<div class="cungLuan"><h4>${esc(c.ten)} <span class="mute">(${CHI[c.chi]}, ${esc(c.canChi)}${c.laThan ? ", Thân" : ""})</span></h4><p><b>Nói ngắn:</b> ${esc(r.noiNgan)}</p><p>${r.cau.join(" ")}</p><details><summary>Vì sao nói vậy</summary>${r.viSao}</details></div>`; }
    const cc = cachCuc(ls), hien = cc.slice(0, 5), an = cc.slice(5);
    s += `<h3>Thế sao đặc biệt (${abbr("cách cục")})</h3>`;
    if (!cc.length) s += `<p>Lá số này không rơi vào thế sao đặc biệt nào trong ${TV_CACH_CUC.cach.length} thế đã soạn. Đọc theo từng cung là đủ.</p>`;
    for (const c of hien) s += `<div class="cc ${c.loai}"><b>${esc(c.ten)}</b> <span class="tag">${c.loai === "cát" ? "thuận" : c.loai === "hung" ? "cần dè" : "hai mặt"}</span> <b>Nghĩa là:</b> ${esc(c.nghiaLa)} <b>Nên làm:</b> ${esc(c.nenLam)}
      <details><summary>Sách cổ nói gì</summary><p class="mute">${esc(c.han)} · ${esc(c.nhan)}${c.ghiChu ? " · " + esc(c.ghiChu) : ""}. ${esc(c.luan)}</p>${c.nguyenVan.map(nv => `<div class="nv"><span class="zh">${esc(nv.trich)}</span><div class="dich">${esc(nv.dich)} <span class="mute">— ${esc(nv.nguon)}</span></div></div>`).join("")}</details></div>`;
    if (an.length) s += `<details><summary>Còn ${an.length} thế sao nữa</summary><p>${an.map(c => `<b>${esc(c.ten)}</b>: ${esc(c.nghiaLa)} ${esc(c.nenLam)}`).join("<br>")}</p></details>`;
    // Giai đoạn đời
    s += `<h3>Giai đoạn đời</h3>`;
    if (!ln) s += `<p>Chọn một năm ở ô "Xem lưu niên năm" để biết đang ở chặng nào.</p>`;
    else if (!ls.cung[ln.cungDaiHan]) s += `<p>Năm ${ln.nam} ứng với tuổi ${ln.tuoi}, chưa vào chặng nào trong bảng. Chọn năm khác.</p>`;
    else { const c = ls.cung[ln.cungDaiHan], { sao } = saoDaiDien(ls, c), loc = ls.sao[Object.keys(ln.tuHoa).find(t => ln.tuHoa[t] === "Lộc")], ky = ls.sao[Object.keys(ln.tuHoa).find(t => ln.tuHoa[t] === "Kỵ")], th = ls.cung[ln.cungTieuHan];
      s += `<p>${ln.laDongHan ? `Tuổi ${ln.tuoi}, còn nhỏ; năm này ứng với cung ${esc(c.ten)}, tức chuyện ${TV_LUAN.VIEC_CUNG[c.ten]}.` : `Tuổi ${ln.tuoi}, anh/chị đang đi mười năm ${c.daiHan[0]}–${c.daiHan[1]} ở cung ${esc(c.ten)}. Mười năm này nghiêng về ${TV_LUAN.VIEC_CUNG[c.ten]}.`}
       ${sao ? `Chủ đề của chặng: ${esc(d[sao.ten].noiNgan[nhomCua(c)])}` : "Chặng này không có sao chính, việc đến tùy duyên."}${c.triet ? " Chặng này bị Triệt: đi vòng, đi muộn mới tới." : c.tuan ? " Chặng này bị Tuần: mọi thứ đến chậm hơn." : ""}
       Năm ${ln.nam} (${esc(ln.ten)}) chữ Lộc của năm rơi vào cung ${esc(ls.cung[loc].ten)}: chuyện ${TV_LUAN.VIEC_CUNG[ls.cung[loc].ten]} thuận. Chữ Kỵ rơi vào cung ${esc(ls.cung[ky].ten)}: chuyện ${TV_LUAN.VIEC_CUNG[ls.cung[ky].ten]} nên làm bảy phần, giữ ba phần.
       Năm nay ứng với cung ${esc(th.ten)} (${abbr("tiểu hạn")}), nên để ý thêm ${TV_LUAN.VIEC_CUNG[th.ten]}.</p>`; }
    s += `<h3>Cách đọc lá số này</h3><ol>
     <li>Đọc một cung thì nhìn cả ba cung chiếu về nó, như hiểu một người qua cả bạn bè họ.</li>
     <li>Sao ở chỗ sáng hay chỗ tối quan trọng hơn tên sao: cùng một sao, chỗ sáng là tài, chỗ tối là tật.</li>
     <li>Lá số là bản đồ xu hướng, không phải án; sách cổ cũng nói tâm tốt thì mệnh mỏng cũng thọ.</li></ol>
     <details class="thuatngu"><summary>Thuật ngữ dùng trong lá số</summary><table class="tb">${Object.entries(G()).map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join("")}</table></details></div>`;
    return s;
  }
  return { luanLaSo, cachCuc, tienIch, luanCung, tomTat };
})();
if (typeof window !== "undefined") window.TuViLuan = TuViLuan;
