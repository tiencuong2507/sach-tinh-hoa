// Quy trình quyết định theo Dịch — hướng 4 của cẩm nang (bản đồ NGHIEN-CUU/00-ban-do-kho-sach.md mục 12). Trang "qd".
// Sáu bước = sáu khái niệm đọc quẻ trong dẫn nhập chương 3 (thời, vị, trung chính, ứng, thừa thặng, biến). Mỗi bước một câu hỏi, ba lựa chọn.
// hetu.zh: câu Hệ từ chép đúng Wikisource 易傳/繫辭 (phạm vi công cộng), trang = mã chương trong app (a = thượng, b = hạ); tool tools/kiem-tra-cam-nang-2.mjs dò lại
// trong nguon/zh-truyen và kiểm chương đó có chứa câu. hv: một âm tiết một chữ Hán.
// Giá trị lựa chọn: 1 = thuận, 0 = chưa rõ / lưng chừng, 2 = nghịch. Luật kết luận và BẢNG ÁNH XẠ ra "quẻ của tình thế" (anhXa) là BẢN SOẠN CỦA KHO [I],
// 25/10/2026: một cách xếp tình thế vào tượng quẻ để đọc lời khuyên, KHÔNG phải phép bói, không ngẫu nhiên; cùng câu trả lời luôn ra cùng kết quả.
window.KD_QUYET_DINH = {
moDau: "Trước khi quyết một việc, người xưa đọc quẻ theo sáu điều: thời, vị, trung chính, ứng, thừa thặng, biến. Sáu điều ấy không cần gieo cũng hỏi được. Dưới đây mỗi điều là một câu hỏi, ba cách trả lời. Trả lời xong, luật cố định của kho xếp tình thế của anh vào một quẻ, cho một kết luận (tiến, đợi, lùi hay sửa cách) và ba việc nên làm. Kết quả không ngẫu nhiên: cùng câu trả lời luôn ra cùng quẻ.",
luuY: "Bảng xếp tình thế vào quẻ là của kho soạn, không phải phép bói và không có trong kinh văn. Nó chỉ chọn một tượng gần nhất để anh đọc lời quẻ cho tình thế của mình. Câu Hệ từ ở mỗi bước là nguyên văn; câu hỏi, lựa chọn, luật và lời khuyên là bản soạn của kho.",
buoc: [
{ma: "thoi", ten: "Thời", doi: "đúng lúc chưa",
 hoi: "Việc này làm bây giờ là sớm, đúng lúc, hay đã muộn?",
 giai: "Thời là lúc. Cùng một việc, làm sớm thì phí sức, làm muộn thì hết chỗ. Dấu hiệu đúng lúc: người cần đã có, tiền đủ, mình đã làm thử được một phần.",
 hetu: {zh: "君子藏器於身，待時而動", hv: "Quân tử tàng khí ư thân, đãi thời nhi động.", dich: "Người quân tử giữ sẵn đồ nghề trong mình, đợi đúng lúc mới động.", trang: "b3"},
 chon: [{v: 0, ten: "Sớm", ghi: "chưa có người, chưa đủ tiền, chưa làm thử"}, {v: 1, ten: "Đúng lúc", ghi: "đã thử được, có người chờ, không ai đi trước"}, {v: 2, ten: "Muộn", ghi: "người khác đã làm, cửa đang khép"}]},
{ma: "vi", ten: "Vị", doi: "mình đang ở đúng chỗ không",
 hoi: "Việc này có phải việc của mình, ở vai của mình không?",
 giai: "Vị là chỗ đứng. Hào hai được khen vì ở giữa mà xa người trên; hào bốn lo vì sát người trên. Làm việc không phải vai mình thì dù giỏi cũng vướng.",
 hetu: {zh: "二多譽，四多懼", hv: "Nhị đa dự, tứ đa cụ.", dich: "Hào hai được khen nhiều, hào bốn lo sợ nhiều: cùng tài mà khác chỗ đứng.", trang: "b7"},
 chon: [{v: 0, ten: "Ngoài cuộc", ghi: "việc của người khác, mình chỉ góp ý"}, {v: 1, ten: "Đúng vai", ghi: "việc của mình, mình có quyền quyết"}, {v: 2, ten: "Sai vai", ghi: "mình làm thay vai người khác hoặc chưa đủ quyền"}]},
{ma: "trung", ten: "Trung chính", doi: "đúng mức, đúng đạo không",
 hoi: "Việc này có đúng mức và ngay thẳng không?",
 giai: "Trung là vừa mức, không quá không thiếu. Chính là ngay thẳng, không có chỗ phải giấu. Dịch coi trung quan trọng hơn chính, nhưng không chính thì có họa.",
 hetu: {zh: "吉凶者，貞勝者也", hv: "Cát hung giả, trinh thắng giả dã.", dich: "Tốt hay xấu, rốt cuộc cái chính bền sẽ thắng.", trang: "b0"},
 chon: [{v: 1, ten: "Đúng mức, ngay thẳng", ghi: "vừa sức, công khai được"}, {v: 0, ten: "Ngay thẳng nhưng lệch mức", ghi: "quá tay hoặc chưa tới"}, {v: 2, ten: "Có chỗ không ngay", ghi: "có điều phải giấu, có người bị thiệt oan"}]},
{ma: "ung", ten: "Ứng", doi: "có người hưởng ứng không",
 hoi: "Có ai hưởng ứng, cùng làm, hay giúp mình không?",
 giai: "Ứng là có người đáp lại, như hào hai với hào năm. Việc một mình thì chậm; việc có người cùng chí thì mạnh. Chưa hỏi ai thì chưa biết có ứng không.",
 hetu: {zh: "二人同心，其利斷金", hv: "Nhị nhân đồng tâm, kỳ lợi đoạn kim.", dich: "Hai người cùng lòng, sức bén chặt được cả kim loại.", trang: "a7"},
 chon: [{v: 1, ten: "Có người hưởng ứng", ghi: "có người sẵn sàng góp sức, góp tiền"}, {v: 0, ten: "Chưa rõ", ghi: "chưa hỏi ai, chưa ai trả lời"}, {v: 2, ten: "Không ai theo, có người chống", ghi: "đã hỏi, người ta lắc đầu hoặc cản"}]},
{ma: "thua", ten: "Thừa thặng", doi: "trên dưới, người quanh mình thuận hay nghịch",
 hoi: "Người trên, người dưới, người sát cạnh có thuận với việc này không?",
 giai: "Thừa là người dưới đỡ mình; thặng là người ở trên đè mình. Hào gần nhau mà không hợp thì sinh hại. Người cạnh mình thuận hay nghịch quyết định việc có trôi không.",
 hetu: {zh: "近而不相得，則凶或害之", hv: "Cận nhi bất tương đắc, tắc hung hoặc hại chi.", dich: "Gần nhau mà không hợp nhau thì xấu, hoặc hại nhau.", trang: "b8"},
 chon: [{v: 1, ten: "Thuận", ghi: "trên ủng hộ, dưới sẵn lòng"}, {v: 0, ten: "Nửa thuận nửa không", ghi: "có người theo, có người lưng chừng"}, {v: 2, ten: "Nghịch", ghi: "trên ép, dưới không nghe"}]},
{ma: "bien", ten: "Biến", doi: "việc đang đi lên, đứng yên hay đi xuống",
 hoi: "Việc này, ba tháng qua, đang đi lên, đứng yên hay đi xuống?",
 giai: "Biến là chiều đổi. Dịch dạy cùng thì biến. Việc đang lên thì nương theo; đứng yên thì cần một thay đổi nhỏ; đang xuống thì tính đường rút trước khi cùng.",
 hetu: {zh: "易窮則變，變則通，通則久", hv: "Dịch cùng tắc biến, biến tắc thông, thông tắc cửu.", dich: "Đến cùng thì đổi, đổi thì thông, thông thì bền.", trang: "b1"},
 chon: [{v: 1, ten: "Đang đi lên", ghi: "số liệu, người, tiền đều tăng"}, {v: 0, ten: "Đứng yên", ghi: "không tăng không giảm"}, {v: 2, ten: "Đang đi xuống", ghi: "giảm đều, chưa thấy đáy"}]}
],
ketLuan: {
 tien: {ten: "Tiến", cau: "Việc này nên tiến: thời đúng, chỗ đúng, có người cùng; làm ngay, làm gọn."},
 doi: {ten: "Đợi", cau: "Việc này nên đợi: chưa đủ điều kiện, nhưng không phải bỏ; chuẩn bị trong lúc chờ."},
 lui: {ten: "Lùi", cau: "Việc này nên lùi: thời đã lệch hoặc thế đang xuống; rút có trật tự, giữ phần cốt lõi."},
 sua: {ten: "Sửa cách", cau: "Việc này chưa quyết được tiến hay lùi: phải sửa cách trước, vì có chỗ không ngay hoặc sai vai."}},
// Bảng ánh xạ: xét theo thứ tự, điều kiện đầu tiên khớp thì lấy quẻ ấy; dk rỗng = mặc định của kết luận. [I] bản soạn của kho.
anhXa: [
 {kl: "sua", dk: {trung: 2}, que: 25, vi: "Vô Vọng: không ngay thẳng thì có họa, đi đâu cũng không lợi; sửa chỗ không ngay trước."},
 {kl: "sua", dk: {vi: 2}, que: 50, vi: "Đỉnh: ngôi phải ngay, người phải xứng; vạc gãy chân vì đặt sai chỗ; về đúng vai trước."},
 {kl: "sua", dk: {}, que: 18, vi: "Cổ: việc có chỗ hỏng tích lại; sửa tận gốc rồi mới đi."}, // dự phòng: theo luật hiện tại, sửa cách chỉ tới từ trung=2 hoặc vi=2 nên dòng này không bao giờ được chọn
 {kl: "doi", dk: {thoi: 0, bien: 1}, que: 5, vi: "Nhu: mây lên trời chưa mưa; việc đang lên nhưng chưa đến lúc, đợi mà có lòng tin."},
 {kl: "doi", dk: {thoi: 0, bien: 2}, que: 3, vi: "Truân: buổi đầu gian nan, chưa nên đi tới; dựng người giúp trước."},
 {kl: "doi", dk: {thoi: 0}, que: 9, vi: "Tiểu Súc: mây dày chưa mưa, bị cản bởi cái nhỏ; tích dần trong lúc chờ."},
 {kl: "doi", dk: {ung: 2}, que: 8, vi: "Tỷ: chưa có người theo; tìm người đáng theo và người theo mình trước khi làm."},
 {kl: "doi", dk: {thua: 2}, que: 36, vi: "Minh Di: người quanh mình nghịch; giấu sáng, giữ chính trong gian nan, chờ thời."},
 {kl: "doi", dk: {bien: 2}, que: 52, vi: "Cấn: việc đang xuống mà chưa đủ lẽ để lùi hẳn; dừng, không động, xem lại."},
 {kl: "doi", dk: {}, que: 20, vi: "Quan: chưa đủ dữ kiện; xem xét thêm, tự xét mình rồi mới định tiến lui."},
 {kl: "lui", dk: {bien: 2, thua: 2}, que: 23, vi: "Bác: thế bị bóc dần, người quanh mình nghịch; giữ hạt giống, không mở."},
 {kl: "lui", dk: {bien: 2, ung: 2}, que: 39, vi: "Kiển: việc đang xuống mà không ai cùng, trước mặt là hiểm; đi thì khó, quay lại thì được khen."},
 {kl: "lui", dk: {thoi: 2, bien: 2}, que: 12, vi: "Bĩ: thời đã muộn, việc lại đang xuống, cái lớn đi cái nhỏ đến; thu đức tránh nạn."},
 {kl: "lui", dk: {}, que: 33, vi: "Độn: thời đã muộn, lui đúng lúc là thông; lui đẹp khi còn chọn được cách lui."},
 {kl: "tien", dk: {thoi: 2}, que: 43, vi: "Quải: việc đang lên mà thời sắp hết; quyết nhanh, công khai, không dùng sức thô."},
 {kl: "tien", dk: {vi: 1, ung: 1, thua: 1, bien: 1}, que: 11, vi: "Thái: trời đất giao, trên dưới một lòng; tiến, và lo giữ nền ngay lúc thuận."},
 {kl: "tien", dk: {bien: 1, ung: 1}, que: 42, vi: "Ích: có người cùng, việc đang lên; lợi có việc đi, chia lợi cho người dưới."},
 {kl: "tien", dk: {bien: 0}, que: 46, vi: "Thăng: đủ điều kiện nhưng việc đứng yên; tích nhỏ thành lớn, lên từng bậc."},
 {kl: "tien", dk: {}, que: 53, vi: "Tiệm: tiến dần từng chặng có thứ tự; không đốt cháy giai đoạn."}],
// Lời khuyên theo từng câu trả lời: khi trả lời 2 (nghịch) và 0 (chưa rõ). [I] bản soạn của kho.
khuyen: {
 thoi: {2: "Muộn thì làm gọn: bỏ phần phụ, chỉ làm phần còn kịp.", 0: "Dùng thời gian chờ để chuẩn bị: học, tích vốn, tìm người."},
 vi: {2: "Về đúng vai: việc của ai thì người ấy quyết, mình chỉ góp.", 0: "Hỏi mình việc này có phải việc của mình không; nếu không, góp rồi lui."},
 trung: {2: "Bỏ ngay chỗ không ngay thẳng, dù phải chậm hoặc mất ít.", 0: "Chỉnh mức: quá tay thì bớt, chưa tới thì làm đủ."},
 ung: {2: "Tìm một người cùng chí trước; chưa có thì chưa làm lớn.", 0: "Kể việc cho hai người tin được, nghe họ nói gì."},
 thua: {2: "Nói rõ với người trên, nghe người dưới một lần nữa trước khi làm.", 0: "Xem ai thuận ai không; thuận thì gặp trước, không thuận thì hỏi lý do."},
 bien: {2: "Việc đang xuống: cắt lỗ sớm, giữ sức cho vòng sau.", 0: "Việc đứng yên: thay một yếu tố nhỏ xem có chuyển không."}},
viecMacDinh: {
 tien: ["Làm ngay một việc đầu trong tuần này, nhỏ nhưng thấy được.", "Tiến từng bước, không dốc hết một lần.", "Ghi điều mình quyết vào Sổ chiêm nghiệm để sau chấm."],
 doi: ["Đặt mốc chờ: ngày nào xem lại, dấu hiệu nào thì làm.", "Giữ việc cũ chạy đều trong lúc chờ.", "Ghi điều mình quyết vào Sổ chiêm nghiệm để sau chấm."],
 lui: ["Rút có trật tự: giữ phần cốt lõi, bỏ phần ngoài trước.", "Nói rõ lý do lui với người liên quan, không im lặng bỏ đi.", "Ghi điều mình quyết vào Sổ chiêm nghiệm để sau chấm."],
 sua: ["Sửa cách trước khi sửa việc: đổi vai, đổi mức hoặc đổi đường.", "Sửa xong, trả lời lại sáu câu một lần nữa.", "Ghi điều mình quyết vào Sổ chiêm nghiệm để sau chấm."]},
// Luật kết luận (cố định, [I]): tl = {thoi, vi, trung, ung, thua, bien} mỗi giá trị 0|1|2.
// 1) không ngay thẳng hoặc sai vai → sửa cách. 2) thời sớm → đợi. 3) thời muộn → đang lên thì tiến gọn, không thì lùi.
// 4) thời đúng: không ai theo hoặc người quanh nghịch → đang xuống thì lùi, không thì đợi; còn lại tính điểm (+1 thuận, −1 nghịch): ≥2 tiến, ≤−1 lùi, khác đợi.
xacDinh(tl) {
  const B = this.buoc.map(b => b.ma);
  for (const k of B) if (![0, 1, 2].includes(tl[k])) return null;
  const diem = B.reduce((a, k) => a + (tl[k] === 1 ? 1 : tl[k] === 2 ? -1 : 0), 0);
  let kl, lyDo;
  if (tl.trung === 2) { kl = "sua"; lyDo = "Việc có chỗ không ngay thẳng; Dịch nói không chính thì có họa, nên phải sửa trước khi bàn tiến lui."; }
  else if (tl.vi === 2) { kl = "sua"; lyDo = "Mình đang sai vai; việc đúng mà người làm sai chỗ thì vẫn vướng, nên sửa vai trước."; }
  else if (tl.thoi === 0) { kl = "doi"; lyDo = "Thời còn sớm; sớm thì đợi, dùng lúc đợi để chuẩn bị."; }
  else if (tl.thoi === 2) { if (tl.bien === 1) { kl = "tien"; lyDo = "Thời đã muộn nhưng việc vẫn đang lên; còn kịp thì tiến gọn, quyết nhanh."; } else { kl = "lui"; lyDo = "Thời đã muộn mà việc không lên; lui đúng lúc còn hơn cố."; } }
  else if (tl.ung === 2 || tl.thua === 2) { if (tl.bien === 2) { kl = "lui"; lyDo = "Thời đúng nhưng không ai theo hoặc người quanh mình nghịch, việc lại đang xuống; nên lùi."; } else { kl = "doi"; lyDo = "Thời đúng nhưng không ai theo hoặc người quanh mình nghịch; đợi để gây dựng người trước."; } }
  else if (diem >= 2) { kl = "tien"; lyDo = `Thời đúng, các điều còn lại thuận nhiều hơn nghịch (điểm ${diem}); nên tiến.`; }
  else if (diem <= -1) { kl = "lui"; lyDo = `Thời đúng nhưng các điều còn lại nghịch nhiều hơn thuận (điểm ${diem}); nên lùi.`; }
  else { kl = "doi"; lyDo = `Thời đúng nhưng các điều còn lại chưa rõ (điểm ${diem}); đợi và xem thêm.`; }
  const luat = this.anhXa.find(r => r.kl === kl && Object.entries(r.dk).every(([k, v]) => tl[k] === v));
  const viec = [];
  for (const k of B) if (tl[k] === 2 && this.khuyen[k][2]) viec.push(this.khuyen[k][2]);
  for (const k of B) if (tl[k] === 0 && this.khuyen[k][0]) viec.push(this.khuyen[k][0]);
  for (const v of this.viecMacDinh[kl]) if (viec.length < 3) viec.push(v);
  return {kl, ten: this.ketLuan[kl].ten, cau: this.ketLuan[kl].cau, que: luat.que, viQue: luat.vi, lyDo, diem, viec: viec.slice(0, 3)};
}
};
