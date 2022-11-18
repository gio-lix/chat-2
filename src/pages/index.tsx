import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import {RootState} from "../redux/store";
import CardBlog from "../components/cards/cardBlog";

const Home = () => {
    const {blogs} = useSelector((state: RootState) => state)
    return (
        <section>
            <div className="home_blog">
                {blogs.map((mainBlog) => (
                    <div key={mainBlog._id}>
                        {mainBlog.count > 0 && (
                            <>
                                <h1 className="home_blog_tile">
                                    <Link to={`/blogs/${(mainBlog.name).toLowerCase()}`}>
                                        {mainBlog.name}
                                        <small>
                                            ({mainBlog.count})
                                        </small>
                                    </Link>
                                </h1>
                                <div className="home_blog_container">
                                    {mainBlog.blogs.map((blog) => (
                                        <CardBlog blog={blog} key={blog._id}/>
                                    ))}
                                </div>
                            </>
                        )}
                        <hr style={{margin: "5px 0"}}/>
                        <small className="home_blog_more">
                            {
                                mainBlog.count > 4 &&
                                <Link to={`/blogs/${mainBlog.name}`}>
                                    Read more &gt;&gt;
                                </Link>
                            }
                        </small>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Home;