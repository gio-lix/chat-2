import React, {useCallback, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi"

import clsx from "clsx"
import s from "./Header.module.scss"

import Search from "./Search";
import Navigation from "./Navigation";
import Menu from "./Menu";


const Header = () => {
    const navigate = useNavigate()
    const [burger, setBurger] = useState<boolean>(false)

    const onNavigate = useCallback((path: string) => {
        navigate(path)
        if (burger) setBurger(false)
    },[burger])


    return (
        <header className={clsx(s.header, "d-flex a-i-center j-c-between")}>
            <h3>
                <Link to="/">
                    BLOG
                </Link>
            </h3>
            <Search/>

            {burger && (
                <div className={clsx(s.burger_menu_active, s.open )}  >
                    <Menu
                        onNavigate={onNavigate}
                        className={s.menu_mob} />
                    <Navigation
                        onNavigate={onNavigate}
                        className={s.navigation_mob}
                    />
                </div>
            )}
            <Menu onNavigate={onNavigate}/>
            <Navigation onNavigate={onNavigate} />
            <button  onClick={() => setBurger(!burger)} className={s.burger_menu}>
                <GiHamburgerMenu/>
            </button>

        </header>
    );
};

export default Header;