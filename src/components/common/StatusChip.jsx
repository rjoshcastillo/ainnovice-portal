import React from 'react';
import { Chip } from '@mui/material';

const statusColors = {
  Ongoing: 'info',
  Waiting: 'warning',
  Completed: 'success',
  Cancelled: 'error',
  Urgent: 'error',
};

const StatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColors[status] || 'default'}
    />
  );
};

export default StatusChip;
