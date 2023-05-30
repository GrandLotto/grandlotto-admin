/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_VALIDATED_GAMES_URL } from "../../config/urlConfigs";
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
import AllValidatedGames from "../../components/bet/AllValidatedGames";

const AdminValidatedGames = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);
  // const games = useSelector((state) => state.bets.allgames);

  const validatedGames = useSelector((state) => state.bets.validatedGames);
  const validatedGamesPage = useSelector(
    (state) => state.bets.validatedGamesPage
  );
  const validatedGamesTotalPages = useSelector(
    (state) => state.bets.validatedGamesTotalPages
  );

  const [isLoading, setIsLoading] = useState(false);
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);

  const columns = [
    {
      name: "Game ID",
    },

    {
      name: "Games Name",
    },

    {
      name: "Winning Numbers",
    },

    {
      name: "Machine Numbers",
    },

    {
      name: "Date/Time validated",
    },

    // {
    //   name: "Action",
    // },
  ];

  const fetchByPage = (type, page) => {
    const payload = {
      pageNumber: page,
      pageSize: 10,
      // startime: !startDate ? null : startDate,
      // endTime: !endDate ? null : endDate,
    };
    let url = GET_VALIDATED_GAMES_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      // gameId: selectedGame?.id,
      pageNumber: validatedGamesPage - 1,
      pageSize: 10,
      // startime: !startDate ? null : startDate,
      // endTime: !endDate ? null : endDate,
    };

    let url = GET_VALIDATED_GAMES_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      // gameId: selectedGame?.id,
      pageNumber: validatedGamesPage + 1,
      pageSize: 10,
      // startime: !startDate ? null : startDate,
      // endTime: !endDate ? null : endDate,
    };

    let url = GET_VALIDATED_GAMES_URL;

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
    setClearSeasrchFilter(false);
    const payload = {
      // gameId: 1,
      // gameId: selectedGame?.id,
      pageNumber: 1,
      pageSize: 10,
      // startime: !startDate ? null : startDate,
      // endTime: !endDate ? null : endDate,
    };
    let url = GET_VALIDATED_GAMES_URL;

    fetchMore("", url, payload);
  };

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
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">{"Games > Validated Games"}</h5>
          </div>

          <div className="mt-5 w_inner">
            <div className="card mb-4">
              <AllValidatedGames
                columns={columns}
                data={validatedGames}
                page={validatedGamesPage}
                totalPages={validatedGamesTotalPages}
                type="ADMIN"
                isLoading={isLoading}
                nextP={nextPage}
                PrevP={previousPage}
                fetchByPage={fetchByPage}
                columnSpan={10}
                noDataText="No validated game"
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
