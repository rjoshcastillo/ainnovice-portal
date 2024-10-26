import React from "react";
import { Box, Paper, Typography, Card } from "@mui/material";

const DoctorStatsCards = (props) => {
  const { label, value, icon, size } = props;
  return (
    <Card sx={{ borderRadius: "20px", height: "150px", width: "275px" }}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box sx={{ width: "20%" }}>{icon && <div>{icon}</div>}</Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            sx={{ display: "flex", justifyContent: "flex-end", fontSize: size }}
          >
            {label}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Paper>
    </Card>
  );
};

export default DoctorStatsCards;
