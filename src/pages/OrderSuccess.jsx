import { useMemo } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatPrice } from '../services/productApi';

function OrderSuccess() {
    const location = useLocation();
    const orderId = location.state?.orderId; // Mã đơn truyền từ Checkout

    // Tìm lại đơn vừa đặt trong localStorage để hiển thị chi tiết
    const order = useMemo(() => {
        if (!orderId) return null;
        try {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            return orders.find((o) => o.id === orderId) || null;
        } catch {
            return null;
        }
    }, [orderId]);

    // Vào thẳng /checkout/success mà chưa đặt hàng thì về trang chủ
    if (!orderId) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="container py-5 text-center">
            <h2 className="fw-bold text-success">Đặt hàng thành công</h2>
            <p className="text-muted">
                Mã đơn hàng: <strong>#{orderId}</strong>
            </p>
            <p>Đơn hàng của bạn sẽ được giao và thanh toán khi nhận hàng (COD).</p>

            {order && (
                <div className="card shadow-sm text-start mx-auto my-4" style={{ maxWidth: 560 }}>
                    <div className="card-body">
                        <h5 className="fw-bold">Thông tin đơn hàng</h5>
                        <p className="mb-1">
                            Người nhận: <strong>{order.customer.fullName}</strong>
                        </p>
                        <p className="mb-1">Số điện thoại: {order.customer.phone}</p>
                        <p className="mb-3">Địa chỉ: {order.customer.address}</p>

                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex justify-content-between small mb-2 gap-2"
                            >
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span className="text-nowrap">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between fw-bold">
                            <span>Tổng cộng</span>
                            <span className="text-danger">{formatPrice(order.totalAmount)}</span>
                        </div>
                    </div>
                </div>
            )}

            <Link to="/products" className="btn btn-warning fw-bold text-dark mt-3">
                Tiếp tục mua sắm
            </Link>
        </div>
    );
}

export default OrderSuccess;
