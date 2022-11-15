import {BlogType} from "../../utils/TypeScipt";

export const GET_BLOGS = "GET_BLOGS"
export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID"
export const GET_BLOGS_BY_USER_ID = "GET_BLOGS_BY_USER_ID"

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



export interface IBlogsCategory {
    id: string
    search: string
    total: number
    blogs: BlogType[]
}

export interface BlogCategoryAction {
    type: typeof GET_BLOGS_CATEGORY_ID,
    payload: IBlogsCategory
}




export interface BlogsByUserIdAction {
    type: typeof GET_BLOGS_BY_USER_ID,
    payload: IBlogsCategory
}
