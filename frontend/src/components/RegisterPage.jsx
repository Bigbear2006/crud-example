import {useForm} from "react-hook-form";
import apiService from "../apiService";
import LoginViaGoogle from "./LoginViaGoogle";
import {useState} from "react";
import EmailSentModal from "./EmailSentModal";


export default function RegisterPage({setIsAuthenticated}) {
    let {register, handleSubmit, setError, formState: {errors}} = useForm()
    let [modalIsOpen, setModalIsOpen] = useState(false)

    const usernameValidation = {
        isAvailable(value) {
            apiService.checkUsername(value, setError)
        },
    }

    const emailValidation = {
        isAvailable(value) {
            apiService.checkEmail(value, setError)
        },
    }

    return (
        <>
            <form className="register-form" onSubmit={handleSubmit(data => apiService.register(data, setModalIsOpen))}>
                <input
                    type="text"
                    name="username"
                    placeholder="имя"
                    {...register('username', {validate: usernameValidation})}
                />
                {errors.username && <span className="error">{errors.username?.message}</span>}
                <input
                    type="email"
                    name="email"
                    placeholder="почта"
                    {...register('email', {validate: emailValidation})}
                />
                {errors.email && <span className="error">{errors.email?.message}</span>}
                <input
                    type="password"
                    name="password"
                    placeholder="пароль"
                    {...register('password')}
                />
                <button type="submit">Зарегистрироваться</button>
                <p>или</p>
                <LoginViaGoogle setIsAuthenticated={setIsAuthenticated}/>
            </form>
            <EmailSentModal modalIsOpen={modalIsOpen}/>
        </>

    )
}