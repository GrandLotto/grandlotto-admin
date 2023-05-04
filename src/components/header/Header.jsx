import React from "react";
import Topheader from "./Topheader";
import "./header.scss";
import OauthMenu from "./OauthMenu";

const Header = () => {
  return (
    <>
      <Topheader />
      <OauthMenu />
    </>
  );
};

export default Header;
