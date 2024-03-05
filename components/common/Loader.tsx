import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[80vh]">
      <HashLoader color="#532c6d" size={40} />
    </div>
  );
};

export default Loader;
