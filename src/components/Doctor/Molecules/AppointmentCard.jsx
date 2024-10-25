import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import StatusChip from '../../common/StatusChip';

const AppointmentCard = ({ type, status, patientName, date, time }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <StatusChip status={status} />
      <Typography variant="subtitle1" gutterBottom>
        {type}
      </Typography>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ marginRight: 2 }}>A</Avatar>
        <Box>
          <Typography variant="body1">{patientName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {date} - {time}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AppointmentCard;
