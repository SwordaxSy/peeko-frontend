import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const userAuth = JSON.parse(localStorage.getItem("auth"));

        if (userAuth) {
            setAuth(userAuth);
        }

        if (userAuth?.userDocument.activation.activated) {
            setAuthorized(true);
        }

        setAuthLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, authLoading, authorized }}
        >
            {children}
        </AuthContext.Provider>
    );
};
