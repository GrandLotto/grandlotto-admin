/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/dashboard/dashboard.scss";
import {
  GET_USER_DEPOSITS_URL,
  GET_USER_WITHDRAWALS_URL,
} from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";
import {
  setAllDeposits,
  setAllDepositsPage,
  setAllDepositsTotalPages,
  setAllWithdrawal,
  setAllWithdrawalPage,
  setAllWithdrawalTotalPages,
} from "../../store/wallet/walletSlice";
import AllTransactions from "../../components/transaction/AllTransactions";

const AdminTransactionsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const allWithdrawal = useSelector((state) => state.wallet.allWithdrawal);
  const allWithdrawalPage = useSelector(
    (state) => state.wallet.allWithdrawalPage
  );
  const allWithdrawalTotalPages = useSelector(
    (state) => state.wallet.allWithdrawalTotalPages
  );

  const allDeposits = useSelector((state) => state.wallet.allDeposits);

  const allDepositsPage = useSelector((state) => state.wallet.allDepositsPage);
  const allDepositsTotalPages = useSelector(
    (state) => state.wallet.allDepositsTotalPages
  );

  // const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [whichPage, setWhichPage] = useState("WITHDRAWAL");
  // const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);

  const [startDate] = useState("");
  const [endDate] = useState("");

  // console.log(userWithdrawalTotalPages);

  const columns = [
    {
      name: "Request ID",
    },

    {
      name: "Account",
    },
    {
      name: "User",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Status",
    },
    {
      name: "Amount",
    },
  ];

  const columns2 = [
    {
      name: "Request ID",
    },

    {
      name: "Channel",
    },
    {
      name: "User",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Status",
    },
    {
      name: "Amount",
    },
  ];

  const fetchByPage = (type, page) => {
    const payload = {
      email: user?.email,
      pageNumber: page,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url;
    if (type === "WITHDRAWAL") {
      url = GET_USER_WITHDRAWALS_URL;
    }
    if (type === "DEPOSIT") {
      url = GET_USER_DEPOSITS_URL;
    }

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber:
        type === "WITHDRAWAL" ? allWithdrawalPage - 1 : allDepositsPage - 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url;
    if (type === "WITHDRAWAL") {
      url = GET_USER_WITHDRAWALS_URL;
    }
    if (type === "DEPOSIT") {
      url = GET_USER_DEPOSITS_URL;
    }

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber:
        type === "WITHDRAWAL" ? allWithdrawalPage + 1 : allDepositsPage + 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };

    let url;
    if (type === "WITHDRAWAL") {
      url = GET_USER_WITHDRAWALS_URL;
    }
    if (type === "DEPOSIT") {
      url = GET_USER_DEPOSITS_URL;
    }

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

          if (type === "WITHDRAWAL") {
            dispatch(setAllWithdrawal(allDatas));
            dispatch(setAllWithdrawalPage(currentPage));
            dispatch(setAllWithdrawalTotalPages(totalPages));
          }

          if (type === "DEPOSIT") {
            dispatch(setAllDeposits(allDatas));
            dispatch(setAllDepositsPage(currentPage));
            dispatch(setAllDepositsTotalPages(totalPages));
          }
        } else {
          if (type === "WITHDRAWAL") {
            dispatch(setAllWithdrawalPage(allWithdrawalPage));
            dispatch(setAllWithdrawalTotalPages(allWithdrawalTotalPages));
          }

          if (type === "DEPOSIT") {
            dispatch(setAllDepositsPage(allDepositsPage));
            dispatch(setAllDepositsTotalPages(allDepositsTotalPages));
          }

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

  // const handleFilter = () => {
  //   setShowFilter(false);
  //   setClearSeasrchFilter(false);
  //   const payload = {
  //     email: user?.email,
  //     pageNumber: 1,
  //     pageSize: 10,
  //     startime: !startDate ? null : startDate,
  //     endTime: !endDate ? null : endDate,
  //   };
  //   let url;
  //   if (whichPage === "WITHDRAWAL") {
  //     url = GET_USER_WITHDRAWALS_URL;
  //   }
  //   if (whichPage === "DEPOSIT") {
  //     url = GET_USER_DEPOSITS_URL;
  //   }

  //   fetchMore(whichPage, url, payload);
  // };

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     handleFilter();
  //   }
  // }, [startDate, endDate]);

  // useEffect(() => {
  //   if (clearSeasrchFilter === true) {
  //     handleFilter();
  //   }
  // }, [clearSeasrchFilter]);

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
            <h5 className="site_title">All Transactions</h5>
          </div>

          <div className="mt-5">
            <div className="grandlotto_tabs text-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Wallet-tab"
                  >
                    Withdrawable
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Withdrawable-tab"
                  >
                    Deposit
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
                <div className="card">
                  <AllTransactions
                    columns={columns}
                    data={allWithdrawal}
                    page={allWithdrawalPage}
                    totalPages={allWithdrawalTotalPages}
                    type="WITHDRAWAL"
                    isLoading={isLoading}
                    nextP={nextPage}
                    PrevP={previousPage}
                    fetchByPage={fetchByPage}
                    columnSpan={10}
                    noDataText="No withdrawal history"
                  />
                </div>
              </div>
              <div className="tab-pane" id="Withdrawable-tab">
                <div className="card">
                  <AllTransactions
                    columns={columns2}
                    data={allDeposits}
                    page={allDepositsPage}
                    totalPages={allDepositsTotalPages}
                    type="DEPOSIT"
                    isLoading={isLoading}
                    nextP={nextPage}
                    PrevP={previousPage}
                    fetchByPage={fetchByPage}
                    columnSpan={10}
                    noDataText="No deposit history"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTransactionsPage;
