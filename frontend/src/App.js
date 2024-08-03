import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

import ItemsList from "./components/ItemsList";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import EditItem from "./components/EditItem";
import UserProfile from "./components/UserProfile";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Header from "./components/Header";
import VerifyEmail from "./components/VerifyEmail";
import apiService from "./apiService";
import './App.css';


function App() {
    let [items, setItems] = useState([])
    let [page, setPage] = useState(1)
    let [pagesCount, setPagesCount] = useState(1)
    let [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        apiService.refreshToken()
        let intervalId  = setInterval(apiService.refreshToken, apiService.refreshTokenTimeout)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <GoogleOAuthProvider clientId="551438836032-833uqtb7v7slvahb6j12hehcnuq357ec.apps.googleusercontent.com">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header/>
                            <Search setItems={setItems} setPagesCount={setPagesCount}/>
                            <ItemsList
                                items={items}
                                setItems={setItems}
                                page={page}
                                setPagesCount={setPagesCount}
                                modalIsOpen={modalIsOpen}
                                setModalIsOpen={setModalIsOpen}
                            />
                            <Pagination page={page} setPage={setPage} pagesCount={pagesCount}/>
                        </>
                    }>
                    </Route>
                    <Route path="item/:id/edit/" element={<><Header/><EditItem/></>}/>
                    <Route path="profile/" element={<><Header/><UserProfile/></>}/>
                    <Route path="login/" element={<><Header/><LoginPage/></>}/>
                    <Route path="register/" element={<><Header/><RegisterPage/></>}/>
                    <Route path="verify-email/" element={<><Header/><VerifyEmail/></>}/>
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>

    )
}

export default App;
