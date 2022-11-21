import {Dispatch} from "redux"
import {deleteApi, getApi, postApi, putApi} from "../../utils/FetchData";
import {ALERT, AlertAction} from "../types/alertType";
import {CategoryType} from "../../utils/TypeScipt";
import {
    CategoryAction,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORY,
    UPDATE_CATEGORY
} from "../types/categoryTypes";
import {checkTokenExp} from "../../utils/checkTokenExp";

export const createCategoryAction = (name: string, token: string) =>
    async (dispatch: Dispatch<AlertAction | CategoryAction>) => {
        const result = await checkTokenExp(token, dispatch)
        const access_token = result ? result : token
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            const {newCategory} = await postApi("category", {name}, access_token)
            dispatch({type: CREATE_CATEGORY, payload: newCategory})
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }

export const getCategoryAction = () =>
    async (dispatch: Dispatch<AlertAction | CategoryAction>) => {
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            const {category} = await getApi("category")
            dispatch({type: GET_CATEGORY, payload: category})
            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }

export const updateCategoryAction = (data: CategoryType, token: string) =>
    async (dispatch: Dispatch<AlertAction | CategoryAction>) => {
        const result = await checkTokenExp(token, dispatch)
        const access_token = result ? result : token
        try {
            dispatch({type: UPDATE_CATEGORY, payload: data})
            await putApi(`category/${data._id}`,
                {name: data.name},
                access_token
            )
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }

export const deleteCategoryAction = (id: string, token: string) =>
    async (dispatch: Dispatch<AlertAction | CategoryAction>) => {
        const result = await checkTokenExp(token, dispatch)
        const access_token = result ? result : token
        try {
            dispatch({type: DELETE_CATEGORY, payload: id})
            await deleteApi(`category/${id}`, access_token)
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }