import * as type from "../types/blogTypes"
import {BlogAction, BlogState} from "../types/blogTypes";


const blogsReducer = (state: BlogState[] = [], action: BlogAction) => {
    switch (action.type) {
        case type.GET_BLOGS:
            return action.payload
        default:
            return state
    }
}
export default blogsReducer