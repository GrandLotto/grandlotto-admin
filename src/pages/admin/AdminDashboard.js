/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import promo1 from "../../assets/images/promo4.png";
import { useSelector } from "react-redux";
import AdminWalletOverview from "../../components/dashboard/AdminWalletOverview";
import AllWinningTable from "../../components/bet/AllWinningTable";
import AllTransactions from "../../components/transaction/AllTransactions";

const AdminDashboard = () => {
  const user = useSelector((state) => state.oauth.user);
  const allWithdrawal = useSelector((state) => state.wallet.allWithdrawal);
  const allDeposits = useSelector((state) => state.wallet.allDeposits);
  const allWinningLogs = useSelector((state) => state.bets.allWinningLogs);

  const [allTransactions, setAllTransactions] = useState([]);

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

  const emptyFunction = () => {};

  useEffect(() => {
    if (allWithdrawal && allDeposits) {
      let newTrans = [...allWithdrawal, ...allDeposits];
      setAllTransactions(newTrans);
    }
  }, [allWithdrawal, allDeposits]);

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="pages">
      <div className="dashboard_mobile" style={{ marginTop: "-3px" }}>
        <img src={promo1} alt="grand-logo" className="showOnMobile" />
        <div className="">
          <div className="d-flex justify-content-between pages_header hideOnMobile">
            <h5 className="site_title">Overview</h5>
          </div>

          <AdminWalletOverview user={user} />

          <div className="mt-5 hideOnMobile">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5>Winnings</h5>
              <Link
                to="/admin/games/winnings"
                className="d-flex align-items-center"
              >
                <span className="text-dark">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>
            <AllWinningTable
              columns={columns2}
              data={allWinningLogs?.slice(0, 7)}
              page={1}
              totalPages={3}
              type="ADMIN"
              isLoading={false}
              hasPagination={false}
              nextP={() => {}}
              PrevP={() => {}}
              fetchByPage={() => {}}
              columnSpan={10}
              noDataText="No winnings"
              onDelete={() => {}}
            />
          </div>
          <div className="mt-5 hideOnMobile">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5>Transactions</h5>
              <Link
                to="/admin/transactions"
                className="d-flex align-items-center"
              >
                <span className="text-dark">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>

            <AllTransactions
              columns={columns}
              data={allTransactions?.slice(0, 5)}
              page={1}
              totalPages={2}
              hasPagination={false}
              type="ALL"
              isLoading={false}
              nextP={emptyFunction}
              PrevP={emptyFunction}
              fetchByPage={emptyFunction}
              columnSpan={10}
              noDataText="No deposit history"
            />
          </div>
        </div>

        <div className="mt-5  text-light showOnMobile">
          <div className="px-3 mt-5">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-light">Winnings</h5>

              <Link
                to="/admin/games/winnings"
                className="d-flex align-items-center"
              >
                <span className="text-light">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>
            <div className="transactionDark">
              <AllWinningTable
                columns={columns2}
                data={allWinningLogs?.slice(0, 7)}
                page={1}
                totalPages={3}
                type="ADMIN"
                isLoading={false}
                hasPagination={false}
                nextP={() => {}}
                PrevP={() => {}}
                fetchByPage={() => {}}
                columnSpan={10}
                noDataText="No winnings"
                onDelete={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="mt-5  text-light showOnMobile">
          <div className="px-3 mt-5">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-light">Transactions</h5>

              <Link
                to="/admin/transactions"
                className="d-flex align-items-center"
              >
                <span className="text-light">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>
            <div className="transactionDark">
              <AllTransactions
                columns={columns}
                data={allTransactions?.slice(0, 5)}
                page={1}
                totalPages={2}
                hasPagination={false}
                type="ALL"
                isLoading={false}
                nextP={emptyFunction}
                PrevP={emptyFunction}
                fetchByPage={emptyFunction}
                columnSpan={10}
                noDataText="No deposit history"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
