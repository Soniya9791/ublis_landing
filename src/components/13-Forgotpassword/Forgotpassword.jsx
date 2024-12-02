import React, { useState } from "react";
import logo from "../../assets/logo/logo.jpeg";

import { useNavigate } from "react-router-dom";
import TextInput from "../../pages/Inputs/TextInput";
import Axios from "axios";
import CryptoJS from "crypto-js";
import { IoWarningOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";
import { useInterval } from "primereact/hooks";
import PasswordInput from "../../pages/Inputs/PasswordInput";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";

const Forgetpassword = () => {
  const navigate = useNavigate();

  const [token, setTokens] = useState();
  const [seconds, setSeconds] = useState(45);
  const [active, setActive] = useState(false);
  const [showOtpBlock, setShowOtpBlock] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [stepper1Msg, setStepper1Msg] = useState(0);
  const [resendMailText, setResendMailText] = useState(true);
  const [stepper2Msg, setStepper2Msg] = useState(0);
  const [successState, setSuccessState] = useState(false);
  const [pasMisMatch, setPasMisMatch] = useState(0);

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
    newPassword: "",
    conformPassword: "",
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

  const handleVerifyClick = () => {
    setLoading1(true);
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
          setShowOtpBlock(1);
          setSeconds(45);
          setActive(true);
          setStepper1Msg(0);
        } else if (!data.validation && data.success) {
          console.log("User name not found in DB");
          setStepper1Msg(1);
        } else if (!data.success && !data.validation) {
          console.log("Internal Server error - Gotcha soon");
          setStepper1Msg(2);
        }
        setLoading1(false);
      })
      .catch((error) => {
        setLoading1(false);

        console.log("Error --- ", error);
      });
  };

  const handleResendMailCode = () => {
    setLoading3(true);
    Axios.post(import.meta.env.VITE_API_URL + "forgotPassword/idCheck", {
      id: id,
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
          setSeconds(45);
        } else if (!data.validation && data.success) {
          console.log("User name not found in DB");
        } else if (!data.success && !data.validation) {
          console.log("Internal Server error - Gotcha soon");
        }
        setLoading3(false);
        setResendMailText(false);
      })
      .catch((error) => {
        setLoading3(false);

        console.log("Error --- ", error);
      });
  };

  const handleVerifyOtp = () => {
    setLoading2(true);
    console.log("inputs.username", inputs.username);
    Axios.post(import.meta.env.VITE_API_URL + "forgotPassword/otpValidate", {
      id: id,
      otp: token,
    })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);

        if (data.success == true && data.validation == true) {
          setId(data.refStId);
          setShowOtpBlock(2);
        } else if (data.success == true && data.validation == false) {
          setStepper2Msg(1);
        } else {
          setStepper2Msg(2);
        }

        setLoading2(false);
      })
      .catch((error) => {
        setLoading2(false);

        console.log("Error --- ", error);
      });
  };

  const handleChangePassword = () => {
    if (inputs.newPassword.length < 8) {
      setPasMisMatch(1);
      return 0;
    }

    if (inputs.conformPassword != inputs.newPassword) {
      setPasMisMatch(2);
      return 0;
    }
    setPasMisMatch(0);
    setLoading4(true);
    Axios.post(import.meta.env.VITE_API_URL + "forgotPassword/changePassword", {
      id: id,
      password: inputs.newPassword,
    })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);

        if (data.success == true) {
          swal({
            title: "Request To Change Password",
            text: "Your Password Is Changed Successfully",
            icon: "success",
            customClass: {
              title: "swal-title",
              content: "swal-text",
            },
          });
        } else {
          swal({
            title: "Request To Change Password",
            text: "Password Not Changed, Try After Some Time",
            icon: "error",
            customClass: {
              title: "swal-title",
              content: "swal-text",
            },
          });
        }
        setLoading4(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading4(false);

        console.log("Error --- ", error);
      });
  };

  const handleResendCode = () => {
    setSeconds(45); // Reset timer
    setActive(true); // Restart countdown
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
            <img src={logo} className="mt-2 w-[120px]" alt="logo" />
            <h1 className="py-2 text-[#ff5001] text-[25px] font-bold">
              Reset Password
            </h1>

            {showOtpBlock == 0 ? (
              <div className="forgotDataEnter">
                <div
                  className="mb-[20px] mt-[2.5rem] flex flex-wrap  justify-between"
                  align="start"
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                    className="w-[100%]"
                  >
                    <div className="w-[100%] lg:w-[100%]">
                      <TextInput
                        id="userid"
                        name="username"
                        label="Enter valid Username or Email"
                        placeholder="Enter your username"
                        value={inputs.username}
                        required
                        onChange={(e) => {
                          handleinput(e);
                        }}
                      />
                    </div>
                    <div>
                      {stepper1Msg == 1 ? (
                        <h3 className="w-[100%] flex justify-start m-[2px] text-[#ff0000] italic">
                          <IoWarningOutline className="mt-[2px] mr-[2px]" />{" "}
                          username or email is invalid
                        </h3>
                      ) : stepper1Msg == 2 ? (
                        <h3 className="w-[100%] flex justify-start m-[2px] text-[#ff0000] italic">
                          <IoWarningOutline className="mt-[2px] mr-[2px]" />
                          may be some problem, try after some time
                        </h3>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {loading1 ? (
                        <div className="flex justify-center">
                          <svg className="loadersvg my-4" viewBox="25 25 50 50">
                            <circle
                              className="loadercircle"
                              r="20"
                              cy="50"
                              cx="50"
                            ></circle>
                          </svg>
                        </div>
                      ) : (
                        <Button
                          onClick={handleVerifyClick}
                          className="w-[100%] h-[2.5rem] my-[1.5rem] lg:w-[100%] border-2 border-[#ff621b] bg-[#ff621b] text-[#fff] hover:bg-[#fff] hover:text-[#ff621b] transition-all duration-300 cursor-pointer font-bold rounded text-center text-[15px] flex justify-center items-center"
                        >
                          Verify
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            ) : showOtpBlock == 1 ? (
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
                        outline: 2px solid #f95005;
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
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
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
                        readOnly={loading2 ? true : false}
                      />
                      {stepper2Msg == 0 ? (
                        <></>
                      ) : (
                        <div className="my-[1rem]">
                          {stepper2Msg == 1 ? (
                            <h3 className="w-[100%] flex justify-start m-[2px] text-[#ff0000] italic">
                              <MdNoEncryptionGmailerrorred className="mr-[.5rem]" />
                              Invalid or Expired OTP
                            </h3>
                          ) : (
                            <h3 className="w-[100%] flex justify-start m-[2px] text-[#ff0000] italic">
                              <IoWarningOutline className="mt-[1px] mr-[.5rem]" />
                              may be some problem, try after some time
                            </h3>
                          )}
                        </div>
                      )}

                      <div className="flex justify-content-between mt-5 align-self-stretch">
                        {resendMailText ? (
                          <p className="align-content-center ">
                            {seconds > 0 ? (
                              `00:${seconds} Sec`
                            ) : loading3 ? (
                              <svg
                                className="loadersvg flex justify-center"
                                viewBox="25 25 50 50"
                              >
                                <circle
                                  className="loadercircle"
                                  r="20"
                                  cy="50"
                                  cx="50"
                                ></circle>
                              </svg>
                            ) : (
                              <Button
                                className="hover:text-[#f95005] hover:italic "
                                label={"Resend Code"}
                                onClick={handleResendMailCode}
                              ></Button>
                            )}
                          </p>
                        ) : (
                          <h3 className="w-[100%] flex justify-start m-[2px] text-[#0dce54] italic">
                            <GiCheckMark className="mt-[1px] mr-[2px]" />
                            Code Resent
                          </h3>
                        )}

                        <div className="w-[50%]">
                          {loading2 ? (
                            <svg
                              className="loadersvg flex justify-center"
                              viewBox="25 25 50 50"
                            >
                              <circle
                                className="loadercircle"
                                r="20"
                                cy="50"
                                cx="50"
                              ></circle>
                            </svg>
                          ) : (
                            <Button
                              className="hover:text-[#f95005] hover:italic"
                              label={"Submit Code"}
                              onClick={handleVerifyOtp}
                            ></Button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="forgotPasswordClass w-[100%]">
                <div className="flex justify-content-center w-[100%] ">
                  <div className="flex flex-column align-items-center w-[100%] ">
                    <form
                      className="w-[100%]"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="w-[100%] my-[1.5rem]">
                        <PasswordInput
                          id="newPassword"
                          name="newPassword"
                          label="New Password"
                          value={inputs.newPassword}
                          onChange={(e) => {
                            handleinput(e);
                          }}
                          helperText="Password should be at least 8 characters."
                          maxLength={30}
                        />
                      </div>
                      <div className="w-[100%] my-[1.5rem]">
                        <PasswordInput
                          id="conformPassword"
                          name="conformPassword"
                          label="Conform Password"
                          value={inputs.conformPassword}
                          onChange={(e) => {
                            handleinput(e);
                          }}
                          helperText="Password should be at least 8 characters."
                          maxLength={30}
                        />
                      </div>
                      {pasMisMatch == 1 ? (
                        <div>
                          <h3 className="w-[100%] flex justify-start m-[2px] text-[#ff0000] italic">
                            <IoWarningOutline className="mt-[1px] mr-[.5rem]" />
                            Password should be at least 8 characters
                          </h3>
                        </div>
                      ) : pasMisMatch == 2 ? (
                        <div>
                          <h3 className="w-[100%] flex justify-start m-[2px] text-[#ff0000] italic">
                            <IoWarningOutline className="mt-[1px] mr-[.5rem]" />
                            new password & conform password must be same
                          </h3>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div>
                        {loading4 ? (
                          <div className="flex justify-center">
                            <svg
                              className="loadersvg my-4"
                              viewBox="25 25 50 50"
                            >
                              <circle
                                className="loadercircle"
                                r="20"
                                cy="50"
                                cx="50"
                              ></circle>
                            </svg>
                          </div>
                        ) : (
                          <Button
                            onClick={handleChangePassword}
                            className="w-[100%] h-[2.5rem] my-[1.5rem] lg:w-[100%] border-2 border-[#ff621b] bg-[#ff621b] text-[#fff] hover:bg-[#fff] hover:text-[#ff621b] transition-all duration-300 cursor-pointer font-bold rounded text-center text-[15px] flex justify-center items-center"
                          >
                            Change Password
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="w-[100%] mt-3">
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
              </div> */}
            <div className="mt-4">
              <h1
                className="text-[#ff5001] cursor-pointer mt-3 mb-3 text-[20px] font-semibold"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Back to Login{" "}
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
