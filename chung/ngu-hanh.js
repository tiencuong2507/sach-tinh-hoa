// Lõi dùng chung — Ngũ hành sinh khắc, hành của bát quái, vượng suy theo mùa.
"use strict";
const HANH = ["Mộc","Hỏa","Thổ","Kim","Thủy"];
const SINH = {Mộc:"Hỏa",Hỏa:"Thổ",Thổ:"Kim",Kim:"Thủy",Thủy:"Mộc"};   // SINH[a] = hành mà a sinh ra
const KHAC = {Mộc:"Thổ",Thổ:"Thủy",Thủy:"Hỏa",Hỏa:"Kim",Kim:"Mộc"};   // KHAC[a] = hành mà a khắc
// Hành của tám quái theo bit từ dưới lên (1 = dương): Càn Đoài Kim, Ly Hỏa, Chấn Tốn Mộc, Khảm Thủy, Cấn Khôn Thổ
const HANH_QUAI = {"111":"Kim","110":"Kim","101":"Hỏa","100":"Mộc","011":"Mộc","010":"Thủy","001":"Thổ","000":"Thổ"};

const NguHanh = (() => {
  // Quan hệ của hành b đối với hành a: "đồng" | "sinh" (b sinh a) | "được sinh" (a sinh b) | "khắc" (b khắc a) | "bị khắc" (a khắc b)
  function quanHe(a, b) {
    if (a === b) return "đồng";
    if (SINH[b] === a) return "sinh";
    if (SINH[a] === b) return "được sinh";
    if (KHAC[b] === a) return "khắc";
    return "bị khắc";
  }
  // Vượng – tướng – hưu – tù – tử của một hành so với hành đang lệnh (hành của tháng tiết khí)
  function vuongSuy(hanh, hanhLenh) {
    if (hanh === hanhLenh) return "vượng";
    if (SINH[hanhLenh] === hanh) return "tướng";
    if (SINH[hanh] === hanhLenh) return "hưu";
    if (KHAC[hanh] === hanhLenh) return "tù";
    return "tử";
  }
  const sinhRa = h => SINH[h], sinhBoi = h => HANH.find(x => SINH[x] === h);
  const khacDuoc = h => KHAC[h], biKhacBoi = h => HANH.find(x => KHAC[x] === h);
  return { quanHe, vuongSuy, sinhRa, sinhBoi, khacDuoc, biKhacBoi };
})();
if (typeof window !== "undefined") Object.assign(window, { HANH, SINH, KHAC, HANH_QUAI, NguHanh });
