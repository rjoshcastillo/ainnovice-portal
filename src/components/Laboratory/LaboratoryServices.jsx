
import React, { useState, useEffect } from "react";
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
import LaboratoryCard from "./LaboratoryCard";
import LaboratoryServicesModal from "./LaboratoryServicesModal";
import { useUser } from "../../context/UserContext";
import LaboratoryServicesEmpty from "./LaboratoryServicesEmpty";
import Appointment from "../../services/appointment.services";


const LaboratoryServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [equipments, setEquipments] = useState([]);
  const [appointmentSummary, setAppointmentSummary] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await Appointment.getEquipments();
        setEquipments(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };
    if (equipments.length < 1) {
      fetchEquipments();
    }
  }, [equipments]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const params = {
          id: user?.id,
          type: user?.type,
        };
        const res = await Appointment.getAppointment(params);
        setAppointments(Array.isArray(res.data) ? res.data : []);
        res.data.forEach((item) => {
          if (item.findings) {
            const parseFindings = JSON.parse(item.findings);
            setAppointmentSummary(parseFindings);
          }
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (appointments.length === 0) {
      fetchAppointments();
    }
  }, [user]);


  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleCardClick = (service) => setSelectedService(service);
  const handleCloseModal = () => setSelectedService(null);

  const availableServices = equipments.filter((equipment) =>
    appointmentSummary?.lab_request.includes(equipment.type)
  );

  const filteredServices = availableServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      {availableServices.length === 0 ? (
        <LaboratoryServicesEmpty />
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
            <Box display="flex" flexWrap="wrap" gap={2}>
              {filteredServices.map((service) => (
                <Box key={service.id} width={{ xs: "100%", sm: "48%", md: "30%" }}>
                  <LaboratoryCard
                    icon={service.icon}
                    name={service.name}
                    onClick={() => handleCardClick(service)}
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
        />
      )}
    </Container>
  );
};

export default LaboratoryServices;
