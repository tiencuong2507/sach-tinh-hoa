// Phần đọc thành tiếng dùng chung cho trang đọc của Hành Trình Cội Nguồn (mảng lịch sử, Sách Tinh Hoa). Không dùng cho trang công cụ.
// Gắn: <script src="/sach-tinh-hoa/chung/doc-am.js" defer></script> cuối trang (bản tích hợp website thêm thẻ này).
// Cách chạy: lấy NỘI DUNG CHÍNH (bỏ hình, chú thích, nguồn, ghi chú, câu hỏi luyện, nhãn [V]/[I], chữ Hán, nút, mục lục), băm SHA-256 thành mã,
// tìm bản đọc ghi sẵn /doc-am/a/<mã>.mp3 trong /doc-am/muc-luc.json. Chữ đổi → mã đổi → nút báo "đang cập nhật", không phát bản lệch chữ.
// Đơn vị đọc: trang thường đọc cả <main>; trang sách nhiều chương đọc theo từng chương ([data-doc-don-vi] hoặc article.ddk-chapter);
// Kinh Dịch, Sách ngắn, Lễ cúng, Quán trọ đọc theo trang con go(id). Trang tự đánh dấu được: data-doc="goc" (vùng đọc), data-doc="bo" (không đọc),
// data-doc-don-vi (mỗi chương một bản đọc). Chế độ thu văn bản: ?doc-thu=1 (công cụ chung/doc-am/thu-thap.py dùng).
(function () {
  if (typeof document === "undefined" || typeof location === "undefined" || typeof fetch !== "function" || typeof MutationObserver === "undefined" ||
      typeof crypto === "undefined" || !crypto.subtle || window.DOC_AM_DA_GAN) return;
  window.DOC_AM_DA_GAN = true;
  const me = document.currentScript;
  const GOC_AM = (me && me.dataset.goc) || "/doc-am/";
  const THU = /[?&]doc-thu=1\b/.test(location.search);
  const duong = location.pathname;
  // Trang nhiều "trang con" vẽ bằng go(id): liệt kê trang đọc, bỏ mục lục và công cụ.
  // chuyen: trang con đã có trang riêng chia chương → nút dẫn sang đó, không tạo bản đọc thứ hai.
  const AD = [
    { khop: "/kinh-dich/", goc: "#book", views: () => PAGES().filter(p => p !== "toc" && p !== "qd"), go: id => go(id), hien: () => localStorage.getItem("kd_page") },
    { khop: "/sach-ngan/", goc: "#book", chuyen: { "sto-thu": "/sach-tinh-hoa/to-thu/", "ston-tu-binh-phap": "/sach-tinh-hoa/ton-tu-binh-phap/" },
      views() { return PAGES().filter(p => p !== "toc" && !this.chuyen[p]); }, go: id => go(id), hien: () => (typeof KEY_TRANG !== "undefined" ? localStorage.getItem(KEY_TRANG) : null) },
    { khop: "/le-cung/", goc: "#le", views: () => LE.map(l => "le/" + l.ma), go: id => go(id), hien: () => null },
    // Quán trọ: mỗi bài một bản đọc; không đọc âm Hán Việt (giọng máy đọc sai), như bản đọc soạn tay trước đây
    { khop: "/coi-tam/", goc: "#book", bo: ".hv", views: () => PAGES().filter(p => p !== "toc"), go: id => go(id), hien: () => localStorage.getItem("ct_bai") },
  ].find(a => duong.includes(a.khop));
  const DON_VI = "[data-doc-don-vi], article.ddk-chapter";
  const donVi = () => AD ? [] : [...document.querySelectorAll(DON_VI)];
  const vungDoc = () => document.querySelector("[data-doc=goc]") || (AD && document.querySelector(AD.goc)) || document.querySelector("main");

  // ---- lấy nội dung chính ----
  const BO = ["script", "style", "noscript", "template", "button", "select", "input", "textarea", "form", "nav", "header", "footer", "aside",
    "figure", "figcaption", "img", "svg", "video", "audio", "iframe", "picture", "sup", ".pager", ".btn", ".toc-ch", ".zh", "[lang^=zh]", ".mute",
    ".eyebrow", ".label", ".kicker", ".meta", ".entry-meta", ".src", ".nguon", ".ghi-chu", ".chu-thich", ".footnote", ".footnotes", ".note", ".notes",
    ".source", ".sources", ".tags", ".tag", ".collection-return", ".breadcrumb", ".h-kicker", ".h-actions", ".h-cite", ".h-subaction", ".h-next",
    "blockquote > .m", "cite", ".noprint", ".sr-only", "#han-bong", "#doc-am", "[data-doc=bo]", "[aria-hidden=true]", "[hidden]", ".hidden",
    // bộ đọc sách của Codex: nhãn chương, nguyên văn Hán, dòng nguồn, điều hướng chương, chú giải, nhãn từng lớp, lớp Hán văn
    ".ddk-kicker", ".ddk-original", ".ddk-han", ".ddk-source-line", ".ddk-chapter-nav", ".ddk-toolbar", ".ddk-question", ".kc-notes", ".tt-zh",
    ".tt-layer > h4", ".tt-segment > h3"].join(",") + (AD && AD.bo ? "," + AD.bo : "");   // AD.bo: phần riêng trang con không đọc
  // Tiêu đề mở một phần phụ (anh Cường dặn 26/10/2026: chỉ đọc nội dung chính): nguồn, ghi chú, hình, từ khó, bài tập, câu hỏi luyện, kiểm chứng
  const DAU_PHU = /^(nguồn|tài liệu tham khảo|tham khảo|tư liệu|hình tư liệu|đọc bằng mắt|đọc thêm|ghi chú|chú thích|chú giải|liên kết|xem thêm|mục lục|từ khó|chủ nhiệm dự án|bài tập|nhiệm vụ|hướng dẫn|gợi ý|câu hỏi về chính mình|tự kể lại|kiểm chứng|biết từ đâu|thử nối lại|giữ một câu hỏi|dị bản|khung pháp lý|dừng lại một chút)/i;
  const KHOI = new Set(["P", "DIV", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "SECTION", "ARTICLE", "DD", "DT", "TR", "SUMMARY", "DETAILS", "PRE", "TABLE", "UL", "OL", "DL", "BR", "HR"]);
  function chu(el, ra) {
    let boQuaToi = 0;   // bỏ cả đoạn sau một tiêu đề phụ (Nguồn, Ghi chú…) tới tiêu đề cùng cấp hoặc cao hơn
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { if (!boQuaToi) ra.push(n.nodeValue); continue; }
      if (n.nodeType !== 1) continue;
      const cap = /^H([1-6])$/.exec(n.tagName);
      if (cap) { const c = +cap[1]; if (boQuaToi && c <= boQuaToi) boQuaToi = 0; if (!boQuaToi && DAU_PHU.test(n.textContent.trim())) { boQuaToi = c; continue; } }
      if (boQuaToi || n.matches(BO)) continue;
      const khoi = KHOI.has(n.tagName);
      if (khoi && n.querySelector("a")) {   // khối chỉ gồm liên kết (Đọc Chương 6, Đọc hồ sơ bổ sung…) là điều hướng, không đọc
        const tatCa = n.textContent.replace(/\s+/g, ""), lienKet = [...n.querySelectorAll("a")].map(a => a.textContent).join("").replace(/\s+/g, "");
        if (tatCa && tatCa.replace(/[.,;:↗→]/g, "") === lienKet.replace(/[.,;:↗→]/g, "")) continue;
      }
      if (khoi) ra.push("\n"); chu(n, ra); if (khoi) ra.push("\n");
    }
    return ra;
  }
  function vanBan(goc) {
    if (!goc) return "";
    return chu(goc, []).join("")
      .replace(/[㐀-鿿豈-﫿　-〿＀-￯·・☰-☷]+/g, " ")   // chữ Hán, dấu câu Hán, ký hiệu 64 quẻ và 8 quẻ: không đọc
      .replace(/\[(?:[VIUD])(?:\s*[→>-]\s*[VIUD])?\]/g, " ")                                      // nhãn bằng chứng [V] [I] [U] [I→V]
      .replace(/\[\d+(?:[,–-]\d+)*\]/g, " ")                                                       // số chú thích [1] [2–3]
      .replace(/\([^()]*?(?:Wikipedia|Wikisource|đối chiếu|tra cứu|tra ngày|truy cập|nguồn:)[^()]*\)/gi, " ")   // ghi chú nguồn trong ngoặc
      .replace(/[→←↗↓↑]/g, " ").replace(/\(\s*[,;:]\s*/g, "(").replace(/\(\s*[,.;:–—-]*\s*\)/g, " ")
      .split("\n").map(s => s.replace(/\s+/g, " ").replace(/\s+([,.;:!?])/g, "$1").trim())
      .filter(s => /[a-zà-ỹđ]/i.test(s) && !/^Đoạn \d+\b/.test(s))                                  // nhãn "Đoạn 12" không đọc
      .map(s => /[.!?…:;]$/.test(s) ? s : s + ".").join("\n");
  }
  async function ma(t) {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
    return [...new Uint8Array(b)].slice(0, 8).map(x => x.toString(16).padStart(2, "0")).join("");
  }
  const tenDonVi = (el, i) => el.id || (el.querySelector("h2,h3") ? "c" + String(i + 1).padStart(3, "0") + " " + el.querySelector("h2,h3").textContent.trim().slice(0, 60) : "c" + (i + 1));

  // ---- chế độ thu văn bản (cho công cụ tạo giọng) ----
  if (THU) {
    const chay = async () => {
      const ra = [];
      const day = async (v, el) => { const t = vanBan(el); if (t.length >= 200) ra.push({ view: v, ma: await ma(t), chu: t.length, van_ban: t }); };
      if (AD) for (const v of AD.views()) { AD.go(v); await new Promise(r => setTimeout(r, 60)); await day(v, vungDoc()); }
      else if (donVi().length) { const ds = donVi(); for (let i = 0; i < ds.length; i++) await day(tenDonVi(ds[i], i), ds[i]); }
      else await day("", vungDoc());
      const pre = document.createElement("pre"); pre.id = "doc-thu"; pre.textContent = JSON.stringify({ trang: duong, so: ra.length, muc: ra });
      document.body.appendChild(pre); document.title = "DOC-THU-XONG";
    };
    if (document.readyState === "complete") setTimeout(chay, 300); else addEventListener("load", () => setTimeout(chay, 300));
    return;
  }

  // ---- giao diện nghe ----
  let mucLuc = null;
  const taiMucLuc = () => mucLuc || (mucLuc = fetch(GOC_AM + "muc-luc.json", { cache: "no-cache" }).then(r => r.ok ? r.json() : { am: {} }).catch(() => ({ am: {} })));
  const st = document.createElement("style");
  st.textContent = `#doc-am{position:fixed;right:16px;bottom:16px;z-index:9998;font:15px/1.4 "Segoe UI",system-ui,sans-serif;max-width:calc(100vw - 32px)}
#doc-am .da-nut{display:inline-flex;align-items:center;gap:6px;border:1px solid #c9b996;background:#8b2e1f;color:#fff;border-radius:999px;padding:9px 16px;cursor:pointer;box-shadow:0 4px 14px rgba(40,30,10,.22);font:inherit;text-decoration:none;max-width:100%;box-sizing:border-box}
#doc-am .da-nut span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#doc-am .da-nut[disabled]{background:#9a907f;cursor:default}
#doc-am .da-thanh{display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:#fffdf8;border:1px solid #d9cdb8;border-radius:12px;padding:8px 10px;box-shadow:0 6px 24px rgba(40,30,10,.2);width:min(560px,calc(100vw - 32px));box-sizing:border-box}
#doc-am .da-ten{flex-basis:100%;font-size:13px;color:#8b2e1f;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#doc-am audio{height:36px;flex:1 1 220px;min-width:0}#doc-am .da-toc{font:inherit;padding:4px;border:1px solid #d9cdb8;border-radius:6px;background:#fff}
#doc-am .da-dong{border:0;background:none;font-size:20px;cursor:pointer;color:#6b6253;padding:0 4px}#doc-am .da-ghi{flex-basis:100%;font-size:12.5px;color:#7a6f5d}
@media print{#doc-am{display:none}}`;
  document.head.appendChild(st);
  const hop = document.createElement("div"); hop.id = "doc-am"; hop.setAttribute("data-doc", "bo"); hop.setAttribute("aria-live", "polite");
  const phut = s => s >= 60 ? Math.round(s / 60) + " phút" : Math.round(s) + " giây";
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let hienTai = null, dangNghe = false;   // hienTai: {ma, muc, el, ten, i}
  const maDV = new WeakMap();
  async function thongTin(el) {
    if (maDV.has(el)) return maDV.get(el);
    const t = vanBan(el); const r = t.length < 200 ? null : { ma: await ma(t) };
    if (r) r.muc = ((await taiMucLuc()).am || {})[r.ma] || null;
    maDV.set(el, r); return r;
  }
  function veNut(tt) {
    hop.innerHTML = ""; dangNghe = false;
    if (tt.chuyen) { const a = document.createElement("a"); a.className = "da-nut"; a.href = tt.chuyen; a.innerHTML = "<span>🔊 Nghe theo từng chương ở trang riêng ↗</span>"; hop.appendChild(a); return; }
    const b = document.createElement("button"); b.className = "da-nut";
    const ten = tt.ten ? `chương: ${esc(tt.ten)}` : "bài này";
    if (tt.muc) { b.innerHTML = `<span>🔊 Nghe ${ten} (${phut(tt.muc.s)})</span>`; b.onclick = () => veThanh(tt); }
    else { b.innerHTML = "<span>🔊 Bản đọc đang cập nhật</span>"; b.disabled = true; b.title = "Bài vừa được sửa hoặc mới đăng; bản đọc sẽ có trong đợt cập nhật tới."; }
    hop.appendChild(b);
  }
  function veThanh(tt) {
    dangNghe = true; hienTai = tt;
    hop.innerHTML = `<div class="da-thanh">${tt.ten ? `<div class="da-ten">🔊 ${esc(tt.ten)}</div>` : ""}<audio controls preload="metadata" src="${GOC_AM + tt.muc.f}"></audio>
<select class="da-toc" aria-label="Tốc độ đọc"><option value="0.85">0,85×</option><option value="1" selected>1×</option><option value="1.15">1,15×</option><option value="1.3">1,3×</option></select>
<button class="da-dong" aria-label="Đóng trình đọc" title="Đóng">×</button><div class="da-ghi">Giọng đọc máy (giọng nam trầm); chỉ đọc nội dung chính, không đọc chữ Hán, ghi chú và nguồn.${tt.el ? " Hết chương sẽ tự sang chương sau." : ""}</div></div>`;
    const a = hop.querySelector("audio"), s = hop.querySelector("select");
    try { const v = localStorage.getItem("doc-am:toc"); if (v) s.value = v; } catch (e) {}
    a.playbackRate = +s.value; s.onchange = () => { a.playbackRate = +s.value; try { localStorage.setItem("doc-am:toc", s.value); } catch (e) {} };
    a.onplay = () => { a.playbackRate = +s.value; };
    a.onended = async () => {   // trang nhiều chương: tự sang chương sau nếu đã có bản đọc
      if (!tt.el) return;
      const ds = donVi();
      for (let j = tt.i + 1; j < ds.length; j++) {
        const r = await thongTin(ds[j]); if (!r) continue;
        if (!r.muc) break;
        if (!ds[j].getClientRects().length && ds[j].id) { location.hash = ds[j].id; await new Promise(z => setTimeout(z, 150)); }   // bộ đọc một-chương: mở chương sau qua neo
        ds[j].scrollIntoView({ behavior: "smooth", block: "start" });
        return veThanh({ ...r, el: ds[j], i: j, ten: (ds[j].querySelector("h2,h3") || {}).textContent || "" });
      }
      dangNghe = false;
    };
    hop.querySelector(".da-dong").onclick = () => { a.pause(); veNut(tt); };
    a.play().catch(() => {});
  }
  async function capNhat() {
    if (dangNghe) return;   // đang nghe thì không đổi theo trang/chương đang xem
    if (AD && AD.chuyen) { const v = AD.hien(); if (v && AD.chuyen[v]) { hop.hidden = false; hienTai = null; return veNut({ chuyen: AD.chuyen[v] }); } }
    const ds = donVi();
    let el = vungDoc(), i = -1;
    if (ds.length) {
      // chương đang xem: bộ đọc chỉ hiện một chương (các chương khác ẩn bằng CSS) → lấy chương đang hiện/đánh dấu hiện tại;
      // trang cuộn dài → chương cuối cùng có đầu đã qua 40% chiều cao màn hình
      const hien = ds.filter(d => d.getClientRects().length && !d.hidden), cur = ds.find(d => d.classList.contains("is-current") && d.getClientRects().length);
      if (cur) el = cur;
      else if (hien.length) { el = hien[0]; const moc = innerHeight * 0.4; hien.forEach(d => { if (d.getBoundingClientRect().top <= moc) el = d; }); }
      else el = ds[0];
      i = ds.indexOf(el);
    }
    const r = await thongTin(el);
    if (!r) { hop.hidden = true; hienTai = null; return; }
    if (hienTai && hienTai.ma === r.ma) return;
    hop.hidden = false;
    hienTai = { ...r, el: ds.length ? el : null, i, ten: ds.length ? ((el.querySelector("h2,h3") || {}).textContent || "").trim() : "" };
    veNut(hienTai);
  }
  let hen = 0;
  const hoan = () => { clearTimeout(hen); hen = setTimeout(capNhat, 300); };
  function batDau() {
    document.body.appendChild(hop); capNhat();
    const g = (AD && document.querySelector(AD.goc)) || document.querySelector("main") || document.body;
    new MutationObserver(ms => { if (ms.every(m => hop.contains(m.target))) return; if (AD) maDV.delete(vungDoc()); hoan(); }).observe(g, { childList: true, subtree: true });
    if (donVi().length) { addEventListener("scroll", hoan, { passive: true }); addEventListener("hashchange", hoan); document.addEventListener("click", () => setTimeout(hoan, 250)); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", batDau); else batDau();
  window.DocAm = { vanBan, ma, capNhat };
})();
