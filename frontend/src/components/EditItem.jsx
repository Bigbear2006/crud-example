import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import apiService from "../apiService";



export default function EditItem() {
    let { id } = useParams()
    let navigate = useNavigate()
    let [item, setItem] = useState({})
    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => apiService.getItem(id, setItem, setValue), [])

    return(
        <form className="edit-item" onSubmit={handleSubmit(data => apiService.editItem(id, data, navigate))}>
            <input type="text" name="title" {...register('title')}/>
            <div className="edit-item__edit-image">
                <input type="file" name="image" {...register('image')}/>
                <img src={item.image} width="10%" alt="#"/>
                <div className="edit-image__actions">
                    <button type="button" id="choose-file" onClick={() => document.querySelector('input[name="image"]').click()}>Выберите файл</button>
                    <button type="button" id="delete-image" onClick={() => setValue('image', [new File([], '')])}>Удалить изображение</button>
                </div>
            </div>
            <textarea name="description" rows="10" {...register('description')}/>

            <div className="edit-item__actions">
                <button type="submit" id="edit-item">Изменить</button>
                <button type="button" id="delete-item" onClick={() => apiService.deleteItem(id, navigate)}>Удалить</button>
            </div>
        </form>
    )
}