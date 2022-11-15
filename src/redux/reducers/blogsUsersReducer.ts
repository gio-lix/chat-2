import * as type from "../types/blogTypes"
import {BlogsByUserIdAction, IBlogs, IBlogsCategory} from "../types/blogTypes";

const blogsUsersReducer = (
    state: IBlogsCategory[] = [],
    action: BlogsByUserIdAction
): IBlogsCategory[] => {
    switch (action.type) {
        case type.GET_BLOGS_BY_USER_ID:
            if(state.every(item => item.id !== action.payload.id)){
                return [...state, action.payload]
            }else{
                return state.map(blog => (
                    blog.id === action.payload.id
                        ? action.payload
                        : blog
                ))
            }
        default:
            return  state
    }
}

export default blogsUsersReducer