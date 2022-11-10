import React from 'react';
import s from "./Cards.module.scss"

const CreateForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className={s.createForm}>
            <div>
                <input type="text"/>
                <small>0/50</small>
            </div>
            <div>
                <label htmlFor="file">
                    <span>

                    </span>
                    file
                </label>
                <input type="file" accept="image/*" hidden/>
            </div>
            <div>
                <textarea value="description">

                </textarea>
                <small>0/200</small>
            </div>
        </form>
    );
};

export default CreateForm;