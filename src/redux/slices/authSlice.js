import { createSlice } from '@reduxjs/toolkit'
import { deleteAccount, resetPassword } from '../actions/authAction'


export const authSlice = createSlice({
    name: 'authUser',
    initialState: {
        resetPass: null,
        resetPassLoading: 'idle',
        resetPassError: null,

        deactivateAcc: null,
        deactivateAccLoading: 'idle',
        deactivateAccError: null,
    },
    // reducers: {
    // },
    extraReducers: (builder) => {
        builder.addCase(resetPassword.pending, (state, action) => {
            if (state.resetPassLoading === 'idle') {
                state.resetPassLoading = 'pending'
            }
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            if (state.resetPassLoading === 'pending') {
                state.resetPass = action.payload
                state.resetPassLoading = 'idle'
            }
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            if (state.resetPassLoading === 'pending') {
                state.resetPassLoading = 'idle'
                state.resetPassError = action.payload
            }
        })
        builder.addCase(deleteAccount.pending, (state, action) => {
            if (state.deactivateAccLoading === 'idle') {
                state.deactivateAccLoading = 'pending'
            }
        })
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            if (state.deactivateAccLoading === 'pending') {
                state.deactivateAcc = action.payload
                state.deactivateAccLoading = 'idle'
            }
        })
        builder.addCase(deleteAccount.rejected, (state, action) => {
            if (state.deactivateAccLoading === 'pending') {
                state.deactivateAccLoading = 'idle'
                state.deactivateAccError = action.payload
            }
        })
    },
})

// export const { } = authSlice.actions;
export default (authSlice.reducer)