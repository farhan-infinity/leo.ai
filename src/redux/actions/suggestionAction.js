import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { toast } from 'react-hot-toast'
import CloseIcon from "../../@core/assets/svg/cancelSvg"
import DangerIcon from "../../@core/assets/svg/dangerSvg"
import { ReactToast } from '../../@core/components/react-toast/ReactToast'


export const postSuggestions = createAsyncThunk('users/suggestions', async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(`${Domain}/get-suggestion`, arg, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            ReactToast({ message: error.response.data.message, error: true })
            localStorage.setItem("upgradeModal", JSON.stringify(true))
            return rejectWithValue(error.response.data.message)
        } else {
            ReactToast({ message: error.message, error: true })
            localStorage.setItem("upgradeModal", JSON.stringify(true))
            return rejectWithValue(error.message)
        }
    }
})