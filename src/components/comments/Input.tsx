import React, {FC, useRef, useState} from 'react';
import LiteQuill from "../editor/LiteQuill";

import s from "./Comment.module.scss"


interface Props {
    callback: (body: string) => void
}

const Input:FC<Props> = ({callback}) => {
    const useDivRef = useRef<HTMLDivElement>(null)
    const [body, setBody] = useState("")


    const handleSubmit = () => {
        const div = useDivRef.current
        const text = div?.innerText as string
        if (!text.trim()) return
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
                send
            </button>
        </section>
    );
};

export default Input;