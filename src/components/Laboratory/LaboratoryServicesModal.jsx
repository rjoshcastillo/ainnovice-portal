
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import LaboratoryForm from "./LaboratoryForm";
import { useUser } from "../../context/UserContext";
import { useSnackbar } from "../../context/SnackbarProvider";
import Appointment from "../../services/appointment.services";


const LaboratoryServicesModal = ({ open, service, onClose }) => {
  const { user } = useUser();
  const openSnackbar = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const handleDateChange = (date) => {
    setAppointmentDate(date); // Update appointmentDate when a date is selected in LaboratoryForm
  };

  if (!service) return null;

  const steps = ["Personal Details", "Select Date"];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleCancel = () => setOpenCancelConfirm(true);
  const handleConfirmCancel = () => {
    setOpenCancelConfirm(false);
    onClose();
  };

  console.log(service)
  
  console.log(appointmentDate)
  const laboratoryRequest = async () => {
    try {
      
      const payload = {
        patient_id: user.id,
        equipment_id: service.equipment_id,
        appointment_date: appointmentDate
      };
      console.log(payload)
      const res = await Appointment.laboratoryRequest(payload);
      console.log(res);
      openSnackbar(
        "You're officially on the schedule. See you then!",
        "success",
        4000
      );
      onClose();
    } catch (error) {
      console.log(error);
      openSnackbar(`Failed: ${error}`, "error", 4000);
    }
  };
  const handleFinish = async () => {
    // Execute the request through the onRequest prop
    laboratoryRequest()
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="service-dialog-title" PaperProps={{
        style: {
          width: '500px',
          height: '600px',
        },
      }}>
      <DialogTitle id="service-dialog-title">{service.name}</DialogTitle>
      <DialogContent>
        <LaboratoryForm
          user={user}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleCancel={handleCancel}
          handleFinish={handleFinish}
          onDateChange={handleDateChange}
        />
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleFinish}>Finish</Button>
        )}
      </DialogActions>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={openCancelConfirm} onClose={() => setOpenCancelConfirm(false)}>
        <DialogTitle>Cancel Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel the transaction?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelConfirm(false)}>No</Button>
          <Button onClick={handleConfirmCancel} color="secondary">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default LaboratoryServicesModal;
