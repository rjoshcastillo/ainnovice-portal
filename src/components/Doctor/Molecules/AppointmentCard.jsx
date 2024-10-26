import React from "react";
import { Paper, Typography, Box, Avatar, Badge } from "@mui/material";
import StatusChip from "../../common/StatusChip";
import moment from "moment";

const AppointmentCard = ({
  medical_concern,
  status,
  patient,
  appointment_date,
  appointment_start,
  appointment_end,
  onClick,
}) => {
  return (
    <Paper
      onClick={onClick}
      elevation={3}
      sx={{
        padding: 2,
        width: "300px",
        transition: "0.3s ease",
        cursor: "pointer",
        "&:hover": {
          elevation: 6,
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ wordBreak: "break-word" }}
      >
        {medical_concern}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <StatusChip status={"Urgent"} />
        <StatusChip status={status} />
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Avatar sx={{ marginRight: 2 }}>A</Avatar>
        <Box>
          <Typography variant="body1">{patient}</Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(appointment_date).format("dddd")} {appointment_start} -{" "}
            {appointment_end}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AppointmentCard;
