"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { InputAdornment, TextField } from "@mui/material";

import TransactionHistory from "./TransactionHistory";

export type PaymentHistory = {
  title: string;
  payment_type: "CREDITED" | "DEBITED" | "PENDING" | string;
  amount: number | string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

interface PropsHistories {
  histories: PaymentHistory[];
}

const TransactionHistories = ({ histories }: PropsHistories) => {
  const [filtered, setFiltered] = useState(histories);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchFiltered = histories
      .slice()
      .filter((history: any) =>
        history.title.toLocaleLowerCase().includes(e.target.value)
      );
    setFiltered(searchFiltered);
  };

  return (
    <div className="px-4">
      <h1 className="font-bold text-base text-gray-800 mt-5 mb-4">
        Transaction history
      </h1>
      <TextField
        onChange={handleChange}
        sx={{ width: "100%", margin: "0 0 10px" }}
        id="outlined-basic"
        label="Search transaction..."
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IoIosSearch className="text-[25px]" />
            </InputAdornment>
          ),
        }}
      />
      <div className="mt-1">
        {filtered.map((history: any) => (
          <TransactionHistory key={crypto.randomUUID()} history={history} />
        ))}
      </div>
    </div>
  );
};

export default TransactionHistories;
