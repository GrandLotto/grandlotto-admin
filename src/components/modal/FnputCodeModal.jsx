/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PASSWORD_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import { setInputCodeModal, setAlertPopUp } from "../../store/alert/alertSlice";

import ComponentLoading from "../blocks/ComponentLoading";
import PinCodeBlock from "../blocks/PinCodeBlock";
import Reponsemessage from "../blocks/Reponsemessage";

const FnputCodeModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.inputCodeModal);

  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const [pin, setPin] = useState("");
  const [resetEFields, setResetEFields] = useState(false);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(
      setInputCodeModal({
        status: false,
        type: "",
        title: "",
        desc: "",
        btnText: "",
        payload: null,
      })
    );

    setIsLoading(false);
    setEmptyFields(true);
    setPin("");
    setResponseError("");
    setNewPassword("");
    setConfirmNewPassword("");
    setConfirmNewPasswordError("");
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
  };

  const handleDone = (code) => {
    setPin(code);
  };

  useEffect(() => {
    validateForm();
  }, [pin, newPassword, confirmNewPassword, emptyFields]);

  const validateForm = () => {
    if (!pin) {
      setEmptyFields(true);
      return false;
    }
    if (pin !== "" && pin.length !== 5) {
      setEmptyFields(true);
      return false;
    }

    if (!newPassword) {
      setEmptyFields(true);
      return false;
    }
    // if (newPassword !== "" && newPassword.length < 5) {
    //   setEmptyFields(true);
    //   return false;
    // }
    if (!confirmNewPassword) {
      setEmptyFields(true);
      return false;
    }

    // if (confirmNewPassword !== "" && confirmNewPassword.length < 5) {
    //   setEmptyFields(true);
    //   return false;
    // }

    if (confirmNewPassword !== "" && confirmNewPassword !== newPassword) {
      setEmptyFields(true);
      setConfirmNewPasswordError("Passwords do not match");
      return false;
    }

    setConfirmNewPasswordError("");
    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);
    setResponseError("");

    const payload = {
      email: modal?.payload?.email,
      token: pin,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    handlePOSTRequest(RESET_PASSWORD_URL, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: " Successful",
              desc: response?.data?.message,
              payload: null,
            })
          );

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
    modal?.status && (
      <div className="alert-modal alertPOP" id="loginModal">
        <div className="alert-modal-overlay" onClick={() => closeModal()}></div>
        <div className="alert-modal-card vivify popInBottom">
          {isLoading && <ComponentLoading title="Please wait ..." />}
          <div className="close-alert-button">
            <i
              onClick={() => closeModal()}
              className="bx bx-x"
              id="closeAlertModal"
            ></i>
          </div>

          <div className="alert-modal-body">
            <div className="text-center w-100">
              <h4 className=" text-center" style={{ marginTop: -15 }}>
                {modal?.title}
              </h4>
              <p className="mt-3 p_para">{modal?.desc}</p>

              {responseError ? (
                <Reponsemessage
                  message={responseError}
                  error={responseError ? true : false}
                />
              ) : null}
            </div>
            <form
              className="grandlotto_form mt-3 text-center"
              style={{ width: "100%" }}
            >
              <PinCodeBlock
                pinLength={4}
                handleDone={handleDone}
                resetEFields={resetEFields}
              />

              <div className="row mb-2 mt-5">
                <div className="col-md-12">
                  <div className="form-group " style={{ width: "100%" }}>
                    <label htmlFor="">New password</label>
                    <div className="password_input">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        className="form-control largeInputFont py-3"
                        style={{ width: "100%" }}
                      />

                      <i
                        className={`showHide text-dark bx ${
                          showNewPassword ? "bx-hide" : "bx-show"
                        }  `}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group " style={{ width: "100%" }}>
                    <label htmlFor="">Confirm New password</label>
                    <div className="password_input">
                      <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        value={confirmNewPassword}
                        className="form-control largeInputFont py-3"
                        style={{ width: "100%" }}
                      />

                      <i
                        className={`showHide text-dark bx ${
                          showConfirmNewPassword ? "bx-hide" : "bx-show"
                        }  `}
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                      ></i>
                    </div>

                    {confirmNewPasswordError && (
                      <p className="text-danger mt-2" style={{ fontSize: 14 }}>
                        {confirmNewPasswordError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
                  {modal?.btnText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default FnputCodeModal;
