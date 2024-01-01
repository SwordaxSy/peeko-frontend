import useAuthContext from "../hooks/useAuthContext";
import useAxios from "../hooks/useAxios";
import useMiscStore from "../store/miscStore";
import useDataStore from "../store/dataStore";
import useViewStore from "../store/viewStore";
import VideoActions from "./VideoActions";

const VideoControls = ({
    videoKey,
    mobileComments,
    swipe,
    swipeDisabled,
    prevSwipeDisabled,
}) => {
    const axios = useAxios();
    const { auth } = useAuthContext();
    const { muted, toggleMuted, deleteVideoEnabled, setDeleteVideoEnabled } =
        useViewStore();
    const { uploaderId } = useDataStore();
    const { confirmation, activateAlert } = useMiscStore();

    const ownPost = auth?.userDocument._id === uploaderId;

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

                    activateAlert("Video deleted", "success");

                    // swipe to next video
                    swipe("next");
                }
            })
            .catch((err) => {
                console.error(err);
                activateAlert("Failed to delete video", "error");
            })
            .finally(() => {
                setDeleteVideoEnabled(true);
            });
    };

    return (
        <>
            {/* delete video button */}
            {ownPost && (
                <button
                    disabled={!deleteVideoEnabled}
                    type="button"
                    className="drop-shadow-3xl disabled:opacity-50 disabled:pointer-events-none material-symbols-outlined absolute top-5 right-5 selec-none transition cursor-pointer bg-[rgba(220,20,60,0.5)] hover:bg-[rgba(220,20,60,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-semibold"
                    title="Delete Video"
                    onClick={handleDeleteVideo}
                >
                    delete
                </button>
            )}

            {/* desktop navigators, mobile comment & like buttons */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {mobileComments ? (
                    <VideoActions videoKey={videoKey} viewMode="vertical" />
                ) : (
                    <>
                        <button
                            type="button"
                            disabled={swipeDisabled || prevSwipeDisabled}
                            onClick={() => swipe("prev")}
                            className="material-symbols-outlined drop-shadow-3xl disabled:opacity-50 disabled:pointer-events-none select-none transition cursor-pointer bg-[rgba(84,84,84,0.5)] hover:bg-[rgba(84,84,84,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-bold"
                        >
                            expand_less
                        </button>
                        <button
                            type="button"
                            disabled={swipeDisabled}
                            onClick={() => swipe("next")}
                            className="material-symbols-outlined drop-shadow-3xl disabled:opacity-50 disabled:pointer-events-none select-none transition cursor-pointer bg-[rgba(84,84,84,0.5)] hover:bg-[rgba(84,84,84,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-bold"
                        >
                            expand_more
                        </button>
                    </>
                )}
            </div>

            {/* mute / unmute */}
            <button
                type="button"
                onClick={toggleMuted}
                className="material-symbols-outlined drop-shadow-3xl absolute bottom-5 right-5 select-none transition cursor-pointer bg-[rgba(84,84,84,0.5)] hover:bg-[rgba(84,84,84,1)] rounded-full text-3xl w-12 h-12 flex justify-center items-center font-bold"
            >
                {muted ? "volume_off" : "volume_up"}
            </button>
        </>
    );
};

export default VideoControls;
