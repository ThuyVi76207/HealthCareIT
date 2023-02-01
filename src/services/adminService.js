import axiosClient from "api/axiosClient"

//User
const getAllUsers = (id) => {
    return axiosClient.get(`/api/get-all-users?id=${id}`)
}
const createNewUserService = (data) => {
    return axiosClient.post('/api/create-users', data)
}

export {
    getAllUsers,
    createNewUserService,
}