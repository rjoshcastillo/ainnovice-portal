import React, { useState } from 'react';
import { Button, Grid2 as Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from 'moment';
import './ScheduleSelector.scss'; // Import the SCSS file

const ScheduleSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = {
    morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      alert(`Selected date: ${selectedDate.toLocaleDateString()}, Time: ${selectedTime}`);
    } else {
      alert('Please select both date and time.');
    }
  };
  console.log(moment(selectedDate).format('YYYY-MM-DD'))
  return (
    <div className="schedule-selector">
      <h2>Schedule Selection</h2>

      {/* Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>

      {/* Time Slots */}
      <div className="time-selector">
        <h3>Select Time</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h4>Morning</h4>
            <div className="time-slot-buttons">
              {timeSlots.morning.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Grid>

          <Grid item xs={12}>
            <h4>Afternoon</h4>
            <div className="time-slot-buttons">
              {timeSlots.afternoon.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ScheduleSelector;
