import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from "./pages/SignUpPage";
import Homepage from './pages/Homepage';
import UserVerificationPage from './pages/UserVerificationPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';

function App() {

  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/userverification" element={<UserVerificationPage />} />
        <Route exact path="/forgetpassword" element={<ForgetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;