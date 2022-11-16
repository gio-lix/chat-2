import React, {FC} from 'react';
import s from "./Alert.module.scss"

interface Props {
    text: string
}

const ShowError:FC<Props> = ({text}) => {
    return (
        <div className={s.error_show}>
            {text}
        </div>
    );
};

export default ShowError;