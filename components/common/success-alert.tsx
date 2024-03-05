import React from 'react';
import Modal from 'react-modal';
interface AlertProps {
  title: string;
  isOpen: boolean;
  //   onClose: () => void;
  onclickOpen: () => void;
}

const SuccessAlert: React.FC<AlertProps> = ({ title, isOpen, onclickOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onclickOpen}
      contentLabel="Modal"
      id="signIn"
      className={{
        base: 'modal-base rounded-3xl !w-[27%] h',
        afterOpen: 'modal-base_after-open',
        beforeClose: 'modal-base_before-close'
      }}
      overlayClassName={{
        base: 'overlay-base',
        afterOpen: 'overlay-base_after-open',
        beforeClose: 'overlay-base_before-close'
      }}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={2000}>
      <div className="flex flex-col items-center">
        {/* <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
          Close
        </button> */}
        <img src="/images/icon/success.png" alt="" />
        <div className="text-xl font-lato font-semibold">{title}</div>
      </div>
    </Modal>
  );
};

export default SuccessAlert;
