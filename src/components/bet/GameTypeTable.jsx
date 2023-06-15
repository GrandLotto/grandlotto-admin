import React from "react";
// import { useNavigate } from "react-router-dom";
import {
  addComma,
  formateDateAndTimeByName,
} from "../../global/customFunctions";
import ComponentLoading from "../blocks/ComponentLoading";
import PaginationBlock from "../blocks/PaginationBlock";
import TableLoading2 from "../blocks/TableLoading2";

const GameTypeTable = ({
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
                    <td>{item?.type}</td>
                    <td>
                      ₦ {item?.minAmmount ? addComma(item?.minAmmount) : 0}
                    </td>
                    <td>
                      ₦ {item?.maxAmmount ? addComma(item?.maxAmmount) : 0}
                    </td>
                    {/* <td>{item?.accountNumber}</td> */}
                    <td>{formateDateAndTimeByName(item?.createdOn)}</td>
                    <td>{item?.creditLine}</td>
                    <td>{item?.maxNumbercount}</td>

                    <td>
                      <div
                        className="d-flex butnFlex "
                        style={{ columnGap: 10 }}
                      >
                        <i
                          className="bx bx-pencil editBtnn"
                          onClick={() => onEdit(item)}
                        ></i>
                        {/* <i
                          className="bx bx-trash-alt deleteBtnn"
                          onClick={() => onDelete(item)}
                        ></i> */}
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
                <small>{formateDateAndTimeByName(item?.createdOn)}</small>
              </div>
              <div className="grandlotto_table_small_flex_top">
                <div className="d-flex justify-content-between">
                  <h4 className="">Game Type</h4>
                  <h4 className="">
                    <b>{item?.type}</b>
                  </h4>
                </div>

                <div className="d-flex justify-content-between">
                  <h4 className="">Min</h4>
                  <h4 className="">
                    <b>
                      ₦{" "}
                      {item?.minAmmount
                        ? addComma(item?.minAmmount)
                        : item?.minAmmount}
                    </b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Max</h4>
                  <h4 className="">
                    <b>
                      ₦{" "}
                      {item?.maxAmmount
                        ? addComma(item?.maxAmmount)
                        : item?.maxAmmount}
                    </b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Credit Line</h4>
                  <h4 className="">
                    <b>{item?.creditLine}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Credit Line</h4>
                  <h4 className="">
                    <b>{item?.maxNumbercount}</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="d-flex butnFlex " style={{ columnGap: 10 }}>
                    <i
                      className="bx bx-pencil editBtnn"
                      onClick={() => onEdit(item)}
                    ></i>
                    {/* <i
                      className="bx bx-trash-alt deleteBtnn"
                      onClick={() => onDelete(item)}
                    ></i> */}
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

export default GameTypeTable;
