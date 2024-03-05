"use client";

import React, { useState } from "react";
import { FaPen } from "react-icons/fa";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import {
  Select,
  TextField,
  FormControl,
  SelectChangeEvent,
  InputAdornment,
} from "@mui/material";

const WithdrawalDetails = () => {
  const [select, setSelect] = useState<string>("");

  const handleChange = (e: SelectChangeEvent<typeof select>) => {
    setSelect(e.target.value);
  };

  return (
    <div className="mx-4 ">
      <div className="py-[10px] px-3 rounded-2xl bg-[#F2F0F4] ">
        <p className="text-gray-400 text-xs">Total amount</p>
        <h4 className="text-base text-gray-700 font-medium">
          $ {"200.50"} usd
        </h4>
      </div>

      <Box sx={{ margin: "16px 0" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Withdrawal Methods
          </InputLabel>
          <Select
            sx={{
              borderRadius: "16px",
              backgroundColor: "#F2F0F4",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"Visa card"}>Visa card</MenuItem>
            <MenuItem value={"Master card"}>Master card</MenuItem>
            <MenuItem value={"Dual currency"}>Dual currency</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        InputProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor: "#F2F0F4",
          },
          endAdornment: (
            <InputAdornment position="end">
              <FaPen />
            </InputAdornment>
          ),
        }}
        fullWidth
        label="Additional notes"
        id="Additional notes"
      />
    </div>
  );
};

export default WithdrawalDetails;
