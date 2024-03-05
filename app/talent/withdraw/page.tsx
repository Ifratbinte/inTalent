"use client";

import { useDispatch } from "react-redux";
import React, { useLayoutEffect } from "react";

import { changePageCtx } from "#stores/pages/pageCtxSlice";
import PaymentSummary from "#components/common/wallet/PaymentSummary";
import WithdrawalDetails from "#components/common/wallet/WithdrawalDetails";
import WalletCurrentBalance from "#components/common/wallet/WalletCurrentBalance";

const Withdraw = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Withdraw",
        isSearchActive: false,
        isActiveShare: false,
        isBackActive: true,
        isCreateButtonActive: false,
        isFavoriteBtnActive: false,
      })
    );
  }, []);

  return (
    <div>
      <WalletCurrentBalance balance={"1200.00"}>
        Current Balance
      </WalletCurrentBalance>
      <WithdrawalDetails />

      <div className="py-[.8px] bg-gray-300 mt-10 w-full" />

      <PaymentSummary btnLabel={"REQUEST FOUNDS"}>
        Your withdraw request was sent successfully
      </PaymentSummary>

      <div className="py-[5px] rounded-lg bg-black mt-32 mx-28 mb-1" />
    </div>
  );
};

export default Withdraw;
