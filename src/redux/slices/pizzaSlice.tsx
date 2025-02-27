import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

type Pizza = {
  category: number;
  id: number;
  img: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

interface PizzaState {
  status: string;
  pizzas: Pizza[];
}

export type FetchData = {
  categoryId: string;
  sortId: string;
  orderId: string;
  search: string;
  currentPage: string;
};

// export const fetchPizzas = createAsyncThunk<Pizza[] <Record<string, string>>>(
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchData) => {
    const { categoryId, sortId, orderId, search, currentPage } = params;
    const { data } = await axios.get(
      `https://67b9d43951192bd378de8d62.mockapi.io/Pizzas?page=${currentPage}&limit=4&${categoryId}&${search}&sortBy=${sortId}&order=${orderId}`
    );
    return data as Pizza[];
  }
);

const initialState: PizzaState = {
  pizzas: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizza(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<Pizza[]>) => {
          state.status = "success";
          state.pizzas = action.payload;
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.pizzas = [];
      });
  },
});

export const { setPizza } = pizzaSlice.actions;

export default pizzaSlice.reducer;
