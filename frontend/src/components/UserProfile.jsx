import {useEffect, useState} from "react";
import apiService from "../apiService";
import {useNavigate} from "react-router-dom";

export default function UserProfile({setIsAuthenticated}) {
    let [userInfo, setUserInfo] = useState({})
    let navigate = useNavigate()

    useEffect(() => apiService.getUserInfo(setUserInfo), [])

    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <div className="profile">
            <div className="logout" style={{color: 'red'}} onClick={logout}>Выйти</div>
            <div className="user-info">
                <div className="user-info__photo">
                    <img src={userInfo.photo} alt="#"/>
                </div>
                <div className="user-info__data">
                    <h1>{userInfo.username}</h1>
                    <h1>{userInfo.email}</h1>
                </div>
            </div>
        </div>
    )

}