import {CommentType} from "../../utils/TypeScipt";

export const CREATE_COMMENT = "CREATE_COMMENT"
export const GET_COMMENT = "GET_COMMENT"


export interface ICommentPayloadState {
    data: CommentType[]
    total: number
}

export interface ICommentCreate {
    type: typeof CREATE_COMMENT
    payload: CommentType
}

export interface IGetComments {
    type: typeof GET_COMMENT
    payload: ICommentPayloadState
}


export type CommentAction = ICommentCreate | IGetComments