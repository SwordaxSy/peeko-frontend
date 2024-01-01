import { create } from "zustand";
import useVideoDataStore from "./videoDataStore";
import useVideoViewStore from "./videoViewStore";

const useMiscStore = create((set) => ({
    // alert
    alertActive: false,
    alertText: "",
    alertTheme: "success",

    activateAlert: (text, theme = "success") => {
        set({ alertActive: true, alertText: text, alertTheme: theme });

        setTimeout(() => {
            set({ alertActive: false });
        }, 2000);
    },

    // confirmation
    confirmationActive: false,
    confirmationText: "",
    resolve: null,

    confirmation: (text) => {
        set({ confirmationText: text, confirmationActive: true });

        return new Promise((res) => {
            set({ resolve: res });
        });
    },

    confirm: () => {
        set({ confirmationActive: false });
        useMiscStore.getState().resolve(true);
    },

    deny: () => {
        set({ confirmationActive: false });
        useMiscStore.getState().resolve(false);
    },

    // dropdown
    dropdownActive: false,
    toggleDropdownActive: () => {
        set((state) => ({ dropdownActive: !state.dropdownActive }));
    },

    // modal
    modalState: false,
    setModalState: (newModalState) => {
        set({ modalState: newModalState });
    },
    openModal: (videoRef) => {
        const { isPlaying, toggleVideo } = useVideoViewStore.getState();
        const setActiveMobileComments =
            useVideoDataStore.getState().setActiveMobileComments;

        set({ modalState: true });
        setActiveMobileComments(false);

        if (isPlaying) {
            toggleVideo("main", videoRef);
        }
    },
    closeModal: (videoRef) => {
        const {
            setPreviewSrc,
            setVideoFile,
            setAllowSubmit,
            setPreviewDuration,
            setPreviewCurrentTime,
            previewIsPlaying,
            toggleVideo,
        } = useVideoViewStore.getState();

        set({ modalState: false });

        setPreviewSrc(null);
        setVideoFile("");
        setAllowSubmit(false);

        setPreviewDuration(0);
        setPreviewCurrentTime(0);

        if (previewIsPlaying) {
            toggleVideo("preview", videoRef);
        }
    },
}));

export default useMiscStore;
