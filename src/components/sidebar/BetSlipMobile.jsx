import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./sidebar.scss";

import { useDispatch, useSelector } from "react-redux";
import { setBetSlipMobileModal } from "../../store/alert/alertSlice";
import BetSlipsBox from "../blocks/BetSlipsBox";

const BetSlipMobile = () => {
  const dispatch = useDispatch();

  const [selectedAmount, setselectedAmount] = useState(0);

  const betSlipMobileModal = useSelector(
    (state) => state.alert.betSlipMobileModal
  );
  // const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  return (
    <div className="betSlipMobile">
      <div
        className={`sidebar  ${betSlipMobileModal ? "showSidebarMenu" : ""}`}
      >
        <div>
          <div
            className="threeColLeftWrapperClose"
            onClick={() => dispatch(setBetSlipMobileModal(false))}
          >
            <i className="bx bx-x "></i>
          </div>

          <div className="betSlipMobileBets">
            <BetSlipsBox
              showAmount={false}
              showInput={false}
              selectedAmount={selectedAmount}
              setselectedAmount={setselectedAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetSlipMobile;
