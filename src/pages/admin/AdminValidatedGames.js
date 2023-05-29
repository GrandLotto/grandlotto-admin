/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_VALIDATED_GAMES_BY_GAMEID_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setValidatedGames,
  setValidatedGamesPage,
  setValidatedGamesTotalPages,
} from "../../store/betSlice/betSlice";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";
import FilterModals from "../../components/modal/FilterModals";
import AllBetPlayed from "../../components/bet/AllBetPlayed";
import { formateDateAndTimeByName } from "../../global/customFunctions";

const AdminValidatedGames = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);
  const games = useSelector((state) => state.bets.allgames);

  // const validatedGames = useSelector((state) => state.bets.validatedGames);
  const validatedGamesPage = useSelector(
    (state) => state.bets.validatedGamesPage
  );
  const validatedGamesTotalPages = useSelector(
    (state) => state.bets.validatedGamesTotalPages
  );
  const [selectedGame, setSelectedGame] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
      gameId: selectedGame?.id,
      pageNumber: page,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url = GET_VALIDATED_GAMES_BY_GAMEID_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      gameId: selectedGame?.id,
      pageNumber: validatedGamesPage - 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };

    let url = GET_VALIDATED_GAMES_BY_GAMEID_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      gameId: selectedGame?.id,
      pageNumber: validatedGamesPage + 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
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

          dispatch(setValidatedGames(allDatas));
          dispatch(setValidatedGamesPage(currentPage));
          dispatch(setValidatedGamesTotalPages(totalPages));
        } else {
          dispatch(setValidatedGamesPage(validatedGamesPage));
          dispatch(setValidatedGamesTotalPages(validatedGamesTotalPages));

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
    setShowFilter(false);
    setClearSeasrchFilter(false);
    const payload = {
      // gameId: 1,
      gameId: selectedGame?.id,
      pageNumber: 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url = GET_VALIDATED_GAMES_BY_GAMEID_URL;

    fetchMore("", url, payload);
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setClearSeasrchFilter(true);
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleFilter();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedGame) {
      handleFilter();
    }
  }, [selectedGame]);

  useEffect(() => {
    if (clearSeasrchFilter === true) {
      handleFilter();
    }
  }, [clearSeasrchFilter]);

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <FilterModals
        status={showFilter}
        setVisiblityStatus={setShowFilter}
        modalTitle="Filter"
      >
        <div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold">Date</h6>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label htmlFor="">Start from</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    if (e.target.value) {
                      setStartDate(e.target.value);
                    }
                  }}
                  value={startDate}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="">To</label>
                <input
                  type="date"
                  onChange={(e) => {
                    if (e.target.value) {
                      setEndDate(e.target.value);
                    }
                  }}
                  value={endDate}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </FilterModals>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">{"Games > Validated Games"}</h5>
          </div>
          <div className="d-flex justify-content-end paddRightSmall">
            <div
              className="d-flex align-items-center mb-0"
              style={{ columnGap: 10 }}
            >
              {(startDate || endDate) && (
                <a
                  href="true"
                  className="has_link"
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    clearFilter();
                  }}
                >
                  Clear Filtering
                </a>
              )}
              <button
                className="grandLottoButton filterButton"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setShowFilter(true);
                }}
              >
                <span
                  className="d-flex align-items-center"
                  style={{ columnGap: 10 }}
                >
                  <i className="bx bx-slider"></i>
                  <span>Filter</span>
                </span>
              </button>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-3">
              <div className="form-group" style={{ width: "100%" }}>
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

          <div className="mt-5 w_inner">
            <div className="card mb-4">
              <AllBetPlayed
                columns={columns}
                data={[]}
                page={validatedGamesPage}
                totalPages={validatedGamesTotalPages}
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

export default AdminValidatedGames;
