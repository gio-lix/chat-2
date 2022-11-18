import React, {FC} from 'react';
import {Link, useParams} from "react-router-dom";
import {RiFileEditFill, RiDeleteBin3Fill} from "react-icons/ri"


import s from "./Cards.module.scss"

import {BlogType} from "../../utils/TypeScipt";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {deleteBlogAction} from "../../redux/actions/blogsAction";

interface Props {
    blog: BlogType
}

const CartHoriz: FC<Props> = ({blog}) => {
    const dispatch = useDispatch<any>()
    const {auth} = useSelector((state: RootState) => state)
    const {slug} = useParams()


    const handleDelete = () => {
        if (!auth.user || !auth.access_token) return
        dispatch(deleteBlogAction(blog, auth.access_token))
        console.log(blog)
    }

    return (
        <div>
            <h2 style={{margin: "10px"}}>Preview</h2>
            <article className={s.cartHorizon}>
                <div className={s.cartHorizon_imageBox}>
                    {blog.thumbnail && (
                        <>
                            {
                                typeof (blog.thumbnail) === "string"
                                    ? <Link to={`/blog/${blog._id}`}>
                                        <img src={blog.thumbnail} alt="thumbnail"/>
                                    </Link>
                                    : <img
                                        src={URL.createObjectURL(blog.thumbnail)}
                                        alt="thumbnail"
                                    />
                            }
                        </>
                    )}
                </div>
                <article className={s.cartHorizon_contentBox}>
                    <h2>
                        <Link to={`/blog/${blog._id}`}>
                            {blog.title}
                        </Link>
                    </h2>
                    <p>{blog.description}</p>
                    {
                        blog.title && (
                            <div>
                                {
                                    (slug === auth.user?._id) && (
                                        <small className={s.updateBlog}>
                                            <Link to={`/update_blog/${blog._id}`}>
                                                <span>
                                                    <RiFileEditFill />
                                                </span>
                                            </Link>
                                            <span onClick={handleDelete}>
                                                <RiDeleteBin3Fill />
                                            </span>
                                        </small>
                                    )
                                }
                                <small className={s.blogData}>{new Date(blog.createdAt).toLocaleString()}</small>
                            </div>
                        )
                    }
                </article>
            </article>
        </div>
    );
};

export default CartHoriz;