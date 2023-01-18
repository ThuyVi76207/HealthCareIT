import axiosClient from "api/axiosClient";

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


//News
const getAllNews = () => {
    return axiosClient.get('/api/get-news');
}


export {
    getAllSpecialty,
    getTopDoctorHomeService,
    getAllNews,
    getAllSpecialtyById,
    getSettingService,
    getProfileDoctorById,
    getScheduleDoctorByDate
}