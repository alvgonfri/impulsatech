import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SubjectProvider } from "./context/SubjectContext";
import { CampaignProvider } from "./context/CampaignContext";
import { FinancialDonationProvider } from "./context/FinancialDonationContext";
import { TimeDonationProvider } from "./context/TimeDonationContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import InformationPage from "./pages/InformationPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/auth/ProfilePage";
import OtherProfilePage from "./pages/auth/OtherProfilePage";
import CampaignsPage from "./pages/campaign/CampaignsPage";
import CancelledCampaignsPage from "./pages/campaign/CancelledCampaignsPage";
import CompletedCampaignsPage from "./pages/campaign/CompletedCampaignsPage";
import CampaignPage from "./pages/campaign/CampaignPage";
import CampaignDonations from "./pages/campaign/CampaignDonations";
import CampaignFormPage from "./pages/campaign/CampaignFormPage";
import CampaignSearch from "./pages/campaign/CampaignSearch";
import FinancialDonationSuccess from "./pages/financialDonation/FinancialDonationSuccess";
import FinancialDonationCancel from "./pages/financialDonation/FinancialDonationCancel";
import TimeRecordPage from "./pages/timeRecord/TimeRecordPage";
import StatsPage from "./pages/stats/StatsPage";
import PostFormPage from "./pages/post/PostFormPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/legal/TermsOfUsePage";
import Footer from "./components/Footer";

function App() {
    return (
        <AuthProvider>
            <SubjectProvider>
                <CampaignProvider>
                    <FinancialDonationProvider>
                        <TimeDonationProvider>
                            <BrowserRouter>
                                <Navbar />
                                <main className="mt-24 min-h-screen">
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<HomePage />}
                                        />
                                        <Route
                                            path="/information"
                                            element={<InformationPage />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<RegisterPage />}
                                        />
                                        <Route
                                            path="/login"
                                            element={<LoginPage />}
                                        />
                                        <Route
                                            path="/profile/:id"
                                            element={<OtherProfilePage />}
                                        />
                                        <Route
                                            path="/campaigns"
                                            element={<CampaignsPage />}
                                        />
                                        <Route
                                            path="/cancelled-campaigns"
                                            element={<CancelledCampaignsPage />}
                                        />
                                        <Route
                                            path="/completed-campaigns"
                                            element={<CompletedCampaignsPage />}
                                        />
                                        <Route
                                            path="/campaigns/search"
                                            element={<CampaignSearch />}
                                        />
                                        <Route
                                            path="/campaigns/:id"
                                            element={<CampaignPage />}
                                        />
                                        <Route
                                            path="/financial-donation/success"
                                            element={
                                                <FinancialDonationSuccess />
                                            }
                                        />
                                        <Route
                                            path="/financial-donation/cancel"
                                            element={
                                                <FinancialDonationCancel />
                                            }
                                        />
                                        <Route
                                            path="/privacy-policy"
                                            element={<PrivacyPolicyPage />}
                                        />
                                        <Route
                                            path="/terms-of-use"
                                            element={<TermsOfUsePage />}
                                        />
                                        <Route element={<ProtectedRoute />}>
                                            <Route
                                                path="/campaigns/create"
                                                element={<CampaignFormPage />}
                                            />
                                            <Route
                                                path="/profile"
                                                element={<ProfilePage />}
                                            />
                                            <Route
                                                path="/time-record"
                                                element={<TimeRecordPage />}
                                            />
                                            <Route
                                                path="/campaigns/:id/donations"
                                                element={<CampaignDonations />}
                                            />
                                            <Route
                                                path="/campaigns/:id/posts/create"
                                                element={<PostFormPage />}
                                            />
                                            <Route
                                                path="/stats"
                                                element={<StatsPage />}
                                            />
                                        </Route>
                                        <Route
                                            path="*"
                                            element={<h1>Not Found</h1>}
                                        />
                                    </Routes>
                                </main>
                                <Footer />
                            </BrowserRouter>
                        </TimeDonationProvider>
                    </FinancialDonationProvider>
                </CampaignProvider>
            </SubjectProvider>
        </AuthProvider>
    );
}

export default App;
