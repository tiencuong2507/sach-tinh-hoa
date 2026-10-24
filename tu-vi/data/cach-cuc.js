// Cách cục kinh điển — biên soạn của kho Sách Tinh Hoa. Nạp sau tu-vi.js, luan-sao.js.
// Mỗi cách: dieuKien(ls, H) tính trên đầu ra của TuVi.laSo (H = bộ hàm tiện ích trong luan.js); nguyenVan trích 紫微斗數全書 q1/q3 (tool kiểm dò trong nguon/);
// luan là bản soạn của kho [I]: lời cẩm nang, không hù dọa, không khẳng định số phận. Cách không tìm được câu gốc ghi nhan "[I]" và nói rõ.
"use strict";
window.TV_CACH_CUC = (() => {
  const TVP = "q1 太微賦", CT = "q1 骨髓賦", Q3 = "q3 论诸星同垣各司所宜", QL = "q1 定貴局", FL = "q1 定富局", BL = "q1 定貧賤局", TB = "q1 增補太微賦", Q1 = "q1 諸星問答論", HG = "q1 十二宮諸星得地合格訣";
  const s = (trich, dich, nguon) => ({ trich, dich, nguon });
  const C = [];
  const them = (o) => C.push(Object.assign({ loai: "cát", nhan: "[V]" }, o));
  // ---- Tử Vi, Thiên Phủ
  them({ ma: "tu-phu-dong-cung", ten: "Tử Phủ đồng cung", han: "紫府同宮", dieuKien: (ls, H) => H.oMenh("Tử Vi") && H.oMenh("Thiên Phủ"),
    nguyenVan: [s("紫微天府同宫无杀凑甲人享幅终身", "Tử Vi Thiên Phủ đồng cung không sát tinh lẫn vào, người tuổi Giáp hưởng phúc trọn đời.", Q3), s("紫府同宫终身福厚", "Tử Phủ đồng cung, trọn đời phúc dày.", CT)],
    luan: "Đế tinh và kho lộc cùng ngồi cung Mệnh (chỉ xảy ra ở Dần, Thân): người có cả uy và nền, thích ổn định, biết giữ. Sách nhấn 'vô sát thấu' — có Kình Đà Hỏa Linh Không Kiếp cùng cung thì phúc giảm; vẫn cần Tả Hữu Xương Khúc để không thành 'cô quân'." });
  them({ ma: "tu-phu-trieu-vien", ten: "Tử Phủ triều viên", han: "紫府朝垣", dieuKien: (ls, H) => [2, 8].includes(ls.menh) && H.vi("Tử Vi") === (ls.menh + 6) % 12 && H.vi("Thiên Phủ") === (ls.menh + 6) % 12,
    nguyenVan: [s("紫府朝垣活禄逢终身福厚至三公", "Tử Phủ triều viên lại gặp Hóa Lộc, trọn đời phúc dày tới tam công.", Q3), s("紫府朝垣食禄万钟", "Tử Phủ chầu về Mệnh, ăn lộc vạn chung.", CT)],
    luan: "Mệnh ở Dần hoặc Thân, Tử Phủ cùng ngồi cung Thiên di đối chiếu về: được bề trên và nền tảng bên ngoài nâng, ra ngoài làm nên. Sách ghi 'mệnh tọa Dần Thân tái gia cát tinh diệu' — cần thêm cát tinh ở Mệnh mới trọn." });
  them({ ma: "quan-than-khanh-hoi", ten: "Quân thần khánh hội", han: "君臣慶會", dieuKien: (ls, H) => H.oMenh("Tử Vi") && (H.oMenh("Tả Phụ") || H.oMenh("Hữu Bật")),
    nguyenVan: [s("君臣慶會，材善經邦", "Vua tôi họp mặt, tài giỏi trị nước.", TVP), s("君臣庆会 紫微左右同守命是也，更会相武阴妙上", "Quân thần khánh hội: Tử Vi cùng Tả Hữu giữ Mệnh; lại gặp Thiên Tướng Vũ Khúc Thái Âm càng tốt.", QL)],
    luan: "Tử Vi có Tả Phụ hoặc Hữu Bật ngồi cùng Mệnh: vua có tôi, người có uy lại có người giúp, hợp vị trí lãnh đạo, điều phối. Điều cần giữ: biết dùng người, không ôm việc." });
  them({ ma: "phu-bat-cung-de", ten: "Phụ Bật củng đế (giáp đế)", han: "輔弼拱主", dieuKien: (ls, H) => H.oMenh("Tử Vi") && !H.oMenh("Tả Phụ") && !H.oMenh("Hữu Bật") && (H.giap(ls.menh, "Tả Phụ", "Hữu Bật") || (H.trongTamPhuong("Tả Phụ", ls.menh) && H.trongTamPhuong("Hữu Bật", ls.menh))),
    nguyenVan: [s("輔弼夾帝為上品", "Tả Hữu kẹp đế tọa là thượng phẩm.", TVP), s("辅弼拱主 紫微守命二星来拱是也，夹之亦然", "Phụ Bật củng chủ: Tử Vi giữ Mệnh, hai sao chầu về; kẹp hai bên cũng vậy.", QL)],
    luan: "Tử Vi ở Mệnh, Tả Hữu kẹp hai bên hoặc chiếu từ tam phương: có phò tá dù không ngồi cùng. Nhẹ hơn quân thần khánh hội một bậc; vẫn là lá số có người giúp." });
  them({ ma: "tu-vi-cu-ngo", ten: "Tử Vi cư Ngọ", han: "紫微居午", dieuKien: (ls, H) => ls.menh === 6 && H.oMenh("Tử Vi"),
    nguyenVan: [s("紫微居午无杀凑位至三公", "Tử Vi ở Ngọ không sát tinh, ngôi tới tam công.", CT), s("紫微居午无刑忌甲丁己命至公卿", "Tử Vi ở Ngọ không Kình Dương, Hóa Kỵ, tuổi Giáp Đinh Kỷ tới công khanh.", Q3)],
    luan: "Đế tinh ở ngôi miếu Ngọ, một mình: khí thế rõ, thích đứng đầu. Sách kèm điều kiện 'vô hình kỵ' — có Kình Dương hoặc Hóa Kỵ ở Mệnh thì là đế có gánh. Tuổi Giáp Đinh Kỷ được sách nhắc là hợp cách." });
  them({ ma: "cuc-cu-mao-dau", ten: "Cực cư Mão Dậu", han: "極居卯酉", loai: "trung", dieuKien: (ls, H) => [3, 9].includes(ls.menh) && H.oMenh("Tử Vi"),
    nguyenVan: [s("极居卯酉多为脱俗僧人", "Bắc cực (Tử Vi) ở Mão Dậu phần nhiều là người thoát tục.", CT), s("紫微卯酉劫空四杀多为脱俗之僧", "Tử Vi Mão Dậu gặp Kiếp Không tứ sát, phần nhiều là tăng thoát tục.", Q3)],
    luan: "Tử Vi cùng Tham Lang ở Mão Dậu: đế tinh đi với sao dục vọng, tâm hướng về cái khác thường — nghệ thuật, tôn giáo, triết lý. Có Không Kiếp Kình Đà Hỏa Linh cùng cung thì khuynh hướng xuất thế rõ hơn; không phải điều xấu, là một lối sống." });
  them({ ma: "tu-pha-thin-tuat", ten: "Tử Vi Thìn Tuất ngộ Phá Quân", han: "紫微辰戌遇破軍", loai: "trung", dieuKien: (ls, H) => [4, 10].includes(ls.menh) && H.oMenh("Tử Vi"),
    nguyenVan: [s("紫微辰戌遇破军，富而不贵有虚名", "Tử Vi Thìn Tuất gặp Phá Quân, giàu mà không quý, có hư danh.", CT), s("戍宫紫微对冲辰，富而不贵有虚名，更加吉曜多权禄，只利开张贸易人", "Tuất cung Tử Vi đối xung Thìn, giàu mà không quý, có hư danh; thêm cát diệu nhiều quyền lộc, chỉ lợi người mở cửa hàng buôn bán.", HG)],
    luan: "Tử Vi Thiên Tướng ở Thìn Tuất (lưới trời Thiên La Địa Võng), Phá Quân chiếu từ Thiên di: sách khuyên hướng kinh doanh, làm ăn hơn là đường công danh. Thực dụng: lợi chỗ tự làm chủ." });
  them({ ma: "thien-phu-lam-tuat", ten: "Thiên Phủ lâm Tuất", han: "天府臨戌", dieuKien: (ls, H) => ls.menh === 10 && H.oMenh("Thiên Phủ"),
    nguyenVan: [s("天府临戌有星扶腰金衣紫", "Thiên Phủ ở Tuất có sao phò, đai vàng áo tía.", CT), s("天府戌宫无杀凑甲己人腰金又且富", "Thiên Phủ cung Tuất không sát tinh, người Giáp Kỷ đai vàng lại giàu.", Q3)],
    luan: "Kho lộc đặt ở Tuất, có sao phụ tá: giữ được của, sự nghiệp vững theo thời gian. Điều kiện sách ghi: 'hữu tinh phù', 'vô sát thấu'." });
  them({ ma: "phu-tuong-trieu-vien", ten: "Phủ Tướng triều viên", han: "府相朝垣", dieuKien: (ls, H) => !H.oMenh("Thiên Phủ") && !H.oMenh("Thiên Tướng") && H.trongTamPhuong("Thiên Phủ", ls.menh) && H.trongTamPhuong("Thiên Tướng", ls.menh),
    nguyenVan: [s("府相朝垣千锺食禄", "Phủ Tướng chầu về Mệnh, ăn lộc nghìn chung.", Q3), s("府相同来会命宫全家食禄", "Phủ Tướng cùng đến hội cung Mệnh, cả nhà hưởng lộc.", CT)],
    luan: "Thiên Phủ và Thiên Tướng ở tam phương chiếu về Mệnh: có kho và có ấn, làm việc đâu ra đấy, được tin cậy. Sách nói hợp nhất khi Mệnh ở Dần Thân và Phủ Tướng ở Tài, Quan." });
  // ---- Nhật Nguyệt
  them({ ma: "nhat-nguyet-tinh-minh", ten: "Nhật Nguyệt tịnh minh", han: "日月並明", dieuKien: (ls, H) => (ls.menh === 1 && H.vi("Thái Dương") === 5 && H.vi("Thái Âm") === 9) || (ls.menh === 7 && H.vi("Thái Dương") === 3 && H.vi("Thái Âm") === 11),
    nguyenVan: [s("日月并明佐九重于尧殿", "Nhật Nguyệt cùng sáng, phò vua nơi điện Nghiêu.", CT), s("日巳月酉丑宫命步蟾宫", "Nhật ở Tỵ Nguyệt ở Dậu, Mệnh Sửu bước lên cung trăng.", Q3), s("日卯月亥安命未宫多折桂", "Nhật ở Mão Nguyệt ở Hợi, Mệnh ở Mùi nhiều lần bẻ quế.", Q3)],
    luan: "Mặt trời và mặt trăng đều ở chỗ sáng, cùng chiếu về Mệnh ở Sửu/Mùi: cân bằng giữa danh (Nhật) và của (Nguyệt), đường học hành thi cử thuận. Sách gọi 'bộ thiềm cung', 'chiết quế' — việc học là sở trường." });
  them({ ma: "nhat-nguyet-phan-boi", ten: "Nhật Nguyệt phản bối", han: "日月反背", loai: "hung", dieuKien: (ls, H) => H.vi("Thái Dương") === 10 && H.vi("Thái Âm") === 4 && (H.trongTamPhuong("Thái Dương", ls.menh) || H.trongTamPhuong("Thái Âm", ls.menh) || H.vi("Thái Dương") === ls.than || H.vi("Thái Âm") === ls.than),
    nguyenVan: [s("日月最嫌反背", "Nhật Nguyệt rất ngại phản bối.", TVP), s("日月最嫌反背 如日月同宫，看人之生时。日喜太阳，夜宜太阴。若反背日戌月辰，子月午。若出外离宗成家也吉。勿概以反背论", "Nhật Nguyệt rất ngại phản bối: như Nhật Nguyệt đồng cung thì xem giờ sinh, ngày ưa Thái Dương, đêm ưa Thái Âm; phản bối là Nhật Tuất Nguyệt Thìn… Nếu ra ngoài rời quê lập nghiệp cũng cát; chớ vội luận phản bối.", Q3)],
    luan: "Thái Dương ở Tuất, Thái Âm ở Thìn — cả hai đều mất sáng và chiếu về Mệnh/Thân: cha mẹ, vợ chồng hoặc danh và của đều phải tự gây dựng. Chính sách gốc dặn 'xuất ngoại ly tông thành gia dã cát, vật khái dĩ phản bối luận' — rời quê lập nghiệp thì hóa giải." });
  them({ ma: "nhat-chieu-loi-mon", ten: "Nhật chiếu lôi môn (Nhật xuất phù tang)", han: "日照雷門", dieuKien: (ls, H) => ls.menh === 3 && H.oMenh("Thái Dương"),
    nguyenVan: [s("日照雷门富贵荣华", "Mặt trời chiếu cửa sấm, phú quý vinh hoa.", CT), s("日出扶桑 日在卯守命是也，守官禄宫亦然", "Nhật xuất phù tang: Thái Dương ở Mão giữ Mệnh; giữ cung Quan lộc cũng vậy.", QL)],
    luan: "Thái Dương ở Mão (phương đông, lúc mặt trời mọc) giữ Mệnh: khí mới lên, càng về sau càng sáng, hợp nghề công khai, giáo dục, đối ngoại. Sách thêm 'Tý Thìn Mão địa, trú sinh' — người sinh ban ngày càng hợp." });
  them({ ma: "nguyet-lang-thien-mon", ten: "Nguyệt lãng thiên môn", han: "月朗天門", dieuKien: (ls, H) => ls.menh === 11 && H.oMenh("Thái Âm"),
    nguyenVan: [s("月朗天门进爵封侯", "Trăng sáng cửa trời, tiến tước phong hầu.", CT), s("月落亥宫 月在亥守命是也，又名月朗天门", "Nguyệt lạc Hợi cung: Thái Âm ở Hợi giữ Mệnh, còn gọi là nguyệt lãng thiên môn.", QL)],
    luan: "Thái Âm ở Hợi (cửa trời) giữ Mệnh: trăng tròn sáng, người tinh tế, giàu ngầm, thanh quý. Sách ghi hợp người sinh ban đêm, tuổi Tý; 'bất quý tắc đại phú'." });
  them({ ma: "nhat-le-trung-thien", ten: "Nhật lệ trung thiên (Kim xán quang huy)", han: "日麗中天", dieuKien: (ls, H) => ls.menh === 6 && H.oMenh("Thái Dương") && H.soChinhTinh(ls.menh) === 1,
    nguyenVan: [s("太陽居午，謂之日麗中天，有專權之貴，敵國之富", "Thái Dương ở Ngọ gọi là mặt trời rực giữa trời, quý ở quyền riêng, giàu sánh nước.", TVP), s("金灿光辉 太阳单守，命在午宫是也", "Kim xán quang huy: Thái Dương đơn thủ, Mệnh ở Ngọ.", FL)],
    luan: "Thái Dương đơn thủ Mệnh ở Ngọ: sáng hết cỡ, hào phóng, có tiếng; cái giá là tiêu hao sức, dễ gắt. Cần giữ mắt, tim, và học nghỉ ngơi." });
  them({ ma: "thuy-trung-que-ngac", ten: "Thủy trừng quế ngạc", han: "水澄桂萼", dieuKien: (ls, H) => ls.menh === 0 && H.oMenh("Thái Âm"),
    nguyenVan: [s("太陰居子，號曰水澄桂萼，得清要之職，忠諫之材", "Thái Âm ở Tý gọi là nước trong hoa quế, được chức thanh yếu, tài can gián trung thực.", TVP), s("太阴居子丙丁富贵忠良", "Thái Âm ở Tý, tuổi Bính Đinh phú quý trung lương.", Q3)],
    luan: "Thái Âm ở Tý giữ Mệnh (cùng Thiên Đồng): trăng soi đáy nước, người thanh sạch, hợp việc tham mưu, kiểm tra, học thuật. Sách nhắc hợp tuổi Bính Đinh." });
  them({ ma: "nhat-nguyet-giap-menh", ten: "Nhật Nguyệt giáp Mệnh", han: "日月夾命", dieuKien: (ls, H) => [1, 7].includes(ls.menh) && H.giap(ls.menh, "Thái Dương", "Thái Âm"),
    nguyenVan: [s("日月夹命 不坐空亡遇逢本宫有吉星是也", "Nhật Nguyệt giáp Mệnh: không tọa không vong, bản cung có cát tinh.", QL), s("夹日夹月谁能遇", "Được Nhật Nguyệt kẹp hai bên, mấy ai gặp.", CT)],
    luan: "Mệnh ở Sửu/Mùi, Thái Dương một bên Thái Âm một bên: được cả hai nguồn sáng che. Sách đặt điều kiện: Mệnh không bị Tuần Triệt và có cát tinh; nếu Mệnh trống (Tử Vi Phá Quân hoặc Vũ Tham cũng là chính tinh, xét thêm sát tinh)." });
  them({ ma: "nhat-nguyet-giap-tai", ten: "Nhật Nguyệt giáp tài", han: "日月夾財", dieuKien: (ls, H) => { const p = H.vi("Thiên Phủ"); return [1, 7].includes(p) && H.giap(p, "Thái Dương", "Thái Âm") && (p === ls.menh || ls.cung[p].ten === "Tài bạch"); },
    nguyenVan: [s("日月夾財，不權則富", "Nhật Nguyệt kẹp tài, không quyền thì giàu.", TVP), s("日月夹财加吉曜不贵则富 如财帛宫在未天府星守，日在午月在申夹财是也", "Nhật Nguyệt giáp tài thêm cát diệu, không quý thì giàu: như cung Tài bạch ở Mùi có Thiên Phủ, Nhật ở Ngọ, Nguyệt ở Thân kẹp lại.", Q3)],
    luan: "Thiên Phủ (kho của) ở Sửu/Mùi được Nhật Nguyệt kẹp, và kho ấy là Mệnh hoặc Tài bạch: của cải có hai nguồn che chở. Sách: 'gia cát diệu' — thêm cát tinh mới trọn, gặp Kình Đà thì hướng thanh đạm." });
  them({ ma: "nhat-nguyet-dong-lam", ten: "Nhật Nguyệt đồng lâm", han: "日月同臨", dieuKien: (ls, H) => { const d = H.vi("Thái Dương"); return d === H.vi("Thái Âm") && [1, 7].includes(d) && (d === ls.menh || d === (ls.menh + 6) % 12); },
    nguyenVan: [s("日月同临官居侯伯", "Nhật Nguyệt cùng tới, quan ở hàng hầu bá.", CT), s("日月同未命安丑侯伯之材", "Nhật Nguyệt cùng ở Mùi, Mệnh an ở Sửu, tài hầu bá.", Q3)],
    luan: "Thái Dương Thái Âm đồng cung ở Sửu/Mùi, tại Mệnh hoặc chiếu thẳng vào Mệnh: hai nguồn sáng cùng chỗ, một sáng một mờ theo giờ sinh (sách: ngày ưa Nhật, đêm ưa Nguyệt). Người đa năng, đời có hai mặt rõ." });
  // ---- Cự Môn, Thiên Cơ, Thiên Lương, Thiên Đồng
  them({ ma: "cu-co-dong-lam", ten: "Cự Cơ đồng lâm (Cự Cơ cư Mão)", han: "巨機居卯", dieuKien: (ls, H) => ls.menh === 3 && H.oMenh("Cự Môn") && H.oMenh("Thiên Cơ"),
    nguyenVan: [s("巨机同宫公卿之位", "Cự Cơ đồng cung, ngôi công khanh.", CT), s("巨机居卯乙辛己丙至公卿", "Cự Cơ ở Mão, tuổi Ất Tân Kỷ Bính tới công khanh.", Q3)],
    luan: "Cự Môn và Thiên Cơ cùng Mệnh ở Mão: lời nói có mưu, phân tích sắc, hợp nghề tư vấn, luật, truyền thông. Sách chú: tuổi Giáp bình thường vì Kình Dương vào Mão phá cách." });
  them({ ma: "cu-co-cu-dau", ten: "Cự Cơ cư Dậu", han: "巨機酉上", loai: "trung", dieuKien: (ls, H) => ls.menh === 9 && H.oMenh("Cự Môn") && H.oMenh("Thiên Cơ"),
    nguyenVan: [s("机梁酉上化吉者，纵遇财官也不荣", "Cơ (Cự) ở Dậu dù hóa cát, gặp tài quan cũng không vinh.", CT), s("巨机酉上化吉者纵有财官也不终", "Cự Cơ ở Dậu dù hóa cát, có tài quan cũng không bền.", Q3)],
    luan: "Cùng cặp sao nhưng ở Dậu sách xếp kém Mão: tài có, nhưng thành quả khó giữ lâu; sách còn ghi 'cô bần đa hữu thọ'. Thực dụng: làm việc theo giai đoạn, không dồn hết vào một ván." });
  them({ ma: "thach-trung-an-ngoc", ten: "Thạch trung ẩn ngọc", han: "石中隱玉", dieuKien: (ls, H) => [0, 6].includes(ls.menh) && H.oMenh("Cự Môn") && ["Lộc", "Quyền", "Khoa"].some(h => H.trongTamPhuong(H.saoHoa(h), ls.menh)),
    nguyenVan: [s("子午巨门石中隐玉", "Cự Môn ở Tý Ngọ, ngọc giấu trong đá.", CT), s("巨门子午科权禄石中隐玉福兴隆", "Cự Môn Tý Ngọ có Khoa Quyền Lộc, ngọc ẩn trong đá, phúc hưng thịnh.", Q3)],
    luan: "Cự Môn một mình ở Tý/Ngọ có Khoa Quyền Lộc chiếu: tài năng như ngọc trong đá, phát muộn mà bền, nhờ lời nói và chuyên môn. Sách ghi tuổi Tân Quý thượng cách, Đinh Kỷ thứ." });
  them({ ma: "cu-nhat-dong-cung", ten: "Cự Nhật đồng cung", han: "巨日同宮", dieuKien: (ls, H) => [2, 8].includes(ls.menh) && H.oMenh("Cự Môn") && H.oMenh("Thái Dương"),
    nguyenVan: [s("巨日同宫官封三代", "Cự Nhật đồng cung, quan phong ba đời.", CT), s("巨日命宫寅位食禄驰名", "Cự Nhật ở cung Mệnh Dần, ăn lộc nổi tiếng.", Q3)],
    luan: "Cự Môn gặp Thái Dương cùng Mệnh ở Dần/Thân: lời nói được ánh sáng soi, thành danh bằng tiếng nói, dạy dỗ, đối ngoại. Ở Dần (Nhật sáng) sách khen hơn Thân." });
  them({ ma: "co-nguyet-dong-luong", ten: "Cơ Nguyệt Đồng Lương", han: "機月同梁", dieuKien: (ls, H) => [2, 8].includes(ls.menh) && ["Thiên Cơ", "Thái Âm", "Thiên Đồng", "Thiên Lương"].every(t => H.trongTamPhuong(t, ls.menh)),
    nguyenVan: [s("机月同梁作吏人", "Cơ Nguyệt Đồng Lương làm người lại (công chức).", CT), s("机月同梁作吏人 命在寅申方论，加吉不论，无吉无杀亦是平常人，凶杀空劫化忌为下格", "Cơ Nguyệt Đồng Lương làm lại nhân: Mệnh ở Dần Thân mới luận; thêm cát thì không luận vậy; không cát không sát là người thường; hung sát Không Kiếp hóa Kỵ là hạ cách.", Q3)],
    luan: "Mệnh ở Dần/Thân, bốn sao Cơ Nguyệt Đồng Lương chiếm hết tam phương tứ chính: hợp đường công chức, chuyên viên, làm việc có hệ thống, ổn định hơn mạo hiểm. Lời cổ 'tác lại nhân' không phải chê — là chỉ sở trường." });
  them({ ma: "co-luong-dong-cung", ten: "Cơ Lương đồng cung", han: "機梁同宮", dieuKien: (ls, H) => H.oMenh("Thiên Cơ") && H.oMenh("Thiên Lương"),
    nguyenVan: [s("机梁守命，加吉曜，富贵慈祥", "Cơ Lương giữ Mệnh, thêm cát diệu, phú quý hiền từ.", Q3), s("辰戍机梁非小补", "Thìn Tuất Cơ Lương chẳng phải bổ nhỏ.", CT)],
    luan: "Thiên Cơ Thiên Lương cùng Mệnh (Thìn/Tuất): mưu trí gặp che chở, hợp nghề thầy, cố vấn, y, giáo, tôn giáo; sách nói 'thiện đàm binh'. Gặp Hình Kỵ sách chuyển sang 'tăng đạo' — lối sống thanh đạm." });
  them({ ma: "dong-luong-dan-than", ten: "Đồng Lương Dần Thân", han: "同梁寅申", dieuKien: (ls, H) => [2, 8].includes(ls.menh) && H.oMenh("Thiên Đồng") && H.oMenh("Thiên Lương"),
    nguyenVan: [s("寅申最喜同梁会", "Dần Thân thích nhất Đồng Lương hội.", CT), s("同梁守命男得陽純中正之心", "Đồng Lương giữ Mệnh, đàn ông được tâm trung chính thuần dương.", TB)],
    luan: "Thiên Đồng và Thiên Lương cùng Mệnh ở Dần/Thân: phúc tinh gặp ấm tinh, người hòa, có lòng tốt, được che chở; sách khen 'trung chính chi tâm'. Nhược là dễ an phận." });
  them({ ma: "luong-cu-ngo", ten: "Lương cư Ngọ vị", han: "梁居午位", dieuKien: (ls, H) => ls.menh === 6 && H.oMenh("Thiên Lương"),
    nguyenVan: [s("梁居午位官资清显", "Thiên Lương ở Ngọ, quan tư thanh hiển.", CT), s("天梁居午位官资清显朝堂", "Thiên Lương ở Ngọ, quan tư thanh hiển nơi triều đường.", Q3)],
    luan: "Thiên Lương một mình ở Ngọ giữ Mệnh: ấm tinh miếu địa, người ngay thẳng, hợp thanh tra, giáo dục, pháp luật. Sách: tuổi Đinh Kỷ Quý hợp cách." });
  // ---- Sát Phá Tham, Vũ, Liêm
  them({ ma: "that-sat-trieu-dau", ten: "Thất Sát triều đẩu", han: "七殺朝斗", dieuKien: (ls, H) => [0, 2, 6, 8].includes(ls.menh) && H.oMenh("Thất Sát"),
    nguyenVan: [s("七杀朝斗爵禄荣昌", "Thất Sát chầu đẩu, tước lộc vinh xương.", CT), s("七杀寅申子午一生爵禄荣昌 为七杀朝斗格", "Thất Sát Dần Thân Tý Ngọ, một đời tước lộc vinh xương: là cách Thất Sát triều đẩu.", Q3)],
    luan: "Thất Sát ở Dần Thân Tý Ngọ giữ Mệnh (Tử Vi hoặc Tử Phủ chiếu về): tướng có vua, quyết liệt mà có chỗ dựa; hợp người mở đường, quân đội, kỹ thuật, khởi nghiệp. Sách dặn thêm Khôi Việt Tả Hữu Xương thì 'quyền lộc danh cao'." });
  them({ ma: "sat-pha-tham", ten: "Sát Phá Tham", han: "殺破狼", loai: "trung", nhan: "[I]", dieuKien: (ls, H) => ["Thất Sát", "Phá Quân", "Tham Lang"].some(t => H.oMenh(t)),
    nguyenVan: [s("七杀破军宜出外", "Thất Sát Phá Quân nên ra ngoài.", CT), s("七殺破軍專依羊鈴之虐", "Thất Sát Phá Quân riêng chịu sự hành của Kình Linh.", TVP)],
    luan: "Tên gọi 'Sát Phá Tham' là cách gọi đời sau [I]; Toàn thư chỉ có câu về từng cặp. Ba sao này luôn ở tam phương của nhau nên Mệnh có một là có cả ba chiếu: đời nhiều biến động, hợp người làm việc mạo hiểm, mở mới, ra ngoài lập nghiệp. Gặp Kình Linh Không Kiếp thì sách dặn 'chuyên y dương linh chi ngược' — cần phanh." });
  them({ ma: "hoa-tham", ten: "Hỏa Tham", han: "火貪", dieuKien: (ls, H) => H.oMenh("Tham Lang") && (H.oMenh("Hỏa Tinh") || H.trongTamPhuong("Hỏa Tinh", ls.menh)),
    nguyenVan: [s("贪狼火星居庙旺名镇诸邦", "Tham Lang Hỏa Tinh ở miếu vượng, danh trấn các nước.", CT), s("贪狼遇铃火四墓宫豪富家资侯伯贵", "Tham Lang gặp Linh Hỏa ở tứ mộ, giàu to, quý hầu bá.", Q3)],
    luan: "Tham Lang có Hỏa Tinh cùng cung hoặc chiếu: dục vọng gặp lửa, phát nhanh, hợp kinh doanh, bán hàng, nghề cần bùng nổ. Sách khen nhất ở Thìn Tuất (Sửu Mùi thứ); mặt trái là nhanh đến nhanh đi." });
  them({ ma: "linh-tham", ten: "Linh Tham", han: "鈴貪", dieuKien: (ls, H) => H.oMenh("Tham Lang") && (H.oMenh("Linh Tinh") || H.trongTamPhuong("Linh Tinh", ls.menh)),
    nguyenVan: [s("贪铃并守将相之名", "Tham Linh cùng giữ, danh tướng tướng.", CT), s("若与贪狼会，指日立边庭", "(Linh Tinh) nếu gặp Tham Lang, sớm ngày lập công biên ải.", Q1)],
    luan: "Tham Lang có Linh Tinh: như Hỏa Tham nhưng âm ỉ, bền hơn, phát chậm mà chắc; hợp nghề kiên trì có lúc bùng. Vẫn cần kỷ luật với ham muốn." });
  them({ ma: "tham-vu-dong-hanh", ten: "Tham Vũ đồng hành", han: "貪武同行", dieuKien: (ls, H) => (H.oMenh("Tham Lang") && H.oMenh("Vũ Khúc")) || (H.vi("Tham Lang") === ls.than && H.vi("Vũ Khúc") === ls.than),
    nguyenVan: [s("先贫后富武贪同身命之宫", "Trước nghèo sau giàu: Vũ Tham cùng cung Thân Mệnh.", CT), s("贪武先贫而后富", "Tham Vũ trước nghèo sau giàu.", Q3), s("贪武同行威镇边夷", "Tham Vũ đồng hành, uy trấn biên di.", CT)],
    luan: "Vũ Khúc Tham Lang cùng Mệnh hoặc Thân (Sửu/Mùi): tài tinh gặp dục tinh, phát muộn — sách nói 'tam thập niên hậu phát tài'. Trước 30 tuổi là thời tích lũy nghề; sốt ruột là mất cách." });
  them({ ma: "vu-khuc-mieu-vien", ten: "Vũ Khúc miếu viên", han: "武曲廟垣", dieuKien: (ls, H) => [1, 4, 7, 10].includes(ls.menh) && H.oMenh("Vũ Khúc"),
    nguyenVan: [s("武曲庙垣威名赫奕", "Vũ Khúc miếu viên, uy danh lừng lẫy.", CT), s("武曲庙垣威名赫奕 辰戍丑未生人安命在辰戍宫为四墓，若但在丑未次之", "Vũ Khúc miếu viên uy danh hách dịch: người sinh Thìn Tuất Sửu Mùi, Mệnh ở Thìn Tuất là tứ mộ; ở Sửu Mùi thứ.", Q3)],
    luan: "Vũ Khúc ở tứ mộ (Thìn Tuất Sửu Mùi) giữ Mệnh: tài tinh nhập miếu, quyết đoán, làm tài chính, kỹ thuật, quản lý giỏi. Sách xếp Thìn Tuất trên Sửu Mùi." });
  them({ ma: "liem-trinh-hung-tu", ten: "Hùng tú triều nguyên", han: "雄宿朝元", dieuKien: (ls, H) => [8, 7].includes(ls.menh) && H.oMenh("Liêm Trinh"),
    nguyenVan: [s("廉贞申未宫无杀富贵声扬播远名 雄宿朝元格，加杀平常", "Liêm Trinh ở Thân Mùi không sát tinh, phú quý tiếng vang xa: cách hùng tú triều nguyên; thêm sát thì thường.", Q3)],
    luan: "Liêm Trinh ở Thân (miếu) hoặc Mùi giữ Mệnh không sát tinh: mặt 'liêm' thắng mặt 'tù', kỷ luật thành uy, hợp cơ quan có quy củ. Thêm Kình Đà Hỏa Linh thì sách hạ xuống 'bình thường'." });
  them({ ma: "liem-sat-dong-vi", ten: "Liêm Sát đồng vị", han: "廉貞七殺", loai: "trung", dieuKien: (ls, H) => H.oMenh("Liêm Trinh") && H.oMenh("Thất Sát"),
    nguyenVan: [s("七殺廉貞同位，路上埋屍", "Thất Sát Liêm Trinh cùng chỗ, chôn xác bên đường.", TVP), s("廉贞七杀反为积富之人", "Liêm Trinh Thất Sát lại thành người tích của.", CT), s("廉贞七杀居庙旺反为积富之人 杀居午奇格，若陷地化忌，贫贱残疾", "Liêm Sát ở miếu vượng lại là người tích của; Sát ở Ngọ là cách lạ; nếu hãm địa hóa Kỵ thì nghèo bệnh.", Q3)],
    luan: "Liêm Trinh Thất Sát cùng Mệnh (Sửu/Mùi): sách có cả câu nặng ('lộ thượng mai thi') lẫn câu khen ('tích phú chi nhân') — nghĩa là cách này hai cực, tùy có hóa Kỵ, sát tinh hay không. Thực dụng: giữ an toàn đường sá, tránh liều; làm kỹ thuật, tài chính có kỷ luật thì tích được của." });
  them({ ma: "phiem-thuy-dao-hoa", ten: "Phiếm thủy đào hoa", han: "泛水桃花", loai: "trung", dieuKien: (ls, H) => [11, 0].includes(ls.menh) && H.oMenh("Tham Lang"),
    nguyenVan: [s("貪居亥子，名為犯水桃花", "Tham Lang ở Hợi Tý gọi là phạm thủy đào hoa.", TVP), s("贪遇羊陀居亥子名为泛水桃花 男女贪花，迷酒丧身。有吉曜则吉", "Tham gặp Kình Đà ở Hợi Tý gọi là phiếm thủy đào hoa: nam nữ tham hoa, mê rượu hại thân; có cát diệu thì cát.", Q3)],
    luan: "Tham Lang ở Hợi/Tý (thủy vượng) giữ Mệnh: sức hấp dẫn và ham vui đều mạnh, dễ hao vì tình và rượu, nhất là có Kình Đà. Sách thêm 'hữu cát diệu tắc cát' — có Tuần Triệt, Không Kiếp lại 'phản chủ đoan chính'." });
  them({ ma: "phong-luu-thai-truong", ten: "Phong lưu thái trượng", han: "風流彩杖", loai: "trung", dieuKien: (ls, H) => H.oMenh("Tham Lang") && (H.oMenh("Thiên Hình") || (ls.menh === 2 && H.oMenh("Đà La"))),
    nguyenVan: [s("刑遇貪狼，號曰風流彩杖", "Hình gặp Tham Lang, gọi là phong lưu thái trượng.", TVP), s("贪狼陀罗在寅宫号曰风流彩杖", "Tham Lang Đà La ở Dần gọi là phong lưu thái trượng.", Q3)],
    luan: "Tham Lang cùng Thiên Hình (hoặc Đà La ở Dần): ham vui gặp roi — vui chơi dễ vướng kỷ luật, pháp lý. Lời khuyên cổ: giữ lễ, chọn bạn." });
  // ---- Lộc, Mã, Tứ Hóa
  them({ ma: "loc-ma-giao-tri", ten: "Lộc Mã giao trì", han: "祿馬交馳", dieuKien: (ls, H) => { const m = H.vi("Thiên Mã"); return (H.vi("Lộc Tồn") === m || H.vi(H.saoHoa("Lộc")) === m) && (m === ls.menh || m === ls.than || H.tamPhuong(ls.menh).includes(m)); },
    nguyenVan: [s("祿馬最喜交馳", "Lộc Mã thích nhất cùng ruổi.", TVP), s("如与禄存同宫，谓之禄马交驰", "Nếu (Thiên Mã) cùng cung Lộc Tồn, gọi là lộc mã giao trì.", Q1), s("武曲禄马交驰发财远郡", "Vũ Khúc Lộc Mã giao trì, phát tài nơi quận xa.", Q3)],
    luan: "Thiên Mã đi cùng Lộc Tồn hoặc sao hóa Lộc, và cung ấy là Mệnh/Thân/tam phương: tiền đi với di chuyển — làm ăn xa, giao thương, vận tải, xuất ngoại. Sách dặn kỵ Tuần Triệt, Kình Hỏa cùng cung ('đa chủ lao khổ')." });
  them({ ma: "song-loc", ten: "Song Lộc (hợp lộc củng lộc)", han: "雙祿", dieuKien: (ls, H) => H.trongTamPhuong("Lộc Tồn", ls.menh) && H.trongTamPhuong(H.saoHoa("Lộc"), ls.menh),
    nguyenVan: [s("双禄重返终身富贵", "Song Lộc trở lại, trọn đời phú quý.", Q3), s("合禄拱禄定为巨擘之臣", "Hợp lộc củng lộc, định là bề tôi hàng đầu.", CT)],
    luan: "Lộc Tồn và sao hóa Lộc đều ở Mệnh hoặc tam phương tứ chính: hai nguồn lộc, đường tài lộc có nền và có duyên. Sách cũng dặn 'lộc phùng xung phá cát dã thành hung' — xem Không Kiếp Tuần Triệt." });
  them({ ma: "minh-loc-am-loc", ten: "Minh Lộc ám Lộc", han: "明祿暗祿", dieuKien: (ls, H) => { const a = H.vi("Lộc Tồn"), b = H.vi(H.saoHoa("Lộc")); return (a === ls.menh && b >= 0 && CanChi.hop(ls.menh, b)) || (b === ls.menh && CanChi.hop(ls.menh, a)); },
    nguyenVan: [s("明禄暗禄位至公卿", "Minh lộc ám lộc, ngôi tới công khanh.", Q3), s("明禄暗禄锦上添花", "Minh lộc ám lộc, gấm thêm hoa.", CT)],
    luan: "Một lộc ngồi Mệnh (minh), lộc kia ở cung lục hợp với Mệnh (ám): lộc sáng có lộc ngầm phụ — ngoài thu nhập chính còn nguồn kín đáo. Sách ví 'cẩm thượng thiêm hoa'." });
  them({ ma: "khoa-quyen-loc-cung", ten: "Khoa Quyền Lộc củng", han: "科權祿拱", dieuKien: (ls, H) => ["Lộc", "Quyền", "Khoa"].every(h => H.trongTamPhuong(H.saoHoa(h), ls.menh)),
    nguyenVan: [s("科权禄拱名誉昭彰", "Khoa Quyền Lộc chầu, danh dự rạng rỡ.", CT), s("科权禄合富贵双全", "Khoa Quyền Lộc hợp, phú quý song toàn.", Q3)],
    luan: "Ba sao hóa Lộc, Quyền, Khoa đều nằm trong Mệnh và tam phương tứ chính: duyên, thế, danh cùng về một mối. Sách: 'tam phương cát đa phương cát' — vẫn phải xem sát tinh và độ sáng của sao mang hóa." });
  them({ ma: "van-tinh-am-cung", ten: "Văn tinh ám củng", han: "文星暗拱", dieuKien: (ls, H) => !H.oMenh("Văn Xương") && !H.oMenh("Văn Khúc") && H.trongTamPhuong("Văn Xương", ls.menh) && H.trongTamPhuong("Văn Khúc", ls.menh),
    nguyenVan: [s("文星暗拱贾谊允矣登科", "Văn tinh ngầm chầu, Giả Nghị quả là đỗ cao.", CT), s("文科拱照贾谊年少登科 论三方", "Văn Khoa chầu chiếu, Giả Nghị tuổi trẻ đỗ cao: luận tam phương.", Q3)],
    luan: "Văn Xương Văn Khúc không ngồi Mệnh mà chiếu từ tam phương tứ chính: học vấn, giấy tờ, tiếng tăm đến từ bên ngoài đưa về; hợp thi cử, nghiên cứu, viết lách." });
  them({ ma: "xuong-khuc-giap-menh", ten: "Xương Khúc giáp Mệnh", han: "昌曲夾命", dieuKien: (ls, H) => H.giap(ls.menh, "Văn Xương", "Văn Khúc"),
    nguyenVan: [s("昌曲夹命最为奇 假若命在丑宫，文昌在寅，文曲在子是也", "Xương Khúc kẹp Mệnh rất lạ: ví như Mệnh ở Sửu, Văn Xương ở Dần, Văn Khúc ở Tý.", Q3), s("夹昌夹曲主贵兮", "Kẹp Xương kẹp Khúc chủ quý.", CT)],
    luan: "Văn Xương một bên, Văn Khúc một bên Mệnh (chỉ xảy ra ở Sửu/Mùi): được văn tinh hộ hai bên; sách 'bất quý tức phú', cần cát tinh ở Mệnh mới luận quý." });
  them({ ma: "ta-huu-giap-menh", ten: "Tả Hữu giáp Mệnh", han: "左右夾命", dieuKien: (ls, H) => H.giap(ls.menh, "Tả Phụ", "Hữu Bật"),
    nguyenVan: [s("左右夹命为贵格 如安命在丑宫，左辅在子宫，右弼在寅宫", "Tả Hữu kẹp Mệnh là quý cách: như Mệnh ở Sửu, Tả Phụ ở Tý, Hữu Bật ở Dần.", Q3)],
    luan: "Tả Phụ Hữu Bật kẹp hai bên Mệnh: có người đỡ hai vai dù không ngồi cùng; sách 'nhược bất quý tắc đại phú'." });
  them({ ma: "toa-quy-huong-quy", ten: "Tọa quý hướng quý", han: "坐貴向貴", dieuKien: (ls, H) => (H.oMenh("Thiên Khôi") && H.vi("Thiên Việt") === (ls.menh + 6) % 12) || (H.oMenh("Thiên Việt") && H.vi("Thiên Khôi") === (ls.menh + 6) % 12),
    nguyenVan: [s("坐贵向贵 谓魁钺在命迭相坐拱是也", "Tọa quý hướng quý: Khôi Việt ở Mệnh và đối cung cùng chầu.", QL), s("魁鉞同行，位居臺輔", "Khôi Việt đi cùng, ngôi ở đài phụ.", TVP)],
    luan: "Một quý nhân ngồi Mệnh, quý nhân kia ở Thiên di chiếu về: trong ngoài đều có người nâng; thi cử, tiến cử thuận. Sách lưu ý sau 40 tuổi gặp mộ khố thì không luận như vậy." });
  them({ ma: "khoi-viet-giap-menh", ten: "Khôi Việt giáp Mệnh", han: "魁鉞夾命", dieuKien: (ls, H) => H.giap(ls.menh, "Thiên Khôi", "Thiên Việt"),
    nguyenVan: [s("魁钺夹命为奇格 如命安在辰宫，魁在卯，钺在巳宫是也", "Khôi Việt kẹp Mệnh là cách lạ: như Mệnh ở Thìn, Khôi ở Mão, Việt ở Tỵ.", Q3)],
    luan: "Thiên Khôi Thiên Việt kẹp hai bên Mệnh: quý nhân hộ hai bên; nhẹ hơn tọa quý hướng quý nhưng vẫn là cách được giúp." });
  them({ ma: "ma-dau-doi-kiem", ten: "Mã đầu đới kiếm", han: "馬頭帶劍", loai: "trung", dieuKien: (ls, H) => ls.menh === 6 && H.oMenh("Kình Dương"),
    nguyenVan: [s("馬頭帶劍，鎮衛邊疆", "Đầu ngựa đeo kiếm, trấn giữ biên cương.", TVP), s("擎羊子午卯酉非夭折而刑伤 午凶卯次之。子酉又次之，马头带剑，吉多勿论", "Kình Dương ở Tý Ngọ Mão Dậu chẳng yểu thì thương; Ngọ hung, Mão thứ, Tý Dậu thứ nữa; mã đầu đới kiếm thì cát nhiều không luận vậy.", Q3)],
    luan: "Kình Dương ở Ngọ giữ Mệnh: kiếm đặt trên đầu ngựa — sách vừa nói 'trấn vệ biên cương' vừa nói Ngọ là chỗ Kình Dương hãm. Hai mặt: có cát tinh (Thiên Đồng, Tham Lang, Hóa Lộc) thì thành uy; không thì cần tránh va chạm, dao kéo, kiện tụng." });
  them({ ma: "hinh-tu-giap-an", ten: "Hình tù giáp ấn", han: "刑囚夾印", loai: "trung", dieuKien: (ls, H) => H.oMenh("Thiên Tướng") && H.oMenh("Liêm Trinh") && (H.oMenh("Kình Dương") || H.oMenh("Thiên Hình")),
    nguyenVan: [s("刑囚夾印，刑杖惟司", "Hình tù kẹp ấn, chỉ coi việc hình trượng.", TVP), s("刑囚夹印 天刑廉贞同临身命主武勇之人", "Hình tù giáp ấn: Thiên Hình Liêm Trinh cùng tới Thân Mệnh, chủ người võ dũng.", QL), s("天相廉贞擎羊来多招刑杖难逃", "Thiên Tướng Liêm Trinh Kình Dương tới, nhiều chuốc hình trượng khó tránh.", Q3)],
    luan: "Thiên Tướng (ấn) ngồi cùng Liêm Trinh (tù) và Kình Dương hoặc Thiên Hình (hình): ấn tín gắn với luật pháp — hợp nghề pháp chế, công an, quân đội, y (dao kéo). Mặt trái: dễ vướng giấy tờ, kiện tụng; sách khuyên làm rõ ràng, đúng luật." });
  // ---- bại cục
  them({ ma: "duong-da-giap-ky", ten: "Dương Đà giáp Kỵ", han: "羊陀夾忌", loai: "hung", dieuKien: (ls, H) => H.oMenh("Lộc Tồn") && H.oMenh(H.saoHoa("Kỵ")),
    nguyenVan: [s("羊陀夹忌为败局 假如安命在申宫，又逢忌星，羊在酉陀在未夹之", "Dương Đà kẹp Kỵ là bại cục: ví như Mệnh ở Thân có Hóa Kỵ, Kình ở Dậu Đà ở Mùi kẹp lại.", Q3)],
    luan: "Lộc Tồn ở Mệnh nên Kình Đà kẹp hai bên, mà Mệnh lại có sao hóa Kỵ: lộc bị kẹp, lo nghĩ nhiều, dễ bị người thân sơ làm khó. Sách gọi 'bại cục' — hiểu là cần sống giản dị, làm việc rõ ràng, không cầm tiền người khác; có cát tinh thì bớt." });
  them({ ma: "khong-kiep-giap-menh", ten: "Không Kiếp giáp Mệnh", han: "空劫夾命", loai: "hung", dieuKien: (ls, H) => H.giap(ls.menh, "Địa Không", "Địa Kiếp"),
    nguyenVan: [s("夹空夹劫主贫贱", "Kẹp Không kẹp Kiếp chủ nghèo hèn.", CT), s("劫空夹命为败局", "Kiếp Không kẹp Mệnh là bại cục.", Q3)],
    luan: "Địa Không Địa Kiếp kẹp hai bên Mệnh (Mệnh ở Tỵ/Hợi): hai sao rỗng chặn hai cửa — tiền bạc, chỗ dựa hay hụt. Lời cổ nặng; thực dụng: sống bằng tri thức, tay nghề, ít giữ tiền mặt lớn, không bảo lãnh." });
  them({ ma: "khong-kiep-thu-menh", ten: "Không Kiếp thủ Mệnh", han: "空劫守命", loai: "hung", dieuKien: (ls, H) => H.oMenh("Địa Không") && H.oMenh("Địa Kiếp"),
    nguyenVan: [s("命里逢空不飘流即主疾苦", "Mệnh gặp Không, không phiêu bạt thì khổ vì bệnh.", CT), s("劫空为害最愁人，才智英雄误一身，只好为僧并学术", "Kiếp Không hại người đáng lo nhất, tài trí anh hùng lỡ một đời; chỉ hợp làm tăng và học thuật.", Q1)],
    luan: "Cả Địa Không Địa Kiếp cùng ngồi Mệnh (sinh giờ Tý hoặc Ngọ, Mệnh ở Hợi/Tỵ): tư tưởng khác người, không màng vật chất, hay bỏ dở. Sách chỉ lối: 'vi tăng tịnh học thuật' — nghiên cứu, tâm linh, sáng tạo là đường hợp; tiền bạc nên giao người khác giữ." });
  them({ ma: "hoa-linh-giap-menh", ten: "Hỏa Linh giáp Mệnh", han: "火鈴夾命", loai: "hung", dieuKien: (ls, H) => H.giap(ls.menh, "Hỏa Tinh", "Linh Tinh"),
    nguyenVan: [s("火铃夹命为败局 如命安寅申，火星在丑，铃星在卯。吉多尚可，惟夹忌", "Hỏa Linh kẹp Mệnh là bại cục: như Mệnh ở Dần Thân, Hỏa ở Sửu, Linh ở Mão; cát nhiều còn được, chỉ sợ kẹp Kỵ.", Q3)],
    luan: "Hỏa Tinh Linh Tinh kẹp hai bên Mệnh: hai ngọn lửa hai bên, hay nóng vội, dễ va vấp bất ngờ. Sách: 'cát đa thượng khả' — có cát tinh ở Mệnh thì ổn; có Hóa Kỵ ở Mệnh mới đáng ngại." });
  them({ ma: "menh-vo-chinh-dieu", ten: "Mệnh vô chính diệu", han: "命無正曜", loai: "trung", dieuKien: (ls, H) => H.soChinhTinh(ls.menh) === 0,
    nguyenVan: [s("命无正曜二姓延生", "Mệnh không chính diệu, hai họ nối sinh.", Q3), s("若命宫无正曜者，财官二宫有吉星拱照，富贵全美，或偏房庶母所生", "Nếu cung Mệnh không chính diệu mà hai cung Tài Quan có cát tinh chầu chiếu thì phú quý toàn mỹ, hoặc là con mẹ thứ.", "q3 谈星要论")],
    luan: "Cung Mệnh không có chính tinh: người 'mượn' sao ở Thiên di chiếu về, đời nhiều tùy duyên, hay xa quê, hợp làm con nuôi họ khác theo lối nói cổ. Sách nói rõ: Tài Quan có cát tinh chầu thì vẫn 'phú quý toàn mỹ' — không phải cách xấu, chỉ là cách phải xem tam phương." });
  them({ ma: "tai-am-giap-an", ten: "Tài ấm giáp ấn", han: "財蔭夾印", dieuKien: (ls, H) => H.oMenh("Thiên Tướng") && H.giap(ls.menh, "Vũ Khúc", "Thiên Lương"),
    nguyenVan: [s("财荫夹印 相守命武梁来夹是也，田宅宫亦然", "Tài ấm giáp ấn: Thiên Tướng giữ Mệnh, Vũ Khúc Thiên Lương kẹp lại; cung Điền trạch cũng vậy.", FL)],
    luan: "Theo nguyên văn: Thiên Tướng ở Mệnh, Vũ Khúc và Thiên Lương kẹp hai bên. Với cách an 14 chính tinh của chính Toàn thư, Vũ Khúc luôn cách Thiên Tướng một số cung chẵn nên không thể ở liền kề — tool kiểm 400 lá số không bắt được ca nào; kho ghi nhận đây là chỗ nguyên văn và cách an sao chưa khớp (xem báo cáo). Giữ lại để đối chiếu, không dùng để luận.", ghiChu: "[U] điều kiện có thể không bao giờ xảy ra" });
  return { cach: C };
})();
