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

export const createCategoryAction = (name: string) =>
    async (dispatch: Dispatch<AlertAction | CategoryAction>) => {

        try {
            dispatch({type: ALERT, payload: {loading: true}})
            const {newCategory} = await postApi("category", {name})
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

export const updateCategoryAction = (data: CategoryType) =>
    async (dispatch: Dispatch<AlertAction | CategoryAction>) => {
        try {
            dispatch({type: UPDATE_CATEGORY, payload: data})
            await putApi(`category/${data._id}`, {name: data.name})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }

export const deleteCategoryAction = (id: string) =>
    async (dispatch: Dispatch<AlertAction | CategoryAction>) => {
        try {
            dispatch({type: DELETE_CATEGORY, payload: id})
            await deleteApi(`category/${id}`)
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }