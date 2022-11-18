import React, {FC, useEffect, useState} from 'react';
import s from "./Comment.module.scss"

import {CommentType} from "../../utils/TypeScipt";
import AvatarComment from "./AvatarComment";
import AvatarReply from "./AvatarReply";
import CommentList from "./CommentList";

interface Props {
    comment: CommentType
}

const Comments: FC<Props> = ({comment}) => {
    const [showReply, setShowReply] = useState<CommentType[]>([])
    const [next, setNext] = useState<number>(2)

    useEffect(() => {
        if (!comment.replyCM) return
        setShowReply(comment.replyCM)
    }, [comment.replyCM])


    return (
        <div className={s.comment}>
            <AvatarComment user={comment.user}/>
            <CommentList
                comment={comment}
                showReply={showReply}
                setShowReply={setShowReply}
            >
                {showReply.slice(0, next).map((comment, index) => (
                    <div key={index}>
                        <AvatarReply
                            user={comment.user}
                            reply_user={comment.reply_user}
                        />
                        <CommentList
                            comment={comment}
                            showReply={showReply}
                            setShowReply={setShowReply}
                        />
                    </div>
                ))}
                {showReply.length - next > 0 ? (
                    <small
                        onClick={() => setNext(next + 5)}
                        style={{color: "green", cursor: "pointer"}}
                    >
                        see more comments ...
                    </small>
                ) : showReply.length > 1 && (
                    <small
                        style={{color: "red", cursor: "pointer"}}
                        onClick={() => setNext(2)}
                    >
                        hide comments ...
                    </small>
                )}
            </CommentList>
        </div>
    );
};

export default Comments;