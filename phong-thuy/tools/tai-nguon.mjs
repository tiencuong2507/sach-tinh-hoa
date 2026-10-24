// Tải Thanh nang kinh (青囊經) và Táng thư (葬書) từ Wikisource (API) về nguon/ để dẫn 1–2 câu về khí và thủy.
// node tools/tai-nguon.mjs   (chạy trong thư mục PHONG THUY). Quá tải → nghỉ 10 giây, thử lại tối đa 3 lần; không được → báo [U], exit 1.
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("nguon", { recursive: true });
const SACH = [["青囊經", "thanh-nang-kinh"], ["葬書", "tang-thu"]];
const api = "https://zh.wikisource.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&redirects=1&variant=zh-hant&titles=";
const nghi = ms => new Promise(r => setTimeout(r, ms));
let loi = 0;
for (const [title, ten] of SACH) {
  let xong = false;
  for (let lan = 1; lan <= 3 && !xong; lan++) {
    try {
      const res = await fetch(api + encodeURIComponent(title), { headers: { "User-Agent": "SachTinhHoa/0.1 (personal study tool)" } });
      if (res.status === 429 || res.status >= 500) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const p = data.query.pages[0];
      if (p.missing || !p.revisions) { console.log("[U] Wikisource không có trang:", title); loi++; break; }
      writeFileSync(`nguon/${ten}.txt`, `# ${p.title} — nguồn: https://zh.wikisource.org/wiki/${encodeURIComponent(p.title)}\n` + p.revisions[0].slots.main.content, "utf8");
      console.log("Đã tải:", p.title, "→ nguon/" + ten + ".txt", p.revisions[0].slots.main.content.length, "ký tự");
      xong = true;
    } catch (e) {
      console.log(`Lần ${lan} lỗi với ${title}: ${e.message}` + (lan < 3 ? " — nghỉ 10 giây rồi thử lại" : ""));
      if (lan < 3) await nghi(10000); else loi++;
    }
  }
}
if (loi) { console.log("[U] Có nguồn chưa tải được:", loi); process.exit(1); }
