import React, {FC, useCallback, useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import s from "./Blog.module.scss"

import {RootState} from "../../redux/store";
import {BlogType, CommentType, Usertype} from "../../utils/TypeScipt";
import {useDispatch, useSelector} from "react-redux";
import {
    createCommentAction,
    getCommentsAction
} from "../../redux/actions/commentsAction";

import Pagination from "../global/pagination/intex";
import Comments from "../comments";
import Input from "../comments/Input";

interface Props {
    blog: BlogType
}

const DisplayBlog: FC<Props> = ({blog}) => {
    const dispatch = useDispatch<any>()
    const {auth, comments} = useSelector((state: RootState) => state)
    let [searchParams, setSearchParams] = useSearchParams();

    const [showComments, setShowComments] = useState<CommentType[]>([])

    let page = searchParams.get("page")


    const handleComment = (body: string) => {
        if (!auth.user || !auth.access_token) return

        const data = {
            content: body,
            user: (auth.user as Usertype),
            blog_id: (blog._id as string),
            blog_user_id: (blog.user as Usertype)._id,
            replyCM: [],
            createdAt: new Date().toISOString()
        }
        setShowComments([data, ...showComments])
        dispatch(createCommentAction(data))
    }


    useEffect(() => {
        setShowComments(comments.data)
    }, [comments.data])

    const fetchComments = useCallback(async (id: string, num = 1) => {
        await dispatch(getCommentsAction(id, num))

    }, [dispatch])

    useEffect(() => {
        if (!blog._id) return

        fetchComments(blog._id)
        if (comments.total > 1) {
            if (!page) {
                setSearchParams(`?page=1`)
            } else {
                setSearchParams(`?page=${page}`)
                fetchComments(blog._id, Number(page))
            }
        }
    }, [blog._id, fetchComments, comments.total])


    const handlePagination = (num: number) => {
        if (!blog._id) return;
        fetchComments(blog._id, num)
    }


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
            {comments.total > 1 && (
                <Pagination
                    total={comments.total}
                    callback={handlePagination}
                />
            )}
        </article>
    );
};

export default DisplayBlog;