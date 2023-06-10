import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal } from "../../store/alert/alertSlice";

const SidebarMenuMobile = () => {
  const dispatch = useDispatch();

  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);
  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  return (
    <>
      <div
        className={`sidebar  ${
          sideBarMenu ? "showSidebarMenu" : ""
        } showOnMobile`}
      >
        <div className="sidebar-mobile">
          {isUserLoggedIn && (
            <>
              <div className="sidebarMobleHeader">
                {/* <img src={person} alt="grand-logo" style={{ width: 70 }} /> */}
                <div className="imageInitial">D</div>
                <h4 className="">Welcome, David</h4>
                <p className="pb-4">ID: 3542453995</p>
              </div>
              {/* <div className="sidebarMobleHeaderTopBalance">
                <h4 className="">Wallet Balance</h4>
                <p className="">
                  ₦
                  {accountBalances?.totalBalance
                    ? addComma(accountBalances?.totalBalance)
                    : accountBalances?.totalBalance}
                </p>
              </div>
              <div className="sidebarMobleHeaderBottomBalance">
                <div className="sidebarMobleHeaderBottomBalanceItem">
                  <h4 className="">Withdrawable</h4>
                  <p className="">
                    ₦
                    {accountBalances?.winningBalance
                      ? addComma(accountBalances?.winningBalance)
                      : accountBalances?.winningBalance}
                  </p>
                </div>
                <div className="sidebarMobleHeaderBottomBalanceItem">
                  <h4 className="">Bonus </h4>
                  <p className="">
                    ₦
                    {accountBalances?.bonusAccount
                      ? addComma(accountBalances?.bonusAccount)
                      : accountBalances?.bonusAccount}
                  </p>
                </div>
              </div> */}
            </>
          )}

          {/* {isUserLoggedIn && (
            <div className="sidebarMobleHeaderWalletButtons"></div>
          )} */}

          {isUserLoggedIn ? (
            <div className="sidebarLinkMenus">
              <div className="sidebarLinkMenusDiv">
                <NavLink className="sidebarLinkMenusItem" to="/admin/dashboard">
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Dashboard</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/transactions"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>All Transactions</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/create-games-types"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Games types</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/create-games"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Create games</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/games-played"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Games played</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/validate-games"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Validate games</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/validated-games"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>All Validated games</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/validation-results"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Validation game results</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/sales-by-game"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Sales By Game</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/games/winnings"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Winnings</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/verify-kyc"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>Verify KYC</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <NavLink
                  className="sidebarLinkMenusItem"
                  to="/admin/user-controls"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-layout"></i>
                    <span>User Controls</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
              </div>
            </div>
          ) : null}
          <a
            href="true"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                setLogoutModal({
                  status: true,
                  payload: null,
                })
              );
            }}
            className="sidebarLinkMenusItem "
          >
            <div className="sidebarLinkMenusItemLeft">
              <i className="bx bx-log-out"></i>
              <span>Logout</span>
            </div>
            <i className="bx bx-chevron-right"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default SidebarMenuMobile;
