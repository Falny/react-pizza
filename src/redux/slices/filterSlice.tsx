import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortStatus {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type FilterSort = {
  name: string;
  sortProperty: SortStatus;
};

export interface FilterState {
  categoryId: number;
  search: string;
  currentPage: number;
  sort: FilterSort;
}

export const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: SortStatus.RATING_DESC,
  },
  search: "",
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSort(state, action: PayloadAction<FilterSort>) {
      state.sort = action.payload;
    },

    setValueInput(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action: PayloadAction<FilterState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.currentPage = action.payload.currentPage;
      state.search = action.payload.search;
    },
  },
});

export const {
  setCategory,
  setSort,
  setValueInput,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
