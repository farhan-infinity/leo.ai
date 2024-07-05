import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from '../../utility/Domain'
import { toast } from 'react-hot-toast'
import CloseIcon from "../../@core/assets/svg/cancelSvg"
import DangerIcon from "../../@core/assets/svg/dangerSvg"



export const postCreationHub = createAsyncThunk('users/postCreationHub', async (arg, { rejectWithValue }) => {
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