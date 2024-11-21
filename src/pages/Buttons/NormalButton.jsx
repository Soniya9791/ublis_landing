import React from "react";

const NormalButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold w-[100%] py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
    >
      {label}
    </button>
  );
};

export default NormalButton;
