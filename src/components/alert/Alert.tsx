import React from 'react';

import Loading from "./Loading";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Toast from "./Toast";
import Spinner from "./Spinner";

const Alert = () => {
    const {alert} = useSelector((state: RootState) => state)


    return (
        <section>
            {alert.loading && <Loading />}
            {alert.errors &&
                <Toast
                    body={alert.errors}
                    bgColor='#a80000'
                    title="Errors."
                />
            }
            {alert.success &&
                <Toast
                    body={alert.success}
                    bgColor='#6fb700'
                    title="Success."
                />
            }
        </section>
    );
};

export default Alert;