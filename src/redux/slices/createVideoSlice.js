import { createSlice } from '@reduxjs/toolkit'
import { getCreateVideo, postCreateVideo, postCreateAvatar, getCreateAvatar, createAvatarLanguage, getTextToVideo, postTextToVideo, postShortClips, getShortClips, getAvailableSubtitle, getGalleryClips } from '../actions/createVideoAction'


export const createVideoSlice = createSlice({
    name: 'createVideo',
    initialState: {
        postVideo: null,
        postVideoLoading: 'idle',
        postVideoError: null,

        getVideo: null,
        getVideoLoading: 'idle',
        getVideoError: null,

        postAvatar: null,
        postAvatarLoading: 'idle',
        postAvatarError: null,

        getAvatar: null,
        getAvatarLoading: 'idle',
        getAvatarError: null,

        getLanguage: null,
        languageLoading: 'idle',
        languageError: null,

        postTextVideo: null,
        postTextVideoLoading: 'idle',
        postTextVideoError: null,

        getTextVideo: null,
        getTextVideoLoading: 'idle',
        getTextVideoError: null,

        postClips: null,
        postClipsLoading: 'idle',
        postClipsError: null,

        getSubtitle: null,
        getSubtitleLoading: 'idle',
        getSubtitleError: null,

        getClips: null,
        getClipsLoading: 'idle',
        getClipsError: null,

        getGallery: null,
        getGalleryLoading: 'idle',
        getGalleryError: null,
    },
    reducers: {
        emptyGetAvatar: (state) => {
            state.getAvatar = null
        },
        emptyGetVideo: (state) => {
            state.getVideo = null
        },
        emptyGetTextToVideo: (state) => {
            state.postTextVideo = null
            state.getTextVideo = null
        },
        emptyPostClips: (state) => {
            state.postClips = null
        },
        emptyGetClips: (state) => {
            state.getClips = null
        },
        emptySubtitle: (state) => {
            state.getSubtitle = null
        },
        emptyVideoErrorState: (state) => {
            state.getVideoError = null
            state.getTextVideo = null
            state.postClipsError = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postCreateVideo.pending, (state, action) => {
            if (state.postVideoLoading === 'idle') {
                state.postVideoLoading = 'pending'
            }
        })
        builder.addCase(postCreateVideo.fulfilled, (state, action) => {
            if (state.postVideoLoading === 'pending') {
                state.postVideo = action.payload
                state.postVideoLoading = 'idle'
            }
        })
        builder.addCase(postCreateVideo.rejected, (state, action) => {
            if (state.postVideoLoading === 'pending') {
                state.postVideoLoading = 'idle'
                state.postVideoError = action.payload
            }
        })
        builder.addCase(getCreateVideo.pending, (state, action) => {
            if (state.getVideoLoading === 'idle') {
                state.getVideoLoading = 'pending'
            }
        })
        builder.addCase(getCreateVideo.fulfilled, (state, action) => {
            state.getVideo = action.payload
            state.getVideoLoading = 'idle'
        })
        builder.addCase(getCreateVideo.rejected, (state, action) => {
            if (state.getVideoLoading === 'pending') {
                state.getVideoLoading = 'idle'
                state.getVideoError = action.payload
            }
        })
        builder.addCase(postCreateAvatar.pending, (state, action) => {
            if (state.postAvatarLoading === 'idle') {
                state.postAvatarLoading = 'pending'
            }
        })
        builder.addCase(postCreateAvatar.fulfilled, (state, action) => {
            if (state.postAvatarLoading === 'pending') {
                state.postAvatar = action.payload
                state.postAvatarLoading = 'idle'
            }
        })
        builder.addCase(postCreateAvatar.rejected, (state, action) => {
            if (state.postAvatarLoading === 'pending') {
                state.postAvatarLoading = 'idle'
                state.postAvatarError = action.payload
            }
        })
        builder.addCase(getCreateAvatar.pending, (state, action) => {
            if (state.getAvatarLoading === 'idle') {
                state.getAvatarLoading = 'pending'
            }
        })
        builder.addCase(getCreateAvatar.fulfilled, (state, action) => {
            state.getAvatar = action.payload
            state.getAvatarLoading = 'idle'
        })
        builder.addCase(getCreateAvatar.rejected, (state, action) => {
            if (state.getAvatarLoading === 'pending') {
                state.getAvatarLoading = 'idle'
                state.getAvatarError = action.payload
            }
        })
        builder.addCase(createAvatarLanguage.pending, (state, action) => {
            if (state.languageLoading === 'idle') {
                state.languageLoading = 'pending'
            }
        })
        builder.addCase(createAvatarLanguage.fulfilled, (state, action) => {
            state.getLanguage = action.payload
            state.languageLoading = 'idle'
        })
        builder.addCase(createAvatarLanguage.rejected, (state, action) => {
            if (state.languageLoading === 'pending') {
                state.languageLoading = 'idle'
                state.languageError = action.payload
            }
        })
        builder.addCase(postTextToVideo.pending, (state, action) => {
            if (state.postTextVideoLoading === 'idle') {
                state.postTextVideoLoading = 'pending'
            }
        })
        builder.addCase(postTextToVideo.fulfilled, (state, action) => {
            // if (state.postTextVideoLoading === 'idle') {
            state.postTextVideo = action.payload
            state.postTextVideoLoading = 'idle'
            // }
        })
        builder.addCase(postTextToVideo.rejected, (state, action) => {
            if (state.postTextVideoLoading === 'pending') {
                state.postTextVideoLoading = 'idle'
                state.postTextVideoError = action.payload
            }
        })
        builder.addCase(getTextToVideo.pending, (state, action) => {
            if (state.getTextVideoLoading === 'idle') {
                state.getTextVideoLoading = 'pending'
            }
        })
        builder.addCase(getTextToVideo.fulfilled, (state, action) => {
            state.getTextVideo = action.payload
            state.getTextVideoLoading = 'idle'
        })
        builder.addCase(getTextToVideo.rejected, (state, action) => {
            if (state.getTextVideoLoading === 'pending') {
                state.getTextVideoLoading = 'idle'
                state.getTextVideoError = action.payload
            }
        })
        builder.addCase(postShortClips.pending, (state, action) => {
            if (state.postClipsLoading === 'idle') {
                state.postClipsLoading = 'pending'
            }
        })
        builder.addCase(postShortClips.fulfilled, (state, action) => {
            state.postClips = action.payload
            state.postClipsLoading = 'idle'
        })
        builder.addCase(postShortClips.rejected, (state, action) => {
            if (state.postClipsLoading === 'pending') {
                state.postClipsLoading = 'idle'
                state.postClipsError = action.payload
            }
        })
        builder.addCase(getAvailableSubtitle.pending, (state, action) => {
            if (state.getSubtitleLoading === 'idle') {
                state.getSubtitleLoading = 'pending'
            }
        })
        builder.addCase(getAvailableSubtitle.fulfilled, (state, action) => {
            state.getSubtitle = action.payload
            state.getSubtitleLoading = 'idle'
        })
        builder.addCase(getAvailableSubtitle.rejected, (state, action) => {
            if (state.getSubtitleLoading === 'pending') {
                state.getSubtitleLoading = 'idle'
                state.getSubtitleError = action.payload
            }
        })
        builder.addCase(getShortClips.pending, (state, action) => {
            if (state.getClipsLoading === 'idle') {
                state.getClipsLoading = 'pending'
            }
        })
        builder.addCase(getShortClips.fulfilled, (state, action) => {
            state.getClips = action.payload
            state.getClipsLoading = 'idle'
        })
        builder.addCase(getShortClips.rejected, (state, action) => {
            if (state.getGalleryLoading === 'pending') {
                state.getGalleryLoading = 'idle'
                state.getGalleryError = action.payload
            }
        })
        builder.addCase(getGalleryClips.pending, (state, action) => {
            if (state.getGalleryLoading === 'idle') {
                state.getGalleryLoading = 'pending'
            }
        })
        builder.addCase(getGalleryClips.fulfilled, (state, action) => {
            state.getGallery = action.payload
            state.getGalleryLoading = 'idle'
        })
        builder.addCase(getGalleryClips.rejected, (state, action) => {
            if (state.getGalleryLoading === 'pending') {
                state.getGalleryLoading = 'idle'
                state.getGalleryError = action.payload
            }
        })
    },
})

export const { emptyGetAvatar, emptyGetVideo, emptyGetTextToVideo, emptyPostClips, emptyGetClips, emptySubtitle, emptyVideoErrorState } = createVideoSlice.actions;
export default (createVideoSlice.reducer)