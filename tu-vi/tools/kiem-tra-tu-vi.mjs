// Kiểm lõi Tử vi: node tools/kiem-tra-tu-vi.mjs  (chạy trong thư mục TU VI; cần `cd tools && npm install iztro`; SO_LA_SO=400 mặc định)
// 1) Nạp lõi chung + tu-vi.js + app.js đúng theo <script src> trong tu-vi.html bằng vm, giao diện giả lập.
// 2) Ví dụ nguyên văn Toàn thư; bảng Tử Vi theo cục chép từ Toàn thư đối chiếu từng ô với công thức; bảng độ sáng phủ đủ cung.
// 3) Xác định cấu hình mặc định của iztro từ mã nguồn; chọn profile khớp; sinh N lá số ngẫu nhiên (seed cố định) 1950–2030, 12 giờ, 2 giới,
//    so từng hạng mục với iztro. Mỗi hạng mục in hai cột: tất cả mẫu / chỉ các mẫu mà âm lịch Việt (+7) trùng âm lịch Trung Quốc (+8 của iztro).
//    Ca lệch lịch được truy nguyên bằng cách đưa đúng ngày âm của iztro vào lõi ta rồi so lại — phải khớp 100% thì mới được gọi là "lệch do lịch".
// 4) Red-team: đổi bảng → tỉ lệ phải tụt. 5) Ba profile. 6) Giao diện. Lỗi → exit 1.
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
const require = createRequire(import.meta.url);
const errs = [], ok = (c, m) => { if (!c) errs.push(m); };
const SO_LA_SO = +(process.env.SO_LA_SO || 400);

// ---------- nạp như trình duyệt
const html = readFileSync("tu-vi.html", "utf8"), srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
ok(srcs.length === 10 && srcs[3] === "../chung/lich-chon.js" && srcs[4] === "tu-vi.js" && srcs[7] === "luan.js" && srcs[8] === "app.js" && srcs[9] === "../chung/han.js", "tu-vi.html phải nạp 4 file chung + tu-vi.js + 2 data + luan.js + app.js + ../chung/han.js, thấy: " + srcs.join(", "));
function taoCtx() {
  const els = {}, kho = {};
  const mk = id => els[id] || (els[id] = { id, innerHTML: "", value: "", checked: false, dataset: { t: id }, classList: { toggle() {}, contains() { return false; } }, onclick: null, onchange: null });
  const ctx = { console, document: { querySelector: s => mk(s.replace("#", "")), querySelectorAll: s => s === "nav button" ? [mk("navLaso"), mk("navCach")] : [], body: { classList: { toggle() {} } } },
    localStorage: { getItem: k => (k in kho ? kho[k] : null), setItem: (k, v) => { kho[k] = String(v); }, removeItem: k => { delete kho[k]; } }, print() {} };
  ctx.window = ctx; vm.createContext(ctx); return { ctx, els, kho };
}
const { ctx, els } = taoCtx();
for (const f of srcs) vm.runInContext(readFileSync(f, "utf8"), ctx, { filename: f });
const { TuVi: T, LichAm, CanChi, CHI, CAN } = ctx, run = s => vm.runInContext(s, ctx);
const ZH_CHI = "子丑寅卯辰巳午未申酉戌亥", ZH_CAN = "甲乙丙丁戊己庚辛壬癸";
const chiIdx = Object.fromEntries([...CHI.map((c, i) => [c, i]), ...ZH_CHI.split("").map((c, i) => [c, i])]); // nhận cả chữ Hán của iztro
const laSoDuong = s => T.laSo({ duong: { ngay: s.d, thang: s.m, nam: s.y, gio: s.gio }, gioiTinh: s.gioiTinh });

// ---------- 1. Ví dụ nguyên văn Toàn thư quyển 2 (nguon/toan-thu-q2.txt)
{ const q2 = existsSync("nguon/toan-thu-q2.txt") ? readFileSync("nguon/toan-thu-q2.txt", "utf8").replace(/\s/g, "") : "";
  ok(q2.length > 1000, "thiếu nguon/toan-thu-q2.txt");
  for (const cau of ["大抵人命俱从寅上起正月，顺数至本生月止，又自人生月起子时逆至本生时安命，顺至本生时安身", "庚日武阴同为首", "壬梁紫府武宿是", "子时戌上起文昌，逆到生时是贵乡，文曲数从辰上起，顺到生时是本乡",
    "甲己申酉宫，乙庚午未宫，丙辛辰巳宫，丁壬寅卯宫，戊癸子丑宫", "寅午戌人丑卯方，申子辰人寅戌扬，巳酉丑人卯戌位，亥卯未人酉戌房", "阳男阴女从命前一宫起顺行", "男命顺数、女命逆数", "火局命寅起长生。木局命亥起长生。水局命申起长生。金局命巳起长生。土局命申起长生",
    "寅午戌人起辰宫，申子辰人自戌宫，巳酉丑人起未宫，亥卯未人起丑宫", "天伤安在奴仆宫，天使安在疾厄宫", "月德星从子上起子", "又若闰月正月生者要在二月内起安身命"])
    ok(q2.includes(cau.replace(/\s/g, "")), "không thấy trong Toàn thư Q2: " + cau);
  T.datProfile("viet");
  const a = T.laSo({ am: { ngay: 1, thang: 1, nam: 1984, chiGio: 0 }, gioiTinh: "nam" }), b = T.laSo({ am: { ngay: 1, thang: 1, nam: 1984, chiGio: 1 }, gioiTinh: "nam" }), c = T.laSo({ am: { ngay: 1, thang: 1, nam: 1984, chiGio: 2 }, gioiTinh: "nam" });
  ok(a.menh === 2 && a.than === 2 && b.menh === 1 && b.than === 3 && c.menh === 0 && c.than === 4, "正月生子时就在寅宫安身命，丑时逆转丑安命，顺去卯安身，寅时逆转子安命，顺至辰安身");
  ok(a.cuc.so === 6 && a.sao["Tử Vi"] === 9, "甲生人安命在寅…丙寅丁卯炉中火 → Hỏa lục cục, 正月初一生者是火局，酉宫起初一日 → Tử Vi Dậu; ra " + a.cuc.ten + " " + CHI[a.sao["Tử Vi"]]);
  const q = T.laSo({ am: { ngay: 10, thang: 5, nam: 1993, chiGio: 0 }, gioiTinh: "nam" }); // Quý Dậu
  ok(q.sao["Lộc Tồn"] === 0 && q.sao["Kình Dương"] === 1 && q.sao["Đà La"] === 11, "假如癸禄在子，丑宫安擎羊，亥宫安陀罗");
  const k1 = T.laSo({ am: { ngay: 10, thang: 5, nam: 1993, chiGio: 1 }, gioiTinh: "nam" }), k6 = T.laSo({ am: { ngay: 10, thang: 5, nam: 1993, chiGio: 6 }, gioiTinh: "nam" });
  ok(q.sao["Địa Kiếp"] === 11 && q.sao["Địa Không"] === 11 && k1.sao["Địa Kiếp"] === 0 && k1.sao["Địa Không"] === 10 && k6.sao["Địa Kiếp"] === 5 && k6.sao["Địa Không"] === 5, "子时生者劫空俱在亥宫。若丑时生者劫顺在子宫，空逆在戌宫。若午时生者，劫空俱在巳上");
  ok(T.bangTuHoa(0).join() === "Liêm Trinh,Phá Quân,Vũ Khúc,Thái Dương", "如甲生人廉贞化禄、破军化权、武曲化科、太阳化忌");
  ok(q.cung[q.sao["Thiên Thương"]].ten === "Nô bộc" && q.cung[q.sao["Thiên Sứ"]].ten === "Tật ách", "天伤安在奴仆宫，天使安在疾厄宫");
  ok(a.tuan.join() === "10,11" && a.triet.join() === "8,9", "甲子旬中空戌亥; 甲己申酉宫");
  ok(a.sao["Thiên Mã"] === 2 && q.sao["Thiên Mã"] === 11, "申子辰人马居寅; 巳酉丑人马居亥");
  ok(T.bangTuHoa(6).join() === "Thái Dương,Vũ Khúc,Thái Âm,Thiên Đồng", "庚日武阴同为首 → Canh: Lộc Nhật, Quyền Vũ, Khoa Âm, Kỵ Đồng (profile viet)");
  T.datProfile("toan-thu"); ok(T.bangTuHoa(8).join() === "Thiên Lương,Tử Vi,Thiên Phủ,Vũ Khúc", "壬梁紫府武宿是 → Nhâm toan-thu: Khoa Thiên Phủ"); T.datProfile("viet");
  ok(T.bangTuHoa(8).join() === "Thiên Lương,Tử Vi,Tả Phụ,Vũ Khúc", "Nhâm profile viet: Khoa Tả Phụ (Toàn tập, iztro)");
}
// ---------- 2. Bảng Tử Vi theo cục chép từ Toàn thư (nguon/toan-thu-q2.txt, phần 水二局…火六局) đối chiếu công thức viTriTuVi
const BANG_TOAN_THU = { // [cục]: {chi: [ngày…]} chép nguyên các ô; 初=1–10, 十=11–19, 廿=21–29, 二十=20, 三十=30
  2: { "Tỵ": [8,9], "Ngọ": [10,11], "Mùi": [12,13], "Thân": [14,15], "Thìn": [6,7,30], "Dậu": [16,17], "Mão": [4,5,28,29], "Tuất": [18,19], "Dần": [2,3,26,27], "Sửu": [1,24,25], "Tý": [22,23], "Hợi": [20,21] },
  3: { "Tỵ": [4,12,14], "Ngọ": [7,15,17], "Mùi": [10,18,20], "Thân": [13,21,23], "Thìn": [1,9,11], "Dậu": [16,24,26], "Mão": [6,8], "Tuất": [19,27,29], "Dần": [3,9], "Sửu": [2,28], "Tý": [25], "Hợi": [22,30] },
  4: { "Tỵ": [6,16,19,25], "Ngọ": [10,20,23,29], "Mùi": [14,24,27], "Thân": [18,28], "Thìn": [2,12,15,21], "Dậu": [22], "Mão": [8,11,17], "Tuất": [26], "Dần": [4,7,13], "Sửu": [3,9], "Tý": [5], "Hợi": [1] },
  5: { "Tỵ": [8,20,24], "Ngọ": [1,13,25,29], "Mùi": [6,18,30], "Thân": [11,23], "Thìn": [3,15,19,27], "Dậu": [16,28], "Mão": [10,14,22], "Tuất": [21], "Dần": [5,9,17], "Sửu": [4,12], "Tý": [7], "Hợi": [2,26] },
  6: { "Tỵ": [10,24,29], "Ngọ": [2,16,30], "Mùi": [8,22], "Thân": [14,28], "Thìn": [4,18,23], "Dậu": [1,20], "Mão": [12,17,27], "Tuất": [7,26], "Dần": [6,11,21], "Sửu": [5,15,25], "Tý": [9,19], "Hợi": [3,13] } };
let oKhop = 0, oLech = [], oThieu = [];
for (const [cuc, bang] of Object.entries(BANG_TOAN_THU)) {
  const coTrongBang = new Set();
  for (const [chi, ngays] of Object.entries(bang)) for (const n of ngays) { coTrongBang.add(n); if (T.viTriTuVi(+cuc, n) === chiIdx[chi]) oKhop++; else oLech.push(`cục ${cuc} ngày ${n}: bảng ghi ${chi}, công thức ra ${CHI[T.viTriTuVi(+cuc, n)]}`); }
  for (let n = 1; n <= 30; n++) if (!coTrongBang.has(n)) oThieu.push(`cục ${cuc} ngày ${n} không có trong bảng (công thức: ${CHI[T.viTriTuVi(+cuc, n)]})`);
}
const tongO = Object.values(BANG_TOAN_THU).reduce((s, b) => s + Object.values(b).reduce((x, a) => x + a.length, 0), 0);
console.log(`Bảng Tử Vi Toàn thư (5 cục × 30 ngày = 150 ô cần có; bản chép Wikisource có ${tongO} ô): ${oKhop}/${tongO} ô khớp công thức; lệch ${oLech.length}; thiếu ${oThieu.length}`);
oLech.forEach(x => console.log("  lệch:", x)); oThieu.forEach(x => console.log("  thiếu:", x));
ok(oLech.length === 1 && oLech[0].startsWith("cục 3 ngày 9: bảng ghi Dần"), "chỉ được phép 1 ô lệch đã biết (Mộc tam cục cung Dần chép 初九, đúng là 初五); thấy: " + oLech.join(" | "));
ok(oThieu.length === 2 && oThieu.every(x => /cục 3 ngày 5|cục 4 ngày 30/.test(x)), "chỉ được phép 2 ô thiếu đã biết (Mộc ngày 5, Kim ngày 30); thấy: " + oThieu.join(" | "));
// Bảng độ sáng phủ đủ: 14 chính tinh + Xương Khúc Hỏa Linh đủ 12 cung; Lộc Kình Đà đủ các cung có thể tới
for (const t of [...T.CHINH_TINH, "Văn Xương", "Văn Khúc", "Hỏa Tinh", "Linh Tinh"]) for (let c = 0; c < 12; c++) ok(T.doSang(t, c), `độ sáng thiếu ${t} tại ${CHI[c]}`);
for (const can of [0,1,2,3,4,5,6,7,8,9]) { const l = T.LOC_TON[can]; ok(T.doSang("Lộc Tồn", l), `độ sáng thiếu Lộc Tồn tại ${CHI[l]}`); ok(T.doSang("Kình Dương", (l + 1) % 12), `độ sáng thiếu Kình Dương tại ${CHI[(l + 1) % 12]}`); ok(T.doSang("Đà La", (l + 11) % 12), `độ sáng thiếu Đà La tại ${CHI[(l + 11) % 12]}`); }

// ---------- 3. iztro: cấu hình mặc định (bằng chứng từ mã nguồn) và đối chứng hàng loạt
let iz = null; try { iz = require("iztro"); } catch (e) { console.log("[U] Không nạp được iztro:", e.message); }
if (!iz) { errs.push("iztro chưa cài (cd TU VI/tools && npm install iztro)"); }
else {
  const { astro } = iz, cfgSrc = readFileSync(require.resolve("iztro/lib/astro/config.js"), "utf8"), stemSrc = readFileSync(require.resolve("iztro/lib/data/heavenlyStems.js"), "utf8"),
    utilSrc = readFileSync(require.resolve("iztro/lib/utils/index.js"), "utf8"), ganzhiSrc = readFileSync(require.resolve("lunar-lite/lib/ganzhi.js"), "utf8"), pkg = require("iztro/package.json");
  let lunarTsSrc = ""; try { lunarTsSrc = readFileSync(require.resolve("lunar-typescript/dist/lib/Lunar.mjs"), "utf8"); } catch (e) {}
  const cfg = astro.getConfig();
  console.log(`\niztro ${pkg.version} (${pkg.license}) — cấu hình mặc định đọc từ astro.getConfig():`, JSON.stringify(cfg));
  ok(cfg.yearDivide === "normal" && cfg.dayDivide === "forward" && cfg.algorithm === "default", "iztro mặc định khác dự kiến: " + JSON.stringify(cfg));
  ok(/yearDivide: 'normal'/.test(cfgSrc) && /dayDivide: 'forward'/.test(cfgSrc), "config.js không thấy defaults yearDivide normal / dayDivide forward");
  ok(/gengHeavenly[\s\S]*?mutagen: \['taiyangMaj', 'wuquMaj', 'taiyinMaj', 'tiantongMaj'\]/.test(stemSrc), "heavenlyStems.js: Canh phải là 阳武阴同");
  ok(/renHeavenly[\s\S]*?mutagen: \['tianliangMaj', 'ziweiMaj', 'zuofuMin', 'wuquMaj'\]/.test(stemSrc), "heavenlyStems.js: Nhâm phải là 梁紫左武");
  ok(/lunarDay > 15 && timeIndex !== 12/.test(utilSrc), "utils/index.js: fixLeap phải là ngày > 15 sang tháng sau");
  ok(/getYearGanByLiChun/.test(ganzhiSrc) && /getYearGan\(\)/.test(ganzhiSrc), "lunar-lite ganzhi.js: yearDivide normal = can chi năm âm lịch, exact = Lập xuân");
  ok(!lunarTsSrc || /solarYmd < liChunYmd/.test(lunarTsSrc), "lunar-typescript Lunar.mjs _computeYear: ByLiChun so theo NGÀY (solarYmd < liChunYmd), bản theo giờ là ByLiChunExact mà iztro không dùng");
  console.log("  → yearDivide normal = năm đổi ở mồng một Tết (lunar-lite ganzhi.js: normal → getYearGan, exact → getYearGanByLiChun; lunar-typescript Lunar.mjs: ByLiChun so theo ngày)");
  console.log("  → dayDivide forward = giờ Tý khuya (timeIndex 12) cộng một ngày (location.js getStartIndex, utils fixLunarDayIndex); tháng không đổi (utils fixLunarMonthIndex dùng tháng của ngày dương truyền vào)");
  console.log("  → fixLeap=true (mặc định bySolar): tháng nhuận ngày 1–15 tính tháng trước, 16+ tính tháng sau (utils fixLunarMonthIndex)");
  console.log("  → Tứ Hóa data/heavenlyStems.js: 庚 阳武阴同, 壬 梁紫左武 (= profile viet); Hỏa Linh đếm thuận (location.js getHuoLingIndex); Thiên Mã theo chi năm; Tràng sinh dương nam âm nữ thuận (decorativeStar.js)");
  console.log("  → Lịch: iztro dùng lunar-typescript (giờ Bắc Kinh +8); lõi chung của kho dùng múi +7 → một số ngày âm lệch nhau (đo bên dưới)");
  console.log("  → Profile đối chứng: viet (khớp toàn bộ các điểm quy tắc trên)\n");
  // Bảng đối chiếu tên
  const ZH = Object.assign({}, T.HAN_SAO, { "Hồng Loan":"红鸾","Thiên Hỷ":"天喜","Thiên Riêu":"天姚","Thiên Hình":"天刑","Đào Hoa":"咸池","Hoa Cái":"华盖","Cô Thần":"孤辰","Quả Tú":"寡宿","Long Trì":"龙池","Phượng Các":"凤阁","Thiên Khốc":"天哭","Thiên Hư":"天虚",
    "Tam Thai":"三台","Bát Tọa":"八座","Ân Quang":"恩光","Thiên Quý":"天贵","Thai Phụ":"台辅","Phong Cáo":"封诰","Thiên Quan":"天官","Thiên Phúc":"天福","Thiên Trù":"天厨","Phá Toái":"破碎","Thiên Tài":"天才","Thiên Thọ":"天寿","Thiên Thương":"天伤","Thiên Sứ":"天使",
    "Thiên Đức":"天德","Nguyệt Đức":"月德","Thiên Không":"天空","Giải Thần":"解神","Niên Giải":"年解" });
  const ZH_TRANG_SINH = ["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"], ZH_BAC_SI = ["博士","力士","青龙","小耗","将军","奏书","飞廉","喜神","病符","大耗","伏兵","官府"];
  const ZH_THAI_TUE = { "Thái Tuế":"岁建", "Tang Môn":"丧门", "Quan Phù":"官符", "Long Đức":"龙德", "Bạch Hổ":"白虎", "Điếu Khách":"吊客" };
  const HOA_ZH = { "Lộc":"禄", "Quyền":"权", "Khoa":"科", "Kỵ":"忌" }, THU_TU_HOA = ["Lộc", "Quyền", "Khoa", "Kỵ"];
  const NHOM_SAO = { "14 chính tinh": T.CHINH_TINH, "Lộc Tồn Kình Đà": ["Lộc Tồn","Kình Dương","Đà La"], "Xương Khúc Tả Hữu": ["Văn Xương","Văn Khúc","Tả Phụ","Hữu Bật"], "Khôi Việt": ["Thiên Khôi","Thiên Việt"], "Hỏa Linh": ["Hỏa Tinh","Linh Tinh"], "Không Kiếp": ["Địa Không","Địa Kiếp"], "Thiên Mã": ["Thiên Mã"],
    "Phụ tinh theo năm (Loan Hỷ Đào Cái Cô Quả Trì Các Khốc Hư Quan Phúc Trù Toái Tài Thọ Đức Không Niên Giải)": ["Hồng Loan","Thiên Hỷ","Đào Hoa","Hoa Cái","Cô Thần","Quả Tú","Long Trì","Phượng Các","Thiên Khốc","Thiên Hư","Thiên Quan","Thiên Phúc","Thiên Trù","Phá Toái","Thiên Tài","Thiên Thọ","Thiên Đức","Nguyệt Đức","Thiên Không","Niên Giải"],
    "Phụ tinh theo tháng/ngày/giờ (Hình Riêu Giải Thần Thai Tọa Quang Quý Thai Phụ Phong Cáo)": ["Thiên Hình","Thiên Riêu","Giải Thần","Tam Thai","Bát Tọa","Ân Quang","Thiên Quý","Thai Phụ","Phong Cáo"], "Thiên Thương Thiên Sứ": ["Thiên Thương","Thiên Sứ"] };
  // Sinh ngẫu nhiên có seed
  let seed = 20261024; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const ngauNhien = (n, namTu = 1950, namDen = 2030) => Array.from({ length: n }, (_, i) => {
    const y = namTu + Math.floor(rnd() * (namDen - namTu + 1)), m = 1 + Math.floor(rnd() * 12), dmax = new Date(y, m, 0).getDate(), d = 1 + Math.floor(rnd() * dmax);
    const chiGio = i % 12, gio = chiGio === 0 ? (rnd() < 0.5 ? 0 : 23) : chiGio * 2 - (rnd() < 0.5 ? 1 : 0), gioiTinh = i % 2 ? "nu" : "nam";
    return { d, m, y, gio, gioiTinh };
  });
  // Gọi iztro cho một mẫu: giờ 23h → ngày hôm sau timeIndex 0 (cùng nghĩa "giờ Tý sang ngày sau"); hoặc timeIndex 12 cùng ngày nếu dungTimeIndex12
  const goiIztro = (s, dungTimeIndex12 = false) => {
    let { d, m, y } = s, ti = CanChi.chiGioTuGio(s.gio);
    if (s.gio >= 23) { if (dungTimeIndex12) ti = 12; else { const [dd, mm, yy] = LichAm.jdToDate(LichAm.jdFromDate(d, m, y) + 1); d = dd; m = mm; y = yy; ti = 0; } }
    return astro.bySolar(`${y}-${m}-${d}`, ti, s.gioiTinh === "nam" ? "男" : "女", true, "zh-CN");
  };
  const viTriIz = (a, zh) => { for (const p of a.palaces) if ([...p.majorStars, ...p.minorStars, ...p.adjectiveStars].some(x => x.name === zh)) return chiIdx[p.earthlyBranch]; return -1; };
  const saoIz = (a, zh) => { for (const p of a.palaces) { const x = [...p.majorStars, ...p.minorStars].find(x => x.name === zh); if (x) return x; } return null; };
  const amIz = a => { const l = a.rawDates.lunarDate; return { ngay: l.lunarDay, thang: l.lunarMonth, nam: l.lunarYear, nhuan: l.isLeap ? 1 : 0 }; };
  const cungAm = (x, y) => x.ngay === y.ngay && x.thang === y.thang && x.nam === y.nam && !!x.nhuan === !!y.nhuan;
  // Đối chiếu một lá số của ta với một lá số iztro; trả về {muc: đúng/sai, mô tả}
  function doiChieu(ls, a, opts) {
    const kq = {}, ghi = (muc, khop, vd) => { kq[muc] = [khop, vd]; };
    ghi("Can chi năm", ls.nam.can === ZH_CAN.indexOf(a.chineseDate[0]) && ls.nam.chi === ZH_CHI.indexOf(a.chineseDate[1]), `iztro ${a.chineseDate.slice(0, 2)}`);
    ghi("Cung Mệnh", ls.menh === chiIdx[a.earthlyBranchOfSoulPalace], `ta ${CHI[ls.menh]}, iztro ${a.earthlyBranchOfSoulPalace}`);
    ghi("Cung Thân", ls.than === chiIdx[a.earthlyBranchOfBodyPalace], `ta ${CHI[ls.than]}, iztro ${a.earthlyBranchOfBodyPalace}`);
    ghi("Cục", ({ 2: "水二局", 3: "木三局", 4: "金四局", 5: "土五局", 6: "火六局" })[ls.cuc.so] === a.fiveElementsClass, `ta ${ls.cuc.ten}, iztro ${a.fiveElementsClass}`);
    for (const [nhom, ds] of Object.entries(NHOM_SAO)) { const sai = ds.filter(t => viTriIz(a, ZH[t]) !== ls.sao[t]); ghi(nhom, sai.length === 0, sai.map(t => `${t} ta ${CHI[ls.sao[t]]}, iztro ${viTriIz(a, ZH[t]) < 0 ? "không có" : CHI[viTriIz(a, ZH[t])]}`).join("; ")); }
    { let dung = true, ct = []; for (const [t, h] of Object.entries(ls.tuHoa)) { const x = saoIz(a, ZH[t]); if (!x || x.mutagen !== HOA_ZH[h]) { dung = false; ct.push(`${t} ta ${h}, iztro ${x ? x.mutagen || "không" : "?"}`); } }
      for (const p of a.palaces) for (const x of [...p.majorStars, ...p.minorStars]) if (x.mutagen) { const t = Object.keys(ZH).find(k => ZH[k] === x.name); if (!t || HOA_ZH[ls.tuHoa[t]] !== x.mutagen) { dung = false; ct.push(`iztro ${x.name} ${x.mutagen} ta không`); } }
      ghi("Tứ Hóa", dung, ct.join("; ")); }
    ghi("Triệt (2 cung)", viTriIz(a, "截路") === ls.triet[0] && viTriIz(a, "空亡") === ls.triet[1], `ta ${ls.triet.map(c => CHI[c])}, iztro ${CHI[viTriIz(a, "截路")]} ${CHI[viTriIz(a, "空亡")]}`);
    ghi("Tuần (iztro 旬空 nằm trong 2 cung Tuần)", ls.tuan.includes(viTriIz(a, "旬空")), `ta ${ls.tuan.map(c => CHI[c])}, iztro ${CHI[viTriIz(a, "旬空")]}`);
    ghi("Vòng Tràng sinh (12 cung)", a.palaces.every(p => ZH_TRANG_SINH[T.VONG_TRANG_SINH.indexOf(ls.trangSinh[chiIdx[p.earthlyBranch]])] === p.changsheng12), `ta Tràng Sinh tại ${CHI[ls.trangSinh.indexOf("Tràng Sinh")]}, iztro 长生 tại ${a.palaces.find(p => p.changsheng12 === "长生").earthlyBranch}`);
    ghi("Vòng Bác sĩ (12 cung)", a.palaces.every(p => ZH_BAC_SI[T.VONG_BAC_SI.indexOf(ls.bacSi[chiIdx[p.earthlyBranch]])] === p.boshi12), `ta Bác Sĩ tại ${CHI[ls.bacSi.indexOf("Bác Sĩ")]}, iztro 博士 tại ${a.palaces.find(p => p.boshi12 === "博士").earthlyBranch}`);
    ghi("Vòng Thái Tuế (6 mốc Tuế, Tang, Quan Phù, Long Đức, Bạch Hổ, Điếu Khách)", Object.entries(ZH_THAI_TUE).every(([v, z]) => chiIdx[a.palaces.find(p => p.suiqian12 === z).earthlyBranch] === ls.thaiTue.indexOf(v)), `ta Thái Tuế tại ${CHI[ls.thaiTue.indexOf("Thái Tuế")]}, iztro 岁建 tại ${a.palaces.find(p => p.suiqian12 === "岁建").earthlyBranch}`);
    ghi("Đại hạn (12 cung, tuổi khởi và chiều)", a.palaces.every(p => p.decadal.range.join() === ls.daiHan[chiIdx[p.earthlyBranch]].join()), `ta Mệnh ${ls.daiHan[ls.menh].join("-")} kế ${ls.daiHan[(ls.menh + 1) % 12].join("-")}, iztro ${a.palaces.map(p => p.earthlyBranch + p.decadal.range.join("-")).join(" ")}`);
    ghi("Tiểu hạn (12 cung)", a.palaces.every(p => p.ages.slice(0, 8).join() === ls.tieuHan[chiIdx[p.earthlyBranch]].join()), `ta tuổi 1 tại ${CHI[ls.tieuHan.findIndex(r => r[0] === 1)]}, iztro ${a.palaces.find(p => p.ages[0] === 1).earthlyBranch}`);
    if (!opts.boLuuNien) { const ln = T.luuNien(ls, 2026), h = a.horoscope("2026-6-1"), vi = zh => { const i = h.yearly.stars.findIndex(c => c.some(x => x.name === zh)); return i < 0 ? -1 : (i + 2) % 12; };
      const cap = [["L.Lộc Tồn","流禄"],["L.Kình Dương","流羊"],["L.Đà La","流陀"],["L.Thiên Mã","流马"],["L.Thiên Khôi","流魁"],["L.Thiên Việt","流钺"],["L.Văn Xương","流昌"],["L.Văn Khúc","流曲"],["L.Hồng Loan","流鸾"],["L.Thiên Hỷ","流喜"]];
      ghi("Lưu niên 2026: lưu Lộc Kình Đà Mã Khôi Việt Xương Khúc Loan Hỷ", cap.every(([v, z]) => vi(z) === ln.sao[v]), cap.filter(([v, z]) => vi(z) !== ln.sao[v]).map(([v, z]) => `${v} ta ${CHI[ln.sao[v]]} iztro ${CHI[vi(z)]}`).join("; "));
      ghi("Lưu niên 2026: lưu Tứ Hóa", h.yearly.mutagen.join() === THU_TU_HOA.map(h => ZH[Object.keys(ln.tuHoa).find(t => ln.tuHoa[t] === h)]).join(), `ta ${JSON.stringify(ln.tuHoa)}, iztro ${h.yearly.mutagen}`); }
    let kh = 0, tong = 0; for (const t of [...T.CHINH_TINH, "Văn Xương", "Văn Khúc", "Lộc Tồn", "Kình Dương", "Đà La", "Hỏa Tinh", "Linh Tinh"]) { const x = saoIz(a, ZH[t]); if (!x || !x.brightness) continue; tong++; if (({ "庙":"miếu","旺":"vượng","得":"đắc địa","利":"lợi ích","平":"bình hòa","不":"bất đắc địa","陷":"hãm" })[x.brightness] === T.doSang(t, ls.sao[t])) kh++; }
    return { kq, doSang: [kh, tong] };
  }
  // So sánh một tập mẫu: đếm theo hạng mục, hai cột (tất cả / cùng âm lịch), ví dụ lệch, và truy nguyên ca lệch lịch
  function soSanh(mau, opts = {}) {
    const dem = {}, viDu = {}, ds = [0, 0]; let loi = 0, lechLich = 0, lechLichKhopSauKhiDoi = 0, lechLichViDu = [], lapXuanNgay = 0;
    for (const s of mau) {
      let ls, a; try { ls = laSoDuong(s); a = goiIztro(s, opts.timeIndex12); } catch (e) { loi++; console.log("  lỗi", JSON.stringify(s), e.message); continue; }
      const amI = amIz(a), cung = cungAm(ls.am, amI);
      const mo = `${s.d}/${s.m}/${s.y} ${s.gio}h ${s.gioiTinh} (âm VN ${ls.am.ngay}/${ls.am.thang}${ls.am.nhuan ? "n" : ""}/${ls.am.nam}${cung ? "" : `, âm iztro ${amI.ngay}/${amI.thang}${amI.nhuan ? "n" : ""}/${amI.nam}`}, ${ls.nam.ten})`;
      const { kq, doSang } = doiChieu(ls, a, opts); ds[0] += doSang[0]; ds[1] += doSang[1];
      for (const [muc, [khop, vd]] of Object.entries(kq)) { const d = dem[muc] = dem[muc] || [0, 0, 0, 0]; d[1]++; if (cung) d[3]++; if (khop) { d[0]++; if (cung) d[2]++; } else if ((viDu[muc] = viDu[muc] || []).length < 3) viDu[muc].push(`${mo}: ${vd}`); }
      if (!cung && !opts.timeIndex12) { // truy nguyên: giữ nguyên ngày dương, ghi đè ngày âm bằng ngày âm của iztro (+8), mọi hạng mục phải khớp
        lechLich++; const gioTy = s.gio >= 23 || s.gio < 1;
        const ls2 = T.laSo({ duong: { ngay: s.d, thang: s.m, nam: s.y, gio: s.gio }, gioiTinh: s.gioiTinh, ghiDeAm: amI }), kq2 = doiChieu(ls2, a, opts).kq, saiCon = Object.entries(kq2).filter(([m, [k]]) => !k);
        if (saiCon.length === 0) lechLichKhopSauKhiDoi++; else if (lechLichViDu.length < 3) lechLichViDu.push(`${mo}: còn lệch ${saiCon.map(([m, [, v]]) => m + " (" + v + ")").join("; ")}${gioTy ? " [giờ Tý]" : ""}`);
      }
      if (opts.danhDauLapXuan && ls.cauHinh.ranhGioiNam === "lap-xuan") { const L = [0, 23].map(h => LichAm.kinhDoMatTroi(s.d, s.m, s.y, h, 0)); if (L[0] < 315 && L[1] >= 315) lapXuanNgay++; }
    }
    return { dem, viDu, loi, doSang: ds, lechLich, lechLichKhopSauKhiDoi, lechLichViDu, lapXuanNgay, n: mau.length, khongTruyNguyen: !!opts.timeIndex12 };
  }
  const pct = (k, n) => n ? (100 * k / n).toFixed(2) + "%" : "—";
  const inBang = (tieuDe, r) => {
    console.log(`\n=== ${tieuDe} ===`);
    console.log("Hạng mục".padEnd(78) + "Tất cả".padStart(12) + "  Tỉ lệ".padEnd(10) + "Cùng âm lịch".padStart(14) + "  Tỉ lệ");
    for (const [muc, [k, n, k2, n2]] of Object.entries(r.dem)) { console.log(muc.padEnd(78) + `${k}/${n}`.padStart(12) + `  ${pct(k, n)}`.padEnd(10) + `${k2}/${n2}`.padStart(14) + `  ${pct(k2, n2)}`);
      if (k !== n && r.viDu[muc]) r.viDu[muc].forEach(v => console.log("      vd:", v)); }
    console.log("(thông tin) Độ sáng tại vị trí sao của ta so với iztro (chỉ lệch ở ca lệch lịch; bảng tĩnh ở trên)".padEnd(78) + `${r.doSang[0]}/${r.doSang[1]}`.padStart(12) + `  ${pct(r.doSang[0], r.doSang[1])}`);
    if (r.lechLich || !r.khongTruyNguyen) console.log(`Âm lịch VN (+7) khác âm lịch iztro (+8): ${r.lechLich}/${r.n} ca; trong đó giữ ngày dương, ghi đè ngày âm của iztro vào lõi ta thì khớp toàn bộ hạng mục: ${r.lechLichKhopSauKhiDoi}/${r.lechLich}`);
    r.lechLichViDu.forEach(v => console.log("      còn lệch sau khi đổi lịch:", v));
    if (r.loi) console.log("  lỗi khi lập:", r.loi);
    return r;
  };
  const batBuoc100 = (r, tenBang, mucBoQua = []) => { for (const [muc, [k, n, k2, n2]] of Object.entries(r.dem)) if (!mucBoQua.includes(muc)) ok(k2 === n2, `${tenBang}: "${muc}" cột cùng âm lịch khớp ${k2}/${n2} < 100%`); ok(r.lechLichKhopSauKhiDoi === r.lechLich, `${tenBang}: ${r.lechLich - r.lechLichKhopSauKhiDoi} ca lệch lịch vẫn lệch sau khi dùng ngày âm của iztro → không phải chỉ do lịch`); ok(r.loi === 0, tenBang + ": có lá số lập lỗi"); };
  // Bảng độ sáng của iztro (data/stars.js, mảng 12 mức từ cung Dần) so với bảng Toàn thư — thông tin
  { const SI = require("iztro/lib/data/stars.js").STARS_INFO, KEY = { "Tử Vi":"ziweiMaj","Thiên Cơ":"tianjiMaj","Thái Dương":"taiyangMaj","Vũ Khúc":"wuquMaj","Thiên Đồng":"tiantongMaj","Liêm Trinh":"lianzhenMaj","Thiên Phủ":"tianfuMaj","Thái Âm":"taiyinMaj","Tham Lang":"tanlangMaj","Cự Môn":"jumenMaj","Thiên Tướng":"tianxiangMaj","Thiên Lương":"tianliangMaj","Thất Sát":"qishaMaj","Phá Quân":"pojunMaj","Văn Xương":"wenchangMin","Văn Khúc":"wenquMin","Lộc Tồn":"lucunMin","Kình Dương":"qingyangMin","Đà La":"tuoluoMin","Hỏa Tinh":"huoxingMin","Linh Tinh":"lingxingMin" };
    const MUC = { miao:"miếu", wang:"vượng", de:"đắc địa", li:"lợi ích", ping:"bình hòa", bu:"bất đắc địa", xian:"hãm" }; let kh = 0, tong = 0, khac = [];
    for (const [t, key] of Object.entries(KEY)) { const b = SI[key] && SI[key].brightness; if (!b) { khac.push(t + ": iztro không có bảng"); continue; }
      for (let i = 0; i < 12; i++) { const chi = (i + 2) % 12, ta = T.doSang(t, chi); if (!ta) continue; tong++; if (MUC[b[i]] === ta) kh++; else khac.push(`${t} ${CHI[chi]}: Toàn thư ${ta}, iztro ${MUC[b[i]] || b[i] || "trống"}`); } }
    console.log(`Bảng độ sáng tĩnh: Toàn thư so với iztro khớp ${kh}/${tong} ô; khác: ${khac.join("; ")}
`); }
  // 3a. Đối chứng chính: profile viet = cấu hình iztro mặc định
  T.datProfile("viet");
  const mau = ngauNhien(SO_LA_SO);
  const chinh = inBang(`Đối chứng ${SO_LA_SO} lá số ngẫu nhiên 1950–2030 (seed cố định) — profile viet vs iztro mặc định (23h → ngày sau, timeIndex 0)`, soSanh(mau));
  batBuoc100(chinh, "Đối chứng chính");
  { const gioi = new Set(mau.map(s => s.gioiTinh)), gio = new Set(mau.map(s => CanChi.chiGioTuGio(s.gio))), ls = mau.map(laSoDuong), nhuan = ls.filter(l => l.am.nhuan).length, nhuanSau = ls.filter(l => l.am.nhuan && l.am.ngay >= 16).length, khuya = mau.filter(s => s.gio >= 23).length;
    console.log(`Mẫu: ${mau.length} lá số, ${gioi.size} giới, ${gio.size} chi giờ, ${khuya} ca 23h, ${nhuan} ca tháng nhuận (trong đó ${nhuanSau} ca từ ngày 16), năm ${Math.min(...mau.map(s => s.y))}–${Math.max(...mau.map(s => s.y))}`);
    ok(gio.size === 12 && gioi.size === 2 && mau.length >= 300, "mẫu phải ≥ 300, đủ 12 giờ, 2 giới"); }
  // 3b. Cách iztro xử lý timeIndex 12 (giờ Tý khuya cùng ngày dương) so với ta — thông tin
  const khuya = mau.filter(s => s.gio >= 23);
  inBang(`(thông tin) ${khuya.length} ca 23h: ta (sang ngày sau) vs iztro timeIndex 12 cùng ngày — iztro cộng ngày nhưng giữ tháng của ngày dương, nên lệch ở ngày cuối tháng âm`, soSanh(khuya, { timeIndex12: true, boLuuNien: true }));
  // 3c. Lập xuân: ranhGioiNam lap-xuan vs iztro yearDivide exact, mẫu tháng 1–2
  { T.datProfile("viet"); T.CAU_HINH.ranhGioiNam = "lap-xuan"; astro.config({ yearDivide: "exact", horoscopeDivide: "exact" });
    const mauLX = ngauNhien(240).map((s, i) => Object.assign(s, { m: 1 + (i % 2), d: 1 + Math.floor(rnd() * 28) }));
    const r = inBang("Ranh giới Lập xuân: ta ranhGioiNam=lap-xuan (theo giờ) vs iztro yearDivide=exact (lunar-typescript so theo ngày) — 240 lá số tháng 1–2", soSanh(mauLX, { boLuuNien: true, danhDauLapXuan: true }));
    const saiNam = mauLX.filter(s => { const l = laSoDuong(s), a = goiIztro(s); return cungAm(l.am, amIz(a)) && l.nam.can !== ZH_CAN.indexOf(a.chineseDate[0]); });
    console.log(`  ca cùng âm lịch nhưng can chi năm khác: ${saiNam.length} — ${saiNam.map(s => { const L = [0, 23].map(h => LichAm.kinhDoMatTroi(s.d, s.m, s.y, h, 0)); return `${s.d}/${s.m}/${s.y} ${s.gio}h (kinh độ MT 0h ${L[0].toFixed(2)}°, 23h ${L[1].toFixed(2)}° → ${L[0] < 315 && L[1] >= 315 ? "đúng ngày Lập xuân" : "KHÔNG phải ngày Lập xuân"})`; }).join("; ")}`);
    ok(saiNam.every(s => { const L = [0, 23].map(h => LichAm.kinhDoMatTroi(s.d, s.m, s.y, h, 0)); return L[0] < 315 && L[1] >= 315; }), "Lập xuân: mọi ca khác can chi năm (cùng âm lịch) phải rơi đúng ngày Lập xuân (khác độ phân giải ngày/giờ)");
    const khac = mauLX.filter(s => { T.CAU_HINH.ranhGioiNam = "tet"; const a = laSoDuong(s).namAn; T.CAU_HINH.ranhGioiNam = "lap-xuan"; return a !== laSoDuong(s).namAn; }).length;
    console.log(`  trong mẫu có ${khac} ca năm theo Tết khác năm theo Lập xuân (mẫu có ý nghĩa khi > 0)`); ok(khac > 0, "mẫu Lập xuân không có ca nào khác Tết");
    astro.config({ yearDivide: "normal", horoscopeDivide: "normal" }); T.datProfile("viet"); }
  // 3d. Giờ Tý cùng ngày: gioTySangNgaySau=false vs iztro dayDivide current
  { T.datProfile("viet"); T.CAU_HINH.gioTySangNgaySau = false; astro.config({ dayDivide: "current" });
    const r = inBang(`Giờ Tý cùng ngày: ta gioTySangNgaySau=false vs iztro dayDivide=current — ${khuya.length} ca 23h`, soSanh(khuya, { timeIndex12: true, boLuuNien: true }));
    batBuoc100(r, "Giờ Tý cùng ngày");
    astro.config({ dayDivide: "forward" }); T.datProfile("viet"); }
  // 4. Red-team: đổi bảng → tỉ lệ phải tụt
  { const mauRT = mau.slice(0, 120), dem = (r, m) => r.dem[m][0];
    const goc = soSanh(mauRT, { boLuuNien: true });
    T.datProfile("viet"); T.CAU_HINH.tuHoaNham = "luong-tu-phu-vu"; const r1 = soSanh(mauRT, { boLuuNien: true }); T.datProfile("viet");
    const soNham = mauRT.filter(s => laSoDuong(s).nam.can === 8).length;
    console.log(`\n=== Red-team (120 lá số đầu) ===\nĐổi Tứ Hóa Nhâm sang Khoa Thiên Phủ: Tứ Hóa khớp ${dem(goc, "Tứ Hóa")} → ${dem(r1, "Tứ Hóa")}/120 (mẫu có ${soNham} ca năm Nhâm)`);
    ok(soNham > 0 && dem(r1, "Tứ Hóa") === dem(goc, "Tứ Hóa") - soNham, "red-team Tứ Hóa: phải tụt đúng bằng số ca năm Nhâm");
    T.CAU_HINH.hoaLinhChieu = "am-duong-nam-nu"; const r2 = soSanh(mauRT, { boLuuNien: true }); T.datProfile("viet");
    console.log(`Đổi Hỏa Linh sang thuận nghịch theo âm dương nam nữ: Hỏa Linh khớp ${dem(goc, "Hỏa Linh")} → ${dem(r2, "Hỏa Linh")}/120`);
    ok(dem(r2, "Hỏa Linh") < dem(goc, "Hỏa Linh") * 0.75, "red-team Hỏa Linh: phải tụt rõ (âm nam dương nữ giờ ≠ Tý đổi chỗ)");
    T.CAU_HINH.trangSinhChieu = "nam-thuan-nu-nghich"; const r3 = soSanh(mauRT, { boLuuNien: true }); T.datProfile("viet");
    console.log(`Đổi Tràng sinh sang nam thuận nữ nghịch (nguyên văn Toàn thư): vòng Tràng sinh khớp ${dem(goc, "Vòng Tràng sinh (12 cung)")} → ${dem(r3, "Vòng Tràng sinh (12 cung)")}/120`);
    ok(dem(r3, "Vòng Tràng sinh (12 cung)") < dem(goc, "Vòng Tràng sinh (12 cung)") * 0.75, "red-team Tràng sinh: phải tụt gần một nửa");
    const locGoc = T.LOC_TON[0]; T.LOC_TON[0] = 3; const r4 = soSanh(mauRT, { boLuuNien: true }); T.LOC_TON[0] = locGoc;
    const soGiap = mauRT.filter(s => laSoDuong(s).nam.can === 0).length;
    console.log(`Sửa bảng Lộc Tồn can Giáp (Dần → Mão): Lộc Tồn Kình Đà khớp ${dem(goc, "Lộc Tồn Kình Đà")} → ${dem(r4, "Lộc Tồn Kình Đà")}/120 (mẫu có ${soGiap} ca năm Giáp)`);
    ok(dem(r4, "Lộc Tồn Kình Đà") === dem(goc, "Lộc Tồn Kình Đà") - soGiap, "red-team Lộc Tồn: phải tụt đúng bằng số ca năm Giáp");
    T.CAU_HINH.thangNhuan = "thang-truoc"; const r5 = soSanh(mau, { boLuuNien: true }); T.datProfile("viet");
    const caNhuanSau = mau.filter(s => { const l = laSoDuong(s); return l.am.nhuan && l.am.ngay >= 16 && cungAm(l.am, amIz(goiIztro(s))); }).length;
    console.log(`Đổi tháng nhuận sang cả tháng tính tháng trước: cung Mệnh khớp ${dem(chinh, "Cung Mệnh")} → ${dem(r5, "Cung Mệnh")}/${mau.length} (mẫu có ${caNhuanSau} ca nhuận từ ngày 16, cùng âm lịch)`);
    ok(caNhuanSau > 0 && dem(r5, "Cung Mệnh") === dem(chinh, "Cung Mệnh") - caNhuanSau, "red-team tháng nhuận: phải tụt đúng bằng số ca nhuận từ ngày 16"); }
  // 5. Các profile khác chạy không lỗi và khác nhau ở đúng chỗ
  { let khacNham = 0, khacTS = 0, loi = 0;
    for (const s of mau) { try { T.datProfile("viet"); const v = laSoDuong(s); T.datProfile("toan-thu"); const t = laSoDuong(s); T.datProfile("trung-chau"); const z = laSoDuong(s);
        if (v.nam.can === 8) { ok(t.tuHoa["Thiên Phủ"] === "Khoa" && v.tuHoa["Tả Phụ"] === "Khoa" && z.tuHoa["Tả Phụ"] === "Khoa", "profile Nhâm"); khacNham++; }
        if (v.nam.can === 6) ok(v.tuHoa["Thái Âm"] === "Khoa" && t.tuHoa["Thái Âm"] === "Khoa" && v.tuHoa["Thiên Đồng"] === "Kỵ", "Canh: cả viet và toan-thu đều Khoa Thái Âm, Kỵ Thiên Đồng theo nguyên văn");
        if (v.trangSinh.join() !== t.trangSinh.join()) khacTS++;
        ok(T.CHINH_TINH.every(x => v.sao[x] === t.sao[x]) || v.am.nhuan, "chính tinh viet và toan-thu chỉ được khác khi tháng nhuận");
        ok(T.CHINH_TINH.every(x => v.sao[x] === z.sao[x]) && v.menh === z.menh, "viet và trung-chau chỉ khác Hỏa Linh");
      } catch (e) { loi++; } }
    T.datProfile("viet");
    console.log(`\nBa profile chạy ${mau.length} lá số: lỗi ${loi}; ca năm Nhâm ${khacNham}; ca vòng Tràng sinh khác giữa viet và toan-thu ${khacTS}`);
    ok(loi === 0 && khacNham > 0 && khacTS > 0, "profile khác nhau chưa thể hiện"); }
  // Tháng nhuận cả ba cách phải cho tháng an sao đúng quy ước (2023 nhuận tháng 2 âm)
  { const am = LichAm.solar2lunar(10, 4, 2023); ok(am.nhuan === 1 && am.thang === 2 && am.ngay === 20, "10/4/2023 phải là 20/2 nhuận, ra " + JSON.stringify(am));
    const l = ["nua-thang", "thang-truoc", "thang-sau"].map(k => { T.datProfile("viet"); T.CAU_HINH.thangNhuan = k; return T.laSo({ duong: { ngay: 10, thang: 4, nam: 2023, gio: 10 }, gioiTinh: "nam" }).thangAn; }); T.datProfile("viet");
    ok(l.join() === "3,2,3", "tháng an sao cho 20/2 nhuận theo ba quy ước phải là 3,2,3; ra " + l.join());
    const l2 = ["nua-thang", "thang-truoc", "thang-sau"].map(k => { T.CAU_HINH.thangNhuan = k; return T.laSo({ duong: { ngay: 28, thang: 3, nam: 2023, gio: 10 }, gioiTinh: "nam" }).thangAn; }); T.datProfile("viet");
    ok(l2.join() === "2,2,3", "tháng an sao cho 7/2 nhuận theo ba quy ước phải là 2,2,3; ra " + l2.join()); }
}
// ---------- 6. Giao diện giả lập
{ run(`$('#loaiLich').value='duong';$('#ngay').value='16';$('#thang').value='8';$('#nam').value='2000';$('#gio').value='4';$('#gioiTinh').value='nu';$('#profile').value='viet';$('#namXem').value='2026';lapLaSo()`);
  const h = els.kq.innerHTML; ok(/Tử Vi/.test(h) && /Mệnh/.test(h) && /Mộc tam cục/.test(h) && /Canh Thìn/.test(h) && (h.match(/class="o /g) || []).length === 12 && !/undefined|NaN|null/.test(h), "lá số giao diện 16/8/2000 lỗi: " + h.slice(0, 300));
  ok(/TUẦN/.test(h) && /TRIỆT/.test(h) && /lưu Thái Tuế/.test(h) && /đại hạn/.test(h), "giao diện phải đánh dấu Tuần Triệt và lưu niên");
  run(`$('#loaiLich').value='am';$('#ngay').value='20';$('#thang').value='2';$('#nhuan').checked=true;$('#nam').value='2023';$('#gio').value='23';$('#gioiTinh').value='nam';$('#profile').value='toan-thu';lapLaSo()`);
  const h2 = els.kq.innerHTML; ok(/tháng 2 nhuận/.test(h2) && /toan-thu/.test(h2) && !/undefined|NaN/.test(h2), "lá số âm lịch nhuận, 23h, profile toan-thu lỗi: " + (h2.match(/.{0,80}(undefined|NaN).{0,80}/) || [h2.slice(0, 200)])[0]);
  run("trangCach()"); ok(/庚日武阴同/.test(els.cachHtml.innerHTML) && /tuHoaNham/.test(els.cachHtml.innerHTML) && !/undefined|NaN/.test(els.cachHtml.innerHTML), "trang cách an sao lỗi");
  let loi = 0; for (let i = 0; i < 400; i++) { try { const l = T.laSo({ duong: { ngay: 1 + (i * 7) % 28, thang: 1 + i % 12, nam: 1900 + (i * 13) % 200, gio: i % 24 }, gioiTinh: i % 2 ? "nu" : "nam" }); if (l.cung.length !== 12 || l.cung.reduce((s, c) => s + c.chinhTinh.length, 0) !== 14) loi++; } catch (e) { loi++; } }
  ok(loi === 0, "400 lá số rải 1900–2099 có " + loi + " lỗi"); }

console.log(`\nTử vi: ${errs.length ? "LỖI " + errs.length : "đạt"} (kiểm nguyên văn, bảng Tử Vi, độ sáng, đối chứng iztro, red-team, giao diện)`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
