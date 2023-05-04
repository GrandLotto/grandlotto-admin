import React from "react";

const Reponsemessage = ({ message, error }) => {
  return (
    <div className={`responseMessage ${error ? "error" : "success"}`}>
      <p>{message}</p>
    </div>
  );
};

export default Reponsemessage;
