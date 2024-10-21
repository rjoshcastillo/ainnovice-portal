import React from "react";
import { Typography } from "@mui/material";
import PatientDetails from "./molecules/PatientDetails";
import { useUser } from "../../context/UserContext";
const AppointmentForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const { user } = useUser();

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h4" textAlign={"center"} gutterBottom>
          Appointment Form
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <PatientDetails user={user}/>
        {/* <ScheduleSelector /> */}
        {/* <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Grid> */}
      </form>
    </div>
  );
};

export default AppointmentForm;
