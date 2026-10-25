// Kiểm phần luận giải: node tools/kiem-tra-luan.mjs (chạy trong thư mục tu-vi). Lỗi → exit 1.
// Nguồn: mọi nguyenVan dò được trong nguon/toan-thu-q*.txt; mỗi chính tinh đủ 12 nhóm cung (theoCung + noiNgan ≤ 16 chữ); cách cục có nghiaLa/nenLam, 400 lá số không ném lỗi.
// Văn (400 lá số): (a) Tóm tắt đúng 8 mục ≤ 25 chữ, không mục nào là câu sáo (đo trùng chữ giữa các lá số); (b) mỗi cung "Nói ngắn:" ≤ 25 chữ;
// (c) văn chính (ngoài <details> và .zh) không có chữ nghề trần trừ khi câu có ngoặc giải nghĩa hoặc <abbr>; (d) câu trung bình ≤ 20 chữ, dài nhất ≤ 40;
// (e) tổng chữ văn chính ≤ 1500; (f) giao diện giả lập dựng được; red-team: thêm câu 45 chữ → bộ kiểm phải bắt.
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";
const errs = [], ok = (c, m) => { if (!c) errs.push(m); }, canhBao = [];
const html = readFileSync("tu-vi.html", "utf8"), srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
ok(srcs.includes("data/luan-sao.js") && srcs.includes("data/cach-cuc.js") && srcs.indexOf("luan.js") < srcs.indexOf("app.js"), "tu-vi.html phải nạp luan-sao, cach-cuc, luan.js trước app.js: " + srcs.join(", "));
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
const soChu = s => String(s).replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").trim().split(/\s+/).filter(Boolean).length;

// ---------- 1. nguồn, dữ liệu
const chuanHoa = s => s.replace(/\{\{[^}]*\}\}/g, "").replace(/<[^>]+>/g, "").replace(/[\s，。；：！？、○「」『』（）()《》,.;:!?\-—…]/g, "");
const nguon = readdirSync("nguon").filter(f => /^toan-thu-q\d\.txt$/.test(f)).map(f => chuanHoa(readFileSync("nguon/" + f, "utf8"))).join("\n");
ok(nguon.length > 50000, "nguon/toan-thu-q*.txt thiếu hoặc quá ngắn");
let soCau = 0, soSaoCoNV = 0;
const doCau = (trich, nhan) => { soCau++; const c = chuanHoa(trich); const co = c.length >= 4 && nguon.includes(c); ok(co, `không dò được trong nguyên văn: ${nhan}: ${trich}`); return co; };
for (const [ten, d] of Object.entries(TV_LUAN.sao)) {
  ok(Array.isArray(d.nguyenVan) && d.nguyenVan.length >= 1, `${ten} thiếu nguyenVan`); if (d.nguyenVan.length) soSaoCoNV++;
  for (const nv of d.nguyenVan) { doCau(nv.trich, ten); ok(nv.amHV && nv.dich && nv.nguon, `${ten}: nguyenVan thiếu amHV/dich/nguon`); }
  ok(d.tomY && d.tomY.length >= 2 && d.tomY.length <= 5, `${ten}: tomY phải 2–5 câu`);
  ok(d.theoDoSang && d.theoDoSang.tot && d.theoDoSang.xau, `${ten}: thiếu theoDoSang`);
  for (const cau of [...d.tomY, ...Object.values(d.theoCung)]) for (const c of String(cau).split(/(?<=[.!?;])\s+/)) ok(soChu(c) <= 40, `${ten}: câu quá 40 chữ: ${c}`);
}
for (const t of T.CHINH_TINH) { const d = TV_LUAN.sao[t]; ok(d && d.nguoi && d.manh && d.giu, "thiếu nguoi/manh/giu cho " + t); if (!d) continue;
  for (const k of TV_LUAN.NHOM) { ok(d.theoCung[k] && d.theoCung[k].length > 10, `${t} thiếu nhóm cung ${k}`); ok(d.noiNgan[k] && soChu(d.noiNgan[k]) <= 16, `${t} noiNgan ${k} thiếu hoặc > 16 chữ: ${d.noiNgan[k]}`); } }
for (const t of ["Lộc Tồn", "Kình Dương", "Đà La", "Văn Xương", "Văn Khúc", "Tả Phụ", "Hữu Bật", "Thiên Khôi", "Thiên Việt", "Hỏa Tinh", "Linh Tinh", "Địa Không", "Địa Kiếp", "Thiên Mã", "Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ", "Tuần", "Triệt"]) ok(TV_LUAN.sao[t] && TV_LUAN.sao[t].theoCung.chung, "thiếu luận / theoCung.chung cho " + t);
ok(TV_LUAN.CHU_GIAI && ["miếu", "vượng", "đắc địa", "bình hòa", "hãm", "Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ", "Tuần", "Triệt", "đại hạn", "tiểu hạn", "tam phương"].every(k => TV_LUAN.CHU_GIAI[k]), "TV_CHU_GIAI thiếu mục");
let ccCoNguon = 0, ccKhongNguon = 0;
for (const c of TV_CACH_CUC.cach) { ok(c.ma && c.ten && c.han && typeof c.dieuKien === "function" && c.luan, "cách cục thiếu trường: " + (c.ma || c.ten));
  ok(c.nghiaLa && soChu(c.nghiaLa) <= 25 && c.nenLam && soChu(c.nenLam) <= 25, `cách cục ${c.ten}: thiếu nghiaLa/nenLam hoặc > 25 chữ`);
  ok(c.nguyenVan && c.nguyenVan.length >= 1, "cách cục không có nguyên văn: " + c.ten);
  for (const nv of (c.nguyenVan || [])) { doCau(nv.trich, c.ten); ok(nv.dich && nv.nguon, `${c.ten}: nguyenVan thiếu dich/nguon`); }
  if (c.nhan === "[I]") ccKhongNguon++; else ccCoNguon++; }
ok(TV_CACH_CUC.cach.length >= 25, "phải có ≥ 25 cách cục, có " + TV_CACH_CUC.cach.length);

// ---------- 2. bộ kiểm văn cho một HTML luận
const TU_TRAN = /miếu|vượng|đắc địa|hãm|tứ hóa|tam phương|tứ chính|cách cục|nguyên thần|kỵ thần|phi hóa/i;
function vanChinh(h) { return h.replace(/<details[\s\S]*?<\/details>/g, " ").replace(/<span class="zh">[\s\S]*?<\/span>/g, " "); }
function kiemVan(h) {
  const loi = [], vc = vanChinh(h);
  // tóm tắt
  const tt = [...(vc.match(/<div class="tomtat">[\s\S]*?<\/ul>/) || [""])[0].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);
  if (tt.length !== 8) loi.push("tóm tắt phải 8 mục, có " + tt.length);
  tt.forEach((m, i) => { const n = soChu(m.replace(/<b>[^<]*<\/b>/, "")); if (n > 25) loi.push(`tóm tắt mục ${i + 1} dài ${n} chữ: ${m.replace(/<[^>]+>/g, "")}`); });
  // nói ngắn
  const nn = [...vc.matchAll(/<b>Nói ngắn:<\/b>([^<]*)</g)].map(m => m[1]);
  if (nn.length !== 12) loi.push("phải có 12 dòng Nói ngắn, có " + nn.length);
  nn.forEach((x, i) => { if (soChu(x) > 25) loi.push(`Nói ngắn cung ${i + 1} dài ${soChu(x)} chữ: ${x.trim()}`); });
  // câu
  const khoi = vc.replace(/<\/(p|li|h[1-6]|div|tr|td|summary)>/g, "\n").replace(/<br>/g, "\n");
  const cauHtml = khoi.split(/\n|(?<=[.!?;])\s+/).map(x => x.trim()).filter(x => soChu(x) > 0);
  let tongChu = 0, maxCau = 0, maxCauTx = "";
  for (const c of cauHtml) { const tx = c.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").trim(), n = soChu(tx); tongChu += n; if (n > maxCau) { maxCau = n; maxCauTx = tx; }
    if (n > 40) loi.push(`câu ${n} chữ: ${tx}`);
    const m = tx.match(TU_TRAN); if (m && !/<abbr/.test(c) && !/\([^)]{6,}\)/.test(tx)) loi.push(`chữ nghề trần "${m[0]}" không có giải nghĩa: ${tx}`); }
  const tb = tongChu / Math.max(1, cauHtml.length);
  if (tb > 20) loi.push(`câu trung bình ${tb.toFixed(1)} chữ > 20`);
  if (tongChu > 1500) loi.push(`tổng chữ văn chính ${tongChu} > 1500`);
  if (/undefined|NaN|\[object/.test(h)) loi.push("có undefined/NaN");
  return { loi, tt: tt.map(x => x.replace(/<b>[^<]*<\/b>/, "").replace(/<[^>]+>/g, "").trim()), tongChu, tb, maxCau, maxCauTx, soCau: cauHtml.length };
}
// ---------- 3. 400 lá số
let seed = 20261024; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const dem = Object.fromEntries(TV_CACH_CUC.cach.map(c => [c.ma, 0])); let loi = 0, viDu = {}, tongTat = 0, maxTat = 0, minTat = 1e9, tbCauTong = 0, maxCauTong = 0, maxCauTx = "", soLoiVan = 0;
const cacTomTat = [], mau = [];
T.datProfile("viet");
for (let i = 0; i < 400; i++) {
  const y = 1950 + Math.floor(rnd() * 81), m = 1 + Math.floor(rnd() * 12), d = 1 + Math.floor(rnd() * 28), gio = (i % 12) * 2, gioiTinh = i % 2 ? "nu" : "nam"; mau.push({ d, m, y, gio, gioiTinh });
  let ls; try { ls = T.laSo({ duong: { ngay: d, thang: m, nam: y, gio }, gioiTinh }); } catch (e) { loi++; continue; }
  let cc; try { cc = LU.cachCuc(ls); } catch (e) { loi++; errs.push("cachCuc ném lỗi: " + e.message); continue; }
  for (const c of cc) { dem[c.ma]++; if (!viDu[c.ma]) viDu[c.ma] = `${d}/${m}/${y} ${gio}h ${gioiTinh}`; }
  let h; try { h = LU.luanLaSo(ls, T.luuNien(ls, 2026)); } catch (e) { loi++; errs.push(`luanLaSo ném lỗi (${d}/${m}/${y} ${gio}h): ${e.message}`); continue; }
  const k = kiemVan(h); tongTat += k.tongChu; maxTat = Math.max(maxTat, k.tongChu); minTat = Math.min(minTat, k.tongChu); tbCauTong += k.tb; if (k.maxCau > maxCauTong) { maxCauTong = k.maxCau; maxCauTx = k.maxCauTx; }
  cacTomTat.push(k.tt);
  if (k.loi.length) { soLoiVan++; if (soLoiVan <= 5) errs.push(`văn (${d}/${m}/${y} ${gio}h ${gioiTinh}): ${k.loi.slice(0, 3).join(" | ")}`); }
}
ok(loi === 0, "lập/luận lỗi: " + loi); ok(soLoiVan === 0, `có ${soLoiVan}/400 lá số vi phạm luật văn`);
// (a) chống câu sáo: trùng chữ giữa hai lá số khác nhau > 80% (Jaccard theo từ) — đo từng mục, in tỉ lệ cặp
const tuSet = s => new Set(s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean));
const jac = (a, b) => { let g = 0; for (const x of a) if (b.has(x)) g++; return g / (a.size + b.size - g || 1); };
const TEN_MUC = ["Con người", "Điểm mạnh", "Điểm cần giữ mình", "Tiền bạc", "Công việc", "Gia đình, tình cảm", "Sức khỏe", "Giai đoạn hiện tại"];
const sets = cacTomTat.map(tt => tt.map(tuSet)); let tongCap = 0; const capTrung = Array(8).fill(0), capCoTrung = { n: 0 };
for (let i = 0; i < sets.length; i++) for (let j = i + 1; j < sets.length; j++) { tongCap++; let co = false; for (let k = 0; k < 8; k++) if (sets[i][k] && sets[j][k] && jac(sets[i][k], sets[j][k]) > 0.8) { capTrung[k]++; co = true; } if (co) capCoTrung.n++; }
console.log(`Tóm tắt một phút — tỉ lệ cặp lá số (trong ${tongCap} cặp) có mục trùng chữ > 80%:`);
TEN_MUC.forEach((t, k) => { const pct = 100 * capTrung[k] / tongCap; console.log(`  ${t.padEnd(22)} ${String(capTrung[k]).padStart(6)} cặp  ${pct.toFixed(2)}%`); ok(pct <= 2, `mục "${t}" trùng > 80% ở ${pct.toFixed(2)}% cặp (> 2%) — câu còn sáo`); });
console.log(`  cặp có ít nhất một mục trùng: ${capCoTrung.n} (${(100 * capCoTrung.n / tongCap).toFixed(2)}%)`);
for (let k = 0; k < 8; k++) { const dd = {}; for (const tt of cacTomTat) dd[tt[k]] = (dd[tt[k]] || 0) + 1; const max = Math.max(...Object.values(dd)); ok(max <= 20, `mục "${TEN_MUC[k]}" có một câu lặp ${max}/400 lá số (> 5%)`); }
console.log(`\nVăn chính: trung bình ${Math.round(tongTat / 400)} chữ/lá số (ít nhất ${minTat}, nhiều nhất ${maxTat}); câu trung bình ${(tbCauTong / 400).toFixed(1)} chữ; câu dài nhất ${maxCauTong} chữ: "${maxCauTx}"`);
console.log("\nCách cục khớp trong 400 lá số:");
for (const c of TV_CACH_CUC.cach) { const n = dem[c.ma]; console.log(`  ${String(n).padStart(3)}  ${c.ten} ${c.han} ${c.nhan}${n ? "  vd " + viDu[c.ma] : ""}`); if (n === 0) canhBao.push(`cách cục "${c.ten}" không khớp ca nào trong 400 lá số${c.ghiChu ? " — " + c.ghiChu : ""}`); }
// ---------- 4. giao diện giả lập
run(`$('#loaiLich').value='duong';$('#ngay').value='16';$('#thang').value='8';$('#nam').value='2000';$('#gio').value='3';$('#gioiTinh').value='nu';$('#profile').value='viet';$('#namXem').value='2026';lapLaSo()`);
ok(/Tóm tắt một phút/.test(els.luan.innerHTML) && /Mười hai cung/.test(els.luan.innerHTML) && /Giai đoạn đời/.test(els.luan.innerHTML) && /Thuật ngữ/.test(els.luan.innerHTML) && !/undefined|NaN/.test(els.luan.innerHTML), "thẻ Luận giải không dựng được");
ok((els.gio.innerHTML.match(/<option/g) || []).length === 13 && /value="23"/.test(els.gio.innerHTML), "ô giờ phải có 13 khung địa chi");
run(`$('#gio').value='23';$('#ngay').value='31';$('#thang').value='12';$('#nam').value='1999';lapLaSo()`);
ok(/1\/1\/2000 dương/.test(els.kq.innerHTML) && /đã tính sang ngày sau/.test(els.kq.innerHTML), "giá trị 23 phải sang ngày sau khi gioTySangNgaySau=true");
// ---------- 5. red-team
{ const ls = T.laSo({ duong: { ngay: 16, thang: 8, nam: 2000, gio: 4 }, gioiTinh: "nu" }), h = LU.luanLaSo(ls, T.luuNien(ls, 2026));
  const cau45 = "<p>" + Array.from({ length: 45 }, (_, i) => "chữ" + i).join(" ") + ".</p>";
  ok(kiemVan(h.replace("<h3>Giai đoạn đời</h3>", cau45 + "<h3>Giai đoạn đời</h3>")).loi.some(x => /câu 45 chữ/.test(x)), "red-team: câu 45 chữ không bị bắt");
  ok(kiemVan(h.replace("<h3>Giai đoạn đời</h3>", "<p>Sao này ở cung hãm nên xấu.</p><h3>Giai đoạn đời</h3>")).loi.some(x => /chữ nghề trần/.test(x)), "red-team: chữ nghề trần không bị bắt");
  const c = TV_LUAN.sao["Tử Vi"].nguyenVan[0].trich; ok(!nguon.includes(chuanHoa(c.replace("紫微", "紫徵"))), "red-team: câu sửa một chữ vẫn dò được"); }

console.log(`\nSao có nguyên văn: ${soSaoCoNV}/${Object.keys(TV_LUAN.sao).length}; câu trích đã dò: ${soCau}; cách cục: ${TV_CACH_CUC.cach.length} (có nguồn [V] ${ccCoNguon}, không nguồn [I] ${ccKhongNguon}); cách cục 0 ca: ${canhBao.length}`);
canhBao.forEach(x => console.log("  CẢNH BÁO:", x));
console.log("\nVí dụ Tóm tắt một phút:");
for (const i of [0, 7]) { console.log(`  — ${mau[i].d}/${mau[i].m}/${mau[i].y} ${mau[i].gio}h ${mau[i].gioiTinh}`); TEN_MUC.forEach((t, k) => console.log(`    ${t}: ${cacTomTat[i][k]}`)); }
console.log(`\nLuận giải: ${errs.length ? "LỖI " + errs.length : "đạt"}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
