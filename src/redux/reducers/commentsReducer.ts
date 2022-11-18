import * as type from "../types/commentType"
import {CommentAction} from "../types/commentType";
import {CommentType} from "../../utils/TypeScipt";


const initialState = {
    data: [] as CommentType[] | [],
    total: 1
}

type State = typeof initialState

const commentsReducer = (state: State = initialState, action: CommentAction): State => {
    switch (action.type) {
        case type.CREATE_COMMENT:
            return {
                ...state, data: [action.payload, ...state.data]
            }
        case type.GET_COMMENT:
            return action.payload
        case type.REPLY_COMMENT:
            return {
                ...state, data: state.data.map(item => (
                    item._id === action.payload.comment_root ? {
                        ...item,
                        replyCM: [action.payload, ...item.replyCM]
                    } : item
                ))
            }
        case type.UPDATE_COMMENT:
            console.log("action.payload - ", action.payload)
            return {
                ...state,
                data: state.data.map(item => (
                    item._id === action.payload._id
                        ? action.payload
                        : item
                ))
            }
        case type.UPDATE_REPLY:
            return {
                ...state,
                data: state.data.map(item => (
                    item._id === action.payload.comment_root
                        ? {
                            ...item,
                            replyCM: item.replyCM?.map(rp => (
                                rp._id === action.payload._id
                                    ? action.payload
                                    : rp
                            ))
                        }
                        : item
                ))
            }
        case type.DELETE_COMMENT:
            return {
                ...state,
                data: state.data.filter(item => item._id !== action.payload._id)
            }
        case type.DELETE_REPLY:
            return {
                ...state,
                data: state.data.map(item => (
                    item._id === action.payload.comment_root
                        ? {
                            ...item,
                            replyCM: item.replyCM?.filter(rp => rp._id !== action.payload._id)
                        }
                        : item
                ))
            }
        default:
            return state
    }
}

export default commentsReducer