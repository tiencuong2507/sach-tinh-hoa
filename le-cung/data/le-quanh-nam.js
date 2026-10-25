// Lễ cúng — nhóm 1: Lễ quanh năm (14 lễ).
// tucLe: trích nguyên văn Phan Kế Bính, Việt Nam phong tục (1915), đối chiếu được trong nguon/vnpt-*.txt (tools/kiem-tra-le-cung.mjs).
// vanKhan: bản soạn của kho theo khung 6 phần (data/khung.js), không phải bản cổ. Phần không có nguồn mang nhãn [I].
window.LC_LE = window.LC_LE || { le: [] };
window.LC_LE.le.push(
{ ma: "ong-cong-ong-tao", nhom: "quanh-nam", ten: "Ông Công ông Táo", tenKhac: "Tết Táo quân",
  thoiDiem: { loai: "am", ngay: 23, thang: 12, ghi: "23 tháng Chạp; nhiều nhà cúng trước giờ Ngọ (trưa)" },
  yNghia: "Tiễn Táo quân (vua bếp) lên trời sau một năm trông bếp lửa của nhà. Đây là lễ mở đầu chuỗi lễ Tết. Nhà cửa, bàn thờ thường được dọn dẹp từ hôm này.",
  tucLe: [
    { t: "Hai mươi ba tháng chạp là Tết Táo quân. Ta thường cho hôm ấy là ngày vua bếp lên chầu trời.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Ta theo hai điển ấy, cho nên cứ đến ngày ấy, thì mua hai mũ ông, một mũ bà để thờ và mua con cá chép để làm ngựa cho táo quân lên chầu trời.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Tiễn vua bếp đã là một chuyện hão huyền, mua cá làm ngựa mới lại nực cười thay!", m: "Tứ thời tiết lạp (lời bàn của tác giả)", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Hương, hoa, đèn nến, trầu cau, rượu, nước", "Mâm cơm hoặc xôi gà, hoa quả (tùy nhà)", "Bộ mũ áo Táo quân bằng giấy (hai ông một bà) — tùy nhà, có nhà bỏ", "Cá chép sống để phóng sinh hoặc cá chép giấy — tùy vùng, tùy nhà"],
  trinhTu: ["Dọn bếp, lau bàn thờ.", "Bày lễ ở bàn thờ gia tiên hoặc bàn thờ Táo quân (nếu có), xong trước trưa 23.", "Thắp hương, đọc bài khấn.", "Hương cháy hết thì hạ lễ; hóa mũ áo giấy nếu dùng.", "Thả cá chép ra sông hồ, không thả túi nylon."],
  doiTuong: "Táo quân",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính cáo Đông Trù Tư Mệnh Táo Phủ Thần Quân, tức Táo quân, vị thần trông coi bếp lửa của nhà con.
Một năm đã qua, bếp nhà con được yên ấm, cơm canh đủ bữa. Nay đến ngày Táo quân về trời, chúng con thành tâm sửa biện lễ vật: hương hoa, trà quả, cơm rượu và mũ áo tiễn hành, kính dâng trước án.
Cúi xin Táo quân nhận lễ, lên chầu trời tâu điều hay, bỏ qua điều dở, thương cho nhà con trong năm còn chỗ chưa trọn.
Kính mong sang năm mới, Táo quân trở lại, giữ cho bếp nhà con ấm lửa, người nhà khỏe mạnh, ăn ở hòa thuận, làm việc thuận lợi.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "308", y: "Hạn chế đốt vàng mã; không thả cá kèm túi nylon là việc giữ vệ sinh chung, không thuộc văn bản này." }],
  diBan: [{ nd: "Phan Kế Bính chép mũ áo là 'hai mũ ông, một mũ bà' và cá chép làm ngựa; cách cúng trước giờ Ngọ và thả cá sống là tục đang lưu hành, chưa có nguồn thành văn.", nguon: "Tứ thời tiết lạp; phần sau: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "tat-nien", nhom: "quanh-nam", ten: "Tất niên", tenKhac: "Trừ tịch, cúng cuối năm",
  thoiDiem: { loai: "am", ngay: 30, thang: 12, ghi: "Chiều 30 tháng Chạp (tháng thiếu thì 29); nhiều nhà làm sớm vài ngày" },
  yNghia: "Bữa cơm cuối năm dâng gia tiên, báo một năm đã xong, mời ông bà về ăn Tết. Cũng là dịp cả nhà ngồi lại với nhau trước năm mới.",
  tucLe: [
    { t: "Ba mươi tháng chạp là ngày trừ tịch. Trừ tịch là chiều hôm trừ hết năm cũ mà sang năm mới.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Ta thường không hiểu ngày ấy là một tết riêng, cho là ngày tiên thường hôm nguyên đán. Cho nên cứ hôm ấy thì đem trầu cau đi thỉnh tảo tiên phần, rồi về cúng Tết.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Cách Tết một vài hôm, ai nấy dọn dẹp nhà cửa, lau rửa đồ thờ đồ phượng.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Hương, hoa, đèn nến, trầu cau, rượu, nước", "Mâm cơm tất niên: tùy nhà, tùy vùng; có bánh chưng hoặc bánh tét nếu đã gói", "Mâm ngũ quả bày sẵn cho Tết"],
  trinhTu: ["Ban ngày ra mộ thắp hương, mời ông bà về ăn Tết (nếu mộ gần).", "Lau dọn bàn thờ, thay nước, bày mâm ngũ quả.", "Chiều bày mâm cơm, thắp hương, đọc bài khấn.", "Cả nhà cùng ăn bữa tất niên sau khi hạ lễ."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], ngày cuối năm.
Con là [tên], cùng toàn gia ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Một năm đã hết. Nhà con có việc được, có việc chưa được, nhưng mọi người vẫn bình an về đủ. Nhân ngày trừ tịch, chúng con thành tâm sửa biện lễ vật: hương hoa, trà rượu, mâm cơm cuối năm, kính dâng trước án.
Cúi xin các vị thần linh và gia tiên về đây chứng giám, nhận lễ, cùng con cháu ăn Tết ba ngày.
Kính mong gia tiên phù hộ cho cả nhà sang năm mới sức khỏe, công việc trôi chảy, trên dưới hòa thuận, con cháu học hành nên người.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Phan Kế Bính coi ngày 30 là 'tiên thường' của Tết Nguyên đán: đi tảo mộ mời tổ tiên rồi về cúng. Tục ăn tất niên tập thể ở cơ quan, hàng quán là lớp mới, chưa có nguồn thành văn.", nguon: "Tứ thời tiết lạp; phần sau: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "giao-thua", nhom: "quanh-nam", ten: "Giao thừa", tenKhac: "Lễ trừ tịch lúc nửa đêm",
  thoiDiem: { loai: "am", ngay: 30, thang: 12, ghi: "Giờ Tý đêm 30 rạng mùng 1 (23h–1h)" },
  yNghia: "Khoảnh khắc năm cũ sang năm mới. Tục xưa tin mỗi năm có một vị Hành khiển coi việc trần gian, cuối năm bàn giao cho vị mới, nên cúng ngoài sân để tiễn vị cũ, đón vị mới; trong nhà cúng gia tiên.",
  tucLe: [
    { t: "Nửa đêm hôm ba mươi rạng ngày mồng một, ở thành phố nhà nào cũng bày hương án ra giữa sân để cúng giao thừa. Ở thôn quê thì các xóm tế giao thừa tại nơi điếm sở, trống đánh, pháo đốt ầm ầm. Tục ta tin rằng mỗi năm có một ông Hành-khiển, coi việc nhân gian, hết năm thì thần nọ bàn giao công việc cho thần kia, cho nên cúng tế để tiễn đưa ông cũ mà đón ông mới.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Ngoài sân: hương, đèn, trầu rượu, xôi hoặc bánh chưng, gà luộc hoặc hoa quả (tùy nhà)", "Trong nhà: hương hoa, bánh mứt, trà rượu dâng gia tiên", "Muối, gạo (tùy vùng); vàng mã tùy nhà, nên giảm"],
  trinhTu: ["Bày lễ ngoài sân trước 23h.", "Đúng giờ Tý thắp hương ngoài sân, khấn tiễn vị Hành khiển cũ, đón vị mới.", "Vào nhà thắp hương bàn thờ gia tiên, khấn đón năm mới.", "Hạ lễ, cả nhà chúc tuổi nhau."],
  doiTuong: "Hành khiển",
  vanKhan: `Hôm nay là ngày [ngày], giờ Tý, giao thừa bước sang năm [năm mới].
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính cáo vị Hành khiển cùng các quan hành binh, phán quan năm cũ; kính cáo vị Hành khiển cùng các quan năm mới; kính lạy Thổ công, Táo quân và gia tiên nội ngoại.
Năm cũ đã trọn, năm mới vừa sang. Chúng con thành tâm sửa biện lễ vật: hương đèn, trầu rượu, xôi bánh, hoa quả, kính dâng giữa trời đất.
Cúi xin vị thần năm cũ nhận lễ tiễn, bỏ qua lỗi lầm của nhà con trong năm; vị thần năm mới nhận lễ đón, che chở cho nhà con trọn năm.
Kính mong trời đất, thần linh và gia tiên cho cả nhà một năm bình an, mưa thuận gió hòa, người người khỏe mạnh, việc làm thuận lợi, lòng giữ được thiện lành.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "308", y: "Pháo bị cấm từ 1994 (không thuộc văn bản này); đốt vàng mã hạn chế." }],
  diBan: [{ nd: "Phan Kế Bính ghi: thành phố cúng giữa sân từng nhà; thôn quê cả xóm tế chung tại điếm. Tên các vị Hành khiển theo 12 năm có trong sách văn khấn hiện hành, chưa đối chiếu được với nguồn cổ mở, kho không ghi tên.", nguon: "Tứ thời tiết lạp; tên Hành khiển: chưa có nguồn" }],
  viec: "cau-phuc" },

{ ma: "mung-1-tet", nhom: "quanh-nam", ten: "Mùng 1 Tết", tenKhac: "Tết Nguyên đán, cúng sáng mùng 1 (và mùng 2, mùng 3)",
  thoiDiem: { loai: "am", ngay: 1, thang: 1, ghi: "Sáng mùng 1; mùng 2, mùng 3 cúng tương tự" },
  yNghia: "Bữa cỗ đầu năm dâng gia tiên và các vị thần trong nhà, rồi con cháu mừng tuổi ông bà cha mẹ. Ngày này giữ lời ăn tiếng nói, mong cả năm êm.",
  tucLe: [
    { t: "Sáng mồng một Tết thì làm cỗ cúng Gia-tiên và cúng cả Thổ công, Táo quân, Nghệ sư, v.v... cỗ bàn to nhỏ thế nào cũng được, nhưng làm sao cũng phải có bánh chưng, cá kho, giò, chả, dưa hành, thịt bò mới ra làm cỗ ngày Tết.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Cúng gia tiên xong thì con cháu ra mừng tuổi ông bà cha mẹ, lạy hai lạy.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Cha mẹ mất rồi thì hôm mồng hai Tết, phải làm cỗ đem đến nhà con trưởng cúng cha mẹ. Người nghèo thì đem trầu cau vàng hương đến lễ cũng được.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Trong ba ngày Tết Nguyên-Đán, con cháu trong họ đem trầu cau đến nhà thờ lễ Tổ, chớ không có ăn uống gì.", m: "Phụng sự tổ tôn", f: "vnpt-i04-phung-su-to-ton" }
  ],
  leVat: ["Hương hoa, đèn nến, trầu cau, rượu, nước, trà", "Cỗ Tết tùy nhà, tùy vùng: miền Bắc hay có bánh chưng, giò, dưa hành (theo Phan Kế Bính); nơi khác bánh tét, thịt kho…", "Bánh mứt, hoa quả"],
  trinhTu: ["Sáng sớm thay nước, thắp hương bàn thờ.", "Bày cỗ, thắp hương, đọc bài khấn.", "Con cháu mừng tuổi ông bà cha mẹ.", "Hạ lễ, cả nhà ăn cỗ; đi lễ nhà thờ họ nếu có.", "Mùng 2, mùng 3 cúng cơm tương tự, lời khấn ngắn hơn."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], ngày đầu năm mới.
Con là [tên], cùng toàn gia ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân, các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ], các cụ, ông bà, cha mẹ đã khuất.
Năm mới vừa sang, con cháu sum họp đông đủ. Chúng con thành tâm sửa biện lễ vật: hương hoa, trà rượu, bánh trái và mâm cỗ đầu năm, kính dâng trước án.
Cúi xin các vị thần linh và gia tiên về hưởng lễ, chứng cho lòng thành của con cháu.
Kính mong gia tiên phù hộ cho cả nhà một năm mới an lành: người già thêm tuổi thêm khỏe, người trẻ học hành làm ăn nên việc, anh em trên dưới thuận hòa, nhà cửa yên vui.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Cỗ Tết Phan Kế Bính kể là cỗ Bắc Bộ đầu thế kỷ 20 ('bánh chưng, cá kho, giò, chả, dưa hành, thịt bò'). Cỗ Tết các vùng khác: kho chưa có nguồn thành văn, không viết.", nguon: "Tứ thời tiết lạp; phần khác: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "hoa-vang", nhom: "quanh-nam", ten: "Hóa vàng", tenKhac: "Cúng tiễn ông vải, khai hạ",
  thoiDiem: { loai: "am", ngay: 4, thang: 1, ghi: "Mùng 4 theo Phan Kế Bính; nhà thì mùng 3, nhà thì mùng 7 (khai hạ)" },
  yNghia: "Hết mấy ngày Tết, làm bữa cơm tiễn gia tiên 'về', hóa vàng mã đã bày từ hôm Tết. Mùng 7 hạ cây nêu là ngày khai hạ, mọi việc trở lại bình thường.",
  tucLe: [
    { t: "Đến ngày mồng bốn thì hóa vàng. Ngày ấy xấu hay là chạm phải ngày tuổi chủ nhà thì hóa trước sau một ngày cũng được, có nhà để đến mồng bảy mới hóa vàng, gọi là ngày cúng tiễn ông vải. Hôm ấy con cháu họp đông đủ mà ăn uống vui vầy với nhau.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Đến ngày mồng bảy hạ cây nêu, gọi là ngày khai hạ, và gọi là nhàn nhật.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Hương hoa, trầu rượu, nước", "Mâm cơm tiễn (tùy nhà)", "Vàng mã đã bày từ Tết — hóa ít, hoặc không dùng"],
  trinhTu: ["Chọn ngày: mùng 3, 4 hoặc 7, tránh ngày xung tuổi chủ nhà nếu nhà có lệ ấy.", "Bày cơm, thắp hương, đọc bài khấn tiễn.", "Hương tàn, hóa vàng mã ở nơi an toàn, rưới chút rượu lên tro (tùy nhà).", "Hạ lễ, cả nhà ăn bữa cuối Tết."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Mấy ngày Tết đã qua, con cháu được sum họp, được ông bà về cùng ăn Tết. Nay Tết đã hết, chúng con thành tâm sửa biện lễ vật: hương hoa, trà rượu, mâm cơm tiễn, kính dâng trước án.
Cúi xin gia tiên nhận lễ, chứng cho lòng thành, rồi thong thả trở về nơi yên nghỉ.
Kính mong gia tiên tiếp tục phù hộ cho cả nhà một năm làm ăn thuận lợi, đi về bình an, ốm đau ít, vui vẻ nhiều; mỗi khi tuần tiết con cháu lại thắp hương kính mời.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "308", y: "Hạn chế đốt vàng mã." }],
  diBan: [{ nd: "Chính Phan Kế Bính đã ghi nhiều cách: mùng 4, lệch một ngày nếu ngày xấu, hoặc mùng 7. Không có ngày 'đúng' duy nhất.", nguon: "Tứ thời tiết lạp" }],
  viec: "te-le" },

{ ma: "ram-thang-gieng", nhom: "quanh-nam", ten: "Rằm tháng Giêng", tenKhac: "Tết Thượng nguyên, Tết Nguyên tiêu",
  thoiDiem: { loai: "am", ngay: 15, thang: 1 },
  yNghia: "Rằm đầu năm. Nhà thì cúng gia tiên ở nhà, nhà thì lên chùa, nhà thì làm cả hai. Người xưa coi là ngày mở đầu một năm đi lễ.",
  tucLe: [
    { t: "Mỗi năm về các tuần tiết như ba ngày chính đán, ngày đoan dương, ngày thượng nguyên, ngày trùng thập, v.v... và ngày hạ điền là ngày mới bắt đầu bước chân xuống ruộng, ngày thượng điền là ngày mới có gạo mới, ngày thuần húy, ngày thần đản là ngày sinh-nhật hóa-nhật của thần. Các ngày ấy đều có lễ, tùy tục làng và tùy năm phong khiểm, hoặc dùng bò lợn hoặc dùng gà xôi, nơi thì tế, nơi thì lễ.", m: "Việc tế tự (lễ của làng)", f: "vnpt-ii02-viec-te-tu" },
    { t: "Suốt một tháng giêng, già trẻ trai gái, kẻ chợ nhà quê, quần điều áo thắm, kẻ thì lễ bái chùa này miếu nọ, người thì du ngoạn cảnh nọ cảnh kia", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  ghiTucLe: "Phan Kế Bính chỉ nhắc 'ngày thượng nguyên' trong các tuần tiết của làng và việc đi lễ chùa cả tháng Giêng, không chép lễ Rằm tháng Giêng tại nhà. Phần lễ nhà dưới đây kho tự soạn [I].",
  leVat: ["Hương hoa, trầu rượu, nước, trà", "Cỗ chay hoặc cỗ mặn tùy nhà; nhiều nhà cúng chay vì đi chùa", "Bánh trôi, chè, xôi (tùy vùng)"],
  trinhTu: ["Sáng dọn bàn thờ, thay nước.", "Bày lễ, thắp hương, đọc bài khấn.", "Lên chùa nếu nhà có lệ.", "Hạ lễ, cả nhà dùng."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], rằm tháng Giêng.
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Nhân ngày rằm đầu năm, chúng con thành tâm sửa biện lễ vật: hương hoa, trà quả, xôi chè, cỗ bàn tùy sức nhà, kính dâng trước án.
Cúi xin các vị thần linh và gia tiên về hưởng lễ, chứng cho lòng thành của con cháu.
Kính mong một năm mới mở ra êm thuận: nhà cửa yên ổn, người người khỏe mạnh, việc làm việc học đều có kết quả, điều lành đến, điều dữ qua.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Câu 'cúng cả năm không bằng rằm tháng Giêng' lưu truyền rộng nhưng kho chưa tìm được nguồn thành văn cổ.", nguon: "chưa có nguồn" }],
  viec: "cau-phuc" },

{ ma: "thanh-minh", nhom: "quanh-nam", ten: "Thanh minh", tenKhac: "Tảo mộ",
  thoiDiem: { loai: "tiet", kinhDo: 15, ghi: "Tiết Thanh minh, thường rơi vào 4–5 tháng Tư dương lịch; đi tảo mộ trong tiết này" },
  yNghia: "Ra thăm mộ ông bà, dọn cỏ, đắp đất, thắp hương, rồi về nhà cúng gia tiên. Đây là lễ hướng về mộ phần, không nặng cỗ bàn.",
  tucLe: [
    { t: "Trong khoảng tháng ba, có một tiết hậu gọi là tiết Thanh-Minh. Thanh-Minh nghĩa là trời độ ấy mát mẻ quang đãng. Tục Tàu hôm ấy, giai-nhân, tài tử, đua nhau đi tảo mộ, gọi là Hội Đạp-thanh. Ta không ăn Tết ấy, nhưng cũng nhiều người nhân dịp ấy mà đi tảo mộ. Tảo mộ là đi thăm mộ tiền-nhân, cỏ rậm thì phát cho quang, đất khuyết thì đắp bồi lên, rồi về nhà cũng làm cỗ cúng gia-tiên.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Một tiết thanh-minh thì cả họ rủ nhau đi đắp mả Tổ, nhiều họ đắp mãi to gần bằng núi. Có họ đắp xong thì tế ngay tại mả Tổ, có họ thì đem về nhà.", m: "Phụng sự tổ tôn", f: "vnpt-i04-phung-su-to-ton" }
  ],
  leVat: ["Tại mộ: hương, hoa, trầu cau, rượu, nước, hoa quả hoặc xôi (tùy nhà)", "Lễ khấn Thổ thần nơi mộ: hương, trầu rượu riêng (tùy nhà)", "Về nhà: cỗ cúng gia tiên tùy sức"],
  trinhTu: ["Chọn một ngày trong tiết Thanh minh, cả nhà hoặc cả họ cùng đi.", "Thắp hương khấn Thổ thần nơi mộ trước.", "Dọn cỏ, đắp đất, lau bia.", "Thắp hương, đọc bài khấn trước mộ.", "Về nhà cúng gia tiên."],
  doiTuong: "Thổ thần",
  vanKhan: `Hôm nay là ngày [ngày], trong tiết Thanh minh.
Con là [tên], ngụ tại [địa chỉ], cùng con cháu về đây.
Kính cáo Thổ thần coi giữ khu đất này; kính lạy [người đã khuất] đang yên nghỉ tại phần mộ này.
Mưa xuân đã thấm, cỏ đã mọc. Nhân tiết Thanh minh, con cháu về sửa sang phần mộ, dọn cỏ, đắp đất, và thành tâm sửa biện lễ vật: hương hoa, trầu rượu, hoa quả, kính dâng trước mộ.
Cúi xin Thổ thần cho phép con cháu được dọn dẹp, và tiếp tục giữ gìn cho phần mộ yên ổn.
Cúi xin [người đã khuất] về nhận lễ, chứng cho lòng nhớ của con cháu.
Kính mong người phù hộ cho cả nhà bình an, con cháu nhớ cội nhớ nguồn, giữ được nếp nhà.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Phan Kế Bính ghi hai cách sau khi đắp mả Tổ: tế ngay tại mộ, hoặc về nhà tế. Chu Tử gia lễ quyển 5 (Mộ tế) cũng tế mộ rồi tế Hậu Thổ riêng ở bên trái mộ.", nguon: "Phụng sự tổ tôn; Gia lễ quyển 5" }],
  viec: "te-le" },

{ ma: "han-thuc", nhom: "quanh-nam", ten: "Hàn thực", tenKhac: "Tết bánh trôi bánh chay, mùng 3 tháng 3",
  thoiDiem: { loai: "am", ngay: 3, thang: 3 },
  yNghia: "Tết 'ăn đồ lạnh' gốc Trung Hoa, sang ta thành ngày làm bánh trôi bánh chay cúng gia tiên. Phan Kế Bính nói rõ: ta chỉ cúng gia tiên, không ai nhớ đến tích Giới Tử Thôi, và cũng không kiêng nấu nướng.",
  tucLe: [
    { t: "Ngày mồng ba tháng ba là Tết Hàn thực. Hàn thực nghĩa là ăn đồ lạnh.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Ta nhiễm theo tục ấy, thành ra ăn Tết hôm mồng ba. Mà ta thì làm bánh trôi bánh chay để thế cho đồ lạnh, nhưng ta chỉ cúng gia-tiên, chứ không ai tưởng gì đến Giới-Tử-Thôi. Mà tiếng là hàn thực, nhưng nấu nướng chẳng có kiêng gì.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Bánh trôi, bánh chay", "Hương hoa, trầu rượu, nước, trà", "Hoa quả (tùy nhà)"],
  trinhTu: ["Làm hoặc mua bánh trôi bánh chay.", "Lau bàn thờ, thay nước, cắm hoa.", "Bày bánh lên bàn thờ cùng hương hoa, thắp hương, đọc bài khấn.", "Hạ lễ, cả nhà ăn bánh."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], mùng ba tháng Ba.
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Nhân tết Hàn thực mùng ba tháng Ba, chúng con thành tâm sửa biện lễ vật: hương hoa, trà quả, bánh trôi bánh chay nhà làm, kính dâng trước án.
Cúi xin gia tiên về hưởng lễ, chứng cho lòng thành của con cháu.
Kính mong gia tiên phù hộ cho cả nhà mạnh khỏe, mùa màng việc làm thuận lợi, anh em hòa thuận, con cháu ngoan ngoãn, nhà cửa yên vui.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Theo Phan Kế Bính, tục gốc kiêng lửa ba ngày từ mùng 3; ở ta không kiêng, chỉ làm bánh trôi bánh chay.", nguon: "Tứ thời tiết lạp" }],
  viec: "te-le" },

{ ma: "doan-ngo", nhom: "quanh-nam", ten: "Đoan ngọ", tenKhac: "Tết giết sâu bọ, mùng 5 tháng 5",
  thoiDiem: { loai: "am", ngay: 5, thang: 5, ghi: "Cúng giữa trưa (giờ Ngọ)" },
  yNghia: "Tết giữa mùa hè. Sáng ăn rượu nếp, hoa quả 'giết sâu bọ'; trưa cúng gia tiên; chiều hái lá thuốc. Phan Kế Bính nhắc: ta theo tục mà không cúng Khuất Nguyên, và cũng không nên uống lá bừa.",
  tucLe: [
    { t: "Mồng năm tháng năm, gọi là Tết Đoan ngọ, hay là Đoan-dương.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Sáng sớm hôm ấy, ăn rượu nếp, trứng luộc, kê, bánh đa, đào, mận, muỗm, dưa hấu, uống nước dừa. Người lớn thì uống rượu hòa ít tam thần đơn, hoặc hồng hoàng, gọi là giết sâu bọ.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Giữa buổi trưa hôm ấy thì làm cỗ cúng gia-tiên, rồi đi hái lá mồng năm, bất cứ lá gì cũng hái, mà nhất là hay hái lá ích mẫu, lá cối xay, lá muỗm, lá vối, v.v...", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Vậy Tết ấy là một ngày kỷ-niệm ông Khuất-Nguyên, mà ta thì thấy người Tàu ăn Tết cũng theo. Nhưng theo thì theo chớ không cúng gì Khuất-Nguyên.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Rượu nếp (cơm rượu), hoa quả mùa hè: mận, vải, dưa", "Bánh tro (bánh ú) ở nhiều vùng — tùy vùng", "Hương hoa, trầu rượu, nước"],
  trinhTu: ["Sáng cả nhà ăn rượu nếp, hoa quả.", "Lau bàn thờ, thay nước.", "Giữa trưa bày lễ, thắp hương, đọc bài khấn.", "Hạ lễ; hái lá thuốc nếu nhà có lệ (không uống lá lạ)."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], mùng năm tháng Năm.
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Nhân tết Đoan ngọ giữa mùa hè, chúng con thành tâm sửa biện lễ vật: hương hoa, trà rượu, rượu nếp, hoa quả đầu mùa, kính dâng trước án.
Cúi xin gia tiên về hưởng lễ, chứng cho lòng thành của con cháu.
Kính mong gia tiên phù hộ cho cả nhà qua mùa nắng nóng được khỏe mạnh, ít bệnh tật, ruộng vườn việc làm thuận lợi, trong nhà vui vẻ.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Phan Kế Bính kể các tục kèm theo ở Bắc Bộ: nhuộm móng bằng lá móng, đeo bùa chỉ ngũ sắc, treo ngải cứu kết hình con giáp. Bánh tro, bánh ú là tục vùng khác, kho chưa có nguồn thành văn.", nguon: "Tứ thời tiết lạp; bánh tro: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "vu-lan", nhom: "quanh-nam", ten: "Vu lan, rằm tháng Bảy", tenKhac: "Tết Trung nguyên, xá tội vong nhân",
  thoiDiem: { loai: "am", ngay: 15, thang: 7, ghi: "Nhiều nhà cúng từ mùng 10 đến 15" },
  yNghia: "Rằm tháng Bảy có hai lớp: Vu lan báo hiếu của Phật giáo và lễ cúng gia tiên, cúng chúng sinh (cô hồn) của dân gian. Phan Kế Bính ghi đây là dịp hay đốt mã nhất và ông phê là tốn tiền.",
  tucLe: [
    { t: "Rằm tháng bảy gọi là Tết Trung-Nguyên. Ta tin theo sách Phật, thường cho hôm ấy là ngày vong nhân xá tội, nghĩa là người dưới âm phủ được tha tội một ngày hôm ấy. Bởi vậy nhiều nhà mua vàng mã cúng gia tiên, các nhà có người mới mất, cũng hay đốt mã làm chay về hôm ấy.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Mã tháng bảy, thức này thức khác, đốt mã, vàng hương cho nhiều chẳng qua chỉ tổ tốn tiền.", m: "Tứ thời tiết lạp (lời bàn của tác giả)", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Trong nhà, cúng gia tiên: hương hoa, trà rượu, cỗ chay hoặc mặn tùy nhà", "Ngoài sân, cúng chúng sinh (tùy nhà): cháo loãng, bỏng, khoai, bánh kẹo, gạo muối, nước", "Vàng mã: nên ít hoặc bỏ; Phật giáo khuyến khích bỏ"],
  trinhTu: ["Ban ngày cúng gia tiên trong nhà, thắp hương, đọc bài khấn.", "Chiều tối bày lễ chúng sinh ngoài sân hoặc trước cửa (tùy nhà).", "Khấn mời chúng sinh, rải gạo muối sau khi cúng.", "Lên chùa dự lễ Vu lan nếu nhà theo Phật."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], rằm tháng Bảy.
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ], cùng các vong linh trong họ không nơi thờ cúng.
Nhân tiết Trung nguyên, ngày con cháu nhớ ơn cha mẹ tổ tiên, chúng con thành tâm sửa biện lễ vật: hương hoa, trà quả, cơm canh, kính dâng trước án.
Cúi xin gia tiên về hưởng lễ, chứng cho lòng hiếu của con cháu, tha cho những điều con cháu còn thiếu sót.
Kính mong gia tiên phù hộ cho cả nhà bình an, cha mẹ còn sống được khỏe mạnh sống lâu, con cháu biết ơn, biết thương nhau.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "308", y: "Hạn chế đốt vàng mã. Công văn 2018 của Giáo hội Phật giáo Việt Nam về bỏ đốt vàng mã mới thấy qua báo chí, bản gốc chưa mở [U]." }],
  diBan: [{ nd: "Phan Kế Bính ghi hai kỳ đốt mã cho người mới mất 'hay đốt về tuần trung nguyên tháng bảy' (mục Tang ma). Lễ cúng chúng sinh ngoài sân ông không chép riêng; bài khấn chúng sinh kho không soạn vì chưa có nguồn khung.", nguon: "Tang ma; cúng chúng sinh: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "trung-thu", nhom: "quanh-nam", ten: "Trung thu", tenKhac: "Rằm tháng Tám, Tết trông trăng",
  thoiDiem: { loai: "am", ngay: 15, thang: 8 },
  yNghia: "Tết của trẻ con, nhưng ban ngày vẫn có cỗ cúng gia tiên, tối bày cỗ trông trăng. Lễ nhẹ, nặng về vui.",
  tucLe: [
    { t: "Rằm tháng 8 là Tết Trung Thu. Tết này ta thường gọi là Tết trẻ con, nhưng có nhà tổn phí nhiều lắm.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Ba ngày làm cỗ cúng gia-tiên, tối đến bày cỗ thưởng nguyệt. Đầu cỗ là bánh mặt trăng, và dùng nhiều thứ bánh trái hoa quả, nhuộm các màu các sắc, sặc sỡ, xanh, đỏ, trắng, vàng.", m: "Tứ thời tiết lạp (bản Wikisource chép 'Ba ngày', có lẽ là 'Ban ngày')", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Bánh nướng, bánh dẻo", "Hoa quả mùa thu: bưởi, hồng, na, cốm (tùy nhà, tùy vùng)", "Hương hoa, trà, nước"],
  trinhTu: ["Ban ngày bày lễ, thắp hương, đọc bài khấn ngắn.", "Hạ lễ, để lại bánh và quả cho cỗ tối.", "Tối bày cỗ trông trăng cho trẻ.", "Phá cỗ khi trăng lên."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], rằm tháng Tám.
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Nhân tết Trung thu, trăng tròn giữa mùa thu, chúng con thành tâm sửa biện lễ vật: hương hoa, trà quả, bánh nướng bánh dẻo, kính dâng trước án.
Cúi xin gia tiên về hưởng lễ, chứng cho lòng thành của con cháu.
Kính mong gia tiên phù hộ cho các cháu nhỏ trong nhà hay ăn chóng lớn, học hành chăm ngoan; cả nhà mạnh khỏe, êm ấm như trăng rằm.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Phan Kế Bính kể các tích treo đèn, rước đèn, hát trống quân và tự nhận xét 'lời ấy huyền hoặc lắm, vị tất đã thật'.", nguon: "Tứ thời tiết lạp" }],
  viec: "te-le" },

{ ma: "ram-thang-muoi", nhom: "quanh-nam", ten: "Rằm tháng Mười, Tết cơm mới", tenKhac: "Tết Trùng thập (mùng 10 tháng 10), Hạ nguyên",
  thoiDiem: { loai: "am", ngay: 15, thang: 10, ghi: "Rằm 15/10 ở nhiều nhà; Phan Kế Bính chép mùng 10/10 (Trùng thập); vùng Thanh Trì xưa ăn 21/10" },
  yNghia: "Mùa gặt xong, có gạo mới, cúng gia tiên và nhớ công người làm ruộng. Ngày cụ thể khác nhau theo vùng; đều là một ý: tạ ơn mùa màng.",
  tucLe: [
    { t: "Mồng mười tháng 10 là tết trùng thập. Tết ấy phần nhiều là các nhà đồng cốt và nhà thầy thuốc mới ăn thôi. Nhưng về nhà quê cũng nhiều nơi ăn, có nơi ăn to lắm, như ở về vùng phủ Hoài thì làm bánh dầy, nấu chè kho, trước cúng thần, cúng gia-tiên, rồi đem biếu những người quen thuộc.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Ở về vùng Thanh-Trì thì lại ăn Tết Trùng thập về ngày 21 tháng 10. Đại để nhà quê là vì việc gặt hái đã xong, nhớ đến công tiên-nông mà cúng tế, và an ủi cho sự khó nhọc một ngày.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Còn phần nhiều thì cúng gia tiên mà thôi.", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  leVat: ["Cơm gạo mới, xôi, bánh dầy hoặc chè kho (tùy vùng)", "Hương hoa, trầu rượu, nước", "Hoa quả"],
  trinhTu: ["Nấu cơm gạo mới hoặc xôi.", "Lau bàn thờ, thay nước.", "Bày lễ, thắp hương, đọc bài khấn.", "Hạ lễ, cả nhà ăn cơm mới; biếu hàng xóm nếu có lệ."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày], tháng Mười.
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Mùa gặt đã xong, nhà có gạo mới. Nhớ ơn trời đất cho mùa, ơn tổ tiên để lại ruộng vườn nghề nghiệp, chúng con thành tâm sửa biện lễ vật: hương hoa, trà rượu, cơm gạo mới, xôi bánh, kính dâng trước án.
Cúi xin các vị thần linh và gia tiên về hưởng lễ, chứng cho lòng thành của con cháu.
Kính mong năm tới mưa thuận gió hòa, việc làm ăn của cả nhà được mùa, người người đủ ăn đủ mặc, trong nhà êm ấm.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Ba ngày khác nhau có nguồn: mùng 10/10 (phủ Hoài, nhà đồng cốt và thầy thuốc), 21/10 (Thanh Trì) theo Phan Kế Bính; rằm 15/10 là ngày nhiều nhà nay cúng, chưa có nguồn thành văn cổ.", nguon: "Tứ thời tiết lạp; 15/10: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "mung-1-ram", nhom: "quanh-nam", ten: "Mùng 1 và rằm hằng tháng", tenKhac: "Lễ sóc vọng",
  thoiDiem: { loai: "hang-thang", moc: [1, 15], ghi: "Mùng 1 (sóc) và 15 (vọng) mỗi tháng âm; nhiều nhà cúng chiều hôm trước" },
  yNghia: "Hai ngày thắp hương đều đặn trong tháng. Lễ rất nhẹ: hương, hoa, nước, trầu rượu là đủ. Phan Kế Bính nói rõ: cúng là để tỏ lòng thành, không phải để nuôi tổ tiên, nên cách nào ngụ được lòng ấy cũng đủ.",
  tucLe: [
    { t: "Mỗi tháng ngày sóc (mồng một), ngày vọng (hôm rằm), dân làng biện lễ oản chuốỉ, trầu rượu, đem tại miếu hoặc tại đình để lễ thần.", m: "Việc tế tự (lễ của làng; bản Wikisource chép 'chuốỉ')", f: "vnpt-ii02-viec-te-tu" },
    { t: "Mỗi tuần tiết, hoặc ngày kị đều có làm lễ Cáo Gia-tiên (hoặc mùa có của mới, gạo mới, hoặc khi có việc hiếu hỉ). Lễ tùy việc to việc nhỏ, nhà kiệm nhà phong, hoặc dùng bò lợn dê gà, hoặc làm vài mâm cỗ, hoặc dùng đồ hoa quả bánh trái, hoặc thủ lợn mâm xôi, hoặc bát cơm cái trứng, con cá bát canh, tùy thế nào cho tiện thì thôi. Nhưng thế nào cũng phải có cơi trầu, bát nước trong, một hồ rượu mới là thành lễ. Đốt đèn đốt hương, tùy việc mà khấn vái gia tiên.", m: "Phụng sự tổ tôn", f: "vnpt-i04-phung-su-to-ton" },
    { t: "Nhưng cũng nên biết rằng sự cúng cấp là để tỏ cái lòng thành kính, chứ không phải để mà phụng dưỡng tổ-tiên, thì dùng cách nào cho ngụ được cái lòng ấy cũng đủ.", m: "Phụng sự tổ tôn (lời bàn của tác giả)", f: "vnpt-i04-phung-su-to-ton" }
  ],
  leVat: ["Hương, hoa tươi, nước sạch", "Trầu cau, rượu (theo Phan Kế Bính: cơi trầu, bát nước, hồ rượu là thành lễ)", "Hoa quả, bánh kẹo (tùy nhà)"],
  trinhTu: ["Lau bàn thờ, thay nước, cắm hoa.", "Bày trầu cau, hoa quả.", "Thắp hương, khấn ngắn.", "Hương tàn thì hạ lễ."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Nhân ngày sóc vọng đầu tháng, giữa tháng, chúng con thành tâm sửa biện lễ vật: hương hoa, nước sạch, trầu rượu, hoa quả, kính dâng trước án.
Cúi xin các vị thần linh và gia tiên về hưởng lễ, chứng cho lòng thành của con cháu.
Kính mong trong tháng này cả nhà được bình an, công việc thuận lợi, ra đường gặp lành, về nhà yên vui; điều gì chưa phải xin được nhắc nhở để sửa.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Phan Kế Bính chép lễ sóc vọng của làng ở đình miếu; lễ nhà ông gộp trong 'cúng vái gia tiên mỗi tuần tiết'. Cúng chiều hôm trước (30 và 14) là tục đang lưu hành, chưa có nguồn thành văn.", nguon: "Việc tế tự; Phụng sự tổ tôn; phần sau: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "than-tai", nhom: "quanh-nam", ten: "Thần Tài", tenKhac: "Vía Thần Tài mùng 10 tháng Giêng; cúng Thần Tài, Thổ Địa hằng ngày của nhà buôn",
  thoiDiem: { loai: "am", ngay: 10, thang: 1, ghi: "Mùng 10 tháng Giêng; nhà buôn thắp hương sáng hằng ngày" },
  yNghia: "Lễ của nhà buôn bán, cầu buôn may bán đắt. Bàn thờ Thần Tài, Thổ Địa đặt dưới đất gần cửa. Đây là lớp tục mới hơn các lễ khác trong kho.",
  tucLe: [
    { t: "Nhà phú quí có gia-từ, phụng thờ cao, tằng, tổ, khảo tại chính ban giữa, còn đôi bên ban cạnh nhà, thì thờ Thổ-công, Táo quân, Nghệ-sư; nhà thì thờ Bà-Cô, Ông-Mãnh v.v...", m: "Phụng sự tổ tôn (danh sách thần thờ trong nhà năm 1915, không có Thần Tài)", f: "vnpt-i04-phung-su-to-ton" }
  ],
  ghiTucLe: "Phan Kế Bính không chép lễ này. Danh sách các vị thờ trong nhà ông kể năm 1915 không có Thần Tài; ngày vía mùng 10 tháng Giêng kho chưa tìm được nguồn thành văn về gốc tích. Phần dưới kho tự soạn [I].",
  leVat: ["Hương, hoa, nước, đèn", "Hoa quả, bánh kẹo; nhà buôn hay dâng thêm thịt quay, trứng, tôm, cua (tùy vùng, tùy nhà)", "Mua vàng ngày vía là tục thương mại gần đây, không bắt buộc"],
  trinhTu: ["Lau bàn thờ Thần Tài, Thổ Địa, thay nước.", "Bày lễ, thắp hương, đọc bài khấn.", "Mở cửa hàng, bán món đầu ngày.", "Hạ lễ; đồ ăn cả nhà dùng."],
  doiTuong: "Thần Tài",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], ngụ tại và buôn bán tại [địa chỉ].
Kính cáo Thần Tài, Thổ Địa và các vị thần coi giữ cửa hàng, nhà đất này.
Nhân ngày vía Thần Tài, chúng con thành tâm sửa biện lễ vật: hương hoa, trà quả, bánh trái, kính dâng trước án.
Cúi xin Thần Tài, Thổ Địa nhận lễ, chứng cho lòng thành của gia đình con.
Kính mong các vị phù hộ cho cửa hàng buôn may bán đắt, khách đến đông, hàng ra đều, tiền vào đúng cách; người làm trong nhà khỏe mạnh, giữ được chữ tín, không tham của trái, làm ăn lâu bền.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Chưa có nguồn. Kho không viết về khác biệt Bắc Nam của lễ này vì chưa tra được nghiên cứu.", nguon: "chưa có nguồn" }],
  viec: "an-than" }
);
