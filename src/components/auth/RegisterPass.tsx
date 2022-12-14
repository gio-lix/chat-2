import React, {useEffect, useState} from 'react';
import s from "./auth.module.scss"
import clsx from "clsx";
import {HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {registerAction} from "../../redux/actions/authAction";
import {RootState} from "../../redux/store";
import {useNavigate} from "react-router-dom";

interface PressState {
    password: boolean
    cf_password: boolean
}

const RegisterPass = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {alert} = useSelector((state: RootState) => state)
    const [userRegister, setUserRegister] = useState({
        name: "",
        account: "",
        password: "",
        cf_password: ""
    })
    const [typePress, setTypePress] = useState<PressState>({
        password: false,
        cf_password: false
    })
    const [focus, setFocus] = useState("")

    const {password, account,cf_password,name} = userRegister

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUserRegister({...userRegister, [name]: value})
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerAction(userRegister) as any)

    }
    useEffect(() => {
        if (alert.success) {
            navigate("/login")
        }
    },[alert])
    return (
        <form onSubmit={handleSubmit} className={s.root}>
            <div className={clsx(focus === "name" && s.active_color)}>
                <label htmlFor="account">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={onHandleChange}
                    onFocus={() => setFocus("name")}

                />
            </div>
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
                        type={typePress.password ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={onHandleChange}
                        onFocus={() => setFocus("password")}
                    />
                    <small onClick={() => setTypePress((prev: PressState) => ({...prev, password: !prev.password}))}>
                        {typePress.password ? <HiOutlineEye/> : <HiOutlineEyeOff/>}
                    </small>
                </div>
            </div>
            <div className={clsx(focus === "cf_password" && s.active_color)}>
                <label htmlFor="cf_password">Confirm Password</label>
                <div className={s.password_box}>
                    <input
                        type={typePress.cf_password ? "text" : "password"}
                        name="cf_password"
                        id="cf_password"
                        value={cf_password}
                        onChange={onHandleChange}
                        onFocus={() => setFocus("cf_password")}
                    />
                    <small onClick={() => setTypePress((prev: PressState) => ({...prev,cf_password: !prev.cf_password}))}>
                        {typePress.cf_password ? <HiOutlineEye/> : <HiOutlineEyeOff/>}
                    </small>
                </div>
            </div>
            <button
                disabled={!(account && password && name && cf_password)}
                type="submit">Register
            </button>
        </form>
    );
};

export default RegisterPass;