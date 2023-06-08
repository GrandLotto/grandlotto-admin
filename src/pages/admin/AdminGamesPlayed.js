/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_GAMES_PLAYED_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAllGamesPlayed,
  setAllGamesPlayedPage,
  setAllGamesPlayedTotalPages,
} from "../../store/betSlice/betSlice";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";
import AllBetPlayed from "../../components/bet/AllBetPlayed";

const AdminGamesPlayed = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);
  const gamesgroup = useSelector((state) => state.bets.gamesgroup);
  const allGamesPlayed = useSelector((state) => state.bets.allGamesPlayed);
  // console.log("allGamesPlayed", allGamesPlayed);
  const allGamesPlayedPage = useSelector(
    (state) => state.bets.allGamesPlayedPage
  );
  const allGamesPlayedTotalPages = useSelector(
    (state) => state.bets.allGamesPlayedTotalPages
  );

  const [selectedGame, setSelectedGame] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);

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
      groupId: selectedGame,
      pageNumber: page,
      pageSize: 10,
    };
    let url = GET_ALL_GAMES_PLAYED_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      groupId: selectedGame,
      pageNumber: allGamesPlayedPage - 1,
      pageSize: 10,
    };

    let url = GET_ALL_GAMES_PLAYED_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      groupId: selectedGame,
      pageNumber: allGamesPlayedPage + 1,
      pageSize: 10,
    };

    let url = GET_ALL_GAMES_PLAYED_URL;

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

          dispatch(setAllGamesPlayed(allDatas));
          dispatch(setAllGamesPlayedPage(currentPage));
          dispatch(setAllGamesPlayedTotalPages(totalPages));
        } else {
          dispatch(setAllGamesPlayedPage(allGamesPlayedPage));
          dispatch(setAllGamesPlayedTotalPages(allGamesPlayedTotalPages));

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
      groupId: selectedGame || 0,
      pageNumber: 1,
      pageSize: 10,
    };
    let url = GET_ALL_GAMES_PLAYED_URL;

    fetchMore("", url, payload);
  };

  useEffect(() => {
    if (clearSeasrchFilter === true) {
      handleFilter();
    }
  }, [clearSeasrchFilter]);

  useEffect(() => {
    if (selectedGame) {
      handleFilter();
    }
  }, [selectedGame]);

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
      if (allGamesPlayed && allGamesPlayed?.length <= 0) {
        handleFilter();
      }
      // console.log("again", allGamesPlayed);
    };
  }, []);

  return (
    <>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">{"Games > Games played"}</h5>
          </div>

          <div className="row mt-5">
            <div className="col-md-3">
              <div className="form-group" style={{ width: "100%" }}>
                <select
                  style={{ width: "100%" }}
                  className="form-control hasCapitalized"
                  onChange={(e) => {
                    if (e.target.value) {
                      // if (selectedGame === e.target.value) {
                      //   return;
                      // }
                      setSelectedGame(e.target.value);
                    }
                  }}
                  value={selectedGame}
                >
                  <option value="">Select game group</option>
                  {/* {gamesgroup && gamesgroup?.length ? (
                    <option value={0}>All</option>
                  ) : null} */}

                  {gamesgroup &&
                    gamesgroup?.map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-3 w_inner">
            <div className="card mb-4">
              <AllBetPlayed
                columns={columns}
                data={allGamesPlayed}
                page={allGamesPlayedPage}
                totalPages={allGamesPlayedTotalPages}
                type="ADMIN"
                isLoading={isLoading}
                nextP={nextPage}
                PrevP={previousPage}
                fetchByPage={fetchByPage}
                columnSpan={10}
                noDataText="No game played"
                onDelete={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminGamesPlayed;
