import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalQuantity: JSON.parse(localStorage.getItem('totalQuantity')) || 0,
    totalAmount: JSON.parse(localStorage.getItem('totalAmount')) || 0,
};

const recalc = (state) => {
    state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    state.totalAmount = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const saveCartToLocalStorage = (state) => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
    localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
    localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const qty = Math.max(1, Number(newItem.quantity) || 1);
            const existingItem = state.items.find(
                (item) => String(item.id) === String(newItem.id),
            );

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    image: newItem.image,
                    quantity: qty,
                    totalPrice: newItem.price * qty,
                });
            } else {
                existingItem.quantity += qty;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            }
            recalc(state);
            saveCartToLocalStorage(state);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => String(i.id) === String(id));
            if (!item) return;
            item.quantity = Math.max(1, Number(quantity) || 1);
            item.totalPrice = item.price * item.quantity;
            recalc(state);
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => String(item.id) !== String(id));
            recalc(state);
            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalQuantity');
            localStorage.removeItem('totalAmount');
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
