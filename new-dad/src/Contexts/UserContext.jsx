import {useContext, createContext, useState} from "react";

const UserContext = createContext();

export const UserProvider = (props) => {

    // creates a structure for the user, but no user is selected/logged in (null)
    const [currentUser, setCurrentUser] = useState(null);
   
    const handleUpdateUser = (user) => {
        setCurrentUser(user);
    }

    const logoutUser = () => {
        setCurrentUser(null);
    };

    
   //Export all user cases
        return (
            <UserContext.Provider value={{currentUser, handleUpdateUser, logoutUser}}>
                {props.children}
            </UserContext.Provider>
        );
    }
    
export const useUserContext = () => {
    return useContext(UserContext);
}


