import axiosClient from "../axios";

export const postApi = async (url: string, post: object) => {
    const {data} = await axiosClient.post(`/${url}`, post)
    return data
}
export const getApi = async (url: string) => {
    const {data} = await axiosClient.get(`/${url}`)
    return data
}

export const putApi = async (url: string,post: object) => {
    const {data} = await axiosClient.put(`/${url}`, post)
    return data
}
export const deleteApi = async (url: string) => {
    const {data} = await axiosClient.delete(`/${url}`)
    return data
}
