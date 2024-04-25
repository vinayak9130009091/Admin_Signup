import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import {toast,ToastContainer,Slide,Bounce, Flip, Zoom} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../Pages/static/logoAdmin.png";

import { FaFacebook, FaWeebly, FaInstagram, FaLinkedin, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";

// import InputField from "../../../Components/InputField/InputField";
import Buttoncomponent from "../../../Components/ButtonComponent/Buttoncomponent";
// import Selectdropdown from "../../../Components/Selectdropdown/Selectdropdown";
import "../../../Pages/Styles/Common/common.css";
import "../../../Pages/Styles/Pagescss/adminlogin.css";

import andorid from "../../../Pages/Styles/Images/android.png";
import apple from "../../../Pages/Styles/Images/apple.png";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./AdminLogin.css";

export default function AdminLogin() {
  // const [isChecked, setIsChecked] = useState(false);
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
    expiryTime: "",
  });

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

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password, expiryTime } = inpval;

    if (!email) {
      toast.error("Email is required!");
      return;
    } else if (!email.includes("@")) {
      toast.error("Invalid email format!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (!expiryTime) {
      toast.error("Please select the expiration time!");
      return;
    }

    try {
      const data = await fetch("http://68.251.138.233:8080/common/login/generatetoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          expiryTime,
        }),
      });

      const res = await data.json();
      console.log(res);
      //localStorage.setItem("usersdatatoken", res.result.token);
      if (res.status === 200) {
        localStorage.setItem("usersdatatoken", res.result.token);
        Cookies.set("userToken", res.result.token);
        history("/sidebar");
        setInpval({ ...inpval, email: "", password: "" });

        Cookies.set("userToken", res.result.token); //, { expiresIn: Date.now() + (parseInt(expiryTime) * 60 * 1000)}); // Set cookie with duration provided
      } else if (res.status === 400) {
        toast.error("Invalid email or password!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      // console.error("Error:", error);
      // toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container col-12" style={{ background: "pink", display: "flex", minHeight: "100vh" }}>
      <div className="left-container col-12" style={{ background: "rgb(58,145,245)", color: "black", padding: "10%" }}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="col-12" style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "35px" }}>Welcome Back Admin</h2>
        </div>

        <div className="font-class col-12" style={{ textAlign: "center", marginBottom: "20px", paddingLeft: "50px", paddingRight: "50px" }}>
          <p style={{ fontSize: "20px" }}>Our tax consultancy services offer expert guidance on navigating complex tax landscapes. From personalized tax planning to compliance assistance, we ensure your financial strategies align with current regulations. Trust us to maximize your deductions, minimize liabilities, and provide clarity in the ever-evolving tax environment. Your financial success is our priority. </p>
        </div>
        <div className="col-12" style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "22px", fontWeight: "300" }}>"Please log in to access your account."</p>
        </div>
        <div className="col-12" style={{ display: "flex", justifyContent: "center" }}>
          <div className="col-2 col-md-1" style={{ textAlign: "center", color: "white", fontSize: "36px", height: "50px", width: "50px", margin: "0 " }}>
            <FaFacebook />
          </div>
          <div className="col-2 col-md-1" style={{ textAlign: "center", color: "white", fontSize: "36px", height: "50px", width: "50px", margin: "0 " }}>
            <FaTwitter />
          </div>
          <div className="col-2 col-md-1" style={{ textAlign: "center", color: "white", fontSize: "36px", height: "50px", width: "50px", margin: "0 " }}>
            <FaInstagram />
          </div>
          <div className="col-2 col-md-1" style={{ textAlign: "center", color: "white", fontSize: "36px", height: "50px", width: "50px", margin: "0 " }}>
            <FaLinkedin />
          </div>
          <div className="col-2 col-md-1" style={{ textAlign: "center", color: "white", fontSize: "36px", height: "50px", width: "50px", margin: "0 " }}>
            <FaWeebly />
          </div>
        </div>
      </div>

      <div className="right-container col-12" style={{ background: "#f0f0f0", color: "black", flexDirection: "column" }}>
        <div className="login-right col-6" style={{ textAlign: "left", minHeight: "30vh", display: "flex", flexDirection: "column", justifyContent: "center", margin: " 20%" }}>
          <div className="login-logo">
            <img src={logo} alt="" style={{ height: "95px" }} />
          </div>
          <div className="col-12" style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "25px", textAlign: "left" }}>Account Login</h2>
          </div>
          <div className="form-group col-12">
            <label htmlFor="email">Email</label>

            <div className="inputfield-container">
              <input value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
            </div>
          </div>

          <div className="form-password col-12" style={{ marginBottom: "10px" }}>
            <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative", marginTop: "3%" }}>
              <label htmlFor="password">Password</label>

              <div className="inputfield-container">
                <input type={!passShow ? "password" : "text"} placeholder="Enter Your Password" value={inpval.password} onChange={setVal} name="password" id="password" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                <div className="showpass" onClick={() => setPassShow(!passShow)} style={{ position: "absolute", top: "65%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }}>
                  {!passShow ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "left", marginBottom: "3%", fontSize: "12px" }}>
            <NavLink to="/forgotpass" href="#" style={{ color: "rgb(100, 149, 237)", textDecoration: "none" }}>
              Forgot Password?
            </NavLink>
          </div>

          <div className="form-password col-12">
            <div className="password-input" style={{ display: "flex", flexDirection: "column", marginTop: "3%" }}>
              <label htmlFor="password" style={{ marginBottom: "10px" }}>
                Stay signed in for
              </label>
              {/* <Selectdropdown value={inpval.duration} onChange={setVal} name="duration" /> */}
              <div className="selectfield-container col-12">
                <select value={inpval.expiryTime} onChange={setVal} name="expiryTime" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px" }}>
                  <option>Select</option>
                  <option value="1min">1 minutes</option>
                  <option value="30min">30 minutes</option>
                  <option value="4hours">4 hours</option>
                  <option value="8hours">8 hours</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
            <input type="checkbox" id="terms" />

            <label htmlFor="terms" style={{ color: "#696969", fontSize: "14px", marginBottom: "0" }}>
              "Agree to{" "}
              <a href='"https://policies.google.com/terms?hl=en-US">Terms </NavLink> and <NavLink to="https://policies.google.com/terms?hl=en-US"' style={{ color: "rgb(58, 145, 245)", textDecoration: "none" }}>
                Conditions"
              </a>
            </label>
          </div>

          <div className="button-section col-12" style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", textAlign: "center" }}>
            {/* <Buttoncomponent /> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={loginuser} className="btn1 col-5">
                Login
              </button>
            </div>
          </div>

          <div className="col-12" style={{ textAlign: "center", marginTop: "20px" }}>
            <h5>
              {" "}
              Don't have a PMS solutions client portal Account ?{" "}
              <NavLink to="/signup" style={{ color: "rgb(100, 149, 237)", textDecoration: "none" }}>
                Sign Up
              </NavLink>
            </h5>
          </div>

          <div className="playstore-section col-12" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <div className="storeBtn" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="playstore col-12">
                <NavLink to="https://play.google.com/store/apps/details?id=com.linkedin.android&hl=en_IN&gl=US">
                  <img style={{ width: "120px" }} src={andorid} alt="Logo" />
                </NavLink>
              </div>
              <div className="appstore col-12">
                <NavLink to="https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040">
                  <img style={{ width: "120px" }} src={apple} alt="Logo" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
}
