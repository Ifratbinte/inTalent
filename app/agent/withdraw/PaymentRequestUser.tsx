"use client";

import React from "react";
import { Avatar } from "@mui/material";

const PaymentRequestUser = () => {
  return (
    <div className="ms-4 mb-6">
      <p className="text-gray-500 text-xs mb-4">10 January 2024</p>

      <h4 className="text-base font-bold">Event Name</h4>
      <p className="text-gray-800 text-sm font-semibold">Requested by</p>
      <div className=" flex gap-3 items-center justify-start mt-2">
        <Avatar
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhSQvv3dMnARcYTw8OgAHRZj7_ZgbKpefXQ&usqp=CAU"
          }
          alt={"first_name"}
        />
        <div>
          <h4 className="font-semibold text-base">John Cena</h4>
          <p className="text-xs text-gray-500">Wrestler</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestUser;
