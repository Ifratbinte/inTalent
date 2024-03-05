import FormInputText from "#components/common/form/mui/FormInputText";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onclickOpen: () => void;
}

const EventCreate: React.FC<Props> = ({ isOpen, onclickOpen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow((prevState) => !prevState);
  };
  const handleClose = () => setShow(false);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onclickOpen}
      contentLabel="Modal"
      id="signIn"
      className={{
        base: "modal-base rounded-3xl lg:!w-[500px] sm:!w-[400px] !w-[350px]",
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
    >
      <div
        className="flex justify-between absolute top-10 left-10 bg-white w-80 h-96 mx-auto border-2 border-purple-500"
        onClick={handleOpen}
      >
        <div>modal</div>
        <FaTimes />
        {/* <FormInputText
          control={control}
          label="First Name"
          type="text"
          labelBG={false}
          multiline={false}
          name="firstName"
          rows={2}
        /> */}
      </div>
    </Modal>
  );
};
export default EventCreate;
