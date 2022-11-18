import React, {useState} from 'react';
import clsx from "clsx";
import {MdMonochromePhotos} from "react-icons/md"

import s from "./Profile.module.scss"

import {useDispatch, useSelector} from "react-redux";
import {resetPasswordAction, updateUserAction} from "../../redux/actions/profileAction";
import {HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi";
import NotFound from "../global/notFound";

import {UserProfileType} from "../../utils/TypeScipt";
import {RootState} from "../../redux/store";

interface PressState {
    password: boolean
    cf_password: boolean
}

const UserInfo = () => {
    const dispatch = useDispatch<any>()
    const {auth} = useSelector((state: RootState) => state)

    const initialState = {
        name: "",
        account: "",
        avatar: "",
        password: "",
        cf_password: ""
    }

    const [user, setUser] = useState<UserProfileType>(initialState)
    const [focus, setFocus] = useState<string>("")

    const [typePress, setTypePress] = useState<PressState>({
        password: false,
        cf_password: false
    })

    if (!auth.user) return <NotFound/>

    const {name, avatar, cf_password, password} = user

    const onHandleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (avatar || name) dispatch(updateUserAction(avatar as File, name, auth))
        if (password && auth.access_token)
            dispatch(resetPasswordAction(password, cf_password, auth.access_token))
    }




    return (
        <form onSubmit={onHandleSubmit} className={s.user_info} >
            <div className={s.user_info_image_box}>
                <img src={avatar ? URL.createObjectURL(avatar as File) : auth.user?.avatar} alt="avatar"/>
                <label htmlFor="file">
                     <span>
                        <MdMonochromePhotos/>
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
            <div className={clsx(focus === "name" && s.active_border)}>
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
            <div className={clsx(focus === "account" && s.active_border)}>
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
            <div className={s.error_info}>
                {
                    auth.user.type !== "register" &&
                    <small>
                        * Quick login account with {auth.user.type} can't use this function! *
                    </small>
                }
            </div>

            <div className={clsx(s.user_info_password_box, focus === "password" && s.active_border)}>
                <label htmlFor="password">Password</label>
                <input
                    type={typePress.password ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={onHandleChangeInput}
                    disabled={auth.user.type !== "register"}
                    onFocus={() => setFocus("password")}
                />
                <small onClick={() => setTypePress((prev: PressState) => ({...prev, password: !prev.password}))}>
                    {typePress.password ? <HiOutlineEye/> : <HiOutlineEyeOff/>}
                </small>
            </div>
            <div className={clsx(s.user_info_password_box, focus === "cf_password" && s.active_border)}>
                <label htmlFor="cf_password">Confirm Password</label>
                <input
                    type={typePress.cf_password ? "text" : "password"}
                    name="cf_password"
                    id="cf_password"
                    value={cf_password}
                    disabled={auth.user.type !== "register"}
                    onChange={onHandleChangeInput}
                    onFocus={() => setFocus("cf_password")}
                />
                <small onClick={() => setTypePress((prev: PressState) => ({...prev,cf_password: !prev.cf_password}))}>
                    {typePress.cf_password ? <HiOutlineEye/> : <HiOutlineEyeOff/>}
                </small>
            </div>

            <button type="submit">update</button>
        </form>
    );
};

export default UserInfo;