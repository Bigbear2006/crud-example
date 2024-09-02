import {useNavigate} from "react-router-dom";
import If from "./If";


export default function Header({isAuthenticated}) {
    let navigate = useNavigate()

    return (
        <div className="header">
            <div className="header__menu">
                <div className="header__menu-item" onClick={() => navigate('/')}>CRUD Example</div>
                <If condition={!isAuthenticated}>
                    <div className="header__menu-item" onClick={() => navigate('/login')}>Войти</div>
                    <div className="header__menu-item" onClick={() => navigate('/register')}>Зарегистрироваться</div>
                </If>
                <If condition={isAuthenticated}>
                    <div className="header__menu-item" onClick={() => navigate('/profile')}>Профиль</div>
                </If>
            </div>
        </div>
    )
}