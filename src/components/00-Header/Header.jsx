import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/logos/Ublis Yoga - Logo 2.png";
import RegistrationStepper from "../../pages/RegistrationStepper/RegistrationStepper";
import svg from "../../assets/home/user.svg";
import Axios from "axios";
import CryptoJS from "crypto-js";
import RegistrationPopup from "../../pages/RegistrationPopup/RegistrationPopup";

export default function Header() {
  const [headerBg, setHeaderBg] = useState("transparent");
  const [open, setOpen] = useState(false);
  const [iconRotation, setIconRotation] = useState(180);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setOpen(false);
    setIconRotation(180);
  };

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
    setIconRotation((prevRotation) => (open ? -180 : 180));
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Class", href: "/class" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact", href: "/contact" },
    { title: "Sign In", href: "/signin" },
    { title: "Sign Up", href: "/signup" },
  ];

  const menuVars = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 0, 0.36, 1] },
    },
  };

  const containerVariant = {
    initial: {
      transition: { staggerChildren: 0.09, staggerDirection: -1 },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
    },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
  };

  const MobileNavLink = ({ title, href }) => {
    return (
      <motion.div
        variants={mobileLinkVars}
        className="text-2xl uppercase font-bold text-white text-center pb-5"
      >
        <p onClick={() => handleNavigate(href)}>{title}</p>
      </motion.div>
    );
  };

  MobileNavLink.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderBg("blur(10px)");
      } else {
        setHeaderBg("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check if JWT token exists in local storage
    const token = localStorage.getItem("JWTtoken");
    setIsLoggedIn(!!token);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const [registrationmodal, setRegistrationmodal] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  const handleOutsideClick = (event) => {
    const dropdown = document.querySelector(".dropdown");
    const userIcon = document.querySelector(".user-icon"); // Assuming you add a class for the user image

    // Check if the click happened outside both the dropdown and user icon
    if (
      isDropdownOpen &&
      !dropdown?.contains(event.target) &&
      !userIcon?.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const [logindetails, setLogindetails] = useState({
    username: "",
    name: "",
  });
  const [useStatus, setUseStatus] = useState({});

  // UseEffect to listen for outside clicks
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isDropdownOpen]);

  const [openmenu, setopenMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("JWTtoken")) {
      Axios.get(
        import.meta.env.VITE_API_URL + "validatetoken",
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
            "Content-Type": "application/json",
          },
        },
        {}
      ).then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log("-------------------", data);

        if (data.token == false) {
          navigate("/expired");
        } else {
          console.log(data);

          const refuId = data.data[0].refUtId;
          const validIds = [1, 2, 3, 9];

          if (!validIds.includes(refuId)) {
            localStorage.removeItem("JWTtoken");
            navigate("/signin");
          }

          if (data.registerBtn.signUpCount === true) {
            setopenMenu(true);
          } else {
            setopenMenu(false);
          }

          setUseStatus({
            signUpCount: data.registerBtn.signUpCount,
            followUpCount: data.registerBtn.followUpCount,
          });

          // if (
          //   localStorage.getItem("ublisYogaRegistration") === "true" &&
          //   data.registerBtn.followUpCount
          // ) {
          //   setopenMenu(true);
          // }

          setLogindetails({
            username: data.data[0].refUserName,
            name: data.data[0].refStFName + " " + data.data[0].refStLName,
          });
        }
      });
    }
  }, [navigate, registrationmodal, isDropdownOpen]);

  // , [navigate]

  const handlecloseregister = () => {
    setopenMenu(false);
    localStorage.setItem("ublisYogaRegistration", false);
  };

  const openregistration = () => {
    setRegistrationmodal(true);
  };

  const closeregistration = () => {
    setRegistrationmodal(false);
  };

  return (
    <div className="header">
      {openmenu ? (
        <RegistrationPopup
          handlecloseregister={handlecloseregister}
          openregistration={openregistration}
        />
      ) : null}
      {registrationmodal ? (
        <RegistrationStepper
          handlecloseregister={handlecloseregister}
          closeregistration={closeregistration}
        />
      ) : null}
      <header
        style={{
          background: "#ffffff",
          zIndex: "30",
          position: "fixed",
          width: "100%",
        }}
      >
        <nav
          className="flex justify-around item-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="flex items-center gap-[1ch] p-2">
            <img src={logo} height={110} width={190} alt="Logo" />
          </div>
          <div
            className="lg:flex navbarLinks hidden gap-12 text-md text-[#000000] cursor-pointer"
            style={{ fontWeight: "bold", fontSize: "17px" }}
          >
            {navLinks.slice(0, 5).map((link, index) => (
              <p key={index} onClick={() => handleNavigate(link.href)}>
                {link.title}
              </p>
            ))}
          </div>

          {/* Conditional rendering of buttons or 'Register' text */}
          {isLoggedIn ? (
            <>
              {useStatus.followUpCount ? (
                <button
                  className="lg:flex hidden"
                  style={{
                    border: "2px solid #f95005",
                    padding: "5px 40px",
                    borderRadius: "8px",
                    color: "#f95005",
                    fontWeight: "bold",
                  }}
                  onClick={() => setRegistrationmodal(true)}
                >
                  Register
                </button>
              ) : null}
              {/* User Image */}
              <img
                className="user-icon -ml-20 w-[35px] h-[35px] cursor-pointer"
                src={svg}
                alt="user"
                onClick={toggleDropdown}
              />

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="dropdown absolute top-[10vh] right-3 mt-2 w-[150px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {logindetails.name}
                      <br />
                      <span className="text-[14px] text-[#f95005]">
                        {logindetails.username}
                      </span>
                    </li>
                    {!useStatus.followUpCount ? (
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleNavigate("/Landingprofile");
                        }}
                      >
                        Profile
                      </li>
                    ) : (
                      <></>
                    )}

                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("JWTtoken");
                        setIsDropdownOpen(false);
                        handleNavigate("/");
                      }}
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
              {/* <img
                className="-ml-20 w-[35px] h-[35px] cursor-pointer"
                src={svg}
                alt="user"
              /> */}
            </>
          ) : (
            <>
              <button
                className="buttonSignIn lg:flex hidden mr-5"
                onClick={() => handleNavigate("/signin")}
                style={{
                  border: "2px solid #f95005",
                  padding: "5px 40px",
                  borderRadius: "8px",
                  marginLeft: "-50px",
                  color: "#f95005",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </button>

              <button
                className="buttonSignIn lg:flex hidden"
                onClick={() => handleNavigate("/signup")}
                style={{
                  border: "2px solid #f95005",
                  padding: "5px 40px",
                  borderRadius: "8px",
                  marginLeft: "-130px",
                  color: "#f95005",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </button>
            </>
          )}

          <div
            className="cursor-pointer pt-px lg:hidden text-md text-white"
            onClick={toggleMenu}
          >
            <i
              className={`bi bi-grid toggle-icon ${
                open ? `rotate-${iconRotation}` : `rotate-0`
              }`}
              style={{
                color: "#f95005",
                fontSize: "2rem",
                transition: "transform 0.5s",
              }}
            ></i>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ zIndex: "100" }}
              className="fixed left-0 top-0 w-full h-screen origin-bottom text-black p-10 navbarBgImg"
            >
              <div className="flex h-full flex-col w-[100%]">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg text-white uppercase">
                    <div className="flex items-center gap-[1ch] text-2xl font-bold">
                      <h2>Ublis Yoga</h2>
                    </div>
                  </h1>
                  <p
                    className="cursor-pointer pt-px text-md text-white"
                    onClick={toggleMenu}
                  >
                    <i
                      className={`bi bi-x-lg toggle-icon ${
                        open ? `rotate-${iconRotation}` : `rotate-0`
                      }`}
                      style={{
                        color: "#ffffff",
                        fontSize: "1.5rem",
                        transition: "transform 0.5s",
                      }}
                    ></i>
                  </p>
                </div>
                <motion.div
                  variants={containerVariant}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col h-full justify-center items-center gap-3"
                >
                  {navLinks.map((link, index) => {
                    return (
                      <div key={index} className="overflow-hidden">
                        <MobileNavLink title={link.title} href={link.href} />
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
