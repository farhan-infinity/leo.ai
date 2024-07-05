

import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { ReactToast } from "../../@core/components/react-toast/ReactToast.js"

export const addBilling = createAsyncThunk('users/add-billing', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        let response = await axios.post(`${Domain}/create-billing-address`, arg, config)
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

export const getBillingAddress = createAsyncThunk('users/get-billing', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        let response = await axios.get(`${Domain}/get-billing-address`, config)
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

export const billingHistory = createAsyncThunk('users/billingHistory', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        let response = await axios.get(`${Domain}/billing-history?page=${arg.page}&limit=${arg.perPageItem}`, config)
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

export const creditHistory = createAsyncThunk('users/creditHistory', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        let response = await axios.get(`${Domain}/credit-history?page=${arg.page}&limit=${arg.perPageItem}`, config)
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