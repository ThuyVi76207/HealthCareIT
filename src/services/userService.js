import axiosClient from "api/axiosClient";

//Specialty
const getAllSpecialty = () => {
    return axiosClient.get('/api/get-specialty');
}


//Doctor
const getTopDoctorHomeService = (limit) => {
    return axiosClient.get(`/api/top-doctor-home?limit=${limit}`)
}


export {
    getAllSpecialty,
    getTopDoctorHomeService,
}