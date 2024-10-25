import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DateToday from "../common/DateToday";

const AppointmentFilters = ({ searchQuery, onSearchChange, statusFilter, onStatusChange }) => {

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
      <DateToday/>
    </Box>
  );
};

export default AppointmentFilters;
