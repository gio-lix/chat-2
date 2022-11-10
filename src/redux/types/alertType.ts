import {AlertType} from "../../utils/TypeScipt";

export const ALERT = "ALERT"

export interface AlertAction {
    type: typeof ALERT,
    payload: AlertType
}