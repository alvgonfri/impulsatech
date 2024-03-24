import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import CampaignsPage from "./pages/campaign/CampaignsPage";
import CampaignFormPage from "./pages/campaign/CampaignFormPage";
import { CampaignProvider } from "./context/CampaignContext";

function App() {
    return (
        <AuthProvider>
            <CampaignProvider>
                <BrowserRouter>
                    <Navbar />
                    <main className="mt-24">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/campaigns"
                                element={<CampaignsPage />}
                            />
                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path="/campaigns/create"
                                    element={<CampaignFormPage />}
                                />
                            </Route>
                            <Route path="*" element={<h1>Not Found</h1>} />
                        </Routes>
                    </main>
                </BrowserRouter>
            </CampaignProvider>
        </AuthProvider>
    );
}

export default App;
