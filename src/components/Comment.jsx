import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useAuthContext from "../hooks/useAuthContext";

const Comment = ({
    commentDocument,
    currentActiveDelete,
    setCurrentActiveDelete,
    confirmation,
    activateAlert,
    setAlertText,
    setComments,
}) => {
    const axios = useAxios();
    const { auth } = useAuthContext();

    const handleContextMenu = (e) => {
        e.preventDefault();
        setCurrentActiveDelete(commentDocument._id);
    };

    const handleDeleteComment = async () => {
        setCurrentActiveDelete("");

        const approval = await confirmation(
            "Are you sure you want to delete your comment?"
        );
        if (!approval) return;

        axios
            .delete(`/comment/deleteComment/${commentDocument._id}`)
            .then(({ data }) => {
                if (data.success) {
                    setComments((prev) =>
                        prev.filter(
                            (comment) => comment._id !== commentDocument._id
                        )
                    );
                    setAlertText("Comment deleted successfully");
                    activateAlert();
                }
            })
            .catch((err) => {
                console.error(err);
                setAlertText("Failed to delete comment");
                activateAlert("error");
            });
    };

    useEffect(() => {
        const clickHandler = (e) => {
            if (e.target.closest("#deleteCommentButton")) return;
            setCurrentActiveDelete("");
        };

        window.addEventListener("click", clickHandler);

        return () => {
            window.removeEventListener("click", clickHandler);
        };
    }, [setCurrentActiveDelete]);

    return (
        <div
            className="flex flex-col py-3 relative"
            onContextMenu={handleContextMenu}
        >
            <div className="top flex justify-center items-center w-fit gap-1">
                <span className="material-symbols-outlined text-2xl">
                    account_circle
                </span>
                <p className="text-md font-semibold">
                    {commentDocument.commentorUsername}
                </p>
                <p className="text-sm text-[rgba(255,255,255,0.7)] pl-3">
                    {formatDistanceToNow(new Date(commentDocument.createdAt), {
                        addSuffix: true,
                    })}
                </p>
            </div>

            <p className="pl-3 pt-1">{commentDocument.comment}</p>

            <div
                id="deleteCommentButton"
                onClick={handleDeleteComment}
                className={`${
                    currentActiveDelete === commentDocument._id &&
                    auth.userDocument._id === commentDocument.commentorId
                        ? ""
                        : "opacity-0 pointer-events-none"
                } w-full h-full absolute flex justify-center items-center rounded-lg bg-[rgba(220,20,60,0.8)] select-none cursor-pointer`}
            >
                <p className="font-bold text-2xl">Delete Comment</p>
            </div>
        </div>
    );
};

export default Comment;
