import React from 'react';
import {GoogleLogin} from "react-google-login"
import {FcGoogle} from "react-icons/fc"

import {useDispatch} from "react-redux";

import {googleLoginAction} from "../../redux/actions/authAction";


const SocialLogin = () => {
    const dispatch = useDispatch<any>()


    const onSuccess = (res: any) => {
        dispatch(googleLoginAction(res.tokenId))
    }

    const onFailure = (res: any) => {
        console.log("Error -.> ", res)
    }

    return (
        <div>
            <GoogleLogin
                clientId="723807735592-3eq7bokf49l5motot9qcp95gg6mg6jbh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                render={renderProps => (
                    <button
                        className="google_sign_btn"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <FcGoogle/>
                        <span>Sign in with Google</span>
                    </button>
                )}
            />
        </div>
    );
};

export default SocialLogin;