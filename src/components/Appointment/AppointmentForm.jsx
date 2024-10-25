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
  const [formSteps, setFormSteps] = useState([
    { label: "Patient Details", canProceed: false },
    { label: "Describe Concern", canProceed: false },
    { label: "Select a Date", canProceed: false },
    { label: "Choose your Doctor", canProceed: false },
  ]);

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const getPatientDetails = (patientDetails) => updateFormData(patientDetails);
  const getPatientConcerns = (patientConcerns) =>
    updateFormData(patientConcerns);
  const getPatientScheduleDate = (scheduleDate) => updateFormData(scheduleDate);
  const getSpecialistDetails = (specialistDetails) =>
    updateFormData(specialistDetails);

  const updateStepCanProceed = (index, canProceedValue) => {
    setFormSteps((prevSteps) =>
      prevSteps.map((step, i) =>
        i === index ? { ...step, canProceed: canProceedValue } : step
      )
    );
  };
  const handleNext = () => {

    if (activeStep === formSteps.length - 1) {
      console.log(formData);
      
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                  canProceed={(canProceedValue) =>
                    updateStepCanProceed(0, canProceedValue)
                  }
                />
              ) : index === 1 ? (
                <PatientConcerns
                  data={formData}
                  callBack={getPatientConcerns}
                  canProceed={(canProceedValue) =>
                    updateStepCanProceed(1, canProceedValue)
                  }
                />
              ) : index === 2 ? (
                <ScheduleSelector
                  data={formData}
                  callBack={getPatientScheduleDate}
                  canProceed={(canProceedValue) =>
                    updateStepCanProceed(2, canProceedValue)
                  }
                />
              ) : index === 3 ? (
                <SpecialistDetails
                  data={formData}
                  callBack={getSpecialistDetails}
                  canProceed={(canProceedValue) =>
                    updateStepCanProceed(3, canProceedValue)
                  }
                />
              ) : (
                <></>
              )}
              <Box sx={{ mb: 2 }}>
                <Button
                  disabled={!step.canProceed}
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
