import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  searchValues: Record<string, unknown>[];
  checkedValues: string[];
};

const initialState: TInitialState = {
  searchValues: [],
  checkedValues: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchValues: (state, action) => {
      state.searchValues = action.payload;
    },
    resetSearchValues: (state) => {
      state.searchValues = [];
    },

    setCheckedValue: (state, action) => {
      state.checkedValues.push(action.payload);
    },
    removeCheckedValue: (state, action) => {
      state.checkedValues = state.checkedValues.filter(
        (value) => value !== action.payload
      );
    },
    resetCheckedValues: (state) => {
      state.checkedValues = [];
    },
  },
});

export const {
  setCheckedValue,
  removeCheckedValue,
  resetCheckedValues,
  setSearchValues,
  resetSearchValues,
} = productSlice.actions;

export default productSlice.reducer;
