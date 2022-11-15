import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";

import {RootState} from "../../redux/store";
import {BlogType, CategoryType} from "../../utils/TypeScipt";
import {getBlogsByCategory} from "../../redux/actions/blogsAction";
import CardBlog from "../../components/cards/cardBlog";
import Pagination from "../../components/global/pagination/intex";
import Spinner from "../../components/alert/Spinner";

const BlogsByCategory = () => {
    const {search} = useLocation()
    const dispatch = useDispatch<any>()
    let [searchParams, setSearchParams] = useSearchParams();
    const {slug} = useParams()
    const {categories, blogsCategory, alert} = useSelector((state: RootState) => state)

    const [categoryId, setCategoryId] = useState<string>("")
    const [blogs, setBlogs] = useState<BlogType[]>()
    const [total, setTotal] = useState(0)


    useEffect(() => {
        const category = (categories as CategoryType[]).find(item => item.name === slug)
        if (category) setCategoryId(category._id)
        if (!search) setSearchParams(`page=1`)
    }, [slug, categories, search])

    useEffect(() => {
        if (!categoryId) return

        if (blogsCategory.every(item => item.id !== categoryId)) {
            dispatch(getBlogsByCategory(categoryId, search))
        } else {
            const data = blogsCategory.find(item => item.id === categoryId)
            if (!data) return;
            setBlogs(data.blogs)
            setTotal(data.total)
        }
    }, [categoryId, blogsCategory, search])

    const handlePagination = (num: number) => {
        const search = `?page=${num}`
        dispatch(getBlogsByCategory(categoryId, search))
    }


    return (
        <>
            {alert.spinner ? (
                <div style={{width: "100%", height: "50vh"}} className="d-flex j-c-center a-i-center">
                    <Spinner/>
                </div>
            ) : (
                <section className='home_blog'>
                    <div className="home_blog_container">
                        {blogs?.map((blog) => (
                            <CardBlog blog={blog} key={blog._id}/>
                        ))}
                    </div>
                    <Pagination
                        total={total}
                        callback={handlePagination}
                    />
                </section>
            )}

        </>

    );
};

export default BlogsByCategory;