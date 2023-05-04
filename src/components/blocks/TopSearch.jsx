import React, { useEffect, useState } from "react";
import { GET_GAMES_BY_TICKETID_URL } from "../../config/urlConfigs";
import { handleGETRequest } from "../../rest/apiRest";
import { setSearchCouponCodeModal } from "../../store/alert/alertSlice";
import { useDispatch } from "react-redux";

const TopSearch = () => {
  const dispatch = useDispatch();

  const [ticketID, setTicketID] = useState("");
  const [responseError, setResponseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkWinning = () => {
    if (!ticketID) {
      return;
    }

    if (isLoading) {
      return;
    }

    setResponseError("");
    setIsLoading(true);

    let URL = GET_GAMES_BY_TICKETID_URL;

    // console.log(URL);

    handleGETRequest(URL + `?TicketId=${ticketID}`)
      .then((response) => {
        setIsLoading(false);

        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setSearchCouponCodeModal({
              status: true,
              type: "",
              payload: response?.data?.data,
            })
          );
          setTicketID("");
        } else {
          setResponseError(response?.data?.message);
          setTicketID("");
        }
      })
      .catch((error) => {
        setResponseError("An error occurred, please try again");
        setTicketID("");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (responseError) {
      setTimeout(() => {
        setResponseError("");
      }, 4000);
    }
  }, [responseError]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkWinning();
        }}
        className="headerTopMiddleSearch"
      >
        <input
          onChange={(e) => setTicketID(e.target.value)}
          value={ticketID}
          type="text"
          placeholder="Search for ticket"
        />
        <span className="searchIconn" onClick={() => checkWinning()}>
          {isLoading ? (
            <i className={`fa fa-refresh font-weight-bold fa-spin`}></i>
          ) : (
            <i className="bx bx-search"></i>
          )}
        </span>
      </form>

      {responseError ? (
        <div className=" text-left" style={{ marginTop: 0, marginLeft: 10 }}>
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
            <span className="ml-2">{responseError}</span>
          </p>
        </div>
      ) : null}
    </>
  );
};

export default TopSearch;
