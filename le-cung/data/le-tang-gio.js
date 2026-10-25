// Lễ cúng — nhóm 3: Tang lễ và giỗ (8 lễ).
// tucLe: trích nguyên văn Phan Kế Bính, Việt Nam phong tục (1915), đối chiếu được trong nguon/vnpt-*.txt.
// vanKhan: bản soạn của kho theo khung 6 phần (data/khung.js), không phải bản cổ. Phần không có nguồn mang nhãn [I].
// Thời điểm tính từ ngày mất: kho ghi cả hai cách đếm (ngày mất là ngày thứ nhất, hoặc ngày mất + N) vì không có nguồn quy định.
window.LC_LE = window.LC_LE || { le: [] };
window.LC_LE.le.push(
{ ma: "nhap-quan-phat-tang", nhom: "tang-gio", ten: "Nhập quan và phát tang", tenKhac: "Khâm liệm, nhập quan; thành phục",
  thoiDiem: { loai: "sau-mat", ngay: 0, ghi: "Nhập quan trong ngày đầu; phát tang (thành phục) sau đó, xưa 'được vài ba hôm', nay thường cùng ngày hoặc hôm sau" },
  yNghia: "Hai việc đầu tiên sau khi người thân mất: tắm rửa, khâm liệm, đặt vào quan tài (nhập quan); rồi con cháu mặc đồ tang, chính thức báo tang (thành phục). Từ lúc này nhà có tang.",
  tucLe: [
    { t: "Khi tắt hơi rồi, lấy chiếc đũa, để ngang hàm, bỏ một vốc gạo và ba đồng tiền vào miệng.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Nhà giàu dùng vóc nhiễu tơ lụa, nhà thường dùng vải trắng, may làm đại liệm, tiểu liệm, (đại liệm một mảnh dọc, năm mảnh ngang, tiểu liệm một mảnh dọc, ba mảnh ngang) để khâm liệm, rồi thì nhập quan (bỏ vào săng).", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Được vài ba hôm, công việc lo liệu đâu đấy thì làm lễ Thành phục. Trước bàn thờ bày linh sàng linh tọa, đặt hồn bạch.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Con cháu mặc đồ tang phục, xõa tóc, theo thứ tự đứng sắp hàng ra sân mà khóc lóc. Nhà phú quí có lễ tế, nhà thường dân hay mượn thầy phù thủy cúng đỡ cho.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Con trai, con gái, con dâu, đội khăn sô, mũ chuối, mặc áo sô, ngoài quàng sợi chuối, thắt dây lưng dây bằng chạc.", m: "Tang ma", f: "vnpt-i09-tang-ma" }
  ],
  leVat: ["Bàn thờ vong: ảnh, bát hương, đèn nến, hoa, nước, bát cơm úp quả trứng, đôi đũa (tùy vùng)", "Hương, trầu rượu, hoa quả", "Khăn tang, áo tang cho con cháu"],
  trinhTu: ["Tắm rửa, thay quần áo cho người mất; gia đình báo chính quyền và làm giấy chứng tử.", "Khâm liệm, nhập quan vào giờ đã chọn (nhiều nhà chọn giờ, tránh tuổi xung; không bắt buộc).", "Lập bàn thờ vong trước linh cữu.", "Lễ thành phục: con cháu mặc tang, chủ lễ thắp hương đọc bài khấn; từ đây đón khách viếng.", "Trong lúc quàn, cúng cơm sáng chiều."],
  doiTuong: "hương hồn",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], là [quan hệ] của người mất, cùng toàn gia ngụ tại [địa chỉ].
Kính cáo hương hồn [người đã khuất], sinh năm [năm sinh], mất ngày [ngày mất], hưởng thọ [tuổi] tuổi.
Người đã rời cõi tạm. Con cháu đã tắm gội, khâm liệm, rước người vào áo quan, lập bàn thờ. Hôm nay con cháu mặc đồ tang, chính thức chịu tang người.
Chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, cơm canh, kính dâng trước linh cữu.
Cúi xin hương hồn người an lòng về nơi yên nghỉ, nhận lễ của con cháu, tha cho những điều con cháu chưa làm trọn khi người còn sống.
Kính mong người phù hộ cho con cháu vững lòng lo việc tang cho chu đáo, anh em đoàn kết, nhà cửa yên ổn.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "105", y: "Với lễ tang cán bộ, công chức, viên chức: linh cữu không để quá 48 giờ kể từ khi khâm liệm (sửa đổi 2025)." }, { vb: "308", y: "Việc tang theo nếp sống văn minh; hạn chế vàng mã." }],
  diBan: [{ nd: "Phan Kế Bính ghi thành phục 'được vài ba hôm' sau khi mất; nay vì thời gian quàn ngắn, nhiều nhà phát tang ngay ngày nhập quan. Ông cũng chép tục đặt bùa, bài tổ tôm, lịch vào quan tài và phê là tin thầy phù thủy; kho không hướng dẫn.", nguon: "Tang ma" }],
  viec: "" },

{ ma: "di-quan-an-tang", nhom: "tang-gio", ten: "Di quan và an táng", tenKhac: "Phát dẫn, đưa tang, hạ huyệt; hỏa táng",
  thoiDiem: { loai: "sau-mat", ngay: 1, ghi: "Thường ngày thứ hai hoặc thứ ba sau khi mất; chọn giờ hạ huyệt" },
  yNghia: "Đưa người mất ra nơi an nghỉ. Xưa có lễ khấn Thổ thần tại huyệt trước khi hạ. Nay nhiều nơi hỏa táng rồi đưa tro về nghĩa trang hoặc chùa; ý lễ không đổi.",
  tucLe: [
    { t: "Hôm cất ma gọi là ngày phát dẫn. Hôm ấy con cháu anh em và người quen biết đều đi đưa cả.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Lúc hạ huyệt có tế thổ thần ở nơi đó. Có ông thầy địa lý phân kim gióng hướng, đợi đến giờ tốt (giờ hoàng đạo) thì hạ huyệt.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Từ lúc ma còn để trong nhà thì con cháu và khách khứa phúng viếng chỉ lạy hai lạy, nghĩa là còn coi như người sống. Đến lúc hạ huyệt rồi thì mới lạy bốn lạy, nghĩa là đến đó thì mới lấy đạo thờ người chết mà thờ.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Trong khi đi đường có rắc vàng thỏi, vàng giấy, là tục cho rằng có quỉ phụ vào quan tài, phải rắc vàng để tống quỉ kẻo quan tài nặng khó đi.", m: "Tang ma (tục rắc vàng; nay pháp luật cấm rải tiền)", f: "vnpt-i09-tang-ma" },
    { t: "những nhà hoặc vì cớ tìm đất, hoặc vì cớ lo liệu công kia việc nọ mà quàn ma trong nhà đến hàng tháng, thì chẳng những là phiền phí hại của, mà có khi tử khí truyền nhiễm, lại hại đến cách vệ sinh nữa.", m: "Tang ma (lời bàn của tác giả)", f: "vnpt-i09-tang-ma" }
  ],
  leVat: ["Tại huyệt: hương, trầu rượu, hoa, một lễ nhỏ khấn Thổ thần (tùy nhà)", "Hoa, hương cho người đưa tiễn", "Không rải tiền thật, tiền âm phủ trên đường"],
  trinhTu: ["Lễ truy điệu hoặc lễ cáo biệt tại nhà, nhà tang lễ.", "Di quan ra xe; con cháu đi theo linh cữu.", "Tại nghĩa trang: thắp hương khấn Thổ thần nơi huyệt trước (chủ lễ đọc bài khấn).", "Đến giờ, hạ huyệt (hoặc đưa vào hỏa táng); con cháu bỏ nắm đất đầu tiên.", "Đắp mộ, đặt hương hoa; lạy bốn lạy.", "Về nhà làm lễ an vị bàn thờ vong (xưa: tế ngu)."],
  doiTuong: "Thổ thần",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], là [quan hệ] của người mất, ngụ tại [địa chỉ].
Kính cáo Thổ thần và các vị thần coi giữ khu đất này; kính cáo hương hồn [người đã khuất].
Gia đình con đưa [người đã khuất], mất ngày [ngày mất], về an táng tại đây. Chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, kính dâng trước huyệt.
Cúi xin Thổ thần nhận lễ, cho phép gia đình con được đặt người nằm xuống đất này, và từ nay che chở cho phần mộ được yên, không ai xâm phạm.
Cúi xin hương hồn người về nơi an nghỉ, yên lòng, đừng vương vấn.
Kính mong người phù hộ cho con cháu bình an, nhớ công ơn người mà sống cho phải.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "308", y: "Không rải tiền thật, tiền âm phủ, vàng mã trên đường đưa tang; khuyến khích hỏa táng, chôn cất đúng nơi quy hoạch." }, { vb: "105", y: "Lễ tang cán bộ, công chức, viên chức theo nghi thức quy định; linh cữu không quá 48 giờ." }],
  diBan: [{ nd: "Nhà quê và thành phố xưa khác nhau về nghi trượng (minh tinh, nhà táng, phường kèn); nhà quê có các vãi đi tụng kinh 'hộ phúc'. Hỏa táng là lớp mới, không có trong Phan Kế Bính.", nguon: "Tang ma; hỏa táng: chưa có nguồn cổ" }],
  viec: "an-tang" },

{ ma: "cung-com-tuan-dau", nhom: "tang-gio", ten: "Cúng cơm, lễ ba ngày và tuần đầu", tenKhac: "Chiêu tịch diện; tế ngu; mở cửa mả; cúng thất đầu",
  thoiDiem: { loai: "sau-mat", moc: [{ ten: "Lễ ba ngày (tế ngu, mở cửa mả)", ngay: 3 }, { ten: "Tuần đầu (thất đầu)", ngay: 7 }], ghi: "Cúng cơm hai bữa mỗi ngày tới 100 ngày (xưa); lễ ba ngày sau khi chôn; tuần đầu bảy ngày sau khi mất" },
  yNghia: "Những ngày đầu sau tang: mỗi bữa dâng cơm như khi người còn sống; ba ngày sau khi chôn ra thăm mộ, đắp lại mộ (xưa gọi tế ngu, nay nhiều nơi gọi mở cửa mả); bảy ngày là tuần đầu. Ý là để người mất và người sống cùng dần quen với việc chia xa.",
  tucLe: [
    { t: "Tế Thành phục rồi thì mỗi ngày buổi sớm buổi chiều cúng cơm, gọi là Chiêu tịch diện. Lễ Chiêu tịch diện như thờ khi người còn sống.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "An táng rồi trở về nhà lại tế, gọi là Ngu tế. Ngày hôm trước gọi là sơ ngu, ngày thứ hai là tái ngu, ngày thứ ba gọi là tam ngu. Ngu nghĩa là yên. Vì người mất, xương thịt mới chôn dưới đất, hồn phách chưa được yên, cho nên tế ba lần để yên hồn phách cho người mất.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Trong ba ngày sau khi mới chôn, mỗi buổi chiều con cái đem cơi trầu đến chỗ mả khóc lóc, gọi là viếng mộ. Tục ta thường để đến hôm ba ngày mới sửa sang lại mộ cho tốt đẹp, hoặc làm nhà mộ.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Từ đó trở đi, thì ngày nào cũng cúng cơm hai buổi và phải khóc lóc.", m: "Tang ma", f: "vnpt-i09-tang-ma" }
  ],
  ghiTucLe: "Phan Kế Bính chép cúng cơm hai buổi, tế ngu ba ngày và viếng mộ; 'tuần đầu' bảy ngày (thất đầu) ông không chép, là cách tính theo bảy tuần của Phật giáo dân gian [I].",
  leVat: ["Cúng cơm: bát cơm, món ăn thường ngày, nước, đôi đũa; thắp hương", "Lễ ba ngày tại mộ: hương, hoa, trầu rượu, hoa quả; dụng cụ đắp mộ", "Tuần đầu: cơm canh hoặc cỗ nhỏ tại bàn thờ vong (tùy nhà, tùy vùng)"],
  trinhTu: ["Mỗi ngày hai bữa dâng cơm ở bàn thờ vong, thắp hương, khấn ngắn.", "Ngày thứ ba sau khi chôn: ra mộ, đắp sửa, thắp hương, đọc bài khấn; về nhà cúng.", "Ngày thứ bảy: cúng tuần đầu tại nhà.", "Giữ nếp cúng cơm tới 49 hoặc 100 ngày tùy nhà."],
  doiTuong: "hương hồn",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], là [quan hệ] của người mất, cùng gia đình ngụ tại [địa chỉ].
Kính cáo hương hồn [người đã khuất], mất ngày [ngày mất].
Người mới về nơi đất mới, con cháu còn nhớ từng bữa cơm có người. Hôm nay là [lễ ba ngày / tuần đầu], chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, bát cơm món ăn người vẫn dùng, kính dâng trước án.
Cúi xin hương hồn người về nhận lễ, chứng cho lòng thương nhớ của con cháu.
Kính mong người yên nghỉ, dần quen nơi mới, không lo lắng việc nhà; phù hộ cho con cháu khỏe mạnh, bảo ban nhau sống tử tế như lời người dặn.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [],
  diBan: [{ nd: "Phan Kế Bính ghi lễ chiêu tịch diện đầy đủ (rước hồn bạch, bưng chậu nước khăn mặt) 'nhà đại gia mới dùng, nhà thường thì chỉ cúng ở chỗ linh-tọa mà thôi'; ngu tế cũng 'nhà phú quí mới có'. Tên 'mở cửa mả' và cách cúng kèm (thang tre, gà con) là tục vùng khác, chưa có nguồn.", nguon: "Tang ma; mở cửa mả: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "49-ngay", nhom: "tang-gio", ten: "49 ngày", tenKhac: "Chung thất, tứ cửu",
  thoiDiem: { loai: "sau-mat", ngay: 49, ghi: "Ngày thứ 49 kể từ ngày mất (ngày mất là ngày 1) hoặc ngày mất + 49, tùy nhà" },
  yNghia: "Hết bảy tuần. Theo quan niệm Phật giáo dân gian, đây là mốc người mất 'đi tiếp'; nhà có điều kiện làm lễ cầu siêu ở chùa. Pháp luật hiện hành dặn làm trong nội bộ gia đình.",
  tucLe: [
    { t: "Bốn mươi chín ngày gọi là tuần chung thất. Tuần này có tế, có nhà đem vào chùa làm chay, nhờ nhà sư tụng kinh sám hối ba đêm hoặc bảy đêm ngày, để cho vong hồn được siêu thăng tịnh độ.", m: "Tang ma", f: "vnpt-i09-tang-ma" }
  ],
  leVat: ["Hương đèn, hoa, trầu rượu, nước", "Cỗ chay hoặc mặn tùy nhà; nhiều nhà cúng chay", "Nếu làm lễ ở chùa: theo hướng dẫn của chùa"],
  trinhTu: ["Tính ngày (xem hai cách đếm), báo họ hàng gần.", "Bày lễ ở bàn thờ vong, thắp hương, đọc bài khấn.", "Lên chùa cầu siêu nếu nhà theo Phật.", "Hạ lễ, gia đình dùng cơm; không mời rộng."],
  doiTuong: "hương hồn",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], là [quan hệ] của người mất, cùng gia đình ngụ tại [địa chỉ].
Kính cáo hương hồn [người đã khuất], mất ngày [ngày mất], đến nay tròn bốn mươi chín ngày.
Bảy tuần đã qua. Con cháu vẫn thắp hương mỗi ngày, vẫn thấy thiếu người trong nhà. Nhân tuần chung thất, chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, cơm canh, kính dâng trước án.
Cúi xin hương hồn người về nhận lễ, chứng cho lòng thành của con cháu.
Kính mong người nhẹ bước về nơi an lành, buông được nỗi lo trần thế; phù hộ cho con cháu mạnh khỏe, hòa thuận, giữ được những điều tốt người để lại.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "04", y: "Cúng 49 ngày tổ chức 'chỉ trong ngày, trong nội bộ gia đình, dòng họ'." }],
  diBan: [{ nd: "Phan Kế Bính chỉ chép 'tuần này có tế' và việc làm chay ở chùa; cách đếm ngày không ghi. Hai cách đếm đang lưu hành đều chưa có nguồn quy định.", nguon: "Tang ma; cách đếm: chưa có nguồn" }],
  viec: "te-le" },

{ ma: "100-ngay", nhom: "tang-gio", ten: "100 ngày", tenKhac: "Tốt khốc, thôi khóc",
  thoiDiem: { loai: "sau-mat", ngay: 100, ghi: "Ngày thứ 100 kể từ ngày mất hoặc ngày mất + 100, tùy nhà" },
  yNghia: "Tròn trăm ngày. Tên cổ là 'tốt khốc', nghĩa là thôi khóc: từ đây không cúng cơm hai bữa nữa, nhà dần trở lại nhịp thường.",
  tucLe: [
    { t: "Một trăm ngày là tuần tốt khốc, nghĩa là đến bấy giờ mới thôi khóc, tuần này tế lễ một tiệc rồi thì thôi không cúng hai buổi nữa.", m: "Tang ma", f: "vnpt-i09-tang-ma" }
  ],
  leVat: ["Hương đèn, hoa, trầu rượu, nước", "Mâm cơm hoặc cỗ nhỏ tùy nhà"],
  trinhTu: ["Tính ngày, báo người thân gần.", "Bày lễ, thắp hương, đọc bài khấn.", "Hạ lễ, gia đình dùng cơm.", "Từ hôm sau thôi cúng cơm hằng ngày (tùy nhà); thắp hương tuần tiết như gia tiên."],
  doiTuong: "hương hồn",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], là [quan hệ] của người mất, cùng gia đình ngụ tại [địa chỉ].
Kính cáo hương hồn [người đã khuất], mất ngày [ngày mất], đến nay tròn một trăm ngày.
Trăm ngày qua con cháu dâng cơm sớm chiều, nay theo lễ xưa là ngày thôi khóc. Nhân tuần tốt khốc, chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, cơm canh, kính dâng trước án.
Cúi xin hương hồn người về nhận lễ, chứng cho lòng thành của con cháu.
Từ nay con cháu xin thôi dâng cơm hằng ngày, nhưng tuần tiết, ngày giỗ vẫn thắp hương kính mời. Kính mong người yên nghỉ, phù hộ cho con cháu bình an, nhà cửa dần trở lại yên ấm.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "04", y: "Cúng 100 ngày tổ chức 'chỉ trong ngày, trong nội bộ gia đình, dòng họ'." }],
  diBan: [{ nd: "Chưa có nguồn về khác biệt vùng. Cách đếm ngày như lễ 49 ngày.", nguon: "chưa có nguồn" }],
  viec: "te-le" },

{ ma: "gio-dau-gio-het", nhom: "tang-gio", ten: "Giỗ đầu, giỗ hết", tenKhac: "Tiểu tường (1 năm), đại tường (2 năm), đàm tế (hết tang)",
  thoiDiem: { loai: "gio", moc: [{ ten: "Giỗ đầu (tiểu tường)", nam: 1 }, { ten: "Giỗ hết (đại tường)", nam: 2 }], ghi: "Ngày mất âm lịch, tròn một năm và tròn hai năm; xưa sau đại tường hai tháng làm lễ đàm bỏ tang" },
  yNghia: "Giỗ đầu tròn một năm, giỗ hết tròn hai năm. Xưa giỗ đầu bỏ đồ sô gai, giỗ hết rồi hai tháng sau làm lễ đàm là hết tang ba năm. Đây là hai giỗ còn nặng không khí tang, khác giỗ thường về sau.",
  tucLe: [
    { t: "Được một năm thì giỗ đầu gọi là lễ tiểu-tường. Bấy giờ mới trừ bỏ đồ hung phục như đồ sô gai, gậy mũ, v.v... Nhưng vẫn còn mặc đồ tang chế cho hết ba năm.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Hai năm giỗ hết gọi là đại tường.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Sau đại tường hai tháng, chọn một ngày làm lễ trừ phục, gọi là đàm tế. Bấy giờ mới bỏ hết đồ tang phục, mà mặc các sắc phục thường.", m: "Tang ma", f: "vnpt-i09-tang-ma" },
    { t: "Trong khoảng tiểu, đại tường, có hai kỳ đốt mã. Kỳ mã đầu gọi là mã biếu, kỳ mã sau mới thực là mã dâng cho người mất dùng. Tục hay đốt về tuần trung nguyên tháng bảy, cũng nhiều nhà thì đốt về ngày giỗ đầu và ngày giỗ hết.", m: "Tang ma", f: "vnpt-i09-tang-ma" }
  ],
  leVat: ["Hương đèn, hoa, trầu rượu, nước", "Cỗ giỗ tùy nhà; bát cơm úp quả trứng (theo lệ giỗ)", "Vàng mã: xưa đốt hai kỳ; nay nên ít hoặc bỏ"],
  trinhTu: ["Chiều hôm trước cúng tiên thường (báo giỗ).", "Ngày chính giỗ bày cỗ, thắp hương, đọc bài khấn.", "Con cháu lễ; họ hàng gần đến thắp hương.", "Hạ lễ, dùng cơm trong gia đình.", "Giỗ hết: sau đó chọn ngày làm lễ đàm, cất đồ tang (tùy nhà)."],
  doiTuong: "hương hồn",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], là [quan hệ] của người mất, cùng gia đình ngụ tại [địa chỉ].
Kính lạy gia tiên nội ngoại họ [họ]; kính cáo hương hồn [người đã khuất], mất ngày [ngày mất].
Năm tháng đổi dời, ngày giỗ lại đến. Hôm nay là [giỗ đầu / giỗ hết] của người. Con cháu nhớ người, không ngớt tưởng niệm.
Chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, cỗ bàn tùy sức, kính dâng trước án.
Cúi xin hương hồn người về nhận lễ, cùng gia tiên chứng cho lòng thành của con cháu.
Kính mong người yên nghỉ, phù hộ cho con cháu khỏe mạnh, hòa thuận, làm ăn thuận lợi, nhớ ơn người mà ăn ở cho phải đạo.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "04", y: "Giỗ tổ chức 'chỉ trong ngày, trong nội bộ gia đình, dòng họ'." }, { vb: "308", y: "Hạn chế đốt vàng mã." }],
  diBan: [{ nd: "Phan Kế Bính ghi ba năm tang nhưng đại tường ở năm thứ hai, đàm tế hai tháng sau; nay nhiều nhà coi giỗ hết là hết tang luôn. Chu Tử gia lễ quyển 5 cho câu khấn ngày giỗ: 'Năm tháng đổi dời, ngày giỗ lại đến' (嵗序流易諱日復臨).", nguon: "Tang ma; Gia lễ quyển 5" }],
  viec: "te-le" },

{ ma: "gio-thuong", nhom: "tang-gio", ten: "Giỗ thường", tenKhac: "Kỵ nhật, cát kỵ; giỗ họ, giỗ tổ",
  thoiDiem: { loai: "gio", nam: 3, ghi: "Ngày mất âm lịch hằng năm, từ năm thứ ba trở đi; chiều hôm trước cúng tiên thường" },
  yNghia: "Giỗ hằng năm của ông bà cha mẹ. Phan Kế Bính dặn: giỗ to nhỏ tùy nhà, nhưng 'lưng cơm cái trứng cũng đủ tỏ chút lòng thành'; ông phê tục giỗ bày tiệc đãi khách làm nhiều nhà khốn khó.",
  tucLe: [
    { t: "Ngày giỗ cụ kỵ, ông bà, cha mẹ, gọi là ngày kỵ nhật. Chiều hôm trước là cúng tiên thường, hôm sau mới là ngày chính kỵ. Các giỗ xa (cụ kỵ ông bà) thì sắm sửa con gà, ván xôi hoặc một vài mâm cỗ, trước cúng gia tiên, sau con cháu sum họp ăn uống với nhau.", m: "Kỵ nhật", f: "vnpt-i11-ky-nhat" },
    { t: "Trong khi giỗ, dẫu làm lớn nhỏ thế nào mặc lòng, nhưng làm sao tất cũng phải có một bát cơm úp vào một quả trứng luộc làm đầu.", m: "Kỵ nhật", f: "vnpt-i11-ky-nhat" },
    { t: "Đã đành rằng có thì mâm cao cỗ đầy, chẳng có thì lưng cơm cái trứng, cũng đủ tỏ chút lòng thành", m: "Kỵ nhật (lời bàn của tác giả)", f: "vnpt-i11-ky-nhat" },
    { t: "Mỗi năm về ngày húy nhựt ông Thủy-Tổ, cả họ họp mặt tại nhà thờ, dùng lễ Tam-sinh, hoặc tùy họ to họ nhỏ mà dùng bò hoặc lợn để tế Tổ.", m: "Phụng sự tổ tôn (giỗ tổ của họ)", f: "vnpt-i04-phung-su-to-ton" }
  ],
  leVat: ["Hương đèn, hoa, trầu rượu, nước, trà", "Bát cơm úp quả trứng luộc (theo Phan Kế Bính)", "Cỗ tùy nhà: gà xôi, vài món người mất thích; hoa quả"],
  trinhTu: ["Chiều hôm trước: cúng tiên thường, khấn mời người mất và gia tiên về dự giỗ ngày mai.", "Ngày chính giỗ: lau bàn thờ, bày cỗ, thắp hương, đọc bài khấn.", "Con cháu lần lượt thắp hương.", "Hạ lễ, cả nhà ăn giỗ; không nặng mời khách."],
  doiTuong: "hương hồn",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], cùng gia đình ngụ tại [địa chỉ].
Kính lạy Thổ công, Táo quân và các vị thần coi sóc đất này; kính lạy gia tiên nội ngoại họ [họ]; kính cáo hương hồn [người đã khuất].
Năm tháng đổi dời, hôm nay lại đến ngày giỗ của người. Con cháu nhớ người, nhớ công sinh thành nuôi dạy, nhớ những điều người để lại cho nhà.
Chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, bát cơm quả trứng và mâm cỗ tùy sức, kính dâng trước án.
Cúi xin hương hồn người về hưởng lễ, mời cả gia tiên nội ngoại cùng về, chứng cho lòng thành của con cháu.
Kính mong gia tiên phù hộ cho cả nhà bình an, con cháu hiếu thuận, anh em thương nhau, nếp nhà giữ được lâu dài.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "04", y: "Giỗ tổ chức 'chỉ trong ngày, trong nội bộ gia đình, dòng họ'." }],
  diBan: [{ nd: "Phan Kế Bính kể giỗ cha mẹ 'làm phong hơn' giỗ xa, và một số nơi chiều tiên thường 'dở ra bài bạc thuốc phiện lấy tiếng chầu chực gia tiên'; ông phê. Chu Tử gia lễ quyển 5 dặn ngày giỗ không uống rượu, không ăn thịt, không nghe nhạc.", nguon: "Kỵ nhật; Gia lễ quyển 5" }],
  viec: "te-le" },

{ ma: "cai-tang", nhom: "tang-gio", ten: "Cải táng", tenKhac: "Bốc mộ, sang cát",
  thoiDiem: { loai: "tuy", ghi: "Xưa sau ba năm đoạn tang 'hoặc một vài năm nữa'; chọn ngày trong mùa khô; chọn ngày tốt cho việc cải táng" },
  yNghia: "Đào mộ cũ, nhặt xương, cho vào tiểu, chôn sang mộ xây. Phan Kế Bính kể năm lý do người ta cải táng và khuyên: nếu không bắt buộc thì đừng di dời hài cốt; chôn kỹ từ đầu thì không cần cải táng.",
  tucLe: [
    { t: "Người mất, sau khi ba năm đoạn tang rồi, hoặc một vài năm nữa, thì con cái lo việc cải táng.", m: "Cải táng", f: "vnpt-i10-cai-tang" },
    { t: "Trước hôm cải táng, làm lễ cáo từ đường. Đến hôm cải táng, lại làm lễ khấn Thổ công chỗ để mả mới táng.", m: "Cải táng", f: "vnpt-i10-cai-tang" },
    { t: "Trước hết khai mả, nhặt lấy xương xếp vào một cái tiểu sành, rẩy nước vang vào, rồi che đậy thật kín, không cho ánh sáng mặt trời lọt vào được.", m: "Cải táng", f: "vnpt-i10-cai-tang" },
    { t: "Trước khi hung táng thì đắp hình vuông, đến lúc cải táng thì đắp hình tròn.", m: "Cải táng", f: "vnpt-i10-cai-tang" },
    { t: "Thiết tưởng hài cốt tiên nhân, nếu có lòng kính trọng thương xót, thì chớ nên di đi dịch lại làm gì. Trừ ra những khi vạn bất đắc dĩ thì phải cải đi thôi", m: "Cải táng (lời bàn của tác giả)", f: "vnpt-i10-cai-tang" },
    { t: "Tục cải táng có người theo, nhưng cũng nhiều người khi hung táng, sắm sửa quan quách kỹ càng, thì không cần gì phải cải táng nữa.", m: "Cải táng", f: "vnpt-i10-cai-tang" }
  ],
  leVat: ["Hôm trước, tại nhà: hương hoa, trầu rượu, cỗ nhỏ cáo gia tiên", "Tại mộ cũ: hương, trầu rượu, hoa quả; lễ khấn Thổ thần", "Tại mộ mới: lễ khấn Thổ thần nơi mới; tiểu sành, vải đỏ, nước thơm (tùy nhà)"],
  trinhTu: ["Hôm trước thắp hương cáo gia tiên ở nhà.", "Tại mộ cũ: khấn Thổ thần xin phép, rồi khai mộ (thường ban đêm hoặc sáng sớm, mùa khô).", "Nhặt xương, rửa sạch, xếp vào tiểu, đậy kín.", "Tại mộ mới: khấn Thổ thần nơi mới, hạ tiểu, xây mộ.", "Về nhà thắp hương báo gia tiên; làm trong gia đình, dòng họ."],
  doiTuong: "Thổ thần",
  vanKhan: `Hôm nay là ngày [ngày].
Con là [tên], là [quan hệ] của người mất, ngụ tại [địa chỉ].
Kính cáo Thổ thần coi giữ khu đất này; kính cáo hương hồn [người đã khuất], mất ngày [ngày mất].
Người an táng ở đây đã nhiều năm. Nay gia đình con vì [lý do] mà phải cải táng, đưa người sang phần mộ mới tại [nơi mới]. Chúng con thành tâm sửa biện lễ vật: hương đèn, hoa quả, trầu rượu, kính dâng trước mộ.
Cúi xin Thổ thần nhận lễ, cho phép con cháu được khai mộ, rước hài cốt người đi, và tha thứ cho sự động chạm đến đất này.
Cúi xin hương hồn người đừng kinh động, theo con cháu về nơi mới cao ráo sạch sẽ để yên nghỉ lâu dài.
Kính mong người phù hộ cho con cháu bình an, việc hôm nay suôn sẻ, trọn vẹn.
Chúng con lễ bạc tâm thành, cúi xin chứng giám.`,
  phapLy: [{ vb: "04", y: "Cải táng tổ chức 'chỉ trong ngày, trong nội bộ gia đình, dòng họ'." }, { vb: "308", y: "Việc tang theo nếp sống văn minh; cải táng đúng nơi quy hoạch nghĩa trang." }],
  diBan: [{ nd: "Phan Kế Bính chép ba 'điềm' gặp khi khai mộ thì lấp lại ngay (rắn vàng, dây tơ hồng quấn, huyệt khô ấm). Ông cũng phê người 'cải táng đến năm sáu lần' vì tin địa lý.", nguon: "Cải táng" }],
  viec: "cai-tang" }
);
