import * as type from "../types/blogTypes"
import {BlogCategoryAction, IBlogsCategory} from "../types/blogTypes";


const blogsCategoryReducers = (
    state: IBlogsCategory[] = [],
    action: BlogCategoryAction): IBlogsCategory[] => {

    switch (action.type) {
        case type.GET_BLOGS_CATEGORY_ID:
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
            return state
    }
}

export default blogsCategoryReducers