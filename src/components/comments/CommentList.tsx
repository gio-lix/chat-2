import React, {FC, useState} from 'react';
import s from "./Comment.module.scss"
import {CommentType, Usertype} from "../../utils/TypeScipt";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Input from "./Input";
import comments from "./index";

interface Props {
    comment: CommentType
    showReply: CommentType[]
    setShowReply: (showReply: CommentType[]) => void
    children?: React.ReactNode
}

const CommentList:FC<Props> = ({ comment, setShowReply,showReply,children}) => {
    const dispatch = useDispatch<any>()
    const [onReply, setReply] = useState<boolean>(false)
    const {auth} = useSelector((state: RootState) => state)

    const handleReply = (body: string) => {
        if (!auth.user || !auth.access_token) return

        const data = {
            user: auth.user,
            blog_id: comment.blog_id,
            blog_user_id: comment.blog_user_id,
            content: body,
            reply_user: comment.user,
            comment_root: comment._id,
            createdAt: new Date().toISOString()
        }
        setShowReply([data,...showReply])
        setReply(false)

    }

    return (
        <div className="d-flex f-column" style={{width: "100%"}}>
            <section className={s.commentList}>
                <div dangerouslySetInnerHTML={{__html: comment.content}}/>
                <div className={s.commentList_replyBox}>
                    <small onClick={() => setReply(!onReply)}>
                        {onReply ? "- Cancel -" : "- Reply -" }
                    </small>
                    <small>{new Date(comment.createdAt).toLocaleString()}</small>
                </div>
            </section>
            {onReply && <Input callback={handleReply} />}
            {children}
        </div>
    );
};

export default CommentList;