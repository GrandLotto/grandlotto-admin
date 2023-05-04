/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlertPopUp, setPageLoading } from "../../store/alert/alertSlice";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  ADD_USER_TO_ROLES_URL,
  GET_USERINFO_URL,
} from "../../config/urlConfigs";
import person from "../../assets/images/default.png";
import { setRefreshing } from "../../store/authSlice/authSlice";

const ChangeUserRole = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const allRoles = useSelector((state) => state.oauth.allRoles);

  const [userDetails, setuserDetails] = useState(null);
  const [selectedRole, setSelectedRole] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const [responseError, setResponseError] = useState("");

  // useEffect(() => {
  //   if (user) {
  //     setSelectedRole(user?.roles[0]);
  //   }
  // }, [user]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setuserDetails(null);
  }, [searchText]);

  useEffect(() => {
    if (userDetails) {
      setSelectedRole(userDetails?.roles);
    }
  }, [userDetails]);

  // useEffect(() => {
  //   if (selectedRole) {
  //     console.log("selectedRole", selectedRole);
  //   }
  // }, [selectedRole]);

  useEffect(() => {
    validateForm();
  }, [selectedRole, emptyFields]);

  const validateForm = () => {
    if (!selectedRole && selectedRole?.length <= 0) {
      setEmptyFields(true);
      return false;
    }
    setEmptyFields(false);
  };

  const reset = () => {
    setsearchText("");
    setSelectedRole([]);
    setResponseError("");
    setuserDetails(null);
    setEmptyFields(true);
  };

  const isSelected = (roleName) => {
    let selected = selectedRole?.find(
      (item) => item?.toUpperCase() === roleName?.toUpperCase()
    );
    return !!selected;
  };

  const handleSelectRole = (role) => {
    if (selectedRole?.length) {
      let addedRole = selectedRole?.find(
        (addedR) => addedR?.toUpperCase() === role?.name?.toUpperCase()
      );

      if (addedRole) {
        let removeRole = selectedRole?.filter(
          (addedR) => addedR?.toUpperCase() !== addedRole?.toUpperCase()
        );

        if (removeRole) {
          setSelectedRole(removeRole);
        }
      } else {
        setSelectedRole([...selectedRole, role?.name]);
      }
    } else {
      setSelectedRole([role?.name]);
    }
  };

  const checkUser = () => {
    if (!searchText) {
      return;
    }

    if (userDetails && userDetails?.email === searchText) {
      return;
    }

    if (user && user?.email === searchText) {
      alert("You cannot change your own role");
      return;
    }

    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );
    setResponseError("");

    const payload = {
      email: searchText?.trim(),
    };

    // console.log(payload);

    handlePOSTRequest(GET_USERINFO_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        // console.log(response);
        if (response?.data?.success) {
          setuserDetails(response?.data?.data);
        } else {
          setResponseError(response?.data?.message);
          setsearchText("");
          setuserDetails(null);
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        setResponseError("An error occurred, please try again");
        setsearchText("");
      });
  };

  const proceed = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    const payload = {
      email: searchText,
      role: selectedRole,
    };

    // console.log(payload);

    handlePOSTRequest(ADD_USER_TO_ROLES_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        // console.log(response);
        if (response?.data?.success) {
          dispatch(setRefreshing(true));
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: `${userDetails?.firstName}'s Role updated to ${selectedRole}`,
              desc: response?.data?.message,
              payload: null,
            })
          );
          setuserDetails(null);
          setsearchText("");
        } else {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: `Role update not successful`,
              desc: response?.data?.message,
              payload: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: `Error`,
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
      });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form
          className="grandlotto_form mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            checkUser();
          }}
        >
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="form-group">
                <label htmlFor="">User Email</label>
                <div className="inputWithSufix">
                  <input
                    type="text"
                    placeholder="Search Email"
                    onChange={(e) => setsearchText(e.target.value)}
                    value={searchText}
                  />
                  <span className="searchIconn" onClick={() => checkUser()}>
                    Search
                  </span>
                </div>

                {responseError ? (
                  <div
                    className=" text-left"
                    style={{ marginTop: 0, marginLeft: 10 }}
                  >
                    <p className="inputError text-danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 20 20"
                        role="presentation"
                        focusable="false"
                        tabIndex="-1"
                        fill="red"
                      >
                        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                      </svg>
                      <span className="ml-2">{responseError}</span>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </form>
        <br />
        {userDetails && (
          <div className="row mb-5">
            <div className="col-md-6 mx-auto">
              <div className="text-center">
                <img
                  src={userDetails?.photo || person}
                  onError={(e) => {
                    e.currentTarget.src = person;
                  }}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  alt={""}
                />
                <h6 className="mt-3">
                  {userDetails?.firstName + " " + userDetails?.lastName}
                </h6>
                <p>{userDetails?.email}</p>
                {/* <p>
                  {" "}
                  <b>Roles:</b>{" "}
                  {userDetails?.roles?.map((role, index) =>
                    index !== 0 ? ", " + role : role
                  )}
                </p> */}

                {/* <div className="form-group text-left mt-3">
                  <label
                    htmlFor=""
                    className="text-left"
                    style={{ fontSize: 14 }}
                  >
                    Update Role
                  </label>
                  <select
                    style={{ width: "100%" }}
                    className="form-control hasCapitalized"
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedRole(e.target.value);
                      }
                    }}
                    value={selectedRole}
                  >
                    <option value="" disabled>
                      Select Role
                    </option>

                    {allRoles &&
                      allRoles
                        ?.filter((item) => item?.name !== "")
                        ?.map((item, index) => (
                          <option key={index} value={item?.name}>
                            {item?.name}
                          </option>
                        ))}
                  </select>
                </div> */}
                <br />

                <div className="grandlotto_table text-center mt-3">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      {allRoles && allRoles?.length ? (
                        <tbody>
                          {allRoles
                            ?.filter((item) => item?.name !== "")
                            ?.map((item, index) => (
                              <tr key={index}>
                                <td>{item?.name}</td>

                                <td>
                                  <div className="checkboxDiv">
                                    <div
                                      className="form-check"
                                      style={{
                                        fontSize: 13,
                                        fontStyle: "italic",
                                      }}
                                    >
                                      <input
                                        checked={
                                          isSelected(item?.name) === true
                                            ? true
                                            : false
                                        }
                                        onChange={() => handleSelectRole(item)}
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexCheckDefault"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                      ></label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan={2}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div className="no_data_div">
                                  <br />
                                  <br />
                                  <br />
                                  <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{ flexDirection: "column" }}
                                  >
                                    <h4
                                      className="mb-4"
                                      style={{
                                        fontSize: "18px",
                                        fontWeight: 500,
                                      }}
                                    >
                                      No Role available
                                    </h4>
                                  </div>

                                  <br />
                                  <br />
                                  <br />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>

                <div className="mt-5 text-center mb-3">
                  <div className="d-flex justify-content-center">
                    <button
                      className=" grandLottoButton button-outline-light border text-dark"
                      style={{ marginRight: "10px" }}
                      onClick={() => reset()}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={emptyFields}
                      type="button"
                      className="grandLottoButton"
                      onClick={() => proceed()}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeUserRole;
