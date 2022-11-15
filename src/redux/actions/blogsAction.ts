import {Dispatch} from "redux";
import {BlogType} from "../../utils/TypeScipt";
import {ALERT, AlertAction} from "../types/alertType";
import {
    BlogAction,
    BlogCategoryAction,
    BlogsByUserIdAction,
    GET_BLOGS,
    GET_BLOGS_BY_USER_ID,
    GET_BLOGS_CATEGORY_ID
} from "../types/blogTypes";
import {imageUpload} from "../../utils/ImageUpload";
import {getApi, postApi} from "../../utils/FetchData";

export const createBlogAction = (blog: BlogType, token: string) =>
    async (dispatch: Dispatch<AlertAction>) => {
        let url = ""
        try {
            dispatch({type: ALERT, payload: {loading: true}})

            if (typeof (blog.thumbnail) !== "string") {
                const photo = await imageUpload(blog.thumbnail)
                url = photo.url
            } else {
                url = blog.thumbnail
            }
            const newBlog = {...blog, thumbnail: url}

            await postApi("blog", newBlog, token)
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }


export const getBlogsAction = () =>
    async (dispatch: Dispatch<AlertAction | BlogAction>) => {

        try {
            dispatch({type: ALERT, payload: {loading: true}})
            const res = await getApi("home/blogs")
            dispatch({
                type: GET_BLOGS,
                payload: res
            })
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {

        }
    }
export const getBlogsByCategory = (id: string, search: string) =>
    async (dispatch: Dispatch<AlertAction | BlogCategoryAction>) => {
        try {
            let limit = 8
            let page = search ? search : `?page=${1}`
            dispatch({type: ALERT, payload: {spinner: true}})

            const res = await getApi(`blogs/${id}${page}&limit=${limit}`)
            dispatch({type: GET_BLOGS_CATEGORY_ID, payload: {...res, id, search}})
            dispatch({type: ALERT, payload: {spinner: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }
export const getBlogsByUserId = (id: string, search: string = `?page=${1}`) =>
    async (dispatch: Dispatch<AlertAction | BlogsByUserIdAction>) => {
        try {
            let limit = 5
            let page = search ? search : `?page=${1}`
            dispatch({type: ALERT, payload: {spinner: true}})
            const res = await getApi(`blogs/user/${id}${page}&limit=${limit}`)
            dispatch({type: GET_BLOGS_BY_USER_ID, payload: {...res, id, search}})
            dispatch({type: ALERT, payload: {spinner: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }
