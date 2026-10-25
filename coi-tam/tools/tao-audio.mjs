// Tạo audio cho loạt Quán trọ: node tools/tao-audio.mjs [số bài ...]  (chạy trong thư mục COI TAM)
// 1) nạp data/bai-NN.js như trình duyệt, ghép văn bản đọc: tên bài, đoạn dẫn, từng trích dẫn (tên nguồn, bản dịch hoặc nguyên văn Việt, lời bình), suy ngẫm;
//    bỏ chữ Hán và âm Hán Việt (giọng máy đọc sai), thêm dấu chấm cuối đoạn để giọng ngắt nghỉ;
// 2) gọi edge-tts (gói Python, giọng vi-VN-NamMinhNeural của Microsoft, dịch vụ không chính thức [I]) ghi audio/bai-NN-may.mp3 (bản dự phòng) và audio/bai-NN.txt (văn bản đã đọc, cũng là đầu vào cho giọng VieNeu).
// Giọng: nam, hạ tốc độ và cao độ một chút cho trầm ấm. Đổi ở CAU_HINH.
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, unlinkSync } from "node:fs";
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
  const phan = [`Quán trọ. Bài ${b.so}: ${b.ten}.`, cau(b.dan)];
  for (const t of b.trich) {
    phan.push(`Trích ${bo(t.nguon)}.`);
    if (t.viet || t.nom) phan.push(cau(t.viet || t.nom)); else if (t.dich) phan.push(cau(t.dich));
    if (t.g) phan.push(cau(t.g));
  }
  phan.push("Suy ngẫm.", cau(b.suyNgam));
  const vanBan = phan.filter(Boolean).join("\n\n");
  const txt = `audio/bai-${String(b.so).padStart(2, "0")}.txt`, mp3 = txt.replace(".txt", "-may.mp3");   // giọng máy là bản dự phòng; bản chính bai-NN.mp3 là giọng VieNeu mẫu 1, không ghi đè
  writeFileSync(txt, vanBan, "utf8");
  // Dịch vụ edge-tts thỉnh thoảng từ chối; thử lại tối đa 3 lần, mỗi lần cách 20 giây; thất bại thì vẫn để lại file .txt cho bước tạo giọng khác
  let ok = false;
  for (let lan = 1; lan <= 3 && !ok; lan++) {
    try { execFileSync("python", ["-m", "edge_tts", "--voice", CAU_HINH.voice, "--rate=" + CAU_HINH.rate, "--pitch=" + CAU_HINH.pitch, "-f", txt, "--write-media", mp3], { stdio: "inherit" }); ok = existsSync(mp3) && statSync(mp3).size > 10000; }
    catch (e) { ok = false; }
    if (!ok) { try { unlinkSync(mp3); } catch (e) {} if (lan < 3) { console.log(`Bài ${b.so}: edge-tts lỗi lần ${lan}, chờ 20 giây…`); Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20000); } }
  }
  console.log(`Bài ${b.so}: ${vanBan.length} ký tự → ${ok ? mp3 : "KHÔNG tạo được audio (đã ghi " + txt + ")"}`);
}
