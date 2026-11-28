import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCoupons, validateCoupon } from '../services/couponService';


export function useCartPricing() {
    const { items, totalQuantity, totalAmount, couponCode } = useSelector((state) => state.cart);

    const [coupons, setCoupons] = useState([]);
    const [suggestions, setSuggestions] = useState([]); // mã còn dùng được, để gợi ý
    const [couponsLoaded, setCouponsLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        getCoupons().then((list) => {
            if (cancelled) return;
            const now = Date.now();
            setCoupons(list);
            setSuggestions(
                list.filter(
                    (c) =>
                        c.active !== false &&
                        (!c.expiresAt || new Date(c.expiresAt).getTime() > now),
                ),
            );
            setCouponsLoaded(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    // Kiểm tra lại mã mỗi khi giỏ đổi (ví dụ xóa bớt hàng làm đơn không đủ tối thiểu)
    const couponResult = useMemo(() => {
        if (!couponCode || !couponsLoaded) return null;
        return validateCoupon(couponCode, { coupons, items, subtotal: totalAmount });
    }, [couponCode, couponsLoaded, coupons, items, totalAmount]);

    const couponValid = Boolean(couponResult?.valid);
    const discountAmount = couponValid ? couponResult.discountAmount : 0;

    return {
        items,
        totalQuantity,
        subtotal: totalAmount,
        coupons,
        suggestions,
        couponsLoaded,
        couponCode,
        couponResult,
        couponValid,
        discountAmount,
        finalAmount: Math.max(0, totalAmount - discountAmount),
    };
}