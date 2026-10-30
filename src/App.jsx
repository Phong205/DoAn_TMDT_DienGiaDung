import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

    //  nút "Thêm vào giỏ" tạm thời
    const handleAddTest = () => {
        dispatch(addToCart({
            id: 1,
            name: 'Tủ lạnh thử',
            price: 12500000,
            image: '',
        }));
    };

    return (
        <div>
            <h2>Giỏ hàng</h2>
            <p>Số loại sản phẩm: {items.length}</p>
            <p>Tổng số lượng: {totalQuantity}</p>
            <p>Tổng tiền: {totalAmount}</p>

            <button className="btn btn-warning" onClick={handleAddTest}>
                + Thêm thử
            </button>
        </div>
    );
}

export default Cart;