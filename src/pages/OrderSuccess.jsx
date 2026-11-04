import { Link, useLocation } from 'react-router-dom';

function OrderSuccess() {
    const location = useLocation();
    const orderId = location.state?.orderId;

    return (
        <div className="container py-5 text-center">
            <h2 className="fw-bold text-success">Đặt hàng thành công</h2>
            {orderId && (
                <p className="text-muted">
                    Mã đơn hàng: <strong>#{orderId}</strong>
                </p>
            )}
            <p>Đơn hàng của bạn sẽ được giao và thanh toán khi nhận hàng (COD).</p>
            <Link to="/products" className="btn btn-warning fw-bold text-dark mt-3">
                Tiếp tục mua sắm
            </Link>
        </div>
    );
}

export default OrderSuccess;
