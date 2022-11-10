import React, {useEffect} from 'react';
import {Routes} from "react-router-dom";
import PageRender from "./PageRender";
import {renderPaths} from "./utils/RenderPaths";
import Header from "./components/global/header";
import Footer from "./components/global/footer";
import Alert from "./components/alert/Alert";
import {useDispatch} from "react-redux";
import {RefreshToken} from "./redux/actions/authAction";
import {getCategoryAction} from "./redux/actions/categoryAction";

function App() {
    const dispatch = useDispatch<any>()
    useEffect(() => {
        dispatch(RefreshToken())
        dispatch(getCategoryAction())
    },[dispatch])

    return (
        <main className="container">
            <Header />
            <Alert />
            <Routes>
                {renderPaths(["/", "/:page", "/:page/:slug"], <PageRender />)}
            </Routes>
            <Footer/>
        </main>
    );
}

export default App;


