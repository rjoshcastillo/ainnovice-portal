import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

import xrayIcon from "../../assets/logo/x-ray-icon.svg";
import ecgMachineIcon from "../../assets/logo/ecg-machine-icon.svg";
import urinalysisIcon from "../../assets/logo/urinalysis-icon.svg";

import LaboratoryCard from "./LaboratoryCard";
import LaboratoryServicesModal from "./LaboratoryServicesModal";
import { useUser } from "../../context/UserContext";
import LaboratoryServicesEmpty from "./LaboratoryServicesEmpty";


const labservices = [
  { name: "ECG", icon: ecgMachineIcon },
  { name: "X-Ray", icon: xrayIcon },
  { name: "Urinalysis", icon: urinalysisIcon },
];

//sample result from api
const appointmentSummary = {
  servicesNeeded: ['X-Ray'],
};


const LaboratoryServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const { user } = useUser();

  // Filter specializations based on the hardcoded appointment summary
  const availableServices = labservices.filter(spec =>
    appointmentSummary.servicesNeeded.includes(spec.name)
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const filteredServices = availableServices.filter((spec) =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" ml={1}>
          Laboratory Services
        </Typography>
      </Box>
      {/* Conditional Rendering based on available specializations */}
      {availableServices.length === 0 ? (
        <LaboratoryServicesEmpty /> // Show when there are no specializations
      ) : (
        <>
          <Typography variant="subtitle1" color="textSecondary">
            Please select a service
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />

          {filteredServices.length > 0 ? (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent={
                filteredServices.length >= 3
                  ? "space-between"
                  : "flex-start"
              }
              gap={2}
            >
              {filteredServices.map((spec) => (
                <Box key={spec.id} width={{ xs: "100%", sm: "48%", md: "30%" }}>
                  <LaboratoryCard
                    icon={spec.icon}
                    name={spec.name}
                    onClick={() => handleCardClick(spec)}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              No services match your search criteria.
            </Typography>
          )}
        </>
      )}
      {selectedService && (
        <LaboratoryServicesModal
          open={Boolean(selectedService)}
          service={selectedService}
          onClose={handleCloseModal}
          user={user}
        />
      )}
    </Container>
  );
};

export default LaboratoryServices;
