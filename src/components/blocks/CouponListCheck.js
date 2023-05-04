import React from "react";
import {
  addComma,
  formatAMPM,
  formateDateByName,
} from "../../global/customFunctions";

const CouponListCheck = ({ item }) => {
  return (
    <div className="row mt-5 grandlotto_table_small_row">
      <div className="col-md-12 mx-auto">
        <div className="grandlotto_table_small_flex ">
          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
            <small>{formateDateByName(item?.datePlayed)}</small>
            <small>{formatAMPM(item?.datePlayed)}</small>
          </div>
          <div className="grandlotto_table_small_flex_top">
            <div className="d-flex justify-content-between">
              <h5 className="">
                <b>Ticket ID: {item?.gameTicket || item?.id}</b>
              </h5>
              {item?.status?.toLowerCase() === "pending" && (
                <span
                  className={`has_status ${[
                    item?.status?.toLowerCase() === "pending"
                      ? "isPending"
                      : "",
                  ]}`}
                >
                  {item?.status}
                </span>
              )}

              {item?.status?.toLowerCase() === "lost" && (
                <span className={`has_status isLost}`}>{item?.status}</span>
              )}
              {item?.status?.toLowerCase() === "won" && (
                <span className="has_status">{item?.status}</span>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <h5 className="">Game</h5>
              <h5 className="">
                <b>{item?.gameName}</b>
              </h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5 className="">Details</h5>
              <h5 className="">
                <b>
                  {item?.gameTypeName}: {item?.numbersplayed}
                </b>
              </h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5 className="">Stake</h5>
              <h5 className="">
                <b>
                  ₦{" "}
                  {item?.ammountPlayed
                    ? addComma(item?.ammountPlayed)
                    : item?.ammountPlayed}
                </b>
              </h5>
            </div>
            {(item?.status?.toLowerCase() === "lost" ||
              item?.status?.toLowerCase() === "won") && (
              <div className="d-flex justify-content-between">
                <h5 className="">Winning</h5>

                <h5 className="">
                  <b>
                    ₦{" "}
                    {item?.status?.toLowerCase() === "won"
                      ? item?.potentialwinningAmount
                        ? addComma(item?.potentialwinningAmount)
                        : item?.potentialwinningAmount
                      : 0}
                  </b>
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponListCheck;
