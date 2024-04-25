import React, { useState, useEffect } from "react";
import logo from "../../../Pages/static/logo.png";
import Select from "react-select";
import "./adminSignup.css";
// import "./signup.css";
//import "./static/confirmation.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import OtpInput from "react-otp-input";

import { FaEye, FaEyeSlash } from "react-icons/fa";
//import DatePicker from "react-datepicker";
import MultiStage from "../../../Components/MultiStepProgressBar";
import startsWith from "lodash.startswith";

import firmsetting from "../../../Pages/static/firm setting.png";

const SignUp = ({ handleSignupPage }) => {
  const history = useNavigate();
  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  //todo ========    #page control  logic   No1 =======

  //!chang state for testing
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form");
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  //todo ========    #page control  logic   No1 =======

  //? ========    #navigation control   No2 =======

  const navigate = useNavigate();

  const LoginButton = () => {
    navigate("/adminlogin");
  };
  //? ========    #navigation control   No2 =======

  //todo ========    #send mail to backend for varification code  case 1: =======

  //*checkbox
  const [isChecked, setIsChecked] = useState(false);

  const setValbox = (event) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const [inpval, setInpval] = useState({
    email: "",
  });

  const createAccount = async (e) => {
    e.preventDefault();

    const { email } = inpval;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (isChecked === false) {
      toast.error("Accept terms and condtion ", {
        position: "top-center",
      });
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(inpval.email);

      const email = inpval.email;

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://68.251.138.233:8080/common/user/email/getuserbyemail/" + email, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          console.log(inpval.email);
          // Assuming result is in JSON format and contains user data
          if (result.user.length > 0) {
            toast.error("User with this EMail already exists", { position: "top-right" });
            // You can also do further processing here if needed
          } else {
            e.preventDefault();

            let data = JSON.stringify({
              email: inpval.email,
            });

            let config = {
              method: "post",
              maxBodyLength: Infinity,
              url: "http://68.251.138.233:8080/request-otp",
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            };
            axios
              .request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                //toast.success("Check your email ID for OTP", { position: "top-right" });
                alert("Check your email ID for OTP");
                //   setInpval({ ...inpval, email: "" });
                setIsChecked(false);
                nextStep();
              })
              .catch((error) => {
                alert("please check your OTP");
                console.log(error);
              });
          }
        })
        .catch((error) => console.error("Error:", error));
      console.log(error);
    }
  };

  //todo ========    #send mail to backend for varification code  case 2: =======

  //? ========    #otp varification    Page:2 =======

  const resensotp = async (e) => {
    e.preventDefault();

    //const { email } = inpval;

    e.preventDefault();

    let data = JSON.stringify({
      email: inpval.email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://68.251.138.233:8080/request-otp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        //toast.success("Check your email ID for OTP", { position: "top-right" });

        alert("Check your email ID for OTP");
      })
      .catch((error) => {
        alert("please check your OTP");
        console.log(error);
      });
  };

  const [otp, setOtp] = useState("");
  const handleClearOtp = () => {
    console.log(otp);
    setOtp("");
  };
  const sendOtpVerify = async (e) => {
    e.preventDefault();

    //const { email } = inpval;

    if (otp === "") {
      toast.error(" OTP required! ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        email: inpval.email,
        otp: otp,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://68.251.138.233:8080/verify-otp",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Email verified sucessfully");
          setOtp("");

          nextStep();
        })
        .catch((error) => {
          alert("please check your OTP");
          console.log(error);
        });
    }
  };

  //? ========    #otp varification    Page:2 =======

  //todo ========    #send mail to backend for varification code  case 3: =======

  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState();
  const totalSteps = 4; // Set the desired number of steps

  const stageNames = ["Email", "Information", "Settings", "Book a seassion"];

  const submitUserinfo = async (e) => {
    e.preventDefault();

    if (firstname === "") {
      toast.error(" First Name Required ! ", {
        position: "top-center",
      });
    } else if (lastName === "") {
      toast.error(" Last Name Required ! ", {
        position: "top-center",
      });
    } else if (lastName === "") {
      toast.error(" Last Name Required ! ", {
        position: "top-center",
      });
    } else if (phoneNumber === "") {
      toast.error(" Phone number required ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //todo ========    #send mail to backend for varification code Page:3 =======

  //todo ========    #send mail to backend for varification code  case 4: =======

  //case 4  =======================================================================
  //Country State API

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [firmName, setFirmName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountryD, setSelectedCountryD] = useState("");

  const countryStates = states.find((country) => country.name === selectedCountry)?.states || [];

  // Transform the states data into options for React Select
  const stateOptions = countryStates.map((state, index) => ({
    value: state.name,
    label: state.name,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const countryOptions = data.data.map((country) => ({
          //value: country.country,
          label: country.name,
        }));

        setCountries(countryOptions);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getStatesData = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/states");
        setStates(response.data.data);
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    getStatesData();
  }, [countries]);

  // useEffect to do something when selectedCountry changes
  useEffect(() => {
    console.log("Selected Country:", selectedCountry);
    // You can perform additional actions or API calls here based on the selected country
  }, [selectedCountry]);

  //?validation
  const submitFerminfo = async (e) => {
    e.preventDefault();

    if (firmName === "") {
      toast.error(" Firm Name Required ! ", {
        position: "top-center",
      });
    } else if (selectedCountry === "") {
      toast.warning(" Select Country ! ", {
        position: "top-center",
      });
    } else if (selectedState === "") {
      toast.warning(" Select state ! ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //todo ========    #send mail to backend for varification code  case 5: =======
  //slider

  const [sliderValue, setSliderValue] = useState(0);
  const fixedValues = [0, 5, 10, 15, 50, 100, 200];
  const colors = ["Google search", "Capterra/ Get app/ G2", "From a friend", "Offline event", "Social media", "Taxdome consultant/ Partner", "Other"];
  const [buttonStates, setButtonStates] = useState([false, false, false, false, false, false, false]);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleToggle = (index) => {
    const updatedStates = buttonStates.map((state, i) => (i === index ? !state : false));
    setButtonStates(updatedStates);
    setSelectedButton(index);
  };

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  const svalue = fixedValues[sliderValue];
  console.log(svalue);

  const selectedOption = colors[selectedButton];
  console.log(selectedOption);

  // const [svalue, setSValue] = useState(datarange);

  // useEffect to do something when selectedServices changes
  useEffect(() => {
    console.log(svalue);

    // You can perform additional actions or API calls here based on the selected services
  }, [svalue]);
  useEffect(() => {
    // console.log(selectedOption);
    // You can perform additional actions or API calls here based on the selected services
  }, [selectedOption]);

  // const handleChange = (event) => {
  //   setSValue(event.target.value);
  // };

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  // };

  //?validation
  const submitFirmDetail = async (e) => {
    e.preventDefault();

    if (svalue === 0) {
      toast.error(" Select Firm Size  ! ", {
        position: "top-center",
      });
    } else if (selectedOption === "") {
      toast.warning(" Select How did you hear about us ? ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //=============================================================
  //todo  Services offers case 6:

  const [buttonStates2, setButtonStates2] = useState({
    TaxPreparation: false,
    TaxPlanning: false,
    Advisory: false,
    Resolution: false,
    Payroll: false,
    Accounting: false,
    Audit: false,
    LawFirm: false,
    Bookkeeping: false,
    Other: false,
  });

  const [selectAll, setSelectAll] = useState(false);
  const buttonsOn = Object.keys(buttonStates2).filter((button) => buttonStates2[button]);
  const handleButtonClick2 = (buttonName) => {
    setButtonStates2((prevStates) => ({
      ...prevStates,
      [buttonName]: !prevStates[buttonName],
    }));
  };

  const selectedButtons = buttonsOn.join(", ");
  console.log([selectedButtons]);

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    // Set the state of all buttons based on the "Select All" checkbox
    setButtonStates2((prevStates) => {
      const newButtonStates = {};
      Object.keys(prevStates).forEach((button) => {
        newButtonStates[button] = !selectAll;
      });
      return newButtonStates;
    });
  };

  useEffect(() => {
    // console.log(selectedButtons);
    // You can perform additional actions or API calls here based on the selected services
  }, [selectedButtons]);

  const submitService = async (e) => {
    e.preventDefault();

    if (selectedButtons == []) {
      toast.error(" Select Service  ! ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //======================================

  //todo role selection case 7
  const colors3 = ["Owner or partner", "Book keeper or Accountant", "Operations / office Manager", "Admin", "Assistant", "Other"];
  const [buttonStates3, setButtonStates3] = useState([false, false, false, false, false, false]);
  const [selectedButton3, setSelectedButton3] = useState(null);

  const handleToggle3 = (index) => {
    const updatedStates = buttonStates3.map((state, i) => (i === index ? !state : false));
    setButtonStates3(updatedStates);
    setSelectedButton3(index);
  };

  const roleOption = colors3[selectedButton3];

  // useEffect to do something when selectedServices changes
  useEffect(() => {
    // console.log(roleOption);
    // You can perform additional actions or API calls here based on the selected services
  }, [roleOption]);
  //?validation
  const submitRole = async (e) => {
    e.preventDefault();

    if (selectedButton3 === "") {
      toast.error(" Select Role  ! ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //============================

  //case 8 ============================
  const [currencies, setCurrencies] = useState("");

  const [url, setUrl] = useState("");
  const label = ".pms.com";

  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
        const currencyOptions = Object.keys(response.data).map((currency) => ({
          value: currency,
          label: response.data[currency].toUpperCase(),
        }));

        setCurrencies(currencyOptions);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  // const handleUrlChange = (e) => {

  //   setUrl(e.target.value);

  // };

  const handleSubmitUrl = () => {
    const combinedValue = url + label;
    console.log("Combined value:", combinedValue);
    return combinedValue;
  };

  const combinedData = {
    url: handleSubmitUrl(),
  };

  console.log(combinedData.url);

  const languages = [
    { value: "English(British)", label: "English(British)" },
    { value: "Deutsch", label: "Deutsch" },
    { value: "Ztaliano", label: "Ztaliano" },
    { value: "Nederlands", label: "Nederlands" },
    { value: "suomi", label: "suomi" },
    { value: "Dansk", label: "Dansk" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const language = selectedLanguage;
  console.log(language);

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  //?validation
  const submiturl = async (e) => {
    e.preventDefault();
    console.log("vinayak");

    if (url === "") {
      toast.error(" Choose web URL ! ", {
        position: "top-center",
      });
    } else if (currencies === "") {
      toast.warning(" Select Currency ! ", {
        position: "top-center",
      });
    } else if (language === "") {
      toast.warning(" Select language ! ", {
        position: "top-center",
      });
    } else {
      toast.success(" Web url selected  ! ", {
        position: "top-center",
      });
      nextStep();
    }
  };

  //todo password confermation case 9:
  //==============================================================

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inppass, setInppass] = useState({
    password: "",
    cpassword: "",
  });

  //console.log
  const setValP = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInppass(() => {
      return {
        ...inppass,
        [name]: value,
      };
    });
  };

  const submitPassword = async (e) => {
    e.preventDefault();

    const { password, cpassword } = inppass;

    if (password === "") {
      alert("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 8) {
      alert("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      alert("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 8) {
      alert("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      alert("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      toast.success(" Account created successfully  ", {
        position: "top-right",
      });
      // nextStep();

      //call final
      adminalldata();
      // useNavigate("/login")
      history("/login");
    }
  };

  //===================================================
  const adminalldata = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: inpval.email,
      firstName: firstname,
      lastName: lastName,
      phoneNumber: phoneNumber,
      firmName: firmName,
      country: selectedCountry,
      state: selectedState,
      firmSize: svalue,
      referenceFrom: selectedOption,
      services: [
        {
          service: selectedButtons,
        },
      ],
      role: roleOption,
      firmURL: combinedData.url,
      currency: selectedCurrency.label,
      language: language.label,
      password: inppass.password,
      cpassword: inppass.cpassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.233:8080/admin/adminsignup/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);

        newUser();

        toast.success("Signup successful!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error signing up. Please try again.", error);
      });
  };

  //************************ */
  const userCreatedmail = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const port = window.location.port;
    const url = `http://68.251.138.233:${port}/login`;
    const raw = JSON.stringify({
      email: inpval.email,
      url: url,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.233:8080/usersavedemail", requestOptions)
      .then((response) => response.text())

      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  //************************ */
  const newUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: firmName,
      email: inpval.email,
      password: inppass.password,
      role: roleOption,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.233:8080/common/login/signup", requestOptions)
      .then((response) => response.text())

      .then((result) => {
        console.log(result);
        userCreatedmail();
      })

      .catch((error) => console.error(error));
  };

  //todo book session for demo  case 10:

  const [selectedDate, setSelectedDate] = useState(null);

  const handleBookSession = () => {
    nextStep();
  };

  const renderFormFields = () => {
    switch (currentStep) {
      //sign up
      case 1:
        return (
          <>
            <div className=" col-12" style={{ height: "100vh" }}>
              <div style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="col-12 case1">
                <div className="container">
                  <h2 style={{ color: "black" }}>Signup</h2>
                  <p className="subtitle">Sign up your firm and start upgrading your workflow</p>
                  <br />
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email " style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", width: "100%", marginTop: "10px" }}>
                      <input type="checkbox" id="terms" onChange={setValbox} checked={isChecked} style={{ marginRight: "15px" }} />
                      <label htmlFor="terms" style={{ color: "#696969", fontSize: "14px", marginBottom: "0" }}>
                        I agree to the terms and conditions{" "}
                      </label>
                    </div>

                    <button className="btn1" onClick={createAccount} style={{ margin: "15px 0" }}>
                      Create Account
                    </button>

                    <p className="sign-in-link">
                      Already have an account?{" "}
                      <NavLink to="/" onClick={handleSignupPage} style={{ textDecoration: "none", color: "blue" }}>
                        Sign in
                      </NavLink>
                    </p>
                  </form>
                </div>
                <br />
              </div>
            </div>
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      //code confirmation

      case 2:
        return (
          <>
            <div className=" col-12 ">
              <div className="top-header col-12" style={{ display: "flex" }}>
                <div className="col-4" style={{ margin: "20px" }}>
                  <img style={{ width: "30px" }} src={logo} alt="" />
                  <b>PMS Solutions</b>
                </div>
                <div className="path col-8" style={{ marginRight: "200px" }}>
                  <MultiStage steps={totalSteps} currentStepForm={1} stageNames={stageNames} />
                </div>
              </div>
              <div className=" col-12 case2">
                <div className="container">
                  <h2>Confirmation Code</h2>

                  <p style={{ margin: "3px 0" }}>We sent a confirmation code to your email:</p>

                  <div>
                    <b>{inpval.email}</b>
                    <span>
                      <AiFillEdit />
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", margin: "3px 0" }}>Please,enter it below</p>
                  <br />
                  <div>
                    <div className="otp-input" style={{ padding: "10px" }}>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                          <input
                            {...props}
                            style={{
                              width: "60px", // Adjust as needed
                              height: "100px", // Adjust as needed
                              fontSize: "42px", // Adjust as needed
                              fontFamily: "Arial, sans-serif", // Replace with your desired font
                              // margin: "0 10px",
                              margin: "10px",
                              textAlign: "center",

                              // Add any other styling properties as needed
                            }}
                            className="inputs"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "5%", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                    <h4>Didn't receive it?</h4>
                    <button className="btn1" onClick={resensotp}>
                      Resend code
                    </button>{" "}
                  </div>

                  {/* <div style={{ display: "flex", marginBottom: "50px" }}> */}
                  <div className="otp-buttons col-12">
                    <button className="btn1" onClick={handleClearOtp} style={{ marginLeft: "auto", transform: "translatex(-30%)" }}>
                      Clear OTP
                    </button>
                    <button className="btn1" onClick={sendOtpVerify} style={{ marginRight: "auto", transform: "translatex(10%)" }}>
                      Verify
                    </button>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="toast">
                <ToastContainer />
              </div>
            </div>
          </>
        );
      //!================================================================================================================================================================
      case 3:
        return (
          <>
            <div className=" col-12  ">
              <div className="col-12" style={{ display: "flex" }}>
                <div className="col-4" style={{ margin: "20px" }}>
                  <img style={{ width: "30px" }} src={logo} alt="" />
                  <b>PMS Solutions</b>
                </div>
                <div className="path col-8" style={{ marginRight: "200px" }}>
                  <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
                </div>
              </div>
            </div>

            <div className=" col-12 case3">
              <div className="container">
                <h2>Your Information</h2>
                <form>
                  <div>
                    <div style={{ marginBottom: "20px" }}>
                      <label>First Name:</label>

                      <input required className="fname" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                    </div>

                    <div>
                      <label>Last Name:</label>

                      <div>
                        <input required className="lname" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div>
                    <label>
                      <div style={{ marginLeft: "1px" }}>
                        <label htmlFor="phone">Phone Number:</label>
                        <PhoneInput
                          style={{ width: "450px" }}
                          country={"us"}
                          placeholder="enter phone number "
                          onChange={(value) => {
                            setPhoneNumber(value);
                          }}
                          countryCodeEditabel={false}
                          isValid={(inputNumber, country, countries) => {
                            return countries.some((country) => {
                              return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                            });
                          }}
                        />
                      </div>
                    </label>
                    {!valid && <p>Please enter a valid phone number.</p>}
                  </div>
                  {/* <div><label><div style={{marginLeft: '1px'}}><label for="phone">Phone Number:</label><div class=" react-tel-input " style={{border: '1px solid red', width: '450px'}}><div class="special-label">Phone</div><input class="form-control " placeholder="enter phone number " type="tel" value="+1" style={{width:'450px'}}/><div class="flag-dropdown "><div class="selected-flag" title="United States: + 1" tabindex="0" role="button" aria-haspopup="listbox"><div class="flag us"><div class="arrow"></div></div></div></div></div></div></label></div> */}
                </form>
                <button className="btn1" onClick={submitUserinfo} style={{ width: "100px", margin: "10px 0" }}>
                  Next
                </button>
              </div>
            </div>

            <br />

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className=" col-12  ">
              <div className="col-12" style={{ display: "flex" }}>
                <div className="col-4" style={{ margin: "20px" }}>
                  <img style={{ width: "30px" }} src={logo} alt="" />
                  <b>PMS Solutions</b>
                </div>
                <div className="path col-8" style={{ marginRight: "200px" }}>
                  <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
                </div>
              </div>
            </div>
            <div className=" col-12 case4">
              <div className="container">
                <h2 style={{ marginBottom: "20px" }}>Firm Information</h2>
                <form>
                  <label>Firm Name</label>

                  <input type="text" placeholder="Enter firm name" value={value} onChange={(e) => setFirmName(e.target.value)} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />

                  <div className="col-12">
                    <div style={{ width: "100%" }}>
                      <label style={{ margin: "10px 0" }}>Country</label>

                      <Select
                        value={selectedCountryD}
                        onChange={(option) => {
                          setSelectedCountry(option.label);
                          setSelectedCountryD(option);
                          setSelectedState(null); // Reset selected state when the country changes
                        }}
                        options={countries}
                        placeholder="Select a country"
                      />
                      <label style={{ margin: "10px 0" }}>State</label>
                      <Select
                        className="form-select"
                        aria-label="Select State"
                        value={stateOptions.find((option) => option.value === selectedState)}
                        onChange={(option) => {
                          setSelectedState(option.label);
                        }}
                        options={stateOptions}
                        placeholder="Choose State"
                      />
                    </div>
                  </div>
                  <br />
                </form>
                <button className="btn1" onClick={submitFerminfo} style={{ margin: "10px 0" }}>
                  Next
                </button>
              </div>
            </div>
            <br />

            {/* <button onClick={prevStep} className="pre">
              Previous
            </button> */}
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>
            <div className="case5">
              <div className=" col-12 case5"></div>

              <div className=" col-12 selectbar  " style={{ margin: " 5% 20%" }}>
                <div style={{ textAlign: "center", marginBottom: "10px", alignItems: "center", justifyContent: "center" }}>Selected Value: {fixedValues[sliderValue]}</div>
                <div style={{ marginLeft: "20px", display: "flex", justifyContent: "space-between" }}>
                  {fixedValues.map((value, index) => (
                    <div key={index}>{value}</div>
                  ))}
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <input type="range" min="0" max={fixedValues.length - 1} step="1" value={sliderValue} onChange={handleSliderChange} style={{ width: "100%", justifyContent: "center" }} />
                </div>
              </div>
              <div className=" col-12">
                <hr className="hr" />
                {sliderValue === 0 && (
                  <p className="p" style={{ color: "black", marginLeft: "7%" }}>
                    Please select company size
                  </p>
                )}
              </div>

              <div className=" col-12 case5">
                <div className="container selection">
                  <h2>How did you hear about PMS Solutions? </h2>

                  <div>
                    <div>
                      {colors.map((color, index) => (
                        <button key={value} value={colors[selectedButton]} className={`toggle-button ${buttonStates[index] ? "active" : ""}`} onClick={() => handleToggle(index)} style={{ margin: "50px 20px" }}>
                          {color}
                        </button>
                      ))}
                      <div style={{ marginTop: "10px" }}>{selectedButton !== null && <p>Sorce Of Information : {colors[selectedButton]} </p>}</div>
                    </div>
                  </div>

                  <button className="btn1" onClick={submitFirmDetail}>
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 6:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>
            <div className="col-12"></div>

            <div className=" col-12 case6">
              <div className="container" style={{ padding: "6%", margin: "5% 20%" }}>
                <h2>Services your firm offers</h2>
                <div style={{ margin: "20px 0" }}>
                  <button className="btn1" onClick={() => handleButtonClick2("TaxPreparation")} style={{ backgroundColor: buttonStates2.TaxPreparation ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Tax Prepration
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("TaxPlanning")} style={{ backgroundColor: buttonStates2.TaxPlanning ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Tax Planning
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("Advisory")} style={{ backgroundColor: buttonStates2.Advisory ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Advisory
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("Resolution")} style={{ backgroundColor: buttonStates2.Resolution ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Resolution
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("Payroll")} style={{ backgroundColor: buttonStates2.Payroll ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Payroll
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("Accounting")} style={{ backgroundColor: buttonStates2.Accounting ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Accounting
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("Audit")} style={{ backgroundColor: buttonStates2.Audit ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Audit
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("LawFirm")} style={{ backgroundColor: buttonStates2.LawFirm ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Law firm
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("Bookkeeping")} style={{ backgroundColor: buttonStates2.Bookkeeping ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Bookkeeping
                  </button>
                  <button className="btn1" onClick={() => handleButtonClick2("Other")} style={{ backgroundColor: buttonStates2.Other ? "#043a77" : "#3498db", margin: "5px 20px" }}>
                    Other
                  </button>
                </div>

                <div>
                  <p>{buttonsOn.length > 0 && <p>Services that are Selected: {buttonsOn.join(", ")}</p>}</p>
                </div>
                <div>
                  <label>
                    <input type="checkbox" onChange={handleSelectAll} style={{ marginLeft: "2%" }} />
                    Select All
                  </label>
                  <button onClick={submitService} className="btn1" style={{ marginLeft: "20px" }}>
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 7:
        return (
          <div>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>

            <div className="containerf">
              <div className=" col-12 case5" style={{ padding: "5%", marginBottom: "30px" }}>
                <div className="container selection">
                  <h1>Your role in the firm </h1>

                  <div>
                    <div>
                      {colors3.map((color, index) => (
                        <button key={index} className={`toggle-button ${buttonStates3[index] ? "active" : ""}`} onClick={() => handleToggle3(index)} style={{ margin: "5px 20px" }}>
                          {color}
                        </button>
                      ))}
                      <div style={{ marginTop: "10px" }}>{selectedButton3 !== null && <p>Sorce Of Information : {colors3[selectedButton3]} </p>}</div>
                    </div>
                  </div>
                </div>{" "}
                <button className="btn1" style={{ marginLeft: "10%" }} onClick={submitRole}>
                  Next
                </button>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>

            <div className=" col-12 case8">
              <div className="container" style={{ marginRight: "10%" }}>
                <div className="firm">
                  <h2>Firm Settings</h2>

                  <div className="firm-info">
                    <p>
                      A powerful,integrated platform <br /> to manage teams,clients,projects.
                    </p>
                    <p>
                      <b>from $50/mo per user</b> <br />
                      (with a 3-year subscription plan)
                    </p>
                  </div>

                  <h3 style={{ marginTop: "20px" }}>Firm Setting</h3>

                  <p>choose web URL</p>
                  <div style={{ fontSize: "13px" }}>
                    <p>You will be ale to set up a fully custom domain(without.pms.com) later</p>
                  </div>

                  <div className="url_container">
                    <input type="text" id="url_input" value={url} onChange={(e) => setUrl(e.target.value)} className="url" placeholder="Enter your URL" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                    <label className="label" id="domin_lable">
                      .pms.com
                    </label>
                  </div>

                  <div className="currency-container">
                    <div className="currency">
                      <label>You cannot Change it later</label>
                      <br />

                      <div>
                        <label>Select Currency: </label>
                        <Select value={selectedCurrency} onChange={handleCurrencyChange} options={currencies} placeholder="Select a currency" />
                      </div>
                    </div>
                    <br />
                    <div>
                      <label>Select Language: </label>

                      <Select value={selectedLanguage} onChange={handleLanguageChange} options={languages} placeholder="Select a language" />

                      {/* {selectedLanguage && <p>You selected: {selectedLanguage.label}</p>} */}
                    </div>
                  </div>
                  {/* submiturl */}
                  <button className="btn1" onClick={submiturl} style={{ margin: "25px 0" }}>
                    Continue
                  </button>
                </div>
              </div>
              <div className="image">
                <img style={{ height: "400px" }} src={firmsetting} alt="" />
              </div>
            </div>
            <br />
            {/* <button onClick={nextStep} className="next">
              Next
            </button>
            <button onClick={prevStep} className="pre">
              Previous
            </button> */}
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );
      case 9:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={3} stageNames={stageNames} />
              </div>
            </div>
            <div className="setpassword-container col-12" style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
              <div className="password-sub-container col-12 " style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", maxWidth: "600px" }}>
                <div className="pagetitle" style={{ fontSize: "30px", textAlign: "center" }}>
                  <h1 style={{ marginBottom: "5%", fontSize: "38px", textAlign: "center" }}>Set Password</h1>
                </div>
                <div className="form-password col-9" style={{ marginBottom: "6%", marginTop: "5%" }}>
                  <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <label htmlFor="password">Password</label>
                    <input type={!passShow ? "password" : "text"} onChange={setValP} value={inppass.password} name="password" id="password" placeholder="Enter Your password" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                    <div style={{ position: "absolute", top: "70%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setPassShow(!passShow)}>
                      {!passShow ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
                <div className="formpassword col-9">
                  <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <label htmlFor="confirmPassword">Confirm Password</label>

                    <input type={!cpassShow ? "password" : "text"} onChange={setValP} value={inppass.cpassword} name="cpassword" id="cpassword" placeholder="Confirm password" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                    <div style={{ position: "absolute", top: "70%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setCPassShow(!cpassShow)}>
                      {!cpassShow ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
                <div className="password-btn col-9">
                  <div className="contiunebutton-btn">
                    <button className="btn1" onClick={submitPassword} style={{ margin: "20% 30%" }}>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </>
        );

      //book session
      // case 10:
      //   return (
      //     <>
      //       <div className="col-12" style={{ display: "flex" }}>
      //         <div className="col-4" style={{ margin: "20px" }}>
      //           <img style={{ width: "30px" }} src={logo} alt="" />
      //           <b>PMS Solutions</b>
      //         </div>
      //         <div className="path col-12" style={{ marginRight: "200px" }}>
      //           <MultiStage steps={totalSteps} currentStepForm={4} stageNames={stageNames} />
      //         </div>
      //       </div>
      //       <div className="datepicker-container col-12" style={{ display: "flex" }}>
      //         <div className="firmleft-container col-12" style={{ color: "black", padding: "20px", width: "50%", border: "0.5px " }}>
      //           <div className="h1-container col-12" style={{ textAlign: "left", marginBottom: "20px", margin: "2%" }}>
      //             <h1 style={{ fontSize: "35px" }}>Book a free implementation session</h1>
      //           </div>
      //           <div className="font-class col-12" style={{ textAlign: "left", marginBottom: "10px", margin: "2%" }}>
      //             <p style={{ fontSize: "12px" }}>10 out of 10 TaxDome firm saw faster ROI and implemementation by scheduling an intro session right away. Please choose a time that works best for your team that works best for your team-our experienced staff are ready to set your practice up for success.</p>
      //           </div>
      //           <div className="col-12" style={{ display: "flex", alignItems: "center", marginBottom: "20px", marginTop: "70%", background: "#AFDBF5", color: "GrayText", height: "10vh", fontSize: "16px" }}>
      //             <div className="col-4" style={{ flex: "1", textAlign: "left" }}>
      //               <p style={{ fontSize: "14px" }}>Web conferencing deatils provided upon Confirmation</p>
      //             </div>
      //           </div>

      //           <div>
      //             <NavLink to="/" style={{ color: "rgb(58, 145, 245)" }}>
      //               Skip booking for now
      //             </NavLink>
      //           </div>
      //         </div>

      //         <div className="dateright-container col-12" style={{ color: "black", flexDirection: "column", padding: "2%" }}>
      //           <div className="right-content-title">
      //             <h5 style={{ fontSize: "26px" }}>Select a Date & Time </h5>
      //           </div>

      //           <div className="time-zone-container" style={{ display: "flex", gap: "10px" }}>
      //             <div className="language-choose col-6" style={{ marginTop: "2%" }}>
      //               <label style={{ fontSize: "14px" }}>Default Language</label>
      //               <Select value={selectedLanguage} onChange={handleLanguageChange} options={languages} placeholder="Select a language" />
      //             </div>

      //             <div className="timezone-choose col-6" style={{ marginTop: "1.5%" }}>
      //               <label style={{ fontSize: "16px" }}> Time Zone</label>
      //               <Select placeholder="Select a Time" />
      //             </div>
      //           </div>

      //           <div className="date-section col-12" style={{ minHeight: "20vh", display: "flex", marginTop: "2%" }}>
      //             <div className="col-12">
      //               <label style={{ fontSize: "16px" }}> Date </label>
      //               <input
      //                 style={{
      //                   width: "50%",
      //                   padding: "10px",
      //                   boxsizing: "border-box",
      //                   border: "1px solid #ccc",
      //                   borderRadius: "10px",
      //                 }}
      //                 type="date"
      //                 value={selectedDate}
      //                 onChange={(e) => setSelectedDate(e.target.value)}
      //               />
      //             </div>
      //           </div>
      //           <div className="button-btn col-12" style={{ justifyContent: "center" }}>
      //             <NavLink to="/">
      //               <button onCLick={handleBookSession()} style={{ background: "rgb(58, 145, 245)", border: "none", color: "white", borderRadius: "5px", height: "30px", width: "80px", marginLeft: "5px" }}>
      //                 Next
      //               </button>
      //             </NavLink>
      //           </div>
      //         </div>
      //       </div>
      //     </>
      // //   );
      // case 11:
      //   return (
      //     <>
      //       <div className="col-12" style={{ display: "flex" }}>
      //         <div className="col-4" style={{ margin: "20px" }}>
      //           <img style={{ width: "30px" }} src={logo} alt="" />
      //           <b>PMS Solutions</b>
      //         </div>
      //         <div className="path col-12" style={{ marginRight: "200px", marginBottom: "10%" }}>
      //           <MultiStage steps={totalSteps} currentStepForm={4} stageNames={stageNames} />
      //         </div>
      //       </div>

      //       <div className="message col-7" style={{ justifyContent: "center", marginLeft: "10%", flexWrap: "wrap" }}>
      //         <h2>Your Information</h2>
      //         <p style={{ color: "green", fontSize: "16px" }}> "SNP TaxConsultant, welcome to the pinnacle of tax excellence with PMS Solutions. Together, let's redefine financial success and deliver unparalleled solutions. Your journey to seamless tax management starts here!"</p>
      //       </div>

      //       <div className="toast">
      //         <ToastContainer />
      //       </div>
      //     </>
      //   );

      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderFormFields()}</form>;
};

export default SignUp;
