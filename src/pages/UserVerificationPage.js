import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function UserVerificationPage() {

    const [otpFeedback, SetOtpFeedback] = useState(null);
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const UserId = queryParams.get('id');
    const navigate = useNavigate();


    const handleSubmitClick = async() => {
        const response = await axios.get(`http://localhost:5000/api/user/user-verification/${UserId}`);
        const {success, data} = response.data;
        if(success === true) {
            const {verificatin_code} = data;
            if(parseInt(verificatin_code) === parseInt(otp)) {
                const secondResponse = await axios.get(`http://localhost:5000/api/user/auth-user/${UserId}`);
                console.log(secondResponse);
                const secondResponseData = secondResponse.data;
                console.log(secondResponseData);
                if(secondResponseData.success) {
                    console.log(secondResponseData.data._id);
                    navigate(`/?id=${secondResponseData.data._id}`);
                } else {
                    alert('Something wrong happed');
                }
            } else {
                alert('Incorrect Otp');
            }
        }
        else {
            SetOtpFeedback('Not able to get issued OTP');
            console.log('Not able to get user info')
        }
    }

    return(
        <div className="container mt-5">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5 className="box-titile">User Verification</h5>
                    <div className="mb-3">
                        <label className="form-label">Verfication</label>
                        <input type="number" className="form-control" placeholder="OTP" onChange={(e) => {setOtp(e.target.value)}}/>
                    </div>
                    {otpFeedback && (
                        <p>{otpFeedback}</p>
                    )}
                    <button className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default UserVerificationPage;