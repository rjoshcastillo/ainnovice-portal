import axios from "axios";
import { saveAppointment as saveAppointmentEndpoint, getAppointment as getAppointmentEndpoint } from "./endpoint";


const saveAppointment = async (payload) => {
  try {
    const response = await axios.post(saveAppointmentEndpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Save appointment error", error);
    throw error;
  }
};

const getAppointment = async (id) => {
  try {
    const response = await axios.get(`${getAppointmentEndpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Save appointment error", error);
    throw error;
  }
};

export default {
  saveAppointment,
  getAppointment
};
