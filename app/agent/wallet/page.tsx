"use client";

import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import wallet from "../../db/wallet.json";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import WalletPaymentInfo from "#components/common/wallet/WalletPaymentInfo";
import WalletCurrentBalance from "#components/common/wallet/WalletCurrentBalance";
import TransactionHistories from "#components/common/wallet/TransactionHistories";

const Wallet = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Wallet",
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
      <WalletCurrentBalance balance={"1000.00"}>
        Current Balance
      </WalletCurrentBalance>

      <WalletPaymentInfo paymentDetails={wallet.paymentDetails}>
        Withdrawal requests
      </WalletPaymentInfo>

      <div className="py-[.8px] bg-gray-300 w-full" />

      <TransactionHistories histories={wallet.histories} />

      <div className="py-[5px] rounded-lg bg-[#270341] mt-32 mx-28 mb-1" />
    </div>
  );
};

export default Wallet;
