import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'

export const notificationStatus = createAsyncThunk('users/notification-status', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.patch(`${Domain}/user-notification/${arg}`, {}, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})