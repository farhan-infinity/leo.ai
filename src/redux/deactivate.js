import { createSlice } from "@reduxjs/toolkit";

export const deactivateSlice = createSlice({
  name: "deactivate",
  initialState: {
    deactivate_modal: false,
  },
  reducers: {
    deactivateStates: (state, action) => {
      state.deactivate_modal = action.payload.deactivate_modal;
    },
  },
});

export const { deactivateStates } = deactivateSlice.actions;

export default deactivateSlice.reducer;
