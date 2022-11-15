import React, {useEffect, useState} from 'react';
import { useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getBlogsByUserId} from "../../redux/actions/blogsAction";
import {RootState} from "../../redux/store";
import {BlogType} from "../../utils/TypeScipt";
import CartHoriz from "../cards/CartHoriz";
import Pagination from "../global/pagination/intex";

const UserBlog = () => {
    const user_id = useParams().slug
    const dispatch = useDispatch<any>()
    let [searchParams, setSearchParams] = useSearchParams();
    const {blogsByUsers} = useSelector((state: RootState) => state)

    const [blogs, setBlogs] = useState<BlogType[]>()
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (!user_id) return

        if (blogsByUsers.every(item => item.id !== user_id)) {
            setSearchParams(`page=${1}`)
            dispatch(getBlogsByUserId(user_id))
        } else {
            const data = blogsByUsers.find(item => item.id === user_id)
            if (!data) return;
            setBlogs(data.blogs)
            setTotal(data.total)
        }
    }, [user_id, blogsByUsers])

    const handlePagination = (num: number) => {
        const search = `?page=${num}`
        dispatch(getBlogsByUserId(user_id!, search))
    }

    if (blogs?.length === 0) return (
        <div className="d-flex j-c-center a-i-center">
            <h2 style={{color: "#B4B4B4FF"}}>No Blogs</h2>
        </div>
    )
    return (
        <div>
            {blogs?.map(blog => (
                <CartHoriz blog={blog} key={blog._id}/>
            ))}
            <div>
                {
                    total > 1 &&
                    <Pagination total={total!} callback={handlePagination}/>
                }
            </div>
        </div>
    );
};

export default UserBlog;