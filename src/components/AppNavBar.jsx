import { useNavigate } from "react-router-dom";
import AInnoviceLogo from "../assets/logo/ainnovice_logo.png";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useUser } from "../context/UserContext";

function AppNavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useUser();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleHomeClick = () => {
    navigate("/");
  }
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar>
      <img
          src={AInnoviceLogo}
          alt="Logo"
          style={{ width: "75px", height: "75px", marginRight: "10px", cursor: "pointer" }}
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
        <Button color="inherit" onClick={handleHomeClick} >Home</Button>
        <Button color="inherit">Our Services</Button>
        <Button color="inherit">About Us</Button>
        {!user.isLogin && (
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppNavBar;
