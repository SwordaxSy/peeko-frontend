import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxios from "./useAxios";

export const useSwipe = () => {
    const navigate = useNavigate();
    const axios = useAxios();

    const [swipeDisabled, setSwipeDisabled] = useState(false);
    const [prevSwipeDisabled, setPrevSwipeDisabled] = useState(true);
    const [lastSwipe, setLastSwipe] = useState("next");

    const fillQueue = async (val = 10) => {
        return new Promise((resolve) => {
            axios
                .get(`/video/getVideos/${val}`)
                .then(({ data }) => {
                    if (data.success) {
                        const currentKeys =
                            JSON.parse(sessionStorage.getItem("videoKeys")) ||
                            [];

                        const newKeys = currentKeys.concat(
                            data.videoDocuments.map((doc) => doc.videoKey)
                        );

                        sessionStorage.setItem(
                            "videoKeys",
                            JSON.stringify(newKeys)
                        );

                        let returnValue = null;
                        if (currentKeys.length === 0) {
                            returnValue = newKeys[0];
                            sessionStorage.setItem("current", 0);
                            setPrevSwipeDisabled(true);
                        }

                        resolve(returnValue);
                    } else throw Error("Filling Queue Failed");
                })
                .catch((err) => {
                    console.error(err);
                    resolve(null);
                });
        });
    };

    const swipe = async (dir) => {
        if (swipeDisabled) return;
        setSwipeDisabled(true);
        setLastSwipe(dir);

        setTimeout(() => {
            setSwipeDisabled(false);
        }, 500);

        const keys = JSON.parse(sessionStorage.getItem("videoKeys")) || [];
        const current = parseInt(sessionStorage.getItem("current")) || 0;

        setPrevSwipeDisabled(current === 1 && dir === "prev");

        switch (dir) {
            case "prev": {
                if (current > 0) {
                    const prevIndex = current - 1;
                    sessionStorage.setItem("current", prevIndex);

                    navigate(`/video/${keys[prevIndex]}`);
                } else {
                    throw Error(
                        "Current key is at index 0, no previous videos exist"
                    );
                }
                break;
            }
            case "next": {
                if (current + 1 < keys.length) {
                    const nextIndex = current + 1;
                    sessionStorage.setItem("current", nextIndex);

                    navigate(`/video/${keys[nextIndex]}`);

                    if (keys.length - nextIndex <= 4) await fillQueue();
                } else {
                    const key = await fillQueue();

                    if (key || key === undefined) {
                        navigate(`/video/${key}`);
                    }
                }
                break;
            }
            default:
                throw Error("Unrecognized swipe direction");
        }
    };

    return {
        swipe,
        fillQueue,
        swipeDisabled,
        setSwipeDisabled,
        prevSwipeDisabled,
        setPrevSwipeDisabled,
        lastSwipe,
    };
};
