/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_GAME_WINNING_LOG_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAllWinningLogs,
  setAllWinningLogsPage,
  setAllWinningLogsTotalPages,
} from "../../store/betSlice/betSlice";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";
import AllWinningTable from "../../components/bet/AllWinningTable";
import FilterModals from "../../components/modal/FilterModals";

const AdminGameWinning = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const allWinningLogs = useSelector((state) => state.bets.allWinningLogs);
  const allWinningLogsPage = useSelector(
    (state) => state.bets.allWinningLogsPage
  );
  const allWinningLogsTotalPages = useSelector(
    (state) => state.bets.allWinningLogsTotalPages
  );

  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const columns = [
    {
      name: "#",
    },

    {
      name: "customer",
    },

    {
      name: "Game played",
    },
    {
      name: "Game Number",
    },
    {
      name: "Stake",
    },
    {
      name: "Winning Amount",
    },
    {
      name: "Winning Date",
    },

    // {
    //   name: "Action",
    // },
  ];

  const fetchByPage = (type, page) => {
    const payload = {
      email: user?.email,
      pageNumber: page,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url = GET_GAME_WINNING_LOG_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber: allWinningLogsPage - 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };

    let url = GET_GAME_WINNING_LOG_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber: allWinningLogsPage + 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };

    let url = GET_GAME_WINNING_LOG_URL;

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

          dispatch(setAllWinningLogs(allDatas));
          dispatch(setAllWinningLogsPage(currentPage));
          dispatch(setAllWinningLogsTotalPages(totalPages));
        } else {
          dispatch(setAllWinningLogsPage(allWinningLogsPage));
          dispatch(setAllWinningLogsTotalPages(allWinningLogsTotalPages));

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
      email: user?.email,
      pageNumber: 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url = GET_GAME_WINNING_LOG_URL;

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
            <h5 className="site_title">{"Games > Winnings"}</h5>
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

          <div className="mt-5 w_inner">
            <div className="card mb-4">
              <AllWinningTable
                columns={columns}
                data={allWinningLogs}
                page={allWinningLogsPage}
                totalPages={allWinningLogsTotalPages}
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

export default AdminGameWinning;
