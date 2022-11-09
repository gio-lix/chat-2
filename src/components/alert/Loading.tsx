import React from 'react';
import s from "./Alert.module.scss"

const Loading = () => {
    return (
        <div className={s.alert_loading}>
            <h1>
                loading...
            </h1>
        </div>
    );
};

export default Loading;