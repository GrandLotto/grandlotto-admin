/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_GAMES_BY_TICKETID_URL } from "../../config/urlConfigs";

import { handleGETRequest } from "../../rest/apiRest";
import { setRedeemWinningModal } from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";
import Reponsemessage from "../blocks/Reponsemessage";
import CouponListCheck from "../blocks/CouponListCheck";

const RedeemWinningModal = () => {
  const modal = useSelector((state) => state.alert.redeemWinningModal);
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketID, setTicketID] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [responseError, setResponseError] = useState("");
  const [resData, setResData] = useState(null);

  const closeModal = () => {
    dispatch(setRedeemWinningModal(false));
    setStep(1);
    setIsLoading(false);
    setEmptyFields(true);
    setTicketID("");
    setResData(null);
    setResponseError("");
  };

  useEffect(() => {
    validateForm();
  }, [resData, ticketID, emptyFields]);

  const validateForm = () => {
    if (step === 1) {
      if (!ticketID) {
        setEmptyFields(true);
        return false;
      }
    }
    // if (step === 2) {
    //   if (!accountNumber) {
    //     setEmptyFields(true);
    //     return false;
    //   }
    //   if (!selectedBank) {
    //     setEmptyFields(true);
    //     return false;
    //   }
    // }

    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);

    setTimeout(() => {
      if (step === 1) {
        checkWinning();
      }
      if (step === 2) {
        setIsLoading(false);
        closeModal();
      }
    }, 800);
  };

  const checkWinning = () => {
    setResponseError("");
    setIsLoading(true);

    let URL = GET_GAMES_BY_TICKETID_URL;

    // console.log(URL);

    handleGETRequest(URL + `?TicketId=${ticketID}`)
      .then((response) => {
        setIsLoading(false);

        // console.log(response);
        if (response?.data?.success) {
          setResData(response?.data?.data);
          setStep(2);
        } else {
          setResponseError(response?.data?.message);
          setTicketID("");

          setResData(null);
        }
      })
      .catch((error) => {
        setResponseError("An error occurred, please try again");
        setTicketID("");
        setResData(null);
        setIsLoading(false);
      });
  };

  return (
    modal && (
      <div
        className="alert-modal alertPOP large_modal large_auto_height_modal"
        id="signupModal"
      >
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
              <h4 className=" text-center">Check Winning</h4>
              {/* <p className="p_para">
                Enter the details below to Check your winnings
              </p> */}
              {responseError ? (
                <Reponsemessage
                  message={responseError}
                  error={responseError ? true : false}
                />
              ) : null}
            </div>
            <form
              className="grandlotto_form mt-4"
              style={{ width: "100%", padding: 0 }}
            >
              {step === 1 && (
                <div className="row ">
                  <div className="col-md-9 mx-auto mb-3 mt-3">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">Enter Ticket ID</label>

                      <input
                        onChange={(e) => setTicketID(e.target.value)}
                        value={ticketID}
                        className="form-control py-3"
                        placeholder="Ticket ID"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && <CouponListCheck item={resData} />}

              <br />
              <div
                className="form-group text-center mb-2 mt-2 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  type="button"
                  disabled={emptyFields}
                  onClick={() => proceed()}
                  className="grandLottoButton"
                >
                  {step === 1 ? "Proceed" : "Close"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default RedeemWinningModal;
