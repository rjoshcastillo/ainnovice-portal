// export const baseApi = 'http://localhost:5000/api'
export const baseApi = `https://0900-14-1-92-87.ngrok-free.app/api`
export const Account = `${baseApi}/account`;
export const Login = `${Account}/login`
export const doctor = `${baseApi}/doctor`;
export const assistant = `${baseApi}/assistant`;

export const appointment = `${baseApi}/appointment`;
export const saveAppointment = `${appointment}/appointment-settler`;
export const getAppointment = `${appointment}/get`
export const getDoctors = `${doctor}`;
export const generalMedicalNeed = `${assistant}/generalMedicalNeed`