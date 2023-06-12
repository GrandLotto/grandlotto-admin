/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_GAME_URL, UPDATE_GAME_URL } from "../../config/urlConfigs";
import { handlePOSTRequest, handlePUTRequest } from "../../rest/apiRest";
import {
  setAlertPopUp,
  setCreateGameModal,
} from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";
import Reponsemessage from "../blocks/Reponsemessage";
import { setRefreshing } from "../../store/authSlice/authSlice";

const CreateGameModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.createGameModal);
  const gamesgroup = useSelector((state) => state.bets.gamesgroup);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedGameGroup, setselectedGameGroup] = useState("");
  const [gameName, setGameName] = useState("");
  // const [selectedDay, setSelectedDay] = useState("");
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isAvailableToplay, setIsAvailableToplay] = useState(true);
  const [period, setPeriod] = useState("");
  const [duration, setDuration] = useState(30);
  const [frequency, setFrequency] = useState(1);

  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(
      setCreateGameModal({
        status: false,
        type: "",
        payload: null,
      })
    );
    setIsLoading(false);
    setGameName("");
    setStartTime("");
    setselectedGameGroup("");
    // setSelectedDay("");
    setStatus("");
    setIsAvailableToplay(true);
    setStartTime(new Date());
    setEndTime(new Date());
    setEmptyFields(true);
    setResponseError("");
  };

  const dayOfTheWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const allPeriod = [
    {
      code: "Daily",
      name: "Daily",
    },
    {
      code: "Weekly",
      name: "Weekly",
    },
  ];

  const allDuration = [
    {
      name: "30 Mins",
      code: 30,
    },
    {
      name: "60 Mins",
      code: 60,
    },
  ];

  const allFrequency = [
    {
      name: "Once",
      code: 1,
    },
    {
      name: "Twice",
      code: 2,
    },
    {
      name: "3 Times",
      code: 3,
    },
    {
      name: "4 Times",
      code: 4,
    },
  ];

  useEffect(() => {
    if (modal?.status) {
      if (modal?.payload) {
        setGameName(modal?.payload?.name);
        setIsAvailableToplay(modal?.payload?.isAvailableToplay);
        // setSelectedDay(modal?.payload?.dayAvailable);
        setStatus(modal?.payload?.status);
        setStartTime(modal?.payload?.startTime);
        setEndTime(modal?.payload?.endTime);
        setselectedGameGroup(modal?.payload?.gameGroupId);
        setPeriod(modal?.payload?.period);
        setDuration(modal?.payload?.duration);
        setFrequency(modal?.payload?.frequency);

        validateForm();
      }
    }
  }, [modal]);

  useEffect(() => {
    validateForm();
  }, [
    gameName,
    status,
    endTime,
    startTime,
    isAvailableToplay,
    selectedGameGroup,
    period,
    frequency,
    duration,
    emptyFields,
  ]);

  const validateForm = () => {
    if (!selectedGameGroup) {
      setEmptyFields(true);
      return false;
    }
    if (!gameName) {
      setEmptyFields(true);
      return false;
    }

    // if (!selectedDay) {
    //   setEmptyFields(true);
    //   return false;
    // }

    if (!period) {
      setEmptyFields(true);
      return false;
    }

    if (!duration) {
      setEmptyFields(true);
      return false;
    }

    if (!frequency) {
      setEmptyFields(true);
      return false;
    }

    if (!status) {
      setEmptyFields(true);
      return false;
    }

    if (!startTime) {
      setEmptyFields(true);
      return false;
    }

    if (!endTime) {
      setEmptyFields(true);
      return false;
    }

    // if (startTime) {
    //   setEmptyFields(true);
    //   return false;
    // }
    setEmptyFields(false);
  };

  const proceed = () => {
    setResponseError("");
    let selectedStartTime = new Date(startTime)?.getTime();
    let selectedEndTime = new Date(endTime)?.getTime();
    let timeNow = new Date()?.getTime();

    if (selectedStartTime < timeNow) {
      setResponseError("Start time should be a future time");

      return;
    }

    if (selectedEndTime < timeNow) {
      setResponseError("End time should be a future time");

      return;
    }

    if (selectedStartTime > selectedEndTime) {
      setResponseError("End time should be a greater than start time");

      return;
    }

    let currentDate = new Date(startTime);
    let newDatwToPlay = dayOfTheWeek[currentDate.getDay()];

    setIsLoading(true);
    const payload = {
      // email: user?.email,
      name: gameName,
      daytoplay: newDatwToPlay,
      startTime: startTime,
      endTime: endTime,
      status: status,
      gameGroupId: selectedGameGroup,
      period: period,
      duration: parseInt(duration, 10),
      frequency: parseInt(frequency, 10),
    };

    // console.log("payload", payload);

    let URL =
      modal?.type === "EDIT"
        ? UPDATE_GAME_URL + `?Id=${modal?.payload?.id}`
        : CREATE_GAME_URL;

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
                title: "Game Updated Successful",
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
      handlePOSTRequest(CREATE_GAME_URL, payload)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: "Game Created Successful",
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
    }
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP large_modal" id="signupModal">
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
                {modal?.type === "EDIT" ? "Edit Game" : "Create Game"}
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
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Game Group</label>

                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setselectedGameGroup(e.target.value);
                        }
                      }}
                      value={selectedGameGroup}
                    >
                      <option value="">Select game group</option>

                      {gamesgroup &&
                        gamesgroup?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input
                      onChange={(e) => setGameName(e.target.value)}
                      value={gameName}
                      className="form-control largeInputFont py-3"
                      placeholder="Game name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Start time</label>
                    <input
                      onChange={(e) => setStartTime(e.target.value)}
                      value={startTime}
                      className="form-control largeInputFont py-3"
                      type="datetime-local"
                      id="birthdaytime"
                      name="birthdaytime"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">End time</label>
                    <input
                      onChange={(e) => setEndTime(e.target.value)}
                      value={endTime}
                      className="form-control largeInputFont py-3"
                      type="datetime-local"
                      id="birthdaytime"
                      name="birthdaytime"
                    />
                  </div>
                </div>
                {/* <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Day to play</label>
                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedDay(e.target.value);
                        }
                      }}
                      value={selectedDay}
                    >
                      <option value="">Select day</option>

                      {dayOfTheWeek &&
                        dayOfTheWeek?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                  </div>
                </div> */}

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Period</label>
                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setPeriod(e.target.value);
                        }
                      }}
                      value={period}
                    >
                      <option value="">
                        Determines is the game daily or weekly
                      </option>

                      {allPeriod?.map((item, index) => (
                        <option key={index} value={item?.code}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Duration</label>
                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setDuration(e.target.value);
                        }
                      }}
                      value={duration}
                    >
                      <option value="">How long is the game lasted</option>

                      {allDuration?.map((item, index) => (
                        <option key={index} value={item?.code}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Frequency</label>
                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setFrequency(e.target.value);
                        }
                      }}
                      value={frequency}
                    >
                      <option value="">
                        How many times is the game going to occur
                      </option>
                      <option value="" disabled>
                        e.g once a week
                      </option>

                      {allFrequency?.map((item, index) => (
                        <option key={index} value={item?.code}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Status</label>
                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setStatus(e.target.value);
                        }
                      }}
                      value={status}
                    >
                      <option value="">Select status</option>

                      {["OPEN", "CLOSE"]?.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor=""></label>
                    <div className="checkboxDiv">
                      <div className="form-check form-switch">
                        <input
                          onChange={() =>
                            setIsAvailableToplay(!isAvailableToplay)
                          }
                          checked={isAvailableToplay}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                        <label
                          style={{ fontSize: 17, paddingTop: 5 }}
                          className="form-check-label mb-0"
                          htmlFor="flexSwitchCheckDefault"
                        >
                          Is Available
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
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

export default CreateGameModal;
