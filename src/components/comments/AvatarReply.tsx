import React, {FC, memo} from 'react';
import {Link} from "react-router-dom";
import s from "./Comment.module.scss"

import {Usertype} from "../../utils/TypeScipt";

interface Props {
    user: Usertype
    reply_user?: Usertype
}

const AvatarReply:FC<Props> = ({reply_user,user}) => {

    return (
        <article className={s.avatarReply} >
            <div className={s.avatarReply_imageBox}>
                <div>
                    <small>
                        <Link to={`/profile/${user?._id}`}>
                            {user?.name}
                        </Link>
                    </small>
                    <small>
                        Reply to
                        <Link to={`/profile/${reply_user?._id}`}>
                            {reply_user?.name}
                        </Link>
                    </small>
                </div>
                <img src={user?.avatar} alt="avatar"/>
            </div>
        </article>

    );
};

export default memo(AvatarReply);