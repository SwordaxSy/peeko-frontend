import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Video from "./pages/Video";
import useAuthStore from "./store/authStore";

const App = () => {
    const { authorized } = useAuthStore();

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
