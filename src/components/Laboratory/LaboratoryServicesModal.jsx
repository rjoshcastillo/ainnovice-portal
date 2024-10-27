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

const LaboratoryServicesModal = ({ open, service, onClose }) => {
  const { user } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  if (!service) return null;

  const steps = ["Personal Details", "Select Date"];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleCancel = () => setOpenCancelConfirm(true);
  const handleConfirmCancel = () => {
    setOpenCancelConfirm(false);
    onClose();
  };
  const handleFinish = () => {
    // Add finish logic if needed
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="service-dialog-title" PaperProps={{
        style: {
          width: '500px', // Set the desired width
          height: '600px', // Set the desired height
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
