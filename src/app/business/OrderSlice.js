import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = { 
    OrderId: '',
    order_detail:[],
    selectedProducts: {},
    PaymentMethod: '',
    receipt: [],
    PaymentMethods: [],
};

export const OrdersSlice = createSlice({
    name: 'orders',
    initialState, 
    reducers: {
        SelectedOrderId: (state, action) =>{
            const { OrderId } = action.payload;
            state.OrderId = OrderId;
        },
        setPaymentMethod: (state, action) =>{ state.PaymentMethod = action.payload; },
        toggleOrder: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.order_detail.findIndex(item => item.id === id);

            if (existingProduct !== -1) {
                state.order_detail.splice(existingProduct, 1);
            } else {
                state.order_detail.push(action.payload);
            }
        },
        removeFromOrders: (state, action) => {
            const index = state.order_detail.findIndex((item) => item.id === action.payload);
            if (index >= 0) {
                state.order_detail.splice(index, 1);
            } else {
                console.warn(`Cant remove product (id: ${action.payload}) as its not in product!`);
            }
        },
        toggleSelectedProduct: (state, action) => {
            const { id } = action.payload;
            if (!state.selectedProducts[id]) {
                state.selectedProducts[id] = true;
            }
        },        
        removeSelectedProduct: (state, action) => {
            const { id } = action.payload;
            if (state.selectedProducts[id]) {
                delete state.selectedProducts[id];
            }
        },
        increment: (state, action) => {
            const item = state.order_detail.find(item => item.id === action.payload);
            if (item) {
                item.cantidad++;
                item.precio_total = item.cantidad * item.precio;
            }
        },
        decrement: (state, action) => {
            const item = state.order_detail.find(item => item.id === action.payload);
            if (item && item.cantidad > 1) {
                item.cantidad--;
                item.precio_total = item.cantidad * item.precio;
            }
        },
        setReceipt: (state, action) =>{ state.receipt = action.payload; },
        setPaymentMethods: (state, action) =>{ state.PaymentMethods = action.payload; },
        clear: state => {
            state.OrderId = initialState.OrderId;
            state.order_detail = initialState.order_detail;
            state.selectedProducts = initialState.selectedProducts;
        }
    },
});

export const {
    SelectedOrderId, 
    setPaymentMethod,
    toggleOrder, 
    removeFromOrders, 
    toggleSelectedProduct,
    removeSelectedProduct,
    increment, 
    decrement,
    setReceipt,
    setPaymentMethods,
    clear
} = OrdersSlice.actions;

export default OrdersSlice.reducer;
export { initialState as ordersInitialState };

export const selectAllOrders = (state) => state.orders.order_detail;

export const selectOrderWithId = (id) => (state) =>
    state.orders.order_detail.filter((item) => item.id === id);

export const selectOrderTotal = createSelector(selectAllOrders, (items) =>
    items.reduce((total, item) => (total += item.precio_total), 0)
);