import {IUserProfileState} from "../../utils/TypeScipt";
import {AuthStateType} from "../types/authType";
import {Dispatch} from "react";
import {ALERT, AUTH} from "../types/types";
import {checkImage, imageUpload} from "../../utils/ImageUpload";
import {putApi} from "../../utils/FetchData";

export const updateUserAction = (avatar: File, name: string, auth: AuthStateType) =>
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