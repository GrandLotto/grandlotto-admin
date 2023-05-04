import React, { useEffect, useState } from "react";

import ps_promo from "../../assets/images/ps_promo.png";
import { useSelector } from "react-redux";
import { addComma } from "../../global/customFunctions";

const AdminWalletOverview = () => {
  const accountBalances = useSelector((state) => state.wallet.accountBalances);

  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (accountBalances) {
      setWallet([
        {
          id: 1,
          img: ps_promo,
          title: "Total balance",
          desc: addComma(accountBalances?.totalBalance),
        },
        {
          id: 2,
          img: ps_promo,
          title: "Total Transactions",
          desc: addComma(accountBalances?.winningBalance),
        },
        {
          id: 3,
          img: ps_promo,
          title: "Total Winnings",
          desc: addComma(accountBalances?.bonusAccount),
        },
        {
          id: 4,
          img: ps_promo,
          title: "Total Users",
          desc: addComma(accountBalances?.bonusAccount),
        },
      ]);
    }
  }, [accountBalances]);

  return (
    <>
      <div className="homeWalletOverview">
        {wallet &&
          wallet?.map((item, index) => (
            <div key={index} className="homeWalletOverviewItem">
              <div className="homeWalletOverviewItemImage">
                <img src={item?.img} alt="grand-logo" />
              </div>
              <div>
                <h5>{item?.title}</h5>
                <h3>{item?.desc}</h3>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminWalletOverview;
