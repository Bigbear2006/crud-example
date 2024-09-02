import {useNavigate} from "react-router-dom";

export default function EmailSentModal({modalIsOpen}) {
    let navigate = useNavigate()

    return (
        <div className="email-sent-modal" style={{display: modalIsOpen? "flex": "none"}}>
            <div className="email-sent-modal__content">
                <p>
                    Письмо для завершения регистрации отправлено на почту (Проверьте папку спам!).
                    Активируйте аккаунт и <span className="link" onClick={() => navigate('/')}>войдите.</span>
                </p>
            </div>
        </div>
    )
}