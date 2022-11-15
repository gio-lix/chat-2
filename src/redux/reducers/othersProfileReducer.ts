import {GET_OTHER_INFO, OthersProfileTypeAction} from "../types/profileType"
import {Usertype} from "../../utils/TypeScipt";

const othersProfileReducer = (state: Usertype[] = [], action: OthersProfileTypeAction): Usertype[] => {
    switch (action.type) {
        case GET_OTHER_INFO:
            return [...state, action.payload]
        default:
            return state
    }

}

export default othersProfileReducer