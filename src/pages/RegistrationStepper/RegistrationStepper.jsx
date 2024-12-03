import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
// import TextareaInput from "../Inputs/TextareaInput";
import CheckboxInput from "../Inputs/CheckboxInput";
import RadioButton from "../Inputs/RadiobuttonInput";
// import RadiobuttonInput from "../Inputs/RadiobuttonInput";
import TextLabel from "../Labels/TextLabel";
import Axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import "./RegistrationStepper.css";

import { Calendar } from "primereact/calendar";

const RegistrationStepper = ({ closeregistration, handlecloseregister }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  const [date, setDate] = useState(null);

  let minDate = new Date();

  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();

  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  const [inputs, setInputs] = useState({
    userid: "",
    email: "",
    fname: "",
    lname: "",
    phoneno: "",
    whatsappno: "",
    emgContaxt: 0,
    dob: "",
    age: "",
    gender: "",
    maritalstatus: "",
    kidsCount: 0,
    anniversarydate: "",
    caretakername: "",
    qualification: "",
    occupation: "",
    addressboth: false,
    tempaddess: "",
    tempstate: "",
    tempcity: "",
    tempincode: "",
    peraddress: "",
    perstate: "",
    percity: "",
    perpincode: "",
    height: 0,
    weight: 0,
    bloodgroup: "",
    classtype: "",
    bmi: 0,
    bp: "",
    injuries: "",
    breaks: "",
    activities: "",
    anthingelse: "",
    memberlist: "",
    preferabletiming: "",
    sessiontype: "",
    branch: "",
    others: "",
    medicaldetails: "",
    doctorname: "",
    hospitalname: "",
    painscale: "",
    painscaleValue: "",
    duration: "",
    past: "",
    family: "",
    therapyanything: "",
  });

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

  const handleNext = () => {
    setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setStepperactive((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const [addessschecked, setAddressChecked] = useState(false);
  const [agreementchecked, setAgreementchecked] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // Fetch states when component mounts (you can replace 'IN' with any country code)
  useEffect(() => {
    const countryStates = State.getStatesOfCountry("IN"); // 'IN' for India
    setStates(countryStates);
  }, []);

  const handleStateChange = (event) => {
    1909;
    if (event.target.name != "tempstate") {
      const stateCode = event.target.value;
      setSelectedState(stateCode);
      if (stateCode) {
        const stateCities = City.getCitiesOfState("IN", stateCode); // 'IN' for India
        setCities(stateCities);
      } else {
        setCities([]); // Reset cities if no state is selected
      }

      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [selectedOption, setSelectedOption] = useState({
    accident: "",
    breaks: "",
    care: "",
    backpain: "",
  });

  const [branchList, setBranchList] = useState([]);

  const [memberList, setMemberList] = useState([]);

  const [preferTiming, setpreferTiming] = useState([]);

  const [sessiontype, setSessionType] = useState([]);

  // const [personalHealthProblem, setPersonalHealthProblem] = useState([]);

  const branchOptions = Object.entries(branchList).map(([value, label]) => ({
    value, // Key (e.g., '1')
    label, // Value (e.g., 'Chennai')
  }));

  const memberlistOptions = Object.entries(memberList).map(
    ([value, label]) => ({
      value, // Key (e.g., '1')
      label, // Value (e.g., 'Chennai')
    })
  );

  // const preferTimingOption = Object.entries(preferTiming).map(
  //   ([value, label]) => ({
  //     value, // Key (e.g., '1')
  //     label, // Value (e.g., 'Chennai')
  //   })
  // );

  console.log(preferTiming);

  const sessionTypeOption = Object.entries(sessiontype).map(
    ([value, label]) => ({
      value, // Key (e.g., '1')
      label, // Value (e.g., 'Chennai')
    })
  );

  const [modeofcontact, setModeofContact] = useState();

  useEffect(() => {
    Axios.get(
      import.meta.env.VITE_API_URL + "profile/passRegisterData",
      {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
          "Content-Type": "application/json",
        },
      },
      {}
    )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.token == false) {
          navigate("/expired");
        }

        console.log("-------------->", data);

        if (data.success) {
          const Dob = myFormatToDatePicker(data.data.ProfileData.dob);
          localStorage.setItem("JWTtoken", "Bearer " + data.token + "");
          setBranchList(data.data.branchList);
          setInputs({
            ...inputs,
            fname: data.data.ProfileData.fname,
            lname: data.data.ProfileData.lname,
            userid: data.data.ProfileData.username,
            dob: Dob,
            age: data.data.ProfileData.age,
            email: data.data.ProfileData.email,
            phoneno: data.data.ProfileData.phone,
          });

          setModeofContact(
            data.data.CommunicationLabel.map((item) => ({
              value: item.refCtId, // Use refCtId as the value
              label: item.refCtText, // Use refCtText as the label
            }))
          );

          // Map personal health problem data into the required structure
          const healthConditions = Object.entries(
            data.data.presentHealthProblem
          ).map(([value, label]) => ({
            label,
            value: Number(value), // Ensure the value is a number
            checked: 0, // Set default checked value as 0
          }));

          // Set the mapped conditions
          setConditions(healthConditions);
        }
      })
      .catch((err) => {
        // Catching any 400 status or general errors
        console.error("Error: ", err);
      });
  }, []); // Ensure the effect runs only once on component mount

  const [conditions, setConditions] = useState([]); // Start with an empty array since conditions will be set after the API call

  // Function to handle checkbox changes
  const handleCheckboxChange = (index) => {
    setConditions((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index
          ? { ...condition, checked: condition.checked === 1 ? 0 : 1 }
          : condition
      )
    );
  };

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the current date is before the birth date in the current year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  const handleInput = (e) => {
    const { name, value } = e.target;

    let updatedInputs = {
      ...inputs,
      [name]: value,
    };

    // If the "addressboth" flag is true, copy the permanent address fields to temporary fields
    if (updatedInputs.addressboth) {
      updatedInputs = {
        ...updatedInputs,
        tempaddess: updatedInputs.peraddress,
        tempstate: updatedInputs.perstate,
        tempincode: updatedInputs.perpincode,
        tempcity: updatedInputs.percity,
      };
    }

    if (name === "branch") {
      Axios.post(
        import.meta.env.VITE_API_URL + "profile/MemberList",
        {
          branchId: value,
          refAge: inputs.age,
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          const data = decrypt(
            res.data[1],
            res.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );
          if (data.token == false) {
            navigate("/expired");
          }
          setMemberList(data.data); // Make sure this updates memberList
          setpreferTiming([]);
          setSessionType([]);
          // setInputs({
          //   ...inputs,
          //   preferabletiming: "",
          //   sessiontype: "",
          // });
        })
        .catch((err) => {
          // Catching any 400 status or general errors
          console.error("Error: ", err);
        });
    } else if (name === "memberlist") {
      Axios.post(
        import.meta.env.VITE_API_URL + "profile/sectionTime",
        {
          sectionId: parseInt(value),
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          const data = decrypt(
            res.data[1],
            res.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );
          if (data.token == false) {
            navigate("/expired");
          }
          console.log("Member List -----------", data);
          setpreferTiming(data.SectionTime);
          setSessionType(data.CustTime);
        })
        .catch((err) => {
          // Catching any 400 status or general errors
          console.error("Error: ", err);
        });
    } else if (name === "maritalstatus") {
      if (value === "single") {
        updatedInputs = {
          ...updatedInputs,
          anniversarydate: "",
        };
      }
    } else if (name === "dob") {
      updatedInputs = {
        ...updatedInputs,
        age: calculateAge(value),
      };
    } else if (name === "height") {
      const bmi = calculateBMI(inputs.weight, value);
      updatedInputs = {
        ...updatedInputs,
        bmi: bmi,
      };
    } else if (name === "weight") {
      const bmi = calculateBMI(value, inputs.height);
      updatedInputs = {
        ...updatedInputs,
        bmi: bmi,
      };
    }
    if (name === "kidsCount") {
      if (value === 1) {
        updatedInputs = {
          ...updatedInputs,
          kidsCount: "",
        };
      }
    }

    setInputs(updatedInputs);
  };

  function calculateBMI(weight, height) {
    // Convert height from cm to meters
    let heightInMeters = height / 100;

    // Calculate BMI
    let bmi = weight / heightInMeters ** 2;

    // Return the BMI rounded to two decimal places
    return bmi.toFixed(2);
  }

  const submitForm = () => {
    let updatedHealthProblem = [];

    conditions.forEach((element) => {
      if (element.checked === 1) {
        updatedHealthProblem.push(element.value);
      }
    });

    setLoading(true);
    const Dob = datePickerToMyFormat(inputs.dob);

    Axios.post(
      import.meta.env.VITE_API_URL + "profile/RegisterData",

      {
        address: {
          addresstype: inputs.addressboth,
          refAdAdd1: inputs.peraddress,
          refAdArea1: "",
          refAdCity1: inputs.percity,
          refAdState1: State.getStateByCode(inputs.perstate).name,
          refAdPincode1: parseInt(inputs.perpincode),
          refAdAdd2: inputs.tempaddess,
          refAdArea2: "",
          refAdCity2: inputs.tempcity,
          refAdState2: State.getStateByCode(inputs.tempstate).name,
          refAdPincode2: parseInt(inputs.tempincode),
        },
        personalData: {
          ref_su_fname: inputs.fname,
          ref_su_lname: inputs.lname,
          ref_su_mailid: inputs.email,
          ref_su_phoneno: inputs.phoneno,
          ref_su_emgContaxt: inputs.emgContaxt,
          ref_su_Whatsapp: inputs.whatsappno,
          ref_su_dob: Dob,
          ref_su_age: inputs.age,
          ref_su_gender: inputs.gender,
          ref_su_qulify: inputs.qualification,
          ref_su_occu: inputs.occupation,
          ref_su_guardian: inputs.caretakername,
          ref_su_timing: inputs.preferabletiming,
          ref_su_branchId: parseInt(inputs.branch),
          ref_su_seTId: parseInt(inputs.memberlist),
          ref_su_prTimeId: parseInt(inputs.preferabletiming),
          ref_su_seModeId: parseInt(inputs.sessiontype),
          ref_su_MaritalStatus: inputs.maritalstatus,
          ref_su_kidsCount: inputs.kidsCount,
          ref_su_WeddingDate: inputs.anniversarydate
            ? datePickerToMyFormat(inputs.anniversarydate)
            : null,
          ref_su_deliveryType: inputs.deliveryType ? inputs.deliveryType : null,

          ref_su_communicationPreference: parseInt(inputs.mode),
          ref_Class_Mode: parseInt(inputs.classtype),
        },
        generalhealth: {
          refHeight: inputs.height,
          refWeight: inputs.weight,
          refBlood: inputs.bloodgroup,
          refBMI: inputs.bmi,
          refBP: inputs.bp,
          refRecentInjuries: selectedOption.accident === "yes" ? true : false,
          refRecentInjuriesReason: inputs.injuries,
          refRecentFractures: selectedOption.breaks === "yes" ? true : false,
          refRecentFracturesReason: inputs.breaks,
          refOthers: inputs.activities,
          refElse: inputs.anthingelse,
          refOtherActivities: inputs.others,
          refPresentHealth: updatedHealthProblem,
          refMedicalDetails: inputs.medicaldetails,
          refUnderPhysicalCare: selectedOption.care === "yes" ? true : false,
          refDoctor: inputs.doctorname,
          refHospital: inputs.hospitalname,
          refBackPain:
            selectedOption.backpain === "no" ? "No" : inputs.painscale,
          refBackPainValue:
            selectedOption.backpain === "no" ? "No" : inputs.painscaleValue,
          refProblem: inputs.duration,
          refPastHistory: inputs.past,
          refFamilyHistory: inputs.family,
          refAnythingelse: inputs.therapyanything,
        },
      },
      {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
          "Content-Type": "application/json", // Ensure the content type is set
        },
      }
    )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log(data.success);

        if (data.success) {
          navigate("/");
          handlecloseregister();
          closeregistration();
          swal({
            title: "Registration Completed!",
            text: "Your registration was successful! Our team will contact you shortly.",
            icon: "success",
            customClass: {
              title: "swal-title",
              content: "swal-text",
            },
          });
        }
      })
      .catch((err) => {
        // Catching any 400 status or general errors
        console.log("Error: ", err);
      });
  };

  function myFormatToDatePicker(dateString) {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
  }

  function datePickerToMyFormat(date) {
    console.log("date", date);

    // Ensure `date` is a Date object
    if (!(date instanceof Date)) {
      try {
        date = new Date(date);
      } catch (error) {
        console.error("Invalid date provided:", date);
        return null; // Return null if the conversion fails
      }
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid Date object:", date);
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="w-[100%] lg:w-[100%] h-[100vh] bg-black/80 blur-[0.2px]  flex justify-center items-center fixed z-50">
      <div
        className="w-[95%] lg:w-[70%] h-[90vh] bg-white rounded shadow-sm"
        align="center"
      >
        {stepperactive === 1 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <div className="w-[90%] justify-between flex h-[7vh] items-center">
                  <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                    Personal Details
                  </h1>
                  <div
                    onClick={() => {
                      closeregistration();
                    }}
                  >
                    <i className="fa-solid fa-xmark text-[20px] cursor-pointer"></i>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-y-auto">
                <div className="w-[90%] mb-[20px] mt-3" align="start">
                  <TextInput
                    id="userid"
                    type="text"
                    name="userid"
                    placeholder="your name"
                    label="Username *"
                    required
                    readonly
                    value={inputs.userid}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%] mb-[20px]" align="start">
                  <TextInput
                    id="emailid"
                    type="email"
                    name="email"
                    placeholder="your name"
                    label="Email ID *"
                    required
                    readonly
                    value={inputs.email}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <TextInput
                      id="fname"
                      type="text"
                      name="fname"
                      placeholder="your name"
                      label="First Name *"
                      required
                      readonly
                      value={inputs.fname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="lname"
                      type="text"
                      name="lname"
                      placeholder="your name"
                      label="Last Name *"
                      required
                      readonly
                      value={inputs.lname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  <div className=" w-[48%]">
                    <TextInput
                      id="phonenumber"
                      type="number"
                      name="phoneno"
                      placeholder="your name"
                      label="Phone Number *"
                      required
                      value={inputs.phoneno}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    {/* <TextInput
                      id="emergencyno"
                      type="number"
                      name="emgContaxt "
                      label="Emergency Contact number *"
                      value={inputs.emgContaxt}
                      onChange={(e) => handleInput(e)}
                      required
                    /> */}

                    <TextInput
                      id="emergencyno"
                      type="number"
                      name="emgContaxt"
                      placeholder="your name"
                      label="Emergency Contact Number *"
                      required
                      value={inputs.emgContaxt}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div
                  className="w-[90%] mb-[20px] flex flex-wrap  justify-between"
                  align="start"
                >
                  <div className="w-[75%] lg:w-[75%]">
                    <TextInput
                      id="whatsappno"
                      type="number"
                      name="whatsappno"
                      placeholder="your name"
                      label={`WhatsApp Number * `}
                      required
                      value={inputs.whatsappno}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setInputs({
                        ...inputs,
                        whatsappno: inputs.phoneno,
                      });
                    }}
                    className="w-[30%] lg:w-[20%] border-2 border-[#ff621b] bg-[#ff621b] text-[#fff] hover:bg-[#fff] hover:text-[#ff621b] transition-all duration-300 cursor-pointer font-bold rounded text-center text-[15px] flex justify-center items-center"
                  >
                    Use Same Number
                  </div>
                </div>

                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  {/* <div className="w-[68%]"> */}

                  <div className="flex flex-col w-[70%] -mt-[13px]">
                    <label className="bg-[#fff] text-[#ff621b] -mb-[15px] z-50 w-[120px] ml-[10px]">
                      &nbsp;Date of Birth *
                    </label>

                    <Calendar
                      label="Date of Birth *"
                      className="relative w-full mt-1 h-10 px-3 placeholder-transparent transition-all border-2 rounded outline-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white dateInput"
                      value={inputs.dob}
                      onChange={(e) => handleInput(e)}
                      name="dob"
                    />
                  </div>

                  {/* <TextInput
                      id="dob"
                      type="date"
                      name="dob"
                      placeholder="your name"
                      label="Date of Birth *"
                      required
                      value={inputs.dob}
                      onChange={(e) => handleInput(e)}
                    /> */}
                  {/* </div> */}
                  <div className="w-[28%]">
                    <TextInput
                      id="age"
                      type="tel"
                      name="age"
                      placeholder="your name"
                      label="Age *"
                      value={inputs.age}
                      required
                      readonly
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  <SelectInput
                    id="gender"
                    name="gender"
                    label="Gender *"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "notperfer", label: "Not Perfer to say" },
                    ]}
                    required
                    value={inputs.gender}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <SelectInput
                      id="maritalstatus"
                      name="maritalstatus"
                      label="Marital Status *"
                      options={[
                        { value: "single", label: "Single" },
                        { value: "married", label: "Married" },
                      ]}
                      required
                      disabled={inputs.age > 18 ? false : true}
                      value={inputs.maritalstatus}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  {/* <div className="w-[48%]">
                    <TextInput
                      id=""
                      type="date"
                      name="anniversarydate"
                      placeholder="your name"
                      label="Anniversary Date *"
                      required
                      disabled={
                        inputs.maritalstatus === "married" ? false : true
                      }
                      value={inputs.anniversarydate}
                      onChange={(e) => handleInput(e)}
                    />
                  </div> */}

                  <div className="flex flex-col w-[48%] -mt-[13px]">
                    <label
                      disabled={
                        inputs.maritalstatus === "married" ? false : true
                      }
                      className={`bg-[#fff] text-[#ff621b] -mb-[15px] z-50 w-[150px] ml-[10px] 
                        ${
                          inputs.maritalstatus === "married"
                            ? ""
                            : "text-[#79879b]"
                        }`}
                    >
                      &nbsp; Anniversary Date *
                    </label>

                    <Calendar
                      label="Anniversary Date"
                      className={`relative w-full mt-1 h-10 px-3 placeholder-transparent transition-all border-2 rounded outline-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white dateInput ${
                        inputs.maritalstatus === "married"
                          ? ""
                          : "cursor-not-allowed"
                      }`}
                      // className="relative w-full mt-1 h-10 px-3 placeholder-transparent transition-all border-2 rounded outline-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white dateInput"
                      value={inputs.anniversarydate}
                      onChange={(e) => handleInput(e)}
                      readOnlyInput
                      disabled={
                        inputs.maritalstatus === "married" ? false : true
                      }
                      name="anniversarydate"
                    />
                  </div>
                </div>

                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <TextInput
                      id="kidsCount"
                      name="kidsCount"
                      label="No of Kid's *"
                      type="number"
                      required
                      disabled={
                        (inputs.gender === "female" ? false : true) ||
                        (inputs.maritalstatus === "married" ? false : true)
                      }
                      value={inputs.kidsCount}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <SelectInput
                      id="deliveryType"
                      name="deliveryType"
                      placeholder="22"
                      label="Delivery Type *"
                      options={[
                        { value: "Normal", label: "Normal" },
                        { value: "C-Section", label: "C-Section" },
                      ]}
                      required
                      disabled={
                        (inputs.kidsCount > 0 ? false : true) ||
                        (inputs.gender === "female" ? false : true) ||
                        (inputs.maritalstatus === "married" ? false : true)
                      }
                      value={inputs.deliveryType}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-[20px]" align="start">
                  <TextInput
                    id="father"
                    type="text"
                    name="caretakername"
                    placeholder="your name"
                    label="Father / Husband Name *"
                    required
                    value={inputs.caretakername}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <TextInput
                      id="qualification"
                      type="text"
                      name="qualification"
                      placeholder="your name"
                      label="Qualification"
                      // required
                      disabled={inputs.age > 18 ? false : true}
                      value={inputs.qualification}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="occupation"
                      type="text"
                      name="occupation"
                      placeholder="your name"
                      label="Occupation"
                      // required
                      disabled={inputs.age > 18 ? false : true}
                      value={inputs.occupation}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>
                {/* <div
                  className="w-[90%] mb-[20px] flex justify-between items-center"
                  align="start"
                >
                  <CheckboxInput
                    checked={addessschecked}
                    id="bothaddress"
                    label="Use Communication Address & Permanent Address as Same."
                    onChange={() => {
                      if (addessschecked) {
                        setAddressChecked(false);
                        setInputs({
                          ...inputs,
                          addressboth: false,
                        });
                      } else {
                        setAddressChecked(true);
                        setInputs({
                          ...inputs,
                          addressboth: true,
                        });
                      }
                    }}
                  />
                </div> */}

                <div
                  className="w-[90%] mb-2 flex flex-col justify-between"
                  align="start"
                >
                  <div className="w-full" align="center">
                    <label className="text-[#45474b] mb-[20px] text-[18px] font-semibold">
                      Permanent Address
                    </label>
                    <div className="mb-[20px]">
                      <TextInput
                        id="tempaddress"
                        name="peraddress"
                        label="Residential  Address *"
                        placeholder="Write your message"
                        rows={3}
                        required
                        value={inputs.peraddress}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <div
                      className="w-[100%] mb-[20px] flex justify-between"
                      align="start"
                    >
                      <div className="w-[48%]">
                        <div className="relative w-full">
                          <select
                            id="perstate"
                            name="perstate"
                            required
                            value={inputs.perstate}
                            onChange={handleStateChange}
                            className="relative w-full h-10 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          >
                            <option value="" disabled selected></option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="permanentstate"
                            className="pointer-events-none absolute left-2 z-[1] -top-2 px-2 text-[14px] text-[#ff5001] transition-all before:absolute before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:text-[14px] peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                          >
                            State *
                          </label>
                        </div>
                      </div>

                      <div className="w-[48%]">
                        <div className="relative w-full">
                          <select
                            id="permanentcity"
                            name="percity"
                            required
                            value={inputs.percity}
                            onChange={(e) => {
                              const { name, value } = e.target;

                              let updatedInputs = {
                                ...inputs,
                                [name]: value,
                              };

                              // If the "addressboth" flag is true, copy the permanent address fields to temporary fields
                              if (updatedInputs.addressboth) {
                                updatedInputs = {
                                  ...updatedInputs,
                                  tempaddess: updatedInputs.peraddress,
                                  tempstate: updatedInputs.perstate,
                                  tempincode: updatedInputs.perpincode,
                                  tempcity: updatedInputs.percity,
                                };
                              }

                              // Set the final updated inputs
                              setInputs(updatedInputs);
                            }}
                            disabled={!selectedState}
                            className="relative w-full h-10 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          >
                            <option value="" disabled selected></option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="permanentcity"
                            className="pointer-events-none absolute left-2 z-[1] -top-2 px-2 text-[14px] text-[#ff5001] transition-all before:absolute before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:text-[14px] peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-white"
                          >
                            City *
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] mb-[20px]" align="start">
                      <TextInput
                        id="perpincode"
                        type="tel"
                        name="perpincode"
                        placeholder="your name"
                        label="Pincode *"
                        required
                        value={inputs.perpincode}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                  </div>

                  <div
                    className="w-[90%] mb-[20px] flex justify-between items-center"
                    align="start"
                  >
                    <CheckboxInput
                      checked={addessschecked}
                      id="bothaddress"
                      label="Use Communication Address & Permanent Address as Same."
                      onChange={() => {
                        if (addessschecked) {
                          setInputs({
                            ...inputs,
                            tempaddess: "",
                            tempstate: "",
                            tempincode: "",
                            tempcity: "",
                            addressboth: false,
                          });
                          setAddressChecked(false);
                        } else {
                          setAddressChecked(true);
                          setInputs({
                            ...inputs,
                            tempaddess: inputs.peraddress,
                            tempstate: inputs.perstate,
                            tempincode: inputs.perpincode,
                            tempcity: inputs.percity,
                            addressboth: true,
                          });
                        }
                      }}
                    />
                  </div>

                  <div className="w-full" align="center">
                    <label className="text-[#45474b] mb-[20px] text-[18px] font-semibold">
                      Communication Address
                    </label>
                    <div className="w-[100%] mb-[20px]">
                      <TextInput
                        id="tempaddress"
                        name="tempaddess"
                        label="Residential  Address *"
                        placeholder="Write your message"
                        rows={3}
                        required
                        value={inputs.tempaddess}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <div
                      className="w-[100%] mb-[20px] flex justify-between"
                      align="start"
                    >
                      <div className="w-[48%]">
                        <div className="relative w-full">
                          <select
                            id="tempstate"
                            name="tempstate"
                            required
                            onChange={handleStateChange}
                            value={inputs.tempstate}
                            className="relative w-full h-11 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          >
                            <option value="" disabled selected></option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="tempstate"
                            className="pointer-events-none absolute left-2 z-[1] -top-2 px-2 text-[14px] text-[#ff5001] transition-all before:absolute before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:text-[14px] peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-white"
                          >
                            State *
                          </label>
                        </div>
                      </div>

                      <div className="w-[48%]">
                        <div className="relative w-full">
                          <select
                            id="tempcity"
                            name="tempcity"
                            required
                            value={inputs.tempcity}
                            onChange={(e) => {
                              if (!inputs.addressboth) {
                                setInputs({
                                  ...inputs,
                                  [e.target.name]: e.target.value,
                                });
                              }
                            }}
                            disabled={!selectedState}
                            className="relative w-full h-11 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          >
                            <option value="" disabled selected></option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="tempcity"
                            className="pointer-events-none absolute left-2 z-[1] -top-2 px-2 text-[14px] text-[#ff5001] transition-all before:absolute before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:text-[14px] peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-white"
                          >
                            City *
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] mb-2" align="start">
                      <TextInput
                        id="pincode"
                        type="tel"
                        name="tempincode"
                        placeholder="your name"
                        label="Pincode *"
                        required
                        value={inputs.tempincode}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-end items-center">
                <button
                  type="submit"
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </>
        )}

        {stepperactive === 2 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <div className="w-[90%] justify-between flex h-[7vh] items-center">
                  <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                    General Health Details
                  </h1>
                  <div
                    onClick={() => {
                      closeregistration();
                    }}
                  >
                    <i className="fa-solid fa-xmark text-[20px] cursor-pointer"></i>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-auto">
                <div
                  className="w-[90%] mt-3 mb-[20px] flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <TextInput
                      id="height"
                      type="number"
                      name="height"
                      placeholder="your name"
                      label="Height in CM *"
                      required
                      value={inputs.height}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="weight"
                      type="number"
                      name="weight"
                      placeholder="your name"
                      label="Weight in KG *"
                      required
                      value={inputs.weight}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div
                  className="w-[90%] mb-[20px] flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <SelectInput
                      id="bloodgroup"
                      name="bloodgroup"
                      label="Blood Group *"
                      options={[
                        { value: "A+", label: "A+" },
                        { value: "A-", label: "A-" },
                        { value: "B+", label: "B+" },
                        { value: "B-", label: "B-" },
                        { value: "AB+", label: "AB+" },
                        { value: "AB-", label: "AB-" },
                        { value: "O+", label: "O+" },
                        { value: "O-", label: "O-" },
                      ]}
                      required
                      value={inputs.bloodgroup}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="bmi"
                      type="tel"
                      name="bmi"
                      placeholder="your name"
                      label="BMI"
                      readonly
                      value={inputs.bmi}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-[20px]" align="start">
                  <TextInput
                    id="bp"
                    type="tel"
                    name="bp"
                    placeholder="your name"
                    label="BP"
                    value={inputs.bp}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel
                      label={"Recent injuries / Accidents / Operations *"}
                    />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-[20px]">
                    <RadioButton
                      id="accidentyes"
                      value="yes"
                      name="accident"
                      selectedOption={selectedOption.accident || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          accident: e.target.value,
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="accidentno"
                      value="no"
                      name="accident"
                      selectedOption={selectedOption.accident || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          accident: e.target.value,
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="mb-[20px]">
                    <TextInput
                      id="accidentdetail"
                      type="text"
                      name="injuries"
                      placeholder="your name"
                      label="Details"
                      value={inputs.injuries}
                      onChange={(e) => handleInput(e)}
                      disabled={
                        selectedOption.accident === "yes" ? false : true
                      }
                    />
                  </div>
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel
                      label={"Recent breaks / Fractures / Sprains *"}
                    />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-[20px]">
                    <RadioButton
                      id="breaksyes"
                      value="yes"
                      name="breaks"
                      selectedOption={selectedOption.breaks || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          breaks: e.target.value,
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="breaksno"
                      value="no"
                      name="breaks"
                      selectedOption={selectedOption.breaks || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          breaks: e.target.value,
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="mb-[20px]">
                    <TextInput
                      id="breaksdetail"
                      type="text"
                      name="breaks"
                      placeholder="your name"
                      label="Details"
                      disabled={selectedOption.breaks === "yes" ? false : true}
                      value={inputs.breaks}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-[20px]">
                  <div className="w-full">
                    <TextInput
                      id="otheractivities"
                      type="text"
                      name="activities"
                      placeholder="your name"
                      label="Other Activities"
                      disabled={selectedOption.breaks === "yes" ? false : true}
                      value={inputs.activities}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-[20px]">
                  <div className="w-full">
                    <TextInput
                      id="anythingelse"
                      type="text"
                      name="anthingelse"
                      placeholder="your name"
                      label="Anything else"
                      value={inputs.anthingelse}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] flex justify-between mb-[20px]">
                  <div className="w-[30%]">
                    <SelectInput
                      id="branch"
                      name="branch"
                      label="Branch *"
                      options={branchOptions}
                      required
                      value={inputs.branch}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <SelectInput
                      id="memberlist"
                      name="memberlist"
                      label="Member List *"
                      required
                      options={memberlistOptions}
                      value={inputs.memberlist}
                      onChange={(e) => handleInput(e)}
                      disabled={inputs.branch ? false : true}
                    />
                  </div>
                  <div className="w-[30%]">
                    <SelectInput
                      id="sessiontype"
                      name="sessiontype"
                      label="Session Type *"
                      disabled={inputs.memberlist ? false : true}
                      options={sessionTypeOption}
                      required
                      value={inputs.sessiontype}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] flex justify-between mb-[20px]">
                  <div className="w-[68%]">
                    <SelectInput
                      id="memberlist"
                      name="preferabletiming"
                      label="Preferable Timing *"
                      options={Object.values(preferTiming).map((element) => ({
                        value: element.refTimeId, // Extract refTimeId as value
                        label: element.formattedString, // Extract formattedString as label
                      }))}
                      required
                      disabled={inputs.memberlist ? false : true}
                      value={inputs.preferabletiming}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <SelectInput
                      id="classtype"
                      name="classtype"
                      label="Class Type *"
                      options={[
                        { value: "1", label: "Online" },
                        { value: "2", label: "Offline" },
                      ]}
                      required
                      value={inputs.classtype}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-between items-center">
                <button
                  type="button"
                  className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  &nbsp;&nbsp;Back
                </button>
                <button
                  type="submit"
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  // onClick={handleNext}
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </>
        )}

        {stepperactive === 3 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <div className="w-[90%] justify-between flex h-[7vh] items-center">
                  <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                    Past or Present Health Problems
                  </h1>
                  <div
                    onClick={() => {
                      closeregistration();
                    }}
                  >
                    <i className="fa-solid fa-xmark text-[20px] cursor-pointer"></i>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-auto">
                <div className="w-[90%] flex flex-wrap my-4  items-center justify-start gap-x- lg:gap-x-10 gap-y-4">
                  {conditions.map((condition, index) => (
                    <div className="w-[160px]" key={index}>
                      <CheckboxInput
                        id={`condition-${index}`}
                        checked={condition.checked === 1}
                        label={condition.label}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </div>
                  ))}
                </div>

                <div className="w-[90%] mb-[20px]">
                  <TextInput
                    id="others"
                    type="text"
                    name="others"
                    placeholder="your name"
                    label="Others"
                    value={inputs.others}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%] mb-[20px]">
                  <TextInput
                    id="medicationdetails"
                    type="text"
                    name="medicaldetails"
                    placeholder="your name"
                    label="Current Medicines"
                    value={inputs.medicaldetails}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel label={"Under Physician's Care *"} />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-[20px]">
                    <RadioButton
                      id="careyes"
                      value="yes"
                      name="care"
                      selectedOption={selectedOption.care || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          care: e.target.value,
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="careno"
                      value="no"
                      name="care"
                      selectedOption={selectedOption.care || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          care: e.target.value,
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="mb-[20px]">
                    <TextInput
                      id="doctorname"
                      type="text"
                      name="doctorname"
                      label="Doctor Name"
                      placeholder="Write your message"
                      rows={2}
                      disabled={selectedOption.care === "yes" ? false : true}
                      required
                      value={inputs.doctorname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="mt-3 mb-[20px]">
                    <TextInput
                      id="hospital"
                      type="text"
                      name="hospitalname"
                      label="Hospital"
                      placeholder="Write your message"
                      rows={2}
                      disabled={selectedOption.care === "yes" ? false : true}
                      required
                      value={inputs.hospitalname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel label={"Back Pain *"} />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-[20px]">
                    <RadioButton
                      id="backpainyes"
                      value="yes"
                      name="backpain"
                      selectedOption={selectedOption.backpain || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          backpain: e.target.value, // Corrected: updating backpain instead of care
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="backpainno"
                      value="no"
                      name="backpain"
                      selectedOption={selectedOption.backpain || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          backpain: e.target.value, // Corrected: updating backpain instead of care
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="flex flex-row w-[100%] justify-between">
                    <div className="mb-[20px] w-[48%]">
                      <SelectInput
                        id="pain"
                        name="painscale"
                        label="Pain Scale"
                        options={[
                          { value: "upper", label: "Upper" },
                          { value: "middle", label: "Middle" },
                          { value: "lower", label: "Lower" },
                        ]}
                        disabled={
                          selectedOption.backpain === "yes" ? false : true
                        }
                        required
                        value={inputs.painscale}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <div className="mb-[20px] w-[48%]">
                      <TextInput
                        id="painValue"
                        name="painscaleValue"
                        label="Additional Points(Back Pain)"
                        disabled={
                          selectedOption.backpain === "yes" ? false : true
                        }
                        required
                        value={inputs.painscaleValue}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-between items-center">
                <button
                  type="button"
                  className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  &nbsp;&nbsp;Back
                </button>
                <button
                  type="submit"
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </>
        )}

        {stepperactive === 4 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                submitForm();
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <div className="w-[90%] justify-between flex h-[7vh] items-center">
                  <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                    Health Problems History
                  </h1>
                  <div
                    onClick={() => {
                      closeregistration();
                    }}
                  >
                    <i className="fa-solid fa-xmark text-[20px] cursor-pointer"></i>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-auto">
                <div className="w-[90%] mt-3 mb-[20px]">
                  <TextInput
                    id="durationproblem"
                    type="text"
                    name="duration"
                    placeholder="your name"
                    label="Duration of the Problem"
                    value={inputs.duration}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="w-[90%] mb-[20px]">
                  <TextInput
                    id="relevantpasthistory"
                    type="text"
                    name="past"
                    label="Relevant past History"
                    placeholder="Write your message"
                    value={inputs.past}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="w-[90%] mb-[20px]">
                  <TextInput
                    id="relevantfamilyhistory"
                    type="text"
                    name="family"
                    label="Relevant Family History"
                    placeholder="Write your message"
                    value={inputs.family}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="w-[90%] mb-[20px]">
                  <TextInput
                    id="anythingelsetherapy"
                    name="therapyanything"
                    label="Anything else"
                    type="text"
                    value={inputs.therapyanything}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%] mb-[20px]">
                  <label className="w-[100%] text-[#f95005] font-bold text-[1rem] lg:text-[20px] text-start">
                    Disclaimer (Please Read Carefully)
                  </label>
                  <label className="w-[100%] text-[#f95005]  text-[1rem] lg:text-[20px] text-start">
                    Personal Responsibility
                  </label>
                  <div className="text-[#45474b] text-[16px] font-semibold text-justify pl-[30px] ">
                    <ul>
                      <li style={{ listStyle: "disc" }}>
                        I have provided all necessary and relevant information
                        required for the yoga class.
                      </li>
                      <li style={{ listStyle: "disc" }}>
                        I understand the importance of listening to my body and
                        respecting its limits during every session.
                      </li>
                      <li style={{ listStyle: "disc" }}>
                        If I feel any discomfort or strain during a session, I
                        will gently exit the posture and take rest as needed.
                      </li>
                      <li style={{ listStyle: "disc" }}>
                        I accept that neither the instructor nor the hosting
                        facility is liable for any injury or damages, to person
                        or property, resulting from participation in these
                        sessions.
                      </li>
                    </ul>
                  </div>
                  <label className="w-[100%] text-[#f95005]  text-[1rem] lg:text-[20px] text-start">
                    Medical Advisory
                  </label>
                  <div className="text-[#45474b] text-[16px] font-semibold text-justify pl-[30px] ">
                    <ul>
                      <li style={{ listStyle: "disc" }}>
                        I will consult my doctor before beginning any yoga
                        program for my overall well-being.
                      </li>
                      <li style={{ listStyle: "disc" }}>
                        I understand it is my responsibility to inform the
                        instructor of any serious illness or injury before the
                        session.
                      </li>
                      <li style={{ listStyle: "disc" }}>
                        I will avoid performing any posture that causes strain
                        or pain.
                      </li>
                    </ul>
                  </div>
                  <label className="w-[100%] text-[#f95005]  text-[1rem] lg:text-[20px] text-start">
                    Confidentiality
                  </label>
                  <div className="text-[#45474b] text-[16px] font-semibold text-justify pl-[30px] ">
                    <ul>
                      <li style={{ listStyle: "disc" }}>
                        I acknowledge that the information I provide for the
                        yoga sessions will be kept strictly confidential.
                      </li>
                    </ul>
                  </div>
                  <label className="w-[100%] text-[#f95005]  text-[1rem] lg:text-[20px] text-start">
                    Non-Refundable Policy
                  </label>
                  <div className="text-[#45474b] text-[16px] font-semibold text-justify pl-[30px] ">
                    <ul>
                      <li style={{ listStyle: "disc" }}>
                        All purchases of services, including classes, workshops,
                        events, and therapy sessions, are non-refundable.
                      </li>
                      <li style={{ listStyle: "disc" }}>
                        Fees cannot be transferred or carried forward under any
                        circumstances.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="w-[90%] mb-[20px]">
                  <CheckboxInput
                    checked={agreementchecked}
                    id="agreementchecked"
                    label="By participating, I agree to adhere to these terms *"
                    required
                    onChange={() => {
                      agreementchecked
                        ? setAgreementchecked(false)
                        : setAgreementchecked(true);
                    }}
                  />
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-between items-center">
                {loading ? (
                  <div className="flex w-full justify-end items-end">
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
                  <>
                    <button
                      className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                      type="button"
                      onClick={handleBack}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                      &nbsp;&nbsp;Back
                    </button>
                    <button
                      type="submit"
                      className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                    >
                      Register&nbsp;&nbsp;
                      <i class="fa-solid fa-check"></i>
                    </button>
                  </>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationStepper;
