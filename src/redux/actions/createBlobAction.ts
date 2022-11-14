import {Dispatch} from "redux";
import {BlogType} from "../../utils/TypeScipt";
import {ALERT, AlertAction} from "../types/alertType";
import {BlogAction, GET_BLOGS} from "../types/blogTypes";
import {imageUpload} from "../../utils/ImageUpload";
import {getApi, postApi} from "../../utils/FetchData";

export const createBlobAction = (blog: BlogType, token: string) =>
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

            const res = await postApi("blog", newBlog, token)
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
            console.log("res - ", res)
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {

        }
    }