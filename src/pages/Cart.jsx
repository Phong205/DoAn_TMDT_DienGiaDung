import { useSelector } from 'react-redux';

const Cart = () => {
    // Bọc an toàn tránh crash nếu state.cart chưa khởi tạo
    const cartState = useSelector((state) => state.cart || state.cartSlice || {});
    const items = cartState.items || [];
    const totalAmount = cartState.totalAmount || 0;

    return (
        <div className="p-4 border rounded shadow-sm bg-light text-start">
            <h2 className="mb-3 text-primary">Giỏ hàng của bạn</h2>
            <div className="alert alert-info">
                <p className="mb-1">
                    Số chủng loại mặt hàng (items.length): <strong>{items.length}</strong>
                </p>
                <p className="mb-0">
                    Tổng tiền (totalAmount): <strong>{totalAmount.toLocaleString('vi-VN')} VNĐ</strong>
                </p>
            </div>
        </div>
    );
};

export default Cart;