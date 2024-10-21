import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './loginForm.css';
import AInnoviceLogo from "../../assets/logo/ainnovice_logo.png";
import { Login } from "../../services/account.services"; // Assuming this is your login service

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // To handle error messages
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await Login({ email, password });
      
      if (response.status) {
        // Handle successful login (e.g., redirect, save token)
        console.log('Login successful:', response.data);
        // Redirect or save auth token
        
      } else {
        // Handle login failure (e.g., wrong credentials)
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      // Handle any errors during the login process
      setErrorMessage('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={AInnoviceLogo} alt="AInnovice" className="login-logo" />
        <h2>Login your account</h2>
        <p>Login using your patient portal account</p>
      </div>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          className="login-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          className="login-field"
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display errors */}

        <div className="login-actions">
          <a href="/forgot-password" className="forgot-password">
            Forgot login details?
          </a>
        </div>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'LOGIN'}
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
