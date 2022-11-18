import React, {useEffect} from 'react';
import {Routes} from "react-router-dom";
import io from "socket.io-client"

import {useDispatch} from "react-redux";
import {getBlogsAction} from "./redux/actions/blogsAction";
import {renderPaths} from "./utils/RenderPaths";
import {RefreshToken} from "./redux/actions/authAction";
import {getCategoryAction} from "./redux/actions/categoryAction";

import PageRender from "./PageRender";
import SocketClient from "./utils/SocketClient";
import Header from "./components/global/header";
import Footer from "./components/global/footer";
import Alert from "./components/alert/Alert";

function App() {
    const dispatch = useDispatch<any>()


    useEffect(() => {
        dispatch(RefreshToken())
        dispatch(getCategoryAction())
        dispatch(getBlogsAction())
    },[dispatch])

    useEffect(() => {
        const socket = io()
        dispatch({type: "SOCKET", payload: socket})
        return () => {socket.close()}
    },[dispatch])

    return (
        <div className="container">
            <Header />
            <Alert />
            <SocketClient/>
            <Routes>
                {renderPaths(["/", "/:page", "/:page/:slug"], <PageRender />)}
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;


