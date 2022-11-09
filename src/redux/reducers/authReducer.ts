import {AuthStateType, AuthAction} from "../types/authType";
import {AUTH} from "../types/types";


const authReducer = (state: AuthStateType = {}, action: AuthAction) => {
    switch (action.type) {
        case AUTH:
            return action.payload
        default:
            return state
    }
}

export default authReducer