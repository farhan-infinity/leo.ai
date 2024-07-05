import React, { useState } from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PictureToVideoSvg from '../svg/PictureToVideoSvg';
import BreadCrumbs from '../../../@core/components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getGalleryClips } from '../../../redux/actions/createVideoAction';
import VideoFrameCapture from './CreateImage';
import moment from 'moment';
import {
    Modal, ModalBody
} from "reactstrap";
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const PictureToVideoGallery = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [modalItem, setModalItem] = useState(null)
    const { getGallery, getGalleryLoading } = useSelector(state => state.createVideo)

    useEffect(() => {
        dispatch(getGalleryClips())
    }, [])

    // const handleNavigate = (id) => {
    //     navigate(`/picture-to-video-gallery/video=${id}`, { state: id })
    // }

    const handleShowModal = (item) => {
        setShow(!show)
        setModalItem(item)
    }

    const handleDownload = (url, title) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = encodeURIComponent(title);
        link.click();
    }

    return (
        <>
            <Modal
                size='lg' style={{ maxWidth: "640px", width: "100%", maxHeight: "400px", height: "100%" }}
                className='bg-transparent modal modal-dialog-centered'
                toggle={() => setShow(!show)}
                isOpen={show}>
                <ModalBody toggle={() => {
                    setShow(!show)
                    setModalItem(null)
                }}>
                    <div>
                        {/* <div>
                            <h3 style={{ color: "white" }}>Now Playing</h3>
                            <p style={{ color: "white" }}>{modalItem?.title}</p>
                        </div> */}
                        <ReactPlayer className="rounded-4" controls playing url={modalItem?.resultUrl} />
                    </div>
                </ModalBody >
            </Modal >
            <Container className="parent-card-2 dark-theme-parent-card-2">
                <div className="breadCrumb-custom dark-breadCrumb-custom">
                    <PictureToVideoSvg />
                    <BreadCrumbs title="Picture To Video Gallery" data={[{ title: "Create Video", link: "/create-video" }, { title: "Gallery", link: "/video-gallery" }, { title: "Picture To Video Gallery", link: "/picture-to-video-gallery" }]} />
                </div>
                <div className='component w-100'>
                    {getGallery?.clips?.pictureToVideo.length > 0 ? (
                        <Row lg={12}>
                            {
                                getGallery?.clips?.pictureToVideo?.map((videos) => {
                                    return (
                                        <Col lg={3} key={videos?._id}>
                                            <div className="child-card dark-theme-child-card">
                                                <div className='inner-child-image-card dark-theme-inner-child-image-card'>
                                                    <Row lg={12} >
                                                        <Col onClick={() => handleShowModal(videos)}>
                                                            <VideoFrameCapture url={videos?.resultUrl} />
                                                        </Col>
                                                        <Col>
                                                            <div className='d-flex flex-column mt-1' style={{ gap: "10px" }}>
                                                                <div>
                                                                    Length: {Math.round(videos?.duration)} sec
                                                                </div>
                                                                <div>
                                                                    Date: {moment(videos?.createdAt).format("DD MMM YY")}
                                                                </div>
                                                                <div>
                                                                    <Button onClick={() => handleDownload(videos?.resultUrl, videos?.text)}>
                                                                        Download
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    ) : (
                        <>
                            {getGalleryLoading !== "idle" ? (
                                <ComponentSpinner style={{ width: "2rem", height: "2rem" }} />
                            ) : (
                                <div style={{ display: "flex", textAlign: "center", width: "100%", justifyContent: "center", color: "gray" }}>
                                    You have not created any videos, visit <Link style={{ color: "#177FFA", fontWeight: "500" }} to={"/create-video"}>&nbsp;Create Video&nbsp;</Link> tab to start creating picture to videos
                                </div>
                            )}

                        </>
                    )}


                </div>
            </Container >
        </>
    )
}

export default PictureToVideoGallery