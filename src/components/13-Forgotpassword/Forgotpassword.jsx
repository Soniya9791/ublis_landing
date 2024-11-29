import React, { useState } from "react";
import logo from "../../assets/logo/logo.jpeg";

import { useNavigate } from "react-router-dom";
import TextInput from "../../pages/Inputs/TextInput";
import NormalButton from "../../pages/Buttons/NormalButton";
import Axios from "axios";
import CryptoJS from "crypto-js";

import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";

import { useInterval } from "primereact/hooks";

const Forgetpassword = () => {
  const navigate = useNavigate();

  const [token, setTokens] = useState();
  const [seconds, setSeconds] = useState(45);
  const [active, setActive] = useState(false);
  const [showOtpBlock, setShowOtpBlock] = useState(false);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState(0);

  useInterval(
    () => {
      setSeconds((prevSecond) => {
        if (prevSecond === 1) {
          setActive(false);
          return 0;
        }
        return prevSecond - 1;
      });
    },
    1000,
    active
  );

  const decrypt = (encryptedData, iv, key) => {
    const decrypted = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Hex.parse(encryptedData),
      },
      CryptoJS.enc.Hex.parse(key),
      {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // Convert decrypted data to UTF-8 string and then parse it as JSON
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

    // Parse the string into a JSON object
    return JSON.parse(decryptedString);
  };

  const customInput = ({ events, props }) => {
    return (
      <>
        <input
          {...events}
          {...props}
          type="text"
          className="custom-otp-input-sample"
        />
        {props.id === 2 && (
          <div className="px-3">
            <i className="pi pi-minus" />
          </div>
        )}
      </>
    );
  };

  const [inputs, SetInputs] = useState({
    username: "",
  });

  const [errorstatus, setErrorStatus] = useState({
    errorstatus: false,
    errormessage: "",
  });

  const handleinput = (event) => {
    setErrorStatus({
      errorstatus: false,
      errormessage: "",
    });

    SetInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handlesubmit = () => {
    setLoading(true);

    if (inputs.username.length <= 0) {
      setErrorStatus({
        errorstatus: true,
        errormessage: "Enter Username",
      });

      setLoading(false);
      return;
    }

    if (inputs.password.length <= 0) {
      setErrorStatus({
        errorstatus: true,
        errormessage: "Enter Password",
      });
      setLoading(false);
      return;
    }
  };

  const handleVerifyClick = () => {
    Axios.post(import.meta.env.VITE_API_URL + "forgotPassword/idCheck", {
      validateText: inputs.username,
    })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);

        console.log(data);
        if (data.success && data.validation) {
          setId(data.id);
          setShowOtpBlock(true);
          setSeconds(45);
          setActive(true);
        } else if (!data.validation && data.success) {
          console.log("User name not found in DB");
        } else if (!data.success && !data.validation) {
          console.log("Internal Server error - Gotcha soon");
        }
      })
      .catch((error) => {
        console.log("Error --- ", error);
      });
  };

  const handleResendCode = () => {
    setSeconds(45); // Reset timer
    setActive(true); // Restart countdown
  };

  const handleSubmitCode = () => {
    if (token) {
      console.log(`Submitted OTP: ${token}`);
    } else {
      console.log("No OTP entered.");
    }
  };

  return (
    <div>
      <div className="py-[20vh] flex justify-center items-center bg-[#f9f3eb]">
        <div
          className="w-[90%] lg:w-[40%] h-[auto] lg:h-[auto] bg-[#fff] rounded"
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
          align="center"
        >
          <div className="w-[80%] lg:w-[70%]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlesubmit();
              }}
            >
              <img src={logo} className="mt-2 w-[120px]" alt="logo" />

              {!showOtpBlock && (
                <div className="forgotDataEnter">
                  <div
                    className="mb-[20px] flex flex-wrap  justify-between"
                    align="start"
                  >
                    <div className="w-[75%] lg:w-[75%]">
                      <TextInput
                        id="userid"
                        name="username"
                        label="Enter valid Username or Email"
                        placeholder="Enter your username"
                        value={inputs.username}
                        onChange={(e) => {
                          handleinput(e);
                        }}
                      />
                    </div>
                    <div
                      onClick={handleVerifyClick}
                      className="w-[30%] lg:w-[20%] border-2 border-[#ff621b] bg-[#ff621b] text-[#fff] hover:bg-[#fff] hover:text-[#ff621b] transition-all duration-300 cursor-pointer font-bold rounded text-center text-[15px] flex justify-center items-center"
                    >
                      Verify
                    </div>
                  </div>
                </div>
              )}

              {showOtpBlock && (
                <div className="forgotOTPClass">
                  <div className="flex justify-content-center">
                    <style scoped>
                      {`
                    .custom-otp-input-sample {
                        width: 48px;
                        height: 48px;
                        font-size: 24px;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        border-radius: 0;
                        border: 1px solid var(--surface-400);
                        background: transparent;
                        outline-offset: -2px;
                        outline-color: transparent;
                        border-right: 0 none;
                        transition: outline-color 0.3s;
                        color: var(--text-color);
                    }

                    .custom-otp-input-sample:focus {
                        outline: 2px solid var(--primary-color);
                    }

                    .custom-otp-input-sample:first-child,
                    .custom-otp-input-sample:nth-child(5) {
                        border-top-left-radius: 12px;
                        border-bottom-left-radius: 12px;
                    }

                    .custom-otp-input-sample:nth-child(3),
                    .custom-otp-input-sample:last-child {
                        border-top-right-radius: 12px;
                        border-bottom-right-radius: 12px;
                        border-right-width: 1px;
                        border-right-style: solid;
                        border-color: var(--surface-400);
                    }
                `}
                    </style>
                    <div className="flex flex-column align-items-center">
                      <p className="font-bold text-xl mb-2">
                        Authenticate Your Account
                      </p>
                      <p className="text-color-secondary block mb-5">
                        Please enter the code sent to your Email.
                      </p>
                      <InputOtp
                        value={token}
                        onChange={(e) => setTokens(e.value)}
                        length={6}
                        inputTemplate={customInput}
                        style={{ gap: 0 }}
                      />
                      <div className="flex justify-content-between mt-5 align-self-stretch">
                        <p>
                          {seconds > 0 ? `00:${seconds} Sec` : "Resend Code"}
                        </p>
                        <Button
                          label={seconds === 0 ? "Resend Code" : "Submit Code"}
                          onClick={
                            seconds === 0 ? handleResendCode : handleSubmitCode
                          }
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-[100%] mt-3">
                {loading ? (
                  <>
                    <svg className="loadersvg my-4" viewBox="25 25 50 50">
                      <circle
                        className="loadercircle"
                        r="20"
                        cy="50"
                        cx="50"
                      ></circle>
                    </svg>
                  </>
                ) : (
                  <NormalButton
                    onClick={() => {
                      handlesubmit();
                    }}
                    label="Sign In"
                  />
                )}
              </div>
              <div className="mt-4">
                <h1
                  className="text-[#ff5001] cursor-pointer mt-3 mb-3 text-[20px] font-semibold"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Site{" "}
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
