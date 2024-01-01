import numeral from "numeral";
import useAxios from "../hooks/useAxios";
import useVideoDataStore from "../store/videoDataStore";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const VideoActions = ({ videoKey, viewMode }) => {
    const axios = useAxios();
    const { auth } = useAuthContext();
    const navigate = useNavigate();
    const {
        feedback,
        liked,
        likesCount,
        commentsCount,
        share,
        setActiveMobileComments,
    } = useVideoDataStore();

    return (
        <div
            className={`${viewMode === "horizontal" ? "flex items-start" : ""}`}
        >
            <div
                onClick={() =>
                    auth ? feedback(videoKey, axios) : navigate("/auth")
                }
                className="p-3 rounded-lg flex flex-col justify-center items-center hover:bg-[rgba(255,255,255,0.1)] transition cursor-pointer"
            >
                <span
                    className={`material-icons-outlined transition ${
                        liked ? "text-error" : ""
                    }`}
                >
                    {liked ? "favorite" : "favorite_border"}
                </span>
                <p>{numeral(likesCount).format("0a")}</p>
            </div>

            <div
                className={`p-3 rounded-lg flex flex-col justify-center items-center ${
                    viewMode === "vertical"
                        ? "hover:bg-[rgba(255,255,255,0.1)] transition cursor-pointer"
                        : ""
                }`}
                onClick={
                    viewMode === "vertical"
                        ? () => setActiveMobileComments(true)
                        : null
                }
            >
                <span className="material-symbols-outlined">chat</span>
                <p>{numeral(commentsCount).format("0a")}</p>
            </div>

            <div
                onClick={() => share(videoKey)}
                className="p-3 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition cursor-pointer"
            >
                <span className="material-symbols-outlined">share</span>
            </div>
        </div>
    );
};

export default VideoActions;
