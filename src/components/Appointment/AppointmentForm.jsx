import React from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import ScheduleSelector from "./molecules/ScheduleSelector";

const AppointmentForm = () => {



  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Appointment Form
      </Typography>
      <form onSubmit={handleSubmit}>
       <ScheduleSelector/>
      </form>
    </Box>
  );
};

export default AppointmentForm;
