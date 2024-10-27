import React from "react";
import {
  Box,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { isDateUnavailable } from "../../helper/holiday";

const LaboratoryForm = ({ user, activeStep  }) => {
  const steps = ["Personal Details", "Select Date & Time"];


  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {activeStep === 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>Personal Details</Typography>
            <TextField disabled label="Name" defaultValue={user?.fullName} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row defaultValue={user?.gender}>
                  <FormControlLabel value="M" control={<Radio />} label="Male" disabled/>
                  <FormControlLabel value="F" control={<Radio />} label="Female" disabled/>
                </RadioGroup>
              </Box>
              <Box sx={{ flex: 1 }}>
                <FormLabel component="legend">Employed</FormLabel>
                <RadioGroup row defaultValue={user?.employed}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                  <FormControlLabel value="No" control={<Radio />} label="No" disabled/>
                </RadioGroup>
              </Box>
            </Box>
            <TextField disabled label="Job Description" defaultValue={user?.jobDescription} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField disabled label="Age" defaultValue={user?.age} fullWidth />
              <TextField disabled label="Phone Number" defaultValue={user?.contactNumber} fullWidth />
            </Box>
            <TextField disabled label="Email" defaultValue={user?.email} fullWidth />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>Select Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={dayjs()}
                views={["year", "month", "day"]}
                shouldDisableDate={isDateUnavailable}
              />
            </LocalizationProvider>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LaboratoryForm;
