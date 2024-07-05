import React, { useEffect, useRef, useState } from "react";
import PlayButtonSvg from "./PlayButtonSvg";
import { v4 as uuidv4 } from 'uuid';

function VideoFrameCapture(url) {
    // const videoRef = useRef(null);
    // const imgRef = useRef(null);
    // const [capturedImage, setCapturedImage] = useState(null);

    // useEffect(() => {
    //     const video = videoRef.current;
    //     const handleVideoLoaded = () => {
    //         const duration = video.duration;
    //         const currentTime = duration / 2; // Capture the middle frame
    //         video.currentTime = currentTime;
    //     };

    //     const handleVideoSeeked = () => {
    //         const canvas = document.createElement("canvas");
    //         canvas.width = video.videoWidth;
    //         canvas.height = video.videoHeight;
    //         const context = canvas.getContext("2d");
    //         context.drawImage(video, 0, 0, canvas.width, canvas.height);
    //         const dataURL = canvas.toDataURL();
    //         setCapturedImage(dataURL);
    //     };

    //     const handleVideoEnded = () => {
    //         setCapturedImage(null);
    //     };

    //     video.addEventListener("loadeddata", handleVideoLoaded);
    //     video.addEventListener("seeked", handleVideoSeeked);
    //     video.addEventListener("ended", handleVideoEnded);

    //     return () => {
    //         video.removeEventListener("loadeddata", handleVideoLoaded);
    //         video.removeEventListener("seeked", handleVideoSeeked);
    //         video.removeEventListener("ended", handleVideoEnded);
    //     };
    // }, []);

    return (
        <div className="image-container">
            {/* <video style={{ display: "none" }} id={url?.url} src={url?.url} ref={videoRef} controls /> */}
            {/* <img className="capture-image" src={capturedImage} alt="Captured Frame" ref={imgRef} crossOrigin="anonymous" /> */}
            <video className="capture-image">
                <source src={`${url.url}#t=6`}></source>
            </video>
            <div className="background"></div>
            <div className="playbutton">
                <PlayButtonSvg />
            </div>
        </div>
    );
}

export default VideoFrameCapture;
