import React from "react";
import {Route} from "react-router-dom";

export const renderPaths = (
    paths: string[], Element: string | number | boolean | JSX.Element | React.ReactFragment | null | undefined) =>
    paths.map((path) => <Route key={path} path={path} element={Element}/>
    );