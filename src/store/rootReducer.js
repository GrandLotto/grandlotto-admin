import { combineReducers } from "redux";

import authSlice from "./authSlice/authSlice";
import alertSlice from "./alert/alertSlice";
import betSlice from "./betSlice/betSlice";
import walletSlice from "./wallet/walletSlice";

const rootReducer = combineReducers({
  oauth: authSlice,
  alert: alertSlice,
  bets: betSlice,
  wallet: walletSlice,
});

export default rootReducer;
