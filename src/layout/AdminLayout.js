/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const isAdmin = useSelector((state) => state.oauth.isAdmin);

  useLayoutEffect(() => {}, [isAdmin]);

  return <Outlet />;
};

export default AdminLayout;
