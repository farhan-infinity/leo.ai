import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { ReactToast } from "../../@core/components/react-toast/ReactToast"

export const firstPromoter = createAsyncThunk('users/firstPromoter', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.get(`${Domain}/promo-link`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            // ReactToast({ message: error.response.data.message, error: true })
            return rejectWithValue(error.response.data.message)
        } else {
            // ReactToast({ message: error.message, error: true })
            return rejectWithValue(error.message)
        }
    }
})

export const firstPromoterStats = createAsyncThunk('users/firstPromoterStats', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.get(`${Domain}/promo-link-stats/${arg}`, {}, config)
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

export const promoterDetails = createAsyncThunk('users/promoterDetails', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.get(`${Domain}/promoter-details`, config)
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



