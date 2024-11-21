import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="py-2 bg-[#ED5555] text-[#fff] rounded  transition-all duration-300">
      {message}
    </div>
  );
};

export default ErrorMessage;
