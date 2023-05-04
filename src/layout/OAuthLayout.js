/* eslint-disable no-unused-vars */
import React, { useLayoutEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Logo from "../assets/images/grandlotto.png";
import { useSelector } from "react-redux";

const OAuthLayout = () => {
  const isLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  useLayoutEffect(() => {}, [isLoggedIn]);

  return (
    <>
      <div className="lottoHeightWeightPage">
        <div className="logoheaderPage">
          <img src={Logo} alt="grand-logo" style={{ width: 190 }} />
          <p>Admin Dashboard</p>
        </div>

        <div className="lottoHeightWeightBody">
          {isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Outlet />}
        </div>
      </div>
    </>
  );
};

export default OAuthLayout;
