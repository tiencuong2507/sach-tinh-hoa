// Sáu giai đoạn của mọi việc — dựng từ cấu trúc sáu hào: Sơ, Nhị, Tam, Tứ, Ngũ, Thượng. Trang "gd".
// goc.zh: câu Hệ từ hạ (chương 7 và 8 theo Wikisource 易傳/繫辭下, phạm vi công cộng); tool tools/kiem-tra-cam-nang.mjs dò lại trong nguon/zh-truyen/繫辭下.txt.
// hao[].zh: hào từ chép đúng data/nguyen-van.js (Wikisource 周易), dò lại trong nguon/zh/NN.txt. hv: một âm tiết một chữ Hán.
// tenDoi, y, dich, dauHieu, nen, khongNen, tinhHuong, cauHoi, xacDinh: BẢN BIÊN SOẠN CỦA KHO (25/10/2026), theo định hướng Kinh Dịch là cẩm nang sống,
// KHÔNG phải lời người xưa; tình huống là chuyện đời nay dựng lên, tên người và địa danh không chỉ ai cụ thể.
window.KD_SAU_GIAI_DOAN = {
moDau: "Mỗi quẻ có sáu hào, đọc từ dưới lên. Sáu hào là sáu bước của một việc: mới bắt đầu, có chỗ đứng, chuyển tiếp, gần người quyết định, làm chủ, rồi quá đà và lui. Việc gì cũng đi qua sáu bước ấy: một dự án, một nghề, một mối quan hệ, một khoản tiền. Biết mình đang ở bước nào thì biết nên làm gì và không nên làm gì. Đây là cách đọc Dịch không cần gieo.",
gd: [
{i: 0, ten: "Sơ", tenDoi: "Mới bắt đầu, còn ẩn",
 goc: {zh: "其初難知，其上易知，本末也。初辭擬之，卒成之終。", trang: "b6",
  hv: "Kỳ sơ nan tri, kỳ thượng dị tri, bản mạt dã. Sơ từ nghĩ chi, tốt thành chi chung.",
  dich: "Bước đầu khó biết, bước cuối dễ biết, vì một đằng là gốc, một đằng là ngọn. Lời hào đầu chỉ mới ướm thử; đến hào cuối việc mới thành hình trọn vẹn."},
 y: "Hào Sơ nằm dưới cùng, chưa ai nhìn thấy. Việc mới có trong đầu mình hoặc mới làm được vài tuần. Chưa có kết quả, chưa có người theo. Chỗ này không nguy, nhưng dễ nản và dễ vội.",
 hao: [
  {n: 1, h: 0, zh: "初九：潛龍勿用。", dich: "Rồng còn ẩn dưới nước, chưa phải lúc dùng."},
  {n: 2, h: 0, zh: "初六：履霜，堅冰至。", dich: "Giẫm lên sương mỏng, biết băng dày sắp đến: dấu hiệu nhỏ báo việc lớn."},
  {n: 3, h: 0, zh: "初九：磐桓，利居貞，利建侯。", dich: "Còn quanh quẩn chưa đi được; nên ở yên giữ vững, nên gây dựng người giúp mình."},
  {n: 24, h: 0, zh: "初九：不遠復，无祇悔，元吉。", dich: "Đi chưa xa mà quay lại ngay, chưa đến mức phải hối; rất tốt."}],
 dauHieu: [
  "Việc mới có trong sổ tay hoặc mới làm được vài tuần, chưa ai hỏi tới.",
  "Mình làm một mình, buổi tối hoặc cuối tuần, chưa dám nói với nhiều người.",
  "Chưa có đồng nào thu về; tiền bỏ ra còn nhỏ, chủ yếu là thời gian.",
  "Nghề mới: còn học việc, làm theo người khác bảo, chưa ai giao hẳn một việc.",
  "Quan hệ mới: mới quen, chưa biết người kia muốn gì, mình cũng chưa rõ mình muốn gì.",
  "Mình hay tự hỏi: có nên làm tiếp không, hay bỏ cho xong."],
 nen: [
  "Làm đều mỗi ngày một ít, không cần ai biết; lấy cái đều làm sức.",
  "Ghi lại dấu hiệu nhỏ (một lời khen, một người hỏi mua, một lỗi lặp lại) vì chúng báo trước việc lớn.",
  "Tìm một hai người cùng chí hướng, không cần đông.",
  "Nếu thấy mình đi sai, quay lại ngay khi còn gần; lúc này quay lại rẻ nhất."],
 khongNen: [
  "Khoe sớm, hứa sớm, chi tiền lớn sớm.",
  "So mình với người đã ở bước năm; họ đi trước mình nhiều năm.",
  "Bỏ cuộc chỉ vì chưa có kết quả; bước này không có kết quả là chuyện thường."],
 tinhHuong: "Anh Toàn, 29 tuổi, kỹ sư phần mềm ở Hà Nội, muốn làm ứng dụng quản lý tiệm sửa xe cho ông chú. Ba tháng đầu anh viết tối thứ bảy, chưa dám xin nghỉ việc, chưa kể cho đồng nghiệp. Anh ghi vào sổ mỗi lần ông chú than một việc: quên lịch khách, lẫn phụ tùng, thất lạc giấy bảo hành. Sổ ấy sau thành danh sách tính năng đầu tiên. Anh không cần ai khen, chỉ cần mỗi tuần thêm được một màn hình."},

{i: 1, ten: "Nhị", tenDoi: "Bắt đầu lộ ra, đã có chỗ đứng",
 goc: {zh: "二與四同功而異位，其善不同：二多譽，四多懼，近也。", trang: "b7",
  hv: "Nhị dữ tứ đồng công nhi dị vị, kỳ thiện bất đồng: nhị đa dự, tứ đa cụ, cận dã.",
  dich: "Hào Hai và hào Bốn cùng một loại vị trí nhưng khác chỗ, nên cái tốt khác nhau: hào Hai được khen nhiều, hào Bốn lo sợ nhiều, vì hào Bốn ở sát người trên."},
 y: "Hào Nhị ở giữa quẻ dưới: đã lộ ra, có chỗ đứng, được người quanh mình tin. Chưa phải đỉnh, nhưng xa người quyết định nên ít bị soi. Đây là bước được khen nhiều nhất; dễ chịu, nhưng cũng dễ ở lại mãi.",
 hao: [
  {n: 1, h: 1, zh: "九二：見龍在田，利見大人。", dich: "Rồng đã hiện trên ruộng, ai cũng thấy; nên tìm gặp người lớn có thể nâng mình lên."},
  {n: 2, h: 1, zh: "六二：直方大，不習无不利。", dich: "Thẳng, vuông, rộng; không cần gò ép mà việc gì cũng thuận."},
  {n: 15, h: 1, zh: "六二：鳴謙，貞吉。", dich: "Nhún nhường mà tiếng tự vang ra; giữ vững thì tốt."},
  {n: 16, h: 1, zh: "六二：介于石，不終日，貞吉。", dich: "Vững như đá; thấy điều cần làm thì làm ngay, không đợi hết ngày; giữ vững thì tốt."}],
 dauHieu: [
  "Việc đã có kết quả người khác nhìn thấy: sản phẩm chạy, khách đầu tiên trả tiền, bài đầu tiên được đăng.",
  "Có vài người tin mình và nói tốt về mình khi mình không có mặt.",
  "Nghề: được giao hẳn một việc, làm xong không ai phải sửa lại.",
  "Tiền: có thu, chưa nhiều, nhưng đều.",
  "Quan hệ: hai bên đã rõ ý nhau, gặp đều, có người quen chung.",
  "Sếp hoặc người lớn bắt đầu để mắt tới mình."],
 nen: [
  "Giữ đúng mức: đúng việc, đúng lời, không hơn không kém.",
  "Chủ động gặp người có thể nâng mình lên; đừng đợi họ tìm.",
  "Làm thật tốt một việc để có tên; chưa cần làm nhiều việc.",
  "Ghi lại cách mình làm được việc, vì sau này phải dạy người khác."],
 khongNen: [
  "Nhận lời khen rồi tưởng mình đã là người chủ việc.",
  "Vội mở rộng khi chân chưa đứng vững: thêm sản phẩm, thêm chi nhánh, thêm người.",
  "Ở lại bước này quá lâu vì thấy dễ chịu; sẽ có lúc phải bước sang bước ba."],
 tinhHuong: "Chị Hạnh mở tiệm bánh nhỏ ở Nha Trang, năm thứ hai. Mỗi ngày bán hết 80 bánh mì, có một quán cà phê đặt đều. Khách khen trên mạng, hai người quen rủ mở thêm điểm. Chị không mở. Chị dành ba tháng viết lại công thức, giờ nướng, cách giữ bột, để tiệm chạy được khi chị nghỉ một ngày. Rồi chị đến gặp chủ quán cà phê, hỏi họ còn thiếu gì. Câu trả lời là bánh ngọt cho buổi chiều. Đó là việc tiếp theo của chị, không phải điểm bán thứ hai."},

{i: 2, ten: "Tam", tenDoi: "Chỗ chuyển tiếp, dễ nguy",
 goc: {zh: "三與五同功而異位，其遇不同：三多凶，五多功，貴賤之等也。", trang: "b7",
  hv: "Tam dữ ngũ đồng công nhi dị vị, kỳ ngộ bất đồng: tam đa hung, ngũ đa công, quý tiện chi đẳng dã.",
  dich: "Hào Ba và hào Năm cùng loại vị trí nhưng khác chỗ, nên gặp phải khác nhau: hào Ba nhiều rủi, hào Năm nhiều công, vì một đằng thấp một đằng cao."},
 y: "Hào Tam ở đỉnh quẻ dưới, sắp bước sang quẻ trên. Đã hết chỗ cũ mà chưa tới chỗ mới. Người ở đây hay quá sức, quá lời, quá tự tin. Dịch gọi đây là hào nhiều rủi nhất. Không phải vì xấu, mà vì đang bước qua ngưỡng.",
 hao: [
  {n: 1, h: 2, zh: "九三：君子終日乾乾，夕惕若；厲，无咎。", dich: "Người quân tử cả ngày gắng gỏi, tối còn lo soát lại; có nguy nhưng không lỗi."},
  {n: 11, h: 2, zh: "九三：无平不陂，无往不復，艱貞无咎。", dich: "Không chỗ bằng nào không có lúc dốc, không đi nào không có lúc về; chịu khó giữ vững thì không lỗi."},
  {n: 29, h: 2, zh: "六三：來之坎坎，險且枕，入于坎窞，勿用。", dich: "Tới lui đều là hố; nguy mà còn nằm trên nguy, càng động càng sâu; đừng làm gì."},
  {n: 34, h: 2, zh: "九三：小人用壯，君子用罔，貞厲。羝羊觸藩，羸其角。", dich: "Kẻ nhỏ dùng sức, người lớn biết dừng; cố giữ thì nguy. Dê húc rào, kẹt sừng."}],
 dauHieu: [
  "Việc đang đổi cỡ: từ một mình sang có người làm cùng, từ một cửa hàng sang hai, từ nhân viên sang trưởng nhóm.",
  "Mình làm nhiều giờ hơn trước nhưng kết quả không tăng theo.",
  "Bắt đầu có người nói ra nói vào; có người cũ không hợp với cách mới.",
  "Tiền: chi tăng trước, thu tăng sau; tháng nào cũng hụt một ít.",
  "Quan hệ: nói chuyện về sống chung, cưới, góp tiền, tức là chuyển sang một đời sống khác.",
  "Mình nóng hơn ngày thường, hay nói câu quá đà rồi tiếc."],
 nen: [
  "Làm cho đủ rồi dừng; tối soát lại việc hôm nay, đừng mang sang mai.",
  "Nói ít hơn một nửa; bước này lời nói dễ thành nợ.",
  "Giữ sổ tiền từng tuần, không để sang tháng.",
  "Chuẩn bị cho chỗ mới: học việc của bước tiếp, hỏi người đã đi qua."],
 khongNen: [
  "Cố húc tới khi thấy kẹt; kẹt là dấu hiệu dừng, không phải dấu hiệu húc mạnh hơn.",
  "Đi vay lớn hoặc ký hợp đồng dài ngay lúc đang chuyển.",
  "Bỏ hết người cũ, cách cũ trong một lần."],
 tinhHuong: "Xưởng mộc của anh Phúc ở Bình Dương từ 6 người lên 15 người sau khi ký được khách xuất khẩu. Anh vẫn tự đứng máy, tự giao hàng, tối về mới tính tiền. Tháng thứ ba anh giao trễ hai lô, mất một khách cũ, cãi với thợ cả. Anh dừng nhận đơn mới một tháng, giao hẳn tổ máy cho thợ cả, thuê một người làm sổ. Tháng ấy lãi ít nhất năm, nhưng tháng sau không giao trễ lô nào. Anh nói đó là tháng anh học làm chủ xưởng thay vì làm thợ giỏi nhất xưởng."},

{i: 3, ten: "Tứ", tenDoi: "Gần người quyết định, do dự",
 goc: {zh: "二多譽，四多懼，近也。柔之為道，不利近者，其要無咎，其用柔中也。", trang: "b7",
  hv: "Nhị đa dự, tứ đa cụ, cận dã. Nhu chi vi đạo, bất lợi cận giả, kỳ yếu vô cữu, kỳ dụng nhu trung dã.",
  dich: "Hào Hai được khen nhiều, hào Bốn lo sợ nhiều, vì ở sát người trên. Cái mềm thì không lợi khi ở sát; cốt sao không lỗi, nhờ biết mềm mà giữ mức."},
 y: "Hào Tứ ở đáy quẻ trên, ngay dưới hào Ngũ là chủ việc. Mình đã lên cao, ngồi gần người quyết định, lời mình có người nghe. Nhưng mình chưa phải người chốt. Bước này nhiều lo: tiến thì sợ lấn, lùi thì sợ mất chỗ.",
 hao: [
  {n: 1, h: 3, zh: "九四：或躍在淵，无咎。", dich: "Hoặc nhảy lên, hoặc còn ở vực; chưa quyết hẳn, không lỗi."},
  {n: 2, h: 3, zh: "六四：括囊，无咎无譽。", dich: "Thắt miệng túi lại, giữ kín; không lỗi, cũng không được khen."},
  {n: 35, h: 3, zh: "九四：晉如鼫鼠，貞厲。", dich: "Tiến lên như con chuột lớn, tham mà sợ; giữ thế ấy thì nguy."},
  {n: 16, h: 3, zh: "九四：由豫，大有得。勿疑。朋盍戠。", dich: "Niềm vui của mọi người do mình mà có; được lớn. Đừng nghi ngờ, bạn bè sẽ tụ về."}],
 dauHieu: [
  "Mình là phó, là trợ lý, là trưởng nhóm dưới một người quyết định cuối.",
  "Người trên hỏi ý mình trước khi quyết, nhưng quyết vẫn là họ.",
  "Mình biết nhiều chuyện nội bộ hơn người ở dưới, và phải giữ mồm.",
  "Tiền: thu đã khá, nhưng phần lớn phụ thuộc vào một người hoặc một nơi.",
  "Quan hệ: sắp về nhà người kia, sắp gặp bố mẹ, sắp bàn chuyện chung tiền; mọi lời đều bị cân.",
  "Hay thấy lo mà không gọi tên được lo cái gì."],
 nen: [
  "Nói đúng lúc, đúng người, và nói ít; giữ kín việc chưa quyết.",
  "Làm tốt phần của mình để người trên yên tâm, không cần họ thấy mình giỏi hơn họ.",
  "Khi người trên quyết rồi, làm hết lòng, dù mình đã góp ý khác.",
  "Nếu phải nhảy lên, nhảy khi có người đỡ; chưa có thì đợi thêm."],
 khongNen: [
  "Tranh công hoặc tỏ ra giỏi hơn người quyết định.",
  "Đem chuyện nội bộ ra nói ngoài để lấy lòng người dưới.",
  "Do dự quá lâu; chưa quyết không lỗi, nhưng mãi không quyết thì mất chỗ."],
 tinhHuong: "Chị Loan là phó giám đốc một công ty xây lắp 60 người ở Hải Phòng, dưới anh giám đốc là người sáng lập. Anh ấy định nhận một gói thầu lớn ở Quảng Ninh mà chị thấy quá sức. Chị không nói trước cuộc họp. Chị gửi riêng cho anh một trang: ba số về dòng tiền, hai rủi ro, một cách nhận một phần gói. Anh quyết nhận cả gói. Chị làm hết sức, không nhắc lại tờ giấy. Nửa năm sau gói chậm tiến độ, anh gọi chị lên bàn lại và từ đó mọi gói thầu đều qua tay chị trước. Chị vẫn là phó, nhưng là phó được tin."},

{i: 4, ten: "Ngũ", tenDoi: "Đỉnh, làm chủ việc",
 goc: {zh: "三多凶，五多功，貴賤之等也。其柔危，其剛勝邪？", trang: "b7",
  hv: "Tam đa hung, ngũ đa công, quý tiện chi đẳng dã. Kỳ nhu nguy, kỳ cương thắng da?",
  dich: "Hào Ba nhiều rủi, hào Năm nhiều công, vì thấp cao khác bậc. Mềm thì nguy, cứng thì hơn chăng?"},
 y: "Hào Ngũ ở giữa quẻ trên: chỗ của người làm chủ việc. Quyết là mình, chịu trách nhiệm là mình, công cũng về mình. Dịch gọi đây là hào nhiều công nhất. Nhưng chủ việc tốt là chủ việc cho người khác dùng được, như giếng nước trong.",
 hao: [
  {n: 1, h: 4, zh: "九五：飛龍在天，利見大人。", dich: "Rồng bay trên trời; vẫn nên gặp người lớn, người giúp mình thấy đúng."},
  {n: 2, h: 4, zh: "六五：黃裳，元吉。", dich: "Mặc xiêm vàng, màu của mức giữa, của người ở cao mà khiêm; rất tốt."},
  {n: 14, h: 4, zh: "六五：厥孚交如，威如；吉。", dich: "Lòng tin của mình qua lại với mọi người, lại có uy; tốt."},
  {n: 48, h: 4, zh: "九五：井冽，寒泉食。", dich: "Giếng trong, nước lạnh, ai cũng uống được."}],
 dauHieu: [
  "Việc chạy theo cách mình đặt ra; người khác hỏi mình trước khi làm.",
  "Mình là người ký, người chốt, người bị gọi khi hỏng.",
  "Nghề: có tên trong ngành, có người theo học, có người xin việc vì mình.",
  "Tiền: thu lớn nhất từ trước tới nay, và nhiều người sống nhờ dòng tiền ấy.",
  "Quan hệ: đã là một nhà; mọi việc lớn nhỏ trong nhà đều trông vào mình.",
  "Ít người dám nói thẳng với mình điều mình không muốn nghe."],
 nen: [
  "Giữ mức giữa: không lấn việc người dưới, không bỏ việc của mình.",
  "Tìm người nói thẳng với mình và giữ họ ở gần.",
  "Làm cho việc chạy được khi mình vắng: viết quy trình, giao quyền, chia thu nhập.",
  "Chuẩn bị người thay mình từ bây giờ, khi còn đủ sức dạy."],
 khongNen: [
  "Tin rằng mình đúng vì mình đang thắng.",
  "Giữ mọi quyết định trong tay; giếng mà đậy nắp thì nước hết trong.",
  "Mở thêm việc chỉ để tiếp tục cảm giác lên; bước sau đỉnh là xuống, không phải đỉnh cao hơn."],
 tinhHuong: "Anh Dũng điều hành chuỗi năm cửa hàng thiết bị điện ở Cần Thơ, 70 nhân viên, năm thứ mười hai. Mọi đơn trên 50 triệu anh duyệt. Một hôm anh đi mổ ruột thừa, nằm viện tám ngày, cửa hàng dừng ba đơn lớn vì không ai dám ký. Ra viện anh làm hai việc. Anh viết mức duyệt cho từng cửa hàng trưởng, và lập một nhóm ba người được quyền cãi anh trong mọi quyết định lớn. Anh nói năm nay anh không mở cửa hàng thứ sáu, anh dựng cho năm cửa hàng cũ chạy được không cần anh."},

{i: 5, ten: "Thượng", tenDoi: "Quá đà, biết lui",
 goc: {zh: "其上易知，本末也。初辭擬之，卒成之終。", trang: "b6",
  hv: "Kỳ thượng dị tri, bản mạt dã. Sơ từ nghĩ chi, tốt thành chi chung.",
  dich: "Bước cuối dễ biết, vì nó là ngọn của gốc. Lời hào đầu chỉ mới ướm; đến hào cuối việc thành hình trọn vẹn, nên dễ nhìn ra."},
 y: "Hào Thượng ở trên cùng, đã qua đỉnh. Việc đã thành hình, ai cũng thấy kết cục. Người ở đây hay đi quá: giữ chức quá lâu, mở rộng quá tay, nói quá nhiều. Dịch không bảo bước này xấu. Dịch bảo: biết lui thì tốt, như múc nước xong để giếng mở cho người sau.",
 hao: [
  {n: 1, h: 5, zh: "上九：亢龍，有悔。", dich: "Rồng lên quá cao, có điều hối."},
  {n: 11, h: 5, zh: "上六：城復于隍，勿用師，自邑告命，貞吝。", dich: "Thành đổ xuống hào; đừng dùng quân, chỉ lo việc trong ấp mình; cố giữ thì khó."},
  {n: 55, h: 5, zh: "上六：豐其屋，蔀其家，窺其戶，闃其无人，三歲不觌，凶。", dich: "Nhà to mái che kín, nhòm cửa thấy vắng không người, ba năm không ai tới; xấu."},
  {n: 48, h: 5, zh: "上六：井收勿幕，有孚元吉。", dich: "Múc nước xong đừng đậy giếng, để người sau dùng; có lòng tin, rất tốt."},
  {n: 33, h: 5, zh: "上九：肥遯，无不利。", dich: "Lui một cách ung dung, đầy đủ; không gì bất lợi."}],
 dauHieu: [
  "Kết quả đi xuống dù mình làm như cũ, hoặc làm nhiều hơn cũ.",
  "Mình thấy mệt với chính việc mình từng mê; người ta cần mình ít hơn.",
  "Nghề: người trẻ làm việc của mình nhanh hơn mình; mình hay kể chuyện ngày xưa.",
  "Tiền: nhà to hơn, xe to hơn, nhưng khách thưa hơn; chi để giữ thể diện nhiều hơn chi để làm.",
  "Quan hệ: cãi nhau về chuyện cũ nhiều hơn chuyện mới; hoặc ngược lại, đã bền tới mức có thể buông tay cho con.",
  "Mình đã nghĩ tới chuyện dừng, nhưng chưa dám nói ra."],
 nen: [
  "Lui khi còn chọn được cách lui; chọn người thay, chọn ngày, chọn cách nói.",
  "Trao lại việc kèm cách làm, như để giếng mở, không đậy.",
  "Thu nhỏ: bớt mặt bằng, bớt lời hứa, bớt việc, giữ phần cốt lõi.",
  "Ghi lại điều mình học được cho người đi sau; đó là việc có ích nhất ở bước này."],
 khongNen: [
  "Cố thêm một lần nữa để chứng minh mình chưa hết thời.",
  "Giữ ghế, giữ quyền, giữ tên trong khi việc đã cần người khác.",
  "Đổ lỗi cho thời, cho người trẻ, cho khách; thành đổ là chuyện của mọi thành."],
 tinhHuong: "Ông Bảy mở lò bánh tráng ở Tây Ninh 35 năm, từng có 20 thợ, bán cả miền. Mười năm gần đây lò bán chậm, ông mở thêm quầy, thêm mẫu, càng thêm càng lỗ. Con gái ông muốn làm bánh tráng gói nhỏ bán online, ông gạt đi hai lần. Lần thứ ba, một buổi tối, ông đưa con cuốn sổ công thức, bảo con làm theo cách con, chỉ xin giữ một lò củ để làm cho hàng xóm. Năm sau quầy đóng hết, lò củ vẫn đỏ mỗi sáng, và tên lò vẫn trên bao bì của con gái. Ông nói lui đúng lúc khó hơn mở lò, nhưng là việc đáng làm nhất đời ông."}
],
// Sáu câu hỏi có/không để tự xác định giai đoạn. Trả lời theo đúng thứ tự, mỗi câu gắn với một giai đoạn.
cauHoi: [
 {q: "Việc này đã có kết quả mà người khác nhìn thấy được chưa?", gd: 1, chuThich: "sản phẩm chạy, khách trả tiền, bài được đăng, việc giao xong không ai phải sửa"},
 {q: "Đã có người tin mình và nói tốt về mình trong việc này chưa?", gd: 1, chuThich: "một khách quen, một người giới thiệu, một người lớn để mắt tới"},
 {q: "Mình đang phải bước từ chỗ quen sang chỗ mới không?", gd: 2, chuThich: "đổi vai, lên cấp, mở rộng, thêm người, đi xa hơn; làm nhiều giờ hơn mà kết quả chưa tăng"},
 {q: "Mình đang ở gần người quyết định, góp ý được, nhưng không phải người chốt?", gd: 3, chuThich: "làm phó, trợ lý, trưởng nhóm dưới một người quyết định cuối"},
 {q: "Mình là người chốt, người chịu trách nhiệm chính của việc này?", gd: 4, chuThich: "mình ký, mình quyết, hỏng thì gọi mình"},
 {q: "Việc đã qua lúc tốt nhất chưa?", gd: 5, chuThich: "kết quả giảm dù làm như cũ, mình mệt hoặc thấy mình thừa, người ta cần mình ít hơn"}
],
// Luật xác định, không ngẫu nhiên: xét từ câu 6 lùi về câu 1, câu nào trả lời "có" trước thì ra giai đoạn ấy; câu 1 và 2 đều "không" là Sơ.
// tl: mảng 6 giá trị true/false. Trả về {i, lyDo, nguoc} với nguoc là chỗ câu trả lời chọi nhau (nếu có).
xacDinh(tl) {
  const co = i => !!tl[i];
  let i, lyDo;
  if (co(5)) { i = 5; lyDo = "Việc đã qua lúc tốt nhất: đây là dấu rõ nhất, nên xếp vào bước Thượng dù các câu khác thế nào."; }
  else if (co(4)) { i = 4; lyDo = "Mình là người chốt và chưa qua đỉnh: bước Ngũ."; }
  else if (co(3)) { i = 3; lyDo = "Mình gần người quyết định mà chưa phải người chốt: bước Tứ."; }
  else if (co(2)) { i = 2; lyDo = "Mình đang bước từ chỗ quen sang chỗ mới: bước Tam, chỗ dễ nguy nhất."; }
  else if (co(0) || co(1)) { i = 1; lyDo = "Việc đã có kết quả hoặc đã có người tin, nhưng mình chưa chuyển cỡ, chưa ở gần người quyết định: bước Nhị."; }
  else { i = 0; lyDo = "Chưa có kết quả nhìn thấy, chưa có người theo: bước Sơ, còn ẩn."; }
  const nguoc = [];
  if (i >= 2 && !co(0) && !co(1)) nguoc.push("Mình xếp ở bước cao nhưng việc chưa có kết quả và chưa có người tin. Có thể mình đang ở bước cao của một việc khác, không phải việc này.");
  if (co(4) && co(3)) nguoc.push("Vừa là người chốt vừa ở gần người chốt: xem lại, việc này ai là người ký cuối cùng?");
  if (co(5) && !co(4) && !co(3)) nguoc.push("Việc đã qua lúc tốt nhất mà mình chưa từng là người chốt hay gần người chốt: có thể việc này không phải việc của mình để lui, mà để rời.");
  return {i, lyDo, nguoc};
}
};
