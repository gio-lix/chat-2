import React, {FC, memo} from 'react';
import s from "./Header.module.scss";
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

interface Props {
    className?: string
    onNavigate: Function
}

const Menu:FC<Props> = ({className,onNavigate}) => {
    const {pathname} = useLocation()
    const {auth, alert} = useSelector((state: RootState) => state)


    const loginLinks = [
        {label: "Login", path: "/login"},
        {label: "Register", path: "/register"}
    ]
    const afterLoginLinks = [
        {label: "Home", path: "/home"},
        {label: "CreateBlog", path: "/create_blog"}
    ]
    const navLink = auth.access_token ? afterLoginLinks : loginLinks


    const isActive = (path: string) => {
        if (path === pathname) return "active_path"
    }

    return (
        <>

            {!alert.loading && navLink.map(link => (
                <div
                    onClick={() => onNavigate(link.path)}
                    className={clsx(s.link, className, isActive(link.path))}
                    key={link.label}
                >
                    <p>{link.label}</p>
                </div>
            ))}
            {
                auth.user?.role === "admin" &&
                <p className={clsx(s.link,isActive("/category"))}>
                   <Link to="/category">
                        Category
                   </Link>
                </p>
            }
        </>
    );
};

export default memo(Menu);