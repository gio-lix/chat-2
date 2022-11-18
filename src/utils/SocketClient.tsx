import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {
    CREATE_COMMENT, DELETE_COMMENT, DELETE_REPLY,
    REPLY_COMMENT,
    UPDATE_COMMENT,
    UPDATE_REPLY
} from "../redux/types/commentType";
import {CommentType} from "./TypeScipt";

const SocketClient = () => {
    const dispatch = useDispatch<any>()
    const {socket} = useSelector((state: RootState) => state )

    useEffect(() => {
        if (!socket) return
        socket.on("createComment", (data: CommentType) => {
            dispatch({type: CREATE_COMMENT, payload: data})
        })
        return () => {socket.off("createComment")}
    },[socket, dispatch])


    useEffect(() => {
        if (!socket) return
        socket.on("replyComment", (data: CommentType) => {
            dispatch({
                type: REPLY_COMMENT,
                payload: data
            })
        })
        return () => {socket.off("replyComment")}
    },[socket, dispatch])

    useEffect(() => {
        if (!socket) return
        socket.on("updateComment", (data: CommentType) => {
            dispatch({
                type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
                payload: data
            })
        })
        return () => {socket.off("updateComment")}
    }, [socket, dispatch])

    useEffect(() => {
        if (!socket) return
        socket.on("commentDelete", (data: CommentType) => {
            dispatch({
                type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
                payload: data
            })
        })
        return () => {socket.off("commentDelete")}
    }, [socket, dispatch])


    return (
        <div>

        </div>
    );
};

export default SocketClient;