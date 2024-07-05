import React from 'react'
import { useSkin } from "@hooks/useSkin";

const HCSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1803_112916)" />
                    <path d="M32.8569 27.1238L27.4754 32.021C27.3255 32.1574 27.2057 32.3236 27.1239 32.5089C27.042 32.6943 26.9998 32.8947 27 33.0973V40.3714C27 40.4999 27.051 40.6231 27.1419 40.7139C27.2327 40.8047 27.3559 40.8558 27.4843 40.8558H38.8888C39.0172 40.8558 39.1404 40.8047 39.2313 40.7139C39.3221 40.6231 39.3731 40.4999 39.3731 40.3714V33.0973C39.3722 32.894 39.3286 32.6932 39.2451 32.5078C39.1617 32.3224 39.0403 32.1566 38.8888 32.021L33.5072 27.1238C33.4177 27.0441 33.302 27 33.1821 27C33.0622 27 32.9465 27.0441 32.8569 27.1238Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M42.5565 40.8513C43.6265 40.8513 44.4939 39.9839 44.4939 38.9139C44.4939 37.8439 43.6265 36.9766 42.5565 36.9766C41.4865 36.9766 40.6191 37.8439 40.6191 38.9139C40.6191 39.9839 41.4865 40.8513 42.5565 40.8513Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1803_112916" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1571_112977)" />
                    <path d="M30.8569 28.1238L25.4754 33.021C25.3255 33.1574 25.2057 33.3236 25.1239 33.5089C25.042 33.6943 24.9998 33.8947 25 34.0973V41.3714C25 41.4999 25.051 41.6231 25.1419 41.7139C25.2327 41.8047 25.3559 41.8558 25.4843 41.8558H36.8888C37.0172 41.8558 37.1404 41.8047 37.2313 41.7139C37.3221 41.6231 37.3731 41.4999 37.3731 41.3714V34.0973C37.3722 33.894 37.3286 33.6932 37.2451 33.5078C37.1617 33.3224 37.0403 33.1566 36.8888 33.021L31.5072 28.1238C31.4177 28.0441 31.302 28 31.1821 28C31.0622 28 30.9465 28.0441 30.8569 28.1238Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M40.5565 41.8513C41.6265 41.8513 42.4939 40.9839 42.4939 39.9139C42.4939 38.8439 41.6265 37.9766 40.5565 37.9766C39.4865 37.9766 38.6191 38.8439 38.6191 39.9139C38.6191 40.9839 39.4865 41.8513 40.5565 41.8513Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1571_112977" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>

    )
}

export default HCSvg