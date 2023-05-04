import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal } from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";
import {
  logout,
  setIsAdmin,
  setIsUserLoggedIn,
} from "../../store/authSlice/authSlice";

import { persistor } from "../../store/store";
import { setAccountBalances } from "../../store/wallet/walletSlice";

const LogoutModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.logoutModal);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    dispatch(
      setLogoutModal({
        status: false,
        payload: null,
      })
    );
  };

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      dispatch(setIsUserLoggedIn(false));
      dispatch(setIsAdmin(false));
      dispatch(setAccountBalances(null));
      dispatch(logout());
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
      // navigation("/");
      closeModal();
    }, 1500);
  };
  return (
    modal?.status && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card pages_mobile_dark vivify popInBottom">
          {isLoading && <ComponentLoading title="Please wait ..." />}
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div
              className={`alert-modal-icon `}
              style={{ padding: 0, background: "transparent", color: "#fff" }}
            >
              <i className="bx bx-log-out"></i>
            </div>
            <h4>Logout</h4>
            <p>Do you want to Logout?</p>
            <br />
            <div className="alert-modal-button modalButton d-flex">
              <button
                onClick={() => closeModal()}
                className=" border"
                style={{ marginRight: "10px" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleLogout()}
                style={{ width: "100%!important", display: "block" }}
                className="grandLottoButton"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LogoutModal;
