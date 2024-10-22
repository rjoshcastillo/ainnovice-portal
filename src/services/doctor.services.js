import { getDoctors as getDoctorsEndpoint } from "./endpoint";
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

export default {
  getDoctors,
};
