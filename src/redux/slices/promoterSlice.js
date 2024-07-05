import { createSlice } from '@reduxjs/toolkit'
import { firstPromoter, firstPromoterStats, promoterDetails } from '../actions/promoterAction'


const promoterSlice = createSlice({
    name: 'promoter',
    initialState: {
        promo: null,
        promoLoading: 'idle',
        promoError: null,

        promoStats: null,
        promoStatsLoading: 'idle',
        promoStatsError: null,

        promoDetails: null,
        promoDetailsLoading: 'idle',
        promoDetailsError: null,
    },
    // reducers: {
    // },
    extraReducers: (builder) => {
        builder.addCase(firstPromoter.pending, (state, action) => {
            if (state.promoLoading === 'idle') {
                state.promoLoading = 'pending'
            }
        })
        builder.addCase(firstPromoter.fulfilled, (state, action) => {
            if (state.promoLoading === 'pending') {
                state.promo = action.payload
                state.promoLoading = 'idle'
            }
        })
        builder.addCase(firstPromoter.rejected, (state, action) => {
            if (state.promoLoading === 'pending') {
                state.promoLoading = 'idle'
                state.promoError = action.payload
            }
        })
        builder.addCase(firstPromoterStats.pending, (state, action) => {
            if (state.promoStatsLoading === 'idle') {
                state.promoStatsLoading = 'pending'
            }
        })
        builder.addCase(firstPromoterStats.fulfilled, (state, action) => {
            if (state.promoStatsLoading === 'pending') {
                state.promoStats = action.payload
                state.promoStatsLoading = 'idle'
            }
        })
        builder.addCase(firstPromoterStats.rejected, (state, action) => {
            if (state.promoStatsLoading === 'pending') {
                state.promoStatsLoading = 'idle'
                state.promoStatsError = action.payload
            }
        })
        builder.addCase(promoterDetails.pending, (state, action) => {
            if (state.promoDetailsLoading === 'idle') {
                state.promoDetailsLoading = 'pending'
            }
        })
        builder.addCase(promoterDetails.fulfilled, (state, action) => {
            if (state.promoDetailsLoading === 'pending') {
                state.promoDetails = action.payload
                state.promoDetailsLoading = 'idle'
            }
        })
        builder.addCase(promoterDetails.rejected, (state, action) => {
            if (state.promoDetailsLoading === 'pending') {
                state.promoDetailsLoading = 'idle'
                state.promoDetailsError = action.payload
            }
        })
    },
})

// export const { } = promoterSlice.actions;
export default (promoterSlice.reducer)