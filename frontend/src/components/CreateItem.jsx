import {useForm} from "react-hook-form";
import apiService from "../apiService";


export default function CreateItem({setModalIsOpen, modalIsOpen}) {
    const {register, handleSubmit} = useForm({defaultValues: {image: [new File([], '')]}})

    return (
        <div className="create-item-modal" style={{display: modalIsOpen? 'flex': 'none'}}>
            <form className="create-item" onSubmit={handleSubmit(data => apiService.createItem(data, setModalIsOpen))}>
                <div className="close-modal" onClick={() => setModalIsOpen(isOpen => !isOpen)}>Закрыть</div>
                <label htmlFor="create-item__title">Название</label>
                <input type="text" name="title" id="create-item__title" {...register('title')}/>
                <div className="edit-item__edit-image">
                    <button type="button" id="choose-file" onClick={() => document.querySelector('input[name="image"]').click()}>Выберите файл</button>
                    <input type="file" name="image" {...register('image')}/>
                </div>
                <label htmlFor="create-item__description">Описание</label>
                <textarea name="description" rows="10" className="create-item__description" {...register('description')}/>
                <button type="submit" id="create-item">Создать</button>
            </form>
        </div>

    )
}