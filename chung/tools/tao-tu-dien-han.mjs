// Sinh từ điển cho lớp nghĩa chữ Hán (chung/han.js): node chung/tools/tao-tu-dien-han.mjs (chạy từ thư mục gốc kho)
// CHỈ lấy âm Hán Việt và nghĩa đã có trong dữ liệu của chính kho, không thêm nghĩa từ nguồn ngoài:
//  - cặp {zh, hv, dich} (Kinh Dịch Thập dực, nguyên tắc, cẩm nang; Sách ngắn; Quán trọ), {trich, dich} (Tử vi), {han, nghia} (Lễ cúng),
//  - Kinh văn Chu Dịch: KD_ZH (lời quẻ, hào, Đại tượng, Dụng) ghép với KD_VI (hv, dich),
//  - tên thuật ngữ {han, ten} (thần sát, cách cục, sao) và tên sách, tên chương,
//  - câu Hán nằm giữa lời văn dạng <span class="zh">…</span> – lời dịch (các chương nghiên cứu, ghi chú công cụ).
// Âm từng chữ: suy từ những cặp có số chữ Hán bằng số âm tiết; chữ nhiều âm lấy âm gặp nhiều nhất, giữ thêm âm khác.
// Ra: chung/han/am.js (window.HAN_AM) và chung/han/<chuyên mục>.js (window.HAN_CAU: [khóa chỉ-chữ-Hán, âm, nghĩa]).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";
import path from "node:path";

const CJK = /[㐀-䶿一-鿿豈-﫿]/;                // bỏ U+4DC0–4DFF: ký hiệu 64 quẻ
const chiHan = s => (s || "").replace(/[^㐀-䶿一-鿿豈-﫿]/g, "");
const sach = s => (s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const amTiet = s => sach(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const laViet = s => typeof s === "string" && s && !CJK.test(s);
const MUC = ["kinh-dich", "sach-ngan", "coi-tam", "le-cung", "xem-ngay", "tu-vi", "phong-thuy"];
const GHI_NGHIA = ["dich", "nghia", "nghiaLa"];          // trường mang lời dịch/nghĩa, theo thứ tự ưu tiên
const GHI_AM = ["hv", "am"];

const amDem = new Map();                                   // chữ → Map(âm → số lần)
const ghiAm = (c, a, w = 1) => c.forEach((ch, i) => { const m = amDem.get(ch) || new Map(); m.set(a[i], (m.get(a[i]) || 0) + w); amDem.set(ch, m); });
const demAm = (zh, hv, w = 1) => {
  const c = [...chiHan(zh)], a = amTiet(hv);
  if (!c.length) return false;
  if (c.length === a.length) { ghiAm(c, a, w); return true; }
  // cả câu lệch số chữ (thường do một vế có chữ lạ, chú thích): thử ghép từng vế, vế nào khớp số chữ thì lấy
  const vz = zh.split(/[，。；：！？、,.;:!?「」『』“”]+/).map(chiHan).filter(Boolean), va = sach(hv).split(/[,.;:!?—–]+/).map(amTiet).filter(x => x.length);
  if (vz.length < 2 || vz.length !== va.length) return false;
  let ok = false; vz.forEach((z, i) => { if ([...z].length === va[i].length) { ghiAm([...z], va[i], w); ok = true; } });
  return ok;
};
// Bảng tên Hán–Việt viết sẵn trong mã (can, chi, 24 sơn, 28 sao, tên sao Tử vi): âm chuẩn của kho, tính trọng số cao
const BANG_MA = [];
function gomBangMa() {
  const doc = f => readFileSync(f, "utf8");
  for (const f of ["chung/can-chi.js", "phong-thuy/phong-thuy.js"]) {
    const t = doc(f);
    for (const m of t.matchAll(/const (\w+)_ZH\s*=\s*"([^"]+)"/g)) {
      const l = t.match(new RegExp(`const ${m[1]}\\d*\\s*=\\s*\\[([^\\]]+)\\]`)); if (!l) continue;   // CAN / CAN_ZH, SON24 / SON_ZH
      const ten = [...l[1].matchAll(/"([^"]+)"/g)].map(x => x[1]), zh = [...m[2]];
      if (ten.length === zh.length) zh.forEach((c, i) => BANG_MA.push([c, ten[i]]));
    }
  }
  for (const m of doc("xem-ngay/xem-ngay.js").matchAll(/\["([^"\]]+)","([一-鿿])",/g)) BANG_MA.push([m[2], m[1]]);
  for (const m of doc("tu-vi/tu-vi.js").matchAll(/"([^"]+)":"([一-鿿]{2,4})"/g)) BANG_MA.push([m[2], m[1]]);
  for (const [z, v] of BANG_MA) demAm(z, v, 5);
  // nghĩa cho chữ đứng riêng trong công cụ, lấy đúng các cột của bảng trong mã (không thêm gì ngoài)
  const cc = {}; cc.window = cc; vm.createContext(cc); vm.runInContext(doc("chung/can-chi.js"), cc);
  const { CAN, CHI, CAN_ZH, CHI_ZH, HANH_CAN, HANH_CHI } = cc;
  [...CAN_ZH].forEach((z, i) => NGHIA_CHUNG.push([z, CAN[i], `Can ${CAN[i]}, thứ ${i + 1} trong 10 thiên can; hành ${HANH_CAN[i]}.`, null]));
  [...CHI_ZH].forEach((z, i) => NGHIA_CHUNG.push([z, CHI[i], `Chi ${CHI[i]}, thứ ${i + 1} trong 12 địa chi; hành ${HANH_CHI[i]}.`, null]));
  for (const m of doc("xem-ngay/xem-ngay.js").matchAll(/\["([^"\]]+)","([一-鿿])","([^"]+)","([^"]+)","([^"]+)"\]/g))
    NGHIA_CHUNG.push([m[2], m[1], `Sao ${m[1]}, một trong 28 sao (nhị thập bát tú); ứng ${m[3]}, ${m[4]}; Ngọc hạp ký xếp ${m[5]}.`, ["xem-ngay"]]);
  const pt = doc("phong-thuy/phong-thuy.js"), s24 = pt.match(/const SON24\s*=\s*\[([^\]]+)\]/), sz = pt.match(/const SON_ZH\s*=\s*"([^"]+)"/);
  if (s24 && sz) { const ten = [...s24[1].matchAll(/"([^"]+)"/g)].map(x => x[1]); [...sz[1]].forEach((z, i) => NGHIA_CHUNG.push([z, ten[i], `Sơn ${ten[i]}, một trong 24 sơn của la bàn (mỗi sơn 15°).`, ["phong-thuy"]])); }
}
const NGHIA_CHUNG = [];   // [chữ, âm, nghĩa, chuyên mục (null = mọi chuyên mục)] — chỉ điền vào mục còn trống
gomBangMa();

function nap(muc) {
  const html = readFileSync(`${muc}/${muc}.html`, "utf8");
  const srcs = [...html.matchAll(/<script src="([^"?]+)/g)].map(m => path.posix.join(muc, m[1])).filter(s => !s.startsWith("chung/"));
  const ctx = { console: { log() {}, warn() {}, error() {} }, setTimeout() {}, clearTimeout() {} };
  ctx.window = ctx; ctx.self = ctx; vm.createContext(ctx);
  const ma = [];
  for (const s of srcs) {
    const t = readFileSync(s, "utf8"); ma.push(t);
    if (!/[\\/]data[\\/]|^[\w-]+\/[\w-]+\.js$/.test(s)) continue;
    try { vm.runInContext(t, ctx, { filename: s }); } catch (e) { /* app.js cần DOM: chỉ lấy chuỗi bên trong ở bước câu xen */ }
  }
  return { ctx, ma: ma.join("\n") };
}

function gom(muc) {
  const { ctx, ma } = nap(muc);
  const cau = new Map();                                    // khóa → [âm, nghĩa]
  const them = (zh, am, nghia) => {
    const k = chiHan(zh); if (!k) return;
    am = sach(am) || ""; nghia = sach(nghia) || "";
    if (am && !demAm(zh, am) && [...k].length === 1) return;  // tên một chữ mà âm không khớp: bỏ
    const cu = cau.get(k);
    if (!cu) cau.set(k, [am, nghia]);
    else { if (!cu[0] && am) cu[0] = am; if (!cu[1] && nghia) cu[1] = nghia; }
  };
  // 1) Kinh văn Chu Dịch
  if (ctx.KD_ZH && ctx.KD_VI) for (const [n, z] of Object.entries(ctx.KD_ZH)) {
    const v = ctx.KD_VI[n]; if (!v) continue;
    if (z.tu && v.tu) them((z.ten || "") + "：" + z.tu, v.tu.hv, v.tu.dich);
    if (z.daiTuong && v.tuong) them(z.daiTuong, v.tuong.hv, v.tuong.dich);
    (z.hao || []).forEach((h, i) => { const x = v.hao && v.hao[i]; if (x) them(h, x.hv, x.dich); });
    if (z.dung && v.dung) them(z.dung, v.dung.hv, v.dung.dich);
    if (z.ten && v.ten) them(z.ten, v.ten, "");
  }
  // 1b) Xem ngày: tên việc (祭祀 → "Cúng tế, giỗ chạp") và thần sát (âm = tên; nghĩa = tốt/xấu + việc nên/kỵ theo chính bảng của kho)
  if (ctx.XN_THAN_SAT) {
    const X = ctx.XN_THAN_SAT, tenViec = Object.fromEntries((X.viec || []).map(v => [v.ma, v.ten]));
    for (const v of X.viec || []) for (const h of [].concat(v.han || [])) them(h, "", v.ten);
    const ds = ma => (ma || []).map(m => tenViec[m]).filter(Boolean);
    for (const t of X.thanSat || []) {
      if (typeof t.han !== "string") continue;
      const nen = ds(t.nen), ky = ds(t.ky), cat = t.loai === "cát";
      let ng = `Thần sát ${cat ? "tốt" : t.loai === "hung" ? "xấu" : t.loai || ""} trong phép chọn ngày.`;
      if (nen.length) ng += ` Nên: ${nen.slice(0, 5).join("; ")}${nen.length > 5 ? "…" : "."}`;
      if (ky.length) ng += ` Kỵ: ${ky.slice(0, 5).join("; ")}${ky.length > 5 ? "…" : "."}`;
      them(t.han, t.ten, ng);
    }
  }
  // 2) Duyệt mọi đối tượng dữ liệu
  const seen = new Set();
  const di = o => {
    if (!o || typeof o !== "object" || seen.has(o)) return; seen.add(o);
    const nghia = GHI_NGHIA.map(k => o[k]).find(laViet) || "";
    for (const kz of ["zh", "trich", "han", "tenHan", "goc"]) {
      const z = o[kz]; if (typeof z !== "string" || !CJK.test(z) || z.length > 600) continue;
      let am = GHI_AM.map(k => o[k]).find(laViet) || "";
      if (!am && (kz === "han" || kz === "tenHan") && laViet(o.ten) && o.ten.length < 60) am = o.ten;
      if (!am && laViet(o.quai) && o.quai.length < 20) am = o.quai;            // Phong thủy: quẻ 坎 → Khảm
      let ng = nghia;
      if (!ng && laViet(o.quai) && laViet(o.huong)) ng = `Quẻ ${o.quai}, hướng ${o.huong}.`;
      if (!ng && kz === "han" && laViet(o.luan)) ng = sach(o.luan).split(/(?<=[.;:])\s/)[0];
      if (!ng && kz === "han" && Array.isArray(o.tomY) && laViet(o.tomY[0])) ng = o.tomY[0];
      them(z, am, ng);
    }
    // tên chương dạng "Chương 1 · 原始 Nguyên thủy — Cái gốc ban đầu"
    for (const v of Object.values(o)) if (typeof v === "string" && v.length < 160) {
      const m = v.match(/([㐀-鿿豈-﫿]{1,8})\s+([^㐀-鿿—–·]{2,40}?)\s+[—–]\s+([^㐀-鿿]{2,80})$/);
      if (m) them(m[1], m[2], m[3]);
    }
    for (const [k, v] of Object.entries(o)) {
      if (k === "TV_LUAN" || (v && typeof v === "object" && !Array.isArray(v) && typeof v.han === "string" && laViet(k) && !v.ten)) {
        if (typeof v.han === "string") them(v.han, k, Array.isArray(v.tomY) ? v.tomY[0] : "");
      }
      di(v);
    }
  };
  for (const g of Object.keys(ctx)) if (!["window", "self", "console"].includes(g)) di(ctx[g]);
  // 3) Câu Hán xen giữa lời văn: <span class="zh">X</span> – dịch  (trong dữ liệu và trong mã giao diện)
  const chuoi = [ma];
  const gomChuoi = o => { if (typeof o === "string") { if (o.includes('class="zh"')) chuoi.push(o); } else if (o && typeof o === "object") for (const v of Object.values(o)) gomChuoi(v); };
  for (const g of Object.keys(ctx)) if (!["window", "self", "console"].includes(g)) gomChuoi(ctx[g]);
  for (const t of chuoi) for (const m of t.matchAll(/<span class="zh">([^<]+)<\/span>\s*(?:<\/i>)?\s*[–—-]\s*([^<\[]{3,240}?)(?=\s*\[|\.\s|;\s|<|$)/g)) them(m[1], "", m[2]);
  // lời dịch đứng trước, câu Hán trong ngoặc: "…nhỏ như một hạt thóc giữa biển xanh (<span class="zh">…</span>)"
  for (const t of chuoi) for (const m of t.matchAll(/([^<>()]{6,400})\(\s*<span class="zh">([^<]+)<\/span>\s*\)/g)) {
    const truoc = sach(m[1]).split(/[.!?:;]\s+/).pop().replace(/^[,\s]+|[,\s]+$/g, "");
    if (truoc.length >= 6 && !CJK.test(truoc)) them(m[2], "", truoc.length > 200 ? "…" + truoc.slice(-200) : truoc);
  }
  // chỉ điền chỗ trống (quẻ 坎 ở Phong thủy vẫn là "Quẻ Khảm"); nghĩa riêng của chuyên mục (24 sơn, 28 sao) đi trước nghĩa chung (can, chi)
  for (const [z, a, n, ds] of NGHIA_CHUNG) if (ds && ds.includes(muc)) them(z, a, n);
  for (const [z, a, n, ds] of NGHIA_CHUNG) if (!ds) them(z, a, n);
  return cau;
}

const out = {}; let tong = 0;
for (const m of MUC) { out[m] = gom(m); tong += out[m].size; }
// âm từng chữ
const am = {};
for (const [ch, m] of amDem) { const xs = [...m].sort((a, b) => b[1] - a[1]); am[ch] = xs.slice(0, 3).map(x => x[0]).join("/"); }
// điền âm cho câu chưa có âm (từ âm từng chữ) — để bong bóng luôn có dòng âm
const amCau = k => { const c = [...k], biet = c.filter(x => am[x]).length; return biet / c.length >= 0.7 ? c.map(x => (am[x] || x).split("/")[0]).join(" ") : ""; };   // thiếu âm quá 30% số chữ: bỏ dòng âm
mkdirSync("chung/han", { recursive: true });
const ghi = (f, s) => writeFileSync(f, s, "utf8");
const dau = "// Sinh bởi chung/tools/tao-tu-dien-han.mjs từ dữ liệu của kho. Không sửa tay.\n";
ghi("chung/han/am.js", dau + "window.HAN_AM=" + JSON.stringify(am) + ";\n");
const thongKe = [];
for (const m of MUC) {
  const rows = [...out[m]].map(([k, [a, n]]) => [k, a || amCau(k), n]).sort((x, y) => x[0].length - y[0].length || (x[0] < y[0] ? -1 : 1));
  ghi(`chung/han/${m}.js`, dau + "window.HAN_CAU=" + JSON.stringify(rows) + ";\n");
  thongKe.push(`${m}: ${rows.length} mục (${rows.filter(r => r[2]).length} có nghĩa)`);
}
// phiên bản: băm các file từ điển, ghi vào han.js để ?v= của han.js đổi khi từ điển đổi
const h = createHash("sha256"); for (const f of ["am", ...MUC]) h.update(readFileSync(`chung/han/${f}.js`));
const pb = h.digest("hex").slice(0, 12);
const hj = readFileSync("chung/han.js", "utf8").replace(/const PHIEN_BAN = "[0-9a-f]*";/, `const PHIEN_BAN = "${pb}";`);
writeFileSync("chung/han.js", hj, "utf8");
console.log(`Âm từng chữ: ${Object.keys(am).length} chữ · ` + thongKe.join(" · ") + ` · phiên bản ${pb}`);
