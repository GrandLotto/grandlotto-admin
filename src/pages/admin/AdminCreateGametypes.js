/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import GameTypeTable from "../../components/bet/GameTypeTable";
import {
  setAlertPopUp,
  setConfirmModal,
  setCreategameTypeModal,
} from "../../store/alert/alertSlice";
import { GET_GAMES_TYPES_URL } from "../../config/urlConfigs";
import { handleGETRequest } from "../../rest/apiRest";

const AdminCreateGametypes = () => {
  const dispatch = useDispatch();
  const gamesgroup = useSelector((state) => state.bets.gamesgroup);
  const gameTypes = useSelector((state) => state.bets.gameTypes);

  const [data, setData] = useState([]);
  const [selectedGame, setSelectedGame] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      name: "Type",
    },
    {
      name: "Min",
    },
    {
      name: "Max",
    },

    {
      name: "Created on",
    },
    {
      name: "Credit Line",
    },
    {
      name: "Max Number Count",
    },

    {
      name: "Action",
    },
  ];

  const handleEdit = (item) => {
    // console.log(item);
    dispatch(
      setCreategameTypeModal({
        status: true,
        type: "EDIT",
        payload: item,
      })
    );
  };

  const handleDelete = (item) => {
    // console.log(item);
    dispatch(
      setConfirmModal({
        status: true,
        type: "DELETE_GAME_TYPE",
        title: "Delete Gametype",
        desc: "Are you sure you want to proceed?",
        hasMesage: false,
        payload: item,
        buttonText: "Delete",
      })
    );
  };

  const fetchMore = (url) => {
    setIsLoading(true);

    // console.log(payload);

    handleGETRequest(url)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;
          setData(requestData);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setData([]);
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
    let url = GET_GAMES_TYPES_URL + `?gameGroupId=${selectedGame}`;

    fetchMore(url);
  };

  useEffect(() => {
    if (gameTypes) {
      // console.log(gameTypes);
      handleFilter();
      // setData(gameTypes);
    }
  }, [gameTypes]);

  useEffect(() => {
    if (selectedGame) {
      handleFilter();
    }
  }, [selectedGame]);

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="pages">
      <div className="pages_mobile_dark">
        <div className="d-flex justify-content-between pages_header">
          <h5 className="site_title">{"Games > Create game types"}</h5>
        </div>
        {/* <div className="d-flex justify-content-end paddRightSmall">
          <div
            className="d-flex align-items-center mb-4"
            style={{ columnGap: 10 }}
          >
            <button
              onClick={() =>
                dispatch(
                  setCreategameTypeModal({
                    status: true,
                    type: "ADD",
                    payload: null,
                  })
                )
              }
              className="grandLottoButton filterButton"
            >
              Create
            </button>
          </div>
        </div> */}

        <div className="row mt-5">
          <div className="col-md-3">
            <div className="form-group" style={{ width: "100%" }}>
              <select
                style={{ width: "100%" }}
                className="form-control hasCapitalized"
                onChange={(e) => {
                  if (e.target.value) {
                    // if (selectedGame === e.target.value) {
                    //   return;
                    // }
                    setSelectedGame(e.target.value);
                  }
                }}
                value={selectedGame}
              >
                <option value="" disabled>
                  Select game group
                </option>
                {gamesgroup && gamesgroup?.length ? (
                  <option value={1}>All</option>
                ) : null}

                {gamesgroup &&
                  gamesgroup
                    ?.filter((oldItem) => oldItem?.code === "310")
                    ?.map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.name}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 w_inner">
          <div className="card mb-4">
            <GameTypeTable
              columns={columns}
              data={data}
              page={1}
              totalPages={2}
              type="ADMIN"
              isLoading={isLoading}
              hasPagination={false}
              nextP={() => {}}
              PrevP={() => {}}
              fetchByPage={() => {}}
              onEdit={handleEdit}
              onDelete={handleDelete}
              columnSpan={10}
              noDataText="No game type"
            />
          </div>

          {/* <div className="card mb-4">
            <div className="grandlotto_card">
              <form className="grandlotto_form mt-4">
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Type</label>
                      <input
                        className="form-control largeInputFont py-3"
                        placeholder="Game type"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Min Amount</label>
                      <div className={`symbolInput`}>
                        <span>₦</span>
                        <CurrencyInput
                          name="input-name"
                          placeholder="Enter Amount "
                          defaultValue={amount}
                          decimalsLimit={2}
                          onValueChange={(value) => setAmount(value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Max Amount</label>
                      <div className={`symbolInput`}>
                        <span>₦</span>
                        <CurrencyInput
                          name="input-name"
                          placeholder="Enter Amount "
                          defaultValue={amount}
                          decimalsLimit={2}
                          onValueChange={(value) => setAmount(value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Credit Line</label>
                      <input
                        className="form-control largeInputFont py-3"
                        placeholder="Credit Line"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Max Number count</label>
                      <input
                        className="form-control largeInputFont py-3"
                        placeholder="Max Number count"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-right mb-3">
                  <div className="text-right">
                    <button
                      disabled={emptyFields}
                      type="button"
                      className="grandLottoButton cardButton"
                      onClick={() => proceed()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateGametypes;
