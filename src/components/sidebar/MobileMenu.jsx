import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setMobileMenu, setSideBarMenu } from "../../store/alert/alertSlice";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);

  return (
    <div className="mobile-menu">
      <a
        href="true"
        onClick={(e) => {
          e.preventDefault();
          dispatch(setMobileMenu(false));
          dispatch(setSideBarMenu(!sideBarMenu));
        }}
      >
        <div>
          <i className="bx bx-menu"></i>
        </div>
        <span>Menu</span>
      </a>

      <NavLink to="/admin/dashboard">
        <div>
          <i className="bx bx-layout"></i>
        </div>
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/admin/games/create-games">
        <div>
          <i className="bx bxs-bowling-ball"></i>
        </div>
        <span>Game</span>
      </NavLink>

      <NavLink to="/admin/verify-kyc">
        <div>
          <i className="bx bx-food-menu"></i>
        </div>
        <span>KYC</span>
      </NavLink>

      <NavLink to="/admin/transactions">
        <div>
          <i className="bx bx-receipt"></i>
        </div>
        <span>Trans.</span>
      </NavLink>
    </div>
  );
};

export default MobileMenu;
