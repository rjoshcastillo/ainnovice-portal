import * as React from "react";
import {
  Box,
  Container,
  Card,
  CardMedia,
  Typography,
  Button,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import patientProfileImg from "../../assets/patient-profile.png";
import { useUser } from "../../context/UserContext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PatientDetails from "../../components/Patient/PatientDetails";
import { useNavigate } from "react-router-dom";
import AppointmentDashboard from "../../components/Patient/AppointmentDashboard";

function Patient() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleBookAppointment = () => {
    navigate('/appointment')
  }
  return (
    <Box>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          borderRadius={4}
          sx={{
            mt: 8,
            mb: 2,
            p: 2,
            backgroundImage: "linear-gradient(to right, teal, #f5f5f5)",
          }}
        >
          <Box>
              <img
                height="200"
                src={patientProfileImg}
                alt="Patient"
              />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            alignItems="center"
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Hi, {user?.fullName}
            </Typography>
            <Typography component="p">How are you feeling today?</Typography>
            <Button onClick={handleBookAppointment} variant="contained" color="primary" style={{ padding: 12 }}>
              Book an Appointment
            </Button>
          </Box>
        </Grid>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Card sx={{ borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="My Details" value="1" />
                <Tab label="Appointments" value="2" />
              </TabList>
            </Card>
            <TabPanel value="1" sx={{ px: 0}}><PatientDetails /></TabPanel>
            <TabPanel value="2" sx={{ px: 0}}><AppointmentDashboard/></TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Box>
  );
}

export default Patient;
