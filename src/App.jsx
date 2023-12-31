import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Video from "./pages/Video";

const App = () => {
    const { auth, authLoading } = useAuthContext();
    const authrorized = auth?.userDocument?.activation?.activated || false;

    if (authLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            authrorized ? <Home /> : <Navigate to="/auth" />
                        }
                    />
                    <Route
                        path="/auth"
                        element={!authrorized ? <Auth /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/video"
                        element={
                            authrorized ? <Video /> : <Navigate to="/auth" />
                        }
                    />
                    <Route
                        path="/video/:videoKey"
                        element={
                            authrorized ? <Video /> : <Navigate to="/auth" />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
