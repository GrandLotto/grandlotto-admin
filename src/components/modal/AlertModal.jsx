import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlertPopUp } from "../../store/alert/alertSlice";

const AlertModal = () => {
  const alertModal = useSelector((state) => state.alert.alertPopUp);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setAlertPopUp({
        status: false,
        type: "",
        title: "",
        desc: "",
        payload: null,
      })
    );
  };
  return (
    alertModal?.status && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card vivify popInBottom">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div
              className={`alert-modal-icon ${
                alertModal.type === "SUCCESS" ? "success" : "error"
              }`}
            >
              {alertModal.type === "SUCCESS" ? (
                <i className="bx bx-check"></i>
              ) : (
                <i className="bx bx-x"></i>
              )}
            </div>
            <h4
              className={`${
                alertModal.type === "SUCCESS" ? "success" : "error"
              }`}
            >
              {alertModal.title}
            </h4>
            <p>{alertModal.desc}</p>

            <div className="alert-modal-button">
              <button onClick={closeModal} className="fasta-modal-button">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertModal;
