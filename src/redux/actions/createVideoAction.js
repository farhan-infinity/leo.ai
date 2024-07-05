
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { toast } from 'react-hot-toast'
import CloseIcon from "../../@core/assets/svg/cancelSvg"
import DangerIcon from "../../@core/assets/svg/dangerSvg"
import { ReactToast } from '../../@core/components/react-toast/ReactToast'



export const postCreateVideo = createAsyncThunk('users/postCreateVideo', async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(`${Domain}/create-video`, arg, config)
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

export const getCreateVideo = createAsyncThunk("users/getCreateVideo", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`${Domain}/get-video?id=${arg}`, config)
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

export const postCreateAvatar = createAsyncThunk("users/postCreateAvatar", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(`${Domain}/create-avatar`, arg, config)
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

export const getCreateAvatar = createAsyncThunk("users/getCreateAvatar", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`${Domain}/get-avatar?id=${arg}`, config)
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

export const createAvatarLanguage = createAsyncThunk("users/createAvatarLanguage", async (arg, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${Domain}/get-language`)
        // toast.success(response.data.message)
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

export const postTextToVideo = createAsyncThunk("users/createReplicateVideo", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    // arg.token = token;
    try {
        const response = await axios.post(`${Domain}/create-replicate-video`, arg, config)
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

export const getTextToVideo = createAsyncThunk("users/getReplicateVideo", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`${Domain}/get-replicate-video/${arg}`, config)

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

export const postShortClips = createAsyncThunk("users/postShortClips", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(`${Domain}/create-clips`, arg, config)

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

export const getAvailableSubtitle = createAsyncThunk("users/getSubtitle", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(`${Domain}/get-available-languages`, arg, config)
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

export const getShortClips = createAsyncThunk("users/getShortClips", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`${Domain}/get-clips?id=${arg}`, config)
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

export const getGalleryClips = createAsyncThunk("users/getGalleryClips", async (arg, { rejectWithValue }) => {
    let token = localStorage.getItem('token')
    let config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`${Domain}/user-clips`, config)
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


