// Cõi tạm — logic giao diện. Dữ liệu: window.CT_BAI (mảng bài đã viết, nạp từ data/bai-NN.js).
"use strict";
const BAI = (window.CT_BAI || []).slice().sort((a, b) => a.so - b.so);
// Dàn ý 12 bài theo NGHIEN-CUU/00-ban-do-kho-sach.md mục 6
const DAN_Y = [
  [1, "Quán trọ của muôn loài", "Lý Bạch · Pháp Cú · Trần Thái Tông"],
  [2, "Trăm năm trong cõi người ta", "Truyện Kiều · Thái Căn Đàm · Nguyễn Công Trứ"],
  [3, "Thân như điện ảnh", "Vạn Hạnh · Kim Cang · Pháp Cú"],
  [4, "Phù du giữa trời đất", "Tô Thức · Trang Tử · Cao Bá Quát"],
  [5, "Hoa rụng, mai nở", "Mãn Giác · Trang Tử gõ chậu · Tản Đà"],
  [6, "Danh lợi \"liễu\"", "Hảo liễu ca · Nguyễn Bỉnh Khiêm · Nguyễn Công Trứ"],
  [7, "Về với gốc", "Đạo Đức Kinh 16 · Đào Uyên Minh · Nguyễn Trãi"],
  [8, "Nước chảy không về", "Luận Ngữ · Tú Xương · Nguyễn Khuyến"],
  [9, "Sắc tức thị không", "Tâm kinh · Kim Cang · Cư trần lạc đạo"],
  [10, "Bốn núi vây quanh", "Khóa hư lục · Pháp Cú · Tản Đà"],
  [11, "Thương thay thập loại chúng sinh", "Nguyễn Du · Vu lan · Pháp Cú"],
  [12, "Ở trọ mà vui", "Trần Nhân Tông · Vương Duy · Nguyễn Bỉnh Khiêm · Thái Căn Đàm"],
];
const $ = s => document.querySelector(s);
let trangHienTai = "toc";
const zhOn = () => $("#showzh").checked;
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const baiSo = n => BAI.find(b => b.so === n);
const PAGES = () => ["toc", ...BAI.map(b => "b" + b.so)];

function tocPage() {
  let s = `<div class="card"><h2>Mục lục</h2><p class="mute">Mỗi bài là một lần dừng chân: vài dòng dẫn, ba trích dẫn cổ (nguyên văn, âm, dịch, lời bình) và một đoạn suy ngẫm. Nguyên văn lấy từ Wikisource, phạm vi công cộng; phần dịch và lời bình là bản tự biên soạn.</p><div class="toc">`;
  for (const [so, ten, ai] of DAN_Y) {
    const b = baiSo(so);
    s += b ? `<a onclick="go('b${so}')"><b>${so}.</b> ${esc(ten)} <span class="mute">— ${esc(ai)}</span></a>`
           : `<a class="sap"><b>${so}.</b> ${esc(ten)} <span class="mute">— ${esc(ai)} (sắp có)</span></a>`;
  }
  return s + `</div><p class="mute">Đã viết ${BAI.length}/${DAN_Y.length} bài.</p></div>`;
}
// Một trích dẫn: khung .hao với nguyên văn (Hán hoặc Việt), âm Hán Việt, dịch nghĩa, lời bình, ghi chú
function trichHtml(t, j) {
  let s = `<div class="hao"><div class="t">${j + 1}. ${esc(t.nguon)}</div>`;
  if (t.zh) {
    s += `<div class="zh tho">${esc(t.zh)}</div><div class="hv tho">${esc(t.hv)}</div>`;
  } else {
    s += `<div class="tho">${esc(t.viet || t.nom)}</div>`;
    if (t.hv) s += `<div class="hv tho">${esc(t.hv)}</div>`;
  }
  if (t.dich) s += `<div class="dich tho">→ ${esc(t.dich)}</div>`;
  if (t.g) s += `<div class="giai">${t.g}</div>`;
  if (t.ghi) s += `<div class="mute">${t.ghi}</div>`;
  return s + `</div>`;
}
function baiPage(b) {
  const mp3 = `audio/bai-${String(b.so).padStart(2, "0")}.mp3`;
  let s = `<div class="card"><span class="tag">Bài ${b.so}</span><h2>${esc(b.ten)}</h2>
   <p class="noprint"><audio controls preload="none" src="${mp3}" onerror="this.parentNode.style.display='none'" style="width:100%;max-width:520px"></audio><br>
   <span class="mute">🎧 Giọng đọc nam (tạo bằng máy, có thể đọc sai vài chữ cổ); nếu không hiện trình phát là bài này chưa có audio.</span></p>
   <div class="dan">${b.dan}</div>`;
  s += `<h3>Ba trích dẫn</h3>`;
  b.trich.forEach((t, j) => s += trichHtml(t, j));
  s += `<h3>Suy ngẫm</h3><div class="suy">${b.suyNgam}</div>`;
  s += `<p class="mute">Nguồn nguyên văn: ` + b.nguon.map(n => `<a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.ten)}</a>`).join(" · ")
    + `. Phạm vi công cộng. Dịch nghĩa và lời bình là bản tự biên soạn của kho Sách Tinh Hoa.</p></div>`;
  return s;
}
function go(id) {
  const P = PAGES(), k = P.indexOf(id);
  if (k < 0) id = "toc";
  const pv = P[k - 1], nx = P[k + 1];
  const title = p => p === "toc" ? "Mục lục" : `Bài ${p.slice(1)}. ${baiSo(+p.slice(1)).ten}`;
  const pager = `<div class="pager">${pv ? `<button class="btn" onclick="go('${pv}')">← ${esc(title(pv))}</button>` : "<span></span>"}
    <button class="btn" onclick="go('toc')">Mục lục</button>${nx ? `<button class="btn" onclick="go('${nx}')">${esc(title(nx))} →</button>` : "<span></span>"}</div>`;
  const body = id === "toc" ? tocPage() : baiPage(baiSo(+id.slice(1)));
  $("#book").innerHTML = id === "toc" ? body : pager + body + pager;
  trangHienTai = id;
  if (document.body) document.body.classList.toggle("nozh", !zhOn());   // ẩn mọi phần tử .zh, kể cả chữ Hán chen trong lời bình
  if (id !== "toc") localStorage.setItem("ct_bai", id);
  document.querySelectorAll("nav button").forEach(x => x.classList.toggle("on", x.dataset.t === (id === "toc" ? "toc" : "doc")));
  window.scrollTo(0, 0);
}
const dangDoc = () => { const p = localStorage.getItem("ct_bai"); return p && PAGES().includes(p) ? p : null; };
document.querySelectorAll("nav button").forEach(x => x.onclick = () => go(x.dataset.t === "toc" ? "toc" : (dangDoc() || "toc")));
$("#showzh").onchange = () => go(trangHienTai);
go(dangDoc() || "toc");
