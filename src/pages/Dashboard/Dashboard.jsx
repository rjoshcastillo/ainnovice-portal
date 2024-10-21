import React from "react";
import {
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
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // For navigation

  const handleAppointmentClick = () => {
    if (user.isLogin) {
      navigate("/appointment"); // Redirect to the appointment page if logged in
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };
  return (
    <Box>
      <Container sx={{ my: 6 }}>
        <Card sx={{ padding: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to our Online Services
            </Typography>
            <Typography variant="body1" paragraph>
              At <strong>AINNovice</strong>, we are dedicated to revolutionizing your healthcare
              experience with our AI-powered online services, tailored to meet
              all your needs. Your health is our top
              priority!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAppointmentClick}
              style={{ padding: 12 }}
            >
              Book an Appointment
            </Button>
          </Grid>
        </Card>
      </Container>
      <Container>
        <Grid container sx={{ justifyContent: "space-between"}}>
          <Grid size={5} sx={{ my: 12}}>
            <Grid item>
              <img
                src={HeaderImage}
                alt="Online Services"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid size={6}>
            {/* Services Section */}
            <Container sx={{ padding: 4, marginLeft: 5 }}>
              <Grid container spacing={4} sx={{ cursor: "pointer" }}>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
