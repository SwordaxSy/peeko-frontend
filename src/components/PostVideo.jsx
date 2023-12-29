import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RangeInput from "./RangeInput";
import useAxios from "../hooks/useAxios";

const PostVideo = ({
    previewVideo,
    isPlaying,
    previewIsPlaying,
    toggleVideo,
    activateAlert,
    setAlertText,
    modalState,
    setModalState,
}) => {
    const navigate = useNavigate();
    const axios = useAxios();

    const darken = useRef(null);

    const [previewSrc, setPreviewSrc] = useState(null);
    const [videoFile, setVideoFile] = useState("");
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [duration, setDuration] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const videoUrl = URL.createObjectURL(file);

        setPreviewSrc(videoUrl);
        setVideoFile(file);
        setAllowSubmit(true);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(previewVideo.current.currentTime);
    };

    const handleLoadedMetaData = () => {
        setDuration(previewVideo.current.duration);
    };

    const handleSeekBarChange = (e) => {
        const seekTime = (previewVideo.current.duration / 100) * e.target.value;
        previewVideo.current.currentTime = seekTime;
    };

    const handleVideoClick = (e) => {
        if (e.target.id !== "seekBar" && e.target.id !== "removeVideoButton")
            toggleVideo("preview");
    };

    const handleRemoveVideo = () => {
        setPreviewSrc(null);
        setVideoFile("");
        setAllowSubmit(false);
    };

    const closeModal = () => {
        setModalState(false);

        setPreviewSrc(null);
        setVideoFile("");
        setAllowSubmit(false);

        setDuration(null);
        setCurrentTime(null);

        if (previewIsPlaying) {
            toggleVideo("preview");
        }
    };

    const handlePostVideo = () => {
        if (!videoFile) return;

        setIsLoading(true);

        const formData = new FormData();
        formData.append("videoFile", videoFile);

        axios
            .post(`/video/uploadVideo`, formData)
            .then(({ data }) => {
                if (data.success) {
                    setAlertText("Video Posted");
                    activateAlert();
                    navigate(`/video/${data.videoDocument.videoKey}`);
                    darken.current.click();
                    if (!isPlaying) {
                        toggleVideo("main");
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                setAlertText("Failed to post video");
                activateAlert("error");
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            {/* post modal */}
            <div
                className={`${
                    modalState
                        ? "top-1/2 -translate-y-1/2"
                        : "top-0 -translate-y-full"
                } fixed left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[9/16] h-[calc(100svh-200px)] bg-primary-1 z-30 rounded-xl flex flex-col justify-evenly items-center transition`}
            >
                {previewSrc ? (
                    <div
                        className="aspect-[9/16] w-4/6 rounded-lg rounded-tr-none relative overflow-hidden"
                        onClick={handleVideoClick}
                    >
                        <video
                            ref={previewVideo}
                            src={previewSrc}
                            onLoadedMetadata={handleLoadedMetaData}
                            onTimeUpdate={handleTimeUpdate}
                            autoPlay={previewIsPlaying}
                        >
                            Your browser does not support this video
                        </video>

                        {/* remove video button */}
                        {!isLoading && (
                            <span
                                className="material-symbols-outlined absolute text-error top-0 right-0 cursor-pointer transition hover:opacity-70"
                                title="Remove Video"
                                onClick={handleRemoveVideo}
                                id="removeVideoButton"
                            >
                                cancel
                            </span>
                        )}

                        {/* is playing icon */}
                        <span
                            className={`${
                                previewIsPlaying
                                    ? "opacity-0 pointer-events-none"
                                    : ""
                            } material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-8xl transition`}
                        >
                            play_arrow
                        </span>

                        {/* seek bar */}
                        <RangeInput
                            onChangeFunction={handleSeekBarChange}
                            currentTime={currentTime}
                            duration={duration}
                        />
                    </div>
                ) : (
                    <label
                        htmlFor="videoInput"
                        className="aspect-[9/16] w-4/6 rounded-lg border-2 border-dashed group flex justify-center items-center cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-6xl font-bold transition group-hover:scale-110">
                            add_circle
                        </span>
                    </label>
                )}

                <input
                    id="videoInput"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleOnChange}
                    onClick={(e) => (e.target.value = "")}
                />

                <button
                    type="button"
                    disabled={!allowSubmit || isLoading}
                    className="bg-primary-2 w-4/6 p-4 text-xl font-bold rounded-lg transition hover:scale-105 disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center"
                    onClick={handlePostVideo}
                >
                    {isLoading ? (
                        <span className="material-symbols-outlined animate-spin">
                            progress_activity
                        </span>
                    ) : (
                        <span>POST VIDEO</span>
                    )}
                </button>
            </div>

            {/* post modal dark background */}
            <div
                ref={darken}
                onClick={closeModal}
                className={`${
                    modalState ? "opacity-80" : "opacity-0 pointer-events-none"
                } fixed top-0 left-0 w-screen h-screen bg-black z-20 transition`}
            ></div>
        </>
    );
};

export default PostVideo;
