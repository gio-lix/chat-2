import React, {FC, memo} from 'react';
import {Link} from "react-router-dom";

import s from "./Comment.module.scss"

import {Usertype} from "../../utils/TypeScipt";

interface Props {
    user: Usertype
}

const AvatarComment:FC<Props> = ({user}) => {
    return (
        <article className={s.avatarComment}>
            <img src={user.avatar} alt="avatar"/>
            <small>
                <Link to={`/profile/${user._id}`}>
                    {user.name}
                </Link>
            </small>
        </article>
    );
};

export default memo(AvatarComment);