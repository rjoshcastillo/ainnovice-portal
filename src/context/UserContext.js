import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [user, setUser] = useState({
    fullname: "",
    age: "",
    jobDescription: "",
    employed: false,
    account_id: "",
    gender: "",
    email: "",
    contactNumber: "",
    isLogin: false,
    type: "",
    id: 0
  });

  const updateUser = (userData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...userData };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateDoctorsList = (doctorsList) => {
    setDoctorsList(doctorsList); // Update doctors list state
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser); // Set the user state from localStorage
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userInfo");
  };

  return (
    <UserContext.Provider
      value={{ user, logout, updateUser, doctorsList, updateDoctorsList }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
