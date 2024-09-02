import {useNavigate} from "react-router-dom";

export default function Item({id, title, description, image, categories, isAdmin}) {
    let navigate = useNavigate()

    return (
        <div className="item">
            <img src={image} alt="#"/>
            <div className="item__info">
                <h2>{title}</h2>
                <p className="item__description">{description}</p>
                <div className="item__categories">
                    {categories.map((elem => <p key={elem.id}>{elem.title}</p>))}
                </div>
            </div>
            {isAdmin && <div className="edit-item-action" onClick={() => navigate(`item/${id}/edit/`)}>Редактировать</div>}
        </div>
    )
}