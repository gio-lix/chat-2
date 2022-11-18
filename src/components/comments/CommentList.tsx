import React, {FC, useState} from 'react';
import {AiFillDelete, AiTwotoneEdit} from "react-icons/ai"
import s from "./Comment.module.scss"

import {
    deleteCommentAction,
    replyCommentsAction,
    updateCommentAction
} from "../../redux/actions/commentsAction";

import {useDispatch, useSelector} from "react-redux";
import {CommentType} from "../../utils/TypeScipt";
import {RootState} from "../../redux/store";
import Input from "./Input";

interface Props {
    comment: CommentType
    showReply: CommentType[]
    setShowReply: (showReply: CommentType[]) => void
    children?: React.ReactNode
}

const CommentList: FC<Props> = ({comment, setShowReply, showReply, children}) => {
    const dispatch = useDispatch<any>()
    const {auth} = useSelector((state: RootState) => state)

    const [onReply, setReply] = useState<boolean>(false)
    const [edit, setEdit] = useState<CommentType>()

    const handleReply = (body: string) => {
        if (!auth.user || !auth.access_token) return

        const data = {
            user: auth.user,
            blog_id: comment.blog_id,
            blog_user_id: comment.blog_user_id,
            content: body,
            reply_user: comment.user,
            replyCM: [],
            comment_root: comment.comment_root || comment._id,
            createdAt: new Date().toISOString()
        }

        setShowReply([data, ...showReply])
        dispatch(replyCommentsAction(data, auth.access_token))
        setReply(false)

    }

    const handleUpdate = (body: string) => {
        if (!auth.user || !auth.access_token || !edit) return

        if (body === edit.content) return setEdit(undefined)
        const newComment = {...edit, content: body}
        dispatch(updateCommentAction(newComment, auth.access_token))
        setEdit(undefined)
    }


    const handleDelete = (comment: CommentType) => {
        if (!auth.access_token || !auth.user) return
        dispatch(deleteCommentAction(comment, auth.access_token))
    }

    const Nav = (comment: CommentType) => {
        return (
            <small>
                <span onClick={() => handleDelete(comment)} className={s.delIcon}>
                    <AiFillDelete/>
                </span>
                <span onClick={() => setEdit(comment)} className={s.editIcon}>
                    <AiTwotoneEdit/>
                </span>
            </small>
        )
    }

    return (
        <div className="d-flex f-column" style={{width: "100%"}}>

            {
                edit ? (
                    <Input
                        callback={handleUpdate}
                        edit={edit}
                        setEdit={setEdit}
                    />
                ) : (
                    <section className={s.commentList}>
                        <div dangerouslySetInnerHTML={{__html: comment.content}}/>
                        <div className={s.commentList_replyBox}>
                            <small style={{cursor: "pointer"}} onClick={() => setReply(!onReply)}>
                                {onReply ? "- Cancel -" : "- Reply -"}
                            </small>
                            <small>
                                <div>
                                    {
                                        comment.blog_user_id === auth.user?._id
                                            ? comment.user._id === auth.user._id
                                                ? Nav(comment)!
                                                : <span
                                                    onClick={() => handleDelete(comment)}
                                                    className={s.delIcon}
                                                >
                                                        <AiFillDelete/>
                                            </span>
                                            : comment.user._id === auth.user?._id && Nav(comment)!
                                    }
                                </div>
                                {new Date(comment.createdAt).toLocaleString()}
                            </small>
                        </div>
                    </section>
                )
            }
            {onReply && <Input callback={handleReply}/>}
            {children}
        </div>
    );
};

export default CommentList;