import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {
    CardBody, FormFeedback, Input, Label, Spinner
} from "reactstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import { getAvailableSubtitle, getShortClips, postShortClips } from "../../../redux/actions/createVideoAction";
import { emptyGetClips, emptyPostClips, emptySubtitle } from "../../../redux/slices/createVideoSlice";
import { useNavigate } from "react-router-dom";
import ShortVideoSvg from "../svg/ShortVideoSvg"
import Select from 'react-select';
import { selectThemeColors } from '@utils'
import { ReactToast } from "../../../@core/components/react-toast/ReactToast";
import { subscriptionActions } from "../../../redux/subscription";

const ShortVideo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [postClipsLoader, setPostClipsLoader] = useState(false);
    const [postClipsState, setPostClipsState] = useState(false);
    const [videoID, setVideoID] = useState(null);
    const [checkCaption, setCheckCaption] = useState(false);
    const [subtitleLanguage, setSubtitleLanguage] = useState(null);
    const { postClips, postClipsError } = useSelector((state) => state.createVideo)
    const { getClips, getClipsError } = useSelector((state) => state.createVideo)
    const { getSubtitle, getSubtitleError, getSubtitleLoading } = useSelector((state) => state.createVideo)
    const { subscription_plans_modal } = useSelector((state) => state.subscription)

    const captions = [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ]
    const font = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Helvetica", value: "Helvetica" },
        { label: "Verdana", value: "Verdana" },
        { label: "Tahoma", value: "Tahoma" },
        { label: "Impact", value: "Impact" },
        { label: "Georgia", value: "Georgia" },
        { label: "Comic Sans MS", value: "Comic Sans MS" },
        { label: "Open Sans", value: "Open Sans" },
        { label: "Lato", value: "Lato" },
        { label: "Montserrat", value: "Montserrat" },
        { label: "Source Sans Pro", value: "Source Sans Pro" },
        { label: "PT Sans", value: "PT Sans" },
        { label: "Noto Sans", value: "Noto Sans" },
        { label: "Droid Sans", value: "Droid Sans" },
        { label: "Ubuntu", value: "Ubuntu" },
        { label: "Proxima Nova", value: "Proxima Nova" },
        { label: "DejaVu Serif", value: "DejaVu Serif" },
    ]
    const colours = [
        { label: "Black", value: "&H000000&" },
        { label: "White", value: "&HFFFFFF&" },
        { label: "Red", value: "&H0000FF&" },
        { label: "Green", value: "&H00FF00&" },
        { label: "Blue", value: "&HFF0000&" },
        { label: "Yellow", value: "&H00FFFF&" },
        { label: "Magenta", value: "&HFF00FF&" },
        { label: "Cyan", value: " &HFFFF00&" }
    ]

    const colorStyles = {
        option: (defaultStyles, state) =>
        ({
            ...defaultStyles,
            textShadow: `${state.label === "White" ? '-1px -1px 0 #00000081,  1px -1px 0 #00000081, -1px 1px 0 #00000081, 1px 1px 0 #00000081' : (state.label === "Black" ? '-1px -1px 0 #FFFFF81,  1px -1px 0 #FFFFF81, -1px 1px 0 #FFFFF81, 1px 1px 0 #FFFFF81' : "")}`,
            color: `${state.label} !important`,
        }),
    };

    const fontStyles = {
        option: (defaultStyles, state) =>
        ({
            ...defaultStyles,
            fontFamily: `${state.label} !important`,
        }),
    };

    useEffect(() => {
        if (postClips) {
            if (postClips.video._id && videoID === null) {
                setVideoID(postClips.video._id)
            }
        }
    }, [postClips])

    useEffect(() => {
        if (postClipsError !== null || getClipsError !== null) {
            setLoader(false)
            setVideoID(null)
            setPostClipsLoader(false)
        }
        if (postClipsError) {
            if (postClipsError.includes("Not Enough Credits")) {
                dispatch(
                    subscriptionActions.updateModalState({
                        subscription: !subscription_plans_modal,
                    })
                );
                const upgrade = {
                    upgradeModal: !subscription_plans_modal
                }
                localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
            } else if (postClipsError.includes("Subscription Not Found")) {
                dispatch(
                    subscriptionActions.updateModalState({
                        subscription: !subscription_plans_modal,
                    })
                );
                const upgrade = {
                    upgradeModal: !subscription_plans_modal
                }
                localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
            }
        }
    }, [postClipsError, getClipsError])

    useEffect(() => {
        const timeOutFunc = () => {
            if (getClips && postClips) {
                if (getClips.videos.length > 0) {
                    if (getClips.videos[0].status === "starting") {
                        dispatch(getShortClips(videoID))
                    }
                    if (getClips.videos[0].status === "processing") {

                        if (getClips.videos[0].clips.length > 0) {
                            setPostClipsLoader(false)
                            setLoader(false)
                            navigate({ pathname: "/clipped-video", search: `${videoID}` })
                        } else {
                            dispatch(getShortClips(videoID))
                        }
                    }
                    if (getClips.videos[0].status === "completed") {

                        if (getClips.videos[0].clips.length > 0) {
                            setPostClipsLoader(false)
                            navigate({ pathname: "/clipped-video", search: `${videoID}` })
                        }
                        if (getClips.videos[0].clips.length === 0) {
                            dispatch(getShortClips(videoID))
                        }
                    }
                    if (getClips.videos[0].status === "failed") {
                        setPostClipsLoader(false)
                        setLoader(false)
                        ReactToast({ message: getClips.videos[0].issue, error: true })
                    }
                }
            }
        }
        const interval = setTimeout(timeOutFunc, 20000)
        return () => { clearTimeout(interval) }
    }, [getClips])


    useEffect(() => {
        if (videoID !== null) {
            setTimeout(() => {
                dispatch(getShortClips(videoID))
            }, 5000)
        }
    }, [videoID])

    useEffect(() => {
        if (getSubtitle !== null && getSubtitleError === null && getSubtitleLoading === 'idle') {
            setLoader(false)
            setPostClipsLoader(false)
        }
        if (getSubtitleLoading !== 'idle' && getSubtitleError === null) {
            setLoader(true)
        }
        if (getSubtitleError !== null) {
            setPostClipsLoader(false)
            setLoader(false)
        }
        if (getSubtitle) {
            setSubtitleLanguage(getSubtitle.languages)
            setPostClipsLoader(true)
            setPostClipsState(true)
        }
    }, [getSubtitleLoading, getSubtitle])

    const validation = ({
        url: Yup.string()
            .matches(
                /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
                'Enter youtube url!'
            )
            .required('Please enter a valid website'),
        addCaptions: Yup.boolean(),
        colour: Yup.string().when('addCaptions', {
            is: true,
            then: Yup.string().required('Colour is required'),
            otherwise: Yup.string()
        }),
        fontFamily: Yup.string().when('addCaptions', {
            is: true,
            then: Yup.string().required('Font family is required'),
            otherwise: Yup.string()
        }),
        languageCode: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            url: '',
            addCaptions: false,
            colour: '',
            fontFamily: '',
            languageCode: '',
        },
        validationSchema: Yup.object(validation),
        validateOnChange: true,
        onSubmit: (values, actions) => {
            dispatch(emptyPostClips());
            dispatch(emptyGetClips())
            if (values.languageCode === '' && postClipsState === true) {
                const errors = {};
                errors.languageCode = "Subtitle Language is required"
                return formik.setErrors(errors);
            }
            actions.setFieldValue('url', values.url);
            actions.setFieldValue('languageCode', values.languageCode)
            if (values.addCaptions === true) {
                actions.setFieldValue('addCaptions', values.addCaptions);
                actions.setFieldValue('colour', values.colour)
                actions.setFieldValue('fontFamily', values.fontFamily);
            }
            setLoader(true)
            setVideoID(null)
            if (getSubtitle === null) {
                const data = {
                    url: values.url
                }
                dispatch(getAvailableSubtitle(data))
                actions.setSubmitting(true)
            } else {
                dispatch(postShortClips(values))
                dispatch(emptySubtitle())
                actions.setSubmitting(true)
            }
        }
    });

    const handleAddCaptionsSelect = (value) => {
        if (!value) {
            formik.values.fontFamily = ''
            formik.values.colour = ''
            formik.values.addCaptions = false
            setCheckCaption(false)
            return
        }
        if (value.value !== false) {
            setCheckCaption(true)
        }
        if (value.value === false) {
            setCheckCaption(false)
        }
        formik.handleChange('addCaptions')
        formik.values.addCaptions = value.value
        formik.getFieldProps('addCaptions')
    }

    const handleFontSelect = (value) => {
        if (!value) {
            formik.handleChange('fontFamily')
            formik.values.fontFamily = ''
            formik.getFieldProps('fontFamily')
            return
        }
        formik.handleChange('fontFamily')
        formik.values.fontFamily = value.value
        formik.getFieldProps('fontFamily')
    }
    const handleColourSelect = (value) => {

        if (!value) {
            formik.handleChange('colour')
            formik.values.colour = ''
            formik.getFieldProps('colour')
            return
        }
        formik.handleChange('colour')
        formik.values.colour = value.value
        formik.getFieldProps('colour')
    }

    const handleSubtitleChange = (value) => {
        if (!value) {
            formik.handleChange('languageCode')
            formik.values.languageCode = ''
            formik.getFieldProps('languageCode')
            return
        }
        formik.handleChange('languageCode')
        formik.values.languageCode = value.value
        formik.getFieldProps('languageCode')
    }

    return (
        <div>
            <div className="spinner"></div>
            <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
                <div className="breadCrumb-custom dark-breadCrumb-custom">
                    <ShortVideoSvg />
                    <BreadCrumbs title="Short Clips" data={[{ title: "Create Video", link: "/create-video" }, { title: "Short Clips" }]} />
                </div>
                <div className="inner-parent-child dark-inner-parent-child">
                    <div className="custom-card-video dark-custom-card-video">
                        <Row className="justify-content-center">
                            <Col lg={10}>
                                <CardBody >
                                    <h2 className="text-center">Drop a video Link</h2>
                                    <Form id="form3" onSubmit={formik.handleSubmit} className="mt-1 " >
                                        <div className="form-group position-relative">
                                            <Label hidden>Drop a video Link</Label>
                                            <div className="input-affix">
                                                <Input
                                                    disabled={postClipsLoader ? true : false}
                                                    type="url"
                                                    className="form-control"
                                                    id="url"
                                                    placeholder="Paste Youtube Website URL"
                                                    invalid={formik.touched.url &&
                                                        formik.errors.url ? true : false}
                                                    {...formik.getFieldProps('url')} onChange={formik.handleChange('url')} onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.url && formik.errors.url ? (
                                                    <FormFeedback type="invalid">
                                                        {formik.errors.url}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                            <div className="form-group position-absolute top-0" style={{ right: "0" }}>
                                                <Button disabled={loader === true ? true : false} type="submit" form="form3" className="w-100 d-flex gap-1 justify-content-center align-items-center" style={{ padding: "27px 30px", borderRadius: "24px" }}>
                                                    <span>{!getSubtitle || !postClips || !getClips ? 'Submit' : 'Start Clipping'}</span>
                                                    {loader === true ?
                                                        <Spinner style={{
                                                            height: '1rem',
                                                            width: '1rem'
                                                        }}
                                                        />
                                                        : null}
                                                </Button>
                                            </div>
                                        </div>
                                        {
                                            getSubtitleError && (
                                                <Row lg={12} className="m-auto">
                                                    <Col lg={6}>
                                                        <h3 className="d-flex justify-content-center align-items-center">There was an error with your link. kindly upload another video link</h3>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                        {
                                            getSubtitle && (
                                                <Row lg={12} className="m-auto">
                                                    <Col lg={6}>
                                                        <Label className='form-label'>Subtitle Language</Label>
                                                        <Select
                                                            menuPlacement="bottom"
                                                            theme={selectThemeColors}
                                                            className='react-select dark-react-select'
                                                            classNamePrefix='select'
                                                            name='languageCode'
                                                            id='languageCode'
                                                            onBlur={formik.handleBlur}
                                                            onChange={(e) => handleSubtitleChange(e)}
                                                            options={subtitleLanguage}
                                                            placeholder="Select Subtitle Language"
                                                            isClearable
                                                            invalid={formik.touched.languageCode &&
                                                                formik.errors.languageCode ? true : false}
                                                        />
                                                        {formik.touched.languageCode && formik.errors.languageCode ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.languageCode}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Label className='form-label'>Add Captions</Label>
                                                        <Select
                                                            menuPlacement="bottom"
                                                            theme={selectThemeColors}
                                                            className='react-select dark-react-select'
                                                            classNamePrefix='select'
                                                            name='addCaptions'
                                                            id='addCaptions'
                                                            onBlur={formik.handleBlur}
                                                            onChange={(value) => handleAddCaptionsSelect(value)}
                                                            options={captions}
                                                            placeholder="Add Captions"
                                                            isClearable
                                                            invalid={formik.touched.addCaptions &&
                                                                formik.errors.addCaptions ? true : false}
                                                        />
                                                        {formik.touched.addCaptions && formik.errors.addCaptions ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.addCaptions}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    {checkCaption === true ? (
                                                        <>
                                                            <Col lg={6}>
                                                                <Label className='form-label'>Select Font</Label>
                                                                <Select
                                                                    menuPlacement="top"
                                                                    theme={selectThemeColors}
                                                                    className='react-select dark-react-select'
                                                                    classNamePrefix='select'
                                                                    name='fontFamily'
                                                                    id='fontFamily'
                                                                    onBlur={formik.handleBlur}
                                                                    onChange={(value) => handleFontSelect(value)}
                                                                    styles={fontStyles}
                                                                    options={font}
                                                                    placeholder="Select Font Family..."
                                                                    isClearable
                                                                    invalid={formik.touched.fontFamily &&
                                                                        formik.errors.fontFamily ? true : false}
                                                                />
                                                                {formik.touched.fontFamily && formik.errors.fontFamily ? (
                                                                    <FormFeedback type="invalid">
                                                                        {formik.errors.fontFamily}
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Label className='form-label'>Select Color</Label>
                                                                <Select
                                                                    menuPlacement="top"
                                                                    theme={selectThemeColors}
                                                                    className='react-select dark-react-select'
                                                                    classNamePrefix='select'
                                                                    name='colour'
                                                                    id='colour'
                                                                    onBlur={formik.handleBlur}
                                                                    onChange={(value) => handleColourSelect(value)}
                                                                    styles={colorStyles}
                                                                    options={colours}
                                                                    placeholder="Select Color"
                                                                    isClearable
                                                                    invalid={formik.touched.colour &&
                                                                        formik.errors.colour ? true : false}
                                                                />
                                                                {formik.touched.colour && formik.errors.colour ? (
                                                                    <FormFeedback type="invalid">
                                                                        {formik.errors.colour}
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </>
                                                    ) : null}
                                                </Row>
                                            )
                                        }
                                    </Form>
                                </CardBody>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container >
        </div >
    )
}

export default ShortVideo