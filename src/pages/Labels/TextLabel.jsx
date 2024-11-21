import React from "react";

const TextLabel = ({
    label
}) => {
  return (
    <label className="text-[#ff5001] text-[16px] font-semibold">
      {label}
    </label>
  );
};

export default TextLabel;
