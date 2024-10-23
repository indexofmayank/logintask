import React, { useState, useEffect } from "react";
import axios from "axios";

function ForgetPasswordPage() {

    const [email, setEmail] = useState();
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [userOtp, setUserOtp] = useState(null);
    const [newPassword, setNewPassword] = useState(null);


    const handleSubmitButton = async () => {
        const response = await axios.post(`http://localhost:5000/api/user/forgetpassword/`, {
            email
        });

        const {success, message} = response.data;
        if(success) {
            setShowOtpInput(true);
        }
    }

    const handleVerifyOtp = async () => {
        try {
            const otp = userOtp
            const secondResponse = await axios.post(`http://localhost:5000/api/user/verifyforgetpassword/`, {
                email, otp
            });
            console.log(secondResponse.data);
            const {success, message} = secondResponse.data;
            if(success) {
                setShowNewPassword(true);
            }
        } catch (error) {
            alert(error.message);
        }    
    }

    const handleChangePassword = async () => {
        try {
            const thirdResponse = await axios.post(`http://localhost:5000/api/user/updatepassword/`, {
                email, newPassword
            });
            console.log(thirdResponse);
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        console.log(newPassword);
    }, [newPassword]);


    return (
        <div className="container mt-5">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5 className="box-title">Forget password</h5>
                    <div className="mb-3">
                        <label className="form-label">Enter email Id</label>
                        <input className="form-control" placeholder="jhondoe@gmail.com" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleSubmitButton}>Get Otp</button>

            </div>
            {showOtpInput && (
                <div className="card-body mt-5">
                    <label className="form-label mb-3">Enter otp</label>
                    <input type="Number" className="form-control mb-3" placeholder="Otp" onChange={(e) => { setUserOtp(e.target.value) }} />
                    <button className="btn btn-primary mb-3" onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            )}
            {showNewPassword && (
                <div className="card-body mt-5">
                    <label className="form-label mb-3">New password</label>
                    <input type="text" className="form-control mb-3" placeholder="password" onChange={(e) => {setNewPassword(e.target.value)}} />
                    <button className="btn btn-primary mb-3" onClick={handleChangePassword} >Change password</button> 
                </div>
            )}
        </div>
    );
}

export default ForgetPasswordPage;