import { createSlice } from '@reduxjs/toolkit'
import { deleteDocument } from '../actions/documentAction'


export const documentSlice = createSlice({
    name: 'document',
    initialState: {
        delDoc: null,
        delDocLoading: 'idle',
        delDocError: null,
    },
    // reducers: {
    // },
    extraReducers: (builder) => {
        builder.addCase(deleteDocument.pending, (state, action) => {
            if (state.delDocLoading === 'idle') {
                state.delDocLoading = 'pending'
            }
        })
        builder.addCase(deleteDocument.fulfilled, (state, action) => {
            if (state.delDocLoading === 'pending') {
                state.delDoc = action.payload
                state.delDocLoading = 'idle'
            }
        })
        builder.addCase(deleteDocument.rejected, (state, action) => {
            if (state.delDocLoading === 'pending') {
                state.delDocLoading = 'idle'
                state.delDocError = action.payload
            }
        })
    },
})

// export const { } = documentSlice.actions;
export default (documentSlice.reducer)