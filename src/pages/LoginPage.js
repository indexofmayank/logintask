import axios from "axios";
import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';




function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmitClick = async() => {
        const response = await axios.post('http://localhost:5000/api/user/login/', {
            email, password
        });
        const {success, message, user} = response.data;
        console.log(user);
        if(success) {
            setEmail(null);
            setPassword(null)
            navigate(`/?id=${user._id}`);
        } else {
            setEmail(null);
            setPassword(null);
            alert(message);
        }
    }


    return(
        <div className="container mt-5">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5 className="box-title">Login</h5>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" placeholder="jhondoe@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="your password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <p>Forget password, <a href="/forgetpassword">click here</a></p>
                    <p>Don't have an account, <a href="/signup">click here</a></p>
                    <button className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;