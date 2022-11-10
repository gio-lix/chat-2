import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import NotFound from "../components/global/notFound";
import CreateForm from "../components/cards/CreateForm";


const CreateBlog = () => {
    const {auth, categories} = useSelector((state: RootState) => state)

    const initialState = {
        user: "",
        title: "",
        content: "",
        description: "",
        thumbnail: "",
        category: "",
        createdAt: new Date().toISOString()
    }

    const [blog, setBlog] = useState(initialState)

    if (!auth.access_token) return <NotFound />
    return (
        <section>
            <h2>Create Blog</h2>
            <div>
                <CreateForm />
            </div>
        </section>
    );
};

export default CreateBlog;