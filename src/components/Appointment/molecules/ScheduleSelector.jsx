import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

const ScheduleSelector = ({ data, callBack }) => {
  const [scheduleData, setScheduleData] = useState({});

  const handleDateChange = (newDate) => {
    setScheduleData({ ...scheduleData, appointmentDate: newDate });
    callBack({ ...scheduleData, appointmentDate: newDate });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
    callBack({ ...scheduleData, [name]: value });
  };

  useEffect(() => {
    if(data) {
      setScheduleData({
        appointmentDate: data?.appointmentDate || null,
        amPm: data?.amPm || ""
      })
    }
  },[data])
  return (
    <Box sx={{ my: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            sx={{ width: "100%" }}
            label="Appointment Date"
            value={scheduleData.appointmentDate || null}
            onChange={handleDateChange}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
      </Box>
      <FormControl component="fieldset" margin="normal" sx={{ flex: 1 }}>
        <FormLabel component="legend">Preffered Time (AI will decide the best time for you)</FormLabel>
        <RadioGroup
          name="amPm"
          value={String(scheduleData.amPm)}
          onChange={onChange}
          row
        >
          <FormControlLabel
            value="Morning"
            control={<Radio />}
            label="Morning"
          />
          <FormControlLabel
            value="Afternoon"
            control={<Radio />}
            label="Afternoon"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ScheduleSelector;
