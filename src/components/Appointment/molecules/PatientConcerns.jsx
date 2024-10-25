import React, { useEffect, useRef, useState } from "react";
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
  Chip,
} from "@mui/material";
import Doctor from "../../../services/doctor.services";
import { useUser } from "../../../context/UserContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const PatientConcerns = ({ data, callBack, canProceed }) => {
  const [patientConcerns, setPatientConcerns] = useState({});
  const [symptomChips, setSymptomChips] = useState([]);
  const { doctorsList, updateDoctorsList } = useUser();
  const debounceTimeout = useRef(null);

  const onChange = (e, newValue = null, inputType = "input") => {
    let name, value;

    if (inputType === "input") {
      name = e.target.name;
      value =
        name === "knowADoctor" || name === "breathingTrouble"
          ? e.target.value === "true"
          : e.target.value;

      if (name === "symptoms") {
        const symptomsArray = value.split(",").map((s) => s.trim());
        setSymptomChips(symptomsArray);
      }
    } else if (inputType === "slider") {
      name = "painLevel";
      value = newValue;
    } else if (inputType === "date") {
      name = "medicalConcernStart";
      value = newValue;
    }

    setPatientConcerns((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        callBack(updatedDetails);
        checkIfCanProceed(updatedDetails);
      }, 200);

      return updatedDetails;
    });
  };

  const checkIfCanProceed = (details) => {
    let hasValue = Object.entries(details).every(([key, value]) => {
      if (key === "specialtyDoctor" && !details.knowADoctor) {
        return true;
      }
      return value !== "" && value !== null && value !== undefined;
    });
    canProceed(hasValue);
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
    if (data) {
      setPatientConcerns({
        knowADoctor: data?.knowADoctor || false,
        specialtyDoctor: data?.specialtyDoctor || "",
        breathingTrouble: data?.breathingTrouble || false,
        painPart: data?.painPart || "",
        painLevel: data?.painLevel || 0,
        medicalConcern: data?.medicalConcern || "",
        symptoms: data?.symptoms || "",
        medicalConcernStart: data?.medicalConcernStart || null,
        temperature: data?.temperature || "",
      });
    }
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

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
        {patientConcerns.knowADoctor && (
          <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
            <InputLabel id="specialtyDoctor-label">Specialty Doctor</InputLabel>
            <Select
              label="Specialty Doctor"
              labelId="specialtyDoctor-label"
              name="specialtyDoctor"
              value={patientConcerns.specialtyDoctor || ""}
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
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box margin="normal" sx={{ flexGrow: 1, mr: 3 }}>
          <FormLabel component="legend">Pain Level (0-10)</FormLabel>
          <Slider
            value={patientConcerns.painLevel || 0}
            onChange={(e, newValue) => onChange(e, newValue, "slider")}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={10}
            marks
          />
        </Box>
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

      <TextField
        label="Medical Concern"
        variant="outlined"
        fullWidth
        margin="normal"
        name="medicalConcern"
        value={patientConcerns.medicalConcern || ""}
        onChange={onChange}
      />

      <TextField
        label="Symptoms"
        variant="outlined"
        fullWidth
        margin="normal"
        name="symptoms"
        value={patientConcerns.symptoms || ""}
        onChange={onChange}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
        {symptomChips.filter(symptom => symptom !== "").map((symptom, index) => (
          <Chip
            key={index}
            label={symptom}
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "16px",
              padding: "4px 8px",
              fontSize: "0.9rem",
            }}
          />
        ))}
      </Box>

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
            onChange={(newDate) => onChange(null, newDate, "date")}
            maxDate={new Date()}
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
