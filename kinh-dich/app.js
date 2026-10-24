// Kinh Dịch — logic giao diện. Dữ liệu: window.KD_ZH (nguyên văn), window.KD_VI (Việt), window.KD_INTRO (dẫn nhập).
"use strict";
const ZH = window.KD_ZH || {}, VI = window.KD_VI || {}, INTRO = window.KD_INTRO || [], STUDY = window.KD_STUDY || [];
const HT = { thuong: [], ha: [], ...(window.KD_HETU || {}) };
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
const PAGES = () => ["toc", ...INTRO.map((_,i)=>"i"+i), ...Array.from({length:64},(_,i)=>"q"+(i+1)),
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
function go(id) {
  const P = PAGES(), k = P.indexOf(id), pv = P[k-1], nx = P[k+1];
  const title = p => p==="toc" ? "Mục lục" : p[0]==="i" ? INTRO[+p.slice(1)].title : p[0]==="s" ? STUDY[+p.slice(1)].title
    : p[0]==="a" ? `Hệ từ thượng ${+p.slice(1)+1}` : p[0]==="b" ? `Hệ từ hạ ${+p.slice(1)+1}`
    : p[0]==="t" ? `${tdThien(p[1]).ten.replace(" truyện","")}${TD[tdThien(p[1]).key].length>1?" "+(+p.slice(2)+1):""}` : `Quẻ ${p.slice(1)}. ${HEX[+p.slice(1)].short}`;
  const pager = `<div class="pager">${pv?`<button class="btn" onclick="go('${pv}')">← ${title(pv)}</button>`:"<span></span>"}
    <button class="btn" onclick="go('toc')">Mục lục</button>${nx?`<button class="btn" onclick="go('${nx}')">${title(nx)} →</button>`:"<span></span>"}</div>`;
  const chap = c => `<div class="card"><h2>${c.title}</h2>${c.html}</div>`;
  let body = id==="toc" ? bookToc() : id[0]==="i" ? chap(INTRO[+id.slice(1)]) : id[0]==="s" ? chap(STUDY[+id.slice(1)])
    : id[0]==="a" ? heTuPage("thuong", +id.slice(1)) : id[0]==="b" ? heTuPage("ha", +id.slice(1))
    : id[0]==="t" ? tdPage(id) : hexPage(+id.slice(1));
  $("#book").innerHTML = pager + body + pager;
  localStorage.setItem("kd_page", id); tab("sach"); window.scrollTo(0,0);
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
function result(vals, hoi, save=true) {
  const lines = vals.map(v=>v%2?"1":"0").join("");
  const mv = vals.map((v,i)=>v===6||v===9?i:-1).filter(i=>i>=0);
  const bienL = vals.map(v=>v===6?"1":v===9?"0":v%2?"1":"0").join("");
  const hoL = lines.slice(1,4)+lines.slice(2,5);
  const chu = BY[lines], bien = BY[bienL], ho = BY[hoL], r = readingRule(chu,bien,mv);
  if (save) { const H = JSON.parse(localStorage.getItem("kd_hist")||"[]"); H.unshift({t:new Date().toLocaleString("vi-VN"),hoi,vals}); localStorage.setItem("kd_hist", JSON.stringify(H.slice(0,100))); }
  let s = `<div class="card">${hoi?`<p><b>Hỏi:</b> ${esc(hoi)}</p>`:""}
   <p>Kết quả (hào 1→6): ${vals.join(", ")} · Hào động: ${mv.length?mv.map(i=>i+1).join(", "):"không"}</p>
   <p>Quẻ chủ <b>${HEX[chu].ch} ${chu}. ${HEX[chu].name}</b>${mv.length?` → quẻ biến <b>${HEX[bien].ch} ${bien}. ${HEX[bien].name}</b>`:""} · quẻ hỗ ${HEX[ho].ch} ${ho}. ${HEX[ho].short}</p>
   <div class="rule">📌 <b>Cách đọc:</b> ${r.txt} Các đoạn cần đọc được tô đỏ bên dưới.</div>
   <p class="mute">Quẻ hỗ (hào 2-3-4 làm hạ quái, 3-4-5 làm thượng quái) cho thấy diễn biến bên trong sự việc.</p></div>`;
  s += hexPage(chu,{mv,focus:r.chu.length?r.chu:["__"],label:"Quẻ chủ"});
  if (mv.length) s += hexPage(bien,{focus:r.bien.length?r.bien:["__"],label:"Quẻ biến"});
  return s;
}
function hist() {
  const H = JSON.parse(localStorage.getItem("kd_hist")||"[]");
  $("#hist").innerHTML = `<div class="card"><h2>Lịch sử gieo quẻ</h2>${H.length?"":"<p>Chưa có lần gieo nào.</p>"}` +
    H.map((x,i)=>{const L=x.vals.map(v=>v%2?"1":"0").join("");return `<div class="hao"><a href="#" onclick="replay(${i});return false">${x.t} · ${HEX[BY[L]].ch} ${HEX[BY[L]].short}</a> ${x.hoi?"— "+esc(x.hoi):""}</div>`;}).join("") +
    (H.length?`<br><button class="btn" onclick="localStorage.removeItem('kd_hist');hist()">Xóa lịch sử</button>`:"") + "</div>";
}
function replay(i){ const x = JSON.parse(localStorage.getItem("kd_hist"))[i]; $("#hist").innerHTML = result(x.vals,x.hoi,false) + `<button class="btn" onclick="hist()">← Lịch sử</button>`; }

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
$("#btnGieo").onclick = () => $("#kq").innerHTML = result(Array.from({length:6},toss), $("#hoi").value);
$("#sel").innerHTML = [5,4,3,2,1,0].map(i=>`<div>Hào ${i+1}: <select id="h${i}">
  <option value="7">7 – thiếu dương ⚊</option><option value="8">8 – thiếu âm ⚋</option>
  <option value="9">9 – lão dương (động)</option><option value="6">6 – lão âm (động)</option></select></div>`).join("");
$("#btnNhap").onclick = () => $("#kq2").innerHTML = result([0,1,2,3,4,5].map(i=>+$("#h"+i).value), $("#hoi2").value);
$("#btnNam").onclick = traNam;
search(); { const p = localStorage.getItem("kd_page"); go(p && PAGES().includes(p) ? p : "toc"); }
