# GLG · The Collection

Website tĩnh bằng HTML, CSS và JavaScript. Chạy `python3 -m http.server 8000` tại thư mục repo và mở `http://localhost:8000`.

- `/` hiển thị năm ô cửa theo thứ tự Khách sạn, Cà phê, Mầm non, Yoga, Spa.
- `/khach-san/` và `/ca-phe/` là hai trang đã mở. Ba mô hình còn lại mở phần giới thiệu.
- `glg.js` chứa dữ liệu các mô hình. Để mở một trang mới, thêm thư mục theo slug và sao chép mẫu HTML của Khách sạn, thay nội dung và `data-page` theo slug, cập nhật ảnh thư viện, sau đó đặt `published: true`.
- Logo chữ, nội dung và ảnh Unsplash là tài sản minh họa cho bản đầu. Thay bằng ảnh, logo và thông tin GLG đã duyệt trước khi ra mắt.
- Chuyển cảnh nối ảnh giữa trang chủ và Khách sạn hoặc Cà phê dùng View Transition API trên trình duyệt hỗ trợ. Các liên kết HTML vẫn điều hướng bình thường trên trình duyệt khác.
- `trai-nghiem.css` và `trai-nghiem.js` chứa các phần trình bày bên dưới (lớp `xp-*`), dùng chung cho `ca-phe/khong-gian-3d.html` và `marriott/index.html`. Bảng màu theo class `theme-cafe` hoặc `theme-hotel`. Trên trang Cà phê 3D, lướt chuột ở đầu trang sẽ dựng quán. Dựng xong 5 bước thì trang cuộn tiếp xuống các phần này. Giá, số liệu và form đặt bàn hoặc đặt phòng chỉ là bản mô phỏng.
- `admin/` là trang quản trị demo (chưa có backend). Mật khẩu là `123456`, chỉ kiểm tra trên trình duyệt. Luồng đi: Đăng nhập → Chọn mô hình → Quản trị. Địa chỉ dạng `#/<mô-hình>/<mục>`, ví dụ `#/ca-phe/orders`. Thêm `/new` vào cuối để mở form tạo mới. Dữ liệu mẫu lưu trong localStorage của trình duyệt đang xem, khôi phục ở Cài đặt → Khôi phục dữ liệu mẫu.
- Mọi liên kết trỏ thẳng tới file `index.html`, nên site chạy được khi mở file trực tiếp lẫn qua server. `khach-san/` và `ca-phe/index.html` là trang cũ, giờ tự chuyển sang `marriott/index.html` và `ca-phe/khong-gian-3d.html`.
