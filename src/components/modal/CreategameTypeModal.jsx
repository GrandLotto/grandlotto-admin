/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_GAME_TYPE_URL,
  UPDATE_GAME_TYPE_URL,
} from "../../config/urlConfigs";
import { handlePOSTRequest, handlePUTRequest } from "../../rest/apiRest";
import {
  setAlertPopUp,
  setCreategameTypeModal,
} from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";
import Reponsemessage from "../blocks/Reponsemessage";
import CurrencyInput from "react-currency-input-field";
import { setRefreshing } from "../../store/authSlice/authSlice";

const CreategameTypeModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.creategameTypeModal);
  // const user = useSelector((state) => state.oauth.user);

  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [gameType, setGameType] = useState("");
  const [gameMaxNumberCount, setGameMaxNumberCount] = useState("");
  const [creditLine, setCreditLine] = useState("");

  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(
      setCreategameTypeModal({
        status: false,
        type: "",
        payload: null,
      })
    );
    setIsLoading(false);
    setAmount(0);
    setAmount2(0);
    setGameType("");
    setGameMaxNumberCount("");
    setCreditLine("");
    setEmptyFields(true);
  };

  useEffect(() => {
    if (modal?.status) {
      if (modal?.payload) {
        setAmount(modal?.payload?.minAmmount);
        setAmount2(modal?.payload?.maxAmmount);
        setGameType(modal?.payload?.type);
        setGameMaxNumberCount(modal?.payload?.maxNumbercount);
        setCreditLine(modal?.payload?.creditLine);

        validateForm();
      }
    }
  }, [modal]);

  useEffect(() => {
    validateForm();
  }, [gameType, amount, amount2, creditLine, gameMaxNumberCount, emptyFields]);

  const validateForm = () => {
    if (!gameType) {
      setEmptyFields(true);
      return false;
    }

    if (!amount || amount <= 0) {
      setEmptyFields(true);
      return false;
    }

    if (!amount2 || amount2 <= 0) {
      setEmptyFields(true);
      return false;
    }

    if (!creditLine) {
      setEmptyFields(true);
      return false;
    }

    // if (gameMaxNumberCount) {
    //   setEmptyFields(true);
    //   return false;
    // }
    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);
    setResponseError("");

    const payload = {
      // email: user?.email,
      type: gameType,
      minAmmount: amount,
      maxAmmount: amount2,
      creditLine: creditLine,
      maxNumbercount: gameMaxNumberCount,
    };

    let URL =
      modal?.type === "EDIT"
        ? UPDATE_GAME_TYPE_URL + `?Id=${modal?.payload?.id}`
        : CREATE_GAME_TYPE_URL;

    // console.log(JSON.stringify(payload));

    if (modal?.type === "EDIT") {
      handlePUTRequest(URL, payload)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: "Game Type Updated Successful",
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
    } else {
      handlePOSTRequest(URL, payload)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: "Game Type Created Successful",
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
          console.log(error);
        });
    }
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP " id="loginModal">
        <div className="alert-modal-overlay" onClick={() => closeModal()}></div>
        <div className="alert-modal-card vivify popInBottom">
          {isLoading && (
            <ComponentLoading title="Please wait ..." inner={true} />
          )}
          <div className="close-alert-button">
            <i
              onClick={() => closeModal()}
              className="bx bx-x"
              id="closeAlertModal"
            ></i>
          </div>

          <div className="alert-modal-body">
            <div className="text-center w-100">
              <h4 className=" text-center">
                {modal?.type === "EDIT" ? "Edit Game type" : "Create Game type"}
              </h4>
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
              <div className="row">
                {/* <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Type</label>
                    <input
                      onChange={(e) => setGameType(e.target.value)}
                      value={gameType}
                      className="form-control largeInputFont py-3"
                      placeholder="Game type"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div> */}
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Min Amount</label>
                    <div className={`symbolInput`}>
                      <span>₦</span>
                      <CurrencyInput
                        name="input-name"
                        placeholder="Enter Amount "
                        defaultValue={amount}
                        decimalsLimit={2}
                        onValueChange={(value) => setAmount(value)}
                        contentEditable={true}
                        value={amount}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Max Amount</label>
                    <div className={`symbolInput`}>
                      <span>₦</span>
                      <CurrencyInput
                        name="input-name"
                        placeholder="Enter Amount "
                        defaultValue={amount2}
                        decimalsLimit={2}
                        onValueChange={(value) => setAmount2(value)}
                        contentEditable={true}
                        value={amount2}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Credit Line</label>
                    <input
                      onChange={(e) => setCreditLine(e.target.value)}
                      value={creditLine}
                      className="form-control largeInputFont py-3"
                      placeholder="Credit Line"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div> */}
                {/* <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Max Number count</label>
                    <input
                      onChange={(e) => setGameMaxNumberCount(e.target.value)}
                      value={gameMaxNumberCount}
                      className="form-control largeInputFont py-3"
                      placeholder="Max Number count"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div> */}
              </div>
              <div className="mt-4 text-center mb-3">
                <div className="d-flex justify-content-center">
                  <button
                    disabled={emptyFields}
                    type="button"
                    className="grandLottoButton cardButton"
                    onClick={() => proceed()}
                  >
                    {modal?.type === "EDIT" ? "Update" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default CreategameTypeModal;
