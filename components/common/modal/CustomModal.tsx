import React from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  confirmation_text: string;
  isEvent?:boolean;
  small_text?:string;
}

const CustomModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  confirmation_text,
  isEvent,
  small_text,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Modal"
    className={{
      base: "relative bg-white top-52 p-4 w-[320px] ml-5 opacity-100 rounded-lg",
      afterOpen: "modal-base_after-open",
      beforeClose: "modal-base_before-close",
    }}
    overlayClassName={{
      base: "overlay-base",
      afterOpen: "overlay-base_after-open",
      beforeClose: "overlay-base_before-close",
    }}
    shouldCloseOnOverlayClick={true}
    closeTimeoutMS={2000}
    ariaHideApp={false}
  >
    <div className="relative flex flex-col justify-center items-center p-5 w-full">
      <button
        className="absolute right-1 top-1 text-gray-400"
        onClick={onRequestClose}
      >
        <FaTimes />
      </button>
      <img src="/images/icon/success.png" alt="" />
      <h3 className="text-lg font-medium text-center pt-3">
        {confirmation_text}
      </h3>
      {isEvent&& <p className="text-base font-normal text-center pt-3">{small_text}</p> }

    </div>
  </Modal>
);
export default CustomModal;
