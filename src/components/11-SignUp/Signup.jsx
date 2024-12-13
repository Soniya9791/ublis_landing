import logo from "../../assets/logo/logo.jpeg";
import { Stepper } from "../../pages/Stepper/Stepper";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  console.log("navigate", navigate);
  return (
    <div
      className="w-[100%] pt-20 bg-[#f9f3eb] h-[auto] lg:h-screen flex flex-col justify-around"
      align="center"
    >
      <div className="w-[100%] h-auto flex flex-col lg:flex-row">
        <div className="w-[100%] lg:w-[40%]  flex flex-col justify-center items-center">
          <div>
            <img src={logo} className="mt-5 w-[150px]" alt="logo" />
          </div>
          <h1 className="text-[#000] text-[30px] pt-2 font-normal">
            Create an Account
          </h1>
          <h1 className="text-[#000] text-[20px] pt-2 font-bold">
            Sign Up to access <span className="text-[#ff5001]">Ublis Yoga</span>{" "}
            Login
          </h1>
        </div>
        <div className="w-[100%] lg:w-[60%] h-[auto] lg:h-[75vh] flex flex-col justify-center items-center">
          <div className="w-[100%] py-5" align="center">
            <div className="w-[90%] lg:w-[80%]">
              <Stepper />
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5 lg:pb-0">
        <h1
          className="text-[#000] cursor-pointer text-[18px] font-semibold"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Already Have an Account?
        </h1>
        <h1
          className="text-[#ff5001] cursor-pointer mt-3 text-[20px] font-semibold"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Site <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </h1>
      </div>
    </div>
  );
}
