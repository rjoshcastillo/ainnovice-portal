import axios from "axios";
import { saveAppointment as saveAppointmentEndpoint } from "./endpoint";

const saveAppointment = async (payload) => {
  try {
    const response = await axios.post(saveAppointmentEndpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Save appointment error", error);
    throw error;
  }
};

export default {
  saveAppointment,
};
