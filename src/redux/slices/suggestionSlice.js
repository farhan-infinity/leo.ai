import { createSlice } from '@reduxjs/toolkit'
import { postSuggestions } from '../actions/suggestionAction'

export const suggestionSlice = createSlice({
    name: 'suggestion',
    initialState: {
        postSuggestion: null,
        postSuggestionLoading: 'idle',
        postSuggestionError: null,

    },
    reducers: {
        emptyPostSuggestion: (state) => {
            state.postSuggestion = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postSuggestions.pending, (state, action) => {
            if (state.postSuggestionLoading === 'idle') {
                state.postSuggestionLoading = 'pending'
            }
        })
        builder.addCase(postSuggestions.fulfilled, (state, action) => {
            if (state.postSuggestionLoading === 'pending') {
                state.postSuggestion = action.payload
                state.postSuggestionLoading = 'idle'
            }
        })
        builder.addCase(postSuggestions.rejected, (state, action) => {
            if (state.postSuggestionLoading === 'pending') {
                state.postSuggestionLoading = 'idle'
                state.postSuggestionError = action.payload
            }
        })
    },
})

export const { emptyPostSuggestion } = suggestionSlice.actions;
export default (suggestionSlice.reducer)