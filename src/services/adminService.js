import axiosClient from "api/axiosClient"

//User
const getAllUsers = (id) => {
    return axiosClient.get(`/api/get-all-users?id=${id}`)
};
const createNewUserService = (data) => {
    return axiosClient.post('/api/create-users', data)
};
const deleteUserService = (id) => {
    return axiosClient.delete('/api/delete-users', {
        data: {
            id: id
        }
    });
};
const editUserService = (data) => {
    return axiosClient.put('/api/edit-users', data)
}

//Specialty
const createNewSpecialty = (data) => {
    return axiosClient.post(`/api/create-new-specialty`, data)
}
const deleteSpecialtyService = (id) => {
    return axiosClient.delete('/api/delete-specialty', {
        data: {
            id: id
        }
    });
}
const editSpecialtyService = (data) => {
    return axiosClient.put('/api/edit-specialty', data)
}


//News
const createNews = (data) => {
    return axiosClient.post(`/api/create-news`, data)
}
const deleteNewsService = (id) => {
    return axiosClient.delete('/api/delete-news', {
        data: {
            id: id
        }
    });
}
const editNewsService = (data) => {
    return axiosClient.put('/api/edit-news', data)
}


//Doctor
const getAllDoctors = () => {
    return axiosClient.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axiosClient.post('/api/save-infor-doctors', data)
}

//Schedule
const saveBulkSchedudeDoctors = (data) => {
    return axiosClient.post(`/api/bulk-create-schedule`, data)
}

export {
    getAllUsers,
    createNewUserService,
    createNewSpecialty,
    createNews,
    getAllDoctors,
    saveDetailDoctorService,
    saveBulkSchedudeDoctors,
    deleteUserService,
    deleteSpecialtyService,
    deleteNewsService,
    editUserService,
    editNewsService,
    editSpecialtyService,
}