import React from 'react'
import { useSkin } from "@hooks/useSkin";

const TSSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1803_112911)" />
                    <path d="M26.7358 28C26.539 28.0049 26.3518 28.0866 26.2143 28.2276C26.0769 28.3686 25.9999 28.5578 26 28.7547V41.2453C26 41.4454 26.0795 41.6374 26.2211 41.7789C26.3626 41.9205 26.5546 42 26.7547 42H39.2453C39.4454 42 39.6374 41.9205 39.7789 41.7789C39.9205 41.6374 40 41.4454 40 41.2453V28.7358C39.9951 28.539 39.9134 28.3518 39.7724 28.2143C39.6314 28.0769 39.4422 27.9999 39.2453 28H26.7358ZM30.0415 32.7774H32.6038V35.3585L31.5434 37.1962H30.0717L31.1434 35.3585H30.0415V32.7774ZM33.3472 32.7774H35.9208V35.3585L34.8679 37.1849H33.3962L34.4491 35.3585H33.3585L33.3472 32.7774Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1803_112911" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1571_112974)" />
                    <path d="M26.7358 28C26.539 28.0049 26.3518 28.0866 26.2143 28.2276C26.0769 28.3686 25.9999 28.5578 26 28.7547V41.2453C26 41.4454 26.0795 41.6374 26.2211 41.7789C26.3626 41.9205 26.5546 42 26.7547 42H39.2453C39.4454 42 39.6374 41.9205 39.7789 41.7789C39.9205 41.6374 40 41.4454 40 41.2453V28.7358C39.9951 28.539 39.9134 28.3518 39.7724 28.2143C39.6314 28.0769 39.4422 27.9999 39.2453 28H26.7358ZM30.0415 32.7774H32.6038V35.3585L31.5434 37.1962H30.0717L31.1434 35.3585H30.0415V32.7774ZM33.3472 32.7774H35.9208V35.3585L34.8679 37.1849H33.3962L34.4491 35.3585H33.3585L33.3472 32.7774Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1571_112974" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>


    )
}

export default TSSvg