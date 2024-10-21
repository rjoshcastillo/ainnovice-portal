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
import HeaderImage from "../../assets/doctor-patient-image.svg";
import HospitalService from "../../assets/hospital-service.svg";
import PatientSupport from "../../assets/patient-support.svg";
import DoctorConsultation from "../../assets/doctor-consultation.svg";
import AppNavBar from "../../components/AppNavBar";


const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppNavBar />
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
