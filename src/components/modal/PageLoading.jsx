import React from "react";
import { useSelector } from "react-redux";

const PageLoading = () => {
  const alertModal = useSelector((state) => state.alert.pageLoading);

  return (
    alertModal?.status && (
      <div className="componentLoading">
        <div className="componentLoading_wrapper">
          <div className="componentLoading_loader">
            <div className="componentLoading_loader loader-inner"></div>
          </div>
        </div>
        <p>{alertModal?.message}</p>
      </div>
    )
  );
};

export default PageLoading;
