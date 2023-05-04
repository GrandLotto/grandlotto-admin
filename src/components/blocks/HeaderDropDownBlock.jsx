import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogoutModal } from "../../store/alert/alertSlice";

const HeaderDropDownBlock = () => {
  const dispatch = useDispatch();

  // const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  return (
    <div className="header_top_dropDown">
      <div className="header_top_dropDown_card">
        <p>
          <Link to="/admin/dashboard" className="has_link">
            Dashboard
          </Link>
        </p>
        <p>
          <Link to="/admin/games/create-games" className="has_link">
            Create Games
          </Link>
        </p>
        <p>
          <Link to="/admin/games/validate-games" className="has_link">
            Validate Games
          </Link>
        </p>
        <p>
          <Link to="/admin/games/winnings" className="has_link">
            Winnings
          </Link>
        </p>
        <p>
          <Link to="/admin/transactions" className="has_link">
            All Transactions
          </Link>
        </p>

        <p>
          <a
            href="true"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                setLogoutModal({
                  status: true,
                  payload: null,
                })
              );
            }}
            className="has_link"
          >
            Logout
          </a>
        </p>
      </div>
    </div>
  );
};

export default HeaderDropDownBlock;
