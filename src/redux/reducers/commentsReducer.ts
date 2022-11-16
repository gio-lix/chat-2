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
        default:
            return state
    }
}

export default commentsReducer