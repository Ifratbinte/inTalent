"use client";

import { GoCircleSlash } from "react-icons/go";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { dateFormat } from "#helpers/date-time-format";
import { PaymentHistory } from "./TransactionHistories";

interface PropsHistory {
  history: PaymentHistory;
}

const TransactionHistory = ({ history }: PropsHistory) => {
  let ICON;
  let PLUS_MINUS;
  if (history.payment_type === "CREDITED") {
    ICON = <FaArrowUp className="text-green-600" />;
    PLUS_MINUS = <FaPlus />;
  } else if (history.payment_type === "DEBITED") {
    ICON = <FaArrowDown className="text-red-600" />;
    PLUS_MINUS = <FaMinus />;
  } else if (history.payment_type === "PENDING") {
    ICON = <GoCircleSlash className="text-yellow-600 font-extrabold" />;
    PLUS_MINUS = null;
  }
  return (
    <div className="py-2 my-1.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-[52px] h-[52px] bg-gray-200 rounded flex items-center justify-center">
          <p className="text-xl font-bold">{ICON}</p>
        </div>
        <div>
          <h5 className="text-base font-semibold">{history.title}</h5>
          <p className="text-gray-500 text-sm pt-[5px]">
            {dateFormat(history.created_at)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <p className="font-bold">{PLUS_MINUS}</p>
        <h3 className="font-semibold text-xl"> $ {history.amount}</h3>
      </div>
    </div>
  );
};

export default TransactionHistory;
