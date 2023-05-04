import React from "react";
import AddBankModal from "./AddBankModal";
import AlertModal from "./AlertModal";
import FnputCodeModal from "./FnputCodeModal";
import LogoutModal from "./LogoutModal";
import PageLoading from "./PageLoading";
import RedeemWinningModal from "./RedeemWinningModal";
import ComingSoonModal from "./ComingSoonModal";
import AlertModalBet from "./AlertModalBet";
import AlertSmallPopUp from "./AlertSmallPopUp";
import SearchCouponCodeModal from "./SearchCouponCodeModal";
import ConfirmModal from "./ConfirmModal";
import CreategameTypeModal from "./CreategameTypeModal";
import CreateGameModal from "./CreateGameModal";

const AllModal = () => {
  return (
    <>
      <AlertModal />
      <AlertSmallPopUp />
      <AlertModalBet />
      <PageLoading />
      <ConfirmModal />
      <LogoutModal />
      <AddBankModal />
      <RedeemWinningModal />
      <SearchCouponCodeModal />
      <FnputCodeModal />
      <ComingSoonModal />
      <CreategameTypeModal />
      <CreateGameModal />
    </>
  );
};

export default AllModal;
