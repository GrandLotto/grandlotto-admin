import React, { useEffect, useState } from "react";

import Group from "../../assets/images/Group.png";
import uil_money from "../../assets/images/uil_money.png";
import ps_promo from "../../assets/images/ps_promo.png";
import { useSelector } from "react-redux";
import { addComma } from "../../global/customFunctions";

const HomeWalletOverview = () => {
  const accountBalances = useSelector((state) => state.wallet.accountBalances);

  const [wallet, setWallet] = useState(null);
  const [walletMobile, setWalletMobile] = useState(null);

  useEffect(() => {
    if (accountBalances) {
      setWallet([
        {
          id: 1,
          img: Group,
          title: "Wallet balance",
          desc: addComma(accountBalances?.totalBalance),
        },
        {
          id: 2,
          img: uil_money,
          title: "Withdrawable balance",
          desc: addComma(accountBalances?.winningBalance),
        },
        {
          id: 3,
          img: ps_promo,
          title: "Bonus balance",
          desc: addComma(accountBalances?.bonusAccount),
        },
      ]);
      setWalletMobile([
        {
          id: 1,
          img: "bx bx-wallet-alt",
          title: "Balance",
          desc: addComma(accountBalances?.totalBalance),
        },
        {
          id: 2,
          img: "bx bx-money",
          title: "Withdrawable",
          desc: addComma(accountBalances?.winningBalance),
        },
        {
          id: 3,
          img: "bx bx-gift",
          title: "Bonus ",
          desc: addComma(accountBalances?.bonusAccount),
        },
      ]);
    }
  }, [accountBalances]);

  return (
    <>
      <div className="homeWalletOverview hideOnMobile">
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
      <div className="showOnMobile mobile_tr">
        <div className="sidebarMobleHeaderWalletButtons">
          {walletMobile &&
            walletMobile?.map((item, index) => (
              <div className="sidebarMobleHeaderWalletButtonsItem" key={index}>
                <i className={item?.img}></i>
                <h4 className="">{item?.title}</h4>
                <p className="">{item?.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HomeWalletOverview;
