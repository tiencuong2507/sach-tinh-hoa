# Bản đồ kho Sách Tinh Hoa — 7 đề tài mở rộng

> Lập ngày 24/10/2026 theo yêu cầu của anh Cường. Mục đích: trước khi làm cuốn nào, công cụ nào tiếp theo, có một bản đồ chung: nguồn gốc ở đâu, dùng được không về bản quyền, ứng dụng gì, khó tới đâu, nên làm theo thứ tự nào.
>
> **Cách đọc nhãn**: `[V]` đã kiểm bằng cách mở trang nguồn hoặc chạy lệnh · `[I]` suy luận, ghi mức tin · `[U]` chưa biết, phải đo trước khi quyết. Mọi URL trong file này đã được mở thử ngày 24/10/2026, trừ chỗ ghi `[U]`.

## 0. Hiện trạng kho (24/10/2026) `[V]`

| Hạng mục | Tình trạng |
|---|---|
| Kinh Dịch (`KINH DICH/`) | 64/64 quẻ đủ nguyên văn, âm Hán Việt, dịch, giải; Thập dực đủ; 5 chương dẫn nhập; 10 chương nghiên cứu N1–N10; công cụ Gieo quẻ, Mai Hoa, Lục hào, Tra năm; 6 tool tự kiểm đều đạt |
| Nguồn gốc đã tải | Chu Dịch, Thập dực (Wikisource), Hoàng cực kinh thế bản Tứ khố (8 quyển), Tăng san bốc dịch (trang tổng + chương 1–26) |
| Lõi dùng chung đang có | `lich-am.js`: ngày Julius, đổi dương sang âm lịch (thuật toán Hồ Ngọc Đức), kinh độ mặt trời, chi tháng theo tiết khí · `app.js`: can chi năm, nạp âm 60 hoa giáp, Tam nguyên cửu vận, niên tinh · `mai-hoa.js`: hành của bát quái, sinh khắc ngũ hành · `luc-hao.js`: nạp giáp, tuần không, lục thần theo can ngày |
| Sao lưu | git từ 24/10/2026; commit 2b9b427 khởi tạo, 1cf6164 lõi chung, c4e5965 nhịp 3; chưa có bản sao ngoài máy |
| Cập nhật tối 24/10/2026 | Đã có thêm: `chung/` lõi dùng chung (13 nhóm mốc) · `XEM NGAY/` (trực, thần, giờ hoàng đạo, 28 sao, ngày kỵ, tuổi gia chủ Kim lâu Hoang ốc Tam tai, **122 thần sát × 60 việc trích từ Hiệp kỷ quyển 3–11, 507 trích dẫn dò khớp**) · `SACH NGAN/` Chu Tử gia huấn · `COI TAM/` 3 bài + audio bài 1 (edge-tts NamMinh) · `PHONG THUY/` Bát trạch, phi tinh năm tháng, la bàn 24 sơn · `index.html`. Chưa có: tử vi (chờ anh chốt phái), Huyền không đầy đủ, hình thế |
| Khuôn làm một cuốn | `nguon/` (nguyên văn tải bằng tool, public domain) → `data/*.js` (nguyên văn + âm Hán Việt + dịch + giải, biên soạn riêng) → giao diện → `tools/kiem-tra-*.mjs` (đủ trường, tên hào khớp chữ Hán, trích dẫn dò được trong nguyên văn, giao diện giả lập dựng mọi trang không lỗi) |

## 1. Luật chung cho cả kho

1. **Nguyên văn chỉ lấy từ nguồn công cộng có địa chỉ** (zh.wikisource.org, ctext.org, vi.wikisource.org, Nôm Foundation, Thư viện Quốc gia). Tải bằng tool, lưu trong `nguon/`, mọi trích dẫn phải dò được trong file nguồn.
2. **Bản dịch, bình giải tiếng Việt hiện đại có bản quyền riêng** (Luật Sở hữu trí tuệ: tác phẩm được bảo hộ suốt đời tác giả cộng 50 năm; bản dịch là tác phẩm phái sinh có bản quyền riêng của dịch giả). Kho chỉ biên soạn lời dịch và giải của mình, được tham khảo nhưng không chép.
3. **Thuật số luôn kèm ghi chú** "đời sau, không phải kinh văn, chỉ để chiêm nghiệm" như Kinh Dịch đang làm; không hứa "đúng chuẩn" khi không có nguồn duy nhất.
4. **Một luật tính, một nơi viết.** Lõi âm lịch, can chi, tiết khí, nạp âm, cửu cung phải tách thành thư mục dùng chung trước khi xây công cụ thứ hai; Kinh Dịch chuyển sang dùng lõi đó.
5. **Mỗi cuốn, mỗi công cụ có tool tự kiểm** chạy bằng `node`, có mẫu đã biết đáp án lấy từ chính sách gốc (như ba ví dụ Tăng san bốc dịch).

> Ghi chú kỹ thuật chung `[V]`: **ctext.org chặn truy cập tự động** (trả trang kiểm tra bảo mật). Mọi sách chỉ có trên ctext anh phải tự mở bằng trình duyệt và lưu tay. zh.wikisource.org và vi.wikisource.org mở bình thường, tải được bằng API như tool `tai-luc-hao.mjs` đang làm.

> Bốn điểm kỹ thuật cho tool tải Wikisource `[V]` (nhóm tra nguồn đã thử bằng API): (1) nhiều tên bị **redirect** (小窗幽記 → 醉古堂劍掃, 增廣賢文 → 增廣昔時賢文, 朱子治家格言 → 朱子家訓; 大學, 中庸, 道德經, 推背圖, 戰國策 là trang định hướng) nên gọi API với `redirects=1`; (2) API tự chuẩn hóa chữ (四書章句集註 → 集注); (3) vài trang (燒餅歌, 黃帝陰符經) chỉ là bản chiếu từ ảnh quét, `prop=revisions` không ra chữ, phải dùng `action=parse`; (4) quy ước trang con không thống nhất (`/卷一`, `/卷01`, `/卷第1`, `/01章`, `/學而第一`, `/乾之`…) nên tool phải đọc liên kết trong trang mục lục thay vì đoán tên.

## 2. Đề tài 1 — Mở rộng quanh Kinh Dịch, hướng dự đoán thời cuộc

| Sách | Tác giả / đời | Nguồn | Nội dung, ứng dụng | Quy mô | Ưu tiên |
|---|---|---|---|---|---|
| **Mai Hoa Dịch Số** 梅花易數 | Truyền Thiệu Ung; sách do người sau tập hợp `[I]` | https://zh.wikisource.org/wiki/梅花易數 `[V]` mục lục; /卷一 `[V]` 33 KB (Chu Dịch quái số, ngũ hành sinh khắc, bát cung, chiêm pháp, Quán mai chiêm); /卷二, /卷三 tồn tại | Lập quẻ từ số, thời gian, âm thanh; Thể Dụng; ngoại ứng. **Ứng dụng trực tiếp nhất cho "dự đoán"**; thẻ Mai Hoa đang có mới làm phần lập quẻ, chưa có phần luận ngoại ứng và các ví dụ trong sách | 3 quyển | 1 |
| **Kinh Thị Dịch Truyện** 京氏易傳 | Kinh Phòng (Tây Hán) | https://zh.wikisource.org/wiki/京氏易傳 `[V]` một trang 94 KB, 3 quyển, 64 mục quẻ | Gốc của bát cung, nạp giáp, thế ứng, phi phục; nền lý thuyết của Lục hào đang có | 3 quyển | 1 |
| **Y Xuyên Dịch Truyện** 伊川易傳 (Dịch truyện Trình Di) | Trình Di (Bắc Tống) | Bản thường https://zh.wikisource.org/wiki/伊川易傳 `[V]` nhưng **có chỗ ghi khuyết "以下缺，待補入"**; bản Tứ khố đầy đủ hơn https://zh.wikisource.org/wiki/伊川易傳_(四庫全書本) `[V-tồn tại]` /卷1–/卷4 | Chú giải 64 quẻ theo nghĩa lý; là một trong hai nguồn mà phần giải nghĩa Kinh Dịch hiện có ghi "theo hướng"; có nguyên văn mới đối chiếu được | 4 quyển | 1 |
| **Chu Dịch Bản Nghĩa** 周易本義 | Chu Hy (Nam Tống) | Trang thuần không có; bản Tứ khố https://zh.wikisource.org/wiki/周易本義_(四庫全書本) `[V]` /卷1–/卷4; còn 原本周易本義 12 quyển `[V-tồn tại]` | Chú gọn, giữ chủ trương Dịch là sách bói, kèm Phệ nghi; chuẩn khoa cử 700 năm; nguồn thứ hai của phần giải nghĩa hiện có | 4 hoặc 12 quyển | 1 |
| Thôi Bối Đồ 推背圖 | Truyền Viên Thiên Cang, Lý Thuần Phong; bản phổ biến có chú Kim Thánh Thán | Trang định hướng liệt kê **18 dị bản** `[V]`; bản chính https://zh.wikisource.org/wiki/推背圖_(袁天罡、李淳風) `[V]` đủ 60 tượng, mỗi tượng sấm, tụng, chú, hình | Sách "dự đoán thời cuộc" tiêu biểu nhưng là ngụy thư nhiều dị bản; khi dịch phải ghi rõ bản nào | 60 tượng | 2 |
| Thiêu Bính Ca 燒餅歌 | Truyền Lưu Bá Ôn; văn bản xuất hiện muộn `[I]` | https://zh.wikisource.org/wiki/燒餅歌 `[V]` nhưng là bản chiếu từ ảnh quét, phải tải bằng `action=parse` | Đọc kèm Thôi Bối Đồ | rất ngắn | 2 |
| Tiêu Thị Dịch Lâm 焦氏易林 | Tiêu Diên Thọ (Tây Hán) | https://zh.wikisource.org/wiki/焦氏易林 `[V]` 64 trang con /乾之 … /未濟之 | 4.096 bài thơ bốn chữ cho "quẻ X biến quẻ Y": kho thi liệu đoán quẻ biến, nối thẳng vào thẻ Gieo quẻ | 4.096 bài | 2 |
| Thái Huyền Kinh 太玄經 | Dương Hùng (Tây Hán) | https://zh.wikisource.org/wiki/太玄經 `[V]` một trang 97 KB, 81 thủ + 9 truyện | Hệ tam phân mô phỏng Dịch, mỗi thủ ứng 4,5 ngày; triết lý số | 81 thủ | 2 |
| Chu Dịch Tham Đồng Khế | Ngụy Bá Dương (Đông Hán) | https://zh.wikisource.org/wiki/周易參同契 `[V]` 35 chương trang con | Luyện đan, dưỡng sinh; **không phải sách dự đoán** | 35 chương | 3 |
| Hà Lạc Lý Số, Thiết Bản Thần Số | Truyền Trần Đoàn, Thiệu Ung | **Không có trên Wikisource** `[V-missing]`; ctext chặn | Số mệnh cá nhân; chưa có nguồn công cộng sạch | | 3 |
| Hoàng cực kinh thế | Thiệu Ung | Đã có trong kho (bản Tứ khố 皇極經世書) | | 14 quyển | đã có |

**Nhận xét**: bốn cuốn Y Xuyên Dịch Truyện, Chu Dịch Bản Nghĩa, Kinh Thị Dịch Truyện, Mai Hoa Dịch Số tạo thành trục **nghĩa lý – tượng số – bốc dịch** bổ sung trực tiếp cho sách đang có; nên làm trước. Thôi Bối Đồ, Thiêu Bính Ca làm sau và ghi rõ tính chất ngụy thư. Về "dự đoán thời cuộc" nghiêm túc, kho đã có N5 (tiêu tức), N6, N7 (cửu vận), N9 (Hoàng cực); bước đào sâu hợp lý là đối chiếu các dự đoán ấy với mốc lịch sử đã biết theo đúng luật kiểm thử trung thực (tập đối chiếu đóng băng trước, ghi cả chỗ sai).

## 3. Đề tài 2 — Sách cổ tinh hoa vận dụng đời sống (15 cuốn, xếp theo thứ tự nên làm)

| Hạng | Sách | Tác giả / đời | Nguồn `[V]` | Nội dung, ứng dụng | Quy mô |
|---|---|---|---|---|---|
| 1 | Thái Căn Đàm 菜根譚 | Hồng Ứng Minh (Minh) | https://zh.wikisource.org/wiki/菜根譚 một trang 104 KB, gồm cả bản khắc Minh (222 + 134 điều) và bản khắc Thanh (5 mục) | Cách ngôn xử thế dung hợp Nho Phật Đạo; tu thân, giữ tâm giữa đời | khoảng 737 điều |
| 2 | Tăng Quảng Hiền Văn | khuyết danh (Minh Thanh) | https://zh.wikisource.org/wiki/增廣昔時賢文 (redirect) 34 KB. **Cảnh báo**: trường chủ đề trong trang có dấu vết phá hoại, tool phải lấy bản sửa đổi sạch | Tục ngữ, châm ngôn đời sống dân gian | khoảng 400 câu |
| 3 | Minh Tâm Bảo Giám | Phạm Lập Bản (Minh) | https://zh.wikisource.org/wiki/明心寶鑑 một trang 102 KB, 20 thiên | Tuyển cách ngôn thánh hiền theo chủ đề; từng là sách học của người Việt | 20 thiên |
| 4 | Liễu Phàm Tứ Huấn | Viên Liễu Phàm (Minh, 1602) | https://zh.wikisource.org/wiki/了凡四訓 35 KB, 4 thiên | Lập mệnh, sửa lỗi, tích thiện, khiêm đức; rất thực hành | 4 thiên |
| 5 | Vi Lư Dạ Thoại | Vương Vĩnh Bân (Thanh) | https://zh.wikisource.org/wiki/圍爐夜話 27 KB | Cách ngôn gia đình, tu thân | khoảng 220 điều |
| 6 | Tiểu Song U Ký (tức Túy cổ đường kiếm tảo) | Lục Thiệu Hành (Minh) | https://zh.wikisource.org/wiki/醉古堂劍掃 (redirect) 12 quyển trang con | Thanh ngôn 12 tập: tỉnh, tình, tiễu, linh, tố, cảnh… | 12 quyển |
| 7 | U Mộng Ảnh | Trương Triều (Thanh) | https://zh.wikisource.org/wiki/幽夢影 một trang 112 KB, kèm lời bình bạn bè | 219 câu cảm ngộ nhân sinh | 219 điều |
| 8 | Nhan Thị Gia Huấn | Nhan Chi Thôi (Bắc Tề) | https://zh.wikisource.org/wiki/顏氏家訓 7 trang con /卷第1… | Gia huấn sớm nhất: dạy con, trị gia, học vấn | 20 thiên |
| 9 | Chu Tử Gia Huấn (Trị gia cách ngôn) | Chu Dụng Thuần (Minh mạt Thanh sơ) | https://zh.wikisource.org/wiki/朱子家訓 (redirect) 2 KB | Khoảng 500 chữ trị gia; **làm được trong một buổi** | 1 bài |
| 10 | Tố Thư 素書 | Truyền Hoàng Thạch Công | https://zh.wikisource.org/wiki/素書 5 KB, 6 chương | Đạo đức nhân nghĩa lễ dùng vào mưu sự; ngắn, giá trị cao | khoảng 1.300 chữ |
| 11 | Trường Đoản Kinh (Phản Kinh) | Triệu Nhuy (Đường) | https://zh.wikisource.org/wiki/長短經 64 thiên trang con | Quyền mưu trị thế, dùng người, biết thời | 9 quyển |
| 12 | Trí Nang | Phùng Mộng Long (Minh) | https://zh.wikisource.org/wiki/智囊 28 trang con /01–/28 | Khoảng 1.200 chuyện mưu trí kèm bình; lớn, nên chọn lọc | 28 quyển |
| 13 | Thế Thuyết Tân Ngữ | Lưu Nghĩa Khánh, chú Lưu Hiếu Tiêu | https://zh.wikisource.org/wiki/世說新語 36 môn trang con, kèm chú | Giai thoại danh sĩ Ngụy Tấn | khoảng 1.100 điều |
| 14 | Âm Phù Kinh | khuyết danh | https://zh.wikisource.org/wiki/黃帝陰符經 bản chiếu ảnh quét, cần `action=parse` | Khoảng 400 chữ về thiên cơ | 3 chương |
| 15 | Hoàng Đế Nội Kinh (chỉ phần dưỡng sinh) | khuyết danh | https://zh.wikisource.org/wiki/黃帝內經 mục lục, trang chưa hiệu đính | Chỉ lấy Thượng cổ thiên chân luận, Tứ khí điều thần đại luận | 2–4 thiên |

Đã kiểm nhưng xếp cuối: Quốc Ngữ, Chiến Quốc Sách (sử, dài), Thọ Thế Bảo Nguyên (y thư, một trang 1,1 MB). Lý do xếp hạng: toàn văn một trang, sạch, ngắn lên trước (làm nhanh, ít rủi ro); mức quen thuộc với người Việt; giá trị ứng dụng trực tiếp; sách lớn hoặc chú thích nặng xếp sau vì chi phí dịch cao.


## 4. Đề tài 3 — Tử vi, lá số, phong thủy (để xây công cụ)

### 4.1 Sách gốc chữ Hán công cộng

| Sách | Tác giả / đời | Nguồn | Nội dung | Ưu tiên |
|---|---|---|---|---|
| **Tử vi đẩu số toàn thư** 紫微斗數全書 | Truyền thống gán Trần Đoàn; bản lưu hành đời Thanh. Nghiên cứu hiện đại chỉ xác nhận văn bản hoàn chỉnh từ thế kỷ 16 `[V]` | https://zh.wikisource.org/wiki/紫微斗數全書 `[V]` trang mục lục 3 quyển 52 mục; thân văn từng mục chưa mở `[U]` | Quyển 2 "An thân mệnh lệ" là phần **thuật toán an sao**; quyển 1 phú, hỏi đáp từng sao; quyển 3 luận cách cục | 1 |
| Tử vi đẩu số toàn tập 全集 | | Wikisource không có `[U]`; ctext chặn | Khác Toàn thư ở bảng Tứ Hóa can Canh, Nhâm | 2 |
| **Táng thư** 葬書 | Gán Quách Phác (Tấn), Wikisource nghi ngờ | https://zh.wikisource.org/wiki/葬書 `[V]` toàn văn khoảng 1.800 chữ | Nội, Ngoại, Tạp thiên; "khí thừa phong tắc tán, giới thủy tắc chỉ" | 1 (lý thuyết phong thủy) |
| Thanh nang kinh 青囊經 kèm chú Tưởng Đại Hồng | | https://zh.wikisource.org/wiki/青囊經 `[V]` | Nền của Huyền không | 2 |
| Thẩm thị huyền không học | Thẩm Trúc Nhưng (1849–1906) `[V]`; sách in sau khi mất, phần biên tập của người sau có thể còn bản quyền `[I]` | Wikisource không có `[U]`; ctext chặn | Huyền không phi tinh: vận bàn, sơn hướng tinh, thế quái | 1 cho Huyền không, nhưng chưa có nguồn mở |
| Bát trạch minh kính, Dương trạch tam yếu, Địa lý ngũ quyết, Tuyết tâm phú | Thanh / Đường | Wikisource không có `[U]`; ctext chặn | Bát trạch, Môn Chủ Táo, hình thế | 2–3 |
| **Uyên hải tử bình** 淵海子平 | Dương Tông (Minh) theo Wikisource | https://zh.wikisource.org/wiki/淵海子平 `[V]` nhưng đánh dấu chưa hoàn chỉnh | Tứ trụ: thập thần, cách cục | 1 (Tứ trụ) |
| Tam mệnh thông hội 三命通會 | Vạn Dân Anh (Minh) | https://zh.wikisource.org/wiki/三命通會 `[V]` 9/12 quyển | Bách khoa Tứ trụ, nạp âm, thần sát | 2 |
| Tích thiên tủy 滴天髓 · Cùng thông bảo giám 窮通寶鑑 | | https://zh.wikisource.org/wiki/滴天髓 · https://zh.wikisource.org/wiki/窮通寶鑑 `[V]` toàn văn | Lý luận cao cấp; điều hậu 10 can × 4 mùa | 2 |

### 4.2 Khung thuật toán an lá số (12 bước) `[I, tin cao]`
Đầu vào: năm tháng ngày âm (đổi từ dương bằng lõi sẵn có), giờ sinh, giới tính, cờ tháng nhuận. Các bước: (1) can chi năm, âm dương nam nữ · (2) cung Mệnh (từ Dần thuận đến tháng, nghịch đến giờ), cung Thân (thuận giờ) · (3) 12 cung nghịch từ Mệnh · (4) can 12 cung theo ngũ hổ độn · (5) Cục = nạp âm can chi cung Mệnh, dùng lại bảng nạp âm đã có · (6) an Tử Vi theo Cục và ngày, **phải test với bảng tra quyển 2 Toàn thư** · (7) Tử Vi tinh hệ, Thiên Phủ đối xứng qua trục Dần Thân, Phủ tinh hệ · (8) sao theo tháng, giờ, can năm, chi năm; vòng Bác Sĩ, Thái Tuế, Tràng Sinh; Tuần, Triệt · (9) Hỏa Linh · (10) Tứ Hóa theo can năm · (11) đại hạn khởi bằng số Cục, tiểu hạn theo chi năm, lưu niên · (12) độ sáng miếu vượng đắc hãm (bảng tra, phái khác nhau).

### 4.3 Điểm các phái lệch nhau → phải là CONFIG có profile, không hardcode

| Điểm | Phương án A | Phương án B | Nguồn |
|---|---|---|---|
| Tứ Hóa can **Canh** | Toàn tập: Lộc Thái Dương, Quyền Vũ Khúc, **Khoa Thái Âm**, Kỵ Thiên Đồng | Toàn thư: Khoa Thiên Đồng, Kỵ Thái Âm; có phái Khoa Thiên Phủ | zh.wikipedia 紫微斗數 `[V]` |
| Tứ Hóa can **Nhâm** | Toàn tập: Khoa **Tả Phụ** | Toàn thư: Khoa **Thiên Phủ** | zh.wikipedia `[V]` |
| Tử vi Việt (Thái Thứ Lang, Thiên Lương, Nguyễn Phát Lộc) | Thường dùng bảng Toàn tập | | **`[I]` chưa tìm được nguồn chữ viết đáng tin, phải đối chiếu sách giấy trước khi chốt profile mặc định** |
| Giờ Tý | 23h–24h tính sang ngày sau (chủ lưu) | cùng ngày | zh.wikipedia `[V]` |
| Ranh giới năm | Tết âm (truyền thống) | Lập xuân (một số phái, giống Tứ trụ) | thư viện iztro có tùy chọn `[V]` |
| Tháng nhuận | VN: nửa đầu tính tháng trước, từ 16 tính tháng sau | TQ: cả tháng tính tháng trước hoặc theo tiết | `[I]` |
| Hỏa Linh | theo tam hợp chi năm rồi đếm thuận tới giờ | Trung Châu: thuận nghịch theo âm dương nam nữ | `[I]` |
| Thiên Mã | theo chi năm | theo chi tháng | `[I]` |
| Tuần, Triệt | Tử vi Việt coi rất nặng | Tử vi TQ coi là sao nhỏ | `[I]` |

### 4.4 Thư viện mã nguồn mở (làm bộ đối chứng, không chép)

| Repo | Ngôn ngữ | Giấy phép | Ghi chú |
|---|---|---|---|
| https://github.com/SylarLong/iztro | TypeScript | MIT `[V]` | Đủ 12 cung, sao, Tứ Hóa, hạn; có tùy chọn phái Trung Châu, có tiếng Việt trong đầu ra |
| https://github.com/airicyu/fortel-ziweidoushu | JavaScript | MIT `[V]` | Theo Trung Châu phái |
| https://github.com/x-haose/py-iztro | Python | không thấy giấy phép `[U]` | Bản port iztro |

Khuyến nghị: tự viết lõi an sao JS thuần theo quyển 2 Toàn thư, dùng iztro chạy trong Node làm **oracle** đối chứng hàng loạt lá số; mặc định của iztro là chuẩn TQ nên profile "Việt" phải tự định nghĩa.

### 4.5 Phong thủy: công cụ xây được từ dữ liệu sẵn có

| Công cụ | Đầu vào | Thiếu gì | Mức công thức |
|---|---|---|---|
| Bát trạch (quái mệnh, 8 du niên) | năm sinh (ranh giới Lập xuân), giới tính, hướng nhà, cửa, bếp, giường | bảng 8 quái × 8 hướng (nguồn Bát trạch minh kính chưa mở `[U]`) | quái số tính được `[I, tin cao]` |
| Cửu cung niên tinh, nguyệt tinh | năm (Lập xuân), tháng (tiết) | không | công thức; niên tinh đã có trong Tra năm `[V]` |
| La bàn 24 sơn | góc phương vị | ghi chú độ lệch từ | 360/24, Tý tâm 0° |
| Huyền không phi tinh | vận (đã có), tọa hướng đo la bàn, kiêm hướng | 24 sơn âm dương theo tam nguyên long, luật thuận nghịch, **thế quái** là bảng tra nhiều phái, nguồn Thẩm thị chưa mở | vận bàn, sơn bàn, hướng bàn tính được; để sau |

## 5. Đề tài 4 — Lão Tử, Tôn Tử, Khổng Tử, Quỷ Cốc Tử và mở rộng

| Sách | Tác giả / đời | Nguồn `[V]` | Cấu trúc trên Wikisource | Bản dịch Việt quen thuộc (chỉ để tham khảo cách hiểu, **có bản quyền, không chép**) | Ưu tiên |
|---|---|---|---|---|---|
| **Đạo Đức Kinh** | Lão Tử | Trang định hướng https://zh.wikisource.org/wiki/道德經 liệt kê nhiều bản (bạch thư, Quách Điếm, Hà Thượng Công, Vương Bật…); nên dùng https://zh.wikisource.org/wiki/道德經_(王弼本) một trang 89 KB **kèm chú Vương Bật từng chương, tool phải tách chính văn khỏi chú** | 81 chương, một trang | Nguyễn Hiến Lê (mất 1984), Nguyễn Duy Cần (mất 1998) `[V nguồn thứ cấp]` | 1 |
| **Tôn Tử Binh Pháp** | Tôn Vũ | https://zh.wikisource.org/wiki/孫子兵法 31 KB, đủ 13 thiên; cuối trang có phần hỏi đáp và ghi chú học thuật không phải chính văn | 13 thiên, một trang | Ngô Văn Triện (Trúc Khê) `[I]` | 1 |
| Ngô Tử, Lục Thao, Tam Lược | Ngô Khởi; truyền Lã Vọng; truyền Hoàng Thạch Công | https://zh.wikisource.org/wiki/吳子 (6 thiên) · /六韜 (60 thiên, mở đầu là đề yếu Tứ khố) · /三略 (3 thiên), đều một trang | một trang | `[U]` | 2 |
| Tam Thập Lục Kế | khuyết danh; văn bản phát hiện 1941, **phần án ngữ có thể của người đời sau, phải kiểm bản quyền trước khi dịch toàn văn** `[I]` | https://zh.wikisource.org/wiki/三十六計 tổng thuyết + 6 trang con /勝戰計… | 6 bộ × 6 kế, trang con | nhiều bản phổ thông | 2 |
| **Luận Ngữ** | Khổng môn | https://zh.wikisource.org/wiki/論語 mục lục; /學而第一 … /堯曰第二十, cấu trúc đều nhất `論語/<tên thiên>` | 20 thiên, mỗi thiên một trang con | Nguyễn Hiến Lê, Đoàn Trung Còn, Lê Phục Thiện `[I]` | 1 |
| **Đại Học, Trung Dung** | truyền Tăng Tử, Tử Tư; Chu Hy chia chương | Bản cổ trong Lễ Ký https://zh.wikisource.org/wiki/禮記/大學 (7 KB), 禮記/中庸; bản Chu Hy có chú 四書章句集注/大學章句, /中庸章句 `[V-tồn tại]` | 1 thiên mỗi cuốn (cổ bản); 11 và 33 chương (bản Chu Hy) | Đoàn Trung Còn `[I]` | 1 |
| **Mạnh Tử** | Mạnh Kha | https://zh.wikisource.org/wiki/孟子 mục lục; /梁惠王上 … /盡心下 | 7 thiên × thượng hạ = 14 trang con | Nguyễn Hiến Lê, Đoàn Trung Còn `[I]` | 1 |
| Kinh Thi, Lễ Ký | | https://zh.wikisource.org/wiki/詩經 mỗi bài một trang con (305 bài); /禮記 49 thiên | rất lớn | Tạ Quang Phát; Nguyễn Tôn Nhan `[I]` | 3 (Lễ Ký chỉ lấy Đại Học, Trung Dung, Học Ký, Lễ Vận) |
| **Quỷ Cốc Tử** | Quỷ Cốc Tử (Chiến Quốc), chú Đào Hoằng Cảnh `[I]` | https://zh.wikisource.org/wiki/鬼谷子 mục lục; /卷01 (Bãi hạp, Phản ứng, Nội kiền, Để hy…), /卷02, /卷03 (Bản kinh âm phù thất thuật); bản Tứ khố một trang 鬼谷子_(四庫全書本) 26 KB | 3 quyển, trang con | không xác minh được bản dịch nguyên văn; thị trường nhiều sách "mưu lược Quỷ Cốc Tử" biên soạn lại `[U]` | 1 |
| Trang Tử | Trang Chu | https://zh.wikisource.org/wiki/莊子 mục lục; /逍遙遊 … /天下 | 33 thiên, trang con theo thiên | Nguyễn Hiến Lê, Nguyễn Duy Cần `[I]` | 2 |
| Hàn Phi Tử | Hàn Phi | https://zh.wikisource.org/wiki/韓非子 mục lục; trang con theo tên thiên (/孤憤, /說難, /五蠹…), **trang /01–/20 chỉ là mục lục quyển, tool phải lấy theo tên thiên** | 55 thiên | Phan Ngọc (1990) `[V thư mục]`; Nguyễn Hiến Lê và Giản Chi | 2 |
| Mặc Tử, Tuân Tử | Mặc Địch; Tuân Huống | https://zh.wikisource.org/wiki/墨子 · /荀子, trang con theo thiên | 53 và 32 thiên | Nguyễn Hiến Lê; Giản Chi và Nguyễn Hiến Lê `[I]` | 3 |

**Nhận xét**: các cuốn "một trang, ngắn" (Đạo Đức Kinh, Tôn Tử, Ngô Tử, Tam Lược, Tố Thư) tái dùng tool Kinh Dịch gần như nguyên vẹn; nhóm trang con (Luận Ngữ, Mạnh Tử, Trang Tử, Quỷ Cốc Tử) cần nâng tool đọc mục lục rồi tải từng trang con, nên làm Luận Ngữ trước vì cấu trúc đều nhất rồi tổng quát hóa.

## 6. Đề tài 5 — Loạt bài suy ngẫm "cõi tạm, quán trọ"

**Mục tiêu**: loạt 10–12 bài đọc ngắn, mỗi bài có xương sống là nguyên văn cổ (Hán, Nôm, Việt) công cộng; kho tự dịch, tự bình, không chép bản dịch hiện đại.

**Nguồn đã mở được ngày 24/10/2026**:

| Nguồn | Tác giả | Địa chỉ `[V]` | Bản quyền | Câu, ý nhân sinh |
|---|---|---|---|---|
| Xuân dạ yến đào lý viên tự | Lý Bạch | https://zh.wikisource.org/wiki/春夜宴從弟桃花園序 | PD | Gốc của ý "cõi tạm": 夫天地者，萬物之逆旅也；光陰者，百代之過客也 |
| Pháp Cú kinh bản Hán đời Ngô | Duy Kỳ Nan dịch | https://zh.wikisource.org/wiki/法句經 | PD | Phẩm Vô thường: 如河駛流，往而不返，人命如是 |
| Kim Cang kinh (La Thập dịch) | | https://zh.wikisource.org/wiki/金剛般若波羅蜜經_(鳩摩羅什) | PD | 一切有為法，如夢幻泡影 |
| Thái Căn Đàm | Hồng Ứng Minh | https://zh.wikisource.org/wiki/菜根譚 | PD | 人生只百年，此日最易過 |
| Tiền Xích Bích phú | Tô Thức | https://zh.wikisource.org/wiki/前赤壁賦 | PD | 寄蜉蝣於天地，渺滄海之一粟 |
| Hảo liễu ca (Hồng lâu mộng) | Tào Tuyết Cần | https://zh.wikisource.org/wiki/好了歌 | PD | Danh lợi vợ con đều "liễu" |
| Trang Tử, Đạo Đức Kinh, Luận Ngữ | | https://zh.wikisource.org/wiki/莊子 · /道德經 · /論語 (mới mở trang mục lục) | PD | Bạch câu quá khích; quy căn; thệ giả như tư |
| Quốc âm thi tập | Nguyễn Trãi (1380–1442) | https://vi.wikisource.org/wiki/Tác_gia:Nguyễn_Trãi | PD | Nhàn, thế sự |
| Bạch Vân quốc ngữ thi | Nguyễn Bỉnh Khiêm (1491–1585) | https://vi.wikisource.org/wiki/Tác_gia:Nguyễn_Bỉnh_Khiêm | PD | Nhân tình thế thái, Nhàn |
| Truyện Kiều, Văn tế thập loại chúng sinh | Nguyễn Du | https://vi.wikisource.org/wiki/Tác_gia:Nguyễn_Du | PD | Trăm năm trong cõi người ta |
| Thơ Tản Đà | Tản Đà (mất 1939) | https://vi.wikisource.org/wiki/Tác_gia:Tản_Đà | PD tại Việt Nam | Đời đáng chán hay không đáng chán |
| Sơ nhật, Thử thời vô thường kệ | Trần Thái Tông | https://vi.wikisource.org/wiki/Tác_gia:Trần_Thái_Tông | PD | Vô thường sáu thời; **Khóa hư lục toàn văn Hán chưa có trên Wikisource `[U]`** |
| Cư trần lạc đạo phú | Trần Nhân Tông | https://vi.wikisource.org/wiki/Cư_trần_lạc_đạo_phú | PD | Cư trần lạc đạo thả tùy duyên |
| Cáo tật thị chúng | Mãn Giác | https://vi.wikisource.org/wiki/Cáo_tật_thị_chúng | PD; bản dịch Ngô Tất Tố (mất 1954) đã PD | Đình tiền tạc dạ nhất chi mai |
| Thị đệ tử | Vạn Hạnh | https://vi.wikisource.org/wiki/Thị_đệ_tử | PD | Thân như điện ảnh hữu hoàn vô |

Chưa mở `[U]`: trang Nguyễn Công Trứ, Cao Bá Quát, Nguyễn Khuyến, Tú Xương (đều mất trên 100 năm, PD chắc chắn); Vương Duy (danh mục Wikisource thiếu bài); Khóa hư lục bản Hán. Phần phiên âm, dịch nghĩa trong bộ *Thơ văn Lý Trần* (1977) có bản quyền tập thể, chỉ dùng nguyên văn.

**Dàn ý 12 bài**: 1 Quán trọ của muôn loài (Lý Bạch, Pháp Cú, Trần Thái Tông) · 2 Trăm năm trong cõi người ta (Kiều, Thái Căn Đàm, Nguyễn Công Trứ) · 3 Thân như điện ảnh (Vạn Hạnh, Kim Cang, Pháp Cú) · 4 Phù du giữa trời đất (Tô Thức, Trang Tử, Cao Bá Quát) · 5 Hoa rụng, mai nở (Mãn Giác, Trang Tử gõ chậu, Tản Đà) · 6 Danh lợi "liễu" (Hảo liễu ca, Nguyễn Bỉnh Khiêm, Nguyễn Công Trứ) · 7 Về với gốc (Đạo Đức Kinh 16, Đào Uyên Minh, Nguyễn Trãi) · 8 Nước chảy không về (Luận Ngữ, Tú Xương, Nguyễn Khuyến) · 9 Sắc tức thị không (Tâm kinh, Kim Cang, Cư trần lạc đạo) · 10 Bốn núi vây quanh (Khóa hư lục, Pháp Cú, Tản Đà) · 11 Thương thay thập loại chúng sinh (Nguyễn Du, Vu lan, Pháp Cú) · 12 Ở trọ mà vui (Trần Nhân Tông, Vương Duy, Nguyễn Bỉnh Khiêm, Thái Căn Đàm).

**Độ khó, đề xuất**: dễ nhất về nguồn (sẵn và PD rõ), khó ở chất văn. Làm theo khuôn Kinh Dịch trong thư mục riêng, mỗi bài một trang gồm nguyên văn, âm, dịch, lời bình; tool kiểm trích dẫn dò trong `nguon/`. Nên làm sớm vì có giá trị đọc ngay và tạo chỗ "đọc chậm" cho cả kho.

## 7. Đề tài 6 — Xem ngày giờ (trạch nhật)

### 7.1 Sách gốc

| Sách | Nguồn | Nội dung | Ưu tiên |
|---|---|---|---|
| **Khâm định Hiệp kỷ biện phương thư** 欽定協紀辨方書 (quan tu đời Càn Long, 36 quyển) | https://zh.wikisource.org/wiki/欽定協紀辨方書_(四庫全書本) `[V]` đủ 36 quyển có trang con, đã mở quyển 4, 6, 36 | Q3–8 định nghĩa từng thần sát · Q10 nghi kỵ · Q11 dụng sự · Q14–32 niên, nguyệt, nhật biểu · **Q36 Biện ngoa**: triều đình bác bỏ Dương công kỵ nhật, Hồng sa, Tứ bất tường ("邪說誣民莫此為甚") | 1, nguồn chính thống nhất, vừa định nghĩa vừa phê phán |
| **Ngọc hạp ký** 玉匣記 (gán Hứa Chân Quân, thực chất soạn đời Thanh) | https://zh.wikisource.org/wiki/玉匣記 `[V]` toàn văn | Bảng 28 tú theo ngày, khoảng 205 mục cát hung theo việc, tạp chiêm (Tiểu lục nhâm) | 1, gốc của "Ngọc Hạp thông thư" Việt Nam |
| Tuyển trạch thông thư, Ngọc Hạp thông thư bản Việt | không có bản số hóa công cộng `[U]` | | 2–3 |

### 7.2 Các lớp dữ liệu một công cụ xem ngày cần
Ký hiệu: **CT** có công thức, viết mã được · **BT** bảng tra cố định · **TM** truyền miệng, phái khác nhau.

| Lớp | Loại | Quy tắc, nguồn |
|---|---|---|
| Can chi ngày, giờ | CT | đã có trong lõi; giờ theo ngũ thử độn từ can ngày |
| Thập nhị trực (Kiến Trừ Mãn Bình Định Chấp Phá Nguy Thành Thu Khai Bế) | CT | tháng theo **tiết**; ngày có chi trùng chi tháng là Kiến; tại ngày giao tiết trực lặp một ngày. Hiệp kỷ Q4 "其法從月建上起建" `[V]` |
| Hoàng đạo, Hắc đạo 12 thần; giờ hoàng đạo | CT | Thanh Long khởi theo chi tháng (Dần Thân → Tý, Mão Dậu → Dần…); giờ hoàng đạo cùng bảng theo chi ngày `[I, tin cao]`, quyển nguồn trong Hiệp kỷ chưa mở `[U]` |
| Tiểu lục nhâm (Đại An, Lưu Liên, Tốc Hỷ, Xích Khẩu, Tiểu Cát, Không Vong) | CT | đếm tháng, ngày, giờ; có trong Ngọc hạp ký `[V]` |
| Nhị thập bát tú | CT + 1 mốc | chu kỳ 28 ngày liên tục ứng với tuần 7 ngày; **cần một ngày mốc tra từ lịch in** `[U]`; cát hung từng tú là bảng tra trong Ngọc hạp ký `[V]` |
| Tam nương (3, 7, 13, 18, 22, 27) | BT, TM | dân gian; Hiệp kỷ Q36 không nhắc `[V]` |
| Nguyệt kỵ (5, 14, 23) | BT | Hiệp kỷ Q6 có mục "月忌日" `[V]`, lý giải chưa đọc |
| Dương công kỵ nhật (13 ngày) | CT | lùi 2 ngày mỗi tháng; Hiệp kỷ Q36 bác bỏ `[V]` |
| Sát chủ, Thọ tử | BT, TM | gốc Ngọc Hạp thông thư Việt `[I]`; không thấy trong Hiệp kỷ Q4, Q6 |
| Bất tương 陰陽不將 (cưới hỏi) | CT | Hiệp kỷ Q4 có mục `[V]`, phải đọc kỹ để viết mã |
| Xung tuổi, nạp âm ngày với tuổi | CT | lục xung, thiên khắc địa xung; bảng 60 hoa giáp đã có |
| Quy kỵ, Vãng vong, Khí vãng vong, Tứ ly, Tứ tuyệt, Thiên tặc, Dịch mã, Kiếp sát, Tam hợp, Lục hợp, Nguyệt hình hại | CT | đều định nghĩa theo chi tháng hoặc tiết khí trong Hiệp kỷ Q6 `[V]` |
| Bành Tổ bách kỵ (60 câu) | BT | nhập liệu một lần |
| Thiên đức, Nguyệt đức, Nguyệt phá | BT, CT | Hiệp kỷ nghĩa lệ, quyển chưa mở `[U]` |

**Vì sao làm xem ngày trước tử vi**: dùng lại gần hết lõi hiện có, mỗi lớp là một hàm nhỏ độc lập dễ kiểm, nguồn chính thống mở được và dẫn về đúng quyển; đồng thời chứng minh lớp tiết khí, can chi ngày đúng trước khi tử vi dựa lên đó. Rủi ro im lặng lớn nhất của cả nhóm công cụ: **ranh giới thời gian** (Tết hay Lập xuân, tiết hay mùng 1, 23h đổi ngày, múi giờ +7 của Việt Nam so với +8 của lịch Trung Quốc khi tính tiết khí) nên phải có test cố định cho các ngày sát ranh.

## 8. Đề tài 7 — Văn hóa lễ cúng và bài khấn

**Kết luận chính `[V]`**: **không tồn tại một "chuẩn mực duy nhất"**. Ba tầng nguồn đều chấp nhận dị bản: gia lễ cổ (Chu Tử gia lễ tự ghi các dịp khác "chỉ đổi mấy chữ"; Việt Nam có ít nhất ba bộ gia lễ: Hồ Thượng thư gia lễ, Thọ Mai gia lễ, Gia lễ lược biên); Nhà nước chỉ quy định khung hành vi, không ban hành bài khấn; sách văn khấn đang bán là biên soạn tư nhân, không ghi nguồn từng bài. Kho **không được dùng chữ "chuẩn nhất"**.

**Nguồn cổ công cộng**:

| Nguồn | Tình trạng |
|---|---|
| **Việt Nam phong tục**, Phan Kế Bính (1915; tác giả mất 1921) | https://vi.wikisource.org/wiki/Việt_Nam_phong_tục `[V]` toàn văn, PD. Có đúng các mục cần: Phụng sự tổ tôn, Tế tự, Kỳ an, Tang ma, Cải táng, Kỵ nhật, Tứ thời tiết lạp, Giá thú, Việc hiếu, Việc hỉ. **Xương sống tốt nhất cho phần tục lệ.** |
| **Chu Tử gia lễ** 家禮 bản Tứ khố | https://zh.wikisource.org/wiki/家禮_(四庫全書本) `[V]`; quyển 5 Tế lễ có mẫu chúc văn nguyên văn 維年嵗月朔日子，孝元孫某官某，敢昭告於… Gốc của mọi gia lễ Việt. |
| **Thọ Mai gia lễ** (thế kỷ 18, thường gán Hồ Sĩ Tân, tên tác giả chưa thống nhất `[I]`) | **Chưa tìm thấy bản số hóa công cộng `[U]`** trên Nôm Foundation, Thư viện Quốc gia, Wikisource. Bản quốc ngữ đang bán có bản quyền biên soạn. Muốn trích nguyên văn phải tìm ký hiệu ở Viện Hán Nôm (bài Vũ Việt Bằng, Tạp chí Hán Nôm 2018) rồi xin bản chụp. |
| Hồ Thượng thư gia lễ, Hồ Sĩ Dương (thế kỷ 17), Viện Hán Nôm AB.592 | Chỉ có tóm tắt luận án `[V]` https://ussh.vnu.edu.vn/eng/dao-tao/luan-an/ttla-nghien-cuu-tac-pham-ho-thuong-thu-gia-le-18970.html ; chưa có bản số hóa `[U]`. |
| Nếp cũ, Toan Ánh (mất 2009) | **Còn bản quyền tới hết 2059** `[V]`. Chỉ trích ngắn có dẫn nguồn. |
| Đất lề quê thói, Nhất Thanh (1970) | Năm mất tác giả chưa xác định `[U]`, mặc định còn bản quyền. |

**Khung pháp lý hiện hành** (số hiệu lấy từ trang luật đã mở `[V]`): Quyết định 308/2005/QĐ-TTg (nếp sống văn minh việc cưới, tang, lễ hội; cấm rải tiền, hạn chế vàng mã) · Thông tư 04/2011/TT-BVHTTDL (cưới "không phô trương, không nặng lễ vật"; cúng 49 ngày, 100 ngày, giỗ, cải táng "chỉ trong ngày, nội bộ gia đình dòng họ") · Nghị định 105/2012/NĐ-CP về lễ tang cán bộ công chức (linh cữu không quá 48 giờ; sửa đổi bởi Nghị định 237/2025/NĐ-CP). Công văn 031/CV-HĐTS năm 2018 của Giáo hội Phật giáo Việt Nam về bỏ đốt vàng mã mới thấy qua báo chí, văn bản gốc chưa mở `[U]`.

**Cấu trúc văn khấn có nguồn cổ** (Chu Tử gia lễ quyển 5, 6 phần): (1) thời gian "duy năm tháng ngày" · (2) người tế xưng danh theo quan hệ · (3) "cảm chiêu cáo vu" · (4) đối tượng hiển khảo, hiển tỷ · (5) lý do và lễ vật "cẩn dĩ thanh chước thứ tu" · (6) kết "thượng hưởng". Khung văn khấn Nôm đang lưu hành (Nam mô A Di Đà Phật, chín phương Trời mười phương Phật, tín chủ con là, ngụ tại, hôm nay ngày, thành tâm sửa biện, cúi xin) trùng khung Nho ở phần 1, 2, 4, 5; phần niệm Phật mở và kết là lớp Phật giáo dân gian hóa, nhiều khả năng định hình thế kỷ 20 `[I, tin trung bình]`. Khác biệt ba miền: **chưa tìm được nghiên cứu nào có nguồn `[U]`**, không viết khi chưa tra.

**Cách trình bày đề xuất cho mỗi lễ**: (a) tục lệ trích nguyên văn Phan Kế Bính · (b) khung pháp lý hiện hành · (c) bài khấn **do kho tự soạn theo khung 6 phần**, ghi rõ "bản soạn của kho, không phải bản cổ" · (d) ô "Dị bản" chỉ ghi khác biệt có nguồn · (e) kèm công cụ chọn ngày giờ (nối Đề tài 6).

**Độ khó**: trung bình về kỹ thuật, cao về nguồn. Việc chặn: bản gốc Thọ Mai gia lễ. Đề xuất: làm phần tục lệ từ Phan Kế Bính trước (đã đủ nguồn), phần bài khấn làm sau khi anh quyết đi xin bản chụp Thọ Mai gia lễ hay chấp nhận tự soạn theo khung Chu Tử gia lễ.

## 9. Đề tài 8 — (anh để trống, chừa chỗ)

## 10. Lõi dùng chung cần tách trước khi xây công cụ thứ hai

| Lớp | Đang ở đâu | Công cụ nào cần |
|---|---|---|
| Ngày Julius, dương sang âm, tiết khí, kinh độ mặt trời | `KINH DICH/lich-am.js` | Tử vi (tháng, giờ, nhuận), xem ngày, lễ cúng (ngày âm của mọi lễ), Lục hào, Mai Hoa |
| Can chi năm tháng ngày giờ, tuần không | `app.js`, `luc-hao.js`, `mai-hoa.js` | Tử vi, Tứ trụ, xem ngày, Lục hào |
| Nạp âm 60 hoa giáp | `app.js` | Tử vi (Cục), xem ngày (hợp xung tuổi), phong thủy |
| Ngũ hành sinh khắc, hành bát quái | `mai-hoa.js` | Tất cả |
| Cửu cung, Tam nguyên cửu vận | `app.js` | Phong thủy Huyền không, xem ngày (sao ngày), Bát trạch |

Đề xuất: thư mục `chung/` với `lich.js` (lịch, tiết khí), `can-chi.js` (can chi, nạp âm, tuần không, xung hợp hình hại), `ngu-hanh.js`, `cuu-cung.js`; mỗi file có tool kiểm với mốc đã biết (Tết các năm, tiết khí từ lịch thiên văn, các ngày sát ranh). Kinh Dịch chuyển sang nạp từ `chung/`, chạy lại 6 tool để chứng minh kết quả không đổi.

## 11. Thứ tự đề xuất cho cả kho

Nguyên tắc: mỗi vòng cộng giá trị lên vòng trước (Value of Loop); việc rẻ, nguồn sạch làm trước để tool và khuôn chín dần; việc có `[U]` chặn thì làm phần không bị chặn trước.

| Nhịp | Việc | Vì sao đứng đây | Tốn kém ước lượng `[I]` |
|---|---|---|---|
| 1 (xong 24/10) | git init; bản đồ này | Có sao lưu, có bản đồ trước khi đào | đã xong |
| 2 | Tách lõi `chung/` (lịch, can chi, nạp âm, ngũ hành, cửu cung) kèm test ngày sát ranh; Kinh Dịch nạp lại từ lõi, 6 tool vẫn đạt | Mọi công cụ về sau đứng trên lõi này; tránh chép luật nhiều nơi | 1–2 buổi |
| 3a (song song) | Sách ngắn một trang theo khuôn Kinh Dịch: Chu Tử gia huấn (một buổi, làm mẫu khuôn mới) → Tố Thư → Đạo Đức Kinh (tách chú Vương Bật) → Tôn Tử binh pháp → Thái Căn Đàm → Liễu Phàm tứ huấn → Minh Tâm Bảo Giám | Tái dùng tool gần nguyên vẹn; mỗi cuốn là một vòng làm khuôn "sách cách ngôn" chín hơn | mỗi cuốn ngắn 1–2 buổi, cuốn dài 1 tuần |
| 3b (song song) | Công cụ **xem ngày giờ** từ Hiệp kỷ biện phương thư và Ngọc hạp ký (cần một mốc 28 tú tra từ lịch in) → Cửu cung niên nguyệt tinh, La bàn 24 sơn, Bát trạch | Dùng lại 90% lõi, từng lớp là hàm nhỏ dễ kiểm; chứng minh tiết khí, can chi ngày đúng trước khi tử vi dựa lên | 1–2 tuần |
| 3c (song song) | Loạt **cõi tạm** 12 bài | Nguồn sẵn, PD rõ; có giá trị đọc ngay | mỗi bài 1 buổi |
| 4 | Kinh Dịch đào sâu: tải Y Xuyên Dịch Truyện (Tứ khố), Chu Dịch Bản Nghĩa (Tứ khố) để **đối chiếu lại 64 quẻ đã giải**; nâng thẻ Mai Hoa bằng quyển 1 Mai Hoa Dịch Số; Kinh Thị Dịch Truyện cho Lục hào; Tiêu Thị Dịch Lâm nối vào Gieo quẻ | Nâng độ tin của phần giải nghĩa đang có bằng nguyên văn hai nguồn nó dựa vào | 2–3 tuần |
| 5 | Nhóm trang con: Luận Ngữ (làm mẫu tool đọc mục lục) → Mạnh Tử, Đại Học, Trung Dung → Quỷ Cốc Tử → Trang Tử | Cần nâng tool tải; làm sau khi khuôn sách ngắn đã chín | 1 tháng |
| 6 | **Tử vi**: lõi an sao theo quyển 2 Toàn thư, CONFIG có profile (Việt, Toàn thư, Trung Châu), iztro làm oracle trong Node; sau đó phong thủy Huyền không | Phụ thuộc lõi (nhịp 2), lịch (3b) và **quyết định phái của anh** | 1–2 tháng |
| 7 | Lễ cúng: phần tục lệ từ Phan Kế Bính + khung pháp lý + bài khấn tự soạn theo khung Chu Tử gia lễ; gắn công cụ chọn ngày (3b) | Phần nguồn sạch làm được ngay; phần Thọ Mai gia lễ chờ bản chụp | 2–3 tuần |
| sau | Thôi Bối Đồ, Thiêu Bính Ca (ghi rõ ngụy thư, dị bản); Trí Nang, Thế Thuyết (trích tuyển); Hà Lạc, Thiết Bản (chưa có nguồn) | Giá trị thấp hơn hoặc nguồn chưa sạch | |

**Bốn điều chỉ anh quyết được** (em không tự chọn):
1. Tử vi theo phái nào làm mặc định (Tử vi Việt theo Thái Thứ Lang, Thiên Lương; hay Toàn thư; hay Trung Châu). Bảng Tứ Hóa của Tử vi Việt hiện chỉ là `[I]`, cần anh đối chiếu sách giấy.
2. Thọ Mai gia lễ: đi xin bản chụp Viện Hán Nôm, hay chấp nhận soạn bài khấn theo khung Chu Tử gia lễ và tục lệ Phan Kế Bính.
3. Đề tài 8 anh để trống là gì.
4. Có commit lần đầu lên git ngay không, và có đẩy lên GitHub riêng tư để sao lưu ngoài máy không.

---
*Nguồn của bản đồ: ba nhóm tra cứu chạy ngày 24/10/2026, tổng cộng khoảng 115 lượt mở trang và 22 lượt tìm kiếm; mọi địa chỉ ghi `[V]` đã mở được trong ngày đó. Số liệu quy mô (KB, số chương) lấy từ API Wikisource hoặc trang mục lục; số có đánh dấu `[I]` là ước lượng.*
