// Tải wikitext các nguồn công cộng dùng trong loạt bài "Cõi tạm" từ Wikisource (zh, vi) qua MediaWiki API.
// Lưu vào nguon/<slug>.txt, dòng đầu ghi URL. Gom nhiều trang vào một yêu cầu cho mỗi wiki, nghỉ giữa hai yêu cầu
// để không bị giới hạn (HTTP 429). Chạy: node tools/tai-nguon.mjs            (tải toàn bộ danh sách)
//                                   node tools/tai-nguon.mjs "vi:Thị đệ tử"  (tải vài trang chỉ định, wiki:tên trang)
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "nguon");
mkdirSync(OUT, { recursive: true });

// [wiki, tên trang, slug file]. Trang 法句經 trên zh.wikisource chỉ có bản giản thể (toàn bộ các phẩm nằm trong một trang).
// Trang Truyện Kiều chứa trọn 3254 câu. Trang "Tác gia:" chỉ là mục lục, tải để biết tên bài rồi tải bài lẻ.
const MAC_DINH = [
  ["zh", "春夜宴從弟桃花園序", "zh-ly-bach-xuan-da-yen"],
  ["zh", "法句經", "zh-phap-cu-kinh"],
  ["zh", "菜根譚", "zh-thai-can-dam"],
  ["zh", "金剛般若波羅蜜經 (鳩摩羅什)", "zh-kim-cang-kinh"],
  ["vi", "Truyện Kiều", "vi-truyen-kieu"],
  ["vi", "Thị đệ tử", "vi-van-hanh-thi-de-tu"],
  ["vi", "Tác gia:Trần Thái Tông", "vi-tac-gia-tran-thai-tong"],
  ["vi", "Sơ nhật vô thường kệ", "vi-tran-thai-tong-so-nhat"],
  ["vi", "Thử thời vô thường kệ", "vi-tran-thai-tong-thu-thoi"],
  ["vi", "Tác gia:Nguyễn Công Trứ", "vi-tac-gia-nguyen-cong-tru"],
  // Trang tác gia Nguyễn Công Trứ không có bài "Vịnh nhân sinh" (xem 24/10/2026); tải các bài cùng chủ đề để chọn thay.
  ["vi", "Vịnh nhân sinh", "vi-nguyen-cong-tru-vinh-nhan-sinh"],
  ["vi", "Chơi xuân kẻo hết xuân đi", "vi-nguyen-cong-tru-choi-xuan"],
  ["vi", "Vịnh sự đời", "vi-nguyen-cong-tru-vinh-su-doi"],
  ["vi", "Trò đời", "vi-nguyen-cong-tru-tro-doi"],
  ["vi", "Nhân tình thế thái", "vi-nguyen-cong-tru-nhan-tinh-the-thai"],
  ["vi", "Chữ nhàn", "vi-nguyen-cong-tru-chu-nhan"],
  ["vi", "Cách ở đời", "vi-nguyen-cong-tru-cach-o-doi"],
  ["vi", "Thoát vòng danh lợi", "vi-nguyen-cong-tru-thoat-vong-danh-loi"],
  ["vi", "Vinh nhục", "vi-nguyen-cong-tru-vinh-nhuc"],
  ["vi", "Khuyên người đời", "vi-nguyen-cong-tru-khuyen-nguoi-doi"],
  // Bài 4–6 (tải 24/10/2026). Trang 好了歌 chỉ là bản nhúng (#lst) từ hồi 1 Hồng Lâu Mộng nên tải trang hồi 1.
  ["zh", "前赤壁賦", "zh-to-thuc-tien-xich-bich-phu"],
  ["zh", "莊子/知北遊", "zh-trang-tu-tri-bac-du"],
  ["zh", "莊子/至樂", "zh-trang-tu-chi-lac"],
  ["zh", "紅樓夢/第001回", "zh-hong-lau-mong-hoi-01"],
  ["vi", "Cáo tật thị chúng", "vi-man-giac-cao-tat-thi-chung"],
  ["vi", "Tác gia:Cao Bá Quát", "vi-tac-gia-cao-ba-quat"],
  ["vi", "Sa hành đoản ca", "vi-cao-ba-quat-sa-hanh-doan-ca"],
  ["vi", "Nhân sinh nghịch lữ", "vi-cao-ba-quat-nhan-sinh-nghich-lu"],
  ["vi", "Tác gia:Tản Đà", "vi-tac-gia-tan-da"],
  ["vi", "Cảm thu tiễn thu", "vi-tan-da-cam-thu-tien-thu"],
  ["vi", "Thăm mả cũ bên đường", "vi-tan-da-tham-ma-cu-ben-duong"],
  ["vi", "Tác gia:Nguyễn Bỉnh Khiêm", "vi-tac-gia-nguyen-binh-khiem"],
  ["vi", "Nhàn", "vi-nguyen-binh-khiem-nhan"],
  ["vi", "Cảnh nhàn", "vi-nguyen-binh-khiem-canh-nhan"],
  ["vi", "Nhân tình thế thái (Nguyễn Bỉnh Khiêm)", "vi-nguyen-binh-khiem-nhan-tinh-the-thai"],
];

const slugOf = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
  .replace(/[^A-Za-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
const nghi = ms => new Promise(r => setTimeout(r, ms));

const yeuCau = process.argv.slice(2);
const DS = yeuCau.length
  ? yeuCau.map(s => { const m = s.match(/^(zh|vi):(.+)$/); return m ? [m[1], m[2], `${m[1]}-${slugOf(m[2])}`] : ["vi", s, "vi-" + slugOf(s)]; })
  : MAC_DINH;

async function taiNhom(wiki, items) {       // items: [[title, slug], ...] tối đa 50
  const api = `https://${wiki}.wikisource.org/w/api.php`;
  const q = new URLSearchParams({ action: "query", prop: "revisions", rvprop: "content", rvslots: "main", format: "json",
    formatversion: "2", redirects: "1", titles: items.map(x => x[0]).join("|") });
  let res;
  for (let lan = 0; ; lan++) {                 // bị giới hạn (429): nghỉ 30 s rồi thử lại, tối đa 3 lần
    res = await fetch(`${api}?${q}`, { headers: { "User-Agent": "CoiTamOffline/0.1 (personal study tool; contact via vi.wikisource talk)" } });
    if (res.status !== 429 || lan >= 3) break;
    console.log(`  ${wiki}: HTTP 429, nghỉ 30 s rồi thử lại (${lan + 1}/3)`);
    await nghi(30000);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // Lần ngược chuẩn hoá / chuyển hướng để gắn đúng slug cho tên trang trả về
  const nguoc = {};
  for (const x of data.query.normalized || []) nguoc[x.to] = x.from;
  for (const x of data.query.redirects || []) nguoc[x.to] = nguoc[x.from] || x.from;
  const slugCua = Object.fromEntries(items);
  const ok = [], thieu = [];
  for (const p of data.query.pages) {
    const goc = nguoc[p.title] || p.title;
    const slug = slugCua[goc] || slugCua[p.title] || `${wiki}-${slugOf(p.title)}`;
    if (p.missing || !p.revisions) { thieu.push(`${wiki}:${goc} (không có trang)`); continue; }
    const text = p.revisions[0].slots.main.content;
    const url = `https://${wiki}.wikisource.org/wiki/${encodeURI(p.title.replace(/ /g, "_"))}`;
    writeFileSync(join(OUT, slug + ".txt"), `# ${p.title} — nguồn: ${url}\n` + text, "utf8");
    ok.push(`${slug}.txt ← ${p.title} (${text.length} ký tự)`);
  }
  return { ok, thieu };
}

const ok = [], thieu = [];
for (const wiki of ["zh", "vi"]) {
  const items = DS.filter(x => x[0] === wiki).map(x => [x[1], x[2]]);
  for (let i = 0; i < items.length; i += 50) {
    if (ok.length || thieu.length) await nghi(4000);
    try { const r = await taiNhom(wiki, items.slice(i, i + 50)); ok.push(...r.ok); thieu.push(...r.thieu); }
    catch (e) { thieu.push(`${wiki}: ${items.slice(i, i + 50).map(x => x[0]).join(", ")} — ${e.message}`); }
  }
}
console.log("Đã tải:\n  " + ok.join("\n  "));
if (thieu.length) console.log("Không tải được:\n  " + thieu.join("\n  "));
