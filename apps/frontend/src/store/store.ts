import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import supplierReducer from './slices/supplierSlice';
import productReducer from './slices/productSlice';
import invoiceReducer from './slices/invoiceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    suppliers: supplierReducer,
    products: productReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
