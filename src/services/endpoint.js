export const baseApi = 'https://f14d-14-1-65-33.ngrok-free.app/api'

export const Account = `${baseApi}/account`;
export const Login = `${Account}/login`
export const doctor = `${baseApi}/doctor`;


export const appointment = `${baseApi}/appointment`;
export const updateAppointment = `${appointment}/update`;
export const updateSummary = `${appointment}/update-appointment-summary`;
export const laboratoryRequest = `${appointment}/lab-request`
export const getEquipments = `${appointment}/get-equipments`;
export const checkDoctorsAvailability = `${appointment}/available-doctor`
// export const saveAppointment = `${appointment}/appointment-settler`;
export const getAppointment = `${appointment}/appointment-patient`;
export const saveAppointment = `${appointment}/save-appointment`;

export const getDoctors = `${doctor}`;
export const getDoctorsAvailableDates = `${doctor}/available-dates`

export const prediction = `${baseApi}/ml`;
export const durationEstimate = `${prediction}/time-estimate`
export const urgency = `${prediction}/urgency`

export const assistant = `${baseApi}/assistant`;
export const generalMedicalNeed = `${assistant}/generalMedicalNeed`