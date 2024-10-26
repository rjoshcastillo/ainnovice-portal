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
import Appointment from "../../services/appointment.services";
import Prediction from "../../services/prediction.services";
import { useSnackbar } from "../../context/SnackbarProvider";
import {
  getDayFromDate,
  timeToMinutes,
  toIsoDateString,
} from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const findAvailableSlot = (availableSlots, duration) => {
  for (let i = 0; i <= availableSlots.length; i++) {
    const startTime = availableSlots[i].start;
    const endTime = timeToMinutes(startTime) + Math.ceil(duration / 10) * 10;

    let hours = Math.floor(endTime / 60);
    let minutes = endTime % 60;

    let formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

    if (endTime) {
      const start = startTime;
      const end = formattedTime;
      return { start, end };
    }
  }

  return null;
};
const AppointmentForm = () => {
  const { user, updateAppLoadingState } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const openSnackbar = useSnackbar();
  const [formSteps, setFormSteps] = useState([
    { label: "Patient Details", canProceed: false },
    { label: "Describe Concern", canProceed: false },
    { label: "Select a Date", canProceed: false },
    { label: "Choose your Doctor", canProceed: false },
  ]);

  const navigate = useNavigate();

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
  // const checkDocAvailability = async (data) => {
  //   try {
  //     const payload = {
  //       doctor_id: data?.doctor_id,
  //       appointment_date: toIsoDateString(data?.appointment_date),
  //       preferredTime: data?.amPm,
  //     };
  //     return await Appointment.checkDocAvailability(payload);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Failed to check doctor availability");
  //   }
  // };

  const getAppntDurationEstimate = async (data) => {
    const payload = {
      age: user?.age,
      gender: user?.gender,
      reason_for_visit: data?.medicalConcern,
      day_of_week: getDayFromDate(data?.appointment_date),
    };
    try {
      return await Prediction.appointmentDurationEstimate(payload);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to estimate appointment duration");
    }
  };

  const getAppntUrgency = async (data) => {
    const payload = {
      age: user?.age,
      gender: user?.gender,
      employed: user?.employed,
      alcohol_consumption: data?.alcoholConsumption,
      smoking: data?.smoking,
      height: data?.height,
      weight: data?.weight,
      breathing_trouble: data?.breathingTrouble,
      pain_level: String(data?.painLevel),
      pain_part: data?.painPart,
      medical_concern: data?.medicalConcern,
      symptoms: data?.symptoms,
      temperature: data?.temperature,
    };
    try {
      return await Prediction.urgencyPrediction(payload);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to predict appointment urgency");
    }
  };

  const saveAppointment = async (payload) => {
    try {
      return await Appointment.saveAppointment(payload);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to save appointment");
    }
  };

  const processSavingAppointment = async (data) => {
    updateAppLoadingState(true);
    try {
      const [est, urgency] = await Promise.all([
        getAppntDurationEstimate(data),
        getAppntUrgency(data),
      ]);

      setFormData((prevFormData) => {
        const newFormData = {
          ...prevFormData,
          urgency: urgency.data,
          estimate: est.data,
          status: "Waiting",
        };

        saveAppointment(newFormData)
          .then((sa) => {
            openSnackbar(
              "You're officially on the schedule. See you then!",
              "success",
              4000
            );

            navigate("/");
          })
          .catch((error) => {
            openSnackbar(
              "Oh no! An error occurred while booking your appointment.",
              "error",
              4000
            );
          })
          .finally(() => {
            updateAppLoadingState(false);
          });

        return prevFormData;
      });
    } catch (error) {
      openSnackbar(
        "Oh no! An error occurred while booking your appointment.",
        "error",
        4000
      );
    }
  };

  const handleNext = () => {
    if (activeStep === formSteps.length - 1) {
      processSavingAppointment(formData);
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
