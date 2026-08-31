import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileCompletingPage from "./pages/ProfileCompletingPage";
import OtpVerfiy from "./pages/OtpVerfiy";
import ProtectedRoute from "./ProtectedRoute";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import BannerManagement from "./pages/BannerManagement";
import AuthInitializer from "./AuthInitializer";
import PageNotFound from "./pages/PageNotFound";
import Opportunities from "./pages/Opportunities";
import CreateOpportunity from "./pages/CreateOpportunity";
import OpportunityDetails from "./pages/OpportunityDetails";
import LaunchPage from "./pages/LaunchPage";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <>
      <AuthInitializer>
        <Routes>
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities/create" element={<CreateOpportunity />} />
          <Route path="/opportunities/:id" element={<OpportunityDetails />} />
          <Route path="/feed" element={<HomePage />} />
          <Route path="/" element={<LaunchPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/verfiy/otp"
            element={
              <ProtectedRoute>
                <OtpVerfiy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <ProfileCompletingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/banner" element={<BannerManagement />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthInitializer>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </>
  );
};

export default App;
