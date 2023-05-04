/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import AllModal from "../components/modal/AllModal";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <AllModal />
    </>
  );
};

export default MainLayout;
