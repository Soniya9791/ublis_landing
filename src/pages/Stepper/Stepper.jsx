import React, { useEffect, useState } from "react";
import "./Stepper.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import CryptoJS from "crypto-js";
import TextInput from "../Inputs/TextInput";
import PasswordInput from "../Inputs/PasswordInput";
import ErrorMessage from "../Messages/ErrorMessage";
import UsernameInput from "../Inputs/UsernameInput";
import CountdownComponent from "../Countdown/Countdown";
import { Calendar } from "primereact/calendar";

export const Stepper = () => {
  const navigate = useNavigate();

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

  const [stepperactive, setStepperactive] = useState(1);

  // const handleNext = () => {
  //   setStepperactive((prev) => (prev < 2 ? prev + 1 : prev));
  // };

  // function myFormatToDatePicker(dateString) {
  //   const [year, month, day] = dateString.split("-");
  //   return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
  // }

  function datePickerToMyFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleBack = () => {
    setStepperactive((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const [input, setInput] = useState({
    fname: "",
    lname: "",
    dob: "",
    age: "",
    phoneno: "",
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const [verify, setVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);

  const handleinput = (event) => {
    if (event.target.name === "username") {
      const regex = /^[a-z0-9]*$/;

      if (regex.test(event.target.value)) {
        setInput({
          ...input,
          [event.target.name]: event.target.value,
        });
      }

      Axios.post(import.meta.env.VITE_API_URL + "users/validateUserName", {
        temp_su_username: event.target.value,
      })
        .then((res) => {
          const data = decrypt(
            res.data[1],
            res.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );

          if (data.success) {
            setVerify(true); // Username is valid
          } else {
            setVerify(false); // Username is invalid
          }
        })
        .catch((err) => {
          console.error("Error: ", err);
          setSubmitloadingStatus(false); // Turn off the loading spinner
          setFormerror2({
            errorstatus: true,
            errormessage:
              err.response?.data?.message ||
              "Something went wrong. Please try again.",
          });
        });
    } else if (event.target.name === "email") {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });

      Axios.post(import.meta.env.VITE_API_URL + "users/validateEmail", {
        temp_su_email: event.target.value,
      })
        .then((res) => {
          const data = decrypt(
            res.data[1],
            res.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );

          if (data.success) {
            setEmailVerify(true); // email is valid
          } else {
            setEmailVerify(false); // email is invalid
          }
        })
        .catch((err) => {
          console.error("Error: ", err);
          setSubmitloadingStatus(false); // Turn off the loading spinner
          setFormerror2({
            errorstatus: true,
            errormessage:
              err.response?.data?.message ||
              "Something went wrong. Please try again.",
          });
        });
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }

    setFormerror1({
      errorstatus: false,
      errormessage: "",
    });

    setFormerror2({
      errorstatus: false,
      errormessage: "",
    });
  };

  const handleinputdob = (event) => {
    const dobValue = event.target.value;

    const calculateAge = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    const age = calculateAge(dobValue);

    setInput({
      ...input,
      [event.target.name]: dobValue,
      age: age >= 0 ? age : "",
    });
  };

  const [hiddenpasswordStatus, setHiddenpasswordStatus] = useState(false);

  const [submitloadingStatus, setSubmitloadingStatus] = useState(false);

  const [successState, setSuccessState] = useState(false);

  const [formerror1, setFormerror1] = useState({
    errorstatus: false,
    errormessage: "",
  });

  const submitform1 = () => {
    if (input.fname.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter First Name",
      });

      return 0;
    }

    if (input.lname.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Last Name",
      });

      return 0;
    }

    if (input.dob.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Date of Birth",
      });

      return 0;
    }

    if (input.phoneno.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Mobile Number",
      });

      return 0;
    }

    if (input.phoneno.length != 10) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Valid Mobile Number",
      });

      return 0;
    }

    if (input.email.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Email",
      });

      return 0;
    }

    if (!verifyEmail(input.email)) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Valid Email",
      });

      return 0;
    }

    if (!emailVerify) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Email Already Exits",
      });

      return 0;
    }

    setStepperactive((prev) => (prev < 2 ? prev + 1 : prev));
  };

  function verifyEmail(email) {
    // Regular expression for validating an email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the pattern
    return emailPattern.test(email);
  }

  const [formerror2, setFormerror2] = useState({
    errorstatus: false,
    errormessage: "",
  });

  const submitform2 = () => {
    if (input.username.length < 6) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Username Must be Above 6 Characters",
      });

      return 0;
    }

    if (!verify) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Username Must be Unique",
      });

      return 0;
    }

    if (input.password.length <= 0) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Enter Password",
      });

      return 0;
    }

    if (input.password.length < 8) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Password Should be in Minimum 8 characters",
      });

      return 0;
    }

    if (input.repassword.length <= 0) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Enter Confirm Password",
      });

      return 0;
    }

    if (input.repassword != input.password) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Confirm Password Dosen't Match",
      });

      return 0;
    }

    setSubmitloadingStatus(true);

    const Dob = datePickerToMyFormat(input.dob);
    Axios.post(import.meta.env.VITE_API_URL + "users/signup", {
      temp_su_fname: input.fname,
      temp_su_lname: input.lname,
      temp_su_dob: Dob,
      temp_su_age: input.age,
      temp_su_phone: input.phoneno,
      temp_su_email: input.email,
      temp_su_username: input.username,
      temp_su_password: input.password,
    })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.success) {
          console.log("True part");
          setSuccessState(true);
          setTimeout(() => {
            navigate("/signin");
          }, 5000);
        } else {
          // If status is false in the response or an error status, handle it
          console.log("False part");
          setSubmitloadingStatus(false); // Turn off the loading spinner
          setFormerror2({
            errorstatus: true,
            errormessage: data.message || "An error occurred during signup.",
          });
        }
      })
      .catch((err) => {
        // Catching any 400 status or general errors
        console.error("Error: ", err);
        setSubmitloadingStatus(false); // Turn off the loading spinner
        setFormerror2({
          errorstatus: true,
          errormessage:
            err.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="w-[100%]">
      <div
        className="w-[100%] rounded bg-[#fff]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
      >
        {stepperactive === 1 && (
          <>
            <h1 className="pt-4 text-[#ff5001] text-[25px] font-bold">
              Your Personal Deatils
            </h1>
            <div className="w-[100%] h-[45vh] flex flex-col justify-center">
              <div className="w-[100%]" align="center">
                <div className="w-[90%] mb-4 lg:w-[80%] flex justify-between">
                  <div className="w-[49%]" align="start">
                    <TextInput
                      id="firstname"
                      name="fname"
                      type="text"
                      label="First Name"
                      placeholder="Write your message"
                      required
                      value={input.fname}
                      onChange={handleinput}
                    />
                  </div>
                  <div className="w-[49%] relative">
                    <TextInput
                      id="lastname"
                      name="lname"
                      type="text"
                      label="Last Name"
                      placeholder="Write your message"
                      required
                      value={input.lname}
                      onChange={handleinput}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%]" align="center">
                <div className="w-[90%] mb-3 lg:w-[80%] flex justify-between">
                  <div className="w-[49%]" align="start">
                    <TextInput
                      id="phoneno"
                      name="phoneno"
                      type="tel"
                      label="Phone Number"
                      placeholder="Write your message"
                      required
                      value={input.phoneno}
                      onChange={handleinput}
                    />
                  </div>
                  <div className="w-[49%] flex flex-col -mt-[13px]">
                    {/* <TextInput
                      id="dob"
                      name="dob"
                      type="date"
                      label="Date of Birth"
                      placeholder="Write your message"
                      required
                      value={input.dob}
                      onChange={handleinputdob}
                    /> */}

                    <label className="bg-[#fff] text-[#ff621b] -mb-[15px] z-50 w-[150px] ml-[10px] w-[100px]">
                      Date of Birth
                    </label>

                    <Calendar
                      label="Date of Birth"
                      className="relative w-full mt-1 h-10 px-3 placeholder-transparent transition-all border-2 rounded outline-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white dateInput"
                      value={input.dob}
                      onChange={handleinputdob}
                      required
                      name="dob"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%]" align="start">
                    {/* <TextInput
                      id="email"
                      name="email"
                      label="Email ID"
                      placeholder="Write your message"
                      required
                      value={input.email}
                      onChange={handleinput}
                    /> */}
                    <UsernameInput
                      id="email"
                      name="email"
                      label="Email"
                      value={input.email}
                      onChange={handleinput}
                      required
                      isInvalid={emailVerify}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full -mt-10 font-semibold">
              <div className="w-[90%] lg:w-[80%] transition-all duration-300">
                {formerror1.errorstatus ? (
                  <ErrorMessage message={formerror1.errormessage} />
                ) : null}
              </div>
            </div>
            <div className="w-[100%]" align="center">
              <div className="w-[80%]" align="end">
                <button
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  onClick={submitform1}
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </>
        )}
        {stepperactive === 2 && (
          <>
            <h1 className="pt-4 text-[#ff5001] text-[25px] font-bold">
              Your Login Details
            </h1>
            <div className="w-[100%] h-[45vh] flex flex-col justify-center">
              <div className="w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%]" align="start">
                    {/* <div className="relative">
                      <input
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Write your message"
                        required
                        value={input.username}
                        onChange={handleinput}
                        className={`relative w-full h-10 px-3 placeholder-transparent transition-all border-2 rounded outline-none focus-visible:outline-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
                      />
                      <label
                        htmlFor="username"
                        className={`cursor-text peer-focus:cursor-default -top-2.5 absolute left-2 z-[1] px-2 text-[14px] text-[#4c4c4e] transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:content-[] peer-focus:-top-2.5 peer-focus:text-[14px] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-white`}
                      >
                        Username
                      </label>
                    </div> */}
                    <UsernameInput
                      id="username"
                      name="username"
                      label="Username"
                      value={input.username}
                      onChange={handleinput}
                      required
                      isInvalid={verify}
                    />
                  </div>
                  {/* <div className="w-[10%] flex justify-center items-center">
                    {!verify && input.username.length === 0 ? (
                      <i className="text-[25px] text-[#94a3b8] fa-regular fa-circle-check"></i>
                    ) : verify ? (
                      <i className="text-[25px] text-[green] fa-regular fa-circle-check"></i>
                    ) : (
                      <i className="text-[25px] text-[red] fa-regular fa-circle-xmark"></i>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%] mt-4" align="start">
                    <PasswordInput
                      id="password"
                      name="password"
                      label="Password"
                      value={input.password}
                      onChange={handleinput}
                      helperText="Password should be at least 8 characters."
                      maxLength={30}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%] mt-4" align="start">
                    <PasswordInput
                      id="repassword"
                      name="repassword"
                      label="Confirm Password"
                      value={input.repassword}
                      onChange={handleinput}
                      helperText="Password should be at least 8 characters."
                      maxLength={30}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full -mt-10 font-semibold">
              <div className="w-[90%] lg:w-[80%] transition-all duration-300">
                {formerror2.errorstatus ? (
                  <ErrorMessage message={formerror2.errormessage} />
                ) : null}
              </div>
            </div>
            <div className="w-[100%]" align="center">
              {successState ? (
                <div className="w-[80%] flex justify-between " align="center">
                  <div className="w-[88%] bg-green-400 text-[#ffffff] text-[16x] font-bold my-3 rounded py-2">
                    Your Account Successfully Registered{" "}
                    <CountdownComponent successState={successState} />
                  </div>
                  <div
                    className="w-[10%] bg-[#ff5001] cursor-pointer text-[#ffffff] text-[16x] font-bold my-3 rounded py-2"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Skip
                  </div>
                </div>
              ) : (
                <div className="w-[80%] flex justify-end">
                  {submitloadingStatus ? (
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
                    <>
                      <button
                        className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                        onClick={handleBack}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                        &nbsp;&nbsp;Back
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                        onClick={submitform2}
                      >
                        Sign Up&nbsp;&nbsp;
                        <i className="fa-solid fa-thumbs-up"></i>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
