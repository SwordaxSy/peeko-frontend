import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useAxios from "../hooks/useAxios";

import Comment from "./Comment";
import CommentInput from "./CommentInput";

const VideoData = ({
    videoKey,
    showComments,
    activateAlert,
    setAlertText,
    mobileComments,
    activeMobileComments,
    setActiveMobileComments,
    setUploaderId,
    confirmation,
}) => {
    const axios = useAxios();
    const { auth } = useAuthContext();

    // video metadata states
    const [publisher, setPublisher] = useState("");
    const [timestamp, setTimestamp] = useState(new Date());
    const [likes, setLikes] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [liked, setLiked] = useState(false);

    // comment section states
    const [comments, setComments] = useState([]);
    const [commentEnabled, setCommentEnabled] = useState(false);
    const [comment, setComment] = useState("");
    const [currentActiveDelete, setCurrentActiveDelete] = useState("");

    // handle share
    const handleShare = () => {
        navigator.clipboard
            .writeText(`${window.location.host}/video/${videoKey}`)
            .then(() => {
                activateAlert();
                setAlertText("Copied Link");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // onFeedback state change
    const handleOnFeedback = () => {
        axios
            .put(`/feedback/toggleLike`, { videoKey })
            .then(({ data }) => {
                if (data.success) {
                    setLikes(data.likesCount);
                    setLiked(data.operation === "LIKE");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // onComment state change
    const handleOnComment = (comment) => {
        axios
            .post(`/comment/postComment`, { videoKey, comment })
            .then(({ data }) => {
                if (data.success) {
                    setComments((prev) => [data.commentDocument, ...prev]);
                    setCommentsCount(data.newCommentsCount);
                    setComment("");
                    setCommentEnabled(false);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // fetch video data
    useEffect(() => {
        if (!auth) return;

        const requests = [
            axios.get(`/video/getVideo/${videoKey}`),
            axios.get(`/comment/getComments/${videoKey}`),
        ];

        Promise.all(requests)
            .then((responses) => {
                const { data: videoData } = responses[0];
                const { data: commentsData } = responses[1];

                if (videoData.success) {
                    setUploaderId(videoData.videoDocument.uploaderId);
                    setPublisher(videoData.videoDocument.uploaderUsername);
                    setTimestamp(videoData.videoDocument.createdAt);
                    setLikes(videoData.videoDocument.likes.length);
                    setCommentsCount(videoData.videoDocument.commentsCount);
                    setLiked(
                        videoData.videoDocument.likes.includes(
                            auth.userDocument._id
                        )
                    );
                }

                if (commentsData.success) {
                    setComments(commentsData.commentDocuments);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [auth, videoKey, setUploaderId, axios]);

    return (
        <div
            className={`max-w-[500px] w-[100%] h-[100svh] fixed right-0 transition-transform ${
                mobileComments && !activeMobileComments
                    ? "translate-x-full"
                    : ""
            }`}
        >
            <div className="w-full h-full bg-gradient-to-br from-primary-1 to-primary-2 absolute brightness-50 -z-10"></div>

            <div className="w-full h-full p-3 flex flex-col justify-start relative z-10">
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

                        <span className="material-symbols-outlined text-5xl select-none">
                            account_circle
                        </span>

                        <div>
                            <p className="font-bold text-lg">{publisher}</p>
                            <p className="text-sm text-[rgba(255,255,255,0.7)]">
                                {formatDistanceToNow(new Date(timestamp), {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div
                            onClick={handleOnFeedback}
                            className="p-3 rounded-lg flex flex-col justify-center items-center hover:bg-[rgba(255,255,255,0.1)] transition cursor-pointer"
                        >
                            <span
                                className={`material-icons-outlined transition ${
                                    liked ? "text-error" : ""
                                }`}
                            >
                                {liked ? "favorite" : "favorite_border"}
                            </span>
                            <p>{likes}</p>
                        </div>

                        <div className="p-3 rounded-lg flex flex-col justify-center items-center">
                            <span className="material-symbols-outlined">
                                chat
                            </span>
                            <p>{commentsCount}</p>
                        </div>

                        <div
                            onClick={handleShare}
                            className="p-3 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition cursor-pointer"
                        >
                            <span className="material-symbols-outlined">
                                share
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bg-[rgba(13,13,13,0.4)] h-[calc(100%-124px)] rounded-xl p-2 relative">
                    <div className="overflow-auto h-full pr-1 pb-8">
                        {comments.length > 0 && showComments ? (
                            comments.map((commentDocument) => (
                                <Comment
                                    key={commentDocument._id}
                                    commentDocument={commentDocument}
                                    currentActiveDelete={currentActiveDelete}
                                    setCurrentActiveDelete={
                                        setCurrentActiveDelete
                                    }
                                    confirmation={confirmation}
                                    activateAlert={activateAlert}
                                    setAlertText={setAlertText}
                                    setComments={setComments}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center relative top-1/2 -translate-y-1/2 opacity-50">
                                <span className="material-icons-outlined text-6xl">
                                    feedback
                                </span>
                                <p className="text-2xl">
                                    Be the first to comment
                                </p>
                            </div>
                        )}
                    </div>

                    <CommentInput
                        commentState={comment}
                        setCommentState={setComment}
                        commentEnabled={commentEnabled}
                        setCommentEnabled={setCommentEnabled}
                        handleOnComment={handleOnComment}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoData;
