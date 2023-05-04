/* eslint-disable no-unused-vars */
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import HeaderTop from "../components/header/HeaderTop";
import BetSlipMobile from "../components/sidebar/BetSlipMobile";
import MobileMenu from "../components/sidebar/MobileMenu";
import Sidebar from "../components/sidebar/Sidebar";
import { dropDownMenuTab } from "../global/customFunctions";

const LoggedInLayout = () => {
  const isLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  useLayoutEffect(() => {
    dropDownMenuTab();
  }, [isLoggedIn]);

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="content-body">
        <HeaderTop />
        {isLoggedIn ? <Outlet /> : <Navigate to="/" />}
      </div>

      <MobileMenu />
      <BetSlipMobile />
    </div>
  );
};

export default LoggedInLayout;
