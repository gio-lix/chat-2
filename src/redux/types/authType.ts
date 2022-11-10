import {AuthType} from "../../utils/TypeScipt";

export const AUTH = "AUTH"



export interface AuthAction {
    type: typeof AUTH,
    payload: AuthType
}
