// Kinh Dịch — logic giao diện. Dữ liệu: window.KD_ZH (nguyên văn), window.KD_VI (Việt), window.KD_INTRO (dẫn nhập).
"use strict";
const ZH = window.KD_ZH || {}, VI = window.KD_VI || {}, INTRO = window.KD_INTRO || [], STUDY = window.KD_STUDY || [];
const HT = { thuong: [], ha: [], ...(window.KD_HETU || {}) };
// 64 nguyên tắc hành xử (Đại tượng truyện): data/nguyen-tac-64.js; trang "nt"
const NT = Array.from(window.KD_NGUYEN_TAC || []).filter(Boolean);
const NT_NHOM = ["Tu thân","Làm việc","Ứng xử","Gia đình","Lãnh đạo","Tiền của","Thời thế"];
const NT_TUAN_GOC = Date.UTC(2026, 0, 5); // thứ Hai 5/1/2026: mốc đếm tuần để gợi ý "nguyên tắc tuần này"
const NT_MS_TUAN = 7 * 24 * 3600 * 1000;
// Cẩm nang: sáu giai đoạn của mọi việc (data/sau-giai-doan.js, trang "gd") và Tự quái như đời một người (data/tu-quai-doi-nguoi.js, trang "tq")
const GD = window.KD_SAU_GIAI_DOAN || null, TQD = window.KD_TU_QUAI_DOI || null;
// Cẩm nang: tra cứu theo tình huống (data/tinh-huong.js, trang "th") và quy trình quyết định sáu bước (data/quyet-dinh.js, trang "qd")
const TH = window.KD_TINH_HUONG || null, QD = window.KD_QUYET_DINH || null;
// Sổ chiêm nghiệm (localStorage kd_hist): mỗi lần gieo lưu {t, hoi, vals, quyet}; sau này chấm kq:{muc, ghi, ngay}. Mục cũ không có quyet/kq vẫn hiện.
const HIST_KEY = "kd_hist", HIST_MAX = 100, HIST_MUC = {dung: "Đúng hướng", nua: "Nửa đúng", sai: "Sai hướng"};
HT.thuong = Array.from(HT.thuong || []).filter(Boolean); HT.ha = Array.from(HT.ha || []).filter(Boolean);
// Các thiên Thập dực khác: mã trang "t" + mã thiên + số chương (ví dụ tv0 = Văn ngôn chương 1)
const TD = window.KD_TD || {};
const TD_THIEN = [ // thứ tự trong sách: Văn ngôn trước Hệ từ; Thuyết quái, Tự quái, Tạp quái sau Hệ từ
  {m:"v", key:"vanNgon", ten:"Văn ngôn truyện", src:"周易/乾, 周易/坤 – mục 文言", truocHeTu:true},
  {m:"t", key:"thuyetQuai", ten:"Thuyết quái truyện", src:"易傳/說卦"},
  {m:"q", key:"tuQuai", ten:"Tự quái truyện", src:"易傳/序卦"},
  {m:"p", key:"tapQuai", ten:"Tạp quái truyện", src:"易傳/雜卦"}].filter(t => (TD[t.key]||[]).length);
const tdThien = m => TD_THIEN.find(t => t.m === m);
const tdPages = truoc => TD_THIEN.filter(t => !!t.truocHeTu === truoc).flatMap(t => TD[t.key].map((_,i)=>"t"+t.m+i));

// ---- Bát quái & 64 quẻ (bit từ dưới lên, 1 = dương) ----
const TRI = {"111":{n:"Càn",t:"Thiên",s:"☰",tg:"trời, cương kiện"},"110":{n:"Đoài",t:"Trạch",s:"☱",tg:"đầm, vui"},
"101":{n:"Ly",t:"Hỏa",s:"☲",tg:"lửa, sáng, bám"},"100":{n:"Chấn",t:"Lôi",s:"☳",tg:"sấm, động"},
"011":{n:"Tốn",t:"Phong",s:"☴",tg:"gió, thuận nhập"},"010":{n:"Khảm",t:"Thủy",s:"☵",tg:"nước, hiểm"},
"001":{n:"Cấn",t:"Sơn",s:"☶",tg:"núi, dừng"},"000":{n:"Khôn",t:"Địa",s:"☷",tg:"đất, nhu thuận"}};
const ORDER = ["111","100","010","001","000","011","101","110"];
const KW = [[1,25,6,33,12,44,13,10],[34,51,40,62,16,32,55,54],[5,3,29,39,8,48,63,60],[26,27,4,52,23,18,22,41],
[11,24,7,15,2,46,36,19],[9,42,59,53,20,57,37,61],[14,21,64,56,35,50,30,38],[43,17,47,31,45,28,49,58]];
const SHORT = ["Càn","Khôn","Truân","Mông","Nhu","Tụng","Sư","Tỷ","Tiểu Súc","Lý","Thái","Bĩ","Đồng Nhân","Đại Hữu","Khiêm","Dự",
"Tùy","Cổ","Lâm","Quan","Phệ Hạp","Bí","Bác","Phục","Vô Vọng","Đại Súc","Di","Đại Quá","Khảm","Ly","Hàm","Hằng","Độn",
"Đại Tráng","Tấn","Minh Di","Gia Nhân","Khuê","Kiển","Giải","Tổn","Ích","Quải","Cấu","Tụy","Thăng","Khốn","Tỉnh","Cách",
"Đỉnh","Chấn","Cấn","Tiệm","Quy Muội","Phong","Lữ","Tốn","Đoài","Hoán","Tiết","Trung Phu","Tiểu Quá","Ký Tế","Vị Tế"];
const HEX = {}, BY = {};
ORDER.forEach((u,i)=>ORDER.forEach((l,j)=>{const n=KW[i][j],U=TRI[u],L=TRI[l];
  HEX[n]={n,upper:U,lower:L,lines:l+u,ch:String.fromCodePoint(0x4DC0+n-1),short:SHORT[n-1],
    name:u===l?`Thuần ${U.n} (${U.n} vi ${U.t})`:`${U.t} ${L.t} ${SHORT[n-1]}`};BY[l+u]=n;}));

// ---- tiện ích ----
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d");
const POS = ["Sơ","Nhị","Tam","Tứ","Ngũ","Thượng"];
const haoLabel = (i,y) => i===0 ? `Sơ ${y?"cửu":"lục"}` : i===5 ? `Thượng ${y?"cửu":"lục"}` : `${y?"Cửu":"Lục"} ${POS[i].toLowerCase()}`;
const zhOn = () => $("#showzh").checked;
const zh = s => s && zhOn() ? `<div class="zh">${esc(s)}</div>` : "";

function draw(lines, mv=[]) {
  let h = '<div class="hx">';
  for (let i=5;i>=0;i--) h += `<div class="ln ${mv.includes(i)?"mv":""}">${lines[i]==="1"?"<span></span>":"<span></span><span></span>"}</div>`;
  return h + "</div>";
}

// ---- trang một quẻ ----
function hexPage(n, opt={}) {
  const h = HEX[n], z = ZH[n] || {}, v = VI[n], mv = opt.mv || [], focus = opt.focus || [];
  let s = `<div class="card">${opt.label?`<span class="tag">${opt.label}</span>`:""}
  <h2>${h.ch} Quẻ ${n}. ${h.name} <span class="zh">${esc(z.ten||"")}</span></h2>
  <div class="row" style="align-items:center"><div style="flex:0 0 120px">${draw(h.lines,mv)}</div>
  <div>Thượng quái: ${h.upper.s} <b>${h.upper.n}</b> (${h.upper.t} – ${h.upper.tg})<br>
  Hạ quái: ${h.lower.s} <b>${h.lower.n}</b> (${h.lower.t} – ${h.lower.tg})
  ${v&&v.tk?`<br><span class="tag">Ý chính</span> ${v.tk}`:""}</div></div>`;
  if (!v) return s + `${zh(z.tu)}<p class="mute"><i>Phần giải nghĩa quẻ này chưa có.</i></p></div>`;
  const f = k => focus.includes(k) ? " on" : "";
  s += `<h3>Lời quẻ (Thoán từ)</h3><div class="hao${f("tu")}">${zh((z.ten||"")+"："+(z.tu||""))}
    <div class="hv">${v.tu.hv}</div><div class="dich">→ ${v.tu.dich}</div></div>`;
  s += `<h3>Thoán truyện</h3>${zh(z.thoan)}<div class="giai">${v.thoan}</div>`;
  s += `<h3>Đại tượng</h3>${zh(z.daiTuong)}<div class="hv">${v.tuong.hv}</div><div class="dich">→ ${v.tuong.dich}</div>`;
  s += `<h3>Giải nghĩa</h3><div class="giai">${v.giai}</div>`;
  if (v.khuyen) s += `<p><span class="tag">Khi gặp quẻ này</span> ${v.khuyen}</p>`;
  s += `<h3>Hào từ</h3>`;
  for (let i=0;i<6;i++) {
    const x = v.hao[i] || {};
    s += `<div class="hao${f("h"+i)}${mv.includes(i)&&!focus.length?" on":""}"><div class="t">Hào ${i+1} – ${haoLabel(i,h.lines[i]==="1")}${mv.includes(i)?" ● động":""}</div>
      ${zh(z.hao&&z.hao[i])}<div class="hv">${x.hv||""}</div><div class="dich">→ ${x.dich||""}</div>
      ${zhOn()&&z.tieuTuong&&z.tieuTuong[i]?`<div class="mute">Tiểu tượng: <span class="zh">${esc(z.tieuTuong[i])}</span></div>`:""}
      <div class="giai">${x.giai||""}</div></div>`;
  }
  if (v.dung) s += `<div class="hao${f("dung")}"><div class="t">${n===1?"Dụng cửu":"Dụng lục"}</div>${zh(z.dung)}
    <div class="hv">${v.dung.hv}</div><div class="dich">→ ${v.dung.dich}</div><div class="giai">${v.dung.giai||""}</div></div>`;
  return s + `<p class="mute">Nguyên văn: <a href="${z.src}" target="_blank">Wikisource 周易</a> (phạm vi công cộng). Phần dịch và giải nghĩa là bản biên soạn tham khảo.</p></div>`;
}

// ---- Đọc sách ----
function bookToc() {
  let s = `<div class="card"><h2>Mục lục</h2><div class="row"><div class="toc"><h3>Dẫn nhập</h3>`;
  INTRO.forEach((c,i)=> s += `<a onclick="go('i${i}')">${c.title}</a>`);
  if (NT.length || GD || TQD || TH || QD) s += `<h3>Cẩm nang</h3>`;
  if (NT.length) s += `<a onclick="go('nt')">64 nguyên tắc hành xử (Đại tượng truyện)</a>`;
  if (GD) s += `<a onclick="go('gd')">Sáu giai đoạn của mọi việc (cấu trúc hào)</a>`;
  if (TQD) s += `<a onclick="go('tq')">Tự quái như câu chuyện một đời</a>`;
  if (TH) s += `<a onclick="go('th')">Tra cứu theo tình huống (không gieo)</a>`;
  if (QD) s += `<a onclick="go('qd')">Quyết định theo Dịch: sáu bước</a>`;
  s += `</div><div class="toc"><h3>Thượng kinh (1–30)</h3>`;
  for (let n=1;n<=64;n++) {
    if (n===31) s += `</div><div class="toc"><h3>Hạ kinh (31–64)</h3>`;
    s += `<a onclick="go('q${n}')">${HEX[n].ch} ${n}. ${HEX[n].name}${VI[n]?"":" <span class='mute'>(chưa giải)</span>"}</a>`;
  }
  s += `</div></div>`;
  const tocTD = truoc => TD_THIEN.filter(t => !!t.truocHeTu === truoc).forEach(t => { s += `<div class="toc"><h3>${t.ten}</h3>`;
    TD[t.key].forEach((c,i)=> s += `<a onclick="go('t${t.m}${i}')">${TD[t.key].length>1?(i+1)+". ":""}${c.tieuDe}</a>`); s += `</div>`; });
  tocTD(true);
  if (HT.thuong.length || HT.ha.length) { s += `<div class="toc"><h3>Hệ từ truyện</h3>`;
    HT.thuong.forEach((c,i)=> s += `<a onclick="go('a${i}')">Thượng ${i+1}. ${c.tieuDe}</a>`);
    HT.ha.forEach((c,i)=> s += `<a onclick="go('b${i}')">Hạ ${i+1}. ${c.tieuDe}</a>`); s += `</div>`; }
  tocTD(false);
  if (STUDY.length) { s += `<div class="toc"><h3>Nghiên cứu: quy luật và dự đoán</h3>`;
    STUDY.forEach((c,i)=> s += `<a onclick="go('s${i}')">${c.title}</a>`); s += `</div>`; }
  return s + `</div>`;
}
const PAGES = () => ["toc", ...INTRO.map((_,i)=>"i"+i), ...(NT.length ? ["nt"] : []), ...(GD ? ["gd"] : []), ...(TQD ? ["tq"] : []), ...(TH ? ["th"] : []), ...(QD ? ["qd"] : []), ...Array.from({length:64},(_,i)=>"q"+(i+1)),
  ...tdPages(true), ...HT.thuong.map((_,i)=>"a"+i), ...HT.ha.map((_,i)=>"b"+i), ...tdPages(false), ...STUDY.map((_,i)=>"s"+i)];
// Trang một chương Thập dực (Văn ngôn, Thuyết quái, Tự quái, Tạp quái): cùng bố cục với Hệ từ
function tdPage(id) {
  const t = tdThien(id[1]), i = +id.slice(2), c = TD[t.key][i];
  let s = `<div class="card"><span class="tag">${t.ten}${TD[t.key].length>1?` – chương ${i+1}`:""}</span><h2>${c.tieuDe}</h2><p><span class="tag">Tóm ý</span> ${c.tom}</p>`;
  c.doan.forEach((d,j)=> s += `<div class="hao"><div class="t">Đoạn ${j+1}</div>${zh(d.zh)}<div class="hv">${d.hv}</div>
    <div class="dich">→ ${d.dich}</div>${d.g?`<div class="giai mute">${d.g}</div>`:""}</div>`);
  return s + `<h3>Giải nghĩa</h3><div class="giai">${c.giai}</div>
    <p class="mute">Nguyên văn: Wikisource ${t.src} (phạm vi công cộng). Phần dịch và giải nghĩa là bản biên soạn tham khảo.</p></div>`;
}
// Trang một chương Hệ từ: tóm ý, từng đoạn (chữ Hán – âm Hán Việt – dịch – ghi chú), giải nghĩa chung
function heTuPage(phan, i) {
  const c = HT[phan][i], ten = `Hệ từ ${phan==="thuong"?"thượng":"hạ"} truyện – chương ${i+1}`;
  let s = `<div class="card"><span class="tag">${ten}</span><h2>${c.tieuDe}</h2><p><span class="tag">Tóm ý</span> ${c.tom}</p>`;
  c.doan.forEach((d,j)=> s += `<div class="hao"><div class="t">Đoạn ${j+1}</div>${zh(d.zh)}<div class="hv">${d.hv}</div>
    <div class="dich">→ ${d.dich}</div>${d.g?`<div class="giai mute">${d.g}</div>`:""}</div>`);
  return s + `<h3>Giải nghĩa</h3><div class="giai">${c.giai}</div>
    <p class="mute">Nguyên văn: Wikisource 易傳/繫辭${phan==="thuong"?"上":"下"} (phạm vi công cộng; chia chương theo Wikisource). Phần dịch và giải nghĩa là bản biên soạn tham khảo.</p></div>`;
}
// Trang 64 nguyên tắc hành xử: bộ lọc theo nhóm + tìm nhanh; danh sách dựng lại riêng trong #ntList để ô tìm không mất focus
let ntNhom = "", ntQ = "";
function ntKhoi(x) {
  const h = HEX[x.n];
  return `<div class="hao ntk"><div class="t"><a onclick="go('q${x.n}')" style="cursor:pointer">${h.ch} ${x.n}. ${h.name}</a> <span class="tag">${x.nhom}</span></div>
    ${zh(x.zh)}<div class="hv">${x.hv}</div><div class="dich">→ ${x.dich}</div>
    <p style="margin:.4em 0"><span class="tag">Nguyên tắc</span> <b>${x.nguyenTac}</b></p>
    <div class="giai"><b>Vì sao:</b> ${x.giaiThich}</div>
    <div class="giai" style="margin-top:.3em"><b>Đời nay:</b> ${x.tinhHuong}</div>
    <div class="giai" style="margin-top:.3em"><b>Hôm nay:</b> ${x.viecHomNay}</div></div>`;
}
function ntList() {
  const q = norm(ntQ.trim());
  const ds = NT.filter(x => (!ntNhom || x.nhom === ntNhom) &&
    (!q || String(x.n) === q || norm(HEX[x.n].name + " " + x.nguyenTac + " " + x.dich + " " + x.tinhHuong + " " + x.viecHomNay).includes(q) || x.zh.includes(ntQ.trim())));
  return `<p class="mute">Hiện ${ds.length}/${NT.length} nguyên tắc${ntNhom ? ` · nhóm ${ntNhom}` : ""}${q ? ` · tìm “${esc(ntQ.trim())}”` : ""}</p>` +
    (ds.length ? ds.map(ntKhoi).join("") : `<p class="mute"><i>Không có nguyên tắc nào khớp.</i></p>`);
}
function ntLoc(nhom) { ntNhom = nhom === ntNhom ? "" : nhom; $("#ntBtn").innerHTML = ntNut(); $("#ntList").innerHTML = ntList(); }
function ntTim(v) { ntQ = v || ""; $("#ntList").innerHTML = ntList(); }
const ntNut = () => [["", "Tất cả"], ...NT_NHOM.map(g => [g, `${g} (${NT.filter(x => x.nhom === g).length})`])]
  .map(([g, t]) => `<button class="btn${ntNhom === g ? " on" : ""}" onclick="ntLoc('${g}')">${t}</button>`).join(" ");
function ntPage() {
  const k = Math.floor((Date.now() - NT_TUAN_GOC) / NT_MS_TUAN), tuan = NT[((k % NT.length) + NT.length) % NT.length];
  let s = `<div class="card"><span class="tag">Cẩm nang</span><h2>64 nguyên tắc hành xử</h2>
    <p>Mỗi quẻ có một câu Đại tượng truyện (大象傳) dạy người quân tử <i>noi theo tượng mà làm</i>: 君子以… Sáu mươi tư câu gộp lại là một bộ quy tắc trọn vẹn về tu thân, làm việc, ứng xử, trị gia, quản trị, tiền của và thời thế.
    Đây là cách đọc Dịch không cần gieo: Hệ từ gọi là <i>quan tượng ngoạn từ</i> (xem tượng mà ngẫm lời).</p>
    <p class="mute">Nguyên văn và âm Hán Việt lấy từ kinh văn (Wikisource 周易). Phần <b>nguyên tắc</b>, <b>vì sao</b>, <b>đời nay</b>, <b>hôm nay</b> là bản biên soạn của kho để soi câu xưa vào đời sống hôm nay, không phải lời người xưa; tên người, địa danh trong tình huống là dựng lên, không chỉ ai cụ thể.</p>
    ${tuan ? `<div class="rule">📌 <b>Nguyên tắc tuần này</b> (tuần thứ ${k + 1} từ mốc ${new Date(NT_TUAN_GOC).toLocaleDateString("vi-VN")}): <a onclick="go('q${tuan.n}')" style="cursor:pointer">quẻ ${tuan.n}. ${HEX[tuan.n].short}</a> – <b>${tuan.nguyenTac}</b> · <i>${tuan.viecHomNay}</i></div>` : ""}
    <div id="ntBtn" style="margin:10px 0;display:flex;flex-wrap:wrap;gap:6px">${ntNut()}</div>
    <input id="ntQ" placeholder="Tìm nhanh: số quẻ, tên quẻ, chữ trong nguyên tắc hay tình huống…" style="width:100%;box-sizing:border-box" oninput="ntTim(this.value)" value="${esc(ntQ)}"></div>
    <div class="card" id="ntList">${ntList()}</div>
    <div class="card"><h3>Cách dùng</h3>
    <p>Mỗi tuần chọn <b>một</b> nguyên tắc (theo gợi ý tuần, theo nhóm đang cần, hoặc theo quẻ vừa gieo). Thứ Hai đọc kỹ câu Hán và phần vì sao; mỗi ngày làm một việc nhỏ theo tinh thần ấy, tối ghi một dòng xem hôm nay có lúc nào nguyên tắc đó soi được không.
    Cuối tuần tự hỏi ba câu: việc gì đã khác đi, chỗ nào mình vẫn phạm, có cần giữ thêm một tuần nữa không. Sáu mươi tư tuần là hơn một năm; đi hết một vòng rồi quay lại từ đầu, lần sau sẽ đọc ra những điều lần trước chưa thấy.</p>
    <p class="mute">Nguyên văn: Wikisource 周易 (phạm vi công cộng). Phần biên soạn là của kho, để tham khảo.</p></div>`;
  return s;
}
// ---- Trang "gd": sáu giai đoạn của mọi việc ----
const gdQueLink = n => `<a onclick="go('q${n}')" style="cursor:pointer">${HEX[n].ch} ${n}. ${HEX[n].short}</a>`;
const gdHaoTen = (n, h) => haoLabel(h, HEX[n].lines[h] === "1");
function gdKhoi(g) {
  const li = a => `<ul style="margin:.3em 0 .3em 1.2em;padding:0">${a.map(x => `<li>${x}</li>`).join("")}</ul>`;
  return `<div class="hao gdk" id="gd${g.i}"><div class="t">Bước ${g.i + 1} – hào ${g.ten}: ${g.tenDoi}</div>
    <p style="margin:.3em 0"><span class="tag">Gốc: Hệ từ hạ</span> <a onclick="go('${g.goc.trang}')" style="cursor:pointer">chương ${+g.goc.trang.slice(1) + 1}</a></p>
    ${zh(g.goc.zh)}<div class="hv">${g.goc.hv}</div><div class="dich">→ ${g.goc.dich}</div>
    <div class="giai" style="margin:.4em 0">${g.y}</div>
    <p style="margin:.4em 0 .2em"><b>Hào từ điển hình</b></p>
    ${g.hao.map(x => `<div style="margin:.2em 0 .2em .6em">${gdQueLink(x.n)} – ${gdHaoTen(x.n, x.h)}: ${zhOn() ? `<span class="zh">${esc(x.zh)}</span> ` : ""}<span class="dich">${x.dich}</span></div>`).join("")}
    <p style="margin:.4em 0 .2em"><b>Dấu hiệu mình đang ở đây</b></p>${li(g.dauHieu)}
    <div class="row"><div style="flex:1;min-width:240px"><b>Nên</b>${li(g.nen)}</div><div style="flex:1;min-width:240px"><b>Không nên</b>${li(g.khongNen)}</div></div>
    <div class="giai" style="margin-top:.3em"><b>Một tình huống:</b> ${g.tinhHuong}</div></div>`;
}
function gdXem() {
  const tl = GD.cauHoi.map((_, i) => $("#gdQ" + i).value);
  if (tl.some(v => v !== "1" && v !== "0")) { $("#gdKQ").innerHTML = `<p class="mute"><i>Anh trả lời đủ sáu câu rồi bấm lại.</i></p>`; return; }
  const r = GD.xacDinh(tl.map(v => v === "1")), g = GD.gd[r.i];
  $("#gdKQ").innerHTML = `<div class="rule">📌 Gợi ý: anh đang ở <b>bước ${g.i + 1} – hào ${g.ten}: ${g.tenDoi}</b>. ${r.lyDo}
    ${r.nguoc.length ? `<p style="margin:.4em 0 0"><b>Chỗ chọi nhau trong câu trả lời:</b> ${r.nguoc.join(" ")}</p>` : ""}
    <p style="margin:.4em 0 0"><b>Nên:</b> ${g.nen[0]} <b>Không nên:</b> ${g.khongNen[0]} <a href="#gd${g.i}">Đọc kỹ bước này ↓</a></p></div>`;
}
function gdPage() {
  const sel = (i) => `<select id="gdQ${i}"><option value="">— chọn —</option><option value="1">Có</option><option value="0">Không</option></select>`;
  return `<div class="card"><span class="tag">Cẩm nang</span><h2>Sáu giai đoạn của mọi việc</h2><p>${GD.moDau}</p>
    <p class="mute">Câu gốc lấy từ Hệ từ hạ truyện, hào từ lấy từ kinh văn (Wikisource 易傳, 周易). Phần <b>tên đời thường</b>, <b>dấu hiệu</b>, <b>nên / không nên</b>, <b>tình huống</b> và bộ câu hỏi là bản biên soạn của kho, không phải lời người xưa; tên người trong tình huống là dựng lên.</p>
    <table class="tb"><tr><th>Bước</th><th>Hào</th><th>Tên đời thường</th><th>Hệ từ nói</th></tr>
    ${GD.gd.map(g => `<tr><td>${g.i + 1}</td><td><a href="#gd${g.i}">${g.ten}</a></td><td>${g.tenDoi}</td><td class="zh">${esc(g.goc.zh.split("。")[0])}</td></tr>`).join("")}</table></div>
    <div class="card"><h3>Mình đang ở bước nào? Sáu câu hỏi</h3><p class="mute">Nghĩ về một việc cụ thể (một dự án, một nghề, một mối quan hệ, một khoản tiền) rồi trả lời có / không. Kết quả tính theo luật cố định, không ngẫu nhiên.</p>
    ${GD.cauHoi.map((c, i) => `<div style="margin:.5em 0"><b>${i + 1}.</b> ${c.q} <span class="mute">(${c.chuThich})</span><br>${sel(i)}</div>`).join("")}
    <button class="btn" onclick="gdXem()">Xem mình đang ở bước nào</button><div id="gdKQ"></div></div>
    <div class="card">${GD.gd.map(gdKhoi).join("")}</div>
    <div class="card"><h3>Cách dùng</h3><p>Mỗi việc đang làm, hỏi mình đang ở bước nào. Việc khác nhau có thể ở bước khác nhau: nghề ở bước năm, nhà mới ở bước một. Bước nào cũng có việc đúng của nó. Việc của bước một là làm đều. Việc của bước ba là làm cho đủ rồi dừng. Việc của bước sáu là trao lại. Sai không phải ở bước, mà ở làm việc của bước khác.</p>
    <p class="mute">Nguyên văn: Wikisource 易傳/繫辭下, 周易 (phạm vi công cộng). Phần biên soạn là của kho, để tham khảo.</p></div>`;
}
// ---- Trang "tq": Tự quái như câu chuyện một đời ----
function tqPage() {
  let s = `<div class="card"><span class="tag">Cẩm nang</span><h2>Tự quái như câu chuyện một đời</h2><p>${TQD.moDau}</p>
    <p class="mute">Câu Hán trích đúng Tự quái truyện (Wikisource 易傳/序卦, phạm vi công cộng). Phần <b>dịch</b> và phần <b>kể</b> theo đời người, đời tổ chức là bản biên soạn của kho, không phải lời người xưa. Bản đầy đủ có âm Hán Việt: <a onclick="go('tq0')" style="cursor:pointer">Tự quái truyện</a>.</p></div>`;
  TQD.phan.forEach(p => {
    s += `<div class="card"><h3>${p.tieuDe}</h3>`;
    p.doan.forEach(d => {
      s += `<h4 style="margin:.8em 0 .2em;color:var(--acc)">${d.tieuDe}</h4>`;
      d.buoc.forEach(b => s += `<div class="hao tqb"><div class="t">${b.que.map(gdQueLink).join(" và ")}</div>${zh(b.zh)}<div class="dich">→ ${b.dich}</div><div class="giai">${b.ke}</div></div>`);
    });
    s += `</div>`;
  });
  return s + `<div class="card"><h3>Kết: việc không bao giờ xong hẳn</h3><p>${TQD.ket}</p>
    <p class="mute">Nguyên văn: Wikisource 易傳/序卦 (phạm vi công cộng). Phần biên soạn là của kho, để tham khảo.</p></div>`;
}
// ---- Trang "th": tra cứu theo tình huống, không gieo ----
let thQ = "";
const thTen = ma => { const x = TH && TH.th.find(t => t.ma === ma); return x ? x.ten : ma; };
// link vào quẻ đúng hào: go('qN', {focus:['h<i>']}) tô đỏ hào ấy và cuộn tới
const thHaoLink = (n, h) => `<a onclick="go('q${n}',{focus:['h${h - 1}']})" style="cursor:pointer">hào ${h} (${haoLabel(h - 1, HEX[n].lines[h - 1] === "1")})</a>`;
function thKhoi(x) {
  const li = a => `<ul style="margin:.3em 0 .3em 1.2em;padding:0">${a.map(s => `<li>${s}</li>`).join("")}</ul>`;
  const que = x.que.map(q => gdQueLink(q.n) + (q.hao ? ", " + thHaoLink(q.n, q.hao) : "")).join(" · ");
  const tr = x.trich, trNguon = tr.hao ? `Hào ${tr.hao} quẻ ${tr.n}` : `Lời quẻ ${tr.n}`;
  return `<div class="hao thk" id="th-${x.ma}"><div class="t">${x.ten} <span class="tag">${x.ma}</span></div>
    <p style="margin:.3em 0"><b>Quẻ:</b> ${que}</p>
    <div class="giai"><b>Vì sao:</b> ${x.viSao}</div>
    <div style="margin:.4em 0"><span class="tag">${trNguon}</span>${zh(tr.zh)}<div class="hv">${tr.hv}</div><div class="dich">→ ${tr.dich}</div></div>
    <div class="row"><div style="flex:1;min-width:240px"><b>Nên</b>${li(x.ungXu.nen)}</div><div style="flex:1;min-width:240px"><b>Tránh</b>${li(x.ungXu.tranh)}</div></div>
    <p class="mute" style="margin:.3em 0 0">⚠ ${x.canhBao.y} <a href="#th-${x.canhBao.ma}">${thTen(x.canhBao.ma)}</a>.</p></div>`;
}
function thList() {
  const q = norm(thQ.trim()), raw = thQ.trim();
  let s = "", tong = 0;
  for (const g of TH.nhom) {
    const tat = TH.th.filter(x => x.nhom === g.ma);
    const ds = tat.filter(x => !q || norm(x.ten + " " + x.viSao + " " + x.ungXu.nen.join(" ") + " " + x.ungXu.tranh.join(" ") + " " + x.que.map(k => HEX[k.n].name + " " + k.n).join(" ")).includes(q) || x.trich.zh.includes(raw));
    tong += ds.length;
    if (q && !ds.length) continue;
    s += `<details class="thn" open><summary><b>${g.ten}</b> <span class="mute">(${ds.length}${q ? "/" + tat.length : ""} tình huống)</span></summary>${ds.map(thKhoi).join("")}</details>`;
  }
  return `<p class="mute">Hiện ${tong}/${TH.th.length} tình huống${q ? ` · tìm “${esc(raw)}”` : ""}</p>` + (tong ? s : `<p class="mute"><i>Không có tình huống nào khớp.</i></p>`);
}
function thTim(v) { thQ = v || ""; $("#thList").innerHTML = thList(); }
function thPage() {
  return `<div class="card"><span class="tag">Cẩm nang</span><h2>Tra cứu theo tình huống</h2><p>${TH.moDau}</p>
    <p class="mute">Câu Hán chép đúng lời quẻ, hào từ (Wikisource 周易, phạm vi công cộng). Phần <b>tên tình huống</b>, <b>vì sao</b>, <b>nên / tránh</b>, <b>cảnh báo</b> là bản biên soạn của kho để soi lời quẻ vào việc đời nay, không phải lời người xưa. Bấm tên quẻ để đọc kỹ; bấm hào để mở quẻ đúng hào ấy.</p>
    <input id="thQ" placeholder="Tìm nhanh, gõ không dấu cũng được: kien, nghi viec, mat tien, cuoi hoi, tên quẻ…" style="width:100%;box-sizing:border-box" oninput="thTim(this.value)" value="${esc(thQ)}">
    <p style="margin:.6em 0 0">${TH.nhom.map(g => `<a href="#th-${TH.th.find(x => x.nhom === g.ma).ma}" class="btn" style="display:inline-block;margin:2px;text-decoration:none">${g.ten} (${TH.th.filter(x => x.nhom === g.ma).length})</a>`).join(" ")}</p></div>
    <div class="card" id="thList">${thList()}</div>
    <div class="card"><h3>Cách dùng</h3><p>Tìm tình thế giống việc mình đang gặp. Đọc câu Hán gốc một lần, rồi đọc vì sao. Chọn một việc trong mục nên và làm trong tuần. Khi tình thế đổi, theo lời cảnh báo cuối mục sang mục kế tiếp. Nếu không mục nào giống, dùng trang <a onclick="go('qd')" style="cursor:pointer">Quyết định theo Dịch</a> hoặc gieo quẻ.</p>
    <p class="mute">Nguyên văn: Wikisource 周易 (phạm vi công cộng). Phần biên soạn là của kho, để tham khảo.</p></div>`;
}
// ---- Trang "qd": quy trình quyết định sáu bước ----
function qdXem() {
  const tl = {};
  for (const b of QD.buoc) { const v = $("#qd_" + b.ma).value; if (v !== "0" && v !== "1" && v !== "2") { $("#qdKQ").innerHTML = `<p class="mute"><i>Anh trả lời đủ sáu bước rồi bấm lại.</i></p>`; return; } tl[b.ma] = +v; }
  const r = QD.xacDinh(tl); if (!r) { $("#qdKQ").innerHTML = `<p class="mute"><i>Câu trả lời không hợp lệ.</i></p>`; return; }
  const h = HEX[r.que], v = VI[r.que] || {};
  $("#qdKQ").innerHTML = `<div class="rule">📌 <b>Kết luận: ${r.ten}.</b> ${r.cau}<br><span class="mute">Vì: ${r.lyDo}</span></div>
    <div class="hao on"><div class="t">Quẻ của tình thế: ${gdQueLink(r.que)} – ${h.name}</div>
    <p style="margin:.3em 0" class="mute">${r.viQue} <i>(xếp theo bảng của kho, không phải bói)</i></p>
    ${v.tk ? `<p style="margin:.3em 0"><span class="tag">Ý chính</span> ${v.tk}</p>` : ""}
    ${v.tu ? `<p style="margin:.3em 0"><span class="tag">Lời quẻ</span> ${v.tu.dich}</p>` : ""}
    ${v.tuong ? `<p style="margin:.3em 0"><span class="tag">Đại tượng</span> ${v.tuong.dich}</p>` : ""}</div>
    <p style="margin:.5em 0 .2em"><b>Ba việc nên làm</b></p><ol style="margin:.2em 0 .2em 1.4em;padding:0">${r.viec.map(x => `<li>${x}</li>`).join("")}</ol>
    <p class="mute">Đọc kỹ quẻ: ${gdQueLink(r.que)}. Ghi điều mình quyết vào <a onclick="tab('ls')" style="cursor:pointer">Sổ chiêm nghiệm</a> qua thẻ Gieo quẻ hoặc Tự nhập quẻ, để sau này chấm.</p>`;
}
function qdPage() {
  const sel = b => `<select id="qd_${b.ma}"><option value="">— chọn —</option>${b.chon.map(c => `<option value="${c.v}">${c.ten} – ${c.ghi}</option>`).join("")}</select>`;
  const chuong = t => `${t[0] === "a" ? "thượng" : "hạ"} chương ${+t.slice(1) + 1}`;
  return `<div class="card"><span class="tag">Cẩm nang</span><h2>Quyết định theo Dịch: sáu bước</h2><p>${QD.moDau}</p><p class="mute">${QD.luuY}</p>
    <table class="tb"><tr><th>Bước</th><th>Hỏi gì</th><th>Hệ từ nói</th></tr>${QD.buoc.map((b, i) => `<tr><td>${i + 1}. ${b.ten}<br><span class="mute">${b.doi}</span></td><td>${b.hoi}</td><td class="zh">${esc(b.hetu.zh)}</td></tr>`).join("")}</table></div>
    <div class="card"><h3>Sáu câu hỏi</h3><p class="mute">Nghĩ về một việc cụ thể đang phải quyết. Mỗi bước chọn một câu trả lời. Kết quả tính theo luật cố định, không ngẫu nhiên.</p>
    ${QD.buoc.map((b, i) => `<div class="hao qdb"><div class="t">Bước ${i + 1} – ${b.ten} (${b.doi})</div><p style="margin:.3em 0"><b>${b.hoi}</b></p><div class="giai">${b.giai}</div>
      <p style="margin:.3em 0"><span class="tag">Hệ từ</span> <a onclick="go('${b.hetu.trang}')" style="cursor:pointer">${chuong(b.hetu.trang)}</a></p>${zh(b.hetu.zh)}<div class="hv">${b.hetu.hv}</div><div class="dich">→ ${b.hetu.dich}</div>
      <p style="margin:.4em 0 0">${sel(b)}</p></div>`).join("")}
    <button class="btn" onclick="qdXem()">Xem kết luận</button><div id="qdKQ"></div></div>
    <div class="card"><h3>Luật kết luận</h3><ol style="margin:.2em 0 .2em 1.4em;padding:0">
    <li>Có chỗ không ngay thẳng, hoặc sai vai → <b>sửa cách</b> trước.</li><li>Thời sớm → <b>đợi</b>.</li><li>Thời muộn → việc vẫn lên thì <b>tiến</b> gọn, không thì <b>lùi</b>.</li>
    <li>Thời đúng: không ai theo hoặc người quanh nghịch → đang xuống thì <b>lùi</b>, không thì <b>đợi</b>. Còn lại tính điểm (+1 thuận, −1 nghịch): từ 2 trở lên <b>tiến</b>, âm thì <b>lùi</b>, khác thì <b>đợi</b>.</li></ol>
    <p class="mute">Quẻ của tình thế lấy theo bảng ${QD.anhXa.length} dòng trong <code>data/quyet-dinh.js</code>: xét lần lượt, dòng đầu khớp thì lấy. Đây là bản soạn của kho [I], không phải kinh văn, không phải bói. Nguyên văn Hệ từ: Wikisource 易傳/繫辭 (phạm vi công cộng).</p></div>`;
}
function go(id, opt) {
  const P = PAGES(), k = P.indexOf(id), pv = P[k-1], nx = P[k+1];
  const title = p => p==="toc" ? "Mục lục" : p==="nt" ? "64 nguyên tắc hành xử" : p==="gd" ? "Sáu giai đoạn" : p==="tq" ? "Tự quái một đời" : p==="th" ? "Tra theo tình huống" : p==="qd" ? "Quyết định theo Dịch" : p[0]==="i" ? INTRO[+p.slice(1)].title : p[0]==="s" ? STUDY[+p.slice(1)].title
    : p[0]==="a" ? `Hệ từ thượng ${+p.slice(1)+1}` : p[0]==="b" ? `Hệ từ hạ ${+p.slice(1)+1}`
    : p[0]==="t" ? `${tdThien(p[1]).ten.replace(" truyện","")}${TD[tdThien(p[1]).key].length>1?" "+(+p.slice(2)+1):""}` : `Quẻ ${p.slice(1)}. ${HEX[+p.slice(1)].short}`;
  const pager = `<div class="pager">${pv?`<button class="btn" onclick="go('${pv}')">← ${title(pv)}</button>`:"<span></span>"}
    <button class="btn" onclick="go('toc')">Mục lục</button>${nx?`<button class="btn" onclick="go('${nx}')">${title(nx)} →</button>`:"<span></span>"}</div>`;
  const chap = c => `<div class="card"><h2>${c.title}</h2>${c.html}</div>`;
  let body = id==="toc" ? bookToc() : id==="nt" ? ntPage() : id==="gd" ? gdPage() : id==="tq" ? tqPage() : id==="th" ? thPage() : id==="qd" ? qdPage() : id[0]==="i" ? chap(INTRO[+id.slice(1)]) : id[0]==="s" ? chap(STUDY[+id.slice(1)])
    : id[0]==="a" ? heTuPage("thuong", +id.slice(1)) : id[0]==="b" ? heTuPage("ha", +id.slice(1))
    : id[0]==="t" ? tdPage(id) : hexPage(+id.slice(1), opt || {});
  $("#book").innerHTML = pager + body + pager;
  localStorage.setItem("kd_page", id); tab("sach");
  // mở quẻ đúng hào (từ trang tình huống): cuộn tới đoạn đã tô; không thì về đầu trang
  const tieu = opt && opt.focus && document.querySelector("#book .hao.on");
  if (tieu) tieu.scrollIntoView(); else window.scrollTo(0,0);
}

// ---- Tra quẻ ----
function search() {
  const raw = $("#q").value.trim(), q = norm(raw);
  const items = Object.values(HEX).sort((a,b)=>a.n-b.n).filter(h => !q || String(h.n)===q ||
    norm(h.name).includes(q) || (ZH[h.n]&&raw&&ZH[h.n].ten===raw) || (VI[h.n]&&norm(VI[h.n].tk||"").includes(q)));
  $("#list").innerHTML = items.map(h=>`<button onclick="show(${h.n})"><b>${h.ch}</b> ${h.n}. ${h.name}</button>`).join("");
}
function show(n){ $("#detail").innerHTML = hexPage(n); $("#detail").scrollIntoView({behavior:"smooth"}); }

// ---- Gieo quẻ & cách đọc (theo Chu Hy, Dịch học khải mông) ----
function toss(){ const b=new Uint8Array(3); crypto.getRandomValues(b); return [...b].reduce((s,x)=>s+(x&1?3:2),0); }
function readingRule(chu, bien, mv) {
  const tinh = [0,1,2,3,4,5].filter(i=>!mv.includes(i)), k = mv.length, H = i => `hào ${i+1}`;
  switch (k) {
    case 0: return {txt:"Không có hào động: xem <b>lời quẻ chủ</b>.", chu:["tu"], bien:[]};
    case 1: return {txt:`Một hào động: xem <b>lời ${H(mv[0])} của quẻ chủ</b>.`, chu:["h"+mv[0]], bien:[]};
    case 2: return {txt:`Hai hào động: xem lời hai hào động của quẻ chủ, lấy <b>${H(mv[1])}</b> (hào trên) làm chính.`, chu:mv.map(i=>"h"+i), bien:[]};
    case 3: return {txt:"Ba hào động: xem <b>lời quẻ chủ</b> và <b>lời quẻ biến</b>; quẻ chủ là chính (thể), quẻ biến cho biết xu hướng về sau.", chu:["tu"], bien:["tu"]};
    case 4: return {txt:`Bốn hào động: xem lời hai hào <b>không động</b> (${tinh.map(H).join(", ")}) <b>ở quẻ biến</b>, lấy ${H(tinh[0])} (hào dưới) làm chính.`, chu:[], bien:tinh.map(i=>"h"+i)};
    case 5: return {txt:`Năm hào động: xem lời ${H(tinh[0])} (hào duy nhất không động) <b>ở quẻ biến</b>.`, chu:[], bien:["h"+tinh[0]]};
    default:
      if (chu===1||chu===2) return {txt:`Sáu hào đều động ở quẻ ${chu===1?"Càn":"Khôn"}: xem lời <b>${chu===1?"Dụng cửu":"Dụng lục"}</b>.`, chu:["dung"], bien:[]};
      return {txt:"Sáu hào đều động: xem <b>lời quẻ biến</b>.", chu:[], bien:["tu"]};
  }
}
function result(vals, hoi, save=true, quyet="") {
  const lines = vals.map(v=>v%2?"1":"0").join("");
  const mv = vals.map((v,i)=>v===6||v===9?i:-1).filter(i=>i>=0);
  const bienL = vals.map(v=>v===6?"1":v===9?"0":v%2?"1":"0").join("");
  const hoL = lines.slice(1,4)+lines.slice(2,5);
  const chu = BY[lines], bien = BY[bienL], ho = BY[hoL], r = readingRule(chu,bien,mv);
  if (save) { const H = histDoc(); const m = {t:new Date().toLocaleString("vi-VN"), hoi, vals}; if (quyet && quyet.trim()) m.quyet = quyet.trim(); H.unshift(m); histGhi(H); }
  let s = `<div class="card">${hoi?`<p><b>Hỏi:</b> ${esc(hoi)}</p>`:""}${quyet&&quyet.trim()?`<p><b>Điều mình quyết:</b> ${esc(quyet.trim())}</p>`:""}
   <p>Kết quả (hào 1→6): ${vals.join(", ")} · Hào động: ${mv.length?mv.map(i=>i+1).join(", "):"không"}</p>
   <p>Quẻ chủ <b>${HEX[chu].ch} ${chu}. ${HEX[chu].name}</b>${mv.length?` → quẻ biến <b>${HEX[bien].ch} ${bien}. ${HEX[bien].name}</b>`:""} · quẻ hỗ ${HEX[ho].ch} ${ho}. ${HEX[ho].short}</p>
   <div class="rule">📌 <b>Cách đọc:</b> ${r.txt} Các đoạn cần đọc được tô đỏ bên dưới.</div>
   <p class="mute">Quẻ hỗ (hào 2-3-4 làm hạ quái, 3-4-5 làm thượng quái) cho thấy diễn biến bên trong sự việc.</p></div>`;
  s += hexPage(chu,{mv,focus:r.chu.length?r.chu:["__"],label:"Quẻ chủ"});
  if (mv.length) s += hexPage(bien,{focus:r.bien.length?r.bien:["__"],label:"Quẻ biến"});
  return s;
}
// ---- Sổ chiêm nghiệm: lịch sử gieo + điều mình quyết + kết quả thực tế (3 mức) + thống kê + xuất/nhập JSON. Chỉ ở localStorage, không gửi đi đâu. ----
const histHopLe = x => x && typeof x === "object" && Array.isArray(x.vals) && x.vals.length === 6 && x.vals.every(v => [6,7,8,9].includes(+v));
function histDoc() { try { const H = JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); return Array.isArray(H) ? H.filter(histHopLe) : []; } catch (e) { return []; } }
function histGhi(H) { localStorage.setItem(HIST_KEY, JSON.stringify(H.slice(0, HIST_MAX))); }
const histQue = x => { const L = x.vals.map(v => +v % 2 ? "1" : "0").join(""); return HEX[BY[L]]; };
// Thống kê: m lần gieo, n lần đã chấm, số mỗi mức
function histThongKe(H) {
  const tk = {m: H.length, n: 0, dung: 0, nua: 0, sai: 0};
  for (const x of H) if (x.kq && HIST_MUC[x.kq.muc]) { tk.n++; tk[x.kq.muc]++; }
  return tk;
}
// Chấm kết quả thực tế cho mục thứ i: muc ∈ dung|nua|sai, ghi chú tự do; ghi ngày chấm. muc rỗng = bỏ chấm.
function histCham(i, muc, ghi) {
  const H = histDoc(); if (!H[i]) return false;
  if (!muc) delete H[i].kq; else if (HIST_MUC[muc]) H[i].kq = {muc, ghi: String(ghi || "").trim(), ngay: new Date().toLocaleDateString("vi-VN")}; else return false;
  histGhi(H); return true;
}
function histChamTuForm(i) { histCham(i, $("#kqMuc" + i).value, $("#kqGhi" + i).value); hist(); }
function histQuyet(i, quyet) { const H = histDoc(); if (!H[i]) return false; const q = String(quyet || "").trim(); if (q) H[i].quyet = q; else delete H[i].quyet; histGhi(H); return true; }
// Xuất: chuỗi JSON có bọc {kho, phienBan, xuatLuc, muc}. Nhập: nhận cả dạng bọc và mảng thô; gộp theo (t, vals), mục trùng lấy bản có kq/quyet; trả về số mục sau khi gộp.
function histXuat() { return JSON.stringify({kho: "kinh-dich", phienBan: 1, xuatLuc: new Date().toISOString(), muc: histDoc()}, null, 1); }
function histNhap(text) {
  let d; try { d = JSON.parse(text); } catch (e) { return {ok: false, loi: "Không đọc được JSON."}; }
  const them = Array.isArray(d) ? d : (d && Array.isArray(d.muc) ? d.muc : null);
  if (!them) return {ok: false, loi: "File không có danh sách mục."};
  const H = histDoc(), key = x => x.t + "|" + x.vals.join(""), idx = new Map(H.map((x, i) => [key(x), i]));
  let moi = 0, capNhat = 0, bo = 0;
  for (const x of them) {
    if (!histHopLe(x)) { bo++; continue; }
    const m = {t: String(x.t || ""), hoi: String(x.hoi || ""), vals: x.vals.map(Number)};
    if (x.quyet) m.quyet = String(x.quyet); if (x.kq && HIST_MUC[x.kq.muc]) m.kq = {muc: x.kq.muc, ghi: String(x.kq.ghi || ""), ngay: String(x.kq.ngay || "")};
    const k = key(m);
    if (idx.has(k)) { const c = H[idx.get(k)]; if ((m.kq && !c.kq) || (m.quyet && !c.quyet)) { H[idx.get(k)] = {...c, ...m}; capNhat++; } }
    else { idx.set(k, H.length); H.push(m); moi++; }
  }
  histGhi(H); return {ok: true, moi, capNhat, bo, tong: Math.min(H.length, HIST_MAX)};
}
function histTaiXuong() {
  const a = document.createElement("a"), b = new Blob([histXuat()], {type: "application/json"});
  a.href = URL.createObjectURL(b); a.download = `so-chiem-nghiem-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function histChonFile(inp) {
  const f = inp.files && inp.files[0]; if (!f) return;
  const rd = new FileReader(); rd.onload = () => { const r = histNhap(String(rd.result)); hist(); $("#histTB").innerHTML = r.ok ? `Đã nhập: ${r.moi} mục mới, ${r.capNhat} mục cập nhật, ${r.bo} mục bỏ (không hợp lệ). Tổng ${r.tong}.` : `Lỗi nhập: ${r.loi}`; }; rd.readAsText(f);
}
function histDong(x, i) {
  const h = histQue(x), kq = x.kq && HIST_MUC[x.kq.muc] ? x.kq : null;
  const sel = `<select id="kqMuc${i}"><option value="">— chưa chấm —</option>${Object.entries(HIST_MUC).map(([k, v]) => `<option value="${k}"${kq && kq.muc === k ? " selected" : ""}>${v}</option>`).join("")}</select>`;
  return `<tr><td style="white-space:nowrap">${esc(x.t || "")}</td><td style="white-space:nowrap"><a href="#" onclick="replay(${i});return false">${h.ch} ${h.short}</a></td><td>${x.hoi ? esc(x.hoi) : "<span class='mute'>—</span>"}</td>
    <td><input id="quyet${i}" value="${esc(x.quyet || "")}" placeholder="điều mình quyết" style="width:100%;box-sizing:border-box;padding:4px;font-size:14px" onchange="histQuyet(${i},this.value)"></td>
    <td style="white-space:nowrap">${sel}<br><input id="kqGhi${i}" value="${esc(kq ? kq.ghi : "")}" placeholder="ghi chú" style="width:140px;padding:4px;font-size:14px"> <button class="btn" style="padding:3px 8px;font-size:13px" onclick="histChamTuForm(${i})">Lưu</button>${kq ? `<br><span class="mute">chấm ngày ${esc(kq.ngay || "")}</span>` : ""}</td></tr>`;
}
function hist() {
  const H = histDoc(), tk = histThongKe(H);
  $("#hist").innerHTML = `<div class="card"><h2>Sổ chiêm nghiệm</h2>
    <p class="mute">Mỗi lần gieo, ghi <b>điều mình quyết</b>. Sau một tháng, một năm, quay lại chấm <b>kết quả thực tế</b>: đúng hướng, nửa đúng, sai hướng, kèm ghi chú. Đây là cách duy nhất biết Dịch có ích với mình hay không. Dữ liệu chỉ nằm trong trình duyệt này, không gửi đi đâu; nên xuất file để sao lưu.</p>
    <div class="rule">📊 <b>Thống kê:</b> đã chấm <b>${tk.n}/${tk.m}</b> lần gieo · đúng hướng <b>${tk.dung}</b> · nửa đúng <b>${tk.nua}</b> · sai hướng <b>${tk.sai}</b>${tk.n ? ` · tỷ lệ đúng hướng ${Math.round(tk.dung * 100 / tk.n)}%` : ""}</div>
    <p><button class="btn" onclick="histTaiXuong()"${H.length ? "" : " disabled"}>⬇ Xuất JSON (sao lưu)</button>
    <label class="btn" style="display:inline-block">⬆ Nhập JSON <input type="file" accept=".json,application/json" style="display:none" onchange="histChonFile(this)"></label>
    <span id="histTB" class="mute"></span></p>
    ${H.length ? `<div style="overflow-x:auto"><table class="tb"><tr><th>Ngày gieo</th><th>Quẻ</th><th>Hỏi</th><th>Điều mình quyết</th><th>Kết quả thực tế</th></tr>${H.map(histDong).join("")}</table></div>
    <br><button class="btn" onclick="if(confirm('Xóa toàn bộ sổ chiêm nghiệm trong trình duyệt này?')){localStorage.removeItem('${HIST_KEY}');hist()}">Xóa lịch sử</button>` : "<p>Chưa có lần gieo nào.</p>"}</div>`;
}
function replay(i){ const x = histDoc()[i]; if (!x) { hist(); return; } $("#hist").innerHTML = result(x.vals, x.hoi, false, x.quyet || "") + (x.kq && HIST_MUC[x.kq.muc] ? `<div class="card"><b>Kết quả thực tế:</b> ${HIST_MUC[x.kq.muc]}${x.kq.ghi ? " — " + esc(x.kq.ghi) : ""} <span class="mute">(chấm ngày ${esc(x.kq.ngay || "")})</span></div>` : "") + `<button class="btn" onclick="hist()">← Sổ chiêm nghiệm</button>`; }

// ---- Tra năm: can chi, ngũ hành, nạp âm, Tam nguyên cửu vận, niên tinh ----
// Quy ước: năm can chi/niên tinh tính từ Lập xuân (~4/2 dương lịch); vận 20 năm, Thượng nguyên vận 1 bắt đầu 1864.
// Bảng can chi, nạp âm, cửu vận nằm ở lõi dùng chung (chung/can-chi.js, chung/cuu-cung.js), không chép lại ở đây.
function namInfo(y) {
  const c60 = CanChi.nam(y), c = c60 % 10, z = c60 % 12, v = CuuCung.van(y), sao = CuuCung.nienTinh(y);
  return {y, canChi:CanChi.ten(c60), hanhCan:HANH_CAN[c], hanhChi:HANH_CHI[z], napAm:CanChi.napAm(c60),
    van:v.van, nguyen:v.nguyen, vanTu:v.tu, vanDen:v.den, vanQue:v.que, sao:`${sao} – ${SAO[sao]}`};
}
function traNam() {
  const y0 = parseInt($("#namY").value,10) || new Date().getFullYear(), n = Math.min(Math.max(parseInt($("#soNam").value,10)||10,1),60);
  const rows = Array.from({length:n},(_,i)=>namInfo(y0+i));
  const a = rows[0];
  $("#kqNam").innerHTML = `<div class="card"><h2>Năm ${a.y}: ${a.canChi}</h2>
   <p>Can ${a.canChi.split(" ")[0]} thuộc <b>${a.hanhCan}</b>, chi ${a.canChi.split(" ")[1]} thuộc <b>${a.hanhChi}</b> · Nạp âm: <b>${a.napAm}</b></p>
   <p>${a.nguyen} nguyên, <b>vận ${a.van}</b> (${a.vanTu}–${a.vanDen}), quái của vận: <b>${a.vanQue}</b> · Niên tinh nhập trung cung: <b>${a.sao}</b></p>
   ${(() => { const h = window.HCKT && HCKT.info(a.y); return h ? `<p><b>Hoàng cực kinh thế:</b> ${h.tenHoi} – quẻ ${String.fromCodePoint(0x4DC0+h.queHoi[0]-1)} ${h.queHoi[1]} (${h.hoiTu} – ${h.hoiDen}) ·
     ${h.tenVan}, vận thứ ${h.vanTrongHoi}/30 của hội (${h.vanTu}–${h.vanDen}) · ${h.tenThe} (${h.theTu}–${h.theDen}), năm thứ ${h.namTrongThe}/30</p>` : ""; })()}
   <p class="mute">Đọc thêm chương N6, N7, N9 trong mục Nghiên cứu. Đây là thuật số đời sau, không phải kinh văn; các phái có thể lệch mốc.</p></div>
   <div class="card"><table class="tb"><tr><th>Năm</th><th>Can chi</th><th>Hành can/chi</th><th>Nạp âm</th><th>Vận</th><th>Niên tinh</th></tr>` +
   rows.map(r=>`<tr><td>${r.y}</td><td>${r.canChi}</td><td>${r.hanhCan}/${r.hanhChi}</td><td>${r.napAm}</td><td>${r.van} – ${r.vanQue.split(" (")[0]}</td><td>${r.sao}</td></tr>`).join("") +
   `</table></div>`;
}

// ---- điều hướng ----
function tab(id) {
  ["sach","tra","gieo","nhap","mh","lh","nam","tv","ls"].forEach(x=>$("#"+x).classList.toggle("hidden",x!==id));
  document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.t===id));
  if (id==="ls") hist();
}
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>tab(b.dataset.t));
$("#q").oninput = search;
$("#showzh").onchange = () => { const p = localStorage.getItem("kd_page")||"toc"; if (!$("#sach").classList.contains("hidden")) go(p); };
$("#btnGieo").onclick = () => $("#kq").innerHTML = result(Array.from({length:6},toss), $("#hoi").value, true, $("#quyet").value);
$("#sel").innerHTML = [5,4,3,2,1,0].map(i=>`<div>Hào ${i+1}: <select id="h${i}">
  <option value="7">7 – thiếu dương ⚊</option><option value="8">8 – thiếu âm ⚋</option>
  <option value="9">9 – lão dương (động)</option><option value="6">6 – lão âm (động)</option></select></div>`).join("");
$("#btnNhap").onclick = () => $("#kq2").innerHTML = result([0,1,2,3,4,5].map(i=>+$("#h"+i).value), $("#hoi2").value, true, $("#quyet2").value);
$("#btnNam").onclick = traNam;
search(); { const p = localStorage.getItem("kd_page"); go(p && PAGES().includes(p) ? p : "toc"); }
