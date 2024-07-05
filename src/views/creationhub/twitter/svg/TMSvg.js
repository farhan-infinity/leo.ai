import React from 'react'
import { useSkin } from "@hooks/useSkin";

const TMSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1803_112917)" />
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <path d="M33 44C37.9706 44 42 39.9706 42 35C42 30.0294 37.9706 26 33 26C28.0294 26 24 30.0294 24 35C24 39.9706 28.0294 44 33 44Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.0007 41.9077C36.8153 41.9077 39.9077 38.8153 39.9077 35.0007C39.9077 31.1861 36.8153 28.0938 33.0007 28.0938C29.1861 28.0938 26.0938 31.1861 26.0938 35.0007C26.0938 38.8153 29.1861 41.9077 33.0007 41.9077Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M32.9995 39.8135C35.6582 39.8135 37.8135 37.6582 37.8135 34.9995C37.8135 32.3408 35.6582 30.1855 32.9995 30.1855C30.3408 30.1855 28.1855 32.3408 28.1855 34.9995C28.1855 37.6582 30.3408 39.8135 32.9995 39.8135Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.0002 37.7212C34.503 37.7212 35.7212 36.503 35.7212 35.0002C35.7212 33.4975 34.503 32.2793 33.0002 32.2793C31.4975 32.2793 30.2793 33.4975 30.2793 35.0002C30.2793 36.503 31.4975 37.7212 33.0002 37.7212Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1803_112917" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1571_112970)" />
                    <path d="M33 44C37.9706 44 42 39.9706 42 35C42 30.0294 37.9706 26 33 26C28.0294 26 24 30.0294 24 35C24 39.9706 28.0294 44 33 44Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.0007 41.9067C36.8153 41.9067 39.9077 38.8144 39.9077 34.9998C39.9077 31.1851 36.8153 28.0928 33.0007 28.0928C29.1861 28.0928 26.0938 31.1851 26.0938 34.9998C26.0938 38.8144 29.1861 41.9067 33.0007 41.9067Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M32.9995 39.8139C35.6582 39.8139 37.8135 37.6587 37.8135 35C37.8135 32.3413 35.6582 30.186 32.9995 30.186C30.3408 30.186 28.1855 32.3413 28.1855 35C28.1855 37.6587 30.3408 39.8139 32.9995 39.8139Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.0002 37.7212C34.503 37.7212 35.7212 36.503 35.7212 35.0002C35.7212 33.4975 34.503 32.2793 33.0002 32.2793C31.4975 32.2793 30.2793 33.4975 30.2793 35.0002C30.2793 36.503 31.4975 37.7212 33.0002 37.7212Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1571_112970" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>


    )
}

export default TMSvg