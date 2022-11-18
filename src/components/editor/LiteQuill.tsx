import React, {FC, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
    body: string
    setBody: (value: string) => void
}

const LiteQuill:FC<Props> = ({setBody, body}) => {
    const modules = {toolbar: {container}}

    return (
        <section>
            <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="write somethings..."
                onChange={e => setBody(e)}
                value={body}
            />
        </section>
    );
};


let container = [
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block', 'link'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }]
]
export default LiteQuill;