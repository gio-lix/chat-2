export interface LoginType {
    account: string
    password: string
}

export interface RegisterType extends LoginType {
    name: string
    cf_password: string
}

export interface Usertype extends LoginType {
    avatar: string
    createdAt: string
    name: string
    role: string
    type: string
    updatedAt: string
    _id: string
}

export interface AlertType {
    loading?: boolean
    success?: string | string[]
    errors?: string | string[]
}

export interface UserProfileType extends RegisterType {
    avatar: string | File
}

export interface CategoryType {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface AuthType {
    access_token?: string
    user?: Usertype
}