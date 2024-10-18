import {useEffect, useState} from "react";
import apiService from "../apiService";
import {useNavigate} from "react-router-dom";
import Item from "./Item";


export default function UserProfile({setIsAuthenticated, isAdmin}) {
    let [userInfo, setUserInfo] = useState({})
    let [saved, setSaved] = useState([])
    let navigate = useNavigate()

    const onSaveCallback = () => {}
    const onDeleteCallback = (id) => setSaved(saved => saved.filter(elem => elem.id !== id))

    useEffect(() => {
        apiService.getUserInfo(setUserInfo)
        apiService.getSavedItems(setSaved)
    }, [])

    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <div className="profile">
            <div className="logout" onClick={logout}>Выйти</div>
            <div className="user-info">
                <div className="user-info__photo">
                    <img src={userInfo.photo} alt="#"/>
                </div>
                <div className="user-info__data">
                    <h1>{userInfo.username}</h1>
                    <h1>{userInfo.email}</h1>
                </div>
            </div>
            <div className="saved-items">
                {saved.map(elem =>
                    <Item
                        key={elem.id}
                        {...elem}
                        isSaved={true}
                        onSaveCallback={onSaveCallback}
                        onDeleteCallback={onDeleteCallback}
                        isAdmin={isAdmin}
                    />)}
            </div>
        </div>
    )

}