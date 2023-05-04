import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import GameTypeTable from "../../components/bet/GameTypeTable";
import {
  setConfirmModal,
  setCreategameTypeModal,
} from "../../store/alert/alertSlice";

const AdminCreateGametypes = () => {
  const dispatch = useDispatch();
  const gameTypes = useSelector((state) => state.bets.gameTypes);

  const [data, setData] = useState([]);

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

  useEffect(() => {
    if (gameTypes) {
      // console.log(gameTypes);
      setData(gameTypes);
    }
  }, [gameTypes]);

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
        <div className="d-flex justify-content-end paddRightSmall">
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
        </div>

        <div className="mt-5 w_inner">
          <div className="card mb-4">
            <GameTypeTable
              columns={columns}
              data={data}
              page={1}
              totalPages={2}
              type="ADMIN"
              isLoading={false}
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
