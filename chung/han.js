// Nghĩa chữ Hán dùng chung: rê chuột (máy tính) hoặc chạm (điện thoại) vào chữ Hán thì nổi lên âm Hán Việt và nghĩa.
// Gắn: <script src="../chung/han.js" defer></script> ở cuối trang. Tự bọc mọi cụm chữ Hán trong <span class="hn">, kể cả phần trang vẽ lại sau.
// Từ điển (chung/han/am.js + chung/han/<chuyên mục>.js) sinh bởi chung/tools/tao-tu-dien-han.mjs, chỉ tải khi người đọc chạm lần đầu.
// Ghi đè cho một chỗ: data-han-am="…" data-han-nghia="…" trên phần tử bao. Không bọc: data-han="khong".
(function () {
  // Chỉ chạy trong trình duyệt thật; tool kiểm giả lập trang (vm, document giả) thì lui ra, không ảnh hưởng.
  if (typeof document === "undefined" || typeof location === "undefined" || typeof MutationObserver === "undefined" ||
      typeof NodeFilter === "undefined" || typeof document.createTreeWalker !== "function" || typeof matchMedia !== "function" || window.HAN_DA_GAN) return;
  window.HAN_DA_GAN = true;
  const PHIEN_BAN = "9aa12003518b";
  const me = document.currentScript;
  const goc = me && me.src ? me.src.replace(/[?#].*$/, "").replace(/[^/]*$/, "") : "../chung/";
  const MUC = ["kinh-dich", "sach-ngan", "coi-tam", "le-cung", "xem-ngay", "tu-vi", "phong-thuy"];
  const muc = (location.pathname.match(/\/([\w-]+)\/[^/]*$/) || [])[1];
  // chữ Hán (bỏ U+4DC0–4DFF: ký hiệu 64 quẻ ䷀) và dấu câu Hán nằm giữa các chữ
  const H = "\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff", D = "\\u3000-\\u303f\\uff00-\\uffef·・";
  const CUM = new RegExp(`[${H}](?:[${H}${D}]*[${H}])?`, "g");
  const CO_HAN = new RegExp(`[${H}]`);
  const chiHan = s => s.replace(new RegExp(`[^${H}]`, "g"), "");
  const BO_QUA = "script,style,textarea,input,select,option,title,code,pre,svg,.hn,#han-bong,[data-han=khong]";

  // ---- bọc chữ Hán ----
  function boc(goc0) {
    if (!goc0 || !goc0.nodeType) return;
    const w = document.createTreeWalker(goc0, NodeFilter.SHOW_TEXT, {
      acceptNode: n => CO_HAN.test(n.nodeValue) && !(n.parentElement && n.parentElement.closest(BO_QUA)) ? 1 : 3
    });
    const ds = []; while (w.nextNode()) ds.push(w.currentNode);
    for (const n of ds) {
      const t = n.nodeValue, f = document.createDocumentFragment(); let i = 0;
      for (const m of t.matchAll(CUM)) {
        if (m.index > i) f.appendChild(document.createTextNode(t.slice(i, m.index)));
        const s = document.createElement("span"); s.className = chiHan(m[0]).length <= 12 ? "hn ngan" : "hn"; s.textContent = m[0];
        f.appendChild(s); i = m.index + m[0].length;
      }
      if (i < t.length) f.appendChild(document.createTextNode(t.slice(i)));
      n.parentNode.replaceChild(f, n);
    }
  }
  let hen = 0; const cho = new Set();
  const theoDoi = new MutationObserver(ms => {
    for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 ? !n.closest(BO_QUA) : n.nodeType === 3) cho.add(n.nodeType === 3 ? n.parentNode : n);
    if (cho.size && !hen) hen = setTimeout(() => {         // hẹn giờ thay vì requestAnimationFrame: vẫn chạy khi thẻ bị ẩn
      hen = 0; theoDoi.disconnect();
      for (const n of cho) if (n && n.isConnected) boc(n);
      cho.clear(); theoDoi.observe(document.body, { childList: true, subtree: true });
    }, 30);
  });

  // ---- từ điển (tải lười) ----
  let taiXong = null;
  const nap = src => new Promise(ok => { const s = document.createElement("script"); s.src = goc + src + (PHIEN_BAN ? "?v=" + PHIEN_BAN : ""); s.onload = s.onerror = ok; document.head.appendChild(s); });
  const tai = () => taiXong || (taiXong = Promise.all([nap("han/am.js"), MUC.includes(muc) ? nap(`han/${muc}.js`) : 0]).then(() => {
    const cau = window.HAN_CAU || []; const bang = new Map(cau.map(r => [r[0], r]));
    return { am: window.HAN_AM || {}, cau, bang };
  }));
  const amChu = (td, k) => { const c = [...k], biet = c.filter(x => td.am[x]).length; return biet / c.length >= 0.7 ? c.map(x => (td.am[x] || x).split("/")[0]).join(" ") : ""; };   // thiếu âm quá 30%: không hiện dòng âm
  function traCuu(td, k) {
    const x = td.bang.get(k);
    if (x) return { am: x[1], nghia: x[2] };
    const r = { am: amChu(td, k), nghia: "", trong: null };
    if ([...k].length >= 2) {                   // câu ngắn nhất trong kho chứa cụm này
      let tot = null; for (const c of td.cau) if (c[0].length > k.length && c[0].includes(k) && (c[2] || c[1]) && (!tot || c[0].length < tot[0].length)) tot = c;
      if (tot) r.trong = { am: tot[1], nghia: tot[2] };
    }
    return r;
  }

  // ---- bong bóng ----
  const st = document.createElement("style");
  st.textContent = `.hn{cursor:help;border-radius:3px}.hn.ngan{text-decoration:underline dotted rgba(139,46,31,.45);text-underline-offset:3px}
.hn:hover,.hn.dang{background:rgba(139,46,31,.09)}
#han-bong{position:absolute;z-index:9999;box-sizing:border-box;max-width:min(420px,calc(100vw - 32px));max-height:50vh;overflow:auto;background:#fffdf8;color:#2a241c;
border:1px solid #d9cdb8;border-radius:8px;box-shadow:0 6px 24px rgba(40,30,10,.18);padding:8px 12px;font:15px/1.5 "Segoe UI",system-ui,sans-serif;text-align:left}
#han-bong .hb-am{font-weight:600;color:#8b2e1f}#han-bong .hb-ng{margin-top:2px}#han-bong .hb-tr{margin-top:6px;padding-top:6px;border-top:1px dashed #e2d8c6;font-size:13.5px;color:#5c5243}
#han-bong .hb-nhan{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#8a7d68;margin-right:4px}#han-bong .hb-chu{font-size:12.5px;color:#8a7d68;margin-top:4px}`;
  document.head.appendChild(st);
  const bong = document.createElement("div"); bong.id = "han-bong"; bong.setAttribute("role", "tooltip"); bong.hidden = true;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let dang = null, hTat = 0, hHien = 0;
  function datCho(el) {
    const r = el.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    bong.style.left = "0px"; bong.style.top = "0px"; bong.hidden = false;
    const b = bong.getBoundingClientRect();
    let x = Math.max(16, Math.min(r.left, vw - b.width - 16));   // luôn chừa lề 16px hai bên
    let y = r.bottom + 6; if (y + b.height > innerHeight - 8 && r.top - b.height - 6 > 8) y = r.top - b.height - 6;
    bong.style.left = x + scrollX + "px"; bong.style.top = y + scrollY + "px";
  }
  async function hien(el) {
    if (dang) dang.classList.remove("dang");
    dang = el; el.classList.add("dang");
    const bao = el.closest("[data-han-nghia],[data-han-am]");
    const k = chiHan(el.textContent);
    let r;
    if (bao) r = { am: bao.getAttribute("data-han-am") || "", nghia: bao.getAttribute("data-han-nghia") || "" };
    else { bong.innerHTML = `<div class="hb-chu">Đang tra…</div>`; datCho(el); const td = await tai(); if (dang !== el) return; r = traCuu(td, k); }
    let s = r.am ? `<div class="hb-am">${esc(r.am)}</div>` : "";
    if (r.nghia) s += `<div class="hb-ng">${esc(r.nghia)}</div>`;
    if (r.trong) s += `<div class="hb-tr"><span class="hb-nhan">Trong câu</span>${r.trong.am ? `<i>${esc(r.trong.am)}</i>` : ""}${r.trong.nghia ? ` → ${esc(r.trong.nghia)}` : ""}</div>`;
    if (!r.nghia && !r.trong && !bao) s += `<div class="hb-chu">Âm Hán Việt từng chữ; nghĩa xem lời dịch bên cạnh.</div>`;
    bong.innerHTML = s || `<div class="hb-chu">Chưa có trong từ điển của kho.</div>`; datCho(el);
  }
  function tat() { clearTimeout(hHien); bong.hidden = true; if (dang) dang.classList.remove("dang"); dang = null; }
  const coRe = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (coRe) {
    document.addEventListener("mouseover", e => {
      const el = e.target.closest && e.target.closest(".hn");
      if (el) { clearTimeout(hTat); if (el !== dang) { clearTimeout(hHien); hHien = setTimeout(() => hien(el), 220); } }
      else if (e.target.closest && e.target.closest("#han-bong")) clearTimeout(hTat);
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest && (e.target.closest(".hn") || e.target.closest("#han-bong"))) { clearTimeout(hHien); clearTimeout(hTat); hTat = setTimeout(tat, 180); }
    });
  }
  document.addEventListener("click", e => {
    const el = e.target.closest && e.target.closest(".hn");
    if (el && !coRe) { if (el === dang && !bong.hidden) tat(); else hien(el); return; }
    if (!(e.target.closest && e.target.closest("#han-bong"))) tat();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") tat(); });
  addEventListener("resize", tat);

  function batDau() {
    document.body.appendChild(bong); boc(document.body);
    theoDoi.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", batDau); else batDau();
  window.HanNghia = { boc, tai, traCuu };
})();
