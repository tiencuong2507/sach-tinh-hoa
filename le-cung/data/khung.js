// Lễ cúng — khung chung: nhóm lễ, khung văn khấn 6 phần (Chu Tử gia lễ quyển 5), văn bản pháp lý được dẫn, nguồn.
// Trích Hán đối chiếu được trong nguon/zh-gia-le-q05.txt (tools/kiem-tra-le-cung.mjs). Phần dịch nghĩa, diễn giải là của kho.
window.LC_LE = window.LC_LE || { le: [] };
Object.assign(window.LC_LE, {
nhom: [
  { ma: "quanh-nam", ten: "Lễ quanh năm", mota: "Theo lịch âm, lặp lại mỗi năm; phần lớn là cúng gia tiên nhân ngày tuần tiết." },
  { ma: "vong-doi", ten: "Lễ vòng đời", mota: "Gắn với một việc của gia đình: sinh con, cưới hỏi, làm nhà, mở hàng, mừng thọ." },
  { ma: "tang-gio", ten: "Tang lễ và giỗ", mota: "Từ khi mất tới giỗ hằng năm; thời điểm tính từ ngày mất." }
],
// Khung 6 phần của một bài chúc văn theo Chu Tử gia lễ quyển 5 (tế tứ thời, sơ hiến): mỗi phần kèm câu Hán nguyên văn
// (bản Tứ khố toàn thư trên zh.wikisource, giữ chữ dị thể như 嵗) và lời diễn giải. Bài khấn trong kho soạn theo thứ tự này.
khung: [
  { so: 1, ten: "Thời gian", han: "維年嵗月朔日子", nghia: "Duy năm, tháng, ngày… — mở đầu bằng thời điểm làm lễ.", viet: "Hôm nay là ngày… tháng… năm… (âm lịch)." },
  { so: 2, ten: "Người khấn xưng danh", han: "孝元孫某官某", nghia: "Cháu hiếu đời xa là… — người khấn tự xưng theo quan hệ với người được tế.", viet: "Con là…, cùng gia đình ngụ tại…" },
  { so: 3, ten: "Lời kính cáo", han: "敢昭告於", nghia: "Dám kính cáo cùng… — câu nối sang đối tượng.", viet: "Kính cáo / kính lạy…" },
  { so: 4, ten: "Đối tượng", han: "皇高祖考某官府君皇高祖妣某封某氏", nghia: "Cao tổ khảo, cao tổ tỷ… — gọi đúng người, đúng vị được mời.", viet: "Gia tiên, Thổ công, Táo quân, người đã khuất…" },
  { so: 5, ten: "Lý do và lễ vật", han: "氣序流易時維仲春追感嵗時不勝永慕敢以潔牲柔毛粢盛醴齊祗薦嵗事", nghia: "Khí tiết đổi dời, nay đang giữa xuân, nhớ cảm năm tháng, lòng mãi tưởng nhớ; dám dùng vật sạch, xôi, rượu kính dâng lễ hằng năm.", viet: "Nhân dịp…, chúng con thành tâm sửa biện lễ vật…" },
  { so: 6, ten: "Lời cầu và kết", han: "尚饗", nghia: "Xin hưởng — lời mời hưởng lễ, khép bài.", viet: "Cúi xin chứng giám… Kính mong…" }
],
// Các biến thể trong cùng quyển 5, cho thấy chính sách gốc đã chấp nhận "chỉ đổi mấy chữ" theo dịp
bienThe: [
  { dip: "Ngày giỗ (kỵ nhật)", han: "嵗序流易諱日復臨追逺感時不勝永慕", nghia: "Năm tháng đổi dời, ngày giỗ lại đến, nhớ xa cảm nay, lòng mãi tưởng nhớ." },
  { dip: "Giỗ cha mẹ", han: "考妣改不勝永慕為昊天罔極", nghia: "Với cha mẹ thì đổi 'không ngớt tưởng nhớ' thành 'ơn trời bao la không bờ'." },
  { dip: "Ngày giỗ, cách ăn ở", han: "是日不飲酒不食肉不聼樂", nghia: "Ngày ấy không uống rượu, không ăn thịt, không nghe nhạc." },
  { dip: "Tế ở mộ (tảo mộ)", han: "氣序流易雨露既濡瞻掃封塋不勝感慕", nghia: "Khí tiết đổi dời, mưa móc đã thấm, trông quét phần mộ, không ngớt cảm nhớ." },
  { dip: "Khấn Thổ thần ở mộ", han: "某官姓名敢昭告於后土氏之神某恭修嵗事於某親某官府君之墓惟時保佑實頼神休敢以酒饌敬伸奠獻尚饗", nghia: "Họ tên… dám kính cáo thần Hậu Thổ: tôi kính sửa lễ hằng năm ở mộ của…, xin được bảo hộ, thật nhờ ơn thần; dám dùng rượu cỗ kính dâng, xin hưởng." },
  { dip: "Nguyên tắc chung của tế lễ", han: "凡祭主於盡愛敬之誠而已貧則稱家之有無疾則量筋力而行之財力可及者自當如儀", nghia: "Phàm tế cốt ở hết lòng thành yêu kính mà thôi; nghèo thì tùy nhà có hay không, bệnh thì lượng sức mà làm; sức của tới đâu thì theo nghi thức tới đó." }
],
// Văn bản pháp lý được dẫn trong các lễ. Số hiệu và nội dung chính theo NGHIEN-CUU/00-ban-do-kho-sach.md mục 8 (đã mở trang luật);
// kho không dẫn số điều cụ thể vì chưa đối chiếu từng điều trên Công báo.
vanBan: {
  "308": { ten: "Quyết định 308/2005/QĐ-TTg", ve: "Quy chế thực hiện nếp sống văn minh trong việc cưới, việc tang và lễ hội" },
  "04": { ten: "Thông tư 04/2011/TT-BVHTTDL", ve: "Quy định về việc thực hiện nếp sống văn minh trong việc cưới, việc tang và lễ hội" },
  "105": { ten: "Nghị định 105/2012/NĐ-CP (sửa đổi bởi Nghị định 237/2025/NĐ-CP)", ve: "Tổ chức lễ tang cán bộ, công chức, viên chức" }
},
nguon: [
  { ten: "Phan Kế Bính, Việt Nam phong tục (1915) — Wikisource tiếng Việt, phạm vi công cộng", url: "https://vi.wikisource.org/wiki/Việt_Nam_phong_tục", ghi: "Tải 25/10/2026 các mục: Phụng sự tổ tôn, Thượng thọ, Sinh nhật, Thần hoàng, Tang ma, Cải táng, Kỵ nhật, Tứ thời tiết lạp, Giá thú, Cầu tự, Sự thần, Việc tế tự, Lễ kỳ an, Việc hiếu, Việc hỉ, Cô hồn, Xem ngày kén giờ, Cư sở." },
  { ten: "Chu Hy, Gia lễ (家禮) bản Tứ khố toàn thư, quyển 5 Tế lễ — Wikisource tiếng Trung", url: "https://zh.wikisource.org/wiki/家禮_(四庫全書本)/卷5", ghi: "Khung chúc văn 6 phần và các biến thể theo dịp." },
  { ten: "Lõi lịch âm dùng chung của kho (chung/lich.js)", url: "../chung/lich.js", ghi: "Đổi ngày âm sang dương cho bảng Lịch lễ." }
],
gioiHan: [
  "Không có 'chuẩn mực duy nhất' cho lễ cúng và bài khấn: gia lễ cổ tự ghi các dịp khác chỉ đổi mấy chữ; Nhà nước chỉ quy định khung hành vi, không ban hành bài khấn; sách văn khấn đang bán là biên soạn tư nhân. Kho không dùng chữ 'chuẩn nhất'.",
  "Thọ Mai gia lễ (thế kỷ 18) chưa có bản gốc số hóa công cộng; bản quốc ngữ đang bán có bản quyền biên soạn. Kho không trích Thọ Mai gia lễ.",
  "Mọi bài khấn trong kho là bản soạn của kho theo khung 6 phần của Chu Tử gia lễ, viết bằng tiếng Việt hiện đại; không phải bản cổ, không phải bản 'đúng nhất'. Anh chị có thể sửa chữ cho hợp nhà mình.",
  "Phần tục lệ trích nguyên văn Phan Kế Bính viết năm 1915 ở Bắc Bộ; nhiều tục đã đổi. Lễ nào ông không chép thì kho ghi rõ và phần tự soạn mang nhãn [I].",
  "Khác biệt ba miền: chưa tìm được nghiên cứu có nguồn, kho không viết. Ô 'Dị bản' chỉ ghi khác biệt có trong nguồn đã tải.",
  "Khung pháp lý dẫn theo số hiệu văn bản, chưa đối chiếu từng điều trên Công báo; khi cần làm việc với cơ quan, anh chị tra bản gốc."
]
});
