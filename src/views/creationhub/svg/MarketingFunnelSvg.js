import React from 'react'
import { useSkin } from "@hooks/useSkin";

const MarketingFunnelSvg = () => {
    const { skin, setSkin } = useSkin();
    return (
        <>
            {skin === 'light' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1568_112960)" />
                    <path d="M23 27L30.5 36.2308V41.1538L35.5 43V36.2308L43 27H23Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1568_112960" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1744_112960)" />
                    <path d="M23 27L30.5 36.2308V41.1538L35.5 43V36.2308L43 27H23Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1744_112960" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>

    )
}

export default MarketingFunnelSvg