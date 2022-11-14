import React, {FC, useCallback, useEffect, useRef} from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import s from "./Edit.module.scss"
import {checkImage, imageUpload} from "../../utils/ImageUpload";
import {useDispatch, useSelector} from "react-redux";
import {ALERT} from "../../redux/types/alertType";
import {RootState} from "../../redux/store";
import {validCreateBlog} from "../../utils/valid";

interface Props {
    setBody: (value: string) => void
}

const Quill: FC<Props> = ({setBody}) => {
    const dispatch = useDispatch()
    const useQueryRef = useRef<ReactQuill>(null)
    const modules = {toolbar: {container}}


    const handleChangeImage = useCallback(() => {
        const input = document.createElement('input')
        input.type = "file"
        input.accept = "image/*"
        input.click()

        input.onchange = async () => {
            const files = input.files
            if (!files) return dispatch({type: ALERT, payload: {errors: "File does not exist."}})

            const file = files[0]
            const check = checkImage(file)
            if (check) {
                return dispatch({type: ALERT, payload: {errors: check}})
            }
            dispatch({type: ALERT, payload: {loading: true}})
            const photo = await imageUpload(file)
            const quill = useQueryRef.current
            const range = quill?.getEditor().getSelection()?.index
            if (range !== undefined) {
                quill?.getEditor().insertEmbed(range, "image", `${photo.url}`)
            }

            dispatch({type: ALERT, payload: {loading: false}})

        }
    }, [dispatch])

    useEffect(() => {
        const quill = useQueryRef.current
        if (!quill) return

        let toolbar = quill.getEditor().getModule("toolbar")
        toolbar.addHandler("image", handleChangeImage)
    }, [handleChangeImage])


    return (
        <section className={s.root}>
            <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="write somethings..."
                onChange={e => setBody(e)}
                ref={useQueryRef}
            />
        </section>
    );
};

let container = [
    [{'font': []}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript

    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    [{'align': []}],

    ['clean', 'link', 'image', 'video']
]

export default Quill;