"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../button";
import { RootState } from "#stores/store";
import PaymentVerified from "./PaymentVerified";
import {
  closePaymentSuccessModal,
  openPaymentSuccessModal,
} from "#stores/global/globalSlice";

interface PropsChildren {
  btnLabel: string;
  children: string | React.ReactNode;
}

const PaymentSummary = ({ children, btnLabel }: PropsChildren) => {
  const dispatch = useDispatch();
  const { isPaymentSuccess } = useSelector(
    (state: RootState) => state.globalState
  );

  const handleOpen = () => {
    dispatch(openPaymentSuccessModal());
  };
  const handleClose = () => {
    dispatch(closePaymentSuccessModal());
  };

  return (
    <div className="mx-4 mt-6">
      <PaymentVerified open={isPaymentSuccess} onClose={handleClose}>
        {children}
      </PaymentVerified>
      <h5 className="text-xl font-bold">Payment breakdown</h5>
      <div className="text-base font-semibold flex items-center justify-between my-3 text-gray-500">
        <p> Requested amount</p>
        <p>{"200.60"}</p>
      </div>
      <div className="text-2xl font-semibold flex items-center justify-between mb-[60px]">
        <p> Total</p>
        <p>{"200.60"}</p>
      </div>
      <Button label={btnLabel} onClick={handleOpen} variant="secondary" />
      <p className="mt-4 text-center text-gray-400 text-xs tracking-wide">
        inTalents legal mumbo jumbo about privacy of detected photos Aenean
        lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque
        ornare sem lacinia quam venenatis vestibulum.
      </p>
    </div>
  );
};

export default PaymentSummary;
