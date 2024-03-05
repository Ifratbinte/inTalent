"use client";

import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import PaymentRequestUser from "./PaymentRequestUser";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import PaymentSummary from "#components/common/wallet/PaymentSummary";
import WithdrawalDetails from "#components/common/wallet/WithdrawalDetails";
import WalletCurrentBalance from "#components/common/wallet/WalletCurrentBalance";

const Withdraw = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Withdrawal request",
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
      <WalletCurrentBalance balance={"1200.70"}>
        Current Balance
      </WalletCurrentBalance>

      <PaymentRequestUser></PaymentRequestUser>

      <WithdrawalDetails />

      <div className="py-[.8px] bg-gray-300 mt-10 w-full" />

      <PaymentSummary btnLabel={"SEND PAYMENT"}>
        Your payment was sent successfully
      </PaymentSummary>

      <div className="py-[5px] rounded-lg bg-black mt-32 mx-28 mb-1" />
    </div>
  );
};

export default Withdraw;
