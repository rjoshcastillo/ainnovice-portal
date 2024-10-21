import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullname: "",
    age: "",
    jobDescription: "",
    employed: false,
    account_id: "",
    gender: "",
    isLogin: false,
    type: "",
  });

  const updateUser = (userData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...userData };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      return updatedUser;
    });
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
    <UserContext.Provider value={{ user, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
