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
import Doctor from "./pages/Doctor/Doctor";
import Patient from "./pages/Patient/Patient";
import { Box, CircularProgress } from "@mui/material";
import SnackbarProvider from "./context/SnackbarProvider";
import Laboratory from "./pages/Laboratory/Laboratory";
import NotFound from "./pages/NotFound/NotFound";

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
    background: {
      default: "#f5f5f5",
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
  }

  else {
    if (user?.type === "doctor") {
      return (
        <ProtectedRoute>
          <Doctor />
        </ProtectedRoute>

      );
    } else if (user?.type === "patient") {
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
const LaboratoryRoute = () => {
  const { user } = useUser();

  if (user.type !== "patient") {
    return <Navigate to="/not-found" />; // Redirect to Not Found page if not patient
  }

  return (
    <ProtectedRoute>
      <Laboratory />
    </ProtectedRoute>
  );
};
function AppWrapper() {
  const location = useLocation();
  const { isAppLoading } = useUser();
  const noNavBarRoutes = ["/login", "/not-found"]; // List of routes without AppNavBar
  const shouldDisplayNavBar = !noNavBarRoutes.includes(location.pathname);

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

      {shouldDisplayNavBar && <AppNavBar />}

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
 <Route
          path="/laboratory"
          element={<LaboratoryRoute />} // Use the new LaboratoryRoute
        />
        <Route path="/not-found" element={<NotFound/>} /> {/* Route for Not Found */}
        <Route path="*" element={<Navigate to="/not-found" />} /> {/* Catch all other routes */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Router>
          <div className="App">
            <AppWrapper />
          </div>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
