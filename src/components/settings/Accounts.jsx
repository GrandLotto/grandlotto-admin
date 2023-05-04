/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmModal } from "../../store/alert/alertSlice";

const Accounts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);

  const proceed = () => {
    dispatch(
      setConfirmModal({
        status: true,
        type: "DELETE_ACCOUNT",
        title: "Delete Account",
        desc: "Why do you want to delete your account?",
        hasMesage: true,
        payload: {
          email: user?.email,
        },
        buttonText: "",
      })
    );
  };

  return (
    <div
      className="grandlotto_card payment_card"
      style={{ position: "relative" }}
    >
      <div className="grandlotto_form mt-2">
        <h5 className="site_sub_title mb-5">Account</h5>
        <div className="row mb-2">
          <div className="col-md-10 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="">Disable your account</label>
              <button
                type="button"
                className="grandLottoButton"
                onClick={() => proceed()}
              >
                Disable
              </button>
            </div>
          </div>
        </div>

        <br />
      </div>
    </div>
  );
};

export default Accounts;
