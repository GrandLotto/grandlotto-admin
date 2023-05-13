import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "../../config/axios";
import {
  EXISTING_GAME_URL,
  GET_ALL_GAMES_PLAYED_URL,
  GET_ALL_GAMES_URL,
  GET_CLOSED_GAMES_URL,
  GET_GAMES_PLAYING_TYPES_URL,
  GET_GAMES_TYPES_URL,
  GET_GAMES_URL,
  GET_GAMES_WININNG_LOGS_URL,
  GET_GAME_WINNING_LOG_URL,
  GET_OPEN_GAMES_URL,
} from "../../config/urlConfigs";

export const getgames = createAsyncThunk(
  "bets/getgames",
  async (payload, { getState, dispatch }) => {
    try {
      const result = axios.get(GET_GAMES_URL).then((response) => {
        return response.data;
      });

      return result;
    } catch (error) {}
  }
);

export const getAllgames = createAsyncThunk(
  "bets/getAllgames",
  async (payload, { getState, dispatch }) => {
    try {
      const result = axios.get(GET_ALL_GAMES_URL).then((response) => {
        return response.data;
      });

      return result;
    } catch (error) {}
  }
);

export const getallexistinggames = createAsyncThunk(
  "bets/getallexistinggames",
  async (payload, { getState, dispatch }) => {
    try {
      const result = axios.get(EXISTING_GAME_URL).then((response) => {
        return response.data;
      });

      return result;
    } catch (error) {}
  }
);

export const getgamestype = createAsyncThunk(
  "bets/getgamestype",
  async (payload, { getState, dispatch }) => {
    try {
      const result = axios.get(GET_GAMES_TYPES_URL).then((response) => {
        return response.data;
      });

      return result;
    } catch (error) {}
  }
);

export const getgamesplayingtype = createAsyncThunk(
  "bets/getgamesplayingtype",
  async (payload, { getState, dispatch }) => {
    try {
      const result = axios.get(GET_GAMES_PLAYING_TYPES_URL).then((response) => {
        return response.data;
      });

      return result;
    } catch (error) {}
  }
);

export const Getgameswininglogs = createAsyncThunk(
  "bets/Getgameswininglogs",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      pageNumber: 1,
      pageSize: 10,
    };
    try {
      const result = axios
        .post(GET_GAMES_WININNG_LOGS_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const Getuseropengameplayed = createAsyncThunk(
  "bets/Getuseropengameplayed",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      email: payload?.email,
      pageNumber: payload?.pageNumber,
      pageSize: 10,
      startime: payload?.startime,
      endTime: payload?.endTime,
    };
    try {
      const result = axios
        .post(GET_OPEN_GAMES_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const Getuserclosedgameplayed = createAsyncThunk(
  "bets/Getuserclosedgameplayed",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      email: payload?.email,
      pageNumber: 1,
      pageSize: 10,
      startime: payload?.startime,
      endTime: payload?.endTime,
    };
    try {
      const result = axios
        .post(GET_CLOSED_GAMES_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const getWinningLogs = createAsyncThunk(
  "bets/getWinningLogs",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      pageNumber: 1,
      pageSize: 10,
      startime: payload?.startime,
      endTime: payload?.endTime,
    };
    try {
      const result = axios
        .post(GET_GAME_WINNING_LOG_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const getallgamesplayed = createAsyncThunk(
  "bets/Getallgamesplayed",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      pageNumber: 1,
      pageSize: 10,
    };
    try {
      const result = axios
        .post(GET_ALL_GAMES_PLAYED_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);
