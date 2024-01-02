import numeral from "numeral";
import useAxios from "../hooks/useAxios";
import useDataStore from "../store/dataStore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const VideoActions = ({ videoKey, viewMode }) => {
    const axios = useAxios();
    const { authorized } = useAuthStore();
    const navigate = useNavigate();
    const {
        feedback,
        liked,
        likesCount,
        commentsCount,
        share,
        setActiveMobileComments,
    } = useDataStore();

    const styles = {
        vertical: {
            container: `flex flex-col gap-1`,
            icon: `text-3xl`,
            text: `text-xl`,
        },
        horizontal: {
            container: `flex items-start gap-1`,
            icon: `text-2xl`,
            text: `text-lg`,
        },
    };

    return (
        <div className={styles[viewMode].container}>
            <div
                onClick={() =>
                    authorized ? feedback(videoKey, axios) : navigate("/auth")
                }
                className="p-2 rounded-lg flex flex-col justify-center items-center xhover:hover:opacity-50 transition cursor-pointer"
            >
                <span
                    className={`material-icons-outlined transition drop-shadow-3xl ${
                        styles[viewMode].icon
                    } ${liked ? "text-error" : ""}`}
                >
                    {liked ? "favorite" : "favorite_border"}
                </span>
                <p className={`drop-shadow-3xl ${styles[viewMode].text}`}>
                    {numeral(likesCount).format("0a")}
                </p>
            </div>

            <div
                className={`p-2 rounded-lg flex flex-col justify-center items-center ${
                    viewMode === "vertical"
                        ? "xhover:hover:opacity-50 transition cursor-pointer"
                        : ""
                }`}
                onClick={
                    viewMode === "vertical"
                        ? () => setActiveMobileComments(true)
                        : null
                }
            >
                <span
                    className={`material-symbols-outlined drop-shadow-3xl ${styles[viewMode].icon}`}
                >
                    chat
                </span>
                <p className={`drop-shadow-3xl ${styles[viewMode].text}`}>
                    {numeral(commentsCount).format("0a")}
                </p>
            </div>

            <div
                onClick={() => share(videoKey)}
                className="p-2 rounded-lg xhover:hover:opacity-50 transition cursor-pointer"
            >
                <span
                    className={`material-symbols-outlined drop-shadow-3xl ${styles[viewMode].icon}`}
                >
                    share
                </span>
            </div>
        </div>
    );
};

export default VideoActions;
