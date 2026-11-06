import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../features/cartSlice';
import { FALLBACK_IMG, formatPrice } from '../services/productApi';

function Cart() {
    const dispatch = useDispatch();
    // Lấy dữ liệu giỏ hàng từ Redux
    const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

    const changeQty = (item, delta) => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + delta }));
    };

    const handleClear = () => {
        if (window.confirm('Xóa toàn bộ sản phẩm trong giỏ?')) {
            dispatch(clearCart());
        }
    };

    // Giỏ trống
    if (items.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h2 className="fw-bold">Giỏ hàng trống</h2>
                <p className="text-muted mb-4">Hãy chọn sản phẩm để bắt đầu mua sắm.</p>
                <Link to="/products" className="btn btn-warning fw-bold text-dark">
                    Xem sản phẩm
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4 text-start">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold mb-0">Giỏ hàng ({totalQuantity})</h2>
                <button className="btn btn-outline-danger btn-sm" onClick={handleClear}>
                    Xóa giỏ hàng
                </button>
            </div>

            <div className="row g-4">
                {/* Danh sách sản phẩm */}
                <div className="col-lg-8">
                    {items.map((item) => (
                        <div className="card shadow-sm mb-3" key={item.id}>
                            <div className="card-body d-flex flex-column flex-sm-row gap-3 align-items-center">
                                <img
                                    src={item.image || FALLBACK_IMG}
                                    alt={item.name}
                                    width={96}
                                    height={96}
                                    style={{ objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.currentTarget.src = FALLBACK_IMG;
                                    }}
                                />

                                <div className="flex-grow-1 w-100">
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="text-decoration-none text-dark fw-semibold"
                                    >
                                        {item.name}
                                    </Link>
                                    <div className="text-danger fw-bold">
                                        {formatPrice(item.price)}
                                    </div>
                                </div>

                                <div className="input-group" style={{ width: 140 }}>
                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={item.quantity <= 1}
                                        onClick={() => changeQty(item, -1)}
                                    >
                                        −
                                    </button>
                                    <input
                                        className="form-control text-center"
                                        value={item.quantity}
                                        readOnly
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => changeQty(item, 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="fw-bold text-nowrap">
                                    {formatPrice(item.price * item.quantity)}
                                </div>

                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tóm tắt đơn hàng */}
                <div className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="fw-bold">Tóm tắt đơn hàng</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tạm tính</span>
                                <span>{formatPrice(totalAmount)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Phí vận chuyển</span>
                                <span className="text-success">Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                                <span>Tổng cộng</span>
                                <span className="text-danger">{formatPrice(totalAmount)}</span>
                            </div>
                            <Link to="/checkout" className="btn btn-warning w-100 fw-bold text-dark">
                                Thanh toán
                            </Link>
                            <Link to="/products" className="btn btn-link w-100 text-decoration-none">
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
