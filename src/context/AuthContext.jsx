import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const userAuth = JSON.parse(localStorage.getItem("auth"));

        if (userAuth) {
            setAuth(userAuth);
        }

        setAuthLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
