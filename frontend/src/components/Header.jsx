import {useNavigate} from "react-router-dom";

export default function Header() {
    let navigate = useNavigate()

    return (
        <div className="header">
            <div className="header__menu">
                <div className="header__menu-item" onClick={() => navigate('/')}>CRUD Example</div>
                <div className="header__menu-item" onClick={() => navigate('/login')}>Войти</div>
                <div className="header__menu-item" onClick={() => navigate('/register')}>Зарегистрироваться</div>
                <div className="header__menu-item" onClick={() => navigate('/profile')}>Профиль</div>
            </div>
        </div>
    )
}