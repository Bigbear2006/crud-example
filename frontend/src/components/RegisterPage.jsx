import {useForm} from "react-hook-form";
import apiService from "../apiService";
import LoginViaGoogle from "./LoginViaGoogle";


export default function RegisterPage() {
    let {register, handleSubmit} = useForm()

    return (
        <>
            <form className="register-form" onSubmit={handleSubmit(apiService.register)}>
                <input type="text" name="username" placeholder="имя" {...register('username')}/>
                <input type="email" name="email" placeholder="почта" {...register('email')}/>
                <input type="password" name="password" placeholder="пароль" {...register('password')}/>
                <button type="submit">Зарегистрироваться</button>
                <p>или</p>
                <LoginViaGoogle/>
            </form>
        </>

    )
}