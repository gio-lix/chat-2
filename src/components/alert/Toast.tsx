import React, {FC, useEffect, useState} from 'react';
import {IoMdClose} from "react-icons/io"

import s from "./Alert.module.scss"
import {useDispatch} from "react-redux";
import {ALERT} from "../../redux/types/types";


interface Props {
    title: string
    body: string | string[]
    bgColor: string
}

const Toast: FC<Props> = ({body, title, bgColor}) => {
    const [toast, setToast] = useState(true)
    const dispatch = useDispatch()

    const onHandleClose = () => {
        setToast(false)
        dispatch({type: ALERT, payload: {}})
    }

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                onHandleClose()
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [toast])

    return (
        <>
            {toast && (
                <div className={s.toast} style={{backgroundColor: bgColor}}>
                    <button onClick={onHandleClose}>
                        <IoMdClose/>
                    </button>
                    <h3>{title}</h3>
                    <p className={s.toast_text}>
                        {typeof (body) === "string" ? body : (
                            <ul>
                                {body.map((text, index: number) => (
                                    <li key={index}>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </p>
                </div>
            )}
        </>
    );
};

export default Toast;