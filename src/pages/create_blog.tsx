import React, {FC, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {BlogType, Usertype} from "../utils/TypeScipt";
import {RootState} from "../redux/store";
import {ALERT} from "../redux/types/alertType";


import NotFound from "../components/global/notFound";
import CreateForm from "../components/cards/CreateForm";
import CartHoriz from "../components/cards/CartHoriz";
import ReactQuill from "../components/editor/ReactQuill"
import {shallowEqual, validCreateBlog} from "../utils/valid";
import {createBlogAction, updateBlogAction} from "../redux/actions/blogsAction";
import {getApi} from "../utils/FetchData";

interface Props {
    id: string
}

const CreateBlog:FC<Props> = ({id}) => {
    const dispatch = useDispatch<any>()
    const useDivRef = useRef<HTMLDivElement>(null)
    const {auth} = useSelector((state: RootState) => state)


    const initialState = {
        user: "",
        title: "",
        content: "",
        description: "",
        thumbnail: "",
        category: "",
        createdAt: new Date().toISOString()
    }

    const [blog, setBlog] = useState<BlogType>(initialState)
    const [oldBlog, setOldBlog] = useState<BlogType>(initialState)
    const [body, setBody] = useState<string>("")
    const [text, setText] = useState<string>("")

    useEffect(() => {
        if (!id) return
        let mounted = true
        getApi(`blog/${id}`)
            .then(res => {
                if (mounted) {
                    setBlog(res)
                    setOldBlog(res)
                    setBody(res.content)
                }
            })
            .catch(err => console.log(err))

        return () => {
            mounted = false
            setBlog(initialState)
            setOldBlog(initialState)
            setBody("")
        }
    },[id])

    useEffect(() => {
        const div = useDivRef.current
        const text = (div?.innerText as string)
        if (!text) return
        setText(text)
    },[body])


    const handleSubmit = async () => {
        if (!auth.access_token) return
        const check = validCreateBlog({...blog, content: text})

        if (check.errLength !== 0) {
            return dispatch({type: ALERT, payload: {errors: check.errMsg}})
        }
        let newDate = {...blog, content: body}

        if (id) {
            if ( (blog.user as Usertype)._id !== auth.user?._id) {
                return dispatch({type: ALERT, payload: {errors: "Invalid Authentication."}})
            }

            const result = shallowEqual(oldBlog, newDate);
            if (result) {
                return dispatch({type: ALERT, payload: {errors: "The data does not change."}})
            }


            dispatch(updateBlogAction(newDate))
        } else {
            dispatch(createBlogAction(newDate))
        }
    }

    if (!auth.access_token) return <NotFound/>

    return (
        <section className='blog'>
            <div className="blog_create">
                <CreateForm
                    blog={blog}
                    setBlog={setBlog}
                />
                <CartHoriz blog={blog}/>
            </div>
            <ReactQuill
                setBody={setBody}
                body={body}
            />

            <div ref={useDivRef} dangerouslySetInnerHTML={{
                __html: body
            }} style={{display: "none"}}/>

            <div style={{display: "blog"}}>{text.length}</div>
            <button onClick={handleSubmit} className="blog_button">
                {id ? "Update post" : "Create post"}
            </button>
        </section>
    );
};

export default CreateBlog;