import axios from "axios";
import {
  saveAppointment as saveAppointmentEndpoint,
  getAppointment as getAppointmentEndpoint,
  checkDoctorsAvailability,
} from "./endpoint";

const saveAppointment = async (payload) => {
  try {
    const response = await axios.post(saveAppointmentEndpoint, payload);
    return response.data;
  } catch (error) {
    console.error("getAppointment error", error);
    throw error;
  }
};

const checkDocAvailability = async (payload) => {
  try {
    const response = await axios.post(checkDoctorsAvailability, payload);
    return response.data;
  } catch (error) {
    console.error("checkDocAvailability error", error);
    throw error;
  }
};
const getAppointment = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`${getAppointmentEndpoint}?${query}`);
    return response.data;
  } catch (error) {
    console.error("getAppointment error", error);
    throw error;
  }
};

export default {
  saveAppointment,
  getAppointment,
  checkDocAvailability
};
