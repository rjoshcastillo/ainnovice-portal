import React, { useState, useEffect } from "react";
import { Card, Box } from "@mui/material";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentList from "./AppointmentList";

import Appointment from "../../services/appointment.services";
import { useUser } from "../../context/UserContext";

const AppointmentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const res = await Appointment.getAppointment(user.account_id);
        // Ensure appointments is always an array
        setAppointments(Array.isArray(res.data) ? res.data : []); // Use res.data based on your result structure
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    fetchAppointments();
  }, [user.account_id]); 

  // Filter appointments based on searchQuery and statusFilter
  const filteredAppointments = appointments
    .filter((appointment) => {
      // Use optional chaining to prevent errors if appointment.fullName is undefined
      const matchesSearch = appointment.doctor
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) => new Date(b.appointment_date) - new Date(a.appointment_date)
    ); // Sort by appointment date

  // Calculate the total number of pages after filtering
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset page to 0 when search changes
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(0); // Reset page to 0 when status filter changes
  };
  return (
    <Box>
      <Card sx={{ padding: 4 }}>
        <AppointmentFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
        />
          <AppointmentList
            appointments={filteredAppointments}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            isLoading={isLoading}
          />
      </Card>
    </Box>
  );
};

export default AppointmentDashboard;
