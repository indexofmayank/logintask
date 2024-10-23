import axios from "axios";
import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

function Homepage() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const UserId = queryParams.get('id');
    const [userData, setUserData] = useState({
        firstName: null,
        lastName: null,
        email: null
    });
    console.log(userData);
    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(`http://localhost:5000/api/user/${UserId}`);
            const {data} = response.data;
            setUserData({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })
        }
        loadData()
    }, []);


    return(
        <div className="container mt-5">
            <div className="card shadow p-4">
                <div className="card-body">
                    <h2 className="card-title text-center">Welcome, {userData.firstName} {userData.lastName}!</h2>
                    <p className="card-text text-center">
                        <strong>Email:</strong> {userData.email}
                    </p>
                </div>
            </div>
            <div className="mt-4 text-center">
                <button className="btn btn-primary">Go to Dashboard</button>
            </div>
        </div>

    );
}

export default Homepage;