import React, {FC, useEffect, useRef, useState} from 'react';
import LiteQuill from "../editor/LiteQuill";

import s from "./Comment.module.scss"
import {CommentType} from "../../utils/TypeScipt";


interface Props {
    callback: (body: string) => void
    edit?: CommentType
    setEdit?: (data?: CommentType) => void
}

const Input:FC<Props> = ({callback, edit, setEdit}) => {
    const useDivRef = useRef<HTMLDivElement>(null)
    const [body, setBody] = useState<string>("")



    useEffect(() => {
        if (edit) {
            setBody(edit?.content)
        }
    },[edit])


    const handleSubmit = () => {
        const div = useDivRef.current
        const text = div?.innerText as string
        if (!text.trim()) {
            if (setEdit) return setEdit(undefined)
            return
        }
        callback(body)
        setBody("")
    }

    return (
        <section className={s.input}>
            <LiteQuill body={body} setBody={setBody} />
            <div
                dangerouslySetInnerHTML={{__html: body}}
                style={{display: "none"}}
                ref={useDivRef}
            />
            <button onClick={handleSubmit}>
                {edit ? "update" : "send"}
            </button>
        </section>
    );
};

export default Input;