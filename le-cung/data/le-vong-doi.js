// Lễ cúng — nhóm 2: Lễ vòng đời (8 lễ).
// tucLe: trích nguyên văn Phan Kế Bính, Việt Nam phong tục (1915), đối chiếu được trong nguon/vnpt-*.txt.
// vanKhan: bản soạn của kho theo khung 6 phần (data/khung.js), không phải bản cổ. Phần không có nguồn mang nhãn [I].
window.LC_LE = window.LC_LE || { le: [] };
window.LC_LE.le.push(
{ ma: "day-thang-thoi-noi", nhom: "vong-doi", ten: "Đầy tháng, thôi nôi", tenKhac: "Cúng Mụ",
  thoiDiem: { loai: "sau-sinh", moc: [{ ten: "Đầy tháng", ngay: 30 }, { ten: "Thôi nôi", nam: 1 }], ghi: "Đầy tháng: tròn một tháng tuổi; thôi nôi: tròn một năm (theo ngày sinh âm hoặc dương tùy nhà). Tục 'gái lùi hai, trai lùi một' chưa có nguồn" },
  yNghia: "Mừng em bé qua tháng đầu, rồi qua năm đầu, khỏe mạnh. Dân gian cúng 'Mụ' (các bà đỡ đầu cho trẻ) và báo với gia tiên có thêm người. Lễ vui, nhẹ.",
  tucLe: [
    { t: "Tục ta không mấy người ăn mừng sinh nhựt, nhưng nhà đại-gia cũng có ăn mừng.", m: "Sinh nhật (nói về sinh nhật cha mẹ, không phải trẻ nhỏ)", f: "vnpt-i07-sinh-nhat" }
  ],
  ghiTucLe: "Phan Kế Bính không chép lễ đầy tháng, thôi nôi; ông chỉ bàn sinh nhật của cha mẹ và tục cầu tự. Phần dưới kho tự soạn [I]; tục 12 bà Mụ, chọn đồ cho bé bốc chưa có nguồn thành văn.",
  leVat: ["Hương hoa, trầu rượu, nước, trà", "Xôi, chè (nhiều nơi 12 phần nhỏ và 1 phần lớn — tùy vùng, chưa có nguồn)", "Gà luộc hoặc hoa quả (tùy nhà)", "Thôi nôi: mâm đồ cho bé bốc (sách, bút, tiền…) — tùy nhà"],
  trinhTu: ["Chọn ngày: đúng tháng, đúng năm theo ngày sinh; làm sớm một hai ngày cũng được.", "Bày lễ ở bàn thờ gia tiên (và bàn riêng giữa nhà nếu nhà có lệ cúng Mụ).", "Thắp hương, bế bé ra, đọc bài khấn.", "Hạ lễ, người lớn chúc bé, cả nhà ăn.", "Thôi nôi: để bé bốc đồ cho vui, không đoán định gì."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ]; kính lạy các bà Mụ đỡ đầu cho trẻ.
Cháu [tên bé] sinh ngày [ngày sinh], nay tròn [đầy tháng / một tuổi], ăn ngủ bình thường, lớn lên từng ngày. Nhân ngày này, chúng con thành tâm sửa biện lễ vật: hương hoa, trà rượu, xôi chè, hoa quả, kính dâng trước án.
Cúi xin các vị thần linh, gia tiên và các bà Mụ nhận lễ, chứng cho lòng thành của gia đình.
Kính mong các vị che chở cho cháu hay ăn chóng lớn, ít ốm đau, mắt sáng tai thính, lớn lên hiền lành, hiếu thảo; cha mẹ cháu đủ sức mà nuôi dạy.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Chưa có nguồn. Cách tính 'gái lùi hai, trai lùi một' và số bà Mụ kho không khẳng định.", nguon: "chưa có nguồn" }],
  viec: "tiec-tung" },

{ ma: "dam-ngo", nhom: "vong-doi", ten: "Dạm ngõ", tenKhac: "Giạm hỏi, chạm ngõ",
  thoiDiem: { loai: "tuy", ghi: "Chọn ngày hai nhà cùng tiện; không nhất thiết ngày tốt" },
  yNghia: "Hai nhà gặp nhau lần đầu một cách chính thức, nhà trai mang trầu cau sang thưa chuyện. Lễ nhỏ, mở đầu cho ăn hỏi và cưới.",
  tucLe: [
    { t: "Trước hết kén chọn chỗ nào môn đăng hộ đối, xem đôi tuổi không xung khắc nhau, mới mượn mối lái. Mối lái nói với cha mẹ người con gái bằng lòng gả rồi, nhà trai mới đem cau đem trà đến giạm.", m: "Giá thú", f: "vnpt-i13-gia-thu" },
    { t: "Tục cưới của ta, cũng là noi theo tục Tàu. Tàu có sáu lễ: nạp thái, vấn danh, nạp cát, nạp tệ, thỉnh kỳ, thân-nghênh.", m: "Giá thú", f: "vnpt-i13-gia-thu" }
  ],
  leVat: ["Trầu cau, trà, rượu (theo Phan Kế Bính: 'đem cau đem trà đến giạm')", "Bánh hoặc hoa quả (tùy nhà)"],
  trinhTu: ["Hai nhà hẹn ngày giờ.", "Nhà trai (cha mẹ, chú rể, vài người thân) sang, mang trầu cau.", "Nhà gái nhận lễ, đặt lên bàn thờ, thắp hương báo gia tiên (chủ nhà gái khấn).", "Hai nhà nói chuyện về ăn hỏi, cưới."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], chủ nhà, ngụ tại [địa chỉ].
Kính lạy gia tiên nội ngoại họ [họ].
Hôm nay nhà trai, họ [họ nhà trai], đem trầu cau sang thưa chuyện cho con cháu hai nhà là [tên con gái] và [tên con trai]. Hai nhà đã gặp nhau, ưng thuận bước đầu.
Chúng con thành tâm sửa biện lễ vật: hương hoa, trầu cau nhà trai mang sang, trà rượu, kính dâng trước án để kính cáo gia tiên.
Cúi xin gia tiên chứng cho việc tốt của con cháu, nhận lễ.
Kính mong gia tiên phù hộ cho đôi trẻ hiểu nhau, hai nhà hòa thuận, các bước sau được trôi chảy, nên vợ nên chồng, ở với nhau lâu bền.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "04", y: "Việc cưới tổ chức 'không phô trương, không nặng lễ vật'." }],
  diBan: [{ nd: "Phan Kế Bính kể thêm lệ 'sêu' (nhà trai mang quà mùa sang nhà gái nhiều mùa trước khi cưới) và lệ nhà trai đưa lễ ngày mùng 5, Tết, giỗ nhà gái; nay hầu như không còn.", nguon: "Giá thú" }],
  viec: "dam-hoi" },

{ ma: "an-hoi", nhom: "vong-doi", ten: "Ăn hỏi", tenKhac: "Lễ đính hôn, nạp tệ",
  thoiDiem: { loai: "tuy", ghi: "Chọn ngày tốt theo hai nhà; thường trước cưới vài tuần đến vài tháng" },
  yNghia: "Nhà trai mang lễ sang nhà gái, nhà gái dâng lên gia tiên, hai bên coi là đã đính ước. Phan Kế Bính phê tục thách cưới nặng và nhắc lễ 'giản tiện' chỉ cần cau, trà, mứt.",
  tucLe: [
    { t: "Cách ít lâu thì làm lễ ăn hỏi: nhà trai đem cau trà, lợn xôi đến nhà gái lễ gia tiên, có nhà dùng cách giản-tiện thì chỉ dùng cau, trà, mứt mà thôi.", m: "Giá thú", f: "vnpt-i13-gia-thu" },
    { t: "Ba là tục thách cưới. Vợ chồng lấy nhau là một nghĩa vụ, trai phải có vợ, gái phải có chồng, đôi bên đều có tư ích lẫn cho nhau, chớ không phải lợi riêng cho bên nào cả.", m: "Giá thú (lời bàn của tác giả)", f: "vnpt-i13-gia-thu" }
  ],
  leVat: ["Trầu cau, trà, rượu, bánh (bánh cốm, bánh phu thê…), hoa quả — số tráp tùy nhà, tùy vùng", "Xôi gà hoặc lợn quay (tùy nhà)", "Tiền dẫn cưới nếu hai nhà thỏa thuận; không nên nặng"],
  trinhTu: ["Nhà trai đến giờ hẹn, đội tráp lễ vào.", "Hai nhà chào hỏi, nhà trai xin dâng lễ.", "Nhà gái nhận lễ, đặt lên bàn thờ, chủ nhà gái thắp hương đọc bài khấn, cô dâu chú rể vào lễ.", "Hai nhà bàn ngày cưới; nhà gái chia lại một phần lễ ('lại quả')."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], chủ nhà, ngụ tại [địa chỉ].
Kính lạy gia tiên nội ngoại họ [họ].
Hôm nay nhà trai họ [họ nhà trai] đem lễ ăn hỏi sang xin cho [tên con trai] được kết duyên với con cháu nhà ta là [tên con gái]. Hai nhà đã thuận.
Chúng con thành tâm sửa biện lễ vật: hương hoa, trầu cau, trà rượu, bánh trái của nhà trai, kính dâng trước án để kính cáo gia tiên và xin nhận lời đính ước.
Cúi xin gia tiên chứng cho đôi trẻ, nhận lễ, cho việc hôn nhân này được tốt lành.
Kính mong gia tiên phù hộ cho hai cháu nên duyên bền chặt, hai nhà thành thông gia hòa thuận, lễ cưới sắp tới mọi việc trôi chảy.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "04", y: "Việc cưới 'không phô trương, không nặng lễ vật'; thách cưới nặng trái tinh thần này." }],
  diBan: [{ nd: "Ở Quảng-Nam thì trong lễ ăn hỏi thường lại thêm một đôi hoa tai vàng nữa.", nguon: "Giá thú (nguyên văn Phan Kế Bính)", f: "vnpt-i13-gia-thu", trich: true }],
  viec: "dam-hoi" },

{ ma: "le-cuoi", nhom: "vong-doi", ten: "Lễ cưới và lễ gia tiên", tenKhac: "Rước dâu, lễ tơ hồng, lại mặt",
  thoiDiem: { loai: "tuy", ghi: "Chọn ngày giờ tốt cho việc cưới gả; giờ xuất phát rước dâu hay chọn giờ hoàng đạo" },
  yNghia: "Ngày hai người thành vợ chồng trước gia tiên hai họ. Có ba lần lễ gia tiên: ở nhà gái khi nhà trai đến, ở nhà trai khi dâu về, và lễ lại mặt sau cưới. Xưa còn tế tơ hồng ở sân.",
  tucLe: [
    { t: "Khi đến nhà vợ, dàn bày đồ lễ, người chủ hôn nhà gái khấn lễ gia tiên rồi thì người rể vào lễ.", m: "Giá thú", f: "vnpt-i13-gia-thu" },
    { t: "Bày hương án ra sân, dùng lễ gà, xôi, trầu, rượu, tế tơ hồng, rồi hai vợ chồng đều vào lễ.", m: "Giá thú", f: "vnpt-i13-gia-thu" },
    { t: "Đến nhà trai rồi thì một vài bà già dẫn cô dâu vào lạy gia tiên, rồi đưa đi lễ nhà thờ đôi bên bố chồng mẹ chồng. Đoạn trở về mới lạy cha mẹ chồng, hoặc còn ông bà chồng cũng lạy.", m: "Giá thú", f: "vnpt-i13-gia-thu" },
    { t: "Cưới được ba hôm, đến hôm thứ tư thì hai vợ chồng làm lễ chè xôi đem về nhà vợ lạy gia tiên, gọi là lễ lại mặt, chữ gọi là tứ hỉ.", m: "Giá thú", f: "vnpt-i13-gia-thu" },
    { t: "Lúc đi, phải chọn giờ hoàng đạo mới đi, và phải có một người đàn ông dễ tính ra đón ngõ trước", m: "Giá thú", f: "vnpt-i13-gia-thu" }
  ],
  leVat: ["Nhà gái: hương hoa, trầu rượu; lễ nhà trai mang sang (trầu cau, rượu, bánh, xôi gà hoặc lợn quay — tùy nhà)", "Nhà trai: hương hoa, trầu rượu, mâm cơm hoặc xôi gà dâng gia tiên khi dâu về", "Lại mặt: xôi chè, trầu rượu (theo Phan Kế Bính: 'lễ chè xôi')"],
  trinhTu: ["Nhà trai đến nhà gái đúng giờ, dâng lễ.", "Chủ hôn nhà gái thắp hương, đọc bài khấn; chú rể rồi cô dâu lễ gia tiên nhà gái.", "Rước dâu về; chủ hôn nhà trai thắp hương, cô dâu chú rể lễ gia tiên nhà trai.", "Cô dâu chú rể lạy chào ông bà cha mẹ chồng.", "Tiệc mừng vừa sức.", "Sau cưới (xưa: ngày thứ tư) hai vợ chồng về nhà gái lễ lại mặt."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], chủ hôn, ngụ tại [địa chỉ].
Kính lạy gia tiên nội ngoại họ [họ].
Hôm nay là ngày cưới của con cháu trong nhà là [tên con trai] và [tên con gái]. Hai họ đã thuận, lễ nghĩa đã đủ, giờ lành đã đến.
Chúng con thành tâm sửa biện lễ vật: hương hoa, trầu cau, trà rượu, xôi gà, bánh trái, kính dâng trước án, kính cáo gia tiên và xin cho đôi trẻ được vào lễ ra mắt tổ tiên.
Cúi xin gia tiên chứng cho ngày vui, nhận lễ, nhận thêm người mới vào nhà.
Kính mong gia tiên phù hộ cho hai cháu thuận vợ thuận chồng, thương nhau lúc khỏe lúc đau, ăn ở hiếu thảo với hai bên cha mẹ, sinh con cháu ngoan, giữ được nếp nhà.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "308", y: "Việc cưới theo nếp sống văn minh: lành mạnh, tiết kiệm." }, { vb: "04", y: "'Không phô trương, không nặng lễ vật'; đăng ký kết hôn theo pháp luật là điều kiện của hôn nhân, lễ gia tiên không thay được." }],
  diBan: [
    { nd: "Nhà quê xưa đón dâu ban đêm, thành phố đón ban ngày.", nguon: "Giá thú" },
    { nd: "Lễ tơ hồng ngoài sân và lễ hợp cẩn (chia trầu, uống chung chén rượu) Phan Kế Bính ghi 'nhà đại gia mới dùng đến'; nay ít nhà làm.", nguon: "Giá thú" },
    { nd: "Việc trình diện họ hàng, trao nhẫn, đọc lời thề là lớp mới, chưa có nguồn thành văn cổ.", nguon: "chưa có nguồn" }
  ],
  viec: "cuoi-ga" },

{ ma: "nhap-trach", nhom: "vong-doi", ten: "Nhập trạch", tenKhac: "Về nhà mới, tân gia",
  thoiDiem: { loai: "tuy", ghi: "Chọn ngày giờ tốt cho việc về nhà mới; tránh năm xung tuổi chủ nhà theo lệ xưa" },
  yNghia: "Ngày dọn vào ở nhà mới: báo với thần đất nơi mới, rước bàn thờ gia tiên sang, nổi lửa bếp. Phan Kế Bính chép việc chọn năm, hướng, ngày giờ khi làm nhà và việc ăn mừng làm nhà 'tùy ý chủ nhà'.",
  tucLe: [
    { t: "Cách làm nhà ở của ta, tất phải xem năm nào có được tuổi mới dám làm. Lúc làm nhà, lại xem hướng nào thuận thì làm ngảnh về hướng ấy. Ngày nào phạt mộc, giờ nào dựng nhà, đều phải xem chọn kỹ càng.", m: "Cư sở", f: "vnpt-iii38-cu-so" },
    { t: "duy có việc cưới xin và việc làm nhà thì ăn mừng riêng ở nhà và tùy ý chủ nhà, có thì làm chẳng có thì thôi cũng được.", m: "Việc hỉ", f: "vnpt-ii25-viec-hi" },
    { t: "Nhà nào cũng để riêng ba gian giữa làm bàn thờ, còn gian bên thì che kín làm buồng ngủ", m: "Cư sở", f: "vnpt-iii38-cu-so" }
  ],
  ghiTucLe: "Phan Kế Bính không chép lễ nhập trạch riêng; ông ghi việc chọn năm tuổi, hướng, ngày giờ khi làm nhà và tiệc mừng làm nhà. Trình tự dưới đây kho tự soạn [I].",
  leVat: ["Hương hoa, trầu rượu, nước, trà, đèn nến", "Mâm cơm hoặc xôi gà, hoa quả (tùy nhà)", "Bếp, gạo, muối, nước mang vào trước (tùy nhà)"],
  trinhTu: ["Chọn ngày giờ, dọn nhà sạch.", "Chủ nhà bước vào trước, mang bếp (hoặc bật bếp), gạo, muối, nước.", "Đặt bàn thờ, bày lễ, thắp hương, đọc bài khấn trình thần đất và rước gia tiên về nhà mới.", "Nổi lửa đun nước, nấu bữa đầu.", "Hạ lễ, cả nhà ăn bữa đầu ở nhà mới; mừng tân gia tùy sức."],
  doiTuong: "Thổ công",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], cùng gia đình từ nay ngụ tại [địa chỉ].
Kính cáo Thổ công, Táo quân, Long mạch và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Gia đình con mới làm xong (hoặc mới nhận) ngôi nhà này, hôm nay chọn được ngày lành dọn về ở. Chúng con thành tâm sửa biện lễ vật: hương hoa, trầu rượu, trà quả, cơm canh, kính dâng trước án.
Cúi xin các vị thần coi sóc đất này nhận lễ, cho gia đình con được vào ở, được lập bàn thờ, nổi lửa, yên ổn làm ăn trên đất này.
Cúi xin gia tiên theo con cháu về nhà mới, ngự trên bàn thờ, chứng cho lòng thành.
Kính mong các vị phù hộ cho nhà mới yên vui, người khỏe mạnh, việc làm thuận lợi, láng giềng tử tế, của vào đúng cách.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Thứ tự mang bếp, gạo, muối vào trước và lệ chủ nhà bước vào trước là tục đang lưu hành, chưa có nguồn thành văn.", nguon: "chưa có nguồn" }],
  viec: "nhap-trach" },

{ ma: "dong-tho", nhom: "vong-doi", ten: "Động thổ", tenKhac: "Khởi công, cúng đất trước khi đào móng",
  thoiDiem: { loai: "tuy", ghi: "Chọn ngày giờ tốt cho việc động thổ; Phan Kế Bính dặn làm nhà kỵ tuổi Kim lâu" },
  yNghia: "Trước khi đào đất xây nhà, xin phép thần đất nơi ấy. Đây là lễ cúng thần đất, không phải cúng gia tiên; làm ngay tại nền đất.",
  tucLe: [
    { t: "Từ ngày mồng hai Tết trở đi, người thì chọn ngày xuất hành, người thì hái cành hoa về cài vào cửa, gọi là đi hái lộc, người làm quan thì chọn ngày khai ấn, học trò thì chọn ngày khai bút, nhà buôn bán thì chọn ngày mở cửa hàng, nhà quê thì chọn ngày làm lễ động thổ. Trăm công nghìn việc lại bắt đầu từ đó.", m: "Tứ thời tiết lạp (động thổ đầu năm của nhà nông)", f: "vnpt-i12-tu-thoi-tiet-lap" },
    { t: "Làm nhà nên tìm ngày Thiên-ân, Thiên-hỉ, kỵ ngày Thiên-hỏa, địa hỏa và tuổi Kim-lâu.", m: "Xem ngày kén giờ", f: "vnpt-iii31-xem-ngay-ken-gio" },
    { t: "chẳng qua việc thành hay bại cốt do ở người, chớ có quan hệ gì ngày tốt, ngày xấu.", m: "Xem ngày kén giờ (lời bàn của tác giả)", f: "vnpt-iii31-xem-ngay-ken-gio" }
  ],
  ghiTucLe: "Phan Kế Bính chép 'lễ động thổ' là lễ đầu năm của nhà nông và cách chọn ngày làm nhà; lễ động thổ khởi công xây dựng như hiện nay ông không chép riêng. Trình tự dưới đây kho tự soạn [I].",
  leVat: ["Hương hoa, trầu rượu, nước, trà, đèn nến", "Xôi gà hoặc hoa quả, bánh kẹo (tùy nhà)", "Gạo, muối (tùy nhà)"],
  trinhTu: ["Chọn ngày giờ; chủ nhà đứng lễ (nếu chủ nhà xung tuổi theo lệ nhà thì mượn người đứng lễ).", "Bày lễ trên bàn nhỏ giữa nền đất.", "Thắp hương, đọc bài khấn.", "Hương cháy quá nửa, chủ nhà cuốc vài nhát tượng trưng.", "Hạ lễ, rải gạo muối, bắt đầu thi công."],
  doiTuong: "Thổ công",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], ngụ tại [địa chỉ], là chủ khu đất tại [địa chỉ công trình].
Kính cáo Thổ công, Thổ địa, Long mạch và các vị thần coi giữ khu đất này.
Gia đình con định xây dựng trên khu đất này, hôm nay chọn được ngày lành để động thổ. Chúng con thành tâm sửa biện lễ vật: hương hoa, trầu rượu, trà quả, xôi gà, kính dâng trước án.
Cúi xin các vị thần coi giữ đất nhận lễ, cho phép gia đình con được đào móng, dựng nhà trên đất này.
Kính mong các vị che chở cho thợ thuyền làm việc được an toàn, không tai nạn; công trình xong đúng kỳ, chắc chắn; về sau gia đình ở được yên, ăn nên làm ra.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Việc mượn người khác tuổi đứng lễ khi chủ nhà 'không được tuổi' là tục lưu hành từ ý 'xem năm nào có được tuổi mới dám làm' (Cư sở), nhưng cách mượn tuổi chưa có nguồn thành văn.", nguon: "Cư sở; cách mượn tuổi: chưa có nguồn" }],
  viec: "dong-tho" },

{ ma: "khai-truong", nhom: "vong-doi", ten: "Khai trương", tenKhac: "Mở hàng, mở cửa hàng đầu năm",
  thoiDiem: { loai: "tuy", ghi: "Chọn ngày giờ tốt cho việc khai trương; đầu năm chọn ngày mở hàng" },
  yNghia: "Ngày mở cửa hàng mới, hoặc ngày đầu năm mở hàng lại. Khấn thần đất nơi buôn bán và Thần Tài, mong khách đến. Phan Kế Bính xếp khai trương vào các việc hay xem ngày và nhắc: thành bại cốt ở người.",
  tucLe: [
    { t: "Việc cưới xin, việc làm cửa làm nhà, việc vui mừng khai hạ, việc xuất hành đi xa, việc khai trương cửa hàng cửa hiệu, việc gieo mạ cấy lúa, việc tế tự, việc thương biểu, việc nhập học, việc xuất quân, việc an táng v.v... việc gì thường cũng phải xem ngày kén giờ.", m: "Xem ngày kén giờ", f: "vnpt-iii31-xem-ngay-ken-gio" },
    { t: "nhà buôn bán thì chọn ngày mở cửa hàng", m: "Tứ thời tiết lạp", f: "vnpt-i12-tu-thoi-tiet-lap" }
  ],
  ghiTucLe: "Phan Kế Bính chỉ ghi việc chọn ngày mở cửa hàng, không chép lễ vật hay cách cúng. Phần dưới kho tự soạn [I].",
  leVat: ["Hương hoa, trầu rượu, nước, trà, đèn nến", "Xôi gà hoặc hoa quả, bánh kẹo (tùy nhà); nhà buôn hay dâng thêm thịt quay", "Cắt băng, pháo giấy là lớp mới, không bắt buộc"],
  trinhTu: ["Dọn cửa hàng sạch, bày lễ trước cửa hoặc ở bàn thờ Thần Tài.", "Đúng giờ chọn, chủ cửa hàng thắp hương, đọc bài khấn.", "Mở cửa, bán món hàng đầu tiên (thường cho người quen dễ tính).", "Hạ lễ, chia đồ cúng cho người làm."],
  doiTuong: "Thổ công",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], ngụ tại [địa chỉ], mở cửa hàng [tên cửa hàng] tại [địa chỉ cửa hàng].
Kính cáo Thổ công, Thổ địa, Thần Tài và các vị thần coi giữ nơi này.
Hôm nay là ngày khai trương cửa hàng. Chúng con thành tâm sửa biện lễ vật: hương hoa, trầu rượu, trà quả, xôi gà, bánh trái, kính dâng trước án.
Cúi xin các vị nhận lễ, cho phép chúng con mở cửa buôn bán tại đây.
Kính mong các vị phù hộ cho cửa hàng khách đến đông, hàng ra đều, buôn bán có lời đúng cách, người làm được việc, tránh được kẻ gian, giữ được chữ tín với khách, làm ăn lâu dài.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Chưa có nguồn về lễ vật khai trương. Cúng xôi gà hay thịt quay, cắt băng là tục đang lưu hành.", nguon: "chưa có nguồn" }],
  viec: "khai-truong" },

{ ma: "mung-tho", nhom: "vong-doi", ten: "Mừng thọ", tenKhac: "Lễ thượng thọ, chúc thọ",
  thoiDiem: { loai: "tuy", ghi: "Thường nhân dịp Tết hoặc sinh nhật của cha mẹ tròn 70, 80, 90 tuổi" },
  yNghia: "Con cháu mừng cha mẹ sống lâu. Cha mẹ ngồi ghế giữa nhà, con cháu dâng rượu, dâng đào chúc thọ. Phan Kế Bính khen đây là việc hay, hơn là chỉ làm giỗ to khi cha mẹ đã mất.",
  tucLe: [
    { t: "Nhà nào có cha mẹ già đến bảy tám mươi tuổi, mà nhà phong-phú đông con cái, thì làm lễ mừng thọ cha mẹ, gọi là lễ Thượng-thọ.", m: "Thượng thọ", f: "vnpt-i06-thuong-tho" },
    { t: "Đến lúc lễ, cha hoặc mẹ ăn mặc lịch sự ngồi ghế đặt chính gian giữa cho con cái tế tự lễ bái. Con cháu mỗi người dùng chén rượu mừng thọ, hoặc là dùng quả đào, gọi là bàn đào chúc thọ", m: "Thượng thọ", f: "vnpt-i06-thuong-tho" },
    { t: "Hôm ăn mừng, trước hết làm lễ gà xôi, hoặc Tam sinh, hoặc lợn bò đem ra đình lễ thánh, gọi là bái tạ Thần Hưu, nghĩa là tạ ơn thần thánh đã phù hộ cho cha mẹ được sống lâu.", m: "Thượng thọ", f: "vnpt-i06-thuong-tho" },
    { t: "Mừng thọ và mừng sinh nhựt của cha mẹ cũng là một tiệc để tỏ cái lòng kính yêu cha mẹ là việc rất hay", m: "Sinh nhật (lời bàn của tác giả)", f: "vnpt-i07-sinh-nhat" }
  ],
  leVat: ["Trên bàn thờ gia tiên: hương hoa, trầu rượu, xôi gà hoặc hoa quả (báo gia tiên)", "Dâng cha mẹ: rượu, đào hoặc hoa quả, áo mới, bức trướng chữ Thọ (tùy nhà)", "Tiệc mừng vừa sức"],
  trinhTu: ["Chọn ngày, mời họ hàng.", "Thắp hương bàn thờ gia tiên, chủ lễ đọc bài khấn báo gia tiên.", "Cha mẹ ngồi ghế giữa nhà; con cháu theo thứ tự dâng rượu, dâng quà, chúc thọ.", "Cha mẹ nói lời dặn dò.", "Tiệc mừng."],
  doiTuong: "gia tiên",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], cùng anh chị em con cháu trong nhà, ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ].
Hôm nay con cháu sum họp mừng thọ [cha / mẹ] chúng con là [tên người được mừng], năm nay tròn [tuổi] tuổi, còn khỏe, còn minh mẫn, còn là chỗ dựa cho cả nhà.
Chúng con thành tâm sửa biện lễ vật: hương hoa, trầu rượu, trà quả, xôi gà, kính dâng trước án, kính cáo gia tiên ngày vui của gia đình.
Cúi xin gia tiên chứng giám, nhận lễ.
Kính mong gia tiên phù hộ cho [cha / mẹ] chúng con sống lâu thêm nữa, ít bệnh, ăn ngon ngủ yên, vui với con cháu; cho con cháu biết hiếu, biết kính, không để cha mẹ phải buồn.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Phan Kế Bính kể lệ đem lễ ra đình 'bái tạ Thần Hưu' và tiệc 'có nhà ăn đến năm bảy ngày'; nay thường chỉ làm trong nhà một buổi. Mốc tuổi 70, 80, 90 là quy ước hiện hành.", nguon: "Thượng thọ; mốc tuổi: chưa có nguồn" }],
  viec: "tiec-tung" }
);
