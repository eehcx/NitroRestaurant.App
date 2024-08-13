// store.js
import { configureStore, serialize  } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../app/rootReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    serialize: serialize,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }).concat(thunk),
})

//devTools: process.env.NODE_ENV !== 'production',
export const persistor = persistStore(store)