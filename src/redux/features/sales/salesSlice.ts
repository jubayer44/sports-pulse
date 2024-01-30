import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  priority: string;
};

const initialState: TInitialState = {
  priority: "",
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const { setPriority } = salesSlice.actions;

export default salesSlice.reducer;
