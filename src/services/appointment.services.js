import axios from "axios";
import {
  saveAppointment as saveAppointmentEndpoint,
  getAppointment as getAppointmentEndpoint,
  checkDoctorsAvailability,
  updateAppointment as updateAppointmentEndpoint,
  updateSummary as updateSummaryEndpoint,
  getEquipments as getEquipmentsEndpoint,
  laboratoryRequest as laboratoryRequestEndPoint,
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

const updateAppointment = async (payload) => {
  try {
    const response = await axios.post(`${updateAppointmentEndpoint}`, payload);
    return response.data;
  } catch (error) {
    console.error("updateAppointment error", error);
    throw error;
  }
};

const updateSummary = async (payload) => {
  try {
    const response = await axios.post(`${updateSummaryEndpoint}`, payload);
    return response.data;
  } catch (error) {
    console.error("updateSummary error", error);
    throw error;
  }
};
const getEquipments = async () => {
  try {
    const response = await axios.get(`${getEquipmentsEndpoint}`);
    return response.data;
  } catch (error) {
    console.error("updateSummary error", error);
    throw error;
  }
};

const laboratoryRequest = async (payload) => {
  try {
    const response = await axios.post(`${laboratoryRequestEndPoint}`, payload);
    return response.data;
  } catch (error) {
    console.error("laboratoryRequest error", error);
    throw error;
  }
};
export default {
  saveAppointment,
  getAppointment,
  checkDocAvailability,
  updateAppointment,
  updateSummary,
  getEquipments,
  laboratoryRequest,
};
