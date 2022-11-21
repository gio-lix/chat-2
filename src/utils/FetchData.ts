import axios from "axios";

export const postApi = async (url: string, post: object, token?: string) => {
    const {data} = await axios.post(`/api/${url}`, post,{
        headers: {Authorization: token}
    })
    return data
}
export const getApi = async (url: string, token?: string) => {
    const {data} = await axios.get(`/api/${url}`,{
        headers: {Authorization: token},
    })
    return data
}

export const putApi = async (url: string,post: object, token?: string) => {
    const {data} = await axios.put(`/api/${url}`, post, {
        headers: {Authorization: token},
    })
    return data
}
export const deleteApi = async (url: string, token?: string) => {
    const {data} = await axios.delete(`/api/${url}`, {
        headers: {Authorization: token},
    })
    return data
}
