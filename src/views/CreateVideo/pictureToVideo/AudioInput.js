import { useState, useEffect } from 'react'
import { CardBody, Button, ListGroupItem, FormFeedback } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import { X, DownloadCloud, Play, Pause } from 'react-feather'
import AudioInputSvg from './svg/AudioInputSvg';
import DeleteSvg from './svg/DeleteSvg';
import PlaySvg from './svg/PlaySvg';
import 'wave-audio-path-player'
import WaveAudioInput from './WaveAudioInput';
import { useSkin } from "@hooks/useSkin";

const AudioInput = ({ formik }) => {
    // ** State
    const [file, setFile] = useState(null)
    const { skin } = useSkin()

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: acceptedFiles => {
            formik.values.type = "audio"
            formik.values.audio = acceptedFiles[0]
            setFile({ acceptedFiles })
        }
    })

    // const renderFileSize = size => {
    //     if (Math.round(size / 100) / 10 > 1000) {
    //         return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    //     } else {
    //         return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    //     }
    // }

    return (
        <div style={{ cursor: "pointer", padding: "30px 10px", borderRadius: "23px", backgroundColor: skin === 'light' ? 'white' : 'black' }}>
            {file !== null ? (
                <ListGroupItem className='d-flex align-items-center justify-content-between h-25'>
                    <CardBody>
                        <div className='file-details d-flex align-items-center'>
                            <label htmlFor="audio" className='hidden'>Audio</label>
                            <input value={formik.values.file} type="file" name='audio' accept="audio/*, video/*" {...getInputProps()} />
                            <WaveAudioInput file={file} setFile={setFile} />
                            {/* <wave-audio-path-player src={file} wave-width="200" wave-height="40" color="#55007f" wave-color="#55007f" wave-progress-color="#ff00ff" wave-slider="#ffaaff" wave-options='{"samples":40,"type":"steps","width":192,"height":40}'></wave-audio-path-player> */}
                        </div>
                    </CardBody>
                </ListGroupItem >
            ) : (
                <>
                    <div {...getRootProps({ className: 'dropzone' })} >
                        <label htmlFor="audio" className='hidden'>Audio</label>
                        <input
                            value={formik.values.file}
                            onChange={formik.handleChange('audio')}
                            type="file"
                            name='audio'
                            accept="audio/*, video/*"
                            {...getInputProps()}
                            invalid={formik.touched.audio &&
                                formik.errors.audio ? true : false}
                        />
                        <div className='d-flex align-items-center justify-content-center flex-column gap-2'>
                            <AudioInputSvg />
                            <h4 className='text-blue'>Drop your own voice</h4>
                            <p className='text-secondary'>
                                Create more realistic videos by uploading own voice
                            </p>
                        </div>
                    </div>
                    {formik.touched.audio && formik.errors.audio ? (
                        <FormFeedback type="invalid">
                            {formik.errors.audio}
                        </FormFeedback>
                    ) : null}
                </>
            )}
        </div >
    )
}

export default AudioInput