import { createSlice } from '@reduxjs/toolkit'
import { addCard, defaultCard, deleteCard, getCard } from '../actions/cardAction'


export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        addCardData: null,
        addCardLoading: 'idle',
        addCardError: null,

        cardData: null,
        cardDataLoading: 'idle',
        cardDataError: null,

        delCard: null,
        delCardLoading: 'idle',
        delCardError: null,

        defCard: null,
        defCardLoading: 'idle',
        defCardError: null,
    },
    // reducers: {
    // },
    extraReducers: (builder) => {
        builder.addCase(addCard.pending, (state, action) => {
            if (state.addCardLoading === 'idle') {
                state.addCardLoading = 'pending'
            }
        })
        builder.addCase(addCard.fulfilled, (state, action) => {
            if (state.addCardLoading === 'pending') {
                state.addCardData = action.payload
                state.addCardLoading = 'idle'
            }
        })
        builder.addCase(addCard.rejected, (state, action) => {
            if (state.addCardLoading === 'pending') {
                state.addCardLoading = 'idle'
                state.addCardError = action.payload
            }
        })
        builder.addCase(getCard.pending, (state, action) => {
            if (state.cardDataLoading === 'idle') {
                state.cardDataLoading = 'pending'
            }
        })
        builder.addCase(getCard.fulfilled, (state, action) => {
            if (state.cardDataLoading === 'pending') {
                state.cardData = action.payload
                state.cardDataLoading = 'idle'
            }
        })
        builder.addCase(getCard.rejected, (state, action) => {
            if (state.cardDataLoading === 'pending') {
                state.cardDataLoading = 'idle'
                state.cardDataError = action.payload
            }
        })
        builder.addCase(deleteCard.pending, (state, action) => {
            if (state.delCardLoading === 'idle') {
                state.delCardLoading = 'pending'
            }
        })
        builder.addCase(deleteCard.fulfilled, (state, action) => {
            if (state.delCardLoading === 'pending') {
                state.delCard = action.payload
                state.delCardLoading = 'idle'
            }
        })
        builder.addCase(deleteCard.rejected, (state, action) => {
            if (state.delCardLoading === 'pending') {
                state.delCardLoading = 'idle'
                state.delCardError = action.payload
            }
        })
        builder.addCase(defaultCard.pending, (state, action) => {
            if (state.defCardLoading === 'idle') {
                state.defCardLoading = 'pending'
            }
        })
        builder.addCase(defaultCard.fulfilled, (state, action) => {
            if (state.defCardLoading === 'pending') {
                state.defCard = action.payload
                state.defCardLoading = 'idle'
            }
        })
        builder.addCase(defaultCard.rejected, (state, action) => {
            if (state.defCardLoading === 'pending') {
                state.defCardLoading = 'idle'
                state.defCardError = action.payload
            }
        })
    },
})

// export const { } = authSlice.actions;
export default (cardSlice.reducer)