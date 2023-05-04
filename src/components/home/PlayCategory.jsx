import React from "react";
import Lotto from "../../assets/images/lotto.png";
import pool from "../../assets/images/pool.png";
import Seven790 from "../../assets/images/790.png";
import { setComingSoonModal } from "../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlayCategory = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  return (
    <div className="playCategory">
      <p>Instant Play</p>
      <div className="playCategoryGrid">
        <div className="playCategoryItem" onClick={() => navigation("/lotto")}>
          <img src={Lotto} alt="grand-logo" />
          <div>
            <h5>Play Lotto</h5>
          </div>
          {/* <i className="bx bx-right-arrow-circle"></i> */}

          <div className="text-center mt-5">
            <button type="button" className="grandLottoButton">
              Play
            </button>
          </div>
        </div>
        <div
          className="playCategoryItem"
          onClick={() => {
            dispatch(setComingSoonModal(true));
          }}
        >
          <img src={pool} alt="grand-logo" />
          <div>
            <h5>Pool</h5>
          </div>
          {/* <i className="bx bx-right-arrow-circle"></i> */}

          <div className="text-center mt-5 ">
            <button type="button" className="grandLottoButton">
              Play
            </button>
          </div>
        </div>
        <div
          className="playCategoryItem"
          onClick={() => {
            dispatch(setComingSoonModal(true));
          }}
        >
          <img src={Seven790} alt="grand-logo" />
          <div>
            <h5>7/90</h5>
          </div>
          {/* <i className="bx bx-right-arrow-circle"></i> */}

          <div className="text-center mt-5">
            <button type="button" className="grandLottoButton">
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayCategory;
