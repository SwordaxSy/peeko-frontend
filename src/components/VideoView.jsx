import { useState, useEffect, useCallback } from "react";
import { useSwipe } from "../hooks/useSwipe";
import { Link } from "react-router-dom";

import RangeInput from "./RangeInput";
import Logo from "../assets/peeko-logo.png";
import PlaceholderVideo from "../assets/placeholder.MOV";

import useAuthContext from "../hooks/useAuthContext";
import useAuthenticate from "../hooks/useAuthenticate";
import useAxios from "../hooks/useAxios";

const VideoView = ({
    videoKey,
    setShowComments,
    setAlertText,
    activateAlert,
    mobileComments,
    setMobileComments,
    setActiveMobileComments,
    uploaderId,
    confirmation,
    video,
    isPlaying,
    toggleVideo,
    openModal,
}) => {
    // hooks
    const {
        swipe,
        swipeDisabled,
        setSwipeDisabled,
        prevSwipeDisabled,
        lastSwipe,
    } = useSwipe();
    const { auth } = useAuthContext();
    const { signout } = useAuthenticate();
    const axios = useAxios();

    // states
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [muted, setMuted] = useState(true);
    const [dropdownActive, setDropdownActive] = useState(false);
    const [deleteVideoEnabled, setDeleteVideoEnabled] = useState(true);

    const ownPost = auth.userDocument._id === uploaderId;

    const seek = useCallback(
        (direction) => {
            switch (direction) {
                case "right": {
                    video.current.currentTime += 5;
                    break;
                }
                case "left": {
                    video.current.currentTime -= 5;
                    break;
                }
                default:
                    throw Error("Unrecognized direction");
            }
        },
        [video]
    );

    // handlers
    const handleVideoClick = (e) => {
        if (e.target.id !== "seekBar") toggleVideo("main");
    };

    const handleLoadedMetaData = () => {
        setDuration(video.current.duration);
        setShowComments(true);
    };

    const handleLoadedData = () => {
        setSwipeDisabled(false);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(video.current.currentTime);
    };

    const handleSeekBarChange = (e) => {
        const seekTime = (video.current.duration / 100) * e.target.value;
        video.current.currentTime = seekTime;
    };

    const handleVideoError = (e) => {
        console.error(e);
        setAlertText("Failed to load video");
        activateAlert("error");
        swipe(lastSwipe);
    };

    const handleOnKeyDown = useCallback(
        (e) => {
            switch (e.key) {
                case " ": {
                    if (
                        document.activeElement.classList.contains(
                            "comment-input"
                        )
                    )
                        break;
                    toggleVideo("main");
                    break;
                }
                case "ArrowRight": {
                    seek("right");
                    break;
                }
                case "ArrowLeft": {
                    seek("left");
                    break;
                }
                case "ArrowUp": {
                    swipe("prev");
                    break;
                }
                case "ArrowDown": {
                    swipe("next");
                    break;
                }
                default:
            }
        },
        [swipe, seek, toggleVideo]
    );

    const handleDeleteVideo = async () => {
        setDeleteVideoEnabled(false);

        const approval = await confirmation(
            "Are you sure you want to delete your video?"
        );
        if (!approval) return setDeleteVideoEnabled(true);

        axios
            .delete(`/video/deleteVideo/${videoKey}`)
            .then(({ data }) => {
                if (data.success) {
                    // clear session storage
                    let videoKeys = JSON.parse(
                        sessionStorage.getItem("videoKeys")
                    );
                    if (!videoKey) return;
                    videoKeys = videoKeys.filter((key) => key !== videoKey);
                    sessionStorage.setItem(
                        "videoKeys",
                        JSON.stringify(videoKeys)
                    );

                    // swipe to next video
                    swipe("next");
                }
            })
            .catch((err) => {
                console.error(err);
                setAlertText("Failed to delete video");
                activateAlert("error");
            })
            .finally(() => {
                setDeleteVideoEnabled(true);
            });
    };

    const setCommentsMode = useCallback(() => {
        const screenWidth = window.innerWidth;
        const videoWidth = video.current.clientWidth;

        setMobileComments(videoWidth + 500 > screenWidth);
    }, [setMobileComments, video]);

    // set event listeners
    useEffect(() => {
        window.addEventListener("keydown", handleOnKeyDown);
        window.addEventListener("resize", setCommentsMode);
        setCommentsMode();

        return () => {
            window.removeEventListener("keydown", handleOnKeyDown);
            window.removeEventListener("resize", setCommentsMode);
        };
    }, [handleOnKeyDown, setCommentsMode]);

    return (
        <div
            className={`${
                mobileComments ? "w-screen" : "w-[calc(100%-500px)]"
            } h-[100svh] fixed left-0 overflow-hidden`}
        >
            {/* 
                The existence of two video elements causes bugs
            */}
            {/* <video
                className="w-full blur-xl absolute top-1/2 -translate-y-1/2 brightness-[40%]"
                src={`${process.env.REACT_APP_API_URL}/video/streamVideo/${videoKey}`}
                crossOrigin="anonymous"
                playsInline
            >
                Your browser does not support this video
            </video> */}
            <div
                className="aspect-[9/16] h-full absolute left-1/2 -translate-x-1/2"
                onClick={handleVideoClick}
            >
                {/* video element */}
                <video
                    className="h-full w-full"
                    src={
                        videoKey === "undefined"
                            ? PlaceholderVideo
                            : `${process.env.REACT_APP_API_URL}/video/streamVideo/${videoKey}`
                    }
                    ref={video}
                    onLoadedMetadata={handleLoadedMetaData}
                    onTimeUpdate={handleTimeUpdate}
                    onError={handleVideoError}
                    onLoadedData={handleLoadedData}
                    autoPlay={isPlaying}
                    muted={muted}
                    crossOrigin="anonymous"
                    loop
                    playsInline
                >
                    Your browser does not support this video
                </video>

                {/* is playing icon */}
                {/* keep this inside the video container because if it was clicked, it should toggle the video */}
                <span
                    className={`${
                        isPlaying ? "opacity-0 pointer-events-none" : ""
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

            {/* open mobile comments button */}
            {mobileComments && (
                <span
                    onClick={() => setActiveMobileComments(true)}
                    className={`${
                        ownPost ? "top-20" : "top-5"
                    } right-5 material-symbols-outlined absolute select-none transition cursor-pointer bg-[rgba(84,84,84,0.5)] hover:bg-[rgba(84,84,84,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center`}
                >
                    comment
                </span>
            )}

            {/* navigators */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <button
                    type="button"
                    disabled={swipeDisabled || prevSwipeDisabled}
                    onClick={() => swipe("prev")}
                    className="material-symbols-outlined disabled:opacity-50 disabled:pointer-events-none select-none transition cursor-pointer bg-[rgba(84,84,84,0.5)] hover:bg-[rgba(84,84,84,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-bold"
                >
                    expand_less
                </button>
                <button
                    type="button"
                    disabled={swipeDisabled}
                    onClick={() => swipe("next")}
                    className="material-symbols-outlined disabled:opacity-50 disabled:pointer-events-none select-none transition cursor-pointer bg-[rgba(84,84,84,0.5)] hover:bg-[rgba(84,84,84,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-bold"
                >
                    expand_more
                </button>
            </div>

            {/* mute / unmute */}
            <button
                type="button"
                onClick={() => setMuted((prev) => !prev)}
                className="material-symbols-outlined absolute bottom-5 right-5 select-none transition cursor-pointer bg-[rgba(84,84,84,0.5)] hover:bg-[rgba(84,84,84,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-bold"
            >
                {muted ? "volume_off" : "volume_up"}
            </button>

            {/* delete video button */}
            {ownPost && (
                <button
                    disabled={!deleteVideoEnabled}
                    type="button"
                    className="disabled:opacity-50 disabled:pointer-events-none material-symbols-outlined absolute top-5 right-5 selec-none transition cursor-pointer bg-[rgba(220,20,60,0.5)] hover:bg-[rgba(220,20,60,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-semibold"
                    title="Delete Video"
                    onClick={handleDeleteVideo}
                >
                    delete
                </button>
            )}

            {/* logo & user */}
            <div className="absolute top-3 left-3 flex items-start gap-2">
                <Link to="/">
                    <img src={Logo} alt="Peeko Logo" className="w-10 h-10" />
                </Link>
                <span
                    className="material-symbols-outlined text-[2.5rem] select-none cursor-pointer relative"
                    onClick={() => setDropdownActive((prev) => !prev)}
                >
                    account_circle
                    <div
                        className={`${
                            dropdownActive
                                ? ""
                                : "opacity-0 pointer-events-none"
                        } transition bg-slate-800 text-base absolute left-1/2 p-2 rounded-lg rounded-tl-none z-10 cursor-auto flex flex-col justify-center items-center`}
                    >
                        <p>{auth.userDocument.username}</p>
                        <hr className="bg-white h-[2px] my-3 w-full" />
                        <button
                            onClick={signout}
                            className="text-error w-full rounded-lg flex justify-center items-center py-1 hover:bg-[rgba(255,255,255,0.1)] transition"
                            type="button"
                            title="Sign Out"
                        >
                            <span className="material-symbols-outlined ">
                                logout
                            </span>
                        </button>
                    </div>
                </span>
            </div>

            {/* show post modal button */}
            <button
                type="button"
                onClick={openModal}
                className="absolute w-16 h-16 bottom-4 left-4 rounded-full flex justify-center items-center bg-gradient-to-br from-primary-1 to-primary-2 hover:scale-90 transition cursor-pointer"
            >
                <span className="material-symbols-outlined text-5xl font-bold">
                    add
                </span>
            </button>
        </div>
    );
};

export default VideoView;
