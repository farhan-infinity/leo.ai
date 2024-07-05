import React from 'react'
import { useSkin } from "@hooks/useSkin";

const PictureToVideoArrowSvg = () => {
    const { skin, setSkin } = useSkin();
    return (
        <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="21.2353" height="20" rx="10" fill="white" fillOpacity="0.74" stroke="white" />
            <path d="M9.88396 6.17645L13.5898 10.5L9.88396 14.8235" stroke="#177FFA" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export default PictureToVideoArrowSvg