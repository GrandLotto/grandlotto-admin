import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { addComma } from "../../global/customFunctions";
// import { setBetSlips } from "../../store/betSlice/betSlice";
import BetAmount from "./BetAmount";
import BetPlayButton from "./BetPlayButton";
import GameSummary from "./GameSummary";
import { setBetAmount } from "../../store/betSlice/betSlice";

const BetSlipsBox = ({
  showAmount = true,
  showInput = true,
  setselectedAmount,
  selectedAmount,
}) => {
  const dispatch = useDispatch();
  // const betSlips = useSelector((state) => state.bets.betSlips);
  // const selectedType = useSelector((state) => state.bets.selectedType);
  // const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  const betAmount = useSelector((state) => state.bets.betAmount);
  const calculatedGames = useSelector((state) => state.bets.calculatedGames);

  const stakeAmounts = [
    {
      id: 1,
      amount: 50,
    },
    {
      id: 2,
      amount: 100,
    },
    {
      id: 3,
      amount: 200,
    },
    {
      id: 3,
      amount: 500,
    },
  ];

  // const handleAmount = (value) => {
  //   let minAmmount = selectedType?.minAmmount;
  //   let maxAmmount = selectedType?.maxAmmount;
  //   let newValue = Number(value);
  //   if (newValue && newValue <= maxAmmount) {
  //     console.log(newValue);
  //     console.log(maxAmmount);
  //     setselectedAmount(newValue);
  //   } else {
  //     if (!newValue) {
  //       setselectedAmount(0);
  //     }
  //   }

  // };
  // const removeSlip = () => {
  //   dispatch(setBetSlips([]));
  //   setselectedAmount(0);
  // };

  // useEffect(() => {
  //   if (selectedType) {
  //     setselectedAmount(selectedType?.minAmmount);
  //   }
  // }, [selectedType]);

  return (
    <>
      {/* {betSlips && betSlips?.length ? (
        <div className="allBetSlips">
          {betSlips?.map((item, index) => (
            <div className="allBetSlipItem" key={index}>
              <div className="d-flex justify-content-between align-items-center allBetSlipItemHeader">
                <div className="d-flex align-items-center">
                  <div className="betStatus"></div>
                  <p>Ongoing</p>
                </div>
                <i className="bx bx-x" onClick={() => removeSlip()}></i>
              </div>

              <div className="allBetSlipItemBody">
                <div className="d-flex align-items-center allBetSlipItemBodyItem">
                  <h5>Game Name: </h5>
                  <h5>
                    <b>ROYAL A1</b>
                  </h5>
                </div>
                <div className="d-flex align-items-center allBetSlipItemBodyItem">
                  <h5>Lines: </h5>
                  <h5>
                    <b>10</b>
                  </h5>
                </div>
                <div className="d-flex align-items-center allBetSlipItemBodyItem">
                  <h5>Type: </h5>
                  <h5>
                    <b>PERM 2</b>
                  </h5>
                </div>
                <div className="d-flex align-items-center allBetSlipItemBodyItem">
                  <h5>Stakes: </h5>
                  <h5>
                    <b>69,9,26,19,36</b>
                  </h5>
                </div>
                <div className="d-flex align-items-center allBetSlipItemBodyItem">
                  <h5>Amount per line: </h5>
                  <h5>
                    <b>₦0</b>
                  </h5>
                </div>
                {showAmount === true && (
                  <div className="allBetSlipItemBodyItemButtons">
                    {stakeAmounts?.map((item, index) => (
                      <div
                        key={index}
                        className={`allBetSlipItemBodyItemButtonsItems ${
                          selectedAmount === item?.amount
                            ? "buttonSelected"
                            : ""
                        }`}
                        onClick={() => setselectedAmount(item?.amount)}
                      >
                        {item?.amount}
                      </div>
                    ))}
                  </div>
                )}

                {showInput === true && (
                  <div className="allBetSlipItemBodyItemAmount">
                    <div className={`symbolInput`}>
                      <span>₦</span>
                      <CurrencyInput
                        name="input-name"
                        placeholder="Enter Amount "
                        defaultValue={selectedAmount}
                        decimalsLimit={2}
                        contentEditable={true}
                        value={selectedAmount}
                        onValueChange={(value) => setselectedAmount(value)}
                      />
                    </div>
                  </div>
                )}
                {showInput === false && (
                  <div
                    className="d-flex justify-content-end align-items-end mt-3 border-top pt-3"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="d-flex justify-content-end align-items-end">
                      <h5>Stake Amount: </h5>
                      <h5>
                        <b>₦500</b>
                      </h5>
                    </div>
                    <div className="d-flex justify-content-end align-items-end">
                      <h5>Possible Winning: </h5>
                      <h5>
                        <b>₦10,000</b>
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="noBetSlip">
          <p>Your betslip is empty</p>

          {showInput === false && (
            <div
              className="mt-4 text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="grandLottoButton"
                onClick={() => navigation("/lotto")}
              >
                Play Game
              </button>
            </div>
          )}
        </div>
      )} */}

      <div className="allBetSlipItem pt-1">
        <div className="allBetSlipItemBody mt-0">
          <div className="allBetSlipItemBodyItemButtons mt-3">
            {stakeAmounts?.map((item, index) => (
              <div
                key={index}
                className={`allBetSlipItemBodyItemButtonsItems ${
                  betAmount === item?.amount ? "buttonSelected" : ""
                }`}
                onClick={() => dispatch(setBetAmount(item?.amount))}
              >
                {item?.amount}
              </div>
            ))}
          </div>

          {showInput === true && (
            <div className="allBetSlipItemBodyItemAmount">
              {/* <div className={`symbolInput`}>
                <span>₦</span>
                <CurrencyInput
                  name="input-name"
                  placeholder="Enter Amount "
                  defaultValue={betAmount}
                  decimalsLimit={2}
                  contentEditable={true}
                  value={betAmount}
                  onValueChange={(value) => handleAmount(value)}
                />
              </div> */}

              <BetAmount />
            </div>
          )}

          {calculatedGames && <GameSummary calculatedGames={calculatedGames} />}
          {showInput === true && (
            <div
              className="d-flex justify-content-end align-items-start mt-3 border-top pt-3"
              style={{ flexDirection: "column" }}
            >
              <div className="d-flex justify-content-end align-items-end mb-2">
                <h5>Total Stake: </h5>
                <h5>
                  <b>
                    ₦
                    {calculatedGames && calculatedGames?.ammountTopay
                      ? addComma(calculatedGames?.ammountTopay)
                      : 0}
                  </b>
                </h5>
              </div>
              <div className="d-flex justify-content-end align-items-end">
                <h5>Possible Win: </h5>
                <h5>
                  <b>
                    ₦
                    {calculatedGames && calculatedGames?.maximumWiningAmount
                      ? addComma(calculatedGames?.maximumWiningAmount)
                      : 0}
                  </b>
                </h5>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center align-items-center mt-4">
            <BetPlayButton betAmount={betAmount} />
            {/* <button
              type="button"
              className="grandLottoButton cardButton"
              disabled={!betAmount || betAmount < 100}
            >
              Place Bet
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BetSlipsBox;
