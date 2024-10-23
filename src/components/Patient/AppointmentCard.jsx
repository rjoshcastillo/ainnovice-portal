import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

const statusColors = {
  Ongoing: "info",
  Waiting: "warning",
  Completed: "success",
  Cancelled: "error",
};

const AppointmentCard = ({
  medical_concern,
  status,
  fullName,
  doctor,
  appointment_date,
  appointment_start,
  appointment_end,
  avatar,
  specialty,
}) => {
  const convertedStartTime = moment(appointment_start, "HH:mm").format("hh:mm A");
  const convertedEndTime = moment(appointment_end, "HH:mm").format("hh:mm A");
  return (
    <Card variant="outlined" sx={{ width: "350px", height: "200px" }}>
      <CardContent sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "30%",
          }}
        >
          <Typography variant="subtitle1" component="div">
            {medical_concern}
          </Typography>
          <Chip label={status} color={statusColors[status]} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
            height: "50%",
          }}
        >
          {doctor && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: 'center',
              }}
            >
              <Avatar src={avatar} alt={doctor} sx={{ mr: 2 }} />
              <div>
              <Typography variant="h6">{doctor}</Typography>
              {specialty && (
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  {specialty}
                </Typography>
              )}
              </div>
            </Box>
          )}
          {fullName && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                ml: 2,
              }}
            >
              <Avatar src={avatar} alt={fullName} sx={{ mr: 2 }} />
              <Typography variant="h6">{fullName}</Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            width: "100%",
            height: "20%",
          }}
        >
          <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2" sx={{ mr: 2 }}>
            {moment(appointment_date).format("MMMM D, YYYY")} 
          </Typography>
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">{convertedStartTime}-{convertedEndTime} </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
