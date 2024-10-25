import React from 'react';
import { Box, Typography } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';

const UnderMaintenance = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight='20vh'
      justifyContent="center" // Light gray background
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={2}
      >
        <BuildIcon fontSize="large" color='primary'/>
        <SettingsIcon fontSize="large" color='primary' />
      </Box>
      <Typography variant="h5" color="textSecondary">
        Under Maintenance
      </Typography>
    </Box>
  );
};

export default UnderMaintenance;