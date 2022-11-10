import * as type from "../types/authType"
import {AuthType} from "../../utils/TypeScipt";


const authReducer = (state: AuthType = {}, action: type.AuthAction) => {
    switch (action.type) {
        case type.AUTH:
            return action.payload
        default:
            return state
    }
}

export default authReducer