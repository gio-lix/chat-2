import {Dispatch} from "redux";
import {BlogType} from "../../utils/TypeScipt";
import {ALERT, AlertAction} from "../types/alertType";
import {
    BlogAction,
    CREATE_BLOGS_USER_ID,
    DELETE_BLOG_BY_USER_ID,
    GET_BLOGS,
    GET_BLOGS_BY_USER_ID,
    GET_BLOGS_CATEGORY_ID
} from "../types/blogTypes";
import {imageUpload} from "../../utils/ImageUpload";
import {deleteApi, getApi, postApi, putApi} from "../../utils/FetchData";


export const createBlogAction = (blog: BlogType, token: string) =>
    async (dispatch: Dispatch<AlertAction | BlogAction>) => {
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

            const res = await postApi("blog", newBlog, token)


            dispatch({
                type: CREATE_BLOGS_USER_ID,
                payload: res
            })


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
    async (dispatch: Dispatch<AlertAction | BlogAction>) => {
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
    async (dispatch: Dispatch<AlertAction | BlogAction>) => {
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


export const updateBlogAction = (blog: BlogType, token: string) =>
    async (dispatch: Dispatch<AlertAction | BlogAction>) => {
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


            const res = await putApi(`blog/${newBlog._id}`, newBlog, token)

            dispatch({type: ALERT, payload: {success: res.msg}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }

export const deleteBlogAction = (blog: BlogType, token: string) =>
    async (dispatch: Dispatch<AlertAction | BlogAction>) => {
        try {
            dispatch({type: DELETE_BLOG_BY_USER_ID, payload: blog})
            await deleteApi(`blog/${blog._id}`, token)

        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }
