import React from 'react'
import { useSkin } from "@hooks/useSkin";

const IBSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1801_112900)" />
                    <path d="M40.1053 27V28.7647H24V27H40.1053ZM24 37.5882H32.0526V35.8235H24V37.5882ZM24 33.1765H40.1053V31.4118H24V33.1765ZM37.4211 34.9412C37.8956 34.9412 38.3508 35.1271 38.6864 35.458C39.022 35.789 39.2105 36.2379 39.2105 36.7059C39.2105 37.1739 39.022 37.6228 38.6864 37.9537C38.3508 38.2847 37.8956 38.4706 37.4211 38.4706C36.4279 38.4706 35.6316 37.6853 35.6316 36.7059C35.6316 35.7265 36.4368 34.9412 37.4211 34.9412ZM33.8421 42V41.1176C33.8421 40.1471 35.4437 39.3529 37.4211 39.3529C39.3984 39.3529 41 40.1471 41 41.1176V42H33.8421Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1801_112900" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>

            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1570_112962)" />
                    <path d="M40.1053 27V28.7647H24V27H40.1053ZM24 37.5882H32.0526V35.8235H24V37.5882ZM24 33.1765H40.1053V31.4118H24V33.1765ZM37.4211 34.9412C37.8957 34.9412 38.3508 35.1271 38.6864 35.458C39.022 35.789 39.2105 36.2379 39.2105 36.7059C39.2105 37.1739 39.022 37.6228 38.6864 37.9537C38.3508 38.2847 37.8957 38.4706 37.4211 38.4706C36.4279 38.4706 35.6316 37.6853 35.6316 36.7059C35.6316 35.7265 36.4368 34.9412 37.4211 34.9412ZM33.8421 42V41.1176C33.8421 40.1471 35.4437 39.3529 37.4211 39.3529C39.3984 39.3529 41 40.1471 41 41.1176V42H33.8421Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1570_112962" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>

    )
}

export default IBSvg