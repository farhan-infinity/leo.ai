import { useSkin } from "@hooks/useSkin";
import { v4 as uuidv4 } from "uuid"

const TextToVideoSvg = () => {
    const { skin, setSkin } = useSkin();
    return (
        <>
            {skin === 'light' ? (
                <svg key={uuidv4()} width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1141_112954)" />
                    <path d="M32.9184 30.7222V38.2778M32.9184 30.7222H29.1406M32.9184 30.7222H36.6962" stroke="white" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M41.4167 35.9167V41.1111C41.4167 41.6121 41.2177 42.0925 40.8634 42.4468C40.5092 42.801 40.0287 43 39.5278 43H26.3056C25.8046 43 25.3241 42.801 24.9699 42.4468C24.6157 42.0925 24.4167 41.6121 24.4167 41.1111V35.9167M41.4167 33.0833V27.8889C41.4167 27.3879 41.2177 26.9075 40.8634 26.5532C40.5092 26.199 40.0287 26 39.5278 26H26.3056C25.8046 26 25.3241 26.199 24.9699 26.5532C24.6157 26.9075 24.4167 27.3879 24.4167 27.8889V33.0833M40 35.9167V33.0833H42.8333V35.9167H40ZM23 35.9167V33.0833H25.8333V35.9167H23Z" stroke="white" strokeWidth="1.5" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1141_112954" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg key={uuidv4()} width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1744_112966)" />
                    <path d="M32.9184 30.7227V38.2782M32.9184 30.7227H29.1406M32.9184 30.7227H36.6962" stroke="white" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M41.4167 35.9167V41.1111C41.4167 41.6121 41.2177 42.0925 40.8634 42.4468C40.5092 42.801 40.0287 43 39.5278 43H26.3056C25.8046 43 25.3241 42.801 24.9699 42.4468C24.6157 42.0925 24.4167 41.6121 24.4167 41.1111V35.9167M41.4167 33.0833V27.8889C41.4167 27.3879 41.2177 26.9075 40.8634 26.5532C40.5092 26.199 40.0287 26 39.5278 26H26.3056C25.8046 26 25.3241 26.199 24.9699 26.5532C24.6157 26.9075 24.4167 27.3879 24.4167 27.8889V33.0833M40 35.9167V33.0833H42.8333V35.9167H40ZM23 35.9167V33.0833H25.8333V35.9167H23Z" stroke="white" strokeWidth="1.5" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1744_112966" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>

    )
}
export default TextToVideoSvg

