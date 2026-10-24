// Sinh XEM NGAY/data/than-sat.js từ nguon/hiep-ky-qNN.txt (Khâm định Hiệp kỷ biện phương thư, bản Tứ khố, zh.wikisource).
// Chạy trong thư mục XEM NGAY: node data/gen-than-sat.mjs .   (rồi kiểm: node tools/kiem-tra-than-sat.mjs)
// Mọi trích dẫn (trich, trichNghiKy, binhLuan, nguyenTac) được CẮT TRỰC TIẾP từ file nguồn, không gõ tay.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = process.argv[2];
if (!DIR) throw new Error("Thiếu đường dẫn thư mục XEM NGAY");
const CAN = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const CHI = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const CAN_VN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI_VN = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const TRUC = ["Kiến","Trừ","Mãn","Bình","Định","Chấp","Phá","Nguy","Thành","Thu","Khai","Bế"];
const mod = (a, n) => ((a % n) + n) % n;
const idx60 = (can, chi) => { for (let i = 0; i < 60; i++) if (i % 10 === can && i % 12 === chi) return i; throw new Error("can chi không hợp " + can + chi); };

// ---------- đọc nguồn ----------
const nguon = {};
for (const q of ["03","04","05","06","07","10","11"]) nguon[q] = readFileSync(join(DIR, "nguon", `hiep-ky-q${q}.txt`), "utf8");
// Chuẩn hoá giống tool kiểm: giữ chữ trong {{SK anchor|…}}, bỏ mọi {{…}} khác, bỏ thẻ, bỏ khoảng trắng và dấu câu.
const chuan = s => s.replace(/\{\{SK anchor\|([^}]*)\}\}/g, "$1").replace(/\{\{[^{}]*\}\}/g, "").replace(/<[^>]+>/g, "")
  .replace(/[\s　○、。，；：「」『』（）()\[\]【】.,;:!?！？—–\-]/g, "");
const nguonChuan = Object.fromEntries(Object.entries(nguon).map(([q, t]) => [q, chuan(t)]));
function kiemTrich(q, s, nhan) {
  if (!s || !nguonChuan[q].includes(chuan(s))) throw new Error(`Trích dẫn không dò được trong q${q} (${nhan}): ${s.slice(0, 40)}`);
  return s;
}
// Lấy đoạn nguyên văn trong quyển q từ chuỗi bắt đầu đến chuỗi kết thúc (không gồm kết thúc), rồi làm sạch template/khoảng trắng.
function cat(q, tu, den, lan = 1) {
  const t = nguon[q]; let i = -1;
  for (let k = 0; k < lan; k++) { i = t.indexOf(tu, i + 1); if (i < 0) throw new Error(`Không thấy "${tu}" trong q${q}`); }
  const j = den ? t.indexOf(den, i + tu.length) : t.indexOf("\n", i);
  if (j < 0) throw new Error(`Không thấy kết thúc "${den}" sau "${tu}" trong q${q}`);
  return sach(t.slice(i, j));
}
const sach = s => s.replace(/\{\{SK anchor\|([^}]*)\}\}/g, "$1").replace(/\{\{[^{}]*\}\}/g, "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");

// ---------- quyển 10: tách mục ----------
const q10Lines = nguon["10"].split("\n").map(sach);
const iTOC0 = q10Lines.findIndex(l => l.endsWith("作宜忌")) + 1;
const iTOC1 = q10Lines.findIndex((l, i) => i > iTOC0 && l === "表例附");
const headings = new Set(q10Lines.slice(iTOC0, iTOC1).filter(Boolean));
for (const h of ["青龍明堂金匱寶光玉堂司命", "鳴吠", "天刑朱雀白虎天牢元武勾陳", "無禄日", "朔朢", "朔望", "以上所宜", "以上所忌", "宜忌等第表", "鋪註條例"]) headings.add(h);
const bodyStart = iTOC1 + 1;
function mucQ10(tieuDe, lan = 1) {
  let idx = -1, dem = 0;
  for (let i = bodyStart; i < q10Lines.length; i++) if (q10Lines[i] === tieuDe && ++dem === lan) { idx = i; break; }
  if (idx < 0) throw new Error(`Không thấy mục q10 "${tieuDe}" lần ${lan}`);
  const noiDung = [];
  for (let i = idx + 1; i < q10Lines.length; i++) { const l = q10Lines[i]; if (!l) continue; if (headings.has(l)) break; noiDung.push(l); }
  return { trich: noiDung.filter(l => !l.startsWith("按")), binhLuan: noiDung.filter(l => l.startsWith("按")).join("") || undefined };
}

// ---------- bảng tháng ----------
const THANG_SO = { "正": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10, "十一": 11, "十二": 12 };
const soThang2Chi = n => mod(n + 1, 12);           // 正月 = Dần (2)
const MUA = { "春": [2, 3, 4], "夏": [5, 6, 7], "秋": [8, 9, 10], "冬": [11, 0, 1] };
const bangRong = () => Array.from({ length: 12 }, () => []);
const docThang = s => { const r = []; for (let i = 0; i < s.length; i++) { if (s[i] === "十" && (s[i + 1] === "一" || s[i + 1] === "二")) { r.push(s[i + 1] === "一" ? 11 : 12); i++; } else r.push(THANG_SO[s[i]]); } return r; };
const chiIdx = c => { const i = CHI.indexOf(c === "夘" ? "卯" : c === "己" ? "巳" : c); if (i < 0) throw new Error("chi lạ " + c); return i; };
const canIdx = c => { const i = CAN.indexOf(c === "巳" ? "己" : c); if (i < 0) throw new Error("can lạ " + c); return i; };
const RE_THANG = /((?:十一|十二|正|[二三四五六七八九十])+)月在?/g;
function parseThang(van, phanTich) {
  const b = bangRong(); const parts = van.split(RE_THANG); // ["", thangs, noiDung, thangs, noiDung…]
  for (let i = 1; i < parts.length; i += 2) for (const m of docThang(parts[i])) b[soThang2Chi(m)] = phanTich(parts[i + 1]);
  return b;
}
function parseMua(van, phanTich) {
  const b = bangRong(); const parts = van.split(/([春夏秋冬])/);
  for (let i = 1; i < parts.length; i += 2) for (const m of MUA[parts[i]]) b[m] = phanTich(parts[i + 1]);
  return b;
}
const dsChi = s => [...s].map(chiIdx);
const dsCan = s => [...s].map(canIdx);
const dsCanChi = s => { const r = []; for (let i = 0; i + 1 < s.length; i += 2) r.push(idx60(canIdx(s[i]), chiIdx(s[i + 1]))); return r; };
function bangQuyTac(batDau, huong, buoc) { const b = bangRong(); for (let k = 0; k < 12; k++) b[soThang2Chi(k + 1)] = [mod(chiIdx(batDau) + huong * buoc * k, 12)]; return b; }
const bangMoi = chis => bangRong().map(() => dsChi(chis));
const bangTruc = k => bangRong().map((_, m) => [mod(m + k, 12)]);
const HINH = { 子: "卯", 丑: "戌", 寅: "巳", 卯: "子", 辰: "辰", 巳: "申", 午: "午", 未: "丑", 申: "寅", 酉: "酉", 戌: "未", 亥: "亥" };
const bangHinh = () => bangRong().map((_, m) => [chiIdx(HINH[CHI[m]])]);
const kiemBang = (b, max, nhan) => { if (b.length !== 12) throw new Error("bảng thiếu " + nhan); b.forEach((x, m) => { if (!Array.isArray(x)) throw new Error("bảng lỗi " + nhan + " tháng " + m); x.forEach(v => { if (!Number.isInteger(v) || v < 0 || v >= max) throw new Error("giá trị lỗi " + nhan); }); }); return b; };

function dinhNghia(spec, nhan) {
  switch (spec.kieu) {
    case "truc": return { kieu: "truc", truc: spec.truc, bang: bangTruc(TRUC.indexOf(spec.truc)) };
    case "hoang-dao": return { kieu: "hoang-dao", than: spec.than, bang: kiemBang(bangQuyTac(spec.batDau, 1, 2), 12, nhan), quyTac: spec.quyTac };
    case "thang-chi": {
      let b;
      if (spec.van) b = parseThang(spec.van, dsChi); else if (spec.mua) b = parseMua(spec.mua, dsChi);
      else if (spec.quyTac) b = bangQuyTac(spec.quyTac.batDau, spec.quyTac.huong, spec.quyTac.buoc);
      else if (spec.moi) b = bangMoi(spec.moi); else if (spec.hinh) b = bangHinh();
      else if (spec.quyKy) { b = bangRong(); for (let m = 0; m < 12; m++) b[m] = [chiIdx(spec.quyKy[[2, 5, 8, 11].includes(m) ? 0 : [3, 6, 9, 0].includes(m) ? 1 : 2])]; }
      else if (spec.ghep) { b = bangRong(); for (const [thangs, van] of spec.ghep) { const bb = bangQuyTac(van.batDau, van.huong, van.buoc); for (const m of thangs) b[soThang2Chi(m)] = bb[soThang2Chi(m)]; } }
      return { kieu: "thang-chi", bang: kiemBang(b, 12, nhan), quyTac: spec.van || spec.mua || spec.moi || spec.quyKy || spec.mo };
    }
    case "thang-can": {
      let b; if (spec.van) b = parseThang(spec.van, dsCan); else if (spec.mua) b = parseMua(spec.mua, dsCan);
      else if (spec.tamHop) { b = bangRong(); for (const [chis, can] of spec.tamHop) for (const c of chis) b[chiIdx(c)] = [canIdx(can)]; }
      return { kieu: "thang-can", bang: kiemBang(b, 10, nhan), quyTac: spec.van || spec.mua || spec.mo };
    }
    case "thang-canchi": { const b = spec.van ? parseThang(spec.van, dsCanChi) : parseMua(spec.mua, dsCanChi); return { kieu: "thang-canchi", bang: kiemBang(b, 60, nhan), quyTac: spec.van || spec.mua }; }
    case "thang-can-hoac-chi": return { kieu: "thang-can-hoac-chi", bangCan: kiemBang(spec.bangCan, 10, nhan), bangChi: kiemBang(spec.bangChi, 12, nhan), quyTac: spec.quyTac };
    case "ngay-canchi": return { kieu: "ngay-canchi", ds: dsCanChi(spec.van), quyTac: spec.van };
    case "am-lich": return { kieu: "am-lich", ngay: spec.ngay };
    default: throw new Error("kieu lạ " + spec.kieu);
  }
}

// ---------- việc ----------
// han: các dạng chữ CÓ THẬT trong q10/q11 (kể cả dị thể). Tokenizer gộp dị thể về một dạng.
const BIEN_THE = { "宫": "宮", "劵": "券", "㑹": "會", "啟": "啓", "葢": "蓋", "壊": "壞", "産": "產", "逺": "遠", "廻": "迴", "䕶": "護", "徳": "德", "隂": "陰", "夘": "卯", "刼": "劫", "牀": "床", "乂": "又", "牆": "墻" };
const gop = s => [...s].map(c => BIEN_THE[c] || c).join("");
const VIEC = [
  { ma: "te-le", ten: "Cúng tế, giỗ chạp", han: ["祭祀"] },
  { ma: "cau-phuc", ten: "Cầu phúc, cầu an", han: ["祈福"] },
  { ma: "cau-tu", ten: "Cầu con", han: ["求嗣"] },
  { ma: "nop-don", ten: "Trình đơn từ, nộp hồ sơ lên cấp trên", han: ["上冊進表章", "上册進表章", "上表章", "上冊受封"] },
  { ma: "bo-nhiem", ten: "Nhận bổ nhiệm, thăng chức, nhận phong", han: ["施恩封拜", "襲爵受封"] },
  { ma: "khen-thuong", ten: "Khen thưởng, mừng tặng", han: ["慶賜", "賞賀", "慶賜賞賀"] },
  { ma: "tiec-tung", ten: "Tiệc tùng, họp mặt thân hữu", han: ["宴會", "宴㑹", "會親友", "㑹親友"] },
  { ma: "nhap-hoc", ten: "Nhập học, khai giảng", han: ["入學"] },
  { ma: "le-truong-thanh", ten: "Lễ trưởng thành (quan đái)", han: ["冠帶"] },
  { ma: "xuat-hanh", ten: "Xuất hành, đi xa", han: ["出行", "行幸遣使", "行幸", "遣使"] },
  { ma: "nhan-chuc", ten: "Nhậm chức, đi làm mới", han: ["上官赴任", "臨政親民", "上官"] },
  { ma: "dam-hoi", ten: "Dạm ngõ, ăn hỏi, đính ước", han: ["結婚姻", "納采問名"] },
  { ma: "cuoi-ga", ten: "Cưới gả", han: ["嫁娶"] },
  { ma: "nhan-nguoi", ten: "Nhận người (nhận con nuôi, tuyển người làm)", han: ["進人口"] },
  { ma: "nhap-trach", ten: "Về nhà mới, chuyển chỗ ở", han: ["般移", "移徙"] },
  { ma: "ve-nha-xa", ten: "Đi xa trở về nhà", han: ["遠迴", "逺廻"] },
  { ma: "an-sang", ten: "Kê giường, an sàng", han: ["安牀"] },
  { ma: "giai-tru", ten: "Giải trừ, trừ tà, giải hạn", han: ["解除"] },
  { ma: "tam-goi", ten: "Tắm gội, tẩy trần", han: ["沐浴"] },
  { ma: "cat-toc", ten: "Cắt tóc, làm móng, chỉnh dung", han: ["整容剃頭", "剃頭", "整容", "整手足甲"] },
  { ma: "chua-benh", ten: "Chữa bệnh, khám bệnh", han: ["求醫療病", "療病"] },
  { ma: "chua-mat", ten: "Chữa mắt", han: ["療目", "求醫療目"] },
  { ma: "cham-cuu", ten: "Châm cứu, tiểu phẫu", han: ["針刺"] },
  { ma: "cat-may", ten: "Cắt may quần áo", han: ["裁製", "裁衣"] },
  { ma: "xay-nha", ten: "Xây nhà mới", han: ["營建宮室", "營建宫室"] },
  { ma: "sua-nha", ten: "Sửa chữa nhà cửa", han: ["修宮室", "修宫室"] },
  { ma: "xay-tuong-rao", ten: "Xây tường bao, hàng rào", han: ["繕城郭"] },
  { ma: "dap-de", ten: "Đắp đê, xây kè", han: ["築隄防"] },
  { ma: "dong-tho", ten: "Động thổ, đào móng", han: ["興造動土", "修造動土", "修造"] },
  { ma: "thuong-luong", ten: "Dựng cột, cất nóc", han: ["豎柱上梁"] },
  { ma: "sua-kho", ten: "Xây sửa kho bãi", han: ["修倉庫"] },
  { ma: "duc-kim-loai", ten: "Đúc kim loại, nung luyện", han: ["鼓鑄"] },
  { ma: "lop-mai", ten: "Lợp mái", han: ["苫蓋", "苫葢"] },
  { ma: "det-may", ten: "Dệt vải, mắc cửi", han: ["經絡"] },
  { ma: "nau-ruou", ten: "Ủ rượu, làm tương", han: ["醞釀"] },
  { ma: "khai-truong", ten: "Khai trương, mở hàng", han: ["開市"] },
  { ma: "ky-ket", ten: "Ký kết, giao dịch", han: ["立劵交易", "立券", "交易"] },
  { ma: "nhan-tien", ten: "Thu tiền, nhận của", han: ["納財"] },
  { ma: "xuat-kho", ten: "Xuất kho, xuất tiền hàng", han: ["開倉庫出貨財", "開倉庫", "出貨財"] },
  { ma: "phong-sinh", ten: "Sửa soạn phòng sinh nở", han: ["修置產室", "修置産室", "置産室"] },
  { ma: "dao-gieng", ten: "Đào giếng, khơi mương", han: ["開渠穿井", "開渠", "穿井"] },
  { ma: "lap-may", ten: "Lắp cối xay, lắp đặt máy móc", han: ["安碓磑"] },
  { ma: "bit-lo", ten: "Trám vá tường, bịt lỗ hang", han: ["補垣塞穴", "補垣", "塞穴"] },
  { ma: "don-dep", ten: "Dọn dẹp, tổng vệ sinh nhà cửa", han: ["掃舍宇"] },
  { ma: "sua-tuong", ten: "Tô sửa tường rào", han: ["修飾垣墻", "修飾垣牆"] },
  { ma: "lam-duong", ten: "Làm đường, san nền", han: ["平治道塗"] },
  { ma: "pha-do", ten: "Phá dỡ nhà cửa, tường cũ", han: ["破屋壞垣", "破屋壊垣"] },
  { ma: "chat-cay", ten: "Chặt cây, đốn gỗ", han: ["伐木"] },
  { ma: "bat-giu", ten: "Bắt giữ, diệt trừ sâu bọ", han: ["捕捉"] },
  { ma: "san-ban", ten: "Săn bắn", han: ["畋獵"] },
  { ma: "danh-ca", ten: "Đánh cá", han: ["取魚"] },
  { ma: "di-thuyen", ten: "Đi thuyền, qua sông nước", han: ["乘船渡水"] },
  { ma: "trong-trot", ten: "Trồng trọt, gieo cấy", han: ["栽種", "修築園圃"] },
  { ma: "chan-nuoi", ten: "Chăn nuôi, mua gia súc", han: ["牧養", "納畜"] },
  { ma: "dao-huyet", ten: "Phá thổ, đào huyệt mộ", han: ["破土"] },
  { ma: "an-tang", ten: "An táng", han: ["安葬"] },
  { ma: "cai-tang", ten: "Cải táng, bốc mộ", han: ["啟攢", "啓攢"] },
  { ma: "kien-tung", ten: "Kiện tụng, nộp đơn kiện", han: ["陳詞訟"] },
  { ma: "an-than", ten: "An vị thần, lập bàn thờ", han: ["安神"] },
  { ma: "sua-nha-tho", ten: "Sửa từ đường, nhà thờ", han: ["修祠宇"] },
];
// Thuật ngữ có trong sách nhưng không ánh xạ sang việc đời nay (việc triều đình, quân sự) — chỉ để tokenizer nhận ra.
const HAN_KHONG_DUNG = ["頒詔", "覃恩", "肆赦", "詔命公卿", "招賢", "舉正直", "施恩惠", "恤孤惸", "宣政事", "布政事", "宣布政事", "行惠愛", "雪寃枉", "緩刑獄", "安撫邊境", "選將訓兵", "出師", "運謀算畫計策"];
const tuVung = new Map(); // dạng gộp → mã việc hoặc null
for (const v of VIEC) for (const h of v.han) {
  if (!nguon["10"].includes(h) && !nguon["11"].includes(h)) throw new Error(`Thuật ngữ ${h} (${v.ma}) không có trong q10/q11`);
  const g = gop(h); if (tuVung.has(g) && tuVung.get(g) !== v.ma) throw new Error("trùng thuật ngữ " + h); tuVung.set(g, v.ma);
}
for (const h of HAN_KHONG_DUNG) if (!tuVung.has(gop(h))) tuVung.set(gop(h), null);
const maxLen = Math.max(...[...tuVung.keys()].map(s => s.length));
function tokenize(s) {
  const t = gop(s).replace("冠行幸", "冠帶行幸"); const ma = [], han = [], du = []; let i = 0;
  while (i < t.length) {
    let ok = false;
    for (let L = Math.min(maxLen, t.length - i); L >= 2; L--) { const w = t.slice(i, i + L); if (tuVung.has(w)) { han.push(w); const m = tuVung.get(w); if (m && !ma.includes(m)) ma.push(m); i += L; ok = true; break; } }
    if (!ok) { du.push(t[i]); i++; }
  }
  return { ma, han, du: du.join("") };
}

// ---------- thần sát ----------
// q10: {td: tiêu đề mục trong q10 (đã bỏ khoảng trắng), lan, nenDong: tiền tố dòng lấy làm nên (mặc định dòng bắt đầu "宜"), kyDong: tiền tố dòng lấy làm kỵ (mặc định "忌"), kyNhu: mã thần sát khác}
const TS = [];
const them = o => TS.push(o);
const Q = (q, tu, den, lan) => ({ quyen: Number(q), trich: kiemTrich(q, cat(q, tu, den, lan), tu) });

// --- Cát thần ---
const KHON = { 坤: "申", 乾: "亥", 艮: "寅", 巽: "巳" };
{ // 天德: can ở tháng tứ mạnh/tứ quý, tứ duy ở tháng tứ trọng
  const van = "正月丁二月坤三月壬四月辛五月乾六月甲七月癸八月艮九月丙十月乙十一月巽十二月庚";
  const bangCan = bangRong(), bangChi = bangRong();
  for (const [, th, c] of van.matchAll(/((?:十一|十二|正|[二三四五六七八九十])+)月(.)/g)) { const m = soThang2Chi(docThang(th)[0]); if (KHON[c]) bangChi[m] = [chiIdx(KHON[c])]; else bangCan[m] = [canIdx(c)]; }
  them({ ma: "thien-duc", ten: "Thiên Đức", han: "天德", loai: "cát", dn: { kieu: "thang-can-hoac-chi", bangCan, bangChi, quyTac: van },
    nguon: Q("05", "堪輿經曰天徳者正月丁", "○"), q10: { td: "天德月德天德合月德合" },
    ghiChu: ["[I] Tháng tứ trọng (Mão, Ngọ, Dậu, Tý) sách ghi Thiên Đức ở quẻ Khôn, Càn, Cấn, Tốn (phương vị, không có can); quy về ngày Thân, Hợi, Dần, Tỵ là quy ước phổ biến, chưa đối chiếu được nguyên văn Hiệp kỷ."] });
}
them({ ma: "nguyet-duc", ten: "Nguyệt Đức", han: "月德", loai: "cát", dn: { kieu: "thang-can", van: "正五九月在丙二六十月在甲三七十一月在壬四八十二月在庚" }, nguon: Q("05", "歴例曰月徳者正五九月在丙", "○"), q10: { td: "天德月德天德合月德合" } });
them({ ma: "thien-duc-hop", ten: "Thiên Đức Hợp", han: "天德合", loai: "cát", dn: { kieu: "thang-can", van: "正月壬三月丁四月丙六月巳七月戊九月辛十月庚十二月乙" }, nguon: Q("05", "歴例曰天徳合者正月壬", "○"), q10: { td: "天德月德天德合月德合" }, ghiChu: ["Tháng tứ trọng không có Thiên Đức Hợp (四仲之月天徳居四維故無合也)."] });
them({ ma: "nguyet-duc-hop", ten: "Nguyệt Đức Hợp", han: "月德合", loai: "cát", dn: { kieu: "thang-can", van: "正五九月在辛二六十月在巳三七十一月在丁四八十二月在乙" }, nguon: Q("05", "歴例曰月徳合者正五九月在辛", "○"), q10: { td: "天德月德天德合月德合" } });
them({ ma: "nguyet-khong", ten: "Nguyệt Không", han: "月空", loai: "cát", dn: { kieu: "thang-can", tamHop: [[["寅", "午", "戌"], "壬"], [["亥", "卯", "未"], "庚"], [["申", "子", "辰"], "丙"], [["巳", "酉", "丑"], "甲"]], mo: "寅午戌月壬亥卯未月庚申子辰月丙巳酉丑月甲" }, nguon: Q("05", "厯例曰寅午戌月壬亥卯未月庚", "○"), q10: { td: "月空" } });
them({ ma: "thien-an", ten: "Thiên Ân", han: "天恩", loai: "cát", dn: { kieu: "ngay-canchi", van: "甲子乙丑丙寅丁卯戊辰己卯庚辰辛巳壬午癸未己酉庚戌辛亥壬子癸丑" }, nguon: Q("05", "歴例曰常以甲子至戊辰", "○"), q10: { td: "天恩" }, ghiChu: ["Sách ghi 甲子至戊辰、己卯至癸未、己酉至癸丑 凡一十五日; bảng ds liệt kê đủ 15 ngày đó."] });
them({ ma: "thien-xa", ten: "Thiên Xá", han: "天赦", loai: "cát", dn: { kieu: "thang-canchi", mua: "春戊寅夏甲午秋戊申冬甲子" }, nguon: Q("05", "歴例曰春戊寅夏甲午秋戊申冬甲子", "○"), q10: { td: "天赦" } });
them({ ma: "thien-nguyen", ten: "Thiên Nguyện", han: "天願", loai: "cát", dn: { kieu: "thang-canchi", van: "正月乙亥二月甲戌三月乙酉四月丙申五月丁未六月戊午七月己巳八月庚辰九月辛卯十月壬寅十一月癸丑十二月甲子" }, nguon: Q("05", "起例曰正月乙亥二月甲戌", "十二辰皆太陽也"), q10: { td: "天願" },
  ghiChu: ["Dùng bảng 起例 đã đính chính của Hiệp kỷ (正月乙亥…十二月甲子); bảng 歴例 cũ (正月甲午…) sách nói chép sai 13/24 chữ (傳寫謬誤二十四字中誤十三字). Q10 cũng dẫn 正月乙亥, 五月丁未, 十一月癸丑 làm Thiên Nguyện."] });
them({ ma: "nguyet-an", ten: "Nguyệt Ân", han: "月恩", loai: "cát", dn: { kieu: "thang-can", van: "正月丙二月丁三月庚四月巳五月戊六月辛七月壬八月癸九月庚十月乙十一月甲十二月辛" }, nguon: Q("05", "歴例曰月恩者正月丙", "○"), q10: { td: "月恩四相時德" } });
them({ ma: "tu-tuong", ten: "Tứ Tướng", han: "四相", loai: "cát", dn: { kieu: "thang-can", mua: "春丙丁夏戊巳秋壬癸冬甲乙" }, nguon: Q("05", "歴例曰春丙丁夏戊巳秋壬癸冬甲乙", "○"), q10: { td: "月恩四相時德" } });
them({ ma: "thoi-duc", ten: "Thời Đức", han: "時德", loai: "cát", dn: { kieu: "thang-chi", mua: "春午夏辰秋子冬寅" }, nguon: Q("05", "歴例曰春午夏辰秋子冬寅", "○"), q10: { td: "月恩四相時德" } });
const NGUON_VUONG = Q("05", "歴例曰王日者春寅夏巳秋申冬亥", "相日者");
them({ ma: "vuong-nhat", ten: "Vương Nhật", han: "王日", loai: "cát", dn: { kieu: "thang-chi", mua: "春寅夏巳秋申冬亥" }, nguon: NGUON_VUONG, q10: { td: "王日" },
  ghiChu: ["[I→V] Nguyên chú 歴例 ghi '今易為官日' (đời sau đổi Vương/Quan cho nhau); Hiệp kỷ bàn '細繹其理不如舊說為高' và giữ Vương Nhật = Dần Tỵ Thân Hợi (lâm quan), Q10 cũng nói 王日為臨官之辰. Theo Hiệp kỷ."] });
them({ ma: "quan-nhat", ten: "Quan Nhật", han: "官日", loai: "cát", dn: { kieu: "thang-chi", mua: "春卯夏午秋酉冬子" }, nguon: NGUON_VUONG, q10: { td: "官日守日相日" } });
them({ ma: "thu-nhat", ten: "Thủ Nhật", han: "守日", loai: "cát", dn: { kieu: "thang-chi", mua: "春辰夏未秋戌冬丑" }, nguon: Q("05", "又按歴例以春酉夏子秋卯冬午為守日", "\n"), q10: { td: "官日守日相日" },
  ghiChu: ["[I→V] 歴例 ghi Thủ Nhật = 春酉夏子秋卯冬午, nhưng Hiệp kỷ theo Thiệu Thái Cù cho rằng 守/牢 chép lẫn, đổi thành 春辰夏未秋戌冬丑 (今從之); Q10: 守日為四時旺土. Theo Hiệp kỷ."] });
them({ ma: "tuong-nhat", ten: "Tướng Nhật", han: "相日", loai: "cát", dn: { kieu: "thang-chi", mua: "春巳夏申秋亥冬寅" }, nguon: Q("05", "相日者春巳夏申秋亥冬寅", "民日者"), q10: { td: "官日守日相日" } });
them({ ma: "dan-nhat", ten: "Dân Nhật", han: "民日", loai: "cát", dn: { kieu: "thang-chi", mua: "春午夏酉秋子冬卯" }, nguon: Q("05", "民日者春午夏酉秋子冬卯", "守日者"), q10: { td: "民日" } });
{ const b = bangRong(); for (let m = 0; m < 12; m++) b[m] = [mod(m + 4, 12), mod(m + 8, 12)];
  them({ ma: "tam-hop", ten: "Tam Hợp", han: "三合", loai: "cát", dn: { kieu: "thang-chi", van: "正月在午戌二月在未亥三月在子申四月在丑酉五月在寅戌六月在夘亥七月在子辰八月在丑巳九月在寅午十月在夘未十一月在辰申十二月在巳酉" }, nguon: Q("06", "歴例曰正月在午戌二月在未亥", "○"), q10: { td: "三合" },
    ghiChu: ["[I] Nguyên văn 歴例 ghi 十二月在丑巳 (tháng Sửu không thể tam hợp với Sửu); theo 考原 '各與其月建㑹成三合局' nên sửa thành 巳酉. Bảng tính theo quy tắc tam hợp."], kiem: b }); }
them({ ma: "lam-nhat", ten: "Lâm Nhật", han: "臨日", loai: "cát", dn: { kieu: "thang-chi", van: "正月午二月亥三月申四月丑五月戌六月夘七月子八月巳九月寅十月未十一月辰十二月酉" }, nguon: Q("06", "歴例曰臨日者正月午", "○"), q10: { td: "臨日" } });
them({ ma: "dich-ma", ten: "Dịch Mã", han: "驛馬", loai: "cát", tenKhac: ["天后"], dn: { kieu: "thang-chi", quyTac: { batDau: "申", huong: -1, buoc: 3 }, mo: "正月起申逆行四孟" }, nguon: Q("06", "李鼎祚曰驛馬者正月起申逆行四孟", "○"), q10: { td: "驛馬" } });
them({ ma: "thien-hau", ten: "Thiên Hậu", han: "天后", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "申", huong: -1, buoc: 3 }, mo: "天后與驛馬同位" }, nguon: Q("06", "總要歴曰天后者月中福神也", "○"), q10: { td: "驛馬", nenDong: "又為天后宜" } });
them({ ma: "thien-ma", ten: "Thiên Mã", han: "天馬", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "午", huong: 1, buoc: 2 }, mo: "正月起午順行六陽辰" }, nguon: Q("06", "李鼎祚曰天馬者正月起午順行六陽辰", "○"), q10: { td: "天馬" } });
them({ ma: "thien-hy", ten: "Thiên Hỷ", han: "天喜", loai: "cát", dn: { kieu: "truc", truc: "Thành" }, nguon: Q("04", "選擇宗鏡曰天喜者正月戌二月亥三月子四月丑順輪十二月", "○"), q10: { td: "成日", nenDong: "又為天喜宜" } });
them({ ma: "thien-y", ten: "Thiên Y", han: "天醫", loai: "cát", dn: { kieu: "truc", truc: "Thành" }, nguon: Q("04", "厯例曰天醫者正月起戌順行十二辰", "○"), q10: { td: "成日", nenDong: "乂為天醫宜" } });
them({ ma: "luc-hop", ten: "Lục Hợp", han: "六合", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "亥", huong: -1, buoc: 1 }, mo: "正月在亥逆行十二辰" }, nguon: Q("06", "李鼎祚曰正月在亥逆行十二辰", "○"), q10: { td: "六合" } });
them({ ma: "ngu-phu", ten: "Ngũ Phú", han: "五富", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "亥", huong: 1, buoc: 3 }, mo: "正月起亥順行四孟" }, nguon: Q("06", "歴例曰正月起亥順行四孟", "○"), q10: { td: "五富" } });
them({ ma: "thien-thuong", ten: "Thiên Thương", han: "天倉", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "寅", huong: -1, buoc: 1 }, mo: "正月起寅逆行十二辰" }, nguon: Q("06", "歴例曰天倉者正月起寅逆行十二辰", "○"), q10: { td: "天倉" } });
them({ ma: "bat-tuong", ten: "Bất Tướng (Âm dương bất tướng)", han: "不將", loai: "cát", dn: { kieu: "thang-canchi", van: cat("04", "正月辛亥辛丑辛夘", "○") }, nguon: Q("04", "厯例曰隂陽不將者正月辛亥", "○"), q10: { td: "不將" } });
const CHIN_THAN = [
  ["yeu-an", "Yếu An", "要安", "正月寅二月申三月夘四月酉五月辰六月戌七月巳八月亥九月午十月子十一月未十二月丑", "歴例曰要安者正月寅", "要安敬安"],
  ["ngoc-vu", "Ngọc Vũ", "玉宇", "正月夘二月酉三月辰四月戌五月巳六月亥七月午八月子九月未十月丑十一月申十二月寅", "歴例曰正月夘二月酉三月辰四月戌", "玉宇金堂"],
  ["kim-duong", "Kim Đường", "金堂", "正月辰二月戌三月巳四月亥五月午六月子七月未八月丑九月申十月寅十一月酉十二月夘", "歴例曰正月辰二月戌三月巳四月亥", "玉宇金堂"],
  ["kinh-an", "Kính An", "敬安", "正月未二月丑三月申四月寅五月酉六月夘七月戌八月辰九月亥十月巳十一月子十二月午", "歴例曰敬安者正月未", "要安敬安"],
  ["pho-ho", "Phổ Hộ", "普護", "正月申二月寅三月酉四月夘五月戌六月辰七月亥八月巳九月子十月午十一月丑十二月未", "歴例曰普䕶者正月申", "普䕶福生聖心"],
  ["phuc-sinh", "Phúc Sinh", "福生", "正月酉二月夘三月戌四月辰五月亥六月巳七月子八月午九月丑十月未十一月寅十二月申", "歴例曰福生者正月酉", "普䕶福生聖心"],
  ["thanh-tam", "Thánh Tâm", "聖心", "正月亥二月巳三月子四月午五月丑六月未七月寅八月申九月夘十月酉十一月辰十二月戌", "歴例曰聖心者正月亥", "普䕶福生聖心"],
  ["ich-hau", "Ích Hậu", "益後", "正月子二月午三月丑四月未五月寅六月申七月夘八月酉九月辰十月戌十一月巳十二月亥", "歴例曰正月子二月午三月丑四月未", "益後續世"],
  ["tuc-the", "Tục Thế", "續世", "正月丑二月未三月寅四月申五月夘六月酉七月辰八月戌九月巳十月亥十一月午十二月子", "歴例曰續世者正月丑", "益後續世"],
];
for (const [ma, ten, han, van, tu, td] of CHIN_THAN) them({ ma, ten, han, loai: "cát", dn: { kieu: "thang-chi", van }, nguon: Q("06", tu, "○"), q10: { td } });
them({ ma: "giai-than", ten: "Giải Thần", han: "解神", loai: "cát", dn: { kieu: "thang-chi", van: "正二月申三四月戌五六月子七八月寅九十月辰十一十二月午" }, nguon: Q("05", "歴例曰正二月申三四月戌", "○"), q10: { td: "解神" } });
them({ ma: "tru-than", ten: "Trừ Thần", han: "除神", loai: "cát", dn: { kieu: "thang-chi", moi: "申酉" }, nguon: Q("05", "考原曰按通書以申酉日為除神", "\n"), q10: { td: "除神" } });
them({ ma: "ngu-hop", ten: "Ngũ Hợp", han: "五合", loai: "cát", dn: { kieu: "thang-chi", moi: "寅卯" }, nguon: Q("05", "歴例曰五合者寅夘日也", "○"), q10: { td: "五合" } });
them({ ma: "duong-duc", ten: "Dương Đức", han: "陽德", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "戌", huong: 1, buoc: 2 }, mo: "正月起戌順行六陽辰" }, nguon: Q("06", "歴例曰正月起戌順行六陽辰", "○"), q10: { td: "陽德隂德" } });
them({ ma: "am-duc", ten: "Âm Đức", han: "陰德", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "酉", huong: -1, buoc: 2 }, mo: "正月起酉逆行六隂辰" }, nguon: Q("06", "歴例曰正月起酉逆行六隂辰", "○"), q10: { td: "陽德隂德" } });
them({ ma: "luc-nghi", ten: "Lục Nghi", han: "六儀", loai: "cát", dn: { kieu: "thang-chi", quyTac: { batDau: "辰", huong: -1, buoc: 1 }, mo: "正月起辰逆行十二辰" }, nguon: Q("04", "神樞經曰六儀者月中吉神也", "○曹"), q10: { td: "六儀" } });
them({ ma: "minh-phe", ten: "Minh Phệ", han: "鳴吠", loai: "cát", dn: { kieu: "ngay-canchi", van: "庚午壬申癸酉壬午甲申乙酉庚寅丙申丁酉壬寅丙午己酉庚申辛酉" }, nguon: Q("05", "鳴吠日者庚午壬申癸酉", "○"), q10: { td: "鳴吠" } });
them({ ma: "minh-phe-doi", ten: "Minh Phệ Đối", han: "鳴吠對", loai: "cát", dn: { kieu: "ngay-canchi", van: "丙寅丁夘丙子辛夘甲午庚子癸夘壬子甲寅乙夘" }, nguon: Q("05", "鳴吠對日者丙寅丁夘丙子", "○"), q10: { td: "鳴吠對" }, ghiChu: ["考原 nghi 甲午 phải là 甲子 (恐傳者有誤); giữ nguyên bảng sách."] });
them({ ma: "mau-thuong", ten: "Mẫu Thương", han: "母倉", loai: "cát", dn: { kieu: "thang-chi", mua: "春亥子夏寅卯秋辰戌丑未冬申酉" }, nguon: Q("05", "歴例曰春亥子夏寅卯秋辰戌丑未冬申酉土王後巳午", "○"), q10: { td: "母倉" }, ghiChu: ["[I] Sách thêm '土王後巳午' (18 ngày cuối mỗi mùa lấy Tỵ Ngọ); bảng theo tháng tiết chưa thể hiện phần này."] });
them({ ma: "sinh-khi", ten: "Sinh Khí", han: "生氣", loai: "cát", tenKhac: ["時陽"], dn: { kieu: "truc", truc: "Khai" }, nguon: Q("04", "厯例曰生氣者常居月建後二辰", "○"), q10: { td: "開日", kyDong: "忌" }, ghiChu: ["Q11: 伐木, 畋獵, 取魚 忌生氣 — tức Sinh Khí có kỵ riêng; lấy dòng 忌 của mục 開日 (忌伐木畋獵取魚破土安葬啓攢) [I]."] });
them({ ma: "thien-vu", ten: "Thiên Vu", han: "天巫", loai: "cát", dn: { kieu: "truc", truc: "Mãn" }, nguon: Q("04", "總要厯曰天巫者月中善神也", "○曹"), q10: { td: "滿日", nenDong: "又為天巫宜" } });
them({ ma: "phuc-duc", ten: "Phúc Đức", han: "福德", loai: "cát", dn: { kieu: "truc", truc: "Mãn" }, nguon: Q("04", "厯例曰福德常居月建前二辰", "○"), q10: { td: "滿日", nenDong: "又為福德宜" } });
them({ ma: "cat-ky", ten: "Cát Kỳ", han: "吉期", loai: "cát", dn: { kieu: "truc", truc: "Trừ" }, nguon: Q("04", "總要厯曰吉期者吉慶之神也", "○曹"), q10: { td: "除日", nenDong: "又為吉期宜", trongDong: true } });
them({ ma: "thoi-am", ten: "Thời Âm", han: "時陰", loai: "cát", dn: { kieu: "truc", truc: "Định" }, nguon: Q("04", "厯例曰常居月建前四辰○曹震圭曰時隂者", "月内"), q10: { td: "定日", nenDong: "又為時隂宜" } });
// --- 12 trực ---
const TRUC_MUC = [["Kiến", "建日", 1, "cát"], ["Trừ", "除日", 1, "cát"], ["Mãn", "滿日", 1, "cát"], ["Bình", "平日", 1, "hung"], ["Định", "定日", 1, "cát"], ["Chấp", "執日", 1, "cát"], ["Phá", "破日", 1, "hung"], ["Nguy", "危日", 1, "cát"], ["Thành", "成日", 1, "cát"], ["Thu", "收日", 1, "hung"], ["Khai", "開日", 1, "cát"], ["Bế", "閉日", 1, "hung"]];
const TRUC_SLUG = { Kiến: "kien", Trừ: "tru", Mãn: "man", Bình: "binh", Định: "dinh", Chấp: "chap", Phá: "pha", Nguy: "nguy", Thành: "thanh", Thu: "thu", Khai: "khai", Bế: "be" };
const NGUON_TRUC = Q("04", "其法從月建上起建", "○");
for (const [truc, td, , loai] of TRUC_MUC) {
  const o = { ma: "truc-" + TRUC_SLUG[truc], ten: "Trực " + truc, han: td, loai, nhom: "trực", dn: { kieu: "truc", truc }, nguon: NGUON_TRUC, q10: { td } };
  if (["平日", "收日", "滿日", "閉日"].includes(td)) o.q10.kyLan = 2; // mục 忌 nằm ở lần xuất hiện thứ hai
  them(o);
}
// --- Hoàng đạo / hắc đạo (q07) ---
const HD = [["Thanh Long", "青龍", "子", "cát"], ["Minh Đường", "明堂", "丑", "cát"], ["Thiên Hình", "天刑", "寅", "hung"], ["Chu Tước", "朱雀", "卯", "hung"], ["Kim Quỹ", "金匱", "辰", "cát"], ["Thiên Đức", "寶光", "巳", "cát"], ["Bạch Hổ", "白虎", "午", "hung"], ["Ngọc Đường", "玉堂", "未", "cát"], ["Thiên Lao", "天牢", "申", "hung"], ["Huyền Vũ", "元武", "酉", "hung"], ["Tư Mệnh", "司命", "戌", "cát"], ["Câu Trần", "勾陳", "亥", "hung"]];
const NGUON_HD = Q("07", "李鼎祚曰青龍正月起子", "○");
for (const [than, han, batDau, loai] of HD) them({ ma: "hd-" + than.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/\s+/g, "-"), ten: than === "Thiên Đức" ? "Bảo Quang (Thiên Đức hoàng đạo)" : than, han, loai, nhom: loai === "cát" ? "hoàng đạo" : "hắc đạo",
  dn: { kieu: "hoang-dao", than, batDau, quyTac: `正月起${batDau}順行六${["子", "寅", "辰", "午", "申", "戌"].includes(batDau) ? "陽" : "隂"}辰` }, nguon: NGUON_HD, q10: { td: loai === "cát" ? "青龍明堂金匱寶光玉堂司命" : "天刑朱雀白虎天牢元武勾陳" } });

// --- Hung thần ---
them({ ma: "nguyet-kien", ten: "Nguyệt Kiến", han: "月建", loai: "hung", tenKhac: ["小時"], dn: { kieu: "truc", truc: "Kiến" }, nguon: Q("04", "厯例曰正月建寅順行十二辰", "○"), q10: { td: "月建" } });
them({ ma: "tho-phu-kien-nhat", ten: "Thổ Phủ", han: "土府", loai: "hung", dn: { kieu: "truc", truc: "Kiến" }, nguon: Q("04", "邵泰衢曰建為土府者猶言中府也", "按"), q10: { td: "月建", kyDong: "又為土府專忌" } });
them({ ma: "nguyet-pha", ten: "Nguyệt Phá", han: "月破", loai: "hung", dn: { kieu: "truc", truc: "Phá" }, nguon: Q("04", "考原曰月破者月建所衝之日也", "\n"), q10: { td: "月破" } });
them({ ma: "dai-hao", ten: "Đại Hao", han: "大耗", loai: "hung", dn: { kieu: "truc", truc: "Phá" }, nguon: Q("04", "厯例曰大耗者正月起申順行十二辰", "○"), q10: { td: "月破", kyDong: "又為大耗忌" } });
them({ ma: "nguyet-yem", ten: "Nguyệt Yếm", han: "月厭", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "戌", huong: -1, buoc: 1 }, mo: "正月在戌逆行十二辰" }, nguon: Q("04", "厯例曰月厭者正月在戌逆行十二辰", "○"), q10: { td: "月厭" } });
them({ ma: "dia-hoa", ten: "Địa Hỏa", han: "地火", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "戌", huong: -1, buoc: 1 }, mo: "正月起戌逆行十二辰" }, nguon: Q("04", "厯例曰地火者正月起戌逆行十二辰", "\n"), q10: { td: "月厭", kyDong: "又為地火忌" } });
them({ ma: "yem-doi", ten: "Yếm Đối", han: "厭對", loai: "hung", tenKhac: ["招搖"], dn: { kieu: "thang-chi", quyTac: { batDau: "辰", huong: -1, buoc: 1 }, mo: "正月起辰逆行十二辰" }, nguon: Q("04", "厯例曰厭對者正月起辰逆行十二辰", "\n"), q10: { td: "厭對" } });
them({ ma: "chieu-dao", ten: "Chiêu Dao", han: "招搖", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "辰", huong: -1, buoc: 1 }, mo: "厭對又為招搖" }, nguon: Q("04", "天寶厯曰厭對者月厭所衝之辰也其日忌嫁娶又為招搖忌乘船渡水", "○"), q10: { td: "厭對", kyDong: "又為招摇忌" } });
them({ ma: "kiep-sat", ten: "Kiếp Sát", han: "劫煞", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "亥", huong: -1, buoc: 3 }, mo: "正月起亥逆行四孟" }, nguon: Q("06", "李鼎祚曰正月起亥逆行四孟", "\n"), q10: { td: "刼煞" } });
them({ ma: "tai-sat", ten: "Tai Sát", han: "災煞", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "子", huong: -1, buoc: 3 }, mo: "正月起子逆行四仲" }, nguon: Q("06", "又按天獄正月起子順行四仲曹震圭以為天獄即是災煞應逆行四仲", "\n"), q10: { td: "災煞", kyNhu: "kiep-sat" },
  ghiChu: ["Bản Wikisource bỏ trống phần đầu mục 災煞 (q06); định nghĩa lấy từ lời án: Thiên Ngục tức Tai Sát, 正月起子逆行四仲 (Hiệp kỷ theo Tào Chấn Khuê). Q10 đối chiếu: 子午月值災煞 (月破), 卯酉月值災煞 (月破) khớp."] });
them({ ma: "thien-hoa", ten: "Thiên Hỏa", han: "天火", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "子", huong: 1, buoc: 3 }, mo: "正月在子順行四仲" }, nguon: Q("06", "歴例曰天火者正月在子順行四仲", "\n"), q10: { td: "災煞", kyDong: "又為天火忌" } });
them({ ma: "nguyet-sat", ten: "Nguyệt Sát", han: "月煞", loai: "hung", tenKhac: ["月虛"], dn: { kieu: "thang-chi", quyTac: { batDau: "丑", huong: -1, buoc: 3 }, mo: "正月起丑逆行四季" }, nguon: Q("06", "歴例曰月煞者正月起丑逆行四季", "\n"), q10: { td: "月煞", kyNhu: "kiep-sat" } });
them({ ma: "nguyet-hu", ten: "Nguyệt Hư", han: "月虛", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "丑", huong: -1, buoc: 3 }, mo: "正月起丑逆行四季" }, nguon: Q("06", "歴例曰月虚者正月起丑逆行四季", "按"), q10: { td: "月煞", kyDong: "又為月虛忌" } });
them({ ma: "nguyet-hinh", ten: "Nguyệt Hình", han: "月刑", loai: "hung", dn: { kieu: "thang-chi", hinh: true, mo: "子刑卯丑刑戌寅刑巳卯刑子巳刑申未刑丑申刑寅戌刑未辰午酉亥自刑" }, nguon: Q("03", "子刑夘丑刑戌寅刑己夘刑子巳刑申未刑丑申刑寅戌刑未辰午酉亥為自刑也", "○"), q10: { td: "月刑" },
  ghiChu: ["Q06 mục 月刑 chỉ ghi '按月刑之義與嵗刑同詳見嵗刑條下' (bảng bị bỏ trống trên Wikisource); quy tắc hình lấy ở q03 (歲刑). Đối chiếu Q10: 寅巳月月刑 trùng 平日, 卯丑戌月 trùng 收日, 辰酉亥月 trùng 建日, 子月 trùng 平日, 午月 trùng 月厭 — đều khớp bảng."] });
them({ ma: "nguyet-hai", ten: "Nguyệt Hại", han: "月害", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "巳", huong: -1, buoc: 1 }, mo: "正月起巳逆行十二辰" }, nguon: Q("06", "歴例曰正月起巳逆行十二辰", "○"), q10: { td: "月害" } });
them({ ma: "dai-thoi", ten: "Đại Thời", han: "大時", loai: "hung", tenKhac: ["大敗"], ghiChu: ["Nguyên văn q10 thiếu một chữ sau 冠 (ký hiệu SKchar 2917); đọc là 冠帶 theo các mục cùng mẫu (月破, 平日…)."], dn: { kieu: "thang-chi", quyTac: { batDau: "夘", huong: -1, buoc: 3 }, mo: "正月起夘逆行四仲" }, nguon: Q("06", "李鼎祚曰大時者正月起夘逆行四仲", "○"), q10: { td: "大時" } });
them({ ma: "dai-bai", ten: "Đại Bại", han: "大敗", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "夘", huong: -1, buoc: 3 }, mo: "大時又名大敗" }, nguon: Q("10", "按大時又名大敗為三合敗地", "寅"), q10: { td: "大時" } });
them({ ma: "ham-tri", ten: "Hàm Trì", han: "咸池", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "夘", huong: -1, buoc: 3 }, mo: "大時者咸池也" }, nguon: Q("06", "大時者咸池也小時者月建也", "○"), q10: { td: "大時", kyDong: "又為咸池忌" } });
them({ ma: "tieu-hao", ten: "Tiểu Hao", han: "小耗", loai: "hung", dn: { kieu: "truc", truc: "Chấp" }, nguon: Q("04", "厯例曰小耗者常居月建前五辰", "○"), q10: { td: "小耗" } });
them({ ma: "thien-tac", ten: "Thiên Tặc", han: "天賊", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "丑", huong: -1, buoc: 1 }, mo: "正月在丑逆行十二辰" }, nguon: Q("06", "李鼎祚曰天賊者正月在丑逆行十二辰", "○"), q10: { td: "天賊" } });
them({ ma: "tu-than", ten: "Tử Thần", han: "死神", loai: "hung", dn: { kieu: "truc", truc: "Bình" }, nguon: Q("04", "李鼎祚曰常居月建前三辰○曹震圭曰死神者", "以"), q10: { td: "平日", lan: 2, kyDong: "又為死神忌" } });
them({ ma: "tu-khi", ten: "Tử Khí", han: "死氣", loai: "hung", dn: { kieu: "truc", truc: "Định" }, nguon: Q("04", "李鼎祚曰死氣者常居月建前四辰", "○"), q10: { td: "死氣" } });
them({ ma: "du-hoa", ten: "Du Họa", han: "遊禍", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "巳", huong: -1, buoc: 3 }, mo: "正月起巳逆行四孟" }, nguon: Q("06", "李鼎祚曰遊禍者正月起巳逆行四孟", "○"), q10: { td: "遊禍" } });
them({ ma: "thien-lai", ten: "Thiên Lại", han: "天吏", loai: "hung", tenKhac: ["致死"], dn: { kieu: "thang-chi", quyTac: { batDau: "酉", huong: -1, buoc: 3 }, mo: "正月起酉逆行四仲" }, nguon: Q("06", "歴例曰天吏者正月起酉逆行四仲", "○"), q10: { td: "天吏" } });
them({ ma: "tri-tu", ten: "Trí Tử", han: "致死", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "酉", huong: -1, buoc: 3 }, mo: "天吏又名致死" }, nguon: Q("06", "按天吏者三合之死氣也故又為致死", "司"), q10: { td: "天吏" } });
them({ ma: "ngu-hu", ten: "Ngũ Hư", han: "五虛", loai: "hung", dn: { kieu: "thang-chi", mua: "春巳酉丑夏申子辰秋亥卯未冬寅午戌" }, nguon: Q("05", "厯例曰五虚者春巳酉丑夏申子辰秋亥卯未冬寅午戌也", "○"), q10: { td: "五虛" } });
them({ ma: "ngu-mo", ten: "Ngũ Mộ", han: "五墓", loai: "hung", dn: { kieu: "thang-canchi", van: "正二月乙未四五月丙戌七八月辛丑十十一月壬辰三六九十二月戊辰" }, nguon: Q("05", "歴例曰五墓者正二月乙未四五月丙戌七八月辛丑十月十一月壬辰四季月戊辰也", "○"), q10: { td: "五墓" }, ghiChu: ["Nguyên văn '十月十一月壬辰四季月戊辰' được viết lại thành dạng máy đọc '十十一月壬辰三六九十二月戊辰'."] });
them({ ma: "tu-kich", ten: "Tứ Kích", han: "四擊", loai: "hung", dn: { kieu: "thang-chi", mua: "春戌夏丑秋辰冬未" }, nguon: Q("05", "通書曰四擊者春戌夏丑秋辰冬未", "○"), q10: { td: "四擊" } });
them({ ma: "tu-hao", ten: "Tứ Hao", han: "四耗", loai: "hung", dn: { kieu: "thang-canchi", mua: "春壬子夏乙卯秋戊午冬辛酉" }, nguon: Q("05", "歴例曰春壬子夏乙卯秋戊午冬辛酉", "○"), q10: { td: "四耗" } });
them({ ma: "tu-phe", ten: "Tứ Phế", han: "四廢", loai: "hung", dn: { kieu: "thang-canchi", mua: "春庚申辛酉夏壬子癸亥秋甲寅乙卯冬丙午丁巳" }, nguon: Q("05", "歴例曰春庚申辛酉夏壬子癸亥秋甲寅乙卯冬丙午丁巳", "○"), q10: { td: "四廢" } });
them({ ma: "tu-ky", ten: "Tứ Kỵ", han: "四忌", loai: "hung", tenKhac: ["八龍", "七鳥", "九虎", "六蛇"], dn: { kieu: "thang-canchi", mua: "春甲子夏丙子秋庚子冬壬子" }, nguon: Q("05", "歴例曰春甲子乙亥為八龍夏丙子丁亥為七鳥秋庚子辛亥為九虎冬壬子癸亥為六蛇", "○"), q10: { td: "四忌四窮" }, ghiChu: ["Q10: 四忌四窮合為八龍七鳥九虎六蛇; Tứ Kỵ lấy các ngày Tý (甲子丙子庚子壬子), Tứ Cùng lấy các ngày Hợi."] });
them({ ma: "tu-cung", ten: "Tứ Cùng", han: "四窮", loai: "hung", dn: { kieu: "thang-canchi", mua: "春乙亥夏丁亥秋辛亥冬癸亥" }, nguon: Q("05", "歴例曰春乙亥夏丁亥秋辛亥冬癸亥", "○"), q10: { td: "四忌四窮", kyDong: ["忌", "四窮又忌"] } });
them({ ma: "ngu-ly", ten: "Ngũ Ly", han: "五離", loai: "hung", dn: { kieu: "thang-chi", moi: "申酉" }, nguon: Q("05", "歴例曰五離者申酉日是也", "○"), q10: { td: "五離" } });
them({ ma: "bat-chuyen", ten: "Bát Chuyên", han: "八專", loai: "hung", dn: { kieu: "ngay-canchi", van: "丁未己未庚申甲寅癸丑" }, nguon: Q("05", "曾門經曰八專日忌出軍嫁娶丁未己未庚申甲寅癸丑也", "\n"), q10: { td: "八專" } });
them({ ma: "vang-vong", ten: "Vãng Vong", han: "往亡", loai: "hung", dn: { kieu: "thang-chi", van: "正月在寅二月在巳三月在申四月在亥五月在夘六月在午七月在酉八月在子九月在辰十月在未十一月在戌十二月在丑" }, nguon: Q("06", "歴例曰徃亡者正月在寅", "○"), q10: { td: "徃亡氣徃亡" } });
them({ ma: "quy-ky", ten: "Quy Kỵ", han: "歸忌", loai: "hung", dn: { kieu: "thang-chi", quyKy: "丑寅子" }, nguon: Q("06", "歴例曰孟月丑仲月寅季月子", "○"), q10: { td: "歸忌" } });
them({ ma: "huyet-chi", ten: "Huyết Chi", han: "血支", loai: "hung", dn: { kieu: "truc", truc: "Bế" }, nguon: Q("04", "樞要經曰血支其日忌針刺出血", "○"), q10: { td: "閉日", lan: 2, kyDong: "又為血支專忌" } });
them({ ma: "tho-phu", ten: "Thổ Phù", han: "土符", loai: "hung", dn: { kieu: "thang-chi", van: "正月丑二月巳三月酉四月寅五月午六月戌七月夘八月未九月亥十月辰十一月申十二月子" }, nguon: Q("06", "歴例曰土符者正月丑", "○"), q10: { td: "土符地囊" } });
them({ ma: "dia-nang", ten: "Địa Nang", han: "地囊", loai: "hung", dn: { kieu: "thang-canchi", van: "正月庚子庚午二月癸未癸丑三月甲子甲寅四月己夘己丑五月戊辰戊午六月癸未癸巳七月丙寅丙申八月丁夘丁巳九月戊辰戊子十月庚戌庚子十一月辛未辛酉十二月乙酉乙未" }, nguon: Q("06", "歴例曰地囊者正月庚子庚午", "○"), q10: { td: "土符地囊" } });
them({ ma: "cuu-khong", ten: "Cửu Không", han: "九空", loai: "hung", dn: { kieu: "thang-chi", quyTac: { batDau: "辰", huong: -1, buoc: 3 }, mo: "正月在辰逆行四季" }, nguon: Q("05", "歴例曰九空者正月在辰逆行四季", "○"), q10: { td: "九空" } });
const CUU_KHAM = { ghep: [[[1, 2, 3, 4], { batDau: "辰", huong: -1, buoc: 3 }], [[5, 6, 7, 8], { batDau: "卯", huong: -1, buoc: 3 }], [[9, 10, 11, 12], { batDau: "寅", huong: -1, buoc: 3 }]], mo: "正月在辰逆行四季五月在卯逆行四仲九月在寅逆行四孟" };
// ghép: với tháng 5-8 bắt đầu từ 卯 ở tháng 5 (k=4) → dùng công thức riêng
function bangCuuKham() { const b = bangRong(); const dau = [["辰", 1], ["卯", 5], ["寅", 9]]; for (let m = 1; m <= 12; m++) { const [c, m0] = dau[Math.floor((m - 1) / 4)]; b[soThang2Chi(m)] = [mod(chiIdx(c) - 3 * (m - m0), 12)]; } return b; }
them({ ma: "cuu-kham", ten: "Cửu Khảm", han: "九坎", loai: "hung", dn: { kieu: "thang-chi", bangSan: bangCuuKham(), mo: CUU_KHAM.mo }, nguon: Q("05", "歴例曰九坎者正月在辰逆行四季五月在卯逆行四仲九月在寅逆行四孟", "○"), q10: { td: "九坎" } });
them({ ma: "cuu-tieu", ten: "Cửu Tiêu", han: "九焦", loai: "hung", dn: { kieu: "thang-chi", bangSan: bangCuuKham(), mo: CUU_KHAM.mo }, nguon: Q("05", "歴例曰正月在辰逆行四季五月在卯逆行四仲九月在寅逆行四孟", "○"), q10: { td: "九坎", kyDong: "又為九焦忌" } });
them({ ma: "trung-nhat", ten: "Trùng Nhật", han: "重日", loai: "hung", dn: { kieu: "thang-chi", moi: "巳亥" }, nguon: Q("05", "歴例曰重日者己亥二日也", "○"), q10: { td: "復日重日" } });
them({ ma: "phuc-nhat", ten: "Phục Nhật", han: "復日", loai: "hung", dn: { kieu: "thang-can", van: "正七月甲庚二八月乙辛四十月丙壬五十一月丁癸三九六十二月戊巳" }, nguon: Q("05", "歴例曰復日者正七月甲庚", "○"), q10: { td: "復日重日" }, ghiChu: ["Q10: 復日又宜裁製 — Phục Nhật có một việc nên riêng (cắt may)."] });
them({ ma: "nguyet-ky-nhat", ten: "Nguyệt Kỵ Nhật", han: "月忌日", loai: "hung", dn: { kieu: "am-lich", ngay: [5, 14, 23] }, nguon: Q("06", "齊東野語曰俗以每月初五十四二十三日為月忌", "○"), q10: { td: "月忌日", nenDong: "止註", trongDong: true }, chiChu: true,
  ghiChu: ["Sách xếp vào loại 'chỉ chú một số việc' (止註祭祀宴會沐浴…餘事不註) chứ không phải đại hung; nen lấy từ danh sách 止註."] });
them({ ma: "vo-loc-nhat", ten: "Vô Lộc Nhật (Thập ác đại bại)", han: "無祿日", loai: "hung", tenKhac: ["十惡大敗日"], dn: { kieu: "ngay-canchi", van: "甲辰乙巳庚辰辛巳丙申戊戌丁亥己丑壬申癸亥" }, nguon: Q("05", "通書云甲辰乙巳庚辰辛巳丙申戊戌丁亥己丑壬申癸亥此十日禄皆落空故云無禄", "如"), q10: { td: "無禄日", nenDong: "止註", trongDong: true }, chiChu: true,
  ghiChu: ["Q10 nêu nhiều ngoại lệ theo năm/tiết khí (歲月填實禄空, 太陽填實…) chưa mã hoá; nen lấy từ danh sách 止註."] });
them({ ma: "nhan-than-so-tai", ten: "Nhân Thần Sở Tại", han: "人神所在日", loai: "hung", dn: { kieu: "am-lich", ngay: [1, 6, 12, 15, 19, 21, 23] }, nguon: Q("10", "十二日在髮際十五日在徧身忌剃頭", "\n"), q10: { td: "人神所在日", kyVan: "剃頭整手足甲" },
  ghiChu: ["[I] Sách tách: 12, 15 kỵ cạo đầu; 1, 6, 15, 19, 21, 23 kỵ cắt móng. Vì việc 'cat-toc' gộp cả hai nên bảng ngày là hợp của hai nhóm."] });
them({ ma: "muoi-lam-nhat", ten: "Ngày rằm (十五日)", han: "十五日", loai: "hung", dn: { kieu: "am-lich", ngay: [15] }, nguon: Q("10", "義同朢日", "\n"), q10: { td: "十五日" } });

// ---------- dựng kết quả ----------
const ra = [], loi = [], duLieu = [];
const bangMa = new Map();
for (const o of TS) {
  const nhan = o.ma;
  let dn;
  if (o.dn.bangSan) dn = { kieu: "thang-chi", bang: kiemBang(o.dn.bangSan, 12, nhan), quyTac: o.dn.mo }; else dn = dinhNghia(o.dn, nhan);
  if (o.kiem && JSON.stringify(o.kiem.map(x=>[...x].sort((a,b)=>a-b))) !== JSON.stringify(dn.bang.map(x=>[...x].sort((a,b)=>a-b)))) throw new Error("bảng không khớp kiểm " + nhan);
  const muc = mucQ10(o.q10.td, o.q10.lan || 1);
  let trichNghiKy = muc.trich.slice();
  if (o.q10.kyLan) trichNghiKy = trichNghiKy.concat(mucQ10(o.q10.td, o.q10.kyLan).trich);
  const nenDong = o.q10.nenDong, kyDongs = o.q10.kyDong ? [].concat(o.q10.kyDong) : null;
  let nenVan = "", kyVan = "";
  for (const l of trichNghiKy) {
    if (nenDong) { const i = l.indexOf(nenDong); if (i >= 0) { nenVan += l.slice(i + nenDong.length).split(/又|忌|與|(?:十一|十二|正|[二三四五六七八九十])月/)[0]; } }
    else if (l.startsWith("宜") && !nenVan) nenVan = l.slice(1).split(/又為|忌|與|(?:十一|十二|正|[二三四五六七八九十])月/)[0];
    if (kyDongs) { for (const k of kyDongs) { const i = l.indexOf(k); if (i >= 0 && (i === 0 || k !== "忌")) kyVan += l.slice(i + k.length).split(/[○又與正]/)[0]; } }
    else if (l.startsWith("忌") && !kyVan) { kyVan = l.slice(1).split(/[○與]|正月建日/)[0]; if (kyVan.startsWith("同")) kyVan = ""; }
    else if (!kyVan && l.includes("忌") && l.startsWith("宜")) { kyVan = l.split("忌")[1] || ""; }
  }
  if (o.q10.kyVan) kyVan = o.q10.kyVan;
  if (o.q10.trongDong && nenDong) { const l = trichNghiKy.find(x => x.includes(nenDong)); nenVan = l.slice(l.indexOf(nenDong) + nenDong.length).split("餘事不註")[0]; }
  const nenT = tokenize(nenVan), kyT = tokenize(kyVan);
  if (nenT.du || kyT.du) loi.push(`${o.ma}: chữ chưa ánh xạ nen="${nenT.du}" ky="${kyT.du}"`);
  const it = { ma: o.ma, ten: o.ten, han: o.han, loai: o.loai };
  if (o.nhom) it.nhom = o.nhom; if (o.tenKhac) it.tenKhac = o.tenKhac; if (o.chiChu) it.chiChu = true;
  it.dinhNghia = dn; it.nguon = o.nguon; it.nen = nenT.ma; it.ky = kyT.ma; it.nenHan = nenT.han; it.kyHan = kyT.han;
  it.trichNghiKy = trichNghiKy; if (muc.binhLuan) it.binhLuan = muc.binhLuan; if (o.ghiChu) it.ghiChu = o.ghiChu;
  if (o.q10.kyNhu) it.kyNhu = o.q10.kyNhu;
  if (bangMa.has(o.ma)) throw new Error("trùng mã " + o.ma); bangMa.set(o.ma, it);
  ra.push(it);
}
for (const it of ra) if (it.kyNhu) { const g = bangMa.get(it.kyNhu); it.ky = [...new Set([...g.ky, ...it.ky])]; it.kyHan = [...new Set([...g.kyHan, ...it.kyHan])]; }
for (const it of ra) for (const s of it.trichNghiKy.concat(it.binhLuan ? [it.binhLuan] : [])) kiemTrich("10", s, it.ma);
if (loi.length) { console.error(loi.join("\n")); }

// ---------- nguyên tắc ----------
const nguyenTac = [
  { quyen: 10, cau: cat("10", "易傳曰爻彖以情言吉凶以情遷", "\n") },
  { quyen: 10, cau: cat("10", "又按舊本凡吉神遇凶煞皆從忌而不從宜", "\n") },
  { quyen: 10, cau: cat("10", "按選擇宗鏡曰建破平收俗之所忌惟破日最凶建日吉多可用", "舊忌") },
  { quyen: 10, cau: cat("10", "按六黃道以位置得宜為吉", "\n") },
  { quyen: 11, cau: cat("11", "選擇用事宜忌備矣", "\n") },
  { quyen: 11, cau: cat("11", "御用六十七事民用三十七事通書載選擇六十事", "\n") },
  { quyen: 11, cau: cat("11", "右用事與宜忌相為經緯", "\n") },
];
{ // 鋪註條例: mọi dòng từ tiêu đề đến hết
  const i = q10Lines.indexOf("鋪註條例"); for (let k = i + 1; k < q10Lines.length; k++) { const l = q10Lines[k]; if (!l || l.startsWith("欽定協紀辨方書卷十") || l.startsWith("子部")) { if (l.startsWith("欽定")) break; continue; } nguyenTac.push({ quyen: 10, cau: l, muc: "鋪註條例" }); } }
for (const n of nguyenTac) kiemTrich(String(n.quyen).padStart(2, "0"), n.cau, "nguyenTac");

const thieu = [
  { han: "血忌", ly: "Quyển 6 mục lục có 血忌 (sau 續世) nhưng bản Wikisource bỏ trống đoạn đó (dòng 447–465 rỗng), không có bảng tháng; Q11 chỉ ghi 針刺忌血支血忌. Không bịa." },
  { han: "荒蕪", ly: "Không xuất hiện trong các quyển đã tải (03, 04, 05, 06, 07, 08, 10, 11, 36)." },
  { han: "天狗", ly: "Q4 định nghĩa 常居月建前二辰 (trùng Mãn nhật) nhưng Q10 ghi '申月又為天狗忌祭祀', Q11 ghi '祭祀忌天狗寅日' — ba chỗ không nhất quán, chưa xác định được ngày; để UNKNOWN." },
  { han: "氣往亡", ly: "Tính theo số ngày sau tiết khí (立春後七日…), không thuộc các kiểu dữ liệu theo tháng; chưa mã hoá." },
  { han: "四離四絶 上朔 晦日 伏社 朔弦望 土王用事 長星短星 百忌日 反支 二至二分", ly: "Phụ thuộc tiết khí, ngày sóc hoặc can/chi ngày riêng lẻ; Q10 xếp vào nhóm 'mỗi năm khác nhau, nguyệt biểu không ghi'; chưa mã hoá (có thể bổ sung sau)." },
  { han: "兵福 兵寶 兵吉 兵禁 大煞 專日 伐日 寶日 義日 制日 觸水龍 八風 天獄", ly: "Thần sát quân sự hoặc chỉ kỵ đi thuyền; không ánh xạ sang việc đời nay nên tạm bỏ qua." },
];

const out = { phienBan: "1.0", ngayLap: "2026-10-24", nguonGoc: "Khâm định Hiệp kỷ biện phương thư (欽定協紀辨方書), bản Tứ khố toàn thư trên zh.wikisource; file nguon/hiep-ky-qNN.txt",
  quyUoc: "chi 0 = Tý … 11 = Hợi; can 0 = Giáp … 9 = Quý; chỉ số 60 can chi: 0 = Giáp Tý … 59 = Quý Hợi; bảng tháng 12 phần tử theo chiThang (tháng TIẾT KHÍ), chiThang 2 = Dần = tháng Giêng. Kiểu định nghĩa: thang-chi (bang[chiThang] = mảng chi ngày), thang-can (mảng can ngày), thang-canchi (mảng chỉ số 60), thang-can-hoac-chi (khớp can HOẶC chi), truc, hoang-dao (bang: chi ngày theo tháng), ngay-canchi (ds chỉ số 60), am-lich (ngày âm). Chuẩn hoá khi dò trích dẫn: giữ chữ trong {{SK anchor|…}}, bỏ mọi {{…}} khác, bỏ thẻ, khoảng trắng, dấu câu.",
  viec: VIEC, hanKhongDung: HAN_KHONG_DUNG, thanSat: ra, nguyenTac, thieu };
const js = `// Thần sát theo Khâm định Hiệp kỷ biện phương thư — dữ liệu sinh bằng script gen-than-sat.mjs từ nguon/hiep-ky-qNN.txt, ngày 2026-10-24.
// KHÔNG sửa tay: mọi chuỗi trong trich/trichNghiKy/binhLuan/nguyenTac phải dò được trong file nguồn (kiểm bằng tools/kiem-tra-than-sat.mjs).
// Nạp trong trình duyệt: window.XN_THAN_SAT. Nạp bằng vm/node: đọc biến XN_THAN_SAT.
var XN_THAN_SAT = ${JSON.stringify(out, null, 1)};
if (typeof window !== "undefined") window.XN_THAN_SAT = XN_THAN_SAT;
`;
writeFileSync(join(DIR, "data", "than-sat.js"), js, "utf8");
console.log(`Đã ghi data/than-sat.js: ${ra.length} thần sát (cát ${ra.filter(x => x.loai === "cát").length}, hung ${ra.filter(x => x.loai === "hung").length}), ${VIEC.length} việc, ${nguyenTac.length} câu nguyên tắc, ${thieu.length} mục thiếu`);
for (const it of ra) console.log(it.ma.padEnd(18), "nen:", it.nen.join(",") || "-", "| ky:", it.ky.join(",") || "-");
