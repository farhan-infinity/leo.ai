import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscription_plans_modal: false,
  },
  reducers: {
    updateModalState: (state, action) => {
      state.subscription_plans_modal = action.payload.subscription;
    },
  },
});

export const subscriptionActions = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
