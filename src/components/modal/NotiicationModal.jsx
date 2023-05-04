import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotiicationModal } from "../../store/alert/alertSlice";

const NotiicationModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.alert.notiicationModal);

  const closeModal = () => {
    dispatch(setNotiicationModal(false));
  };

  return (
    modal && (
      <div className="select_modals higherModal">
        <div
          className="select_modals_overlay"
          onClick={() => closeModal()}
        ></div>
        <div className="select_modals_cards">
          <div className="select-modal-header">
            <div className="d-flex align-items-center">
              <i
                className="bx bx-chevron-left"
                onClick={() => closeModal()}
              ></i>
              <h5>Notifications</h5>
            </div>
          </div>
          <div className="select_modals_body"></div>
        </div>
      </div>
    )
  );
};

export default NotiicationModal;
