// Hoàng cực kinh thế (皇極經世, Thiệu Ung 邵雍, đời Tống): hàm tính Nguyên – Hội – Vận – Thế và chương N9.
// MỐC lấy từ nguyên văn bản Tứ khố trên Wikisource (nguon/hckt/*.txt):
//  - 卷05上: 經會之巳六 · 經運之癸一百八十 · 經世之未二千一百五十六 … 甲辰唐帝堯肇位于平陽; 經世之申二千一百五十七 · 甲子唐帝堯二十一年
//  - 卷06中: 經會之午七 · 經運之辛一百八十八 · 經世之子二千二百四十五 · 甲子晉惠帝十四年 (= năm 304)
//  - 卷03上: 經月之寅三 · 開物始月寅之中 · 經星之己七十六
// Từ "thế 2245 bắt đầu năm 304 (甲子)" suy ra: năm thứ 1 của Nguyên = năm thiên văn −67016 (tức 67017 TCN), cũng là năm 甲子.
// Đối chiếu: Nghiêu 甲辰 rơi vào thế 2156 = 2357 TCN (đúng niên đại truyền thống). Đây là niên biểu của Thiệu Ung, không phải niên đại khoa học.
"use strict";
const HCKT = (() => {
  const GOC = -67016;                       // năm thiên văn của năm 1 trong Nguyên (năm 0 = 1 TCN)
  const CAN_ = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
  const CHI_ = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
  const CHI_ZH = "子丑寅卯辰巳午未申酉戌亥", CAN_ZH = "甲乙丙丁戊己庚辛壬癸";
  // Hội ↔ 12 quẻ tiêu tức (theo cách phối của học phái Thiệu Ung, cùng phép với tháng – xem N5)
  const QUE_HOI = [[24,"Phục"],[19,"Lâm"],[11,"Thái"],[34,"Đại Tráng"],[43,"Quải"],[1,"Càn"],[44,"Cấu"],[33,"Độn"],[12,"Bĩ"],[20,"Quan"],[23,"Bác"],[2,"Khôn"]];
  const nam = y => y <= 0 ? `${1 - y} TCN` : `${y}`;          // năm thiên văn → chữ
  const ceil = (a, b) => Math.floor((a - 1) / b) + 1;
  // y: năm thiên văn (1 = năm 1; 0 = 1 TCN; −2356 = 2357 TCN)
  function info(y) {
    const t = y - GOC + 1;                                     // thứ tự năm trong Nguyên (1…129600)
    if (t < 1 || t > 129600) return null;
    const hoi = ceil(t, 10800), van = ceil(t, 360), the = ceil(t, 30);
    const vanTrongHoi = van - (hoi - 1) * 30, theTrongVan = the - (van - 1) * 12, namTrongThe = t - (the - 1) * 30;
    const tu = k => GOC + (k - 1);                              // năm thiên văn bắt đầu của năm thứ k
    return { y, t, hoi, van, the, vanTrongHoi, theTrongVan, namTrongThe,
      tenHoi: `Hội ${CHI_[hoi-1]} (${CHI_ZH[hoi-1]}${hoi})`, queHoi: QUE_HOI[hoi-1],
      tenVan: `Vận ${CAN_[(van-1)%10]} ${van} (${CAN_ZH[(van-1)%10]}${van})`, tenThe: `Thế ${CHI_[(the-1)%12]} ${the} (${CHI_ZH[(the-1)%12]}${the})`,
      hoiTu: nam(tu((hoi-1)*10800+1)), hoiDen: nam(tu(hoi*10800)), vanTu: nam(tu((van-1)*360+1)), vanDen: nam(tu(van*360)),
      theTu: nam(tu((the-1)*30+1)), theDen: nam(tu(the*30)) };
  }
  function bangHoi() {
    return QUE_HOI.map((q, i) => ({ hoi: i + 1, chi: CHI_[i], que: q, tu: nam(GOC + i * 10800), den: nam(GOC + (i + 1) * 10800 - 1),
      vanTu: i * 30 + 1, vanDen: (i + 1) * 30 }));
  }
  return { info, bangHoi, nam, GOC };
})();
if (typeof window !== "undefined") window.HCKT = HCKT;

window.KD_STUDY = window.KD_STUDY || [];
window.KD_STUDY.push({title:"N9. Hoàng cực kinh thế: Nguyên – Hội – Vận – Thế", html:`
<p><b>Hoàng cực kinh thế thư</b> (皇極經世書) của <b>Thiệu Ung</b> (邵雍, 1011–1077, hiệu Khang Tiết) là thử nghiệm lớn nhất trong lịch sử Dịch học nhằm dùng số và quẻ để trình bày <b>quy luật của vũ trụ và lịch sử</b>. Tứ khố đề yếu tóm: <span class="zh">以元經會，以會經運，以運經世</span> – lấy Nguyên xếp Hội, lấy Hội xếp Vận, lấy Vận xếp Thế; sách ghi sự kiện từ năm Giáp Thìn của vua Nghiêu đến năm Hiển Đức thứ 6 nhà Hậu Chu (959).</p>

<h3>1. Thang thời gian</h3>
<p>Thiệu Ung chép thang năm của một ngày lên thang của vũ trụ: 1 năm = 12 tháng = 360 ngày = 4320 giờ (giờ cổ, 12 giờ một ngày). Tương tự:</p>
<table class="tb"><tr><th>Đơn vị</th><th>Ví như</th><th>Gồm</th><th>Số năm</th><th>Tên trong sách</th></tr>
<tr><td><b>Nguyên</b> 元</td><td>năm</td><td>12 hội</td><td>129.600</td><td>經日 / 經元 (甲)</td></tr>
<tr><td><b>Hội</b> 會</td><td>tháng</td><td>30 vận</td><td>10.800</td><td>經月 / 經會 (đánh dấu bằng 12 chi)</td></tr>
<tr><td><b>Vận</b> 運</td><td>ngày</td><td>12 thế</td><td>360</td><td>經星 / 經運 (đánh dấu bằng 10 can)</td></tr>
<tr><td><b>Thế</b> 世</td><td>giờ</td><td>30 năm</td><td>30</td><td>經辰 / 經世 (đánh dấu bằng 12 chi)</td></tr></table>
<p class="mute">Trong nguyên văn, mỗi đoạn niên biểu mở đầu bằng dòng như <span class="zh">經元之甲一・經會之午七・經運之辛一百八十八・經世之子二千二百四十五</span> – nghĩa là: Nguyên Giáp thứ 1, Hội Ngọ thứ 7, Vận Tân thứ 188, Thế Tý thứ 2245 (quyển 6 trung). Dòng ngay sau là <span class="zh">甲子晉惠帝十四年</span> – năm Giáp Tý đời Tấn Huệ Đế thứ 14, tức năm 304.</p>

<h3>2. Mốc tính trong phần mềm</h3>
<p>Từ dòng trên: thế 2245 mở đầu năm 304. Lùi lại 2244 thế × 30 năm thì năm thứ 1 của Nguyên là năm <b>67017 TCN</b> (cũng là năm Giáp Tý). Kiểm lại bằng một mốc thứ hai trong quyển 5 thượng: <span class="zh">經世之未二千一百五十六 … 甲辰唐帝堯肇位于平陽</span> – vua Nghiêu lên ngôi năm Giáp Thìn trong thế 2156; phép tính cho ra năm <b>2357 TCN</b>, khớp niên đại truyền thống của vua Nghiêu. Hai mốc độc lập khớp nhau, nên bảng tra dưới đây theo đúng niên biểu của Thiệu Ung.</p>

<h3>3. Mười hai Hội và vòng sinh – diệt của vũ trụ</h3>
<p>Mỗi Hội ứng với một quẻ tiêu tức (xem N5): nửa đầu Nguyên dương lớn dần (Phục → Càn), nửa sau âm lớn dần (Cấu → Khôn). Quyển 3 thượng ghi <span class="zh">經月之寅三・開物始月寅之中・經星之己七十六</span> – <b>“khai vật”</b> (muôn vật bắt đầu có) ở giữa Hội Dần, tức vận 76. Theo cách hiểu phổ biến của học phái này, muôn vật “bế” (thu tàng) ở giữa Hội Tuất; câu này em chưa dò được trong các quyển đã tải nên chỉ ghi là truyền thuyết của học phái.</p>
<table class="tb"><tr><th>Hội</th><th>Quẻ tiêu tức</th><th>Vận</th><th>Từ năm</th><th>Đến năm</th></tr>
${HCKT.bangHoi().map(h => `<tr><td>${h.hoi}. ${h.chi}</td><td>${String.fromCodePoint(0x4DC0 + h.que[0] - 1)} ${h.que[0]}. ${h.que[1]}</td><td>${h.vanTu}–${h.vanDen}</td><td>${h.tu}</td><td>${h.den}</td></tr>`).join("")}</table>

<h3>4. Bây giờ đang ở đâu?</h3>
<p>Theo niên biểu này, <b>Hội Ngọ</b> (quẻ Cấu ䷫ – một hào âm mới sinh dưới năm hào dương) bắt đầu từ năm <b>2217 TCN</b> và kéo dài tới năm 8583. Năm 2026 thuộc <b>Hội Ngọ, Vận Ất 192</b> (1744–2103), <b>Thế Dậu 2302</b> (2014–2043), là năm thứ 13 của thế này. Hãy mở thẻ “🗓 Tra năm” để xem năm bất kỳ.</p>
<p>Ý nghĩa tượng: Hội Tỵ (Càn) là đỉnh của dương – thời Nghiêu, Thuấn mà Thiệu Ung coi là thịnh trị nhất (quyển 13: <span class="zh">堯之前先天也，堯之後後天也</span> – trước Nghiêu là Tiên thiên, sau Nghiêu là Hậu thiên). Từ Hội Ngọ, âm bắt đầu sinh: văn minh vẫn ở mức cao nhưng xu hướng chung là <b>từ thịnh chuyển dần sang suy</b>, giống quẻ Cấu: “nữ tráng, chớ cưới” – một mầm âm nhỏ mà tiềm lực lớn, cần cảnh giác từ sớm. Quan điểm lịch sử của ông vì thế mang tính thoái hóa: Hoàng → Đế → Vương → Bá (quyển 13: <span class="zh">法始乎伏羲，成乎堯，革于三王，極于五霸，絶于秦</span>).</p>

<h3>5. Phần chưa thống nhất</h3>
<ul>
<li><b>Quẻ trực cho từng Vận, từng Thế</b>: các nhà chú đời sau (Trương Hành Thành, Chúc Bí…) có nhiều phép phối quẻ khác nhau cho vận và thế; kết quả không trùng nhau. Phần mềm chỉ phối quẻ cấp Hội (phần thống nhất) và không tự chọn một phép phối cấp Vận.</li>
<li><b>Hoàng cực kinh thế khác Tam nguyên cửu vận</b>: chu kỳ 360 năm của Thiệu Ung không trùng với chu kỳ 180 năm của Huyền Không. Hai hệ không nên trộn khi luận.</li>
<li>Sách lấy niên đại truyền thống (Nghiêu 2357 TCN) – các niên đại trước thời Cộng Hòa (841 TCN) chưa được sử học xác nhận.</li>
</ul>
<p class="mute">Nguồn: <i>Hoàng cực kinh thế thư</i>, bản Tứ khố toàn thư trên Wikisource (quyển 3 thượng, 5 thượng, 6 trung, 13), lưu tại <code>nguon/hckt</code>. Đây là triết học lịch sử – thuật số, không phải dự báo có kiểm chứng.</p>`});
