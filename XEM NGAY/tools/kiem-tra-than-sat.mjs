// Kiểm data/than-sat.js đối chiếu nguon/hiep-ky-qNN.txt (Hiệp kỷ biện phương thư, bản Tứ khố, Wikisource).
// node tools/kiem-tra-than-sat.mjs   (chạy trong thư mục XEM NGAY). Exit 1 khi có lỗi.
// Kiểm: (1) mọi trích dẫn (nguon.trich, trichNghiKy, binhLuan, nguyenTac) dò được trong ĐÚNG quyển;
// (2) mã việc trong nen/ky có trong viec; (3) bảng tháng đủ 12 phần tử, chi/can/chỉ số 60/ngày âm trong khoảng;
// (4) không trùng mã thần sát, mã việc; (5) thuật ngữ Hán của việc có thật trong q10/q11;
// (6) đối chiếu chéo: những câu "X月值Y日" trong q10 (vd 刼煞 寅申巳亥月值收日) phải khớp bảng đã sinh.
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";

const loi = [];
const baoLoi = s => loi.push(s);
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync("data/than-sat.js", "utf8"), ctx, { filename: "than-sat.js" });
const D = ctx.XN_THAN_SAT || ctx.window.XN_THAN_SAT;
if (!D) { console.error("Không nạp được XN_THAN_SAT"); process.exit(1); }

// Chuẩn hoá: giữ chữ trong {{SK anchor|…}} (anchor chứa chính câu văn), bỏ mọi {{…}} khác (notes, SKchar…), bỏ thẻ, khoảng trắng (kể cả U+3000) và dấu câu.
const chuan = s => String(s).replace(/\{\{SK anchor\|([^}]*)\}\}/g, "$1").replace(/\{\{[^{}]*\}\}/g, "").replace(/<[^>]+>/g, "")
  .replace(/[\s　○、。，；：「」『』（）()\[\]【】.,;:!?！？—–\-]/g, "");
const nguon = {};
const docQuyen = q => {
  const k = String(q).padStart(2, "0");
  if (!(k in nguon)) { const f = `nguon/hiep-ky-q${k}.txt`; nguon[k] = existsSync(f) ? chuan(readFileSync(f, "utf8")) : null; if (!nguon[k]) baoLoi(`Thiếu file nguồn ${f}`); }
  return nguon[k];
};
let soTrich = 0;
function kiemTrich(q, s, nhan) {
  const t = docQuyen(q); if (!t) return;
  const c = chuan(s);
  if (!c) return baoLoi(`${nhan}: trích dẫn rỗng`);
  if (!t.includes(c)) return baoLoi(`${nhan}: không dò được trong q${String(q).padStart(2, "0")}: "${String(s).slice(0, 30)}…"`);
  soTrich++;
}

// --- việc ---
const maViec = new Set();
const q10 = readFileSync("nguon/hiep-ky-q10.txt", "utf8"), q11 = readFileSync("nguon/hiep-ky-q11.txt", "utf8");
for (const v of D.viec) {
  if (!v.ma || !v.ten || !Array.isArray(v.han) || !v.han.length) baoLoi(`việc thiếu trường: ${JSON.stringify(v)}`);
  if (maViec.has(v.ma)) baoLoi(`trùng mã việc ${v.ma}`); maViec.add(v.ma);
  for (const h of v.han) if (!q10.includes(h) && !q11.includes(h)) baoLoi(`việc ${v.ma}: thuật ngữ ${h} không có trong q10/q11`);
}

// --- thần sát ---
const TRUC = ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"];
const THAN = ["Thanh Long", "Minh Đường", "Thiên Hình", "Chu Tước", "Kim Quỹ", "Thiên Đức", "Bạch Hổ", "Ngọc Đường", "Thiên Lao", "Huyền Vũ", "Tư Mệnh", "Câu Trần"];
const kiemBang = (b, max, nhan) => {
  if (!Array.isArray(b) || b.length !== 12) return baoLoi(`${nhan}: bảng tháng không đủ 12 phần tử`);
  b.forEach((x, m) => { if (!Array.isArray(x)) return baoLoi(`${nhan}: tháng ${m} không phải mảng`); x.forEach(v => { if (!Number.isInteger(v) || v < 0 || v >= max) baoLoi(`${nhan}: giá trị ${v} ngoài khoảng 0..${max - 1} (tháng ${m})`); }); });
};
const maTS = new Set(), theoMa = {};
for (const t of D.thanSat) {
  const n = `[${t.ma || "?"} ${t.han || ""}]`;
  for (const f of ["ma", "ten", "han", "loai", "dinhNghia", "nguon", "nen", "ky", "trichNghiKy"]) if (t[f] === undefined) baoLoi(`${n}: thiếu trường ${f}`);
  if (maTS.has(t.ma)) baoLoi(`trùng mã thần sát ${t.ma}`); maTS.add(t.ma); theoMa[t.ma] = t;
  if (!["cát", "hung"].includes(t.loai)) baoLoi(`${n}: loai lạ ${t.loai}`);
  for (const f of ["nen", "ky"]) for (const m of t[f] || []) if (!maViec.has(m)) baoLoi(`${n}: mã việc ${m} trong ${f} không có trong viec`);
  const d = t.dinhNghia || {};
  switch (d.kieu) {
    case "thang-chi": kiemBang(d.bang, 12, n); break;
    case "thang-can": kiemBang(d.bang, 10, n); break;
    case "thang-canchi": kiemBang(d.bang, 60, n); break;
    case "thang-can-hoac-chi": kiemBang(d.bangCan, 10, n); kiemBang(d.bangChi, 12, n); break;
    case "truc": if (!TRUC.includes(d.truc)) baoLoi(`${n}: trực lạ ${d.truc}`); kiemBang(d.bang, 12, n); break;
    case "hoang-dao": if (!THAN.includes(d.than)) baoLoi(`${n}: thần hoàng đạo lạ ${d.than}`); kiemBang(d.bang, 12, n); break;
    case "ngay-canchi": if (!Array.isArray(d.ds) || !d.ds.length || d.ds.some(v => !Number.isInteger(v) || v < 0 || v > 59)) baoLoi(`${n}: ds can chi lỗi`); break;
    case "am-lich": if (!Array.isArray(d.ngay) || d.ngay.some(v => !Number.isInteger(v) || v < 1 || v > 30)) baoLoi(`${n}: ngày âm lỗi`); break;
    default: baoLoi(`${n}: kiểu định nghĩa lạ ${d.kieu}`);
  }
  if (t.nguon) kiemTrich(t.nguon.quyen, t.nguon.trich, n + " nguon.trich"); else baoLoi(`${n}: thiếu nguon`);
  for (const s of t.trichNghiKy || []) kiemTrich(10, s, n + " trichNghiKy");
  if (t.binhLuan) kiemTrich(10, t.binhLuan, n + " binhLuan");
  if (t.kyNhu && !maTS.has(t.kyNhu) && !D.thanSat.some(x => x.ma === t.kyNhu)) baoLoi(`${n}: kyNhu trỏ tới mã lạ ${t.kyNhu}`);
}
for (const nt of D.nguyenTac || []) kiemTrich(nt.quyen, nt.cau, "nguyenTac");
if (!Array.isArray(D.nguyenTac) || !D.nguyenTac.length) baoLoi("nguyenTac rỗng");

// --- đối chiếu chéo với các câu "X月值Y日" trong q10 (đều là nguyên văn q10, mục tương ứng) ---
const CHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const thangTu = s => [...s].map(c => CHI.indexOf(c === "夘" ? "卯" : c));
const bangCua = ma => { const t = theoMa[ma]; return t && t.dinhNghia.bang; };
const CHEO = [ // [mã thần sát, chuỗi chi tháng, mã trực phải trùng, nguyên văn q10]
  ["kiep-sat", "寅申巳亥", "truc-thu", "寅申巳亥月值收日"], ["kiep-sat", "辰戌丑未", "truc-tru", "辰戌丑未月值除日"], ["kiep-sat", "子午卯酉", "truc-chap", "子午夘酉月值執日"],
  ["tai-sat", "寅申巳亥", "truc-khai", "寅申巳亥月值開日"], ["tai-sat", "辰戌丑未", "truc-man", "辰戌丑未月值滿日"], ["tai-sat", "子午卯酉", "truc-pha", "子午夘酉月值破日"],
  ["nguyet-sat", "寅申巳亥", "truc-be", "寅申巳亥月值閉日"], ["nguyet-sat", "辰戌丑未", "truc-binh", "辰戌丑未月值平日"],
  ["nguyet-hinh", "寅巳", "truc-binh", "寅巳月值月刑 (平日)"], ["nguyet-hinh", "卯丑戌", "truc-thu", "夘月丑戌月皆值月刑 (收日)"], ["nguyet-hinh", "辰酉亥", "truc-kien", "辰酉亥月值建日"], ["nguyet-hinh", "子", "truc-binh", "子月值平日天吏"], ["nguyet-hinh", "午", "nguyet-yem", "午月值月厭"],
  ["dai-thoi", "子午卯酉", "truc-thu", "子午卯酉月值收日"], ["dai-thoi", "寅申巳亥", "truc-tru", "寅申巳亥月值除日官日"], ["dai-thoi", "辰戌丑未", "truc-chap", "辰戌月值執日 / 丑未月值執日"],
  ["thien-lai", "寅申巳亥", "truc-nguy", "寅申巳亥月值危日"], ["thien-lai", "辰戌丑未", "truc-be", "辰戌丑未月值閉日"], ["thien-lai", "子午卯酉", "truc-binh", "午卯酉月值平日"],
  ["cuu-khong", "寅申", "truc-man", "寅申月值滿日"], ["cuu-khong", "子午卯酉", "truc-khai", "子午卯酉月值開日"], ["cuu-khong", "辰戌丑未", "truc-pha", "辰戌丑未月值破日"],
  ["nguyet-yem", "寅申", "truc-thanh", "寅申月值成日"], ["nguyet-yem", "丑未", "truc-khai", "丑未月值開日"], ["nguyet-yem", "辰戌", "truc-dinh", "辰戌月值定日"], ["nguyet-yem", "巳亥", "truc-man", "己亥月值滿日"],
  ["nguyet-hai", "卯酉", "truc-tru", "卯酉月值除日守日"], ["nguyet-hai", "丑未", "truc-chap", "丑未月值執日大時"], ["nguyet-hai", "辰戌", "truc-be", "辰戌月值閉日官日天吏"], ["nguyet-hai", "申", "truc-binh", "申月值平日"],
  ["tieu-hao", "子午卯酉", "kiep-sat", "子午卯酉月值刼煞 (小耗)"],
  ["thu-nhat", "寅申", "truc-man", "寅申月值守日 (滿日)"], ["tuong-nhat", "子午卯酉", "truc-man", "子午夘酉月值相日 (滿日)"], ["vuong-nhat", "子午卯酉", "truc-be", "子午夘酉月值王日 (閉日)"], ["quan-nhat", "辰戌丑未", "truc-be", "辰戌丑未月值官日 (閉日)"],
  ["tuong-nhat", "寅申巳亥", "truc-binh", "寅申巳亥月值相日 (平日)"], ["luc-hop", "寅申", "truc-thu", "寅申月值六合 (收日)"], ["luc-hop", "卯酉", "truc-nguy", "夘酉月值危日 (月煞 六合)"],
  ["thien-ma", "午", "truc-thanh", "成日: 五月與天馬併"], ["thien-ma", "亥", "truc-tru", "除日: 十月與天馬併"],
];
for (const [ma, thangs, maDoi, van] of CHEO) {
  const a = bangCua(ma), b = bangCua(maDoi);
  if (!a || !b) { baoLoi(`đối chiếu chéo: thiếu bảng ${ma} hoặc ${maDoi}`); continue; }
  for (const m of thangTu(thangs)) if (!Array.isArray(a[m]) || !Array.isArray(b[m]) || !a[m].some(v => b[m].includes(v))) baoLoi(`đối chiếu chéo "${van}": tháng ${CHI[m]} bảng ${ma}=[${a[m]}] không trùng ${maDoi}=[${b[m]}]`);
}
const KHONG_TRUNG = [["dich-ma", "truc-thanh", "驛馬不得與天喜併"], ["dich-ma", "truc-tru", "驛馬不得與吉期併"]];
for (const [ma, maDoi, van] of KHONG_TRUNG) { const a = bangCua(ma), b = bangCua(maDoi); if (a && b) a.forEach((x, m) => { if (Array.isArray(b[m]) && x.some(v => b[m].includes(v))) baoLoi(`đối chiếu chéo "${van}": tháng ${CHI[m]} lại trùng`); }); }
// Trực: bảng phải đúng công thức (chi ngày − chi tháng) = thứ tự trực
for (const t of D.thanSat) if (t.dinhNghia.kieu === "truc") t.dinhNghia.bang.forEach((x, m) => { if (x.length !== 1 || ((x[0] - m + 12) % 12) !== TRUC.indexOf(t.dinhNghia.truc)) baoLoi(`[${t.ma}] bảng trực ${t.dinhNghia.truc} sai ở tháng ${m}`); });
// Hoàng đạo: Thanh Long khởi 寅申→子 卯酉→寅 辰戌→辰 巳亥→午 子午→申 丑未→戌 (q07), các thần kế tiếp cách nhau 1
for (const t of D.thanSat) if (t.dinhNghia.kieu === "hoang-dao") t.dinhNghia.bang.forEach((x, m) => { const tl = ((m - 2 + 12) % 6) * 2; if (x[0] !== (tl + THAN.indexOf(t.dinhNghia.than)) % 12) baoLoi(`[${t.ma}] bảng hoàng đạo sai ở tháng ${m}`); });

const soCat = D.thanSat.filter(t => t.loai === "cát").length, soHung = D.thanSat.length - soCat;
if (loi.length) { console.error(loi.join("\n")); console.error(`\n✗ ${loi.length} lỗi`); }
console.log(`Thần sát: ${D.thanSat.length} thần sát (cát ${soCat}, hung ${soHung}), ${D.viec.length} việc, ${soTrich} trích dẫn khớp, ${D.nguyenTac.length} câu nguyên tắc, ${(D.thieu || []).length} mục thiếu, ${CHEO.length + KHONG_TRUNG.length} phép đối chiếu chéo`);
process.exit(loi.length ? 1 : 0);
