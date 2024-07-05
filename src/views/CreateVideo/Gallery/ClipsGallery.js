import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, ModalHeader, Row, Spinner } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import ReactPlayer from "react-player";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import {
    Modal, ModalBody
} from "reactstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import ShortVideoSvg from '../svg/ShortVideoSvg';
import { getGalleryClips } from '../../../redux/actions/createVideoAction';
import VideoFrameCapture from './CreateImage';
import { ModalDialog, ModalTitle } from 'react-bootstrap';
import { useSkin } from "@hooks/useSkin";


const ClipsGallery = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [videoData, setVideoData] = useState(null)
    const [modalItem, setModalItem] = useState(null)
    const { skin, setSkin } = useSkin();

    const { getGallery } = useSelector(state => state.createVideo)

    useEffect(() => {
        dispatch(getGalleryClips())
    }, [])

    useEffect(() => {
        if (getGallery !== null) {
            let id = location.state
            if (id !== null) {
                const filterDataWithData = getGallery.clips.shortClips.filter((item) => item._id === id)
                setVideoData(filterDataWithData)
            }
        }
    }, [getGallery])


    const handleDownload = (url, title) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = encodeURIComponent(title);
        link.click();
    }

    const handleShowModal = (item) => {
        setShow(!show)
        setModalItem(item)
    }


    return (
        <>
            <Modal
                size='md'
                className='modal modal-dialog-centered'
                toggle={() => setShow(!show)}
                isOpen={show}>
                <ModalBody className={`${skin === 'light' ? "player-modal" : "dark-player-modal"}`} toggle={() => {
                    setShow(!show)
                    setModalItem(null)
                }}>
                    <div className='w-100 d-flex justify-content-center align-content-center'>
                        <div className={`d-flex flex-column align-items-center mt-1 ${skin === 'light' ? "player-container" : 'dark-player-container'}`}>
                            <h3 style={{ color: "white", marginTop: '0.8rem' }}>Now Playing</h3>
                            <h5 style={{ color: "white" }}>{modalItem?.title}</h5>
                            <ReactPlayer className={`${skin === 'light' ? 'react-player' : 'dark-react-player'}`} controls playing url={modalItem?.url} />
                        </div>
                    </div>

                </ModalBody >
            </Modal >
            <Container className="parent-card-2 dark-theme-parent-card-2">
                <div className="breadCrumb-custom dark-breadCrumb-custom">
                    <ShortVideoSvg />
                    <BreadCrumbs title="Clipped Video" data={[{ title: "Create Video", link: "/create-video" }, { title: "Gallery", link: "/video-gallery" }, { title: "Short Clips Gallery", link: "/short-clips-gallery" }, { title: "Clipped Video" },]} />
                </div>
                <div className="inner-parent-child dark-inner-child-card">
                    <Row className='justify-content-center'>
                        <Col lg={8} className='align-items-center'>
                            {videoData !== null && (
                                videoData[0]?.clips?.map((item, index) => {
                                    return (
                                        <div key={uuidv4()}>
                                            <h2 className='px-4 py-1 mt-4' style={{ color: "#177DF5" }}>#{index + 1} - {item.title}</h2>
                                            <div className='cards dark-cards'>
                                                <div className='video-model dark-video-model'>
                                                    <div onClick={() => handleShowModal(item)} className='card-images dark-card-images' style={{ position: "relative", cursor: "pointer" }}>
                                                        <video className='card-video-images dark-card-video-images'>
                                                            <source src={`${item?.url}#t=5`}></source>
                                                        </video>
                                                        {/* <VideoFrameCapture url={item.url} /> */}
                                                        <span style={{ position: "absolute", top: "20px", right: "10px", backgroundColor: "#177DF5", borderRadius: "15px", color: "white", padding: "5px 10px", fontWeight: "bold", fontSize: "12px" }}>
                                                            {item?.startTime} - {item?.endTime}
                                                        </span>
                                                    </div>
                                                    <div className='buttons pt-1'>
                                                        <Button onClick={() => handleDownload(item?.url, item?.title)} color='primary' style={{ padding: "15px 30px", borderRadius: "15px" }}>Download</Button>
                                                        {/* <Button style={{ padding: "15px 30px", borderRadius: "15px", backgroundColor: "rgb(186 213 247)", color: "#177DF5" }} color='none'>Filter</Button> */}
                                                    </div>
                                                </div>
                                                <div className='script dark-script w-100'>
                                                    <div className='d-flex flex-column align-items-end justify-content-center text-center' style={{ padding: "5px 10px", fontWeight: "bold", fontSize: "12px" }}>
                                                        <div >
                                                            <h1 style={{ color: "#32CD32", textAlign: "center" }} >{item?.virality}</h1>
                                                            <h5 style={{ textAlign: "center" }}>Score</h5>
                                                        </div>
                                                    </div>
                                                    {item?.description ? (
                                                        <div className='script-child dark-script-child'>
                                                            <p>{item?.description}</p>
                                                        </div >
                                                    ) : (
                                                        <div className='script-child dark-script-child'>
                                                            <p>This video has no description</p>
                                                        </div >
                                                    )}
                                                </div >
                                            </div >
                                        </div >
                                    )
                                })
                            )}
                        </Col >
                    </Row >


                </div >
            </Container >
        </>
    )
}

export default ClipsGallery