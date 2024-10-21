import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AInnoviceLogo from "../../assets/logo/ainnovice_logo.png";
import HeaderImage from "../../assets/doctor-patient-image.svg";
import HospitalService from "../../assets/hospital-service.svg";
import PatientSupport from "../../assets/patient-support.svg";
import DoctorConsultation from "../../assets/doctor-consultation.svg";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Replace '/login' with the path of your login page
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header Section */}
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main }} // Apply tertiary color
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

      {/* Hero Section */}
      <Container sx={{ my: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to our Online Services
            </Typography>
            <Typography variant="body1" paragraph>
              Here at Chong Hua Hospital, we offer the most comprehensive online
              healthcare services at affordable costs.
            </Typography>
            <Button variant="contained" color="primary">
              Book an Appointment
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={HeaderImage}
              alt="Online Services"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Services Section */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {[
            { title: "Hospital Services", imgSrc: HospitalService },
            { title: "Doctor Consultation", imgSrc: DoctorConsultation },
            { title: "Patient Support", imgSrc: PatientSupport },
          ].map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.title}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image={service.imgSrc}
                  alt={service.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
