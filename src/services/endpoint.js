export const baseApi = 'https://de6b-116-91-209-100.ngrok-free.app/api'

export const Account = `${baseApi}/account`;
export const Login = `${Account}/login`
export const doctor = `${baseApi}/doctor`;


export const appointment = `${baseApi}/appointment`;
export const updateAppointment = `${appointment}/update`
export const checkDoctorsAvailability = `${appointment}/available-doctor`
export const saveAppointment = `${appointment}/appointment-settler`;
export const getAppointment = `${appointment}/appointment-patient`;

export const getDoctors = `${doctor}`;

export const prediction = `${baseApi}/ml`;
export const durationEstimate = `${prediction}/time-estimate`
export const urgency = `${prediction}/urgency`

export const assistant = `${baseApi}/assistant`;
export const generalMedicalNeed = `${assistant}/generalMedicalNeed`