import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchCouponCodeModal } from "../../store/alert/alertSlice";
import CouponListCheck from "../blocks/CouponListCheck";

const SearchCouponCodeModal = () => {
  const modal = useSelector((state) => state.alert.searchCouponCodeModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setSearchCouponCodeModal({
        status: false,
        type: "",
        payload: null,
      })
    );
  };

  return (
    modal?.status && (
      <div
        className="alert-modal alertPOP large_modal large_auto_height_modal noscrollBar"
        id="signupModal"
      >
        <div className="alert-modal-overlay" onClick={() => closeModal()}></div>
        <div className="alert-modal-card vivify popInBottom">
          <div className="close-alert-button">
            <i
              onClick={() => closeModal()}
              className="bx bx-x"
              id="closeAlertModal"
            ></i>
          </div>

          <div className="alert-modal-body">
            <div className="text-center w-100">
              <h4 className=" text-center">Game Details</h4>
            </div>
            <form
              className="grandlotto_form mt-4"
              style={{ width: "100%", padding: 0 }}
            >
              {modal?.payload && <CouponListCheck item={modal?.payload} />}

              <br />
              <div
                className="form-group text-center mb-2 mt-2 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="grandLottoButton"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchCouponCodeModal;
