import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

import Logo from "../../assets/images/grandlotto.png";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal, setSideBarMenu } from "../../store/alert/alertSlice";
import SidebarMenuMobile from "./SidebarMenuMobile";

const Sidebar = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);
  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);

  return (
    <>
      <div
        className={`sidebar  ${
          sideBarMenu ? "showSidebarMenu" : ""
        } hideOnMobile`}
      >
        <div className="sidebar-top hideOnMobile">
          <div className="sidebar-logo">
            <NavLink to="/admin/dashboard" className="topHeaderLogo">
              <img src={Logo} alt="grand-logo" />
            </NavLink>

            <div className="close-menu-button">
              <i
                onClick={() => dispatch(setSideBarMenu(false))}
                className="bx bx-x"
                id="closeAlertModal"
              ></i>
            </div>
          </div>
          <div>
            <p
              style={{
                color: "#fff",
                marginLeft: 50,
                fontWeight: "600",
                marginTop: -15,
              }}
            >
              Admin
            </p>
          </div>
          <div className="sidebar-scroll">
            <ul>
              <div className="mt-3">
                <li className="sidebar_links">
                  <NavLink to="/admin/dashboard">
                    <i className="bx bx-layout"></i>
                    <span> Dashboard</span>
                  </NavLink>
                </li>
                <li className="sidebar_links">
                  <NavLink to="/admin/transactions">
                    <i className="bx bx-layout"></i>
                    <span>All Transactions</span>
                  </NavLink>
                </li>
                <li className="sidebar_links">
                  <a
                    className="sidebar_links_header"
                    href="true"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div>
                      <i className="bx bx-layout"></i>
                      <span>games</span>
                    </div>
                    <div className="dropdownicon">
                      <i className="fa fa-chevron-right"></i>
                    </div>
                  </a>
                  <ul className="sidebar_links_children">
                    {/* <li>
                      <NavLink to="/admin/games/create-games-types">
                        <span>Games types</span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/admin/games/create-games">
                        <span>Create games</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/games/games-played">
                        <span>Games played</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/games/validate-games">
                        <span>Validate games</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/games/winnings">
                        <span>Winnings</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="sidebar_links">
                  <NavLink to="/admin/verify-kyc">
                    <i className="bx bx-layout"></i>
                    <span>Verify KYC</span>
                  </NavLink>
                </li>
                <li className="sidebar_links">
                  <NavLink to="/admin/user-controls">
                    <i className="bx bx-layout"></i>
                    <span>User Controls</span>
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="sidebar-bottom hideOnMobile">
          <ul>
            <li className="sidebar_links">
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
                style={{ cursor: "pointer" }}
              >
                <i className="bx bx-log-out"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <SidebarMenuMobile />

      <div
        className={`menu_wrapper_div  ${
          sideBarMenu === true ? "showSidebarMenu" : ""
        }`}
        onClick={() => dispatch(setSideBarMenu(false))}
        id="menuWrapper"
      ></div>
    </>
  );
};

export default Sidebar;
