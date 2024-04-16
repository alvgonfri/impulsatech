import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CampaignProvider } from "./context/CampaignContext";
import { FinancialDonationProvider } from "./context/FinancialDonationContext";
import { TimeDonationProvider } from "./context/TimeDonationContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import CampaignsPage from "./pages/campaign/CampaignsPage";
import CampaignPage from "./pages/campaign/CampaignPage";
import CampaignFormPage from "./pages/campaign/CampaignFormPage";
import FinancialDonationSuccess from "./pages/financialDonation/FinancialDonationSuccess";
import FinancialDonationCancel from "./pages/financialDonation/FinancialDonationCancel";

function App() {
    return (
        <AuthProvider>
            <CampaignProvider>
                <FinancialDonationProvider>
                    <TimeDonationProvider>
                        <BrowserRouter>
                            <Navbar />
                            <main className="mt-24">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route
                                        path="/register"
                                        element={<RegisterPage />}
                                    />
                                    <Route
                                        path="/login"
                                        element={<LoginPage />}
                                    />
                                    <Route
                                        path="/campaigns"
                                        element={<CampaignsPage />}
                                    />
                                    <Route
                                        path="/campaigns/:id"
                                        element={<CampaignPage />}
                                    />
                                    <Route element={<ProtectedRoute />}>
                                        <Route
                                            path="/campaigns/create"
                                            element={<CampaignFormPage />}
                                        />
                                    </Route>
                                    <Route
                                        path="/financial-donation/success"
                                        element={<FinancialDonationSuccess />}
                                    />
                                    <Route
                                        path="/financial-donation/cancel"
                                        element={<FinancialDonationCancel />}
                                    />
                                    <Route
                                        path="*"
                                        element={<h1>Not Found</h1>}
                                    />
                                </Routes>
                            </main>
                        </BrowserRouter>
                    </TimeDonationProvider>
                </FinancialDonationProvider>
            </CampaignProvider>
        </AuthProvider>
    );
}

export default App;
