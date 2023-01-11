import axiosClient from "api/axiosClient";

//Specialty
const getAllSpecialty = () => {
    return axiosClient.get('/api/get-specialty');
}
const getAllSpecialtyById = (data) => {
    return axiosClient.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}


//Doctor
const getTopDoctorHomeService = (limit) => {
    return axiosClient.get(`/api/top-doctor-home?limit=${limit}`)
}


//News
const getAllNews = () => {
    return axiosClient.get('/api/get-news');
}


export {
    getAllSpecialty,
    getTopDoctorHomeService,
    getAllNews,
    getAllSpecialtyById
}