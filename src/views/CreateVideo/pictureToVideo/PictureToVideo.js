import { Card, CardBody, CardHeader, CardText, Container, Form, FormFeedback, Input, Spinner } from "reactstrap";
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Nav, NavLink, TabContent, TabPane, Button, Label, InputGroup } from 'reactstrap';
import { Plus } from "react-feather";
import TextArea from "./TextArea";
import { useFormik } from "formik";
import Breadcrumbs from "@components/breadcrumbs";
import AudioInput from "./AudioInput";
import { useDispatch, useSelector } from "react-redux";
import { createAvatarLanguage, getCreateAvatar } from "../../../redux/actions/createVideoAction";
import ShowVideoModal from "./ShowVideoModal";
import { Language, VideoDimensions, Voices } from "./SelectOption";
import { FormikFormData } from "./FormikFormData";
import * as Yup from 'yup';
import { emptyGetAvatar } from "../../../redux/slices/createVideoSlice";
import { NumeralInterferenceSteps, GuidanceScale, NumberOfImages } from "./NumeralInput";
import TextSvg from "../svg/TextSvg";
import VoiceSvg from "../svg/VoiceSvg";
import PresenterSvg from "../svg/PresenterSvg";
import AIPresenterSvg from "../svg/AIPresenterSvg";
import PictureToVideoSvg from "../svg/PictureToVideoSvg";
import PictureToVideoArrowSvg from "../svg/PictureToVideoArrowSvg";
import english from "./svg/english.png"
import spanish from "./svg/spain.png"
import italy from "./svg/italy.png"
import france from "./svg/france.png"
import UploadSvg from "./svg/UploadSvg"
import CancelSvg from "./svg/CancelSvg";
import { ReactToast } from "../../../@core/components/react-toast/ReactToast";
import { subscriptionActions } from "../../../redux/subscription";

const PictureToVideo = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [active, setActive] = useState(null)
    const [loader, setLoader] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const presenterInputRef = useRef(null);
    const aiPresenterInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState('tab1');
    const [activeTab2, setActiveTab2] = useState('tab3');
    const [presenter, setPresenter] = useState([{ id: 1, avatar: "https://i.ibb.co/3SwGxPj/layout-1.jpg" }, { id: 2, avatar: "https://i.ibb.co/16LYHY4/layout-2.jpg" }, { id: 3, avatar: "https://i.ibb.co/h9MZnKs/layout-3.jpg" }, { id: 4, avatar: "https://i.ibb.co/17d26LT/layout-4.jpg" }, { id: 5, avatar: "https://i.ibb.co/8NwkDwx/layout-5.jpg" }, { id: 6, avatar: "https://i.ibb.co/FW7VFqX/layout-6.jpg" }]);
    const [aiPresenter, setAIPresenter] = useState([{ id: 1, aiAvatar: "https://i.ibb.co/ryPqphx/download-8.jpg" }, { id: 2, aiAvatar: "https://i.ibb.co/C2B5MCL/download-7.jpg" }, { id: 3, aiAvatar: "https://i.ibb.co/9nVWxwK/download-6.jpg" }, { id: 4, aiAvatar: "https://i.ibb.co/NVJvWmG/download-5.jpg" }, { id: 5, aiAvatar: "https://i.ibb.co/q0hdDhn/download-2.jpg" }, { id: 6, aiAvatar: "https://i.ibb.co/FmyHnqp/download-1.jpg" }]);
    const [uploadAIPresenter, setUploadAIPresenter] = useState(null)
    const [language, setLanguage] = useState(null)
    const [languageName, setLanguageName] = useState('')
    const [filterObject, setFilterObject] = useState('')
    const [avatarCreationLoader, setAvatarCreationLoader] = useState(false)
    const [openAIPresenterBox, setOpenAIPresenterBox] = useState(false)
    const [imageName, setImageName] = useState(null)

    const { postVideo, postVideoLoading, postVideoError } = useSelector((state) => state.createVideo)
    const { getVideo, getVideoLoading, getVideoError } = useSelector(state => state.createVideo)
    const { getLanguage, languageLoading } = useSelector((state) => state.createVideo)
    const { postAvatar, postAvatarLoading, postAvatarError } = useSelector(state => state.createVideo)
    const { getAvatar, getAvatarLoading, getAvatarError } = useSelector(state => state.createVideo)
    const { subscription_plans_modal } = useSelector((state) => state.subscription)


    useEffect(() => {
        if (languageLoading === "idle" && getLanguage) {
            let newArray = []
            for (let i = 0; i < getLanguage.languages.length; i++) {

                if (getLanguage.languages[i].name === "English") {
                    newArray.push({ value: getLanguage.languages[i].name, label: getLanguage.languages[i].name, icon: english })
                }
                if (getLanguage.languages[i].name === "Spanish") {
                    newArray.push({ value: getLanguage.languages[i].name, label: getLanguage.languages[i].name, icon: spanish })
                }
                if (getLanguage.languages[i].name === "Italian") {
                    newArray.push({ value: getLanguage.languages[i].name, label: getLanguage.languages[i].name, icon: italy })
                }
                if (getLanguage.languages[i].name === "French") {
                    newArray.push({ value: getLanguage.languages[i].name, label: getLanguage.languages[i].name, icon: france })
                }

            }
            setLanguage(newArray)
        } else {
            dispatch(createAvatarLanguage())
        }
    }, [getLanguage])

    useEffect(() => {
        if (getVideoLoading === 'pending' && getVideoError === null && getVideo === null) {
            setShow(true)
        } else if (getVideoLoading === 'idle' && getVideoError !== null && getVideo !== null) {
            setShow(false)
        }
    }, [getVideoError, getVideoLoading, getVideo])

    useEffect(() => {
        if (postVideoError === null && postVideoLoading === 'pending') {
            setLoader(true)
        } else if (postVideoError !== null && postVideoLoading === 'idle') {
            setLoader(false)
            setShow(false)
        }
        if (postVideo !== null) {
            setVideoId(postVideo?.data?.id)
        }
        if (postVideoError) {
            if (postVideoError.includes("Insufficient Credit")) {
                dispatch(
                    subscriptionActions.updateModalState({
                        subscription: !subscription_plans_modal,
                    })
                );
                let upgrade = {
                    upgradeModal: !subscription_plans_modal
                }
                localStorage.setItem("upgradeModal", JSON.stringify(upgrade))

            } else if (postVideoError.includes("Subscription Not Found")) {
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
    }, [postVideo, postVideoError, postVideoLoading])

    useEffect(() => {
        if (getLanguage) {
            let languageData = getLanguage.languages.find((item) => item.name === languageName)
            if (languageData) {
                setFilterObject(languageData)
            }
        }
    }, [languageName])

    useEffect(() => {
        const timeOutFunc = () => {
            if (postAvatar !== null) {
                dispatch(getCreateAvatar(postAvatar.data.sdGenerationJob.generationId))
            }
        }
        const interval = setTimeout(timeOutFunc, 8000)
        return () => { clearTimeout(interval) }
    }, [postAvatar])

    useEffect(() => {
        if (postAvatarLoading === 'pending') {
            setAvatarCreationLoader(true)
            setOpenAIPresenterBox(true)
        }
        if (postAvatarError !== null) {
            setAvatarCreationLoader(false)
            setOpenAIPresenterBox(true)
        }
    }, [postAvatarLoading, postAvatarError])

    useEffect(() => {
        if (getAvatarError !== null) {
            setOpenAIPresenterBox(true)
            setAvatarCreationLoader(true)
        }
        if (getAvatar !== null) {
            setAvatarCreationLoader(true)
            if (getAvatar.avatars) {
                if (getAvatar.avatars.generations_by_pk !== null) {
                    if (getAvatar.avatars.generations_by_pk.generated_images.length > 0) {
                        setOpenAIPresenterBox(false)
                        setAvatarCreationLoader(false)
                        let aiUrl = getAvatar.avatars.generations_by_pk.generated_images
                        for (let i = 0; i < aiUrl.length; i++) {
                            aiPresenter.push({ id: aiPresenter.length + 1, aiAvatar: aiUrl[i].url });
                        }

                    }
                }
            }
        }
    }, [getAvatar, getAvatarError])

    const tab2ValidationSchema = ({
        aiTextAvatar: Yup.string().required('Text is required to generate'),
        audio: Yup.mixed().notRequired().nullable(),
        source: Yup.string().notRequired(),
        image: Yup.mixed().notRequired(),
        providerType: Yup.string().notRequired(),
        providerVoiceId: Yup.string().notRequired(),
        imageRatioType: Yup.string().required('Aspect ratio is required'),
        uploadAIAvatar: Yup.mixed().notRequired().nullable(),
        extension: Yup.string().notRequired(),
        numOfImages: Yup.number()
            .min(1, 'Number must be between 1 and 4')
            .max(4, 'Number must be between 1 and 4')
            .required('Number of image is required'),
        negativePrompt: Yup.string().required("Negative Prompt is required"),
        numInferenceSteps: Yup.number()
            .min(30, 'Number must be between 30 and 60')
            .max(60, 'Number must be between 30 and 60')
            .required('Numeral inference steps is required'),
        tiling: Yup.string().notRequired(),
        guidanceScale: Yup.number()
            .min(1, 'Number must be between 1 and 20')
            .max(20, 'Number must be between 1 and 20')
            .required('Guidance scale is required. 7 is recommended'),
        promptMagic: Yup.string().notRequired(),
    })

    // Validation schema for Tab
    const tab3ValidationSchema = ({
        textarea: Yup.string().required('Text is required').max(4000, 'Textarea cannot exceed 4000 characters'),
        audio: Yup.mixed().notRequired().nullable(),
        source: Yup.string().when('image', {
            is: undefined,
            then: Yup.string().required('Image is required'),
            otherwise: Yup.string().notRequired()
        }),
        image: Yup.mixed().test('image-or-source', 'Image is required', function (value) {
            const { image, source } = this.parent;
            if (!value && !image && !source) {
                return this.createError({
                    path: 'image',
                    message: 'Image is required'
                });
            }
            return true;
        }).nullable(),
        providerType: Yup.string().required('Language is required'),
        providerVoiceId: Yup.string().required('Voice is required'),
        imageRatioType: Yup.string().notRequired(),
        uploadAIAvatar: Yup.mixed().notRequired().nullable(),
        extension: Yup.string().notRequired(),
        numOfImages: Yup.string().notRequired(),
        negativePrompt: Yup.string().notRequired(),
        numInferenceSteps: Yup.string().notRequired(),
        tiling: Yup.string().notRequired(),
        guidanceScale: Yup.string().notRequired(),
        promptMagic: Yup.string().notRequired(),
    });
    const tab4ValidationSchema = ({
        textarea: Yup.string().notRequired(),
        audio: Yup.mixed().test('audio-or-text', 'Audio is required', function (value) {
            const { audio } = this.parent;
            if (!value && !audio) {
                return this.createError({
                    path: 'audio',
                    message: 'Audio is required'
                });
            }
            return true;
        }).nullable(),
        source: Yup.string().when('image', {
            is: undefined,
            then: Yup.string().required('Image is required'),
            otherwise: Yup.string().notRequired()
        }),
        image: Yup.mixed().test('image-or-source', 'Image is required', function (value) {
            const { source } = this.parent;
            if (!value && !source) {
                return this.createError({
                    path: 'image',
                    message: 'Image is required'
                });
            }
            return true;
        }).nullable(),
        providerType: Yup.string().notRequired(),
        providerVoiceId: Yup.string().notRequired(),
        imageRatioType: Yup.string().notRequired(),
        uploadAIAvatar: Yup.mixed().notRequired().nullable(),
        extension: Yup.string().notRequired(),
        numOfImages: Yup.string().notRequired(),
        negativePrompt: Yup.string().notRequired(),
        numInferenceSteps: Yup.string().notRequired(),
        tiling: Yup.string().notRequired(),
        guidanceScale: Yup.string().notRequired(),
        promptMagic: Yup.string().notRequired(),
    });



    const validationSchema = openAIPresenterBox === true ? tab2ValidationSchema : (activeTab2 === 'tab3' ? tab3ValidationSchema : tab4ValidationSchema)

    const formik = useFormik({
        initialValues: {
            audio: null,
            textarea: '',
            aiText: '',
            image: null,
            source: '',
            providerType: '',
            providerVoiceId: '',
            aiTextAvatar: '',
            ai: false,
            tab: '',
            imageRatioType: '',
            uploadAIAvatar: null,
            extension: '',
            numOfImages: '',
            negativePrompt: '',
            numInferenceSteps: '',
            tiling: true,
            guidanceScale: '',
            promptMagic: false,
        },
        validationSchema: Yup.object(validationSchema),
        validateOnChange: false,
        onSubmit: (values, actions) =>
            FormikFormData(values, actions, dispatch),
    });

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setOpenAIPresenterBox(false)
            setActiveTab(tab);
        }
    };

    const toggleTab2 = (tab2) => {
        if (activeTab2 !== tab2) {
            formik.values.tab = tab2
            setActiveTab2(tab2);
        }
    };

    const handleAvatarClick = (image) => {
        setActive(image)
        if (image.avatarObject) {
            formik.values.ai = false
            formik.values.image = image.avatarObject
            formik.values.source = ''
            formik.getFieldProps('image')
        } else if (typeof image.aiAvatar === 'string') {
            formik.values.ai = true
            formik.values.source = image.aiAvatar
            formik.values.image = null
            formik.getFieldProps('source')
        } else if (typeof image.avatar === 'string') {
            formik.values.ai = false
            formik.values.image = null
            formik.values.source = image.avatar
            formik.getFieldProps('source')
        }
    }

    const handlePresenterClick = () => {
        presenterInputRef.current.click();
    };

    // const handleUploadAIPresenterClick = () => {
    //     aiPresenterInputRef.current.click();
    // };

    const handlePresenterChange = (event) => {
        let selectedFile = event.target.files[0];
        setActive(URL.createObjectURL(selectedFile))
        if (presenter.length) {
            setPresenter([...presenter, { id: presenter.length + 1, avatar: URL.createObjectURL(selectedFile), avatarObject: selectedFile }])
        } else {
            setPresenter([{ id: presenter.length + 1, avatar: URL.createObjectURL(selectedFile), avatarObject: selectedFile }])
        }
    };

    const handleUploadAIPresenterChange = (event) => {
        if (event !== 'delete') {
            let selectedFile = event.target.files[0];
            const imgName = selectedFile.name;
            setImageName(imgName)
            // Extract the image extension
            const imageExtension = imgName.substring(imgName.lastIndexOf('.') + 1);
            formik.values.extension = imageExtension
            formik.values.uploadAIAvatar = selectedFile
            setUploadAIPresenter({ id: 1, aiUploadAvatar: URL.createObjectURL(selectedFile), aiUploadAvatarObject: selectedFile })
        } else {
            setUploadAIPresenter(null);
            setImageName(null)
            formik.values.extension = ''
            formik.values.uploadAIAvatar = null
        }
    };

    const handleAIPresenterOpen = () => {
        if (getAvatar?.avatars?.generations_by_pk?.generated_images.length > 0) {
            dispatch(emptyGetAvatar)
        }
        setOpenAIPresenterBox(!openAIPresenterBox)
    }

    return (
        <Container className="parent-card-2 dark-theme-parent-card-2">
            <div className="breadCrumb-custom dark-breadCrumb-custom">
                <PictureToVideoSvg />
                <Breadcrumbs title="Picture To Video" data={[{ title: "Create Video", link: "/create-video" }, { title: "Picture to Video" }]} />
            </div>
            <div className="inner-parent-child">
                <Form id="form1" onSubmit={formik.handleSubmit}>
                    <div className="custom-card-1 dark-custom-card-1">
                        <Nav tabs className="navlink-1 dark-navlink-1">
                            <div className="navlink-buttons d-flex text-right gap-1">
                                <NavLink
                                    onClick={() => toggleTab('tab1')}
                                    to="/upload-text"
                                    className={activeTab === 'tab1' ? "custom-button-active" : "custom-button-not-active"}
                                >
                                    <PresenterSvg color={activeTab === 'tab1' ? "#ffffff" : "#177ffa"} />
                                    <CardText>Choose a presenter</CardText>
                                </NavLink>
                                <NavLink
                                    to="/upload-audio"
                                    className={activeTab === 'tab2' ? "custom-button-active" : "custom-button-not-active"}
                                    onClick={() => toggleTab('tab2')}
                                >
                                    <AIPresenterSvg color={activeTab === 'tab2' ? "#ffffff" : "#177ffa"} />
                                    <CardText>Choose an AI presenter</CardText>
                                </NavLink>
                            </div>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="tab1">
                                <div className="position-relative w-100">
                                    <div className="d-flex flex-nowrap overflow-hidden gap-2 justify-content-start">
                                        <div className="image-item-container dark-image-item-container">
                                            <div onClick={handlePresenterClick} className="image-item d-flex justify-content-center flex-column shadow-sm cursor-pointer hover:shadow-lg align-content-center align-items-center shadow-4"
                                                style={{ minWidth: "105px", minHeight: "105px", gap: "1px", backgroundColor: "#177ffa" }}>
                                                <Plus className="text-white mt-1" style={{ width: "15px" }} />
                                                <CardText className="text-white font-small-4">ADD</CardText>
                                                <Input
                                                    type="file"
                                                    name="avatar"
                                                    className={`d-none ${active !== null ? `selected` : ``}`}
                                                    innerRef={presenterInputRef}
                                                    onChange={handlePresenterChange}
                                                    invalid={formik.touched.image &&
                                                        formik.errors.image ? true : false}
                                                />
                                            </div>

                                        </div>

                                        {presenter.length > 0 && (
                                            presenter.map((image, index) => {
                                                return (
                                                    <div className="image-item-container dark-image-item-container" key={index}>
                                                        <img onClick={() => handleAvatarClick(image)} className={`image-item object-fit-contain shadow-4 cursor-pointer ${active == image ? 'selected' : ''}`}
                                                            style={{ width: "105px", height: "105px" }} src={image.avatar} alt="avatar" />
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                    <div className="arrow-button">
                                        <Button type="button" color="none" className="p-0"><PictureToVideoArrowSvg /></Button>
                                    </div>
                                    {formik.touched.image && formik.errors.image ? (
                                        <FormFeedback type="invalid">
                                            {formik.errors.image}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </TabPane>
                            <TabPane tabId="tab2">
                                <CardBody className="overflow-hidden d-flex flex-nowrap gap-2 justify-content-left align-items-center position-relative">
                                    <div className="image-item-container dark-image-item-container">
                                        <Button
                                            type="button"
                                            onClick={() => handleAIPresenterOpen()}
                                            className="image-item d-flex justify-content-center flex-column shadow-sm cursor-pointer hover:shadow-lg align-content-center align-items-center shadow-4"
                                            style={{ minWidth: "105px", minHeight: "105px", gap: "1px", backgroundColor: "#177ffa !important" }}
                                            invalid={formik.touched.source &&
                                                formik.errors.source ? true : false}
                                        >
                                            <Plus className="text-white w-25" />
                                            <CardText className="text-white">Create</CardText>
                                        </Button>

                                    </div>
                                    {aiPresenter.length > 0 && (
                                        aiPresenter.map((image, index) => {
                                            return (
                                                <div key={index} onClick={formik.handleChange('avatar')} className="image-item-container dark-image-item-container position-relative">
                                                    <img onClick={() => handleAvatarClick(image)} className={`image-item shadow-4 cursor-pointer object-fit-contain ${active == image ? 'selected' : ''}`} style={{ width: "105px", height: "105px" }} src={image.aiAvatar} alt="avatar" />
                                                </div>
                                            )
                                        })
                                    )}
                                    <div className="arrow-button">
                                        <Button type="button" color="none" className="p-0"><PictureToVideoArrowSvg /></Button>
                                    </div>
                                    {formik.touched.source && formik.errors.source ? (
                                        <FormFeedback type="invalid">
                                            {formik.errors.source}
                                        </FormFeedback>
                                    ) : null}

                                </CardBody>
                                {openAIPresenterBox === true && activeTab === 'tab2' ? (
                                    <div className="custom-card-5 dark-theme-custom-card-5" >
                                        <CardHeader><span className="font-medium-2">Generate your own AI presenter</span></CardHeader>
                                        {postAvatarLoading === 'pending' || avatarCreationLoader === true || getAvatarLoading === 'pending' ? (
                                            <div className="">
                                                <div style={{ width: "100%", display: "flex", flexDirection: "flex-row", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                                                    <Spinner style={{ width: "5rem", height: "5rem" }} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="">
                                                <Col>
                                                    <Row md='12' sm='12'>
                                                        <Col md='12' sm='12'>
                                                            <Label className='form-label' for='inputFile'>
                                                                What describe best for you to create
                                                            </Label>
                                                            <InputGroup>
                                                                <Input
                                                                    id="aiTextAvatar"
                                                                    name="aiTextAvatar"
                                                                    {...formik.getFieldProps('aiTextAvatar')}
                                                                    onChange={formik.handleChange('aiTextAvatar')}
                                                                    type='text'
                                                                    placeholder="Describe here"
                                                                    invalid={formik.touched.aiTextAvatar &&
                                                                        formik.errors.aiTextAvatar ? true : false}
                                                                />

                                                            </InputGroup>
                                                            {formik.touched.aiTextAvatar && formik.errors.aiTextAvatar ? (
                                                                <FormFeedback type="invalid">
                                                                    {formik.errors.aiTextAvatar}
                                                                </FormFeedback>
                                                            ) : null}
                                                        </Col>
                                                    </Row>
                                                    <Row md='8' sm='12'>
                                                        <Col md='6' sm='12'>
                                                            <div className='w-full mb-1 mt-1'>
                                                                <Label className='form-label' for='inputFile'>
                                                                    Negative Prompt
                                                                </Label>
                                                                <Input
                                                                    id="negativePrompt"
                                                                    name="negativePrompt"
                                                                    {...formik.getFieldProps('negativePrompt')}
                                                                    onChange={formik.handleChange('negativePrompt')}
                                                                    type='text'
                                                                    placeholder="Used for and helps in image generation"
                                                                    invalid={formik.touched.negativePrompt &&
                                                                        formik.errors.negativePrompt ? true : false}
                                                                />
                                                                {formik.touched.negativePrompt && formik.errors.negativePrompt ? (
                                                                    <FormFeedback type="invalid">
                                                                        {formik.errors.negativePrompt}
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col md='6' sm='12'>
                                                            <VideoDimensions formik={formik} />
                                                        </Col>
                                                    </Row>
                                                    <Row md='8' sm='12'>
                                                        <Col md='6' sm='12'>
                                                            <InputGroup>
                                                                <Label className='form-label'>
                                                                    Upload your own photo (optional)
                                                                </Label>
                                                                <Input
                                                                    type='file'
                                                                    id='inputFile'
                                                                    name='fileInput'
                                                                    hidden
                                                                    inputMode="none"
                                                                    innerRef={aiPresenterInputRef}
                                                                    onChange={handleUploadAIPresenterChange}
                                                                />
                                                                <div className="custom-upload-input dark-custom-upload-input" >
                                                                    <p className="text dark-text">
                                                                        {imageName !== null ? (
                                                                            <span onClick={() => handleUploadAIPresenterChange('delete')} style={{ cursor: "pointer" }}>
                                                                                <CancelSvg />
                                                                            </span>
                                                                        ) : null}
                                                                        <Label className="form-label position-absolute" for='inputFile' style={{ top: "20px", right: "30px", cursor: "pointer" }}>
                                                                            <UploadSvg />
                                                                        </Label>
                                                                        <span>{imageName !== null ? imageName : "Choose Upload"}</span>
                                                                    </p>
                                                                </div>
                                                            </InputGroup>

                                                        </Col>
                                                        <Col md='6' sm='12'>
                                                            <NumberOfImages formik={formik} />
                                                        </Col>
                                                    </Row>
                                                    <Row md='8' sm='12'>
                                                        <Col md='6' sm='12'>
                                                            <NumeralInterferenceSteps formik={formik} />
                                                        </Col>
                                                        <Col md='6' sm='12'>
                                                            <GuidanceScale formik={formik} />
                                                        </Col>
                                                    </Row>
                                                    <Row md='8' sm='12'>
                                                        <Col md='6' sm='12'>
                                                            <Label for='switch-primary' className='form-check-label mb-50'>
                                                                Tiling
                                                            </Label>
                                                            <div className='form-switch form-check-primary'>
                                                                <Input
                                                                    type='switch'
                                                                    id='switch-primary'
                                                                    name='primary'
                                                                    {...formik.getFieldProps('tiling')}
                                                                    onChange={formik.handleChange('tiling')}
                                                                    defaultChecked={formik.values.tiling}
                                                                    invalid={formik.touched.tiling &&
                                                                        formik.errors.tiling ? true : false}
                                                                />
                                                                {formik.touched.tiling && formik.errors.tiling ? (
                                                                    <FormFeedback type="invalid">
                                                                        {formik.errors.tiling}
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col md='6' sm='12'>
                                                            <Label for='switch-primary' className='form-check-label mb-50'>
                                                                Prompt Magic
                                                            </Label>
                                                            <div className='form-switch form-check-primary'>
                                                                <Input
                                                                    type='switch'
                                                                    id='switch-primary'
                                                                    name='primary'
                                                                    {...formik.getFieldProps('promptMagic')}
                                                                    onChange={formik.handleChange('promptMagic')}
                                                                    defaultChecked={formik.values.promptMagic}
                                                                    invalid={formik.touched.tiling &&
                                                                        formik.errors.tiling ? true : false}
                                                                />
                                                                {formik.touched.promptMagic && formik.errors.promptMagic ? (
                                                                    <FormFeedback type="invalid">
                                                                        {formik.errors.promptMagic}
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                </Col>
                                                <div className="d-flex gap-1">
                                                    <Button onClick={() => handleAIPresenterOpen()} type='button' color='danger' className="d-flex gap-1 flex-nowrap mt-1" style={{ padding: "15px 30px", borderRadius: "20px" }}>
                                                        Cancel
                                                    </Button>
                                                    <Button disabled={loader === true ? true : false} form="form1" type='submit' color='primary' className="d-flex gap-1 flex-nowrap mt-1" style={{ padding: "15px 30px", borderRadius: "20px" }}>
                                                        <span>{'Generate'}</span>
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
                                        )}
                                    </div>
                                ) : null}
                            </TabPane>
                        </TabContent>
                    </div>
                    <div className="custom-card-2 dark-custom-card-2">
                        <Row>
                            <Col lg={6}>
                                <div className="custom-card-6 dark-custom-card-6">
                                    <Nav tabs className="navlink-2 dark-navlink-2">
                                        <div className="navlink-buttons d-flex text-right gap-1">
                                            <NavLink
                                                onClick={() => toggleTab2('tab3')}
                                                to="/upload-text"
                                                className={activeTab2 === 'tab3' ? "custom-button-active" : "custom-button-not-active"}
                                            >
                                                <TextSvg color={activeTab2 === 'tab3' ? "#ffffff" : "#177ffa"} />
                                                <CardText>Type Your Script</CardText>
                                            </NavLink>
                                            <NavLink
                                                to="/upload-audio"
                                                className={activeTab2 === 'tab4' ? "custom-button-active" : "custom-button-not-active"}
                                                onClick={() => toggleTab2('tab4')}
                                            >
                                                <VoiceSvg color={activeTab2 === 'tab4' ? "#ffffff" : "#177ffa"} />
                                                <CardText>Upload Voice Audio</CardText>
                                            </NavLink>
                                        </div>
                                    </Nav>

                                    <TabContent activeTab={activeTab2}>
                                        <TabPane tabId="tab3">
                                            <div className="w-full">
                                                <TextArea formik={formik} />
                                                <Language formik={formik} language={language} languageName={languageName} setLanguageName={setLanguageName} />
                                                <Voices formik={formik} voices={filterObject} />
                                            </div>
                                            <div className="py-1">
                                                <CardBody>
                                                    <Button disabled={loader === true ? true : false} form="form1" type='submit' color='primary' className="d-flex gap-1 flex-nowrap mt-1" style={{ padding: "15px 30px", borderRadius: "20px", }}>
                                                        <span>{'Generate Video'}</span>
                                                        {loader === true ?
                                                            <Spinner style={{
                                                                height: '1rem',
                                                                width: '1rem'
                                                            }}
                                                            />
                                                            : null}
                                                    </Button>
                                                </CardBody>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="tab4">
                                            <div>
                                                <AudioInput formik={formik} />
                                            </div>
                                            <div className="py-1">
                                                <CardBody>
                                                    <Button disabled={loader === true ? true : false} form="form1" type='submit' color='primary' className="d-flex gap-1 flex-nowrap mt-1" style={{ padding: "15px 30px", borderRadius: "20px", }}>
                                                        <span>{'Generate Video'}</span>
                                                        {loader === true ?
                                                            <Spinner style={{
                                                                height: '1rem',
                                                                width: '1rem'
                                                            }}
                                                            />
                                                            : null}
                                                    </Button>
                                                </CardBody>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="custom-card-6 dark-custom-card-6">
                                    <ShowVideoModal show={show} setShow={setShow} setCreatingLoader={setLoader} videoId={videoId} />
                                </div>
                            </Col>
                        </Row >
                    </div>
                </Form >
            </div >
        </Container >
    );
};

export default PictureToVideo
