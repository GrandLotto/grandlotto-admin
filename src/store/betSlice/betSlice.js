import { createSlice } from "@reduxjs/toolkit";
import { sortArrayBy, sortArrayBy2 } from "../../global/customFunctions";
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
  getallgamesplayed,
  getgamesgroup,
  getValidatedGamesByGameID,
  getValidatedgames,
  getunvalidatedexpiredgames,
} from "./actions";

const initialState = {
  gamesgroup: null,
  allgames: null,
  games: null,
  unvalidatedGames: null,
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
  allGamesPlayed: null,
  allGamesPlayedPage: 1,
  allGamesPlayedTotalPages: 3,
  validatedGames: null,
  validatedGamesPage: 1,
  validatedGamesTotalPages: 3,
  allValidatedGameResults: null,
  allValidatedGameResultsPage: 1,
  allValidatedGameResultsTotalPages: 3,
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

    setAllGamesPlayed: (state, { payload }) => {
      state.allGamesPlayed = [...payload];
    },

    setAllGamesPlayedPage: (state, { payload }) => {
      state.allGamesPlayedPage = payload;
    },

    setAllGamesPlayedTotalPages: (state, { payload }) => {
      state.allGamesPlayedTotalPages = payload;
    },
    setValidatedGames: (state, { payload }) => {
      state.validatedGames = [...payload];
    },

    setValidatedGamesPage: (state, { payload }) => {
      state.validatedGamesPage = payload;
    },

    setValidatedGamesTotalPages: (state, { payload }) => {
      state.validatedGamesTotalPages = payload;
    },

    setAllValidatedGameResults: (state, { payload }) => {
      state.allValidatedGameResults = [...payload];
    },

    setAllValidatedGameResultsPage: (state, { payload }) => {
      state.allValidatedGameResultsPage = payload;
    },

    setAllValidatedGameResultsTotalPages: (state, { payload }) => {
      state.allValidatedGameResultsTotalPages = payload;
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

    builder.addCase(getallgamesplayed.fulfilled, (state, { payload }) => {
      state.allGamesPlayed = null;
      if (payload && payload.data) {
        state.allGamesPlayed = payload.data?.data;
        state.allGamesPlayedPage = payload.data?.pageNumber;
        state.allGamesPlayedTotalPages = payload.data?.totalPages;
        // console.log("allGamesPlayed", state.allGamesPlayed);
      } else {
        state.allGamesPlayed = [];
        state.allGamesPlayedPage = 1;
        state.allGamesPlayedTotalPages = 2;
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

    builder.addCase(getgamesgroup.fulfilled, (state, { payload }) => {
      state.gamesgroup = null;

      if (payload.data) {
        state.gamesgroup = payload.data;
        // console.log("gamesgroup", payload.data);
      } else {
        state.gamesgroup = [];
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

    builder.addCase(
      getunvalidatedexpiredgames.fulfilled,
      (state, { payload }) => {
        state.unvalidatedGames = null;

        if (payload.data) {
          state.unvalidatedGames = payload.data;
        } else {
          state.unvalidatedGames = [];
        }
      }
    );

    builder.addCase(getAllgames.fulfilled, (state, { payload }) => {
      state.allgames = null;

      if (payload.data) {
        state.allgames = sortArrayBy2(payload.data, "dateCreated");
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

    builder.addCase(getValidatedgames.fulfilled, (state, { payload }) => {
      state.validatedGames = null;
      if (payload && payload.data) {
        state.validatedGames = payload.data?.data;
        state.validatedGamesPage = payload.data?.pageNumber;
        state.validatedGamesTotalPages = payload.data?.totalPages;
        // console.log("validatedGames", state.validatedGames);
      } else {
        state.validatedGames = [];
        state.validatedGamesPage = 1;
        state.validatedGamesTotalPages = 2;
      }
    });

    builder.addCase(
      getValidatedGamesByGameID.fulfilled,
      (state, { payload }) => {
        state.allValidatedGameResults = null;
        if (payload && payload.data) {
          state.allValidatedGameResults = payload.data?.data;
          state.allValidatedGameResultsPage = payload.data?.pageNumber;
          state.allValidatedGameResultsTotalPages = payload.data?.totalPages;
          // console.log("allValidatedGameResults", state.allValidatedGameResults);
        } else {
          state.allValidatedGameResults = [];
          state.allValidatedGameResultsPage = 1;
          state.allValidatedGameResultsTotalPages = 2;
        }
      }
    );
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
  setAllGamesPlayed,
  setAllGamesPlayedPage,
  setAllGamesPlayedTotalPages,
  setValidatedGames,
  setValidatedGamesPage,
  setValidatedGamesTotalPages,
  setAllValidatedGameResults,
  setAllValidatedGameResultsPage,
  setAllValidatedGameResultsTotalPages,
} = betSlice.actions;

export default betSlice.reducer;
