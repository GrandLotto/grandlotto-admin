/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/images/grandlotto.png";
import person from "../../assets/images/default.png";
import { setMobileMenu, setSideBarMenu } from "../../store/alert/alertSlice";
import HeaderDropDownBlock from "../blocks/HeaderDropDownBlock";
import HeaderTopBalance from "../blocks/HeaderTopBalance";
import TopSearch from "../blocks/TopSearch";

const HeaderTop = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  // const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);
  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);
  const user = useSelector((state) => state.oauth.user);

  const [showDropDown, setshowDropDown] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const toggleDropDown = (val) => {
    setTimeout(() => {
      val === false ? setshowDropDown(val) : setshowDropDown(!showDropDown);
    }, 200);
  };

  window.addEventListener("click", (e) => {
    const dropDown = document.querySelector(".header_top_dropDown");
    if (dropDown)
      if (!e.composedPath().includes(dropDown)) toggleDropDown(false);
  });

  const navigateBack = () => {
    if (sideBarMenu) {
      dispatch(setSideBarMenu(false));

      return;
    }
    navigation(-1);
  };

  useEffect(() => {
    if (location) {
      toggleDropDown(false);
      dispatch(setSideBarMenu(false));
      dispatch(setMobileMenu(false));
      setCurrentLocation(location?.pathname);
    }
  }, [location]);

  return (
    <div className="headerTop">
      <div className="headerTopFlex">
        <div className="headerTopLeft">
          <h4 className="hideOnMobile">
            Welcome,{" "}
            <span className="text headerTopLeftcapitalize">
              {user?.firstName}
            </span>
          </h4>
          <p className="hideOnMobile">ID: {user?.code}</p>
          {(sideBarMenu || currentLocation !== "/admin/dashboard") && (
            <i
              className="bx bx-left-arrow-alt showOnMobile"
              onClick={() => navigateBack()}
            ></i>
          )}
        </div>
        <div className="headerTopMiddle">
          <TopSearch />

          <div className="showOnMobile">
            <a
              href="true"
              onClick={(e) => e.preventDefault()}
              className="topHeaderLogo"
            >
              <img src={Logo} alt="grand-logo" />
            </a>
          </div>
        </div>
        <div className="headerTopRight">
          <div className="topHeaderRightLoggedIn">
            <HeaderTopBalance />

            {/* <div
              className="topHeaderRightLoggedInNotification hideOnMobile"
              onClick={() => {
                dispatch(setNotiicationModal(true));
              }}
            >
              <i className="bx bx-bell"></i>
            </div> */}

            <div
              className="topHeaderRightLoggedInImage hideOnMobile"
              onClick={() => toggleDropDown(true)}
            >
              {user && user?.photo ? (
                <img
                  src={user?.photo}
                  onError={(e) => {
                    e.currentTarget.src = person;
                  }}
                  alt={user?.firstName}
                />
              ) : (
                <img src={person} alt="grand-logo" />
              )}
              <i className="bx bx-chevron-down"></i>
            </div>
            {showDropDown ? <HeaderDropDownBlock /> : null}
            <div className="hideOnMobile">
              <div
                className="hamburgar "
                onClick={() => dispatch(setSideBarMenu(true))}
              >
                <i className="bx bx-menu"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
