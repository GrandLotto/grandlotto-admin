/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlertSmallPOPUP } from "../../store/alert/alertSlice";

const AlertSmallPopUp = () => {
  const dispatch = useDispatch();
  const alertModal = useSelector((state) => state.alert.alertSmallPOPUP);

  const closeModal = () => {
    dispatch(
      setAlertSmallPOPUP({
        status: false,
        message: alertModal?.message,
      })
    );
  };

  useEffect(() => {
    if (alertModal?.status) {
      setTimeout(() => {
        closeModal();
      }, 3500);
    }
  }, [alertModal]);

  return (
    <div
      className={`smallPopup ${alertModal?.status ? "showSmallPopup" : ""} `}
      onClick={() => closeModal()}
    >
      <p style={{ display: "flex" }}>
        <a
          className="button btn-square rounded is-small mr-3"
          href="true"
          onClick={(e) => e.preventDefault()}
        >
          <i className="bx bxs-badge-check text-dark"></i>
        </a>
        {alertModal?.message}
      </p>
    </div>
  );
};

export default AlertSmallPopUp;
