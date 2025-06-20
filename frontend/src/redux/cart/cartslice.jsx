import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//save shipping info

const loadshippinginfo=()=>{
  const data=localStorage.getItem("shippinginfo");
  return data? JSON.parse(data):{};
}


// Load cart items from localStorage
const loadLocalStorage = () => {
  const data = localStorage.getItem("cartitem");
  return data ? JSON.parse(data) : [];
};


// Calculate total count from cart items
const getCartCount = (items) => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

// Async thunk to add product to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ id, quantity = 1 }, thunkAPI) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.get(`${backendurl}productdetails/${id}`);
      const product = response.data.product;

      const itemData = {
        product: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        quantity,
      };

      const existingCart = loadLocalStorage();
      const index = existingCart.findIndex(i => i.product === product._id);

      if (index !== -1) {
        existingCart[index].quantity += quantity;
      } else {
        existingCart.push(itemData);
      }

      localStorage.setItem("cartitem", JSON.stringify(existingCart));
      localStorage.setItem("cartcount", JSON.stringify(getCartCount(existingCart)));

      return existingCart;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add to cart");
    }
  }
);

// 🔥 Additional reducers for local cart manipulation
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartitems: loadLocalStorage(),
    cartCount: getCartCount(loadLocalStorage()),
    shippinginfo:loadshippinginfo(),
    error: null,
  },
  reducers: {
    // ✅ Remove item from cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartitems = state.cartitems.filter(item => item.product !== productId);
      state.cartCount = getCartCount(state.cartitems);
      localStorage.setItem("cartitem", JSON.stringify(state.cartitems));
      localStorage.setItem("cartcount", JSON.stringify(state.cartCount));
    },

    // ✅ Update item quantity
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const index = state.cartitems.findIndex(item => item.product === id);
      if (index !== -1) {
        state.cartitems[index].quantity = quantity;
      }
      state.cartCount = getCartCount(state.cartitems);
      localStorage.setItem("cartitem", JSON.stringify(state.cartitems));
      localStorage.setItem("cartcount", JSON.stringify(state.cartCount));
    },
     //setshippinginfo
  setShippingInfo: (state, action) => {
    state.shippinginfo = action.payload;
    localStorage.setItem("shippinginfo", JSON.stringify(action.payload));
  },
  },
 

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartitems = action.payload;
        state.cartCount = getCartCount(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { removeFromCart, updateCartItemQuantity ,setShippingInfo} = cartSlice.actions;
export default cartSlice.reducer;
