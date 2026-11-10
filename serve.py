"""Xem GLG trên máy với đường dẫn gọn giống trên host.

Chạy:  python serve.py        (mặc định cổng 8000)
       python serve.py 5500
Mở:    http://localhost:8000/  ·  /cafe/  ·  /khach-san/  ·  /admin/

Giống .htaccess trên cPanel: mọi đường dẫn /admin/... không phải file có thật
sẽ trả về admin/index.html (vd. /admin/cafe/tongquan). File này không deploy.
"""
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path.startswith("/admin/") and not os.path.exists(self.translate_path(path)):
            self.path = "/admin/index.html"
        return super().send_head()


if __name__ == "__main__":
    # Console Windows mặc định không in được tiếng Việt
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"GLG đang chạy tại http://localhost:{port}/  (Ctrl+C để dừng)")
    http.server.ThreadingHTTPServer(("", port), Handler).serve_forever()
