// Tạo audio cho loạt Cõi tạm: node tools/tao-audio.mjs [số bài ...]  (chạy trong thư mục COI TAM)
// 1) nạp data/bai-NN.js như trình duyệt, ghép văn bản đọc: tên bài, đoạn dẫn, từng trích dẫn (tên nguồn, bản dịch hoặc nguyên văn Việt, lời bình), suy ngẫm;
//    bỏ chữ Hán và âm Hán Việt (giọng máy đọc sai), thêm dấu chấm cuối đoạn để giọng ngắt nghỉ;
// 2) gọi edge-tts (gói Python, giọng vi-VN-NamMinhNeural của Microsoft, dịch vụ không chính thức [I]) ghi audio/bai-NN.mp3 và audio/bai-NN.txt (văn bản đã đọc).
// Giọng: nam, hạ tốc độ và cao độ một chút cho trầm ấm. Đổi ở CAU_HINH.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import vm from "node:vm";
const CAU_HINH = { voice: "vi-VN-NamMinhNeural", rate: "-10%", pitch: "-4Hz" };
const so = process.argv.slice(2).length ? process.argv.slice(2).map(Number) : null;
const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
const html = readFileSync("coi-tam.html", "utf8");
for (const m of html.matchAll(/<script src="(data\/[^"]+)"/g)) vm.runInContext(readFileSync(m[1], "utf8"), ctx, { filename: m[1] });
const bo = s => String(s || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/[ \t]+/g, " ").trim();
const cau = s => { s = bo(s); return s && !/[.!?…:]$/.test(s) ? s + "." : s; };
mkdirSync("audio", { recursive: true });
for (const b of ctx.CT_BAI) {
  if (so && !so.includes(b.so)) continue;
  const phan = [`Cõi tạm. Bài ${b.so}: ${b.ten}.`, cau(b.dan)];
  for (const t of b.trich) {
    phan.push(`Trích ${bo(t.nguon)}.`);
    if (t.viet || t.nom) phan.push(cau(t.viet || t.nom)); else if (t.dich) phan.push(cau(t.dich));
    if (t.g) phan.push(cau(t.g));
  }
  phan.push("Suy ngẫm.", cau(b.suyNgam));
  const vanBan = phan.filter(Boolean).join("\n\n");
  const txt = `audio/bai-${String(b.so).padStart(2, "0")}.txt`, mp3 = txt.replace(".txt", ".mp3");
  writeFileSync(txt, vanBan, "utf8");
  execFileSync("python", ["-m", "edge_tts", "--voice", CAU_HINH.voice, "--rate=" + CAU_HINH.rate, "--pitch=" + CAU_HINH.pitch, "-f", txt, "--write-media", mp3], { stdio: "inherit" });
  console.log(`Bài ${b.so}: ${vanBan.length} ký tự → ${mp3}${existsSync(mp3) ? "" : " (KHÔNG tạo được)"}`);
}
