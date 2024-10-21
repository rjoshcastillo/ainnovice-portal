import { useNavigate } from "react-router-dom";
import AInnoviceLogo from "../assets/logo/ainnovice_logo.png";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
function AppNavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar>
        <img
          src={AInnoviceLogo}
          alt="Logo"
          style={{ width: "75px", height: "75px" }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AInnovice
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Our Services</Button>
        <Button color="inherit">About Us</Button>
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
      </Toolbar>
    </AppBar>
  );
}

export default AppNavBar;
