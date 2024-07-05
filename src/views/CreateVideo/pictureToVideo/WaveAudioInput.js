import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import DeleteSvg from "./svg/DeleteSvg";
import PlaySvg from "./svg/PlaySvg";
import PauseSvg from "./svg/PauseSvg";

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#177ffa",
    progressColor: "#177ffa",
    cursorColor: "#177ffa",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 40,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true
});

export default function WaveAudioInput({ file, setFile }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
        const url = URL.createObjectURL(file.acceptedFiles[0]);
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(url);

        wavesurfer.current.on("ready", function () {
            // https://wavesurfer-js.org/docs/methods.html
            // wavesurfer.current.play();
            // setPlay(true);

            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }
        });

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [file]);

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    const handleRemove = () => {
        setFile(null)
    }

    return (
        <div className="d-flex w-100 justify-content-center align-items-center px-4" style={{ gap: "10px" }}>
            <div className="controls">
                <div className='audio-container' onClick={handlePlayPause}>
                    {!playing && <PlaySvg />}
                    {playing && <PauseSvg />}
                </div>
            </div>
            <div className="w-100" id="waveform" ref={waveformRef} />
            <div onClick={() => handleRemove()} className="cursor-pointer">
                <DeleteSvg />
            </div>

        </div>
    );
}