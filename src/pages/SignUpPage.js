import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmitClick = async () => {
        setEmailError('');
        setPasswordError('');

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email.");
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError(
                "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
            );
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/', {
                firstName,
                lastName,
                email,
                password
            });
            const {success, message, data} = response.data;
            console.log(data);
            if(success) {
                navigate(`/userverification?id=${data._id}`);
            } else {

            }
        } catch (error) {
            console.error("There was an error registering the user", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5 className="box-title">Sign Up</h5>
                    <div className="mb-3">
                        <label className="form-label">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="John"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Doe"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="jhondoe@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-danger">{emailError}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                    </div>
                    <p>Already have an account, <a href="/login">click here</a></p>
                    <button className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
