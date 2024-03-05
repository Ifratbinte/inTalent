import { Modal } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element | JSX.Element[];
}

const BaseModal: React.FC<Props> = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      style={{ backdropFilter: "blur(2px)" }}>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white rounded w-[90%] min-w-[250px] p-5">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default BaseModal;

{
  /* <BaseModal open={modal === "INVITATION_click"} handleClose={handleClose}>
        {
          <>
            <div className="flex flex-col items-center justify-center gap-2 my-5">
              <IoDocumentTextOutline size={70} color="gray" className="mb-5" />
              <h4 id="parent-modal-title" className="text-center ">
                You received a new proposal from Hatch Co.
              </h4>
            </div>
            <div>
              <h5 className="  text-base text-slate-600">Event</h5>
              <h5>Dubai Fashion week</h5>
            </div>
            <div className="flex gap-2 py-1 mt-5">
              <div className="w-1/2">
                <h5 className="  text-base text-slate-600">Hourly rate</h5>
                <h4>$25.00 usd</h4>
              </div>
              <div className="w-1/2">
                <h5 className="  text-base text-slate-600">Total hour</h5>
                <h4>10</h4>
              </div>
            </div>
            <div>
              <h5 className=" mt-3 text-base text-slate-600">
                Additional notes
              </h5>
              <p className="  text-sm" id="parent-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, quaerat ad! Harum repellat a eaque enim, temporibus
                quod amet modi quia est laboriosam consequatur nemo in eos
                tempora esse? Laboriosam.
              </p>
            </div>

            <Button label="Accept Contract" variant="secondary" type="submit" />
            <Button
              label=" reject proposal"
              variant="outline-secondary"
              type="button"
            />
          </>
        }
      </BaseModal> */
}
