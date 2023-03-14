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

//Patient
const getAllPatientDoctor = (data) => {
    return axiosClient.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`, data)
}
const getAllPatientStaff = (data) => {
    return axiosClient.get(`/api/get-list-patient-for-staff?doctorId=${data.doctorId}&date=${data.date}`, data)
}

//Schedule
const saveBulkSchedudeDoctors = (data) => {
    return axiosClient.post(`/api/bulk-create-schedule`, data)
}

//Staff
const postWarningBooking = (data) => {
    return axiosClient.post(`/api/warning-booking`, data)
}
const deleteOneBooking = (id) => {
    return axiosClient.delete(`/api/delete-one-booking`, {
        data: {
            id: id
        }
    })
}

const deleteMultipleBooking = (list) => {
    return axiosClient.delete(`/api/delete-multiple-booking`, { data: { contentIds: list } })
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
    getAllPatientDoctor,
    postWarningBooking,
    getAllPatientStaff,
    deleteOneBooking,
    deleteMultipleBooking,
}