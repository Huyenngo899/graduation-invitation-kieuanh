# Web thư mời tốt nghiệp

HTML/CSS/JS thuần, không cần build. Deploy thẳng lên Vercel.

## 1. Mở trong VS Code
1. Giải nén thư mục `graduation-invite`.
2. VS Code → **File → Open Folder…** → chọn `graduation-invite`.
3. Bấm **Install** khi VS Code gợi ý extension (Live Server, Prettier).

## 2. Chạy thử trên máy
- Cách 1: chuột phải `index.html` → **Open with Live Server**.
- Cách 2 (cần cài Node.js): mở Terminal (`Ctrl + ~`) rồi chạy `npm run dev`, vào http://localhost:3000.

## 3. Trang bìa (2 ảnh đẩy ra)
- Chuẩn bị 2 ảnh, mỗi ảnh **1080 x 960 px** (ảnh trên và ảnh dưới ghép thành khung 1080 x 1920).
- Bỏ vào `assets/`, ví dụ `cover-top.jpg` và `cover-bottom.jpg`.
- Mở `js/config.js`, điền `coverTop: "assets/cover-top.jpg"` và `coverBottom: "assets/cover-bottom.jpg"`.
- Chạm màn hình: ảnh trên đẩy lên, ảnh dưới đẩy xuống. Không chạm thì tự mở sau `coverAutoSeconds` giây (mặc định 5).

## 4. Sửa nội dung
Chỉ cần mở `js/config.js`: tên, trường, ngày giờ, chương trình, địa điểm, số điện thoại.
Ảnh bỏ vào thư mục `assets/`.

## 5. Đưa lên Vercel
**Cách A – qua GitHub (khuyên dùng)**
1. Tạo repo GitHub mới, rồi trong Terminal:
   ```
   git init
   git add .
   git commit -m "thu moi tot nghiep"
   git branch -M main
   git remote add origin https://github.com/<ten-ban>/graduation-invite.git
   git push -u origin main
   ```
2. Vào https://vercel.com/new → Import repo → **Framework Preset: Other** → **Deploy**.
3. Mỗi lần `git push`, Vercel tự cập nhật web.

**Cách B – dùng terminal**
```
npm i -g vercel
vercel        # lần đầu, trả lời các câu hỏi
vercel --prod # đưa lên link chính thức
```

## 6. Nhận xác nhận tham dự (tùy chọn)
Tạo form miễn phí tại https://formspree.io, copy link dạng `https://formspree.io/f/xxxx`
và dán vào `rsvpEndpoint` trong `js/config.js`. Nếu để trống, nút gửi sẽ mở email.

## Cấu trúc
```
graduation-invite/
├── index.html
├── css/style.css
├── js/config.js     ← sửa thông tin ở đây
├── js/main.js
├── assets/          ← ảnh
├── vercel.json
├── package.json
└── .vscode/
```
