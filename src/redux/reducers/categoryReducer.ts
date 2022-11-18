import * as type from "../types/categoryTypes"
import {CategoryType} from "../../utils/TypeScipt";

const categoryReducer = (state: CategoryType[] = [], action: type.CategoryAction) => {
    switch (action.type) {
        case type.CREATE_CATEGORY:
            return [action.payload, ...state]
        case type.GET_CATEGORY:
            return action.payload
        case type.UPDATE_CATEGORY:
            return state.map(item => (
                item._id === action.payload._id
                    ? {...item, name: action.payload.name}
                    : item
            ))
        case type.DELETE_CATEGORY:
            return state.filter(item => (item._id !== action.payload))
        default:
            return state
    }
}

export default categoryReducer