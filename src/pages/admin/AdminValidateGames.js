/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PinCodeBlock from "../../components/blocks/PinCodeBlock";
import { useDispatch, useSelector } from "react-redux";
import { setAlertPopUp, setPageLoading } from "../../store/alert/alertSlice";
import { handlePOSTRequest } from "../../rest/apiRest";
import { VALIDATE_GAMES_URL } from "../../config/urlConfigs";
import { setRefreshing } from "../../store/authSlice/authSlice";
import {
  formateDateAndTimeByName,
  formateWinningMachineNumbers,
} from "../../global/customFunctions";

const AdminValidateGames = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.oauth.user);
  const games = useSelector((state) => state.bets.allgames);

  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [resetEFields, setResetEFields] = useState(false);

  const resetFields = (code) => {
    setPin("");
    setPin2("");
    setEmptyFields(true);
    setResetEFields(true);
    setSelectedGame("");
  };

  useEffect(() => {
    validateForm();
  }, [pin, selectedGame, emptyFields, pin2]);

  const validateForm = () => {
    if (!selectedGame) {
      setEmptyFields(true);
      return false;
    }
    if (!pin) {
      setEmptyFields(true);
      return false;
    }
    if (pin !== "" && pin.length !== 11) {
      setEmptyFields(true);
      return false;
    }

    if (!pin2) {
      setEmptyFields(true);
      return false;
    }
    if (pin2 !== "" && pin2.length !== 11) {
      setEmptyFields(true);
      return false;
    }

    setEmptyFields(false);
  };

  const handleDone = (code) => {
    setPin(code);
  };

  const handleDone2 = (code) => {
    setPin2(code);
  };

  const proceed = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    const payload = {
      email: user?.email,
      winningNumber: formateWinningMachineNumbers(pin),
      machineNumber: formateWinningMachineNumbers(pin2),
      gameId: selectedGame,
    };

    // console.log("payload", payload);

    handlePOSTRequest(VALIDATE_GAMES_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: "Game Validated",
              desc: response?.data?.message,
              payload: null,
            })
          );

          dispatch(setRefreshing(true));

          resetFields();
        } else {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: "Error",
              desc: response?.data?.message,
              payload: null,
            })
          );

          setResetEFields(true);
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        setResetEFields(true);
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        // console.log(error);
      });
  };

  useEffect(() => {
    // console.log(games);
    // formateWinningMachineNumbers("0328927730");
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">Validate Games</h5>
          </div>

          <div className="mt-5">
            <div className="card text-center">
              <div className="card-body">
                <div
                  className="grandlotto_card payment_card"
                  style={{ position: "relative" }}
                >
                  <div className="grandlotto_form mt-5">
                    {/* <h5 className="site_sub_title mb-5">Change Pin</h5> */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="row" style={{ width: "100%" }}>
                        <div className="col-md-5 mx-auto">
                          <div
                            className="form-group text-center mb-5"
                            style={{ width: "100%" }}
                          >
                            <label htmlFor="" className="mb-3">
                              Select Game
                            </label>

                            <select
                              style={{ width: "100%" }}
                              className="form-control hasCapitalized"
                              onChange={(e) => {
                                if (e.target.value) {
                                  setSelectedGame(e.target.value);
                                }
                              }}
                              value={selectedGame}
                            >
                              <option value="">Select day</option>

                              {games &&
                                games?.map((item, index) => (
                                  <option key={index} value={item?.id}>
                                    {item?.name} {""}(
                                    {formateDateAndTimeByName(item?.startTime)})
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div
                        className="form-group text-center mb-5"
                        style={{ width: "100%" }}
                      >
                        <label htmlFor="" className="mb-3">
                          Winning Number
                        </label>

                        <PinCodeBlock
                          pinLength={5}
                          maxLength={2}
                          handleDone={handleDone}
                          resetEFields={resetEFields}
                        />
                      </div>
                      <div
                        className="form-group text-center"
                        style={{ width: "100%" }}
                      >
                        <label htmlFor="" className="mb-3">
                          Machine Number
                        </label>

                        <PinCodeBlock
                          pinLength={5}
                          maxLength={2}
                          handleDone={handleDone2}
                          resetEFields={resetEFields}
                        />
                      </div>

                      <div className="row mt-5">
                        <div className="col-md-4">
                          <button
                            disabled={emptyFields}
                            type="button"
                            className="grandLottoButton cardButton"
                            onClick={() => proceed()}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminValidateGames;
