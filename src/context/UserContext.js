import React, { createContext, useState, useContext, useEffect } from "react";

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

  // Function to update user details and save the whole object to localStorage
  const updateUser = (userData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...userData };
      // Save the updated user object to localStorage
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser); // Set the user state from localStorage
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
