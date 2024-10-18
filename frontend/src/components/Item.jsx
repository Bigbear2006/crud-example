import {useNavigate} from "react-router-dom";
import apiService from "../apiService";
import EditItemImg from "../images/editItem.png";
import BookmarkImg from "../images/bookmark.png";
import YellowBookmarkImg from "../images/yellowBookmark.png";


export default function Item({id, title, description, image, categories, isSaved, onSaveCallback, onDeleteCallback, isAdmin, isAuthenticated}) {
    let navigate = useNavigate()

    return (
        <div className="item">
            <div className="item__image">
                <img src={image} alt="#"/>
            </div>
            <div className="item__info">
                <h2>{title}</h2>

                <p className="item__description">{description}</p>
                <div className="item__categories">
                    {categories.map((elem => <p key={elem.id}>{elem.title}</p>))}
                </div>
            </div>
            <div className="item__actions">
                {isAuthenticated && <div
                    className="item__action"
                    onClick={() => isSaved ?
                        apiService.deleteSaved(id, onDeleteCallback) : apiService.saveItem(id, onSaveCallback)}
                >
                    <img src={isSaved? YellowBookmarkImg: BookmarkImg} alt="#"/>
                </div>}
                {isAdmin && <div className="item__action" onClick={() => navigate(`item/${id}/edit/`)}>
                    <img src={EditItemImg} alt="#"/>
                </div>}
            </div>
        </div>
    )
}