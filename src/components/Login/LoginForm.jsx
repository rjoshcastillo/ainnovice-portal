import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./loginForm.scss";
import AInnoviceLogo from "../../assets/logo/ainnovice_logo.png";
import { Login } from "../../services/account.services";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // To handle error messages
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await Login({ email, password });

      if (response.status) {
        // Assuming the response has user data
        const userData = {
          fullname: response.data.fullName,
          age: response.data.age,
          jobDescription: response.data.jobDescription,
          employed: response.data.employed,
          account_id: response.data.accountId,
          gender: response.data.gender,
          isLogin: true
        };

        updateUser(userData); // Store user details in the context
        navigate("/");

      } else {
        setErrorMessage("Invalid email or password");
        updateUser({ isLogin: false });
      }
    } catch (error) {
      // Handle any errors during the login process
      setErrorMessage("An error occurred during login. Please try again.");
      updateUser({ isLogin: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div
        className="logo-container"
        style={{ backgroundColor: "#069494", borderRadius: 10 }}
      >
        <img src={AInnoviceLogo} alt="AInnovice" className="login-logo" />
      </div>
      <div className="login-header">
        <h2>Login your account</h2>
        <p>Login using your patient portal account</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-text-fields">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="login-actions">
          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}{" "}
          <a href="/forgot-password" className="forgot-password">
            Forgot login details?
          </a>
        </div>
        <Button
          variant="contained"
          fullWidth
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </Button>
        <div className="register-section">
          <p>
            Not yet registered? <a href="/register">Register here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
