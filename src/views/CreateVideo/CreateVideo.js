import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumbs from '../../@core/components/breadcrumbs'
import CreateVideoCards from './CreateVideoCards'
import PictureToVideo from './pictureToVideo/PictureToVideo'
import TextToVideo from "./textToVideo/TextToVideo"
import { useLocation } from 'react-router-dom'
import ShortVideo from './shortVideo/ShortVideo'
import CreateVideoSvg from './svg/CreateVideoSvg'

const CreateVideo = () => {
    const location = useLocation()

    let childComponent;

    switch (location.pathname) {
        case "/create-video":
            childComponent = <CreateVideoCards />;
            break;
        case "/picture-to-video":
            childComponent = <PictureToVideo />;
            break;
        case "/text-to-video":
            childComponent = <TextToVideo />;
            break;
        case "/short-clips":
            childComponent = <ShortVideo />;
            break;
        default:
            childComponent = null;
    }

    return (
        <div>
            <Container className="parent-card-2 dark-theme-parent-card-2">
                <div className="breadCrumb-custom dark-breadCrumb-custom">
                    <CreateVideoSvg />
                    <BreadCrumbs title="Create Video" data={[{ title: "Create Video", link: "/create-video" }]} />
                </div>
                <div className='component dark-theme-component w-100'>
                    {childComponent}
                </div >
            </Container >
        </div>
    )
}

export default CreateVideo