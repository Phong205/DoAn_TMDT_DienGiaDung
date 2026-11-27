import { useSelector } from 'react-redux';

export function useCartPricing() {
    const items = useSelector((state) => state.cart?.items || []);
    const totalQuantity = useSelector((state) => state.cart?.totalQuantity || 0);
    const couponCode = useSelector((state) => state.cart?.coupon || '');

    const subtotal = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0,
    );

    return {
        items,
        totalQuantity,
        subtotal,
        coupons: [],
        suggestions: [],
        couponsLoaded: true,
        couponCode,
        couponResult: null,
        discountAmount: 0,
        finalAmount: subtotal,
    };
}