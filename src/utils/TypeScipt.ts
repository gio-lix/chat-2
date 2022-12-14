import React from "react";

export type InputChangeType = React.ChangeEvent<
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement>

export type FormSubmitType = React.FormEvent<HTMLFormElement>

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
    spinner?: boolean
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

export interface BlogType {
    _id?: string
    user: string | Usertype,
    title: string,
    content: string,
    description: string,
    thumbnail: string | File,
    category: string,
    createdAt: string
}

export interface CommentType {
    _id?: string
    user: Usertype
    blog_id: string
    blog_user_id: string
    content: string
    replyCM: CommentType[]
    reply_user?: Usertype
    comment_root?: string
    createdAt: string
}