import { createSlice } from "@reduxjs/toolkit";
import {
  getacceptedpayment,
  getAccountBalances,
  getAdminCount,
  getAllDepositlogs,
  getAllWithdrawfundrequest,
  getCountryBanks,
  getDepositlogs,
  getUserAccount,
  getWithdrawfundrequest,
} from "./actions";

const initialState = {
  adminCounts: null,
  accountBalances: null,
  userBankAccounts: null,
  acceptedpayment: null,
  userDeposits: null,
  userDepositsPage: 1,
  userDepositsTotalPages: 3,
  userWithdrawal: null,
  userWithdrawalPage: 1,
  userWithdrawalTotalPages: 3,
  allWithdrawal: null,
  allWithdrawalPage: 1,
  allWithdrawalTotalPages: 3,
  allDeposits: null,
  allDepositsPage: 1,
  allDepositsTotalPages: 3,
  countryBanks: [],
  loading: false,
  error: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSelectedCoupons: (state, { payload }) => {
      state.selectedCoupons = payload;
    },

    setBetSlips: (state, { payload }) => {
      state.betSlips = payload;
    },

    setAccountBalances: (state, { payload }) => {
      state.accountBalances = payload;
    },

    setUserDeposits: (state, { payload }) => {
      state.userDeposits = [...payload];
    },

    setUserDepositsPage: (state, { payload }) => {
      state.userDepositsPage = payload;
    },

    setUserDepositsTotalPages: (state, { payload }) => {
      state.userDepositsTotalPages = payload;
    },

    setUserWithdrawal: (state, { payload }) => {
      state.userWithdrawal = [...payload];
    },

    setUserWithdrawalPage: (state, { payload }) => {
      state.userWithdrawalPage = payload;
    },

    setUserWithdrawalTotalPages: (state, { payload }) => {
      state.userWithdrawalTotalPages = payload;
    },

    setAllWithdrawal: (state, { payload }) => {
      state.allWithdrawal = [...payload];
    },

    setAllWithdrawalPage: (state, { payload }) => {
      state.allWithdrawalPage = payload;
    },

    setAllWithdrawalTotalPages: (state, { payload }) => {
      state.allWithdrawalTotalPages = payload;
    },

    setAllDeposits: (state, { payload }) => {
      state.allDeposits = [...payload];
    },

    setAllDepositsPage: (state, { payload }) => {
      state.allDepositsPage = payload;
    },

    setAllDepositsTotalPages: (state, { payload }) => {
      state.allDepositsTotalPages = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAccountBalances.pending, (state, { payload }) => {
      // state.accountBalances = null;
      state.loading = true;
    });

    builder.addCase(getAccountBalances.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.loading = false;
        state.accountBalances = payload.data;
        state.error = false;
      } else {
        state.user = null;
        state.error = true;
        state.loading = false;
      }
    });

    builder.addCase(getAccountBalances.rejected, (state, { payload }) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(getUserAccount.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.userBankAccounts = payload.data;
      }
    });

    builder.addCase(getAdminCount.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.adminCounts = payload.data;
        // console.log("adminCounts", state.adminCounts);
      }
    });

    builder.addCase(getWithdrawfundrequest.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.userWithdrawal = payload.data?.data;
        state.userWithdrawalPage = payload.data?.pageNumber;
        state.userWithdrawalTotalPages = payload.data?.totalPages;
      }
    });

    builder.addCase(getDepositlogs.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.userDeposits = payload.data?.data;
        state.userDepositsPage = payload.data?.pageNumber;
        state.userDepositsTotalPages = payload.data?.totalPages;
      }
    });

    builder.addCase(
      getAllWithdrawfundrequest.fulfilled,
      (state, { payload }) => {
        if (payload && payload.data) {
          state.allWithdrawal = payload.data?.data;
          state.allWithdrawalPage = payload.data?.pageNumber;
          state.allWithdrawalTotalPages = payload.data?.totalPages;
          // console.log("allWithdrawal", state.allWithdrawal);
        }
      }
    );

    builder.addCase(getAllDepositlogs.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.allDeposits = payload.data?.data;
        state.allDepositsPage = payload.data?.pageNumber;
        state.allDepositsTotalPages = payload.data?.totalPages;

        // console.log("allDeposits", state.allDeposits);
      }
    });

    builder.addCase(getCountryBanks.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.countryBanks = payload.data;
      }
    });

    builder.addCase(getacceptedpayment.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.acceptedpayment = payload.data;
      }
    });
  },
});

export const {
  setSelectedCoupons,
  setBetSlips,
  setAccountBalances,
  setUserDeposits,
  setUserDepositsPage,
  setUserDepositsTotalPages,
  setUserWithdrawal,
  setUserWithdrawalPage,
  setUserWithdrawalTotalPages,
  setAllWithdrawal,
  setAllWithdrawalPage,
  setAllWithdrawalTotalPages,
  setAllDeposits,
  setAllDepositsPage,
  setAllDepositsTotalPages,
} = walletSlice.actions;

export default walletSlice.reducer;
