/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const Timer = ({ time, setTime }) => {
  const [displayTimer, setDisplayTimer] = useState(time);

  useEffect(() => {
    let myInterval = null;

    let timer = time,
      hour,
      minutes,
      seconds;

    myInterval = setInterval(function () {
      hour = parseInt(timer / (60 * 60), 10);
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hour = hour < 10 ? "0" + hour : hour;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setDisplayTimer(minutes + ":" + seconds);
      setTime(minutes);

      if (--timer < 0) {
        timer = time;
        clearInterval(myInterval);
        setTime(0);
      }
    }, 1000);

    return () => {
      // setTimeleft(time);
      clearInterval(myInterval);
    };
  }, []);
  return (
    <span className="timeBlock">
      <b>{displayTimer}</b>
    </span>
  );
};

export default Timer;
