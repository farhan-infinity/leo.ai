import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


const VideoGeneratingModal = ({ show, setShow, loader, setLoader, setVideoUrl }) => {
    const dispatch = useDispatch()
    const [counter, setCounter] = useState(240000)
    const { getTextVideo, getTextVideoLoading, getTextVideoError } = useSelector(state => state.createVideo)

    console.log(getTextVideo)
    useEffect(() => {
        if (getTextVideoLoading === 'idle' && getTextVideoError !== null) {
            setLoader(false)
            setShow(false)
        }
    }, [getTextVideoLoading, getTextVideoError])

    useEffect(() => {
        const timeOutFunction = () => {
            if (getTextVideo && getTextVideo.video) {
                if (getTextVideo.video.status === 'processing') {
                    setProcessing(true)
                    if (counter > 0) {
                        setCounter(counter - 1000)
                    } else {
                        setCounter(0)
                    }
                }
                if (getTextVideo.video.status === 'generating') {
                    setGenerating(true)
                    setProcessing(false)
                    if (counter > 0) {
                        setCounter(counter - 1000)
                    } else {
                        setCounter(0)
                    }
                }
                if (getTextVideo.video.status === 'succeeded' && getTextVideo.video.output) {
                    setSucceeded(true)
                    setProcessing(false)
                    setGenerating(false)
                    setLoader(false)
                    setVideoUrl(getTextVideo.video.output)
                    if (counter > 0) {
                        setCounter(0)
                    }
                }
            }
        }
        const interval = setTimeout(timeOutFunction, counter)
        return () => { clearTimeout(interval) }
    }, [getTextVideo])

    const handleDownload = () => {
        const url = videoUrl;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Animated video';
        link.click();
    }
    return (
        <Modal
            style={{ opacity: 1 }}
            isOpen={show}
            toggle={() => setShow(!show)}
            className='modal-dialog-centered'
        // onClosed={() => dispatch(emptyGetTextToVideo)}
        >
            {/* <ModalHeader className='bg-transparent' toggle={() => { setShow(!show); dispatch(emptyGetVideo); setVideoUrl(null) }}></ModalHeader> */}
            <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>

            <ModalBody className='px-sm-5 mx-40 pb-4'>
                <h1 className='text-center mb-1'>{show === true ? "Generating Video" : `Video Generated Successfully`}</h1>
                {show === null ?
                    (
                        <Col xs={12} className='d-flex justify-content-center align-items-center'>
                            <Spinner
                                style={{
                                    height: '10rem',
                                    width: '10rem'
                                }}
                                animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    ) : null}
                {show !== null ? (
                    <Col className='text-center mt-1' xs={12}>
                        <Button type='button' id="downloadBtn" onClick={() => handleDownload()} value="download" className='me-1' color='primary'>
                            Download
                        </Button>
                        <Button
                            type='button'
                            color='secondary'
                            outline
                        // onClick={() => {
                        //     setShow(!show); dispatch(emptyGetVideo); setVideoUrl(null)
                        // }}
                        >
                            Play
                        </Button>
                    </Col>
                ) : null}
            </ModalBody>
        </Modal>
    )
}

export default VideoGeneratingModal