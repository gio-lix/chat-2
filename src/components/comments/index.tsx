import React, {FC, useState} from 'react';
import s from "./Comment.module.scss"
import {CommentType} from "../../utils/TypeScipt";
import AvatarComment from "./AvatarComment";
import CommentList from "./CommentList";
import AvatarReply from "./AvatarReply";

interface Props {
    comment: CommentType
}

const Comments:FC<Props> = ({comment}) => {
    const [showReply, setShowReply] = useState<CommentType[]>([])
    return (
        <div className={s.comment}>
            <AvatarComment user={comment.user}/>
            <CommentList
                comment={comment}
                showReply={showReply}
                setShowReply={setShowReply}
            >
                {showReply.map((comment, index) => (
                       <div key={index} className={s.comment_reply}>
                           <CommentList
                               
                               comment={comment}
                               showReply={showReply}
                               setShowReply={setShowReply}
                           />
                           <AvatarReply
                               user={comment.user}
                               reply_user={comment.reply_user}
                           />
                       </div>
                ))}
            </CommentList>
        </div>
    );
};

export default Comments;