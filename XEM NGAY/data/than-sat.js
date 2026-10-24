// Thần sát theo Khâm định Hiệp kỷ biện phương thư — dữ liệu sinh bằng script gen-than-sat.mjs từ nguon/hiep-ky-qNN.txt, ngày 2026-10-24.
// KHÔNG sửa tay: mọi chuỗi trong trich/trichNghiKy/binhLuan/nguyenTac phải dò được trong file nguồn (kiểm bằng tools/kiem-tra-than-sat.mjs).
// Nạp trong trình duyệt: window.XN_THAN_SAT. Nạp bằng vm/node: đọc biến XN_THAN_SAT.
var XN_THAN_SAT = {
 "phienBan": "1.0",
 "ngayLap": "2026-10-24",
 "nguonGoc": "Khâm định Hiệp kỷ biện phương thư (欽定協紀辨方書), bản Tứ khố toàn thư trên zh.wikisource; file nguon/hiep-ky-qNN.txt",
 "quyUoc": "chi 0 = Tý … 11 = Hợi; can 0 = Giáp … 9 = Quý; chỉ số 60 can chi: 0 = Giáp Tý … 59 = Quý Hợi; bảng tháng 12 phần tử theo chiThang (tháng TIẾT KHÍ), chiThang 2 = Dần = tháng Giêng. Kiểu định nghĩa: thang-chi (bang[chiThang] = mảng chi ngày), thang-can (mảng can ngày), thang-canchi (mảng chỉ số 60), thang-can-hoac-chi (khớp can HOẶC chi), truc, hoang-dao (bang: chi ngày theo tháng), ngay-canchi (ds chỉ số 60), am-lich (ngày âm). Chuẩn hoá khi dò trích dẫn: giữ chữ trong {{SK anchor|…}}, bỏ mọi {{…}} khác, bỏ thẻ, khoảng trắng, dấu câu.",
 "viec": [
  {
   "ma": "te-le",
   "ten": "Cúng tế, giỗ chạp",
   "han": [
    "祭祀"
   ]
  },
  {
   "ma": "cau-phuc",
   "ten": "Cầu phúc, cầu an",
   "han": [
    "祈福"
   ]
  },
  {
   "ma": "cau-tu",
   "ten": "Cầu con",
   "han": [
    "求嗣"
   ]
  },
  {
   "ma": "nop-don",
   "ten": "Trình đơn từ, nộp hồ sơ lên cấp trên",
   "han": [
    "上冊進表章",
    "上册進表章",
    "上表章",
    "上冊受封"
   ]
  },
  {
   "ma": "bo-nhiem",
   "ten": "Nhận bổ nhiệm, thăng chức, nhận phong",
   "han": [
    "施恩封拜",
    "襲爵受封"
   ]
  },
  {
   "ma": "khen-thuong",
   "ten": "Khen thưởng, mừng tặng",
   "han": [
    "慶賜",
    "賞賀",
    "慶賜賞賀"
   ]
  },
  {
   "ma": "tiec-tung",
   "ten": "Tiệc tùng, họp mặt thân hữu",
   "han": [
    "宴會",
    "宴㑹",
    "會親友",
    "㑹親友"
   ]
  },
  {
   "ma": "nhap-hoc",
   "ten": "Nhập học, khai giảng",
   "han": [
    "入學"
   ]
  },
  {
   "ma": "le-truong-thanh",
   "ten": "Lễ trưởng thành (quan đái)",
   "han": [
    "冠帶"
   ]
  },
  {
   "ma": "xuat-hanh",
   "ten": "Xuất hành, đi xa",
   "han": [
    "出行",
    "行幸遣使",
    "行幸",
    "遣使"
   ]
  },
  {
   "ma": "nhan-chuc",
   "ten": "Nhậm chức, đi làm mới",
   "han": [
    "上官赴任",
    "臨政親民",
    "上官"
   ]
  },
  {
   "ma": "dam-hoi",
   "ten": "Dạm ngõ, ăn hỏi, đính ước",
   "han": [
    "結婚姻",
    "納采問名"
   ]
  },
  {
   "ma": "cuoi-ga",
   "ten": "Cưới gả",
   "han": [
    "嫁娶"
   ]
  },
  {
   "ma": "nhan-nguoi",
   "ten": "Nhận người (nhận con nuôi, tuyển người làm)",
   "han": [
    "進人口"
   ]
  },
  {
   "ma": "nhap-trach",
   "ten": "Về nhà mới, chuyển chỗ ở",
   "han": [
    "般移",
    "移徙"
   ]
  },
  {
   "ma": "ve-nha-xa",
   "ten": "Đi xa trở về nhà",
   "han": [
    "遠迴",
    "逺廻"
   ]
  },
  {
   "ma": "an-sang",
   "ten": "Kê giường, an sàng",
   "han": [
    "安牀"
   ]
  },
  {
   "ma": "giai-tru",
   "ten": "Giải trừ, trừ tà, giải hạn",
   "han": [
    "解除"
   ]
  },
  {
   "ma": "tam-goi",
   "ten": "Tắm gội, tẩy trần",
   "han": [
    "沐浴"
   ]
  },
  {
   "ma": "cat-toc",
   "ten": "Cắt tóc, làm móng, chỉnh dung",
   "han": [
    "整容剃頭",
    "剃頭",
    "整容",
    "整手足甲"
   ]
  },
  {
   "ma": "chua-benh",
   "ten": "Chữa bệnh, khám bệnh",
   "han": [
    "求醫療病",
    "療病"
   ]
  },
  {
   "ma": "chua-mat",
   "ten": "Chữa mắt",
   "han": [
    "療目",
    "求醫療目"
   ]
  },
  {
   "ma": "cham-cuu",
   "ten": "Châm cứu, tiểu phẫu",
   "han": [
    "針刺"
   ]
  },
  {
   "ma": "cat-may",
   "ten": "Cắt may quần áo",
   "han": [
    "裁製",
    "裁衣"
   ]
  },
  {
   "ma": "xay-nha",
   "ten": "Xây nhà mới",
   "han": [
    "營建宮室",
    "營建宫室"
   ]
  },
  {
   "ma": "sua-nha",
   "ten": "Sửa chữa nhà cửa",
   "han": [
    "修宮室",
    "修宫室"
   ]
  },
  {
   "ma": "xay-tuong-rao",
   "ten": "Xây tường bao, hàng rào",
   "han": [
    "繕城郭"
   ]
  },
  {
   "ma": "dap-de",
   "ten": "Đắp đê, xây kè",
   "han": [
    "築隄防"
   ]
  },
  {
   "ma": "dong-tho",
   "ten": "Động thổ, đào móng",
   "han": [
    "興造動土",
    "修造動土",
    "修造"
   ]
  },
  {
   "ma": "thuong-luong",
   "ten": "Dựng cột, cất nóc",
   "han": [
    "豎柱上梁"
   ]
  },
  {
   "ma": "sua-kho",
   "ten": "Xây sửa kho bãi",
   "han": [
    "修倉庫"
   ]
  },
  {
   "ma": "duc-kim-loai",
   "ten": "Đúc kim loại, nung luyện",
   "han": [
    "鼓鑄"
   ]
  },
  {
   "ma": "lop-mai",
   "ten": "Lợp mái",
   "han": [
    "苫蓋",
    "苫葢"
   ]
  },
  {
   "ma": "det-may",
   "ten": "Dệt vải, mắc cửi",
   "han": [
    "經絡"
   ]
  },
  {
   "ma": "nau-ruou",
   "ten": "Ủ rượu, làm tương",
   "han": [
    "醞釀"
   ]
  },
  {
   "ma": "khai-truong",
   "ten": "Khai trương, mở hàng",
   "han": [
    "開市"
   ]
  },
  {
   "ma": "ky-ket",
   "ten": "Ký kết, giao dịch",
   "han": [
    "立劵交易",
    "立券",
    "交易"
   ]
  },
  {
   "ma": "nhan-tien",
   "ten": "Thu tiền, nhận của",
   "han": [
    "納財"
   ]
  },
  {
   "ma": "xuat-kho",
   "ten": "Xuất kho, xuất tiền hàng",
   "han": [
    "開倉庫出貨財",
    "開倉庫",
    "出貨財"
   ]
  },
  {
   "ma": "phong-sinh",
   "ten": "Sửa soạn phòng sinh nở",
   "han": [
    "修置產室",
    "修置産室",
    "置産室"
   ]
  },
  {
   "ma": "dao-gieng",
   "ten": "Đào giếng, khơi mương",
   "han": [
    "開渠穿井",
    "開渠",
    "穿井"
   ]
  },
  {
   "ma": "lap-may",
   "ten": "Lắp cối xay, lắp đặt máy móc",
   "han": [
    "安碓磑"
   ]
  },
  {
   "ma": "bit-lo",
   "ten": "Trám vá tường, bịt lỗ hang",
   "han": [
    "補垣塞穴",
    "補垣",
    "塞穴"
   ]
  },
  {
   "ma": "don-dep",
   "ten": "Dọn dẹp, tổng vệ sinh nhà cửa",
   "han": [
    "掃舍宇"
   ]
  },
  {
   "ma": "sua-tuong",
   "ten": "Tô sửa tường rào",
   "han": [
    "修飾垣墻",
    "修飾垣牆"
   ]
  },
  {
   "ma": "lam-duong",
   "ten": "Làm đường, san nền",
   "han": [
    "平治道塗"
   ]
  },
  {
   "ma": "pha-do",
   "ten": "Phá dỡ nhà cửa, tường cũ",
   "han": [
    "破屋壞垣",
    "破屋壊垣"
   ]
  },
  {
   "ma": "chat-cay",
   "ten": "Chặt cây, đốn gỗ",
   "han": [
    "伐木"
   ]
  },
  {
   "ma": "bat-giu",
   "ten": "Bắt giữ, diệt trừ sâu bọ",
   "han": [
    "捕捉"
   ]
  },
  {
   "ma": "san-ban",
   "ten": "Săn bắn",
   "han": [
    "畋獵"
   ]
  },
  {
   "ma": "danh-ca",
   "ten": "Đánh cá",
   "han": [
    "取魚"
   ]
  },
  {
   "ma": "di-thuyen",
   "ten": "Đi thuyền, qua sông nước",
   "han": [
    "乘船渡水"
   ]
  },
  {
   "ma": "trong-trot",
   "ten": "Trồng trọt, gieo cấy",
   "han": [
    "栽種",
    "修築園圃"
   ]
  },
  {
   "ma": "chan-nuoi",
   "ten": "Chăn nuôi, mua gia súc",
   "han": [
    "牧養",
    "納畜"
   ]
  },
  {
   "ma": "dao-huyet",
   "ten": "Phá thổ, đào huyệt mộ",
   "han": [
    "破土"
   ]
  },
  {
   "ma": "an-tang",
   "ten": "An táng",
   "han": [
    "安葬"
   ]
  },
  {
   "ma": "cai-tang",
   "ten": "Cải táng, bốc mộ",
   "han": [
    "啟攢",
    "啓攢"
   ]
  },
  {
   "ma": "kien-tung",
   "ten": "Kiện tụng, nộp đơn kiện",
   "han": [
    "陳詞訟"
   ]
  },
  {
   "ma": "an-than",
   "ten": "An vị thần, lập bàn thờ",
   "han": [
    "安神"
   ]
  },
  {
   "ma": "sua-nha-tho",
   "ten": "Sửa từ đường, nhà thờ",
   "han": [
    "修祠宇"
   ]
  }
 ],
 "hanKhongDung": [
  "頒詔",
  "覃恩",
  "肆赦",
  "詔命公卿",
  "招賢",
  "舉正直",
  "施恩惠",
  "恤孤惸",
  "宣政事",
  "布政事",
  "宣布政事",
  "行惠愛",
  "雪寃枉",
  "緩刑獄",
  "安撫邊境",
  "選將訓兵",
  "出師",
  "運謀算畫計策"
 ],
 "thanSat": [
  {
   "ma": "thien-duc",
   "ten": "Thiên Đức",
   "han": "天德",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-can-hoac-chi",
    "bangCan": [
     [],
     [
      6
     ],
     [
      3
     ],
     [],
     [
      8
     ],
     [
      7
     ],
     [],
     [
      0
     ],
     [
      9
     ],
     [],
     [
      2
     ],
     [
      1
     ]
    ],
    "bangChi": [
     [
      5
     ],
     [],
     [],
     [
      8
     ],
     [],
     [],
     [
      11
     ],
     [],
     [],
     [
      2
     ],
     [],
     []
    ],
    "quyTac": "正月丁二月坤三月壬四月辛五月乾六月甲七月癸八月艮九月丙十月乙十一月巽十二月庚"
   },
   "nguon": {
    "quyen": 5,
    "trich": "堪輿經曰天徳者正月丁二月坤三月壬四月辛五月乾六月甲七月癸八月艮九月丙十月乙十一月巽十二月庚"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "trong-trot",
    "chan-nuoi",
    "an-tang"
   ],
   "ky": [
    "san-ban",
    "danh-ca"
   ],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上冊進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "栽種",
    "牧養",
    "納畜",
    "安葬"
   ],
   "kyHan": [
    "畋獵",
    "取魚"
   ],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上冊進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶般移解除求醫療病裁製營建宫室繕城郭興造動土豎柱上梁修倉庫栽種牧養納畜安葬",
    "忌畋獵取魚"
   ],
   "binhLuan": "按天德月德乃月建三合旺氣天德合月德合與旺氣作五合皆上吉之日故所宜應如此忌畋獵取魚者恐傷生氣也舊本天德止宜興土工營宮室繕城郭月德并宜上官宴樂天德合宜祭祀祈福覃恩肆赦緩刑獄選將訓兵月德合並宜上册進表章營建宮室殊於名義不合明原引五行論則曰月德合日百福並集又不及天月二德及天德合可見其為畧舉大意而非有義例也夫王者事神行政慶賞刑威與夫分職設官體國經野以及宮室城郭衣服居處所以謀室家之安而錫兆庶之福者無非體天心而行時令故因義起例罄無不宜庶名與事允協矣",
   "ghiChu": [
    "[I] Tháng tứ trọng (Mão, Ngọ, Dậu, Tý) sách ghi Thiên Đức ở quẻ Khôn, Càn, Cấn, Tốn (phương vị, không có can); quy về ngày Thân, Hợi, Dần, Tỵ là quy ước phổ biến, chưa đối chiếu được nguyên văn Hiệp kỷ."
   ]
  },
  {
   "ma": "nguyet-duc",
   "ten": "Nguyệt Đức",
   "han": "月德",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-can",
    "bang": [
     [
      8
     ],
     [
      6
     ],
     [
      2
     ],
     [
      0
     ],
     [
      8
     ],
     [
      6
     ],
     [
      2
     ],
     [
      0
     ],
     [
      8
     ],
     [
      6
     ],
     [
      2
     ],
     [
      0
     ]
    ],
    "quyTac": "正五九月在丙二六十月在甲三七十一月在壬四八十二月在庚"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰月徳者正五九月在丙二六十月在甲三七十一月在壬四八十二月在庚"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "trong-trot",
    "chan-nuoi",
    "an-tang"
   ],
   "ky": [
    "san-ban",
    "danh-ca"
   ],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上冊進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "栽種",
    "牧養",
    "納畜",
    "安葬"
   ],
   "kyHan": [
    "畋獵",
    "取魚"
   ],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上冊進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶般移解除求醫療病裁製營建宫室繕城郭興造動土豎柱上梁修倉庫栽種牧養納畜安葬",
    "忌畋獵取魚"
   ],
   "binhLuan": "按天德月德乃月建三合旺氣天德合月德合與旺氣作五合皆上吉之日故所宜應如此忌畋獵取魚者恐傷生氣也舊本天德止宜興土工營宮室繕城郭月德并宜上官宴樂天德合宜祭祀祈福覃恩肆赦緩刑獄選將訓兵月德合並宜上册進表章營建宮室殊於名義不合明原引五行論則曰月德合日百福並集又不及天月二德及天德合可見其為畧舉大意而非有義例也夫王者事神行政慶賞刑威與夫分職設官體國經野以及宮室城郭衣服居處所以謀室家之安而錫兆庶之福者無非體天心而行時令故因義起例罄無不宜庶名與事允協矣"
  },
  {
   "ma": "thien-duc-hop",
   "ten": "Thiên Đức Hợp",
   "han": "天德合",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-can",
    "bang": [
     [],
     [
      1
     ],
     [
      8
     ],
     [],
     [
      3
     ],
     [
      2
     ],
     [],
     [
      5
     ],
     [
      4
     ],
     [],
     [
      7
     ],
     [
      6
     ]
    ],
    "quyTac": "正月壬三月丁四月丙六月巳七月戊九月辛十月庚十二月乙"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰天徳合者正月壬三月丁四月丙六月巳七月戊九月辛十月庚十二月乙是也四仲之月天徳居四維故無合也"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "trong-trot",
    "chan-nuoi",
    "an-tang"
   ],
   "ky": [
    "san-ban",
    "danh-ca"
   ],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上冊進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "栽種",
    "牧養",
    "納畜",
    "安葬"
   ],
   "kyHan": [
    "畋獵",
    "取魚"
   ],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上冊進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶般移解除求醫療病裁製營建宫室繕城郭興造動土豎柱上梁修倉庫栽種牧養納畜安葬",
    "忌畋獵取魚"
   ],
   "binhLuan": "按天德月德乃月建三合旺氣天德合月德合與旺氣作五合皆上吉之日故所宜應如此忌畋獵取魚者恐傷生氣也舊本天德止宜興土工營宮室繕城郭月德并宜上官宴樂天德合宜祭祀祈福覃恩肆赦緩刑獄選將訓兵月德合並宜上册進表章營建宮室殊於名義不合明原引五行論則曰月德合日百福並集又不及天月二德及天德合可見其為畧舉大意而非有義例也夫王者事神行政慶賞刑威與夫分職設官體國經野以及宮室城郭衣服居處所以謀室家之安而錫兆庶之福者無非體天心而行時令故因義起例罄無不宜庶名與事允協矣",
   "ghiChu": [
    "Tháng tứ trọng không có Thiên Đức Hợp (四仲之月天徳居四維故無合也)."
   ]
  },
  {
   "ma": "nguyet-duc-hop",
   "ten": "Nguyệt Đức Hợp",
   "han": "月德合",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-can",
    "bang": [
     [
      3
     ],
     [
      1
     ],
     [
      7
     ],
     [
      5
     ],
     [
      3
     ],
     [
      1
     ],
     [
      7
     ],
     [
      5
     ],
     [
      3
     ],
     [
      1
     ],
     [
      7
     ],
     [
      5
     ]
    ],
    "quyTac": "正五九月在辛二六十月在巳三七十一月在丁四八十二月在乙"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰月徳合者正五九月在辛二六十月在巳三七十一月在丁四八十二月在乙"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "trong-trot",
    "chan-nuoi",
    "an-tang"
   ],
   "ky": [
    "san-ban",
    "danh-ca"
   ],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上冊進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "栽種",
    "牧養",
    "納畜",
    "安葬"
   ],
   "kyHan": [
    "畋獵",
    "取魚"
   ],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上冊進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶般移解除求醫療病裁製營建宫室繕城郭興造動土豎柱上梁修倉庫栽種牧養納畜安葬",
    "忌畋獵取魚"
   ],
   "binhLuan": "按天德月德乃月建三合旺氣天德合月德合與旺氣作五合皆上吉之日故所宜應如此忌畋獵取魚者恐傷生氣也舊本天德止宜興土工營宮室繕城郭月德并宜上官宴樂天德合宜祭祀祈福覃恩肆赦緩刑獄選將訓兵月德合並宜上册進表章營建宮室殊於名義不合明原引五行論則曰月德合日百福並集又不及天月二德及天德合可見其為畧舉大意而非有義例也夫王者事神行政慶賞刑威與夫分職設官體國經野以及宮室城郭衣服居處所以謀室家之安而錫兆庶之福者無非體天心而行時令故因義起例罄無不宜庶名與事允協矣"
  },
  {
   "ma": "nguyet-khong",
   "ten": "Nguyệt Không",
   "han": "月空",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-can",
    "bang": [
     [
      2
     ],
     [
      0
     ],
     [
      8
     ],
     [
      6
     ],
     [
      2
     ],
     [
      0
     ],
     [
      8
     ],
     [
      6
     ],
     [
      2
     ],
     [
      0
     ],
     [
      8
     ],
     [
      6
     ]
    ],
    "quyTac": "寅午戌月壬亥卯未月庚申子辰月丙巳酉丑月甲"
   },
   "nguon": {
    "quyen": 5,
    "trich": "厯例曰寅午戌月壬亥卯未月庚申子辰月丙巳酉丑月甲"
   },
   "nen": [
    "nop-don"
   ],
   "ky": [],
   "nenHan": [
    "上表章"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜上表章",
    "見義例"
   ]
  },
  {
   "ma": "thien-an",
   "ten": "Thiên Ân",
   "han": "天恩",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "ngay-canchi",
    "ds": [
     0,
     1,
     2,
     3,
     4,
     15,
     16,
     17,
     18,
     19,
     45,
     46,
     47,
     48,
     49
    ],
    "quyTac": "甲子乙丑丙寅丁卯戊辰己卯庚辰辛巳壬午癸未己酉庚戌辛亥壬子癸丑"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰常以甲子至戊辰巳卯至癸未巳酉至癸丑凡一十五日"
   },
   "nen": [
    "khen-thuong",
    "tiec-tung"
   ],
   "ky": [],
   "nenHan": [
    "覃恩",
    "肆赦",
    "施恩惠",
    "恤孤惸",
    "布政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜覃恩肆赦施恩惠恤孤惸布政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹",
    "與驛馬天馬建日併宜頒詔宣政事與修造吉神併尤宜興作"
   ],
   "binhLuan": "按舊本以天恩為上吉日而所宜止於覃恩慶賞等事葢其日止取一定之干支而不參諸月令其力輕㣲不得與德合赦願比也又按舊本謂天德嵗德月德天德合嵗德合月德合天恩天赦母倉所㑹之辰並宜修營㑹之云者則非專指天恩故曰與修造吉神併尤宜興作",
   "ghiChu": [
    "Sách ghi 甲子至戊辰、己卯至癸未、己酉至癸丑 凡一十五日; bảng ds liệt kê đủ 15 ngày đó."
   ]
  },
  {
   "ma": "thien-xa",
   "ten": "Thiên Xá",
   "han": "天赦",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      0
     ],
     [
      0
     ],
     [
      14
     ],
     [
      14
     ],
     [
      14
     ],
     [
      30
     ],
     [
      30
     ],
     [
      30
     ],
     [
      44
     ],
     [
      44
     ],
     [
      44
     ],
     [
      0
     ]
    ],
    "quyTac": "春戊寅夏甲午秋戊申冬甲子"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春戊寅夏甲午秋戊申冬甲子是也"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "trong-trot",
    "chan-nuoi",
    "an-tang"
   ],
   "ky": [
    "san-ban",
    "danh-ca"
   ],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "栽種",
    "牧養",
    "納畜",
    "安葬"
   ],
   "kyHan": [
    "畋獵",
    "取魚"
   ],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上册進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹行幸遣使安撫邊境選將訓兵上官赴任臨政親民結婚姻納采問名嫁娶般移解除求醫療病裁製營建宫室繕城郭興造動土豎柱上梁修倉庫栽種牧養納畜安葬忌畋獵取魚"
   ],
   "binhLuan": "按天赦為天地合德又為四時旺辰其力甚大故所宜與二德同舊本止宜覃恩肆赦緩刑獄特顧名而未思義耳不用以出師與忌畋獵取魚同意"
  },
  {
   "ma": "thien-nguyen",
   "ten": "Thiên Nguyện",
   "han": "天願",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      49
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      21
     ],
     [
      32
     ],
     [
      43
     ],
     [
      54
     ],
     [
      5
     ],
     [
      16
     ],
     [
      27
     ],
     [
      38
     ]
    ],
    "quyTac": "正月乙亥二月甲戌三月乙酉四月丙申五月丁未六月戊午七月己巳八月庚辰九月辛卯十月壬寅十一月癸丑十二月甲子"
   },
   "nguon": {
    "quyen": 5,
    "trich": "起例曰正月乙亥二月甲戌三月乙酉四月丙申五月丁未六月戊午七月己巳八月庚辰九月辛卯十月壬寅十一月癸丑十二月甲子"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "cat-may",
    "xay-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "trong-trot",
    "chan-nuoi",
    "an-tang"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "裁製",
    "營建宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "栽種",
    "牧養",
    "納畜",
    "安葬"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上册進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹行幸遣使安撫邊境選將訓兵上官赴任臨政親民結婚姻納采問名嫁娶進人口般移裁製營建宮室繕城郭興造動土豎柱上梁修倉庫經絡醞釀開市立劵交易納財栽種牧養納畜安葬"
   ],
   "binhLuan": "按天願為太陽加令星其吉最大故所宜與二德同不用以出師者兵隂象兵吉在太陽後四辰不用太陽日也宜葬事則專取太陽日也不用以解除療病者療解無取合義也何以取二德合彼乃德之合氣非兩相合也又按二德乃三合之全氣發于天干德合為其合氣天赦天願皆合干支取義其氣純其力大乃日之最吉者能解諸凶故特表之舊本謂天願宜納財敦睦親族葢其例二十四字已誤十三宜乎失其義也",
   "ghiChu": [
    "Dùng bảng 起例 đã đính chính của Hiệp kỷ (正月乙亥…十二月甲子); bảng 歴例 cũ (正月甲午…) sách nói chép sai 13/24 chữ (傳寫謬誤二十四字中誤十三字). Q10 cũng dẫn 正月乙亥, 五月丁未, 十一月癸丑 làm Thiên Nguyện."
   ]
  },
  {
   "ma": "nguyet-an",
   "ten": "Nguyệt Ân",
   "han": "月恩",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-can",
    "bang": [
     [
      0
     ],
     [
      7
     ],
     [
      2
     ],
     [
      3
     ],
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      6
     ],
     [
      1
     ]
    ],
    "quyTac": "正月丙二月丁三月庚四月巳五月戊六月辛七月壬八月癸九月庚十月乙十一月甲十二月辛"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰月恩者正月丙二月丁三月庚四月巳五月戊六月辛七月壬八月癸九月庚十月乙十一月甲十二月辛"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "nhan-tien",
    "xuat-kho",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "施恩封拜",
    "舉正直",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "納財",
    "開倉庫出貨財",
    "栽種",
    "牧養"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福求嗣施恩封拜舉正直慶賜賞賀宴㑹行幸遣使上官赴任臨政親民結婚姻納采問名般移解除求醫療病裁製修宮室繕城郭興造動土豎柱上梁納財開倉庫出貨財栽種牧養",
    "與驛馬天馬併宜詔命公卿招賢"
   ],
   "binhLuan": "按月恩四相時德皆月建所生之日所宜應同舊本月恩宜祭祀上官赴任結婚姻般移修造動土納財四相宜行幸遣使般移繕城郭修造動土栽種牧養時德宜施恩封拜慶賜賞賀宴㑹其義不倫今按月建所生為相氣其吉大於母倉我生為子孫其吉顯於福德觀其㑹通而推其義例故所宜應如此"
  },
  {
   "ma": "tu-tuong",
   "ten": "Tứ Tướng",
   "han": "四相",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-can",
    "bang": [
     [
      0,
      1
     ],
     [
      0,
      1
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      4,
      5
     ],
     [
      4,
      5
     ],
     [
      4,
      5
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      0,
      1
     ]
    ],
    "quyTac": "春丙丁夏戊巳秋壬癸冬甲乙"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春丙丁夏戊巳秋壬癸冬甲乙"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "nhan-tien",
    "xuat-kho",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "施恩封拜",
    "舉正直",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "納財",
    "開倉庫出貨財",
    "栽種",
    "牧養"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福求嗣施恩封拜舉正直慶賜賞賀宴㑹行幸遣使上官赴任臨政親民結婚姻納采問名般移解除求醫療病裁製修宮室繕城郭興造動土豎柱上梁納財開倉庫出貨財栽種牧養",
    "與驛馬天馬併宜詔命公卿招賢"
   ],
   "binhLuan": "按月恩四相時德皆月建所生之日所宜應同舊本月恩宜祭祀上官赴任結婚姻般移修造動土納財四相宜行幸遣使般移繕城郭修造動土栽種牧養時德宜施恩封拜慶賜賞賀宴㑹其義不倫今按月建所生為相氣其吉大於母倉我生為子孫其吉顯於福德觀其㑹通而推其義例故所宜應如此"
  },
  {
   "ma": "thoi-duc",
   "ten": "Thời Đức",
   "han": "時德",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2
     ],
     [
      2
     ],
     [
      6
     ],
     [
      6
     ],
     [
      6
     ],
     [
      4
     ],
     [
      4
     ],
     [
      4
     ],
     [
      0
     ],
     [
      0
     ],
     [
      0
     ],
     [
      2
     ]
    ],
    "quyTac": "春午夏辰秋子冬寅"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春午夏辰秋子冬寅"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "nhan-tien",
    "xuat-kho",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "施恩封拜",
    "舉正直",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "納財",
    "開倉庫出貨財",
    "栽種",
    "牧養"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福求嗣施恩封拜舉正直慶賜賞賀宴㑹行幸遣使上官赴任臨政親民結婚姻納采問名般移解除求醫療病裁製修宮室繕城郭興造動土豎柱上梁納財開倉庫出貨財栽種牧養",
    "與驛馬天馬併宜詔命公卿招賢"
   ],
   "binhLuan": "按月恩四相時德皆月建所生之日所宜應同舊本月恩宜祭祀上官赴任結婚姻般移修造動土納財四相宜行幸遣使般移繕城郭修造動土栽種牧養時德宜施恩封拜慶賜賞賀宴㑹其義不倫今按月建所生為相氣其吉大於母倉我生為子孫其吉顯於福德觀其㑹通而推其義例故所宜應如此"
  },
  {
   "ma": "vuong-nhat",
   "ten": "Vương Nhật",
   "han": "王日",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      11
     ],
     [
      11
     ],
     [
      2
     ],
     [
      2
     ],
     [
      2
     ],
     [
      5
     ],
     [
      5
     ],
     [
      5
     ],
     [
      8
     ],
     [
      8
     ],
     [
      8
     ],
     [
      11
     ]
    ],
    "quyTac": "春寅夏巳秋申冬亥"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰王日者春寅夏巳秋申冬亥官日者春卯夏午秋酉冬子"
   },
   "nen": [
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "cat-may"
   ],
   "ky": [],
   "nenHan": [
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "上官赴任",
    "臨政親民",
    "裁製"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹行幸遣使安撫邊境選將訓兵上官赴任臨政親民裁製"
   ],
   "ghiChu": [
    "[I→V] Nguyên chú 歴例 ghi '今易為官日' (đời sau đổi Vương/Quan cho nhau); Hiệp kỷ bàn '細繹其理不如舊說為高' và giữ Vương Nhật = Dần Tỵ Thân Hợi (lâm quan), Q10 cũng nói 王日為臨官之辰. Theo Hiệp kỷ."
   ]
  },
  {
   "ma": "quan-nhat",
   "ten": "Quan Nhật",
   "han": "官日",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      0
     ],
     [
      0
     ],
     [
      3
     ],
     [
      3
     ],
     [
      3
     ],
     [
      6
     ],
     [
      6
     ],
     [
      6
     ],
     [
      9
     ],
     [
      9
     ],
     [
      9
     ],
     [
      0
     ]
    ],
    "quyTac": "春卯夏午秋酉冬子"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰王日者春寅夏巳秋申冬亥官日者春卯夏午秋酉冬子"
   },
   "nen": [
    "bo-nhiem",
    "nhan-chuc"
   ],
   "ky": [],
   "nenHan": [
    "襲爵受封",
    "上官赴任",
    "臨政親民"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜襲爵受封上官赴任臨政親民",
    "守日又宜安撫邊境"
   ]
  },
  {
   "ma": "thu-nhat",
   "ten": "Thủ Nhật",
   "han": "守日",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      1
     ],
     [
      1
     ],
     [
      4
     ],
     [
      4
     ],
     [
      4
     ],
     [
      7
     ],
     [
      7
     ],
     [
      7
     ],
     [
      10
     ],
     [
      10
     ],
     [
      10
     ],
     [
      1
     ]
    ],
    "quyTac": "春辰夏未秋戌冬丑"
   },
   "nguon": {
    "quyen": 5,
    "trich": "又按歴例以春酉夏子秋卯冬午為守日以春辰夏未秋戌冬丑為牢日邵泰衢作歴神原始謂守與牢二字相近而訛易之則吉凶各以類聚且與五勝義恰符甚為有理今從之"
   },
   "nen": [
    "bo-nhiem",
    "nhan-chuc"
   ],
   "ky": [],
   "nenHan": [
    "襲爵受封",
    "上官赴任",
    "臨政親民"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜襲爵受封上官赴任臨政親民",
    "守日又宜安撫邊境"
   ],
   "ghiChu": [
    "[I→V] 歴例 ghi Thủ Nhật = 春酉夏子秋卯冬午, nhưng Hiệp kỷ theo Thiệu Thái Cù cho rằng 守/牢 chép lẫn, đổi thành 春辰夏未秋戌冬丑 (今從之); Q10: 守日為四時旺土. Theo Hiệp kỷ."
   ]
  },
  {
   "ma": "tuong-nhat",
   "ten": "Tướng Nhật",
   "han": "相日",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2
     ],
     [
      2
     ],
     [
      5
     ],
     [
      5
     ],
     [
      5
     ],
     [
      8
     ],
     [
      8
     ],
     [
      8
     ],
     [
      11
     ],
     [
      11
     ],
     [
      11
     ],
     [
      2
     ]
    ],
    "quyTac": "春巳夏申秋亥冬寅"
   },
   "nguon": {
    "quyen": 5,
    "trich": "相日者春巳夏申秋亥冬寅"
   },
   "nen": [
    "bo-nhiem",
    "nhan-chuc"
   ],
   "ky": [],
   "nenHan": [
    "襲爵受封",
    "上官赴任",
    "臨政親民"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜襲爵受封上官赴任臨政親民",
    "守日又宜安撫邊境"
   ]
  },
  {
   "ma": "dan-nhat",
   "ten": "Dân Nhật",
   "han": "民日",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      3
     ],
     [
      3
     ],
     [
      6
     ],
     [
      6
     ],
     [
      6
     ],
     [
      9
     ],
     [
      9
     ],
     [
      9
     ],
     [
      0
     ],
     [
      0
     ],
     [
      0
     ],
     [
      3
     ]
    ],
    "quyTac": "春午夏酉秋子冬卯"
   },
   "nguon": {
    "quyen": 5,
    "trich": "民日者春午夏酉秋子冬卯"
   },
   "nen": [
    "tiec-tung",
    "dam-hoi",
    "nhan-nguoi",
    "nhap-trach",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "宴會",
    "結婚姻",
    "納采問名",
    "進人口",
    "般移",
    "開市",
    "立券交易",
    "納財",
    "栽種",
    "牧養",
    "納畜"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜宴㑹結婚姻納采問名進人口般移開市立劵交易納財栽種牧養納畜"
   ],
   "binhLuan": "按壇經專以此五日為命將登壇拜爵上官之吉日通書止宜施恩封拜上官赴任臨政親民今以義推之則五日所宜應各不同王日為臨官之辰其吉大於月建又居四時之首其吉不減天恩故所宜應如此不用以出師者不欲從我始也官日守日相日舊説可從襲爵受封義同封拜在臣下宜云爾也守日為四時旺土安撫邊境則守土所宜急者民日為令星所生所宜應同時德然既以民日名則上官等事義當另有取也"
  },
  {
   "ma": "tam-hop",
   "ten": "Tam Hợp",
   "han": "三合",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      4,
      8
     ],
     [
      5,
      9
     ],
     [
      6,
      10
     ],
     [
      7,
      11
     ],
     [
      0,
      8
     ],
     [
      1,
      9
     ],
     [
      2,
      10
     ],
     [
      3,
      11
     ],
     [
      0,
      4
     ],
     [
      1,
      5
     ],
     [
      2,
      6
     ],
     [
      3,
      7
     ]
    ],
    "quyTac": "正月在午戌二月在未亥三月在子申四月在丑酉五月在寅戌六月在夘亥七月在子辰八月在丑巳九月在寅午十月在夘未十一月在辰申十二月在巳酉"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月在午戌二月在未亥三月在子申四月在丑酉五月在寅戌六月在夘亥七月在子辰八月在丑巳九月在寅午十月在夘未十一月在辰申十二月在丑巳"
   },
   "nen": [
    "khen-thuong",
    "tiec-tung",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "cat-may",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "det-may",
    "nau-ruou",
    "ky-ket",
    "nhan-tien",
    "lap-may",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "慶賜賞賀",
    "宴會",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "裁製",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "經絡",
    "醞釀",
    "立券交易",
    "納財",
    "安碓磑",
    "納畜"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜慶賜賞賀宴㑹結婚姻納采問名嫁娶進人口裁製修宮室繕城郭興造動土豎柱上梁修倉庫經絡醞釀立劵交易納財安碓磑納畜",
    "又辰戌丑未日為三合墓庫所宜如前寅申巳亥日為三合長生所宜並同母倉子午卯酉日為三合帝旺所宜並同王日"
   ],
   "binhLuan": "按日之吉者莫如三合天月二德皆從三合取義成定之吉亦由三合生也然三合皆吉而大小不同建為局始定為局中成為局終三合從建取故三合止有二日建在四生日者則三合一為旺一為墓建在四旺日者則三合一為墓一為生建在四墓日者則三合一為生一為旺其為墓日者則取三合之吉足矣其為生旺日者則土旺之吉當并取也故區而别之又三合即成定日而取義各有不同故分屬各條之下若義有兼取者則又不嫌其并見也",
   "ghiChu": [
    "[I] Nguyên văn 歴例 ghi 十二月在丑巳 (tháng Sửu không thể tam hợp với Sửu); theo 考原 '各與其月建㑹成三合局' nên sửa thành 巳酉. Bảng tính theo quy tắc tam hợp."
   ]
  },
  {
   "ma": "lam-nhat",
   "ten": "Lâm Nhật",
   "han": "臨日",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      4
     ],
     [
      9
     ],
     [
      6
     ],
     [
      11
     ],
     [
      8
     ],
     [
      1
     ],
     [
      10
     ],
     [
      3
     ],
     [
      0
     ],
     [
      5
     ],
     [
      2
     ],
     [
      7
     ]
    ],
    "quyTac": "正月午二月亥三月申四月丑五月戌六月夘七月子八月巳九月寅十月未十一月辰十二月酉"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰臨日者正月午二月亥三月申四月丑五月戌六月夘七月子八月巳九月寅十月未十一月辰十二月酉"
   },
   "nen": [
    "nop-don",
    "nhan-chuc",
    "kien-tung"
   ],
   "ky": [],
   "nenHan": [
    "上册進表章",
    "上官赴任",
    "臨政親民",
    "陳詞訟"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜上册進表章上官赴任臨政親民陳詞訟",
    "見義例"
   ]
  },
  {
   "ma": "dich-ma",
   "ten": "Dịch Mã",
   "han": "驛馬",
   "loai": "cát",
   "tenKhac": [
    "天后"
   ],
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ]
    ],
    "quyTac": "正月起申逆行四孟"
   },
   "nguon": {
    "quyen": 6,
    "trich": "李鼎祚曰驛馬者正月起申逆行四孟"
   },
   "nen": [
    "xuat-hanh",
    "nhap-trach"
   ],
   "ky": [],
   "nenHan": [
    "行幸遣使",
    "般移"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜行幸遣使般移",
    "與天恩併宜頒詔宣政事與月恩四相時德併宜詔命公卿招賢",
    "又為天后宜求醫療病"
   ],
   "binhLuan": "按驛馬天馬皆第取行遠之義舊本謂驛馬宜封拜官爵詔命公卿出行赴任移徙天馬宜頒詔封拜招賢宣政事遠行出征則失其義矣今以其日止宜行幸遣使般移與覃恩吉日併而後宜頒詔與封拜舉正直吉日併而後宜詔命公卿招賢與布政事吉日併而後宜宣政事庶為允協天后見義例"
  },
  {
   "ma": "thien-hau",
   "ten": "Thiên Hậu",
   "han": "天后",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ]
    ],
    "quyTac": "天后與驛馬同位"
   },
   "nguon": {
    "quyen": 6,
    "trich": "總要歴曰天后者月中福神也其日宜求醫療病祈福禮神"
   },
   "nen": [
    "chua-benh"
   ],
   "ky": [],
   "nenHan": [
    "求醫療病"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜行幸遣使般移",
    "與天恩併宜頒詔宣政事與月恩四相時德併宜詔命公卿招賢",
    "又為天后宜求醫療病"
   ],
   "binhLuan": "按驛馬天馬皆第取行遠之義舊本謂驛馬宜封拜官爵詔命公卿出行赴任移徙天馬宜頒詔封拜招賢宣政事遠行出征則失其義矣今以其日止宜行幸遣使般移與覃恩吉日併而後宜頒詔與封拜舉正直吉日併而後宜詔命公卿招賢與布政事吉日併而後宜宣政事庶為允協天后見義例"
  },
  {
   "ma": "thien-ma",
   "ten": "Thiên Mã",
   "han": "天馬",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ]
    ],
    "quyTac": "正月起午順行六陽辰"
   },
   "nguon": {
    "quyen": 6,
    "trich": "李鼎祚曰天馬者正月起午順行六陽辰"
   },
   "nen": [
    "xuat-hanh",
    "nhap-trach"
   ],
   "ky": [],
   "nenHan": [
    "行幸遣使",
    "般移"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜行幸遣使般移",
    "與天恩併宜頒詔宣政事與月恩四相時德併宜詔命公卿招賢",
    "義見驛馬"
   ]
  },
  {
   "ma": "thien-hy",
   "ten": "Thiên Hỷ",
   "han": "天喜",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Thành",
    "bang": [
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "選擇宗鏡曰天喜者正月戌二月亥三月子四月丑順輪十二月乃日支與月建三合故曰天喜"
   },
   "nen": [
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga"
   ],
   "ky": [],
   "nenHan": [
    "施恩封拜",
    "舉正直",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜入學安撫邊境般移築隄防開市",
    "又為天喜宜施恩封拜舉正直慶賜賞賀宴㑹行幸遣使上官赴任臨政親民結婚姻納采問名嫁娶五月與天馬併宜詔命公卿招賢",
    "乂為天醫宜求醫療病"
   ],
   "binhLuan": "按成為合局之終開為生氣之始故其日宜入學原始要終之義也宜安撫邊境者功成而永奠也般移築隄防開市皆取成義天喜舊宜封拜自宜上官義同建日"
  },
  {
   "ma": "thien-y",
   "ten": "Thiên Y",
   "han": "天醫",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Thành",
    "bang": [
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰天醫者正月起戌順行十二辰"
   },
   "nen": [
    "chua-benh"
   ],
   "ky": [],
   "nenHan": [
    "求醫療病"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜入學安撫邊境般移築隄防開市",
    "又為天喜宜施恩封拜舉正直慶賜賞賀宴㑹行幸遣使上官赴任臨政親民結婚姻納采問名嫁娶五月與天馬併宜詔命公卿招賢",
    "乂為天醫宜求醫療病"
   ],
   "binhLuan": "按成為合局之終開為生氣之始故其日宜入學原始要終之義也宜安撫邊境者功成而永奠也般移築隄防開市皆取成義天喜舊宜封拜自宜上官義同建日"
  },
  {
   "ma": "luc-hop",
   "ten": "Lục Hợp",
   "han": "六合",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      1
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ],
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      3
     ],
     [
      2
     ]
    ],
    "quyTac": "正月在亥逆行十二辰"
   },
   "nguon": {
    "quyen": 6,
    "trich": "李鼎祚曰正月在亥逆行十二辰"
   },
   "nen": [
    "tiec-tung",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "det-may",
    "nau-ruou",
    "ky-ket",
    "nhan-tien",
    "chan-nuoi",
    "an-tang"
   ],
   "ky": [],
   "nenHan": [
    "宴會",
    "結婚姻",
    "嫁娶",
    "進人口",
    "經絡",
    "醞釀",
    "立券交易",
    "納財",
    "納畜",
    "安葬"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜宴㑹結婚姻嫁娶進人口經絡醞釀立劵交易納財納畜安葬",
    "與月恩四相時德併宜修倉庫"
   ],
   "binhLuan": "按六合之吉不減三合舊本止宜宴㑹結婚姻立劵交易今以義推之所宜當如此宜葬事見天願宜修倉庫見收日"
  },
  {
   "ma": "ngu-phu",
   "ten": "Ngũ Phú",
   "han": "五富",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      5
     ],
     [
      8
     ],
     [
      11
     ],
     [
      2
     ],
     [
      5
     ],
     [
      8
     ],
     [
      11
     ],
     [
      2
     ],
     [
      5
     ],
     [
      8
     ],
     [
      11
     ],
     [
      2
     ]
    ],
    "quyTac": "正月起亥順行四孟"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月起亥順行四孟"
   },
   "nen": [
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "栽種",
    "牧養",
    "納畜"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜經絡醞釀開市立劵交易納財開倉庫出貨財栽種牧養納畜",
    "與月恩四相時德併宜修倉庫",
    "舊本止宜開市開倉庫納財今按其日有生義又有合義故所宜當如此"
   ]
  },
  {
   "ma": "thien-thuong",
   "ten": "Thiên Thương",
   "han": "天倉",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      4
     ],
     [
      3
     ],
     [
      2
     ],
     [
      1
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ],
     [
      6
     ],
     [
      5
     ]
    ],
    "quyTac": "正月起寅逆行十二辰"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰天倉者正月起寅逆行十二辰"
   },
   "nen": [
    "nhan-nguoi",
    "nhan-tien",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "進人口",
    "納財",
    "納畜"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜進人口納財納畜",
    "與月恩四相開日併宜修倉庫",
    "義同收日然因合而名倉故不用以捕捉"
   ]
  },
  {
   "ma": "bat-tuong",
   "ten": "Bất Tướng (Âm dương bất tướng)",
   "han": "不將",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      38,
      28,
      37,
      27,
      17,
      26,
      16,
      25,
      15,
      5,
      13,
      3,
      53
     ],
     [
      37,
      27,
      36,
      26,
      16,
      25,
      15,
      13,
      3,
      12,
      2,
      52
     ],
     [
      47,
      37,
      27,
      36,
      26,
      35,
      25,
      15,
      23,
      13,
      3,
      12,
      2
     ],
     [
      46,
      36,
      26,
      35,
      25,
      23,
      13,
      22,
      12,
      2,
      11,
      1
     ],
     [
      45,
      35,
      25,
      33,
      23,
      13,
      22,
      12,
      21,
      11,
      1,
      10,
      0
     ],
     [
      33,
      23,
      32,
      22,
      12,
      21,
      11,
      20,
      10,
      0,
      44,
      34,
      24
     ],
     [
      32,
      22,
      31,
      21,
      11,
      20,
      10,
      44,
      34,
      19,
      9,
      59
     ],
     [
      31,
      21,
      30,
      20,
      10,
      54,
      44,
      34,
      19,
      9,
      18,
      8,
      58
     ],
     [
      41,
      31,
      21,
      30,
      20,
      54,
      44,
      29,
      19,
      9,
      18,
      8
     ],
     [
      40,
      30,
      20,
      4,
      54,
      44,
      29,
      19,
      28,
      18,
      8,
      17,
      7
     ],
     [
      4,
      54,
      39,
      29,
      19,
      28,
      18,
      27,
      17,
      7,
      16,
      6
     ],
     [
      39,
      29,
      38,
      28,
      18,
      27,
      17,
      26,
      16,
      6,
      15,
      5
     ]
    ],
    "quyTac": "正月辛亥辛丑辛夘庚子庚寅己亥己丑己夘丁亥丁丑丁夘丙子丙寅二月庚戌庚子庚寅己亥己丑丁亥丁丑丙戌丙子丙寅乙亥乙丑三月己酉己亥己丑丁酉丁亥丁丑丙戌丙子乙酉乙亥乙丑甲戌甲子四月丁酉丁亥丙申丙戌丙子乙酉乙亥甲申甲戌甲子戊申戊戌戊子五月丙申丙戌乙未乙酉乙亥甲申甲戌戊申戊戌癸未癸酉癸亥六月乙未乙酉甲午甲申甲戌戊午戊申戊戌癸未癸酉壬午壬申壬戌七月乙巳乙未乙酉甲午甲申戊午戊申癸巳癸未癸酉壬午壬申八月甲辰甲午甲申戊辰戊午戊申癸己癸未壬辰壬午壬申辛巳辛未九月戊辰戊午癸夘癸巳癸未壬辰壬午辛夘辛巳辛未庚辰庚午十月癸夘癸巳壬寅壬辰壬午辛夘辛巳庚寅庚辰庚午己夘己巳十一月壬寅壬辰辛丑辛夘辛巳庚寅庚辰己丑己夘己巳丁丑丁夘丁巳十二月辛丑辛夘庚子庚寅庚辰己丑己夘丁丑丁夘丙子丙寅丙辰"
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰隂陽不將者正月辛亥辛丑辛夘庚子庚寅己亥己丑己夘丁亥丁丑丁夘丙子丙寅二月庚戌庚子庚寅己亥己丑丁亥丁丑丙戌丙子丙寅乙亥乙丑三月己酉己亥己丑丁酉丁亥丁丑丙戌丙子乙酉乙亥乙丑甲戌甲子四月丁酉丁亥丙申丙戌丙子乙酉乙亥甲申甲戌甲子戊申戊戌戊子五月丙申丙戌乙未乙酉乙亥甲申甲戌戊申戊戌癸未癸酉癸亥六月乙未乙酉甲午甲申甲戌戊午戊申戊戌癸未癸酉壬午壬申壬戌七月乙巳乙未乙酉甲午甲申戊午戊申癸巳癸未癸酉壬午壬申八月甲辰甲午甲申戊辰戊午戊申癸己癸未壬辰壬午壬申辛巳辛未九月戊辰戊午癸夘癸巳癸未壬辰壬午辛夘辛巳辛未庚辰庚午十月癸夘癸巳壬寅壬辰壬午辛夘辛巳庚寅庚辰庚午己夘己巳十一月壬寅壬辰辛丑辛夘辛巳庚寅庚辰己丑己夘己巳丁丑丁夘丁巳十二月辛丑辛夘庚子庚寅庚辰己丑己夘丁丑丁夘丙子丙寅丙辰"
   },
   "nen": [
    "cuoi-ga"
   ],
   "ky": [],
   "nenHan": [
    "嫁娶"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜嫁娶",
    "見義例"
   ]
  },
  {
   "ma": "yeu-an",
   "ten": "Yếu An",
   "han": "要安",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      7
     ],
     [
      1
     ],
     [
      2
     ],
     [
      8
     ],
     [
      3
     ],
     [
      9
     ],
     [
      4
     ],
     [
      10
     ],
     [
      5
     ],
     [
      11
     ],
     [
      6
     ],
     [
      0
     ]
    ],
    "quyTac": "正月寅二月申三月夘四月酉五月辰六月戌七月巳八月亥九月午十月子十一月未十二月丑"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰要安者正月寅二月申三月夘四月酉五月辰六月戌七月巳八月亥九月午十月子十一月未十二月丑也"
   },
   "nen": [
    "an-than"
   ],
   "ky": [],
   "nenHan": [
    "安神"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜安神"
   ]
  },
  {
   "ma": "ngoc-vu",
   "ten": "Ngọc Vũ",
   "han": "玉宇",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      8
     ],
     [
      2
     ],
     [
      3
     ],
     [
      9
     ],
     [
      4
     ],
     [
      10
     ],
     [
      5
     ],
     [
      11
     ],
     [
      6
     ],
     [
      0
     ],
     [
      7
     ],
     [
      1
     ]
    ],
    "quyTac": "正月夘二月酉三月辰四月戌五月巳六月亥七月午八月子九月未十月丑十一月申十二月寅"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月夘二月酉三月辰四月戌五月巳六月亥七月午八月子九月未十月丑十一月申十二月寅"
   },
   "nen": [
    "sua-nha-tho"
   ],
   "ky": [],
   "nenHan": [
    "修祠宇"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜修祠宇"
   ]
  },
  {
   "ma": "kim-duong",
   "ten": "Kim Đường",
   "han": "金堂",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      9
     ],
     [
      3
     ],
     [
      4
     ],
     [
      10
     ],
     [
      5
     ],
     [
      11
     ],
     [
      6
     ],
     [
      0
     ],
     [
      7
     ],
     [
      1
     ],
     [
      8
     ],
     [
      2
     ]
    ],
    "quyTac": "正月辰二月戌三月巳四月亥五月午六月子七月未八月丑九月申十月寅十一月酉十二月夘"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月辰二月戌三月巳四月亥五月午六月子七月未八月丑九月申十月寅十一月酉十二月夘"
   },
   "nen": [
    "sua-nha-tho"
   ],
   "ky": [],
   "nenHan": [
    "修祠宇"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜修祠宇"
   ]
  },
  {
   "ma": "kinh-an",
   "ten": "Kính An",
   "han": "敬安",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      0
     ],
     [
      6
     ],
     [
      7
     ],
     [
      1
     ],
     [
      8
     ],
     [
      2
     ],
     [
      9
     ],
     [
      3
     ],
     [
      10
     ],
     [
      4
     ],
     [
      11
     ],
     [
      5
     ]
    ],
    "quyTac": "正月未二月丑三月申四月寅五月酉六月夘七月戌八月辰九月亥十月巳十一月子十二月午"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰敬安者正月未二月丑三月申四月寅五月酉六月夘七月戌八月辰九月亥十月巳十一月子十二月午"
   },
   "nen": [
    "an-than"
   ],
   "ky": [],
   "nenHan": [
    "安神"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜安神"
   ]
  },
  {
   "ma": "pho-ho",
   "ten": "Phổ Hộ",
   "han": "普護",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      1
     ],
     [
      7
     ],
     [
      8
     ],
     [
      2
     ],
     [
      9
     ],
     [
      3
     ],
     [
      10
     ],
     [
      4
     ],
     [
      11
     ],
     [
      5
     ],
     [
      0
     ],
     [
      6
     ]
    ],
    "quyTac": "正月申二月寅三月酉四月夘五月戌六月辰七月亥八月巳九月子十月午十一月丑十二月未"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰普䕶者正月申二月寅三月酉四月夘五月戌六月辰七月亥八月巳九月子十月午十一月丑十二月未"
   },
   "nen": [
    "te-le",
    "cau-phuc"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福"
   ]
  },
  {
   "ma": "phuc-sinh",
   "ten": "Phúc Sinh",
   "han": "福生",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2
     ],
     [
      8
     ],
     [
      9
     ],
     [
      3
     ],
     [
      10
     ],
     [
      4
     ],
     [
      11
     ],
     [
      5
     ],
     [
      0
     ],
     [
      6
     ],
     [
      1
     ],
     [
      7
     ]
    ],
    "quyTac": "正月酉二月夘三月戌四月辰五月亥六月巳七月子八月午九月丑十月未十一月寅十二月申"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰福生者正月酉二月夘三月戌四月辰五月亥六月巳七月子八月午九月丑十月未十一月寅十二月申"
   },
   "nen": [
    "te-le",
    "cau-phuc"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福"
   ]
  },
  {
   "ma": "thanh-tam",
   "ten": "Thánh Tâm",
   "han": "聖心",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      4
     ],
     [
      10
     ],
     [
      11
     ],
     [
      5
     ],
     [
      0
     ],
     [
      6
     ],
     [
      1
     ],
     [
      7
     ],
     [
      2
     ],
     [
      8
     ],
     [
      3
     ],
     [
      9
     ]
    ],
    "quyTac": "正月亥二月巳三月子四月午五月丑六月未七月寅八月申九月夘十月酉十一月辰十二月戌"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰聖心者正月亥二月巳三月子四月午五月丑六月未七月寅八月申九月夘十月酉十一月辰十二月戌"
   },
   "nen": [
    "te-le",
    "cau-phuc"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福"
   ]
  },
  {
   "ma": "ich-hau",
   "ten": "Ích Hậu",
   "han": "益後",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      5
     ],
     [
      11
     ],
     [
      0
     ],
     [
      6
     ],
     [
      1
     ],
     [
      7
     ],
     [
      2
     ],
     [
      8
     ],
     [
      3
     ],
     [
      9
     ],
     [
      4
     ],
     [
      10
     ]
    ],
    "quyTac": "正月子二月午三月丑四月未五月寅六月申七月夘八月酉九月辰十月戌十一月巳十二月亥"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月子二月午三月丑四月未五月寅六月申七月夘八月酉九月辰十月戌十一月巳十二月亥"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福求嗣",
    "九神所宜見義例"
   ]
  },
  {
   "ma": "tuc-the",
   "ten": "Tục Thế",
   "han": "續世",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      0
     ],
     [
      1
     ],
     [
      7
     ],
     [
      2
     ],
     [
      8
     ],
     [
      3
     ],
     [
      9
     ],
     [
      4
     ],
     [
      10
     ],
     [
      5
     ],
     [
      11
     ]
    ],
    "quyTac": "正月丑二月未三月寅四月申五月夘六月酉七月辰八月戌九月巳十月亥十一月午十二月子"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰續世者正月丑二月未三月寅四月申五月夘六月酉七月辰八月戌九月巳十月亥十一月午十二月子是也"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜祭祀祈福求嗣",
    "九神所宜見義例"
   ]
  },
  {
   "ma": "giai-than",
   "ten": "Giải Thần",
   "han": "解神",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      6
     ],
     [
      8
     ],
     [
      8
     ],
     [
      10
     ],
     [
      10
     ],
     [
      0
     ],
     [
      0
     ],
     [
      2
     ],
     [
      2
     ],
     [
      4
     ],
     [
      4
     ]
    ],
    "quyTac": "正二月申三四月戌五六月子七八月寅九十月辰十一十二月午"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰正二月申三四月戌五六月子七八月寅九十月辰十一月十二月午也"
   },
   "nen": [
    "nop-don",
    "kien-tung",
    "giai-tru",
    "tam-goi",
    "cat-toc",
    "chua-benh"
   ],
   "ky": [],
   "nenHan": [
    "上表章",
    "陳詞訟",
    "解除",
    "沐浴",
    "整容剃頭",
    "整手足甲",
    "求醫療病"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜上表章陳詞訟解除沐浴整容剃頭整手足甲求醫療病",
    "舊本止宜上表章陳詞訟解除今按沐浴以下等事皆解除類也况破日宜療病而解神吉於月破故並宜之"
   ]
  },
  {
   "ma": "tru-than",
   "ten": "Trừ Thần",
   "han": "除神",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ]
    ],
    "quyTac": "申酉"
   },
   "nguon": {
    "quyen": 5,
    "trich": "考原曰按通書以申酉日為除神與五合對衝之日也宜沐浴祓除災眚"
   },
   "nen": [
    "giai-tru",
    "tam-goi",
    "cat-toc",
    "chua-benh",
    "don-dep"
   ],
   "ky": [],
   "nenHan": [
    "解除",
    "沐浴",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "掃舍宇"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜解除沐浴整容剃頭整手足甲求醫療病掃舍宇",
    "義同除日"
   ]
  },
  {
   "ma": "ngu-hop",
   "ten": "Ngũ Hợp",
   "han": "五合",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ]
    ],
    "quyTac": "寅卯"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰五合者寅夘日也"
   },
   "nen": [
    "tiec-tung",
    "dam-hoi",
    "ky-ket"
   ],
   "ky": [],
   "nenHan": [
    "宴會",
    "結婚姻",
    "立券交易"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜宴㑹結婚姻立劵交易",
    "見義例"
   ]
  },
  {
   "ma": "duong-duc",
   "ten": "Dương Đức",
   "han": "陽德",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ]
    ],
    "quyTac": "正月起戌順行六陽辰"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月起戌順行六陽辰"
   },
   "nen": [],
   "ky": [],
   "nenHan": [
    "施恩惠",
    "恤孤惸",
    "行惠愛",
    "雪寃枉",
    "緩刑獄"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜施恩惠恤孤惸行惠愛雪寃枉緩刑獄"
   ],
   "binhLuan": "按陽德隂德為乾坤納甲取天地生成之義而以月配爻義不甚切舊本謂陽德宜結婚姻開市交易隂德宜舉正直行惠愛雪寃枉緩刑獄亦無義例可推今按天地之大德曰生則施恩行惠等事庶與名義相稱"
  },
  {
   "ma": "am-duc",
   "ten": "Âm Đức",
   "han": "陰德",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      1
     ],
     [
      11
     ],
     [
      9
     ],
     [
      7
     ],
     [
      5
     ],
     [
      3
     ],
     [
      1
     ],
     [
      11
     ],
     [
      9
     ],
     [
      7
     ],
     [
      5
     ],
     [
      3
     ]
    ],
    "quyTac": "正月起酉逆行六隂辰"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月起酉逆行六隂辰"
   },
   "nen": [],
   "ky": [],
   "nenHan": [
    "施恩惠",
    "恤孤惸",
    "行惠愛",
    "雪寃枉",
    "緩刑獄"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜施恩惠恤孤惸行惠愛雪寃枉緩刑獄"
   ],
   "binhLuan": "按陽德隂德為乾坤納甲取天地生成之義而以月配爻義不甚切舊本謂陽德宜結婚姻開市交易隂德宜舉正直行惠愛雪寃枉緩刑獄亦無義例可推今按天地之大德曰生則施恩行惠等事庶與名義相稱"
  },
  {
   "ma": "luc-nghi",
   "ten": "Lục Nghi",
   "han": "六儀",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      3
     ],
     [
      2
     ],
     [
      1
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ]
    ],
    "quyTac": "正月起辰逆行十二辰"
   },
   "nguon": {
    "quyen": 4,
    "trich": "神樞經曰六儀者月中吉神也所值之日宜牧養生財栽植樹木結親納禮視事臨官○厯例曰正月起辰逆行十二辰"
   },
   "nen": [
    "nhan-chuc"
   ],
   "ky": [],
   "nenHan": [
    "臨政親民"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜臨政親民",
    "見義例"
   ]
  },
  {
   "ma": "minh-phe",
   "ten": "Minh Phệ",
   "han": "鳴吠",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "ngay-canchi",
    "ds": [
     6,
     8,
     9,
     18,
     20,
     21,
     26,
     32,
     33,
     38,
     42,
     45,
     56,
     57
    ],
    "quyTac": "庚午壬申癸酉壬午甲申乙酉庚寅丙申丁酉壬寅丙午己酉庚申辛酉"
   },
   "nguon": {
    "quyen": 5,
    "trich": "鳴吠日者庚午壬申癸酉壬午甲申乙酉庚寅丙申丁酉壬寅丙午己酉庚申辛酉也"
   },
   "nen": [
    "dao-huyet",
    "an-tang"
   ],
   "ky": [],
   "nenHan": [
    "破土",
    "安葬"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜破土安葬"
   ]
  },
  {
   "ma": "minh-phe-doi",
   "ten": "Minh Phệ Đối",
   "han": "鳴吠對",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "ngay-canchi",
    "ds": [
     2,
     3,
     12,
     27,
     30,
     36,
     39,
     48,
     50,
     51
    ],
    "quyTac": "丙寅丁夘丙子辛夘甲午庚子癸夘壬子甲寅乙夘"
   },
   "nguon": {
    "quyen": 5,
    "trich": "鳴吠對日者丙寅丁夘丙子辛夘甲午庚子癸夘壬子甲寅乙夘也"
   },
   "nen": [
    "dao-huyet",
    "cai-tang"
   ],
   "ky": [],
   "nenHan": [
    "破土",
    "啓攢"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜破土啟攢",
    "見義例"
   ],
   "ghiChu": [
    "考原 nghi 甲午 phải là 甲子 (恐傳者有誤); giữ nguyên bảng sách."
   ]
  },
  {
   "ma": "mau-thuong",
   "ten": "Mẫu Thương",
   "han": "母倉",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      11,
      0
     ],
     [
      11,
      0
     ],
     [
      11,
      0
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      2,
      3
     ],
     [
      4,
      10,
      1,
      7
     ],
     [
      4,
      10,
      1,
      7
     ],
     [
      4,
      10,
      1,
      7
     ],
     [
      8,
      9
     ]
    ],
    "quyTac": "春亥子夏寅卯秋辰戌丑未冬申酉"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春亥子夏寅卯秋辰戌丑未冬申酉土王後巳午"
   },
   "nen": [
    "nhan-tien",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [],
   "nenHan": [
    "納財",
    "栽種",
    "牧養",
    "納畜"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜納財栽種牧養納畜",
    "與月恩四相開日併宜修倉庫"
   ],
   "binhLuan": "按舊本以母倉為上吉日而所宜止於納財栽種牧養納畜葢其日係四時休氣又不得與天恩比也又按母倉春月亥日吉子日次之夏月寅日吉卯日次之冬月申日吉酉日次之葢亥寅申皆令星之長生而子卯酉為令星之敗地也至秋月之辰戌丑未日土王後之己午日則衰旺各有不同是又不可以不辨",
   "ghiChu": [
    "[I] Sách thêm '土王後巳午' (18 ngày cuối mỗi mùa lấy Tỵ Ngọ); bảng theo tháng tiết chưa thể hiện phần này."
   ]
  },
  {
   "ma": "sinh-khi",
   "ten": "Sinh Khí",
   "han": "生氣",
   "loai": "cát",
   "tenKhac": [
    "時陽"
   ],
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Khai",
    "bang": [
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰生氣者常居月建後二辰"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "nhap-hoc",
    "xuat-hanh",
    "nhan-chuc",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "khai-truong",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [
    "chat-cay",
    "san-ban",
    "danh-ca",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "入學",
    "行幸遣使",
    "上官赴任",
    "臨政親民",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "開市",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "栽種",
    "牧養"
   ],
   "kyHan": [
    "伐木",
    "畋獵",
    "取魚",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上册進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹入學行幸遣使上官赴任臨政親民般移解除求醫療病裁製修宫室繕城郭興造動土豎柱上梁開市修置產室開渠穿井安碓磑栽種牧養",
    "忌伐木畋獵取魚破土安葬啓攢"
   ],
   "binhLuan": "按開日一陽始生故又為時陽又為生氣其日最吉舊本所宜無祭祀祈福求嗣覃恩拜官等事於義未偹故補之不及婚事者無合義也忌伐木漁獵者恐傷生氣也忌葬事從俗也",
   "ghiChu": [
    "Q11: 伐木, 畋獵, 取魚 忌生氣 — tức Sinh Khí có kỵ riêng; lấy dòng 忌 của mục 開日 (忌伐木畋獵取魚破土安葬啓攢) [I]."
   ]
  },
  {
   "ma": "thien-vu",
   "ten": "Thiên Vu",
   "han": "天巫",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Mãn",
    "bang": [
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "總要厯曰天巫者月中善神也所值之日宜合藥請醫祀鬼神求福願○厯例曰常居月建前二辰"
   },
   "nen": [
    "te-le",
    "cau-phuc"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "祈福"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜進人口裁製修倉庫經絡開市立劵交易納財開倉庫出貨財補垣塞穴",
    "又為天巫宜祭祀祈福",
    "又為福德宜上册進表章慶賜賞賀宴㑹修宮室繕城郭"
   ],
   "binhLuan": "按滿取豐豫之義故所宜如此天巫見義例福德義同時德具體而微故止宜上册數事舊本無宴㑹然未有宜慶賞而不宜宴㑹者又謂天巫宜療病與滿日所忌自相牴牾故刪"
  },
  {
   "ma": "phuc-duc",
   "ten": "Phúc Đức",
   "han": "福德",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Mãn",
    "bang": [
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰福德常居月建前二辰"
   },
   "nen": [
    "nop-don",
    "khen-thuong",
    "tiec-tung",
    "sua-nha",
    "xay-tuong-rao"
   ],
   "ky": [],
   "nenHan": [
    "上册進表章",
    "慶賜賞賀",
    "宴會",
    "修宮室",
    "繕城郭"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜進人口裁製修倉庫經絡開市立劵交易納財開倉庫出貨財補垣塞穴",
    "又為天巫宜祭祀祈福",
    "又為福德宜上册進表章慶賜賞賀宴㑹修宮室繕城郭"
   ],
   "binhLuan": "按滿取豐豫之義故所宜如此天巫見義例福德義同時德具體而微故止宜上册數事舊本無宴㑹然未有宜慶賞而不宜宴㑹者又謂天巫宜療病與滿日所忌自相牴牾故刪"
  },
  {
   "ma": "cat-ky",
   "ten": "Cát Kỳ",
   "han": "吉期",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Trừ",
    "bang": [
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "總要厯曰吉期者吉慶之神也所值之日宜出軍行師攻城寨興弔伐㑹親姻○厯例曰常居月建前一辰也"
   },
   "nen": [
    "bo-nhiem",
    "xuat-hanh",
    "nhan-chuc"
   ],
   "ky": [],
   "nenHan": [
    "施恩封拜",
    "舉正直",
    "行幸遣使",
    "上官赴任",
    "臨政親民"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜解除沐浴整容剃頭整手足甲求醫療病掃舍宇又為吉期宜施恩封拜舉正直行幸遣使上官赴任臨政親民",
    "十月與天馬併宜詔命公卿招賢",
    "又為兵寶宜安撫邊境選將訓兵出師"
   ],
   "binhLuan": "按舊本除日宜解除求醫療病掃舍宇取除義也沐浴等事亦除舊取新之義故并宜之吉期兵寶義取旺辰故所宜同建日舊謂吉期宜兵事葢兵寶之誤又謂宜結婚姻於義無取故刪"
  },
  {
   "ma": "thoi-am",
   "ten": "Thời Âm",
   "han": "時陰",
   "loai": "cát",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Định",
    "bang": [
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰常居月建前四辰○曹震圭曰時隂者"
   },
   "nen": [],
   "ky": [],
   "nenHan": [
    "運謀算畫計策"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜冠帶",
    "又為時隂宜運謀算畫計策"
   ],
   "binhLuan": "按定日為三合之中宜冠帶者既取其成局又取其方中而未昃之義也時隂舊宜睦子孫㑹親友於義不合故刪"
  },
  {
   "ma": "truc-kien",
   "ten": "Trực Kiến",
   "han": "建日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Kiến",
    "bang": [
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "bo-nhiem",
    "xuat-hanh",
    "nhan-chuc"
   ],
   "ky": [],
   "nenHan": [
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "行幸遣使",
    "上官赴任",
    "臨政親民"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜施恩封拜詔命公卿招賢舉正直行幸遣使上官赴任臨政親民",
    "與天恩併宜頒詔宣政事",
    "又為兵福宜安撫邊境選將訓兵出師"
   ],
   "binhLuan": "按建日與王官同義舊本止宜施恩封拜出行夫舉正直之與封拜遣使之與行幸事同一例故增之詔命公卿招賢頒詔宣政事義見驛馬上施則下受故并宜上官赴任臨政親民兵福見義例"
  },
  {
   "ma": "truc-tru",
   "ten": "Trực Trừ",
   "han": "除日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Trừ",
    "bang": [
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "giai-tru",
    "tam-goi",
    "cat-toc",
    "chua-benh",
    "don-dep"
   ],
   "ky": [],
   "nenHan": [
    "解除",
    "沐浴",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "掃舍宇"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜解除沐浴整容剃頭整手足甲求醫療病掃舍宇又為吉期宜施恩封拜舉正直行幸遣使上官赴任臨政親民",
    "十月與天馬併宜詔命公卿招賢",
    "又為兵寶宜安撫邊境選將訓兵出師"
   ],
   "binhLuan": "按舊本除日宜解除求醫療病掃舍宇取除義也沐浴等事亦除舊取新之義故并宜之吉期兵寶義取旺辰故所宜同建日舊謂吉期宜兵事葢兵寶之誤又謂宜結婚姻於義無取故刪"
  },
  {
   "ma": "truc-man",
   "ten": "Trực Mãn",
   "han": "滿日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Mãn",
    "bang": [
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "nhan-nguoi",
    "cat-may",
    "sua-kho",
    "det-may",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "bit-lo"
   ],
   "ky": [
    "bo-nhiem",
    "nhan-chuc",
    "dam-hoi",
    "chua-benh"
   ],
   "nenHan": [
    "進人口",
    "裁製",
    "修倉庫",
    "經絡",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "補垣塞穴"
   ],
   "kyHan": [
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "求醫療病"
   ],
   "trichNghiKy": [
    "宜進人口裁製修倉庫經絡開市立劵交易納財開倉庫出貨財補垣塞穴",
    "又為天巫宜祭祀祈福",
    "又為福德宜上册進表章慶賜賞賀宴㑹修宮室繕城郭",
    "忌施恩封拜詔命公卿招賢舉正直上官赴任臨政親民結婚姻納采問名求醫療病",
    "寅申月值守日子午夘酉月值相日與月德天德合月德合月恩四相併則不忌辰戌丑未月值災煞從災煞論己亥月值月厭從月厭論申月又為天狗忌祭祀與德合併猶忌"
   ],
   "binhLuan": "按滿取豐豫之義故所宜如此天巫見義例福德義同時德具體而微故止宜上册數事舊本無宴㑹然未有宜慶賞而不宜宴㑹者又謂天巫宜療病與滿日所忌自相牴牾故刪"
  },
  {
   "ma": "truc-binh",
   "ten": "Trực Bình",
   "han": "平日",
   "loai": "hung",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Bình",
    "bang": [
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "sua-tuong",
    "lam-duong"
   ],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [
    "修飾垣墻",
    "平治道塗"
   ],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "宜修飾垣墻平治道塗",
    "義取諸平",
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病裁製營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井栽種牧養納畜破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學沐浴整容剃頭整手足甲安碓磑補垣塞穴掃舍宇修飾垣墻平治道塗破屋壞垣伐木捕捉畋獵取魚",
    "又為死神忌安撫邊境選將訓兵出師進人口解除求醫療病修置產室栽種牧養納畜",
    "寅申巳亥月值相日亥月又值時德六合止忌安撫邊境選將訓兵出師求醫療病餘皆不忌申月值月害與天德月德合併亦止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德合併如常例寅巳月值月刑從月刑論子午夘酉月值天吏夘酉月與月德併午月與月德合併凡所忌者則不註宜所宜者亦不註忌不與徳合併如常例子月又值月刑從月刑論辰戌丑未月值月煞從月煞論"
   ]
  },
  {
   "ma": "truc-dinh",
   "ten": "Trực Định",
   "han": "定日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Định",
    "bang": [
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "le-truong-thanh"
   ],
   "ky": [],
   "nenHan": [
    "冠帶"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜冠帶",
    "又為時隂宜運謀算畫計策"
   ],
   "binhLuan": "按定日為三合之中宜冠帶者既取其成局又取其方中而未昃之義也時隂舊宜睦子孫㑹親友於義不合故刪"
  },
  {
   "ma": "truc-chap",
   "ten": "Trực Chấp",
   "han": "執日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Chấp",
    "bang": [
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "bat-giu"
   ],
   "ky": [],
   "nenHan": [
    "捕捉"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜捕捉",
    "霜降後立春前宜畋獵雨水後立夏前宜取魚義取諸執且順時也"
   ]
  },
  {
   "ma": "truc-pha",
   "ten": "Trực Phá",
   "han": "破日",
   "loai": "hung",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Phá",
    "bang": [
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "chua-benh",
    "pha-do"
   ],
   "ky": [],
   "nenHan": [
    "求醫療病",
    "破屋壞垣"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜求醫療病破屋壞垣",
    "義取諸破"
   ]
  },
  {
   "ma": "truc-nguy",
   "ten": "Trực Nguy",
   "han": "危日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Nguy",
    "bang": [
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "an-sang"
   ],
   "ky": [],
   "nenHan": [
    "安撫邊境",
    "選將訓兵",
    "安床"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜安撫邊境選將訓兵安牀",
    "立冬後立春前宜伐木霜降後立春前宜畋獵雨水後立夏前宜取魚"
   ],
   "binhLuan": "按危日取安為義故宜安牀然安不忘危則莫大於安撫訓練之事伐木畋獵取魚則以隂過盛而物當殺也各以其節氣者順時也"
  },
  {
   "ma": "truc-thanh",
   "ten": "Trực Thành",
   "han": "成日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Thành",
    "bang": [
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "nhap-hoc",
    "nhap-trach",
    "dap-de",
    "khai-truong"
   ],
   "ky": [],
   "nenHan": [
    "入學",
    "安撫邊境",
    "般移",
    "築隄防",
    "開市"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "宜入學安撫邊境般移築隄防開市",
    "又為天喜宜施恩封拜舉正直慶賜賞賀宴㑹行幸遣使上官赴任臨政親民結婚姻納采問名嫁娶五月與天馬併宜詔命公卿招賢",
    "乂為天醫宜求醫療病"
   ],
   "binhLuan": "按成為合局之終開為生氣之始故其日宜入學原始要終之義也宜安撫邊境者功成而永奠也般移築隄防開市皆取成義天喜舊宜封拜自宜上官義同建日"
  },
  {
   "ma": "truc-thu",
   "ten": "Trực Thu",
   "han": "收日",
   "loai": "hung",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Thu",
    "bang": [
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "nhan-nguoi",
    "nhan-tien",
    "bat-giu",
    "chan-nuoi"
   ],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [
    "進人口",
    "納財",
    "捕捉",
    "納畜"
   ],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "宜進人口納財捕捉納畜",
    "霜降後立春前宜畋獵雨水後立夏前宜取魚與月恩四相時德併宜修倉庫",
    "義取諸收無修造義故必與月恩四相時德併而後宜修倉庫若開日則雖宜修造不得與收日併若德合赦願則自宜修倉庫又不待與收日併也",
    "母倉義亦如此",
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶般移安牀解除求醫療病裁製營建宫室修宮室繕城郭築隄防興造動土豎柱上梁鼓鑄經絡醞釀開市立劵交易開倉庫出貨財修置產室開渠穿井破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學進人口沐浴整容剃頭整手足甲修倉庫納財安碓磑補垣塞穴掃舍宇修飾垣墻平治道塗破屋壞垣伐木補捉畋獵取魚栽種牧養納畜",
    "寅申巳亥月值刼煞從刼煞論子午夘酉月值大時子午月與月德合併酉月與月德併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例夘月丑戌月皆值月刑從月刑論辰未月與德合併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德合併如常例"
   ]
  },
  {
   "ma": "truc-khai",
   "ten": "Trực Khai",
   "han": "開日",
   "loai": "cát",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Khai",
    "bang": [
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "te-le",
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "nhap-hoc",
    "xuat-hanh",
    "nhan-chuc",
    "nhap-trach",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "khai-truong",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "trong-trot",
    "chan-nuoi"
   ],
   "ky": [
    "chat-cay",
    "san-ban",
    "danh-ca",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [
    "祭祀",
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "覃恩",
    "肆赦",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "施恩惠",
    "恤孤惸",
    "宣政事",
    "行惠愛",
    "雪寃枉",
    "緩刑獄",
    "慶賜賞賀",
    "宴會",
    "入學",
    "行幸遣使",
    "上官赴任",
    "臨政親民",
    "般移",
    "解除",
    "求醫療病",
    "裁製",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "開市",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "栽種",
    "牧養"
   ],
   "kyHan": [
    "伐木",
    "畋獵",
    "取魚",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "宜祭祀祈福求嗣上册進表章頒詔覃恩肆赦施恩封拜詔命公卿招賢舉正直施恩惠恤孤惸宣政事行惠愛雪寃枉緩刑獄慶賜賞賀宴㑹入學行幸遣使上官赴任臨政親民般移解除求醫療病裁製修宫室繕城郭興造動土豎柱上梁開市修置產室開渠穿井安碓磑栽種牧養",
    "忌伐木畋獵取魚破土安葬啓攢"
   ],
   "binhLuan": "按開日一陽始生故又為時陽又為生氣其日最吉舊本所宜無祭祀祈福求嗣覃恩拜官等事於義未偹故補之不及婚事者無合義也忌伐木漁獵者恐傷生氣也忌葬事從俗也"
  },
  {
   "ma": "truc-be",
   "ten": "Trực Bế",
   "han": "閉日",
   "loai": "hung",
   "nhom": "trực",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Bế",
    "bang": [
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "其法從月建上起建與斗杓所指相應如正月建寅則寅日起建順行十二辰是也"
   },
   "nen": [
    "dap-de",
    "bit-lo"
   ],
   "ky": [
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "chua-mat",
    "xay-nha",
    "sua-nha",
    "dong-tho",
    "thuong-luong",
    "khai-truong",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng"
   ],
   "nenHan": [
    "築隄防",
    "補垣塞穴"
   ],
   "kyHan": [
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "行幸遣使",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "求醫療目",
    "營建宮室",
    "修宮室",
    "興造動土",
    "豎柱上梁",
    "開市",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井"
   ],
   "trichNghiKy": [
    "宜築隄防補垣塞穴",
    "義取諸閉",
    "忌上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹行幸遣使出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀求醫療目營建宫室修宮室興造動土豎柱上梁開市開倉庫出貨財修置產室開渠穿井",
    "又為血支專忌針刺",
    "子午夘酉月值王日辰戌丑未月值官日天吏與天德月德天德合月德合天赦天願併凡所忌者則不註宜所宜者亦不註忌不與德合赦願併如常例寅申巳亥月值月煞從月煞論"
   ]
  },
  {
   "ma": "hd-thanh-long",
   "ten": "Thanh Long",
   "han": "青龍",
   "loai": "cát",
   "nhom": "hoàng đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Thanh Long",
    "bang": [
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ]
    ],
    "quyTac": "正月起子順行六陽辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與吉神併則從所宜與凶神併則從所忌"
   ],
   "binhLuan": "按六黃道以位置得宜為吉猶秩叙典禮無徃不宜也舊本謂宜修宫室繕城郭結婚姻進人口則無義例可推今選時之法謂諸事皆宜而無專宜之事六黑道亦無專忌之事當以時例為斷"
  },
  {
   "ma": "hd-minh-duong",
   "ten": "Minh Đường",
   "han": "明堂",
   "loai": "cát",
   "nhom": "hoàng đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Minh Đường",
    "bang": [
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ]
    ],
    "quyTac": "正月起丑順行六隂辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與吉神併則從所宜與凶神併則從所忌"
   ],
   "binhLuan": "按六黃道以位置得宜為吉猶秩叙典禮無徃不宜也舊本謂宜修宫室繕城郭結婚姻進人口則無義例可推今選時之法謂諸事皆宜而無專宜之事六黑道亦無專忌之事當以時例為斷"
  },
  {
   "ma": "hd-thien-hinh",
   "ten": "Thiên Hình",
   "han": "天刑",
   "loai": "hung",
   "nhom": "hắc đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Thiên Hình",
    "bang": [
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ]
    ],
    "quyTac": "正月起寅順行六陽辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與凶神併則從所忌與吉神併則從所宜"
   ],
   "binhLuan": "按舊本六黑道忌興衆務而仍從吉神所宜並無專忌之事若選時則諸事皆忌也並詳六黃道"
  },
  {
   "ma": "hd-chu-tuoc",
   "ten": "Chu Tước",
   "han": "朱雀",
   "loai": "hung",
   "nhom": "hắc đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Chu Tước",
    "bang": [
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ]
    ],
    "quyTac": "正月起卯順行六隂辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與凶神併則從所忌與吉神併則從所宜"
   ],
   "binhLuan": "按舊本六黑道忌興衆務而仍從吉神所宜並無專忌之事若選時則諸事皆忌也並詳六黃道"
  },
  {
   "ma": "hd-kim-quy",
   "ten": "Kim Quỹ",
   "han": "金匱",
   "loai": "cát",
   "nhom": "hoàng đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Kim Quỹ",
    "bang": [
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ]
    ],
    "quyTac": "正月起辰順行六陽辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與吉神併則從所宜與凶神併則從所忌"
   ],
   "binhLuan": "按六黃道以位置得宜為吉猶秩叙典禮無徃不宜也舊本謂宜修宫室繕城郭結婚姻進人口則無義例可推今選時之法謂諸事皆宜而無專宜之事六黑道亦無專忌之事當以時例為斷"
  },
  {
   "ma": "hd-thien-duc",
   "ten": "Bảo Quang (Thiên Đức hoàng đạo)",
   "han": "寶光",
   "loai": "cát",
   "nhom": "hoàng đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Thiên Đức",
    "bang": [
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ]
    ],
    "quyTac": "正月起巳順行六隂辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與吉神併則從所宜與凶神併則從所忌"
   ],
   "binhLuan": "按六黃道以位置得宜為吉猶秩叙典禮無徃不宜也舊本謂宜修宫室繕城郭結婚姻進人口則無義例可推今選時之法謂諸事皆宜而無專宜之事六黑道亦無專忌之事當以時例為斷"
  },
  {
   "ma": "hd-bach-ho",
   "ten": "Bạch Hổ",
   "han": "白虎",
   "loai": "hung",
   "nhom": "hắc đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Bạch Hổ",
    "bang": [
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ]
    ],
    "quyTac": "正月起午順行六陽辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與凶神併則從所忌與吉神併則從所宜"
   ],
   "binhLuan": "按舊本六黑道忌興衆務而仍從吉神所宜並無專忌之事若選時則諸事皆忌也並詳六黃道"
  },
  {
   "ma": "hd-ngoc-duong",
   "ten": "Ngọc Đường",
   "han": "玉堂",
   "loai": "cát",
   "nhom": "hoàng đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Ngọc Đường",
    "bang": [
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ]
    ],
    "quyTac": "正月起未順行六隂辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與吉神併則從所宜與凶神併則從所忌"
   ],
   "binhLuan": "按六黃道以位置得宜為吉猶秩叙典禮無徃不宜也舊本謂宜修宫室繕城郭結婚姻進人口則無義例可推今選時之法謂諸事皆宜而無專宜之事六黑道亦無專忌之事當以時例為斷"
  },
  {
   "ma": "hd-thien-lao",
   "ten": "Thiên Lao",
   "han": "天牢",
   "loai": "hung",
   "nhom": "hắc đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Thiên Lao",
    "bang": [
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ]
    ],
    "quyTac": "正月起申順行六陽辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與凶神併則從所忌與吉神併則從所宜"
   ],
   "binhLuan": "按舊本六黑道忌興衆務而仍從吉神所宜並無專忌之事若選時則諸事皆忌也並詳六黃道"
  },
  {
   "ma": "hd-huyen-vu",
   "ten": "Huyền Vũ",
   "han": "元武",
   "loai": "hung",
   "nhom": "hắc đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Huyền Vũ",
    "bang": [
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ]
    ],
    "quyTac": "正月起酉順行六隂辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與凶神併則從所忌與吉神併則從所宜"
   ],
   "binhLuan": "按舊本六黑道忌興衆務而仍從吉神所宜並無專忌之事若選時則諸事皆忌也並詳六黃道"
  },
  {
   "ma": "hd-tu-menh",
   "ten": "Tư Mệnh",
   "han": "司命",
   "loai": "cát",
   "nhom": "hoàng đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Tư Mệnh",
    "bang": [
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ],
     [
      6
     ],
     [
      8
     ],
     [
      10
     ],
     [
      0
     ],
     [
      2
     ],
     [
      4
     ]
    ],
    "quyTac": "正月起戌順行六陽辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與吉神併則從所宜與凶神併則從所忌"
   ],
   "binhLuan": "按六黃道以位置得宜為吉猶秩叙典禮無徃不宜也舊本謂宜修宫室繕城郭結婚姻進人口則無義例可推今選時之法謂諸事皆宜而無專宜之事六黑道亦無專忌之事當以時例為斷"
  },
  {
   "ma": "hd-cau-tran",
   "ten": "Câu Trần",
   "han": "勾陳",
   "loai": "hung",
   "nhom": "hắc đạo",
   "dinhNghia": {
    "kieu": "hoang-dao",
    "than": "Câu Trần",
    "bang": [
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ],
     [
      7
     ],
     [
      9
     ],
     [
      11
     ],
     [
      1
     ],
     [
      3
     ],
     [
      5
     ]
    ],
    "quyTac": "正月起亥順行六隂辰"
   },
   "nguon": {
    "quyen": 7,
    "trich": "李鼎祚曰青龍正月起子金匱正月起辰司命正月起戌皆順行六陽辰也明堂正月起丑天德正月起巳玉堂正月起未皆順行六隂辰也天刑者正月起寅白虎者正月起午天牢者正月起申皆順行六陽辰也朱雀者正月起卯元武者正月起酉勾陳者正月起亥皆順行六隂辰也"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [],
   "trichNghiKy": [
    "與凶神併則從所忌與吉神併則從所宜"
   ],
   "binhLuan": "按舊本六黑道忌興衆務而仍從吉神所宜並無專忌之事若選時則諸事皆忌也並詳六黃道"
  },
  {
   "ma": "nguyet-kien",
   "ten": "Nguyệt Kiến",
   "han": "月建",
   "loai": "hung",
   "tenKhac": [
    "小時"
   ],
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Kiến",
    "bang": [
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰正月建寅順行十二辰"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "dam-hoi",
    "giai-tru",
    "cat-toc",
    "chua-benh",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "xuat-kho",
    "phong-sinh",
    "pha-do",
    "chat-cay",
    "trong-trot",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "結婚姻",
    "納采問名",
    "解除",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "開倉庫出貨財",
    "修置產室",
    "破屋壞垣",
    "伐木",
    "栽種",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章結婚姻納采問名解除整容剃頭整手足甲求醫療病營建宮室修宫室繕城郭興造動土豎柱上梁修倉庫開倉庫出貨財修置產室破屋壞垣伐木栽種破土安葬啟攢正月建日又忌出師",
    "又為土府專忌營建宮室修宮室繕城郭築隄防興造動土修倉庫修置產室開渠穿井安碓磑補垣修飾垣墻平治道塗破屋壞垣栽種破土",
    "與天德月德天德合月德合天赦月恩四相併止忌營建宮室修宫室繕城郭築隄防興造動土修倉庫修置產室開渠穿井安碓磑補垣修飾垣墻平治道塗破屋壞垣伐木栽種破土餘皆不忌未月己未日為陽錯不作德合論子午月值月厭辰午酉亥月值月刑從刑厭論二月己卯三月戊辰四月己巳五月戊午八月己酉九月戊戌十月己亥十一月戊子為隂陽小㑹三月庚辰九月甲戌為隂位諸事皆忌"
   ],
   "binhLuan": "按選擇宗鏡曰建破平收俗之所忌惟破日最凶建日吉多可用又曰月建為吉凶衆神之主疊吉星則吉疊凶星則凶葢月建本非凶日第以其為一月令氣之主故又名小時如太嵗之不敢犯耳若與德合天赦月恩四相併則益助吉神之力故動土伐木之外一切皆不忌遇刑厭則從刑厭論者刑厭之凶甚於月建故也舊忌頒詔宣政事與宜出行義相反忌上官赴任臨政親民與宜封拜義相反忌安撫邊境選將訓兵出師與其日兵福所宜自相牴牾故刪陽錯小㑹隂位詳月厭條下"
  },
  {
   "ma": "tho-phu-kien-nhat",
   "ten": "Thổ Phủ",
   "han": "土府",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Kiến",
    "bang": [
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "邵泰衢曰建為土府者猶言中府也月建當月令而為主於中府也"
   },
   "nen": [],
   "ky": [
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "sua-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "lam-duong",
    "pha-do",
    "trong-trot",
    "dao-huyet"
   ],
   "nenHan": [],
   "kyHan": [
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "修倉庫",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣",
    "修飾垣墻",
    "平治道塗",
    "破屋壞垣",
    "栽種",
    "破土"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章結婚姻納采問名解除整容剃頭整手足甲求醫療病營建宮室修宫室繕城郭興造動土豎柱上梁修倉庫開倉庫出貨財修置產室破屋壞垣伐木栽種破土安葬啟攢正月建日又忌出師",
    "又為土府專忌營建宮室修宮室繕城郭築隄防興造動土修倉庫修置產室開渠穿井安碓磑補垣修飾垣墻平治道塗破屋壞垣栽種破土",
    "與天德月德天德合月德合天赦月恩四相併止忌營建宮室修宫室繕城郭築隄防興造動土修倉庫修置產室開渠穿井安碓磑補垣修飾垣墻平治道塗破屋壞垣伐木栽種破土餘皆不忌未月己未日為陽錯不作德合論子午月值月厭辰午酉亥月值月刑從刑厭論二月己卯三月戊辰四月己巳五月戊午八月己酉九月戊戌十月己亥十一月戊子為隂陽小㑹三月庚辰九月甲戌為隂位諸事皆忌"
   ],
   "binhLuan": "按選擇宗鏡曰建破平收俗之所忌惟破日最凶建日吉多可用又曰月建為吉凶衆神之主疊吉星則吉疊凶星則凶葢月建本非凶日第以其為一月令氣之主故又名小時如太嵗之不敢犯耳若與德合天赦月恩四相併則益助吉神之力故動土伐木之外一切皆不忌遇刑厭則從刑厭論者刑厭之凶甚於月建故也舊忌頒詔宣政事與宜出行義相反忌上官赴任臨政親民與宜封拜義相反忌安撫邊境選將訓兵出師與其日兵福所宜自相牴牾故刪陽錯小㑹隂位詳月厭條下"
  },
  {
   "ma": "nguyet-pha",
   "ten": "Nguyệt Phá",
   "han": "月破",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Phá",
    "bang": [
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "考原曰月破者月建所衝之日也與歲破義同"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "cat-toc",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "chat-cay",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "整容剃頭",
    "整手足甲",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣塞穴",
    "修飾垣墻",
    "伐木",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀整容剃頭整手足甲裁製營建宫室修宫室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井安碓磑補垣塞穴修飾垣墻伐木栽種牧養納畜破土安葬啟攢",
    "又為大耗忌修倉庫開市立劵交易納財開倉庫出貨財",
    "與天德月德天德合月德合併猶忌之止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學解除沐浴求醫療病掃舍宇平治道塗破屋壞垣捕捉畋獵取魚",
    "子午月值災煞未申月值月刑與月德天德合月德合併不忌祭祀覃恩肆赦等事仍忌解除求醫療病破屋壞垣不與德合併諸事皆忌卯酉月值災煞又值月厭雖與德合併仍諸事皆忌四月癸亥十月丁巳為隂陽交破六月癸丑十二月丁未為陽破隂衝亦諸事皆忌"
   ],
   "binhLuan": "按月破為月建之衝又為月建氣絶之地故所忌如此德神臨此失力不能為福故與併猶忌若祭祀覃恩等事則不以衝絶為嫌故遇有宜用之神則不忌不待與德神併也若值災煞或值月刑則其凶尤甚故必與德神併而後不忌祭祀覃恩等事否則諸事皆忌也若值災煞又值月厭則隂氣尤毒故雖與德神併而仍諸事皆忌也隂陽交破陽破隂衝詳月厭條下舊本不忌嫁娶經絡而忌沐浴葢嫁娶舊止宜不將日又忌章光無翹伏斷歸忌紅沙若再忌月破等日恐致無日可用是不得已為權宜之術耳今按章光無翹等皆俗説拘於俗忌而不避大凶其所為權宜者殊為未當且按監本通書及各坊本皆云嫁娶宜不將天德月德天德合月德合上吉又云日辰全吉無不將亦可用則嫁娶吉日本自甚寛又無需乎權宜為也經絡舊止宜滿日原自不值破日今三合等日俱宜經絡故值破日則忌若沐浴尋常細事則自無當忌之理也"
  },
  {
   "ma": "dai-hao",
   "ten": "Đại Hao",
   "han": "大耗",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Phá",
    "bang": [
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰大耗者正月起申順行十二辰"
   },
   "nen": [],
   "ky": [
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀整容剃頭整手足甲裁製營建宫室修宫室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井安碓磑補垣塞穴修飾垣墻伐木栽種牧養納畜破土安葬啟攢",
    "又為大耗忌修倉庫開市立劵交易納財開倉庫出貨財",
    "與天德月德天德合月德合併猶忌之止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學解除沐浴求醫療病掃舍宇平治道塗破屋壞垣捕捉畋獵取魚",
    "子午月值災煞未申月值月刑與月德天德合月德合併不忌祭祀覃恩肆赦等事仍忌解除求醫療病破屋壞垣不與德合併諸事皆忌卯酉月值災煞又值月厭雖與德合併仍諸事皆忌四月癸亥十月丁巳為隂陽交破六月癸丑十二月丁未為陽破隂衝亦諸事皆忌"
   ],
   "binhLuan": "按月破為月建之衝又為月建氣絶之地故所忌如此德神臨此失力不能為福故與併猶忌若祭祀覃恩等事則不以衝絶為嫌故遇有宜用之神則不忌不待與德神併也若值災煞或值月刑則其凶尤甚故必與德神併而後不忌祭祀覃恩等事否則諸事皆忌也若值災煞又值月厭則隂氣尤毒故雖與德神併而仍諸事皆忌也隂陽交破陽破隂衝詳月厭條下舊本不忌嫁娶經絡而忌沐浴葢嫁娶舊止宜不將日又忌章光無翹伏斷歸忌紅沙若再忌月破等日恐致無日可用是不得已為權宜之術耳今按章光無翹等皆俗説拘於俗忌而不避大凶其所為權宜者殊為未當且按監本通書及各坊本皆云嫁娶宜不將天德月德天德合月德合上吉又云日辰全吉無不將亦可用則嫁娶吉日本自甚寛又無需乎權宜為也經絡舊止宜滿日原自不值破日今三合等日俱宜經絡故值破日則忌若沐浴尋常細事則自無當忌之理也"
  },
  {
   "ma": "nguyet-yem",
   "ten": "Nguyệt Yếm",
   "han": "月厭",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ],
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      3
     ],
     [
      2
     ],
     [
      1
     ]
    ],
    "quyTac": "正月在戌逆行十二辰"
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰月厭者正月在戌逆行十二辰"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "ve-nha-xa",
    "an-sang",
    "giai-tru",
    "cat-toc",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "lam-duong",
    "pha-do",
    "chat-cay",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "遠迴",
    "安床",
    "解除",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣塞穴",
    "修飾垣墻",
    "平治道塗",
    "破屋壞垣",
    "伐木",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移遠廻安牀解除整容剃頭整手足甲求醫療病裁製營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井安碓磑補垣塞穴修飾垣墻平治道塗破屋壞垣伐木栽種牧養納畜破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學沐浴掃舍宇捕捉畋獵取魚",
    "又為地火忌栽種修築園圃",
    "寅申月值成日丑未月值開日與月德天德合月德合併止忌行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶求醫療病般移遠迴栽種餘皆不忌不與德神併如常例辰戌月值定日己亥月值滿日與天德月德月德合併凡所忌者則不註宜所宜者亦不註忌不與徳合併如常例子午月厭建㑹與天赦併如常例不與天赦併諸事皆忌卯酉月值月破災煞雖與德合併仍諸事皆忌又正月甲戌二月乙酉五月丙午六月丁巳七月庚辰八月辛卯十一月壬子十二月癸亥為隂陽大㑹與月德併仍諸事皆忌又二月己卯三月戊辰四月己巳五月戊午八月己酉九月戊戌十月己亥十一月戊子為隂陽小㑹三月又為單隂四月又為純陽九月又為孤陽十月又為純隂亦諸事皆忌又三月庚辰九月甲戌為隂位四月癸亥十月丁巳為隂陽交破五月壬子十一月丙午為隂陽擊衝六月癸丑十二月丁未為陽破隂衝二月己酉八月己卯為隂道衝陽亦諸事皆忌又四月丙午戊午十月壬子戊子為歲薄六月丙午戊午十二月壬子戊子為逐陣皆從月厭所忌四月丙午六月戊午亦不從德願所宜正月辛酉七月乙卯為三隂諸事皆忌又正月甲寅二月乙卯三月甲辰四月丁巳己巳六月丁未己未七月庚申八月辛酉九月庚戌十月癸亥十二月癸丑為陽錯除四月己巳為小㑹諸事皆忌外餘皆從建所忌六月己未亦不從德合所宜又正月庚戌二月辛酉三月庚申四月丁未己未六月丁巳己巳七月甲辰八月乙卯九月甲寅十月癸丑十二月癸亥為隂錯除二月八月值月破六月十二月為大㑹諸事皆忌外餘俱從厭所忌六月己巳亦不從德合所宜五月丙午十一月壬子為隂陽俱錯雖值月德仍諸事皆忌四月戊辰為絶隂十月戊戌為絶陽亦諸事皆忌"
   ],
   "binhLuan": "按月厭為隂建是隂之自旺而陽之對也故合建破所忌而兼忌之然隂不勝陽故其義雖自為一家而其凶亦不若月破之不可解寅申月為三合丑未月為生氣再與德神併則吉勝矣故皆從德所宜而不從厭所忌猶忌行幸等事者惡隂盛也不與德神併則吉不抵凶故如常例也辰戌月雖亦為三合然隂陽始侵己亥月值滿日又隂陽相逼行狠了戾孤辰殆無虛日故與德神併然後吉凶相抵而不宜不忌否則如常例也子午月厭建㑹則隂陽争五月丙午十一月壬子雖值月德然為隂陽大㑹丙壬只作建論不作德論惟天赦另有生意故與天赦併而後如常例否則諸事皆忌也卯酉月值災破則顯然衝擊雖與德神併亦應諸事不宜矣又按舊厯止忌出行嫁娶般移逺廻於義固為未協淮南子厯事明原謂厭日不可舉百事則亦畧舉大義而未之深辨今逐月較量其輕重而區别之如此至大㑹小㑹隂位等日則皆從二建㑹合取義故皆與子午月例同隂陽交破隂陽擊衝陽破隂衝隂道衝陽等日則皆從二建對衝取義故皆與卯酉月例同嵗薄逐陣則取二建將合而先合始分而未分為義故與辰戌己亥月月厭例同德作建論不作德論故又與子午月例同三陰取厭破將併而先併為義故與卯酉月月厭例同陽建疊陽建為陽錯隂建疊隂建為隂錯故德作建論不作德論與厭建常例同子午月二建併又疊同建之干為隂陽俱錯故德作建論不作德論與子午月月厭例同絶隂絶陽則從單隂孤陽更進一義又值月煞閉日所㑹之辰故三例皆諸事不宜餘詳義例今通書惟四月己巳日凡事不宜餘日皆不載又四月辛巳癸巳日亦凡事不宜而乙巳丁巳如常例或係辛巳癸巳因己巳連及而誤因丁巳陽錯而訛或係四月五建亦如行狠了戾孤辰取義皆不可考然辛癸乙日既無義可推而辰戌亥月又無例可據考原所載確有精義故皆依考原訂補近刻不足慿也"
  },
  {
   "ma": "dia-hoa",
   "ten": "Địa Hỏa",
   "han": "地火",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ],
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      3
     ],
     [
      2
     ],
     [
      1
     ]
    ],
    "quyTac": "正月起戌逆行十二辰"
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰地火者正月起戌逆行十二辰"
   },
   "nen": [],
   "ky": [
    "trong-trot"
   ],
   "nenHan": [],
   "kyHan": [
    "栽種",
    "修築園圃"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移遠廻安牀解除整容剃頭整手足甲求醫療病裁製營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井安碓磑補垣塞穴修飾垣墻平治道塗破屋壞垣伐木栽種牧養納畜破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學沐浴掃舍宇捕捉畋獵取魚",
    "又為地火忌栽種修築園圃",
    "寅申月值成日丑未月值開日與月德天德合月德合併止忌行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶求醫療病般移遠迴栽種餘皆不忌不與德神併如常例辰戌月值定日己亥月值滿日與天德月德月德合併凡所忌者則不註宜所宜者亦不註忌不與徳合併如常例子午月厭建㑹與天赦併如常例不與天赦併諸事皆忌卯酉月值月破災煞雖與德合併仍諸事皆忌又正月甲戌二月乙酉五月丙午六月丁巳七月庚辰八月辛卯十一月壬子十二月癸亥為隂陽大㑹與月德併仍諸事皆忌又二月己卯三月戊辰四月己巳五月戊午八月己酉九月戊戌十月己亥十一月戊子為隂陽小㑹三月又為單隂四月又為純陽九月又為孤陽十月又為純隂亦諸事皆忌又三月庚辰九月甲戌為隂位四月癸亥十月丁巳為隂陽交破五月壬子十一月丙午為隂陽擊衝六月癸丑十二月丁未為陽破隂衝二月己酉八月己卯為隂道衝陽亦諸事皆忌又四月丙午戊午十月壬子戊子為歲薄六月丙午戊午十二月壬子戊子為逐陣皆從月厭所忌四月丙午六月戊午亦不從德願所宜正月辛酉七月乙卯為三隂諸事皆忌又正月甲寅二月乙卯三月甲辰四月丁巳己巳六月丁未己未七月庚申八月辛酉九月庚戌十月癸亥十二月癸丑為陽錯除四月己巳為小㑹諸事皆忌外餘皆從建所忌六月己未亦不從德合所宜又正月庚戌二月辛酉三月庚申四月丁未己未六月丁巳己巳七月甲辰八月乙卯九月甲寅十月癸丑十二月癸亥為隂錯除二月八月值月破六月十二月為大㑹諸事皆忌外餘俱從厭所忌六月己巳亦不從德合所宜五月丙午十一月壬子為隂陽俱錯雖值月德仍諸事皆忌四月戊辰為絶隂十月戊戌為絶陽亦諸事皆忌"
   ],
   "binhLuan": "按月厭為隂建是隂之自旺而陽之對也故合建破所忌而兼忌之然隂不勝陽故其義雖自為一家而其凶亦不若月破之不可解寅申月為三合丑未月為生氣再與德神併則吉勝矣故皆從德所宜而不從厭所忌猶忌行幸等事者惡隂盛也不與德神併則吉不抵凶故如常例也辰戌月雖亦為三合然隂陽始侵己亥月值滿日又隂陽相逼行狠了戾孤辰殆無虛日故與德神併然後吉凶相抵而不宜不忌否則如常例也子午月厭建㑹則隂陽争五月丙午十一月壬子雖值月德然為隂陽大㑹丙壬只作建論不作德論惟天赦另有生意故與天赦併而後如常例否則諸事皆忌也卯酉月值災破則顯然衝擊雖與德神併亦應諸事不宜矣又按舊厯止忌出行嫁娶般移逺廻於義固為未協淮南子厯事明原謂厭日不可舉百事則亦畧舉大義而未之深辨今逐月較量其輕重而區别之如此至大㑹小㑹隂位等日則皆從二建㑹合取義故皆與子午月例同隂陽交破隂陽擊衝陽破隂衝隂道衝陽等日則皆從二建對衝取義故皆與卯酉月例同嵗薄逐陣則取二建將合而先合始分而未分為義故與辰戌己亥月月厭例同德作建論不作德論故又與子午月例同三陰取厭破將併而先併為義故與卯酉月月厭例同陽建疊陽建為陽錯隂建疊隂建為隂錯故德作建論不作德論與厭建常例同子午月二建併又疊同建之干為隂陽俱錯故德作建論不作德論與子午月月厭例同絶隂絶陽則從單隂孤陽更進一義又值月煞閉日所㑹之辰故三例皆諸事不宜餘詳義例今通書惟四月己巳日凡事不宜餘日皆不載又四月辛巳癸巳日亦凡事不宜而乙巳丁巳如常例或係辛巳癸巳因己巳連及而誤因丁巳陽錯而訛或係四月五建亦如行狠了戾孤辰取義皆不可考然辛癸乙日既無義可推而辰戌亥月又無例可據考原所載確有精義故皆依考原訂補近刻不足慿也"
  },
  {
   "ma": "yem-doi",
   "ten": "Yếm Đối",
   "han": "厭對",
   "loai": "hung",
   "tenKhac": [
    "招搖"
   ],
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      3
     ],
     [
      2
     ],
     [
      1
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ]
    ],
    "quyTac": "正月起辰逆行十二辰"
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰厭對者正月起辰逆行十二辰"
   },
   "nen": [],
   "ky": [
    "cuoi-ga"
   ],
   "nenHan": [],
   "kyHan": [
    "嫁娶"
   ],
   "trichNghiKy": [
    "忌嫁娶",
    "又為招摇忌取魚乘船渡水",
    "與天德月德天德合月德合天赦併則不忌子午月與月破併則尤忌"
   ],
   "binhLuan": "按厭對又為招摇皆以月厭之衝取義故所忌如此與德赦併則隂從陽故不忌與月破併則又為月建之衝故尤忌也"
  },
  {
   "ma": "chieu-dao",
   "ten": "Chiêu Dao",
   "han": "招搖",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      3
     ],
     [
      2
     ],
     [
      1
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ]
    ],
    "quyTac": "厭對又為招搖"
   },
   "nguon": {
    "quyen": 4,
    "trich": "天寶厯曰厭對者月厭所衝之辰也其日忌嫁娶又為招搖忌乘船渡水"
   },
   "nen": [],
   "ky": [
    "danh-ca",
    "di-thuyen"
   ],
   "nenHan": [],
   "kyHan": [
    "取魚",
    "乘船渡水"
   ],
   "trichNghiKy": [
    "忌嫁娶",
    "又為招摇忌取魚乘船渡水",
    "與天德月德天德合月德合天赦併則不忌子午月與月破併則尤忌"
   ],
   "binhLuan": "按厭對又為招摇皆以月厭之衝取義故所忌如此與德赦併則隂從陽故不忌與月破併則又為月建之衝故尤忌也"
  },
  {
   "ma": "kiep-sat",
   "ten": "Kiếp Sát",
   "han": "劫煞",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ]
    ],
    "quyTac": "正月起亥逆行四孟"
   },
   "nguon": {
    "quyen": 6,
    "trich": "李鼎祚曰正月起亥逆行四孟"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "cat-toc",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "pha-do",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣塞穴",
    "修飾垣墻",
    "破屋壞垣",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除整容剃頭整手足甲求醫療病裁製營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井安碓磑補垣塞穴修飾垣墻破屋壞垣栽種牧養納畜破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學沐浴掃舍宇平治道塗伐木捕捉畋獵取魚",
    "寅申巳亥月值收日為月令長生寅申月又值六合止忌安撫邊境選將訓兵出師求醫療病餘皆不忌己亥月值月害與月德天德合併亦止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德神併如常例辰戌丑未月值除日相日與天德月德天德合月德合併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德神併凡所忌者則不註宜所宜者亦不註忌子午夘酉月值執日與月德月德合併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例"
   ],
   "binhLuan": "按三煞為三合敵對刼煞為絶地災煞為正衝月煞為盡地故忌同月破乂忌解除求醫療病破屋壞垣但三合緩於月建不若月破之不可解耳寅申巳亥月值收日然實為月令之長生寅申月又值六合生則不絶合則不刼即不與德願併其吉已足勝凶故止忌軍事療病餘皆不忌而收日更不足言矣己亥月雖亦為長生然既非六合又值六害吉不抵凶而與德神併則吉勝故亦止忌軍事療病餘皆不忌否則如常例也辰戌丑未月值除日相日為本令旺相之辰其吉另有可取與德合併則又濟以三合吉干不當復以絶論故亦止忌軍事療病餘皆不忌若不與德神併則吉凶僅足相抵故忌則不宜宜則不忌也子午夘酉月值執日正為本令絶地乃是真絶與德神併吉凶僅足相抵故忌則不宜宜則不忌不與德神併則止乎刼煞之凶故如常例也"
  },
  {
   "ma": "tai-sat",
   "ten": "Tai Sát",
   "han": "災煞",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ]
    ],
    "quyTac": "正月起子逆行四仲"
   },
   "nguon": {
    "quyen": 6,
    "trich": "又按天獄正月起子順行四仲曹震圭以為天獄即是災煞應逆行四仲而今順行者流傳之誤也其說是今從之"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "cat-toc",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "pha-do",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣塞穴",
    "修飾垣墻",
    "破屋壞垣",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌同刼煞",
    "又為天火忌苫葢",
    "寅申巳亥月值開日辰戌丑未月值滿日與天德月德天德合月德合併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌寅申巳亥月不與德神併凡所忌者則不註宜所宜者亦不註忌辰戌丑未月不與德神併如常例子午夘酉月值破日從月破論"
   ],
   "binhLuan": "按災煞為三合正衝其凶甚於刼煞故以寅申巳亥月開日之吉而非德無以解正衝之凶轉不得與刼煞收日比辰戌丑未月值滿日較刼煞之除日亦又次之子午夘酉月值月破更不可與刼煞之執日同語故比刼煞皆差一等是固災煞之凶亦其地原無氣無吉神助益故也",
   "ghiChu": [
    "Bản Wikisource bỏ trống phần đầu mục 災煞 (q06); định nghĩa lấy từ lời án: Thiên Ngục tức Tai Sát, 正月起子逆行四仲 (Hiệp kỷ theo Tào Chấn Khuê). Q10 đối chiếu: 子午月值災煞 (月破), 卯酉月值災煞 (月破) khớp."
   ],
   "kyNhu": "kiep-sat"
  },
  {
   "ma": "thien-hoa",
   "ten": "Thiên Hỏa",
   "han": "天火",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      6
     ],
     [
      9
     ],
     [
      0
     ],
     [
      3
     ],
     [
      6
     ],
     [
      9
     ],
     [
      0
     ],
     [
      3
     ],
     [
      6
     ],
     [
      9
     ],
     [
      0
     ],
     [
      3
     ]
    ],
    "quyTac": "正月在子順行四仲"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰天火者正月在子順行四仲"
   },
   "nen": [],
   "ky": [
    "lop-mai"
   ],
   "nenHan": [],
   "kyHan": [
    "苫蓋"
   ],
   "trichNghiKy": [
    "忌同刼煞",
    "又為天火忌苫葢",
    "寅申巳亥月值開日辰戌丑未月值滿日與天德月德天德合月德合併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌寅申巳亥月不與德神併凡所忌者則不註宜所宜者亦不註忌辰戌丑未月不與德神併如常例子午夘酉月值破日從月破論"
   ],
   "binhLuan": "按災煞為三合正衝其凶甚於刼煞故以寅申巳亥月開日之吉而非德無以解正衝之凶轉不得與刼煞收日比辰戌丑未月值滿日較刼煞之除日亦又次之子午夘酉月值月破更不可與刼煞之執日同語故比刼煞皆差一等是固災煞之凶亦其地原無氣無吉神助益故也"
  },
  {
   "ma": "nguyet-sat",
   "ten": "Nguyệt Sát",
   "han": "月煞",
   "loai": "hung",
   "tenKhac": [
    "月虛"
   ],
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ]
    ],
    "quyTac": "正月起丑逆行四季"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰月煞者正月起丑逆行四季"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "cat-toc",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "pha-do",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣塞穴",
    "修飾垣墻",
    "破屋壞垣",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌同刼煞",
    "又為月虛忌修倉庫開倉庫出貨財",
    "夘酉月值六合與月德天願併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德願併凡所忌者則不註宜所宜者亦不註忌子午月值月害與月德合併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例寅申巳亥月值閉日辰戌丑未月值平日與天德月德天德合月德合併如常例不與德合併諸事皆忌"
   ],
   "binhLuan": "按月煞之凶與刼煞同而所值之日則皆下一等夘酉月值危日雖亦值六合然非長生吉凶僅足相抵故與德願併而後從德願所宜否則不宜不忌是比刼煞寅申月之值六合者下一等也子午月既非六合又值六害與德合併吉凶僅足相抵故不宜不忌否則如常例是比刼煞己亥月之值月害者亦下一等也寅申巳亥月值閉日辰戌丑未月值平日閉日為月建之盡平日為月隂之盡月煞為三合之盡凶又逢凶是比刼煞子午夘酉月之正為本令絶辰者亦下一等葢刼煞之值令絶與平日之值天吏猶是一死一絶而月煞之值平閉則是兩盡與災煞遇月破等故與德神併而後如常例否則諸事皆忌也又按舊本刼煞止忌軍事上官結婚姻出入興販災煞止忌軍事上表章上官月煞止忌宴㑹栽種牧養其義不倫且嵗三煞與嵗破同凶而可以吉制月三煞義本相通今為推類而區别之庶條理咸貫矣不忌伐木與危日同義",
   "kyNhu": "kiep-sat"
  },
  {
   "ma": "nguyet-hu",
   "ten": "Nguyệt Hư",
   "han": "月虛",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ]
    ],
    "quyTac": "正月起丑逆行四季"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰月虚者正月起丑逆行四季"
   },
   "nen": [],
   "ky": [
    "sua-kho",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "修倉庫",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌同刼煞",
    "又為月虛忌修倉庫開倉庫出貨財",
    "夘酉月值六合與月德天願併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德願併凡所忌者則不註宜所宜者亦不註忌子午月值月害與月德合併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例寅申巳亥月值閉日辰戌丑未月值平日與天德月德天德合月德合併如常例不與德合併諸事皆忌"
   ],
   "binhLuan": "按月煞之凶與刼煞同而所值之日則皆下一等夘酉月值危日雖亦值六合然非長生吉凶僅足相抵故與德願併而後從德願所宜否則不宜不忌是比刼煞寅申月之值六合者下一等也子午月既非六合又值六害與德合併吉凶僅足相抵故不宜不忌否則如常例是比刼煞己亥月之值月害者亦下一等也寅申巳亥月值閉日辰戌丑未月值平日閉日為月建之盡平日為月隂之盡月煞為三合之盡凶又逢凶是比刼煞子午夘酉月之正為本令絶辰者亦下一等葢刼煞之值令絶與平日之值天吏猶是一死一絶而月煞之值平閉則是兩盡與災煞遇月破等故與德神併而後如常例否則諸事皆忌也又按舊本刼煞止忌軍事上官結婚姻出入興販災煞止忌軍事上表章上官月煞止忌宴㑹栽種牧養其義不倫且嵗三煞與嵗破同凶而可以吉制月三煞義本相通今為推類而區别之庶條理咸貫矣不忌伐木與危日同義"
  },
  {
   "ma": "nguyet-hinh",
   "ten": "Nguyệt Hình",
   "han": "月刑",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      3
     ],
     [
      10
     ],
     [
      5
     ],
     [
      0
     ],
     [
      4
     ],
     [
      8
     ],
     [
      6
     ],
     [
      1
     ],
     [
      2
     ],
     [
      9
     ],
     [
      7
     ],
     [
      11
     ]
    ],
    "quyTac": "子刑卯丑刑戌寅刑巳卯刑子巳刑申未刑丑申刑寅戌刑未辰午酉亥自刑"
   },
   "nguon": {
    "quyen": 3,
    "trich": "子刑夘丑刑戌寅刑己夘刑子巳刑申未刑丑申刑寅戌刑未辰午酉亥為自刑也"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "cat-toc",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "pha-do",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣塞穴",
    "修飾垣墻",
    "破屋壞垣",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除整容剃頭整手足甲求醫療病裁製營建宫室修宫室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井安碓磑補垣塞穴修飾垣墻破屋壞垣栽種牧養納畜破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學沐浴掃舍宇平治道塗伐木捕捉畋獵取魚",
    "巳月值平日相日六合與月德天德合天願併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德願併凡所忌者則不註宜所宜者亦不註忌寅月值平日相日六害辰酉亥月值建日丑戌月值收日與天德月德天德合月德合併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例子月值平日天吏夘月值收日大時未申月值月破與德合併如常例不與德合併諸事皆忌午月值月厭從月厭論按月刑為月建刑傷之地故所忌與三煞同而其所值又皆建破平收之日惟巳月值相日六合吉凶足以相抵與德願併則化凶為吉故從德願所宜止忌軍事療病餘皆不忌不與德願併則不宜不忌也寅月雖亦值相日然既非六合又值六害以及辰酉亥月之建日丑戌月之收日皆吉不勝凶助以德神然後吉凶相抵故與德神併而後不宜不忌否則皆如常例也若子月值平日天吏卯月值收日大時未申月值月破則皆凶又逢凶故與德神併而後如常例否則諸事皆忌也午月值月建月厭尤凶故從月厭論舊本止忌軍事結婚姻牧養非是"
   ],
   "ghiChu": [
    "Q06 mục 月刑 chỉ ghi '按月刑之義與嵗刑同詳見嵗刑條下' (bảng bị bỏ trống trên Wikisource); quy tắc hình lấy ở q03 (歲刑). Đối chiếu Q10: 寅巳月月刑 trùng 平日, 卯丑戌月 trùng 收日, 辰酉亥月 trùng 建日, 子月 trùng 平日, 午月 trùng 月厭 — đều khớp bảng."
   ]
  },
  {
   "ma": "nguyet-hai",
   "ten": "Nguyệt Hại",
   "han": "月害",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      7
     ],
     [
      6
     ],
     [
      5
     ],
     [
      4
     ],
     [
      3
     ],
     [
      2
     ],
     [
      1
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ]
    ],
    "quyTac": "正月起巳逆行十二辰"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰正月起巳逆行十二辰"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "khen-thuong",
    "tiec-tung",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "chua-benh",
    "sua-kho",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "慶賜賞賀",
    "宴會",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "求醫療病",
    "修倉庫",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "置產室",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章慶賜賞賀宴㑹安撫邊境選將訓兵出師結婚姻納采問名嫁娶進人口求醫療病修倉庫經絡醞釀開市立劵交易納財開倉庫出貨財置産室牧養納畜破土安葬啟攢",
    "卯酉月值除日守日丑未月值執日大時與天德月德併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與二德併如常例辰戌月值閉日官日天吏與天德合月德合併凡所忌者則不註宜所宜者亦不註忌不與徳合併如常例子午月值月煞己亥月值刼煞寅月值月刑申月值平日各從重論"
   ],
   "binhLuan": "按月害為六合之衝故所忌僅與六合所宜同不與刑煞比慶賜賞賀則宴㑹之類也納采問名則結婚姻之類也舊本并忌祈福上册出軍療病牧養等事亦惡相害之義修置産室重於牧養故並忌之然害雖不甚凶而非德不可解故卯酉月除日守日之吉亦止與丑未月之執日大時等必與德神併而後止忌軍事療病餘不忌否則如常例也辰戌月值天吏閉日其凶甚於大時故與德合併吉凶僅足相抵而不宜不忌否則亦如常例也子午月值月煞己亥月值刼煞寅月值月刑申月值平日其凶皆重於月害故從重論天吏之凶亦重於月害而不從天吏論者天吏不能該月害之所忌故也"
  },
  {
   "ma": "dai-thoi",
   "ten": "Đại Thời",
   "han": "大時",
   "loai": "hung",
   "tenKhac": [
    "大敗"
   ],
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ]
    ],
    "quyTac": "正月起夘逆行四仲"
   },
   "nguon": {
    "quyen": 6,
    "trich": "李鼎祚曰大時者正月起夘逆行四仲"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "trong-trot",
    "chan-nuoi"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "栽種",
    "牧養",
    "納畜"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章施恩封拜詔命公卿招賢舉正直冠行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫開市立劵交易納財開倉庫出貨財修置產室栽種牧養納畜",
    "又為咸池忌取魚乘船渡水",
    "寅申巳亥月值除日官日辰戌月值執日六合止忌安撫邊境選將訓兵出師餘皆不忌丑未月值執日六害與二德併亦止忌安撫邊境選將訓兵出師餘皆不忌不與二德併如常例子午卯酉月值收日子午月與月德合併酉月與月德併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例卯月又值月刑從月刑論"
   ],
   "binhLuan": "按大時又名大敗為三合敗地故所忌如此寅申巳亥月值除日官日為月建旺辰辰戌月值執日六合太陽合月建不應以三合敗氣論故即不與德合赦願併亦止忌軍事餘皆不忌也丑未月值執日六害吉不抵凶與德神併則吉勝亦不應以敗論故亦止忌軍事否則如常例也子午卯酉月正為四時敗氣又值收日卯月又值月刑其凶甚於大時故同刑收論也",
   "ghiChu": [
    "Nguyên văn q10 thiếu một chữ sau 冠 (ký hiệu SKchar 2917); đọc là 冠帶 theo các mục cùng mẫu (月破, 平日…)."
   ]
  },
  {
   "ma": "dai-bai",
   "ten": "Đại Bại",
   "han": "大敗",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ]
    ],
    "quyTac": "大時又名大敗"
   },
   "nguon": {
    "quyen": 10,
    "trich": "按大時又名大敗為三合敗地故所忌如此"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "trong-trot",
    "chan-nuoi"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "栽種",
    "牧養",
    "納畜"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章施恩封拜詔命公卿招賢舉正直冠行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫開市立劵交易納財開倉庫出貨財修置產室栽種牧養納畜",
    "又為咸池忌取魚乘船渡水",
    "寅申巳亥月值除日官日辰戌月值執日六合止忌安撫邊境選將訓兵出師餘皆不忌丑未月值執日六害與二德併亦止忌安撫邊境選將訓兵出師餘皆不忌不與二德併如常例子午卯酉月值收日子午月與月德合併酉月與月德併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例卯月又值月刑從月刑論"
   ],
   "binhLuan": "按大時又名大敗為三合敗地故所忌如此寅申巳亥月值除日官日為月建旺辰辰戌月值執日六合太陽合月建不應以三合敗氣論故即不與德合赦願併亦止忌軍事餘皆不忌也丑未月值執日六害吉不抵凶與德神併則吉勝亦不應以敗論故亦止忌軍事否則如常例也子午卯酉月正為四時敗氣又值收日卯月又值月刑其凶甚於大時故同刑收論也"
  },
  {
   "ma": "ham-tri",
   "ten": "Hàm Trì",
   "han": "咸池",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ]
    ],
    "quyTac": "大時者咸池也"
   },
   "nguon": {
    "quyen": 6,
    "trich": "大時者咸池也小時者月建也"
   },
   "nen": [],
   "ky": [
    "danh-ca",
    "di-thuyen"
   ],
   "nenHan": [],
   "kyHan": [
    "取魚",
    "乘船渡水"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章施恩封拜詔命公卿招賢舉正直冠行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫開市立劵交易納財開倉庫出貨財修置產室栽種牧養納畜",
    "又為咸池忌取魚乘船渡水",
    "寅申巳亥月值除日官日辰戌月值執日六合止忌安撫邊境選將訓兵出師餘皆不忌丑未月值執日六害與二德併亦止忌安撫邊境選將訓兵出師餘皆不忌不與二德併如常例子午卯酉月值收日子午月與月德合併酉月與月德併凡所忌者則不註宜所宜者亦不註忌不與德合併如常例卯月又值月刑從月刑論"
   ],
   "binhLuan": "按大時又名大敗為三合敗地故所忌如此寅申巳亥月值除日官日為月建旺辰辰戌月值執日六合太陽合月建不應以三合敗氣論故即不與德合赦願併亦止忌軍事餘皆不忌也丑未月值執日六害吉不抵凶與德神併則吉勝亦不應以敗論故亦止忌軍事否則如常例也子午卯酉月正為四時敗氣又值收日卯月又值月刑其凶甚於大時故同刑收論也"
  },
  {
   "ma": "tieu-hao",
   "ten": "Tiểu Hao",
   "han": "小耗",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Chấp",
    "bang": [
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "厯例曰小耗者常居月建前五辰"
   },
   "nen": [],
   "ky": [
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌修倉庫開市立劵交易納財開倉庫出貨財與天德月德天德合月德合天願併則不忌子午卯酉月值刼煞雖與德合併猶忌"
   ],
   "binhLuan": "按小耗為舊月破又為本月閉日之衝故所忌如此與德合天願併則貪合忘衝故不忌與刼煞併則既耗而又逢絶故猶忌也"
  },
  {
   "ma": "thien-tac",
   "ten": "Thiên Tặc",
   "han": "天賊",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      3
     ],
     [
      2
     ],
     [
      1
     ],
     [
      0
     ],
     [
      11
     ],
     [
      10
     ],
     [
      9
     ],
     [
      8
     ],
     [
      7
     ],
     [
      6
     ],
     [
      5
     ],
     [
      4
     ]
    ],
    "quyTac": "正月在丑逆行十二辰"
   },
   "nguon": {
    "quyen": 6,
    "trich": "李鼎祚曰天賊者正月在丑逆行十二辰"
   },
   "nen": [],
   "ky": [
    "xuat-hanh",
    "sua-kho",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "行幸遣使",
    "修倉庫",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌行幸遣使修倉庫開倉庫出貨財",
    "與德合併猶忌"
   ],
   "binhLuan": "按天賊為月厭之收日故所忌如此與德合義不相屬故與併猶忌"
  },
  {
   "ma": "tu-than",
   "ten": "Tử Thần",
   "han": "死神",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Bình",
    "bang": [
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "李鼎祚曰常居月建前三辰○曹震圭曰死神者"
   },
   "nen": [],
   "ky": [
    "nhan-nguoi",
    "giai-tru",
    "chua-benh",
    "phong-sinh",
    "trong-trot",
    "chan-nuoi"
   ],
   "nenHan": [],
   "kyHan": [
    "安撫邊境",
    "選將訓兵",
    "出師",
    "進人口",
    "解除",
    "求醫療病",
    "修置產室",
    "栽種",
    "牧養",
    "納畜"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病裁製營建宮室修宮室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置產室開渠穿井栽種牧養納畜破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學沐浴整容剃頭整手足甲安碓磑補垣塞穴掃舍宇修飾垣墻平治道塗破屋壞垣伐木捕捉畋獵取魚",
    "又為死神忌安撫邊境選將訓兵出師進人口解除求醫療病修置產室栽種牧養納畜",
    "寅申巳亥月值相日亥月又值時德六合止忌安撫邊境選將訓兵出師求醫療病餘皆不忌申月值月害與天德月德合併亦止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德合併如常例寅巳月值月刑從月刑論子午夘酉月值天吏夘酉月與月德併午月與月德合併凡所忌者則不註宜所宜者亦不註忌不與徳合併如常例子月又值月刑從月刑論辰戌丑未月值月煞從月煞論"
   ],
   "binhLuan": "按平日為月建隂氣既盡之地其凶次於月破惟其為氣盡也故多忌解除求醫療病而不忌伐木惟其次於月破也故不忌整容剃頭整手足甲安碓磑補垣塞穴修飾垣墻又按選擇宗鏡曰平收日與二德併可用又曰吉多可用葢平日為月建隂氣既盡乃建除家之言而非四時三合之氣之皆盡也亥月值相日又值時德六合即不與德願併其吉已足勝凶故止忌軍事療病餘皆不忌與德願併不待言矣申月雖亦為相日然值月害吉不抵凶而與徳神併則吉勝故亦從德神所宜止忌軍事療病餘皆不忌若不與德神併則如常例也巳月雖亦值六合然值月刑寅月既非六合又值月刑其凶甚於平日故從月刑論也子午夘酉月值天吏為三合死地平日又為死神乃是真死與德神併吉凶僅足相抵故忌則不宜宜則不忌若不與德神併則如常例也子月又值月刑辰戌丑未月值月煞其凶皆甚於平日故從刑煞論也以亥月之吉而猶忌軍事療病者慎戰疾也又按舊本凡吉神遇凶煞皆從忌而不從宜不但吉凶無大小之分即凶煞所忌亦諸月皆同無輕重之别於理固屬不合於事尤為不便夫即一凶煞而論各月之衰旺已有不同又况吉與吉併凶與凶併吉復與凶併其性情氣力至賾不齊亦安得一例而槩忌之乎今㕘互較量除建破等日條例簡易及專忌之日無庸分别外餘分為六等其上吉足勝凶從宜不從忌上次吉足抵凶遇德從宜不從忌不遇從宜亦從忌中等吉不抵凶遇德則吉勝從宜不從忌不遇從忌不從宜中次凶勝於吉遇德始相抵從宜亦從忌不遇從忌不從宜其下凶又逢凶遇德從忌不從宜不遇諸事皆忌最下凶叠大凶遇德仍諸事皆忌然後吉凶輕重各有區分而用靜用作趨避各當云表例並列於後"
  },
  {
   "ma": "tu-khi",
   "ten": "Tử Khí",
   "han": "死氣",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Định",
    "bang": [
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ],
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "李鼎祚曰死氣者常居月建前四辰"
   },
   "nen": [],
   "ky": [
    "giai-tru",
    "chua-benh",
    "phong-sinh",
    "trong-trot"
   ],
   "nenHan": [],
   "kyHan": [
    "安撫邊境",
    "選將訓兵",
    "出師",
    "解除",
    "求醫療病",
    "修置產室",
    "栽種"
   ],
   "trichNghiKy": [
    "忌安撫邊境選將訓兵出師解除求醫療病修置産室栽種",
    "與天德月德天德合月德合併止忌安撫邊境選將訓兵出師求醫療病餘不忌辰戌月值月厭雖與德合併猶忌"
   ],
   "binhLuan": "按死氣為月建一隂始生而陽氣始衰之地故所忌如此然皆與月建為三合再與德合併則益助其旺氣故不忌與月厭併則隂盛實甚故猶忌也死神忌進人口牧養納畜而死氣不忌者其日為三合又為時隂故也"
  },
  {
   "ma": "du-hoa",
   "ten": "Du Họa",
   "han": "遊禍",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ],
     [
      11
     ],
     [
      8
     ],
     [
      5
     ],
     [
      2
     ]
    ],
    "quyTac": "正月起巳逆行四孟"
   },
   "nguon": {
    "quyen": 6,
    "trich": "李鼎祚曰遊禍者正月起巳逆行四孟"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "giai-tru",
    "chua-benh"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "解除",
    "求醫療病"
   ],
   "trichNghiKy": [
    "忌祈福求嗣解除求醫療病",
    "與德合天赦併猶忌"
   ],
   "binhLuan": "按遊禍日本不為凶第為三合臨官故以過旺為禍而忌祈解醫藥之事與德赦併其旺如故故猶忌也"
  },
  {
   "ma": "thien-lai",
   "ten": "Thiên Lại",
   "han": "天吏",
   "loai": "hung",
   "tenKhac": [
    "致死"
   ],
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ]
    ],
    "quyTac": "正月起酉逆行四仲"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰天吏者正月起酉逆行四仲"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "trong-trot",
    "chan-nuoi"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "栽種",
    "牧養",
    "納畜"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章施恩封拜詔命公卿招賢舉正直冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病營建宫室修宫室繕城郭築隄防興造動土豎柱上梁修倉庫開市立劵交易納財開倉庫出貨財修置産室栽種牧養納畜",
    "寅申巳亥月值危日與天德月德天德合月德合併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德合併如常例辰戌丑未月值閉日與德合赦願併凡所忌者則不註宜所宜者亦不註忌不與德合赦願併如常例午卯酉月值平日從平日論子月又值月刑從月刑論"
   ],
   "binhLuan": "按天吏又名致死為三合死地故所忌如此寅申巳亥月值危日吉不抵凶而與德合併則吉勝故止忌軍事療病餘皆不忌否則如常例也辰戌丑未月值閉日正當斂息之時與德神併吉凶僅足相抵故不宜不忌否則亦如常例也子午卯酉月值平日為真死子月又值月刑故從重者論也又按天吏之凶甚於大時第不為三合全局之衝故次於三煞非謂死之轉輕於絶也舊本止忌上表章上官療病失之逺矣"
  },
  {
   "ma": "tri-tu",
   "ten": "Trí Tử",
   "han": "致死",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ]
    ],
    "quyTac": "天吏又名致死"
   },
   "nguon": {
    "quyen": 6,
    "trich": "按天吏者三合之死氣也故又為致死"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "trong-trot",
    "chan-nuoi"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "栽種",
    "牧養",
    "納畜"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章施恩封拜詔命公卿招賢舉正直冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病營建宫室修宫室繕城郭築隄防興造動土豎柱上梁修倉庫開市立劵交易納財開倉庫出貨財修置産室栽種牧養納畜",
    "寅申巳亥月值危日與天德月德天德合月德合併止忌安撫邊境選將訓兵出師求醫療病餘皆不忌不與德合併如常例辰戌丑未月值閉日與德合赦願併凡所忌者則不註宜所宜者亦不註忌不與德合赦願併如常例午卯酉月值平日從平日論子月又值月刑從月刑論"
   ],
   "binhLuan": "按天吏又名致死為三合死地故所忌如此寅申巳亥月值危日吉不抵凶而與德合併則吉勝故止忌軍事療病餘皆不忌否則如常例也辰戌丑未月值閉日正當斂息之時與德神併吉凶僅足相抵故不宜不忌否則亦如常例也子午卯酉月值平日為真死子月又值月刑故從重者論也又按天吏之凶甚於大時第不為三合全局之衝故次於三煞非謂死之轉輕於絶也舊本止忌上表章上官療病失之逺矣"
  },
  {
   "ma": "ngu-hu",
   "ten": "Ngũ Hư",
   "han": "五虛",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2,
      6,
      10
     ],
     [
      2,
      6,
      10
     ],
     [
      5,
      9,
      1
     ],
     [
      5,
      9,
      1
     ],
     [
      5,
      9,
      1
     ],
     [
      8,
      0,
      4
     ],
     [
      8,
      0,
      4
     ],
     [
      8,
      0,
      4
     ],
     [
      11,
      3,
      7
     ],
     [
      11,
      3,
      7
     ],
     [
      11,
      3,
      7
     ],
     [
      2,
      6,
      10
     ]
    ],
    "quyTac": "春巳酉丑夏申子辰秋亥卯未冬寅午戌"
   },
   "nguon": {
    "quyen": 5,
    "trich": "厯例曰五虚者春巳酉丑夏申子辰秋亥卯未冬寅午戌也"
   },
   "nen": [],
   "ky": [
    "sua-kho",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "修倉庫",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌修倉庫開倉庫出貨財",
    "與天德月德天德合月德合六合併則不忌"
   ],
   "binhLuan": "按五虛乃四時五行絶氣三合之日三合之絶氣則凶絶氣之三合未為凶也故第名之曰五虛而所忌如此與德合六合併則與旺氣為合而並不可以絶氣三合論矣故不忌也"
  },
  {
   "ma": "ngu-mo",
   "ten": "Ngũ Mộ",
   "han": "五墓",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      28
     ],
     [
      4
     ],
     [
      31
     ],
     [
      31
     ],
     [
      4
     ],
     [
      22
     ],
     [
      22
     ],
     [
      4
     ],
     [
      37
     ],
     [
      37
     ],
     [
      4
     ],
     [
      28
     ]
    ],
    "quyTac": "正二月乙未四五月丙戌七八月辛丑十十一月壬辰三六九十二月戊辰"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰五墓者正二月乙未四五月丙戌七八月辛丑十月十一月壬辰四季月戊辰也"
   },
   "nen": [],
   "ky": [
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dong-tho",
    "thuong-luong",
    "khai-truong",
    "ky-ket",
    "phong-sinh",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "興造動土",
    "豎柱上梁",
    "開市",
    "立券交易",
    "修置產室",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病營建宮室修宮室繕城郭興造動土豎柱上梁開市立劵交易修置産室栽種牧養納畜破土安葬啟攢",
    "五月十一月與月德併則不忌"
   ],
   "binhLuan": "按五墓乃五行旺干臨於墓庫故所忌如此與月德併則為三合旺氣發於天干而不可以墓論矣故不忌也不取德合者不同行也舊忌無冠帶行幸上官療病安葬等事今補之其義始備",
   "ghiChu": [
    "Nguyên văn '十月十一月壬辰四季月戊辰' được viết lại thành dạng máy đọc '十十一月壬辰三六九十二月戊辰'."
   ]
  },
  {
   "ma": "tu-kich",
   "ten": "Tứ Kích",
   "han": "四擊",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      7
     ],
     [
      7
     ],
     [
      10
     ],
     [
      10
     ],
     [
      10
     ],
     [
      1
     ],
     [
      1
     ],
     [
      1
     ],
     [
      4
     ],
     [
      4
     ],
     [
      4
     ],
     [
      7
     ]
    ],
    "quyTac": "春戌夏丑秋辰冬未"
   },
   "nguon": {
    "quyen": 5,
    "trich": "通書曰四擊者春戌夏丑秋辰冬未其日忌軍事"
   },
   "nen": [],
   "ky": [],
   "nenHan": [],
   "kyHan": [
    "安撫邊境",
    "選將訓兵",
    "出師"
   ],
   "trichNghiKy": [
    "忌安撫邊境選將訓兵出師",
    "與德合天願併猶忌"
   ],
   "binhLuan": "按四擊為四時旺土之衝故所忌如此與德合天願併而猶忌者慎戰也"
  },
  {
   "ma": "tu-hao",
   "ten": "Tứ Hao",
   "han": "四耗",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      57
     ],
     [
      57
     ],
     [
      48
     ],
     [
      48
     ],
     [
      48
     ],
     [
      51
     ],
     [
      51
     ],
     [
      51
     ],
     [
      54
     ],
     [
      54
     ],
     [
      54
     ],
     [
      57
     ]
    ],
    "quyTac": "春壬子夏乙卯秋戊午冬辛酉"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春壬子夏乙卯秋戊午冬辛酉"
   },
   "nen": [],
   "ky": [
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "安撫邊境",
    "選將訓兵",
    "出師",
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌安撫邊境選將訓兵出師修倉庫開市立劵交易納財開倉庫出貨財",
    "辰月與天德月德併寅申月與天德合併巳月與月德合併辰戌丑未月與三合併止忌安撫邊境選將訓兵出師餘不忌"
   ],
   "binhLuan": "按四耗日干支皆四時休氣故所忌如此與德合三合併則干與支必有一遇生旺者矣故不忌也猶忌軍事與四擊同義"
  },
  {
   "ma": "tu-phe",
   "ten": "Tứ Phế",
   "han": "四廢",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      42,
      53
     ],
     [
      42,
      53
     ],
     [
      56,
      57
     ],
     [
      56,
      57
     ],
     [
      56,
      57
     ],
     [
      48,
      59
     ],
     [
      48,
      59
     ],
     [
      48,
      59
     ],
     [
      50,
      51
     ],
     [
      50,
      51
     ],
     [
      50,
      51
     ],
     [
      42,
      53
     ]
    ],
    "quyTac": "春庚申辛酉夏壬子癸亥秋甲寅乙卯冬丙午丁巳"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春庚申辛酉夏壬子癸亥秋甲寅乙卯冬丙午丁巳"
   },
   "nen": [],
   "ky": [
    "cau-phuc",
    "cau-tu",
    "nop-don",
    "bo-nhiem",
    "khen-thuong",
    "tiec-tung",
    "le-truong-thanh",
    "xuat-hanh",
    "nhan-chuc",
    "dam-hoi",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "an-sang",
    "giai-tru",
    "chua-benh",
    "cat-may",
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "thuong-luong",
    "sua-kho",
    "duc-kim-loai",
    "det-may",
    "nau-ruou",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "trong-trot",
    "chan-nuoi",
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "祈福",
    "求嗣",
    "上册進表章",
    "頒詔",
    "施恩封拜",
    "詔命公卿",
    "招賢",
    "舉正直",
    "宣布政事",
    "慶賜賞賀",
    "宴會",
    "冠帶",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "進人口",
    "般移",
    "安床",
    "解除",
    "求醫療病",
    "裁製",
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "豎柱上梁",
    "修倉庫",
    "鼓鑄",
    "經絡",
    "醞釀",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣塞穴",
    "修飾垣墻",
    "栽種",
    "牧養",
    "納畜",
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌祈福求嗣上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹冠帶行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀解除求醫療病裁製營建宫室修宫室繕城郭築隄防興造動土豎柱上梁修倉庫鼓鑄經絡醞釀開市立劵交易納財開倉庫出貨財修置産室開渠穿井安碓磑補垣塞穴修飾垣墻栽種牧養納畜破土安葬啟攢○止不忌祭祀覃恩肆赦施恩惠恤孤惸行惠愛雪寃枉緩刑獄入學沐浴整容剃頭整手足甲掃舍宇平治道塗破屋壞垣伐木捕捉畋獵取魚",
    "與德合併猶忌與月破併諸事皆忌"
   ],
   "binhLuan": "按四廢干支皆死氣故所忌如此與德合併則德亦無氣故猶忌與月破併則既廢而又逢衝故諸事皆忌也舊忌無上官出行結婚姻療病等事今補之於義始備"
  },
  {
   "ma": "tu-ky",
   "ten": "Tứ Kỵ",
   "han": "四忌",
   "loai": "hung",
   "tenKhac": [
    "八龍",
    "七鳥",
    "九虎",
    "六蛇"
   ],
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      48
     ],
     [
      48
     ],
     [
      0
     ],
     [
      0
     ],
     [
      0
     ],
     [
      12
     ],
     [
      12
     ],
     [
      12
     ],
     [
      36
     ],
     [
      36
     ],
     [
      36
     ],
     [
      48
     ]
    ],
    "quyTac": "春甲子夏丙子秋庚子冬壬子"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春甲子乙亥為八龍夏丙子丁亥為七鳥秋庚子辛亥為九虎冬壬子癸亥為六蛇"
   },
   "nen": [],
   "ky": [
    "dam-hoi",
    "cuoi-ga",
    "an-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "安撫邊境",
    "選將訓兵",
    "出師",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "安葬"
   ],
   "trichNghiKy": [
    "忌安撫邊境選將訓兵出師結婚姻納采問名嫁娶安葬",
    "四窮又忌進人口修倉庫開市立劵交易納財開倉庫出貨財",
    "與月德天德合月德合併猶忌惟正月乙亥與天願併止忌安撫邊境選將訓兵出師餘皆不忌"
   ],
   "binhLuan": "按四忌四窮合為八龍七鳥九虎六蛇義例謂隂陽首尾全數盡在於是夫兵凶器也非所以始萬物終萬物也婚嫁為人事之始葬埋為人事之終故並忌之四窮以令干居辰尾故又忌進人口等事此八日皆以旺極為凶故德神不能化解惟正月乙亥為天願與月建為六合辰雖居終而日躔實始不可以尾論故止忌軍事餘皆不忌舊本無四忌今依起例補之其義始備",
   "ghiChu": [
    "Q10: 四忌四窮合為八龍七鳥九虎六蛇; Tứ Kỵ lấy các ngày Tý (甲子丙子庚子壬子), Tứ Cùng lấy các ngày Hợi."
   ]
  },
  {
   "ma": "tu-cung",
   "ten": "Tứ Cùng",
   "han": "四窮",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      59
     ],
     [
      59
     ],
     [
      11
     ],
     [
      11
     ],
     [
      11
     ],
     [
      23
     ],
     [
      23
     ],
     [
      23
     ],
     [
      47
     ],
     [
      47
     ],
     [
      47
     ],
     [
      59
     ]
    ],
    "quyTac": "春乙亥夏丁亥秋辛亥冬癸亥"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰春乙亥夏丁亥秋辛亥冬癸亥"
   },
   "nen": [],
   "ky": [
    "dam-hoi",
    "cuoi-ga",
    "an-tang",
    "nhan-nguoi",
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "安撫邊境",
    "選將訓兵",
    "出師",
    "結婚姻",
    "納采問名",
    "嫁娶",
    "安葬",
    "進人口",
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌安撫邊境選將訓兵出師結婚姻納采問名嫁娶安葬",
    "四窮又忌進人口修倉庫開市立劵交易納財開倉庫出貨財",
    "與月德天德合月德合併猶忌惟正月乙亥與天願併止忌安撫邊境選將訓兵出師餘皆不忌"
   ],
   "binhLuan": "按四忌四窮合為八龍七鳥九虎六蛇義例謂隂陽首尾全數盡在於是夫兵凶器也非所以始萬物終萬物也婚嫁為人事之始葬埋為人事之終故並忌之四窮以令干居辰尾故又忌進人口等事此八日皆以旺極為凶故德神不能化解惟正月乙亥為天願與月建為六合辰雖居終而日躔實始不可以尾論故止忌軍事餘皆不忌舊本無四忌今依起例補之其義始備"
  },
  {
   "ma": "ngu-ly",
   "ten": "Ngũ Ly",
   "han": "五離",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ],
     [
      8,
      9
     ]
    ],
    "quyTac": "申酉"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰五離者申酉日是也"
   },
   "nen": [],
   "ky": [
    "khen-thuong",
    "tiec-tung",
    "dam-hoi",
    "ky-ket"
   ],
   "nenHan": [],
   "kyHan": [
    "慶賜賞賀",
    "宴會",
    "結婚姻",
    "納采問名",
    "立券交易"
   ],
   "trichNghiKy": [
    "忌慶賜賞賀宴㑹結婚姻納采問名立劵交易與天德月德天德合月德合天赦三合六合併則不忌"
   ],
   "binhLuan": "按五離為五合之衝故所忌如此與德合天赦三合六合併則其吉大於五合而非五離所能離矣故不忌也五合不宜慶賜賞賀納采問名而五離則并忌之者盖慶賜賞賀之事大於宴㑹納采問名之事大於結婚姻五合之吉可小事不可大事五離不宜其小則大者可知也若嫁娶之事則原不取五合自亦不忌五離矣"
  },
  {
   "ma": "bat-chuyen",
   "ten": "Bát Chuyên",
   "han": "八專",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "ngay-canchi",
    "ds": [
     43,
     55,
     56,
     50,
     49
    ],
    "quyTac": "丁未己未庚申甲寅癸丑"
   },
   "nguon": {
    "quyen": 5,
    "trich": "曾門經曰八專日忌出軍嫁娶丁未己未庚申甲寅癸丑也"
   },
   "nen": [],
   "ky": [
    "dam-hoi",
    "cuoi-ga"
   ],
   "nenHan": [],
   "kyHan": [
    "安撫邊境",
    "選將訓兵",
    "出師",
    "結婚姻",
    "納采問名",
    "嫁娶"
   ],
   "trichNghiKy": [
    "忌安撫邊境選將訓兵出師結婚姻納采問名嫁娶與德合併猶忌與天願併止忌安撫邊境選將訓兵出師餘不忌"
   ],
   "binhLuan": "按八專自以干支取義與德合義不相屬故與併猶忌觸水龍專日伐日倣此又按八專之忌婚嫁取隂陽同居而無别為義天願五月丁未十一月癸丑丁乃午也非未也癸乃子也非丑也是相合而有别矣故不忌婚嫁也"
  },
  {
   "ma": "vang-vong",
   "ten": "Vãng Vong",
   "han": "往亡",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      10
     ],
     [
      1
     ],
     [
      2
     ],
     [
      5
     ],
     [
      8
     ],
     [
      11
     ],
     [
      3
     ],
     [
      6
     ],
     [
      9
     ],
     [
      0
     ],
     [
      4
     ],
     [
      7
     ]
    ],
    "quyTac": "正月在寅二月在巳三月在申四月在亥五月在夘六月在午七月在酉八月在子九月在辰十月在未十一月在戌十二月在丑"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰徃亡者正月在寅二月在巳三月在申四月在亥五月在夘六月在午七月在酉八月在子九月在辰十月在未十一月在戌十二月在丑"
   },
   "nen": [],
   "ky": [
    "nop-don",
    "xuat-hanh",
    "nhan-chuc",
    "cuoi-ga",
    "nhan-nguoi",
    "nhap-trach",
    "chua-benh",
    "bat-giu",
    "san-ban",
    "danh-ca"
   ],
   "nenHan": [],
   "kyHan": [
    "上册進表章",
    "頒詔",
    "詔命公卿",
    "招賢",
    "宣政事",
    "行幸遣使",
    "安撫邊境",
    "選將訓兵",
    "出師",
    "上官赴任",
    "臨政親民",
    "嫁娶",
    "進人口",
    "般移",
    "求醫療病",
    "捕捉",
    "畋獵",
    "取魚"
   ],
   "trichNghiKy": [
    "忌上册進表章頒詔詔命公卿招賢宣政事行幸遣使安撫邊境選將訓兵出師上官赴任臨政親民嫁娶進人口般移求醫療病捕捉畋獵取魚",
    "與德合赦願併猶忌"
   ],
   "binhLuan": "按徃亡本不為凶第取三合溺於所生而無尅制之義有徃而不返之象故所忌如此然世俗避之惟謹雖值德合赦願不能無疑故與併猶忌舊本并忌施恩封拜而不忌招賢宣政事今按徃亡與封拜無涉應不忌凡宜出行之日方宜招賢宣政事徃亡既忌出行自應并忌之也"
  },
  {
   "ma": "quy-ky",
   "ten": "Quy Kỵ",
   "han": "歸忌",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      2
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      0
     ],
     [
      1
     ]
    ],
    "quyTac": "丑寅子"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰孟月丑仲月寅季月子"
   },
   "nen": [],
   "ky": [
    "nhap-trach",
    "ve-nha-xa"
   ],
   "nenHan": [],
   "kyHan": [
    "般移",
    "遠迴"
   ],
   "trichNghiKy": [
    "忌般移逺廻",
    "與德合赦願併猶忌"
   ]
  },
  {
   "ma": "huyet-chi",
   "ten": "Huyết Chi",
   "han": "血支",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "truc",
    "truc": "Bế",
    "bang": [
     [
      11
     ],
     [
      0
     ],
     [
      1
     ],
     [
      2
     ],
     [
      3
     ],
     [
      4
     ],
     [
      5
     ],
     [
      6
     ],
     [
      7
     ],
     [
      8
     ],
     [
      9
     ],
     [
      10
     ]
    ]
   },
   "nguon": {
    "quyen": 4,
    "trich": "樞要經曰血支其日忌針刺出血"
   },
   "nen": [],
   "ky": [
    "cham-cuu"
   ],
   "nenHan": [],
   "kyHan": [
    "針刺"
   ],
   "trichNghiKy": [
    "忌上册進表章頒詔施恩封拜詔命公卿招賢舉正直宣布政事慶賜賞賀宴㑹行幸遣使出師上官赴任臨政親民結婚姻納采問名嫁娶進人口般移安牀求醫療目營建宫室修宮室興造動土豎柱上梁開市開倉庫出貨財修置產室開渠穿井",
    "又為血支專忌針刺",
    "子午夘酉月值王日辰戌丑未月值官日天吏與天德月德天德合月德合天赦天願併凡所忌者則不註宜所宜者亦不註忌不與德合赦願併如常例寅申巳亥月值月煞從月煞論"
   ],
   "binhLuan": "按閉日本不為凶第取建前斂息之義故所忌如此然斂息乃天地自然之用故子午夘酉月王日之吉亦與辰戌丑未月之值天吏者等與德合赦願併雖不註忌亦不註宜否則如常例也寅申巳亥月閉日未交本令正當斂息之時且又值月煞故從月煞論也滿日兼取月恩四相而閉日不取者方閉無取發生也舊本不忌出行出師今以義推之出行與赴任事同一例出師尤出行之大者故並忌之"
  },
  {
   "ma": "tho-phu",
   "ten": "Thổ Phù",
   "han": "土符",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      8
     ],
     [
      0
     ],
     [
      1
     ],
     [
      5
     ],
     [
      9
     ],
     [
      2
     ],
     [
      6
     ],
     [
      10
     ],
     [
      3
     ],
     [
      7
     ],
     [
      11
     ],
     [
      4
     ]
    ],
    "quyTac": "正月丑二月巳三月酉四月寅五月午六月戌七月夘八月未九月亥十月辰十一月申十二月子"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰土符者正月丑二月巳三月酉四月寅五月午六月戌七月夘八月未九月亥十月辰十一月申十二月子"
   },
   "nen": [],
   "ky": [
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "sua-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "lam-duong",
    "pha-do",
    "trong-trot",
    "dao-huyet"
   ],
   "nenHan": [],
   "kyHan": [
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "修倉庫",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣",
    "修飾垣墻",
    "平治道塗",
    "破屋壞垣",
    "栽種",
    "破土"
   ],
   "trichNghiKy": [
    "忌營建宮室修宫室繕城郭築隄防興造動土修倉庫修置産室開渠穿井安碓磑補垣修飾垣墻平治道塗破屋壞垣栽種破土",
    "與德合赦願併猶忌"
   ]
  },
  {
   "ma": "dia-nang",
   "ten": "Địa Nang",
   "han": "地囊",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-canchi",
    "bang": [
     [
      7,
      57
     ],
     [
      21,
      31
     ],
     [
      36,
      6
     ],
     [
      19,
      49
     ],
     [
      0,
      50
     ],
     [
      15,
      25
     ],
     [
      4,
      54
     ],
     [
      19,
      29
     ],
     [
      2,
      32
     ],
     [
      3,
      53
     ],
     [
      4,
      24
     ],
     [
      46,
      36
     ]
    ],
    "quyTac": "正月庚子庚午二月癸未癸丑三月甲子甲寅四月己夘己丑五月戊辰戊午六月癸未癸巳七月丙寅丙申八月丁夘丁巳九月戊辰戊子十月庚戌庚子十一月辛未辛酉十二月乙酉乙未"
   },
   "nguon": {
    "quyen": 6,
    "trich": "歴例曰地囊者正月庚子庚午二月癸未癸丑三月甲子甲寅四月己夘己丑五月戊辰戊午六月癸未癸巳七月丙寅丙申八月丁夘丁巳九月戊辰戊子十月庚戌庚子十一月辛未辛酉十二月乙酉乙未"
   },
   "nen": [],
   "ky": [
    "xay-nha",
    "sua-nha",
    "xay-tuong-rao",
    "dap-de",
    "dong-tho",
    "sua-kho",
    "phong-sinh",
    "dao-gieng",
    "lap-may",
    "bit-lo",
    "sua-tuong",
    "lam-duong",
    "pha-do",
    "trong-trot",
    "dao-huyet"
   ],
   "nenHan": [],
   "kyHan": [
    "營建宮室",
    "修宮室",
    "繕城郭",
    "築隄防",
    "興造動土",
    "修倉庫",
    "修置產室",
    "開渠穿井",
    "安碓磑",
    "補垣",
    "修飾垣墻",
    "平治道塗",
    "破屋壞垣",
    "栽種",
    "破土"
   ],
   "trichNghiKy": [
    "忌營建宮室修宫室繕城郭築隄防興造動土修倉庫修置産室開渠穿井安碓磑補垣修飾垣墻平治道塗破屋壞垣栽種破土",
    "與德合赦願併猶忌"
   ]
  },
  {
   "ma": "cuu-khong",
   "ten": "Cửu Không",
   "han": "九空",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      10
     ],
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      4
     ],
     [
      1
     ]
    ],
    "quyTac": "正月在辰逆行四季"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰九空者正月在辰逆行四季"
   },
   "nen": [],
   "ky": [
    "nhan-nguoi",
    "sua-kho",
    "khai-truong",
    "ky-ket",
    "nhan-tien",
    "xuat-kho"
   ],
   "nenHan": [],
   "kyHan": [
    "進人口",
    "修倉庫",
    "開市",
    "立券交易",
    "納財",
    "開倉庫出貨財"
   ],
   "trichNghiKy": [
    "忌進人口修倉庫開市立劵交易納財開倉庫出貨財",
    "寅申月值滿日子午卯酉月值開日與月德天德合月德合併則不忌己亥月值月厭從月厭論辰戌丑未月值破日從月破論"
   ],
   "binhLuan": "按九空為三合庫地之衝故所忌如此與德合併則支以干合而忘衝故不忌也若值月厭月破其凶甚於九空故從重論"
  },
  {
   "ma": "cuu-kham",
   "ten": "Cửu Khảm",
   "han": "九坎",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      8
     ],
     [
      5
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      2
     ],
     [
      11
     ]
    ],
    "quyTac": "正月在辰逆行四季五月在卯逆行四仲九月在寅逆行四孟"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰九坎者正月在辰逆行四季五月在卯逆行四仲九月在寅逆行四孟"
   },
   "nen": [],
   "ky": [
    "bit-lo",
    "danh-ca",
    "di-thuyen"
   ],
   "nenHan": [],
   "kyHan": [
    "補垣塞穴",
    "取魚",
    "乘船渡水"
   ],
   "trichNghiKy": [
    "忌補垣塞穴取魚乘船渡水",
    "又為九焦忌鼓鑄栽種修築園圃",
    "與德合併猶忌"
   ],
   "binhLuan": "按九坎九焦忌見義例與德合義不相屬故與併猶忌非謂其日之凶德神不能化解也土符地囊歸忌血忌倣此"
  },
  {
   "ma": "cuu-tieu",
   "ten": "Cửu Tiêu",
   "han": "九焦",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      8
     ],
     [
      5
     ],
     [
      4
     ],
     [
      1
     ],
     [
      10
     ],
     [
      7
     ],
     [
      3
     ],
     [
      0
     ],
     [
      9
     ],
     [
      6
     ],
     [
      2
     ],
     [
      11
     ]
    ],
    "quyTac": "正月在辰逆行四季五月在卯逆行四仲九月在寅逆行四孟"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰正月在辰逆行四季五月在卯逆行四仲九月在寅逆行四孟"
   },
   "nen": [],
   "ky": [
    "duc-kim-loai",
    "trong-trot"
   ],
   "nenHan": [],
   "kyHan": [
    "鼓鑄",
    "栽種",
    "修築園圃"
   ],
   "trichNghiKy": [
    "忌補垣塞穴取魚乘船渡水",
    "又為九焦忌鼓鑄栽種修築園圃",
    "與德合併猶忌"
   ],
   "binhLuan": "按九坎九焦忌見義例與德合義不相屬故與併猶忌非謂其日之凶德神不能化解也土符地囊歸忌血忌倣此"
  },
  {
   "ma": "trung-nhat",
   "ten": "Trùng Nhật",
   "han": "重日",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-chi",
    "bang": [
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ],
     [
      5,
      11
     ]
    ],
    "quyTac": "巳亥"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰重日者己亥二日也"
   },
   "nen": [],
   "ky": [
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌破土安葬啟攢",
    "與天德月德天德合月德合天赦六合併則不忌亦不註宜",
    "復日又宜裁製"
   ],
   "binhLuan": "按舊本重復日忌為凶事利為吉事故忌破土安葬啟攢然其義亦泛矣夫葬乘生氣經有明文今選擇家亦以無禄四廢為凶日若復日則皆令星孟仲月又皆建禄其吉自無可疑己亥為隂陽盡日亦大率云然而推以十二月㕘以三合此二日無皆凶之理乃惟此之忌而不避刑厭三煞之凶且所宜又止於鳴吠日而舍德赦六合之吉而不知用是與嫁娶之僅取不將而不取德合惟忌章光無翹而不忌刑衝破害等也婚葬為人事之始終而俗論拘忌若此深為不便顧相傳已久遽去之轉不足以牖世故遇鳴吠則忌遇德赦六合則不忌識者自能辨之亦不註宜聊以從俗云爾並詳利用卷"
  },
  {
   "ma": "phuc-nhat",
   "ten": "Phục Nhật",
   "han": "復日",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "thang-can",
    "bang": [
     [
      3,
      9
     ],
     [
      4,
      5
     ],
     [
      0,
      6
     ],
     [
      1,
      7
     ],
     [
      4,
      5
     ],
     [
      2,
      8
     ],
     [
      3,
      9
     ],
     [
      4,
      5
     ],
     [
      0,
      6
     ],
     [
      1,
      7
     ],
     [
      4,
      5
     ],
     [
      2,
      8
     ]
    ],
    "quyTac": "正七月甲庚二八月乙辛四十月丙壬五十一月丁癸三九六十二月戊巳"
   },
   "nguon": {
    "quyen": 5,
    "trich": "歴例曰復日者正七月甲庚二八月乙辛四十月丙壬五十一月丁癸三九六十二月戊巳日也"
   },
   "nen": [],
   "ky": [
    "dao-huyet",
    "an-tang",
    "cai-tang"
   ],
   "nenHan": [],
   "kyHan": [
    "破土",
    "安葬",
    "啓攢"
   ],
   "trichNghiKy": [
    "忌破土安葬啟攢",
    "與天德月德天德合月德合天赦六合併則不忌亦不註宜",
    "復日又宜裁製"
   ],
   "binhLuan": "按舊本重復日忌為凶事利為吉事故忌破土安葬啟攢然其義亦泛矣夫葬乘生氣經有明文今選擇家亦以無禄四廢為凶日若復日則皆令星孟仲月又皆建禄其吉自無可疑己亥為隂陽盡日亦大率云然而推以十二月㕘以三合此二日無皆凶之理乃惟此之忌而不避刑厭三煞之凶且所宜又止於鳴吠日而舍德赦六合之吉而不知用是與嫁娶之僅取不將而不取德合惟忌章光無翹而不忌刑衝破害等也婚葬為人事之始終而俗論拘忌若此深為不便顧相傳已久遽去之轉不足以牖世故遇鳴吠則忌遇德赦六合則不忌識者自能辨之亦不註宜聊以從俗云爾並詳利用卷",
   "ghiChu": [
    "Q10: 復日又宜裁製 — Phục Nhật có một việc nên riêng (cắt may)."
   ]
  },
  {
   "ma": "nguyet-ky-nhat",
   "ten": "Nguyệt Kỵ Nhật",
   "han": "月忌日",
   "loai": "hung",
   "chiChu": true,
   "dinhNghia": {
    "kieu": "am-lich",
    "ngay": [
     5,
     14,
     23
    ]
   },
   "nguon": {
    "quyen": 6,
    "trich": "齊東野語曰俗以每月初五十四二十三日為月忌凡事必避之其說不經後見衛道夫云聞前輩云此三日即河圖之中宫五宫五數耳五為君象故民庶不可用此說頗有理"
   },
   "nen": [
    "te-le",
    "tiec-tung",
    "tam-goi",
    "cat-toc",
    "chua-benh",
    "bit-lo",
    "don-dep",
    "sua-tuong",
    "lam-duong"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "宴會",
    "沐浴",
    "整容剃頭",
    "整手足甲",
    "求醫療病",
    "補垣",
    "掃舍宇",
    "修飾垣墻",
    "平治道塗"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "止註祭祀宴㑹沐浴整容剃頭整手足甲求醫療病補垣掃舍宇修飾垣牆平治道塗餘事不註",
    "見義例"
   ],
   "ghiChu": [
    "Sách xếp vào loại 'chỉ chú một số việc' (止註祭祀宴會沐浴…餘事不註) chứ không phải đại hung; nen lấy từ danh sách 止註."
   ]
  },
  {
   "ma": "vo-loc-nhat",
   "ten": "Vô Lộc Nhật (Thập ác đại bại)",
   "han": "無祿日",
   "loai": "hung",
   "tenKhac": [
    "十惡大敗日"
   ],
   "chiChu": true,
   "dinhNghia": {
    "kieu": "ngay-canchi",
    "ds": [
     40,
     41,
     16,
     17,
     32,
     34,
     23,
     25,
     8,
     59
    ],
    "quyTac": "甲辰乙巳庚辰辛巳丙申戊戌丁亥己丑壬申癸亥"
   },
   "nguon": {
    "quyen": 5,
    "trich": "通書云甲辰乙巳庚辰辛巳丙申戊戌丁亥己丑壬申癸亥此十日禄皆落空故云無禄"
   },
   "nen": [
    "te-le",
    "giai-tru",
    "tam-goi",
    "cat-toc",
    "don-dep",
    "sua-tuong",
    "lam-duong",
    "pha-do",
    "chat-cay"
   ],
   "ky": [],
   "nenHan": [
    "祭祀",
    "解除",
    "沐浴",
    "整容剃頭",
    "整手足甲",
    "掃舍宇",
    "修飾垣墻",
    "平治道塗",
    "破屋壞垣",
    "伐木"
   ],
   "kyHan": [],
   "trichNghiKy": [
    "止註祭祀解除沐浴整容剃頭整手足甲掃舍宇修飾垣墻平治道塗破屋壞垣伐木餘事不註",
    "與天德月德併則不以無禄論寅年月甲辰日卯年月乙巳日巳年月丙申戊戌日午年月丁亥己丑日申年月庚辰日酉年月辛巳日亥年月壬申日歲月填實禄空亦不以無禄論雨水後壬申日榖雨後辛巳日小滿後庚辰日大暑後丁亥己丑日處暑後丙申戊戌日霜降後乙巳日小雪後甲辰日太陽填實禄空亦不以無禄論甲巳年亥卯未月己丑日乙庚年己酉丑月乙巳日丙辛年寅午戌月辛巳日丁壬年申子辰月丁亥日嵗德合月德合所㑹之辰亦不以無祿論乙庚年亥月庚辰日丙辛年巳月丙申日丁壬年寅月壬申日戊癸年申月戊戌日天徳合歳徳所㑹之辰亦不以無祿論甲年月甲辰日乙年月乙巳日丙年月丙申日丁年月丁亥日戊年月戊戌日巳年月己丑日庚年月庚辰日辛年月辛巳日壬年月壬申日歳徳嵗徳合天干三朋亦不以無祿論惟癸亥為干支俱盡日雖值天月二徳歳月太陽填實歳徳㑹合仍以無祿論"
   ],
   "binhLuan": "按無祿日以干祿落旬空故諸事不宜惟祭祀解除等事不嫌其空故遇有所宜之神則不忌與天徳月徳併則三合成祿旺之局月建太陽填實則一月皆祿旺之宫至於嵗建填實嵗徳㑹合尤以嵗君為主而旬空不足道矣故不以無祿論也癸亥干支俱盡與上朔晦日同義又交中氣日嵗徳嵗徳合日每年不同故月表與萬年書俱不論無祿日臨時選用詳萬年書鋪註條例",
   "ghiChu": [
    "Q10 nêu nhiều ngoại lệ theo năm/tiết khí (歲月填實禄空, 太陽填實…) chưa mã hoá; nen lấy từ danh sách 止註."
   ]
  },
  {
   "ma": "nhan-than-so-tai",
   "ten": "Nhân Thần Sở Tại",
   "han": "人神所在日",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "am-lich",
    "ngay": [
     1,
     6,
     12,
     15,
     19,
     21,
     23
    ]
   },
   "nguon": {
    "quyen": 10,
    "trich": "十二日在髮際十五日在徧身忌剃頭一日在足大指六日在手十五日在徧身十九日在足二十一日在手小指二十三日在肝及足忌整手足甲"
   },
   "nen": [],
   "ky": [
    "cat-toc"
   ],
   "nenHan": [],
   "kyHan": [
    "剃頭",
    "整手足甲"
   ],
   "trichNghiKy": [
    "十二日在髮際十五日在徧身忌剃頭一日在足大指六日在手十五日在徧身十九日在足二十一日在手小指二十三日在肝及足忌整手足甲"
   ],
   "ghiChu": [
    "[I] Sách tách: 12, 15 kỵ cạo đầu; 1, 6, 15, 19, 21, 23 kỵ cắt móng. Vì việc 'cat-toc' gộp cả hai nên bảng ngày là hợp của hai nhóm."
   ]
  },
  {
   "ma": "muoi-lam-nhat",
   "ten": "Ngày rằm (十五日)",
   "han": "十五日",
   "loai": "hung",
   "dinhNghia": {
    "kieu": "am-lich",
    "ngay": [
     15
    ]
   },
   "nguon": {
    "quyen": 10,
    "trich": "義同朢日"
   },
   "nen": [],
   "ky": [
    "chua-benh"
   ],
   "nenHan": [],
   "kyHan": [
    "求醫療病"
   ],
   "trichNghiKy": [
    "忌求醫療病",
    "義同朢日"
   ]
  }
 ],
 "nguyenTac": [
  {
   "quyen": 10,
   "cau": "易傳曰爻彖以情言吉凶以情遷神煞之有宜忌情也有其情即有其力力有相勝則其情隨之而變矣舊厯宜忌多與神煞名義不合且凡吉神所宜之事一遇凶煞則無論輕重而概忌之尤為未當今即其情之愛惡與其力之大小分合考訂然後趨避各當而取舍得宜非惟利用前民亦扶陽抑隂之意也作宜忌"
  },
  {
   "quyen": 10,
   "cau": "又按舊本凡吉神遇凶煞皆從忌而不從宜不但吉凶無大小之分即凶煞所忌亦諸月皆同無輕重之别於理固屬不合於事尤為不便夫即一凶煞而論各月之衰旺已有不同又况吉與吉併凶與凶併吉復與凶併其性情氣力至賾不齊亦安得一例而槩忌之乎今㕘互較量除建破等日條例簡易及專忌之日無庸分别外餘分為六等其上吉足勝凶從宜不從忌上次吉足抵凶遇德從宜不從忌不遇從宜亦從忌中等吉不抵凶遇德則吉勝從宜不從忌不遇從忌不從宜中次凶勝於吉遇德始相抵從宜亦從忌不遇從忌不從宜其下凶又逢凶遇德從忌不從宜不遇諸事皆忌最下凶叠大凶遇德仍諸事皆忌然後吉凶輕重各有區分而用靜用作趨避各當云表例並列於後"
  },
  {
   "quyen": 10,
   "cau": "按選擇宗鏡曰建破平收俗之所忌惟破日最凶建日吉多可用又曰月建為吉凶衆神之主疊吉星則吉疊凶星則凶葢月建本非凶日第以其為一月令氣之主故又名小時如太嵗之不敢犯耳若與德合天赦月恩四相併則益助吉神之力故動土伐木之外一切皆不忌遇刑厭則從刑厭論者刑厭之凶甚於月建故也"
  },
  {
   "quyen": 10,
   "cau": "按六黃道以位置得宜為吉猶秩叙典禮無徃不宜也舊本謂宜修宫室繕城郭結婚姻進人口則無義例可推今選時之法謂諸事皆宜而無專宜之事六黑道亦無專忌之事當以時例為斷"
  },
  {
   "quyen": 11,
   "cau": "選擇用事宜忌備矣然鋪註萬年書則以事為經以神為緯選擇吉日時則以神為目以事為綱蓋鋪註以事序而選擇由事起也"
  },
  {
   "quyen": 11,
   "cau": "御用六十七事民用三十七事通書載選擇六十事今以次合為一編而分列宜忌於事下依事之次第察其所宜忌之日而分註之則輕重去取可辨矣作用事"
  },
  {
   "quyen": 11,
   "cau": "右用事與宜忌相為經緯療目針刺無宜日與療病同也鼓鑄苫蓋無宜日與修造同也遠迴乘船渡水無宜日除所忌之外無日不宜也"
  },
  {
   "quyen": 10,
   "cau": "凡鋪註萬年書通書先依用事次第察其所宜忌之日於某日下註宜某事某日下註忌某事次按宜忌較量其吉凶之輕重以定去取",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡宜宣政事布政事之日止註宜宣政事",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡宜營建宫室修宫室之日止註宜營建宫室",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉足勝凶從宜不從忌者如遇徳猶忌之事則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註宜亦不註忌者如遇徳猶忌之事則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡徳合赦願月恩四相時徳等日不註忌進人口安牀經絡醖釀開市立劵交易納財開倉庫出貨財如遇徳猶忌及從忌不從宜之日則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡天狗寅日忌祭祀不註宜求福祈嗣",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡夘日忌穿井不註宜開渠壬日忌開渠不註宜穿井凡巳日忌出行不註宜出師遣使",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡酉日忌宴㑹亦不註宜慶賜賞賀",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡丁日忌剃頭亦不註宜整容",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌祈福亦不註忌求嗣",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡忌詔命公卿招賢不註宜施恩封拜舉正直襲爵受封",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡忌施恩封拜舉正直襲爵受封亦不註宜詔命公卿招賢",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡宜宣政事之日遇往亡則改宣為布",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡月厭忌行幸上官不註宜頒詔施恩封拜詔命公卿招賢舉正直遇宜宣政事之日則改宣為布",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌結婚姻亦不註忌冠帶納采問名嫁娶進人口如遇徳猶忌之日則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌嫁娶亦不註忌冠帶結婚姻納采問名進人口般移安牀如遇徳猶忌之日則仍註忌遇不將而不註忌嫁娶者亦仍註忌遇亥日厭對八專四忌四窮而仍註忌嫁娶者止註所忌之事其不忌者仍不註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌般移亦不註忌安牀不註忌安牀亦不註忌般移如遇徳猶忌之日則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌解除亦不註忌整容剃頭整手足甲如遇徳猶忌之日則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌修造動土豎柱上梁亦不註忌修宫室繕城郭築隄防修倉庫鼓鑄苫葢修置産室開渠穿井安碓磑補垣塞穴修飾垣牆平治道塗破屋壊垣如遇徳猶忌之日則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌開市亦不註忌立劵交易納財不註忌納財亦不註忌開市立劵交易不註忌立劵交易亦不註忌開市納財",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌開市立劵交易亦不註忌開倉庫出貨財如遇專忌之日則仍註忌",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵不註忌牧養亦不註忌納畜不註忌納畜亦不註忌牧養",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡吉凶相抵有宜安葬不註忌啟攢有宜啟攢不註忌安葬",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡土府土符地囊止註忌補垣亦不註宜塞穴",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡開日不註宜破土安葬啟攢亦不註忌遇忌則註凡四忌四窮止忌安葬如遇鳴吠鳴吠對亦不註宜破土啟攢",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡天吏大時不以死敗論者遇四廢嵗薄逐陣仍以死敗論",
   "muc": "鋪註條例"
  },
  {
   "quyen": 10,
   "cau": "凡嵗薄逐陣日所宜事照月厭所忌刪所忌仍從本日二月甲戌四月丙申六月甲子七月戊申八月庚辰九月辛夘十月甲子十二月甲子徳合與赦願所㑹之辰諸事不忌",
   "muc": "鋪註條例"
  }
 ],
 "thieu": [
  {
   "han": "血忌",
   "ly": "Quyển 6 mục lục có 血忌 (sau 續世) nhưng bản Wikisource bỏ trống đoạn đó (dòng 447–465 rỗng), không có bảng tháng; Q11 chỉ ghi 針刺忌血支血忌. Không bịa."
  },
  {
   "han": "荒蕪",
   "ly": "Không xuất hiện trong các quyển đã tải (03, 04, 05, 06, 07, 08, 10, 11, 36)."
  },
  {
   "han": "天狗",
   "ly": "Q4 định nghĩa 常居月建前二辰 (trùng Mãn nhật) nhưng Q10 ghi '申月又為天狗忌祭祀', Q11 ghi '祭祀忌天狗寅日' — ba chỗ không nhất quán, chưa xác định được ngày; để UNKNOWN."
  },
  {
   "han": "氣往亡",
   "ly": "Tính theo số ngày sau tiết khí (立春後七日…), không thuộc các kiểu dữ liệu theo tháng; chưa mã hoá."
  },
  {
   "han": "四離四絶 上朔 晦日 伏社 朔弦望 土王用事 長星短星 百忌日 反支 二至二分",
   "ly": "Phụ thuộc tiết khí, ngày sóc hoặc can/chi ngày riêng lẻ; Q10 xếp vào nhóm 'mỗi năm khác nhau, nguyệt biểu không ghi'; chưa mã hoá (có thể bổ sung sau)."
  },
  {
   "han": "兵福 兵寶 兵吉 兵禁 大煞 專日 伐日 寶日 義日 制日 觸水龍 八風 天獄",
   "ly": "Thần sát quân sự hoặc chỉ kỵ đi thuyền; không ánh xạ sang việc đời nay nên tạm bỏ qua."
  }
 ]
};
if (typeof window !== "undefined") window.XN_THAN_SAT = XN_THAN_SAT;
