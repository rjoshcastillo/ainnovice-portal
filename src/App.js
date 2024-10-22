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
import Appointment from "./pages/Appointment/Appointment";
import AppNavBar from "./components/AppNavBar";
import { useUser } from "./context/UserContext";
import Admin from "./pages/Admin/Admin";
import Patient from "./pages/Patient/Patient";

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

  return (
    <>
      {/* Conditionally render AppNavBar if the route is not '/login' */}
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
      <Router>
        <div className="App">
          <AppWrapper /> {/* Using AppWrapper to control navbar rendering */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
