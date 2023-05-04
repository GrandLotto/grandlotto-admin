import React from "react";

const ComponentLoading = ({ title = "Please wait ...", inner = false }) => {
  return (
    <div className={`componentLoading ${inner === true ? "inner" : ""}`}>
      <div className="componentLoading_wrapper">
        <div className="componentLoading_loader">
          <div className="componentLoading_loader loader-inner"></div>
        </div>
      </div>
      <p>{title}</p>
    </div>
  );
};

export default ComponentLoading;
