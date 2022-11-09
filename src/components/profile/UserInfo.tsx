import React, {useState} from 'react';

import {MdMonochromePhotos} from "react-icons/md"

import s from "./Profile.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import NotFound from "../global/notFound";
import {HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi";
import clsx from "clsx";
import {IUserProfileState} from "../../utils/TypeScipt";
import {updateUserAction} from "../../redux/actions/profileAction";


const initialState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: ""
}

const UserInfo = () => {
    const dispatch = useDispatch<any>()
    const {auth} = useSelector((state: RootState) => state)


    const [user ,setUser] = useState<IUserProfileState>(initialState)
    const [typePress, setTypePress] = useState<boolean>(false)
    const [focus, setFocus] = useState<string>("")


    if (!auth.user) return <NotFound />

    const {name, account, avatar, cf_password, password} = user

    const onHandleChangeInput  = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
            setUser({...user, [name]: value})
    }
    const onHandleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const files = target?.files
        if (files) {
            const file = files[0]
            setUser({...user, avatar: file})
        }
    }


    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (avatar || name) {
            dispatch(updateUserAction(avatar as File, name, auth))
            console.log({avatar, name})
        }
    }

    return (
        <form onSubmit={onHandleSubmit} className={s.userInfo}>
            <div className={s.userInfo_image_box}>
                <img src={avatar ? URL.createObjectURL(avatar as File) : auth.user?.avatar} alt="avatar"/>
                <label htmlFor="file">
                     <span>
                        <MdMonochromePhotos />
                    </span>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={onHandleChangeFile}
                        hidden
                    />
                </label>
            </div>
            <div className={clsx( focus === "name" && s.active_border)}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={auth.user.name}
                    onChange={onHandleChangeInput}
                    onFocus={() => setFocus("name")}
                    disabled={true}
                />
            </div>
            <div className={clsx( focus === "account" && s.active_border)}>
                <label htmlFor="account">Account</label>
                <input
                    type="text"
                    name="account"
                    defaultValue={auth.user?.account}
                    onChange={onHandleChangeInput}
                    onFocus={() => setFocus("account")}
                    disabled={true}
                />
            </div>
            <div className={clsx(s.userInfo_password_box, focus === "password" && s.active_border)}>
                <label htmlFor="password">Password</label>
                <input
                    type={typePress ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={onHandleChangeInput}
                    onFocus={() => setFocus("password")}
                />
                <small onClick={() => setTypePress(!typePress)}>
                    {typePress ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                </small>
            </div>
            <div className={clsx(s.userInfo_password_box, focus === "cf_password" && s.active_border)}>
                <label htmlFor="cf_password">Confirm Password</label>
                <input
                    type={typePress ? "text" : "password"}
                    name="cf_password"
                    id="cf_password"
                    value={cf_password}
                    onChange={onHandleChangeInput}
                    onFocus={() => setFocus("cf_password")}
                />
                <small onClick={() => setTypePress(!typePress)}>
                    {typePress ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                </small>
            </div>
            <button type="submit">update</button>
        </form>
    );
};

export default UserInfo;