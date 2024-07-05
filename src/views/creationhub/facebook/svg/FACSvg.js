import React from 'react'
import { useSkin } from "@hooks/useSkin";

const FACSvg = () => {
    const { skin } = useSkin()
    return (
        <>
            {skin === 'dark' ? (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#B6D5FA" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1803_112913)" />
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <path d="M39.5025 36.1958L38.4962 35.6156L37.4898 36.1958V25.0028H34.5889C34.3916 24.9906 34.1939 25.0205 34.009 25.0905C33.824 25.1605 33.6561 25.269 33.5163 25.4088C33.3765 25.5487 33.268 25.7166 33.1979 25.9015C33.1279 26.0864 33.098 26.2841 33.1102 26.4815C33.1227 26.2841 33.093 26.0862 33.0231 25.9012C32.9532 25.7161 32.8447 25.548 32.7048 25.4082C32.565 25.2683 32.3969 25.1598 32.2118 25.0899C32.0268 25.02 31.8289 24.9903 31.6315 25.0028H24.4434V40.5087H31.6316C31.829 40.4965 32.0266 40.5264 32.2116 40.5964C32.3965 40.6664 32.5644 40.7749 32.7042 40.9147C32.844 41.0545 32.9525 41.2224 33.0226 41.4074C33.0926 41.5923 33.1225 41.79 33.1103 41.9873C33.0978 41.7899 33.1275 41.5921 33.1974 41.407C33.2673 41.2219 33.3758 41.0539 33.5157 40.914C33.6556 40.7741 33.8237 40.6656 34.0087 40.5957C34.1938 40.5259 34.3916 40.4962 34.589 40.5087H41.7773V25.0028H39.5025V36.1958Z" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.1353 43.9992C31.1945 43.9992 31.6566 42.1405 29.726 42.1405H23V26.9941H24.4427" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M24.4277 39.3797H31.616C31.8133 39.3676 32.011 39.3975 32.1959 39.4675C32.3809 39.5375 32.5488 39.646 32.6886 39.7858C32.8284 39.9256 32.9369 40.0936 33.0069 40.2785C33.077 40.4634 33.1069 40.6611 33.0947 40.8584C33.0822 40.661 33.1119 40.4632 33.1818 40.2781C33.2517 40.0931 33.3602 39.925 33.5001 39.7851C33.6399 39.6452 33.808 39.5367 33.9931 39.4668C34.1781 39.3969 34.376 39.3672 34.5734 39.3797H41.7768" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M25.9473 33.0645L31.6978 33.1018" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M25.9473 35.168L31.6978 35.2053" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M25.9473 37.2734L31.6978 37.3108" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 33.0645L37.4808 33.0848M39.5021 33.0963L40.0618 33.1018" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 35.168L37.4808 35.1881M39.5021 35.1985L40.0618 35.2054" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 37.2734L40.067 37.3108" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.1348 43.9992C35.0755 43.9992 34.6135 42.1405 36.544 42.1405H43.27V26.9941H41.7759" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1803_112913" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="66" height="68" rx="33" fill="#177FFA" fillOpacity="0.11" />
                    <rect x="17" y="19" width="32" height="31" rx="6" fill="url(#paint0_linear_1571_112969)" />
                    <path d="M39.5025 36.1958L38.4962 35.6156L37.4898 36.1958V25.0028H34.5889C34.3916 24.9906 34.1939 25.0205 34.009 25.0905C33.824 25.1605 33.6561 25.269 33.5163 25.4088C33.3765 25.5487 33.268 25.7166 33.1979 25.9015C33.1279 26.0864 33.098 26.2841 33.1102 26.4815C33.1227 26.2841 33.093 26.0862 33.0231 25.9012C32.9532 25.7161 32.8447 25.548 32.7048 25.4082C32.565 25.2683 32.3969 25.1598 32.2118 25.0899C32.0268 25.02 31.8289 24.9903 31.6315 25.0028H24.4434V40.5087H31.6316C31.829 40.4965 32.0266 40.5264 32.2116 40.5964C32.3965 40.6664 32.5644 40.7749 32.7042 40.9147C32.844 41.0545 32.9525 41.2224 33.0226 41.4074C33.0926 41.5923 33.1225 41.79 33.1103 41.9873C33.0978 41.7899 33.1275 41.5921 33.1974 41.407C33.2673 41.2219 33.3758 41.0539 33.5157 40.914C33.6556 40.7741 33.8237 40.6656 34.0087 40.5957C34.1938 40.5259 34.3916 40.4962 34.589 40.5087H41.7773V25.0028H39.5025V36.1958Z" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.1353 43.9997C31.1945 43.9997 31.6566 42.141 29.726 42.141H23V26.9946H24.4427" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M24.4277 39.3792H31.616C31.8133 39.3671 32.011 39.397 32.1959 39.467C32.3809 39.537 32.5488 39.6455 32.6886 39.7853C32.8284 39.9251 32.9369 40.0931 33.0069 40.278C33.077 40.4629 33.1069 40.6606 33.0947 40.858C33.0822 40.6605 33.1119 40.4627 33.1818 40.2776C33.2517 40.0926 33.3602 39.9245 33.5001 39.7846C33.6399 39.6447 33.808 39.5362 33.9931 39.4663C34.1781 39.3964 34.376 39.3668 34.5734 39.3792H41.7768" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M26.1649 26.7485H28.0349C28.083 26.753 28.1274 26.7763 28.1585 26.8132C28.1896 26.8502 28.2049 26.8979 28.2012 26.946V30.7814C28.2049 30.8296 28.1896 30.8773 28.1585 30.9143C28.1274 30.9512 28.083 30.9744 28.0349 30.9789H26.1649C26.1168 30.9744 26.0724 30.9512 26.0413 30.9143C26.0102 30.8773 25.9949 30.8296 25.9986 30.7814V26.9462C25.9948 26.898 26.0101 26.8503 26.0413 26.8133C26.0724 26.7763 26.1168 26.753 26.1649 26.7485Z" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.5918 26.7485H31.6916" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.5918 28.8535H31.6916" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M29.5918 30.9585H31.6916" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M25.9473 33.0635L31.6978 33.1008" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M25.9473 35.1689L31.6978 35.2063" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M25.9473 37.2739L31.6978 37.3113" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 33.0635L37.4808 33.0839M39.5021 33.0953L40.0618 33.1008" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 35.1689L37.4808 35.1891M39.5021 35.1995L40.0618 35.2064" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 37.2739L40.067 37.3113" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 28.8022L37.4808 28.8226M39.5073 28.836L40.0618 28.8396" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 30.9585L37.4808 30.9788M39.5021 30.9908L40.0618 30.996" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M34.3164 26.7124L37.4808 26.7328M39.5021 26.746L40.0618 26.7497" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <path d="M33.1348 43.9997C35.0755 43.9997 34.6135 42.141 36.544 42.141H43.27V26.9946H41.7759" stroke="white" strokeWidth="0.6" strokeLinecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_1571_112969" x1="4.0359" y1="34.5" x2="49" y2="34.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1970D7" />
                            <stop offset="1" stopColor="#177FFA" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </>

    )
}

export default FACSvg