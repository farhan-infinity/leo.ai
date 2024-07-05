import React, { useState, useRef } from 'react';

const MediaPlayer = ({ videoUrl }) => {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
    };
    return (
        <div className='d-flex justify-content-center'>
            <video
                className='rounded-4'
                onTimeUpdate={handleProgress}
                ref={videoRef}
                width="450"
                height="300"
                controls
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    )
}

export default MediaPlayer;