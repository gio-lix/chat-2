import {Dispatch} from "react";
import {LoginType, RegisterType} from "../../utils/TypeScipt";
import {getApi, postApi} from "../../utils/FetchData";
import {ValidRegister} from "../../utils/valid";
import {AUTH, AuthAction} from "../types/authType";
import {ALERT, AlertAction} from "../types/alertType";
import {checkTokenExp} from "../../utils/checkTokenExp";

export const loginAction = (payload: LoginType) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await postApi('login', {...payload})

        dispatch({type: AUTH, payload: res})
        dispatch({type: ALERT, payload: {success: 'Login Success!'}})
        localStorage.setItem("logged", "true")
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const registerAction = (payload: RegisterType) =>
    async (dispatch: any) => {
        const check = ValidRegister(payload)
        if (check.errLength > 0) return dispatch({type: ALERT, payload: {errors: check.errMsg}})
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            await postApi('register', {...payload})
            dispatch({type: ALERT, payload: {success: 'Register Success!'}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }


export const RefreshToken = () => async (dispatch: any) => {
    const logged = localStorage.getItem("logged")
    if (logged !== "true") return

    try {
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await getApi('refresh_token',)
        dispatch({type: AUTH, payload: res})
        dispatch({type: ALERT, payload: {loading: false}})
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const logoutAction = (token: string) => async (dispatch: any) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token
    try {

        localStorage.removeItem("logged")
        await getApi("logout", access_token)
        window.location.href = "/"
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const googleLoginAction = (payload: LoginType) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await postApi('google_token', {id_token: payload})
        dispatch({type: AUTH, payload: res})
        dispatch({type: ALERT, payload: {loading: false}})
        localStorage.setItem("logged", "true")
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}
export const forgetPasswordAction = (account: string) =>
    async (dispatch: Dispatch<AlertAction>) => {
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            console.log({account})

            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }