import React, { useState,useEffect} from "react";
import TextInput from "../../pages/Inputs/TextInput";
import SelectInput from "../../pages/Inputs/SelectInput";
import CheckboxInput from "../../pages/Inputs/CheckboxInput";
import RadiobuttonInput from "../../pages/Inputs/RadiobuttonInput";
import Axios from "axios";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Skeleton } from "primereact/skeleton";
import { ImUpload2 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import CryptoJS from "crypto-js";
import PasswordInput from "../../pages/Inputs/PasswordInput";
import ErrorMessage from "../../pages/Messages/ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../14-Landingprofile/Landingprofile.css";
import { FaEye } from "react-icons/fa";



export default function Landingprofile() {
  const [userdata, setuserdata] = React.useState({
    username: "",
    usernameid: "",
    profileimg: { contentType: "", content: "" },
  });

  const [documents, setDocuments] = useState([{ fileName: "", file: null }]);

 
  const handleAddDocument = () => {
    setDocuments([...documents, { fileName: "", file: null }]);
  };

  const handleDeleteDocument = (index) => {
    const updatedDocuments = documents.filter((_, idx) => idx !== index);
    setDocuments(updatedDocuments);
  };

  const handleDocumentSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Documents: ", documents);

    // Submit logic here (e.g., API call)
  };
  const handletherapy = () => {
    let updatedHealthProblem = [];
    conditions.forEach((element) => {
      if (element.checked === 1) {
        updatedHealthProblem.push(element.value);
      }
    });

    Axios.post(
      process.env.REACT_APP_API_URL + "/user/updateProfile", // Replace with appropriate env variable

      {
        presentHealth: {
          refBackpain: inputs.backpainscale,
          refDrName: inputs.caredoctorname,
          refHospital: inputs.caredoctorhospital,
          refMedicalDetails: inputs.pastmedicaldetails,
          refOtherActivities: inputs.pastother,
          refPresentHealth: updatedHealthProblem,
          refUnderPhysCare: options.care,
          refAnythingelse: inputs.therapyanythingelse,
          refFamilyHistory: inputs.therapyfamilyhistory,
          refProblem: inputs.therapydurationproblem,
          refPastHistory: inputs.therapypasthistory,
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
          process.env.REACT_APP_ENCRYPTION_KEY // Replace with appropriate env variable
        );
        if (data.token == false) {
          navigate("/expired");
        } else {
          localStorage.setItem("JWTtoken", "Bearer " + data.token + "");

          console.log(data.success);

          if (data.success) {
            setEdits({
              ...edits,
              therapy: false,
            });
          }
        }
      })
      .catch((err) => {
        // Catching any 400 status or general errors
        console.log("Error: ", err);
      });
  };
  const handleInputChange = (index, field, value) => {
    const updatedDocuments = [...documents];
    if (field === "file") {
      updatedDocuments[index][field] = value;
      updatedDocuments[index].previewUrl = URL.createObjectURL(value); // Generate preview URL
    } else {
      updatedDocuments[index][field] = value;
    }
    setDocuments(updatedDocuments);
  };
  
  const handlePreviewDocument = (index) => {
    const file = documents[index];
    if (file.previewUrl) {
      window.open(file.previewUrl, "_blank"); // Open in a new tab
    } else {
      alert("No document available for preview.");
    }
  };
  

  const handleInputVal = (event) => {
    const { name, value } = event.target;

    setInputs((prevInputs) => {
      const updatedInputs = {
        ...prevInputs,
        [name]: value,
      };

      if (options.address) {
        updatedInputs.tempaddress = prevInputs.peraddress;
        updatedInputs.temppincode = prevInputs.perpincode;
        updatedInputs.tempcity = prevInputs.percity;
        updatedInputs.tempstate = prevInputs.perstate;
      }

      if (name === "dob") {
        updatedInputs.age = calculateAge(value);
      } else if (name === "maritalstatus" && value === "single") {
        updatedInputs.anniversarydate = "";
      }

      return updatedInputs;
    });
  };
  const [modeofcontact, setModeofContact] = useState(undefined);

  const [edits, setEdits] = useState({
    personal: false,
    address: false,
    communication: false,
    general: false,
    present: false,
    therapy: false,
    document: false,
    prof: false,
  });

  const editform = (event) => {
    setEdits({
      ...edits,
      [event]: true,
    });
  };
  const [inputs, setInputs] = useState({
    profilefile: { contentType: "", content: "" },
    fname: "",
    lname: "",
    dob: "",
    age: "",
    gender: "",
    guardianname: "",
    maritalstatus: "",
    anniversarydate: "",
    qualification: "",
    occupation: "",
    peraddress: "",
    perpincode: "",
    perstate: "",
    percity: "",
    tempaddress: "",
    temppincode: "",
    tempstate: "",
    tempcity: "",
    email: "",
    phoneno: "",
    whatsappno: "",
    mode: "",
    height: "",
    weight: "",
    bloodgroup: "",
    bmi: "",
    bp: "",
    accidentdetails: "",
    breaksdetails: "",
    breaksotheractivities: "",
    genderalanything: "",
    pastother: "",
    pastmedicaldetails: "",
    caredoctorname: "",
    caredoctorhospital: "",
    backpainscale: "",
    therapydurationproblem: "",
    therapypasthistory: "",
    therapyfamilyhistory: "",
    therapyanythingelse: "",
    pancard: {
      content: "",
    },
    aadhar: {
      content: "",
    },
    certification: {
      content: "",
    },
  });

  const handleImageChange = async (event) => {
    setLoading((prev) => ({ ...prev, changeimg: true }));
    const file = event.target.files?.[0] || null;

    if (file) {
      await handleImageUpload(file); // Wait for the upload to complete
    } else {
      setLoading((prev) => ({ ...prev, changeimg: false })); // Reset loading if no file selected
    }
  };

  const [loading, setLoading] = useState({
    changeimg: false,
  });
  const [passwordInputs, setPasswordInputs] = useState({
    currentpass: "",
    newpass: "",
    confirmpass: "",
  });

  const [options, setOptions] = useState({
    address: false,
    accident: false,
    breaks: false,
    care: false,
    backpain: false,
  });
  const handleGeneralHealth = () => {
    Axios.post(
      `${import.meta.env.VITE_API_URL}/user/updateProfile`,
      {
        generalhealth: {
          refBMI: inputs.bmi,
          refBP: inputs.bp,
          refBlood: inputs.bloodgroup,
          refElse: inputs.genderalanything,
          refHeight: parseInt(inputs.height, 10), // Ensure radix is provided
          refOthers: inputs.breaksotheractivities,
          refRecentFractures: options.breaks,
          refRecentFracturesReason: inputs.breaksdetails,
          refRecentInjuries: options.accident,
          refRecentInjuriesReason: inputs.accidentdetails,
          refWeight: parseInt(inputs.weight, 10), // Ensure radix is provided
        },
      },
      {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
          "Content-Type": "application/json", // Content-Type is required
        },
      }
    )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (!data.token) {
          navigate("/expired");
        } else {
          localStorage.setItem("JWTtoken", `Bearer ${data.token}`);

          console.log(data.success);

          if (data.success) {
            setEdits((prevEdits) => ({
              ...prevEdits,
              gendrel: false,
            }));
          }
        }
      })
      .catch((err) => {
        console.error("Error updating general health: ", err);
      });
  };

  const handlesubmitaddress = () => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/user/updateProfile",
        {
          address: {
            addresstype: options.address,
            refAdAdd1: inputs.peraddress,
            refAdArea1: "",
            refAdCity1: inputs.percity,
            refAdState1: inputs.perstate,
            refAdPincode1: parseInt(inputs.perpincode),
            refAdAdd2: inputs.tempaddress,
            refAdArea2: "",
            refAdCity2: inputs.tempcity,
            refAdState2: inputs.tempstate,
            refAdPincode2: parseInt(inputs.temppincode),
          },
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
        if (data.token === false) {
          navigate("/expired");
        } else {
          localStorage.setItem("JWTtoken", "Bearer " + data.token);

          console.log(data.success);

          if (data.success) {
            setEdits((prevEdits) => ({
              ...prevEdits,
              address: false,
            }));
          }
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const handleInputPass = (event) => {
    setPasswordError({
      status: false,
      message: "",
    });

    const { name, value } = event.target;

    setPasswordInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleDocument = (e) => {
    e.preventDefault();

    const fileInput = e.target.elements.file;
    const fileName = e.target.elements.fileName.value;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", fileName);

      // Handle upload logic here (e.g., using fetch or axios)
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };
  const [employeeData, setEmployeeData] = useState({
    refExperence: "",
    refSpecialization: "",
  });

  const updateInputs = (documents) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      pancard: documents.panCard || prevInputs.pancard,
      aadhar: documents.aadharCard || prevInputs.aadhar,
      certification: documents.certification || prevInputs.certification,
    }));
  };
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });

  const handlepersonalinfo = () => {
    Axios.post(
      import.meta.env.VITE_API_URL + "/user/updateProfile",
      {
        personalData: {
          refOccupation: inputs.occupation,
          refQualification: inputs.qualification,
          refStAge: parseInt(inputs.age),
          refStDOB: new Date(inputs.dob),
          refStFName: inputs.fname,
          refStLName: inputs.lname,
          refStSex: inputs.gender,
          refguardian: inputs.guardianname,
          refMaritalStatus: inputs.maritalstatus,
          refWeddingDate: inputs.anniversarydate
            ? inputs.anniversarydate
            : null,
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
        console.log("Response -----------", res);

        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.token === false) {
          navigate("/expired");
        } else {
          localStorage.setItem("JWTtoken", "Bearer " + data.token + "");

          console.log(data.success);

          if (data.success) {
            setEdits({
              ...edits,
              personal: false,
            });
          }
        }
      })
      .catch((err) => {
        // Catching any 400 status or general errors
        console.log("Error: ", err);
      });
  };
  const handlePassword = (event) => {
    event.preventDefault();

    if (passwordInputs.newpass !== passwordInputs.confirmpass) {
      setPasswordError({
        status: true,
        message: "Confirm Password Doesn't Match",
      });
      return;
    }

    Axios.post(
      `${import.meta.env.VITE_API_URL}/changePassword`,
      {
        oldPassword: passwordInputs.currentpass,
        newPassword: passwordInputs.newpass,
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

        if (!data.token) {
          navigate("/expired");
        } else {
          localStorage.setItem("JWTtoken", `Bearer ${data.token}`);

          console.log("Password Change-------------", data);

          if (data.success) {
            setPasswordInputs({
              currentpass: "",
              newpass: "",
              confirmpass: "",
            });
            setPasswordError({
              status: false,
              message: "",
            });
          } else {
            setPasswordError({
              status: true,
              message: "Invalid Current Password",
            });
          }
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  return (
    <div className="pt-[120px] pb-[100px]">
      {/* <div className="headerPrimary">
              <h3>PROFILE</h3>
              <div className="quickAcces">
                <Skeleton
                  shape="circle"
                  size="3rem"
                  className="mr-2"
                ></Skeleton>
                <h3 className="flex-col flex items-center justify-center text-center ml-2 lg:ml-2 mr-0 lg:mr-5">
                  <Skeleton width="7rem" className="mb-2"></Skeleton>
                  <Skeleton width="7rem" className="mb-2"></Skeleton>
                </h3>
              </div>{" "}
            </div>

            <div className="userProfilePage">
              <Skeleton
                className="lg:m-[30px] shadow-lg"
                width="95%"
                height="50vh"
                borderRadius="16px"
              ></Skeleton>
              <Skeleton
                className="lg:m-[30px] shadow-lg"
                width="95%"
                height="30vh"
                borderRadius="16px"
              ></Skeleton>
              <div className="py-1"></div>
            </div> */}

      {/* ******************************************************************************** */}

      <div className="bg-[#f6f5f5]">
        

        <div className="userProfilePage">
          {/* Personal Information */}
          <ToastContainer />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlepersonalinfo();
            }}
          >
            <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
                <div className="w-[100%] flex justify-between items-center mb-5">
                  <div className="text-[1.2rem] lg:text-[25px] font-bold">
                    Personal Information
                  </div>
                  {edits.personal ? (
                    <button
                      className="text-[15px] outline-none py-2 border-none px-3 bg-[#f95005] font-bold cursor-pointer text-white rounded"
                      type="submit"
                    >
                      Save&nbsp;&nbsp;
                      <i className="text-[15px] pi pi-check"></i>
                    </button>
                  ) : (
                    <div
                      onClick={() => {
                        editform("personal");
                      }}
                      className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                    >
                      Edit&nbsp;&nbsp;
                      <i className="text-[15px] pi pi-pen-to-square"></i>
                    </div>
                  )}
                </div>
                <div className="w-[100%] flex flex-col lg:flex-row justify-center items-center">
                  <div className="w-[100%] mb-10 lg:mb-0 lg:w-[30%] flex flex-col justify-center lg:justify-start items-center lg:items-start">
                    {!inputs.profilefile ? (
                      <div className="w-[250px] border-[#b3b4b6] cursor-pointer rounded-full flex justify-center items-center border-2 h-[250px]">
                        <i className="text-[150px] text-[#858585] pi pi-user"></i>
                      </div>
                    ) : (
                      <div className="w-[250px] border-[#b3b4b6] cursor-pointer rounded-full flex justify-center items-center border-2 h-[250px]">
                        <img
                          id="userprofileimg"
                          className="w-[250px] h-[250px] object-cover rounded-full"
                          src={`data:${inputs.profilefile.contentType};base64,${inputs.profilefile.content}`}
                          alt=""
                        />
                      </div>
                    )}

                    <div className="w-[250px] flex flex-col justify-center items-center">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/png, image/jpeg" // Only accept PNG and JPG
                        onChange={handleImageChange} // Handle file change
                      />

                      {/* Styled label that looks like a button */}

                      {loading.changeimg ? (
                        <label className="w-[250px] bg-[#f95005] hover:bg-[#e14b04] focus:outline-none border-none py-2 px-4 rounded font-normal text-white text-[1.2rem] lg:text-[18px] text-center mt-4 cursor-pointer">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="title-04a desc-04a"
                            aria-live="polite"
                            aria-busy="true"
                            className="w-[14px] h-[14px] animate animate-spin"
                          >
                            <title id="title-04a">Icon title</title>
                            <desc id="desc-04a">Some desc</desc>
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              className="stroke-grey-200"
                              stroke-width="4"
                            />
                            <path
                              d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
                              className="stroke-white"
                              stroke-width="4"
                            />
                          </svg>
                        </label>
                      ) : (
                        <label
                          htmlFor="file-upload"
                          className="w-[250px] bg-[#f95005] hover:bg-[#e14b04] focus:outline-none border-none py-2 px-4 rounded font-normal text-white text-[1.2rem] lg:text-[18px] text-center mt-4 cursor-pointer"
                        >
                          Change Image
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="w-[100%] lg:w-[65%] flex flex-col justify-center items-center">
                    <div className="w-[100%] justify-center items-center flex flex-col">
                      <div className="w-[100%] flex justify-between mb-[20px]">
                        <div className="w-[48%]">
                          <TextInput
                            label="First Name *"
                            name="fname"
                            id="fname"
                            type="text"
                            onChange={handleInputVal}
                            value={inputs.fname}
                            readonly={!edits.personal}
                            required
                          />
                        </div>
                        <div className="w-[48%]">
                          <TextInput
                            label="Last Name *"
                            name="lname"
                            id="lname"
                            type="text"
                            onChange={handleInputVal}
                            value={inputs.lname}
                            readonly={!edits.personal}
                            required
                          />
                        </div>
                      </div>

                      <div className="w-[100%] flex justify-between mb-[20px]">
                        <div className="w-[48%]">
                          <TextInput
                            label="Date of Birth *"
                            name="dob"
                            id="dob"
                            type="date"
                            onChange={handleInputVal}
                            value={inputs.dob}
                            readonly={!edits.personal}
                            required
                          />
                        </div>
                        <div className="w-[48%]">
                          <TextInput
                            label="Age *"
                            name="age"
                            id="age"
                            type="number"
                            value={inputs.age}
                            readonly
                            required
                          />
                        </div>
                      </div>

                      <div className="w-[100%] flex flex-col lg:flex-row gap-y-[20px] justify-between mb-[20px]">
                        <div className="w-[100%] lg:w-[48%]">
                          <SelectInput
                            id="gender"
                            name="gender"
                            label="Gender *"
                            value={inputs.gender}
                            disabled={!edits.personal}
                            onChange={handleInputVal}
                            options={[
                              { value: "male", label: "Male" },
                              { value: "female", label: "Female" },
                            ]}
                            required
                          />
                        </div>
                        <div className="w-[100%] lg:w-[48%]">
                          <TextInput
                            label="Father / Husband Name *"
                            name="guardianname"
                            id="guardianname"
                            type="text"
                            onChange={handleInputVal}
                            value={inputs.guardianname}
                            readonly={!edits.personal}
                            required
                          />
                        </div>
                      </div>

                      <div className="w-[100%] flex flex-col md:flex-row gap-y-[20px] justify-between mb-[20px]">
                        <div className="w-[100%] md:w-[48%] lg:w-[48%]">
                          <SelectInput
                            id="maritalstatus"
                            name="maritalstatus"
                            label="Marital Status *"
                            value={inputs.maritalstatus}
                            onChange={handleInputVal}
                            options={[
                              { value: "single", label: "Single" },
                              { value: "married", label: "Married" },
                            ]}
                            disabled={
                              !edits.personal && inputs.age > "18"
                                ? false
                                : true
                            }
                            required
                          />
                        </div>
                        <div className="w-[100%] md:w-[48%] lg:w-[48%]">
                          <TextInput
                            label="Anniversary Date *"
                            name="anniversarydate"
                            id="anniversarydate"
                            type="date"
                            onChange={handleInputVal}
                            disabled={
                              inputs.maritalstatus === "married" ? false : true
                            }
                            readonly={!edits.personal}
                            value={inputs.anniversarydate}
                            required
                          />
                        </div>
                      </div>

                      <div className="w-[100%] flex justify-between">
                        <div
                          className={
                            localStorage.getItem("refUtId") === "5" ||
                            localStorage.getItem("refUtId") === "6"
                              ? "w-[48%]"
                              : "w-[100%]"
                          }
                        >
                          <TextInput
                            label="Qualification *"
                            name="qualification"
                            id="qualification"
                            type="text"
                            disabled={inputs.age > "18" ? false : true}
                            onChange={handleInputVal}
                            value={inputs.qualification}
                            readonly={!edits.personal}
                            required
                          />
                        </div>

                        {localStorage.getItem("refUtId") === "5" ||
                        localStorage.getItem("refUtId") === "6" ? (
                          <div className="w-[48%]">
                            <TextInput
                              label="Occupation *"
                              name="occupation"
                              id="Occupation"
                              type="text"
                              disabled={inputs.age > "18" ? false : true}
                              onChange={handleInputVal}
                              value={inputs.occupation}
                              readonly={!edits.personal}
                              required
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </form>

          {/* Address */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlesubmitaddress();
            }}
          >
            <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
              <div className="w-[100%] flex justify-between items-center mb-5">
                <div className="text-[1.2rem] lg:text-[25px] font-bold">
                  Address
                </div>
                {edits.address ? (
                  <button
                    className="text-[15px] outline-none py-2 border-none px-3 bg-[#f95005] font-bold cursor-pointer text-white rounded"
                    type="submit"
                  >
                    Save&nbsp;&nbsp;
                    <i className="text-[15px] pi pi-check"></i>
                  </button>
                ) : (
                  <div
                    onClick={() => {
                      editform("address");
                    }}
                    className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                  >
                    Edit&nbsp;&nbsp;
                    <i className="text-[15px] pi pi-pen-to-square"></i>
                  </div>
                )}
              </div>
              <div className="w-[100%] flex justify-center items-center">
                <div className="w-[100%] justify-center items-center flex flex-col">
                  <div className="text-[1.2rem] lg:text-[25px] font-bold mb-5">
                    Permanent Address
                  </div>
                  <div className="w-[100%] flex flex-col lg:flex-row gap-y-[20px] justify-between mb-[20px]">
                    <div className="w-[100%] lg:w-[48%]">
                      <TextInput
                        label="Residential  Address *"
                        name="peraddress"
                        id="peraddress"
                        type="text"
                        onChange={handleInputVal}
                        value={inputs.peraddress}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                    <div className="w-[100%] lg:w-[48%]">
                      <TextInput
                        label="Pincode *"
                        name="perpincode"
                        id="perpincode"
                        type="number"
                        onChange={handleInputVal}
                        value={inputs.perpincode}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                  </div>

                  <div className="w-[100%] flex justify-between mb-[20px]">
                    <div className="w-[48%]">
                      <TextInput
                        label="State *"
                        name="perstate"
                        id="perstate"
                        type="text"
                        onChange={handleInputVal}
                        value={inputs.perstate}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                    <div className="w-[48%]">
                      <TextInput
                        label="City *"
                        name="percity"
                        id="percity"
                        type="text"
                        onChange={handleInputVal}
                        value={inputs.percity}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                  </div>

                  <div className="w-[100%]">
                    <CheckboxInput
                      id="bothaddress"
                      label="Use Communication Address & Permanent Address as Same."
                      checked={options.address}
                      onChange={() => {
                        setOptions({
                          ...options,
                          address: !options.address,
                        });

                        if (!options.address) {
                          setInputs({
                            ...inputs,
                            tempaddress: inputs.peraddress,
                            temppincode: inputs.perpincode,
                            tempstate: inputs.perstate,
                            tempcity: inputs.percity,
                          });
                        } else {
                          setInputs({
                            ...inputs,
                            tempaddress: "",
                            temppincode: "",
                            tempstate: "",
                            tempcity: "",
                          });
                        }
                      }}
                      readonly={!edits.address}
                    />
                  </div>

                  <div className="text-[1.2rem] lg:text-[25px] font-bold mb-5">
                    Communication Address
                  </div>

                  <div className="w-[100%] flex flex-col lg:flex-row gap-y-[20px] justify-between mb-[20px]">
                    <div className="w-[100%] lg:w-[48%]">
                      <TextInput
                        label="Residential Address *"
                        name="tempaddress"
                        id="tempaddress"
                        type="text"
                        onChange={handleInputVal}
                        value={inputs.tempaddress}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                    <div className="w-[100%] lg:w-[48%]">
                      <TextInput
                        label="Pincode *"
                        name="temppincode"
                        id="temppincode"
                        type="number"
                        onChange={handleInputVal}
                        value={inputs.temppincode}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* Communication Type */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlecommunicationtype();
            }}
          >
            <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
              <div className="w-[100%] flex justify-between items-center mb-5">
                <div className="text-[1rem] lg:text-[25px] font-bold">
                  Communication Type
                </div>
                {edits.communitcation ? (
                  <button
                    className="text-[15px] outline-none py-2 border-none px-3 bg-[#f95005] font-bold cursor-pointer text-white rounded"
                    type="submit"
                  >
                    Save&nbsp;&nbsp;
                    <i className="text-[15px] pi pi-check"></i>
                  </button>
                ) : (
                  <div
                    onClick={() => {
                      editform("communitcation");
                    }}
                    className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                  >
                    Edit&nbsp;&nbsp;
                    <i className="text-[15px] pi pi-pen-to-square"></i>
                  </div>
                )}
              </div>

              <div className="w-[100%] flex flex-col justify-center items-center">
                <div className="w-[100%] flex justify-between mb-[20px]">
                  <div className="w-[100%]">
                    <TextInput
                      label="E-Mail *"
                      name="email"
                      id="email"
                      type="email"
                      onChange={handleInputVal}
                      value={inputs.email}
                      readonly={!edits.communitcation}
                      required
                    />
                  </div>
                </div>
                <div className="w-[100%] flex flex-col lg:flex-row gap-y-[20px] justify-between mb-[20px]">
                  <div className="w-[100%] lg:w-[40%]">
                    <TextInput
                      label="Phone Number *"
                      name="phoneno"
                      id="phoneno"
                      type="number"
                      onChange={handleInputVal}
                      value={inputs.phoneno}
                      readonly={!edits.communitcation}
                      required
                    />
                  </div>
                  <div className="w-[100%] lg:w-[56%] flex justify-between">
                    <div className="w-[65%] lg:w-[75%]">
                      <TextInput
                        label="WhatsApp Number *"
                        name="whatsappno"
                        id="whatsappno"
                        type="number"
                        onChange={handleInputVal}
                        value={inputs.whatsappno}
                        readonly={!edits.communitcation}
                        required
                      />
                    </div>
                    <div
                      className="w-[30%] lg:w-[18%] text-[0.7rem] lg:text-[14px] flex justify-center items-center text-center bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                      onClick={() => {
                        if (edits.communitcation) {
                          setInputs({
                            ...inputs,
                            whatsappno: inputs.phoneno,
                          });
                        } else {
                          console.log("Edit Disabled");
                        }
                      }}
                    >
                      Use Same Number
                    </div>
                  </div>
                </div>
                <div className="w-[100%] ">
                  <SelectInput
                    id="modeofcontact"
                    name="mode"
                    label="Mode of Contact *"
                    value={inputs.mode}
                    onChange={handleInputVal}
                    options={
                      modeofcontact
                        ? Object.entries(modeofcontact).map(
                            ([value, label]) => ({
                              value, // The key as value
                              label, // The value as label
                            })
                          )
                        : [] // Empty array before the data is loaded
                    }
                    disabled={!edits.communitcation}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
          {localStorage.getItem("refUtId") === "5" ||
          localStorage.getItem("refUtId") === "6" ? (
            <>
              {/* Genderal Health */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlegenderalhealth();
                }}
              >
                <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
                  <div className="w-[100%] flex justify-between items-center mb-5">
                    <div className="text-[1.2rem] lg:text-[25px] font-bold">
                      General Health
                    </div>
                    {edits.gendrel ? (
                      <button
                        className="text-[15px] outline-none py-2 border-none px-3 bg-[#f95005] font-bold cursor-pointer text-white rounded"
                        type="submit"
                      >
                        Save&nbsp;&nbsp;
                        <i className="text-[15px] pi pi-check"></i>
                      </button>
                    ) : (
                      <div
                        onClick={() => {
                          editform("gendrel");
                        }}
                        className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                      >
                        Edit&nbsp;&nbsp;
                        <i className="text-[15px] pi pi-pen-to-square"></i>
                      </div>
                    )}
                  </div>
                  <div className="w-[100%] flex flex-col justify-center items-center">
                    <div className="w-[100%] flex justify-between mb-[20px]">
                      <div className="w-[48%]">
                        <TextInput
                          label="Height in CM *"
                          name="height"
                          id="height"
                          type="number"
                          onChange={handleInputVal}
                          value={inputs.height}
                          readonly={!edits.gendrel}
                          required
                        />
                      </div>
                      <div className="w-[48%]">
                        <TextInput
                          label="Weight in KG *"
                          name="weight"
                          id="weight"
                          type="number"
                          onChange={handleInputVal}
                          value={inputs.weight}
                          readonly={!edits.gendrel}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-[100%] flex justify-between mb-[20px]">
                      <div className="w-[48%]">
                        <SelectInput
                          id="bloodgroup"
                          name="bloodgroup"
                          label="Blood Group *"
                          onChange={handleInputVal}
                          value={inputs.bloodgroup}
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
                          disabled={!edits.gendrel}
                          required
                        />
                      </div>
                      <div className="w-[48%]">
                        <TextInput
                          label="BMI"
                          name="bmi"
                          id="bmi"
                          type="number"
                          onChange={handleInputVal}
                          value={inputs.bmi}
                          readonly={!edits.gendrel}
                        />
                      </div>
                    </div>
                    <div className="w-[100%] flex justify-between mb-[20px]">
                      <div className="w-[100%]">
                        <TextInput
                          label="BP"
                          name="bp"
                          id="bp"
                          type="number"
                          onChange={handleInputVal}
                          value={inputs.bp}
                          readonly={!edits.gendrel}
                        />
                      </div>
                    </div>

                    <div className="w-[100%] flex flex-col lg:flex-row gap-y-[25px] justify-between mb-[25px]">
                      <div className="w-[100%] lg:w-[48%]">
                        <label className="w-[100%] text-[#f95005] font-bold text-[1.0rem] lg:text-[20px] text-start">
                          Recent injuries / Accidents / Operations *{" "}
                        </label>
                        <div className="w-[100%] flex justify-start mt-[10px]">
                          <div className="mr-10">
                            <RadiobuttonInput
                              id="accidentyes"
                              value="yes"
                              name="accident"
                              selectedOption={options.accident ? "yes" : ""}
                              onChange={() => {
                                setOptions({
                                  ...options,
                                  accident: true,
                                });
                              }}
                              label="Yes"
                              readonly={!edits.gendrel}
                              required
                            />
                          </div>
                          <div className="">
                            <RadiobuttonInput
                              id="accidentno"
                              value="no"
                              name="accident"
                              label="No"
                              onChange={() => {
                                setOptions({
                                  ...options,
                                  accident: false,
                                });

                                setInputs({
                                  ...inputs,
                                  accidentdetails: "",
                                });
                              }}
                              selectedOption={!options.accident ? "no" : ""}
                              readonly={!edits.gendrel}
                              required
                            />
                          </div>
                        </div>
                        <div className="w-[100%] mt-[20px]">
                          <div className="w-[100%]">
                            <TextInput
                              label="Details"
                              name="accidentdetails"
                              id="details"
                              type="text"
                              onChange={handleInputVal}
                              value={inputs.accidentdetails}
                              disabled={!options.accident}
                              readonly={!edits.gendrel}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[100%] lg:w-[48%]">
                        <label className="w-[100%] text-[#f95005] font-bold text-[1.0rem] lg:text-[20px] text-start">
                          Recent breaks / Fractures / Sprains *
                        </label>
                        <div className="w-[100%] flex justify-start mt-[10px]">
                          <div className="mr-10">
                            <RadiobuttonInput
                              id="breaksyes"
                              value="yes"
                              name="breaks"
                              label="Yes"
                              selectedOption={options.breaks ? "yes" : ""}
                              onChange={() => {
                                setOptions({
                                  ...options,
                                  breaks: true,
                                });
                              }}
                              readonly={!edits.gendrel}
                              required
                            />
                          </div>
                          <div className="">
                            <RadiobuttonInput
                              id="breaksno"
                              value="no"
                              name="breaks"
                              label="No"
                              selectedOption={!options.breaks ? "no" : ""}
                              onChange={() => {
                                setOptions({
                                  ...options,
                                  breaks: false,
                                });
                                setInputs({
                                  ...inputs,
                                  breaksdetails: "",
                                  breaksotheractivities: "",
                                });
                              }}
                              readonly={!edits.gendrel}
                              required
                            />
                          </div>
                        </div>
                        <div className="w-[100%] flex justify-between mt-[20px]">
                          <div className="w-[48%]">
                            <TextInput
                              label="Details"
                              name="breaksdetails"
                              id="details"
                              type="text"
                              onChange={handleInputVal}
                              value={inputs.breaksdetails}
                              disabled={!options.breaks}
                              readonly={!edits.gendrel}
                              required
                            />
                          </div>
                          <div className="w-[48%]">
                            <TextInput
                              label="Other Activities"
                              name="breaksotheractivities"
                              id="otheractivities"
                              type="text"
                              onChange={handleInputVal}
                              value={inputs.breaksotheractivities}
                              disabled={!options.breaks}
                              readonly={!edits.gendrel}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] flex justify-between">
                      <div className="w-[100%]">
                        <TextInput
                          label="Anything else"
                          name="genderalanything"
                          id="anythingelse"
                          type="text"
                          onChange={handleInputVal}
                          value={inputs.genderalanything}
                          readonly={!edits.gendrel}
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {/* Past or Present Health */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlepresenthealth();
                }}
              >
                <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
                  <div className="w-[100%] flex justify-between items-center mb-5">
                    <div className="text-[1.2rem] lg:text-[25px] font-bold">
                      Past or Present Health
                    </div>
                    {edits.present ? (
                      <button
                        className="text-[15px] outline-none py-2 border-none px-3 bg-[#f95005] font-bold cursor-pointer text-white rounded"
                        type="submit"
                      >
                        Save&nbsp;&nbsp;
                        <i className="text-[15px] pi pi-check"></i>
                      </button>
                    ) : (
                      <div
                        onClick={() => {
                          editform("present");
                        }}
                        className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                      >
                        Edit&nbsp;&nbsp;
                        <i className="text-[15px] pi pi-pen-to-square"></i>
                      </div>
                    )}
                  </div>
                  <div className="w-[100%] flex justify-center items-center">
                    <div className="w-[100%] justify-center items-center flex flex-col">
                      <div className="w-[100%] flex flex-wrap gap-y-[10px] lg:gap-y-[30px] gap-x-10 mb-[20px]">
                        {conditions.map((condition, index) => (
                          <div className="w-[140px]" key={index}>
                            <CheckboxInput
                              id={`condition-${index}`}
                              checked={condition.checked === 1}
                              label={condition.label}
                              onChange={() => handleCheckboxChange(index)}
                              readonly={!edits.present}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="w-[100%] flex flex-col lg:flex-row gap-y-[20px] justify-between mb-[20px]">
                        <div className="w-[100%] lg:w-[48%]">
                          <TextInput
                            label="Others"
                            name="pastother"
                            id="others"
                            type="text"
                            onChange={handleInputVal}
                            value={inputs.pastother}
                            readonly={!edits.present}
                          />
                        </div>
                        <div className="w-[100%] lg:w-[48%]">
                          <TextInput
                            label="Current Medicines"
                            name="pastmedicaldetails"
                            id="medicaldetails"
                            type="text"
                            onChange={handleInputVal}
                            value={inputs.pastmedicaldetails}
                            readonly={!edits.present}
                          />
                        </div>
                      </div>

                      <div className="w-[100%] flex flex-col gap-y-[20px] lg:flex-row justify-between">
                        <div className="w-[100%] lg:w-[48%]">
                          <label className="w-[100%] text-[#f95005] font-bold text-[1rem] lg:text-[20px] text-start">
                            Under Physician's Care *
                          </label>
                          <div className="w-[100%] flex justify-start mt-[10px]">
                            <div className="mr-10">
                              <RadiobuttonInput
                                id="careyes"
                                value="yes"
                                name="care"
                                label="Yes"
                                selectedOption={options.care ? "yes" : ""}
                                onChange={() => {
                                  setOptions({
                                    ...options,
                                    care: true,
                                  });
                                }}
                                readonly={!edits.present}
                                required
                              />
                            </div>
                            <div className="">
                              <RadiobuttonInput
                                id="careno"
                                value="no"
                                name="care"
                                label="No"
                                selectedOption={!options.care ? "no" : ""}
                                onChange={() => {
                                  setOptions({
                                    ...options,
                                    care: false,
                                  });
                                }}
                                readonly={!edits.present}
                                required
                              />
                            </div>
                          </div>
                          <div className="w-[100%] flex justify-between mt-[20px]">
                            <div className="w-[48%]">
                              <TextInput
                                label="Doctor Name"
                                name="caredoctorname"
                                id="doctorname"
                                type="text"
                                onChange={handleInputVal}
                                value={inputs.caredoctorname}
                                disabled={!options.care}
                                readonly={!edits.present}
                                required
                              />
                            </div>
                            <div className="w-[48%]">
                              <TextInput
                                label="Hospital"
                                name="caredoctorhospital"
                                id="hospital"
                                type="text"
                                onChange={handleInputVal}
                                value={inputs.caredoctorhospital}
                                disabled={!options.care}
                                readonly={!edits.present}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-[100%] lg:w-[48%]">
                          <label className="w-[100%] text-[#f95005] font-bold text-[1rem] lg:text-[20px] text-start">
                            Back Pain *
                          </label>
                          <div className="w-[100%] flex justify-start mt-[10px]">
                            <div className="mr-10">
                              <RadiobuttonInput
                                id="painyes"
                                value="yes"
                                name="pain"
                                label="Yes"
                                selectedOption={options.backpain ? "yes" : ""}
                                onChange={() => {
                                  setOptions({
                                    ...options,
                                    backpain: true,
                                  });
                                }}
                                readonly={!edits.present}
                                required
                              />
                            </div>
                            <div className="">
                              <RadiobuttonInput
                                id="painno"
                                value="no"
                                name="pain"
                                label="No"
                                selectedOption={!options.backpain ? "no" : ""}
                                onChange={() => {
                                  setOptions({
                                    ...options,
                                    backpain: false,
                                  });
                                }}
                                readonly={!edits.present}
                                required
                              />
                            </div>
                          </div>

                          <div className="w-[100%] mt-[20px]">
                            <div className="w-[100%]">
                              <SelectInput
                                id="painscale"
                                name="backpainscale"
                                label="Pain Scale"
                                onChange={handleInputVal}
                                value={inputs.backpainscale}
                                options={[
                                  { value: "upper", label: "Upper" },
                                  { value: "middle", label: "Middle" },
                                  { value: "lower", label: "Lower" },
                                ]}
                                disabled={!options.backpain || !edits.present}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              {/* Therapy */}
              <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
                <div className="w-[100%] flex justify-between items-center mb-5">
                  <div className="text-[1.2rem] lg:text-[25px] font-bold">
                    Therapy
                  </div>
                  {edits.therapy ? (
                    <div
                      className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                      onClick={handletherapy}
                    >
                      Save&nbsp;&nbsp;
                      <i className="text-[15px] pi pi-check"></i>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        editform("therapy");
                      }}
                      className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                    >
                      Edit&nbsp;&nbsp;
                      <i className="text-[15px] pi pi-pen-to-square"></i>
                    </div>
                  )}
                </div>
                <div className="w-[100%] flex justify-center items-center">
                  <div className="w-[100%] justify-center items-center flex flex-col">
                    <div className="w-[100%] flex flex-col lg:flex-row gap-y-[20px] justify-between mb-[20px]">
                      <div className="w-[100%] lg:w-[48%]">
                        <TextInput
                          label="Duration of the Problem"
                          name="therapydurationproblem"
                          id="durationproblem"
                          type="text"
                          onChange={handleInputVal}
                          value={inputs.therapydurationproblem}
                          readonly={!edits.therapy}
                        />
                      </div>
                      <div className="w-[100%] lg:w-[48%]">
                        <TextInput
                          label="Relevant Past History"
                          name="therapypasthistory"
                          id="relevantpasthistory"
                          type="text"
                          onChange={handleInputVal}
                          value={inputs.therapypasthistory}
                          readonly={!edits.therapy}
                        />
                      </div>
                    </div>

                    <div className="w-[100%] flex flex-col lg:flex-row gap-y-[20px] justify-between">
                      <div className="w-[100%] lg:w-[48%]">
                        <TextInput
                          label="Relevant Family History"
                          name="therapyfamilyhistory"
                          id="relevantfamilyhistory"
                          type="text"
                          onChange={handleInputVal}
                          value={inputs.therapyfamilyhistory}
                          readonly={!edits.therapy}
                        />
                      </div>
                      <div className="w-[100%] lg:w-[48%]">
                        <TextInput
                          label="Anything else"
                          name="therapyanythingelse"
                          id="anythingelse"
                          type="text"
                          onChange={handleInputVal}
                          value={inputs.therapyanythingelse}
                          readonly={!edits.therapy}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {localStorage.getItem("refUtId") === "7" ? (
                <></>
              ) : (
                <>
                  <form onSubmit={handleDocumentSubmit}>
                  <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
              <div className="w-[100%] flex justify-between items-center mb-5">
                <div className="text-[1rem] lg:text-[25px] font-bold">
                          Documentation
                        </div>
                        {edits.therapy ? (
                          <div
                            className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                            onClick={handletherapy}
                          >
                            Save&nbsp;&nbsp;
                            <i className="text-[15px] pi pi-check"></i>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              editform("therapy");
                            }}
                            className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                          >
                            Edit&nbsp;&nbsp;
                            <i className="text-[15px] pi pi-pen-to-square"></i>
                          </div>
                        )}
                      </div>
                     
                      <div className="flex justify-end mb-4">

                        <button
                          type="button"
                          onClick={handleAddDocument}
                          className="py-2 px-4 bg-[#f95005] text-white rounded hover:bg-[#f95005]"
                        >
                          Add New Document
                        </button>
                      </div>

                      {documents.map((doc, index) => (
  <div
    key={index}
    className="w-[100%] gap-5 flex flex-row lg:p-[10px] mt-5 lg:mt-0"
  >
    <div className="pt-5">
      <FaEye
        className="w-[30px] h-[25px] text-[#f95005] cursor-pointer"
        onClick={() => handlePreviewDocument(index)}
      />
    </div>
    <div className="mb-4 w-[40%]">
      <label
        htmlFor={`fileName-${index}`}
        className="block text-gray-700 font-medium mb-2"
      >
        Enter File Name:
      </label>
      <input
        type="text"
        id={`fileName-${index}`}
        name={`fileName-${index}`}
        placeholder="Enter a name for the file"
        className="w-full border border-gray-300 rounded px-4 py-2"
        value={doc.fileName}
        onChange={(e) =>
          handleInputChange(index, "fileName", e.target.value)
        }
        required
      />
    </div>
    <div className="mb-4 w-[40%]">
      <label
        htmlFor={`fileInput-${index}`}
        className="block text-gray-700 font-medium mb-2"
      >
        Upload File:
      </label>
      <input
        type="file"
        id={`fileInput-${index}`}
        name={`file-${index}`}
        accept="application/pdf,image/*"
        className="w-full border border-gray-300 rounded px-4 py-2 uploadfile"
        onChange={(e) => handleInputChange(index, "file", e.target.files[0])}
        required
      />
    </div>
    <button type="submit" className="text-[green]">
      <ImUpload2 className="w-[30px] h-[25px]" />
    </button>
    <button
      type="button"
      onClick={() => handleDeleteDocument(index)}
      className="text-[red]"
    >
      <MdDelete className="w-[30px] h-[30px]" />
    </button>
  </div>
))}

                     
                    </div>
                  </form>
                </>
              )}
            </>
          )}
          <form onSubmit={handlePassword}>
            <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
              <div className="w-[100%] flex justify-between items-center mb-5">
                <div className="text-[1rem] lg:text-[25px] font-bold">
                  Change Password
                </div>
              </div>

              <div className="w-[100%] flex justify-between items-center mb-4">
                <div className="w-[100%] flex justify-between">
                  <div className="w-[100%]">
                    <PasswordInput
                      label="Current Password"
                      name="currentpass"
                      id="currentpass"
                      onChange={handleInputPass}
                      value={passwordInputs.currentpass}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="w-[100%] flex justify-between items-center mb-4">
                <div className="w-[100%] flex justify-between">
                  <div className="w-[48%]">
                    <PasswordInput
                      label="New Password"
                      name="newpass"
                      id="newpassword"
                      onChange={handleInputPass}
                      value={passwordInputs.newpass}
                      required
                    />
                  </div>
                  <div className="w-[48%]">
                    <PasswordInput
                      label="Confirm Password"
                      name="confirmpass"
                      id="confimpassword"
                      onChange={handleInputPass}
                      value={passwordInputs.confirmpass}
                      required
                    />
                  </div>
                </div>
              </div>

              {passwordError.status ? (
                <>
                  <div className="mb-4">
                    <ErrorMessage message={passwordError.message} />
                  </div>
                </>
              ) : null}

              <div className="w-[100%] flex justify-start">
                <button
                  className="text-[18px] outline-none py-2 border-none px-5 bg-[#f95005] font-bold cursor-pointer text-white rounded"
                  type="submit"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>

          <div className="py-1"></div>
        </div>
      </div>
    </div>
  );
}
