import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid2 as Grid,
  Tab,
  Card,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DoctorStatsCards from "../../components/Doctor/DoctorStatCard";
import DoctorAppointmentList from "../../components/Doctor/DoctorAppointmentList";
import doctorProfileImg from "../../assets/doctor-profile.svg";
import { useUser } from "../../context/UserContext";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import AccessibleOutlinedIcon from "@mui/icons-material/AccessibleOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DateToday from "../../components/common/DateToday";
import UnderMaintenance from "../../components/common/UnderMaintenance";
import { LineChart } from "@mui/x-charts/LineChart";
const doctorHeader = [
  {
    id: 1,
    header: "Dashboard",
  },
  {
    id: 2,
    header: "Appointments",
  },
  {
    id: 3,
    header: "Patients",
  },
  {
    id: 4,
    header: "Payment",
  },
  {
    id: 5,
    header: "Clinic",
  },
  {
    id: 6,
    header: "My Profile",
  },
];

const statusCard = [
  {
    label: "Total No. of Patients",
    size: "16px",
    value: "189",
    icon: (
      <AddCircleOutlineOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
    ), // Use the icon here
  },
  {
    label: "Inpatients",
    size: "20px",
    value: "130",
    icon: <AccessibleOutlinedIcon color="primary" sx={{ fontSize: 40 }} />, // Use the icon here
  },
  {
    label: "Outpatients",
    size: "20px",
    value: "59",
    icon: (
      <AccessibleForwardOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
    ), // Use the icon here
  },
  {
    label: "Consultation Requests",
    size: "16px",
    value: "22",
    icon: (
      <AccessibilityNewOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
    ), // Use the icon here
  },
];

const dataset = [
  { patient: 1, predicted: 30, actual: 30 },
  { patient: 2, predicted: 25, actual: 30 },
  { patient: 3, predicted: 45, actual: 40 },
  { patient: 4, predicted: 35, actual: 25 },
  { patient: 5, predicted: 50, actual: 55 },
  { patient: 6, predicted: 30, actual: 25 },
  { patient: 7, predicted: 20, actual: 30 },
  { patient: 8, predicted: 40, actual: 45 },
  { patient: 9, predicted: 30, actual: 35 },
  { patient: 10, predicted: 45, actual: 50 },
  { patient: 11, predicted: 35, actual: 40 },
  { patient: 12, predicted: 30, actual: 35 },
  { patient: 13, predicted: 50, actual: 45 },
  { patient: 14, predicted: 40, actual: 35 },
  { patient: 15, predicted: 45, actual: 50 },
  { patient: 16, predicted: 55, actual: 60 },
  { patient: 17, predicted: 30, actual: 25 },
  { patient: 18, predicted: 40, actual: 35 },
  { patient: 19, predicted: 50, actual: 45 },
  { patient: 20, predicted: 35, actual: 30 },
];



const Doctor = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("1");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="lg">
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
          <img height="200" src={doctorProfileImg} alt="Patient" />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          alignItems="center"
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Hi, Dr. {user?.fullName}, PhD
          </Typography>
          <Typography component="p">How are you feeling today?</Typography>
        </Box>
      </Grid>
      <Box sx={{ borderColor: "divider" }}>
        <TabContext value={tab}>
          <Card
            sx={{
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {doctorHeader.map((item) => (
                <Tab
                  key={item.id}
                  label={item.header}
                  value={String(item.id)}
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                />
              ))}
            </TabList>
          </Card>
          {doctorHeader.map((item) => (
            <TabPanel key={item.id} value={String(item.id)} sx={{ px: 0 }}>
              {item.header === "Dashboard" && (
                <Box>
                  <Box
                    mt={4}
                    sx={{
                      marginBottom: "30px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        color="primary"
                      >
                        Dashboard
                      </Typography>
                    </Box>
                    <Box>
                      <DateToday />
                    </Box>
                  </Box>

                  <Box
                    mt={2}
                    sx={{
                      marginBottom: "30px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {statusCard.map((card, index) => (
                      <Grid key={index}>
                        <DoctorStatsCards
                          label={card.label}
                          value={card.value}
                          icon={card.icon}
                          size={card.size}
                        />
                      </Grid>
                    ))}
                  </Box>
                  <Box>
                    <Card sx={{ borderRadius: "10px", padding: '20px' }}>
                      <Box>
                        <Typography variant="h5" component="h3" color="primary">
                          Predictive Analytics
                        </Typography>
                      </Box>
                      <Box>
                        <LineChart
                          dataset={dataset}
                          xAxis={[{ dataKey: "patient" }]}
                          series={[
                            { dataKey: "predicted", name: "Predicted Time Spent", color: "blue" },
                            { dataKey: "actual", name: "Actual Time Spent", color: "red" },
                          ]}
                          height={300}
                          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                          grid={{ vertical: true, horizontal: true }}
                        />
                      </Box>
                    </Card>
                  </Box>
                </Box>
              )}
              {item.header === "Appointments" && (
                <Box mt={4}>
                  <Box
                    mt={2}
                    sx={{
                      marginBottom: "30px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        color="primary"
                      >
                        Appointments
                      </Typography>
                    </Box>
                    <Box>
                      <DateToday />
                    </Box>
                  </Box>
                  <DoctorAppointmentList />
                </Box>
              )}
              {item.header === "Patients" && <UnderMaintenance />}
              {item.header === "Payment" && <UnderMaintenance />}
              {item.header === "Clinic" && <UnderMaintenance />}
              {item.header === "My Profile" && <UnderMaintenance />}
              {/* Add other conditions for Patients, Payment, Clinic, etc., as needed */}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Container>
  );
};

export default Doctor;
