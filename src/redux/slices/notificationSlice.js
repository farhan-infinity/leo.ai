import { createSlice } from '@reduxjs/toolkit'
import { notificationStatus } from '../actions/notificationAction'


export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notiStatus: null,
        notiStatusLoading: 'idle',
        notiStatusError: null,
    },
    // reducers: {
    // },
    extraReducers: (builder) => {
        builder.addCase(notificationStatus.pending, (state, action) => {
            if (state.notiStatusLoading === 'idle') {
                state.notiStatusLoading = 'pending'
            }
        })
        builder.addCase(notificationStatus.fulfilled, (state, action) => {
            if (state.notiStatusLoading === 'pending') {
                state.notiStatus = action.payload
                state.notiStatusLoading = 'idle'
            }
        })
        builder.addCase(notificationStatus.rejected, (state, action) => {
            if (state.notiStatusLoading === 'pending') {
                state.notiStatusLoading = 'idle'
                state.notiStatusError = action.payload
            }
        })
    },
})

// export const { } = documentSlice.actions;
export default (notificationSlice.reducer)