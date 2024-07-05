import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import PictureToVideoSvg from '../svg/PictureToVideoSvg';
import BreadCrumbs from '../../../@core/components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleryClips } from '../../../redux/actions/createVideoAction';
import VideoFrameCapture from './CreateImage';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const ShortClipsGallery = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { getGallery, getGalleryLoading } = useSelector(state => state.createVideo)

    useEffect(() => {
        dispatch(getGalleryClips())
    }, [])

    const handleNavigate = (id) => {
        navigate(`/short-clips-gallery/video=${id}`, { state: id })
    }


    return (
        <Container className="parent-card-2 dark-theme-parent-card-2">
            <div className="breadCrumb-custom dark-breadCrumb-custom">
                <PictureToVideoSvg />
                <BreadCrumbs title="Short Clips" data={[{ title: "Create Video", link: "/create-video" }, { title: "Gallery", link: "/video-gallery" }, { title: "Short Clips", link: "/short-clips-gallery" }]} />
            </div>
            <div className='component w-100'>
                {getGallery?.clips?.shortClips.length > 0 ? (
                    <Row lg={12}>
                        {getGallery?.clips?.shortClips?.map((clip) => {
                            return (
                                < Col lg={4} key={clip?._id}>
                                    <div className="child-card dark-theme-child-card">
                                        <div className='inner-child-image-card dark-theme-inner-child-image-card'>
                                            <Row lg={12}>
                                                <Col onClick={() => handleNavigate(clip?._id)}>
                                                    <VideoFrameCapture url={clip?.clips[0]?.url} />
                                                </Col>
                                                <Col >
                                                    <div className='d-flex flex-column mt-1' style={{ gap: "2px" }}>
                                                        <div>
                                                            Title: {clip?.clips[0]?.title ? clip?.clips[0]?.title : "Not Available"}
                                                        </div>
                                                        <div>
                                                            Status: {clip?.status}
                                                        </div>
                                                        <div>
                                                            Caption: {clip?.withCaptions === true ? "Yes" : "No"}
                                                        </div>
                                                        <div>
                                                            Date: {moment(clip?.createdAt).format("DD MMM YY")}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>

                            )
                        })}
                    </Row>
                ) : (
                    <>
                        {
                            getGalleryLoading !== "idle" ? (
                                <ComponentSpinner style={{ width: "2rem", height: "2rem" }} />
                            ) : (
                                <div style={{ display: "flex", textAlign: "center", width: "100%", justifyContent: "center", color: "gray" }}>
                                    You have not created any videos, visit <Link style={{ color: "#177FFA", fontWeight: "500" }} to={"/create-video"}>&nbsp;Create Video&nbsp;</Link> tab to start creating short clips
                                </div>
                            )}
                    </>

                )}


            </div>
        </Container >
    )
}

export default ShortClipsGallery