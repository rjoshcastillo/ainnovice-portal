import { durationEstimate, urgency } from "./endpoint";
import axios from "axios";

const appointmentDurationEstimate = async (payload) => {
  try {
    const response = await axios.post(durationEstimate, payload);
    return response.data;
  } catch (error) {
    console.error("appointmentDurationEstimate error", error);
    throw error;
  }
};

const urgencyPrediction = async (payload) => {
  try {
    const response = await axios.post(urgency, payload);
    return response.data;
  } catch (error) {
    console.error("urgencyPrediction error", error);
    throw error;
  }
};

export default {
  appointmentDurationEstimate,
  urgencyPrediction,
};
