/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "../../components/dashboard/dashboard.scss";
import UsersKYCTable from "../../components/users/UsersKYCTable";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
  setConfirmModal,
} from "../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { PENDING_KYC_USERS_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setPendingKYCusers,
  setPendingKYCusersPage,
  setPendingKYCusersTotalPages,
} from "../../store/authSlice/authSlice";

const AdminVerifyKYCPage = () => {
  // console.log(userWithdrawalTotalPages);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const pendingKYCusers = useSelector((state) => state.oauth.pendingKYCusers);

  const pendingKYCusersPage = useSelector(
    (state) => state.oauth.pendingKYCusersPage
  );
  const pendingKYCusersTotalPages = useSelector(
    (state) => state.oauth.pendingKYCusersTotalPages
  );

  const [isLoading, setIsLoading] = useState(false);
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);

  const columns = [
    {
      name: "#",
    },
    {
      name: "Name",
    },
    {
      name: "ID Type #",
    },
    {
      name: "Doc URL",
    },
    {
      name: "Status",
    },
    {
      name: "Date/Time",
    },

    {
      name: "Action",
    },
  ];

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  const fetchByPage = (type, page) => {
    const payload = {
      email: user?.email,
      pageNumber: page,
      pageSize: 10,
    };
    let url = PENDING_KYC_USERS_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber: pendingKYCusersPage - 1,
      pageSize: 10,
    };

    let url = PENDING_KYC_USERS_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber: pendingKYCusersPage + 1,
      pageSize: 10,
    };

    let url = PENDING_KYC_USERS_URL;

    fetchMore(type, url, payload);
  };

  const fetchMore = (type, url, payload) => {
    setIsLoading(true);

    // console.log(payload);

    handlePOSTRequest(url, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;

          let currentPage = requestData?.pageNumber;
          let totalPages = requestData?.totalPages;
          let allDatas = requestData?.data;

          dispatch(setPendingKYCusers(allDatas));
          dispatch(setPendingKYCusersPage(currentPage));
          dispatch(setPendingKYCusersTotalPages(totalPages));
        } else {
          dispatch(setPendingKYCusersPage(pendingKYCusersPage));
          dispatch(setPendingKYCusersTotalPages(pendingKYCusersTotalPages));

          dispatch(
            setAlertSmallPOPUP({
              status: false,
              message: response?.data?.message,
            })
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);

        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        // console.log(error);
      });
  };

  const handleFilter = () => {
    setClearSeasrchFilter(false);
    const payload = {
      email: user?.email,
      pageNumber: 1,
      pageSize: 10,
    };
    let url = PENDING_KYC_USERS_URL;

    fetchMore("", url, payload);
  };

  useEffect(() => {
    if (clearSeasrchFilter === true) {
      handleFilter();
    }
  }, [clearSeasrchFilter]);

  const handleEdit = (item) => {
    // console.log(item);
    dispatch(
      setConfirmModal({
        status: true,
        type: "APPROVE_KYC",
        title: "Approve KYC",
        desc: "Are you sure you want to approve this kyc?",
        hasMesage: false,
        payload: item,
        buttonText: "Submit",
      })
    );
  };

  const handleDelete = (item) => {
    // console.log(item);
    dispatch(
      setConfirmModal({
        status: true,
        type: "DECLINE_KYC",
        title: "Decline KYC",
        desc: "Reason for declining this kyc?",
        hasMesage: true,
        payload: item,
        buttonText: "Submit",
      })
    );
  };

  return (
    <>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">Verify KYC</h5>
          </div>

          <div className="mt-5">
            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
                <div className="card">
                  {/* <Transactions
                    columns={columns}
                    data={[]}
                    page={1}
                    totalPages={2}
                    type="ADMIN"
                    isLoading={false}
                    nextP={() => {}}
                    PrevP={() => {}}
                    fetchByPage={() => {}}
                    columnSpan={10}
                  /> */}
                  <UsersKYCTable
                    columns={columns}
                    data={pendingKYCusers}
                    page={pendingKYCusersPage}
                    totalPages={pendingKYCusersTotalPages}
                    type="ADMIN"
                    isLoading={isLoading}
                    nextP={nextPage}
                    PrevP={previousPage}
                    fetchByPage={fetchByPage}
                    columnSpan={10}
                    noDataText="No Pending KYC found"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminVerifyKYCPage;
