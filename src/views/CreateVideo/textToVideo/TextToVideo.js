import React from "react";
import { Container, Row, Col, Card, Button, Spinner, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsSaveFill } from "react-icons/bs";
import { Breadcrumb, BreadcrumbItem, CardBody, Input, Label, Form, Progress, CardHeader, CardText, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getTextToVideo, postTextToVideo } from "../../../redux/actions/createVideoAction";
import * as Yup from 'yup';
import MediaPlayer from "./MediaPlayer";
import { useState } from "react";
import { useEffect } from "react";
import { emptyGetTextToVideo } from "../../../redux/slices/createVideoSlice";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import TextToVideoSvg from "../svg/TextToVideoSvg";
import { subscriptionActions } from "../../../redux/subscription";
import { ReactToast } from "../../../@core/components/react-toast/ReactToast";

const TextToVideo = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const [videoStatus, setVideoStatus] = useState(null)
    const [counter, setCounter] = useState(32000)
    const { getTextVideo, getTextVideoLoading, getTextVideoError } = useSelector(state => state.createVideo)
    const [videoUrl, setVideoUrl] = useState(null)
    const [videoId, setVideoId] = useState(null)
    const { postTextVideo, postTextVideoLoading, postTextVideoError } = useSelector(state => state.createVideo)
    const { subscription_plans_modal } = useSelector((state) => state.subscription)


    useEffect(() => {
        if (postTextVideoLoading === 'pending' && postTextVideoError === null) {
            setLoader(true)
            setShow(true)
        }
        if (postTextVideoLoading === 'idle' && postTextVideoError !== null) {
            setLoader(false)
            setShow(false)
        }
        if (postTextVideoError) {
            if (postTextVideoError.includes("Insufficient Credit")) {
                dispatch(
                    subscriptionActions.updateModalState({
                        subscription: !subscription_plans_modal,
                    })
                );
                let upgrade = {
                    upgradeModal: !subscription_plans_modal
                }
                localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
            } else if (postTextVideoError.includes("Subscription Not Found")) {
                dispatch(
                    subscriptionActions.updateModalState({
                        subscription: !subscription_plans_modal,
                    })
                );
                let upgrade = {
                    upgradeModal: !subscription_plans_modal
                }
                localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
            }
        }
    }, [postTextVideoLoading, postTextVideoError])


    useEffect(() => {
        if (postTextVideo !== null) {
            setVideoId(postTextVideo?.result?.id)
        }
    }, [postTextVideo])

    useEffect(() => {
        if (getTextVideoLoading === 'idle' && getTextVideoError !== null) {
            setLoader(false)
            setShow(false)
        }
    }, [getTextVideoLoading, getTextVideoError])

    useEffect(() => {
        const timer = setInterval(() => {
            if (videoId && getTextVideo === null) {
                setVideoStatus("Starting")
                dispatch(getTextToVideo(videoId))
            } else {
                if (videoId && getTextVideo !== null) {
                    if (getTextVideo.video.status === 'starting') {
                        setVideoStatus(getTextVideo.video.status)
                        dispatch(getTextToVideo(videoId))
                    }
                    if (getTextVideo.video.status === 'processing') {
                        setVideoStatus(getTextVideo.video.status)
                        dispatch(getTextToVideo(videoId))
                    }
                    if (getTextVideo.video.status === 'succeeded' && getTextVideo.video.output !== '' && videoId) {
                        setVideoStatus(getTextVideo.video.status)
                        formik.resetForm()
                        setLoader(false)
                        setVideoId(null)
                        setVideoUrl(getTextVideo.video.output)
                    }
                }
            }
        }, counter);

        return () => {
            clearInterval(timer);
        };
    }, [getTextVideo, videoId])

    const validationSchema = ({
        text: Yup.string().required("Text is required"),
        fps: Yup.number()
            .min(5, 'Number must be between 5 and 60')
            .max(60, 'Number must be between 5 and 60')
            .required('FPS is required'),
        videoLength: Yup.number()
            .min(5, 'Number must be between 5 and 10000')
            .max(10000, 'Number must be between 5 and 10000')
            .required('Video length is required'),
    });

    const formik = useFormik({
        initialValues: {
            text: '',
            fps: '',
            videoLength: ''
        },
        validationSchema: Yup.object(validationSchema),
        validateOnChange: true,
        onSubmit: (values, actions) => {
            setVideoId(null)
            setVideoStatus(null)
            dispatch(emptyGetTextToVideo())
            setShow(true)
            actions.setFieldValue('text', values.text);
            actions.setFieldValue('fps', values.fps);
            actions.setFieldValue('videoLength', values.videoLength);
            dispatch(postTextToVideo(values))
            actions.setSubmitting(false)
        }

    });

    return (
        <div>
            <div className="spinner"></div>
            <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
                <div className="breadCrumb-custom dark-breadCrumb-custom">
                    <TextToVideoSvg />
                    <BreadCrumbs title="Text To Video" data={[{ title: "Create Video", link: "/create-video" }, { title: "Text To Video" }]} />
                </div>
                <div className="inner-parent-child">
                    <Row className="h-100">
                        <Col lg="6" className="h-100">
                            <div className="custom-card-5 dark-theme-custom-card-5">
                                <CardBody>
                                    <Card.Title>Text to Video</Card.Title>
                                    <Card.Text>
                                        Start creating your own videos with text
                                    </Card.Text>
                                </CardBody>
                                <CardBody>
                                    <Form id="form2" onSubmit={formik.handleSubmit} className="mt-2">
                                        <div className="form-group">
                                            <Label>Write about your video</Label>
                                            <div className="input-affix">
                                                <Input
                                                    disabled={loader}
                                                    type="text"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Start entering text e.g: A dancing panda at NYC"
                                                    {...formik.getFieldProps('text')}
                                                    onChange={formik.handleChange('text')}
                                                    onBlur={formik.handleBlur}
                                                    invalid={formik.touched.text &&
                                                        formik.errors.text ? true : false}
                                                />
                                                {formik.touched.text && formik.errors.text ? (
                                                    <FormFeedback type="invalid">
                                                        {formik.errors.text}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Label>Frames Per Second</Label>
                                            <div className="input-affix m-b-10">
                                                <i className="prefix-icon anticon anticon-lock"></i>
                                                <Input
                                                    disabled={loader}
                                                    type="number"
                                                    id="fps"
                                                    className="form-control"
                                                    placeholder="Number of frames in the video between 5 to 60"
                                                    {...formik.getFieldProps('fps')}
                                                    onChange={formik.handleChange('fps')}
                                                    onBlur={formik.handleBlur}
                                                    invalid={formik.touched.fps &&
                                                        formik.errors.fps ? true : false}
                                                />
                                                {formik.touched.fps && formik.errors.fps ? (
                                                    <FormFeedback type="invalid">
                                                        {formik.errors.fps}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Label>Total number of Frames</Label>
                                            <div className="input-affix m-b-10">
                                                <i className="prefix-icon anticon anticon-lock"></i>
                                                <Input
                                                    disabled={loader}
                                                    type="number"
                                                    className="form-control"
                                                    id="videoLength"
                                                    placeholder="Frame rate for the video. (minimum: 5; maximum: 10000)"
                                                    {...formik.getFieldProps('videoLength')}
                                                    onChange={formik.handleChange('videoLength')}
                                                    onBlur={formik.handleBlur}
                                                    invalid={formik.touched.videoLength &&
                                                        formik.errors.videoLength ? true : false}
                                                />
                                                {formik.touched.videoLength && formik.errors.videoLength ? (
                                                    <FormFeedback type="invalid">
                                                        {formik.errors.videoLength}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Button disabled={loader === true ? true : false} form="form2" type='submit' color='primary' className="d-flex gap-1 flex-nowrap mt-1" style={{ padding: "15px 30px", borderRadius: "20px", }}>
                                                <span>{'Generate Video'}</span>
                                                {loader === true ?

                                                    <Spinner style={{
                                                        height: '1rem',
                                                        width: '1rem'
                                                    }}
                                                    />
                                                    : null}
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </div>
                        </Col>
                        <Col lg="6" className="h-100">
                            <div className="custom-card-5 dark-theme-custom-card-5 p-4">
                                <CardBody>
                                    <h2 className="text-center font-weight-bold p-1">
                                        Output
                                    </h2>
                                </CardBody>
                                <CardBody>
                                    <Card.Title className="text-uppercase"></Card.Title>
                                    {loader === false && (
                                        <MediaPlayer videoUrl={videoUrl} />
                                    )}
                                    {loader === true && (
                                        <Row xs={12} className='d-flex justify-content-center align-items-center gap-2'>
                                            <Spinner
                                                style={{
                                                    height: '4rem',
                                                    width: '4rem'
                                                }}
                                                animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            <CardHeader className="d-flex text-capitalize justify-content-center align-items-center">
                                                {videoStatus}...
                                            </CardHeader>
                                            <CardHeader className="d-flex justify-content-center align-items-center">Please wait 2 to 5 minutes while we generate your video</CardHeader>
                                        </Row>
                                    )}
                                </CardBody>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container >
        </div >
    )
}

export default TextToVideo