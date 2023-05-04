import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: {
    status: false,
    payload: null,
  },

  alertPopUp: {
    status: false,
    type: "",
    title: "",
    desc: "",
    payload: null,
  },

  alertBetModal: {
    status: true,
    type: "",
    title: "",
    betId: "",
    amountStake: 0,
    amountWinning: 0,
    payload: null,
    // buttonText: "Continue Betting",
    // buttonText: "Deposit Funds",
    buttonText: "",
    buttonURL: "",
  },

  confirmModal: {
    status: false,
    type: "",
    title: "",
    desc: "",
    hasMesage: false,
    payload: null,
    buttonText: "",
  },

  creategameTypeModal: {
    status: false,
    type: "",
    payload: null,
  },

  createGameModal: {
    status: false,
    type: "",
    payload: null,
  },

  pageLoading: {
    status: false,
    message: "",
  },

  alertSmallPOPUP: {
    status: false,
    message: "",
  },

  loginModal: false,
  registerModal: false,
  forgotPasswordModal: false,
  mobileMenu: false,
  sideBarMenu: false,
  selectDrawMenu: false,
  addBankModal: false,
  notiicationModal: false,
  betSlipMobileModal: false,
  redeemWinningModal: false,
  addPinModal: false,
  comingSoonModal: true,

  inputCodeModal: {
    status: false,
    type: "",
    title: "",
    desc: "",
    btnText: "",
    payload: null,
  },

  searchCouponCodeModal: {
    status: false,
    type: "",
    payload: null,
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertSmallPOPUP: (state, { payload }) => {
      state.alertSmallPOPUP = payload;
    },

    setLoginModal: (state, { payload }) => {
      state.loginModal = payload;
    },

    setRegisterModal: (state, { payload }) => {
      state.registerModal = payload;
    },

    setForgotPasswordModal: (state, { payload }) => {
      state.forgotPasswordModal = payload;
    },

    setMobileMenu: (state, { payload }) => {
      state.mobileMenu = payload;
    },

    setSideBarMenu: (state, { payload }) => {
      state.sideBarMenu = payload;
    },

    setAddBankModal: (state, { payload }) => {
      state.addBankModal = payload;
    },

    setAlertPopUp: (state, { payload }) => {
      state.alertPopUp = {
        status: payload.status,
        type: payload.type,
        title: payload.title,
        desc: payload.desc,
        payload: payload.payload,
      };
    },

    setAlertBetModal: (state, { payload }) => {
      state.alertBetModal = payload;
    },

    setConfirmModal: (state, { payload }) => {
      state.confirmModal = payload;
    },

    setCreategameTypeModal: (state, { payload }) => {
      state.creategameTypeModal = payload;
    },

    setCreateGameModal: (state, { payload }) => {
      state.createGameModal = payload;
    },

    setLogoutModal: (state, { payload }) => {
      state.logoutModal = {
        status: payload.status,
        payload: payload.payload,
      };
    },
    setNotiicationModal: (state, { payload }) => {
      state.notiicationModal = payload;
    },

    setSelectDrawMenu: (state, { payload }) => {
      state.selectDrawMenu = payload;
    },

    setBetSlipMobileModal: (state, { payload }) => {
      state.betSlipMobileModal = payload;
    },

    setPageLoading: (state, { payload }) => {
      state.pageLoading = payload;
    },

    setRedeemWinningModal: (state, { payload }) => {
      state.redeemWinningModal = payload;
    },

    setInputCodeModal: (state, { payload }) => {
      state.inputCodeModal = payload;
    },

    setAddPinModal: (state, { payload }) => {
      state.addPinModal = payload;
    },

    setComingSoonModal: (state, { payload }) => {
      state.comingSoonModal = payload;
    },

    setSearchCouponCodeModal: (state, { payload }) => {
      state.searchCouponCodeModal = payload;
    },
  },

  extraReducers: {},
});

export const {
  setAlertPopUp,
  setAlertBetModal,
  setConfirmModal,
  setLoginModal,
  setLogoutModal,
  setRegisterModal,
  setForgotPasswordModal,
  setMobileMenu,
  setSideBarMenu,
  setAddBankModal,
  setNotiicationModal,
  setSelectDrawMenu,
  setBetSlipMobileModal,
  setPageLoading,
  setRedeemWinningModal,
  setInputCodeModal,
  setAddPinModal,
  setComingSoonModal,
  setAlertSmallPOPUP,
  setSearchCouponCodeModal,
  setCreategameTypeModal,
  setCreateGameModal,
} = alertSlice.actions;

export default alertSlice.reducer;
