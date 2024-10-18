import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6'
import {QueryParamProvider} from "use-query-params";

import EditItem from "./components/EditItem";
import UserProfile from "./components/UserProfile";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Header from "./components/Header";
import VerifyEmail from "./components/VerifyEmail";
import MainPage from "./components/MainPage";
import apiService from "./apiService";
import If from "./components/If";
import Page403 from "./components/Page403";


function App() {
    let [isAuthenticated, setIsAuthenticated] = useState(false)
    let [isAdmin, setIsAdmin] = useState(false)
    let refresh = localStorage.getItem('refresh')

    useEffect(() => {
        apiService.refreshToken(setIsAuthenticated)
        apiService.checkUserIsAdmin(setIsAdmin)
        let intervalId  = setInterval(
            () => apiService.refreshToken(setIsAuthenticated),
            apiService.refreshTokenTimeout
        )
        return () => clearInterval(intervalId)
    }, [refresh])

    return (
        <GoogleOAuthProvider clientId="551438836032-833uqtb7v7slvahb6j12hehcnuq357ec.apps.googleusercontent.com">
            <BrowserRouter>
                <Header isAuthenticated={isAuthenticated}/>
                <QueryParamProvider adapter={ReactRouter6Adapter}>
                    <Routes>
                        <Route
                            path="/"
                            element={<MainPage isAdmin={isAdmin} isAuthenticated={isAuthenticated}/>}
                        />
                        <Route
                            path="item/:id/edit/"
                            element={<If condition={isAdmin} otherwise={<Page403/>}><EditItem/></If>}
                        />
                        <Route
                            path="profile/"
                            element={<UserProfile setIsAuthenticated={setIsAuthenticated} isAdmin={isAdmin}/>}
                        />
                        <Route
                            path="login/" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}
                        />
                        <Route
                            path="register/"
                            element={<RegisterPage setIsAuthenticated={setIsAuthenticated}/>}
                        />
                        <Route
                            path="verify-email/"
                            element={<VerifyEmail/>}
                        />
                    </Routes>
                </QueryParamProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>

    )
}

export default App;
