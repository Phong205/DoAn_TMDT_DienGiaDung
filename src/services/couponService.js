const API_URL = 'http://localhost:3000/coupons';
const STATIC_URL = '/data/db.json';

/**
 * Lấy danh sách coupon từ json-server; nếu server chưa chạy thì dùng db.json tĩnh.
 * db.json cần có thuộc tính `coupons` là một mảng.
 */
export async function getCoupons() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Không thể tải coupon từ json-server');
        const coupons = await response.json();
        return Array.isArray(coupons) ? coupons : [];
    } catch {
        try {
            const response = await fetch(STATIC_URL);
            if (!response.ok) return [];
            const data = await response.json();
            return Array.isArray(data.coupons) ? data.coupons : [];
        } catch {
            return [];
        }
    }
}

/**
 * Kiểm tra coupon và tính số tiền được giảm.
 *
 * Coupon hỗ trợ:
 * - discountType: 'percentage' (phần trăm) hoặc 'fixed' (số tiền cố định)
 * - discountValue: giá trị giảm
 * - minOrder: giá trị đơn hàng tối thiểu (tùy chọn)
 * - maxDiscount: mức giảm tối đa cho coupon phần trăm (tùy chọn)
 * - startsAt / expiresAt: thời điểm bắt đầu / hết hạn (ISO 8601, tùy chọn)
 * - active: false để tắt coupon
 * - categories / productIds: giới hạn danh mục hoặc sản phẩm (tùy chọn)
 *
 * @param {string} code Mã khách nhập
 * @param {{ coupons: Array, items?: Array, subtotal?: number, now?: Date }} options
 */
export function validateCoupon(code, { coupons = [], items = [], subtotal, now = new Date() } = {}) {
    const normalizedCode = String(code ?? '').trim().toUpperCase();
    const safeItems = Array.isArray(items) ? items : [];
    const orderSubtotal = Number.isFinite(Number(subtotal))
        ? Math.max(0, Number(subtotal))
        : safeItems.reduce(
            (sum, item) => sum + Math.max(0, Number(item.price) || 0) * Math.max(0, Number(item.quantity) || 0),
            0,
        );
    const currentTime = now instanceof Date ? now.getTime() : new Date(now).getTime();

    const invalid = (message) => ({
        valid: false,
        coupon: null,
        discountAmount: 0,
        finalAmount: orderSubtotal,
        message,
    });

    if (!normalizedCode) return invalid('Vui lòng nhập mã giảm giá.');
    if (!Number.isFinite(currentTime)) return invalid('Thời điểm kiểm tra không hợp lệ.');

    const coupon = (Array.isArray(coupons) ? coupons : []).find(
        (item) => String(item?.code ?? '').trim().toUpperCase() === normalizedCode,
    );
    if (!coupon) return invalid('Mã giảm giá không tồn tại.');
    if (coupon.active === false) return invalid('Mã giảm giá hiện không được áp dụng.');

    const startsAt = coupon.startsAt ? new Date(coupon.startsAt).getTime() : null;
    const expiresAt = coupon.expiresAt ? new Date(coupon.expiresAt).getTime() : null;
    if (startsAt !== null && (!Number.isFinite(startsAt) || currentTime < startsAt)) {
        return invalid('Mã giảm giá chưa đến thời gian áp dụng.');
    }
    if (expiresAt !== null && (!Number.isFinite(expiresAt) || currentTime > expiresAt)) {
        return invalid('Mã giảm giá đã hết hạn.');
    }

    const minOrder = Math.max(0, Number(coupon.minOrder) || 0);
    if (orderSubtotal < minOrder) {
        return invalid(`Đơn hàng cần đạt tối thiểu ${minOrder.toLocaleString('vi-VN')} ₫ để dùng mã này.`);
    }

    const eligibleItems = safeItems.filter((item) => {
        const matchesCategory = !Array.isArray(coupon.categories)
            || coupon.categories.length === 0
            || coupon.categories.includes(item.category);
        const matchesProduct = !Array.isArray(coupon.productIds)
            || coupon.productIds.length === 0
            || coupon.productIds.some((id) => String(id) === String(item.id));
        return matchesCategory && matchesProduct;
    });
    const eligibleSubtotal = safeItems.length > 0
        ? eligibleItems.reduce(
            (sum, item) => sum + Math.max(0, Number(item.price) || 0) * Math.max(0, Number(item.quantity) || 0),
            0,
        )
        : orderSubtotal;

    if (safeItems.length > 0 && eligibleSubtotal <= 0) {
        return invalid('Không có sản phẩm phù hợp với điều kiện của mã giảm giá.');
    }

    const value = Number(coupon.discountValue);
    if (!Number.isFinite(value) || value <= 0) {
        return invalid('Mã giảm giá có cấu hình không hợp lệ.');
    }

    let discountAmount;
    if (coupon.discountType === 'percentage') {
        if (value > 100) return invalid('Phần trăm giảm giá không hợp lệ.');
        discountAmount = eligibleSubtotal * value / 100;
        if (Number.isFinite(Number(coupon.maxDiscount)) && Number(coupon.maxDiscount) >= 0) {
            discountAmount = Math.min(discountAmount, Number(coupon.maxDiscount));
        }
    } else if (coupon.discountType === 'fixed') {
        discountAmount = value;
    } else {
        return invalid('Loại giảm giá không được hỗ trợ.');
    }

    // Không để giá trị giảm vượt quá giá trị đơn hàng.
    discountAmount = Math.min(Math.round(discountAmount), orderSubtotal);

    return {
        valid: true,
        coupon,
        discountAmount,
        finalAmount: Math.max(0, orderSubtotal - discountAmount),
        message: 'Áp dụng mã giảm giá thành công.',
    };
}
