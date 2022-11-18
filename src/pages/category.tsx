import React, {useEffect, useState} from 'react';

import {TfiWrite} from "react-icons/tfi"
import {AiTwotoneDelete} from "react-icons/ai"
import {GrFormClose} from "react-icons/gr"

import NotFound from "../components/global/notFound";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {CategoryType} from "../utils/TypeScipt";
import {
    createCategoryAction,
    deleteCategoryAction,
    updateCategoryAction
} from "../redux/actions/categoryAction";

const Category = () => {
    const dispatch = useDispatch<any>()
    const {auth, categories} = useSelector((state: RootState) => state)
    const [name, setName] = useState<string>("")
    const [edit, setEdit] = useState<CategoryType | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!auth.access_token || !name) return

        if (edit) {
            if (edit?.name === name) return;
            const data = {...edit, name}
            dispatch(updateCategoryAction(data, auth.access_token))
        } else {
            dispatch(createCategoryAction(name, auth.access_token))
        }
        setName("")
        setEdit(null)
    }

    const handleClose = (id: string) => {
        if (!auth.access_token) return
        dispatch(deleteCategoryAction(id, auth.access_token))
    }

    useEffect(() => {
        if (edit) setName(edit.name)
    }, [edit])

    if (auth.user?.role !== "admin") {
        return <NotFound/>
    }
    return (
        <section className="category">
            <form
                onSubmit={handleSubmit}
                className="category_form"
            >
                <label htmlFor="category">Category</label>
                <div>
                    {edit &&
                        <span>
                            <GrFormClose/>
                        </span>}
                    <input
                        type="text"
                        value={name}
                        id="category"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit">{edit ? "Update" : "Create"}</button>
                </div>
            </form>
            <div>
                {
                    (categories as CategoryType[]).map((item, index: number) => {
                        return (
                            <div className="category_box" key={`${index}_${item._id}`}>
                                <p>{item.name}</p>
                                <span onClick={() => setEdit(item)}>
                                    <TfiWrite/>
                                </span>
                                <span  onClick={() => handleClose(item._id)}>
                                    <AiTwotoneDelete/>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default Category;