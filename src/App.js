import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Appointment from "./pages/Appointment/Appointment";

const theme = createTheme({
  palette: {
    primary: {
      main: "#069494",
    },
    secondary: {
      main: "#BAC7BE",
    },
    tertiary: {
      main: "#FFFF"
    }
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
