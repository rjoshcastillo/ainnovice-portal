import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Slider,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Grid2 as Grid,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ScheduleSelector from "../../components/Forms/Appointment/ScheduleSelector";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    employed: "No",
    jobDescription: "",
    alcoholConsumption: "No",
    smoking: "No",
    height: "",
    weight: "",
    breathingTrouble: "No",
    painLevel: 0,
    painPart: "",
    medicalConcern: "",
    symptoms: "",
    temperature: "",
    medicalConcernStart: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, medicalConcernStart: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
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
