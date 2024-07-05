import React from 'react'
import { toast } from 'react-hot-toast';
import CloseIcon from "../../assets/svg/cancelSvg"
import DangerIcon from '../../assets/svg/dangerSvg';
import SuccessIcon from "../../assets/svg/successSvg"

export function ReactToast(props) {
    toast((t) => (
        <div className='toast-body'>
            <div>
                {props.error ? <DangerIcon /> : null}
                {props.message && !props.error ? <SuccessIcon /> : null}
            </div>
            <div className='toast-message'>
                {props.message}
            </div>
            <div className='toast-button-container'>
                <button className='toast-button' onClick={() => toast.dismiss(t.id)}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    ));
}