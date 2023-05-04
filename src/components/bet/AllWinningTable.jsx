import React from "react";
// import { useSelector } from "react-redux";
import {
  formateDateAndTimeByName,
  addComma,
  formatAMPM,
  formateDateByName,
} from "../../global/customFunctions";
import ComponentLoading from "../blocks/ComponentLoading";
import PaginationBlock from "../blocks/PaginationBlock";

const AllWinningTable = ({
  columns,
  page,
  totalPages,
  data,
  type,
  nextP,
  PrevP,
  isLoading,
  fetchByPage,
  hasPagination = true,
  columnSpan = "6",
  noDataText = "No user found",
  onDelete,
}) => {
  const handlePrev = () => {
    PrevP(type);
  };

  const handleNext = () => {
    nextP(type);
  };

  const handleFetchByPage = (newPage) => {
    fetchByPage(type, newPage);
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
                    <td>{index < 10 ? "0" + (index + 1) : index}</td>

                    <td>{item?.email + " (" + item?.customerCode + ")"}</td>
                    <td>{item?.gamePlayed}</td>
                    <td>{item?.numberPlayed}</td>
                    <td>
                      ₦{" "}
                      {item?.ammountPlayed
                        ? addComma(item?.ammountPlayed)
                        : item?.ammountPlayed}
                    </td>
                    <td>
                      ₦{" "}
                      {item?.ammountWon
                        ? addComma(item?.ammountWon)
                        : item?.ammountWon}
                    </td>
                    <td>{formateDateAndTimeByName(item?.winningDate)}</td>
                    {/* <td>
                      <div
                        className="d-flex butnFlex "
                        style={{ columnGap: 10 }}
                      >
                        <i
                          className="bx bx-trash-alt deleteBtnn"
                          onClick={() => onDelete(item)}
                        ></i>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={columnSpan}>
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
                            {noDataText}
                          </h4>
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
                <small>{formateDateByName(item?.winningDate)}</small>
                <small>{formatAMPM(item?.winningDate)}</small>
              </div>
              <div className="grandlotto_table_small_flex_top">
                <div className="d-flex justify-content-between">
                  <h4 className="">
                    <b>Bet ID: {item?.gameTicket || item?.id}</b>
                  </h4>

                  <span className={`has_status`}>Won</span>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Game</h4>
                  <h4 className="">
                    <b>{item?.gamePlayed}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Details</h4>
                  <h4 className="">
                    <b>{item?.numberPlayed}</b>
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
                  <h4 className="">Winning</h4>
                  <h4 className="">
                    <b>
                      ₦{" "}
                      {item?.ammountWon
                        ? addComma(item?.ammountWon)
                        : item?.ammountWon}
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
                  {noDataText}
                </h4>
              </div>

              <br />
              <br />
              <br />
            </div>
          </div>
        )}
      </div>

      {data && data?.length && hasPagination ? (
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

export default AllWinningTable;
