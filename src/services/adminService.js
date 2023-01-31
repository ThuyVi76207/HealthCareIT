import axiosClient from "api/axiosClient"

const getAllUsers = (id) => {
    return axiosClient.get(`/api/get-all-users?id=${id}`)
}

export {
    getAllUsers,
}