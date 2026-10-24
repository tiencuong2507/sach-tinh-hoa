// Tử vi đẩu số — lõi an sao thuần JS. Nạp sau chung/lich.js, can-chi.js, ngu-hanh.js.
// Mỗi quy tắc ghi câu nguyên văn tương ứng trong 紫微斗數全書 quyển 2 (nguon/toan-thu-q2.txt, Wikisource) với nhãn:
//   [V] đối chiếu được nguyên văn đã tải · [I] quy ước phổ biến (sách Việt, iztro) chưa có nguyên văn · [U] chưa rõ.
// Mọi điểm các phái lệch nhau nằm trong CAU_HINH qua PROFILE: "viet" (mặc định), "toan-thu", "trung-chau". Không hardcode ở hàm.
// Quy ước chỉ số: cung = địa chi 0 Tý … 11 Hợi; can 0 Giáp … 9 Quý; giờ = chi giờ 0 Tý … 11 Hợi; tháng an sao 1–12.
"use strict";
const TuVi = (() => {
  // ---------------------------------------------------------------- CẤU HÌNH THEO PHÁI
  const PROFILE = {
    // Tử vi Việt (Thái Thứ Lang, Nguyễn Phát Lộc…): bảng Tứ Hóa như Toàn tập (Nhâm Khoa Tả Phụ), Tràng sinh theo âm dương nam nữ. [I]
    "viet": { tuHoaCanh: "nhat-vu-am-dong", tuHoaNham: "luong-tu-ta-vu", gioTySangNgaySau: true, ranhGioiNam: "tet", thangNhuan: "nua-thang",
      hoaLinhChieu: "thuan", thienMaTheo: "nam", trangSinhChieu: "am-duong-nam-nu", nguyetDucKhoi: 5 },
    // Theo nguyên văn 紫微斗數全書 quyển 2 (Wikisource): Canh 日武阴同, Nhâm 梁紫府武; Tràng sinh "男命顺数、女命逆数"; tháng nhuận "闰月正月生者要在二月内起安身命" [V]
    "toan-thu": { tuHoaCanh: "nhat-vu-am-dong", tuHoaNham: "luong-tu-phu-vu", gioTySangNgaySau: true, ranhGioiNam: "tet", thangNhuan: "thang-sau",
      hoaLinhChieu: "thuan", thienMaTheo: "nam", trangSinhChieu: "nam-thuan-nu-nghich", nguyetDucKhoi: 0 },
    // Trung Châu phái (Vương Đình Chi): Hỏa Linh thuận nghịch theo âm dương nam nữ [I, NGHIEN-CUU 4.3]; Tứ Hóa như Toàn tập.
    "trung-chau": { tuHoaCanh: "nhat-vu-am-dong", tuHoaNham: "luong-tu-ta-vu", gioTySangNgaySau: true, ranhGioiNam: "tet", thangNhuan: "nua-thang",
      hoaLinhChieu: "am-duong-nam-nu", thienMaTheo: "nam", trangSinhChieu: "am-duong-nam-nu", nguyetDucKhoi: 5 },
  };
  // Mô tả từng khóa để trang "Cách an sao" liệt kê; giá trị hợp lệ ghi trong ngoặc
  const MO_TA_CAU_HINH = {
    tuHoaCanh: "Tứ Hóa can Canh: nhat-vu-am-dong (Lộc Thái Dương, Quyền Vũ Khúc, Khoa Thái Âm, Kỵ Thiên Đồng — nguyên văn Toàn thư 庚日武阴同为首 [V], cũng là Toàn tập) · nhat-vu-dong-am (Khoa Thiên Đồng, Kỵ Thái Âm — bảng zh.wikipedia gán cho Toàn thư nhưng KHÔNG khớp nguyên văn đã tải) · nhat-vu-phu-dong (Khoa Thiên Phủ, một số phái)",
    tuHoaNham: "Tứ Hóa can Nhâm: luong-tu-ta-vu (Khoa Tả Phụ — Toàn tập, tử vi Việt, iztro) · luong-tu-phu-vu (Khoa Thiên Phủ — nguyên văn Toàn thư 壬梁紫府武宿是 [V])",
    gioTySangNgaySau: "Giờ Tý 23h–24h: true = tính sang ngày hôm sau (chủ lưu, zh.wikipedia 晚子時 [V]) · false = cùng ngày",
    ranhGioiNam: "Ranh giới năm: tet (mồng một Tết âm lịch, truyền thống; iztro yearDivide normal) · lap-xuan (Lập xuân như Tứ trụ)",
    thangNhuan: "Tháng nhuận: nua-thang (ngày 1–15 tính tháng trước, từ 16 tính tháng sau — tử vi Việt, iztro fixLeap) · thang-truoc (cả tháng tính tháng trước) · thang-sau (cả tháng tính tháng sau — Toàn thư 闰月正月生者要在二月内起安身命 [V])",
    hoaLinhChieu: "Hỏa Linh: thuan (từ cung khởi theo tam hợp chi năm đếm thuận tới giờ sinh — Việt, iztro) · am-duong-nam-nu (dương nam âm nữ thuận, âm nam dương nữ nghịch — Trung Châu [I])",
    thienMaTheo: "Thiên Mã theo: nam (chi năm sinh — Toàn thư 安天马星诀 论本生年支 [V]) · thang (chi tháng sinh, một số phái [I])",
    trangSinhChieu: "Vòng Tràng sinh: am-duong-nam-nu (dương nam âm nữ thuận, âm nam dương nữ nghịch — Việt, iztro [I]) · nam-thuan-nu-nghich (男命顺数、女命逆数 — nguyên văn Toàn thư [V])",
    nguyetDucKhoi: "Nguyệt Đức khởi từ cung nào ở tuổi Tý rồi thuận theo chi năm: 5 = Tỵ (sách Việt, iztro [I]) · 0 = Tý (Toàn thư 月德星从子上起子 [V])",
  };
  const CAU_HINH = Object.assign({ profile: "viet" }, PROFILE.viet);
  function datProfile(ten) {
    if (!PROFILE[ten]) throw new Error("Không có profile " + ten);
    Object.assign(CAU_HINH, PROFILE[ten], { profile: ten });
    return CAU_HINH;
  }

  // ---------------------------------------------------------------- BẢNG TRA (dữ liệu, có nhãn)
  const TEN_CUNG = ["Mệnh","Huynh đệ","Phu thê","Tử tức","Tài bạch","Tật ách","Thiên di","Nô bộc","Quan lộc","Điền trạch","Phúc đức","Phụ mẫu"]; // [V] 安十二宫例 一命宫、二兄弟、三妻妾、四子女、五财帛、六疾厄、七迁移、八奴仆、九官禄、十田宅、十一福德、十二父母 (男女俱从逆转)
  const CHINH_TINH = ["Tử Vi","Thiên Cơ","Thái Dương","Vũ Khúc","Thiên Đồng","Liêm Trinh","Thiên Phủ","Thái Âm","Tham Lang","Cự Môn","Thiên Tướng","Thiên Lương","Thất Sát","Phá Quân"];
  const HAN_SAO = { "Tử Vi":"紫微","Thiên Cơ":"天机","Thái Dương":"太阳","Vũ Khúc":"武曲","Thiên Đồng":"天同","Liêm Trinh":"廉贞","Thiên Phủ":"天府","Thái Âm":"太阴","Tham Lang":"贪狼","Cự Môn":"巨门","Thiên Tướng":"天相","Thiên Lương":"天梁","Thất Sát":"七杀","Phá Quân":"破军",
    "Văn Xương":"文昌","Văn Khúc":"文曲","Tả Phụ":"左辅","Hữu Bật":"右弼","Thiên Khôi":"天魁","Thiên Việt":"天钺","Lộc Tồn":"禄存","Kình Dương":"擎羊","Đà La":"陀罗","Hỏa Tinh":"火星","Linh Tinh":"铃星","Địa Không":"地空","Địa Kiếp":"地劫","Thiên Mã":"天马" };
  // Cục theo hành nạp âm của can chi cung Mệnh. [V] 安身命例: 如甲生人安命在寅却起甲己之年丙为首，是丙寅丁卯炉中火，却去火局寻某日生期起紫微帝王
  const CUC = { "Thủy": [2, "Thủy nhị cục"], "Mộc": [3, "Mộc tam cục"], "Kim": [4, "Kim tứ cục"], "Thổ": [5, "Thổ ngũ cục"], "Hỏa": [6, "Hỏa lục cục"] };
  // Tứ Hóa theo can năm, thứ tự Lộc Quyền Khoa Kỵ. [V] 安禄权科忌四星变化诀 论生年干: 甲廉破武阳为伴，乙机梁紫月交侵，丙同机昌廉贞位，丁月同机巨门寻，戊贪月弼机为主，己武贪梁曲最平，庚日武阴同为首，辛巨阳曲昌至临，壬梁紫府武宿是，癸破巨阴贪狼停
  const TU_HOA_GOC = [["Liêm Trinh","Phá Quân","Vũ Khúc","Thái Dương"],["Thiên Cơ","Thiên Lương","Tử Vi","Thái Âm"],["Thiên Đồng","Thiên Cơ","Văn Xương","Liêm Trinh"],["Thái Âm","Thiên Đồng","Thiên Cơ","Cự Môn"],
    ["Tham Lang","Thái Âm","Hữu Bật","Thiên Cơ"],["Vũ Khúc","Tham Lang","Thiên Lương","Văn Khúc"],null,["Cự Môn","Thái Dương","Văn Khúc","Văn Xương"],null,["Phá Quân","Cự Môn","Thái Âm","Tham Lang"]];
  const TU_HOA_CANH = { "nhat-vu-am-dong": ["Thái Dương","Vũ Khúc","Thái Âm","Thiên Đồng"], "nhat-vu-dong-am": ["Thái Dương","Vũ Khúc","Thiên Đồng","Thái Âm"], "nhat-vu-phu-dong": ["Thái Dương","Vũ Khúc","Thiên Phủ","Thiên Đồng"] };
  const TU_HOA_NHAM = { "luong-tu-ta-vu": ["Thiên Lương","Tử Vi","Tả Phụ","Vũ Khúc"], "luong-tu-phu-vu": ["Thiên Lương","Tử Vi","Thiên Phủ","Vũ Khúc"] };
  const TEN_HOA = ["Hóa Lộc","Hóa Quyền","Hóa Khoa","Hóa Kỵ"], HOA_NGAN = ["Lộc","Quyền","Khoa","Kỵ"];
  const bangTuHoa = can => can === 6 ? TU_HOA_CANH[CAU_HINH.tuHoaCanh] : can === 8 ? TU_HOA_NHAM[CAU_HINH.tuHoaNham] : TU_HOA_GOC[can];
  // Lộc Tồn theo can năm. [V] 安禄存星诀: 甲生禄存在寅宫，乙生在卯丙戊巳，丁己禄存停午方，庚禄居申辛禄酉，壬禄在亥癸禄子
  const LOC_TON = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
  // Khôi Việt theo can năm. [V] 安天魁天钺诀: 甲戊庚牛羊，乙己鼠猴乡，六辛逢虎马，壬癸免蛇藏，丙丁猪狗位 (Việt: 六辛 Khôi Ngọ Việt Dần; sách Việt một số ghi Tân: Khôi Ngọ Việt Dần, giống nhau)
  const KHOI_VIET = [[1,7],[0,8],[11,9],[11,9],[1,7],[0,8],[1,7],[6,2],[3,5],[3,5]];
  // Tam hợp chi năm → nhóm 0 Dần Ngọ Tuất, 1 Thân Tý Thìn, 2 Tỵ Dậu Sửu, 3 Hợi Mão Mùi
  const nhomTamHop = chi => [1,2,0,3,1,2,0,3,1,2,0,3][chi];
  const THIEN_MA = [8, 2, 11, 5];            // [V] 安天马星诀: 寅午戍人马居申，申子辰人马居寅，巳酉丑人马居亥，亥卯未人马居巳
  const HOA_LINH_KHOI = [[1,3],[2,10],[3,10],[9,10]]; // [V] 安火铃二星诀: 寅午戌人丑卯方，申子辰人寅戌扬，巳酉丑人卯戌位，亥卯未人酉戌房 (cung khởi giờ Tý của Hỏa, Linh)
  const DAO_HOA = [3, 9, 6, 0], HOA_CAI = [10, 4, 1, 7], KIEP_SAT = [11, 5, 2, 8]; // [I] Đào hoa (咸池) Dần Ngọ Tuất ở Mão…; Hoa Cái ở Tuất…; Kiếp Sát ở Hợi… (khớp iztro)
  const TIEU_HAN_KHOI = [4, 10, 7, 1];       // [V] 安小限诀: 寅午戌人起辰宫，申子辰人自戌宫，巳酉丑人起未宫，亥卯未人起丑宫
  const TRANG_SINH_KHOI = { "Thủy": 8, "Mộc": 11, "Kim": 5, "Thổ": 8, "Hỏa": 2 }; // [V] 火局命寅起长生。木局命亥起长生。水局命申起长生。金局命巳起长生。土局命申起长生
  const VONG_TRANG_SINH = ["Tràng Sinh","Mộc Dục","Quan Đới","Lâm Quan","Đế Vượng","Suy","Bệnh","Tử","Mộ","Tuyệt","Thai","Dưỡng"]; // [V] 安长生、沐浴、冠带、临官、帝旺、衰、病、死、墓、绝、胎、养
  const VONG_BAC_SI = ["Bác Sĩ","Lực Sĩ","Thanh Long","Tiểu Hao","Tướng Quân","Tấu Thư","Phi Liêm","Hỉ Thần","Bệnh Phù","Đại Hao","Phục Binh","Quan Phủ"]; // [V] 博士力士青龙续，小耗将军及奏书，蜚廉喜神病符录，天耗伏兵至宫府 (天耗 = Đại Hao)
  // Vòng Thái Tuế 12 tên theo sách Việt [I]; bốn mốc có nguyên văn [V] 岁君前二是丧门，后二宫中吊客存，对照丧门安白虎，吊客对照安官府 → Tang Môn +2, Điếu Khách −2, Bạch Hổ +8, Quan Phù +4
  const VONG_THAI_TUE = ["Thái Tuế","Thiếu Dương","Tang Môn","Thiếu Âm","Quan Phù","Tử Phù","Tuế Phá","Long Đức","Bạch Hổ","Phúc Đức","Điếu Khách","Trực Phù"];
  const CO_THAN = [2, 5, 8, 11], QUA_TU = [10, 1, 4, 7]; // [I] theo nhóm chi năm Hợi Tý Sửu / Dần Mão Thìn / Tỵ Ngọ Mùi / Thân Dậu Tuất (khớp iztro)
  const nhomCoQua = chi => [0,0,1,1,1,2,2,2,3,3,3,0][chi];
  const THIEN_QUAN = [7,4,5,2,3,9,11,9,10,6], THIEN_PHUC = [9,8,0,11,3,2,6,5,6,5]; // [I] theo can năm (sách Việt; khớp iztro)
  const THIEN_TRU = [5,6,0,5,6,8,2,6,9,11], LUU_HA = [9,10,7,8,5,6,4,3,11,2];     // [I] theo can năm (Thiên Trù khớp iztro; Lưu Hà theo sách Việt)
  const TRIET = [[8,9],[6,7],[4,5],[2,3],[0,1]];  // [V] 安截路空亡诀 论本生年: 甲己申酉宫，乙庚午未宫，丙辛辰巳宫，丁壬寅卯宫，戊癸子丑宫 → chỉ số can % 5
  const PHA_TOAI = [5, 1, 9];                      // [I] Tý Ngọ Mão Dậu → Tỵ; Sửu Mùi Thìn Tuất → Sửu; Dần Thân Tỵ Hợi → Dậu (chi % 3; khớp iztro)
  const GIAI_THAN_THANG = [8, 10, 0, 2, 4, 6];     // [I] Giải Thần theo tháng: 1–2 Thân, 3–4 Tuất, 5–6 Tý, 7–8 Dần, 9–10 Thìn, 11–12 Ngọ (khớp iztro 月解)
  const LUU_XUONG_KHUC = [[5,9],[6,8],[8,6],[9,5],[8,6],[9,5],[11,3],[0,2],[2,0],[3,11]]; // [I] lưu Xương, lưu Khúc theo can năm lưu (khớp iztro)
  const MENH_CHU = ["Tham Lang","Cự Môn","Lộc Tồn","Văn Khúc","Liêm Trinh","Vũ Khúc","Phá Quân","Vũ Khúc","Liêm Trinh","Văn Khúc","Lộc Tồn","Cự Môn"]; // [V] 安命主: 贪狼子宫，巨门丑亥宫，禄存寅戌宫，文曲卯酉宫，廉真申辰宫，武曲巳未宫，破军午宫
  const THAN_CHU = ["Hỏa Tinh / Linh Tinh","Thiên Tướng","Thiên Lương","Thiên Đồng","Văn Xương","Thiên Cơ"];           // [V] 安身主: 子午人火玲星，丑未人天相星，寅申人天梁星，卯酉人天同星，辰戌人文昌星，巳亥人天机星 (nguyên văn 火玲 không tách Tý/Ngọ)
  // Độ sáng theo bảng cuối quyển 2 Toàn thư (庙 旺 得地 利益 平和 不得地 落陷) [V]; chữ tắt: 紫机日武同廉府月贪巨相梁杀破昌曲禄羊陀火铃
  const DO_SANG_TEN = { "庙":"miếu", "旺":"vượng", "得":"đắc địa", "利":"lợi ích", "平":"bình hòa", "不":"bất đắc địa", "陷":"hãm" };
  const TAT_SAO = { "紫":"Tử Vi","机":"Thiên Cơ","日":"Thái Dương","武":"Vũ Khúc","同":"Thiên Đồng","廉":"Liêm Trinh","府":"Thiên Phủ","月":"Thái Âm","贪":"Tham Lang","巨":"Cự Môn","相":"Thiên Tướng","梁":"Thiên Lương","杀":"Thất Sát","破":"Phá Quân","昌":"Văn Xương","曲":"Văn Khúc","禄":"Lộc Tồn","羊":"Kình Dương","陀":"Đà La","火":"Hỏa Tinh","铃":"Linh Tinh" };
  const BANG_DO_SANG_GOC = [ // theo từng chi Tý → Hợi: [庙, 旺, 得地, 利益, 平和, 不得地, 落陷]
    ["机府月相梁破禄","武同贪巨杀","昌曲","","紫廉","","日羊火铃"],
    ["紫武府月贪相杀昌曲羊陀","梁破","火铃","廉","","日同巨","机"],
    ["廉府巨相梁杀禄火铃","紫日月","机武破","同","贪曲","","昌陀"],
    ["日巨梁禄","紫机杀曲","府","武贪昌火铃","同廉","","月相破羊"],
    ["武府贪梁杀羊陀","日破","紫相昌曲","机廉","同","","月巨火铃"],
    ["同昌曲禄","紫日巨","府相火铃","","机武杀破","","廉月贪梁陀"],
    ["紫机相梁破禄火铃","日武府贪巨杀","","","廉","月","同昌曲羊"],
    ["紫武府贪杀羊陀","梁破曲","日相","廉昌火铃","","同月巨","机"],
    ["廉巨相杀禄","紫同","机日武府破昌曲","月","贪","","梁陀火铃"],
    ["巨昌曲禄","紫机府月杀","梁火铃","武贪","日同廉","","相破羊"],
    ["武府贪梁杀羊陀火铃","月破","紫相","机廉","同","日","巨昌曲"],
    ["同月禄","紫巨曲","府相","昌火铃","机武杀破","","日廉贪梁陀"]];
  const MUC_SANG = ["miếu","vượng","đắc địa","lợi ích","bình hòa","bất đắc địa","hãm"];
  const DO_SANG = {}; // DO_SANG[tên sao][chi] = mức
  BANG_DO_SANG_GOC.forEach((hang, chi) => hang.forEach((chuoi, muc) => { for (const ch of chuoi) { const t = TAT_SAO[ch]; if (!t) throw new Error("Bảng độ sáng: chữ lạ " + ch); (DO_SANG[t] = DO_SANG[t] || {})[chi] = MUC_SANG[muc]; } }));
  const doSang = (ten, chi) => (DO_SANG[ten] && DO_SANG[ten][chi]) || null;

  // ---------------------------------------------------------------- LỊCH: đổi ngày, giờ Tý, năm, tháng nhuận
  // Âm → dương: dò quanh ước lượng bằng LichAm.solar2lunar (lõi chung), không chép thuật toán lịch.
  function am2jd(ngay, thang, nam, nhuan) {
    const uoc = LichAm.jdFromDate(21, 1, nam) + Math.round((thang - 1 + (nhuan ? 1 : 0)) * 29.5306) + (ngay - 1);
    for (let d = -40; d <= 40; d++) { const jd = uoc + d, [dd, mm, yy] = LichAm.jdToDate(jd), a = LichAm.solar2lunar(dd, mm, yy);
      if (a.ngay === ngay && a.thang === thang && a.nam === nam && !!a.nhuan === !!nhuan) return jd; }
    return null;
  }
  // Năm dùng để an sao. "tet": năm âm lịch của ngày sinh. "lap-xuan": năm dương lịch, trước Lập xuân (kinh độ Mặt Trời 270°–315° trong tháng 1–2) lùi một năm.
  function namAnSao(jd, am, gioThuc) {
    if (CAU_HINH.ranhGioiNam !== "lap-xuan") return am.nam;
    const [d, m, y] = LichAm.jdToDate(jd), L = LichAm.kinhDoMatTroi(d, m, y, gioThuc, 0);
    return (m <= 2 && L >= 270 && L < 315) ? y - 1 : y;
  }
  // Tháng an sao từ tháng âm + cờ nhuận theo CAU_HINH.thangNhuan
  function thangAnSao(am) {
    if (!am.nhuan) return am.thang;
    const sau = am.thang % 12 + 1;
    if (CAU_HINH.thangNhuan === "thang-sau") return sau;
    if (CAU_HINH.thangNhuan === "nua-thang") return am.ngay >= 16 ? sau : am.thang;
    return am.thang; // "thang-truoc"
  }
  // Chuẩn hóa đầu vào → {jd, chiGio, am, duong, namAn, thangAn, gioThuc}
  // nhap: { duong: {ngay, thang, nam, gio, phut}, am: {ngay, thang, nam, nhuan, gio|chiGio}, gioiTinh: "nam"|"nu" }
  function chuanHoa(nhap) {
    let jd, gioThuc = 12, chiGio;
    if (nhap.duong) { const d = nhap.duong; gioThuc = (d.gio ?? 12) + (d.phut || 0) / 60; jd = LichAm.jdFromDate(d.ngay, d.thang, d.nam); chiGio = CanChi.chiGioTuGio(d.gio ?? 12); }
    else { const a = nhap.am; jd = am2jd(a.ngay, a.thang, a.nam, a.nhuan); if (jd == null) throw new Error("Không đổi được ngày âm " + JSON.stringify(a));
      if (a.chiGio != null) { chiGio = a.chiGio; gioThuc = chiGio === 0 ? 0 : chiGio * 2; } else { gioThuc = (a.gio ?? 12) + (a.phut || 0) / 60; chiGio = CanChi.chiGioTuGio(a.gio ?? 12); } }
    const gioTyCuoiNgay = gioThuc >= 23;
    if (gioTyCuoiNgay && CAU_HINH.gioTySangNgaySau) jd += 1;  // 23h–24h thuộc ngày hôm sau
    const [dd, mm, yy] = LichAm.jdToDate(jd), am = nhap.ghiDeAm || LichAm.solar2lunar(dd, mm, yy); // ghiDeAm: chỉ tool kiểm dùng để thử ngày âm của lịch khác (+8) trên cùng ngày dương
    return { jd, chiGio, gioThuc, duong: [dd, mm, yy], am, namAn: namAnSao(jd, am, gioThuc), thangAn: thangAnSao(am), gioTyCuoiNgay };
  }

  // ---------------------------------------------------------------- AN SAO
  // Vị trí Tử Vi theo cục và ngày sinh. [V] Tử Vi cục bảng (水二局…火六局) cuối quyển 2; thuật toán tương đương: tìm bội nhỏ nhất của cục ≥ ngày,
  // thương là số cung đếm thuận từ Dần, phần dư (bội − ngày) chẵn thì tiến, lẻ thì lùi. Tool kiểm đối chiếu từng ô bảng Toàn thư với công thức này.
  function viTriTuVi(cuc, ngay) {
    let boi = ngay; while (boi % cuc !== 0) boi++;
    const thuong = boi / cuc, du = boi - ngay;
    return mod(2 + (thuong - 1) + (du % 2 === 0 ? du : -du), 12);
  }
  function anChinhTinh(tv) {
    const s = {};
    // [V] 安南北斗诸星诀: 紫微天机逆行旁，隔一阳武天同当，又隔二位廉贞地，空三复见紫微郎
    s["Tử Vi"] = tv; s["Thiên Cơ"] = mod(tv - 1, 12); s["Thái Dương"] = mod(tv - 3, 12); s["Vũ Khúc"] = mod(tv - 4, 12); s["Thiên Đồng"] = mod(tv - 5, 12); s["Liêm Trinh"] = mod(tv - 8, 12);
    // [V] 安天府图: 天府惟寅申二宫紫府同宫，余宫俱各填协作对如紫居丑则府居卯矣 → đối xứng qua trục Dần–Thân
    const tp = mod(4 - tv, 12);
    // [V] 天府太阴与贪狼，巨门天相及天梁，七杀空三破军位，八星顺数细推详
    s["Thiên Phủ"] = tp; s["Thái Âm"] = mod(tp + 1, 12); s["Tham Lang"] = mod(tp + 2, 12); s["Cự Môn"] = mod(tp + 3, 12); s["Thiên Tướng"] = mod(tp + 4, 12); s["Thiên Lương"] = mod(tp + 5, 12); s["Thất Sát"] = mod(tp + 6, 12); s["Phá Quân"] = mod(tp + 10, 12);
    return s;
  }

  function laSo(nhap) {
    const gioiTinh = nhap.gioiTinh === "nu" ? "nu" : "nam";
    const ch = chuanHoa(nhap), { chiGio, am, namAn, thangAn } = ch;
    const idxNam = CanChi.nam(namAn), canNam = idxNam % 10, chiNam = idxNam % 12;
    const duongNam = canNam % 2 === 0, thuanLy = (duongNam && gioiTinh === "nam") || (!duongNam && gioiTinh === "nu"); // dương nam, âm nữ → thuận
    const amDuong = `${duongNam ? "Dương" : "Âm"} ${gioiTinh === "nam" ? "nam" : "nữ"}`;
    // [V] 安身命例: 大抵人命俱从寅上起正月，顺数至本生月止，又自人生月起子时逆至本生时安命，顺至本生时安身
    const menh = mod(2 + (thangAn - 1) - chiGio, 12), than = mod(2 + (thangAn - 1) + chiGio, 12);
    // [V] 起五行寅例: 甲己之岁起丙寅，乙庚之岁起戊寅，丙辛之岁起庚寅，丁壬之岁起壬寅，戊癸之岁起甲寅 → can từng cung (lõi chung CanChi.canThang ngũ hổ độn)
    const canCung = chi => CanChi.canThang(canNam, chi);
    const idxMenh = CanChi.idx60(canCung(menh), menh), hanhCuc = CanChi.hanhNapAm(idxMenh), [cucSo, cucTen] = CUC[hanhCuc];
    const sao = {}, loai = {};
    const dat = (ten, chi, nhom) => { sao[ten] = mod(chi, 12); loai[ten] = nhom; };
    // Chính tinh
    const tv = viTriTuVi(cucSo, am.ngay);
    Object.entries(anChinhTinh(tv)).forEach(([t, c]) => dat(t, c, "chinh"));
    // [V] 安文昌文曲星诀 论本生时: 子时戌上起文昌，逆到生时是贵乡，文曲数从辰上起，顺到生时是本乡
    dat("Văn Xương", 10 - chiGio, "phu"); dat("Văn Khúc", 4 + chiGio, "phu");
    // [V] 安左辅右弼星诀 论本生月: 左辅正月起于辰，顺逢生月是贵方，右弼正月宫寻戌，逆至正月便调停
    dat("Tả Phụ", 4 + thangAn - 1, "phu"); dat("Hữu Bật", 10 - (thangAn - 1), "phu");
    dat("Thiên Khôi", KHOI_VIET[canNam][0], "phu"); dat("Thiên Việt", KHOI_VIET[canNam][1], "phu");
    // [V] 安禄存星诀; 安擎羊陀罗二星诀: 禄前擎羊后陀罗 … 假如癸禄在子，丑宫安擎羊，亥宫安陀罗
    const loc = LOC_TON[canNam]; dat("Lộc Tồn", loc, "phu"); dat("Kình Dương", loc + 1, "sat"); dat("Đà La", loc - 1, "sat");
    // Thiên Mã theo chi năm [V] hoặc chi tháng [I]
    dat("Thiên Mã", THIEN_MA[nhomTamHop(CAU_HINH.thienMaTheo === "thang" ? mod(thangAn + 1, 12) : chiNam)], "phu");
    // Hỏa Linh: cung khởi [V]; chiều đếm theo CAU_HINH.hoaLinhChieu
    { const [kh, kl] = HOA_LINH_KHOI[nhomTamHop(chiNam)], chieu = CAU_HINH.hoaLinhChieu === "am-duong-nam-nu" ? (thuanLy ? 1 : -1) : 1;
      dat("Hỏa Tinh", kh + chieu * chiGio, "sat"); dat("Linh Tinh", kl + chieu * chiGio, "sat"); }
    // [V] 天空地劫诀 论本生时: 亥上起子顺安劫，逆向便是天空乡 (Thiên Không ở đây = Địa Không của sách Việt)
    dat("Địa Kiếp", 11 + chiGio, "sat"); dat("Địa Không", 11 - chiGio, "sat");
    // Tuần, Triệt [V] 安旬中空亡诀 (甲子旬中空戌亥…) qua CanChi.tuanKhong; 安截路空亡诀 theo can năm
    const tuan = CanChi.tuanKhong(idxNam), triet = TRIET[canNam % 5];
    // Phụ tinh theo năm (chi)
    dat("Hồng Loan", 3 - chiNam, "phu"); dat("Thiên Hỷ", 3 - chiNam + 6, "phu");     // [V] 卯上起子逆数之，数到当生太岁支，坐守此宫红鸾位，对宫天喜不差移
    dat("Long Trì", 4 + chiNam, "phu"); dat("Phượng Các", 10 - chiNam, "phu");       // [V] 龙池子顺辰，凤阁子戌逆
    dat("Thiên Khốc", 6 - chiNam, "phu"); dat("Thiên Hư", 6 + chiNam, "phu");        // [V] 天哭天虚起午宫。午宫起子两分踪。哭逆巳兮虚顺未
    dat("Đào Hoa", DAO_HOA[nhomTamHop(chiNam)], "phu"); dat("Hoa Cái", HOA_CAI[nhomTamHop(chiNam)], "phu"); dat("Kiếp Sát", KIEP_SAT[nhomTamHop(chiNam)], "phu"); // [I]
    dat("Cô Thần", CO_THAN[nhomCoQua(chiNam)], "phu"); dat("Quả Tú", QUA_TU[nhomCoQua(chiNam)], "phu"); // [I]
    dat("Phá Toái", PHA_TOAI[chiNam % 3], "phu");                                      // [I]
    dat("Thiên Đức", 9 + chiNam, "phu");                                               // [V] 天德星从酉上起子，顺数至流年太岁上是也 (an theo năm sinh)
    dat("Nguyệt Đức", CAU_HINH.nguyetDucKhoi + chiNam, "phu");                         // Toàn thư 月德星从子上起子 [V] · sách Việt khởi Tỵ [I] — theo CAU_HINH
    dat("Niên Giải", 10 - chiNam, "phu");                                              // [V] 解神从戌上起子，逆数至当生年太岁上是也 (Toàn thư gọi là 解神; sách Việt gọi Giải Thần theo tháng, xem dưới)
    dat("Thiên Không", chiNam + 1, "phu");                                             // [I] cung trước Thái Tuế (khớp iztro)
    dat("Thiên Tài", menh + chiNam, "phu"); dat("Thiên Thọ", than + chiNam, "phu");    // [I] Thiên Tài từ Mệnh, Thiên Thọ từ Thân, đếm thuận theo chi năm (khớp iztro)
    // Phụ tinh theo can năm
    dat("Thiên Quan", THIEN_QUAN[canNam], "phu"); dat("Thiên Phúc", THIEN_PHUC[canNam], "phu"); dat("Thiên Trù", THIEN_TRU[canNam], "phu"); dat("Lưu Hà", LUU_HA[canNam], "phu"); // [I]
    dat("Quốc Ấn", loc + 8, "phu"); dat("Đường Phù", loc + 5, "phu");                 // [I] sách Việt: Quốc Ấn cung thứ 9 kể từ Lộc Tồn thuận; Đường Phù cung thứ 6
    // Phụ tinh theo tháng
    dat("Thiên Hình", 9 + thangAn - 1, "phu"); dat("Thiên Riêu", 1 + thangAn - 1, "phu"); // [V] 天刑星从酉上起正月顺至本生月便安之。天姚星从丑上起正月顺至本生月即安之
    dat("Thiên Y", 1 + thangAn - 1, "phu");                                            // [I] sách Việt: Thiên Y đồng cung Thiên Riêu
    dat("Giải Thần", GIAI_THAN_THANG[Math.floor((thangAn - 1) / 2)], "phu");           // [I]
    dat("Thiên Giải", 8 + thangAn - 1, "phu"); dat("Địa Giải", 7 + thangAn - 1, "phu"); // [I] sách Việt: Thiên Giải tháng 1 ở Thân, Địa Giải tháng 1 ở Mùi, đều thuận
    // Phụ tinh theo ngày
    dat("Tam Thai", sao["Tả Phụ"] + am.ngay - 1, "phu"); dat("Bát Tọa", sao["Hữu Bật"] - (am.ngay - 1), "phu"); // [V] 三台寻左辅将初一日加在左辅宫，顺数至本生日安之。八座寻右弼将初一加右弼宫逆数至本生日安之
    dat("Ân Quang", sao["Văn Xương"] + am.ngay - 2, "phu"); dat("Thiên Quý", sao["Văn Khúc"] + am.ngay - 2, "phu"); // [I] từ Xương/Khúc kể mồng một đếm thuận tới ngày sinh rồi lùi một cung (khớp iztro)
    // Phụ tinh theo giờ
    dat("Thai Phụ", 6 + chiGio, "phu"); dat("Phong Cáo", 2 + chiGio, "phu");         // [V] 安台辅封诀 由午宫起子顺数至本生时安之; 安封诰诀 由寅起宫子顺数至本生时安之
    // Theo cung Mệnh
    dat("Thiên Thương", menh - 7, "phu"); dat("Thiên Sứ", menh - 5, "phu");           // [V] 天伤安在奴仆宫，天使安在疾厄宫
    dat("Thiên La", 4, "phu"); dat("Địa Võng", 10, "phu");                            // [I] cố định Thìn, Tuất
    // [V] 安斗君诀: 于流年太岁宫起正月逆至本生月，又从本生月起子顺数至本生时安斗君 (an gốc theo chi năm sinh)
    dat("Đẩu Quân", chiNam - (thangAn - 1) + chiGio, "phu");
    // Tứ Hóa [V] + profile
    const tuHoa = {}, bang = bangTuHoa(canNam); bang.forEach((t, i) => { tuHoa[t] = HOA_NGAN[i]; });
    // Vòng Tràng sinh [V] cung khởi; chiều theo CAU_HINH.trangSinhChieu
    const tsThuan = CAU_HINH.trangSinhChieu === "nam-thuan-nu-nghich" ? gioiTinh === "nam" : thuanLy, tsKhoi = TRANG_SINH_KHOI[hanhCuc];
    const trangSinh = Array(12); VONG_TRANG_SINH.forEach((t, i) => { trangSinh[mod(tsKhoi + (tsThuan ? i : -i), 12)] = t; });
    // Vòng Bác sĩ [V] 不论男女命寻禄存星起，阳男阴女顺推轮，阴男阳女逆流行
    const bacSi = Array(12); VONG_BAC_SI.forEach((t, i) => { bacSi[mod(loc + (thuanLy ? i : -i), 12)] = t; });
    // Vòng Thái Tuế: khởi chi năm, luôn thuận
    const thaiTue = Array(12); VONG_THAI_TUE.forEach((t, i) => { thaiTue[mod(chiNam + i, 12)] = t; });
    // [V] 安大限诀: 阳男阴女从命前一宫起顺行 是父母宫。阴男阳女从命后一宫起逆行 是兄弟宫 — đại hạn đầu tại Mệnh từ tuổi = số cục (quy ước phổ biến, iztro) [I]
    const daiHan = Array(12); for (let i = 0; i < 12; i++) daiHan[mod(menh + (thuanLy ? i : -i), 12)] = [cucSo + 10 * i, cucSo + 10 * i + 9];
    // [V] 安小限诀 不论阴阳男俱顺数不论阴阳女俱逆数 — tuổi 1 tại cung khởi
    const thKhoi = TIEU_HAN_KHOI[nhomTamHop(chiNam)], tieuHan = Array(12);
    for (let i = 0; i < 12; i++) tieuHan[mod(thKhoi + (gioiTinh === "nam" ? i : -i), 12)] = [1,2,3,4,5,6,7,8].map(k => i + 1 + 12 * (k - 1));
    // Gom 12 cung
    const cung = [];
    for (let chi = 0; chi < 12; chi++) {
      const viTri = mod(menh - chi, 12);  // Mệnh 0, Huynh đệ 1 … đi nghịch
      const chinhTinh = CHINH_TINH.filter(t => sao[t] === chi).map(t => ({ ten: t, doSang: doSang(t, chi), hoa: tuHoa[t] || null }));
      const phuTinh = Object.keys(sao).filter(t => sao[t] === chi && loai[t] !== "chinh").map(t => ({ ten: t, loai: loai[t], doSang: doSang(t, chi), hoa: tuHoa[t] || null }));
      cung.push({ chi, ten: TEN_CUNG[viTri], can: canCung(chi), canChi: `${CAN[canCung(chi)]} ${CHI[chi]}`, laMenh: chi === menh, laThan: chi === than,
        chinhTinh, phuTinh, tuan: tuan.includes(chi), triet: triet.includes(chi), trangSinh: trangSinh[chi], bacSi: bacSi[chi], thaiTue: thaiTue[chi], daiHan: daiHan[chi], tieuHan: tieuHan[chi] });
    }
    return { profile: CAU_HINH.profile, cauHinh: Object.assign({}, CAU_HINH), nhap, gioiTinh, duong: ch.duong, am, gio: { chi: chiGio, ten: CHI[chiGio] }, gioTyCuoiNgay: ch.gioTyCuoiNgay, namAn, thangAn,
      nam: { idx60: idxNam, can: canNam, chi: chiNam, ten: CanChi.ten(idxNam), napAm: CanChi.napAm(idxNam) }, amDuong, thuanLy,
      menh, than, cuc: { so: cucSo, ten: cucTen, hanh: hanhCuc, napAmMenh: CanChi.napAm(idxMenh) }, menhChu: MENH_CHU[menh], thanChu: THAN_CHU[chiNam % 6],
      sao, loai, tuHoa, tuan, triet, trangSinh, bacSi, thaiTue, daiHan, tieuHan, cung };
  }

  // ---------------------------------------------------------------- LƯU NIÊN cho một năm âm lịch
  function luuNien(ls, namXem) {
    const idx = CanChi.nam(namXem), can = idx % 10, chi = idx % 12, tuoi = namXem - ls.namAn + 1;
    const s = {}, dat = (t, c) => { s[t] = mod(c, 12); };
    const loc = LOC_TON[can]; dat("L.Lộc Tồn", loc); dat("L.Kình Dương", loc + 1); dat("L.Đà La", loc - 1);   // [V] 安流禄流羊流陀诀 论流年太岁: 假如己丑流年流禄在午、流羊在未、流陀在巳
    dat("L.Thiên Mã", THIEN_MA[nhomTamHop(chi)]); dat("L.Thiên Khôi", KHOI_VIET[can][0]); dat("L.Thiên Việt", KHOI_VIET[can][1]);
    dat("L.Văn Xương", LUU_XUONG_KHUC[can][0]); dat("L.Văn Khúc", LUU_XUONG_KHUC[can][1]);                      // [I]
    dat("L.Hồng Loan", 3 - chi); dat("L.Thiên Hỷ", 9 - chi); dat("L.Thiên Khốc", 6 - chi); dat("L.Thiên Hư", 6 + chi);
    const thaiTue = Array(12); VONG_THAI_TUE.forEach((t, i) => { thaiTue[mod(chi + i, 12)] = "L." + t; });                 // [V] 丧门白虎吊客官府 theo lưu niên Thái Tuế
    const tuHoa = {}; bangTuHoa(can).forEach((t, i) => { tuHoa[t] = HOA_NGAN[i]; });
    // Trước tuổi khởi đại hạn: đồng hạn. [V] 安童限诀: 一命二财三疾厄，四妻五福六官禄，余年一派顺流行，十五命宫看端的
    const DONG_HAN = [0, 4, 5, 2, 10, 8]; // vị trí cung kể từ Mệnh (Mệnh, Tài bạch, Tật ách, Phu thê, Phúc đức, Quan lộc)
    const laDongHan = tuoi >= 1 && tuoi < ls.cuc.so;
    const cungDaiHan = laDongHan ? mod(ls.menh - DONG_HAN[Math.min(tuoi, 6) - 1], 12) : ls.daiHan.findIndex(r => tuoi >= r[0] && tuoi <= r[1]);
    const cungTieuHan = ls.tieuHan.findIndex(r => r.includes(tuoi)) >= 0 ? ls.tieuHan.findIndex(r => r.includes(tuoi)) : mod(TIEU_HAN_KHOI[nhomTamHop(ls.nam.chi)] + (ls.gioiTinh === "nam" ? tuoi - 1 : -(tuoi - 1)), 12);
    return { nam: namXem, ten: CanChi.ten(idx), can, chi, tuoi, sao: s, thaiTue, tuHoa, cungDaiHan, laDongHan, cungTieuHan, cungLuuThaiTue: chi };
  }

  // Danh sách bước an sao để trang "Cách an sao và nguồn" hiển thị (không chép bảng — chỉ mô tả + nhãn)
  const CAC_BUOC = [
    ["Giờ, ngày, năm, tháng", "Giờ Tý 23h–24h theo cấu hình gioTySangNgaySau; năm theo ranhGioiNam; tháng nhuận theo thangNhuan. Âm lịch, can chi lấy từ lõi chung (chung/lich.js, can-chi.js).", "cấu hình"],
    ["Mệnh, Thân", "Từ Dần đếm thuận tới tháng sinh; từ đó đếm nghịch tới giờ sinh là Mệnh, đếm thuận là Thân.", "[V] 安身命例"],
    ["12 cung", "Từ Mệnh đi nghịch: Huynh đệ, Phu thê, Tử tức, Tài bạch, Tật ách, Thiên di, Nô bộc, Quan lộc, Điền trạch, Phúc đức, Phụ mẫu.", "[V] 安十二宫例"],
    ["Can cung", "Ngũ hổ độn theo can năm: Giáp Kỷ khởi Bính Dần…", "[V] 起五行寅例"],
    ["Cục", "Hành nạp âm của can chi cung Mệnh: Thủy 2, Mộc 3, Kim 4, Thổ 5, Hỏa 6.", "[V] 安身命例, 六十花甲子纳音歌"],
    ["Tử Vi", "Theo bảng cục–ngày cuối quyển 2; mã dùng công thức tương đương, tool kiểm đối chiếu từng ô bảng.", "[V] bảng 水二局…火六局"],
    ["13 chính tinh còn lại", "Tử Vi → Cơ, Dương, Vũ, Đồng, Liêm nghịch; Thiên Phủ đối xứng trục Dần Thân → Âm, Tham, Cự, Tướng, Lương, Sát, Phá thuận.", "[V] 安南北斗诸星诀, 安天府图"],
    ["Xương Khúc, Tả Hữu, Khôi Việt, Lộc Tồn, Kình Đà, Thiên Mã, Không Kiếp", "Theo giờ, tháng, can năm, chi năm như quyết.", "[V]"],
    ["Hỏa Linh", "Cung khởi theo tam hợp chi năm [V]; chiều đếm tới giờ sinh theo hoaLinhChieu.", "[V] cung khởi · [I] chiều"],
    ["Tứ Hóa", "Theo can năm; can Canh và Nhâm theo cấu hình.", "[V] 安禄权科忌四星变化诀"],
    ["Tuần, Triệt", "Tuần: tuần giáp của can chi năm sinh. Triệt: theo can năm.", "[V] 安旬中空亡诀, 安截路空亡诀"],
    ["Vòng Tràng sinh", "Khởi theo cục (Thủy Thổ Thân, Mộc Hợi, Kim Tỵ, Hỏa Dần); chiều theo trangSinhChieu.", "[V] cung khởi, nguyên văn 男命顺数女命逆数"],
    ["Vòng Bác sĩ", "Khởi Lộc Tồn; dương nam âm nữ thuận, âm nam dương nữ nghịch.", "[V] 安十二宫太岁杀禄诀"],
    ["Vòng Thái Tuế", "Khởi chi năm, thuận; Tang Môn, Bạch Hổ, Điếu Khách, Quan Phù có nguyên văn; 8 tên còn lại theo sách Việt.", "[V] 4 mốc · [I] tên"],
    ["Đại hạn, tiểu hạn", "Đại hạn đầu tại Mệnh từ tuổi bằng số cục, dương nam âm nữ thuận; tiểu hạn khởi theo tam hợp chi năm, nam thuận nữ nghịch.", "[V] 安大限诀, 安小限诀"],
    ["Phụ tinh khác", "Hồng Loan Thiên Hỷ, Long Trì Phượng Các, Khốc Hư, Thiên Hình Thiên Riêu, Tam Thai Bát Tọa, Thai Phụ Phong Cáo, Thiên Thương Thiên Sứ, Đẩu Quân, Thiên Đức, Niên Giải có nguyên văn; Đào Hoa, Hoa Cái, Kiếp Sát, Cô Quả, Thiên Quan Thiên Phúc, Thiên Trù, Lưu Hà, Quốc Ấn Đường Phù, Thiên Y, Giải Thần, Thiên Địa Giải, Ân Quang Thiên Quý, Thiên Tài Thiên Thọ, Phá Toái, Thiên Không, Thiên La Địa Võng theo sách Việt / iztro.", "[V] / [I] ghi tại từng dòng mã"],
    ["Độ sáng", "Bảng 7 mức cuối quyển 2 (miếu, vượng, đắc địa, lợi ích, bình hòa, bất đắc địa, hãm) cho 14 chính tinh + Xương Khúc Lộc Kình Đà Hỏa Linh.", "[V]"],
    ["Lưu niên", "Lưu Lộc Kình Đà theo can năm xem [V]; lưu Mã, Khôi Việt, Xương Khúc, Loan Hỷ, Khốc Hư, vòng Thái Tuế lưu, Tứ Hóa lưu; cung đại hạn, tiểu hạn của tuổi.", "[V] / [I]"],
  ];

  return { CAU_HINH, PROFILE, MO_TA_CAU_HINH, datProfile, laSo, luuNien, viTriTuVi, anChinhTinh, doSang, DO_SANG, bangTuHoa, am2jd, chuanHoa,
    TEN_CUNG, CHINH_TINH, HAN_SAO, TEN_HOA, VONG_TRANG_SINH, VONG_BAC_SI, VONG_THAI_TUE, CAC_BUOC, LOC_TON, KHOI_VIET, THIEN_MA, HOA_LINH_KHOI, TRIET, TIEU_HAN_KHOI, TRANG_SINH_KHOI };
})();
if (typeof window !== "undefined") window.TuVi = TuVi;
