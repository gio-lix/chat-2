import {Dispatch} from "redux";
import {BlogType} from "../../utils/TypeScipt";
import {ALERT, AlertAction} from "../types/alertType";
import {imageUpload} from "../../utils/ImageUpload";

export const createBlobAction = (blog :BlogType, token :string) =>
    async (dispatch: Dispatch<AlertAction>) => {
        let url = ""
        try {
            dispatch({type: ALERT, payload: {loading: true}})

            if (typeof(blog.thumbnail) !== "string") {
                const photo = await imageUpload(blog.thumbnail)
                url = photo.url
            } else {
                url = blog.thumbnail
            }
            const newBlog = {...blog, thumbnail: url}
            console.log({newBlog, token})
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }