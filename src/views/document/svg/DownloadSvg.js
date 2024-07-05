import React from 'react'
import { useSkin } from "@hooks/useSkin";

const DownloadSvg = () => {
    const { skin, setSkin } = useSkin();
    return (
        <svg width="220" height="100" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1725_112955)">
                <rect x="20" y="16" width="180" height="60" rx="20" fill="url(#paint0_linear_1725_112955)" />
            </g>
            <text x="50" y="52" fill="white">Copy Text</text>
            <path d="M150.375 54C149.722 54 149.163 53.7672 148.697 53.3017C148.232 52.8362 147.999 52.2773 148 51.625V48.0625H150.375V51.625H164.625V48.0625H167V51.625C167 52.2781 166.767 52.8374 166.302 53.3029C165.836 53.7684 165.277 54.0008 164.625 54H150.375ZM157.5 49.25L151.563 43.3125L153.225 41.5906L156.313 44.6781V35H158.688V44.6781L161.775 41.5906L163.438 43.3125L157.5 49.25Z" fill="white" />
            <defs>
                <filter id="filter0_d_1725_112955" x="0" y="0" width="220" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.498039 0 0 0 0 0.980392 0 0 0 0.47 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1725_112955" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1725_112955" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_1725_112955" x1="-52.9231" y1="46" x2="200" y2="46" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1970D7" />
                    <stop offset="1" stopColor="#177FFA" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default DownloadSvg