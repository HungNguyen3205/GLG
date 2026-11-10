# Hướng dẫn đẩy code GLG lên cPanel

| Thông tin | Giá trị |
|---|---|
| GitHub | `https://github.com/HungNguyen3205/GLG.git` (nhánh `main`, repo công khai) |
| Tài khoản cPanel | `khoaluan` |
| Tên miền | `https://glg.danava.com.vn` (đuôi **com**.vn) |
| Thư mục web trên host | `~/glg.danava.com.vn` |
| Bản code trên host | `~/repositories/GLG` |
| Trang chủ | `https://glg.danava.com.vn/` |
| Cà phê | `https://glg.danava.com.vn/cafe/` |
| Khách sạn | `https://glg.danava.com.vn/khach-san/` |
| Trang quản trị | `https://glg.danava.com.vn/admin/`, mật khẩu `123456`. Trang chi tiết: `/admin/cafe/tongquan`, `/admin/khachsan/datphong`… |

---

## Mỗi lần cập nhật (làm theo thứ tự)

### Bước 1 · Trên máy tính: đẩy code lên GitHub
Mở terminal tại thư mục dự án `GLG`:
```bash
git add -A
git commit -m "Mô tả ngắn thay đổi"
git push origin main
```

### Bước 2 · Trên cPanel: kéo code về và đưa lên web
Chọn **một** trong hai cách.

**Cách A · Terminal cPanel** (dán nguyên 1 dòng):
```bash
cd ~/repositories/GLG && git pull origin main && cp -R .htaccess index.html style.css fonts.css glg.js trai-nghiem.css trai-nghiem.js admin cafe khach-san ~/glg.danava.com.vn/
```

**Cách B · Giao diện cPanel**
cPanel → **Git™ Version Control** → repo `GLG` → **Manage** → tab **Pull or Deploy** → bấm **Update from Remote**, sau đó **Deploy HEAD Commit**.
(Cách này dùng file `.cpanel.yml` trong dự án.)

### Bước 3 · Kiểm tra
- Mở `https://glg.danava.com.vn` và nhấn **Ctrl + F5** để tải lại, bỏ qua bộ nhớ đệm.
- Mở `https://glg.danava.com.vn/cafe/`, `/khach-san/`, `/admin/`.

---

## Khi thêm file hoặc thư mục mới ở gốc dự án
Lệnh copy ở trên chỉ copy những file và thư mục được liệt kê. Nếu tạo thêm, ví dụ thư mục `spa/` hay file `abc.css` ở gốc, phải thêm tên đó vào **cả hai chỗ**:
1. Lệnh `cp -R …` ở Cách A (và cập nhật lại file này).
2. File `.cpanel.yml` (dòng `/bin/cp -R …`).

## Lần đầu cài trên host mới (đã làm rồi, chỉ dùng khi làm lại từ đầu)
```bash
cp -a ~/glg.danava.com.vn ~/glg.danava.com.vn.bak-$(date +%Y%m%d-%H%M)
git clone https://github.com/HungNguyen3205/GLG.git ~/repositories/GLG
cd ~/repositories/GLG
cp -R .htaccess index.html style.css fonts.css glg.js trai-nghiem.css trai-nghiem.js admin cafe khach-san ~/glg.danava.com.vn/
```

## Xử lý sự cố
| Hiện tượng | Cách xử lý |
|---|---|
| `git pull` báo lỗi vì có thay đổi trên host | `cd ~/repositories/GLG && git reset --hard origin/main && git pull origin main` (bản code trên host chỉ để deploy, không sửa tay) |
| Trình duyệt báo "Không bảo mật" hoặc lỗi SSL | cPanel → **SSL/TLS Status** → tick `glg.danava.com.vn` → **Run AutoSSL**. Khi `https://` đã vào được, mở `.htaccess` và bỏ dấu `#` ở 2 dòng **Ép HTTPS**, sau đó push và deploy lại |
| Địa chỉ cũ (`/ca-phe/…`, `/marriott/…`) | Đã tự chuyển sang `/cafe/` và `/khach-san/` nhờ `.htaccess`. Thư mục cũ trên host có thể xoá: `rm -r ~/glg.danava.com.vn/ca-phe ~/glg.danava.com.vn/marriott` |
| `/admin/cafe/tongquan` báo 404 khi tải lại | Thiếu file `.htaccess` trên host. Chạy lại lệnh copy ở Bước 2 (có `.htaccess`) |
| Web vẫn hiện bản cũ | Nhấn Ctrl + F5. Nếu vẫn cũ, kiểm tra ngày sửa file: `ls -la ~/glg.danava.com.vn` |
| Cần quay lại bản cũ | `cd ~/repositories/GLG && git log --oneline -5`, sau đó `git checkout <mã-commit> -- .` rồi chạy lại lệnh `cp -R …`. Xong thì `git checkout main -- .` để trở về bản mới nhất |

> Lưu ý: repo GitHub đang công khai và mật khẩu admin `123456` nằm trong code, chỉ dùng cho bản demo.
