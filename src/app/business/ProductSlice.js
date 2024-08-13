import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    currentCategory: '',
    categories: [],
    products: []
};

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, action) => { state.currentCategory = action.payload; },
        updateCategories(state, action) { state.categories = action.payload; },
        updateProducts(state, action) { state.products = action.payload; },
    },
});

export const {
    setCategory,
    updateCategories,
    updateProducts
} = ProductSlice.actions;

export default ProductSlice.reducer;
export { initialState as productsInitialState };

const selectProducts = (state) => state.products.products;
const selectCurrentCategory = (state) => state.products.currentCategory;

export const selectFilteredProducts = createSelector(
    [selectProducts, selectCurrentCategory],
    (products, currentCategory) => {
        if (currentCategory === '' || currentCategory === 'Todos') {
            return products;
        }
        return products.filter(product => product.categoria === currentCategory);
    }
);