/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TRANSACTION_PIN_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import { setAlertPopUp, setAddPinModal } from "../../store/alert/alertSlice";
import { getUserInfo } from "../../store/authSlice/actions";

import ComponentLoading from "../blocks/ComponentLoading";
import PinCodeBlock from "../blocks/PinCodeBlock";
import Reponsemessage from "../blocks/Reponsemessage";

const AddPinModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.addPinModal);
  const user = useSelector((state) => state.oauth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const [pin, setPin] = useState("");
  const [resetEFields, setResetEFields] = useState(false);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(setAddPinModal(false));

    setIsLoading(false);
    setEmptyFields(true);
    setPin("");
    setResponseError("");
  };

  const handleDone = (code) => {
    setPin(code);
  };

  useEffect(() => {
    validateForm();
  }, [pin, emptyFields]);

  const validateForm = () => {
    if (!pin) {
      setEmptyFields(true);
      return false;
    }
    if (pin !== "" && pin.length !== 5) {
      setEmptyFields(true);
      return false;
    }

    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);
    setResponseError("");

    const payload = { email: user?.email, pin: pin };

    handlePOSTRequest(ADD_TRANSACTION_PIN_URL, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: " Successful",
              // desc: response?.data?.message,
              desc: "Transaction pin created",
              payload: null,
            })
          );

          dispatch(getUserInfo(user?.email));

          closeModal();
        } else {
          setResponseError(response?.data?.message);
          setResetEFields(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setResponseError("An error occurred, please try again");
        // console.log(error);
      });
  };

  return (
    modal === true && (
      <div className="alert-modal alertPOP" id="loginModal">
        <div
          className="alert-modal-overlay"
          style={{ cursor: "default" }}
        ></div>
        <div className="alert-modal-card vivify popInBottom">
          {isLoading && <ComponentLoading title="Please wait ..." />}
          <div className="close-alert-button">
            {/* <i
              onClick={() => closeModal()}
              className="bx bx-x"
              id="closeAlertModal"
            ></i> */}
          </div>

          <div className="alert-modal-body">
            <div className="text-center w-100 mt-3">
              <h4 className=" text-center">Create Transaction PIN</h4>
              <p className="mt-3 p_para">Kindly create your transaction PIN.</p>

              {responseError ? (
                <Reponsemessage
                  message={responseError}
                  error={responseError ? true : false}
                />
              ) : null}
            </div>
            <form
              className="grandlotto_form mt-4 text-center"
              style={{ width: "100%" }}
            >
              <PinCodeBlock
                pinLength={4}
                handleDone={handleDone}
                resetEFields={resetEFields}
              />

              <br />
              <br />
              <div
                className="form-group text-center  mb-4 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  disabled={emptyFields}
                  type="button"
                  onClick={() => proceed()}
                  className="grandLottoButton"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddPinModal;
