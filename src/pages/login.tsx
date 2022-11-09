import React, {useEffect} from 'react';
import {Link} from "react-router-dom";


import FormContainer from "../components/auth/formBox";
import LoginPass from "../components/auth/LoginPass";
import SocialLogin from "../components/auth/SocialLogin";
import {gapi} from "gapi-script";

const Login = () => {

    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId: "723807735592-3eq7bokf49l5motot9qcp95gg6mg6jbh.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load("client:auth2", start)
    },[])
    return (
        <>
            <FormContainer>
                <h1>Login</h1>
                <SocialLogin />
                <LoginPass/>
                <small>
                    <Link to='/forget_password'>
                        Forget Password?
                    </Link>
                </small>
                <p>
                    You don't have an account?
                    <Link to='/register'>
                        Register Now
                    </Link>
                </p>
            </FormContainer>
        </>
    );
};

export default Login;