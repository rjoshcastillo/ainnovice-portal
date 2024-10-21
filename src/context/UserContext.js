import React, { createContext, useState, useContext } from "react";

// Create a UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullname: "",
    age: "",
    jobDescription: "",
    employed: false,
    account_id: "",
    gender: "",
    isLogin: false,
  });

  // Function to update user details
  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
