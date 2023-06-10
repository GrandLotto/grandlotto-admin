/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_REPORT_BY_GAME_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";

import {
  setAlertPopUp,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";
import { sumArryOfObjects } from "../../global/customFunctions";
import AllSalesByGame from "../../components/bet/AllSalesByGame";

const AdminSalesByGame = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [previewGame, setPreviewGame] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // console.log("validatedGames", validatedGames);

  const columns = [
    {
      name: "#",
    },

    {
      name: "Games Name",
    },

    {
      name: "Draw Date",
    },
    {
      name: "Draw Time",
    },
    {
      name: "No of games",
    },
    {
      name: "Stake Amount",
    },
    {
      name: "Winning Amount",
    },
  ];

  const fetchMore = (type, url, payload) => {
    setIsLoading(true);

    // console.log(payload);

    handlePOSTRequest(url, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;
          setPreviewGame(requestData);
        } else {
          setPreviewGame([]);

          dispatch(
            setAlertSmallPOPUP({
              status: false,
              message: response?.data?.message,
            })
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setPreviewGame([]);
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        // console.log(error);
      });
  };

  const handleFilter = () => {
    const payload = {
      startTime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };

    // console.log("handleFilter", payload);
    let url = GET_REPORT_BY_GAME_URL;

    fetchMore("", url, payload);
  };

  // useEffect(() => {
  //   if (selectedGame && allValidatedGameResults && hasChanged === false) {
  //     let oneSelected = validatedGames?.find(
  //       (item) => item?.gameId === Number(selectedGame)
  //     );
  //     // console.log("oneSelected", oneSelected);
  //     if (oneSelected) {
  //       setPreviewGame(oneSelected);
  //     }
  //   }
  // }, [selectedGame, allValidatedGameResults, hasChanged]);

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">{"Games > Sales By Game"}</h5>
          </div>

          <form
            className="mt-5 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (endDate && startDate) {
                handleFilter();
              }
            }}
          >
            <div className="row ">
              <div className="col-md-3">
                <div className="form-group mb-4">
                  <label htmlFor="">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      if (e.target.value) {
                        setStartDate(e.target.value);
                      }
                    }}
                    value={startDate}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group mb-4">
                  <label htmlFor="">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      if (e.target.value) {
                        setEndDate(e.target.value);
                      }
                    }}
                    value={endDate}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mt-4"></div>

                <button type="submit" className="grandLottoButton">
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5 w_inner">
            {previewGame && previewGame?.length ? (
              <div className="totalityGrid">
                <div className="totalityItems">
                  <p>Total no of Games</p>
                  <h5>{sumArryOfObjects(previewGame, "totalPlayed")}</h5>
                </div>
                <div className="totalityItems">
                  <p>Total Stakes</p>
                  <h5>
                    ₦ {sumArryOfObjects(previewGame, "totalAmountPlayed")}
                  </h5>
                </div>
                <div className="totalityItems">
                  <p>Total Winnings</p>
                  <h5>₦ {sumArryOfObjects(previewGame, "totalAmountWon")}</h5>
                </div>
              </div>
            ) : null}

            <div className="card mb-4">
              <AllSalesByGame
                columns={columns}
                data={previewGame}
                page={1}
                totalPages={2}
                type="ADMIN"
                isLoading={isLoading}
                hasPagination={false}
                nextP={() => {}}
                PrevP={() => {}}
                fetchByPage={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                columnSpan={10}
                noDataText="No record"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSalesByGame;
