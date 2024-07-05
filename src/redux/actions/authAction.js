import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { ReactToast } from "../../@core/components/react-toast/ReactToast"

export const resetPassword = createAsyncThunk('users/authResetPassword', async (arg, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${Domain}/reset-password`, { password: arg.password, token: arg.token })
        arg.navigate(arg.path)
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

export const deleteAccount = createAsyncThunk('users/deactivate-account', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        let response = await axios.post(`${Domain}/deactivate-account`, config)
        arg.navigate("/login")
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