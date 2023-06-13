import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllroles,
  getkycpendingusers,
  getUserInfo,
  getuserlist,
} from "../store/authSlice/actions";
import { setRefreshing } from "../store/authSlice/authSlice";
import {
  getAllgames,
  getallgamesplayed,
  getgamesgroup,
  getgamestype,
  getunvalidatedexpiredgames,
  getValidatedgames,
  getWinningLogs,
} from "../store/betSlice/actions";
import {
  getAccountBalances,
  getAdminCount,
  getAllDepositlogs,
  getAllWithdrawfundrequest,
  getUserAccount,
} from "../store/wallet/actions";

const AllApiCalls = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const refreshing = useSelector((state) => state.oauth.refreshing);

  useEffect(() => {
    if (refreshing === true) {
      if (user) {
        // console.log(user);
        dispatch(getUserInfo(user?.email));
        dispatch(getAccountBalances(user?.email));
        dispatch(getUserAccount(user?.email));
        dispatch(getAdminCount());

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
          getallgamesplayed({
            pageNumber: 1,
            pageSize: 10,
          })
        );
        dispatch(
          getValidatedgames({
            pageNumber: 1,
            pageSize: 10,
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
        dispatch(getgamesgroup());
        dispatch(getAllgames());
        dispatch(getunvalidatedexpiredgames());
        dispatch(getuserlist());
        dispatch(getkycpendingusers());
        dispatch(getAllroles());

        // dispatch(getacceptedid());
        // dispatch(getacceptedpayment());
        // dispatch(getCountryBanks("NG"));
      }

      // dispatch(Getgameswininglogs());
      // dispatch(getgames());
      dispatch(getgamestype());
      // dispatch(getgamesplayingtype());

      setTimeout(() => {
        dispatch(setRefreshing(false));
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);
  return null;
};

export default AllApiCalls;
