import { createSlice } from '@reduxjs/toolkit'
import { dashboard } from '../actions/dashboardAction'


export const dashboardSlice = createSlice({
    name: 'stats',
    initialState: {
        stats: null,
        statsLoading: 'idle',
        statsError: null,
    },
    // reducers: {
    // },
    extraReducers: (builder) => {
        builder.addCase(dashboard.pending, (state, action) => {
            if (state.statsLoading === 'idle') {
                state.statsLoading = 'pending'
            }
        })
        builder.addCase(dashboard.fulfilled, (state, action) => {
            if (state.statsLoading === 'pending') {
                state.stats = action.payload
                state.statsLoading = 'idle'
            }
        })
        builder.addCase(dashboard.rejected, (state, action) => {
            if (state.statsLoading === 'pending') {
                state.statsLoading = 'idle'
                state.statsError = action.payload
            }
        })
    },
})

// export const { } = authSlice.actions;
export default (dashboardSlice.reducer)