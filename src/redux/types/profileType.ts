import {Usertype} from "../../utils/TypeScipt";

export const GET_OTHER_INFO = "GET_OTHER_INFO"


export interface OthersProfileTypeAction {
    type: typeof GET_OTHER_INFO,
    payload: Usertype
}