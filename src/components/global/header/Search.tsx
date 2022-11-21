import React, {useEffect, useRef, useState} from 'react';
import clsx from "clsx";

import s from "./Header.module.scss"
import {getApi} from "../../../utils/FetchData";
import {BlogType} from "../../../utils/TypeScipt";
import CartHoriz from "../../cards/CartHoriz";
import {useLocation} from "react-router-dom";

const Search = () => {
    const [focus, setFocus] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [blogs, setBlogs] = useState<BlogType[]>([])
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: any) => {
            if (!e.path.includes(navRef.current)) {
                setFocus(false)
                setBlogs([])
                setSearch("")
            }
        }
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [navRef.current])


    useEffect(() => {
        const delay = setTimeout(async () => {
            if (search.length < 2) return
            try {
                const res = await getApi(`search/blogs?title=${search}`)
                setBlogs(res)
            } catch (err: any) {
                console.log(err)
            }
        }, 400)

        return () => {
            clearTimeout(delay)

        }
    }, [search])




    return (
        <div ref={navRef} className={s.search}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={clsx(focus && s.active_border)}
                onFocus={() => setFocus(true)}
                placeholder="Enter your search..."
            />
            {
                search.length >= 2 && (
                    <article className={s.search_blogs}>
                        <div>
                            {blogs.length
                                ? blogs?.map(blog => (
                                    <CartHoriz key={blog._id} blog={blog}/>
                                ))
                                : <h3>No Blogs</h3>
                            }
                        </div>
                    </article>
                )
            }
        </div>
    );
};

export default Search;