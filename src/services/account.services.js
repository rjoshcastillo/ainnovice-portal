import { Login as LoginApi } from "./endpoint";
import axios from "axios";

export function Login(payload) {
  return axios
    .post(LoginApi, payload)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Login error", error);
      throw error;
    });
}
