import { createSlice } from "@reduxjs/toolkit";
import {
  getacceptedid,
  getAllroles,
  getkycpendingusers,
  getUserInfo,
  getuserlist,
} from "./actions";

const initialState = {
  appScreenSize: "",
  siteName: "Grand Lotto",
  // user: localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : null,
  user: null,
  token: localStorage.getItem("appUserThemeSettingsCode") || "",
  // token: localStorage.getItem("appUserThemeSettingsCode") || "",
  isAdmin: false,
  darkMode: false,
  loginIdentity: null,
  isUserLoggedIn: false,
  // isUserLoggedIn: !!localStorage.getItem("appUserThemeSettingsCode"),
  pageLoading: {
    status: false,
    message: "",
  },
  loading: false,
  error: false,
  refreshing: false,
  digitalDate: "00:00",
  acceptedIDType: null,
  allUsers: null,
  allUsersPage: 1,
  allUsersTotalPages: 3,
  pendingKYCusers: null,
  pendingKYCusersPage: 1,
  pendingKYCusersTotalPages: 3,
  allRoles: null,
};

const authSlice = createSlice({
  name: "oauth",
  initialState,
  reducers: {
    setDigitalDate: (state, { payload }) => {
      state.digitalDate = payload;
    },

    setIsUserLoggedIn: (state, { payload }) => {
      state.isUserLoggedIn = payload;
    },
    setIsToken: (state, { payload }) => {
      state.token = payload;
    },

    setUserInfo: (state, { payload }) => {
      state.user = payload;
    },

    setRefreshing: (state, { payload }) => {
      state.refreshing = payload;
    },

    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },

    setAllUsers: (state, { payload }) => {
      state.allUsers = [...payload];
    },

    setAllUsersPage: (state, { payload }) => {
      state.allUsersPage = payload;
    },

    setAllUsersTotalPages: (state, { payload }) => {
      state.allUsersTotalPages = payload;
    },

    setPendingKYCusers: (state, { payload }) => {
      state.pendingKYCusers = [...payload];
    },

    setPendingKYCusersPage: (state, { payload }) => {
      state.pendingKYCusersPage = payload;
    },

    setPendingKYCusersTotalPages: (state, { payload }) => {
      state.pendingKYCusersTotalPages = payload;
    },

    logout: (state) => {
      state.token = "";
      state.isUserLoggedIn = false;
      state.user = null;
      localStorage.removeItem("appUserThemeSettingsCode");
      localStorage.removeItem("appexrat");
      localStorage.removeItem("persist:root");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.loading = false;
        state.user = payload.data;
        state.error = false;
        // console.log(action.payload.data);
      } else {
        state.user = null;
        state.error = true;
        state.loading = false;
      }
    });
    builder.addCase(getUserInfo.rejected, (state, { payload }) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(getacceptedid.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.acceptedIDType = payload.data;
        // console.log("acceptedIDType", state.acceptedIDType);
      }
    });

    builder.addCase(getuserlist.fulfilled, (state, { payload }) => {
      state.allUsers = null;
      if (payload && payload.data) {
        state.allUsers = payload.data?.data;
        state.allUsersPage = payload.data?.pageNumber;
        state.allUsersTotalPages = payload.data?.totalPages;
        // console.log("allUsers", state.allUsers);
      } else {
        state.allUsers = [];
        state.allUsersPage = 1;
        state.allUsersTotalPages = 2;
      }
    });

    builder.addCase(getkycpendingusers.fulfilled, (state, { payload }) => {
      state.pendingKYCusers = null;
      if (payload && payload.data) {
        state.pendingKYCusers = payload.data?.data;
        state.pendingKYCusersPage = payload.data?.pageNumber;
        state.pendingKYCusersTotalPages = payload.data?.totalPages;
        // console.log("pendingKYCusers", state.pendingKYCusers);
      } else {
        state.pendingKYCusers = [];
        state.pendingKYCusersPage = 1;
        state.pendingKYCusersTotalPages = 2;
      }
    });

    builder.addCase(getAllroles.fulfilled, (state, { payload }) => {
      // console.log("getAllroles", payload);
      if (payload) {
        state.allRoles = payload;
      } else {
        state.allRoles = [];
      }
    });
  },
});

export const {
  setDigitalDate,
  setIsUserLoggedIn,
  logout,
  setUserInfo,
  setIsToken,
  setRefreshing,
  setIsAdmin,
  setAllUsers,
  setAllUsersPage,
  setAllUsersTotalPages,
  setPendingKYCusers,
  setPendingKYCusersPage,
  setPendingKYCusersTotalPages,
} = authSlice.actions;

export default authSlice.reducer;
