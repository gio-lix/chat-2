import {Dispatch} from "redux";
import {CommentType} from "../../utils/TypeScipt";
import {ALERT, AlertAction} from "../types/alertType";
import {
    CommentAction,
    DELETE_COMMENT,
    DELETE_REPLY,
    GET_COMMENT,
    UPDATE_COMMENT,
    UPDATE_REPLY
} from "../types/commentType";
import {
    deleteApi,
    getApi,
    postApi,
    putApi
} from "../../utils/FetchData";


export const createCommentAction = (data: CommentType) =>
    async (dispatch: Dispatch<AlertAction | CommentAction>) => {
        try {
            dispatch({type: ALERT, payload: {spinner: true}})

            await postApi("comment", data)

            dispatch({type: ALERT, payload: {spinner: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: err.message.data.msg})
        }
    }

export const getCommentsAction = (id: string, num: number) =>
    async (dispatch: Dispatch<AlertAction | CommentAction>) => {
        try {
            let limit = 4
            const res = await getApi(`comments/blog/${id}?page=${num}&limit=${limit}`)
            dispatch({
                type: GET_COMMENT, payload: {
                    data: res.comments,
                    total: res.total
                }
            })
        } catch (err: any) {
            dispatch({type: ALERT, payload: err.message.data.msg})
        }
    }

export const replyCommentsAction = (data: CommentType) =>
    async (dispatch: Dispatch<AlertAction | CommentAction>) => {
        try {
            await postApi("reply_comment", data)
        } catch (err: any) {
            dispatch({type: ALERT, payload: err.message.data.msg})
        }
    }

export const updateCommentAction = (data: CommentType) =>
    async (dispatch: Dispatch<AlertAction | CommentAction>) => {
        try {
            dispatch({
                type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
                payload: data
            })

            await putApi(`comment/${data._id}`, {data})

        } catch (err: any) {
            dispatch({type: ALERT, payload: err.message.data.msg})
        }
    }

export const deleteCommentAction = (data: CommentType) =>
    async (dispatch: Dispatch<AlertAction | CommentAction>) => {
        try {
            dispatch({
                type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
                payload: data
            })
            await deleteApi(`comment/${data._id}`)
        } catch (err: any) {
            dispatch({type: ALERT, payload: err.message?.data.msg})
        }
    }