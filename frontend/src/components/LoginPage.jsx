import {useForm} from "react-hook-form";
import apiService from "../apiService";
import LoginViaGoogle from "./LoginViaGoogle";


export default function LoginPage() {
    let {register, handleSubmit} = useForm()

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit(apiService.login)}>
                <input type="username" name="username" placeholder="имя" {...register('username')}/>
                <input type="password" name="password" placeholder="пароль" {...register('password')}/>
                <button type="submit">Войти</button>
                <p className="or">или</p>
                <LoginViaGoogle/>
            </form>
        </>

    )
}