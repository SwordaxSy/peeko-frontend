import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Video from "./pages/Video";
import Loading from "./components/Loading";

const App = () => {
    const { authLoading, authorized } = useAuthContext();

    if (authLoading) {
        return <Loading />;
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/auth"
                        element={!authorized ? <Auth /> : <Navigate to="/" />}
                    />
                    <Route path="/video" element={<Home />} />
                    <Route path="/video/:videoKey" element={<Video />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
