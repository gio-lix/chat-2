import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {getApi} from "../../utils/FetchData";
import Spinner from "../../components/alert/Spinner";
import DisplayBlog from "../../components/blog/DisplayBlog";
import {BlogType} from "../../utils/TypeScipt";
import {RootState} from "../../redux/store";

const BlogDetail = () => {
    const {slug} = useParams()

    const {socket} = useSelector((state: RootState) => state)

    const [blog, setBlog] = useState<BlogType>()
    const [loading, setLoading] = useState<boolean>(false)

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


    // join room
    useEffect(() => {
        if (!slug || !socket) return
        socket.emit("joinRoom", slug)

        return () => {
            socket.emit("outRoom", slug)
        }
    },[slug, socket])

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