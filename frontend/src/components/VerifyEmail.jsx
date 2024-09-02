import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiService from "../apiService";


export default function VerifyEmail() {
    let [statusIsSuccess, setSatusIsSuccess] = useState(true)
    let [isLoading, setIsLoading] = useState(true)
    let [params,] = useSearchParams()
    let navigate = useNavigate()

    useEffect(() =>
        apiService.verifyEmail(params.get('user_id'), params.get('token'), setIsLoading, setSatusIsSuccess), [])

    return (
        <div className="verify-email-status">
            {isLoading && <h1>Загрузка...</h1>}
            {statusIsSuccess &&
                <h1>Регистрация прошла успешно!
                    <span className="link" onClick={() => navigate('/login/')}> Войдите.</span>
                </h1>
            }
            {!statusIsSuccess &&
                <h1>
                    Что-то пошло не так. Вы точно перешли по ссылке из сообщения?
                    <span className="link" onClick={() => navigate('/register/')}>Попробуйте зарегистрироваться еще раз.</span>
                </h1>
            }
        </div>
    )
}