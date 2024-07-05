import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { toast } from 'react-hot-toast'
import CloseIcon from "../../@core/assets/svg/cancelSvg"
import DangerIcon from "../../@core/assets/svg/dangerSvg"

export const addCard = createAsyncThunk('users/add-card', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        let response = await axios.post(`${Domain}/add-card`, arg, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            toast((t) => (
                <div className='toast-body'>
                    <div>
                        <DangerIcon />
                        {/* <SuccessIcon /> */}
                    </div>
                    <div className='toast-message'>
                        {(error.response.data.message)}
                    </div>
                    <div className='toast-button-container'>
                        <button className='toast-button' onClick={() => toast.dismiss(t.id)}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            ));
            return rejectWithValue(error.response.data.message)
        } else {
            toast((t) => (
                <div className='toast-body'>
                    <div>
                        <DangerIcon />
                        {/* <SuccessIcon /> */}
                    </div>
                    <div className='toast-message'>
                        {(error.message)}
                    </div>
                    <div className='toast-button-container'>
                        <button className='toast-button' onClick={() => toast.dismiss(t.id)}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            ));
            return rejectWithValue(error.message)
        }
    }
})

export const getCard = createAsyncThunk('users/get-card', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.get(`${Domain}/get-cards`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const deleteCard = createAsyncThunk('users/delete-card', async (paymentMethodId, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.delete(`${Domain}/delete-card/${paymentMethodId}`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

export const updateCard = createAsyncThunk('users/update-card', async (paymentMethodId, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.patch(`${Domain}/update-card/${paymentMethodId}`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})



export const defaultCard = createAsyncThunk('users/default-card', async (arg, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const response = await axios.patch(`${Domain}/make-card-default`, arg, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})