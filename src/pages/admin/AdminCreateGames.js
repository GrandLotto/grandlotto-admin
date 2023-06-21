import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmModal,
  setCreateGameModal,
} from "../../store/alert/alertSlice";
import GameTable from "../../components/bet/GameTable";

const AdminCreateGames = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.bets.allgames);

  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Name",
    },
    {
      name: "Day Available",
    },
    {
      name: "Status",
    },

    {
      name: "Available",
    },

    {
      name: "Game group",
    },
    {
      name: "Start",
    },
    {
      name: "End",
    },

    {
      name: "Period",
    },

    // {
    //   name: "Duration",
    // },

    // {
    //   name: "Frequency",
    // },

    {
      name: "Action",
    },
  ];

  const handleEdit = (item) => {
    // console.log(item);
    dispatch(
      setCreateGameModal({
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
        type: "DELETE_GAME",
        title: "Delete Game",
        desc: "Are you sure you want to proceed?",
        hasMesage: false,
        payload: item,
        buttonText: "Delete",
      })
    );
  };

  useEffect(() => {
    if (games) {
      // console.log(games);
      setData(games);
    }
  }, [games]);

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
          <h5 className="site_title">{"Games > Create game"}</h5>
        </div>
        <div className="d-flex justify-content-end paddRightSmall">
          <div
            className="d-flex align-items-center mb-4"
            style={{ columnGap: 10 }}
          >
            <button
              onClick={() =>
                dispatch(
                  setCreateGameModal({
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
            <GameTable
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
              noDataText="No game created"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateGames;
