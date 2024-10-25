import React from 'react';
import { Chip } from '@mui/material';

const statusColors = {
  Ongoing: 'info',
  Waiting: 'warning',
  Completed: 'success',
  Cancelled: 'error',
};

const StatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColors[status] || 'default'}
      sx={{ marginBottom: 2 }}
    />
  );
};

export default StatusChip;
