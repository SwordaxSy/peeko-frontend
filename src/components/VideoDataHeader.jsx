import useDataStore from "../store/dataStore";
import VideoActions from "./VideoActions";
import VideoStamps from "./VideoStamps";

const VideoDataHeader = ({ videoKey, mobileComments }) => {
    const { setActiveMobileComments } = useDataStore();

    return (
        <div className="flex justify-between items-center h-[100px] overflow-x-auto comments-top">
            <div className="flex justify-center items-center gap-2">
                {mobileComments && (
                    <span
                        className="material-symbols-outlined text-4xl p-2 cursor-pointer"
                        onClick={() => setActiveMobileComments(false)}
                    >
                        arrow_forward
                    </span>
                )}

                <VideoStamps />
            </div>

            <VideoActions videoKey={videoKey} viewMode="horizontal" />
        </div>
    );
};

export default VideoDataHeader;
