import * as type from "../types/blogTypes"
import {BlogAction, BlogsUserState} from "../types/blogTypes";
import {Usertype} from "../../utils/TypeScipt";

const blogsUsersReducer = (
    state: BlogsUserState[] = [],
    action: BlogAction
) => {
    switch (action.type) {
        case type.GET_BLOGS_BY_USER_ID:
            if (state.every(item => item.id !== action.payload.id)) {
                return [...state, action.payload]
            } else {
                return state.map(blog => (
                    blog.id === action.payload.id
                        ? action.payload
                        : blog
                ))
            }
        case type.CREATE_BLOGS_USER_ID:
            return state.map(item => (
                item.id === (action.payload.user as Usertype)._id
                    ? {...item, blogs: [action.payload, ...item.blogs]}
                    : item
            ))
        case type.DELETE_BLOG_BY_USER_ID:
            return state.map(item => (
                item.id === (action.payload.user as Usertype)._id
                    ? {
                        ...item,
                        blogs: item.blogs.filter(blog => (
                            blog._id !== action.payload._id
                        ))
                    }
                    : item
            ))
        default:
            return state
    }
}

export default blogsUsersReducer