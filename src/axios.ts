import axios from "axios"

export const  API_URL = "https://aaaapppp12.onrender.com/api"
const axiosClient = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


console.log(localStorage.getItem("accessToken"))

axiosClient.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config
})



export default axiosClient