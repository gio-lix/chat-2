import {BlogType} from "../../utils/TypeScipt";

export const GET_BLOGS = "GET_BLOGS"
export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID"
export const GET_BLOGS_BY_USER_ID = "GET_BLOGS_BY_USER_ID"
export const DELETE_BLOG_BY_USER_ID = "DELETE_BLOG_BY_USER_ID"
export const CREATE_BLOGS_USER_ID = "CREATE_BLOGS_USER_ID"


export interface BlogState {
    _id: string
    name: string
    count: number
    blogs: BlogType[]
}

export interface BlogsCategoryState {
    id: string
    search: string
    total: number
    blogs: BlogType[]
}

export interface BlogsUserState {
    id: string
    blogs: BlogType[]
    total: number
    search: string
}


export interface IGetBlogs {
    type: typeof GET_BLOGS,
    payload: BlogState[]
}


export interface IBlogsByUserId {
    type: typeof GET_BLOGS_BY_USER_ID,
    payload: BlogsCategoryState
}

export interface ICreateBlogsUser {
    type: typeof CREATE_BLOGS_USER_ID,
    payload: BlogType
}

export interface IBlogCategory {
    type: typeof GET_BLOGS_CATEGORY_ID,
    payload: BlogsCategoryState
}


export interface IBlogDelete {
    type: typeof DELETE_BLOG_BY_USER_ID,
    payload: BlogType
}

export type BlogAction =
    | IGetBlogs
    | IBlogsByUserId
    | IBlogDelete
    | IBlogCategory
    | ICreateBlogsUser
