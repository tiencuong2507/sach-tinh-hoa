// Sách ngắn — logic giao diện. Dữ liệu: window.SN_SACH = [{slug, ten, tenHan, tacGia, doi, gioiThieu, nguon, doan:[{zh,hv,dich,g}], ketLuan}]
"use strict";
const SACH = (window.SN_SACH || []).filter(s => s && s.slug);
const KEY_TRANG = "sn_page";

// ---- tiện ích ----
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const zhOn = () => $("#showzh").checked;
const zh = s => s && zhOn() ? `<div class="zh">${esc(s)}</div>` : "";
const idCua = s => "s" + s.slug;
const sachCua = id => SACH.find(s => idCua(s) === id);

// ---- mục lục ----
function bookToc() {
  let s = `<div class="card"><h2>Mục lục</h2><p class="mute">Mỗi cuốn đọc trọn trong một trang: từng đoạn Hán – âm – dịch – bình, cuối có phần nên nhớ.</p><div class="toc">`;
  SACH.forEach(b => s += `<a onclick="go('${idCua(b)}')"><b>${esc(b.ten)}</b> <span class="zh">${esc(b.tenHan || "")}</span>
    <span class="mute">— ${esc(b.tacGia || "")}${b.doi ? ", " + esc(b.doi) : ""} · ${(b.doan || []).length} đoạn</span></a>`);
  if (!SACH.length) s += `<p class="mute">Chưa có cuốn nào.</p>`;
  return s + `</div></div>`;
}

// ---- trang một cuốn ----
function bookPage(b) {
  let s = `<div class="card"><span class="tag">${esc(b.doi || "")}</span><h2>${esc(b.ten)} ${zhOn() ? `<span class="zh">${esc(b.tenHan || "")}</span>` : ""}</h2>
    <p><b>Tác giả:</b> ${esc(b.tacGia || "")}</p><h3>Giới thiệu</h3><div class="giai">${b.gioiThieu || ""}</div>`;
  s += `<h3>Toàn văn</h3>`;
  (b.doan || []).forEach((d, j) => s += `<div class="hao"><div class="t">Đoạn ${j + 1}</div>${zh(d.zh)}<div class="hv">${esc(d.hv)}</div>
    <div class="dich">→ ${esc(d.dich)}</div>${d.g ? `<div class="giai mute">${esc(d.g)}</div>` : ""}</div>`);
  if (b.ketLuan) s += `<h3>Đọc xong nên nhớ gì</h3><div class="ketluan">${esc(b.ketLuan)}</div>`;
  const n = b.nguon || {};
  s += `<p class="mute">Nguyên văn: <a href="${esc(n.url || "#")}" target="_blank" rel="noopener">${esc(n.url || "")}</a>${n.ghiChu ? ` (${esc(n.ghiChu)})` : ""}. Dịch và bình là bản biên soạn tham khảo của kho.</p>`;
  return s + `</div>`;
}

const PAGES = () => ["toc", ...SACH.map(idCua)];
function go(id) {
  const P = PAGES(); if (!P.includes(id)) id = "toc";
  const k = P.indexOf(id), pv = P[k - 1], nx = P[k + 1];
  const title = p => p === "toc" ? "Mục lục" : (sachCua(p) || {}).ten || p;
  const pager = `<div class="pager">${pv ? `<button class="btn" onclick="go('${pv}')">← ${esc(title(pv))}</button>` : "<span></span>"}
    <button class="btn" onclick="go('toc')">Mục lục</button>${nx ? `<button class="btn" onclick="go('${nx}')">${esc(title(nx))} →</button>` : "<span></span>"}</div>`;
  const body = id === "toc" ? bookToc() : bookPage(sachCua(id));
  $("#book").innerHTML = id === "toc" ? body : pager + body + pager;
  document.title = (id === "toc" ? "Sách ngắn" : title(id) + " — Sách ngắn");
  localStorage.setItem(KEY_TRANG, id);
  document.querySelectorAll("nav button").forEach(x => x.classList.toggle("on", x.dataset.t === "toc" && id === "toc"));
  window.scrollTo(0, 0);
}

// ---- điều hướng ----
document.querySelectorAll("nav button").forEach(x => x.onclick = () => go(x.dataset.t));
$("#showzh").onchange = () => go(localStorage.getItem(KEY_TRANG) || "toc");
{ const p = localStorage.getItem(KEY_TRANG); go(p && PAGES().includes(p) ? p : "toc"); }
