import axiosClient from "api/axiosClient";

//Register
const postRegister = (data) => {
    return axiosClient.post('/api/auth/register', data);
}

//Specialty
const getAllSpecialty = () => {
    return axiosClient.get('/api/get-specialty');
}
const getAllSpecialtyById = (data) => {
    return axiosClient.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}
const getSettingService = (type) => {
    return axiosClient.get(`/api/settings?type=${type}`)
}


//Doctor
const getTopDoctorHomeService = (limit) => {
    return axiosClient.get(`/api/top-doctor-home?limit=${limit}`)
}
const getProfileDoctorById = (doctorId) => {
    return axiosClient.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axiosClient.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getDetailInforDoctor = (inputId) => {
    return axiosClient.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

//News
const getAllNews = () => {
    return axiosClient.get('/api/get-news');
}
const getAllNewsById = (data) => {
    return axiosClient.get(`/api/get-detail-news-by-id?id=${data.id}`)
}

//Booking
const postPatientBooking = (data) => {
    return axiosClient.post('/api/patient-booking-appointment', data)
}
const postVerifyBooking = (data) => {
    return axiosClient.post('/api/verify-booking-appointment', data)
}

//SMS
const postSendSMS = (data) => {
    return axiosClient.post(`/api/sendSMS`, data)
}

//Payment
const postPaymentPaypal = () => {
    return axiosClient.post(`/api/pay-paypal`)
}



export {
    getAllSpecialty,
    getTopDoctorHomeService,
    getAllNews,
    getAllSpecialtyById,
    getSettingService,
    getProfileDoctorById,
    getScheduleDoctorByDate,
    getDetailInforDoctor,
    getAllNewsById,
    postPatientBooking,
    postSendSMS,
    postVerifyBooking,
    postPaymentPaypal,
    postRegister,
}