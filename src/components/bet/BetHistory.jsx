import React from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  formateDateAndTimeByName,
  addComma,
  formatAMPM,
  formateDateByName,
} from "../../global/customFunctions";
import ComponentLoading from "../blocks/ComponentLoading";
import PaginationBlock from "../blocks/PaginationBlock";

const BetHistory = ({
  columns,
  page,
  totalPages,
  data,
  type,
  nextP,
  PrevP,
  isLoading,
  fetchByPage,
}) => {
  const navigation = useNavigate();
  const handlePrev = () => {
    if (type === "OPENBETS") {
      PrevP(type);

      return;
    }
  };

  const handleNext = () => {
    if (type === "OPENBETS") {
      nextP(type);

      return;
    }

    if (type === "CLOSEBETS") {
      nextP(type);

      return;
    }
  };

  const handleFetchByPage = (newPage) => {
    if (type === "OPENBETS") {
      fetchByPage(type, newPage);

      return;
    }

    if (type === "CLOSEBETS") {
      fetchByPage(type, newPage);

      return;
    }
  };

  return (
    <>
      {isLoading && <ComponentLoading inner={true} title="Please wait ..." />}
      <div className="grandlotto_table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {columns &&
                  columns?.map((head, index) => (
                    <th key={index}>{head?.name}</th>
                  ))}
              </tr>
            </thead>

            {data && data?.length ? (
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {/* <td>{index < 10 ? "0" + (index + 1) : index}</td> */}
                    <td>{item?.gameTicket || item?.id}</td>
                    <td>{item?.numbersplayed}</td>
                    <td>{item?.gameName}</td>
                    <td>{item?.gameTypeName}</td>
                    <td>
                      ₦{" "}
                      {item?.ammountPlayed
                        ? addComma(item?.ammountPlayed)
                        : item?.ammountPlayed}
                    </td>
                    <td>{formateDateAndTimeByName(item?.datePlayed)}</td>
                    <td>
                      {["pending", "processing"].includes(
                        item?.status?.toLowerCase()
                      ) && (
                        <span className="has_status isPending">
                          {item?.status || "none"}
                        </span>
                      )}
                      {["lost"].includes(item?.status?.toLowerCase()) && (
                        <span className="has_status isLost">
                          {item?.status || "none"}
                        </span>
                      )}

                      {["success", "won"].includes(
                        item?.status?.toLowerCase()
                      ) && (
                        <span className="has_status ">
                          {item?.status || "none"}
                        </span>
                      )}
                      {[null].includes(item?.status) && (
                        <span className="has_status isPending">
                          {item?.status || "Processing"}
                        </span>
                      )}
                    </td>
                    <td>
                      ₦{" "}
                      {item?.potentialwinningAmount
                        ? addComma(item?.potentialwinningAmount)
                        : item?.potentialwinningAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="9">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="no_data_div">
                        <br />
                        <br />
                        <br />
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ flexDirection: "column" }}
                        >
                          <h4
                            className="mb-4"
                            style={{ fontSize: "18px", fontWeight: 500 }}
                          >
                            {type === "ADMIN"
                              ? "No bet records"
                              : "You don’t have any bet records"}
                          </h4>
                          {type !== "ADMIN" && (
                            <button
                              onClick={() => navigation("/lotto")}
                              className="grandLottoButton"
                            >
                              Play Game
                            </button>
                          )}
                        </div>

                        <br />
                        <br />
                        <br />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      <div className="grandlotto_table_small lotto_card">
        {isLoading && <ComponentLoading title="Please wait ..." />}
        {data && data?.length ? (
          data?.map((item, index) => (
            <div className="grandlotto_table_small_flex " key={index}>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <small>{formateDateByName(item?.datePlayed)}</small>
                <small>{formatAMPM(item?.datePlayed)}</small>
              </div>
              <div className="grandlotto_table_small_flex_top">
                <div className="d-flex justify-content-between">
                  <h4 className="">
                    <b>Bet ID: {item?.gameTicket || item?.id}</b>
                  </h4>
                  {["pending", "processing"].includes(
                    item?.status?.toLowerCase()
                  ) && (
                    <span className="has_status isPending">
                      {item?.status || "none"}
                    </span>
                  )}
                  {["lost"].includes(item?.status?.toLowerCase()) && (
                    <span className="has_status isLost">
                      {item?.status || "none"}
                    </span>
                  )}

                  {["success", "won"].includes(item?.status?.toLowerCase()) && (
                    <span className="has_status ">
                      {item?.status || "none"}
                    </span>
                  )}
                  {[null].includes(item?.status) && (
                    <span className="has_status isPending">
                      {item?.status || "Processing"}
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Game</h4>
                  <h4 className="">
                    <b>{item?.gameName}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Details</h4>
                  <h4 className="">
                    <b>
                      {item?.gameTypeName}: {item?.numbersplayed}
                    </b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Stake</h4>
                  <h4 className="">
                    <b>
                      ₦{" "}
                      {item?.ammountPlayed
                        ? addComma(item?.ammountPlayed)
                        : item?.ammountPlayed}
                    </b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Pot. Winning</h4>
                  <h4 className="">
                    <b>
                      ₦{" "}
                      {item?.potentialwinningAmount
                        ? addComma(item?.potentialwinningAmount)
                        : item?.potentialwinningAmount}
                    </b>
                  </h4>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="no_data_div">
              <br />
              <br />
              <br />
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <h4
                  className="mb-4"
                  style={{ fontSize: "18px", fontWeight: 500 }}
                >
                  {type === "ADMIN"
                    ? "No bet records"
                    : "You don’t have any bet records"}
                </h4>

                {type !== "ADMIN" && (
                  <button
                    onClick={() => navigation("/lotto")}
                    className="grandLottoButton"
                  >
                    Play Game
                  </button>
                )}
              </div>

              <br />
              <br />
              <br />
            </div>
          </div>
        )}
      </div>

      {data && data?.length ? (
        <PaginationBlock
          handlePrev={handlePrev}
          handleNext={handleNext}
          page={page}
          totalPages={totalPages}
          handleFetchByPage={handleFetchByPage}
        />
      ) : null}
    </>
  );
};

export default BetHistory;
