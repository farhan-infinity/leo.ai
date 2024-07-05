import { postCreateAvatar, postCreateVideo } from "../../../redux/actions/createVideoAction"


export const FormikFormData = (values, actions, dispatch) => {
    if (values.tab === 'tab') {
        actions.setFieldValue({
            type: values.type,
            textarea: values.textarea,
            image: values.image,
            providerType: values.providerType,
            providerVoiceId: values.providerVoiceId,
            textareaError: values.textareaError,
            sourceError: values.sourceError,
            imageError: values.imageError,
            providerTypeError: values.providerTypeError,
            providerVoiceIdError: values.providerVoiceIdError,
            imageRatioType: values.imageRatioType,
            uploadAIAvatar: values.uploadAIAvatar ? values.uploadAIAvatar : '',
            extension: values.extension ? values.extension : '',
            numOfImages: values.numOfImages,
            negativePrompt: values.negativePrompt,
            numInferenceSteps: values.numInferenceSteps,
            tiling: values.tiling,
            guidanceScale: values.guidanceScale,
            promptMagic: values.promptMagic,
        })
    } else {
        actions.setFieldValue({
            type: values.type,
            audio: values.audio,
            source: values.source,
            providerType: values.providerType,
            providerVoiceId: values.providerVoiceId,
            textareaError: values.textareaError,
            sourceError: values.sourceError,
            imageError: values.imageError,
            providerTypeError: values.providerTypeError,
            providerVoiceIdError: values.providerVoiceIdError,
            imageRatioType: values.imageRatioType,
            uploadAIAvatar: values.uploadAIAvatar ? values.uploadAIAvatar : '',
            extension: values.extension ? values.extension : '',
            numOfImages: values.numOfImages,
            negativePrompt: values.negativePrompt,
            numInferenceSteps: values.numInferenceSteps,
            tiling: values.tiling,
            guidanceScale: values.guidanceScale,
            promptMagic: values.promptMagic,

        })
    }
    const formData = new FormData()
    if (values.aiTextAvatar) {
        formData.append('text', values.aiTextAvatar)
        formData.append('imageRatioType', values.imageRatioType)
        formData.append('numOfImages', values.numOfImages)
        formData.append('negativePrompt', values.negativePrompt)
        formData.append('numInferenceSteps', values.numInferenceSteps)
        formData.append('tiling', values.tiling)
        formData.append('guidanceScale', values.guidanceScale)
        if (values.promptMagic === true) {
            formData.append('promptMagic', values.promptMagic)
        }
        if (values.uploadAIAvatar) {
            formData.append('image', values.uploadAIAvatar)
            formData.append('extension', values.extension)
        }
        dispatch(postCreateAvatar(formData))
        actions.setSubmitting(false)
        actions.resetForm()
    } else {
        if (values.audio) {
            formData.append('type', 'audio')
            formData.append('audio', values.audio)
            formData.append(values.source ? 'source' : 'image', values.source ? values.source : values.image)
            dispatch(postCreateVideo((formData)))
            actions.setSubmitting(false)
            actions.resetForm()
        } else {
            formData.append('type', 'text')
            formData.append('text', values.textarea)
            formData.append(values.image ? 'image' : 'source', values.image ? values.image : values.source)
            formData.append('providerType', values.providerType)
            formData.append('providerVoiceId', values.providerVoiceId)
            dispatch(postCreateVideo(formData))
            actions.setSubmitting(false)
            actions.resetForm()
        }
    }
}