import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Appointment from "./pages/Appointment/Appointment";
import AppNavBar from "./components/AppNavBar";
import { useUser } from "./context/UserContext";
import Admin from "./pages/Admin/Admin";
import Patient from "./pages/Patient/Patient";
import { Box, CircularProgress } from "@mui/material";

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
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
function ProtectedRoute({ children }) {
  const { user } = useUser();
  if (!user.isLogin) {
    return <Navigate to="/login" />;
  }
  return children;
}

const HomeRoute = () => {
  const { user } = useUser();
  if (!user?.isLogin) {
    return <Home />;
  } else {
    if (user?.type === "doctors") {
      return (
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      );
    } else if (user?.type === "patients") {
      return (
        <ProtectedRoute>
          <Patient />
        </ProtectedRoute>
      );
    }
  }
};

const LoginRouteGuard = ({ children }) => {
  const { user } = useUser();

  if (user.isLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppWrapper() {
  const location = useLocation();
  const { isAppLoading } = useUser();
  return (
    <>
      <Box></Box>
      {isAppLoading ? (
        <Box
          sx={{
            position: "fixed", // Fixed positioning
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // White background with lower opacity
            backdropFilter: "blur(5px)", // Optional: Adds a blur effect to the background
            zIndex: 1000, // Ensure it appears above other elements
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}

      {location.pathname !== "/login" && <AppNavBar />}

      <Routes>
        <Route
          path="/login"
          element={
            <LoginRouteGuard>
              <Login />
            </LoginRouteGuard>
          }
        />
        <Route path="/" element={<HomeRoute />} />
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
      <CssBaseline />
      <Router>
        <div className="App">
          <AppWrapper /> {/* Using AppWrapper to control navbar rendering */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
