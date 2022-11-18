import {CommentType} from "../../utils/TypeScipt";

export const CREATE_COMMENT = "CREATE_COMMENT"
export const GET_COMMENT = "GET_COMMENT"
export const REPLY_COMMENT = "REPLY_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const UPDATE_REPLY = "UPDATE_REPLY"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const DELETE_REPLY = "DELETE_REPLY"


export interface CommentPayloadState {
    data: CommentType[]
    total: number
}

export interface IGetComments {
    type: typeof GET_COMMENT
    payload: CommentPayloadState
}


export interface ICommentCreate {
    type: typeof CREATE_COMMENT
    payload: CommentType
}


export interface IReplyComments {
    type: typeof REPLY_COMMENT
    payload: CommentType
}

export interface IUpdateComments {
    type: typeof UPDATE_COMMENT | typeof UPDATE_REPLY
    payload: CommentType
}
export interface IDeleteComments {
    type: typeof DELETE_COMMENT | typeof DELETE_REPLY
    payload: CommentType
}

export type CommentAction =
    | ICommentCreate
    | IGetComments
    | IReplyComments
    | IUpdateComments
    | IDeleteComments