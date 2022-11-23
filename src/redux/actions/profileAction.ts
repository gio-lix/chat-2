import {Dispatch} from "redux";

import {checkImage, imageUpload} from "../../utils/ImageUpload";
import {getApi, putApi} from "../../utils/FetchData";
import {checkPassword} from "../../utils/valid";
import {AuthType} from "../../utils/TypeScipt";
import {ALERT, AlertAction} from "../types/alertType";
import {AUTH, AuthAction} from "../types/authType";
import {GET_OTHER_INFO, OthersProfileTypeAction} from "../types/profileType";

export const updateUserAction = (avatar: File, name: string, auth: AuthType) =>
    async (dispatch: Dispatch<AlertAction | AuthAction>) => {
        if (!auth.access_token || !auth.user) return
        let url = " "

        try {
            dispatch({type: ALERT, payload: {loading: true}})

            if (avatar) {
                const check = checkImage(avatar)
                if (check) return dispatch({type: ALERT, payload: {errors: check}})

                const photo = await imageUpload(avatar)
                url = photo.url
            }

            const res = await putApi("user", {
                avatar: url ? url : auth.user.avatar,
                name: name ? name : auth.user.name
            })

            dispatch({
                    type: AUTH, payload: {
                        access_token: auth.access_token,
                        user: {
                            ...auth.user,
                            avatar: url ? url : auth.user.avatar,
                            name: name ? name : auth.user.name
                        }
                    }
                }
            )
            dispatch({type: ALERT, payload: {success: res.msg}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }

    }

export const resetPasswordAction = (password: string, cf_password: string) =>
    async (dispatch: Dispatch<AlertAction>) => {

        const msg = checkPassword(password, cf_password)
        if (msg) return dispatch({type: ALERT, payload: {errors: msg}})
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            await putApi("reset_password", {password})
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }

export const getOthersInfoAction = (id: string) =>
    async (dispatch: Dispatch<AlertAction | OthersProfileTypeAction>) => {
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            const res = await getApi(`user/${id}`)

            dispatch({
                type: GET_OTHER_INFO,
                payload: res
            })
            dispatch({type: ALERT, payload: {loading: true}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }