import numeral from "numeral";
import useAxios from "../hooks/useAxios";
import useDataStore from "../store/dataStore";
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
    } = useDataStore();

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
                    className={`material-icons-outlined transition drop-shadow-3xl text-3xl ${
                        liked ? "text-error" : ""
                    }`}
                >
                    {liked ? "favorite" : "favorite_border"}
                </span>
                <p className="drop-shadow-3xl text-xl">
                    {numeral(likesCount).format("0a")}
                </p>
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
                <span className="material-symbols-outlined drop-shadow-3xl text-3xl">
                    chat
                </span>
                <p className="drop-shadow-3xl text-xl">
                    {numeral(commentsCount).format("0a")}
                </p>
            </div>

            <div
                onClick={() => share(videoKey)}
                className="p-3 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition cursor-pointer"
            >
                <span className="material-symbols-outlined drop-shadow-3xl text-3xl">
                    share
                </span>
            </div>
        </div>
    );
};

export default VideoActions;
