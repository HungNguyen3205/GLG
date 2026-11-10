// GLG · Trang quản trị — bản demo giao diện (chưa có backend).
// Mật khẩu chỉ kiểm tra phía trình duyệt; dữ liệu là mẫu và chỉ lưu tạm trong localStorage của máy đang xem.

const PASSWORD = '123456';
const STORE_KEY = 'glg-admin-demo-v1';

// ============================================================================ ICONS
const ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  bed: '<path d="M3 18V7M21 18v-5a3 3 0 0 0-3-3h-8v8M3 14h18M7 11.5h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8z"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  cup: '<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V8zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c0 1.5 1 1.5 1 3M12 2.5c0 1.5 1 1.5 1 3"/>',
  receipt: '<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2V3zM9 8h6M9 12h6M9 16h3"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15zM5 19l8-8"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4V4zM20 4h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20V4z"/>',
  baby: '<circle cx="12" cy="8" r="4"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7M10 7.5h.01M14 7.5h.01"/>',
  check: '<path d="M4 12.5 9 17.5 20 6.5"/>',
  dumbbell: '<path d="M6 7v10M18 7v10M3 9v6M21 9v6M6 12h12"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  hotel: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h3a1 1 0 0 1 1 1v11M2 21h20M8 7h4M8 11h4M8 15h4"/>',
  spa: '<path d="M12 21c-4.5-2-7-5.5-7-9.5C8 12 10.5 14 12 17c1.5-3 4-5 7-5.5 0 4-2.5 7.5-7 9.5zM12 13c-1.6-2-1.6-5.5 0-9 1.6 3.5 1.6 7 0 9z"/>',
  bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16zM10 21h4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  out: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 17l-5-5 5-5M5 12h11"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  swap: '<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  chev: '<path d="m8 10 4 4 4-4"/>',
  reset: '<path d="M4 4v6h6M20 20v-6h-6M5.5 15a7 7 0 0 0 12.4 2M18.5 9A7 7 0 0 0 6.1 7"/>'
};
const icon = (name, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

// ============================================================================ HELPERS
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const vnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(+n || 0)) + ' ₫';
const short = (n) => n >= 1e9 ? (n / 1e9).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' tỷ' : n >= 1e6 ? (n / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' tr' : new Intl.NumberFormat('vi-VN').format(n);
const clone = (o) => JSON.parse(JSON.stringify(o));
// Parse "a|b|c" lines into objects with the given keys
const rows = (keys, text) => text.trim().split('\n').map((line, i) => {
  const v = line.split('|').map((s) => s.trim());
  const o = { _id: i + 1 };
  keys.forEach((k, j) => { o[k] = /^\d+$/.test(v[j]) && k !== 'phone' && k !== 'code' ? +v[j] : v[j]; });
  return o;
});
const S = (label, tone) => ({ label, tone });
const img = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

// ============================================================================ CẤU HÌNH TỪNG MÔ HÌNH
const COMMON_SETTINGS = (name, hotline, email, hours) => ({
  id: 'settings', label: 'Cài đặt', icon: 'settings', type: 'settings',
  fields: [
    { key: 'name', label: 'Tên hiển thị', value: name },
    { key: 'hotline', label: 'Hotline', value: hotline },
    { key: 'email', label: 'Email nhận thông báo', value: email },
    { key: 'hours', label: 'Giờ hoạt động', value: hours }
  ],
  toggles: [
    { key: 'mail', label: 'Gửi email khi có yêu cầu mới', hint: 'Thông báo cho quản lý ngay khi khách đặt chỗ', on: true },
    { key: 'zalo', label: 'Nhắn Zalo xác nhận cho khách', hint: 'Tự động gửi tin xác nhận sau khi duyệt', on: true },
    { key: 'online', label: 'Mở nhận đặt chỗ trên website', hint: 'Tắt để tạm ngưng nhận yêu cầu mới', on: true }
  ],
  team: [['Nguyễn Minh Anh', 'Quản lý', 'MA'], ['Trần Quốc Bảo', 'Lễ tân / Thu ngân', 'QB'], ['Lê Thu Hà', 'Biên tập nội dung', 'TH']]
});

const SPACES = {
  'khach-san': {
    name: 'Khách sạn', full: 'Courtyard Danang Han River', icon: 'hotel', accent: '#2F6D80', soft: '#E3F0F4',
    cover: 'https://cache.marriott.com/is/image/marriotts7prod/cy-dadcy-rooftop-pool-37438:Wide-Hor?fit=constrain&wid=900',
    site: '../marriott/index.html', desc: 'Đặt phòng, sơ đồ phòng theo tầng, khách lưu trú và dịch vụ đi kèm.',
    pickStats: [['82%', 'Công suất'], ['6', 'Chờ duyệt'], ['186 tr', 'Hôm nay']],
    notifs: [['Đặt phòng mới BK-2611', 'Phạm Gia Hân · Executive Corner · 2 đêm', '5 phút trước'], ['Phòng 1407 cần bảo trì', 'Báo cáo từ bộ phận buồng phòng', '32 phút trước'], ['Đánh giá 5★ mới', '“Tầm nhìn sông Hàn tuyệt đẹp”', '1 giờ trước']],
    modules: [
      { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', type: 'dashboard',
        kpis: [
          { label: 'Công suất phòng hôm nay', value: '82%', delta: '+6% so với tuần trước', dir: 'up' },
          { label: 'Doanh thu hôm nay', value: '186,4 tr', delta: '+12% so với hôm qua', dir: 'up' },
          { label: 'Đặt phòng chờ xác nhận', count: ['bookings', 'Chờ xác nhận'], delta: 'Cần xử lý trong ngày' },
          { label: 'Phòng đang dọn', count: ['rooms', 'Đang dọn'], delta: 'Theo sơ đồ phòng' }
        ],
        chart: { title: 'Doanh thu 7 ngày gần nhất', unit: 1e6, values: [142, 156, 149, 171, 198, 224, 186] },
        recent: 'bookings',
        todo: [['Duyệt 6 yêu cầu đặt phòng mới', 'Trước 12:00'], ['Xác nhận xe đón sân bay cho BK-2604', '14:30 hôm nay'], ['Kiểm tra phòng 1407 (điều hoà)', 'Bảo trì'], ['Cập nhật ảnh hồ bơi rooftop lên website', 'Nội dung']] },
      { id: 'bookings', label: 'Đặt phòng', icon: 'calendar', type: 'table', badge: 'Chờ xác nhận', addLabel: 'Tạo đặt phòng',
        statuses: [S('Chờ xác nhận', 'warn'), S('Đã xác nhận', 'info'), S('Đã nhận phòng', 'good'), S('Đã trả phòng', 'neutral'), S('Đã huỷ', 'bad')],
        columns: [{ key: 'code', label: 'Mã', cls: 'mono' }, { key: 'guest', label: 'Khách', cls: 'strong' }, { key: 'room', label: 'Hạng phòng' }, { key: 'checkin', label: 'Nhận phòng', type: 'date' }, { key: 'nights', label: 'Đêm', type: 'number' }, { key: 'total', label: 'Tổng tiền', type: 'money' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['code', 'guest', 'room', 'checkin', 'nights', 'total', 'status'], `
BK-2611|Phạm Gia Hân|Executive Corner River View|17/11/2026|2|6800000|Chờ xác nhận
BK-2610|David Miller|Suite|15/11/2026|4|24800000|Chờ xác nhận
BK-2609|Nguyễn Hoàng Long|Premium Room|12/11/2026|1|2200000|Đã xác nhận
BK-2608|Lê Phương Thảo|Executive Corner River View|10/11/2026|3|10200000|Đã nhận phòng
BK-2607|Kim Ji-woo|Premium Room|10/11/2026|2|4400000|Đã nhận phòng
BK-2606|Trần Đức Minh|Suite|09/11/2026|2|12400000|Đã nhận phòng
BK-2605|Võ Thị Mai|Premium Room|14/11/2026|2|4400000|Chờ xác nhận
BK-2604|Sarah Johnson|Executive Corner River View|11/11/2026|5|17000000|Đã xác nhận
BK-2603|Hoàng Anh Tuấn|Premium Room|07/11/2026|2|4400000|Đã trả phòng
BK-2602|Đặng Ngọc Linh|Suite|06/11/2026|3|18600000|Đã trả phòng
BK-2601|Bùi Quang Huy|Premium Room|13/11/2026|1|2200000|Đã huỷ`) },
      { id: 'rooms', label: 'Sơ đồ phòng', icon: 'grid', type: 'board', hint: 'Bấm vào một phòng để đổi trạng thái buồng.',
        statuses: [S('Trống', 'good'), S('Có khách', 'info'), S('Đang dọn', 'warn'), S('Bảo trì', 'bad')],
        groups: [12, 13, 14, 15].map((f) => ({ name: `Tầng ${f}`, tiles: Array.from({ length: 8 }, (_, i) => {
          const n = i + 1; const k = (f * 7 + n * 3) % 10;
          return { label: `${f}${String(n).padStart(2, '0')}`, sub: n === 1 || n === 8 ? 'Executive Corner' : n === 4 ? 'Suite' : 'Premium', status: f === 14 && n === 7 ? 'Bảo trì' : k < 5 ? 'Có khách' : k < 8 ? 'Trống' : 'Đang dọn' };
        }) })) },
      { id: 'guests', label: 'Khách hàng', icon: 'users', type: 'table', addLabel: 'Thêm khách',
        statuses: [S('Thường', 'neutral'), S('Bạc', 'info'), S('Vàng', 'warn'), S('Bạch kim', 'good')], statusKey: 'tier',
        columns: [{ key: 'name', label: 'Họ tên', cls: 'strong' }, { key: 'phone', label: 'Điện thoại', cls: 'mono' }, { key: 'country', label: 'Quốc tịch' }, { key: 'stays', label: 'Số lần ở', type: 'number' }, { key: 'spend', label: 'Tổng chi tiêu', type: 'money' }, { key: 'tier', label: 'Hạng', type: 'status' }],
        rows: rows(['name', 'phone', 'country', 'stays', 'spend', 'tier'], `
Lê Phương Thảo|0905 118 226|Việt Nam|6|48600000|Vàng
David Miller|+1 415 555 0182|Hoa Kỳ|3|52100000|Bạch kim
Kim Ji-woo|+82 10 5521 7731|Hàn Quốc|2|8800000|Bạc
Trần Đức Minh|0912 664 091|Việt Nam|9|96400000|Bạch kim
Võ Thị Mai|0935 420 337|Việt Nam|1|4400000|Thường
Sarah Johnson|+44 20 7946 0958|Anh|4|39000000|Vàng
Nguyễn Hoàng Long|0983 772 115|Việt Nam|1|2200000|Thường`) },
      { id: 'services', label: 'Dịch vụ & tiện ích', icon: 'star', type: 'cards', addLabel: 'Thêm dịch vụ', priceLabel: 'Giá',
        items: [
          { name: 'Bữa sáng buffet', desc: 'The Landmark · 06:30–10:30, tính theo khách mỗi đêm.', price: 350000, on: true, img: img('photo-1533089860892-a7c6f0a88666') },
          { name: 'Xe đưa đón sân bay', desc: 'Xe 4–7 chỗ, đón tại sảnh quốc nội hoặc quốc tế.', price: 450000, on: true, img: img('photo-1549317661-bd32c8ce0db2') },
          { name: 'Serenity Spa 90 phút', desc: 'Massage tinh dầu và xông hơi thảo dược.', price: 1200000, on: true, img: img('photo-1540555700478-4be289fbecef') },
          { name: 'Trả phòng muộn 15:00', desc: 'Tùy tình trạng phòng, xác nhận trước 1 ngày.', price: 500000, on: true, img: img('photo-1566665797739-1674de7a421a') },
          { name: 'Gói trăng mật', desc: 'Trang trí phòng, bánh, rượu vang và bữa tối M45.', price: 3900000, on: false, img: img('photo-1519741497674-611481863552') },
          { name: 'Omakase M45', desc: 'Set omakase 12 món tại rooftop bar tầng 45.', price: 2400000, on: true, img: 'https://cache.marriott.com/is/image/marriotts7prod/cy-dadcy-rooftop-bar-32535:Classic-Hor?fit=constrain&wid=600' }
        ] },
      { id: 'content', label: 'Nội dung website', icon: 'edit', type: 'content',
        fields: [
          { key: 'eyebrow', label: 'Dòng giới thiệu nhỏ', value: 'COURTYARD BY MARRIOTT · ĐÀ NẴNG' },
          { key: 'title', label: 'Tiêu đề trang chủ', value: 'Một nhịp khác bên sông Hàn.' },
          { key: 'intro', label: 'Mô tả ngắn', value: 'Từ ánh sáng ban mai bên cửa sổ đến những buổi tối ngắm thành phố lên đèn.', long: true },
          { key: 'cover', label: 'Ảnh bìa (URL)', value: 'https://cache.marriott.com/is/image/marriotts7prod/cy-dadcy-rooftop-pool-37438:Wide-Hor?fit=constrain&wid=900' },
          { key: 'address', label: 'Địa chỉ', value: '58 Bạch Đằng, phường Hải Châu, Đà Nẵng' },
          { key: 'checkin', label: 'Giờ nhận / trả phòng', value: '15:00 / 12:00' }
        ] },
      COMMON_SETTINGS('Courtyard Danang Han River', '+84 236 393 7979', 'reservations@glg.vn', 'Lễ tân 24/7')
    ]
  },

  'ca-phe': {
    name: 'Cà phê', full: 'Cà phê GLG', icon: 'cup', accent: '#8A5A2B', soft: '#F3E9DD',
    cover: img('photo-1501339847302-ac426a4a7cbb', 900),
    site: '../ca-phe/khong-gian-3d.html', desc: 'Đơn hàng tại quầy, thực đơn, đặt bàn, sơ đồ bàn, thành viên và sự kiện.',
    pickStats: [['214', 'Đơn hôm nay'], ['5', 'Đang pha'], ['12,8 tr', 'Doanh thu']],
    notifs: [['Đơn mới #A-1286', 'Bàn 03 · 2 flat white, 1 croissant', 'Vừa xong'], ['Đặt bàn mới lúc 15:30', 'Nhóm 4 khách · Bàn 02', '18 phút trước'], ['Workshop latte art còn 2 chỗ', 'Thứ Bảy 14/11 · 09:00', '2 giờ trước']],
    modules: [
      { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', type: 'dashboard',
        kpis: [
          { label: 'Doanh thu hôm nay', value: '12,8 tr', delta: '+8% so với thứ Ba tuần trước', dir: 'up' },
          { label: 'Số đơn hôm nay', value: '214', delta: 'TB 59.800 ₫ / đơn' },
          { label: 'Đơn đang chờ pha', count: ['orders', 'Mới', 'Đang pha'], delta: 'Tại quầy bar' },
          { label: 'Đặt bàn chờ xác nhận', count: ['reservations', 'Chờ xác nhận'], delta: 'Hôm nay & ngày mai' }
        ],
        chart: { title: 'Doanh thu 7 ngày gần nhất', unit: 1e6, values: [9.2, 10.4, 9.8, 11.6, 12.1, 15.3, 12.8] },
        recent: 'orders',
        todo: [['Nhập thêm sữa yến mạch (còn 6 hộp)', 'Kho'], ['Xác nhận 3 lượt đặt bàn chiều nay', 'Đặt bàn'], ['Đăng bài workshop cupping 21/11', 'Nội dung'], ['Vệ sinh máy pha espresso cuối ngày', '19:00']] },
      { id: 'orders', label: 'Đơn hàng', icon: 'receipt', type: 'table', badge: 'Mới', addLabel: 'Tạo đơn',
        statuses: [S('Mới', 'warn'), S('Đang pha', 'info'), S('Sẵn sàng', 'serious'), S('Hoàn tất', 'good'), S('Đã huỷ', 'bad')],
        columns: [{ key: 'code', label: 'Mã đơn', cls: 'mono' }, { key: 'time', label: 'Giờ' }, { key: 'where', label: 'Hình thức' }, { key: 'items', label: 'Món', cls: 'strong' }, { key: 'total', label: 'Tổng', type: 'money' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['code', 'time', 'where', 'items', 'total', 'status'], `
A-1286|10:42|Bàn 03|2 Flat white, 1 Croissant bơ|175000|Mới
A-1285|10:39|Mang đi|1 Cold brew tonic yuzu|69000|Mới
A-1284|10:35|Quầy bar|1 Pour-over Ethiopia|75000|Đang pha
A-1283|10:31|Bàn 07|2 Pain au chocolat, 2 Flat white|234000|Đang pha
A-1282|10:26|Mang đi|3 Cold brew tonic yuzu|207000|Sẵn sàng
A-1281|10:20|Bàn 01|1 Flat white, 1 Bánh cuộn bạch đậu khấu|114000|Hoàn tất
A-1280|10:12|Bàn 05|2 Pour-over Ethiopia|150000|Hoàn tất
A-1279|10:05|Mang đi|1 Croissant bơ|45000|Đã huỷ`) },
      { id: 'menu', label: 'Thực đơn', icon: 'cup', type: 'cards', addLabel: 'Thêm món', priceLabel: 'Giá bán',
        items: [
          { name: 'Flat white sữa yến mạch', desc: 'Espresso Bar · Double ristretto, foam mịn.', price: 65000, on: true, img: img('photo-1509042239860-f550ce710b93') },
          { name: 'Pour-over Ethiopia', desc: 'Slow Bar · Hương hoa nhài và cam bergamot.', price: 75000, on: true, img: img('photo-1495474472287-4d71bcdd2085') },
          { name: 'Cold brew tonic yuzu', desc: 'Signature · Cold brew ủ chậm, tonic, vỏ yuzu.', price: 69000, on: true, img: img('photo-1461023058943-07fcbe16d735') },
          { name: 'Croissant bơ', desc: 'Tủ bánh · Bơ lên men kiểu Pháp, nướng mỗi sáng.', price: 45000, on: true, img: img('photo-1555507036-ab1f4038808a') },
          { name: 'Pain au chocolat', desc: 'Tủ bánh · Chocolate đen 70%.', price: 52000, on: true, img: img('photo-1530610476181-d83430b64dcd') },
          { name: 'Bánh cuộn bạch đậu khấu', desc: 'Tủ bánh · Bơ nâu và đường hạt.', price: 49000, on: false, img: img('photo-1509440159596-0249088772ff') }
        ] },
      { id: 'reservations', label: 'Đặt bàn', icon: 'calendar', type: 'table', badge: 'Chờ xác nhận', addLabel: 'Thêm đặt bàn',
        statuses: [S('Chờ xác nhận', 'warn'), S('Đã xác nhận', 'info'), S('Đã đến', 'good'), S('Đã huỷ', 'bad')],
        columns: [{ key: 'name', label: 'Khách', cls: 'strong' }, { key: 'phone', label: 'Điện thoại', cls: 'mono' }, { key: 'date', label: 'Ngày', type: 'date' }, { key: 'slot', label: 'Giờ' }, { key: 'guests', label: 'Số khách', type: 'number' }, { key: 'seat', label: 'Vị trí' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['name', 'phone', 'date', 'slot', 'guests', 'seat', 'status'], `
Ngô Thanh Tâm|0905 223 118|10/11/2026|15:30|4|Bàn 02 · Giữa quán|Chờ xác nhận
Phan Minh Khoa|0934 556 210|10/11/2026|17:00|2|Bàn 01 · Góc cửa sổ|Chờ xác nhận
Lý Bảo Ngọc|0978 112 403|11/11/2026|09:00|3|Bàn 03 · Cạnh tủ bánh|Chờ xác nhận
Đỗ Hải Yến|0913 880 552|10/11/2026|10:30|2|Ghế quầy bar|Đã đến
Trịnh Văn Nam|0989 731 264|10/11/2026|13:00|6|Bàn 02 · Giữa quán|Đã xác nhận
Mai Anh Thư|0901 446 337|12/11/2026|18:00|2|Bàn 01 · Góc cửa sổ|Đã huỷ`) },
      { id: 'tables', label: 'Sơ đồ bàn', icon: 'grid', type: 'board', hint: 'Bấm vào bàn để đổi trạng thái.',
        statuses: [S('Trống', 'good'), S('Có khách', 'info'), S('Đã đặt', 'warn'), S('Cần dọn', 'serious')],
        groups: [
          { name: 'Khu cửa sổ', tiles: [['Bàn 01', '2 chỗ', 'Có khách'], ['Bàn 02', '4 chỗ', 'Đã đặt'], ['Bàn 03', '3 chỗ', 'Có khách'], ['Bàn 04', '2 chỗ', 'Trống']] },
          { name: 'Giữa quán', tiles: [['Bàn 05', '3 chỗ', 'Có khách'], ['Bàn 06', '3 chỗ', 'Cần dọn'], ['Bàn 07', '4 chỗ', 'Có khách'], ['Bàn 08', '3 chỗ', 'Trống'], ['Băng ghế A', '4 chỗ', 'Trống'], ['Băng ghế B', '4 chỗ', 'Có khách']] },
          { name: 'Quầy bar', tiles: [['Ghế bar 1', '1 chỗ', 'Có khách'], ['Ghế bar 2', '1 chỗ', 'Trống'], ['Ghế bar 3', '1 chỗ', 'Có khách'], ['Ghế bar 4', '1 chỗ', 'Trống']] }
        ].map((g) => ({ name: g.name, tiles: g.tiles.map(([label, sub, status]) => ({ label, sub, status })) })) },
      { id: 'members', label: 'Thành viên', icon: 'users', type: 'table', addLabel: 'Thêm thành viên',
        statuses: [S('Bean', 'neutral'), S('Roast', 'serious'), S('Gold', 'warn')], statusKey: 'tier',
        columns: [{ key: 'name', label: 'Họ tên', cls: 'strong' }, { key: 'phone', label: 'Điện thoại', cls: 'mono' }, { key: 'cups', label: 'Tổng số ly', type: 'number' }, { key: 'stamps', label: 'Dấu hiện tại' }, { key: 'joined', label: 'Ngày tham gia', type: 'date' }, { key: 'tier', label: 'Hạng', type: 'status' }],
        rows: rows(['name', 'phone', 'cups', 'stamps', 'joined', 'tier'], `
Đỗ Hải Yến|0913 880 552|96|3/8|02/03/2026|Gold
Trịnh Văn Nam|0989 731 264|41|1/8|18/05/2026|Roast
Ngô Thanh Tâm|0905 223 118|12|4/8|09/09/2026|Bean
Lý Bảo Ngọc|0978 112 403|33|1/8|21/06/2026|Roast
Phan Minh Khoa|0934 556 210|5|5/8|30/10/2026|Bean`) },
      { id: 'events', label: 'Sự kiện', icon: 'sparkle', type: 'table', addLabel: 'Tạo sự kiện',
        statuses: [S('Mở đăng ký', 'good'), S('Đã đầy', 'warn'), S('Đã kết thúc', 'neutral')],
        columns: [{ key: 'name', label: 'Sự kiện', cls: 'strong' }, { key: 'date', label: 'Thời gian' }, { key: 'seats', label: 'Đã đăng ký' }, { key: 'price', label: 'Giá vé', type: 'money' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['name', 'date', 'seats', 'price', 'status'], `
Workshop latte art|T7 14/11 · 09:00|10/12|350000|Mở đăng ký
Cupping hạt Việt|T7 21/11 · 15:00|10/10|200000|Đã đầy
Đêm acoustic|T6 27/11 · 19:30|28/40|0|Mở đăng ký
Brunch cuối tuần|CN 01/11 · 09:00|24/24|0|Đã kết thúc`) },
      { id: 'content', label: 'Nội dung website', icon: 'edit', type: 'content',
        fields: [
          { key: 'eyebrow', label: 'Dòng giới thiệu nhỏ', value: 'CÀ PHÊ GLG · CRAFTED DAILY' },
          { key: 'title', label: 'Tiêu đề trang chủ', value: 'Một chỗ ngồi, một câu chuyện.' },
          { key: 'intro', label: 'Mô tả ngắn', value: 'Quầy bar gỗ óc chó chữ U, tủ bánh hai tầng và ánh nắng xiên qua bức tường vữa.', long: true },
          { key: 'cover', label: 'Ảnh bìa (URL)', value: img('photo-1501339847302-ac426a4a7cbb', 900) },
          { key: 'address', label: 'Địa chỉ', value: 'Cà phê GLG · Đà Nẵng' },
          { key: 'hours', label: 'Giờ mở cửa', value: '07:00 – 19:00 hằng ngày' }
        ] },
      COMMON_SETTINGS('Cà phê GLG', '0236 000 0000', 'cafe@glg.vn', '07:00 – 19:00')
    ]
  },

  spa: {
    name: 'Spa', full: 'GLG Spa & Wellness', icon: 'spa', accent: '#4F7A5C', soft: '#E5F0E8', soon: true,
    cover: img('photo-1540555700478-4be289fbecef', 900),
    site: '../index.html', desc: 'Lịch hẹn, liệu trình, phòng trị liệu và đội ngũ kỹ thuật viên.',
    pickStats: [['18', 'Lịch hẹn'], ['5/10', 'Phòng dùng'], ['4,8★', 'Đánh giá']],
    notifs: [['Lịch hẹn mới 16:00', 'Massage đá nóng 90 phút · 2 khách', '10 phút trước'], ['KTV Hồng Nhung xin nghỉ ca tối', 'Cần sắp xếp người thay', '1 giờ trước']],
    modules: [
      { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', type: 'dashboard',
        kpis: [
          { label: 'Lịch hẹn hôm nay', value: '18', delta: '+3 so với hôm qua', dir: 'up' },
          { label: 'Doanh thu hôm nay', value: '21,6 tr', delta: '+5% so với tuần trước', dir: 'up' },
          { label: 'Chờ xác nhận', count: ['appointments', 'Chờ xác nhận'], delta: 'Cần gọi lại khách' },
          { label: 'Phòng đang phục vụ', count: ['rooms', 'Đang phục vụ'], delta: 'Trên tổng 10 phòng' }
        ],
        chart: { title: 'Doanh thu 7 ngày gần nhất', unit: 1e6, values: [16.4, 18.2, 15.9, 19.7, 22.4, 28.1, 21.6] },
        recent: 'appointments',
        todo: [['Gọi xác nhận 2 lịch hẹn chiều', 'Lễ tân'], ['Nhập tinh dầu sả chanh', 'Kho'], ['Xếp ca KTV tuần sau', 'Nhân sự']] },
      { id: 'appointments', label: 'Lịch hẹn', icon: 'calendar', type: 'table', badge: 'Chờ xác nhận', addLabel: 'Tạo lịch hẹn',
        statuses: [S('Chờ xác nhận', 'warn'), S('Đã xác nhận', 'info'), S('Đang phục vụ', 'serious'), S('Hoàn tất', 'good'), S('Đã huỷ', 'bad')],
        columns: [{ key: 'time', label: 'Giờ', cls: 'mono' }, { key: 'name', label: 'Khách', cls: 'strong' }, { key: 'service', label: 'Liệu trình' }, { key: 'staff', label: 'Kỹ thuật viên' }, { key: 'total', label: 'Giá', type: 'money' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['time', 'name', 'service', 'staff', 'total', 'status'], `
09:00|Nguyễn Thu Trang|Thảo dược Việt 60 phút|Hồng Nhung|690000|Hoàn tất
10:30|Emily Clark|Massage đá nóng 90 phút|Thanh Hương|1150000|Đang phục vụ
11:00|Phạm Quỳnh Anh|Chăm sóc da mặt chuyên sâu|Mỹ Linh|890000|Đang phục vụ
14:00|Lê Hoài Nam|Gói đôi thư giãn|Hồng Nhung, Văn Tài|2200000|Đã xác nhận
16:00|Trần Bảo Châu|Massage đá nóng 90 phút|Thanh Hương|1150000|Chờ xác nhận
17:30|Vũ Hà My|Xông hơi & tẩy tế bào chết|Mỹ Linh|590000|Chờ xác nhận`) },
      { id: 'services', label: 'Liệu trình', icon: 'leaf', type: 'cards', addLabel: 'Thêm liệu trình', priceLabel: 'Giá',
        items: [
          { name: 'Massage đá nóng 90 phút', desc: 'Đá bazan, tinh dầu sả chanh, thư giãn sâu.', price: 1150000, on: true, img: img('photo-1544161515-4ab6ce6db874') },
          { name: 'Thảo dược Việt 60 phút', desc: 'Túi chườm thảo dược và bấm huyệt.', price: 690000, on: true, img: img('photo-1600334089648-b0d9d3028eb2') },
          { name: 'Chăm sóc da mặt', desc: 'Làm sạch, đắp mặt nạ và massage nâng cơ.', price: 890000, on: true, img: img('photo-1570172619644-dfd03ed5d881') },
          { name: 'Gói đôi thư giãn', desc: 'Phòng đôi riêng, 90 phút cho 2 khách.', price: 2200000, on: true, img: img('photo-1540555700478-4be289fbecef') }
        ] },
      { id: 'rooms', label: 'Phòng trị liệu', icon: 'grid', type: 'board', hint: 'Bấm vào phòng để đổi trạng thái.',
        statuses: [S('Trống', 'good'), S('Đang phục vụ', 'serious'), S('Đang dọn', 'warn')],
        groups: [{ name: 'Phòng đơn', tiles: [1, 2, 3, 4, 5, 6].map((n) => ({ label: `Phòng ${n}`, sub: 'Đơn', status: n < 3 ? 'Đang phục vụ' : n === 4 ? 'Đang dọn' : 'Trống' })) },
          { name: 'Phòng đôi & xông hơi', tiles: [['Đôi A', 'Đôi', 'Đang phục vụ'], ['Đôi B', 'Đôi', 'Trống'], ['Xông hơi 1', 'Xông hơi', 'Đang phục vụ'], ['Xông hơi 2', 'Xông hơi', 'Trống']].map(([label, sub, status]) => ({ label, sub, status })) }] },
      { id: 'staff', label: 'Kỹ thuật viên', icon: 'users', type: 'table', addLabel: 'Thêm nhân viên',
        statuses: [S('Đang làm', 'good'), S('Nghỉ', 'neutral')],
        columns: [{ key: 'name', label: 'Họ tên', cls: 'strong' }, { key: 'skill', label: 'Chuyên môn' }, { key: 'shift', label: 'Ca' }, { key: 'rating', label: 'Đánh giá' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['name', 'skill', 'shift', 'rating', 'status'], `
Hồng Nhung|Thảo dược, massage body|Sáng|4,9★|Đang làm
Thanh Hương|Đá nóng, bấm huyệt|Sáng|4,8★|Đang làm
Mỹ Linh|Chăm sóc da|Chiều|4,9★|Đang làm
Văn Tài|Massage thể thao|Chiều|4,7★|Nghỉ`) },
      { id: 'content', label: 'Nội dung website', icon: 'edit', type: 'content',
        fields: [{ key: 'eyebrow', label: 'Dòng giới thiệu nhỏ', value: 'GLG SPA & WELLNESS' }, { key: 'title', label: 'Tiêu đề', value: 'Khoảng lặng cho cơ thể.' }, { key: 'intro', label: 'Mô tả ngắn', value: 'Liệu trình thảo dược, massage thư giãn và xông hơi giúp tái tạo năng lượng.', long: true }, { key: 'cover', label: 'Ảnh bìa (URL)', value: img('photo-1540555700478-4be289fbecef', 900) }] },
      COMMON_SETTINGS('GLG Spa & Wellness', '0236 000 0001', 'spa@glg.vn', '09:00 – 21:00')
    ]
  },

  'mam-non': {
    name: 'Mầm non', full: 'Mầm non GLG', icon: 'baby', accent: '#B8692E', soft: '#F7EADF', soon: true,
    cover: img('photo-1503454537195-1dcabb73ffb9', 900),
    site: '../index.html', desc: 'Học sinh, lớp học, điểm danh hằng ngày và hồ sơ tuyển sinh.',
    pickStats: [['186', 'Học sinh'], ['94%', 'Có mặt'], ['7', 'Hồ sơ mới']],
    notifs: [['Hồ sơ tuyển sinh mới', 'Bé Minh Khang · 3 tuổi', '20 phút trước'], ['Phụ huynh xin phép nghỉ', 'Bé An Nhiên · Lớp Chồi 2', '1 giờ trước']],
    modules: [
      { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', type: 'dashboard',
        kpis: [
          { label: 'Tổng số học sinh', value: '186', delta: '8 lớp · 3 khối' },
          { label: 'Có mặt hôm nay (Chồi 2)', count: ['attendance', 'Có mặt'], delta: 'Theo bảng điểm danh' },
          { label: 'Hồ sơ tuyển sinh mới', count: ['admissions', 'Mới'], delta: 'Cần liên hệ phụ huynh' },
          { label: 'Học phí đã thu tháng 11', value: '78%', delta: '+12% so với tuần trước', dir: 'up' }
        ],
        chart: { title: 'Học phí đã thu 7 ngày gần nhất', unit: 1e6, values: [38, 52, 61, 44, 70, 18, 9] },
        recent: 'admissions',
        todo: [['Gửi thực đơn tuần 3 tháng 11 cho phụ huynh', 'Thông báo'], ['Hẹn tham quan trường cho 3 gia đình', 'Tuyển sinh'], ['Kiểm tra sổ sức khoẻ khối Mầm', 'Y tế']] },
      { id: 'students', label: 'Học sinh', icon: 'baby', type: 'table', addLabel: 'Thêm học sinh',
        statuses: [S('Đang học', 'good'), S('Bảo lưu', 'warn'), S('Đã nghỉ', 'neutral')],
        columns: [{ key: 'name', label: 'Họ tên bé', cls: 'strong' }, { key: 'klass', label: 'Lớp' }, { key: 'born', label: 'Năm sinh', type: 'number' }, { key: 'parent', label: 'Phụ huynh' }, { key: 'phone', label: 'Điện thoại', cls: 'mono' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['name', 'klass', 'born', 'parent', 'phone', 'status'], `
Nguyễn An Nhiên|Chồi 2|2021|Nguyễn Văn Hùng|0905 321 778|Đang học
Trần Gia Bảo|Lá 1|2020|Trần Thị Lan|0913 556 024|Đang học
Lê Minh Châu|Mầm 1|2022|Lê Quốc Việt|0935 778 190|Đang học
Phạm Đức Anh|Chồi 1|2021|Phạm Thu Hằng|0988 102 553|Bảo lưu
Hoàng Khánh Linh|Lá 2|2020|Hoàng Văn Phúc|0901 667 238|Đang học
Vũ Tuệ Minh|Mầm 2|2022|Vũ Thị Hoa|0977 334 815|Đã nghỉ`) },
      { id: 'classes', label: 'Lớp học', icon: 'book', type: 'cards', addLabel: 'Thêm lớp', priceLabel: 'Học phí / tháng',
        items: [
          { name: 'Khối Mầm (3–4 tuổi)', desc: '2 lớp · 2 giáo viên/lớp · tối đa 18 bé.', price: 5800000, on: true, img: img('photo-1587654780291-39c9404d746b') },
          { name: 'Khối Chồi (4–5 tuổi)', desc: '3 lớp · Tiếng Anh và vận động mỗi ngày.', price: 6200000, on: true, img: img('photo-1503454537195-1dcabb73ffb9') },
          { name: 'Khối Lá (5–6 tuổi)', desc: '3 lớp · Chuẩn bị vào lớp 1.', price: 6500000, on: true, img: img('photo-1544776193-352d25ca82cd') },
          { name: 'Lớp hè STEAM', desc: 'Khoá 6 tuần, mở đăng ký từ tháng 5.', price: 4200000, on: false, img: img('photo-1596464716127-f2a82984de30') }
        ] },
      { id: 'attendance', label: 'Điểm danh', icon: 'check', type: 'board', hint: 'Lớp Chồi 2 · Bấm vào tên bé để đổi trạng thái điểm danh.',
        statuses: [S('Có mặt', 'good'), S('Vắng có phép', 'warn'), S('Vắng', 'bad')],
        groups: [{ name: 'Lớp Chồi 2 · Thứ Ba 10/11', tiles: ['An Nhiên', 'Gia Huy', 'Bảo Ngọc', 'Minh Quân', 'Khánh An', 'Tuấn Kiệt', 'Hà Vy', 'Đức Minh', 'Thảo My', 'Quốc Bảo', 'Ngọc Hân', 'Phúc An', 'Bảo Trâm', 'Hoàng Nam', 'Diệp Chi', 'Minh Thư'].map((n, i) => ({ label: n, sub: i % 2 ? 'Bé trai' : 'Bé gái', status: i === 0 ? 'Vắng có phép' : i === 9 ? 'Vắng' : 'Có mặt' })) }] },
      { id: 'admissions', label: 'Tuyển sinh', icon: 'users', type: 'table', badge: 'Mới', addLabel: 'Thêm hồ sơ',
        statuses: [S('Mới', 'warn'), S('Đã liên hệ', 'info'), S('Hẹn tham quan', 'serious'), S('Đã nhập học', 'good')],
        columns: [{ key: 'child', label: 'Tên bé', cls: 'strong' }, { key: 'age', label: 'Tuổi', type: 'number' }, { key: 'parent', label: 'Phụ huynh' }, { key: 'phone', label: 'Điện thoại', cls: 'mono' }, { key: 'date', label: 'Ngày gửi', type: 'date' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['child', 'age', 'parent', 'phone', 'date', 'status'], `
Đặng Minh Khang|3|Đặng Thu Thuỷ|0905 667 401|10/11/2026|Mới
Bùi Gia Hân|4|Bùi Văn Long|0934 221 758|09/11/2026|Mới
Ngô Bảo Long|5|Ngô Thị Yến|0912 448 305|08/11/2026|Đã liên hệ
Lâm Khả Hân|3|Lâm Quốc Huy|0987 553 612|06/11/2026|Hẹn tham quan
Trương An Khang|4|Trương Mỹ Dung|0976 115 029|01/11/2026|Đã nhập học`) },
      { id: 'content', label: 'Nội dung website', icon: 'edit', type: 'content',
        fields: [{ key: 'eyebrow', label: 'Dòng giới thiệu nhỏ', value: 'MẦM NON GLG' }, { key: 'title', label: 'Tiêu đề', value: 'Những năm đầu đời, theo nhịp riêng.' }, { key: 'intro', label: 'Mô tả ngắn', value: 'Không gian để các bé tự do khám phá, sáng tạo và phát triển toàn diện.', long: true }, { key: 'cover', label: 'Ảnh bìa (URL)', value: img('photo-1503454537195-1dcabb73ffb9', 900) }] },
      COMMON_SETTINGS('Mầm non GLG', '0236 000 0002', 'mamnon@glg.vn', '07:00 – 17:30, Thứ Hai – Thứ Sáu')
    ]
  },

  gym: {
    name: 'Gym', full: 'GLG Fitness & Gym', icon: 'dumbbell', accent: '#A8432F', soft: '#F6E3DE', soon: true,
    cover: img('photo-1534438327276-14e5300c3a48', 900),
    site: '../index.html', desc: 'Hội viên, gói tập, lịch lớp, huấn luyện viên và khu thiết bị.',
    pickStats: [['642', 'Hội viên'], ['231', 'Check-in'], ['19', 'Sắp hết hạn']],
    notifs: [['19 gói tập sắp hết hạn', 'Trong 7 ngày tới', 'Hôm nay'], ['Máy chạy số 7 báo lỗi', 'Đã chuyển sang bảo trì', '40 phút trước']],
    modules: [
      { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', type: 'dashboard',
        kpis: [
          { label: 'Hội viên đang hoạt động', value: '642', delta: '+28 trong tháng', dir: 'up' },
          { label: 'Check-in hôm nay', value: '231', delta: 'Cao điểm 17:00–19:00' },
          { label: 'Gói sắp hết hạn', count: ['members', 'Sắp hết hạn'], delta: 'Cần nhắc gia hạn' },
          { label: 'Thiết bị bảo trì', count: ['equipment', 'Bảo trì'], delta: 'Theo khu thiết bị' }
        ],
        chart: { title: 'Doanh thu 7 ngày gần nhất', unit: 1e6, values: [24, 31, 19, 27, 35, 42, 29] },
        recent: 'members',
        todo: [['Gọi nhắc gia hạn cho hội viên sắp hết hạn', 'CSKH'], ['Gọi kỹ thuật sửa máy chạy số 7', 'Bảo trì'], ['Mở thêm lớp Yoga 06:00', 'Lịch lớp']] },
      { id: 'members', label: 'Hội viên', icon: 'users', type: 'table', badge: 'Sắp hết hạn', addLabel: 'Thêm hội viên',
        statuses: [S('Đang hoạt động', 'good'), S('Sắp hết hạn', 'warn'), S('Hết hạn', 'bad'), S('Tạm dừng', 'neutral')],
        columns: [{ key: 'name', label: 'Họ tên', cls: 'strong' }, { key: 'pack', label: 'Gói tập' }, { key: 'end', label: 'Hết hạn', type: 'date' }, { key: 'pt', label: 'PT' }, { key: 'phone', label: 'Điện thoại', cls: 'mono' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['name', 'pack', 'end', 'pt', 'phone', 'status'], `
Trần Hoàng Phúc|12 tháng|02/2027|Coach Duy|0905 113 662|Đang hoạt động
Lê Ngọc Ánh|3 tháng|15/11/2026|—|0934 772 018|Sắp hết hạn
Nguyễn Quang Vinh|PT 12 buổi|12/11/2026|Coach Trâm|0912 559 340|Sắp hết hạn
Phạm Thanh Hà|1 tháng|28/10/2026|—|0988 221 407|Hết hạn
Võ Minh Trí|12 tháng|06/2027|Coach Duy|0977 430 196|Đang hoạt động
Đinh Bảo Ngân|3 tháng|01/2027|—|0901 338 274|Tạm dừng`) },
      { id: 'packages', label: 'Gói tập', icon: 'star', type: 'cards', addLabel: 'Thêm gói', priceLabel: 'Giá',
        items: [
          { name: 'Gói 1 tháng', desc: 'Toàn bộ khu tập và lớp nhóm.', price: 690000, on: true, img: img('photo-1534438327276-14e5300c3a48') },
          { name: 'Gói 3 tháng', desc: 'Tặng 1 buổi đo InBody và tư vấn dinh dưỡng.', price: 1790000, on: true, img: img('photo-1571019613454-1cb2f99b2d8b') },
          { name: 'Gói 12 tháng', desc: 'Tặng 2 tháng và 4 buổi PT.', price: 5990000, on: true, img: img('photo-1517836357463-d25dfeac3438') },
          { name: 'PT 1 kèm 1 · 12 buổi', desc: 'Lộ trình cá nhân với huấn luyện viên.', price: 4800000, on: true, img: img('photo-1583454110551-21f2fa2afe61') }
        ] },
      { id: 'classes', label: 'Lịch lớp', icon: 'calendar', type: 'table', addLabel: 'Thêm lớp',
        statuses: [S('Còn chỗ', 'good'), S('Đã đầy', 'warn'), S('Đã huỷ', 'bad')],
        columns: [{ key: 'time', label: 'Giờ', cls: 'mono' }, { key: 'name', label: 'Lớp', cls: 'strong' }, { key: 'coach', label: 'Huấn luyện viên' }, { key: 'room', label: 'Phòng' }, { key: 'seats', label: 'Đã đăng ký' }, { key: 'status', label: 'Trạng thái', type: 'status' }],
        rows: rows(['time', 'name', 'coach', 'room', 'seats', 'status'], `
06:00|Yoga buổi sáng|Coach Mai|Studio 1|14/20|Còn chỗ
07:00|HIIT 45|Coach Duy|Studio 2|20/20|Đã đầy
12:00|Pilates|Coach Trâm|Studio 1|9/16|Còn chỗ
18:00|Spin|Coach Khoa|Studio 3|24/24|Đã đầy
19:00|Boxing cơ bản|Coach Duy|Studio 2|11/18|Còn chỗ`) },
      { id: 'equipment', label: 'Khu thiết bị', icon: 'grid', type: 'board', hint: 'Bấm vào thiết bị để đổi trạng thái.',
        statuses: [S('Trống', 'good'), S('Đang dùng', 'info'), S('Bảo trì', 'bad')],
        groups: [{ name: 'Cardio', tiles: Array.from({ length: 10 }, (_, i) => ({ label: `Máy chạy ${i + 1}`, sub: 'Treadmill', status: i === 6 ? 'Bảo trì' : i % 3 ? 'Đang dùng' : 'Trống' })) },
          { name: 'Khu tạ', tiles: [['Rack 1', 'Squat rack'], ['Rack 2', 'Squat rack'], ['Bench 1', 'Ghế đẩy'], ['Bench 2', 'Ghế đẩy'], ['Cable', 'Máy cáp đôi'], ['Smith', 'Smith machine']].map(([label, sub], i) => ({ label, sub, status: i % 2 ? 'Trống' : 'Đang dùng' })) }] },
      { id: 'content', label: 'Nội dung website', icon: 'edit', type: 'content',
        fields: [{ key: 'eyebrow', label: 'Dòng giới thiệu nhỏ', value: 'GLG FITNESS & GYM' }, { key: 'title', label: 'Tiêu đề', value: 'Năng lượng mỗi ngày.' }, { key: 'intro', label: 'Mô tả ngắn', value: 'Khu máy tập tiêu chuẩn quốc tế, lớp nhóm và huấn luyện viên đồng hành.', long: true }, { key: 'cover', label: 'Ảnh bìa (URL)', value: img('photo-1534438327276-14e5300c3a48', 900) }] },
      COMMON_SETTINGS('GLG Fitness & Gym', '0236 000 0003', 'gym@glg.vn', '05:30 – 22:00')
    ]
  }
};

// ============================================================================ DỮ LIỆU (localStorage, chỉ cho demo)
let db = {};
function load() {
  try { db = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { db = {}; }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); } catch { /* chế độ riêng tư: chỉ giữ trong phiên */ }
}
function data(spaceId, mod) {
  db[spaceId] ??= {};
  if (!db[spaceId][mod.id]) {
    const src = mod.type === 'table' ? mod.rows : mod.type === 'cards' ? mod.items : mod.type === 'board' ? mod.groups
      : mod.type === 'content' ? Object.fromEntries(mod.fields.map((f) => [f.key, f.value]))
      : mod.type === 'settings' ? { ...Object.fromEntries(mod.fields.map((f) => [f.key, f.value])), ...Object.fromEntries(mod.toggles.map((t) => [t.key, t.on])) }
      : mod.type === 'dashboard' ? { done: [] } : null;
    db[spaceId][mod.id] = clone(src);
  }
  return db[spaceId][mod.id];
}
const findMod = (space, id) => space.modules.find((m) => m.id === id);
function countStatus(spaceId, space, modId, ...labels) {
  const mod = findMod(space, modId);
  if (!mod) return 0;
  const d = data(spaceId, mod);
  const key = mod.statusKey || 'status';
  if (mod.type === 'board') return d.reduce((a, g) => a + g.tiles.filter((t) => labels.includes(t.status)).length, 0);
  return d.filter((r) => labels.includes(r[key])).length;
}

// ============================================================================ ĐĂNG NHẬP
const store = {
  get(k, s = sessionStorage) { try { return s.getItem(k); } catch { return null; } },
  set(k, v, s = sessionStorage) { try { v == null ? s.removeItem(k) : s.setItem(k, v); } catch { /* bộ nhớ bị chặn */ } }
};
const authed = () => window.__glgAuthed === true || store.get('glg-admin') === '1' || store.get('glg-admin', localStorage) === '1';
function setAuthed(v, remember = false) {
  window.__glgAuthed = v;
  store.set('glg-admin', v ? '1' : null);
  store.set('glg-admin', v && remember ? '1' : null, localStorage);
}
const lastSpace = () => SPACES[store.get('glg-admin-last', localStorage)] ? store.get('glg-admin-last', localStorage) : null;

const app = document.getElementById('app');
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 2400);
}

function renderLogin() {
  document.title = 'Đăng nhập · GLG Quản trị';
  app.innerHTML = `
  <div class="login">
    <section class="login-art" style="background-image:url('${img('photo-1566073771259-6a8506099945', 1400)}')">
      <div class="brand">GLG<small>THE COLLECTION · QUẢN TRỊ</small></div>
      <div><h2>Một nơi quản lý<br><em>mọi không gian.</em></h2>
      <p>Khách sạn, cà phê, spa, mầm non và gym trong cùng một hệ thống. Chọn mô hình sau khi đăng nhập để bắt đầu.</p></div>
    </section>
    <section class="login-panel">
      <div class="login-box">
        <span class="eyebrow">Cổng quản trị</span>
        <h1>Đăng nhập</h1>
        <p>Nhập mật khẩu quản trị để tiếp tục.</p>
        <form id="login-form" autocomplete="off">
          <label class="field"><span>Tài khoản</span><input class="input" value="admin@glg.vn" readonly></label>
          <label class="field"><span>Mật khẩu</span>
            <div class="pw-wrap"><input class="input" id="pw" type="password" inputmode="numeric" placeholder="••••••" autofocus required>
            <button class="icon-btn" type="button" id="pw-eye" aria-label="Hiện mật khẩu">${icon('eye')}</button></div>
          </label>
          <label class="remember"><input type="checkbox" id="remember"> Ghi nhớ đăng nhập trên máy này</label>
          <div class="login-err" id="login-err" role="alert"></div>
          <button class="btn primary" type="submit" id="login-btn">Đăng nhập</button>
        </form>
        <div class="login-foot"><a href="../index.html">← Về website GLG</a><span>Bản demo giao diện</span></div>
      </div>
    </section>
  </div>`;
  $('#pw-eye').onclick = () => { const p = $('#pw'); p.type = p.type === 'password' ? 'text' : 'password'; };
  $('#login-form').onsubmit = (e) => {
    e.preventDefault();
    if ($('#pw').value === PASSWORD) {
      const btn = $('#login-btn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Đang đăng nhập…';
      setTimeout(() => { setAuthed(true, $('#remember').checked); location.hash = '#/chon'; }, 450);
    } else {
      $('#login-err').textContent = 'Mật khẩu không đúng. Vui lòng thử lại.';
      const box = $('.login-box');
      box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
      $('#pw').select();
    }
  };
}

// ============================================================================ CHỌN MÔ HÌNH
function renderPicker() {
  document.title = 'Chọn mô hình · GLG Quản trị';
  app.innerHTML = `
  <div class="picker">
    <div class="picker-top">
      <div class="brand">GLG<small>THE COLLECTION · QUẢN TRỊ</small></div>
      <div class="picker-actions">
        <a class="btn ghost" href="../index.html">${icon('ext')} <span>Về website</span></a>
        <button class="btn ghost" id="logout">${icon('out')} <span>Đăng xuất</span></button>
      </div>
    </div>
    <div class="picker-head">
      <span class="eyebrow">Xin chào, Minh Anh</span>
      <h1>Hôm nay bạn muốn<br><em>quản lý không gian nào?</em></h1>
      <p>Chọn một mô hình để vào trang quản trị riêng. Bạn có thể đổi mô hình bất cứ lúc nào ở thanh bên trái.</p>
      ${lastSpace() ? `<a class="resume" href="#/${lastSpace()}/dashboard" style="--sp:${SPACES[lastSpace()].accent}">
        <span class="space-icon">${icon(SPACES[lastSpace()].icon)}</span>
        <span><small>Tiếp tục làm việc</small><b>${SPACES[lastSpace()].full}</b></span><span class="go">→</span></a>` : ''}
    </div>
    <div class="spaces">
      ${Object.entries(SPACES).map(([id, s]) => `
      <button class="space" style="--sp:${s.accent}" data-space="${id}">
        <div class="space-media" style="background-image:url('${s.cover}')">
          <span class="space-tag">${s.soon ? 'Sắp ra mắt' : 'Đang hoạt động'}</span>
          <span class="space-icon">${icon(s.icon)}</span>
        </div>
        <div class="space-body">
          <h3>${s.full}</h3>
          <p>${s.desc}</p>
          <div class="space-stats">${s.pickStats.map(([v, l]) => `<span><b>${v}</b>${l}</span>`).join('')}</div>
          <div class="space-go"><span>Vào quản trị ${esc(s.name.toLowerCase())}</span><span>→</span></div>
        </div>
      </button>`).join('')}
    </div>
  </div>`;
  $('#logout').onclick = logout;
  $$('[data-space]').forEach((b) => b.onclick = () => { location.hash = `#/${b.dataset.space}/dashboard`; });
}

function logout() { setAuthed(false); location.hash = '#/dang-nhap'; }

// ============================================================================ KHUNG QUẢN TRỊ
const TAB_COUNT = 4; // số mục hiện trên thanh tab dưới (điện thoại)

function renderShell(spaceId, modId, action) {
  const space = SPACES[spaceId];
  const mod = findMod(space, modId);
  if (!mod) { history.replaceState(null, '', `#/${spaceId}/dashboard`); return renderShell(spaceId, 'dashboard'); }
  document.title = `${mod.label} · ${space.full} · GLG Quản trị`;
  document.documentElement.style.setProperty('--accent', space.accent);
  document.documentElement.style.setProperty('--accent-soft', space.soft);
  store.set('glg-admin-last', spaceId, localStorage);

  // Cùng một mô hình: giữ nguyên khung, chỉ đổi phần nội dung (điều hướng kiểu web app)
  if (app.dataset.shell !== spaceId || !$('#shell')) buildShell(spaceId, space);
  app.dataset.shell = spaceId;
  $$('.nav a, .tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.mod === mod.id));
  $('.tabbar [data-more]').classList.toggle('on', space.modules.findIndex((m) => m.id === mod.id) >= TAB_COUNT);
  $('#crumb-title').textContent = mod.label;
  $('#shell').classList.remove('nav-open');
  closeSheet();
  updateBadges(spaceId, space);

  const el = $('#content');
  el.onclick = el.onchange = el.oninput = null;
  el.classList.remove('enter'); void el.offsetWidth; el.classList.add('enter');
  const ctx = { spaceId, space, mod, el, action, refreshNav: () => updateBadges(spaceId, space) };
  ({ dashboard: viewDashboard, table: viewTable, cards: viewCards, board: viewBoard, content: viewContent, settings: viewSettings })[mod.type](ctx);
}

function updateBadges(spaceId, space) {
  space.modules.forEach((m) => {
    if (!m.badge) return;
    const c = countStatus(spaceId, space, m.id, m.badge);
    $$(`[data-mod="${m.id}"] .count`).forEach((b) => { b.textContent = c; b.hidden = !c; });
  });
}

function buildShell(spaceId, space) {
  const today = new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
  app.innerHTML = `
  <div class="shell" id="shell">
    <aside class="side" aria-label="Menu quản trị">
      <div class="brand"><div>GLG<small>QUẢN TRỊ</small></div><button class="icon-btn menu-close" id="nav-close" aria-label="Đóng menu">${icon('x')}</button></div>
      <button class="switcher" id="switch" title="Đổi mô hình">
        <span class="dot">${icon(space.icon)}</span>
        <div><b>${space.full}</b><span>Đổi mô hình</span></div>
        <span class="chev">${icon('swap')}</span>
      </button>
      <div class="side-label">Quản lý</div>
      <nav class="nav">
        ${space.modules.map((m) => `<a href="#/${spaceId}/${m.id}" data-mod="${m.id}">${icon(m.icon)}<span>${m.label}</span>${m.badge ? '<span class="count" hidden></span>' : ''}</a>`).join('')}
      </nav>
      <div class="side-foot">
        <a href="${space.site}" target="_blank" rel="noopener">${icon('ext')} Xem website</a>
        <a href="../index.html">${icon('hotel')} Về trang chủ GLG</a>
        <button id="logout">${icon('out')} Đăng xuất</button>
      </div>
    </aside>
    <div class="scrim" id="scrim"></div>
    <div class="main">
      <header class="topbar">
        <button class="icon-btn menu-btn" id="nav-open" aria-label="Mở menu">${icon('menu')}</button>
        <div class="crumbs"><span class="crumb-space">${esc(space.full)}</span><b id="crumb-title"></b></div>
        <div class="grow"></div>
        <span class="today">${today}</span>
        <div class="bell"><button class="icon-btn" id="bell" aria-label="Thông báo">${icon('bell')}</button><span class="badge"></span>
          <div class="notif" id="notif"><h4>Thông báo</h4>${space.notifs.map(([t, d, w]) => `<div><b>${t}</b><small>${d} · ${w}</small></div>`).join('')}</div>
        </div>
        <div class="me"><span class="avatar">MA</span><div><b>Nguyễn Minh Anh</b><span>Quản lý</span></div></div>
      </header>
      <main class="content" id="content"></main>
    </div>
    <nav class="tabbar" aria-label="Điều hướng nhanh">
      ${space.modules.slice(0, TAB_COUNT).map((m) => `<a href="#/${spaceId}/${m.id}" data-mod="${m.id}">${icon(m.icon)}<span>${m.label}</span>${m.badge ? '<span class="count" hidden></span>' : ''}</a>`).join('')}
      <button type="button" data-more>${icon('menu')}<span>Khác</span></button>
    </nav>
  </div>`;

  const open = () => $('#shell').classList.add('nav-open');
  const close = () => $('#shell').classList.remove('nav-open');
  $('#switch').onclick = () => { location.hash = '#/chon'; };
  $('#logout').onclick = logout;
  $('#nav-open').onclick = open;
  $('.tabbar [data-more]').onclick = open;
  $('#nav-close').onclick = $('#scrim').onclick = close;
  $('#bell').onclick = (e) => { e.stopPropagation(); $('#notif').classList.toggle('open'); $('.bell .badge')?.remove(); };
  document.onclick = (e) => { if (!e.target.closest('.bell')) $('#notif')?.classList.remove('open'); };
  document.onkeydown = (e) => { if (e.key === 'Escape') { close(); closeSheet(); $('#notif')?.classList.remove('open'); } };
}

const head = (title, sub, actions = '') => `<div class="page-head"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div class="actions">${actions}</div></div>`;
const toneOf = (mod, label) => (mod.statuses.find((s) => s.label === label) || { tone: 'neutral' }).tone;
const pill = (mod, label, asButton) => asButton
  ? `<button class="pill s-${toneOf(mod, label)}" data-cycle title="Bấm để đổi trạng thái">${esc(label)}</button>`
  : `<span class="pill s-${toneOf(mod, label)}">${esc(label)}</span>`;

// ---------------------------------------------------------------- Tổng quan
function viewDashboard({ spaceId, space, mod, el }) {
  const d = data(spaceId, mod);
  const recentMod = findMod(space, mod.recent);
  const recentRows = data(spaceId, recentMod).slice(0, 5);
  const cols = recentMod.columns.filter((c) => c.type !== 'status').slice(0, 5).concat(recentMod.columns.filter((c) => c.type === 'status'));
  const hour = new Date().getHours();
  const greet = hour < 11 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  el.innerHTML = head(`${greet}, Minh Anh`, `Tình hình hoạt động của ${esc(space.full)} hôm nay.`,
    `<a class="btn ghost" href="${space.site}" target="_blank" rel="noopener">${icon('ext')} Xem website</a><a class="btn primary" href="#/${spaceId}/${recentMod.id}/new">${icon('plus')} ${recentMod.addLabel || 'Thêm mới'}</a>`) +
  `<div class="kpis">${mod.kpis.map((k) => {
    const v = k.count ? countStatus(spaceId, space, ...k.count) : k.value;
    return `<div class="card kpi"><span>${k.label}</span><strong>${v}</strong><small class="${k.dir || ''}">${k.dir === 'up' ? '▲ ' : k.dir === 'down' ? '▼ ' : ''}${k.delta || ''}</small></div>`;
  }).join('')}</div>
  <div class="dash-grid">
    <section class="card"><div class="card-head"><div><h3>${mod.chart.title}</h3><p>Đơn vị: triệu đồng · Rê chuột lên cột để xem chi tiết</p></div></div><div class="card-body"><div class="chart" id="chart"></div></div></section>
    <section class="card"><div class="card-head"><div><h3>Việc cần làm</h3><p id="todo-left">${mod.todo.length - d.done.length} việc còn lại</p></div></div>
      <div class="todo">${mod.todo.map(([t, s], i) => `<label><input type="checkbox" data-todo="${i}" ${d.done.includes(i) ? 'checked' : ''}><span>${t}<small>${s}</small></span></label>`).join('')}</div></section>
  </div>
  <section class="card"><div class="card-head"><div><h3>${recentMod.label} gần đây</h3><p>5 mục mới nhất</p></div><a href="#/${spaceId}/${recentMod.id}">Xem tất cả →</a></div>
    <div class="table-wrap"><table class="rows"><thead><tr>${cols.map((c) => `<th class="${c.type === 'money' ? 'money' : ''}">${c.label}</th>`).join('')}</tr></thead>
    <tbody>${recentRows.map((r) => `<tr data-go="#/${spaceId}/${recentMod.id}" tabindex="0">${cols.map((c) => cell(recentMod, c, r, false)).join('')}</tr>`).join('')}</tbody></table></div></section>`;
  $$('tr[data-go]', el).forEach((tr) => { tr.onclick = () => { location.hash = tr.dataset.go; }; });

  drawBars($('#chart'), mod.chart);
  let rz;
  window.onresize = () => { clearTimeout(rz); rz = setTimeout(() => { if ($('#chart')) drawBars($('#chart'), mod.chart); }, 150); };
  $$('[data-todo]', el).forEach((cb) => cb.onchange = () => {
    const i = +cb.dataset.todo;
    d.done = cb.checked ? [...new Set([...d.done, i])] : d.done.filter((x) => x !== i);
    save();
    $('#todo-left').textContent = `${mod.todo.length - d.done.length} việc còn lại`;
  });
}

// Single-series bar chart (SVG) with per-bar hover tooltip
function drawBars(host, chart) {
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(Date.now() - i * 864e5); days.push(d); }
  // Vẽ theo bề rộng thật của khung để chữ trên trục luôn đúng cỡ (không bị thu nhỏ trên điện thoại)
  const W = Math.max(300, Math.round(host.clientWidth) || 640), H = 240, pl = 40, pr = 8, pt = 22, pb = 28;
  const max = Math.max(...chart.values);
  // "Nice" axis: tick step from 1/2/5 × 10^k, about 4 ticks, top just above the max
  const raw = max / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const tickStep = [1, 2, 5, 10].map((m) => m * mag).find((v) => v >= raw);
  const ticks = Math.ceil(max / tickStep);
  const top = ticks * tickStep;
  const iw = W - pl - pr, ih = H - pt - pb;
  const bw = Math.min(42, iw / chart.values.length * 0.5);
  const x = (i) => pl + (i + 0.5) * (iw / chart.values.length);
  const y = (v) => pt + ih - (v / top) * ih;
  const r = 4;
  const bar = (cx, v) => {
    const x0 = cx - bw / 2, x1 = cx + bw / 2, y0 = y(v), yb = pt + ih;
    const rr = Math.min(r, (yb - y0) / 2);
    return `M${x0},${yb} V${y0 + rr} Q${x0},${y0} ${x0 + rr},${y0} H${x1 - rr} Q${x1},${y0} ${x1},${y0 + rr} V${yb} Z`;
  };
  const fmtV = (v) => v.toLocaleString('vi-VN', { maximumFractionDigits: 1 });
  const dayLbl = (d, i) => i === 6 ? 'Hôm nay' : ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()];
  const best = chart.values.indexOf(max);
  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${chart.title}: ${chart.values.map((v, i) => `${dayLbl(days[i], i)} ${fmtV(v)} triệu`).join(', ')}">
    <g class="grid">${Array.from({ length: ticks + 1 }, (_, i) => `<line x1="${pl}" x2="${W - pr}" y1="${y(top / ticks * i)}" y2="${y(top / ticks * i)}"/>`).join('')}</g>
    <g class="axis">${Array.from({ length: ticks + 1 }, (_, i) => `<text x="${pl - 10}" y="${y(top / ticks * i) + 4}" text-anchor="end">${fmtV(top / ticks * i)}</text>`).join('')}
      ${chart.values.map((_, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${dayLbl(days[i], i)}</text>`).join('')}</g>
    ${chart.values.map((v, i) => `<rect class="hit" data-i="${i}" x="${x(i) - iw / chart.values.length / 2}" y="${pt}" width="${iw / chart.values.length}" height="${ih}"/><path class="bar" d="${bar(x(i), v)}"/>`).join('')}
    <text class="val" x="${x(best)}" y="${y(max) - 8}" text-anchor="middle">${fmtV(max)}</text>
    <text class="val" x="${x(6)}" y="${y(chart.values[6]) - 8}" text-anchor="middle">${best === 6 ? '' : fmtV(chart.values[6])}</text>
  </svg><div class="tip" id="tip"></div>`;
  const tip = $('#tip', host);
  const svg = $('svg', host);
  $$('.hit', host).forEach((h) => {
    h.onmouseenter = () => {
      const i = +h.dataset.i;
      const scale = svg.getBoundingClientRect().width / W;
      tip.innerHTML = `<b>${fmtV(chart.values[i])} triệu ₫</b>${days[i].toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })}`;
      tip.style.left = `${x(i) * scale}px`;
      tip.style.top = `${y(chart.values[i]) * scale}px`;
      tip.classList.add('show');
    };
    h.onmouseleave = () => tip.classList.remove('show');
  });
}

// ---------------------------------------------------------------- Bảng dữ liệu
function cell(mod, c, r, interactive) {
  const v = r[c.key];
  const lbl = `data-label="${esc(c.label)}"`;
  if (c.type === 'status') return `<td ${lbl} class="st">${pill(mod, v, interactive)}</td>`;
  if (c.type === 'money') return `<td ${lbl} class="money">${+v ? vnd(v) : 'Miễn phí'}</td>`;
  return `<td ${lbl} class="${c.cls || ''}">${esc(v)}</td>`;
}

// ---------------------------------------------------------------- Ngăn chi tiết (side sheet)
function closeSheet() { $('#sheet')?.remove(); }
function openSheet({ title, sub, mod, row, onSave, onDelete }) {
  closeSheet();
  const key = mod.statusKey || 'status';
  const wrap = document.createElement('div');
  wrap.id = 'sheet';
  wrap.className = 'sheet-wrap';
  wrap.innerHTML = `<aside class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <header><div><small>${esc(sub)}</small><h3>${esc(title)}</h3></div><button class="icon-btn" data-close aria-label="Đóng">${icon('x')}</button></header>
    <form class="sheet-body" id="sheet-form">
      <div class="field"><span>${esc(mod.columns.find((c) => c.key === key)?.label || 'Trạng thái')}</span>
        <div class="steps">${mod.statuses.map((s) => `<button type="button" class="pill s-${s.tone} ${row[key] === s.label ? 'picked' : ''}" data-st="${esc(s.label)}">${esc(s.label)}</button>`).join('')}</div></div>
      ${mod.columns.filter((c) => c.key !== key).map((c) => `<label class="field"><span>${esc(c.label)}</span>
        <input class="input" name="${c.key}" value="${esc(row[c.key])}" ${c.type === 'money' || c.type === 'number' ? 'type="number" min="0"' : ''}></label>`).join('')}
      <label class="field"><span>Ghi chú nội bộ</span><textarea class="input" name="_note" placeholder="Chỉ nhân viên xem được…">${esc(row._note || '')}</textarea></label>
    </form>
    <footer><button class="btn danger" type="button" data-delete>${icon('trash')} Xoá</button><span class="grow"></span><button class="btn ghost" type="button" data-close>Huỷ</button><button class="btn primary" type="submit" form="sheet-form">Lưu thay đổi</button></footer>
  </aside>`;
  document.body.appendChild(wrap);
  requestAnimationFrame(() => wrap.classList.add('open'));
  let status = row[key];
  wrap.onclick = (e) => {
    if (e.target === wrap || e.target.closest('[data-close]')) return closeSheet();
    const st = e.target.closest('[data-st]');
    if (st) { status = st.dataset.st; $$('[data-st]', wrap).forEach((b) => b.classList.toggle('picked', b === st)); }
    if (e.target.closest('[data-delete]') && confirm('Xoá mục này khỏi danh sách demo?')) { onDelete(); closeSheet(); }
  };
  $('#sheet-form').onsubmit = (e) => {
    e.preventDefault();
    const vals = Object.fromEntries(new FormData(e.target));
    mod.columns.forEach((c) => { if (c.key in vals) row[c.key] = c.type === 'money' || c.type === 'number' ? +vals[c.key] || 0 : vals[c.key]; });
    row._note = vals._note;
    row[key] = status;
    onSave(); closeSheet();
  };
  $('input', wrap)?.focus({ preventScroll: true });
}

function viewTable(ctx) {
  const { spaceId, mod, el } = ctx;
  const list = data(spaceId, mod);
  const key = mod.statusKey || 'status';
  let filter = 'all';
  let q = '';

  el.innerHTML = head(mod.label, `${list.length} mục · Bấm một dòng để xem chi tiết, bấm trạng thái để chuyển bước nhanh.`,
    `<button class="btn ghost" id="export">${icon('ext')} Xuất Excel</button><button class="btn primary" id="add">${icon('plus')} ${mod.addLabel || 'Thêm mới'}</button>`) +
  `<section class="card"><div class="toolbar"><div class="tabs" id="tabs"></div>
    <label class="search">${icon('search')}<input class="input" id="q" placeholder="Tìm kiếm…"></label></div>
    <div class="table-wrap"><table class="rows"><thead><tr>${mod.columns.map((c) => `<th class="${c.type === 'money' ? 'money' : ''}">${c.label}</th>`).join('')}<th></th></tr></thead><tbody id="tbody"></tbody></table></div>
    <div class="table-foot"><span id="foot"></span><span>Dữ liệu mẫu · lưu tạm trên trình duyệt</span></div></section>`;

  function draw() {
    const counts = Object.fromEntries(mod.statuses.map((s) => [s.label, list.filter((r) => r[key] === s.label).length]));
    $('#tabs').innerHTML = `<button class="tab ${filter === 'all' ? 'on' : ''}" data-f="all">Tất cả<em>${list.length}</em></button>` +
      mod.statuses.map((s) => `<button class="tab ${filter === s.label ? 'on' : ''}" data-f="${esc(s.label)}">${esc(s.label)}<em>${counts[s.label]}</em></button>`).join('');
    const shown = list.filter((r) => (filter === 'all' || r[key] === filter) && (!q || Object.values(r).join(' ').toLowerCase().includes(q)));
    $('#tbody').innerHTML = shown.length ? shown.map((r) => `<tr data-id="${r._id}" tabindex="0">${mod.columns.map((c) => cell(mod, c, r, true)).join('')}<td class="act"><span class="chev-r">›</span></td></tr>`).join('')
      : `<tr><td colspan="${mod.columns.length + 1}" class="empty">Không có mục nào phù hợp.</td></tr>`;
    $('#foot').textContent = `Hiển thị ${shown.length} / ${list.length} mục`;
  }
  draw();

  $('#tabs').onclick = (e) => { const t = e.target.closest('[data-f]'); if (t) { filter = t.dataset.f; draw(); } };
  $('#q').oninput = (e) => { q = e.target.value.trim().toLowerCase(); draw(); };
  $('#tbody').onclick = (e) => {
    const tr = e.target.closest('tr[data-id]');
    if (!tr) return;
    const row = list.find((r) => r._id === +tr.dataset.id);
    if (e.target.closest('[data-cycle]')) {
      const order = mod.statuses.map((s) => s.label);
      row[key] = order[(order.indexOf(row[key]) + 1) % order.length];
      save(); draw();
      toast(`Đã chuyển sang “${row[key]}”`);
      if (mod.badge) ctx.refreshNav();
    } else {
      const first = mod.columns.find((c) => c.cls === 'strong') || mod.columns[0];
      openSheet({
        title: String(row[first.key] ?? ''), sub: mod.label, mod, row,
        onSave: () => { save(); draw(); ctx.refreshNav(); toast('Đã lưu thay đổi'); },
        onDelete: () => { list.splice(list.indexOf(row), 1); save(); draw(); ctx.refreshNav(); toast('Đã xoá'); }
      });
    }
  };
  $('#tbody').onkeydown = (e) => { if (e.key === 'Enter' && e.target.matches('tr[data-id]')) e.target.click(); };
  $('#export').onclick = () => toast('Xuất file sẽ có khi kết nối backend');
  $('#add').onclick = () => openForm(mod.addLabel || 'Thêm mới', mod.columns.map((c) => c.type === 'status'
    ? { key: c.key, label: c.label, options: mod.statuses.map((s) => s.label) }
    : { key: c.key, label: c.label, type: c.type === 'money' || c.type === 'number' ? 'number' : 'text' }), (vals) => {
    const row = { _id: Date.now() };
    mod.columns.forEach((c) => { row[c.key] = c.type === 'money' || c.type === 'number' ? +vals[c.key] || 0 : vals[c.key]; });
    list.unshift(row);
    save(); filter = 'all'; draw(); toast('Đã thêm mục mới');
    if (mod.badge) ctx.refreshNav();
  });
  // Đi từ nút "Tạo …" ở trang Tổng quan: mở luôn form, rồi bỏ "/new" khỏi địa chỉ
  if (ctx.action === 'new') {
    history.replaceState(null, '', `#/${spaceId}/${mod.id}`);
    $('#add').click();
  }
}

// ---------------------------------------------------------------- Thẻ (thực đơn, dịch vụ, gói…)
function viewCards({ spaceId, mod, el }) {
  const items = data(spaceId, mod);
  function draw() {
    el.innerHTML = head(mod.label, `${items.filter((i) => i.on).length} đang hiển thị trên website · ${items.filter((i) => !i.on).length} tạm ẩn. Sửa giá trực tiếp trên thẻ.`,
      `<button class="btn primary" id="add">${icon('plus')} ${mod.addLabel}</button>`) +
    `<div class="items">${items.map((it, i) => `
      <article class="card item ${it.on ? '' : 'off'}">
        <div class="item-media" style="background-image:url('${esc(it.img || '')}')"><span class="pill ${it.on ? 's-good' : 's-neutral'}">${it.on ? 'Đang hiển thị' : 'Tạm ẩn'}</span></div>
        <div class="item-body"><h4>${esc(it.name)}</h4><p>${esc(it.desc)}</p>
          <label class="field"><span>${mod.priceLabel}</span><input class="price-input" data-price="${i}" value="${new Intl.NumberFormat('vi-VN').format(it.price)}" inputmode="numeric"></label>
          <div class="item-foot"><button class="switch" role="switch" aria-checked="${it.on}" data-toggle="${i}" aria-label="Hiển thị"></button><button class="icon-btn" data-del="${i}" aria-label="Xoá">${icon('trash')}</button></div>
        </div>
      </article>`).join('')}</div>`;
    $('#add').onclick = () => openForm(mod.addLabel, [{ key: 'name', label: 'Tên' }, { key: 'desc', label: 'Mô tả ngắn' }, { key: 'price', label: mod.priceLabel + ' (₫)', type: 'number' }, { key: 'img', label: 'Ảnh (URL, không bắt buộc)' }], (v) => {
      items.unshift({ name: v.name || 'Mục mới', desc: v.desc, price: +v.price || 0, img: v.img, on: true });
      save(); draw(); toast('Đã thêm');
    });
  }
  draw();
  el.onchange = (e) => {
    const p = e.target.closest('[data-price]');
    if (!p) return;
    const it = items[+p.dataset.price];
    it.price = +p.value.replace(/\D/g, '') || 0;
    p.value = new Intl.NumberFormat('vi-VN').format(it.price);
    save(); toast(`Đã cập nhật giá “${it.name}”`);
  };
  el.onclick = (e) => {
    const t = e.target.closest('[data-toggle]');
    const d = e.target.closest('[data-del]');
    if (t) { const it = items[+t.dataset.toggle]; it.on = !it.on; save(); draw(); toast(it.on ? 'Đã hiển thị trên website' : 'Đã tạm ẩn'); }
    if (d && confirm('Xoá mục này?')) { items.splice(+d.dataset.del, 1); save(); draw(); toast('Đã xoá'); }
  };
}

// ---------------------------------------------------------------- Sơ đồ (phòng, bàn, điểm danh, thiết bị)
function viewBoard({ spaceId, mod, el }) {
  const groups = data(spaceId, mod);
  function draw() {
    const all = groups.flatMap((g) => g.tiles);
    el.innerHTML = head(mod.label, mod.hint, `<button class="btn ghost" id="reset-board">${icon('reset')} Đặt lại</button>`) +
    `<section class="card"><div class="toolbar"><div class="legend">${mod.statuses.map((s) => `<span class="pill s-${s.tone}">${s.label} · ${all.filter((t) => t.status === s.label).length}</span>`).join('')}</div><span class="hint">Tổng ${all.length}</span></div>
      ${groups.map((g, gi) => `<div class="board-group"><h4>${esc(g.name)}</h4><div class="tiles">${g.tiles.map((t, ti) => `
        <button class="tile s-${toneOf(mod, t.status)}" data-t="${gi}-${ti}"><b>${esc(t.label)}</b><span>${esc(t.sub)}</span><em>${esc(t.status)}</em></button>`).join('')}</div></div>`).join('')}
    </section>`;
    $('#reset-board').onclick = () => { db[spaceId][mod.id] = clone(mod.groups); save(); viewBoard({ spaceId, mod, el }); toast('Đã đặt lại sơ đồ mẫu'); };
  }
  draw();
  el.onclick = (e) => {
    const b = e.target.closest('[data-t]');
    if (!b) return;
    const [gi, ti] = b.dataset.t.split('-').map(Number);
    const t = groups[gi].tiles[ti];
    const order = mod.statuses.map((s) => s.label);
    t.status = order[(order.indexOf(t.status) + 1) % order.length];
    save(); draw(); toast(`${t.label}: ${t.status}`);
  };
}

// ---------------------------------------------------------------- Nội dung website
function viewContent({ spaceId, space, mod, el }) {
  const d = data(spaceId, mod);
  el.innerHTML = head(mod.label, 'Chỉnh nội dung hiển thị trên trang của mô hình. Xem trước cập nhật ngay khi gõ.',
    `<a class="btn ghost" href="${space.site}" target="_blank" rel="noopener">${icon('ext')} Mở trang</a><button class="btn primary" id="save">Lưu thay đổi</button>`) +
  `<div class="two-col">
    <section class="card"><div class="card-head"><div><h3>Phần đầu trang</h3><p>Tiêu đề, mô tả và ảnh bìa</p></div></div>
      <div class="card-body form-grid">${mod.fields.map((f) => `<label class="field ${f.long || f.key === 'cover' || f.key === 'title' ? 'full' : ''}"><span>${f.label}</span>
        ${f.long ? `<textarea class="input" data-k="${f.key}">${esc(d[f.key])}</textarea>` : `<input class="input" data-k="${f.key}" value="${esc(d[f.key])}">`}</label>`).join('')}</div></section>
    <section class="card preview"><div class="card-head"><div><h3>Xem trước</h3><p>Hiển thị gần giống trên website</p></div></div>
      <div class="preview-media" id="pv-media"><div class="preview-copy"><small id="pv-eyebrow"></small><h4 id="pv-title"></h4></div></div>
      <div class="card-body"><p id="pv-intro" style="margin:0;color:var(--ink-2);line-height:1.7"></p></div></section>
  </div>`;
  const sync = () => {
    $('#pv-media').style.backgroundImage = `url('${(d.cover || '').replace(/'/g, '')}')`;
    $('#pv-eyebrow').textContent = d.eyebrow || '';
    $('#pv-title').textContent = d.title || '';
    $('#pv-intro').textContent = d.intro || '';
  };
  sync();
  el.oninput = (e) => { const k = e.target.dataset.k; if (k) { d[k] = e.target.value; sync(); } };
  $('#save').onclick = () => { save(); toast('Đã lưu nội dung (bản demo, chưa đẩy lên website)'); };
}

// ---------------------------------------------------------------- Cài đặt
function viewSettings({ spaceId, space, mod, el }) {
  const d = data(spaceId, mod);
  el.innerHTML = head(mod.label, `Thông tin chung và tài khoản quản trị của ${esc(space.full)}.`, `<button class="btn primary" id="save">Lưu cài đặt</button>`) +
  `<div class="two-col">
    <div style="display:grid;gap:16px">
      <section class="card"><div class="card-head"><div><h3>Thông tin chung</h3></div></div>
        <div class="card-body form-grid">${mod.fields.map((f) => `<label class="field"><span>${f.label}</span><input class="input" data-k="${f.key}" value="${esc(d[f.key])}"></label>`).join('')}</div></section>
      <section class="card"><div class="card-head"><div><h3>Thông báo & đặt chỗ</h3></div></div>
        <div class="card-body" style="padding-block:6px">${mod.toggles.map((t) => `<div class="toggle-row"><div><b>${t.label}</b><span>${t.hint}</span></div><button class="switch" role="switch" aria-checked="${!!d[t.key]}" data-sw="${t.key}" aria-label="${t.label}"></button></div>`).join('')}</div></section>
    </div>
    <div style="display:grid;gap:16px">
      <section class="card"><div class="card-head"><div><h3>Tài khoản quản trị</h3><p>Phân quyền sẽ có khi kết nối backend</p></div></div>
        <div class="todo">${mod.team.map(([n, r, a]) => `<label style="cursor:default;align-items:center"><span class="avatar">${a}</span><span><b style="font-weight:600">${n}</b><small>${r}</small></span></label>`).join('')}</div></section>
      <section class="card"><div class="card-head"><div><h3>Dữ liệu demo</h3><p>Đưa mọi thay đổi về dữ liệu mẫu ban đầu</p></div></div>
        <div class="card-body" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn danger" id="reset">${icon('reset')} Khôi phục dữ liệu mẫu</button><button class="btn ghost" id="logout2">${icon('out')} Đăng xuất</button></div></section>
    </div>
  </div>`;
  el.oninput = (e) => { const k = e.target.dataset.k; if (k) d[k] = e.target.value; };
  el.onclick = (e) => {
    const sw = e.target.closest('[data-sw]');
    if (sw) { d[sw.dataset.sw] = !d[sw.dataset.sw]; sw.setAttribute('aria-checked', d[sw.dataset.sw]); save(); }
  };
  $('#save').onclick = () => { save(); toast('Đã lưu cài đặt'); };
  $('#logout2').onclick = logout;
  $('#reset').onclick = () => {
    if (!confirm(`Khôi phục toàn bộ dữ liệu mẫu của ${space.full}?`)) return;
    delete db[spaceId]; save(); toast('Đã khôi phục dữ liệu mẫu');
    renderShell(spaceId, mod.id);
  };
}

// ---------------------------------------------------------------- Form thêm mới (modal)
function openForm(title, fields, onSubmit) {
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <header><h3>${esc(title)}</h3><button class="icon-btn" data-close aria-label="Đóng">${icon('x')}</button></header>
    <form>${fields.map((f) => `<label class="field"><span>${f.label}</span>${f.options
      ? `<select class="input" name="${f.key}">${f.options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`
      : `<input class="input" name="${f.key}" type="${f.type || 'text'}" ${f.type === 'number' ? 'min="0"' : ''}>`}</label>`).join('')}
      <footer><button class="btn ghost" type="button" data-close>Huỷ</button><button class="btn primary" type="submit">Lưu</button></footer></form></div>`;
  document.body.appendChild(wrap);
  const close = () => wrap.remove();
  wrap.onclick = (e) => { if (e.target === wrap || e.target.closest('[data-close]')) close(); };
  wrap.onkeydown = (e) => { if (e.key === 'Escape') close(); };
  $('input, select', wrap)?.focus();
  $('form', wrap).onsubmit = (e) => {
    e.preventDefault();
    onSubmit(Object.fromEntries(new FormData(e.target)));
    close();
  };
}

// ============================================================================ ĐIỀU HƯỚNG
function route() {
  const [, a, b, c] = location.hash.split('/');
  if (!authed()) {
    app.dataset.shell = '';
    if (a !== 'dang-nhap') history.replaceState(null, '', '#/dang-nhap');
    return renderLogin();
  }
  if (a && SPACES[a]) return renderShell(a, b || 'dashboard', c);
  app.dataset.shell = '';
  if (a !== 'chon') history.replaceState(null, '', '#/chon');
  document.documentElement.style.setProperty('--accent', '#A8834C');
  document.documentElement.style.setProperty('--accent-soft', '#F6F0E6');
  renderPicker();
}
load();
// Đã đăng nhập mà mở thẳng trang admin thì vào luôn mô hình làm việc gần nhất
if (authed() && (!location.hash || location.hash === '#/' || location.hash === '#/dang-nhap')) {
  history.replaceState(null, '', lastSpace() ? `#/${lastSpace()}/dashboard` : '#/chon');
}
addEventListener('hashchange', () => { window.scrollTo(0, 0); route(); });
route();
