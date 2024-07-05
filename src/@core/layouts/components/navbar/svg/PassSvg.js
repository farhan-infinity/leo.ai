import React from 'react'
import { useSkin } from "@hooks/useSkin";

const PassSvg = () => {
    const { skin, setSkin } = useSkin();
    return (
        <>
            {skin === 'light' ? (
                <svg key={uuidv4()} width="56" height="58" viewBox="0 0 68 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="68" height="70" rx="34" fill="#177FFA" fill-opacity="0.11" />
                    <rect x="18" y="20" width="32" height="31" rx="6" fill="url(#paint0_linear_1823_112914)" />
                    <rect x="28.168" y="34.1667" width="11.6667" height="8.33333" rx="2" stroke="#AFD0F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <ellipse cx="34.0013" cy="38.3333" rx="0.833333" ry="0.833333" stroke="#AFD0F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M30.668 34.1667V30.8333C30.668 28.9924 32.1604 27.5 34.0013 27.5C35.8423 27.5 37.3346 28.9924 37.3346 30.8333V34.1667" stroke="#AFD0F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1823_112914" x1="5.0359" y1="35.5" x2="50" y2="35.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1970D7" />
                            <stop offset="1" stop-color="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>

            ) : (
                <svg key={uuidv4()} width="56" height="58" viewBox="0 0 68 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="68" height="70" rx="34" fill="#B6D5FA" />
                    <rect x="18" y="20" width="32" height="31" rx="6" fill="url(#paint0)" />
                    <rect x="28.168" y="34.167" width="11.6667" height="8.33333" rx="2" stroke="#AFD0F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <ellipse cx="34.0013" cy="38.3333" rx="0.833333" ry="0.833333" stroke="#AFD0F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M30.668 34.1667V30.8333C30.668 28.9924 32.1604 27.5 34.0013 27.5C35.8423 27.5 37.3346 28.9924 37.3346 30.8333V34.1667" stroke="#AFD0F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0" x1="5.0359" y1="35.5" x2="50" y2="35.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1970D7" />
                            <stop offset="1" stop-color="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>

            )}
        </>
    )
}

export default PassSvg