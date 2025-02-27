import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCart } from "../../utils/getCarLocal";

export type CartItem = {
  id: number;
  img: string;
  title: string;
  price: number;
  diametr: number;
  type: string;
  count: number;
};

interface CartSliceState {
  cart: CartItem[];
}

const initialState: CartSliceState = {
  cart: getCart(),
};

const cartSlise = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<CartItem>) {
      const findItem = state.cart.find((obj) => obj.id === action.payload.id);
      console.log(findItem)

      if (findItem) {
        findItem.count++
      } else {
        state.cart.push({ ...action.payload, count: 1 });
        console.log(state.cart)
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },

    plusItem(state, action: PayloadAction<number>) {
      const findItem = state.cart.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
      }
    },

    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.cart.find((obj) => obj.id === action.payload);

      if (findItem) {
        if (findItem.count <= 1) {
          state.cart = state.cart.filter((obj) => obj.id !== action.payload);
        }
        findItem.count--;
      }
    },
  },
});

export const { addCart, removeItem, clearCart, plusItem, minusItem } =
  cartSlise.actions;

export default cartSlise.reducer;
