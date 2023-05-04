/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../../components/users/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USERS_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAllUsers,
  setAllUsersPage,
  setAllUsersTotalPages,
} from "../../store/authSlice/authSlice";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
  setConfirmModal,
} from "../../store/alert/alertSlice";

import ChangeUserRole from "../../components/users/ChangeUserRole";

const AdminUserAccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const allUsers = useSelector((state) => state.oauth.allUsers);

  const allUsersPage = useSelector((state) => state.oauth.allUsersPage);
  const allUsersTotalPages = useSelector(
    (state) => state.oauth.allUsersTotalPages
  );

  const [isLoading, setIsLoading] = useState(false);
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);

  // console.log("allUsersPage", allUsersPage);
  // console.log("allUsersTotalPages", allUsersTotalPages);

  const columns = [
    {
      name: "#",
    },
    {
      name: "Name",
    },
    {
      name: "Email",
    },
    {
      name: "Status",
    },
    {
      name: "Submitted KYC",
    },
    {
      name: "Created on",
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
    let url = GET_ALL_USERS_URL;

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber: allUsersPage - 1,
      pageSize: 10,
    };

    let url = GET_ALL_USERS_URL;

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber: allUsersPage + 1,
      pageSize: 10,
    };

    let url = GET_ALL_USERS_URL;

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

          dispatch(setAllUsers(allDatas));
          dispatch(setAllUsersPage(currentPage));
          dispatch(setAllUsersTotalPages(totalPages));
        } else {
          dispatch(setAllUsersPage(allUsersPage));
          dispatch(setAllUsersTotalPages(allUsersTotalPages));

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
    let url = GET_ALL_USERS_URL;

    fetchMore("", url, payload);
  };

  useEffect(() => {
    if (clearSeasrchFilter === true) {
      handleFilter();
    }
  }, [clearSeasrchFilter]);

  const handleEdit = (item) => {
    // console.log(item);
  };

  const handleDelete = (item) => {
    // console.log(item);

    dispatch(
      setConfirmModal({
        status: true,
        type:
          item?.accountStatus === "active"
            ? "DEACTIVATE_USER"
            : "ACTIVATE_USER",
        title:
          item?.accountStatus === "active"
            ? `Deactivate ${item?.firstName}`
            : `Activate ${item?.firstName}`,
        desc: "Are you sure you want to proceed?",
        hasMesage: false,
        payload: item,
        buttonText: "Submit",
      })
    );
  };

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">User Controls</h5>
          </div>

          <div className="mt-5">
            <div className="grandlotto_tabs text-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Wallet-tab"
                  >
                    Activate/Deactiactivate User
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#Bonus-tab">
                    Change Roles
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
                <div className="card mb-4">
                  <UsersTable
                    columns={columns}
                    data={allUsers}
                    page={allUsersPage}
                    totalPages={allUsersTotalPages}
                    type="ADMIN"
                    isLoading={isLoading}
                    nextP={nextPage}
                    PrevP={previousPage}
                    fetchByPage={fetchByPage}
                    columnSpan={10}
                    noDataText="No User found"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
              <div className="tab-pane" id="Bonus-tab">
                <ChangeUserRole />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserAccountPage;
