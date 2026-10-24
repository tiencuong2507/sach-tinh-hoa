// Lõi dùng chung — Bộ chọn ngày có lịch âm: gắn vào ô <input type="date"> hoặc <input type="datetime-local">,
// thêm nút 📅 mở lưới tháng dương với số ngày âm nhỏ ở mỗi ô (mùng 1 ghi cả tháng, tháng nhuận có chữ "n"),
// tiết khí đổi tháng được đánh dấu, hôm nay viền đỏ; với datetime-local có thêm chọn giờ theo 12 chi.
// Nạp sau chung/lich.js và chung/can-chi.js. Dùng: LichChon.gan("#mhDT") hoặc LichChon.ganTatCa().
"use strict";
const LichChon = (() => {
  const CSS = `.lc-nut{margin-left:4px;padding:6px 8px;border:1px solid #b9ae98;background:#fff;border-radius:6px;cursor:pointer;font-size:15px}
.lc-pop{position:absolute;z-index:50;background:#fff;border:1px solid #b9ae98;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.18);padding:10px;width:340px;max-width:calc(100vw - 24px);font-size:14px;color:#222}
.lc-dau{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.lc-dau b{font-size:15px}
.lc-dau button,.lc-gio button{padding:3px 8px;border:1px solid #d9d0bd;background:#faf7f0;border-radius:5px;cursor:pointer}
.lc-luoi{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}.lc-thu{text-align:center;color:#6b6253;font-size:12px}
.lc-o{border:1px solid #eee5d3;border-radius:6px;padding:3px 2px;text-align:center;cursor:pointer;line-height:1.15;min-height:38px}
.lc-o:hover{background:#fff3ef}.lc-o.mo{opacity:.45}.lc-o.nay{outline:2px solid #8b2e1f}.lc-o.chon{background:#8b2e1f;color:#fff}
.lc-o .d{font-size:15px;font-weight:600}.lc-o .a{font-size:10.5px;color:#6b6253}.lc-o.chon .a{color:#f3e2dc}.lc-o .a.m1{color:#8b2e1f;font-weight:600}.lc-o.chon .a.m1{color:#fff}
.lc-o .t{font-size:9.5px;color:#1e6b3a}
.lc-gio{display:grid;grid-template-columns:repeat(6,1fr);gap:3px;margin-top:8px}.lc-gio button.on{background:#8b2e1f;color:#fff;border-color:#8b2e1f}
.lc-chan{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12.5px;color:#6b6253}`;
  const THU = ["T2","T3","T4","T5","T6","T7","CN"];
  const TIET = ["Tiểu hàn","Đại hàn","Lập xuân","Vũ thủy","Kinh trập","Xuân phân","Thanh minh","Cốc vũ","Lập hạ","Tiểu mãn","Mang chủng","Hạ chí",
    "Tiểu thử","Đại thử","Lập thu","Xử thử","Bạch lộ","Thu phân","Hàn lộ","Sương giáng","Lập đông","Tiểu tuyết","Đại tuyết","Đông chí"];
  const pad = x => String(x).padStart(2, "0");
  let open = null;
  function tietKhiNgay(d, m, y) {  // tên tiết khí nếu trong ngày này kinh độ Mặt Trời vượt bội số 15°
    const a = LichAm.kinhDoMatTroi(d, m, y, 0, 0), b = LichAm.kinhDoMatTroi(d, m, y, 23, 59);
    const ka = Math.floor(a / 15), kb = Math.floor(((b < a ? b + 360 : b)) / 15);
    if (kb > ka) { const k = (ka + 1) % 24; return TIET[(k + 24 - 19) % 24]; }   // 285° (k=19) là Tiểu hàn
    return null;
  }
  function render(st) {
    const { y, m } = st, n = new Date(y, m, 0).getDate(), first = (new Date(y, m - 1, 1).getDay() + 6) % 7, nay = new Date();
    const am1 = LichAm.solar2lunar(1, m, y), amN = LichAm.solar2lunar(n, m, y);
    let s = `<div class="lc-dau"><button data-lc="prev">‹</button><b>Tháng ${m}/${y}</b> <span style="font-size:12px;color:#6b6253">âm: ${am1.thang}${am1.nhuan?"n":""}/${am1.nam} – ${amN.thang}${amN.nhuan?"n":""}/${amN.nam}</span><button data-lc="next">›</button></div><div class="lc-luoi">`;
    THU.forEach(t => s += `<div class="lc-thu">${t}</div>`);
    for (let i = 0; i < first; i++) { const d = new Date(y, m - 1, 1 - first + i); s += `<div class="lc-o mo"><div class="d">${d.getDate()}</div></div>`; }
    for (let d = 1; d <= n; d++) {
      const am = LichAm.solar2lunar(d, m, y), tk = tietKhiNgay(d, m, y), laNay = d === nay.getDate() && m === nay.getMonth() + 1 && y === nay.getFullYear();
      const chon = st.d === d;
      s += `<div class="lc-o${laNay?" nay":""}${chon?" chon":""}" data-lc="d" data-d="${d}"><div class="d">${d}</div><div class="a${am.ngay===1?" m1":""}">${am.ngay===1?`1/${am.thang}${am.nhuan?"n":""}`:am.ngay}</div>${tk?`<div class="t">${tk}</div>`:""}</div>`;
    }
    s += `</div>`;
    if (st.gio) { s += `<div class="lc-gio">`; CHI.forEach((c, i) => s += `<button data-lc="g" data-g="${i}" class="${st.g===i?"on":""}">${c}<br><span style="font-size:10px">${(i*2+23)%24}–${(i*2+1)%24}h</span></button>`); s += `</div>`; }
    const am = LichAm.solar2lunar(st.d, m, y), idx = CanChi.ngay(LichAm.jdFromDate(st.d, m, y));
    s += `<div class="lc-chan"><span>Đang chọn: ${st.d}/${m}/${y} · âm ${am.ngay}/${am.thang}${am.nhuan?"n":""}/${am.nam} · ngày ${CanChi.ten(idx)}</span><button data-lc="nay">Hôm nay</button> <button data-lc="xong">Xong</button></div>`;
    st.pop.innerHTML = s;
  }
  function ghi(st) {
    const el = st.input, v = `${st.y}-${pad(st.m)}-${pad(st.d)}`;
    const gioBatDau = st.g === 0 ? 0 : (st.g * 2 + 23) % 24;          // giờ Tý ghi 0h để không nhảy sang ngày sau; Sửu 1h, Dần 3h … Hợi 21h
    el.value = st.gio ? `${v}T${pad(gioBatDau)}:${pad(st.mi)}` : v;
    el.dispatchEvent(new Event("change", { bubbles: true })); el.dispatchEvent(new Event("input", { bubbles: true }));
  }
  function gan(sel) {
    const input = typeof sel === "string" ? document.querySelector(sel) : sel;
    if (!input || !document.createElement || input.dataset.lc) return;
    input.dataset.lc = "1";
    const nut = document.createElement("button"); nut.type = "button"; nut.className = "lc-nut"; nut.textContent = "📅"; nut.title = "Chọn ngày có lịch âm";
    input.insertAdjacentElement("afterend", nut);
    nut.onclick = e => {
      e.preventDefault();
      if (open && open.input === input) { dong(); return; } dong();
      const now = new Date(), mv = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(input.value || "");
      const st = { input, gio: input.type === "datetime-local", y: mv ? +mv[1] : now.getFullYear(), m: mv ? +mv[2] : now.getMonth() + 1, d: mv ? +mv[3] : now.getDate(),
        g: CanChi.chiGioTuGio(mv && mv[4] !== undefined ? +mv[4] : now.getHours()), mi: mv && mv[5] !== undefined ? +mv[5] : 0 };
      st.pop = document.createElement("div"); st.pop.className = "lc-pop";
      const r = nut.getBoundingClientRect(); st.pop.style.left = Math.max(8, Math.min(r.left + window.scrollX, window.innerWidth - 352)) + "px"; st.pop.style.top = (r.bottom + window.scrollY + 4) + "px";
      document.body.appendChild(st.pop); open = st; render(st);
      st.pop.onclick = ev => {
        const t = ev.target.closest("[data-lc]"); if (!t) return; const k = t.dataset.lc;
        if (k === "prev") { st.m--; if (st.m < 1) { st.m = 12; st.y--; } st.d = Math.min(st.d, new Date(st.y, st.m, 0).getDate()); }
        else if (k === "next") { st.m++; if (st.m > 12) { st.m = 1; st.y++; } st.d = Math.min(st.d, new Date(st.y, st.m, 0).getDate()); }
        else if (k === "d") { st.d = +t.dataset.d; ghi(st); if (!st.gio) { dong(); return; } }
        else if (k === "g") { st.g = +t.dataset.g; ghi(st); }
        else if (k === "nay") { const n = new Date(); st.y = n.getFullYear(); st.m = n.getMonth() + 1; st.d = n.getDate(); st.g = CanChi.chiGioTuGio(n.getHours()); st.mi = n.getMinutes(); ghi(st); }
        else if (k === "xong") { ghi(st); dong(); return; }
        render(st);
      };
      setTimeout(() => document.addEventListener("mousedown", ngoai), 0);
    };
  }
  function ngoai(e) { if (open && !open.pop.contains(e.target) && e.target.className !== "lc-nut") dong(); }
  function dong() { if (open) { open.pop.remove(); open = null; document.removeEventListener("mousedown", ngoai); } }
  function ganTatCa() { if (!document.createElement) return; if (!document.getElementById("lc-css")) { const st = document.createElement("style"); st.id = "lc-css"; st.textContent = CSS; document.head.appendChild(st); }
    document.querySelectorAll('input[type="date"],input[type="datetime-local"]').forEach(gan); }
  return { gan, ganTatCa, tietKhiNgay };
})();
if (typeof window !== "undefined") { window.LichChon = LichChon; if (typeof document !== "undefined" && document.addEventListener) document.addEventListener("DOMContentLoaded", LichChon.ganTatCa); }
