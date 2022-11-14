import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {BlogType} from "../utils/TypeScipt";
import {RootState} from "../redux/store";
import {ALERT} from "../redux/types/alertType";

import {createBlobAction} from "../redux/actions/createBlobAction";
import NotFound from "../components/global/notFound";
import CreateForm from "../components/cards/CreateForm";
import CartHoriz from "../components/cards/CartHoriz";
import ReactQuill from "../components/editor/ReactQuill"
import {validCreateBlog} from "../utils/valid";

const initialState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString()
}

const CreateBlog = () => {
    const dispatch = useDispatch<any>()
    const useDivRef = useRef<HTMLDivElement>(null)
    const {auth} = useSelector((state: RootState) => state)

    const [blog, setBlog] = useState<BlogType>(initialState)
    const [body, setBody] = useState("")
    const [text, setText] = useState("")

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
        dispatch(createBlobAction(newDate, auth.access_token))

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
            <ReactQuill setBody={setBody}/>

            <div ref={useDivRef} dangerouslySetInnerHTML={{
                __html: body
            }} style={{display: "none"}}/>

            <div style={{display: "blog"}}>{text.length}</div>
            <button onClick={handleSubmit} className="blog_button">Create post</button>
        </section>
    );
};

export default CreateBlog;