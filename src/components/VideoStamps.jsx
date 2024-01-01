import { formatDistanceToNow } from "date-fns";
import useVideoDataStore from "../store/videoDataStore";

const VideoStamps = ({ viewMode }) => {
    const { uploaderUsername, timestamp } = useVideoDataStore();

    return (
        <div
            className={`flex justify-center items-center gap-2 ${
                viewMode === "VideoView" ? "absolute bottom-3 left-3" : ""
            }`}
        >
            <span className="material-symbols-outlined text-5xl select-none">
                account_circle
            </span>

            <div>
                <p className="font-bold text-lg">{uploaderUsername}</p>
                <p className="text-sm text-[rgba(255,255,255,0.7)]">
                    {formatDistanceToNow(new Date(timestamp), {
                        addSuffix: true,
                    })}
                </p>
            </div>
        </div>
    );
};

export default VideoStamps;
