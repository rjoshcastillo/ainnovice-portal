import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Button,
  Box,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const PatientDetails = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullname || "",
    gender: user.gender || "",
    employed: user.employed || "",
    jobDescription: user.jobDescription || "",
    alcoholConsumption: "yes",
    smoking: "yes",
    height: "",
    weight: "",
    breathingTrouble: "yes",
    painLevel: 0,
    painPart: "",
    medicalConcern: "",
    symptoms: "",
    temperature: "",
    medicalConcernStart: moment().toDate(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (e, newValue) => {
    setFormData({ ...formData, painLevel: newValue });
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, medicalConcernStart: newDate });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <h2>Patient Details</h2>
      <form noValidate autoComplete="off">
        {/* Full Name */}
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {/* Gender */}
          <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          {/* Employed */}
          <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
            <FormLabel component="legend">Employed</FormLabel>
            <RadioGroup
              name="employed"
              value={formData.employed}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Job Description */}
        <TextField
          label="Job Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
        />

        {/* Alcohol Consumption and Smoking */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {/* Alcohol Consumption */}
          <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
            <FormLabel component="legend">Alcohol Consumption</FormLabel>
            <RadioGroup
              name="alcoholConsumption"
              value={formData.alcoholConsumption}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {/* Smoking */}
          <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
            <FormLabel component="legend">Smoking</FormLabel>
            <RadioGroup
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <TextField
            label="Height (CM)"
            variant="outlined"
            fullWidth
            margin="normal"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />

          <TextField
            label="Weight (KG)"
            variant="outlined"
            fullWidth
            margin="normal"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
            <FormLabel component="legend">Breathing Trouble</FormLabel>
            <RadioGroup
              name="breathingTrouble"
              value={formData.breathingTrouble}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
            <InputLabel id="painPart-label">Pain Part</InputLabel>
            <Select
              label="Pain Part"
              labelId="painPart-label"
              name="painPart"
              value={formData.painPart}
              onChange={handleChange}
              sx={{ flex: 1 }}
            >
              {[
                "Head",
                "Chest",
                "Back",
                "Abdomen",
                "Knee",
                "Shoulder",
                "Arm",
                "Leg",
                "Foot",
                "Neck",
              ].map((part) => (
                <MenuItem key={part} value={part}>
                  {part}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Pain Level */}
        <Box margin="normal">
          <FormLabel component="legend">Pain Level (0-10)</FormLabel>
          <Slider
            value={formData.painLevel}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={10}
            marks
          />
        </Box>

        {/* Medical Concern */}
        <TextField
          label="Medical Concern"
          variant="outlined"
          fullWidth
          margin="normal"
          name="medicalConcern"
          value={formData.medicalConcern}
          onChange={handleChange}
        />

        {/* Symptoms */}
        <TextField
          label="Symptoms"
          variant="outlined"
          fullWidth
          margin="normal"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            marginTop: "10px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Medical Concern Start Date"
              value={formData.medicalConcernStart}
              onChange={handleDateChange}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>

          <TextField
            label="Temperature (°C)"
            variant="outlined"
            name="temperature"
            type="number"
            value={formData.temperature}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PatientDetails;
