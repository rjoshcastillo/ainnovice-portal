import {
  getDoctors as getDoctorsEndpoint,
  getDoctorsAvailableDates,
} from "./endpoint";
import axios from "axios";

const getDoctors = async () => {
  try {
    const response = await axios.get(getDoctorsEndpoint);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const getDoctorsAvailability = async (id) => {
  try {
    const response = await axios.get(
      `${getDoctorsAvailableDates}?doctor_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

export default {
  getDoctors,
  getDoctorsAvailability
};
