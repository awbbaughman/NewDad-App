import './App.css';
import React, { useState } from 'react';
import { UserProvider, useUserContext } from './Contexts/UserContext';
import { LoginForm } from './Components/LoginForm';
import { Register } from './Components/Register';
import { Calendar } from './Components/Calendar';
import { BabyFact } from './Components/BabyFacts';
import { Activities } from './Components/Activities';


const App = () => {
  return (
    // Styles the App with 
    <div className="App">
      <UserProvider>
          <MainContent />
      </UserProvider>
      </div>
  );
};

const MainContent = () => {
    const { currentUser, logoutUser } = useUserContext();
    const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
      setCurrentForm(formName);
  };

  const handleLogout = () => {
    logoutUser(); 
};

  if (!currentUser) {
      return (
          <>
              {currentForm === 'register' ? (
                  <Register onFormSwitch={toggleForm} />
              ) : (
                  <LoginForm onFormSwitch={toggleForm} />
              )}
          </>
      );
  }

  return (
      <>
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
          <div className="side-by-side">
            <Calendar />
            <Activities />
          </div>
          <BabyFact />
          
      </>
  );
};

export default App;
