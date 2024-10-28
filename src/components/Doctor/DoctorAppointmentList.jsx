import React, { useEffect, useState } from "react";
import { Grid2 as Grid, Typography, Box, Divider } from "@mui/material";
import AppointmentCard from "./Molecules/AppointmentCard";
import Appointment from "../../services/appointment.services";
import { useUser } from "../../context/UserContext";
import AppointmentDetailsModal from "./Molecules/AppointmentDetailsModal";
import moment from "moment";
const DoctorAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useUser();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isStatusChange, setisStatusChange] = useState(false);

  const fetchAppointments = async () => {
    try {
      const params = {
        id: user?.id,
        type: user?.type,
      };
      await Appointment.getAppointment(params).then((res) => {
        const newAppointments = Array.isArray(res.data) ? res.data : [];
            // Filter appointments for today
            

            // // today filtering
            // const todayAppointments = newAppointments.filter(appointment => 
            //   moment(appointment.appointment_date).isSame(moment(), 'day') 
            // );

            // // tomorrow filtering
            // const tomorrowAppointments = newAppointments.filter(appointment =>
            //   moment(appointment.appointment_date).isSame(moment().add(1, 'days'), 'day') // Adjust 'date' to match your appointment date field
            // );

        setAppointments(newAppointments);
        console.log(appointments);
           
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  useEffect(() => {
    fetchAppointments();
    setisStatusChange(false); // Reset after fetch
  }, [isStatusChange]);
  return (
    <Box>
      <Grid container spacing={3}>
        {appointments.map((appointment, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            {
              <AppointmentCard
                {...appointment}
                onClick={() => handleOpenModal(appointment)}
              />
            }
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" mt={3}>
        <Typography
          variant="body1"
          color="primary"
          style={{ cursor: "pointer" }}
        >
          View All Appointments
        </Typography>
      </Box>
      {selectedAppointment && (
        <AppointmentDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          appointment={selectedAppointment}
          onStatusChange={() => setisStatusChange(true)}
        />
      )}
    </Box>
  );
};

export default DoctorAppointmentList;
