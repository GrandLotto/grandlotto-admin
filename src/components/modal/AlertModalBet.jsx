import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComma, copyCode } from "../../global/customFunctions";
import {
  setAlertBetModal,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";

const AlertModalBet = () => {
  const alertModal = useSelector((state) => state.alert.alertBetModal);
  const accountBalances = useSelector((state) => state.wallet.accountBalances);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [isCopying, setisCopying] = useState(false);

  const closeModal = () => {
    dispatch(
      setAlertBetModal({
        status: false,
        type: "",
        title: "",
        betId: "",
        amountStake: 0,
        amountWinning: 0,
        payload: null,
        buttonText: "",
        buttonURL: "",
      })
    );
  };

  const handleClose = () => {
    if (alertModal?.buttonURL === "DEPOSIT") {
      navigation("/account/fund-wallet");
    }

    closeModal();
  };
  const handleClick = () => {
    if (isCopying === true) {
      return;
    }

    setisCopying(true);

    setTimeout(() => {
      setisCopying(false);
      copyCode(alertModal.betId);

      dispatch(
        setAlertSmallPOPUP({
          status: true,
          message: "Copied to clipboard",
        })
      );
    }, 1400);
  };
  return (
    alertModal?.status && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card vivify popInBottom">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div
              className={`alert-modal-icon ${
                alertModal.type === "SUCCESS" ? "success" : "error"
              }`}
            >
              {alertModal.type === "SUCCESS" ? (
                <i className="bx bx-check"></i>
              ) : (
                <i className="bx bx-x"></i>
              )}
            </div>
            <h4
              className={`${
                alertModal.type === "SUCCESS" ? "success" : "error"
              }`}
            >
              {alertModal.title}
            </h4>

            {alertModal.type === "SUCCESS" ? (
              <>
                {alertModal.betId && (
                  <p
                    style={{
                      width: "auto",
                      display: "inline-block",
                      cursor: "pointer",
                      padding: "7px",
                      paddingLeft: 22,
                      paddingRight: 22,
                      background: "#e1feeb",
                      borderRadius: 2,
                      color: "#333",
                    }}
                    onClick={() => handleClick()}
                  >
                    <span>Bet ID: {alertModal.betId}</span>
                    {!isCopying ? (
                      <i
                        className="bx bx-copy ml-3"
                        style={{ fontSize: 20 }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-refresh font-weight-bold fa-spin ml-3"
                        style={{ fontSize: 20 }}
                      ></i>
                    )}
                  </p>
                )}

                <div className="mt-3 mb-4">
                  {alertModal.amountStake && (
                    <p style={{ width: "100%" }}>
                      <span>
                        Total Stake Amount:
                        <span className="ml-3">
                          <b>
                            ₦
                            {alertModal.amountStake
                              ? addComma(alertModal.amountStake)
                              : alertModal.amountStake}
                          </b>
                        </span>
                      </span>
                    </p>
                  )}

                  <p style={{ width: "100%" }}>
                    <span>
                      Wallet Balance:{" "}
                      <span className="ml-3">
                        <b>
                          ₦
                          {accountBalances && accountBalances.totalBalance
                            ? addComma(accountBalances?.totalBalance)
                            : "0.00"}
                        </b>
                      </span>
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <p style={{ width: "100%" }}>
                  <span>
                    Wallet Balance:{" "}
                    <span className="ml-3">
                      <b>
                        ₦
                        {accountBalances && accountBalances.totalBalance
                          ? addComma(accountBalances?.totalBalance)
                          : "0.00"}
                      </b>
                    </span>
                  </span>
                </p>
              </>
            )}

            <div className="alert-modal-button">
              <button
                onClick={() => handleClose()}
                className="grandLottoButton cardButton"
              >
                {alertModal?.buttonText || "Ok"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertModalBet;
