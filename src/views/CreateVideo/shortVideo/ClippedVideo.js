import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import ReactPlayer from "react-player";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import {
    Modal, ModalBody
} from "reactstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { getShortClips } from '../../../redux/actions/createVideoAction';
import { emptyGetClips, emptyPostClips, emptySubtitle } from '../../../redux/slices/createVideoSlice';
import { toast } from 'react-hot-toast';
import ShortVideoSvg from '../svg/ShortVideoSvg';
import { ReactToast } from '../../../@core/components/react-toast/ReactToast';
import { useSkin } from "@hooks/useSkin";


const ClippedVideo = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [modalItem, setModalItem] = useState(null)
    const [loader, setLoader] = useState(true)
    const videoRef = useRef(null);
    const [videoData, setVideoData] = useState([]);
    const { getClips, getClipsLoading, getClipsError } = useSelector((state) => state.createVideo)
    const { postClips } = useSelector((state) => state.createVideo)
    const { skin, setSkin } = useSkin();



    useEffect(() => {
        const timeOutFunc = () => {

            const modifiedString = location.search.replace("?", "");
            const videoID = modifiedString

            if (getClips) {
                if (getClips.videos.length > 0) {
                    if (getClips.videos[0].status === "processing") {
                        if (getClips.videos[0].clips.length > 0) {
                            const updatedData = [...videoData];
                            getClips.videos[0].clips.forEach((obj) => {
                                if (!videoData.some((item) => item._id === obj._id)) {
                                    updatedData.push(obj);
                                } else return
                            });
                            setLoader(false)
                            dispatch(emptyPostClips());
                            setVideoData(updatedData);
                            dispatch(getShortClips(videoID))
                        }
                    }
                    if (getClips.videos[0].status === "completed" && videoData.length === 0) {
                        if (getClips.videos[0].clips.length > 0) {
                            const updatedData = [...videoData];
                            getClips.videos[0].clips.forEach((obj) => {
                                if (!videoData.some((item) => item._id === obj._id)) {
                                    updatedData.push(obj);

                                }
                            });
                            setLoader(false)
                            setVideoData(updatedData);
                            dispatch(emptyPostClips());
                            dispatch(emptyGetClips())
                            ReactToast({ message: "Video Clipped Completed", error: false })
                        }
                        if (videoData.length === 0) {
                            setVideoData(getClips.videos[0].clips)
                            dispatch(getShortClips(videoID))
                        }
                    }
                    if (getClips.videos[0].status === "failed") {
                        ReactToast({ message: getClips.videos[0].issue, error: true })
                        toast.error(getClips.videos[0].issue)
                    }
                }
            }
        }
        const interval = setTimeout(timeOutFunc, 10000)
        return () => { clearTimeout(interval) }
    }, [getClips])

    useEffect(() => {
        if (location.search) {
            if (!getClips) {
                dispatch(emptyPostClips);
                dispatch(emptyGetClips)
                navigate(-1)
            }
        }
    }, [location])

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

    const handleGenerateNew = () => {
        setVideoData([]);
        dispatch(emptyPostClips());
        dispatch(emptyGetClips());
        dispatch(emptySubtitle());
        navigate("/short-clips")
    }

    // const showDescription = (text) => {
    //     const updatedString = string.replace(/\/n/g, ' ');
    //     return (
    //         <p>{updatedString}</p>
    //     )
    // }


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
                    <BreadCrumbs title="Clipped Video" data={[{ title: "Create Video", link: "/create-video" }, { title: "Short Clips", link: "/short-clips" }, { title: "Clipped Video" }]} />
                </div>
                <div className="inner-parent-child dark-inner-child-card">
                    <div className='d-flex justify-content-end'>
                        <Button disabled={loader ? true : false} onClick={() => handleGenerateNew()} style={{ padding: "15px 30px", borderRadius: "15px", display: "flex", gap: "10px" }} color='primary'>
                            <span>{'Generate New'}</span>
                        </Button>
                    </div>
                    <Row className='justify-content-center'>
                        <Col lg={8} className='align-items-center'>

                            {videoData?.map((item, index) => {
                                return (
                                    <div key={uuidv4()}>
                                        <h2 className='px-4 py-1 mt-4' style={{ color: "#177DF5" }}>#{index + 1} - {item.title}</h2>
                                        <div className='cards dark-cards'>
                                            <div className='video-model dark-video-model'>
                                                <div onClick={() => handleShowModal(item)} className='card-images dark-card-images' style={{ position: "relative", cursor: "pointer" }}>
                                                    <video className='card-video-images dark-card-video-images'>
                                                        <source src={`${item?.url}#t=5`}></source>
                                                    </video>

                                                    <span style={{ position: "absolute", top: "20px", right: "10px", backgroundColor: "#177DF5", borderRadius: "15px", color: "white", padding: "5px 10px", fontWeight: "bold", fontSize: "12px" }}>
                                                        {item?.startTime} - {item?.endTime}
                                                    </span>
                                                </div>
                                                <div className='buttons pt-1'>
                                                    <Button onClick={() => handleDownload(item.url, item.title)} color='primary' style={{ padding: "15px 30px", borderRadius: "15px" }}>Download</Button>
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
                                        </div>
                                    </div>
                                )
                            })}
                            {loader && (
                                <div style={{
                                    marginTop: '3rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Spinner style={{
                                        height: '3rem',
                                        width: '3rem',

                                    }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>


                </div >
            </Container >
        </>
    )
}

export default ClippedVideo