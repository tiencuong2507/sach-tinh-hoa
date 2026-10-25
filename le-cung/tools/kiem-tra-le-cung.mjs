// Kiểm cẩm nang Lễ cúng: node tools/kiem-tra-le-cung.mjs   (chạy trong thư mục le-cung/ hoặc bất kỳ đâu)
// 1. Nạp le-cung.html bằng vm theo đúng thứ tự <script src> (lõi chung + data + app.js) với DOM giả lập.
// 2. Mọi trích Phan Kế Bính (tucLe[].t, diBan có trich) phải là chuỗi con liên tục của file nguon/vnpt-*.txt sau chuẩn hoá
//    (bỏ khoảng trắng, dấu câu, giữ chữ và số); mọi câu Hán (khung, bienThe) phải có trong nguon/zh-gia-le-q05.txt (chỉ so chữ Hán).
// 3. Mỗi lễ đủ trường; bài khấn 120–220 chữ, đủ 6 phần theo từ khoá, có chỗ trống [tên] [địa chỉ] [ngày], nêu đúng đối tượng.
// 4. Lịch 2026: ông Công ông Táo 10/2, Tết 17/2, rằm tháng Giêng 3/3 — tự tính lại bằng LichAm rồi đối chiếu với app.
// 5. Giao diện giả lập: mục lục, 30 trang lễ, lịch, nguồn không có undefined/NaN; điền bài khấn, tính ngày tang chạy đúng.
// 6. Red-team: làm hỏng một bản sao dữ liệu (trích bịa, bài khấn 60 chữ, thiếu phần) — bộ kiểm phải bắt được, nếu không thì chính bộ kiểm lỗi.
// Thoát mã 1 khi có lỗi.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const loi = [], ok = (c, m) => { if (!c) loi.push(m); };

// ---- Chuẩn hoá ----
const chuanViet = s => String(s).normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");
const chuanHan = s => (String(s).match(/\p{Script=Han}/gu) || []).join("");
const NGUON = join(ROOT, "nguon");
ok(existsSync(NGUON), "thiếu thư mục nguon/ (chạy node tools/tai-nguon.mjs)");
const kho = existsSync(NGUON) ? readdirSync(NGUON).filter(f => f.endsWith(".txt")).map(f => {
  const raw = readFileSync(join(NGUON, f), "utf8").split("\n").slice(1).join("\n");
  return { f: f.replace(/\.txt$/, ""), viet: chuanViet(raw), han: chuanHan(raw) };
}) : [];
ok(kho.length >= 19, `nguon/ chỉ có ${kho.length} file, cần 19 (18 mục Việt Nam phong tục + Gia lễ quyển 5)`);

// ---- DOM giả lập + nạp như trình duyệt ----
const els = {};
const mk = id => els[id] || (els[id] = { id, innerHTML: "", innerText: "", value: "", checked: false, dataset: {}, onclick: null,
  classList: { _: new Set(), toggle(c, v) { v ? this._.add(c) : this._.delete(c); }, contains(c) { return this._.has(c); } } });
// querySelector trả null như trình duyệt thật nếu id chưa được dựng trong innerHTML của section nào (bắt lỗi "reading 'value' of null")
const SEC = ["muc-luc", "le", "lich", "nguon"];
const qs = s => { const id = s.replace(/^#/, ""); if (SEC.includes(id) || SEC.some(x => els[x] && els[x].innerHTML.includes(`id="${id}"`))) return mk(id); return null; };
const ctx = {
  console, document: { querySelector: qs, querySelectorAll: () => [] },
  localStorage: { _: {}, getItem(k) { return this._[k] ?? null; }, setItem(k, v) { this._[k] = String(v); } },
  navigator: {}, alert() {}, scrollTo() {}, history: { replaceState() {} }, Date, Math, Object, Array, String, Number, RegExp, JSON, Set, Map
};
ctx.window = ctx; vm.createContext(ctx);
const html = readFileSync(join(ROOT, "le-cung.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
ok(scripts.length === 8 && scripts[7] === "../chung/han.js", `le-cung.html phải nạp 7 script + ../chung/han.js (lớp nghĩa chữ Hán) cuối trang, thấy ${scripts.length}: ${scripts.join(", ")}`);
for (const s of scripts) vm.runInContext(readFileSync(join(ROOT, s), "utf8"), ctx, { filename: s });
const run = s => vm.runInContext(s, ctx);
const { LC_LE: D, LichAm } = ctx;
ok(D && Array.isArray(D.le) && D.le.length, "không nạp được LC_LE");

// ---- Bộ kiểm dữ liệu (dùng lại cho red-team) ----
const demChu = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const LOAI_TD = ["am", "tiet", "hang-thang", "sau-sinh", "sau-mat", "gio", "tuy"];
function kiemDuLieu(data, baoLoi) {
  const e = [], o = (c, m) => { if (!c) e.push(m); };
  const nhom = new Set(data.nhom.map(n => n.ma)), ma = new Set();
  o(data.le.length >= 24 && data.le.length <= 30, `số lễ ${data.le.length}, cần 24–30`);
  for (const l of data.le) {
    const nh = `[${l.ma}]`;
    o(l.ma && !ma.has(l.ma), `${nh} mã trùng hoặc thiếu`); ma.add(l.ma);
    o(l.ten && nhom.has(l.nhom), `${nh} thiếu tên hoặc nhóm sai`);
    o(l.thoiDiem && LOAI_TD.includes(l.thoiDiem.loai), `${nh} thoiDiem.loai sai`);
    if (l.thoiDiem?.loai === "am") o(l.thoiDiem.ngay >= 1 && l.thoiDiem.ngay <= 30 && l.thoiDiem.thang >= 1 && l.thoiDiem.thang <= 12, `${nh} ngày âm sai`);
    o(typeof l.yNghia === "string" && (l.yNghia.match(/[.!?](\s|$)/g) || []).length >= 2 && demChu(l.yNghia) <= 80, `${nh} yNghia cần 2–3 câu, ≤ 80 chữ (${demChu(l.yNghia)} chữ)`);
    o(Array.isArray(l.tucLe) && (l.tucLe.length || l.ghiTucLe), `${nh} tucLe trống mà không ghi 'Phan Kế Bính không chép'`);
    for (const [j, t] of (l.tucLe || []).entries()) {
      o(t.t && t.m && t.f, `${nh} trích ${j + 1} thiếu t/m/f`);
      const file = kho.find(k => k.f === t.f);
      o(file, `${nh} trích ${j + 1}: không có file nguon/${t.f}.txt`);
      if (file) o(file.viet.includes(chuanViet(t.t)), `${nh} trích ${j + 1} không dò được trong ${t.f}: "${String(t.t).slice(0, 50)}…"`);
    }
    o(Array.isArray(l.leVat) && l.leVat.length >= 2 && l.leVat.some(x => /tùy nhà|tùy vùng|tùy sức/i.test(x)) || /tùy nhà|tùy vùng/i.test(JSON.stringify(l.leVat)), `${nh} leVat cần ≥ 2 mục và nêu 'tùy nhà, tùy vùng'`);
    o(Array.isArray(l.trinhTu) && l.trinhTu.length >= 4 && l.trinhTu.length <= 8, `${nh} trinhTu cần 4–8 bước (${(l.trinhTu || []).length})`);
    const k = String(l.vanKhan || ""), n = demChu(k);
    o(n >= 120 && n <= 220, `${nh} bài khấn ${n} chữ, cần 120–220`);
    o(/\[tên\]/.test(k) && /\[địa chỉ\]/.test(k) && /\[ngày\]/.test(k), `${nh} bài khấn thiếu chỗ trống [tên] [địa chỉ] [ngày]`);
    const kl = k.toLowerCase();
    o(/ngày|tháng|năm/.test(kl), `${nh} bài khấn thiếu phần 1 (thời gian)`);
    o(/con là/.test(kl), `${nh} bài khấn thiếu phần 2 (xưng danh 'con là')`);
    o(/kính cáo|kính lạy/.test(kl), `${nh} bài khấn thiếu phần 3 ('kính cáo' / 'kính lạy')`);
    o(l.doiTuong && kl.includes(String(l.doiTuong).toLowerCase()), `${nh} bài khấn thiếu phần 4 (đối tượng '${l.doiTuong}')`);
    o(/lễ vật|sửa biện/.test(kl), `${nh} bài khấn thiếu phần 5 ('lễ vật' / 'sửa biện')`);
    o(/cúi xin|kính mong/.test(kl), `${nh} bài khấn thiếu phần 6 ('cúi xin' / 'kính mong')`);
    o(Array.isArray(l.phapLy) && l.phapLy.every(p => data.vanBan[p.vb] && p.y), `${nh} phapLy dẫn văn bản không có trong vanBan`);
    o(Array.isArray(l.diBan) && l.diBan.length && l.diBan.every(b => b.nd && b.nguon), `${nh} diBan cần ≥ 1 mục có nd + nguon ('chưa có nguồn' nếu không có)`);
    for (const b of (l.diBan || []).filter(b => b.trich)) { const file = kho.find(x => x.f === b.f); o(file && file.viet.includes(chuanViet(b.nd)), `${nh} dị bản trích không dò được: "${b.nd.slice(0, 40)}…"`); }
    o(l.viec === "" || (typeof l.viec === "string" && /^[a-z-]+$/.test(l.viec)), `${nh} mã việc xem ngày sai`);
  }
  const zh = kho.find(k => k.f === "zh-gia-le-q05");
  o(zh, "thiếu nguon/zh-gia-le-q05.txt");
  if (zh) for (const h of [...data.khung.map(k => k.han), ...data.bienThe.map(b => b.han)]) o(zh.han.includes(chuanHan(h)), `câu Hán không dò được trong Gia lễ quyển 5: ${h}`);
  o(data.khung.length === 6, "khung phải đủ 6 phần");
  if (baoLoi) loi.push(...e);
  return e;
}
kiemDuLieu(D, true);

// ---- Mã việc phải có trong xem-ngay/data/than-sat.js (chỉ đọc, không sửa) ----
{ const f = join(ROOT, "..", "xem-ngay", "data", "than-sat.js");
  if (existsSync(f)) { const c2 = { window: {} }; c2.window = c2; vm.createContext(c2); vm.runInContext(readFileSync(f, "utf8"), c2);
    const ma = new Set((c2.XN_THAN_SAT?.viec || []).map(v => v.ma));
    for (const l of D.le) if (l.viec) ok(ma.has(l.viec), `[${l.ma}] mã việc '${l.viec}' không có trong xem-ngay/data/than-sat.js`); }
  else loi.push("không thấy xem-ngay/data/than-sat.js để đối chiếu mã việc"); }

// ---- Lịch 2026: tự tính bằng lõi, đối chiếu với app ----
function timAm(nam, ngay, thang) { const r = []; for (let d = new Date(nam, 0, 1); d.getFullYear() === nam; d.setDate(d.getDate() + 1)) { const a = LichAm.solar2lunar(d.getDate(), d.getMonth() + 1, nam); if (a.ngay === ngay && a.thang === thang && !a.nhuan) r.push(`${d.getDate()}/${d.getMonth() + 1}/${nam}`); } return r; }
const MOC = [["ong-cong-ong-tao", 23, 12, "10/2/2026"], ["mung-1-tet", 1, 1, "17/2/2026"], ["ram-thang-gieng", 15, 1, "3/3/2026"], ["doan-ngo", 5, 5, null], ["vu-lan", 15, 7, null]];
for (const [ma, ng, th, mong] of MOC) {
  const le = D.le.find(l => l.ma === ma); ok(le && le.thoiDiem.ngay === ng && le.thoiDiem.thang === th, `[${ma}] thời điểm phải là ${ng}/${th} âm`);
  const tu = timAm(2026, ng, th), app = run(`ngayLe(LC_LE.le.find(l => l.ma === "${ma}"), 2026).map(dmy)`);
  ok(tu.length === 1 && JSON.stringify(tu) === JSON.stringify(app), `[${ma}] lõi tính ${tu} nhưng app ra ${app}`);
  if (mong) ok(tu[0] === mong, `[${ma}] 2026 phải là ${mong}, lõi ra ${tu}`);
}
{ const tm = run(`ngayLe(LC_LE.le.find(l => l.ma === "thanh-minh"), 2026).map(dmy)`), tm25 = run(`ngayLe(LC_LE.le.find(l => l.ma === "thanh-minh"), 2025).map(dmy)`);
  ok(tm[0] === "5/4/2026" && tm25[0] === "4/4/2025", `Thanh minh 2026 phải 5/4 (ra ${tm}), 2025 phải 4/4 (ra ${tm25})`); }
// Giỗ: mất 1/1/2026 (13/11 Ất Tỵ) → giỗ đầu là 13/11 Bính Ngọ; tự tính lại bằng lõi
{ const g = run(`ngayGio(new Date(2026, 0, 1), 1)`); const am = LichAm.solar2lunar(1, 1, 2026);
  ok(am.ngay === 13 && am.thang === 11 && am.nam === 2025, "1/1/2026 phải là 13/11 Ất Tỵ theo lõi");
  let tu = null; for (let d = new Date(2026, 6, 1); d.getFullYear() <= 2027 && !tu; d.setDate(d.getDate() + 1)) { const a = LichAm.solar2lunar(d.getDate(), d.getMonth() + 1, d.getFullYear()); if (a.ngay === 13 && a.thang === 11 && a.nam === 2026 && !a.nhuan) tu = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; }
  ok(g && run("dmy")(g.ngay) === tu && !g.lui, `giỗ đầu của 1/1/2026: app ${g && run("dmy")(g.ngay)}, lõi ${tu}`); }

// ---- Giao diện giả lập ----
const xau = h => /undefined|NaN|\[object/.test(h);
run("go('muc-luc')"); const toc = els["muc-luc"].innerHTML;
ok(!xau(toc), "mục lục có undefined/NaN");
for (const l of D.le) ok(toc.includes(`go('le/${l.ma}')`), `mục lục thiếu lễ ${l.ma}`);
for (const n of D.nhom) ok(toc.includes(n.ten), `mục lục thiếu nhóm ${n.ten}`);
for (const l of D.le) {
  run(`go('le/${l.ma}')`); const h = els.le.innerHTML;
  ok(!xau(h), `[${l.ma}] trang lễ có undefined/NaN`);
  ok(h.includes(l.ten) && h.includes("Bài khấn") && h.includes("Khung pháp lý") && h.includes("Dị bản"), `[${l.ma}] trang thiếu phần`);
  for (const t of l.tucLe) ok(h.includes(String(t.t).slice(0, 30).replace(/"/g, "&quot;")), `[${l.ma}] trang thiếu trích "${t.t.slice(0, 30)}"`);
  ok(h.includes(`xem-ngay.html?viec=${l.viec}`) === !!l.viec, `[${l.ma}] nút chọn ngày tốt ${l.viec ? "thiếu" : "thừa"}`);
  ok(els.le.classList.contains("hidden") === false && els["muc-luc"].classList.contains("hidden"), `[${l.ma}] ẩn hiện section sai`);
}
// Điền bài khấn ông Công ông Táo: 10/2/2026 → "23 tháng Chạp năm Ất Tỵ"; tên, địa chỉ thay đúng; không còn [tên] [địa chỉ] [ngày]
run("go('le/ong-cong-ong-tao'); $('#f-ten').value='Nguyễn Văn An'; $('#f-ho').value='Nguyễn'; $('#f-dc').value='Hà Nội'; $('#f-ngay').value='2026-02-10'; dienKhan()");
{ const k = els["khan-out"].innerHTML;
  ok(k.includes("23 tháng Chạp năm Ất Tỵ") && k.includes("10/2/2026"), "điền ngày sai: " + k.slice(0, 120));
  ok(k.includes("Nguyễn Văn An") && k.includes("Hà Nội") && !/\[tên\]|\[địa chỉ\]|\[ngày\]/.test(k), "điền tên/địa chỉ chưa thay hết");
  ok(ctx.localStorage.getItem("lc_ten") === "Nguyễn Văn An", "không nhớ tên người khấn"); }
run("go('le/giao-thua'); $('#f-ngay').value='2026-02-16'; dienKhan()"); ok(els["khan-out"].innerHTML.includes("năm Bính Ngọ") && !/\[năm mới\]/.test(els["khan-out"].innerHTML), "giao thừa phải điền năm mới Bính Ngọ");
run("go('le/gio-thuong'); $('#f-nguoi').value='cụ ông Nguyễn Văn Bình'; dienKhan()"); ok(els["khan-out"].innerHTML.includes("cụ ông Nguyễn Văn Bình"), "điền người đã khuất");
// Tính ngày tang từ 1/1/2026: 49 ngày = 18/2/2026 (ngày mất là ngày 1) và 19/2/2026 (+49); 100 ngày = 10/4 và 11/4
run("go('le/49-ngay'); $('#f-mat').value='2026-01-01'; tinhTang()");
{ const h = els["tang-out"].innerHTML; ok(!xau(h) && h.includes("18/2/2026") && h.includes("19/2/2026") && h.includes("10/4/2026") && h.includes("11/4/2026") && h.includes("Giỗ đầu"), "bảng ngày tang sai: " + h.replace(/<[^>]+>/g, " ").slice(0, 300)); }
run("go('le/day-thang-thoi-noi'); $('#f-sinh').value='2026-03-01'; tinhSinh()"); ok(!xau(els["sinh-out"].innerHTML) && els["sinh-out"].innerHTML.includes("1/4/2026"), "tính đầy tháng");
// Lịch 2026 và lịch năm hiện tại
run("go('lich'); $('#f-nam').value='2026'; trangLich()");
{ const h = els.lich.innerHTML; ok(!xau(h), "lịch có undefined/NaN");
  for (const [, , , mong] of MOC.filter(m => m[3])) ok(h.includes(`<td>${mong}</td>`), `lịch 2026 thiếu ${mong}`);
  ok(h.includes("5/4/2026") && h.includes("Mùng 1 các tháng: 1/1: 17/2"), "lịch 2026 thiếu Thanh minh hoặc mùng 1 hằng tháng");
  const soDong = (h.match(/<tr[ >]/g) || []).length - 1; ok(soDong >= 14, `lịch 2026 chỉ ${soDong} dòng`); }
run("go('lich'); $('#f-nam').value=''; trangLich()"); ok(!xau(els.lich.innerHTML) && els.lich.innerHTML.includes(`năm ${new Date().getFullYear()}`), "lịch năm hiện tại");
run("go('nguon')"); { const h = els.nguon.innerHTML; ok(!xau(h) && h.includes("Thọ Mai gia lễ") && h.includes("chuẩn nhất") && h.includes("bản soạn") && h.includes("維年嵗月朔日子"), "trang nguồn thiếu nội dung giới hạn hoặc khung Hán"); }
ok(!/chuẩn nhất[^"]/.test(JSON.stringify(D.le).replace(/không dùng chữ .chuẩn nhất./g, "")), "dữ liệu lễ dùng chữ 'chuẩn nhất'");
run("go('khong-co')"); ok(!els["muc-luc"].classList.contains("hidden"), "đường dẫn lạ phải về mục lục");

// ---- Red-team: bộ kiểm phải bắt được dữ liệu hỏng ----
{ const hong = JSON.parse(JSON.stringify(D));
  hong.le[0].tucLe.push({ t: "Câu này Phan Kế Bính không hề viết trong sách.", m: "bịa", f: "vnpt-i12-tu-thoi-tiet-lap" });
  hong.le[1].vanKhan = "Con là [tên] ở [địa chỉ] ngày [ngày] kính cáo gia tiên lễ vật cúi xin.";   // 15 chữ
  hong.le[2].vanKhan = hong.le[2].vanKhan.replace(/kính (cáo|lạy)/gi, "thưa");                      // thiếu phần 3
  hong.le[3].trinhTu = ["một", "hai"];
  hong.le[4].phapLy = [{ vb: "999", y: "văn bản bịa" }];
  hong.khung[0].han = "維年嵗月朔日子孝元孫某官某敢昭告於天地鬼神";                                       // Hán bịa
  const e = kiemDuLieu(hong, false);
  const bat = ["không dò được", "cần 120–220", "thiếu phần 3", "trinhTu cần 4–8", "không có trong vanBan", "câu Hán không dò được"].map(k => e.some(x => x.includes(k)));
  ok(bat.every(Boolean), "red-team: bộ kiểm bỏ lọt " + bat.map((b, i) => b ? null : i + 1).filter(Boolean).join(",") + " — lỗi thấy: " + e.length); }

// ---- Báo cáo ----
const coTrich = D.le.filter(l => l.tucLe.length && !l.ghiTucLe).length, gianTiep = D.le.filter(l => l.ghiTucLe).length;
const tongTrich = D.le.reduce((s, l) => s + l.tucLe.length + l.diBan.filter(b => b.trich).length, 0), tongHan = D.khung.length + D.bienThe.length;
const trichLoi = loi.filter(x => /không dò được/.test(x)).length;
console.log(`Lễ cúng: ${loi.length ? "LỖI " + loi.length : "đạt"} — ${D.le.length} lễ (${D.nhom.map(n => `${n.ten} ${D.le.filter(l => l.nhom === n.ma).length}`).join(", ")}); ${coTrich} lễ có trích Phan Kế Bính trực tiếp, ${gianTiep} lễ ông không chép / chỉ chép gián tiếp [I]; trích dò được trong nguon/: ${tongTrich + tongHan - trichLoi}/${tongTrich + tongHan} (${tongTrich} Việt + ${tongHan} Hán); ${loi.length ? "xem lỗi dưới" : "lịch 2026 khớp lõi; giao diện sạch; red-team bắt được 6/6 lỗi cài"}.`);
if (loi.length) { console.log("  " + loi.join("\n  ")); process.exit(1); }
