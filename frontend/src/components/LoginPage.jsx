import {useForm} from "react-hook-form";
import apiService from "../apiService";
import LoginViaGoogle from "./LoginViaGoogle";
import {useNavigate} from "react-router-dom";


export default function LoginPage({setIsAuthenticated}) {
    let {register, handleSubmit} = useForm()
    let navigate = useNavigate()

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit(data => apiService.login(data, setIsAuthenticated, navigate))}>
                <input type="email" name="email" placeholder="почта" {...register('email')}/>
                <input type="password" name="password" placeholder="пароль" {...register('password')}/>
                <button type="submit">Войти</button>
                <p className="or">или</p>
                <LoginViaGoogle setIsAuthenticated={setIsAuthenticated}/>
            </form>
        </>

    )
}