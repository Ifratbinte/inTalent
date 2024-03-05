"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  height: 260,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
};

interface AlertProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PaymentVerified = ({ open, onClose, children }: AlertProps) => {
  return (
    <div className="flex justify-end items-center">
      <Modal
        keepMounted
        open={open}
        onClose={onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="flex justify-center">
              <img
                src="/images/icon/success.png"
                alt="success"
                className="w-16 h-[60px] mt-[44px]"
              />
            </div>
            <h5 className="text-xl font-semibold text-gray-700 text-center mt-8">
              {children}
            </h5>
            <p className="text-base text-gray-600 text-center mt-2 mb-8">
              You will receive an email confirmation
            </p>
          </div>
          ;
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentVerified;
