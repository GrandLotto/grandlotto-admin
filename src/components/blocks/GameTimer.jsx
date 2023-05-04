/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { addZero } from "../../global/customFunctions";

const GameTimer = ({ time, timeStarted }) => {
  const [displayTimer, setDisplayTimer] = useState(null);

  useEffect(() => {
    let myInterval = null;

    if (timeStarted) {
      let countDownDate = time;

      myInterval = setInterval(function () {
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // console.log("days", days);
        // console.log("hours", hours);
        // console.log("minutes", minutes);
        // console.log("seconds", seconds);

        setDisplayTimer(
          addZero(days) +
            " : " +
            addZero(hours) +
            " : " +
            addZero(minutes) +
            " : " +
            addZero(seconds)
        );

        if (distance < 0) {
          clearInterval(myInterval);
          // console.log("expired");
        }
      }, 1000);
    }

    return () => {
      // setTimeleft(time);
      setDisplayTimer(null);
      clearInterval(myInterval);
    };
  }, []);
  return (
    timeStarted && (
      <>
        <div className="daysToExpireItems">Day : hour : min : sec</div>
        <div className="daysToExpireItems largeOne">{displayTimer}</div>
      </>
    )
  );
};

export default GameTimer;
