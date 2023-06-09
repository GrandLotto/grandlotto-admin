/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import LoggedInLayout from "../layout/LoggedInLayout";
import MainLayout from "../layout/MainLayout";
import OAuthLayout from "../layout/OAuthLayout";
// import ThreeColLayout from "../layout/ThreeColLayout";
import TwoColLayout from "../layout/TwoColLayout";
import AdminCreateGames from "../pages/admin/AdminCreateGames";
import AdminCreateGametypes from "../pages/admin/AdminCreateGametypes";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminGameWinning from "../pages/admin/AdminGameWinning";
import AdminTransactionsPage from "../pages/admin/AdminTransactionsPage";
import AdminUserAccountPage from "../pages/admin/AdminUserAccountPage";
import AdminVerifyKYCPage from "../pages/admin/AdminVerifyKYCPage";

// import Home from "../pages/Home";

import AdminValidateGames from "../pages/admin/AdminValidateGames";
import LoginPage from "../pages/LoginPage";
import AdminGamesPlayed from "../pages/admin/AdminGamesPlayed";
import AdminValidatedGames from "../pages/admin/AdminValidatedGames";
import AdminValidationResult from "../pages/admin/AdminValidationResult";
import AdminSalesByGame from "../pages/admin/AdminSalesByGame";

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<OAuthLayout />}>
            <Route path="/" exact element={<LoginPage />} />
          </Route>
          <Route element={<LoggedInLayout />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/transactions"
                element={<AdminTransactionsPage />}
              />
              <Route
                path="/admin/verify-kyc"
                element={<AdminVerifyKYCPage />}
              />
              <Route
                path="/admin/user-controls"
                element={<AdminUserAccountPage />}
              />
              <Route
                path="/admin/games/create-games-types"
                element={<AdminCreateGametypes />}
              />
              <Route
                path="/admin/games/games-played"
                element={<AdminGamesPlayed />}
              />
              <Route
                path="/admin/games/create-games"
                element={<AdminCreateGames />}
              />
              <Route
                path="/admin/games/validate-games"
                element={<AdminValidateGames />}
              />
              <Route
                path="/admin/games/validated-games"
                element={<AdminValidatedGames />}
              />
              <Route
                path="/admin/games/validation-results"
                element={<AdminValidationResult />}
              />
              <Route
                path="/admin/games/sales-by-game"
                element={<AdminSalesByGame />}
              />
              <Route
                path="/admin/games/winnings"
                element={<AdminGameWinning />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default MyRouter;
