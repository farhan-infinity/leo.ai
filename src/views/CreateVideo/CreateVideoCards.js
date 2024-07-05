import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
// import { FaBloggerB, FaShopify } from "react-icons/fa";
import { BsCameraVideo, BsCamera, BsPersonVideo3 } from "react-icons/bs";
// import { GrCommand } from "react-icons/gr";
// import { IoLogoTiktok, IoFunnelSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./style.scss"
import ShortVideoSvg from "./svg/ShortVideoSvg";
import TextToVideoSvg from "./svg/TextToVideoSvg";
import PictureToVideoSvg from "./svg/PictureToVideoSvg";


function CreateVideoCards() {
    const navigate = useNavigate();

    return (
        <>
            <Row lg={12}>
                <Col sm="12" md="4" lg="3" xl="3" >
                    <div className="child-card dark-theme-child-card">
                        <div className='inner-child-card dark-theme-inner-child-card'
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate("/picture-to-video");
                            }}
                        >
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <PictureToVideoSvg />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    <Card.Title>Picture to Video</Card.Title>
                                    <Card.Subtitle className="text-muted">
                                        Generate your own video with picture and script or audio.
                                    </Card.Subtitle>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </Col>
                <Col sm="12" md="4" lg="3" xl="3">
                    <div className="child-card dark-theme-child-card">
                        <div className="inner-child-card dark-theme-inner-child-card"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate("/text-to-video");
                            }}
                        >
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <TextToVideoSvg />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    <Card.Title className="">Text to Video</Card.Title>
                                    <Card.Subtitle className="text-muted">
                                        Create unique animated videos for Social media using text.
                                    </Card.Subtitle>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm="12" md="4" lg="3" xl="3">
                    <div className="child-card dark-theme-child-card">
                        <div className="inner-child-card dark-theme-inner-child-card"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate("/short-clips")
                            }}
                        >

                            <Row className="d-flex align-items-center">
                                <Col>
                                    <ShortVideoSvg />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    <Card.Title className="">Short Clips</Card.Title>
                                    <Card.Subtitle className="text-muted">
                                        Generate viral &amp; unique short videos.
                                    </Card.Subtitle>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm="12" md="4" lg="3" xl="3">
                    <div className="child-card dark-theme-child-card">
                        <div className="inner-child-card dark-theme-inner-child-card"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate("/video-gallery")
                            }}
                        >
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <PictureToVideoSvg />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2">
                                    <Card.Title className="">Gallery</Card.Title>
                                    <Card.Subtitle className="text-muted">
                                        Visit here &amp; see all videos that are created.
                                    </Card.Subtitle>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default CreateVideoCards;
