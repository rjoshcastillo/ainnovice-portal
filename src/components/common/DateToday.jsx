import React from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useTheme } from "@mui/material/styles";
const DateToday = () => {
  const theme = useTheme();
  const todayDate = moment().format("MMMM D, YYYY");
  return (
    <Box display="flex" alignItems="center">
      <CalendarTodayIcon
        sx={{ marginRight: 1, color: theme.palette.primary.main }}
      />
      <Typography variant="body1" sx={{ color: "#000000", fontWeight: 600 }}>
        Today, {todayDate}
      </Typography>
    </Box>
  );
};

export default DateToday;
