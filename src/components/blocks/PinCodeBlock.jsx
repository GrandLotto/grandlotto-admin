/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { inputCodeNext } from "../../global/customFunctions";

const PinCodeBlock = ({
  handleDone,
  pinLength,
  resetEFields,
  maxLength = 1,
}) => {
  useEffect(() => {
    inputCodeNext();
  });

  const [verifyCode1, setVerifyCode1] = useState("");
  const [verifyCode2, setVerifyCode2] = useState("");
  const [verifyCode3, setVerifyCode3] = useState("");
  const [verifyCode4, setVerifyCode4] = useState("");
  const [verifyCode5, setVerifyCode5] = useState("");
  const [verifyCode6, setVerifyCode6] = useState("");

  useEffect(() => {
    // if (verifyCode1 && verifyCode2 && verifyCode3 && verifyCode4 && verifyCode5 && verifyCode6) {
    //   // verifyCode4Ref.current == null;
    // }
    // // console.log(`${verifyCode1}${verifyCode2}${verifyCode3}${verifyCode4}`);
    handleDone(
      `${verifyCode1}${verifyCode2}${verifyCode3}${verifyCode4}${verifyCode5} ${verifyCode6}`
    );
    // }
  }, [
    verifyCode1,
    verifyCode2,
    verifyCode3,
    verifyCode4,
    verifyCode5,
    verifyCode6,
  ]);

  useEffect(() => {
    if (resetEFields) {
      setVerifyCode1("");
      setVerifyCode2("");
      setVerifyCode3("");
      setVerifyCode4("");
      setVerifyCode5("");
      setVerifyCode6("");
    }
  }, [resetEFields]);

  return (
    <div
      className="instructionMessageInputCodes"
      style={{ marginTop: "10px", marginBottom: "10px" }}
    >
      <input
        value={verifyCode1}
        onChange={(e) => setVerifyCode1(e.target.value)}
        type="text"
        maxLength={maxLength}
        role="presentation"
        autoComplete="new-password"
      />
      <input
        value={verifyCode2}
        onChange={(e) => setVerifyCode2(e.target.value)}
        type="text"
        role="presentation"
        autoComplete="new-password"
        maxLength={maxLength}
      />

      <input
        value={verifyCode3}
        onChange={(e) => setVerifyCode3(e.target.value)}
        type="text"
        role="presentation"
        autoComplete="new-password"
        maxLength={maxLength}
      />
      <input
        value={verifyCode4}
        onChange={(e) => setVerifyCode4(e.target.value)}
        type="text"
        role="presentation"
        maxLength={maxLength}
        autoComplete="new-password"
      />
      {pinLength >= 5 && (
        <input
          value={verifyCode5}
          onChange={(e) => setVerifyCode5(e.target.value)}
          type="text"
          maxLength={maxLength}
          role="presentation"
          autoComplete="new-password"
        />
      )}
      {pinLength === 6 && (
        <input
          value={verifyCode6}
          onChange={(e) => setVerifyCode6(e.target.value)}
          type="text"
          role="presentation"
          maxLength={maxLength}
          autoComplete="new-password"
        />
      )}
    </div>
  );
};

export default PinCodeBlock;
