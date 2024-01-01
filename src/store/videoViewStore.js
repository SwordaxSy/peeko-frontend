import { create } from "zustand";

const useVideoViewStore = create((set) => ({
    // main
    isPlaying: true,
    toggleIsPlaying: () => {
        set((state) => ({ isPlaying: !state.isPlaying }));
    },

    muted: true,
    toggleMuted: () => {
        set((state) => ({ muted: !state.muted }));
    },

    duration: 0,
    setDuration: (newDuration) => {
        set({ duration: newDuration });
    },

    currentTime: 0,
    setCurrentTime: (newCurrentTime) => {
        set({ currentTime: newCurrentTime });
    },

    deleteVideoEnabled: true,
    setDeleteVideoEnabled: (newDeleteVideoEnabled) => {
        set({ deleteVideoEnabled: newDeleteVideoEnabled });
    },

    // preview
    previewIsPlaying: false,
    togglePreviewIsPlaying: () => {
        set((state) => ({ previewIsPlaying: !state.previewIsPlaying }));
    },

    previewSrc: "",
    setPreviewSrc: (newPreviewSrc) => {
        set({ previewSrc: newPreviewSrc });
    },

    videoFile: null,
    setVideoFile: (newVideoFile) => {
        set({ videoFile: newVideoFile });
    },

    allowSubmit: false,
    setAllowSubmit: (newAllowSubmit) => {
        set({ allowSubmit: newAllowSubmit });
    },

    isPosting: false,
    setIsPosting: (newIsPosting) => {
        set({ isPosting: newIsPosting });
    },

    previewDuration: 0,
    setPreviewDuration: (newPreviewDuration) => {
        set({ previewDuration: newPreviewDuration });
    },

    previewCurrentTime: 0,
    setPreviewCurrentTime: (newPreviewCurrentTime) => {
        set({ previewCurrentTime: newPreviewCurrentTime });
    },

    // common
    toggleVideo: (targetName, targetRef) => {
        const currentState = useVideoViewStore.getState();
        let targetToggleFunction;

        if (targetName === "main") {
            targetToggleFunction = currentState.toggleIsPlaying;
        } else if (targetName === "preview") {
            targetToggleFunction = currentState.togglePreviewIsPlaying;
        } else {
            throw Error("Target must be main or preview");
        }

        if (!targetRef.current.paused) {
            targetRef.current.pause();
        } else {
            targetRef.current.play();
        }
        targetToggleFunction();
    },
}));

export default useVideoViewStore;
