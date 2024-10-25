import { generalMedicalNeed } from "./endpoint";
import axios from "axios";

const getGeneralMedicalNeed = async (payload) => {
  return axios
    .post(generalMedicalNeed, payload)
    .then((response) => response.data)
    .catch((error) => {
      console.error("assistant error", error);
      throw error;
    });
};

export default {
  getGeneralMedicalNeed,
};
