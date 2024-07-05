import React from 'react'
import { useSkin } from "@hooks/useSkin";

const TVTISvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1803_112912)" />
                    <path d="M30.8866 38.6384C31.0505 38.6384 31.1833 38.5056 31.1833 38.3417C31.1833 38.1778 31.0505 38.0449 30.8866 38.0449C30.7227 38.0449 30.5898 38.1778 30.5898 38.3417C30.5898 38.5056 30.7227 38.6384 30.8866 38.6384Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M35.1717 38.6384C35.3356 38.6384 35.4685 38.5056 35.4685 38.3417C35.4685 38.1778 35.3356 38.0449 35.1717 38.0449C35.0079 38.0449 34.875 38.1778 34.875 38.3417C34.875 38.5056 35.0079 38.6384 35.1717 38.6384Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M30.8509 40.2936C31.9152 40.2936 32.778 39.4308 32.778 38.3665C32.778 37.3022 31.9152 36.4395 30.8509 36.4395C29.7866 36.4395 28.9238 37.3022 28.9238 38.3665C28.9238 39.4308 29.7866 40.2936 30.8509 40.2936Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M31.502 40.2931C31.9406 39.8968 32.4459 39.7148 33.0245 39.7148C33.5733 39.7148 34.1058 39.911 34.5344 40.271" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.4558 40.1943C33.9381 41.7602 32.4746 42.8177 30.8254 42.8177C28.7653 42.8177 27.0756 41.1857 27.0039 39.127" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M27 33.1836V39.0627" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M35.152 40.2795C36.2153 40.2795 37.0774 39.419 37.0774 38.3575C37.0774 37.296 36.2153 36.4355 35.152 36.4355C34.0886 36.4355 33.2266 37.296 33.2266 38.3575C33.2266 39.419 34.0886 40.2795 35.152 40.2795Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M31.541 40.1742C32.0515 41.747 33.5212 42.7981 35.1775 42.7981C37.2357 42.7981 38.924 41.1705 38.9956 39.1172" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M39 33.1895V39.0529" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1803_112912" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1571_112975)" />
                    <path d="M30.8866 38.6379C31.0505 38.6379 31.1833 38.5051 31.1833 38.3412C31.1833 38.1773 31.0505 38.0444 30.8866 38.0444C30.7227 38.0444 30.5898 38.1773 30.5898 38.3412C30.5898 38.5051 30.7227 38.6379 30.8866 38.6379Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M35.1717 38.6384C35.3356 38.6384 35.4685 38.5056 35.4685 38.3417C35.4685 38.1778 35.3356 38.0449 35.1717 38.0449C35.0079 38.0449 34.875 38.1778 34.875 38.3417C34.875 38.5056 35.0079 38.6384 35.1717 38.6384Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M30.8509 40.2931C31.9152 40.2931 32.778 39.4303 32.778 38.366C32.778 37.3017 31.9152 36.439 30.8509 36.439C29.7866 36.439 28.9238 37.3017 28.9238 38.366C28.9238 39.4303 29.7866 40.2931 30.8509 40.2931Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M31.502 40.2941C31.9406 39.8978 32.4459 39.7158 33.0245 39.7158C33.5733 39.7158 34.1058 39.912 34.5344 40.2719" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.4558 40.1948C33.9381 41.7607 32.4746 42.8182 30.8254 42.8182C28.7653 42.8182 27.0756 41.1862 27.0039 39.1274" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M27 33.1831V39.0622" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.1487 34.3273C28.2885 34.2222 27.5111 33.7629 27.0039 33.0601" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.2012 34.3301H36.8796" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M28.3203 44.6851C28.3623 43.8054 28.5327 42.9604 28.8146 42.2334" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M28.3438 44.7261H37.6519" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M31.8607 29.8533C31.4824 29.6699 31.1552 29.3959 30.9082 29.0557" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M30.4718 28.0672C30.4373 27.8985 30.4199 27.7269 30.4199 27.5548C30.4199 26.1438 31.5637 25 32.9747 25C33.0139 25 33.0531 25.0009 33.0922 25.0027" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.8692 30.2435C29.0102 29.8084 28.4688 28.9273 28.4688 27.9644C28.4688 26.5535 29.6125 25.4097 31.0235 25.4097C31.2033 25.4097 31.2948 25.4192 31.4706 25.4569" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.8789 30.3345V33.0851" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.9141 33.0859H34.1636" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M35.152 40.2799C36.2153 40.2799 37.0774 39.4195 37.0774 38.358C37.0774 37.2965 36.2153 36.436 35.152 36.436C34.0886 36.436 33.2266 37.2965 33.2266 38.358C33.2266 39.4195 34.0886 40.2799 35.152 40.2799Z" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M31.541 40.1747C32.0515 41.7475 33.5212 42.7986 35.1775 42.7986C37.2357 42.7986 38.924 41.171 38.9956 39.1177" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M39 33.189V39.0524" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M36.8516 34.3297C37.7111 34.2249 38.4878 33.7668 38.9945 33.0659" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M36.8006 34.333H29.1289" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M37.6795 44.6605C37.6374 43.7831 37.4672 42.9404 37.1855 42.2153" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.1445 29.8434C34.5225 29.6604 34.8494 29.3872 35.0961 29.0479" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M35.5301 28.0623C35.5646 27.8941 35.582 27.7229 35.582 27.5513C35.582 26.1653 34.4721 25.0335 33.084 25.0039" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M36.1346 30.2571C36.9928 29.8232 37.5338 28.9444 37.5338 27.984C37.5338 26.5768 36.391 25.436 34.9812 25.436C34.8016 25.436 34.7225 25.455 34.5469 25.4925" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M36.123 30.3477V33.0903" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M36.0876 33.0923H31.8418" stroke="white" strokeWidth="0.8" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1571_112975" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>


    )
}

export default TVTISvg