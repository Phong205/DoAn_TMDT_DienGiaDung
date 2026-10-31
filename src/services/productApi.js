// Lấy dữ liệu sản phẩm.
// Ưu tiên gọi json-server (npx json-server public/data/db.json --port 3000).
// Nếu json-server chưa chạy thì đọc thẳng file tĩnh public/data/db.json.
const API_URL = 'http://localhost:3000/products';
const STATIC_URL = '/data/db.json';

export async function getProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('json-server lỗi');
    return await res.json();
  } catch {
    const res = await fetch(STATIC_URL);
    const data = await res.json();
    return data.products || [];
  }
}

export async function getProductById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('json-server lỗi');
    return await res.json();
  } catch {
    const products = await getProducts();
    return products.find((p) => String(p.id) === String(id)) || null;
  }
}

export const formatPrice = (n) =>
  Number(n).toLocaleString('vi-VN') + ' ₫';

// Ảnh dự phòng khi link ảnh bị lỗi
export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#f1f3f5"/><text x="50%" y="50%" font-family="sans-serif" font-size="18" fill="#adb5bd" text-anchor="middle" dominant-baseline="middle">Chưa có ảnh</text></svg>'
  );

// Tên hiển thị cho các thông số kỹ thuật
export const SPEC_LABELS = {
  dungTich: 'Dung tích',
  congSuat: 'Công suất',
  kichThuoc: 'Kích thước',
  trongLuong: 'Trọng lượng',
  congNghe: 'Công nghệ',
  baoHanh: 'Bảo hành',
  xuatXu: 'Xuất xứ',
};

export const CATEGORY_LABELS = {
  'tu-lanh': 'Tủ lạnh',
  'noi-com': 'Nồi cơm điện',
  'may-giat': 'Máy giặt',
  'dieu-hoa': 'Điều hòa',
  'noi-chien': 'Nồi chiên không dầu',
  'quat': 'Quạt điện',
};
