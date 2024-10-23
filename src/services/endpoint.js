// export const baseApi = 'http://localhost:5000/api'
export const baseApi = `https://9d50-65-181-9-245.ngrok-free.app/api`
export const Account = `${baseApi}/account`;
export const Login = `${Account}/login`
export const doctor = `${baseApi}/doctor`;

export const appointment = `${baseApi}/appointment`;
export const saveAppointment = `${appointment}/save`;
export const getAppointment = `${appointment}/get`
export const getDoctors = `${doctor}`;