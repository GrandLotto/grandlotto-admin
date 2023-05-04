import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BANK_URL,
  VERIFY_ACCOUNT_NUMBER_URL,
} from "../../config/urlConfigs";
// import { nigerianBanks } from "../../global/banks/banks";
import { sortArrayByname } from "../../global/customFunctions";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAddBankModal,
  setAlertPopUp,
  setPageLoading,
} from "../../store/alert/alertSlice";

import { getUserAccount } from "../../store/wallet/actions";

const AddBankModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.alert.addBankModal);
  const countryBanks = useSelector((state) => state.wallet.countryBanks);
  const user = useSelector((state) => state.oauth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [allBanks] = useState(sortArrayByname(countryBanks));
  // const [allBanks] = useState(sortArrayByname(nigerianBanks()));
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNameError, setAccountNameError] = useState("");

  const resetFields = () => {
    setIsLoading(false);
    setSelectedBank(null);
    setAccountNumber("");
    setAccountName("");
    setAccountNameError("");
  };

  const closeModal = () => {
    dispatch(setAddBankModal(false));
    resetFields();
  };

  useEffect(() => {
    if (modal === false) {
      resetFields();
    }
  }, [modal]);

  const handleAccountLookUp = () => {
    if (!selectedBank) {
      return;
    }

    if (!accountNumber) {
      return;
    }

    // console.log(accountNumber.length);

    if (accountNumber.length !== 10) {
      return;
    }

    getAccountName();
  };

  const getAccountName = () => {
    setAccountName("");
    setIsLoading(true);
    setAccountNameError("");

    // console.log(selectedBank);

    const payload = {
      email: user?.email,
      bankCode: selectedBank,
      accountNumber: accountNumber,
    };

    handlePOSTRequest(VERIFY_ACCOUNT_NUMBER_URL, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          setAccountName(response?.data?.data?.accountName);
        } else {
          setAccountName("");
          setAccountNameError(response?.data?.message);
        }
      })
      .catch((error) => {
        setAccountName("");
        setAccountNameError("Error: could not verify");
        setIsLoading(false);
      });
  };

  const addBank = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    const payload = {
      email: user?.email,
      bankCode: selectedBank,
      accountNumber: accountNumber,
    };

    handlePOSTRequest(ADD_BANK_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: "Bank account added successful",
              desc: response?.data?.message,
              payload: null,
            })
          );

          // dispatch(getUserInfo(user?.email));
          dispatch(getUserAccount(user?.email));

          closeModal();
        } else {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: "Error",
              desc: response?.data?.message,
              payload: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
      });
  };

  return (
    modal && (
      <div className="select_modals">
        <div
          className="select_modals_overlay"
          onClick={() => closeModal()}
        ></div>
        <div className="select_modals_cards">
          <div className="select-modal-header">
            <div className="d-flex align-items-center">
              <i
                className="bx bx-chevron-left"
                onClick={() => closeModal()}
              ></i>
              <h5>Add Bank</h5>
            </div>
          </div>
          <div className="select_modals_body">
            <form className="grandlotto_form  p-0">
              <div className="row mb-3">
                <div className="col-md-12 mb-5" style={{ marginTop: -20 }}>
                  <p className="inputError " style={{ color: "#ce6b02" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 20 20"
                      role="presentation"
                      focusable="false"
                      tabIndex="-1"
                      fill="#ce6b02"
                    >
                      <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                    </svg>
                    <span className="ml-2">
                      <b>NOTE: </b>
                    </span>
                    <span
                      style={{ fontSize: 13 }}
                      className="ml-2 d-block pr-2"
                    >
                      Your bank account name must match with the name on your
                      kyc document{" "}
                    </span>
                  </p>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label>
                      Select Bank <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      style={{ width: "100%" }}
                      className="form-control"
                      onChange={(e) => {
                        setSelectedBank(e.target.value);

                        // console.log(e.target.value);
                        handleAccountLookUp();
                      }}
                    >
                      <option value="">Select bank</option>

                      {allBanks &&
                        allBanks?.map((item, index) => (
                          <option key={index} value={item?.code}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label>
                      Account Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="password_input">
                      <input
                        type="text"
                        maxLength={10}
                        onBlur={() => handleAccountLookUp()}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        value={accountNumber}
                        className="form-control py-3"
                        style={{ width: "100%" }}
                      />

                      {isLoading && (
                        <span
                          className="showHide spinner spinner-border spinner-border-sm"
                          role={"status"}
                        ></span>
                      )}
                    </div>
                    {accountNameError && (
                      <p className="inputError text-danger">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 20 20"
                          role="presentation"
                          focusable="false"
                          tabIndex="-1"
                          fill="red"
                        >
                          <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                        </svg>
                        <span className="ml-2">{accountNameError}</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label>
                      Account Name <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="text"
                      disabled
                      onChange={(e) => setAccountName(e.target.value)}
                      value={accountName}
                      className="form-control py-3"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-2">
                <button
                  disabled={!accountName}
                  style={{ width: "100%" }}
                  type="button"
                  className="grandLottoButton cardButton"
                  onClick={() => addBank()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddBankModal;
