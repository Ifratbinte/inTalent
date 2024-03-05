"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import React, { useLayoutEffect } from "react";

import wallet from "../../db/wallet.json";
import { Button } from "#components/common/button";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import WalletPaymentInfo from "#components/common/wallet/WalletPaymentInfo";
import TransactionHistories from "#components/common/wallet/TransactionHistories";
import WalletCurrentBalance from "#components/common/wallet/WalletCurrentBalance";

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

      <div className="px-4">
        <Link href={"/talent/withdraw"}>
          <Button label="Withdrawal funds" variant="secondary" />
        </Link>
      </div>

      <WalletPaymentInfo paymentDetails={wallet.paymentDetails}>
        Pending Payment Requests
      </WalletPaymentInfo>

      <div className="py-[.8px] bg-gray-300 w-full" />

      <TransactionHistories histories={wallet.histories} />
      <div className="py-[5px] rounded-lg bg-[#270341] mt-32 mx-28 mb-1" />
    </div>
  );
};

export default Wallet;
