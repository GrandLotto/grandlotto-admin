/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { setAlertPopUp, setConfirmModal } from "../../store/alert/alertSlice";
import {
  APPROVE_USER_KYC_URL,
  DECLINE_USER_KYC_URL,
  DELETE_GAMETYPE_URL,
  DELETE_GAME_URL,
  DISABLE_USERS_URL,
  ENABLE_USERS_URL,
} from "../../config/urlConfigs";
import { handleDELETERequest } from "../../rest/apiRest";
import ComponentLoading from "../blocks/ComponentLoading";
import { setRefreshing } from "../../store/authSlice/authSlice";
import Reponsemessage from "../blocks/Reponsemessage";
import { handlePOSTRequest } from "../../rest/apiRest";

const ConfirmModal = () => {
  const modal = useSelector((state) => state.alert.confirmModal);
  // const user = useSelector((state) => state.oauth.user);
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const [inputt, setInputt] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(
      setConfirmModal({
        status: false,
        type: "",
        title: "",
        desc: "",
        hasMesage: false,
        payload: null,
        buttonText: "",
      })
    );

    setEmptyFields(true);
    setInputt("");
    setResponseError("");
    setIsLoading(false);
  };

  useEffect(() => {
    if (modal?.status === true) {
      validateForm();
    }
  }, [modal, inputt, emptyFields]);

  const validateForm = () => {
    if (modal?.hasMesage === true) {
      if (!inputt) {
        setEmptyFields(true);
        return;
      }
    }

    setEmptyFields(false);

    setEmptyFields(false);
  };

  const proceed = () => {
    if (modal.type === "DELETE_GAME_TYPE") {
      handleDELETE(
        DELETE_GAMETYPE_URL + `?Id=${modal?.payload?.id}`,
        "Game type deleted"
      );
      return;
    }
    if (modal.type === "DELETE_GAME") {
      handleDELETE(
        DELETE_GAME_URL + `?Id=${modal?.payload?.id}`,
        "Game deleted"
      );
      return;
    }
    if (modal.type === "ACTIVATE_USER") {
      let newPayload = {
        email: modal?.payload?.email,
        enable: true,
      };
      handlePOST(
        ENABLE_USERS_URL,
        newPayload,
        `${modal?.payload?.firstName}'s Account has been activated`
      );
      return;
    }
    if (modal.type === "DEACTIVATE_USER") {
      let newPayload = {
        email: modal?.payload?.email,
        disable: true,
      };
      handlePOST(
        DISABLE_USERS_URL,
        newPayload,
        `${modal?.payload?.firstName}'s Account has been deactivated`
      );
      return;
    }
    if (modal.type === "DELETE_ACCOUNT") {
      let newPayload = {
        email: modal?.payload?.email,
        disable: true,
      };
      handlePOST(DISABLE_USERS_URL, newPayload, `My Account has been disabled`);
      return;
    }
    if (modal.type === "APPROVE_KYC") {
      let newPayload = {
        email: modal?.payload?.email,
        approve: "APPROVED",
      };
      handlePOST(
        APPROVE_USER_KYC_URL,
        newPayload,
        `${modal?.payload?.firstName}'s KYC has been approved`
      );
      return;
    }
    if (modal.type === "DECLINE_KYC") {
      let newPayload = {
        email: modal?.payload?.email,
        decline: "DECLINE",
        reason: inputt,
      };
      handlePOST(
        DECLINE_USER_KYC_URL,
        newPayload,
        `${modal?.payload?.firstName}'s KYC has been declined`
      );
      return;
    }
  };

  const handleDELETE = (URL, responseMessage) => {
    setIsLoading(true);

    setTimeout(() => {
      handleDELETERequest(URL)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: responseMessage,
                desc: response?.data?.message,
                payload: null,
              })
            );
            dispatch(setRefreshing(true));

            closeModal();
          } else {
            setResponseError(response?.data?.message);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setResponseError("An error occurred, please try again");
          // console.log(error);
        });
    }, 4000);
  };

  const handlePOST = (URL, data, responseMessage) => {
    setIsLoading(true);

    setTimeout(() => {
      handlePOSTRequest(URL, data)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: responseMessage,
                desc: response?.data?.message,
                payload: null,
              })
            );
            dispatch(setRefreshing(true));

            closeModal();
          } else {
            setResponseError(response?.data?.message);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setResponseError("An error occurred, please try again");
          // console.log(error);
        });
    }, 4000);
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card vivify popInBottom">
          {isLoading && <ComponentLoading title="Please wait ..." />}
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            {responseError ? (
              <Reponsemessage
                message={responseError}
                error={responseError ? true : false}
              />
            ) : null}
            <br />
            <h4 className="text-light">{modal.title}</h4>

            {modal?.hasMesage ? (
              <form
                className="grandlotto_form mt-5  p-0"
                style={{ width: "100%" }}
              >
                <div className="form-group" style={{ width: "100%" }}>
                  <label>
                    {modal.desc} <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    onChange={(e) => setInputt(e.target.value)}
                    className="form-control py-2"
                    style={{ width: "100%", height: 100 }}
                    placeholder="Reason/Message"
                    cols="30"
                    rows="10"
                  ></textarea>

                  {/* <input
                    type="text"
                    onChange={(e) => setInputt(e.target.value)}
                    value={inputt}
                    placeholder="Reason/Message"
                    className="form-control py-3"
                    style={{ width: "100%" }}
                  /> */}
                </div>
              </form>
            ) : (
              <label>{modal.desc}</label>
            )}

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
                type="button"
                onClick={() => proceed()}
                disabled={emptyFields}
                style={{ width: "100%!important", display: "block" }}
                className="grandLottoButton"
              >
                {modal?.buttonText || "Ok"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmModal;
