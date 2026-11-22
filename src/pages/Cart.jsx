import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    applyCoupon,
    clearCart,
    removeCoupon,
    removeFromCart,
    updateQuantity,
} from '../features/cartSlice';
import { FALLBACK_IMG, formatPrice } from '../services/productApi';
import { validateCoupon } from '../services/couponService';
import { useCartPricing } from '../hooks/useCartPricing';

function Cart() {
    const dispatch = useDispatch();
    // Lấy giỏ hàng từ Redux và tính giảm giá (hook dùng chung với Checkout)
    const {
        items,
        totalQuantity,
        subtotal,
        coupons,
        suggestions,
        couponsLoaded,
        couponCode,
        couponResult,
        discountAmount,
        finalAmount,
    } = useCartPricing();

    const [codeInput, setCodeInput] = useState('');
    const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

    const handleApplyCoupon = () => {
        if (!couponsLoaded) {
            setCouponMessage({ type: 'danger', text: 'Đang tải danh sách mã, vui lòng thử lại.' });
            return;
        }
        const result = validateCoupon(codeInput, { coupons, items, subtotal });
        if (!result.valid) {
            setCouponMessage({ type: 'danger', text: result.message });
            return;
        }
        dispatch(applyCoupon(result.coupon.code));
        setCodeInput('');
        setCouponMessage({ type: 'success', text: result.message });
    };

    const handleRemoveCoupon = () => {
        dispatch(removeCoupon());
        setCouponMessage({ type: '', text: '' });
    };

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

                            {/* Mã giảm giá */}
                            {couponCode ? (
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span>
                                        Mã đang dùng: <span className="badge bg-success">{couponCode}</span>
                                    </span>
                                    <button
                                        className="btn btn-link btn-sm p-0 text-danger"
                                        onClick={handleRemoveCoupon}
                                    >
                                        Bỏ mã
                                    </button>
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            placeholder="Nhập mã giảm giá"
                                            value={codeInput}
                                            onChange={(e) => setCodeInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                        />
                                        <button className="btn btn-dark" onClick={handleApplyCoupon}>
                                            Áp dụng
                                        </button>
                                    </div>
                                    {suggestions.length > 0 && (
                                        <div className="mt-2 d-flex flex-wrap gap-1 align-items-center">
                                            <small className="text-muted">Mã gợi ý:</small>
                                            {suggestions.map((c) => (
                                                <button
                                                    key={c.code}
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm py-0"
                                                    title={c.description}
                                                    onClick={() => setCodeInput(c.code)}
                                                >
                                                    {c.code}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            {couponMessage.text && (
                                <div className={`alert alert-${couponMessage.type} py-2 small`}>
                                    {couponMessage.text}
                                </div>
                            )}
                            {couponCode && couponResult && !couponResult.valid && (
                                <div className="alert alert-warning py-2 small">
                                    Mã {couponCode} không còn áp dụng: {couponResult.message}
                                </div>
                            )}
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tạm tính</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Phí vận chuyển</span>
                                <span className="text-success">Miễn phí</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="d-flex justify-content-between mb-2 text-success">
                                    <span>Giảm giá ({couponCode})</span>
                                    <span>−{formatPrice(discountAmount)}</span>
                                </div>
                            )}
                            <hr />
                            <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                                <span>Tổng cộng</span>
                                <span className="text-danger">{formatPrice(finalAmount)}</span>
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
