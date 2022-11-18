import React from 'react';
import {Link, useLocation} from "react-router-dom";

import FormContainer from "../components/auth/formBox";
import RegisterPass from "../components/auth/RegisterPass";

const Register = () => {
    const {search} = useLocation()
    let url = search ? search : "/"
    return (
        <FormContainer>
            <h1>Register</h1>
            <RegisterPass/>
            <p>
                Already have an account?
                <Link to={`/login${url}`}>Login Now</Link>
            </p>
        </FormContainer>
    );
};

export default Register;