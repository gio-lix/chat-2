import React, {useEffect, useRef, useState} from 'react';
import clsx from "clsx";

import s from "./Header.module.scss"

const Search = () => {
    const [focus, setFocus] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: any) => {
            if (!e.path.includes(navRef.current)) {
                setFocus(false)
            }
        }
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [navRef.current])



    return (
        <div ref={navRef} className={s.search}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={clsx(focus && s.active_border)}
                onFocus={() => setFocus(true)}
                placeholder="Enter your search..."
            />
        </div>
    );
};

export default Search;