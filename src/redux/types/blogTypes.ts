import {BlogType} from "../../utils/TypeScipt";

export const GET_BLOGS = "GET_BLOGS"

export interface IBlogs {
    _id: string
    name: string
    count: number
    blogs: BlogType[]
}

export interface BlogAction {
    type: typeof GET_BLOGS,
    payload: IBlogs[]
}
