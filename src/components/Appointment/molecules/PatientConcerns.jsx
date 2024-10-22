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
  Slider,
} from "@mui/material";
import Doctor from "../../../services/doctor.services";
import { useUser } from "../../../context/UserContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const PatientConcerns = ({ data, callBack }) => {
  const [patientConcerns, setPatientConcerns] = useState({});
  const { doctorsList, updateDoctorsList } = useUser();

  const handleSliderChange = (e, newValue) => {
    setPatientConcerns({ ...patientConcerns, painLevel: newValue });
    callBack({ ...patientConcerns, painLevel: newValue });
  };

  const handleDateChange = (newDate) => {
    setPatientConcerns({ ...patientConcerns, medicalConcernStart: newDate });
    callBack({ ...patientConcerns, medicalConcernStart: newDate });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "knowADoctor" || name === "breathingTrouble"
        ? value === "true"
        : value;
    setPatientConcerns({ ...patientConcerns, [name]: newValue });
    callBack({ ...patientConcerns, [name]: newValue });
  };

  const getDoctorsList = async () => {
    if (doctorsList.length === 0) {
      try {
        const res = await Doctor.getDoctors();
        if (Array.isArray(res)) {
          updateDoctorsList(res);
        } else {
          console.error("Expected an array, but got:", res);
        }
      } catch (error) {
        console.error("Error fetching doctors list:", error);
      }
    }
  };
  useEffect(() => {
    getDoctorsList();
  }, [doctorsList]);

  useEffect(() => {
    if (data) {
      setPatientConcerns({
        knowADoctor: data?.knowADoctor || false,
        doctor: data?.doctor || "",
        breathingTrouble: data?.breathingTrouble || false,
        painPart: data?.painPart || "",
        painLevel: data?.painLevel || 0,
        medicalConcern: data?.medicalConcern || "",
        symptoms: data?.symptoms || "",
        medicalConcernStart: data?.medicalConcernStart || null,
        temperature: data?.temperature || "",
      });
    }
  }, [data]);
  useEffect(() => {}, [patientConcerns]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
          <FormLabel component="legend">
            Do you know which specialty doctor to consult?
          </FormLabel>
          <RadioGroup
            name="knowADoctor"
            value={String(patientConcerns.knowADoctor)}
            onChange={onChange}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        {patientConcerns.knowADoctor ? (
          <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
            <InputLabel id="doctor-label">Specialty Doctor</InputLabel>
            <Select
              label="Specialty Doctor"
              labelId="doctor-label"
              name="doctor"
              value={patientConcerns.doctor || ""}
              onChange={onChange}
              sx={{ flex: 1 }}
            >
              {doctorsList.map((item, index) => (
                <MenuItem key={index} value={item.specialty}>
                  {item.specialty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <></>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
          <InputLabel id="painPart-label">Pain Part</InputLabel>
          <Select
            label="Pain Part"
            labelId="painPart-label"
            name="painPart"
            value={patientConcerns.painPart || ""}
            onChange={onChange}
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
        <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
          <FormLabel component="legend">Breathing Trouble</FormLabel>
          <RadioGroup
            name="breathingTrouble"
            value={String(patientConcerns.breathingTrouble)}
            onChange={onChange}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box margin="normal">
        <FormLabel component="legend">Pain Level (0-10)</FormLabel>
        <Slider
          value={patientConcerns.painLevel || 0}
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
        value={patientConcerns.medicalConcern || ""}
        onChange={onChange}
      />

      {/* Symptoms */}
      <TextField
        label="Symptoms"
        variant="outlined"
        fullWidth
        margin="normal"
        name="symptoms"
        value={patientConcerns.symptoms || ""}
        onChange={onChange}
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
            value={patientConcerns.medicalConcernStart || null}
            onChange={handleDateChange}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>

        <TextField
          label="Temperature (°C)"
          variant="outlined"
          name="temperature"
          type="number"
          value={patientConcerns.temperature || ""}
          onChange={onChange}
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};

export default PatientConcerns;
