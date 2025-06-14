import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productslice';
import productdetailsReducer from './products/pdtlsslice';
import LoginReducer from "./users/userslice";
import userReducer from "./users/userdetailsslice";
import cartReducer from "./cart/cartslice";
export const store = configureStore({
  reducer: {
    products: productsReducer, 
    product:productdetailsReducer,
    auth:LoginReducer,
    userdetail:userReducer,
    cart:cartReducer
  },

});
