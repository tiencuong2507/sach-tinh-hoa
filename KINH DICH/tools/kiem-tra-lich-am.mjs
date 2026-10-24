// Kiểm tra bộ đổi âm lịch bằng các ngày đã biết: node tools/kiem-tra-lich-am.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(readFileSync("lich-am.js", "utf8"), ctx);
const L = ctx.window.LichAm;
// [dương lịch d,m,y] → [âm d,m,y,nhuận]. Mùng 1 Tết các năm và vài ngày rằm, tháng nhuận đã công bố.
const cases = [
  [[22, 1, 2023], [1, 1, 2023, 0]],   // Tết Quý Mão
  [[10, 2, 2024], [1, 1, 2024, 0]],   // Tết Giáp Thìn
  [[29, 1, 2025], [1, 1, 2025, 0]],   // Tết Ất Tỵ
  [[17, 2, 2026], [1, 1, 2026, 0]],   // Tết Bính Ngọ
  [[6, 2, 2027], [1, 1, 2027, 0]],    // Tết Đinh Mùi
  [[16, 2, 2026], [29, 12, 2025, 0]], // giao thừa Ất Tỵ (tháng Chạp thiếu)
  [[22, 3, 2023], [1, 2, 2023, 1]],   // mùng 1 tháng 2 nhuận Quý Mão
  [[25, 7, 2025], [1, 6, 2025, 1]],   // mùng 1 tháng 6 nhuận Ất Tỵ
  [[6, 10, 2025], [15, 8, 2025, 0]],  // Trung thu 2025
  [[5, 2, 2000], [1, 1, 2000, 0]],    // Tết Canh Thìn
];
let bad = 0;
for (const [[d, m, y], exp] of cases) {
  const r = L.solar2lunar(d, m, y);
  const got = [r.ngay, r.thang, r.nam, r.nhuan];
  if (got.join() !== exp.join()) { bad++; console.log(`${d}/${m}/${y}: ra ${got.join("/")} – mong đợi ${exp.join("/")}`); }
}
console.log(`Âm lịch: ${cases.length - bad}/${cases.length} ngày khớp`);
process.exit(bad ? 1 : 0);
