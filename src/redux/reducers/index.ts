import {combineReducers} from "redux"
import auth from "./authReducer"
import alert from "./alertReducer"
import categories from "./categoryReducer"
import blogs from "./blogsReducer"
import blogsCategory from "./blogsCategoryReducers"
import otherUser from "./othersProfileReducer"
import blogsByUsers from "./blogsUsersReducer"
import comments from "./commentsReducer"
import socket from "./socketReducer"

export default combineReducers({
    auth,
    alert,
    categories,
    blogs,
    blogsCategory,
    otherUser,
    blogsByUsers,
    comments,
    socket
})