import React from 'react'
import { useSkin } from "@hooks/useSkin";

const FacebookSvg = () => {
    const { skin, setSkin } = useSkin();
    return (
        <>
            {skin === 'light' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1568_112955)" />
                    <path d="M43 35.0612C43 29.5044 38.5231 25 33.0012 25C27.4769 25.0012 23 29.5044 23 35.0625C23 40.0831 26.657 44.2451 31.4364 45V37.9696H28.8993V35.0625H31.4389V32.844C31.4389 30.3231 32.9325 28.9308 35.216 28.9308C36.3108 28.9308 37.4544 29.127 37.4544 29.127V31.6017H36.1933C34.9523 31.6017 34.5648 32.3778 34.5648 33.174V35.0612H37.337L36.8945 37.9684H34.5636V44.9988C39.343 44.2438 43 40.0819 43 35.0612Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1568_112955" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1744_112958)" />
                    <path d="M43 35.0612C43 29.5044 38.5231 25 33.0012 25C27.4769 25.0012 23 29.5044 23 35.0625C23 40.0831 26.657 44.2451 31.4364 45V37.9696H28.8993V35.0625H31.4389V32.844C31.4389 30.3231 32.9325 28.9308 35.216 28.9308C36.3108 28.9308 37.4544 29.127 37.4544 29.127V31.6017H36.1933C34.9523 31.6017 34.5648 32.3778 34.5648 33.174V35.0612H37.337L36.8945 37.9684H34.5636V44.9988C39.343 44.2438 43 40.0819 43 35.0612Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1744_112958" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

        </>

    )
}

export default FacebookSvg