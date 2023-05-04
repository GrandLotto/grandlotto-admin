import React, { useEffect, useState } from "react";

const FilterModals = ({ status, modalTitle, setVisiblityStatus, children }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setVisiblityStatus(false);
  };

  const toggleModal = () => {
    if (status === true) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    toggleModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    showModal === true && (
      <div className="select_modals">
        <div
          className="select_modals_overlay"
          onClick={() => closeModal()}
        ></div>
        <div className="select_modals_cards border-left">
          <div className="select-modal-header">
            <div className="d-flex align-items-center">
              <i
                className="bx bx-chevron-left"
                onClick={() => closeModal()}
              ></i>
              <h5>{modalTitle}</h5>
            </div>
          </div>
          <div className="select_modals_body">{children}</div>
        </div>
      </div>
    )
  );
};

export default FilterModals;
