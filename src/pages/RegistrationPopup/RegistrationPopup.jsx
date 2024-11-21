import React from "react";

const RegistrationPopup = ({ handlecloseregister, openregistration }) => {
  return (
    <div className="w-[100%] lg:w-[100%] h-[100vh] bg-black/80 blur-[0.2px]  flex justify-center items-center fixed z-50">
      <div className="w-[40%] text-[18px] bg-[#fff] py-4 px-3 flex flex-col rounded gap-y-3">
        <div className="w-full flex justify-center">
          <i class="text-[#f95005] text-[4rem] fa-solid fa-circle-info text-justify"></i>
        </div>
        <div className="flex">
          <p className=" text-center">
            We invite you to join our yoga classes! Please register for an
            account to start your journey to wellness today.
          </p>
        </div>
        <div className="mt-3 flex justify-around">
          <button
            className="w-[40%] py-2 bg-[red] text-[#fff] rounded"
            onClick={() => {
              handlecloseregister();
            }}
          >
            Close
          </button>
          <button
            className="w-[40%] py-2 bg-[#f95005] text-[#fff] rounded"
            onClick={() => {
              openregistration();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopup;
