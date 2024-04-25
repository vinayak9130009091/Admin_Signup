import React from "react";
import logo from "../../../Pages/static/logoAdmin.png";
import "./common.css";
import "../../../Pages/Styles/Common/btn1.css";
// import '../../../Pages/Styles/Common/btn2.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
function ForgotPassword() {
  const history = useNavigate();
  const [inpval, setInpval] = useState({
    email: "",
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

  const getresetlink = async (e) => {
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
    } else {
      e.preventDefault();

      const port = window.location.port;

      const url = `http://68.251.138.233:${port}/resetpassword`;

      const data = await fetch("http://68.251.138.233:8080/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          url,
        }),
      });

      axios
        .request(data)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          //toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Check your email ID for Link");
          history("/resetpassword");
        })
        .catch((error) => {
          alert("please check your Email");
          console.log(error);
        });

      const res = await data.json();
      console.log(res);

      if (res.status === 200) {
        localStorage.setItem("resetpasstoken", res.result.token);

        Cookies.set("resetpasstoken", res.result.token); //, { expiresIn: Date.now() + (parseInt(expiryTime) * 60 * 1000)}); // Set cookie with duration provided
      } else if (res.status === 400) {
        toast.error("Invalid user!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="headercontainer col-6" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="logo-container col-6" style={{ margin: "2% 2% 2% 10%", display: "flex", alignItems: "center", width: "100%" }}>
          <img src={logo} alt="" style={{ height: "40px", marginRight: "5px" }} />
          <b style={{ fontSize: "14px" }}>PMS Solutions</b>
        </div>
      </div>
      <div className="forgot-password col-12" style={{ marginTop: "6%", display: "flex", justifyContent: "center" }}>
        <div className="password-container col-6" style={{ height: "50vh", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
          <div className="password-info col-12">
            <div className="psw-header col-12 ">
              <h3 style={{ margin: "5% 0 1% 5%", fontSize: "20px" }}>Reset your password</h3>
              <p style={{ margin: "2% 0 1% 5%", fontSize: "15px" }}>To reset your password, enter the email address you use to sign in</p>
            </div>
            <div className="pswd-input col-12" style={{ margin: "3% 0 0 5%" }}>
              <label className="col-12">Email Address</label>

              <input className="col-9" type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Email Address" style={{ padding: "8px 12px", borderRadius: "10px", margin: "2% 0 0 0", border: "2px solid rgb(58,145,245)", fontSize: "13px" }} />
            </div>
            <div className="reset-button col-5" style={{ margin: "3% 0 1% 5%", display: "flex", gap: "20px" }}>
              <button type="submit" onClick={getresetlink} className="btn1 col-5">
                Get Reset Link
              </button>
              <div>
                <NavLink to="/">
                  <button type="submit" className=" btn2 col-12">
                    Back to Login
                  </button>{" "}
                  {/* <button type='submit' className='col-12' style={{ padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', color: 'rgb(58, 145, 245)', border: '1px solid rgb(58, 145, 245)', background: 'none' }}>Back to Login</button> */}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="toast">
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
