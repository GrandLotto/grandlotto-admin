import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ACCOUNT_BALANCES_URL } from "../../config/urlConfigs";
import { addComma } from "../../global/customFunctions";
import { handlePOSTRequest } from "../../rest/apiRest";
import { getUserInfo } from "../../store/authSlice/actions";
import { setRefreshing } from "../../store/authSlice/authSlice";
import { setAccountBalances } from "../../store/wallet/walletSlice";

const HeaderTopBalance = () => {
  const dispatch = useDispatch();
  const accountBalances = useSelector((state) => state.wallet.accountBalances);
  const [refreshBalance, setRefreshBalance] = useState(false);
  const user = useSelector((state) => state.oauth.user);

  const handleRefresh = () => {
    setRefreshBalance(true);
    dispatch(setRefreshing(true));
    const payload = { email: user?.email };

    handlePOSTRequest(GET_ACCOUNT_BALANCES_URL, payload)
      .then((response) => {
        setRefreshBalance(false);

        dispatch(getUserInfo(user?.email));
        // console.log(response);
        if (response?.data?.success) {
          dispatch(setAccountBalances(response?.data?.data));
        }
      })
      .catch((error) => {
        setRefreshBalance(false);
      });
  };

  return (
    <div className="topHeaderRightLoggedInBalance">
      <p style={{ textAlign: "left" }}>Balance</p>

      {accountBalances ? (
        <div className="d-flex align-items-center">
          <h5>
            ₦ {addComma(accountBalances?.totalBalance)}{" "}
            <span
              className="ml-1"
              onClick={() => handleRefresh()}
              style={{ cursor: "pointer", color: "#808e85" }}
            >
              <i
                className={`fa fa-refresh font-weight-bold ${
                  refreshBalance ? "fa-spin" : ""
                }`}
              ></i>
            </span>
          </h5>
        </div>
      ) : (
        <h5>-----</h5>
      )}
    </div>
  );
};

export default HeaderTopBalance;
