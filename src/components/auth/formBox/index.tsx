import React, {FC} from 'react';
import s from "./FormContainer.module.scss"

interface Props {
    children: React.ReactNode
}

const FormContainer:FC<Props> = ({children}) => {
    return (
        <div className={s.root}>
            {children}
        </div>
    );
};

export default FormContainer;