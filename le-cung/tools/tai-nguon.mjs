// Tải nguyên văn các nguồn công cộng cho cẩm nang "Lễ cúng" từ Wikisource (vi, zh) qua MediaWiki API.
// Các trang con của Việt Nam phong tục chỉ chứa thẻ <pages index=... /> (nhúng từ không gian Trang:), nên không lấy
// wikitext mà lấy bản đã dựng (action=parse, prop=text) rồi bóc thẻ HTML về văn bản thuần.
// Lưu nguon/<slug>.txt, dòng đầu ghi URL. Nghỉ 5 s giữa hai yêu cầu; gặp HTTP 429 nghỉ 30 s rồi thử lại (tối đa 3 lần).
// Chạy: node tools/tai-nguon.mjs                 (toàn bộ danh sách)
//       node tools/tai-nguon.mjs "vi:Việt Nam phong tục/I.4"   (một hay vài trang chỉ định)
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "nguon");
mkdirSync(OUT, { recursive: true });
const NGHI_MS = 5000, NGHI_429_MS = 30000;

// [wiki, tên trang, slug]. Mã I.x / II.x / III.x lấy từ mục lục trang Việt_Nam_phong_tục (xem 25/10/2026).
const VNPT = "Việt Nam phong tục/";
const MAC_DINH = [
  ["vi", VNPT + "I.4", "vnpt-i04-phung-su-to-ton"],
  ["vi", VNPT + "I.6", "vnpt-i06-thuong-tho"],
  ["vi", VNPT + "I.7", "vnpt-i07-sinh-nhat"],
  ["vi", VNPT + "I.8", "vnpt-i08-than-hoang"],
  ["vi", VNPT + "I.9", "vnpt-i09-tang-ma"],
  ["vi", VNPT + "I.10", "vnpt-i10-cai-tang"],
  ["vi", VNPT + "I.11", "vnpt-i11-ky-nhat"],
  ["vi", VNPT + "I.12", "vnpt-i12-tu-thoi-tiet-lap"],
  ["vi", VNPT + "I.13", "vnpt-i13-gia-thu"],
  ["vi", VNPT + "I.16", "vnpt-i16-cau-tu"],
  ["vi", VNPT + "II.1", "vnpt-ii01-su-than"],
  ["vi", VNPT + "II.2", "vnpt-ii02-viec-te-tu"],
  ["vi", VNPT + "II.5", "vnpt-ii05-le-ky-an"],
  ["vi", VNPT + "II.24", "vnpt-ii24-viec-hieu"],
  ["vi", VNPT + "II.25", "vnpt-ii25-viec-hi"],
  ["vi", VNPT + "III.28", "vnpt-iii28-co-hon"],
  ["vi", VNPT + "III.31", "vnpt-iii31-xem-ngay-ken-gio"],
  ["vi", VNPT + "III.38", "vnpt-iii38-cu-so"],
  ["zh", "家禮 (四庫全書本)/卷5", "zh-gia-le-q05"],
];

const slugOf = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
  .replace(/[^A-Za-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
const nghi = ms => new Promise(r => setTimeout(r, ms));
const UA = { "User-Agent": "SachTinhHoa-LeCung/0.1 (personal study tool; contact via vi.wikisource talk)" };

// HTML đã dựng → văn bản thuần: giữ xuống dòng theo đoạn, bỏ số trang, chú thích, thẻ.
function bocHtml(h) {
  h = h.replace(/<span[^>]*class="pagenum[^"]*"[^>]*>[\s\S]*?<\/span>/g, "");
  h = h.replace(/<sup[^>]*class="reference"[^>]*>[\s\S]*?<\/sup>/g, "");
  h = h.replace(/<(?:ol|div)[^>]*class="(?:references|mw-references-wrap)[^"]*"[^>]*>[\s\S]*?<\/(?:ol|div)>/g, "");
  h = h.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<!--[\s\S]*?-->/g, "");
  h = h.replace(/<\/(?:p|div|h\d|li|tr|dd|dt)>|<br\s*\/?>/g, "\n");
  h = h.replace(/<[^>]+>/g, "");
  h = h.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
  return h.split("\n").map(l => l.replace(/[ \t\u3000]+/g, " ").trim()).filter(Boolean).join("\n");
}

async function goi(url) {
  for (let lan = 0; ; lan++) {
    const res = await fetch(url, { headers: UA });
    if (res.status === 429 && lan < 3) { console.log(`  HTTP 429, nghỉ ${NGHI_429_MS / 1000} s rồi thử lại (${lan + 1}/3)`); await nghi(NGHI_429_MS); continue; }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
}

async function taiMot(wiki, title, slug) {
  const api = `https://${wiki}.wikisource.org/w/api.php`;
  const q = new URLSearchParams({ action: "parse", page: title, prop: "text|wikitext", format: "json", formatversion: "2", redirects: "1", disablelimitreport: "1" });
  const d = await goi(`${api}?${q}`);
  if (d.error) throw new Error(d.error.info || d.error.code);
  const ten = d.parse.title, url = `https://${wiki}.wikisource.org/wiki/${encodeURI(ten.replace(/ /g, "_"))}`;
  // Trang nhúng (<pages …/>) → dùng bản dựng; trang có wikitext thật → giữ wikitext (giống coi-tam) để đối chiếu được cả chữ Hán dị thể.
  const wt = d.parse.wikitext || "", nhung = /<pages\s/i.test(wt) || wt.replace(/\{\{[\s\S]*?\}\}/g, "").trim().length < 200;
  const text = nhung ? bocHtml(d.parse.text) : wt;
  writeFileSync(join(OUT, slug + ".txt"), `# ${ten} — nguồn: ${url} — ${nhung ? "bản dựng (parse) đã bóc HTML" : "wikitext"}\n` + text, "utf8");
  return `${slug}.txt ← ${ten} (${text.length} ký tự, ${nhung ? "parse" : "wikitext"})`;
}

const yeuCau = process.argv.slice(2);
const DS = yeuCau.length
  ? yeuCau.map(s => { const m = s.match(/^(zh|vi):(.+)$/); return m ? [m[1], m[2], `${m[1]}-${slugOf(m[2])}`] : ["vi", s, "vi-" + slugOf(s)]; })
  : MAC_DINH;
const ok = [], thieu = [];
for (const [i, [wiki, title, slug]] of DS.entries()) {
  if (i) await nghi(NGHI_MS);
  try { ok.push(await taiMot(wiki, title, slug)); console.log("  " + ok[ok.length - 1]); }
  catch (e) { thieu.push(`${wiki}:${title} — ${e.message}`); console.log(`  LỖI ${wiki}:${title} — ${e.message}`); }
}
console.log(`Đã tải ${ok.length}/${DS.length}.`);
if (thieu.length) { console.log("Không tải được:\n  " + thieu.join("\n  ")); process.exit(1); }
