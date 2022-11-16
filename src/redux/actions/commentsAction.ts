import {CommentType} from "../../utils/TypeScipt";
import {Dispatch} from "redux";
import {ALERT, AlertAction} from "../types/alertType";
import {CommentAction, CREATE_COMMENT, GET_COMMENT} from "../types/commentType";
import {getApi, postApi} from "../../utils/FetchData";


export const createCommentAction = (data: CommentType, token: string) =>
    async (dispatch: Dispatch<AlertAction | CommentAction>) => {
        try {
            dispatch({type: ALERT, payload: {spinner: true}})
            const res = await postApi("comment", data, token)
            dispatch({type: CREATE_COMMENT, payload: {...res, user: data.user}})
            dispatch({type: ALERT, payload: {spinner: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: err.message.data.msg})
        }
    }

export const getCommentsAction = (id: string) =>
    async (dispatch: Dispatch<AlertAction | CommentAction>) => {
        try {
            let limit = 8
            const res = await getApi(`comments/blog/${id}?limit=${limit}`)
            dispatch({type: GET_COMMENT, payload: {
                        data: res.comments,
                        total: res.total
                }})
        } catch (err: any) {
            dispatch({type: ALERT, payload: err.message.data.msg})
        }
    }