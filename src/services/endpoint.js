// export const baseApi = 'http://localhost:5000/api'
export const baseApi = `https://1e56-14-1-92-103.ngrok-free.app/api`
export const Account = `${baseApi}/account`;
export const Login = `${Account}/login`
export const doctor = `${baseApi}/doctor`;

export const appointment = `${baseApi}/appointment`;
export const saveAppointment = `${appointment}/save`;
export const getDoctors = `${doctor}`;