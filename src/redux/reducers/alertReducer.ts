import * as type from "../types/alertType"
import {AlertType} from "../../utils/TypeScipt";



const alertReducer = (state: AlertType = {}, action: type.AlertAction) => {
    switch (action.type) {
        case type.ALERT:
            return action.payload
        default:
            return state
    }
}
export default alertReducer