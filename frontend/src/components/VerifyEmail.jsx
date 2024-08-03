import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import apiService from "../apiService";


export default function VerifyEmail() {
    let navigate = useNavigate()
    let {userId, token} = useParams()

    useEffect(() => apiService.verifyEmail(userId, token, navigate), [])

    return <h1>Загрузка...</h1>
}