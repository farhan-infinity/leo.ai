import React from 'react'
import { useSkin } from "@hooks/useSkin";

const TCVSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1803_112910)" />
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <path d="M28.8114 42.7494C28.4939 42.7489 28.1818 42.6663 27.9057 42.5094C27.6306 42.3505 27.4021 42.1222 27.2432 41.8471C27.0842 41.5721 27.0003 41.2601 27 40.9425V27.8096C27.0003 27.4918 27.0843 27.1796 27.2434 26.9045C27.4025 26.6294 27.6312 26.401 27.9065 26.2422C28.1818 26.0835 28.4941 25.9999 28.8119 26C29.1297 26.0001 29.4419 26.0838 29.7172 26.2427L41.0975 32.8046C41.372 32.9638 41.5998 33.1924 41.7582 33.4674C41.9166 33.7424 42 34.0542 42 34.3715C42 34.6888 41.9166 35.0006 41.7582 35.2756C41.5998 35.5506 41.372 35.7792 41.0975 35.9384L29.7172 42.523C29.4397 42.6749 29.1278 42.7529 28.8114 42.7494ZM30.6229 30.9298V37.8132L36.578 34.3715L30.6229 30.9298Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M36.5781 34.3709L40.1965 32.2832" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M30.623 37.8125V41.9833" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1803_112910" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1571_112973)" />
                    <path d="M28.8114 42.7494C28.4939 42.7489 28.1818 42.6663 27.9057 42.5094C27.6306 42.3505 27.4021 42.1222 27.2432 41.8471C27.0842 41.5721 27.0003 41.2601 27 40.9425V27.8096C27.0003 27.4918 27.0843 27.1796 27.2434 26.9045C27.4025 26.6294 27.6312 26.401 27.9065 26.2422C28.1818 26.0835 28.4941 25.9999 28.8119 26C29.1297 26.0001 29.4419 26.0838 29.7172 26.2427L41.0975 32.8046C41.372 32.9638 41.5998 33.1924 41.7582 33.4674C41.9166 33.7424 42 34.0542 42 34.3715C42 34.6888 41.9166 35.0006 41.7582 35.2756C41.5998 35.5506 41.372 35.7792 41.0975 35.9384L29.7172 42.523C29.4397 42.6749 29.1278 42.7529 28.8114 42.7494ZM30.6229 30.9298V37.8132L36.578 34.3715L30.6229 30.9298Z" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M36.5781 34.3714L40.1965 32.2837" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M27.0039 28.8423L30.6222 30.93" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M30.623 37.8135V41.9843" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1571_112973" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>

    )
}

export default TCVSvg