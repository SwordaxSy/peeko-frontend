import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useAxios from "../hooks/useAxios";

export default function useActivate() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { auth, setAuth } = useAuthContext();
    const axios = useAxios();

    const activate = async (activationCode) => {
        if (!auth) return;
        setIsLoading(true);

        axios
            .put(`/user/activateAccount`, { activationCode })
            .then(({ data }) => {
                if (data.success) {
                    setError("");

                    const newAuth = JSON.parse(JSON.stringify(auth));
                    newAuth.userDocument.activation.activated = true;
                    localStorage.setItem("auth", JSON.stringify(newAuth));
                    setAuth(newAuth);
                }

                return data;
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.error);
                } else {
                    console.error(err);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return { activate, error, setError, isLoading, setIsLoading };
}
