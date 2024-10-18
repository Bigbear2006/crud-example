import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import If from "./If";
import BurgerMenu from "../images/burger.png";



export default function Header({isAuthenticated}) {
    let [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
    let navigate = useNavigate()

    const headerStyles = {
        display: isOpen ? 'flex' : 'none',
        backgroundColor: '#b9b9b9',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
            if (window.innerWidth > 500) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            console.log('removed')
        };
    }, []);


    return (
        <div className="header">
            {isMobile && <div className="burger-menu" onClick={() => setIsOpen(true)} style={{display: isOpen ? 'none' : 'block'}}>
                <img src={BurgerMenu} alt="#" width="100%" height="100%"/>
            </div>}
            <div className="header__menu" style={isMobile?  headerStyles: {display: 'flex', margin: 0}}>
                {isMobile && <div className="close" onClick={() => setIsOpen(false)}>&times;</div>}
                <div className="header__menu-item" onClick={() => navigate('/')}><p>CRUD Example</p></div>
                <If condition={!isAuthenticated}>
                    <div className="header__menu-item" onClick={() => navigate('/login')}><p>Войти</p></div>
                    <div className="header__menu-item" onClick={() => navigate('/register')}><p>Зарегистрироваться</p></div>
                </If>
                <If condition={isAuthenticated}>
                    <div className="header__menu-item" onClick={() => navigate('/profile')}><p>Профиль</p></div>
                </If>
            </div>
        </div>
    )
}