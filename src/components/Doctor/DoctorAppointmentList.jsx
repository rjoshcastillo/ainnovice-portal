import React from 'react';
import { Grid2 as Grid, Typography, Box, Divider } from '@mui/material';
import AppointmentCard from './Molecules/AppointmentCard';

const appointments = [
  {
    type: 'Walk-in Consultation',
    status: 'Ongoing',
    patientName: 'Emily Santos',
    date: 'October 27, 2024',
    time: '10:00 AM',
  },
  {
    type: 'Follow-up Consultation',
    status: 'Waiting',
    patientName: 'Mary Ann Gomez',
    date: 'October 27, 2024',
    time: '10:30 AM',
  },
  {
    type: 'Walk-in Consultation',
    status: 'Waiting',
    patientName: 'Cristina Reyes',
    date: 'October 27, 2024',
    time: '11:00 AM',
  },
  {
    type: 'Walk-in Consultation',
    status: 'Cancelled',
    patientName: 'Barera Reyes',
    date: 'October 27, 2024',
    time: '11:30 AM',
  },
];

const DoctorAppointmentList = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {appointments.map((appointment, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <AppointmentCard {...appointment} />
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" mt={3}>
        <Typography variant="body1" color="primary" style={{ cursor: 'pointer' }}>
          View All Appointments
        </Typography>
      </Box>
    </Box>
  );
};

export default DoctorAppointmentList;
