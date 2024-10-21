import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate  } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Appointment from "./pages/Appointment/Appointment";
import AppNavBar from "./components/AppNavBar";
import { useUser } from "./context/UserContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#069494",
    },
    secondary: {
      main: "#BAC7BE",
    },
    tertiary: {
      main: "#FFFF",
    },
  },
});
function ProtectedRoute({ children }) {
  const { user } = useUser(); // Use the custom hook to get the user object
  if (!user.isLogin) { // Access isLogin within the user object
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}
// Wrapper component to handle conditional rendering of AppNavBar
function AppWrapper() {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render AppNavBar if the route is not '/login' */}
      {location.pathname !== "/login" && <AppNavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppWrapper /> {/* Using AppWrapper to control navbar rendering */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;