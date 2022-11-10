import {Dispatch} from "react";
import {checkImage, imageUpload} from "../../utils/ImageUpload";
import {putApi} from "../../utils/FetchData";
import {checkPassword} from "../../utils/valid";
import {ALERT} from "../types/alertType";
import {AUTH} from "../types/authType";
import {AuthType} from "../../utils/TypeScipt";

export const updateUserAction = (avatar: File, name: string, auth: AuthType) =>
    async (dispatch: Dispatch<any>) => {
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
            }, auth.access_token)

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

export const resetPasswordAction = (password: string, cf_password: string, token: string) =>
    async (dispatch: Dispatch<any>) => {
        const msg = checkPassword(password, cf_password)
        if (msg) return dispatch({type: ALERT, payload: {errors: msg}})
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            await putApi("reset_password", {password}, token)
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }