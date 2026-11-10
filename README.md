# GLG · The Collection

Website tĩnh bằng HTML, CSS và JavaScript. Chạy `python3 -m http.server 8000` tại thư mục repo và mở `http://localhost:8000`.

- `/` hiển thị năm ô cửa theo thứ tự Khách sạn, Cà phê, Mầm non, Yoga, Spa.
- `/khach-san/` và `/cafe/` là hai trang đã mở. Ba mô hình còn lại mở phần giới thiệu.
- `glg.js` chứa dữ liệu các mô hình. Để mở một trang mới, thêm thư mục theo slug và sao chép mẫu HTML của Khách sạn, thay nội dung và `data-page` theo slug, cập nhật ảnh thư viện, sau đó đặt `published: true`.
- Logo chữ, nội dung và ảnh Unsplash là tài sản minh họa cho bản đầu. Thay bằng ảnh, logo và thông tin GLG đã duyệt trước khi ra mắt.
- Chuyển cảnh nối ảnh giữa trang chủ và Khách sạn hoặc Cà phê dùng View Transition API trên trình duyệt hỗ trợ. Các liên kết HTML vẫn điều hướng bình thường trên trình duyệt khác.
- `trai-nghiem.css` và `trai-nghiem.js` chứa các phần trình bày bên dưới (lớp `xp-*`), dùng chung cho `cafe/index.html` và `khach-san/index.html`. Bảng màu theo class `theme-cafe` hoặc `theme-hotel`. Trên trang Cà phê 3D, lướt chuột ở đầu trang sẽ dựng quán. Dựng xong 5 bước thì trang cuộn tiếp xuống các phần này. Giá, số liệu và form đặt bàn hoặc đặt phòng chỉ là bản mô phỏng.
- `admin/` là trang quản trị demo (chưa có backend). Mật khẩu là `123456`, chỉ kiểm tra trên trình duyệt. `/admin/` là đăng nhập, sau khi đăng nhập là màn chọn mô hình. Trang chi tiết dạng `/admin/<mô-hình>/<mục>`, ví dụ `/admin/cafe/tongquan`, `/admin/khachsan/datphong`. Mô hình gồm `khachsan`, `cafe`, `spa`, `mamnon`, `gym`. Tên mục là tiêu đề tiếng Việt bỏ dấu. Thêm `/moi` vào cuối để mở form tạo mới. Trên host, `.htaccess` trả `admin/index.html` cho mọi đường dẫn này. Dữ liệu mẫu lưu trong localStorage, khôi phục ở Cài đặt → Khôi phục dữ liệu mẫu.
- Đường dẫn gọn theo thư mục: `/` (trang chủ), `/cafe/`, `/khach-san/`, `/admin/`. Xem trên máy: chạy `python serve.py` rồi mở `http://localhost:8000/`. Server này giống `.htaccess` nên `/admin/cafe/tongquan` tải lại được. Mở file trực tiếp sẽ không vào được các thư mục. Trên host, `.htaccess` chuyển hướng 301 từ địa chỉ cũ `/ca-phe/…` và `/marriott/…`, đồng thời ẩn `index.html`.
- Cách đẩy code lên cPanel (glg.danava.com.vn): xem [DEPLOY.md](DEPLOY.md).
