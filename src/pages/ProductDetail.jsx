import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import {
  getProductById,
  formatPrice,
  FALLBACK_IMG,
  SPEC_LABELS,
  CATEGORY_LABELS,
} from '../services/productApi';

function ProductDetail() {
  const { id } = useParams(); // Lấy id sản phẩm từ URL /product/:id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lưu kèm id đã tải để biết khi nào đang tải sản phẩm mới
  const [result, setResult] = useState({ id: null, product: null });
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    getProductById(id)
      .catch(() => null)
      .then((product) => {
        if (!cancelled) setResult({ id, product });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const loading = result.id !== id;
  const product = result.product;

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center py-5">
        <h4>Không tìm thấy sản phẩm</h4>
        <Link to="/products" className="btn btn-primary mt-3">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;
  const specs = Object.entries(product.specs || {});

  const changeQty = (delta) => setQuantity((q) => Math.max(1, q + delta));

  // Thêm vào giỏ qua Redux (cartSlice của nhóm).
  // addToCart mỗi lần cộng 1 sản phẩm nên gọi lặp theo số lượng đã chọn.
  const addSelectedToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const handleAddToCart = () => {
    addSelectedToCart();
    setMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    setTimeout(() => setMessage(''), 2500);
  };

  const handleBuyNow = () => {
    addSelectedToCart();
    navigate('/cart');
  };

  return (
    <div className="container py-4 text-start">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Sản phẩm</Link>
          </li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="card shadow-sm p-3">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: 400, objectFit: 'contain' }}
              onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
            />
          </div>
        </div>

        <div className="col-md-7">
          <span className="badge bg-secondary mb-2">
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
          <h2>{product.name}</h2>
          <p className="mb-1">
            Thương hiệu: <strong>{product.brand}</strong>
          </p>
          <p className="text-warning">★ {product.rating ?? '—'} / 5</p>

          <div className="bg-light rounded p-3 mb-3">
            <span className="fs-3 fw-bold text-danger me-3">
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="badge bg-danger">-{discount}%</span>
              </>
            )}
          </div>

          {/* Chọn số lượng */}
          <div className="d-flex align-items-center mb-3">
            <span className="me-3">Số lượng:</span>
            <div className="input-group" style={{ width: 140 }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => changeQty(-1)}
              >
                −
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => changeQty(1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-outline-primary" onClick={handleAddToCart}>
              Thêm vào giỏ
            </button>
            <button className="btn btn-danger px-4" onClick={handleBuyNow}>
              Mua ngay
            </button>
          </div>
          {message && <div className="alert alert-success py-2">{message}</div>}
        </div>
      </div>

      {/* Thông số kỹ thuật */}
      <div className="card shadow-sm mt-4">
        <div className="card-header fw-bold">Thông số kỹ thuật</div>
        <div className="card-body p-0">
          {specs.length === 0 ? (
            <p className="p-3 mb-0">Chưa có thông số.</p>
          ) : (
            <table className="table table-striped mb-0">
              <tbody>
                {specs.map(([key, value]) => (
                  <tr key={key}>
                    <th style={{ width: '35%' }}>{SPEC_LABELS[key] || key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
