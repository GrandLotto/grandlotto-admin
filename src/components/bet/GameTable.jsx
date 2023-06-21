import React from "react";
// import { useNavigate } from "react-router-dom";
import { formateDateAndTimeByName } from "../../global/customFunctions";
import ComponentLoading from "../blocks/ComponentLoading";
import PaginationBlock from "../blocks/PaginationBlock";
import { useSelector } from "react-redux";
import TableLoading2 from "../blocks/TableLoading2";

const GameTable = ({
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
  noDataText = "No data found",
  onEdit,
  onDelete,
}) => {
  const gamesgroup = useSelector((state) => state.bets.gamesgroup);
  // const navigation = useNavigate();
  const handlePrev = () => {
    if (type === "WITHDRAWAL") {
      PrevP(type);

      return;
    }
  };

  const handleNext = () => {
    if (type === "WITHDRAWAL") {
      nextP(type);

      return;
    }

    if (type === "DEPOSIT") {
      nextP(type);

      return;
    }
  };

  const handleFetchByPage = (newPage) => {
    if (type === "WITHDRAWAL") {
      fetchByPage(type, newPage);

      return;
    }

    if (type === "DEPOSIT") {
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
                    <td>{item?.name}</td>
                    <td>{item?.dayAvailable}</td>

                    <td>
                      {/* {item?.status?.toLowerCase() === "open" && (
                        <span className={`has_status isPending`}>
                          {item?.status}
                        </span>
                      )} */}
                      {item?.status?.toLowerCase() === "closed" && (
                        <span className={`has_status isCancled`}>
                          {item?.status}
                        </span>
                      )}

                      {!["open", "closed", "lost"].includes(
                        item?.status?.toLowerCase()
                      ) && (
                        <span className="has_status isPending">
                          {item?.status || "Null"}
                        </span>
                      )}
                      {["open"].includes(item?.status?.toLowerCase()) && (
                        <span className="has_status">
                          {item?.status || "Null"}
                        </span>
                      )}
                    </td>
                    <td>{item?.isAvailableToplay ? "Yes" : "No"}</td>
                    <td>
                      {gamesgroup?.find(
                        (newItem) => newItem?.id === item?.gameGroupId
                      )?.name || ""}
                    </td>

                    {/* <td>{item?.accountNumber}</td> */}
                    <td>{formateDateAndTimeByName(item?.startTime)}</td>
                    <td>{formateDateAndTimeByName(item?.endTime)}</td>
                    <td>{item?.period}</td>
                    {/* <td>{item?.duration} mins</td>
                    <td>{item?.frequency}</td> */}

                    <td>
                      <div
                        className="d-flex butnFlex "
                        style={{ columnGap: 10 }}
                      >
                        <i
                          className="bx bx-pencil editBtnn"
                          onClick={() => onEdit(item)}
                        ></i>
                        <i
                          className="bx bx-trash-alt deleteBtnn"
                          onClick={() => onDelete(item)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : data === null ? (
              <TableLoading2 columnSpan={columnSpan} />
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

      <div className="grandlotto_table_small">
        {data && data?.length ? (
          data?.map((item, index) => (
            <div className="grandlotto_table_small_flex " key={index}>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                {/* <small>{formateDateAndTimeByName(item?.createdOn)}</small> */}
              </div>
              <div className="grandlotto_table_small_flex_top">
                <div className="d-flex justify-content-between">
                  <h4 className="">Game</h4>
                  <h4 className="">
                    <b>{item?.name}</b>
                  </h4>
                </div>

                <div className="d-flex justify-content-between">
                  <h4 className="">Day Available</h4>
                  <h4 className="">
                    <b>{item?.dayAvailable}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Status</h4>
                  <h4 className="">
                    <b>
                      {item?.status?.toLowerCase() === "closed" && (
                        <span className={`has_status isCancled`}>
                          {item?.status}
                        </span>
                      )}

                      {!["open", "closed", "lost"].includes(
                        item?.status?.toLowerCase()
                      ) && (
                        <span className="has_status isPending">
                          {item?.status || "Null"}
                        </span>
                      )}
                      {["open"].includes(item?.status?.toLowerCase()) && (
                        <span className="has_status">
                          {item?.status || "Null"}
                        </span>
                      )}
                    </b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">is Available</h4>
                  <h4 className="">
                    <b>{item?.isAvailableToplay ? "Yes" : "No"}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Start</h4>
                  <h4 className="">
                    <b>{formateDateAndTimeByName(item?.startTime)}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">End</h4>
                  <h4 className="">
                    <b>{formateDateAndTimeByName(item?.endTime)}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="d-flex butnFlex " style={{ columnGap: 10 }}>
                    <i
                      className="bx bx-pencil editBtnn"
                      onClick={() => onEdit(item)}
                    ></i>
                    <i
                      className="bx bx-trash-alt deleteBtnn"
                      onClick={() => onDelete(item)}
                    ></i>
                  </div>
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

export default GameTable;
