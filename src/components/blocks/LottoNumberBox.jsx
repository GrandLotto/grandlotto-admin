import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBetAmount,
  setCalculatedGames,
  setSelectedCoupons,
} from "../../store/betSlice/betSlice";

const LottoNumberBox = () => {
  const dispatch = useDispatch();
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  // const selectedType = useSelector((state) => state.bets.selectedType);

  const clearallCoupons = () => {
    dispatch(setSelectedCoupons([]));
    dispatch(setCalculatedGames(null));
    dispatch(setBetAmount(0));
  };

  return (
    <div className="threeColRightSelectedPicks">
      {selectedCoupons && selectedCoupons?.length ? (
        <div className="d-flex justify-content-between align-items-start">
          <div className="threeColRightSelectedPicksBoxes">
            {selectedCoupons?.map((item, index) => (
              <div
                key={index}
                className={`threeColRightSelectedPicksBox boxSelected`}
              >
                {item}
              </div>
            ))}
          </div>
          <i className="bx bx-trash" onClick={() => clearallCoupons()}></i>
        </div>
      ) : (
        <div className="d-block selectLottoNumb text-center">
          <p>Select numbers</p>
        </div>
      )}

      {/* <div
            className={`threeColRightSelectedPicksBox ${
              selectedCoupons?.[0] ? "boxSelected" : ""
            }`}
          >
            {selectedCoupons?.[0]}
          </div> */}
      {/* {selectedType && selectedType?.maxNumbercount >= 2 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[1] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[1]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 3 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[2] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[2]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 4 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[3] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[3]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 5 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[4] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[4]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 6 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[5] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[5]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 7 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[6] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[6]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 8 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[7] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[7]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 9 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[8] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[8]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 10 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[9] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[9]}
            </div>
          )}
          {selectedType && selectedType?.maxNumbercount >= 11 && (
            <div
              className={`threeColRightSelectedPicksBox ${
                selectedCoupons?.[10] ? "boxSelected" : ""
              }`}
            >
              {selectedCoupons?.[10]}
            </div>
          )} */}
      {/* {selectedType && selectedType?.maxNumbercount >= 2 && ()} */}
    </div>
  );
};

export default LottoNumberBox;
