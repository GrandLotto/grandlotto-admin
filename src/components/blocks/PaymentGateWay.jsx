import React from "react";

import paystack from "../../assets/images/paystack.png";
import Providus from "../../assets/images/Providus.png";
import { useSelector } from "react-redux";

const PaymentGateWay = ({ selectedGateWay, handleSelectGateWay }) => {
  const acceptedpayment = useSelector((state) => state.wallet.acceptedpayment);
  // const user = useSelector((state) => state.oauth.user);

  return (
    <div className="paymentGateWay text-left">
      <div className="paymentGateWayGrid text-center">
        {acceptedpayment
          ? acceptedpayment
              ?.filter((ite) => ite?.isAvailable === true)
              ?.map((item, index) => (
                <div className="paymentGateWayGridInner " key={index}>
                  {/* className={`paymentGateWayGridItem   ${
                      selectedGateWay?.id === item?.id ? "selectedGateway" : ""
                    }`} */}
                  <div className="paymentGateWayGridItem">
                    <div className="paymentGateWayGridItemImg">
                      {item?.name === "Paystack" && (
                        <img src={paystack} alt="grand-logo" />
                      )}
                      {item?.name === "Providus" && (
                        <img src={Providus} alt="grand-logo" />
                      )}
                    </div>

                    <div className="paymentGateWayGridItemContent">
                      {/* <h6>{item?.name}</h6> */}
                      <p>
                        {item?.name === "Providus"
                          ? "There is a ₦25 charge for a deposit using a debit card. Using a Providus account is free."
                          : "There is a ₦100 fee for this deposit method."}
                      </p>
                    </div>

                    {/* <h6>{item?.name}</h6> */}
                  </div>
                  <button
                    className="grandLottoButton "
                    onClick={() => handleSelectGateWay(item)}
                  >
                    Continue
                  </button>
                </div>
              ))
          : null}
      </div>
    </div>
  );
};

export default PaymentGateWay;
