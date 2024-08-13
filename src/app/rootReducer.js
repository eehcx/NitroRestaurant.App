import { combineReducers } from 'redux';
// Slices
import userReducer, { userInitialState } from "./user/userSlice";
import businessReducer, { businessInitialState } from './business/BusinessSlice';
import productReducer, { productsInitialState } from './business/ProductSlice';
import ordersReducer, { ordersInitialState } from './business/OrderSlice';

const appReducer = combineReducers({
    user: userReducer,
    business: businessReducer,
    products: productReducer,
    orders: ordersReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = {
            user: userInitialState,
            business: businessInitialState,
            products: productsInitialState,
            orders: ordersInitialState
        };
    }
    return appReducer(state, action);
};

export default rootReducer;