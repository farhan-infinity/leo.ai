import React from 'react'
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import { Container, Row, Col, Card } from "react-bootstrap";
import PictureToVideoSvg from './svg/PictureToVideoSvg'
import TextToVideoSvg from './svg/TextToVideoSvg'
import ShortVideoSvg from './svg/ShortVideoSvg'
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
    const navigate = useNavigate()
    return (
        <Container className="parent-card-2 dark-theme-parent-card-2">
            <div className="breadCrumb-custom dark-breadCrumb-custom">
                <PictureToVideoSvg />
                <BreadCrumbs title="Gallery" data={[{ title: "Create Video", link: "/create-video" }, { title: "Gallery", link: "/video-gallery" }]} />
            </div>
            <div className='component'>
                <Row lg={12}>
                    <Col lg={4}>
                        <div className="child-card dark-theme-child-card">
                            <div className='inner-child-card dark-theme-inner-child-card'
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/picture-to-video-gallery");
                                }}
                            >
                                <Row className="d-flex align-items-center">
                                    <Col>
                                        <PictureToVideoSvg />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mt-2'>
                                        <Card.Title>Picture to Video</Card.Title>
                                        <Card.Subtitle className="text-muted">
                                            Your generated own video with picture and script or audio.
                                        </Card.Subtitle>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="child-card dark-theme-child-card">
                            <div className="inner-child-card dark-theme-inner-child-card"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/text-to-video-gallery");
                                }}
                            >
                                <Row className="d-flex align-items-center">
                                    <Col>
                                        <TextToVideoSvg />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mt-2'>
                                        <Card.Title className="">Text to Video</Card.Title>
                                        <Card.Subtitle className="text-muted">
                                            Your created unique animated videos for Social media using text.
                                        </Card.Subtitle>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="child-card dark-theme-child-card">
                            <div className="inner-child-card dark-theme-inner-child-card"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/short-clips-gallery")
                                }}
                            >

                                <Row className="d-flex align-items-center">
                                    <Col>
                                        <ShortVideoSvg />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mt-2'>
                                        <Card.Title className="">Short Clips</Card.Title>
                                        <Card.Subtitle className="text-muted">
                                            Your generated viral &amp; unique short videos.
                                        </Card.Subtitle>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col >
                </Row >
            </div >
        </Container >
    )
}

export default Gallery