import React, { useState } from "react";
import { useUserContext } from "../Contexts/UserContext";


export const LoginForm = (props) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [submitResult, setSubmitResult] = useState('');
    const {currentUser, handleUpdateUser} = useUserContext();   

    // needs functionality to GET user based on who is logged in

const handleSubmit = (e) => {
    e.preventDefault();
        if (userPassword.length < 4) {
            setSubmitResult('Password must be at least 5 characters long');
        } else if (userPassword === userEmail) {
            setSubmitResult('Password must not match email address');
        } else {
            setSubmitResult('Successful login.');
    handleUpdateUser({ email: userEmail })
        }
    }
{/* if the user is already logged in, show this message instead of the login form */}
if (currentUser) {return (
    <div>
<p>Welcome {currentUser.email}, you're logged in!</p>
<button onClick={() => handleUpdateUser(null)}>Log Out</button>
</div>
); }

return (
    <center><div className="auth-form-container">
        <form action="/" method="POST" className="LoginForm" onSubmit={handleSubmit}>
            <div>
                <label>Email Address:
                    <input
                        type="email"
                        id="userEmail"
                        placeholder="youremail@email.com"
                        value={userEmail}
                        name="userEmail"
                        onChange={(e) => setUserEmail(e.target.value)}>
                    </input>
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
                        onChange={(e) => setUserPassword(e.target.value)}>
                    </input>
                </label>
            </div>
            <button onClick={() => handleUpdateUser({})}>Log In</button>
            <p>{submitResult}</p>
            <button onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </form>
    </div>
    </center>
)
}


