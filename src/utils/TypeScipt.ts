export interface LoginType {
    account: string
    password: string
}

export interface RegisterType extends LoginType {
    name: string
    cf_password: string
}

export interface UserState extends LoginType {
    avatar: string
    createdAt: string
    name: string
    role: string
    type: string
    updatedAt: string
    _id: string
}

export interface AlertState {
    loading?: boolean
    success?: string | string[]
    errors?: string | string[]
}

export interface IUserProfileState extends RegisterType {
    avatar: string | File
}