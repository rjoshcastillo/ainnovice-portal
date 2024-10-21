import React from "react";
import { Typography, Box, Grid2 as Grid, Button } from "@mui/material";
import ScheduleSelector from "./molecules/ScheduleSelector";

const AppointmentForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Appointment Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <ScheduleSelector />
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default AppointmentForm;
