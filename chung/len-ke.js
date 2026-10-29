// Ngày giờ "Lên kệ" và "Cập nhật" cho trang sách và trang lịch sử (anh Cường, 29/10/2026: "để biết lịch sử").
// Dữ liệu: /sach-tinh-hoa/chung/len-ke.json, sinh từ biên bản phát hành bằng chung/len-ke/sinh-len-ke.py (không gõ tay).
// Gắn: <script src="/sach-tinh-hoa/chung/len-ke.js?v=<sha12>" defer></script> cuối trang.
//  - Trang kệ (thẻ article.entry / article.tool): thêm một dòng ngày dưới mỗi cuốn.
//  - Trang danh mục lịch sử (a.h-period-link, a.h-story, nav.hd-doors > a): thêm ngày ngắn trong từng ô.
//  - Mọi trang có dữ liệu: thêm một dòng ở cuối phần nội dung chính.
// Dòng ngày mang data-doc="bo" để nút đọc không đọc nó.
(function () {
  if (typeof document === "undefined" || typeof fetch !== "function" || window.LEN_KE_DA_GAN) return;
  window.LEN_KE_DA_GAN = true;
  const DL = "/sach-tinh-hoa/chung/len-ke.json";
  const khoa = u => { try { let p = decodeURI(new URL(u, location.href).pathname).replace(/^\/+/, ""); if (p === "" || p.endsWith("/")) p += "index.html"; return p; } catch (e) { return ""; } };
  const ngay = s => { const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(s || ""); return m ? `${m[3]}/${m[2]}/${m[1]}` + (m[4] ? ` lúc ${m[4]}:${m[5]}` : "") : ""; };
  const ngayNgan = s => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ""); return m ? `${m[3]}/${m[2]}/${m[1]}` : ""; };
  const lenKe = e => e.l ? ngay(e.l) : `trước ${ngayNgan(e.t)}`;
  const dong = e => `Lên kệ: ${lenKe(e)}` + (e.c ? ` · Cập nhật nội dung: ${ngay(e.c)}` : "");
  const tao = (the, lop, chu) => { const x = document.createElement(the); x.className = lop; x.setAttribute("data-doc", "bo"); x.textContent = chu; return x; };

  const st = document.createElement("style");
  st.textContent = `.len-ke{margin:.55em 0 0;font-size:.82em;line-height:1.45;color:#7a6f5d;opacity:.95}
.len-ke-nho{display:block;font-size:.72em;line-height:1.3;color:#7a6f5d;font-weight:400;margin-top:.15em}
.len-ke-trang{margin:2.2em 0 1em;padding-top:.8em;border-top:1px dashed rgba(122,111,93,.35);font-size:.85em;line-height:1.5;color:#7a6f5d}
@media print{.len-ke,.len-ke-nho{display:none}}`;

  function gan(dl) {
    document.head.appendChild(st);
    const T = dl.trang || {};
    // 1) Trang kệ: dưới mỗi cuốn / mỗi công cụ
    document.querySelectorAll("article.entry, article.tool").forEach(a => {
      if (a.querySelector(".len-ke")) return;
      const l = [...a.querySelectorAll("a[href]")].find(x => !x.getAttribute("href").startsWith("#"));
      const e = l && T[khoa(l.getAttribute("href"))]; if (!e) return;
      const p = tao("p", "len-ke", dong(e)), meta = a.querySelector(".entry-meta");
      if (meta) meta.insertAdjacentElement("afterend", p); else a.appendChild(p);
    });
    // 2) Danh mục Mạch sử Việt: ngày ngắn trong từng ô chặng, thẻ hồ sơ và cửa đọc
    document.querySelectorAll("a.h-period-link, a.h-story, nav.hd-doors > a").forEach(a => {
      if (a.querySelector(".len-ke-nho")) return;
      const e = T[khoa(a.getAttribute("href"))]; if (!e) return;
      a.appendChild(tao("small", "len-ke-nho", e.c ? `cập nhật ${ngayNgan(e.c)}` : `lên kệ ${e.l ? ngayNgan(e.l) : "trước " + ngayNgan(e.t)}`));
    });
    // 3) Cuối nội dung chính của trang đang xem
    const e = T[khoa(location.href)];
    if (e && !document.querySelector(".len-ke-trang")) {
      const p = tao("p", "len-ke-trang", dong(e)), m = document.querySelector("main");
      if (m) m.appendChild(p); else { const f = document.querySelector("footer"); f ? f.insertAdjacentElement("beforebegin", p) : document.body.appendChild(p); }
    }
  }
  const chay = () => fetch(DL, { cache: "no-cache" }).then(r => r.ok ? r.json() : null).then(d => d && gan(d)).catch(() => {});
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", chay); else chay();
})();
