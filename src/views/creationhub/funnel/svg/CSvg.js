import React from 'react'
import { useSkin } from "@hooks/useSkin";

const CSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1803_112919)" />
                    <path d="M30.3571 29.2143V28.1429C30.3571 27.1327 30.3571 26.6276 30.671 26.3138C30.9848 26 31.4899 26 32.5 26H37.8571C38.8673 26 39.3724 26 39.6862 26.3138C40 26.6276 40 27.1327 40 28.1429V33.5C40 34.5101 40 35.0152 39.6862 35.329C39.3724 35.6429 38.8673 35.6429 37.8571 35.6429H36.7857M27.1429 41H32.5C33.5101 41 34.0152 41 34.329 40.6862C34.6429 40.3724 34.6429 39.8673 34.6429 38.8571V33.5C34.6429 32.4899 34.6429 31.9848 34.329 31.671C34.0152 31.3571 33.5101 31.3571 32.5 31.3571H27.1429C26.1327 31.3571 25.6276 31.3571 25.3138 31.671C25 31.9848 25 32.4899 25 33.5V38.8571C25 39.8673 25 40.3724 25.3138 40.6862C25.6276 41 26.1327 41 27.1429 41Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1803_112919" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>

            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1571_112979)" />
                    <path d="M30.3571 30.2143V29.1429C30.3571 28.1327 30.3571 27.6276 30.671 27.3138C30.9848 27 31.4899 27 32.5 27H37.8571C38.8673 27 39.3724 27 39.6862 27.3138C40 27.6276 40 28.1327 40 29.1429V34.5C40 35.5101 40 36.0152 39.6862 36.329C39.3724 36.6429 38.8673 36.6429 37.8571 36.6429H36.7857M27.1429 42H32.5C33.5101 42 34.0152 42 34.329 41.6862C34.6429 41.3724 34.6429 40.8673 34.6429 39.8571V34.5C34.6429 33.4899 34.6429 32.9848 34.329 32.671C34.0152 32.3571 33.5101 32.3571 32.5 32.3571H27.1429C26.1327 32.3571 25.6276 32.3571 25.3138 32.671C25 32.9848 25 33.4899 25 34.5V39.8571C25 40.8673 25 41.3724 25.3138 41.6862C25.6276 42 26.1327 42 27.1429 42Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1571_112979" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>


    )
}

export default CSvg