
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./setpassword.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function ResetPassword() {
    
    const { id, token } = useParams()

    const history = useNavigate();

    const updatePassword = (id, token) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("id", id);
        myHeaders.append("Authorization", token);

        console.log(token)
        console.log(id)
        const raw = JSON.stringify({
            "password": confirmPassword
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const baseUrl = `http://68.251.138.233:8080/common/user/password/updateuserpassword/`;
        const url = new URL(baseUrl);

        url.searchParams.append("id", id);
        url.searchParams.append("token", token);



        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((result) => {
           console.log(result)
                Cookies.remove("resetpasstoken")
                localStorage.removeItem("resetpasstoken")
                toast("Password Updated successfully.")
                // Handle success, if needed
            })
            .catch((error) => {
                console.error("Error updating password:", error.message);
                // Handle error, if needed
            });

    }


    const UserValidToken = async () => {
        let token = localStorage.getItem("resetpasstoken");

        const res = await fetch("http://68.251.138.233:8080/common/resetpassword/verifytoken", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        console.log(data)
        if (data.message === "Access granted") {
            const id = data.user.id;
console.log(id)
            updatePassword(id, token);

            //ToDo send to login page

        } else if (data.message === "Invalid token") {
            console.log("Time Expired");
            toast.error('Time Expired!');
            //ToDo send to resetpasswordlink
        }
    }



    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleConfirmPasswordPaste = (e) => {
        const pastedText = e.clipboardData.getData('text');
        setConfirmPassword(pastedText);
    };

    const handleSubmit = () => {
        history('/login')
           if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        else {
            UserValidToken()
        }
    };


    return (
        <>

            <div className="setpassword-container col-12" style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                <div className='password-sub-container col-12 ' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', maxWidth: '600px' }}>
                    <div className='pagetitle' style={{ fontSize: '30px', textAlign: 'center' }}>
                        <h1 style={{ marginBottom: '5%', fontSize: '38px', textAlign: 'center' }}>Set Password</h1>
                    </div>
                    <div className="form-password col-9" style={{ marginBottom: '6%', marginTop: '5%' }}>
                        <div className="password-input" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }}
                            />
                            <div style={{ position: 'absolute', top: '60%', transform: 'translateY(-50%)', right: '20px', cursor: 'pointer',border:'1px solid red' }} onClick={handleTogglePasswordVisibility}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                    </div>
                    <div className="formpassword col-9">
                        <div className="password-input" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                onPaste={handleConfirmPasswordPaste} // Allow pasting
                                style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }}
                            />
                            <div style={{ position: 'absolute', top: '80%', transform: 'translateY(-50%)', right: '20px', cursor: 'pointer' }} onClick={handleTogglePasswordVisibility}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                    </div>
                    <div className='password-btn col-9'>
                        <div className='btn1' style={{ justifyContent: 'left', }}>
                            <button style={{ marginLeft: '0', background: "rgb(100, 149, 237)", marginTop: '2%', border: "none", borderRadius: '10px', width: '80px', height: '30px', color: 'white' }}
                                onClick={() => {
                                    handleSubmit()
                                }}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default ResetPassword;