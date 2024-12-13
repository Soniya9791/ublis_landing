import React, { useState, useEffect } from "react";
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
import Swal from "sweetalert2";

import { FaEye } from "react-icons/fa";

const Landingprofile = () => {
  const navigate = useNavigate();
  const [modeofcontact, setModeofContact] = useState(undefined);
  const [options, setOptions] = useState({
    address: false,
    accident: false,
    breaks: false,
    care: false,
    backpain: false,
  });

  const decrypt = (encryptedData, iv, key) => {
    try {
      // Create CipherParams with ciphertext
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(encryptedData),
      });

      // Perform decryption
      const decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        CryptoJS.enc.Hex.parse(key),
        {
          iv: CryptoJS.enc.Hex.parse(iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      // Convert decrypted data to UTF-8 string
      const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);

      // Parse JSON if necessary (optional based on expected output)
      const parsedResult = JSON.parse(decryptedText);

      return parsedResult;
    } catch (error) {
      console.error("Decryption error:", error);
      return null; // Handle decryption failure gracefully
    }
  };

  const [pageLoading, setPageLoading] = useState({
    verifytoken: true,
    pageData: true,
  });

  const handlepersonalinfo = () => {
    Axios.post(
      import.meta.env.VITE_API_URL + "user/updateProfile",
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

  const [edits, setEdits] = useState({
    personal: false,
    address: false,
    communication: false,
    general: false,
    present: false,
    therapy: false,
    document: false,
    prof: false,
    medDoc: false,
  });

  const editform = (event) => {
    setEdits({
      ...edits,
      [event]: true,
    });
  };
  const [userdata, setuserdata] = useState({
    username: "",
    usernameid: "",
    profileimg: { contentType: "", content: "" },
  });

  const [conditions, setConditions] = useState([]);

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

  const [uploadDocuments, setUploadDocuments] = useState([
    {
      refMedDocName: "",
      refMedDocPath: "",
      refMedDocFile: { contentType: "", content: "" },
      refMedDocUpload: false,
      refMedDocUpBtn: false,
    },
  ]);

  const [medDocData, setMedDocData] = useState([]);

  const handleImageChange = async (event) => {
    setLoading({
      ...loading,
      changeimg: true,
    });

    const file = event.target.files?.[0] || null;

    if (file) {
      handleImageUpload(file); // Pass the file directly to the upload function
    }
  };
  const handleImageUpload = async (file) => {
    if (!file) {
      setLoading({
        ...loading,
        changeimg: false,
      });
      alert("Please select an image first.");
      return;
    }

    try {
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + "director/addProfileImage",
        { file: file },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
            "Content-Type": "multipart/form-data", // Set content type to form-data
          },
        }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      if (data.token === false) {
        navigate("/expired");
      } else {
        localStorage.setItem("JWTtoken", "Bearer " + data.token);

        console.log(data);

        setInputs({
          ...inputs,
          profilefile: data.filePath,
        });

        setuserdata({
          ...userdata,
          profileimg: data.filePath,
        });

        setLoading({
          ...loading,
          changeimg: false,
        });

        console.log("Image uploaded successfully:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [loading, setLoading] = useState({
    changeimg: false,
  });

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

  useEffect(() => {
    Axios.get(import.meta.env.VITE_API_URL + "validateTokenData", {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const data = decrypt(
        res.data[1],
        res.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      if (data.token == false) {
        console.log("data.token", data.token);
        navigate("/expired");
      } else {
        localStorage.setItem("JWTtoken", "Bearer " + data.token + "");
        console.log("---------------------------- 316");
        if (data.success) {
          localStorage.setItem("JWTtoken", "Bearer " + data.token + "");
          setuserdata({
            username:
              "" + data.data[0].refStFName + " " + data.data[0].refStLName + "",
            usernameid: data.data[0].refusertype,
            profileimg: data.profileFile,
          });

          setPageLoading({
            ...pageLoading,
            verifytoken: false,
          });
        } else {
          navigate("/expired");
        }

        setuserdata({
          username:
            "" + data.data[0].refStFName + " " + data.data[0].refStLName + "",
          usernameid: data.data[0].refusertype,
          profileimg: data.profileFile,
        });

        setPageLoading({
          ...pageLoading,
          verifytoken: false,
        });
      }
      console.log("Verify Token  Running --- ");
    });
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      let url = "user/profileData";

      try {
        const response = await Axios.post(
          `${import.meta.env.VITE_API_URL}${url}`,
          { refStId: null },
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
              "Content-Type": "application/json",
            },
          }
        );

        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.token === false) {
          console.log("data.token", data.token);
          navigate("/expired");
          return;
        }

        console.log("UserData Running --- ", data);

        localStorage.setItem("JWTtoken", `Bearer ${data.token}`);

        console.log(" ------------------------------------------ 316");
        if (data.data.presentHealth) {
          console.log(" ------------------------------------------ 318");

          const healthConditions = Object.entries(
            data.data.presentHealthProblem
          ).map(([value, label]) => ({
            label,
            value: Number(value),
            checked: 0,
          }));
          console.log("healthConditions", healthConditions);
          console.log(" ------------------------------------------ 327");

          const updatedConditions = healthConditions.map((condition) => {
            const refPresentHealth =
              data?.data?.presentHealth?.refPresentHealth;

            if (Array.isArray(refPresentHealth)) {
              return refPresentHealth.includes(condition.value)
                ? { ...condition, checked: 1 }
                : condition;
            }

            // If refPresentHealth is not an array, return the condition as is
            return condition;
          });
          console.log(" ------------------------------------------ 335");

          setConditions(updatedConditions);
        } else {
          console.log(" ------------------------------------------ 338");

          setEmployeeData({
            refExperence: data.data.EmployeeData.refExperence,
            refSpecialization: data.data.EmployeeData.refSpecialization,
          });
        }
        console.log(" ------------------------------------------ 346");

        setModeofContact(data.data.modeOfCommunication);
        console.log(" ------------------------------------------ 348");

        const personalData = data.data.personalData;
        console.log("personalData", personalData);
        const addressData = data.data.address;
        console.log("addressData", addressData);
        const communication = data.data.communication;
        console.log("communication", communication);
        const generalHealth = data.data.generalhealth;
        console.log("generalHealth", generalHealth);
        const presentHealth = data.data.presentHealth;
        console.log("presentHealth", presentHealth);

        setOptions({
          address: addressData ? addressData.addresstype : false,
          accident: generalHealth ? generalHealth.refRecentInjuries : false,
          breaks: generalHealth ? generalHealth.refRecentFractures : false,
          care: presentHealth ? presentHealth.refUnderPhysicalCare : false,
          backpain: presentHealth ? presentHealth.refBackPain !== "no" : false,
        });

        setInputs({
          profilefile: data.data.profileFile,
          fname: personalData.refStFName,
          lname: personalData.refStLName,
          dob: personalData.refStDOB,
          age: personalData.refStAge,
          gender: personalData.refStSex,
          maritalstatus: personalData.refMaritalStatus,
          anniversarydate: personalData.refWeddingDate,
          guardianname: personalData.refguardian,
          qualification: personalData.refQualification,
          occupation: personalData.refOccupation,
          peraddress: addressData.refAdAdd1,
          perpincode: addressData.refAdPincode1,
          perstate: addressData.refAdState1,
          percity: addressData.refAdCity1,
          tempaddress: addressData.addresstype
            ? addressData.refAdAdd1
            : addressData.refAdAdd2,
          temppincode: addressData.addresstype
            ? addressData.refAdPincode1
            : addressData.refAdPincode2,
          tempstate: addressData.addresstype
            ? addressData.refAdState1
            : addressData.refAdState2,
          tempcity: addressData.addresstype
            ? addressData.refAdCity1
            : addressData.refAdCity2,
          email: communication.refCtEmail,
          phoneno: communication.refCtMobile,
          whatsappno: communication.refCtWhatsapp,
          mode: communication.refUcPreference,
          height: generalHealth ? generalHealth.refHeight : null,
          weight: generalHealth ? generalHealth.refWeight : null,
          bloodgroup: generalHealth ? generalHealth.refBlood : null,
          bmi: generalHealth ? generalHealth.refBMI : null,
          bp: generalHealth ? generalHealth.refBP : null,
          accidentdetails: generalHealth
            ? generalHealth.refRecentInjuriesReason
            : null,
          breaksdetails: generalHealth
            ? generalHealth.refRecentFracturesReason
            : null,
          breaksotheractivities: generalHealth ? generalHealth.refOthers : null,
          genderalanything: generalHealth ? generalHealth.refElse : null,
          pastother: presentHealth ? presentHealth.refPastHistory : null,
          pastmedicaldetails: presentHealth
            ? presentHealth.refMedicalDetails
            : null,
          caredoctorname: presentHealth ? presentHealth.refDoctor : null,
          caredoctorhospital: presentHealth ? presentHealth.refHospital : null,
          backpainscale: presentHealth ? presentHealth.refBackPain : null,
          therapydurationproblem: presentHealth
            ? presentHealth.refProblem
            : null,
          therapypasthistory: presentHealth
            ? presentHealth.refPastHistory
            : null,
          therapyfamilyhistory: presentHealth
            ? presentHealth.refFamilyHistory
            : null,
          therapyanythingelse: presentHealth
            ? presentHealth.refAnythingelse
            : null,
          pancard: data.data.employeeDocuments
            ? data.data.employeeDocuments.panCard
            : "",
          aadhar: data.data.employeeDocuments
            ? data.data.employeeDocuments.AadharCard
            : "",
          certification: data.data.employeeDocuments
            ? data.data.employeeDocuments.Certification
            : "",
        });

        setPageLoading({ pageData: false });

        if (data.Documents && Array.isArray(data.Documents)) {
          setMedDocData(data.Documents);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }

      console.log("medDocData line -------------------- 532", medDocData);
    };

    fetchProfileData();
  }, [edits]);

  const handlepresenthealth = () => {
    // Use filter and map for cleaner logic
    const updatedHealthProblem = conditions
      .filter((element) => element.checked === 1)
      .map((element) => element.value);

    Axios.post(
      import.meta.env.VITE_API_URL + "user/updateProfile",
      {
        presentHealth: {
          refBackpain: inputs.backpainscale,
          refDrName: inputs.caredoctorname,
          refHospital: inputs.caredoctorhospital,
          refMedicalDetails: inputs.pastmedicaldetails,
          refOtherActivities: inputs.pastother,
          refPresentHealth: updatedHealthProblem,
          refUnderPhysCare: options.care,
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
        if (!data.token) {
          navigate("/expired");
        } else {
          localStorage.setItem("JWTtoken", `Bearer ${data.token}`);

          console.log(data.success);

          if (data.success) {
            setEdits((prevEdits) => ({
              ...prevEdits,
              present: false,
            }));
          }
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  const handlesubmitaddress = () => {
    Axios.post(
      import.meta.env.VITE_API_URL + "user/updateProfile",
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

  const handlegenderalhealth = () => {
    const updatedGeneralHealth = {
      refBMI: inputs.bmi,
      refBP: inputs.bp,
      refBlood: inputs.bloodgroup,
      refElse: inputs.genderalanything,
      refHeight: parseInt(inputs.height),
      refOthers: inputs.breaksotheractivities,
      refRecentFractures: options.breaks,
      refRecentFracturesReason: inputs.breaksdetails,
      refRecentInjuries: options.accident,
      refRecentInjuriesReason: inputs.accidentdetails,
      refWeight: parseInt(inputs.weight),
    };

    Axios.post(
      import.meta.env.VITE_API_URL + "user/updateProfile",
      { generalhealth: updatedGeneralHealth },
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
        console.log("data line ------------ 675", data);
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
        console.error("Error: ", err);
      });
  };

  const handletherapy = () => {
    let updatedHealthProblem = [];
    conditions.forEach((element) => {
      if (element.checked === 1) {
        updatedHealthProblem.push(element.value);
      }
    });

    Axios.post(
      import.meta.env.VITE_API_URL + "user/updateProfile",
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
        if (!data.token) {
          navigate("/expired");
        } else {
          localStorage.setItem("JWTtoken", `Bearer ${data.token}`);

          console.log(data.success);

          if (data.success) {
            setEdits((prevEdits) => ({
              ...prevEdits,
              therapy: false,
            }));
          }
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
  const handleMedDoc = (event) => {
    event.preventDefault();

    // Combine data from both states
    const medicalDocuments = [
      ...uploadDocuments.map((doc) => ({
        refMedDocName: doc.refMedDocName,
        refMedDocPath: doc.refMedDocPath,
      })),
      ...medDocData.map((doc) => ({
        refMedDocName: doc.refMedDocName,
        refMedDocPath: doc.refMedDocPath,
        refMedDocId: doc.refMedDocId,
      })),
    ];

    Axios.post(
      import.meta.env.VITE_API_URL + "user/updateProfile",
      {
        medicalDocuments,
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
              medDoc: false,
            });
            toast.success("Medical Document is Updated Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
            });
          }
        }
      })
      .catch((err) => {
        toast.error("Some thing went wrong, try again after some time", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
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
      import.meta.env.VITE_API_URL + "changePassword",
      {
        oldPassword: passwordInputs.currentpass,
        newPassword: passwordInputs.newpass,
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
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });

  const handleInputPass = (event) => {
    setPasswordError({
      status: false,
      message: "",
    });

    const { name, value } = event.target;

    setPasswordInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [passwordInputs, setPasswordInputs] = useState({
    currentpass: "",
    newpass: "",
    confirmpass: "",
  });

  const handlePreviewDocument = (dataArray, index) => {
    console.log("dataArray", dataArray);
    const file = dataArray[index]?.refMedDocFile;
    console.log("file", file);
    if (file) {
      try {
        const binaryContent = atob(file.content);
        const byteArray = new Uint8Array(binaryContent.length);
        for (let i = 0; i < binaryContent.length; i++) {
          byteArray[i] = binaryContent.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: file.contentType });
        const url = URL.createObjectURL(blob);
        let content;
        if (file.contentType == "application/pdf") {
          content = `<iframe src="${url}" width="100%" height="450px" style="border: none;"></iframe>`;
        } else {
          content = `<img src="${url}" alt="Document Preview" style="max-width: 100%; max-height: 450px; object-fit: contain; display: block; margin: 0 auto;">`;
        }
        const targetDiv = document.getElementById("target-container");

        Swal.fire({
          title: "Medical Document Preview",
          html: `
          <div style="display: flex; justify-content:center;align-item:center;">     
          ${content} 
          </div>
            <div style="margin-top: 10px; text-align: center; width: 100%; display: flex; justify-content: center;">
              <a href="${url}" download="document.pdf" style="padding: 10px 20px; width: 80%; background-color: #f95005; color: white; text-decoration: none; border-radius: 4px; text-align: center;">
                Download
              </a>
            </div>
          `,
          showCloseButton: true,
          showConfirmButton: false,
          target: targetDiv,
          customClass: {
            title: "custom-title",
            popup: "custom-popup",
          },
        });
      } catch (error) {
        console.error("Error previewing document:", error);
      }
    } else {
      console.error("No file to preview");
    }
  };

  const handleRemoveDocument = (dataArray, index) => {
    if (dataArray[index]?.refMedDocId) {
      alert("Id");
      try {
        Axios.post(
          import.meta.env.VITE_API_URL + "profile/deleteMedicalDocument",
          { refMedDocId: dataArray[index]?.refMedDocId },
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            console.log(res, "res");

            const data = decrypt(
              res.data[1],
              res.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            console.log("data", data);

            if (data.success) {
              console.log("Success delete");

              setMedDocData((prev) => prev.filter((_, idx) => idx !== index));
              toast.success("Medical Document Removed Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
              });
            } else {
              toast.warning("Some thing went wrong, try after some time", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
              });
            }
          })
          .catch((err) => {
            console.error("Error Deleting the File:", err);
          });
      } catch (error) {
        console.error("Error in Delete Document:", error);
      }
    } else if (dataArray[index].refMedDocPath == "") {
      setUploadDocuments((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      try {
        Axios.post(
          import.meta.env.VITE_API_URL + "profile/deleteMedicalDocument",
          { filePath: dataArray[index].refMedDocPath },
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            console.log(res, "res");

            const data = decrypt(
              res.data[1],
              res.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            console.log("data", data);

            if (data.success) {
              console.log("Success delete");
              setUploadDocuments((prev) =>
                prev.filter((_, idx) => idx !== index)
              );
            }
          })
          .catch((err) => {
            console.error("Error Deleting the File:", err);
          });
      } catch (error) {
        console.error("Error in Delete Document:", error);
      }
    }
  };

  const handleAddDocument = () => {
    setUploadDocuments((prev) => [
      ...prev,
      {
        refMedDocName: "",
        refMedDocPath: "",
        refMedDocFile: { contentType: "", content: "" },
        refMedDocUpload: false,
        refMedDocUpBtn: false,
      },
    ]);
  };

  const storeDocument = (index) => {
    const uploadDocument = uploadDocuments[index];
    try {
      Axios.post(
        import.meta.env.VITE_API_URL + "profile/userHealthReportUpload",
        uploadDocument.refMedDocFile,
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((res) => {
          const data = decrypt(
            res.data[1],
            res.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );
          setUploadDocuments((prev) => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
              ...updatedDocuments[index],
              refMedDocPath: data.filePath,
              refMedDocFile: data.file,
              refMedDocUpload: true,
            };
            return updatedDocuments;
          });
        })
        .catch((err) => {
          console.error("Error uploading file:", err);
        });
    } catch (error) {
      console.error("Error in storeDocument:", error);
    }
  };

  return (
    <div className="bg-white" style={{ paddingTop: "120px" }}>
      <div className="bg-[#f6f5f5]">
        <div className="userProfilePage">
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
                            !edits.personal && inputs.age > "18" ? false : true
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

                  <div className="w-[100%] flex justify-between">
                    <div className="w-[48%]">
                      <TextInput
                        label="State *"
                        name="tempstate"
                        id="perstate"
                        type="text"
                        onChange={handleInputVal}
                        value={inputs.tempstate}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                    <div className="w-[48%]">
                      <TextInput
                        label="City *"
                        name="tempcity"
                        id="tempcity"
                        type="text"
                        onChange={handleInputVal}
                        value={inputs.tempcity}
                        readonly={!edits.address}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

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
                    />
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

          <form onSubmit={handletherapy}>
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
          </form>

          {/* Medical Documents Review And Update */}
          <form onSubmit={handleMedDoc}>
            <div className="basicProfileCont m-[10px] lg:m-[30px] p-[20px] lg:p-[40px] shadow-lg">
              <div className="w-[100%] flex justify-between items-center mb-5">
                <div className="text-[1rem] lg:text-[25px] font-bold">
                  Documentation
                </div>
                {edits.medDoc ? (
                  <button className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded">
                    Save&nbsp;&nbsp;
                    <i className="text-[15px] pi pi-check"></i>
                  </button>
                ) : (
                  <div
                    onClick={() => {
                      editform("medDoc");
                    }}
                    className="text-[15px] py-2 px-3 bg-[#f95005] font-bold cursor-pointer text-[#fff] rounded"
                  >
                    Edit&nbsp;&nbsp;
                    <i className="text-[15px] pi pi-pen-to-square"></i>
                  </div>
                )}
              </div>
              {edits.medDoc ? (
                <div className="w-full overflow-auto ">
                  <div className="w-[90%] flex flex-wrap my-4 items-center justify-end gap-x- lg:gap-x-10 gap-y-4">
                    <button
                      type="button"
                      className="py-2 px-4 bg-[#f95005] text-white rounded hover:bg-[#f95005]"
                      onClick={handleAddDocument}
                    >
                      Add Document
                    </button>
                  </div>
                  {uploadDocuments.map((document, index) => (
                    <div
                      key={index}
                      className="w-[100%] flex flex-row justify-evenly lg:p-[10px] mt-5 lg:mt-0"
                    >
                      <div>
                        {document.refMedDocUpload && (
                          <div className="pt-5 align-content-start">
                            <FaEye
                              className="w-[30px] h-[25px] text-[#f95005] cursor-pointer"
                              onClick={() =>
                                handlePreviewDocument(uploadDocuments, index)
                              }
                            />
                          </div>
                        )}
                      </div>

                      <div className="mb-4 w-[40%] flex flex-col justify-start text-start">
                        <label className="block text-gray-700 font-medium mb-2">
                          Enter File Name:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter a name for the file"
                          className="w-full border border-gray-300 rounded px-4 py-2"
                          value={document.refMedDocName || ""}
                          onChange={(e) => {
                            setUploadDocuments((prev) => {
                              const updatedDocuments = [...prev];
                              updatedDocuments[index].refMedDocName =
                                e.target.value;
                              return updatedDocuments;
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="mb-4 w-[40%] flex flex-col justify-start text-start">
                        <label className="block text-gray-700 font-medium mb-2">
                          Upload File:
                        </label>
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          className="w-full border border-gray-300 rounded px-4 py-2 uploadfile disabled:cursor-not-allowed disabled:text-slate-400 disabled:before:bg-transparent"
                          disabled={document.refMedDocUpload}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const formData = new FormData();
                              formData.append("file", file);
                              setUploadDocuments((prev) => {
                                const updatedDocuments = [...prev];
                                updatedDocuments[index].refMedDocFile =
                                  formData;
                                updatedDocuments[index].refMedDocUpBtn = true;
                                return updatedDocuments;
                              });
                            }
                          }}
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className={`text-[green] disabled:cursor-not-allowed disabled:text-slate-400 disabled:before:bg-transparent`}
                        onClick={() => storeDocument(index)}
                        disabled={
                          document.refMedDocUpload === true ||
                          document.refMedDocUpBtn === false
                        }
                      >
                        <ImUpload2 className="w-[30px] h-[25px]" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveDocument(uploadDocuments, index)
                        }
                        className="text-[red]"
                      >
                        <MdDelete className="w-[30px] h-[30px]" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}

              <div className="w-[100%] flex justify-center items-center">
                <div className="flex flex-wrap  items-center w-[100%]">
                  {/* <div className="lg:basis-1/3 basis-full flex items-center justify-around p-4 hover:border-2 border-[#f95005]">
                    <div className="">
                      <FaEye
                        className="w-[30px] h-[25px] text-[#f95005] cursor-pointer"
                        // onClick={() => handlePreviewDocument(index)}
                      />
                    </div>
                    <div className="">
                      <h3 className="text-[20px]">Document Name</h3>
                    </div>
                    {edits.medDoc ? (
                      <button
                        type="button"
                        // onClick={() => handleRemoveDocument(index)}
                        className="text-[red]"
                      >
                        <MdDelete className="w-[30px] h-[30px]" />
                      </button>
                    ) : (
                      <></>
                    )}
                  </div> */}
                  {medDocData.map((doc, index) => (
                    <div
                      key={doc.refMedDocId}
                      className="lg:basis-1/3 basis-full flex items-center justify-start lg:p-2 hover:border-2 border-[#f95005]"
                    >
                      <div className="lg:mr-5 mr-2">
                        <FaEye
                          className="w-[30px] h-[25px] text-[#f95005] cursor-pointer"
                          onClick={() =>
                            handlePreviewDocument(medDocData, index)
                          } // Use index for identifying the item
                        />
                      </div>
                      <div className="">
                        {/*  */}
                        {edits.medDoc ? (
                          <div className="mb-4 w-[100%] flex flex-col justify-start text-start">
                            <label className="block text-gray-700 font-medium mb-2">
                              Document Name:
                            </label>
                            <input
                              type="text"
                              placeholder="Enter a name for the file"
                              className="w-full border border-gray-300 rounded px-4 py-2"
                              value={doc.refMedDocName || ""}
                              onChange={(e) => {
                                setMedDocData((prev) => {
                                  const updatedDocuments = [...prev];
                                  medDocData[index].refMedDocName =
                                    e.target.value;
                                  return updatedDocuments;
                                });
                              }}
                              required
                            />
                          </div>
                        ) : (
                          <h3 className="text-[20px]">{doc.refMedDocName}</h3>
                        )}

                        {/* Display refMedDocName */}
                      </div>
                      {edits.medDoc ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveDocument(medDocData, index)
                          } // Use index for removing the item
                          className="text-[red] lg:ml-5 ml-2"
                        >
                          <MdDelete className="w-[30px] h-[30px]" />
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>

          {/* change password */}
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
        </div>
      </div>
    </div>
  );
};

export default Landingprofile;
