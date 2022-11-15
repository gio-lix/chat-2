import React, {FC, useEffect, useState} from 'react';
import s from "./Pagination.module.scss"
import {useSearchParams} from "react-router-dom";
import clsx from "clsx";

interface Props {
    total: number
    callback: (num: number) => void
}


const Pagination: FC<Props> = ({total, callback}) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<number>(1)

    const newArr = [...Array(total)].map((_, i) => i + 1)

    const isActive = (index: number) => {
        if (index === page) return s.active
        return ""
    }

    const handlerPagination = (num: number) => {
        setSearchParams(`page=${num}`)
        callback(num)
    }

    useEffect(() => {
        let num = searchParams.get("page")
        setPage(Number(num))
    }, [searchParams])

    return (
        <div className={s.pagination}>
            <nav>
                <ul>
                    {
                        page > 1 &&
                        <li onClick={() => handlerPagination(page - 1)}>
                            <span>
                                &laquo;
                            </span>
                        </li>
                    }
                    {newArr.map(num => (
                        <li
                            key={num}
                            className={clsx(isActive(num))}
                            onClick={() => handlerPagination(num)}
                        >
                            <span>
                                {num}
                            </span>
                        </li>
                    ))}
                    {
                        page < total &&
                        <li onClick={() => handlerPagination(page + 1)}>
                            <span>
                                &raquo;
                            </span>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;