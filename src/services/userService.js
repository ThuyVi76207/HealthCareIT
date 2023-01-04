import axiosClient from "api/axiosClient";

const getAllSpecialty = () => {
    return axiosClient.get('/api/get-specialty');
}

export {
    getAllSpecialty,
}