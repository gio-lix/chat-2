import React, {FC, useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import {IoMdArrowDropdown} from "react-icons/io";

import s from "./Header.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../../redux/actions/authAction";
import {RootState} from "../../../redux/store";


interface Props {
    className?: string
    onNavigate: Function
}

const Navigation:FC<Props> = ({className, onNavigate}) => {
    const dispatch = useDispatch<any>()
    const {auth} = useSelector((state: RootState) => state)

    const [drop, setDrop] = useState<boolean>(false)
    const navRef = useRef<HTMLLIElement>(null)


    useEffect(() => {
        const handleClick = (e: any) => {
            if (!e.path.includes(navRef.current))setDrop(false)
        }
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [navRef.current])


    return (
            <nav className={clsx(s.nav, className)}>
                <ul>
                    {auth.access_token && (
                        <li ref={navRef} onClick={() => setDrop(!drop)} className='d-flex a-i-center'>
                            <p>Dropdown</p>
                            <span>
                            <IoMdArrowDropdown className={clsx(drop && s.rotate)}/>
                        </span>

                            {drop && (
                                <div className={clsx(s.drop_down)}>
                                    <button  onClick={() => onNavigate(`/profile/${auth.user?._id}`)}>Profile </button>
                                    <button
                                        onClick={() => dispatch(logoutAction())}
                                    >
                                        logout
                                    </button>
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
    );
};

export default Navigation;