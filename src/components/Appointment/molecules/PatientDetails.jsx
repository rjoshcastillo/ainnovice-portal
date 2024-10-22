import React, { useEffect, useState } from "react";
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
  Box,
} from "@mui/material";

const PatientDetails = ({ user, data, callBack }) => {
  const [patientDetails, setPatientDetails] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "employed" || name === "smoking" ? value === "true" : value;
    setPatientDetails({ ...patientDetails, [name]: newValue });
    callBack({ ...patientDetails, [name]: newValue });
  };

  useEffect(() => {
    if (user) {
      setPatientDetails({
        accountId: user.account_id || "",
        fullName: user.fullname || "",
        gender: user.gender || "",
        employed: user.employed || false,
        jobDescription: user.jobDescription || "",
        alcoholConsumption: data?.alcoholConsumption || "None",
        smoking: data?.smoking || false, 
        height: data?.height || "", 
        weight: data?.weight || "", 
      });
    }
  }, [user, data]); 

  return (
    <Box>
      <TextField
        label="Full Name"
        disabled
        variant="outlined"
        fullWidth
        margin="normal"
        name="fullName"
        value={patientDetails.fullName || ""}
        onChange={onChange}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <FormControl
          disabled
          component="fieldset"
          margin="normal"
          sx={{ flex: 1 }}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={patientDetails.gender || ""}
            onChange={onChange}
            row
          >
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <FormControl
          disabled
          component="fieldset"
          margin="normal"
          sx={{ flex: 1 }}
        >
          <FormLabel component="legend">Employed</FormLabel>
          <RadioGroup
            name="employed"
            value={String(patientDetails.employed)}
            onChange={onChange}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
      <TextField
        disabled
        label="Job Description"
        variant="outlined"
        fullWidth
        margin="normal"
        name="jobDescription"
        value={patientDetails.jobDescription || ""}
        onChange={onChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
          <InputLabel>Alcohol Consumption</InputLabel>
          <Select
            label="Alcohol Consumption"
            name="alcoholConsumption"
            value={patientDetails.alcoholConsumption || ""}
            onChange={onChange}
            sx={{ flex: 1 }}
          >
            {["None", "Light", "Moderate", "Heavy"].map((part) => (
              <MenuItem key={part} value={part}>
                {part}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
          <FormLabel component="legend">Smoking</FormLabel>
          <RadioGroup
            name="smoking"
            value={String(patientDetails.smoking)}
            onChange={onChange}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
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
          value={patientDetails.height || ""} 
          onChange={onChange}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Weight (KG)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="weight"
          type="number"
          value={patientDetails.weight || ""} 
          onChange={onChange}
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};

export default PatientDetails;
