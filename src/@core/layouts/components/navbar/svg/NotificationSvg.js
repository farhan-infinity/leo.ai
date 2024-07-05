import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const NotificationSvg = () => {
    return (
        <svg key={uuidv4()} width="68" height="68" viewBox="0 0 73 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="73" height="76" rx="29" fill="url(#paint0)" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.6668 25.5556C32.6668 23.5919 34.2586 22 36.2223 22C38.186 22 39.7779 23.5919 39.7779 25.5556C43.9383 27.5228 46.6733 31.6254 46.8891 36.2223V41.5557C47.1604 43.7972 48.48 45.7766 50.4447 46.8891H22C23.9647 45.7766 25.2843 43.7972 25.5556 41.5557V36.2223C25.7714 31.6254 28.5064 27.5228 32.6668 25.5556Z" fill="white" />
            <path d="M32.6668 25.5556C32.6668 23.5919 34.2586 22 36.2223 22C38.186 22 39.7779 23.5919 39.7779 25.5556C43.9383 27.5228 46.6733 31.6254 46.8891 36.2223V41.5557C47.1604 43.7972 48.48 45.7766 50.4447 46.8891H22C23.9647 45.7766 25.2843 43.7972 25.5556 41.5557V36.2223C25.7714 31.6254 28.5064 27.5228 32.6668 25.5556" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8906 46.8887V48.6665C30.8906 51.612 33.2785 53.9998 36.224 53.9998C39.1695 53.9998 41.5574 51.612 41.5574 48.6665V46.8887" fill="white" />
            <path d="M30.8906 46.8887V48.6665C30.8906 51.612 33.2785 53.9998 36.224 53.9998C39.1695 53.9998 41.5574 51.612 41.5574 48.6665V46.8887" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
                <linearGradient id="paint0" x1="-29.5744" y1="38" x2="73" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1970D7" />
                    <stop offset="1" stop-color="#177FFA" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default NotificationSvg