import React from 'react';
import FormContainer from "../components/auth/formBox";
import {Link} from "react-router-dom";
import RegisterPass from "../components/auth/RegisterPass";

const Register = () => {
    return (
        <FormContainer>
            <h1>Register</h1>
            <RegisterPass/>
            <p>
                Already have an account?
                <Link to='/login'>Login Now</Link>
            </p>
        </FormContainer>
    );
};

export default Register;