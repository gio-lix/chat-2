import * as type from "../types/blogTypes"
import {BlogAction, IBlogs} from "../types/blogTypes";


const blogsReducer = (state: IBlogs[] = [], action: BlogAction) => {
    switch (action.type) {
        case type.GET_BLOGS:
            return action.payload
        default:
            return state
    }
}
export default blogsReducer