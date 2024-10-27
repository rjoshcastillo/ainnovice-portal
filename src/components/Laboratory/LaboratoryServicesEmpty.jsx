import React from "react";
import { Box, Typography } from "@mui/material";
import medicineDoctor from "../../assets/medicine-doctor.svg";
const LaboratoryServicesEmpty = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box>
        <img src={medicineDoctor} alt="doctor-medicine" />
      </Box>
      <Typography variant="h5" sx={{ mt: 2 }}>
        You’re all good
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        No laboratory request set to you
      </Typography>
    </Box>
  );
};

export default LaboratoryServicesEmpty;
