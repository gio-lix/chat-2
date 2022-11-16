import React, {FC, useCallback, useEffect, useState} from 'react';
import s from "./Blog.module.scss"

import {BlogType, CommentType, Usertype} from "../../utils/TypeScipt";
import Input from "../comments/Input";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Link} from "react-router-dom";
import Comments from "../comments";
import {createCommentAction, getCommentsAction} from "../../redux/actions/commentsAction";

interface Props {
    blog: BlogType
}

const DisplayBlog: FC<Props> = ({blog}) => {
    const {auth, comments} = useSelector((state: RootState) => state)
    const dispatch = useDispatch<any>()

    const [showComments, setShowComments] = useState<CommentType[]>([])

    const handleComment = (body: string) => {
        if (!auth.user || !auth.access_token) return

        const data = {
            content: body,
            user: (auth.user as Usertype),
            blog_id: (blog._id as string),
            blog_user_id: (blog.user as Usertype)._id,
            createdAt: new Date().toISOString()
        }
        setShowComments([data, ...showComments])
        dispatch(createCommentAction(data, auth.access_token))
    }


    useEffect(() => {
        if (comments.data.length === 0) return
        setShowComments(comments.data)
    }, [comments.data])

    const fetchComments = useCallback(async (id: string) => {
        await dispatch(getCommentsAction(id))
    }, [dispatch])

    useEffect(() => {
        if (!blog._id) return
        fetchComments(blog._id)
    }, [blog._id, fetchComments])



    return (
        <article className={s.blog}>
            <h1>{blog.title}</h1>
            <article className={s.blog_date}>
                <small>
                    {typeof (blog.user) !== "string" && (
                        `By ${blog.user.name}: `
                    )}
                </small>
                <small>
                    {new Date(blog.createdAt).toLocaleString()}
                </small>
            </article>
            <div
                dangerouslySetInnerHTML={{
                    __html: blog.content
                }}
            />
            <hr/>
            <h3>Comments</h3>
            {
                auth.user
                    ? <Input callback={handleComment}/>
                    : <h5 className={s.login}>
                        Please <Link to={`/login?blog/${blog._id}`}>Login</Link> to comment.
                    </h5>
            }
            {
                showComments?.map((comment, index) => (
                    <Comments
                        key={`${comment._id}_${index}`}
                        comment={comment}
                    />
                ))
            }
        </article>
    );
};

export default DisplayBlog;