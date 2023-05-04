import React from "react";
import { addComma } from "../../global/customFunctions";
import { useSelector } from "react-redux";

const GameSummary = ({ calculatedGames }) => {
  const betAmount = useSelector((state) => state.bets.betAmount);

  return (
    <div className="allBetSlipItem p-0">
      <div className="allBetSlipItemBody">
        <div className="d-flex align-items-center justify-content-between allBetSlipItemBodyItem">
          <h5>Game: </h5>
          <h5>
            <b>{calculatedGames?.gameName}</b>
          </h5>
        </div>

        <div className="d-flex align-items-center justify-content-between allBetSlipItemBodyItem">
          <h5>Type: </h5>
          <h5>
            <b>{calculatedGames?.gametype}</b>
          </h5>
        </div>
        <div className="d-flex align-items-center justify-content-between allBetSlipItemBodyItem">
          <h5>Numbers: </h5>
          <h5>
            <b>{calculatedGames?.numbersPlay}</b>
          </h5>
        </div>

        {!["PERM2", "PERM3", "PERM4", "PERM5"].includes(
          calculatedGames?.gametype
        ) && (
          <div className="d-flex align-items-center justify-content-between allBetSlipItemBodyItem">
            <h5>Stake: </h5>
            <h5>
              <b>
                {calculatedGames?.ammountTopay
                  ? addComma(calculatedGames?.ammountTopay)
                  : 0}
              </b>
            </h5>
          </div>
        )}

        {["PERM2", "PERM3", "PERM4", "PERM5"].includes(
          calculatedGames?.gametype
        ) && (
          <div className="d-flex align-items-center justify-content-between allBetSlipItemBodyItem">
            <h5>Amount per line: </h5>
            <h5>
              <b>₦{betAmount ? addComma(betAmount) : 0} </b>
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSummary;
