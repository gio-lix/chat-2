import React, {FC} from 'react';
import {Link} from "react-router-dom";
import s from "./Cards.module.scss"

import {BlogType} from "../../utils/TypeScipt";

interface Props {
    blog: BlogType
}

const CartHoriz: FC<Props> = ({blog}) => {

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
                <div className={s.cartHorizon_contentBox}>
                    <h2>
                        <Link to={`/blog/${blog._id}`}>
                            {blog.title}
                        </Link>
                    </h2>
                    <p>{blog.description}</p>
                    <small>{new Date(blog.createdAt).toLocaleString()}</small>
                </div>
            </article>
        </div>
    );
};

export default CartHoriz;