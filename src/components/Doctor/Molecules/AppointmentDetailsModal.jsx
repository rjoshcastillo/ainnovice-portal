import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Chip,
  Badge,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import Appointment from "../../../services/appointment.services";
import { useSnackbar } from "../../../context/SnackbarProvider";

const AppointmentDetailsModal = ({ open, onClose, appointment, onStatusChange }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: "none",
  };

  const steps = ["Waiting", "Ongoing", "Completed"];
  const [activeStep, setActiveStep] = useState(0);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const openSnackbar = useSnackbar();

  const handleNext = async () => {
    const statusMap = ["Waiting", "Ongoing", "Completed"];
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));

    const newStatus = statusMap[activeStep + 1];
    try {
      const res = await Appointment.updateAppointment({
        appointment_id: appointment.appointment_id,
        status: newStatus,
      });
      if (res.status) {
        onStatusChange(); // Trigger fetchAppointments
        if (res.appointment_status === "Completed") {
          onClose(); // Close modal if appointment is completed
        }
        openSnackbar(
          `${res.message}`,
          "success",
          4000
        );
      }
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      openSnackbar(
        "Oh no! An error occurred while updating appointment.",
        "error",
        4000
      );
    }
  };
  const handleCancelAppointment = async () => {
    try {
      const res = await Appointment.updateAppointment({
        appointment_id: appointment.appointment_id,
        status: 'Cancelled',
      });
      if (res.status) {
        onStatusChange();
        onClose();
        openSnackbar(
          `${res.message}`,
          "success",
          4000
        );
      }
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      openSnackbar(
        "Oh no! An error occurred while updating appointment.",
        "error",
        4000
      );
    }
    setConfirmationDialogOpen(false);
  };
  const handleCancelClick = () => {
    setConfirmationDialogOpen(true); // Open the confirmation dialog
  };

  const handleDialogClose = () => {
    setConfirmationDialogOpen(false); // Close dialog without canceling
  };
  useEffect(() => {
    if (appointment.status === "Waiting") {
      setActiveStep(0);
    } else if (appointment.status === "Ongoing") {
      setActiveStep(1);
    } else if (appointment.status === "Completed") {
      setActiveStep(2);
    } else {
      setActiveStep(2);
    }
  }, [appointment.status]);

  useEffect(() => {
    
  }, []);
  return (
    <>
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" gutterBottom>
            Appointment Details
          </Typography>
          <Badge
            color="error"
            badgeContent="Urgent"
            sx={{
              marginLeft: 4,
              marginBottom: "4px",
            }}
          />
        </Box>
        <Stepper activeStep={activeStep} sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Patient Name"
              value={appointment.patient} // Assuming you have this field
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Height (cm)"
              value={appointment.height}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Weight (kg)"
              value={appointment.weight}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Medical Concern"
              value={appointment.medical_concern}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Appointment Date"
              value={moment(appointment.appointment_date).format(
                "MMMM D, YYYY"
              )}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Time"
              value={`${appointment.appointment_start} - ${appointment.appointment_end}`}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Alcohol Consumption"
              value={appointment.alcohol_consumption}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <FormControl
              disabled
              component="fieldset"
              margin="normal"
              fullWidth
            >
              <Typography variant="subtitle1">Smoking</Typography>
              <RadioGroup
                row
                aria-label="smoking"
                name="smoking"
                value={appointment.smoking}
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Symptoms"
              value={appointment.symptoms}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <Box>
              {/* Split symptoms by commas or any other delimiter */}
              {appointment.symptoms?.split(",").map((symptom, index) => (
                <Chip
                  key={index}
                  label={symptom.trim()} // Trim whitespace
                  sx={{ margin: "4px" }} // Spacing between chips
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              disabled
              label="Date Booked"
              value={appointment.created_at}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: 3, gap: 2 }}
        >
          <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
          <Button
              variant="contained"
              onClick={handleCancelClick}
              color="error"
              disabled={activeStep !== 0}
            >
              Cancel Appointment
            </Button>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}
          >
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              { activeStep === 2 ? "Finish" : "Next"}
            </Button>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>

    {/* Confirmation Dialog */}
    <Dialog
    open={confirmationDialogOpen}
    onClose={handleDialogClose}
    aria-labelledby="confirmation-dialog-title"
    aria-describedby="confirmation-dialog-description"
  >
    <DialogTitle id="confirmation-dialog-title">Cancel Appointment</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirmation-dialog-description">
        Are you sure you want to cancel this appointment? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDialogClose} color="primary">
        No
      </Button>
      <Button onClick={handleCancelAppointment} color="error" autoFocus>
        Yes, Cancel
      </Button>
    </DialogActions>
  </Dialog>
  </>
  );
};

export default AppointmentDetailsModal;
