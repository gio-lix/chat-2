import React, {FC} from 'react';
import clsx from "clsx";
import s from "./Cards.module.scss"

import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
    BlogType,
    CategoryType,
    FormSubmitType,
    InputChangeType
} from "../../utils/TypeScipt";

interface Props {
    blog: BlogType
    setBlog: (blog: BlogType) => void
}

const CreateForm: FC<Props> = ({setBlog, blog}) => {
    const {categories} = useSelector((state: RootState) => state)

    const handleSubmit = (e: FormSubmitType) => {
        e.preventDefault()
    }

    const handleChangeInput = (e: InputChangeType) => {
        const {value, name} = e.target
        setBlog({...blog, [name]: value})
    }
    const handleChangeThumbnail = (e: InputChangeType) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        if (files) {
            const file = files[0]
            setBlog({...blog, thumbnail: file})
        }
    }

    const handleChangeTextarea = (e: InputChangeType) => {
        const {value, name} = e.target
        setBlog({...blog, [name]: value})
    }

    const checkValidStyle = (length: any) => {
        console.log('length  - - ' ,length)
    }

    return (
        <div>
            <h2 style={{margin: "10px"}}>Create</h2>
            <form onSubmit={handleSubmit} className={s.createForm}>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChangeInput}
                    />
                    <small className={clsx(blog.title.length > 50 && s.checkValid)}>{blog.title.length}/50</small>
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        onChange={handleChangeThumbnail}
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        onChange={handleChangeTextarea}
                        value={blog.description}>
                    </textarea>
                    <small
                        className={clsx( blog.description.length > 200 && s.checkValid)}
                    >{blog.description.length}/200</small>
                </div>
                <div>
                    <select
                        name="category"
                        value={blog.category}
                        onChange={handleChangeInput}
                    >
                        <option value="">Chosen a category</option>
                        {
                            (categories as CategoryType[]).map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    );
};

export default CreateForm;