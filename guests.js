/* Nội dung mặc định khi link không có mã hoặc mã không tồn tại */
window.DEFAULT_GUEST = {
  name: "Bạn thân mến",
  me: "mình",
  you: "bạn",
  message: "Trong hành trình này của mình thật may mắn khi gặp được bạn, vì vậy mà mình rất mong chờ để được gửi lời yêu thương này ...."
};

/* Mỗi người một mã. Link gửi: index.html?g=ma-nguoi
   Lời nhắn tự ghép theo xưng hô: me = danh xưng của mình, you = cách gọi người nhận
   (tuỳ chọn) label = chữ thay cho "Thân mời:" */
const T = (me, you) =>
  `Trong hành trình này của ${me} thật may mắn khi gặp được ${you}, vì vậy mà ${me} rất mong chờ để được gửi lời yêu thương này ....`;

window.GUESTS = {
  "qmeii": { name: "Qmeii", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "meo": { name: "Mèo", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "ngoc-anh": { name: "Ngọc Ánh", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "pham-ngoc-linh": { name: "Phạm Ngọc Linh", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "thu-sam": { name: "Thư Sâm", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "thu-dao": { name: "Thư Đào", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "phuc": { name: "Phúc", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "trinh-bui": { name: "Trinh Bùi", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "minh-quyen": { name: "Minh Quyên", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "yen-nhi": { name: "Yến Nhi", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "tu-anh": { name: "Tú Anh", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "trung-nghia": { name: "Trung Nghĩa", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "kim-doan": { name: "Kim Đoan", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "thanh-huyen": { name: "Thanh Huyền", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "hoang-kim": { name: "Hoàng Kim", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "dong-quan": { name: "Đông Quân", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "tien-dat": { name: "Tiến Đạt", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "thu-huong": { name: "Thu Hương", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "ngoc-linh": { name: "Ngọc Linh", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "thuy-trang": { name: "Thùy Trang", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "chi-van": { name: "chị Vân", me: "em", you: "chị", message: T("em", "chị") },
  "chi-uyen": { name: "chị Uyên", me: "em", you: "chị", message: T("em", "chị") },
  "thao": { name: "Thảo", me: "KAnh", you: "Thảo", message: T("KAnh", "Thảo") },
  "quynh-nhu": { name: "Quỳnh Như", me: "KAnh", you: "Quỳnh Như", message: T("KAnh", "Quỳnh Như") },
  "mai-linh": { name: "Mai Linh", me: "KAnh", you: "Mai Linh", message: T("KAnh", "Mai Linh") },
  "chi-phuong-nhi": { name: "chị Phương Nhi", me: "em", you: "chị", message: T("em", "chị") },
  "chi-minh-hien": { name: "chị Minh Hiền", me: "em", you: "chị", message: T("em", "chị") },
  "chi-ngoc-diep": { name: "chị Ngọc Diệp", me: "em", you: "chị", message: T("em", "chị") },
  "anh-the-anh": { name: "anh Thế Anh", me: "em", you: "anh", message: T("em", "anh") },
  "bao-ngoc": { name: "Bảo Ngọc", me: "mình", you: "bạn", message: T("mình", "bạn") },
  "anh-duy-luan": { name: "anh Duy Luận", me: "em", you: "anh", message: T("em", "anh") },

  /* Gửi cả nhà: lời nhắn riêng, xưng "con/cháu", gọi "nhà mình", mở đầu bằng "Kính gửi:" */
  "mca-nng": {
    label: "Kính gửi:",
    name: "Cả nhà mình",
    me: "con/cháu",
    you: "nhà mình",
    message: "Trong hành trình này của con/cháu rất biết ơn vì có cả nhà cùng đồng hành, vì vậy mà con/cháu rất mong chờ để được gửi lời yêu thương này ...."
  }
};