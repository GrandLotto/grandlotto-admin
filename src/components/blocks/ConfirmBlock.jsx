import React from "react";

const ConfirmBlock = ({ title, status, des = "" }) => {
  return (
    <div className="confirmBlock">
      <div>
        {status === true && <i className="bx bx-check success_b"></i>}
        {status === false && <i className="bx bx-error-alt error_b"></i>}
        {status === "pending" && (
          <i className="bx bxs-hourglass-top pending_b"></i>
        )}
      </div>

      <h4>{title}</h4>
      {des && <p>{des}</p>}
    </div>
  );
};

export default ConfirmBlock;
