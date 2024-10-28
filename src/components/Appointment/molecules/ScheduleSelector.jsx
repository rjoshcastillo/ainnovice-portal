import {
  Box,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { useUser } from "../../../context/UserContext";
import Doctor from '../../../services/doctor.services';

const ScheduleSelector = ({ data, callBack, canProceed }) => {
  const [scheduleData, setScheduleData] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const debounceTimeout = useRef(null);
  const { doctorsList } = useUser();

  const today = new Date();
  today.setDate(new Date().getDate());


  const isDateAvailable = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return availableDates.includes(formattedDate);
  };

  const onChange = (e, newValue = null, inputType = "input") => {
    let name, value;

    if (inputType === "input") {
      name = e.target.name;
      value = e.target.value;
    } else if (inputType === "date") {
      name = "appointmentDate";
      value = moment(newValue).format("YYYY-MM-DD");
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

  const getDoctorsAvailableDates = async (id) => {
    await Doctor.getDoctorsAvailability(id).then((res) => {
      console.log(res);
      
      setAvailableDates(res);
    })
  }
  
  useEffect(() => {
    
    if (data) {
      setScheduleData({
        appointmentDate: data?.appointmentDate
          ? new Date(data.appointmentDate)
          : null,
        amPm: data?.amPm || "AM",
      });
     
      getDoctorsAvailableDates(data?.doctorId);
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
            name="appointmentDate"
            label="Appointment Date"
            value={scheduleData.appointmentDate ? moment(scheduleData.appointmentDate).toDate() : null}
            onChange={(newDate) => onChange(null, newDate, "date")}
            minDate={today}
            shouldDisableDate={(date) => !isDateAvailable(date)}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
      </Box>
      <FormControl component="fieldset" margin="normal" sx={{ flex: 1, }}>
        <FormLabel component="legend" sx={{display: 'flex', alignItems: 'center'}}>
           <InfoOutlinedIcon sx={{marginRight: '5px'}}/>Preferred Time (AI will decide the best time for you)
        </FormLabel>
      </FormControl>
    </Box>
  );
};

export default ScheduleSelector;
