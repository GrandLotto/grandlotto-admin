/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { addZero, getAMPM } from "../../global/customFunctions";

const ClockTimer = ({ time, timeStarted }) => {
  const [displayTimer, setDisplayTimer] = useState(null);

  useEffect(() => {
    let myInterval = null;

    if (timeStarted) {
      let d = time;
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = addZero(d.getSeconds());

      myInterval = setInterval(function () {
        ++seconds;
        hour = minutes > 59 ? ++hour : hour;
        minutes = seconds > 59 ? ++minutes : minutes;
        if (hour > 24) clearInterval(myInterval);
        seconds = seconds > 59 ? 0 : seconds;
        if (minutes > 59) {
          ++hour;
          minutes = 0;
        }
        minutes = ("0" + minutes).slice(-2);
        hour = hour % 12 || 12;

        setDisplayTimer(addZero(hour) + ":" + minutes + ":" + addZero(seconds));
      }, 1000);
    }

    return () => {
      // setTimeleft(time);
      setDisplayTimer(null);
      clearInterval(myInterval);
    };
  }, []);
  return (
    timeStarted &&
    displayTimer && (
      <p>
        {displayTimer} {getAMPM()}
      </p>
    )
  );
};

export default ClockTimer;
