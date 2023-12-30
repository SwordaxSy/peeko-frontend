import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useAxios from "./useAxios";

export default function useAuthenticate() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const axios = useAxios();

    const { setAuth } = useAuthContext();

    const authenticate = async (mode, authData) => {
        setError("");
        setIsLoading(true);

        const requestBody = {
            username: mode === "register" ? authData.username : null,
            email: mode === "register" ? authData.email : null,
            credential: mode === "signIn" ? authData.credential : null,
            password: authData.password,
        };

        axios
            .post(`user/${mode}`, requestBody)
            .then(({ data }) => {
                if (data.success) {
                    setError("");

                    const authPayload = {
                        userDocument: data.userDocument,
                        token: data.token,
                    };

                    localStorage.setItem("auth", JSON.stringify(authPayload));
                    setAuth(authPayload);
                }
            })
            .catch((err) => {
                console.error(err);
                if (err.response) {
                    setError(err.response.data.error);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const signout = () => {
        localStorage.removeItem("auth");
        setAuth(null);
    };

    return { authenticate, signout, error, setError, isLoading, setIsLoading };
}
