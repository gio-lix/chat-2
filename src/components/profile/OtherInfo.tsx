import React, {FC, useEffect, useState} from 'react';
import s from "./Profile.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getOthersInfoAction} from "../../redux/actions/profileAction";
import {RootState} from "../../redux/store";
import {Usertype} from "../../utils/TypeScipt";

interface Props {
    id: string
}

const OtherInfo: FC<Props> = ({id}) => {
    const dispatch = useDispatch<any>()
    const {otherUser} = useSelector((state: RootState) => state)

    const [other, setOther] = useState<Usertype>()

    useEffect(() => {
        if (!id) return

        if (otherUser.every(user => user._id !== id)) {
            dispatch(getOthersInfoAction(id))
        } else {
            const newUser = otherUser.find(user => user._id === id)
            if (newUser) setOther(newUser)
        }
    }, [id, otherUser, dispatch])

    return (
        <article className={s.other_info}>
            <figure>
                <img src={other?.avatar} alt="avatar"/>
            </figure>
            <h4>{other?.role}</h4>
            <p>
                Name: <span className={s.other_info_name}>{other?.name}</span>
            </p>
            <p>Email <span className={s.other_info_email}>{other?.account}</span></p>
            <p>
                Join Date: <span className={s.other_info_date}>
                {new Date(other?.createdAt!).toLocaleString()}
            </span>
            </p>
        </article>
    );
};

export default OtherInfo;