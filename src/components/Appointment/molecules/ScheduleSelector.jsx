import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

const ScheduleSelector = ({ data, callBack, canProceed }) => {
  const [scheduleData, setScheduleData] = useState({});
  const debounceTimeout = useRef(null);

  const onChange = (e, newValue = null, inputType = "input") => {
    let name, value;

    if (inputType === "input") {
      name = e.target.name;
      value = e.target.value;
    } else if (inputType === "date") {
      name = "appointmentDate";
      value = newValue;
    }
    setScheduleData((prevDetails) => {
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
    const hasValue = Object.values(details).every(
      (value) => value !== "" && value !== null && value !== undefined
    );

    canProceed(hasValue);
  };
  useEffect(() => {
    if (data) {
      setScheduleData({
        appointmentDate: data?.appointmentDate || null,
        amPm: data?.amPm || "AM",
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);
  return (
    <Box sx={{ my: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            sx={{ width: "100%" }}
            label="Appointment Date"
            value={scheduleData.appointmentDate || null}
            onChange={(newDate) => onChange(null, newDate, "date")}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
      </Box>
      <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
        <FormLabel component="legend">
          Preferred Time (AI will decide the best time for you)
        </FormLabel>
        <RadioGroup
          name="amPm"
          value={String(scheduleData.amPm)}
          onChange={onChange}
          row
        >
          <FormControlLabel
            value="AM"
            control={<Radio />}
            label="Morning"
          />
          <FormControlLabel
            value="PM"
            control={<Radio />}
            label="Afternoon"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ScheduleSelector;
