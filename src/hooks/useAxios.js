import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const useAxios = () => {
    const { auth } = useAuthContext();

    useEffect(() => {
        const intercept = instance.interceptors.request.use(
            (config) => {
                if (auth) {
                    config.headers.Authorization = `Bearer ${auth.token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            instance.interceptors.request.eject(intercept);
        };
    }, [auth]);

    return instance;
};

export default useAxios;
