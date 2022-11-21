import React, {useState} from 'react';
import {IoIosSend} from "react-icons/io"
import {useDispatch} from "react-redux";
import {forgetPasswordAction} from "../redux/actions/authAction";
import {FormSubmitType} from "../utils/TypeScipt";

const ForgetPassword = () => {
    const dispatch = useDispatch<any>()
    const [account, setAccount] = useState("")


    const handleSubmit = (e:FormSubmitType) => {
        e.preventDefault()
        dispatch(forgetPasswordAction(account))
    }

    return (
        <section className='forget-password'>
            <h2>Forget password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="account" >Email</label>
                    <input
                        type="text"
                        id="account"
                        name="account"
                        value={account}
                        onChange={e => setAccount(e.target.value)}
                    />
                <button disabled={!account.trim()} type="submit">
                    <IoIosSend /> send
                </button>
            </form>
        </section>
    );
};

export default ForgetPassword;