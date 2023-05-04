import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComingSoonModal } from "../../store/alert/alertSlice";

const ComingSoonModal = () => {
  const modal = useSelector((state) => state.alert.comingSoonModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setComingSoonModal(false));
  };
  return (
    modal && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card vivify popInBottom">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div className={`alert-modal-icon`}>
              <i className="bx bx-street-view"></i>
            </div>
            <h4>Coming Soon</h4>
            <p>
              This feature is currently not available, Please check back later
            </p>

            <div className="alert-modal-button">
              <button onClick={closeModal} className="fasta-modal-button">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ComingSoonModal;
