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
  const allGamesPlayed = useSelector((state) => state.bets.allGamesPlayed);
  const allGamesPlayedPage = useSelector(
    (state) => state.bets.allGamesPlayedPage
  );
  const allGamesPlayedTotalPages = useSelector(
    (state) => state.bets.allGamesPlayedTotalPages
  );

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
      pageNumber: page,
      pageSize: 10,
    };
    let url = GET_ALL_GAMES_PLAYED_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      pageNumber: allGamesPlayedPage - 1,
      pageSize: 10,
    };

    let url = GET_ALL_GAMES_PLAYED_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
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
            <h5 className="site_title">{"Games > Games played"}</h5>
          </div>

          <div className="mt-5 w_inner">
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
                noDataText="No winnings"
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
