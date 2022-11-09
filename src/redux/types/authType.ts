import {UserState} from "../../utils/TypeScipt";
import {AUTH} from "./types";



export interface AuthStateType {
    access_token?: string
    user?: UserState
}
export interface AuthAction {
    type: typeof AUTH,
    payload: AuthStateType
}
