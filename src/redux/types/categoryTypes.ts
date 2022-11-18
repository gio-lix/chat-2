import {CategoryType} from "../../utils/TypeScipt";

export const CREATE_CATEGORY = "CREATE_CATEGORY"
export const GET_CATEGORY = "GET_CATEGORY"
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const DELETE_CATEGORY = "DELETE_CATEGORY"


export interface ICategory {
    type: typeof CREATE_CATEGORY,
    payload: CategoryType
}
export interface IGETCategory {
    type: typeof GET_CATEGORY,
    payload: CategoryType
}
export interface IUPCategory {
    type: typeof UPDATE_CATEGORY,
    payload: CategoryType
}
export interface IDELCategory {
    type: typeof DELETE_CATEGORY,
    payload: string
}

export type CategoryAction =
    | ICategory
    | IGETCategory
    | IUPCategory
    | IDELCategory

