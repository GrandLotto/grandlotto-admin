/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_VALIDATED_GAMES_BY_GAMEID_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAllValidatedGameResults,
  setAllValidatedGameResultsPage,
  setAllValidatedGameResultsTotalPages,
} from "../../store/betSlice/betSlice";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";
import AllBetPlayed from "../../components/bet/AllBetPlayed";
import { formateDateByName } from "../../global/customFunctions";
import { formatAMPM } from "../../global/customFunctions";

const AdminValidationResult = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);
  const validatedGames = useSelector((state) => state.bets.validatedGames);
  const allValidatedGameResults = useSelector(
    (state) => state.bets.allValidatedGameResults
  );
  const allValidatedGameResultsPage = useSelector(
    (state) => state.bets.allValidatedGameResultsPage
  );
  const allValidatedGameResultsTotalPages = useSelector(
    (state) => state.bets.allValidatedGameResultsTotalPages
  );
  const [selectedGame, setSelectedGame] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewGame, setPreviewGame] = useState(null);
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);
  const [hasChanged, sethasChanged] = useState(false);
  const [startDate, setStartDate] = useState("");

  // console.log("validatedGames", validatedGames);

  const columns = [
    {
      name: "Game ID",
    },

    {
      name: "customer",
    },

    {
      name: "Games Group",
    },
    {
      name: "Games Played",
    },
    {
      name: "Games Name",
    },
    {
      name: "Games Type",
    },
    {
      name: "Stake",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Status",
    },

    {
      name: "Pot. winning",
    },

    // {
    //   name: "Action",
    // },
  ];

  const fetchByPage = (type, page) => {
    const payload = {
      gameId: selectedGame,
      pageNumber: page,
      pageSize: 10,
      date: !startDate ? null : startDate,
    };
    let url = GET_VALIDATED_GAMES_BY_GAMEID_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      gameId: selectedGame,
      pageNumber: allValidatedGameResultsPage - 1,
      pageSize: 10,
      date: !startDate ? null : startDate,
    };

    let url = GET_VALIDATED_GAMES_BY_GAMEID_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      gameId: selectedGame,
      pageNumber: allValidatedGameResultsPage + 1,
      pageSize: 10,
      date: !startDate ? null : startDate,
    };

    let url = GET_VALIDATED_GAMES_BY_GAMEID_URL;

    fetchMore(type, url, payload);
  };

  const fetchMore = (type, url, payload) => {
    setIsLoading(true);

    // console.log(payload);

    handlePOSTRequest(url, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;

          let currentPage = requestData?.pageNumber;
          let totalPages = requestData?.totalPages;
          let allDatas = requestData?.data;

          dispatch(setAllValidatedGameResults(allDatas));
          dispatch(setAllValidatedGameResultsPage(currentPage));
          dispatch(setAllValidatedGameResultsTotalPages(totalPages));

          sethasChanged(false);
        } else {
          dispatch(setAllValidatedGameResultsPage(allValidatedGameResultsPage));
          dispatch(
            setAllValidatedGameResultsTotalPages(
              allValidatedGameResultsTotalPages
            )
          );

          dispatch(
            setAlertSmallPOPUP({
              status: false,
              message: response?.data?.message,
            })
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);

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

  const handleFilter = () => {
    setClearSeasrchFilter(false);
    const payload = {
      // gameId: 1,
      gameId: selectedGame,
      pageNumber: 1,
      pageSize: 10,
      date: !startDate ? null : startDate,
    };

    // console.log("handleFilter", payload);
    let url = GET_VALIDATED_GAMES_BY_GAMEID_URL;
    setPreviewGame(null);
    fetchMore("", url, payload);
  };

  useEffect(() => {
    if (clearSeasrchFilter === true) {
      handleFilter();
    }
  }, [clearSeasrchFilter]);

  useEffect(() => {
    if (selectedGame && allValidatedGameResults && hasChanged === false) {
      let oneSelected = validatedGames?.find(
        (item) => item?.gameId === Number(selectedGame)
      );
      // console.log("oneSelected", oneSelected);
      if (oneSelected) {
        setPreviewGame(oneSelected);
      }
    }
  }, [selectedGame, allValidatedGameResults, hasChanged]);

  useEffect(() => {
    return () => {
      // console.log("here");
      if (allValidatedGameResults) {
        dispatch(setAllValidatedGameResults([]));
        dispatch(setAllValidatedGameResultsPage(1));
        dispatch(setAllValidatedGameResultsTotalPages(3));
      }
    };
  }, []);

  useEffect(() => {
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
            <h5 className="site_title">{"Games > Validation Results"}</h5>
          </div>

          <form
            className="mt-5 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedGame && startDate) {
                handleFilter();
              }
            }}
          >
            <div className="row ">
              <div className="col-md-3">
                <div className="form-group mb-4">
                  <label htmlFor="">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      if (e.target.value) {
                        setStartDate(e.target.value);
                        sethasChanged(true);
                      }
                    }}
                    value={startDate}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group" style={{ width: "100%" }}>
                  <label htmlFor="">Select Game</label>

                  <select
                    style={{ width: "100%" }}
                    className="form-control hasCapitalized"
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedGame(e.target.value);
                        sethasChanged(true);
                      }
                    }}
                    value={selectedGame}
                  >
                    <option value="">Select Game</option>

                    {validatedGames &&
                      validatedGames?.map((item, index) => (
                        <option key={index} value={item?.gameId}>
                          {item?.gameName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mt-4"></div>

                <button type="submit" className="grandLottoButton">
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5 w_inner">
            {previewGame &&
            allValidatedGameResults &&
            allValidatedGameResults?.length ? (
              <div className="totalityGrid">
                <div className="totalityItems">
                  <p>Game ID</p>
                  <h5>{previewGame?.gameId}</h5>
                </div>
                <div className="totalityItems">
                  <p>Game Name</p>
                  <h5>{previewGame?.gameName}</h5>
                </div>
                <div className="totalityItems">
                  <p>Winning No</p>
                  <h5>{previewGame?.winningNumbers}</h5>
                </div>
                <div className="totalityItems">
                  <p>Machine No</p>
                  <h5>{previewGame?.machineNumber}</h5>
                </div>

                <div className="totalityItems">
                  <p>Draw Date</p>
                  <h5>
                    {previewGame?.dateValidated
                      ? formateDateByName(previewGame?.dateValidated)
                      : "none"}
                  </h5>
                </div>
                <div className="totalityItems">
                  <p>Draw Time</p>
                  <h5>
                    {previewGame?.dateValidated
                      ? formatAMPM(previewGame?.dateValidated)
                      : "none"}
                  </h5>
                </div>
              </div>
            ) : null}

            <div className="card mb-4">
              <AllBetPlayed
                columns={columns}
                data={
                  allValidatedGameResults === null
                    ? []
                    : allValidatedGameResults
                }
                page={allValidatedGameResultsPage}
                totalPages={allValidatedGameResultsTotalPages}
                type="ADMIN"
                isLoading={isLoading}
                nextP={nextPage}
                PrevP={previousPage}
                fetchByPage={fetchByPage}
                columnSpan={10}
                noDataText="No validation game result"
                onDelete={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminValidationResult;
