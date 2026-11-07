import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import { formatPrice } from '../services/productApi';

const emptyForm = { fullName: '', phone: '', address: '', note: '' };

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');
    // Cờ này ngăn trang tự quay về /cart ngay sau khi clearCart() làm giỏ rỗng
    const [submitted, setSubmitted] = useState(false);

    // Giỏ trống mà chưa đặt hàng thì quay về giỏ hàng
    if (items.length === 0 && !submitted) {
        return <Navigate to="/cart" replace />;
    }

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const customer = {
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            note: form.note.trim(),
        };

        if (!customer.fullName || !customer.phone || !customer.address) {
            setError('Vui lòng nhập họ tên, số điện thoại và địa chỉ giao hàng.');
            return;
        }
        if (!/^0\d{9}$/.test(customer.phone)) {
            setError('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.');
            return;
        }

        const order = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            customer,
            items,
            totalQuantity,
            totalAmount,
            paymentMethod: 'COD',
            status: 'Chờ xác nhận',
        };

        // Lưu đơn hàng vào localStorage
        try {
            const oldOrders = JSON.parse(localStorage.getItem('orders')) || [];
            localStorage.setItem('orders', JSON.stringify([order, ...oldOrders]));
        } catch {
            localStorage.setItem('orders', JSON.stringify([order]));
        }

        setSubmitted(true);
        dispatch(clearCart()); // Xóa sạch giỏ hàng sau khi đặt thành công
        navigate('/checkout/success', { state: { orderId: order.id } });
    };

    return (
        <div className="container py-4 text-start">
            <h2 className="fw-bold mb-4">Thanh toán</h2>

            <div className="row g-4">
                {/* Form giao hàng */}
                <div className="col-lg-7">
                    <form className="card shadow-sm" onSubmit={handleSubmit} noValidate>
                        <div className="card-body">
                            <h5 className="fw-bold mb-3">Thông tin giao hàng</h5>

                            {error && <div className="alert alert-danger py-2">{error}</div>}

                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Họ và tên</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    className="form-control"
                                    value={form.fullName}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    className="form-control"
                                    value={form.phone}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Địa chỉ</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    className="form-control"
                                    rows={3}
                                    value={form.address}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="note" className="form-label">Ghi chú</label>
                                <textarea
                                    id="note"
                                    name="note"
                                    className="form-control"
                                    rows={2}
                                    value={form.note}
                                    onChange={onChange}
                                />
                            </div>

                            <p className="text-muted small">
                                Phương thức thanh toán: <strong>COD (thanh toán khi nhận hàng)</strong>
                            </p>
                            <button type="submit" className="btn btn-warning fw-bold text-dark">
                                Đặt hàng
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tóm tắt đơn */}
                <div className="col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="fw-bold">Đơn hàng</h5>
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="d-flex justify-content-between small mb-2 gap-2"
                                >
                                    <span>{item.name} × {item.quantity}</span>
                                    <span className="text-nowrap">
                                        {formatPrice(item.price * item.quantity)}
                                    </span>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Tổng cộng</span>
                                <span className="text-danger">{formatPrice(totalAmount)}</span>
                            </div>
                            <Link to="/cart" className="btn btn-link px-0">
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
