import React, { useState } from "react";
import axios from 'axios';

export const Register = (props) => {
    //Stores states for all registration pieces
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [submitResult, setSubmitResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (userPassword.length < 5) {
            throw new Error('Password must be at least 5 characters long');
        } else if (userPassword === userEmail) {
            throw new Error('Password must not match email address');
        } else {
            const response = await axios.post('http://localhost:8005/api/NewDad-App/Users', {
                name: userName,
                email: userEmail,
                password: userPassword
            });
            console.log('Registration successful:', response.data);
            setSubmitResult('Registration successful.');
            props.onFormSwitch('login');
        }
    } catch (error) {
        console.error('Error during registration:', error.message);
        setSubmitResult(`Registration failed: ${error.message}`);
    }
};

  return (
    <center>
      <div className="auth-form-container">
        <form className="Register" onSubmit={handleSubmit}>
          <div>
            <label>Full Name:
              <input
                id="userName"
                placeholder="Full Name"
                value={userName}
                name="userName"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>Email Address:
              <input
                type="email"
                id="userEmail"
                placeholder="youremail@email.com"
                value={userEmail}
                name="userEmail"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>Password:
              <input
                type="password"
                id="userPassword"
                placeholder="*********"
                value={userPassword}
                name="userPassword"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Register</button>
          <p>{submitResult}</p>
          <button type="button" onClick={() => props.onFormSwitch('login')}>
            Already have an account? Log in here.
          </button>
        </form>
      </div>
    </center>
  );
};
