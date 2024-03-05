import { Box, Modal } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  style?: { [key: string]: string | number };
}

const EventFinishContractModal: React.FC<Props> = ({
  open,
  handleClose,
  style = {},
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white rounded w-[90%] min-w-[250px] p-5">
          <h2 id="parent-modal-title">Finish contract modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default EventFinishContractModal;
