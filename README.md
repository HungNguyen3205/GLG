# GLG · The Collection

Website tĩnh bằng HTML, CSS và JavaScript. Chạy `python3 -m http.server 8000` tại thư mục repo và mở `http://localhost:8000`.

- `/` hiển thị năm ô cửa theo thứ tự Khách sạn, Cà phê, Mầm non, Yoga, Spa.
- `/khach-san/` là trang mẫu. Bốn mô hình còn lại mở phần giới thiệu.
- `glg.js` chứa dữ liệu các mô hình. Để mở một trang mới, thêm thư mục theo slug và sao chép mẫu HTML của Khách sạn, thay nội dung và `data-page` theo slug, cập nhật ảnh thư viện, sau đó đặt `published: true`.
- Logo chữ, nội dung và ảnh Unsplash là tài sản minh họa cho bản đầu. Thay bằng ảnh, logo và thông tin GLG đã duyệt trước khi ra mắt.
- Chuyển cảnh nối ảnh giữa trang chủ và Khách sạn dùng View Transition API trên trình duyệt hỗ trợ. Các liên kết HTML vẫn điều hướng bình thường trên trình duyệt khác.
