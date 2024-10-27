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
        <Card sx={{ padding: 4, display: "flex", height: "100%" }}>
          <Box
            sx={{
              width: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to our <br />
              <Typography
                variant="h4"
                component="span"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                Online AI
              </Typography>{" "}
              Services
            </Typography>

            <Typography variant="body1" paragraph>
              At <strong>AINNovice</strong>, we are dedicated to revolutionizing
              your healthcare experience with our AI-powered online services,
              tailored to meet all your needs. Your health is our top priority!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAppointmentClick}
              style={{ padding: 12 }}
            >
              Book an Appointment
            </Button>
          </Box>
          <Box sx={{ width: "30%" }}>
            <img
              src={HeaderImage}
              alt="Online Services"
              style={{ width: "100%" }}
            />
          </Box>
        </Card>
      </Container>
      <Container>
        <Box
          container
          spacing={4}
          sx={{
            cursor: "pointer",
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {[
            { title: "Laboratory Services", imgSrc: HospitalService },
            { title: "Doctor Consultation", imgSrc: DoctorConsultation },
            { title: "View Appointment", imgSrc: PatientSupport },
          ].map((service) => (
            <Box key={service.title}>
              <Card sx={{ height: "100%", width: "350px" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={service.imgSrc}
                  alt={service.title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ fontSize: 20, textAlign: "center" }}
                  >
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
