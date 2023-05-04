/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import BetSlipMobile from "../components/sidebar/BetSlipMobile";
import MobileMenu from "../components/sidebar/MobileMenu";
import SidebarMenuMobile from "../components/sidebar/SidebarMenuMobile";
import DigitalClock from "../global/DigitalClock";

const TwoColLayout = () => {
  return (
    <>
      <div className="oauth-wrapper">
        <Header />
        <SidebarMenuMobile />
        <div className="threeColWrapper twoColWrapper">
          <Outlet />
        </div>
        <Footer />

        <MobileMenu />
        <BetSlipMobile />
      </div>
    </>
  );
};

export default TwoColLayout;
