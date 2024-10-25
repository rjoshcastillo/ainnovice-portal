// export const baseApi = 'http://localhost:5000/api'
export const baseApi = `https://01b3-14-1-92-87.ngrok-free.app/api`

export const Account = `${baseApi}/account`;
export const Login = `${Account}/login`
export const doctor = `${baseApi}/doctor`;


export const appointment = `${baseApi}/appointment`;
export const checkDoctorsAvailability = `${appointment}/available-doctor`
export const saveAppointment = `${appointment}/appointment-settler`;
export const getAppointment = `${appointment}/get`

export const getDoctors = `${doctor}`;

export const prediction = `${baseApi}/ml`;
export const durationEstimate = `${prediction}/time-estimate`
export const urgency = `${prediction}/urgency`

export const assistant = `${baseApi}/assistant`;
export const generalMedicalNeed = `${assistant}/generalMedicalNeed`