import React from "react";
import {
  Grid2 as Grid,
  Button,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined"; // Import the icon
import AppointmentCard from "./AppointmentCard";

// Skeleton Loader component
const GridSkeleton = ({ count = 3, height = 150, marginTop = 0 }) => (
  <Grid
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: `${marginTop}px`,
    }}
  >
    {Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={{ width: "30%" }}>
        <Skeleton
          variant="rectangular"
          height={height}
          width="100%"
          animation="wave"
          sx={{ borderRadius: "10px" }}
        />
      </Box>
    ))}
  </Grid>
);

// Main SkeletonLoader component
const SkeletonLoader = () => (
  <Box sx={{ padding: 2 }}>
    <GridSkeleton />
    <GridSkeleton marginTop={20} />
    <Box mt={2}>
      <Skeleton
        variant="rectangular"
        height={50}
        width="100%"
        animation="wave"
        sx={{ borderRadius: "10px" }}
      />
    </Box>
  </Box>
);

const AppointmentList = ({
  appointments,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  totalPages,
  isLoading,
}) => {
  // Get appointments for the current page
  const paginatedAppointments = appointments.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handler to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler to go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ width: "100%", height: "500px", overflowY: "auto" }}>
      {isLoading ? (
        // Show the SkeletonLoader if loading
        <SkeletonLoader />
      ) : appointments && appointments.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
            width: "100%",
            height: "400px",
            overflowY: "auto",
          }}
        >
          <FolderCopyOutlinedIcon
            sx={{ fontSize: 48, color: "grey.500", marginBottom: 2 }}
          />
          {/* Folder icon */}
          <Typography variant="h6" color="textSecondary">
            No Data at the moment
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {paginatedAppointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <AppointmentCard {...appointment} />
            </Grid>
          ))}
        </Grid>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        mt={2}
        sx={{ height: 40 }}
      >
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 0 || isLoading} // Disable while loading
        >
          Previous
        </Button>
        <Typography variant="h6">
          Page {currentPage + 1} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1 || isLoading} // Disable while loading
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default AppointmentList;
