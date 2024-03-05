"use client";

import React from "react";

interface PropsType {
  balance: string;
  children: React.ReactNode;
}

const WalletCurrentBalance = ({ balance, children }: PropsType) => {
  return (
    <div className="my-6 px-4">
      <div className="flex flex-col justify-center items-center shadow-2xl rounded-xl py-[28px]">
        <h1 className="text-2xl font-bold">${balance}</h1>
        <p className="text-sm text-gray-600 pt-1"> {children} </p>
      </div>
    </div>
  );
};

export default WalletCurrentBalance;
