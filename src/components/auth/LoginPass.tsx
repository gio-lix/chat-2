import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";

import {HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi"

import s from "./auth.module.scss"
import { loginAction} from "../../redux/actions/authAction";
import {RootState} from "../../redux/store";
import {useNavigate} from "react-router-dom";

const LoginPass = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {auth} = useSelector((state: RootState) => state)

    const [userLogin, setUserLogin] = useState({account: "", password: ""})
    const [typePress, setTypePress] = useState(false)
    const [focus, setFocus] = useState("")

    const {password,account} = userLogin

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUserLogin({...userLogin, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loginAction(userLogin) as any)

    }

    useEffect(() => {
        if (auth.access_token) {
            navigate("/")
        }
    },[auth.access_token])

    return (
        <form onSubmit={handleSubmit} className={s.root}>
            <div className={clsx(focus === "account" && s.active_color)}>
                <label htmlFor="account">Email</label>
                <input
                    type="text"
                    name="account"
                    id="account"
                    value={account}
                    onChange={onHandleChange}
                    onFocus={() => setFocus("account")}

                />
            </div>
            <div className={clsx(focus === "password" && s.active_color)}>
                <label htmlFor="password">Password</label>
                <div className={s.password_box}>
                    <input
                        type={typePress ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={onHandleChange}
                        onFocus={() => setFocus("password")}
                    />
                    <small onClick={() => setTypePress(!typePress)}>
                        {typePress ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                    </small>
                </div>
            </div>
            <button
                disabled={!(account && password)}
                type="submit">Login
            </button>
        </form>
    );
};

export default LoginPass;