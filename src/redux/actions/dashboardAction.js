import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { ReactToast } from "../../@core/components/react-toast/ReactToast"

export const dashboard = createAsyncThunk('users/dashboard', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.get(`${Domain}/stats`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            ReactToast({ message: error.response.data.message, error: true })
            return rejectWithValue(error.response.data.message)
        } else {
            ReactToast({ message: error.message, error: true })
            return rejectWithValue(error.message)
        }
    }
})