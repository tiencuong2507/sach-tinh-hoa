// Kiểm phần luận giải: node tools/kiem-tra-luan.mjs (chạy trong thư mục tu-vi). Lỗi → exit 1.
// 1) Mọi nguyenVan trong data/luan-sao.js và data/cach-cuc.js phải dò được trong nguon/toan-thu-q*.txt (bỏ khoảng trắng, dấu câu, markup).
// 2) Mỗi chính tinh có đủ 12 nhóm cung. 3) Cách cục: 400 lá số, mỗi điều kiện ít nhất 1 ca (0 ca → cảnh báo), không ném lỗi.
// 4) luanLaSo trên 400 lá số không có undefined/NaN. 5) Giao diện giả lập dựng được thẻ Luận giải, ô giờ 13 khung. 6) Red-team: sửa một chữ nguyên văn → tool bắt.
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";
const errs = [], ok = (c, m) => { if (!c) errs.push(m); }, canhBao = [];
const html = readFileSync("tu-vi.html", "utf8"), srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
ok(srcs.includes("data/luan-sao.js") && srcs.includes("data/cach-cuc.js") && srcs.includes("luan.js") && srcs.indexOf("luan.js") < srcs.indexOf("app.js"), "tu-vi.html phải nạp luan-sao, cach-cuc, luan.js trước app.js: " + srcs.join(", "));
function taoCtx() {
  const els = {}, kho = {};
  const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: true, dataset: { t: id }, classList: { toggle() {}, contains() { return false; } }, onclick: null, onchange: null });
  const ctx = { console, document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: s => s === "nav button" ? [mk("navLaso"), mk("navCach")] : [], body: { classList: { toggle() {} } } },
    localStorage: { getItem: k => (k in kho ? kho[k] : null), setItem: (k, v) => { kho[k] = String(v); }, removeItem: k => { delete kho[k]; } }, print() {} };
  ctx.window = ctx; vm.createContext(ctx); return { ctx, els };
}
const { ctx, els } = taoCtx();
for (const f of srcs) vm.runInContext(readFileSync(f, "utf8"), ctx, { filename: f });
const { TuVi: T, TuViLuan: LU, TV_LUAN, TV_CACH_CUC, CHI } = ctx, run = s => vm.runInContext(s, ctx);

// ---------- 1. nguyên văn
const chuanHoa = s => s.replace(/\{\{[^}]*\}\}/g, "").replace(/<[^>]+>/g, "").replace(/[\s，。；：！？、○、「」『』（）()《》,.;:!?\-—…]/g, "");
const nguon = readdirSync("nguon").filter(f => /^toan-thu-q\d\.txt$/.test(f)).map(f => chuanHoa(readFileSync("nguon/" + f, "utf8"))).join("\n");
ok(nguon.length > 50000, "nguon/toan-thu-q*.txt thiếu hoặc quá ngắn");
let soCau = 0, soSaoCoNV = 0;
function doCau(trich, nhan) { soCau++; const c = chuanHoa(trich); ok(c.length >= 4 && nguon.includes(c), `không dò được trong nguyên văn: ${nhan}: ${trich}`); return nguon.includes(c); }
for (const [ten, d] of Object.entries(TV_LUAN.sao)) {
  ok(Array.isArray(d.nguyenVan) && d.nguyenVan.length >= 1, `${ten} thiếu nguyenVan`); if (d.nguyenVan.length) soSaoCoNV++;
  for (const nv of d.nguyenVan) { doCau(nv.trich, ten); ok(nv.amHV && nv.dich && nv.nguon, `${ten}: nguyenVan thiếu amHV/dich/nguon`); }
  ok(d.tomY && d.tomY.length >= 2 && d.tomY.length <= 5, `${ten}: tomY phải 2–5 câu`);
  ok(d.theoDoSang && d.theoDoSang.tot && d.theoDoSang.xau, `${ten}: thiếu theoDoSang`);
  if (d.theoDoSang.trich) doCau(d.theoDoSang.trich, ten + " theoDoSang");
}
for (const t of T.CHINH_TINH) { const d = TV_LUAN.sao[t]; ok(d, "thiếu luận " + t); if (!d) continue;
  for (const k of Object.keys(TV_LUAN.TEN_NHOM)) ok(d.theoCung[k] && d.theoCung[k].length > 10, `${t} thiếu nhóm cung ${k}`); }
for (const t of ["Lộc Tồn", "Kình Dương", "Đà La", "Văn Xương", "Văn Khúc", "Tả Phụ", "Hữu Bật", "Thiên Khôi", "Thiên Việt", "Hỏa Tinh", "Linh Tinh", "Địa Không", "Địa Kiếp", "Thiên Mã", "Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ", "Tuần", "Triệt"]) ok(TV_LUAN.sao[t] && TV_LUAN.sao[t].theoCung.chung, "thiếu luận / theoCung.chung cho " + t);
let ccCoNguon = 0, ccKhongNguon = 0;
for (const c of TV_CACH_CUC.cach) { ok(c.ma && c.ten && c.han && typeof c.dieuKien === "function" && c.luan && c.luan.length > 40, "cách cục thiếu trường: " + (c.ma || c.ten));
  ok(c.nguyenVan && c.nguyenVan.length >= 1, "cách cục không có nguyên văn: " + c.ten);
  let co = 0; for (const nv of (c.nguyenVan || [])) { if (doCau(nv.trich, c.ten)) co++; ok(nv.dich && nv.nguon, `${c.ten}: nguyenVan thiếu dich/nguon`); }
  if (c.nhan === "[I]") ccKhongNguon++; else ccCoNguon++; }
ok(TV_CACH_CUC.cach.length >= 25, "phải có ≥ 25 cách cục, có " + TV_CACH_CUC.cach.length);
// ---------- 3–4. 400 lá số: cách cục khớp ít nhất 1 ca, luận không undefined
let seed = 20261024; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const dem = Object.fromEntries(TV_CACH_CUC.cach.map(c => [c.ma, 0])); let loi = 0, loiLuan = 0, viDu = {};
T.datProfile("viet");
for (let i = 0; i < 400; i++) {
  const y = 1950 + Math.floor(rnd() * 81), m = 1 + Math.floor(rnd() * 12), d = 1 + Math.floor(rnd() * 28), gio = (i % 12) * 2, gioiTinh = i % 2 ? "nu" : "nam";
  let ls; try { ls = T.laSo({ duong: { ngay: d, thang: m, nam: y, gio }, gioiTinh }); } catch (e) { loi++; continue; }
  let cc; try { cc = LU.cachCuc(ls); } catch (e) { loi++; errs.push("cachCuc ném lỗi: " + e.message); continue; }
  for (const c of cc) { dem[c.ma]++; if (!viDu[c.ma]) viDu[c.ma] = `${d}/${m}/${y} ${gio}h ${gioiTinh}`; }
  const H = LU.tienIch(ls); for (const c of TV_CACH_CUC.cach) { try { c.dieuKien(ls, H); } catch (e) { errs.push(`điều kiện ${c.ma} ném lỗi: ${e.message}`); } }
  try { const h = LU.luanLaSo(ls, T.luuNien(ls, 2026)); if (/undefined|NaN|\[object/.test(h)) { loiLuan++; if (loiLuan <= 3) errs.push(`luanLaSo có undefined/NaN: ${d}/${m}/${y} ${gio}h: ` + (h.match(/.{0,60}(undefined|NaN|\[object).{0,40}/) || [""])[0]); } } catch (e) { loiLuan++; errs.push("luanLaSo ném lỗi: " + e.message); }
}
ok(loi === 0 && loiLuan === 0, `lập/luận lỗi: ${loi}/${loiLuan}`);
console.log("Cách cục khớp trong 400 lá số (seed cố định):");
for (const c of TV_CACH_CUC.cach) { const n = dem[c.ma]; console.log(`  ${String(n).padStart(3)}  ${c.ten} ${c.han} ${c.nhan}${n ? "  vd " + viDu[c.ma] : ""}`); if (n === 0) canhBao.push(`cách cục "${c.ten}" không khớp ca nào trong 400 lá số${c.ghiChu ? " — " + c.ghiChu : ""}`); }
// ---------- 5. giao diện giả lập
run(`$('#loaiLich').value='duong';$('#ngay').value='16';$('#thang').value='8';$('#nam').value='2000';$('#gio').value='3';$('#gioiTinh').value='nu';$('#profile').value='viet';$('#namXem').value='2026';lapLaSo()`);
ok(/Luận giải/.test(els.luan.innerHTML) && /Tổng quan/.test(els.luan.innerHTML) && /Mười hai cung/.test(els.luan.innerHTML) && /Cách đọc lá số/.test(els.luan.innerHTML) && !/undefined|NaN/.test(els.luan.innerHTML), "thẻ Luận giải không dựng được");
ok((els.gio.innerHTML.match(/<option/g) || []).length === 13 && /value="23"/.test(els.gio.innerHTML) && /Tý khuya/.test(els.gio.innerHTML), "ô giờ phải có 13 khung địa chi");
run(`$('#gio').value='23';$('#ngay').value='31';$('#thang').value='12';$('#nam').value='1999';lapLaSo()`);
ok(/1\/1\/2000 dương/.test(els.kq.innerHTML) && /đã tính sang ngày sau/.test(els.kq.innerHTML), "giá trị 23 phải sang ngày sau khi gioTySangNgaySau=true");
ok(run("quyKhungGio(12)") === 11 && run("quyKhungGio(23)") === 23 && run("quyKhungGio(0)") === 0 && run("quyKhungGio(14)") === 13 && run("quyKhungGio(1)") === 1, "quyKhungGio quy giờ đồng hồ về khung sai");
// ---------- 6. red-team: sửa một chữ trong nguyên văn → phải bị bắt
{ const c = TV_LUAN.sao["Tử Vi"].nguyenVan[0].trich, sai = c.replace("紫微", "紫徵"); ok(!nguon.includes(chuanHoa(sai)) && nguon.includes(chuanHoa(c)), "red-team: câu sửa một chữ vẫn dò được (bộ dò quá lỏng)");
  const c2 = TV_CACH_CUC.cach[0].nguyenVan[0].trich, sai2 = c2.slice(0, -1) + "人"; ok(!nguon.includes(chuanHoa(sai2)), "red-team cách cục: câu sửa chữ cuối vẫn dò được"); }

console.log(`\nSao có nguyên văn: ${soSaoCoNV}/${Object.keys(TV_LUAN.sao).length}; câu trích đã dò: ${soCau}; cách cục: ${TV_CACH_CUC.cach.length} (có nguồn [V] ${ccCoNguon}, không nguồn [I] ${ccKhongNguon}); cách cục 0 ca: ${canhBao.length}`);
canhBao.forEach(x => console.log("  CẢNH BÁO:", x));
console.log(`Luận giải: ${errs.length ? "LỖI " + errs.length : "đạt"}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
