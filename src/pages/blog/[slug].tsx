import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {BlogType} from "../../utils/TypeScipt";
import {getApi} from "../../utils/FetchData";
import Spinner from "../../components/alert/Spinner";
import DisplayBlog from "../../components/blog/DisplayBlog";

const BlogDetail = () => {
    const {slug} = useParams()

    const [blog, setBlog] = useState<BlogType>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!slug) return
        let mounted = false
        setLoading(true)
        getApi(`blog/${slug}`)
            .then((res) => setBlog(res))
            .catch((err: any) =>   console.log("err - ", err))
            .finally(() => setLoading(false))

        return () => {
            mounted = false
            setBlog(undefined)
        }
    }, [slug])

    if (loading) return (
        <div className="spinner">
            <Spinner />
        </div>
    )

    return (
        <section>
            {blog && <DisplayBlog blog={blog} /> }
        </section>
    );
};

export default BlogDetail;