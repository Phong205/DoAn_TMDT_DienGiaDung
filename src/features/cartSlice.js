import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalQuantity: JSON.parse(localStorage.getItem('totalQuantity')) || 0,
    totalAmount: JSON.parse(localStorage.getItem('totalAmount')) || 0,
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
            const existingItem = state.items.find((item) => item.id === newItem.id);

            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    image: newItem.image,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.items = state.items.filter((item) => item.id !== id);
            }
            state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalQuantity');
            localStorage.removeItem('totalAmount');
        }
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;