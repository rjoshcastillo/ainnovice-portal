import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

const AppointmentFilters = ({ searchQuery, onSearchChange, statusFilter, onStatusChange }) => {
  const theme = useTheme();
  const todayDate = moment().format("MMMM D, YYYY");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        my: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          value={searchQuery} 
        onChange={onSearchChange} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Select defaultValue="All" variant="outlined" sx={{ width: "150px" }} value={statusFilter} onChange={onStatusChange}>
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Ongoing">Ongoing</MenuItem>
          <MenuItem value="Waiting">Waiting</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </Box>
      <Box display="flex" alignItems="center">
        <CalendarTodayIcon
          sx={{ marginRight: 1, color: theme.palette.primary.main }}
        />
        <Typography variant="body1" sx={{ color: "#000000", fontWeight: 700 }}>
          Today, {todayDate}
        </Typography>
      </Box>
    </Box>
  );
};

export default AppointmentFilters;
