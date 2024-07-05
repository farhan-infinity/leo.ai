import { createSlice } from '@reduxjs/toolkit'
import { postCreationHub } from '../actions/CreationHubAction'


export const creationHubSlice = createSlice({
    name: 'creationHub',
    initialState: {
        postSuggestion: null,
        postSuggestionLoading: 'idle',
        postSuggestionError: null,
    },
    reducers: {
        emptyTextErrorState: (state) => {
            state.postSuggestionError = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postCreationHub.pending, (state, action) => {
            if (state.postSuggestionLoading === 'idle') {
                state.postSuggestionLoading = 'pending'
            }
        })
        builder.addCase(postCreationHub.fulfilled, (state, action) => {
            if (state.postSuggestionLoading === 'pending') {
                state.postSuggestion = action.payload
                state.postSuggestionLoading = 'idle'
            }
        })
        builder.addCase(postCreationHub.rejected, (state, action) => {
            if (state.postSuggestionLoading === 'pending') {
                state.postSuggestionLoading = 'idle'
                state.postSuggestionError = action.payload
            }
        })
    },
})

export const { emptyTextErrorState } = creationHubSlice.actions;
export default (creationHubSlice.reducer)