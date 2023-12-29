import { useParams } from "react-router-dom";
import { useState, useRef } from "react";

import PostVideo from "../components/PostVideo";
import VideoView from "../components/VideoView";
import VideoData from "../components/VideoData";

const Video = () => {
    const { videoKey } = useParams();

    const [uploaderId, setUploaderId] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [mobileComments, setMobileComments] = useState(false);
    const [activeMobileComments, setActiveMobileComments] = useState(false);

    const [alertActive, setAlertActive] = useState(false);
    const [alertTheme, setAlertTheme] = useState(null);
    const [alertText, setAlertText] = useState("");

    const confirmButton = useRef(null);
    const dneyButton = useRef(null);
    const [confirmationActive, setConfirmationActive] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");

    const video = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const previewVideo = useRef(null);
    const [previewIsPlaying, setPreviewIsPlaying] = useState(false);

    const [modalState, setModalState] = useState(false);

    const toggleVideo = (target) => {
        let targetVideo;
        let targetSetFunction;

        if (target === "main") {
            targetVideo = video;
            targetSetFunction = setIsPlaying;
        } else if (target === "preview") {
            targetVideo = previewVideo;
            targetSetFunction = setPreviewIsPlaying;
        } else {
            throw Error("Target must be main or preview");
        }

        if (!targetVideo.current.paused) {
            targetVideo.current.pause();
        } else {
            targetVideo.current.play();
        }
        targetSetFunction((prev) => !prev);
    };

    const openModal = () => {
        setModalState(true);
        setActiveMobileComments(false);
        if (isPlaying) {
            toggleVideo("main");
        }
    };

    const confirmation = (text) => {
        setConfirmationText(text);
        setConfirmationActive(true);

        return new Promise((res) => {
            confirmButton.current.addEventListener("click", () => {
                setConfirmationActive(false);
                res(true);
            });
            dneyButton.current.addEventListener("click", () => {
                setConfirmationActive(false);
                res(false);
            });
        });
    };

    const activateAlert = (theme = "success") => {
        setAlertActive(true);
        setAlertTheme(theme);

        setTimeout(() => {
            setAlertActive(false);
        }, 2000);
    };

    return (
        <div className="bg-slate-800 h-[100svh] flex justify-center items-center text-white relative overflow-hidden">
            {/* alert box */}
            <div
                className={`${
                    alertActive
                        ? "top-3 translate-y-0"
                        : "top-0 -translate-y-full"
                } ${
                    alertTheme === "error" ? "bg-error" : "bg-success"
                } transition-transform absolute left-1/2 -translate-x-1/2 p-3 rounded-full text-white flex gap-1 z-40 select-none`}
            >
                <p className="font-semibold">{alertText}</p>
                <span className="material-symbols-outlined">
                    {alertTheme === "error" ? "error" : "task_alt"}
                </span>
            </div>

            {/* confirmation box */}
            <div
                className={`${
                    confirmationActive
                        ? "top-3 translate-y-0"
                        : "top-0 -translate-y-full"
                } bg-gradient-to-br from-primary-1 to-primary-2 transition-transform absolute left-1/2 -translate-x-1/2 p-3 rounded-lg text-white z-40 select-none`}
            >
                <p>{confirmationText}</p>
                <div className="w-full flex justify-end gap-3 font-bold">
                    <button
                        type="button"
                        className="hover:opacity-75 transition"
                        ref={dneyButton}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="hover:opacity-75 transition"
                        ref={confirmButton}
                    >
                        Confirm
                    </button>
                </div>
            </div>

            {/* main page content */}
            <PostVideo
                previewVideo={previewVideo}
                isPlaying={isPlaying}
                previewIsPlaying={previewIsPlaying}
                toggleVideo={toggleVideo}
                activateAlert={activateAlert}
                setAlertText={setAlertText}
                modalState={modalState}
                setModalState={setModalState}
            />
            <VideoView
                videoKey={videoKey}
                setShowComments={setShowComments}
                activateAlert={activateAlert}
                setAlertText={setAlertText}
                mobileComments={mobileComments}
                setMobileComments={setMobileComments}
                setActiveMobileComments={setActiveMobileComments}
                uploaderId={uploaderId}
                confirmation={confirmation}
                video={video}
                isPlaying={isPlaying}
                toggleVideo={toggleVideo}
                openModal={openModal}
            />
            <VideoData
                videoKey={videoKey}
                showComments={showComments}
                activateAlert={activateAlert}
                setAlertText={setAlertText}
                mobileComments={mobileComments}
                setActiveMobileComments={setActiveMobileComments}
                activeMobileComments={activeMobileComments}
                setUploaderId={setUploaderId}
                confirmation={confirmation}
                toggleVideo={toggleVideo}
            />
        </div>
    );
};

export default Video;
