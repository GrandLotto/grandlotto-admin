import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getacceptedid,
  getAllroles,
  getkycpendingusers,
  getUserInfo,
  getuserlist,
} from "../store/authSlice/actions";
import { setRefreshing } from "../store/authSlice/authSlice";
import {
  getAllgames,
  getgames,
  getgamesplayingtype,
  getgamestype,
  Getgameswininglogs,
  Getuserclosedgameplayed,
  Getuseropengameplayed,
  getWinningLogs,
} from "../store/betSlice/actions";
import {
  getacceptedpayment,
  getAccountBalances,
  getAllDepositlogs,
  getAllWithdrawfundrequest,
  getCountryBanks,
  getDepositlogs,
  getUserAccount,
  getWithdrawfundrequest,
} from "../store/wallet/actions";
import { isUserAnAdmin } from "./customFunctions";

const AllApiCalls = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const refreshing = useSelector((state) => state.oauth.refreshing);
  const userOpenBetsPage = useSelector((state) => state.bets.userOpenBetsPage);
  const userCloseBetsPage = useSelector(
    (state) => state.bets.userCloseBetsPage
  );

  useEffect(() => {
    if (refreshing === true) {
      if (user) {
        // console.log(user);
        dispatch(getUserInfo(user?.email));
        dispatch(getAccountBalances(user?.email));
        dispatch(getUserAccount(user?.email));
        dispatch(
          Getuseropengameplayed({
            email: user?.email,
            pageNumber: userOpenBetsPage,
            pageSize: 10,
            startime: null,
            endTime: null,
          })
        );
        dispatch(
          Getuserclosedgameplayed({
            email: user?.email,
            pageNumber: userCloseBetsPage,
            pageSize: 10,
            startime: null,
            endTime: null,
          })
        );
        dispatch(
          getWithdrawfundrequest({
            email: user?.email,
            pageNumber: 1,
            pageSize: 10,
            startime: null,
            endTime: null,
          })
        );
        dispatch(
          getDepositlogs({
            email: user?.email,
            pageNumber: 1,
            pageSize: 10,
            startime: null,
            endTime: null,
          })
        );

        if (
          user &&
          user?.roles?.length &&
          isUserAnAdmin(user?.roles) === true
        ) {
          dispatch(
            getWinningLogs({
              email: user?.email,
              pageNumber: 1,
              pageSize: 10,
              startime: null,
              endTime: null,
            })
          );
          dispatch(
            getAllWithdrawfundrequest({
              email: user?.email,
              pageNumber: 1,
              pageSize: 10,
              startime: null,
              endTime: null,
            })
          );
          dispatch(
            getAllDepositlogs({
              email: user?.email,
              pageNumber: 1,
              pageSize: 10,
              startime: null,
              endTime: null,
            })
          );
          dispatch(getAllgames());
          dispatch(getuserlist());
          dispatch(getkycpendingusers());
          dispatch(getAllroles());
        }

        dispatch(getacceptedid());
        dispatch(getacceptedpayment());
        dispatch(getCountryBanks("NG"));
      }

      dispatch(Getgameswininglogs());
      dispatch(getgames());
      dispatch(getgamestype());
      dispatch(getgamesplayingtype());

      setTimeout(() => {
        dispatch(setRefreshing(false));
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);
  return null;
};

export default AllApiCalls;
