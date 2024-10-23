import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
} from "@mui/material";
import PatientDetails from "./molecules/PatientDetails";
import { useUser } from "../../context/UserContext";
import PatientConcerns from "./molecules/PatientConcerns";
import ScheduleSelector from "./molecules/ScheduleSelector";
import SpecialistDetails from "./molecules/SpecialistDetails";

const AppointmentForm = () => {
  const { user } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const formSteps = [
    { label: "Patient Details" },
    { label: "Describe Concern" },
    { label: "Select a Date" },
    { label: "Choose your Doctor" },
  ];

  const getPatientDetails = (patientDetails) => {
    setFormData({
      ...formData,
      ...patientDetails,
    });
  };

  const getPatientConcerns = (patientConcerns) => {
    setFormData({
      ...formData,
      ...patientConcerns,
    });
  };

  const getPatientScheduleDate = (scheduleDate) => {
    setFormData({
      ...formData,
      ...scheduleDate,
    });
  };
  const getSpecialistDetails = (specialistDetails) => {
    setFormData({
      ...formData,
      ...specialistDetails,
    });
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === formSteps.length - 1) {
      console.log(formData);
    } 
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", my: 4 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {formSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === formSteps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {index === 0 ? (
                <PatientDetails
                  user={user}
                  data={formData}
                  callBack={getPatientDetails}
                />
              ) : index === 1 ? (
                <PatientConcerns
                  data={formData}
                  callBack={getPatientConcerns}
                />
              ) : index === 2 ? (
                <ScheduleSelector
                  data={formData}
                  callBack={getPatientScheduleDate}
                />
              ) : index === 3 ? (
                <SpecialistDetails data={formData} callBack={getSpecialistDetails}/>
              ) : (
                <></>
              )}
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === formSteps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default AppointmentForm;
