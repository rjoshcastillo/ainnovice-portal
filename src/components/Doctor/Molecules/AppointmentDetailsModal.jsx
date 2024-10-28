import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  RadioGroup,
  Radio,
  Chip,
} from "@mui/material";
import moment from "moment";
import Appointment from "../../../services/appointment.services";
import { useSnackbar } from "../../../context/SnackbarProvider";
// import xrayIcon from "../../../assets/logo/x-ray-icon.svg";
// import ecgMachineIcon from "../../../assets/logo/ecg-machine-icon.svg";
// import urinalysisIcon from "../../../assets/logo/urinalysis-icon.svg";

const AppointmentDetailsModal = ({
  open,
  onClose,
  appointment,
  onStatusChange,
}) => {
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

  const steps = ["Waiting", "Ongoing", "Completed", "Findings and Summary"];
  const [activeStep, setActiveStep] = useState(0);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isLabServicesNeeded, setIsLabServicesNeeded] = useState(false);
  const [equipments, setEquipments] = useState({});
  const [appointmentSummary, setAppointmentSummary] = useState("");
  const [selectedLabServices, setSelectedLabServices] = useState([]);

  const openSnackbar = useSnackbar();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await Appointment.getEquipments();
        // Ensure appointments is always an array
        setEquipments(Array.isArray(res.data) ? res.data : []); // Use res.data based on your result structure
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };
    fetchEquipments();
  }, []);

  const handleLabServiceToggle = (serviceName) => {
    setSelectedLabServices((prevSelected) =>
      prevSelected.includes(serviceName)
        ? prevSelected.filter((service) => service !== serviceName)
        : [...prevSelected, serviceName]
    );
  };

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
        onStatusChange();
        openSnackbar(res.message, "success", 4000);
      }
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      openSnackbar("Error updating appointment.", "error", 4000);
    }
  };
  const handleFinishStep = async () => {
    const payload = {
      appointment_id: appointment.appointment_id,
      summary: appointmentSummary,
      equipments: selectedLabServices,
    };

    
    try {
      const res = await Appointment.updateSummary(payload);
      console.log(res);
      onClose(); // Example of closing the modal after finishing
      openSnackbar("Appointment process completed.", "success", 4000);
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      openSnackbar("Error updating appointment.", "error", 4000);
    }
  };
  const handleCancelAppointment = async () => {
    try {
      const res = await Appointment.updateAppointment({
        appointment_id: appointment.appointment_id,
        status: "Cancelled",
      });
      if (res.status) {
        onStatusChange();
        onClose();
        openSnackbar(`${res.message}`, "success", 4000);
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
    if (appointment.status === "Waiting") setActiveStep(0);
    else if (appointment.status === "Ongoing") setActiveStep(1);
    else if (appointment.status === "Completed") setActiveStep(2);
    else setActiveStep(3);
  }, [appointment.status]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Appointment Details
          </Typography>

          <Stepper activeStep={activeStep} sx={{ my: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 3 ? (
            <Box>
              <TextField
                label="Summary of the appointment"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={appointmentSummary}
                onChange={(e) => setAppointmentSummary(e.target.value)}
                margin="normal"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isLabServicesNeeded}
                    onChange={() =>
                      setIsLabServicesNeeded(!isLabServicesNeeded)
                    }
                    color="primary"
                  />
                }
                label="Is laboratory services needed?"
              />

              {isLabServicesNeeded && (
                <Box mt={2}>
                  <Typography variant="h6">Laboratory Services</Typography>
                  <List>
                    {equipments.map((equipment) => (
                      <ListItem key={equipment.name}>
                        <ListItemIcon>
                          <img
                            src={`../../../assets/${equipment.icon}`}
                            alt={`${equipment.name} icon`}
                            style={{ width: 24, height: 24 }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={equipment.name} />
                        <Checkbox
                          checked={selectedLabServices.includes(equipment.type)}
                          onChange={() =>
                            handleLabServiceToggle(equipment.type)
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          ) : (
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
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Yes"
                    />
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
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              gap: 2,
            }}
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
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={
                  activeStep === 3
                    ? handleFinishStep
                    : activeStep === 1 || activeStep === 0
                    ? handleNext
                    : setActiveStep((prev) =>
                        Math.min(prev + 1, steps.length - 1)
                      )
                }
              >
                {activeStep === 3 ? "Finish" : "Next"}
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
        <DialogTitle id="confirmation-dialog-title">
          Cancel Appointment
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            Are you sure you want to cancel this appointment? This action cannot
            be undone.
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
