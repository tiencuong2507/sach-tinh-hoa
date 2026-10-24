// Lõi dùng chung — Lịch: ngày Julius, đổi dương lịch → âm lịch Việt Nam (múi giờ +7), kinh độ Mặt Trời, tháng theo tiết khí.
// Thuật toán thiên văn của Hồ Ngọc Đức (tính điểm sóc và trung khí theo công thức của Jean Meeus, "Astronomical Algorithms").
// Dùng được trong trình duyệt và trong Node (qua vm). Phạm vi tin cậy: khoảng 1800–2199.
// Nạp trước mọi file khác của kho; can chi ngày lấy từ chung/can-chi.js (CanChi.ngay(jd)), không tính ở đây.
"use strict";
const LichAm = (() => {
  const INT = Math.floor, PI = Math.PI;
  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12), y = yy + 4800 - a, m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    return jd;
  }
  function jdToDate(jd) {
    let a, b, c;
    if (jd > 2299160) { a = jd + 32044; b = INT((4 * a + 3) / 146097); c = a - INT(b * 146097 / 4); }
    else { b = 0; c = jd + 32082; }
    const d = INT((4 * c + 3) / 1461), e = c - INT(1461 * d / 4), m = INT((5 * e + 2) / 153);
    return [e - INT((153 * m + 2) / 5) + 1, m + 3 - 12 * INT(m / 10), b * 100 + d - 4800 + INT(m / 10)];
  }
  function newMoon(k) {
    const T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    const deltat = T < -11 ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
                           : -0.000278 + 0.000265 * T + 0.000262 * T2;
    return Jd1 + C1 - deltat;
  }
  const newMoonDay = (k, tz) => INT(newMoon(k) + 0.5 + tz / 24);
  function sunLongitude(jdn) {
    const T = (jdn - 2451545.0) / 36525, T2 = T * T, dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = (L0 + DL) * dr; L -= PI * 2 * INT(L / (PI * 2));
    return L;
  }
  const sunLongSector = (dayNumber, tz) => INT(sunLongitude(dayNumber - 0.5 - tz / 24) / PI * 6);
  function lunarMonth11(yy, tz) {
    const off = jdFromDate(31, 12, yy) - 2415021, k = INT(off / 29.530588853);
    let nm = newMoonDay(k, tz);
    if (sunLongSector(nm, tz) >= 9) nm = newMoonDay(k - 1, tz);
    return nm;
  }
  function leapMonthOffset(a11, tz) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last, i = 1, arc = sunLongSector(newMoonDay(k + i, tz), tz);
    do { last = arc; i++; arc = sunLongSector(newMoonDay(k + i, tz), tz); } while (arc !== last && i < 14);
    return i - 1;
  }
  // Trả về {ngay, thang, nam, nhuan}
  function solar2lunar(dd, mm, yy, tz = 7) {
    const dayNumber = jdFromDate(dd, mm, yy), k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = newMoonDay(k + 1, tz);
    if (monthStart > dayNumber) monthStart = newMoonDay(k, tz);
    let a11 = lunarMonth11(yy, tz), b11 = a11, lunarYear;
    if (a11 >= monthStart) { lunarYear = yy; a11 = lunarMonth11(yy - 1, tz); }
    else { lunarYear = yy + 1; b11 = lunarMonth11(yy + 1, tz); }
    const lunarDay = dayNumber - monthStart + 1, diff = INT((monthStart - a11) / 29);
    let leap = 0, lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const lmd = leapMonthOffset(a11, tz);
      if (diff >= lmd) { lunarMonth = diff + 10; if (diff === lmd) leap = 1; }
    }
    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
    return { ngay: lunarDay, thang: lunarMonth, nam: lunarYear, nhuan: leap };
  }
  // Tháng theo tiết khí (dùng cho Lục hào – nguyệt kiến): trả về chỉ số chi 0=Tý … 11=Hợi.
  // Lập xuân = kinh độ Mặt Trời 315° → tháng Dần; mỗi 30° sang một tháng.
  function kinhDoMatTroi(dd, mm, yy, hh = 12, mi = 0, tz = 7) {
    const jd = jdFromDate(dd, mm, yy) + (hh + mi / 60 - tz - 12) / 24;
    return sunLongitude(jd) * 180 / PI;
  }
  function chiThangTiet(dd, mm, yy, hh = 12, mi = 0, tz = 7) {
    const L = kinhDoMatTroi(dd, mm, yy, hh, mi, tz);
    return (2 + INT(((L - 315 + 720) % 360) / 30)) % 12;
  }
  return { jdFromDate, jdToDate, solar2lunar, kinhDoMatTroi, chiThangTiet };
})();
if (typeof window !== "undefined") window.LichAm = LichAm;
