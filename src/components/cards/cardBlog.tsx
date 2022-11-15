import React, {FC} from 'react';
import {Link} from "react-router-dom";

import s from "./Cards.module.scss"

import {BlogType} from "../../utils/TypeScipt";
import {capitalizeFirstLetter} from "../../utils/hrlpers";

interface Props {
    blog: BlogType
}

const CardBlog:FC<Props> = ({blog}) => {

    return (
        <article className={s.cardBlog}>
            <figure >
                {
                    typeof(blog.thumbnail) === "string" &&
                    <img className={s.img} src={blog.thumbnail} alt="thumbnail"/>
                }
            </figure>
            <div className={s.content_box}>
                <h3>
                    <Link
                        to={`/blog/${blog._id}`}
                        style={{  textTransform: "capitalize"}}
                    >
                        {blog.title.slice(0, 50) + "..."}
                    </Link>
                </h3>
                <p>
                    {"\xa0" + capitalizeFirstLetter(blog.description).slice(0,100) + "..."}
                </p>
                <p className='d-flex j-c-between m-t-10' >
                    <small style={{textDecoration: "underline"}}>
                        {
                            typeof(blog.user) !== "string" &&
                            <Link
                                to={`/profile/${blog.user._id}`}
                                style={{textTransform: "capitalize"}}
                            >
                                By: {blog.user.name}
                            </Link>
                        }
                    </small>
                    <small className={s.content_date}>
                        {new Date(blog.createdAt).toLocaleString()}
                    </small>
                </p>
            </div>
        </article>
    );
};

export default CardBlog;