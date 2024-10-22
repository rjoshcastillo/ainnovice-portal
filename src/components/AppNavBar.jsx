import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AInnoviceLogo from "../assets/logo/ainnovice_logo.png";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Container
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useUser } from "../context/UserContext";

function AppNavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, logout } = useUser();

  // State for managing the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    handleCloseMenu();
  };

  const handleLogoutClick = () => {
    logout();
    window.location.reload();
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: 120,
        justifyContent: "center",
      }}
    >
      <Container>
        <Toolbar>
          <img
            src={AInnoviceLogo}
            alt="Logo"
            style={{
              width: "75px",
              height: "75px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={handleHomeClick}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleHomeClick}
          >
            AInnovice
          </Typography>
          <Grid sx={{ display: "flex", gap: 4 }}>
            <Button color="inherit" onClick={handleHomeClick}>
              Home
            </Button>
            <Button color="inherit">Our Services</Button>
            <Button color="inherit">About Us</Button>

            {/* Conditionally render Login button or profile icon */}
            {!user.isLogin ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.tertiary.main,
                  color: theme.palette.primary.main,
                }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
            ) : (
              <>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar
                    alt={user.fullname}
                    src="/static/images/avatar/1.jpg"
                  />{" "}
                  {/* Placeholder Avatar */}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppNavBar;
