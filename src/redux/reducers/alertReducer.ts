import {AlertState} from "../../utils/TypeScipt";
import {ALERT} from "../types/types";

export interface AlertAction {
    type: typeof ALERT,
    payload: AlertState
}

const alertReducer = (state: AlertState = {}, action: AlertAction) => {
    switch (action.type) {
        case ALERT:
            return action.payload
        default:
            return state
    }
}
export default alertReducer