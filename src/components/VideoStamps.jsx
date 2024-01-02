import { formatDistanceToNow } from "date-fns";
import useDataStore from "../store/dataStore";

const VideoStamps = ({ viewMode }) => {
    const { uploaderUsername, timestamp } = useDataStore();

    return (
        <div
            className={`flex justify-center items-center gap-2 ${
                viewMode === "view-mode" ? "absolute bottom-3 left-3" : ""
            }`}
        >
            <span className="material-symbols-outlined drop-shadow-3xl text-5xl select-none">
                account_circle
            </span>

            <div>
                <p className="font-bold text-lg drop-shadow-3xl">
                    {uploaderUsername}
                </p>
                <p className="text-sm text-[rgba(255,255,255,0.7)] drop-shadow-3xl">
                    {formatDistanceToNow(new Date(timestamp), {
                        addSuffix: true,
                    })}
                </p>
            </div>
        </div>
    );
};

export default VideoStamps;
