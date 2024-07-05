import { createSlice } from '@reduxjs/toolkit'
import { addCard, defaultCard, deleteCard, getCard } from '../actions/cardAction'
import { addBilling, billingHistory, creditHistory, getBillingAddress } from '../actions/billingAction'


export const billingSlice = createSlice({
    name: 'billing',
    initialState: {
        billingData: null,
        billingDataLoading: 'idle',
        billingDataError: null,

        getBilling: null,
        getBillingLoading: 'idle',
        getBillingError: null,

        billHis: null,
        billHisLoading: 'idle',
        billHisError: null,

        creditHis: null,
        creditHisLoading: 'idle',
        creditHisError: null,

    },
    // reducers: {
    // },
    extraReducers: (builder) => {
        builder.addCase(addBilling.pending, (state, action) => {
            if (state.billingDataLoading === 'idle') {
                state.billingDataLoading = 'pending'
            }
        })
        builder.addCase(addBilling.fulfilled, (state, action) => {
            if (state.billingDataLoading === 'pending') {
                state.billingData = action.payload
                state.billingDataLoading = 'idle'
            }
        })
        builder.addCase(addBilling.rejected, (state, action) => {
            if (state.billingDataLoading === 'pending') {
                state.billingDataLoading = 'idle'
                state.billingDataError = action.payload
            }
        })
        builder.addCase(getBillingAddress.pending, (state, action) => {
            if (state.getBillingLoading === 'idle') {
                state.getBillingLoading = 'pending'
            }
        })
        builder.addCase(getBillingAddress.fulfilled, (state, action) => {
            if (state.getBillingLoading === 'pending') {
                state.getBilling = action.payload
                state.getBillingLoading = 'idle'
            }
        })
        builder.addCase(getBillingAddress.rejected, (state, action) => {
            if (state.getBillingLoading === 'pending') {
                state.getBillingLoading = 'idle'
                state.getBillingError = action.payload
            }
        })
        builder.addCase(billingHistory.pending, (state, action) => {
            if (state.billHisLoading === 'idle') {
                state.billHisLoading = 'pending'
            }
        })
        builder.addCase(billingHistory.fulfilled, (state, action) => {
            if (state.billHisLoading === 'pending') {
                state.billHis = action.payload
                state.billHisLoading = 'idle'
            }
        })
        builder.addCase(billingHistory.rejected, (state, action) => {
            if (state.billHisLoading === 'pending') {
                state.billHisLoading = 'idle'
                state.billHisError = action.payload
            }
        })
        builder.addCase(creditHistory.pending, (state, action) => {
            if (state.creditHisLoading === 'idle') {
                state.creditHisLoading = 'pending'
            }
        })
        builder.addCase(creditHistory.fulfilled, (state, action) => {
            if (state.creditHisLoading === 'pending') {
                state.creditHis = action.payload
                state.creditHisLoading = 'idle'
            }
        })
        builder.addCase(creditHistory.rejected, (state, action) => {
            if (state.creditHisLoading === 'pending') {
                state.creditHisLoading = 'idle'
                state.creditHisError = action.payload
            }
        })
    },
})

// export const { } = authSlice.actions;
export default (billingSlice.reducer)