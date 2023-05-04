/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import {
  setBetAmount,
  setCalculatedGames,
} from "../../store/betSlice/betSlice";
import { handlePOSTRequest } from "../../rest/apiRest";
import { CALCULATE_WINNING_URL } from "../../config/urlConfigs";

const BetAmount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const betAmount = useSelector((state) => state.bets.betAmount);
  const selectedType = useSelector((state) => state.bets.selectedType);
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  const selectedGame = useSelector((state) => state.bets.selectedGame);
  const selectedPlayingType = useSelector(
    (state) => state.bets.selectedPlayingType
  );
  const gamePlayingTypes = useSelector((state) => state.bets.gamePlayingTypes);
  // const calculatedGames = useSelector((state) => state.bets.calculatedGames);

  const [calculatedgameErrorMes, setcalculatedgameErrorMes] = useState("");

  const handleAmount = (value) => {
    // let minAmmount = selectedType?.minAmmount;
    let maxAmmount = selectedType?.maxAmmount;
    let newValue = Number(value);

    if (maxAmmount !== 0) {
      if (newValue && newValue <= maxAmmount) {
        dispatch(setBetAmount(newValue));
        handleCalculateGame(newValue);
      } else {
        if (!newValue) {
          dispatch(setBetAmount(0));
          handleCalculateGame(0);
        }
      }
    } else {
      dispatch(setBetAmount(newValue));
      handleCalculateGame(newValue);
    }

    dispatch(setCalculatedGames(null));

    // console.log(typeof newValue);
    // console.log(typeof minAmmount);
    // console.log(maxAmmount);
    // if (newValue < maxAmmount) {
    //   setselectedAmount(value);

    //   console.log(true);
    // }

    // // console.log(value);
    // console.log(selectedType);
  };

  const handleCalculateGame = (amount) => {
    // setIsCalculatingGames(true);
    // setIsDisabled(true);

    const payload = {
      email: user?.email,
      gameId: selectedGame?.id,
      gametypeId: selectedType?.id,
      gameType: selectedType?.type,
      numbersPlay: String(selectedCoupons),
      ammount: Number(amount),
      playingTypeId: gamePlayingTypes?.find(
        (item) =>
          item?.name.toLowerCase() === selectedPlayingType?.toLowerCase()
      )?.id,
    };

    dispatch(setCalculatedGames(null));
    setcalculatedgameErrorMes("");
    // console.log(payload);

    if (amount < 50) {
      dispatch(setCalculatedGames(null));

      return;
    }

    if (selectedCoupons?.length && selectedType) {
      handlePOSTRequest(CALCULATE_WINNING_URL, payload)
        .then((response) => {
          // setIsCalculatingGames(false);
          // setIsDisabled(false);

          // console.log(response);
          if (response?.data?.success) {
            let requestData = response?.data?.data;
            // console.log(requestData);
            dispatch(setCalculatedGames(requestData));
            setcalculatedgameErrorMes("");
          } else {
            setcalculatedgameErrorMes(response?.data?.message);
            // dispatch(
            //   setAlertBetModal({
            //     status: true,
            //     type: "ERROR",
            //     title: response?.data?.message,
            //     betId: "",
            //     amountStake: 0,
            //     amountWinning: 0,
            //     payload: null,
            //     buttonText: "Deposit Funds",
            //     buttonURL: "DEPOSIT",
            //   })
            // );
          }
        })
        .catch((error) => {
          // setIsCalculatingGames(false);
          // setIsDisabled(false);
          // console.log(error);
          setcalculatedgameErrorMes("");
        });
    }
  };

  useEffect(() => {
    if (betAmount !== 0) {
      if (selectedCoupons?.length && selectedType) {
        handleCalculateGame(betAmount);
      }
    }
  }, [betAmount, selectedCoupons, selectedType]);

  return (
    <>
      <div className={`symbolInput`}>
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
      </div>
      <div>
        {calculatedgameErrorMes && (
          <p
            className="inputError inputErrorSmall text-danger"
            style={{ fontSize: "12px!important" }}
          >
            {/* <svg
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
            </svg> */}
            <span className="">{calculatedgameErrorMes}</span>
          </p>
        )}
      </div>
    </>
  );
};

export default BetAmount;
