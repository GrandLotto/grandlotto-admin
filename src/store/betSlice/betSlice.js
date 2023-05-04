import { createSlice } from "@reduxjs/toolkit";
import { sortArrayBy } from "../../global/customFunctions";
import {
  Getuseropengameplayed,
  Getuserclosedgameplayed,
  getgames,
  getgamestype,
  getgamesplayingtype,
  Getgameswininglogs,
  getallexistinggames,
  getWinningLogs,
  getAllgames,
} from "./actions";

const initialState = {
  allgames: null,
  games: null,
  allexistinggames: null,
  gameTypes: null,
  gamePlayingTypes: null,
  gameswininglogs: null,
  selectedCoupons: [],
  selectedPlayingType: undefined,
  selectedGame: undefined,
  selectedType: undefined,
  betSlips: [1, 2],
  userOpenBets: null,
  userOpenBetsPage: 1,
  userOpenBetsTotalPages: 3,
  userClosedBets: null,
  userCloseBetsPage: 1,
  userCloseBetsTotalPages: 3,
  allWinningLogs: null,
  allWinningLogsPage: 1,
  allWinningLogsTotalPages: 3,
  selectedGametimer: null,
  calculatedGames: null,
  expiryDate: null,
  betAmount: 0,
};

const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setSelectedCoupons: (state, { payload }) => {
      state.selectedCoupons = payload;
    },

    setBetSlips: (state, { payload }) => {
      state.betSlips = payload;
    },

    setSelectedPlayingType: (state, { payload }) => {
      if (payload === undefined) {
        if (state.gamePlayingTypes && state.gamePlayingTypes?.length) {
          state.selectedPlayingType = state.gamePlayingTypes[0]?.name;
        }
      } else {
        state.selectedPlayingType = payload;
      }
    },

    setSelectedGame: (state, { payload }) => {
      // state.selectedGame = payload;
      if (payload === undefined) {
        if (state.games && state.games?.length) {
          // state.selectedGame = state.games[0];
          state.selectedGame = null;
        }
      } else {
        state.selectedGame = payload;
      }
    },

    setSelectedType: (state, { payload }) => {
      state.selectedType = payload;
    },

    setSelectedGametimer: (state, { payload }) => {
      state.selectedGametimer = payload;
    },

    setBetAmount: (state, { payload }) => {
      state.betAmount = payload;
    },

    setUserOpenBets: (state, { payload }) => {
      state.userOpenBets = [...payload];
    },

    setUserOpenBetsCurrentPage: (state, { payload }) => {
      state.userOpenBetsPage = payload;
    },

    setUserOpenBetsTotalPages: (state, { payload }) => {
      state.userOpenBetsTotalPages = payload;
    },

    setUserClosedBets: (state, { payload }) => {
      state.userClosedBets = [...payload];
    },

    setUserCloseBetsPage: (state, { payload }) => {
      state.userCloseBetsPage = payload;
    },

    setUserCloseBetsTotalPages: (state, { payload }) => {
      state.userCloseBetsTotalPages = payload;
    },

    setCalculatedGames: (state, { payload }) => {
      state.calculatedGames = payload;
    },

    setExpiryDate: (state, { payload }) => {
      state.expiryDate = payload;
    },

    setAllWinningLogs: (state, { payload }) => {
      state.allWinningLogs = [...payload];
    },

    setAllWinningLogsPage: (state, { payload }) => {
      state.allWinningLogsPage = payload;
    },

    setAllWinningLogsTotalPages: (state, { payload }) => {
      state.allWinningLogsTotalPages = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(Getuseropengameplayed.fulfilled, (state, { payload }) => {
      state.userOpenBets = null;
      if (payload && payload.data) {
        state.userOpenBets = payload.data?.data;
        state.userOpenBetsPage = payload.data?.pageNumber;
        state.userOpenBetsTotalPages = payload.data?.totalPages;
        // console.log("userOpenBets", state.userOpenBets);
      } else {
        state.userOpenBets = [];
        state.userOpenBetsPage = 1;
        state.userOpenBetsTotalPages = 2;
      }
    });

    builder.addCase(Getuserclosedgameplayed.fulfilled, (state, { payload }) => {
      state.userClosedBets = null;
      if (payload && payload.data) {
        state.userClosedBets = payload.data?.data;
        state.userCloseBetsPage = payload.data?.pageNumber;
        state.userCloseBetsTotalPages = payload.data?.totalPages;
        // console.log("userClosedBets", state.userClosedBets);
      } else {
        state.userClosedBets = [];
        state.userCloseBetsPage = 1;
        state.userCloseBetsTotalPages = 2;
      }
    });

    builder.addCase(getWinningLogs.fulfilled, (state, { payload }) => {
      state.allWinningLogs = null;
      if (payload && payload.data) {
        state.allWinningLogs = payload.data?.data;
        state.allWinningLogsPage = payload.data?.pageNumber;
        state.allWinningLogsTotalPages = payload.data?.totalPages;
        // console.log("allWinningLogs", state.allWinningLogs);
      } else {
        state.allWinningLogs = [];
        state.allWinningLogsPage = 1;
        state.allWinningLogsTotalPages = 2;
      }
    });

    builder.addCase(Getgameswininglogs.fulfilled, (state, { payload }) => {
      state.gameswininglogs = null;

      if (payload.data) {
        state.gameswininglogs = payload.data?.data;
      } else {
        state.gameswininglogs = [];
      }
    });

    builder.addCase(getgames.fulfilled, (state, { payload }) => {
      state.games = null;

      if (payload.data) {
        state.games = sortArrayBy(payload.data, "dayAvailable");
      } else {
        state.games = [];
      }
    });

    builder.addCase(getAllgames.fulfilled, (state, { payload }) => {
      state.allgames = null;

      if (payload.data) {
        state.allgames = payload.data;
      } else {
        state.allgames = [];
      }
    });

    builder.addCase(getallexistinggames.fulfilled, (state, { payload }) => {
      // console.log("allexistinggames", state.allexistinggames);

      state.allexistinggames = null;

      if (payload.data) {
        state.allexistinggames = payload.data;
      } else {
        state.allexistinggames = [];
      }
    });

    builder.addCase(getgamestype.fulfilled, (state, { payload }) => {
      state.gameTypes = null;
      if (payload && payload.data) {
        state.gameTypes = payload.data;
        state.selectedType = state.gameTypes[1];
        // console.log("gameTypes", state.gameTypes);
      }
    });

    builder.addCase(getgamesplayingtype.fulfilled, (state, { payload }) => {
      state.gamePlayingTypes = null;
      if (payload && payload.data) {
        state.gamePlayingTypes = payload.data;
        state.selectedPlayingType = state.gamePlayingTypes[0]?.name;
        // console.log("gamePlayingTypes", state.gamePlayingTypes);
      }
    });
  },
});

export const {
  setSelectedCoupons,
  setBetSlips,
  setSelectedPlayingType,
  setSelectedGame,
  setSelectedType,
  setSelectedGametimer,
  setBetAmount,
  setUserOpenBets,
  setUserOpenBetsCurrentPage,
  setUserOpenBetsTotalPages,
  setUserClosedBets,
  setUserCloseBetsPage,
  setUserCloseBetsTotalPages,
  setCalculatedGames,
  setExpiryDate,
  setAllWinningLogs,
  setAllWinningLogsPage,
  setAllWinningLogsTotalPages,
} = betSlice.actions;

export default betSlice.reducer;
