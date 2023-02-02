import axiosClient from "api/axiosClient"

//User
const getAllUsers = (id) => {
    return axiosClient.get(`/api/get-all-users?id=${id}`)
}
const createNewUserService = (data) => {
    return axiosClient.post('/api/create-users', data)
}

//Specialty
const createNewSpecialty = (data) => {
    return axiosClient.post(`/api/create-new-specialty`, data)
}

export {
    getAllUsers,
    createNewUserService,
    createNewSpecialty,
}