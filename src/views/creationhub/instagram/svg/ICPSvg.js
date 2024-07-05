import React from 'react'
import { useSkin } from "@hooks/useSkin";

const ICPSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1801_112899)" />
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <path d="M39.5182 36.625L41.2425 34.875V39.25C41.2425 39.7141 41.0608 40.1592 40.7374 40.4874C40.4141 40.8156 39.9755 41 39.5182 41H25.7242C25.2669 41 24.8284 40.8156 24.505 40.4874C24.1817 40.1592 24 39.7141 24 39.25V28.75C24 28.2859 24.1817 27.8408 24.505 27.5126C24.8284 27.1844 25.2669 27 25.7242 27H36.9319L35.2076 28.75H25.7242V39.25H39.5182V36.625ZM41.6218 29.135L40.8631 28.365C40.6207 28.1192 40.292 27.9812 39.9493 27.9812C39.6066 27.9812 39.2779 28.1192 39.0354 28.365L32.6212 34.875V36.625H27.4485V38.375H35.2076V37.5L41.6218 30.99C41.864 30.7439 42 30.4103 42 30.0625C42 29.7147 41.864 29.3811 41.6218 29.135Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1801_112899" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1570_112961)" />
                    <path d="M39.5182 37.625L41.2425 35.875V40.25C41.2425 40.7141 41.0608 41.1592 40.7374 41.4874C40.4141 41.8156 39.9755 42 39.5182 42H25.7242C25.2669 42 24.8284 41.8156 24.505 41.4874C24.1817 41.1592 24 40.7141 24 40.25V29.75C24 29.2859 24.1817 28.8408 24.505 28.5126C24.8284 28.1844 25.2669 28 25.7242 28H36.9319L35.2076 29.75H25.7242V40.25H39.5182V37.625ZM41.6218 30.135L40.8631 29.365C40.6207 29.1192 40.292 28.9812 39.9493 28.9812C39.6066 28.9812 39.2779 29.1192 39.0354 29.365L32.6212 35.875V37.625H27.4485V39.375H35.2076V38.5L41.6218 31.99C41.864 31.7439 42 31.4103 42 31.0625C42 30.7147 41.864 30.3811 41.6218 30.135Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1570_112961" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>

    )
}

export default ICPSvg