import { create } from "zustand";
import useMiscStore from "./miscStore";

const useVideoDataStore = create((set) => ({
    uploaderId: "",
    setUploaderId: (newUploaderId) => {
        set({ uploaderId: newUploaderId });
    },

    uploaderUsername: "",
    setUploaderUsername: (newUploaderUsername) => {
        set({ uploaderUsername: newUploaderUsername });
    },

    timestamp: new Date(),
    setTimestamp: (newTimestamp) => {
        set({ timestamp: newTimestamp });
    },

    likesCount: 0,
    setLikesCount: (newLikesCount) => {
        set({ likesCount: newLikesCount });
    },

    liked: false,
    setLiked: (newLiked) => {
        set({ liked: newLiked });
    },

    feedback: (videoKey, axios) => {
        axios
            .put(`/feedback/toggleLike`, { videoKey })
            .then(({ data }) => {
                if (data.success) {
                    set({
                        liked: data.operation === "LIKE",
                        likesCount: data.likesCount,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    },

    share: (videoKey) => {
        navigator.clipboard
            .writeText(`${window.location.host}/video/${videoKey}`)
            .then(() => {
                useMiscStore.getState().activateAlert("Copied Link", "success");
            })
            .catch((err) => {
                console.error(err);
            });
    },

    commentsCount: 0,
    setCommentsCount: (newCommentsCount) => {
        set({ commentsCount: newCommentsCount });
    },

    comments: [],
    setComments: (newComments) => {
        set({ comments: newComments });
    },
    pushComment: (newComment) => {
        set((state) => ({ comments: [newComment, ...state.comments] }));
    },

    comment: "",
    setComment: (newComment) => {
        set({ comment: newComment });
    },

    showComments: true,
    setShowComments: (newShowComments) => {
        set({ showComments: newShowComments });
    },

    commentEnabled: false,
    setCommentEnabled: (newCommentEnabled) => {
        set({ commentEnabled: newCommentEnabled });
    },

    /**
     * for some reaso this is causing `Maximum update depth exceeded` error
     * current safe alternative is with useState on Video.jsx then passed through props
     */
    // mobileComments: true,
    // setMobileComments: (newMobileComments) => {
    //     set({ mobileComments: newMobileComments });
    // },

    activeMobileComments: false,
    setActiveMobileComments: (newActiveMobileComments) => {
        set({ activeMobileComments: newActiveMobileComments });
    },

    currentActiveDelete: "",
    setCurrentActiveDelete: (newCurrentActiveDelete) => {
        set({ currentActiveDelete: newCurrentActiveDelete });
    },
}));

export default useVideoDataStore;
